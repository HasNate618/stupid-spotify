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
        // Add a subtle repeating diagonal overlay that spans the full viewport width
        background: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 10px, transparent 10px, transparent 20px), linear-gradient(180deg, #ff00ff 0%, #00ffff 25%, #ffff00 50%, #00ff00 75%, #ff00ff 100%)',
        borderTop: '6px solid #000',
        boxShadow: '0 0 40px rgba(255,0,255,0.6)',
        backgroundRepeat: 'repeat',
      }}
    >
      {/* MEGA OBNOXIOUS HEADER BAR */}
      <div 
        className="w-full text-center py-1 overflow-hidden"
        style={{
          background: 'repeating-linear-gradient(90deg, #ff0000 0px, #ff7f00 10%, #ffff00 20%, #00ff00 30%, #0000ff 40%, #4b0082 50%, #9400d3 60%, #ff0000 100%)',
          borderBottom: '4px solid #000',
        }}
      >
        <div 
          className="text-white font-black text-sm whitespace-nowrap inline-block animate-marquee"
          style={{ fontFamily: '"Comic Sans MS", cursive' }}
        >
          ⚡ STUPID SPOTIFY PLAYER ⚡ NOW WITH 420% MORE CHAOS ⚡ GUARANTEED TO GASLIGHT YOUR EARS ⚡ NOT RESPONSIBLE FOR PERMANENT BRAIN DAMAGE ⚡ STUPID SPOTIFY PLAYER ⚡
        </div>
      </div>

      {/* Main player container */}
      <div className="max-w-7xl mx-auto px-4 py-4" style={{
        // inner container is now transparent so the full-width diagonal pattern from the outer container shows through
        background: 'transparent',
      }}>
        <div className="flex items-center gap-4">
          
          {/* Left side - Status/Track info */}
          <div className="flex-1 min-w-0">
            <div 
              className="p-4 border-8 border-double rounded-lg"
              style={{
                background: 'linear-gradient(135deg, #000 0%, #ff00ff 50%, #000 100%)',
                borderColor: '#00ff00 #ff00ff #ffff00 #00ffff',
                boxShadow: '0 0 20px #ff00ff, inset 0 0 10px rgba(255,0,255,0.5), 8px 8px 0px #000',
                transform: 'rotate(-1deg)',
              }}
            >
              <div className="flex items-center gap-3">
                {/* Animated music icon */}
                <div 
                  className="text-5xl"
                  style={{
                    animation: isPaused ? 'none' : 'spin 2s linear infinite, bounce 0.5s ease-in-out infinite',
                    filter: 'drop-shadow(0 0 10px #00ff00)',
                  }}
                >
                  {isPaused ? '😴' : '🎵'}
                </div>
                
                <div className="flex-1 min-w-0">
                  {/* Connection status */}
                  <div className="flex items-center gap-2 mb-2">
                    <span 
                      className="text-sm font-black px-3 py-1 border-4 border-black rounded-full"
                      style={{
                        background: isConnected ? 'linear-gradient(45deg, #00ff00, #00ff00)' : 'linear-gradient(45deg, #ff0000, #ff0000)',
                        color: '#000',
                        textShadow: isConnected ? '1px 1px 0px #00ff00' : '1px 1px 0px #ff0000',
                        fontFamily: '"Impact", sans-serif',
                        boxShadow: isConnected ? '0 0 15px #00ff00, 3px 3px 0px #000' : '0 0 15px #ff0000, 3px 3px 0px #000',
                        animation: isConnected ? 'pulse 2s infinite' : 'blink 1s infinite',
                      }}
                    >
                      {isConnected ? '● VIBING' : '● DEAD'}
                    </span>
                    <span 
                      className="text-lg font-black"
                      style={{ 
                        color: '#ffff00',
                        textShadow: '2px 2px 0px #ff00ff, -1px -1px 0px #00ffff',
                        fontFamily: '"Comic Sans MS", cursive',
                        letterSpacing: '0.05em',
                      }}
                    >
                      STUPID SPOTIFY™
                    </span>
                  </div>
                  
                  {/* Now playing */}
                  {currentTrack && (
                    <div 
                      className="mb-2 p-2 border-4 border-yellow-400 rounded overflow-hidden"
                      style={{
                        background: 'linear-gradient(90deg, #ff00ff, #00ffff)',
                        boxShadow: '0 0 10px #ffff00',
                      }}
                    >
                      <div 
                        className="text-black font-black text-base whitespace-nowrap inline-block animate-marquee"
                        style={{ 
                          fontFamily: '"Arial Black", sans-serif',
                          textShadow: '1px 1px 0px #fff',
                        }}
                      >
                        ♫ {currentTrack} ♫ {currentTrack} ♫ {currentTrack} ♫
                      </div>
                    </div>
                  )}
                  
                  {/* Status text */}
                  <p 
                    className="text-sm font-bold truncate px-2 py-1 border-2 border-cyan-400 rounded"
                    style={{ 
                      fontFamily: '"Courier New", monospace',
                      background: 'rgba(0,0,0,0.7)',
                      color: '#00ffff',
                      textShadow: '0 0 5px #00ffff',
                    }}
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
                className="p-4 font-black text-3xl border-6 border-black transform hover:scale-110 active:scale-95 transition-transform"
                style={{
                  background: 'repeating-linear-gradient(45deg, #ff00ff, #ff00ff 10px, #ffff00 10px, #ffff00 20px)',
                  boxShadow: '8px 8px 0px #000, 12px 12px 0px #00ffff, 0 0 25px rgba(255,0,255,0.8)',
                  fontFamily: '"Impact", sans-serif',
                  transform: 'rotate(-12deg) skewX(-8deg)',
                  clipPath: 'polygon(15% 0%, 100% 5%, 85% 100%, 0% 95%)',
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textShadow: '3px 3px 0px #000',
                }}
                title="Next Random Song"
              >
                ⏭️
              </button>
              
              {/* Giant play/pause button - ULTRA SLANTED & STUPID */}
              <button
                onClick={handleTogglePlay}
                className="p-6 font-black text-5xl border-8 transform hover:scale-110 active:scale-90 transition-transform"
                style={{
                  background: isPaused 
                    ? 'repeating-linear-gradient(135deg, #00ff00, #00ff00 15px, #ffff00 15px, #ffff00 30px)' 
                    : 'repeating-linear-gradient(135deg, #ff0000, #ff0000 15px, #ff00ff 15px, #ff00ff 30px)',
                  borderColor: isPaused ? '#ffff00' : '#ff00ff',
                  borderStyle: 'double',
                  boxShadow: isPaused 
                    ? '10px 10px 0px #000, 15px 15px 0px #ffff00, 0 0 50px rgba(0,255,0,0.9)' 
                    : '10px 10px 0px #000, 15px 15px 0px #ff00ff, 0 0 50px rgba(255,0,0,0.9)',
                  animation: isPaused ? 'none' : 'pulse 0.6s infinite, spin 3s linear infinite',
                  width: '120px',
                  height: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'rotate(5deg) skewY(-3deg)',
                  clipPath: 'polygon(8% 15%, 92% 5%, 95% 85%, 12% 95%)',
                  fontFamily: '"Comic Sans MS", cursive',
                  textShadow: '4px 4px 0px #000, -2px -2px 0px #fff',
                  letterSpacing: '-4px',
                }}
              >
                {isPaused ? '▶' : '⏸'}
              </button>
              
              {/* Random button - SLANTED OPPOSITE */}
              <button
                onClick={handleNext}
                className="p-4 font-black text-3xl border-6 border-black transform hover:scale-110 active:scale-95 transition-transform"
                style={{
                  background: 'repeating-linear-gradient(-45deg, #00ffff, #00ffff 10px, #00ff00 10px, #00ff00 20px)',
                  boxShadow: '8px 8px 0px #000, 12px 12px 0px #ff00ff, 0 0 25px rgba(0,255,255,0.8)',
                  fontFamily: '"Impact", sans-serif',
                  transform: 'rotate(12deg) skewX(8deg)',
                  clipPath: 'polygon(0% 5%, 85% 0%, 100% 95%, 15% 100%)',
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textShadow: '3px 3px 0px #000',
                }}
                title="Random Song"
              >
                🎲
              </button>
            </div>
          )}

          {/* Right side - Fake visualizer */}
          <div className="hidden md:flex items-end gap-1 h-20 p-3 border-8 border-double rounded-lg" style={{
            background: 'repeating-linear-gradient(90deg, #000 0px, #1a1a1a 10px, #000 20px)',
            borderColor: '#ff00ff #00ffff #ffff00 #00ff00',
            boxShadow: '0 0 20px #00ffff, inset 0 0 10px rgba(0,255,255,0.5), 6px 6px 0px #000',
            transform: 'rotate(2deg)',
          }}>
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className="w-3 rounded-t border-2 border-black"
                style={{
                  height: `${Math.random() * 80 + 20}%`,
                  background: `linear-gradient(to top, ${['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'][i % 7]}, ${['#ff00ff', '#00ffff', '#ffff00'][i % 3]})`,
                  animation: !isPaused ? `bounce ${0.2 + Math.random() * 0.4}s ease-in-out infinite alternate` : 'none',
                  boxShadow: `0 0 8px ${['#ff0000', '#00ff00', '#0000ff', '#ffff00'][i % 4]}`,
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
