"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils/utils";
import { colors } from "@/lib/utils/colors";
import { SiSpotify } from "react-icons/si";
import Link from "next/link";
import clsx from "clsx";

interface TrackInfo {
  isPlaying: boolean;
  item: {
    trackUrl: string;
    trackName: string;
    albumName: string;
    artistName: string;
    albumImageUrl: string;
    durationMs: number;
    progressMs: number;
  } | null;
  error?: string;
}

function formatMilisecondsToPlayback(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function SpotifyCard() {
  const [trackInfo, setTrackInfo] = useState<TrackInfo>({
    isPlaying: false,
    item: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const firstLoad = useRef(true);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(0);

  // Fetch currently playing track
  const fetchCurrentlyPlaying = async () => {
    try {
      if (firstLoad.current) setIsLoading(true);
      const response = await fetch("/api/spotify/now-playing");

      if (!response.ok) {
        throw new Error("Failed to fetch currently playing track");
      }

      const data = await response.json();
      setTrackInfo(data);

      if (data.isPlaying && data.item) {
        setCurrentPlaybackTime(data.item.progressMs);
        setProgressPercentage(
          (data.item.progressMs / data.item.durationMs) * 100
        );
      }

      setLastUpdated(Date.now());
    } catch (error) {
      console.error("Error fetching currently playing track:", error);
      setTrackInfo((prev) => ({
        ...prev,
        error: "Failed to load track information",
      }));
    } finally {
      if (firstLoad.current) {
        setIsLoading(false);
        firstLoad.current = false;
      }
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchCurrentlyPlaying();

    // Set up polling every 5 seconds
    const interval = setInterval(fetchCurrentlyPlaying, 30000); // refresh every 30s

    return () => clearInterval(interval);
  }, []);

  // Update progress bar for currently playing track
  useEffect(() => {
    if (!trackInfo.isPlaying || !trackInfo.item) return;

    const duration = trackInfo.item.durationMs;
    const progress = trackInfo.item.progressMs;
    const elapsed = Date.now() - lastUpdated;
    const newProgress = Math.min(progress + elapsed, duration);

    setCurrentPlaybackTime(newProgress);
    setProgressPercentage((newProgress / duration) * 100);

    const interval = setInterval(() => {
      setCurrentPlaybackTime((prev) => {
        const newTime = prev + 1000;
        if (newTime >= duration) {
          clearInterval(interval);
          return duration;
        }
        setProgressPercentage((newTime / duration) * 100);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [trackInfo.isPlaying, trackInfo.item?.durationMs, trackInfo.item?.progressMs, lastUpdated]);

  // Loading state
  if (isLoading) {
    return (
      <div className="border rounded-xl clickable flex w-80 items-center justify-between rounded-md p-4">
        <div className="flex items-center justify-between">
          <div className="h-5 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
          <SiSpotify className="shrink-0 text-xl text-[#1ed760]" />
        </div>
      </div>
    );
  }

  const { isPlaying, item } = trackInfo;
  const spotifyIcon = <SiSpotify className="shrink-0 text-xl text-[#1ed760]" />;

  // No song playing state
  if (!isPlaying || !item) {
    return (
      <div className="border rounded-xl clickable flex w-80 items-center justify-between rounded-md p-4">
        <div className="flex items-center gap-13 justify-between">
          <p>No song is currently playing</p>
          {spotifyIcon}
        </div>
      </div>
    );
  }

  // Error state
  if (trackInfo.error) {
    return (
      <div className="border rounded-xl clickable flex w-80 items-center justify-between rounded-md p-4">
        <div className="flex items-center justify-between">
          <p className="text-red-500">{trackInfo.error}</p>
          {spotifyIcon}
        </div>
      </div>
    );
  }

  // Currently playing state
  const {
    trackUrl,
    trackName,
    albumName,
    artistName,
    albumImageUrl,
    durationMs,
  } = item;

  return (
    <div
      className={clsx(
        "max-h-20 transition-[max-height] duration-300",
        isPlaying && "max-h-40"
      )}
    >
      <Link
        href={trackUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-xl border clickable peer flex w-80 items-center gap-4 p-2"
      >
        <div className="grid px-3 py-2 outline-none w-full gap-4">
          <div className="flex gap-4">
            {albumImageUrl && (
              <div className="flex-shrink-0">
                <Image
                  className="border-transparent rounded-xl h-16 w-16"
                  title={albumName}
                  src={`/api/spotify/image-proxy?url=${encodeURIComponent(albumImageUrl)}`}
                  alt={albumName}
                  width={64}
                  height={64}
                />
              </div>
            )}
            <div className="flex h-full min-w-0 flex-1 flex-col justify-between">
              <div className="grid h-full [&>p>span]:text-gray-700 dark:[&>p>span]:text-gray-200">
                <div className="flex justify-between gap-2 truncate">
                  <p className="truncate text-sm font-medium" title={trackName}>
                    {trackName}
                  </p>
                  {spotifyIcon}
                </div>
                <p
                  className="truncate text-xs text-gray-600 dark:text-gray-300"
                  title={artistName}
                >
                  by <span>{artistName}</span>
                </p>
                <p
                  className="w-10/12 truncate text-xs text-gray-600 dark:text-gray-300"
                  title={albumName}
                >
                  on <span>{albumName}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <div className="relative h-1 rounded-full bg-gray-300 dark:bg-gray-600">
              <div
                className={`h-1 rounded-full ${colors.gradients.primary.replace('bg-', '')} transition-[width] duration-300`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>{formatMilisecondsToPlayback(currentPlaybackTime)}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
