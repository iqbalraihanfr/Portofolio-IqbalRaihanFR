// pages/api/spotify/image-proxy.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import https from 'https';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).send('Missing URL');
  }

  https.get(url, (stream) => {
    res.setHeader('Content-Type', 'image/jpeg'); // atau sesuaikan dengan MIME Spotify
    stream.pipe(res);
  }).on('error', () => {
    res.status(500).send('Failed to fetch image');
  });
}