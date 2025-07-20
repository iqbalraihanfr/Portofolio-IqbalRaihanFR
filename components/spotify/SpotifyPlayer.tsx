'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: any;
  }
}

interface SpotifyPlayerProps {
  accessToken: string;
  onPlayerStateChange: (state: any) => void;
}

export default function SpotifyPlayer({ accessToken, onPlayerStateChange }: SpotifyPlayerProps) {
  const playerRef = useRef<any>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Portfolio Player',
        getOAuthToken: (cb: (token: string) => void) => {
          cb(accessToken);
        },
        volume: 0.5,
      });

      player.addListener('ready', ({ device_id }: { device_id: string }) => {
        console.log('Ready with Device ID', device_id);
        setDeviceId(device_id);
        
        // Transfer playback to this device
        fetch('https://api.spotify.com/v1/me/player', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            device_ids: [device_id],
            play: true
          })
        });
      });

      player.addListener('player_state_changed', (state: any) => {
        if (!state) return;
        onPlayerStateChange({
          isPlaying: !state.paused,
          track: state.track_window?.current_track,
          progress: state.position,
          duration: state.duration
        });
      });

      player.connect().then((success: boolean) => {
        if (success) {
          console.log('Connected to Spotify Web Playback SDK');
        }
      });

      playerRef.current = player;

      return () => {
        if (playerRef.current) {
          playerRef.current.disconnect();
        }
      };
    };

    return () => {
      document.body.removeChild(script);
      if (playerRef.current) {
        playerRef.current.disconnect();
      }
    };
  }, [accessToken, onPlayerStateChange]);

  return null; // This component doesn't render anything visible
}
