'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import SpotifyPlayer from './SpotifyPlayer';
import { signIn } from 'next-auth/react';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    error?: string;
  }
}

interface TrackInfo {
  isPlaying: boolean;
  track?: {
    name: string;
    artists: Array<{ name: string }>;
    album: {
      name: string;
      images: Array<{ url: string }>;
    };
    external_urls: {
      spotify: string;
    };
  };
  progress?: number;
  duration?: number;
}

export default function NowPlaying() {
  const { data: session } = useSession();
  const [trackInfo, setTrackInfo] = useState<TrackInfo>({ isPlaying: false });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center space-x-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (session?.error === 'RefreshAccessTokenError') {
    // Handle token refresh error
    return (
      <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg text-center">
        <p className="mb-2">Sesi Spotify telah berakhir</p>
        <button
          onClick={() => signIn('spotify')}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Sambungkan Ulang Spotify
        </button>
      </div>
    );
  }

  if (!session?.accessToken) {
    return (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
        <button
          onClick={() => signIn('spotify')}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Connect Spotify
        </button>
      </div>
    );
  }

  return (
    <div>
      <SpotifyPlayer
        accessToken={session.accessToken as string}
        onPlayerStateChange={setTrackInfo}
      />
      
      {trackInfo.isPlaying && trackInfo.track ? (
        <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          {trackInfo.track.album.images[0]?.url && (
            <img
              src={trackInfo.track.album.images[0].url}
              alt={`${trackInfo.track.name} album cover`}
              className="w-16 h-16 rounded"
            />
          )}
          <div className="flex-1 min-w-0">
            <a
              href={trackInfo.track.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-900 dark:text-white truncate hover:underline block"
              title={trackInfo.track.name}
            >
              {trackInfo.track.name}
            </a>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {trackInfo.track.artists.map(artist => artist.name).join(', ')}
            </p>
            {trackInfo.duration && trackInfo.progress !== undefined && (
              <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                <div
                  className="bg-green-500 h-1.5 rounded-full"
                  style={{
                    width: `${(trackInfo.progress / trackInfo.duration) * 100}%`,
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
          <p className="text-gray-600 dark:text-gray-300">
            {trackInfo.isPlaying ? 'No track currently playing' : 'Playback paused'}
          </p>
        </div>
      )}
    </div>
  );
}