import { SpotifyApi } from '@spotify/web-api-ts-sdk';

export const spotifyApi = SpotifyApi.withUserAuthorization(
  process.env.SPOTIFY_CLIENT_ID!,
  process.env.NEXTAUTH_URL!,
  [
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-modify-playback-state',
    'streaming',
    'user-read-email',
    'user-read-private'
  ]
);

export const getNowPlaying = async (accessToken: string) => {
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (response.status === 204) {
    return { isPlaying: false };
  }

  return await response.json();
};
