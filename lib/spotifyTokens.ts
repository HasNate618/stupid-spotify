// In-memory token storage (in production, use a database or session storage)
let tokenStore = {
  access_token: null as string | null,
  refresh_token: null as string | null,
  expires_at: 0,
};

export function setTokens(accessToken: string, refreshToken: string, expiresIn: number) {
  tokenStore.access_token = accessToken;
  tokenStore.refresh_token = refreshToken;
  tokenStore.expires_at = Date.now() + (expiresIn * 1000) - 60000; // Refresh 1 min early
  console.log('🔑 [tokenStore] Tokens stored:', {
    hasAccessToken: !!accessToken,
    hasRefreshToken: !!refreshToken,
    expiresIn,
    expiresAt: new Date(tokenStore.expires_at).toISOString()
  });
}

export function getAccessToken() {
  console.log('🔑 [tokenStore] Getting access token:', tokenStore.access_token ? 'exists' : 'null');
  return tokenStore.access_token;
}

export function getRefreshToken() {
  console.log('🔑 [tokenStore] Getting refresh token:', tokenStore.refresh_token ? 'exists' : 'null');
  return tokenStore.refresh_token;
}

export function isTokenExpired() {
  const expired = Date.now() >= tokenStore.expires_at;
  console.log('🔑 [tokenStore] Token expired?', expired);
  return expired;
}

export function hasTokens() {
  const has = !!(tokenStore.access_token || tokenStore.refresh_token);
  console.log('🔑 [tokenStore] Has tokens?', has);
  return has;
}
