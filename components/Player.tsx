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
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl mb-8">🎵 Stupid Spotify</h1>
      
      {/* Song List */}
      <div className="grid gap-4 mb-24">
        {songs.map(song => (
          <div 
            key={song.id}
            onClick={() => play(song)}
            className={`p-4 rounded cursor-pointer transition-colors ${
              currentSong?.id === song.id 
                ? 'bg-green-800' 
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <h3 className="font-bold">{song.title}</h3>
            <p className="text-gray-400">{song.artist}</p>
          </div>
        ))}
      </div>

      {/* Player Controls */}
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4 border-t border-gray-800">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-bold">{currentSong.title}</h3>
                <p className="text-sm text-gray-400">{currentSong.artist}</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={isPlaying ? pause : resume}
                  className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {isPlaying ? '⏸️ Pause' : '▶️ Play'}
                </button>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="flex items-center gap-2">
              <span className="text-xs">{formatTime(progress)}</span>
              <input 
                type="range" 
                min="0" 
                max={duration || 0} 
                value={progress}
                onChange={(e) => seek(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-xs">{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
