import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken, getRefreshToken, isTokenExpired, setTokens, hasTokens } from '@/lib/spotifyTokens';
import { cookies } from 'next/headers';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '27f81310e38146e292262f55398e4a53';
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || '14255e976b434c58ad692ca18d64a252';

async function refreshAccessToken(refreshToken: string) {
  console.log('🔄 [token] Refreshing access token...');
  
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  const data = await response.json();
  setTokens(data.access_token, refreshToken, data.expires_in);
  return data.access_token;
}

export async function GET() {
  try {
    console.log('🔑 [token] Token request received');
    
    // ONLY use cookies - never use global in-memory tokens
    const cookieStore = await cookies();
    const cookieAccessToken = cookieStore.get('spotify_access_token')?.value;
    const cookieRefreshToken = cookieStore.get('spotify_refresh_token')?.value;
    
    console.log('🍪 [token] Cookie tokens:', {
      hasAccessToken: !!cookieAccessToken,
      hasRefreshToken: !!cookieRefreshToken
    });
    
    if (!cookieAccessToken || !cookieRefreshToken) {
      console.error('❌ [token] No tokens available in cookies');
      return NextResponse.json({ error: 'not_authorized' }, { status: 401 });
    }

    // For simplicity, return the cookie token directly
    // In production, check expiration and refresh if needed
    console.log('✅ [token] Returning access token from cookies');
    return NextResponse.json({ access_token: cookieAccessToken });
  } catch (error) {
    console.error('💥 [token] Error:', error);
    return NextResponse.json({ error: 'token_error' }, { status: 500 });
  }
}

