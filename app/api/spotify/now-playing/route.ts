import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.accessToken) {
    return new NextResponse('Not authenticated', { status: 401 });
  }

  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        'Authorization': `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 204) {
      return new NextResponse(JSON.stringify({ isPlaying: false }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!response.ok) {
      throw new Error('Failed to fetch currently playing track');
    }

    const data = await response.json();
    return NextResponse.json({
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
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}