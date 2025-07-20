'use client';

import { useEffect, useState } from 'react';
import { SiSpotify } from 'react-icons/si';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';

interface TrackInfo {
  isPlaying: boolean;
  item?: {
    name: string;
    album: {
      name: string;
      images: { url: string }[];
    };
    artists: { name: string }[];
    external_urls: {
      spotify: string;
    };
    duration_ms: number;
    progress_ms: number;
  };
  error?: string;
}

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`;
}

export function SpotifyCard() {
  const { data: session } = useSession();
  const [trackInfo, setTrackInfo] = useState<TrackInfo>({ isPlaying: false });
  const [progress, setProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!session?.accessToken || !trackInfo.item) return;

    const interval = setInterval(() => {
      if (trackInfo.isPlaying && trackInfo.item) {
        setProgress(prev => {
          const newProgress = prev + 1000;
          return newProgress > trackInfo.item!.duration_ms ? 0 : newProgress;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [session, trackInfo]);

  useEffect(() => {
    if (!session?.accessToken) return;

    const fetchCurrentlyPlaying = async () => {
      try {
        const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
          headers: {
            'Authorization': `Bearer ${session.accessToken}`
          }
        });

        if (response.status === 204) {
          setTrackInfo({ isPlaying: false });
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch currently playing track');
        }

        const data = await response.json();
        setTrackInfo({
          isPlaying: data.is_playing,
          item: {
            name: data.item.name,
            album: {
              name: data.item.album.name,
              images: data.item.album.images
            },
            artists: data.item.artists,
            external_urls: data.item.external_urls,
            duration_ms: data.item.duration_ms,
            progress_ms: data.progress_ms
          }
        });
        setProgress(data.progress_ms);
      } catch (error) {
        console.error('Error fetching currently playing track:', error);
        setTrackInfo({
          isPlaying: false,
          error: 'Failed to load track information'
        });
      }
    };

    fetchCurrentlyPlaying();
    const interval = setInterval(fetchCurrentlyPlaying, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [session]);

  if (!isClient) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow w-80">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    );
  }

  if (!session?.accessToken) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow w-80 text-center">
        <button
          onClick={() => signIn('spotify')}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors mx-auto"
        >
          <SiSpotify className="text-xl" />
          Connect with Spotify
        </button>
      </div>
    );
  }

  const { item, isPlaying } = trackInfo;
  const progressPercentage = item ? (progress / item.duration_ms) * 100 : 0;

  if (!item) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow w-80 flex items-center justify-between">
        <p className="text-gray-700 dark:text-gray-300">No song is currently playing</p>
        <SiSpotify className="text-green-500 text-xl" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow w-80 overflow-hidden transition-all duration-300">
      <Link 
        href={item.external_urls.spotify} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="p-4">
          <div className="flex items-start gap-4">
            <div className="relative flex-shrink-0">
              {item.album.images[0]?.url && (
                <Image
                  src={item.album.images[0].url}
                  alt={`${item.name} album cover`}
                  width={64}
                  height={64}
                  className="rounded"
                />
              )}
              {isPlaying && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 dark:text-white truncate">{item.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                {item.artists.map(artist => artist.name).join(', ')}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {item.album.name}
              </p>
            </div>
            <SiSpotify className="text-green-500 text-xl flex-shrink-0 mt-1" />
          </div>
          
          {isPlaying && (
            <div className="mt-3">
              <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-1000 ease-linear"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>{formatDuration(progress)}</span>
                <span>{formatDuration(item.duration_ms)}</span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
