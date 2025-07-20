'use client';

import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { SpotifyCard } from './SpotifyCard';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    error?: string;
  }
}

export default function NowPlaying() {
  const { data: session } = useSession();

  if (!session?.accessToken) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow w-80 text-center">
        <button
          onClick={() => signIn('spotify')}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors mx-auto"
        >
          <span className="text-white">Connect with Spotify</span>
        </button>
      </div>
    );
  }

  return <SpotifyCard />;
}