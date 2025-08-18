// Server-side Spotify helper utilities.
// All credentials come from environment variables and are **never** exposed to the client.
// We keep a simple in-memory cache of the access token to avoid exchanging the
// refresh token on every request.

const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

if (!SPOTIFY_REFRESH_TOKEN || !SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
  throw new Error('Missing Spotify environment variables');
}

let cachedAccessToken: string | null = null;
let accessTokenExpiresAt = 0; // epoch ms

/**
 * Exchange refresh token for access token, using basic-auth header.
 * Result is cached in module scope until expiry.
 */
export async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedAccessToken && now < accessTokenExpiresAt) {
    return cachedAccessToken;
  }

  const basicAuth = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', SPOTIFY_REFRESH_TOKEN!);

  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${basicAuth}`,
    },
    body: params.toString(),
  });

  if (!tokenRes.ok) {
    console.error('Failed to refresh Spotify token', await tokenRes.text());
    throw new Error('Unable to refresh Spotify access token');
  }
  const tokenData: { access_token: string; expires_in: number } = await tokenRes.json();

  cachedAccessToken = tokenData.access_token;
  accessTokenExpiresAt = now + tokenData.expires_in * 1000 - 60 * 1000; // subtract 1min buffer

  return cachedAccessToken;
}

/**
 * Fetch the currently playing track from the owner account.
 * Returns a safe subset of the data for the client.
 */
export async function getNowPlaying() {
  const token = await getAccessToken();
  const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 204 || res.status === 205) {
    return { isPlaying: false };
  }

  if (!res.ok) {
    console.error('Spotify now-playing error', res.status, await res.text());
    throw new Error('Failed to fetch now playing');
  }

  const data = await res.json();
  const item = data.item;
  return {
    isPlaying: data.is_playing,
    title: item?.name ?? null,
    artist: item?.artists?.map((a: any) => a.name).join(', ') ?? null,
    albumImageUrl: item?.album?.images?.[0]?.url ?? null,
    songUrl: item?.external_urls?.spotify ?? null,
  };
}

