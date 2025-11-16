import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken, isTokenExpired, getRefreshToken, setTokens } from '@/lib/spotifyTokens';
import { cookies } from 'next/headers';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '27f81310e38146e292262f55398e4a53';
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || '14255e976b434c58ad692ca18d64a252';
const PLAYLIST_ID = process.env.SPOTIFY_PLAYLIST_ID || '5xbMyvLwLbtlhKuAOfWpsa';

async function refreshAccessToken(refreshToken: string) {
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

async function getValidAccessToken() {
  // Check cookies first
  const cookieStore = await cookies();
  const cookieAccessToken = cookieStore.get('spotify_access_token')?.value;
  const cookieRefreshToken = cookieStore.get('spotify_refresh_token')?.value;
  
  if (cookieAccessToken && cookieRefreshToken) {
    setTokens(cookieAccessToken, cookieRefreshToken, 3600);
  }
  
  let token = getAccessToken();
  if (isTokenExpired() || !token) {
    const refreshToken = getRefreshToken() || cookieRefreshToken;
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    token = await refreshAccessToken(refreshToken);
  }
  return token;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const deviceId = searchParams.get('device_id');

  console.log('🎵 [play-random] Starting playback request...');
  console.log('📱 [play-random] Device ID:', deviceId);

  try {
    // Get valid access token
    console.log('🔑 [play-random] Getting access token...');
    const accessToken = await getValidAccessToken();
    console.log('✅ [play-random] Got access token:', accessToken ? `${accessToken.substring(0, 20)}...` : 'null');

    // Get playlist tracks
    console.log('📋 [play-random] Fetching playlist tracks...');
    const playlistResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks?limit=100`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    console.log('📡 [play-random] Playlist response status:', playlistResponse.status);

    if (!playlistResponse.ok) {
      const errorText = await playlistResponse.text();
      console.error('❌ [play-random] Failed to fetch playlist:', errorText);
      throw new Error('Failed to fetch playlist');
    }

    const playlistData = await playlistResponse.json();
    const tracks = playlistData.items.filter((item: any) => item.track && item.track.uri);
    console.log('🎵 [play-random] Found', tracks.length, 'tracks');

    if (tracks.length === 0) {
      console.error('❌ [play-random] No tracks found in playlist');
      return NextResponse.json({ error: 'No tracks found in playlist' }, { status: 400 });
    }

    // Pick random track
    const randomTrack = tracks[Math.floor(Math.random() * tracks.length)].track;
    console.log('🎲 [play-random] Selected track:', randomTrack.name, 'by', randomTrack.artists.map((a: any) => a.name).join(', '));

    // Play the track
    const playBody: any = {
      uris: [randomTrack.uri]
    };

    const playUrl = deviceId 
      ? `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`
      : 'https://api.spotify.com/v1/me/player/play';

    console.log('▶️ [play-random] Playing on:', playUrl);

    const playResponse = await fetch(playUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(playBody)
    });

    console.log('📡 [play-random] Play response status:', playResponse.status);

    if (!playResponse.ok) {
      const errorText = await playResponse.text();
      console.error('❌ [play-random] Play error:', playResponse.status, errorText);
      throw new Error(`Failed to play track: ${playResponse.status} - ${errorText}`);
    }

    console.log('✅ [play-random] Successfully started playback!');
    return NextResponse.json({
      success: true,
      track: {
        name: randomTrack.name,
        artists: randomTrack.artists.map((a: any) => a.name).join(', '),
        uri: randomTrack.uri
      }
    });
  } catch (error) {
    console.error('💥 [play-random] Error:', error);
    
    // Better error message for not authorized
    if (error instanceof Error && error.message.includes('No refresh token')) {
      return NextResponse.json(
        { error: 'not_authorized', details: 'Click the green CONNECT SPOTIFY button in the player widget first' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to connect to Spotify service', details: String(error) },
      { status: 500 }
    );
  }
}

