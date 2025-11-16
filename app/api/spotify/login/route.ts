import { NextRequest, NextResponse } from 'next/server';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '27f81310e38146e292262f55398e4a53';
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || 'http://127.0.0.1:3000/api/spotify/callback';
const SCOPE = 'playlist-read-private user-modify-playback-state user-read-playback-state streaming';

export async function GET() {
  console.log('🔐 [login] Login request received');
  console.log('🔐 [login] CLIENT_ID:', CLIENT_ID);
  console.log('🔐 [login] REDIRECT_URI:', REDIRECT_URI);
  console.log('🔐 [login] SCOPE:', SCOPE);
  
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: SCOPE,
    show_dialog: 'true'
  });

  const url = `https://accounts.spotify.com/authorize?${params.toString()}`;
  console.log('🔐 [login] Redirecting to:', url);
  return NextResponse.redirect(url);
}
