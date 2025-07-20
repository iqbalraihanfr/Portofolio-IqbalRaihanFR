# Spotify Integration Setup

This guide will help you set up the Spotify integration for your portfolio website.

## Prerequisites

1. A Spotify Developer account
2. A registered application in the Spotify Developer Dashboard

## Setup Steps

### 1. Create a Spotify Application

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
2. Click "Create an App"
3. Fill in the following details:
   - App name: Your Portfolio
   - App description: Spotify integration for my portfolio
   - Website: Your portfolio URL (e.g., https://yourportfolio.com)
   - Redirect URI: `http://localhost:3000/api/auth/callback/spotify` (for development)
   - Also add your production URL when deploying

### 2. Set Up Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Spotify
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_a_secure_random_string_here
```

### 3. Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install next-auth @spotify/web-api-ts-sdk
```

### 4. Update Spotify App Settings

1. Go back to your Spotify Developer Dashboard
2. Click on your app
3. Go to "Settings"
4. Add the following redirect URIs:
   - `http://localhost:3000/api/auth/callback/spotify`
   - `https://yourdomain.com/api/auth/callback/spotify` (your production domain)

### 5. Using the NowPlaying Component

To add the Spotify player to any page, simply import and use the `NowPlaying` component:

```tsx
import NowPlaying from '@/components/spotify/NowPlaying';

export default function YourPage() {
  return (
    <div>
      <h2>Now Playing</h2>
      <NowPlaying />
    </div>
  );
}
```

## How It Works

1. The component first checks if the user is authenticated with Spotify
2. If not, it shows a "Connect Spotify" button
3. When connected, it initializes the Spotify Web Playback SDK
4. The player shows the currently playing track with album art and progress bar
5. The track updates in real-time as you play/pause or change tracks

## Troubleshooting

- **CORS Issues**: Ensure your `next.config.mjs` has the correct CORS headers
- **Authentication Errors**: Verify your Spotify app's redirect URIs match exactly
- **Playback Issues**: Make sure you have Spotify Premium (required for Web Playback SDK)
- **No Sound**: Check if your browser has autoplay permissions for the site

## Deployment

When deploying to production:

1. Update the `NEXTAUTH_URL` in your production environment variables
2. Add your production domain to the Spotify app's redirect URIs
3. Ensure your domain is HTTPS (required for service workers)

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your `SPOTIFY_CLIENT_SECRET` and `NEXTAUTH_SECRET` secure
- Use environment variables in your deployment platform
- Consider rate limiting the authentication endpoints in production
