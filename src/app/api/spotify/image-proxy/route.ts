import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');

  if (!url) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  try {
    const res = await fetch(url, {
      // Spotify images are public, no auth necessary
      next: { revalidate: 60 * 60 * 24 }, // cache 24h at edge
    });

    if (!res.ok || !res.body) {
      return new NextResponse('Failed to fetch image', { status: 500 });
    }

    // Pass through the content type header if available
    const contentType = res.headers.get('content-type') ?? 'image/jpeg';

    return new NextResponse(res.body, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
        'Cross-Origin-Resource-Policy': 'same-site',
      },
    });
  } catch (err) {
    console.error('Image proxy error', err);
    return new NextResponse('Internal error', { status: 500 });
  }
}
