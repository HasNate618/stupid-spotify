import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('spotify_access_token');
  const refreshToken = cookieStore.get('spotify_refresh_token');
  
  return NextResponse.json({
    hasCookies: {
      accessToken: !!accessToken?.value,
      refreshToken: !!refreshToken?.value
    },
    cookies: {
      accessToken: accessToken?.value?.substring(0, 20) + '...' || 'none',
      refreshToken: refreshToken?.value?.substring(0, 20) + '...' || 'none'
    }
  });
}
