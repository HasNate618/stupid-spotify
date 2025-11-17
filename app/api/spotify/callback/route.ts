import { NextRequest, NextResponse } from 'next/server';
import { setTokens } from '@/lib/spotifyTokens';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '27f81310e38146e292262f55398e4a53';
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || '14255e976b434c58ad692ca18d64a252';

// Get redirect URI from env or dynamically construct it
function getRedirectUri(): string {
  if (process.env.SPOTIFY_REDIRECT_URI) {
    return process.env.SPOTIFY_REDIRECT_URI;
  }
  // Fallback to localhost for local dev
  return 'http://127.0.0.1:3000/api/spotify/callback';
}

function getBaseUrl(request: NextRequest): string {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = request.headers.get('host') || 'localhost:3000';
  return `${protocol}://${host}`;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const baseUrl = getBaseUrl(request);

  // Log to stderr which always shows in terminal
  process.stderr.write('🔐 [callback] Authorization callback received\n');
  process.stderr.write(`🔐 [callback] Code: ${code ? 'present' : 'missing'}\n`);
  process.stderr.write(`🔐 [callback] Error: ${error}\n`);

  if (error) {
    process.stderr.write(`❌ [callback] Authorization error: ${error}\n`);
    return NextResponse.redirect(`${baseUrl}?error=${error}`);
  }

  if (!code) {
    process.stderr.write('❌ [callback] No authorization code\n');
    return NextResponse.redirect(`${baseUrl}?error=no_code`);
  }

  try {
    const redirectUri = getRedirectUri();
    process.stderr.write('🔄 [callback] Exchanging code for tokens...\n');
    process.stderr.write(`🔄 [callback] Using redirect_uri: ${redirectUri}\n`);
    
    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri
      })
    });

    process.stderr.write(`📡 [callback] Token response status: ${tokenResponse.status}\n`);

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      process.stderr.write(`❌ [callback] Token exchange error: ${JSON.stringify(errorData)}\n`);
      throw new Error('Failed to exchange code for token');
    }

    const tokenData = await tokenResponse.json();
    process.stderr.write('✅ [callback] Got tokens from Spotify\n');

    // Store tokens in memory
    setTokens(tokenData.access_token, tokenData.refresh_token, tokenData.expires_in);
    process.stderr.write('✅ [callback] Tokens stored successfully\n');

    // Also store in a cookie so they survive page reloads
    const response = NextResponse.redirect(`${baseUrl}?authorized=true`);
    
    // Set httpOnly cookies for security
    response.cookies.set('spotify_access_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: tokenData.expires_in,
      path: '/'
    });
    
    response.cookies.set('spotify_refresh_token', tokenData.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    });
    
    process.stderr.write('✅ [callback] Tokens stored in cookies\n');

    // Redirect back to home page with success
    return response;
  } catch (error) {
    process.stderr.write(`💥 [callback] Authorization error: ${error}\n`);
    return NextResponse.redirect(`${baseUrl}?error=auth_failed`);
  }
}
