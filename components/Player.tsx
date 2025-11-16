'use client';

import React from 'react';
import { useAudioPlayer, Song } from '@/hooks/useAudioPlayer';

interface PlayerProps {
  songs: Song[];
}

export function Player({ songs }: PlayerProps) {
  const { 
    currentSong, 
    isPlaying, 
    progress, 
    duration,
    play, 
    pause, 
    resume,
    seek 
  } = useAudioPlayer();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-5deg); }
        }
        @keyframes drift {
          0% { transform: translateX(0px) translateY(0px); }
          50% { transform: translateX(20px) translateY(-15px); }
          100% { transform: translateX(0px) translateY(0px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>

      {/* Floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 text-6xl opacity-70" style={{ animation: 'float 3s ease-in-out infinite' }}>🍵</div>
        <div className="absolute top-20 right-20 text-7xl opacity-60" style={{ animation: 'floatSlow 4s ease-in-out infinite' }}>✨</div>
        <div className="absolute bottom-20 left-32 text-5xl opacity-50" style={{ animation: 'float 3.5s ease-in-out infinite' }}>🧋</div>
        <div className="absolute top-1/3 right-10 text-6xl opacity-60" style={{ animation: 'drift 5s ease-in-out infinite' }}>🌸</div>
        <div className="absolute bottom-40 right-40 text-5xl opacity-70" style={{ animation: 'floatSlow 4.5s ease-in-out infinite' }}>☁️</div>
        <div className="absolute top-1/2 left-20 text-4xl opacity-50" style={{ animation: 'spin 10s linear infinite' }}>🎀</div>
        <div className="absolute bottom-32 left-1/4 text-6xl opacity-60" style={{ animation: 'float 3.8s ease-in-out infinite' }}>🍓</div>
        <div className="absolute top-40 right-1/3 text-5xl opacity-50" style={{ animation: 'floatSlow 4.2s ease-in-out infinite' }}>🌈</div>
        <div className="absolute bottom-1/3 right-1/4 text-7xl opacity-40" style={{ animation: 'drift 6s ease-in-out infinite' }}>💫</div>
        <div className="absolute top-1/4 left-1/3 text-5xl opacity-60" style={{ animation: 'float 3.3s ease-in-out infinite' }}>🧸</div>
      </div>

      {/* Header */}
      <div 
        className="text-center mb-8 p-8 rounded-3xl backdrop-blur-md relative"
        style={{
          background: 'rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(255, 182, 193, 0.3)',
          border: '2px solid rgba(255, 255, 255, 0.5)',
        }}
      >
        <div className="flex justify-center gap-3 mb-4">
          <span className="text-4xl" style={{ animation: 'bounce 2s ease-in-out infinite' }}>🍵</span>
          <span className="text-4xl" style={{ animation: 'bounce 2s ease-in-out infinite 0.2s' }}>✨</span>
          <span className="text-4xl" style={{ animation: 'bounce 2s ease-in-out infinite 0.4s' }}>🧋</span>
        </div>
        <h1 
          className="text-5xl md:text-7xl font-bold text-white mb-2"
          style={{
            textShadow: '2px 2px 20px rgba(255, 182, 193, 0.8), 0 0 30px rgba(255, 192, 203, 0.6)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '0.05em',
          }}
        >
          stupid spotify ໒꒰ྀིっ˕ -｡꒱ྀི১
        </h1>
        <p 
          className="text-xl md:text-2xl font-medium text-white"
          style={{
            textShadow: '1px 1px 10px rgba(255, 182, 193, 0.6)',
            opacity: 0.9,
          }}
        >
          ☆ vibes that are kinda bad ngl ☆
        </p>
      </div>

      {/* Song List */}
      <div className="max-w-3xl mx-auto mb-32">
        <div className="grid gap-4">
          {songs.map((song, index) => (
            <div 
              key={song.id}
              onClick={() => play(song)}
              className={`p-5 rounded-2xl cursor-pointer transition-all relative backdrop-blur-md ${
                currentSong?.id === song.id 
                  ? 'scale-105' 
                  : 'hover:scale-102'
              }`}
              style={{
                background: currentSong?.id === song.id 
                  ? 'rgba(255, 255, 255, 0.5)' 
                  : 'rgba(255, 255, 255, 0.25)',
                boxShadow: currentSong?.id === song.id 
                  ? '0 8px 32px rgba(255, 182, 193, 0.4)' 
                  : '0 4px 16px rgba(255, 182, 193, 0.2)',
                border: '2px solid rgba(255, 255, 255, 0.4)',
              }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="text-2xl font-medium rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-sm"
                  style={{
                    background: 'rgba(255, 255, 255, 0.5)',
                    color: '#ff69b4',
                    border: '2px solid rgba(255, 255, 255, 0.6)',
                  }}
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 
                    className="text-xl md:text-2xl font-semibold text-white mb-1"
                    style={{
                      textShadow: '1px 1px 10px rgba(255, 182, 193, 0.6)',
                    }}
                  >
                    {song.title} {currentSong?.id === song.id && '♡'}
                  </h3>
                  <p 
                    className="text-base md:text-lg font-medium text-white"
                    style={{
                      opacity: 0.8,
                      textShadow: '1px 1px 8px rgba(255, 182, 193, 0.4)',
                    }}
                  >
                    {song.artist}
                  </p>
                </div>
                {currentSong?.id === song.id && (
                  <div className="text-3xl" style={{ animation: 'pulse 2s ease-in-out infinite' }}>
                    {isPlaying ? '▶' : '⏸'}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Player Controls */}
      {currentSong && (
        <div 
          className="fixed bottom-0 left-0 right-0 p-4 md:p-6 backdrop-blur-lg"
          style={{
            background: 'rgba(255, 255, 255, 0.4)',
            boxShadow: '0 -4px 16px rgba(255, 182, 193, 0.3)',
            borderTop: '2px solid rgba(255, 255, 255, 0.5)',
          }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
              <div 
                className="text-center md:text-left p-4 rounded-2xl backdrop-blur-sm"
                style={{
                  background: 'rgba(255, 255, 255, 0.3)',
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                }}
              >
                <h3 
                  className="text-lg md:text-xl font-semibold text-white mb-1"
                  style={{
                    textShadow: '1px 1px 10px rgba(255, 182, 193, 0.6)',
                  }}
                >
                  now playing: {currentSong.title} ♪
                </h3>
                <p 
                  className="text-base md:text-lg font-medium text-white"
                  style={{
                    opacity: 0.8,
                    textShadow: '1px 1px 8px rgba(255, 182, 193, 0.4)',
                  }}
                >
                  {currentSong.artist} ✨
                </p>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={isPlaying ? pause : resume}
                  className="text-3xl px-8 py-3 rounded-full font-semibold transition-all hover:scale-110 backdrop-blur-sm"
                  style={{
                    background: 'rgba(255, 255, 255, 0.5)',
                    color: '#ff69b4',
                    border: '2px solid rgba(255, 255, 255, 0.6)',
                    boxShadow: '0 4px 16px rgba(255, 182, 193, 0.3)',
                    textShadow: '1px 1px 10px rgba(255, 182, 193, 0.4)',
                  }}
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div 
              className="flex items-center gap-3 p-4 rounded-xl backdrop-blur-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.3)',
                border: '2px solid rgba(255, 255, 255, 0.4)',
              }}
            >
              <span 
                className="text-base font-medium text-white"
                style={{
                  textShadow: '1px 1px 8px rgba(255, 182, 193, 0.4)',
                }}
              >
                {formatTime(progress)}
              </span>
              <input 
                type="range" 
                min="0" 
                max={duration || 0} 
                value={progress}
                onChange={(e) => seek(parseFloat(e.target.value))}
                className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: 'rgba(255, 255, 255, 0.5)',
                }}
              />
              <span 
                className="text-base font-medium text-white"
                style={{
                  textShadow: '1px 1px 8px rgba(255, 182, 193, 0.4)',
                }}
              >
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
