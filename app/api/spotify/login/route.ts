import { NextRequest, NextResponse } from 'next/server';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '27f81310e38146e292262f55398e4a53';
const SCOPE = 'playlist-read-private user-modify-playback-state user-read-playback-state streaming';

// Get redirect URI from env or dynamically construct it
function getRedirectUri(): string {
  if (process.env.SPOTIFY_REDIRECT_URI) {
    return process.env.SPOTIFY_REDIRECT_URI;
  }
  // Fallback to localhost for local dev
  return 'http://127.0.0.1:3000/api/spotify/callback';
}

export async function GET(request: NextRequest) {
  const redirectUri = getRedirectUri();
  
  console.log('🔐 [login] Login request received');
  console.log('🔐 [login] CLIENT_ID:', CLIENT_ID);
  console.log('🔐 [login] REDIRECT_URI:', redirectUri);
  console.log('🔐 [login] SCOPE:', SCOPE);
  
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: SCOPE,
    show_dialog: 'true'
  });

  const url = `https://accounts.spotify.com/authorize?${params.toString()}`;
  console.log('🔐 [login] Redirecting to:', url);
  return NextResponse.redirect(url);
}
