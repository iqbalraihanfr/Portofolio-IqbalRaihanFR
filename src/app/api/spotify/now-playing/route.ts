import { NextResponse } from 'next/server';

// Function to get a fresh access token using client credentials
async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  try {
    // First try to refresh the access token
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken!,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh access token');
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      next: { revalidate: 5 } // Cache for 5 seconds to avoid rate limiting
    });

    // Spotify returns 204 when nothing is playing. 200 means a track is playing.
    if (response.status === 204) {
      return new NextResponse(JSON.stringify({ 
        isPlaying: false,
        item: null
      }), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=5, stale-while-revalidate=5'
        }
      });
    }

    if (!response.ok) {
      console.error('Spotify API error:', response.status, response.statusText);
      return new NextResponse(JSON.stringify({ 
        isPlaying: false,
        error: 'Failed to fetch currently playing track'
      }), { status: response.status });
    }

    const data = await response.json();
    
    if (!data.item) {
      return new NextResponse(JSON.stringify({ 
        isPlaying: false,
        item: null
      }), { status: 200 });
    }

    return new NextResponse(JSON.stringify({
      isPlaying: data.is_playing,
      item: {
        trackUrl: data.item.external_urls.spotify,
        trackName: data.item.name,
        albumName: data.item.album.name,
        artistName: data.item.artists.map((a: any) => a.name).join(', '),
        albumImageUrl: data.item.album.images[0]?.url,
        durationMs: data.item.duration_ms,
        progressMs: data.progress_ms || 0
      }
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=5, stale-while-revalidate=5'
      }
    });
  } catch (error) {
    console.error('Error in Spotify API route:', error);
    return new NextResponse(JSON.stringify({ 
      isPlaying: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}