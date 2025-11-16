'use client';

import { useEffect, useState, useRef } from 'react';

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: any;
  }
}

export function SpotifyPlayer() {
  const [isReady, setIsReady] = useState(false);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [status, setStatus] = useState('Initializing Spotify player...');
  const [isPaused, setIsPaused] = useState(true);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const playerRef = useRef<any>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Check if we just got authorized
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('authorized') === 'true') {
        console.log('✅ [SpotifyPlayer] Authorization successful, triggering retry...');
        // Clean up the URL
        window.history.replaceState({}, '', window.location.pathname);
        // Trigger a retry
        setRetryCount(prev => prev + 1);
      }
    }
  }, []);

  useEffect(() => {
    console.log('🎵 [SpotifyPlayer] Initializing player... (retry:', retryCount, ')');
    
    // Prevent duplicate player creation
    if (playerRef.current) {
      console.log('⚠️ [SpotifyPlayer] Player already exists, disconnecting old one');
      playerRef.current.disconnect();
      playerRef.current = null;
    }
    
    // Load Spotify Web Playback SDK (only once)
    if (!document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      document.body.appendChild(script);
      console.log('📦 [SpotifyPlayer] Loading SDK script...');
    }

    window.onSpotifyWebPlaybackSDKReady = async () => {
      console.log('📦 [SpotifyPlayer] SDK loaded');
      setStatus('SDK loaded. Getting access token...');
      
      try {
        console.log('🔑 [SpotifyPlayer] Fetching token...');
        const res = await fetch('/api/spotify/token');
        console.log('📡 [SpotifyPlayer] Token response status:', res.status);
        
        if (!res.ok) {
          console.error('❌ [SpotifyPlayer] Not authorized');
          setStatus('❌ Not authorized. Click CONNECT SPOTIFY button below.');
          setIsConnected(false);
          return;
        }

        const data = await res.json();
        const token = data.access_token;
        console.log('✅ [SpotifyPlayer] Got access token');

        const player = new window.Spotify.Player({
          name: 'Stupid Spotify Web Player',
          getOAuthToken: (cb: (token: string) => void) => { cb(token); },
          volume: 0.7
        });

        playerRef.current = player;

        // Error handling
        player.addListener('initialization_error', ({ message }: any) => {
          console.error('Init error:', message);
          setStatus(`❌ Init error: ${message}`);
        });

        player.addListener('authentication_error', ({ message }: any) => {
          console.error('Auth error:', message);
          setStatus(`❌ Auth error: ${message}`);
        });

        player.addListener('account_error', ({ message }: any) => {
          console.error('Account error:', message);
          setStatus(`❌ Need Spotify Premium: ${message}`);
        });

        player.addListener('playback_error', ({ message }: any) => {
          console.error('Playback error:', message);
          setStatus(`❌ Playback error: ${message}`);
        });

        // Player ready
        player.addListener('ready', ({ device_id }: any) => {
          console.log('✅ [SpotifyPlayer] Player ready! Device ID:', device_id);
          setDeviceId(device_id);
          setIsReady(true);
          setIsConnected(true);
          setStatus(`✅ Spotify player ready!`);
          
          // Store device ID globally so playRandomSong can use it
          if (typeof window !== 'undefined') {
            (window as any).spotifyDeviceId = device_id;
            console.log('✅ [SpotifyPlayer] Device ID stored globally:', device_id);
          }
        });

        player.addListener('not_ready', ({ device_id }: any) => {
          console.log('❌ [SpotifyPlayer] Device went offline:', device_id);
          setIsReady(false);
          setStatus('⚠️ Player went offline');
        });

        // Track changes
        player.addListener('player_state_changed', (state: any) => {
          if (state) {
            const track = state.track_window.current_track;
            const paused = state.paused;
            setIsPaused(paused);
            
            if (track) {
              const trackName = `${track.name} - ${track.artists.map((a: any) => a.name).join(', ')}`;
              setCurrentTrack(trackName);
              setStatus(`🎵 ${paused ? 'Paused: ' : 'Playing: '}${trackName}`);
            }
          }
        });

        // Connect
        console.log('🔌 [SpotifyPlayer] Connecting to Spotify...');
        await player.connect();
        console.log('✅ [SpotifyPlayer] Player connected');
      } catch (error) {
        console.error('💥 [SpotifyPlayer] Error initializing player:', error);
        setStatus('❌ Error: Click CONNECT SPOTIFY button below');
        setIsConnected(false);
      }
    };

    return () => {
      if (playerRef.current) {
        console.log('🔌 [SpotifyPlayer] Disconnecting player...');
        playerRef.current.disconnect();
      }
    };
  }, [retryCount]);

  const handlePause = async () => {
    if (playerRef.current) {
      await playerRef.current.pause();
      setIsPaused(true);
      setStatus('⏸️ Paused');
    }
  };

  const handleResume = async () => {
    if (playerRef.current) {
      await playerRef.current.resume();
      setIsPaused(false);
      setStatus('▶️ Playing...');
    }
  };

  const handleTogglePlay = async () => {
    // If no track is loaded yet, start playing a random song
    if (!currentTrack || isPaused) {
      // Try to resume first
      if (currentTrack && playerRef.current) {
        await handleResume();
      } else {
        // No track loaded, play a random one
        await handleNext();
      }
    } else {
      await handlePause();
    }
  };

  const handleNext = async () => {
    setStatus('⏭️ Loading next trash song...');
    try {
      const url = deviceId 
        ? `/api/spotify/play-random?device_id=${encodeURIComponent(deviceId)}`
        : '/api/spotify/play-random';
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (!response.ok) {
        setStatus('❌ Failed to load next song');
      }
    } catch (error) {
      console.error('Error playing next song:', error);
      setStatus('❌ Error loading next song');
    }
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
        borderTop: '8px ridge #ff00ff',
        boxShadow: '0 -8px 0px #00ffff, 0 -16px 0px rgba(255,0,255,0.3), 0 -4px 30px rgba(255,0,255,0.5)',
      }}
    >
      {/* Main player container */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          
          {/* Left side - Status/Track info */}
          <div className="flex-1 min-w-0">
            <div 
              className="p-3 border-4 border-lime-400 rounded"
              style={{
                background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)',
                boxShadow: '0 0 10px lime, inset 0 0 5px rgba(0,255,0,0.3)',
              }}
            >
              <div className="flex items-center gap-3">
                {/* Animated music icon */}
                <div className="text-4xl animate-bounce">
                  {isPaused ? '⏸️' : '🎵'}
                </div>
                
                <div className="flex-1 min-w-0">
                  {/* Connection status */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold" style={{
                      color: isConnected ? '#00ff00' : '#ff0000',
                      textShadow: isConnected ? '0 0 5px #00ff00' : '0 0 5px #ff0000',
                      fontFamily: '"Courier New", monospace'
                    }}>
                      {isConnected ? '● ONLINE' : '● OFFLINE'}
                    </span>
                    <span className="text-xs text-white/60" style={{ fontFamily: '"Arial", sans-serif' }}>
                      |
                    </span>
                    <span className="text-xs font-bold text-purple-400" style={{ fontFamily: '"Impact", sans-serif' }}>
                      STUPID SPOTIFY™
                    </span>
                  </div>
                  
                  {/* Now playing */}
                  {currentTrack && (
                    <div className="mb-1 overflow-hidden">
                      <div 
                        className="text-white font-bold text-sm whitespace-nowrap inline-block animate-marquee"
                        style={{ fontFamily: '"Arial Black", sans-serif' }}
                      >
                        🎶 {currentTrack} 🎶 {currentTrack} 🎶
                      </div>
                    </div>
                  )}
                  
                  {/* Status text */}
                  <p 
                    className="text-xs text-cyan-300 truncate"
                    style={{ fontFamily: '"Courier New", monospace' }}
                  >
                    {status}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Center - Main controls */}
          {isReady && (
            <div className="flex items-center gap-3">
              {/* Skip button - SLANTED */}
              <button
                onClick={handleNext}
                className="p-4 font-black text-2xl border-4 border-black transform hover:scale-110 active:scale-95 transition-transform"
                style={{
                  background: 'linear-gradient(135deg, #ff00ff, #ff00aa)',
                  boxShadow: '6px 6px 0px #000, 0 0 20px rgba(255,0,255,0.6)',
                  fontFamily: '"Comic Sans MS", cursive',
                  transform: 'rotate(-8deg) skewX(-5deg)',
                  clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
                  width: '70px',
                  height: '70px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Next Random Song"
              >
                ⏭️
              </button>
              
              {/* Giant play/pause button - SLANTED & STUPID */}
              <button
                onClick={handleTogglePlay}
                className="p-4 font-black text-4xl border-8 border-black transform hover:scale-110 active:scale-90 transition-transform"
                style={{
                  background: isPaused 
                    ? 'linear-gradient(135deg, #00ff00 0%, #00cc00 50%, #lime 100%)' 
                    : 'linear-gradient(135deg, #ff0000 0%, #cc0000 50%, #ff00ff 100%)',
                  boxShadow: isPaused 
                    ? '8px 8px 0px #000, 12px 12px 0px rgba(0,0,0,0.5), 0 0 40px rgba(0,255,0,0.9)' 
                    : '8px 8px 0px #000, 12px 12px 0px rgba(0,0,0,0.5), 0 0 40px rgba(255,0,0,0.9)',
                  animation: isPaused ? 'none' : 'pulse 0.8s infinite',
                  width: '100px',
                  height: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'rotate(3deg) skewY(-2deg)',
                  clipPath: 'polygon(5% 10%, 95% 0%, 100% 90%, 10% 100%)',
                  fontFamily: '"Impact", sans-serif',
                  textShadow: '3px 3px 0px rgba(0,0,0,0.8)',
                  letterSpacing: '-2px',
                }}
              >
                {isPaused ? '▶' : '⏸'}
              </button>
              
              {/* Random button - SLANTED OPPOSITE */}
              <button
                onClick={handleNext}
                className="p-4 font-black text-2xl border-4 border-black transform hover:scale-110 active:scale-95 transition-transform"
                style={{
                  background: 'linear-gradient(135deg, #00ffff, #0088ff)',
                  boxShadow: '6px 6px 0px #000, 0 0 20px rgba(0,255,255,0.6)',
                  fontFamily: '"Comic Sans MS", cursive',
                  transform: 'rotate(8deg) skewX(5deg)',
                  clipPath: 'polygon(0% 0%, 90% 0%, 100% 100%, 10% 100%)',
                  width: '70px',
                  height: '70px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Random Song"
              >
                🎲
              </button>
            </div>
          )}

          {/* Right side - Fake visualizer */}
          <div className="hidden md:flex items-end gap-1 h-16 p-2 border-4 border-cyan-400 rounded" style={{
            background: 'linear-gradient(180deg, #000 0%, #0a0a0a 100%)',
            boxShadow: '0 0 10px cyan, inset 0 0 5px rgba(0,255,255,0.3)',
          }}>
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-2 rounded-t"
                style={{
                  height: `${Math.random() * 80 + 20}%`,
                  background: 'linear-gradient(to top, #ff00ff, #00ffff)',
                  animation: !isPaused ? `bounce ${0.3 + Math.random() * 0.5}s ease-in-out infinite alternate` : 'none',
                  boxShadow: '0 0 5px rgba(255,0,255,0.5)',
                }}
              />
            ))}
          </div>

          {/* Connect button if not ready */}
          {!isConnected && (
            <div className="flex-shrink-0">
              <a
                href="/api/spotify/login"
                className="block py-3 px-6 text-center font-black text-lg border-6 border-black rounded-full transform hover:scale-110 active:scale-95 transition-transform"
                style={{
                  background: 'linear-gradient(135deg, #ff0000, #ff6600)',
                  boxShadow: '6px 6px 0px #000, 0 0 30px rgba(255,0,0,0.8)',
                  fontFamily: '"Impact", sans-serif',
                  textShadow: '2px 2px 0px rgba(0,0,0,0.8)',
                  animation: 'pulse 2s infinite',
                }}
              >
                🔗 CONNECT SPOTIFY!!!
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
