'use client';

import { useState } from 'react';
import { Player } from '@/components/Player';
import { GaslightBot } from '@/components/GaslightBot';
import { DancingBaby } from '@/components/DancingBaby';
import { billboardTop50, BillboardSong } from '@/data/billboardSongs';
import { playRandomSong } from '@/lib/musicPlayer';

export default function Home() {
  // Replace "Unknown" artists with random stupid names
  const getRandomArtistName = (seed: number): string => {
    const names = [
      'Lil Yeet',
      'Big Chungus',
      'DJ Skibidi',
      'MC Rizz',
      'Yung Cringe',
      'Lil Brainrot',
      'Chief Bussin',
      'Drake (the fake one)',
      'Kanye Pest',
      'Ariana Venti',
      'PostAlone',
      'The Vibekend',
      'Doja Rat',
      'Ed Sheeran\'s Cousin',
      'Taylor Slow',
      'Olivia Rodrigone',
      'Billie Eyelash',
      'Harry Tiles',
      'Lil Nas Y',
      'Bruno Pluto',
      'Selena No-Gomez',
      'Justin Beaver',
      'Shawn Mendez (from Walmart)',
      'Camila Cabello Cheese',
      'The Chainsmokers (Vape Edition)',
    ];
    return names[seed % names.length];
  };

  // Fix unknown artists
  const songsWithNames = billboardTop50.map(song => ({
    ...song,
    artist: song.artist === 'Unknown' ? getRandomArtistName(song.rank) : song.artist,
  }));

  // Group songs by color (using a stupid color detection algorithm)
  const getColorGroup = (imagePath: string): string => {
    // Extract color hints from filename (this is intentionally stupid)
    const lowerPath = imagePath.toLowerCase();
    if (lowerPath.includes('taylor') || lowerPath.includes('swift')) return 'pink';
    if (lowerPath.includes('justin') || lowerPath.includes('bieber')) return 'purple';
    if (lowerPath.includes('morgan') || lowerPath.includes('wallen')) return 'orange';
    if (lowerPath.includes('sabrina')) return 'yellow';
    if (lowerPath.includes('chris') || lowerPath.includes('brown')) return 'red';
    if (lowerPath.includes('luke')) return 'blue';
    if (lowerPath.includes('megan')) return 'green';
    
    // Random assignment based on rank for the rest
    const rank = parseInt(imagePath.match(/\d+/)?.[0] || '0');
    const colors = ['pink', 'purple', 'orange', 'yellow', 'red', 'blue', 'green', 'teal'];
    return colors[rank % colors.length];
  };

  const groupedSongs: Record<string, BillboardSong[]> = {};
  songsWithNames.forEach(song => {
    const colorGroup = getColorGroup(song.image);
    if (!groupedSongs[colorGroup]) {
      groupedSongs[colorGroup] = [];
    }
    groupedSongs[colorGroup].push(song);
  });

  const colorThemes: Record<string, { bg: string, border: string, shadow: string, text: string }> = {
    pink: { bg: '#ff69b4', border: '#ff1493', shadow: '#ff00ff', text: 'PINK VIBES 💖' },
    purple: { bg: '#9370db', border: '#8b00ff', shadow: '#4b0082', text: 'PURPLE ENERGY 💜' },
    orange: { bg: '#ff8c00', border: '#ff4500', shadow: '#ff6347', text: 'ORANGE SQUAD 🧡' },
    yellow: { bg: '#ffd700', border: '#ffff00', shadow: '#ff0', text: 'YELLOW CREW 💛' },
    red: { bg: '#ff6b6b', border: '#ff0000', shadow: '#dc143c', text: 'RED ZONE ❤️' },
    blue: { bg: '#4169e1', border: '#0000ff', shadow: '#1e90ff', text: 'BLUE TEAM 💙' },
    green: { bg: '#32cd32', border: '#00ff00', shadow: '#228b22', text: 'GREEN GANG 💚' },
    teal: { bg: '#00ced1', border: '#00ffff', shadow: '#20b2aa', text: 'TEAL TAKEOVER 💎' },
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}} />
      <div 
        className="min-h-screen relative overflow-hidden"
        style={{
          background: '#00ffff',
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)',
        }}
      >

      {/* AI Chatbot */}
      <GaslightBot />
      
      {/* 3D Spinning Skull */}
      <DancingBaby />

      {/* Random scattered images/stickers - STATIC */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img src="/matcha.jpg" alt="" className="absolute" style={{ top: '5%', left: '10%', width: '80px' }} />
        <img src="/matcha.jpg" alt="" className="absolute" style={{ top: '15%', right: '15%', width: '100px' }} />
        <img src="/matcha.jpg" alt="" className="absolute" style={{ bottom: '20%', left: '5%', width: '90px' }} />
        <img src="/matcha.jpg" alt="" className="absolute" style={{ top: '50%', left: '20%', width: '70px' }} />
        <img src="/matcha.jpg" alt="" className="absolute" style={{ bottom: '10%', right: '10%', width: '85px' }} />
        <img src="/matcha.jpg" alt="" className="absolute" style={{ top: '70%', left: '50%', width: '95px' }} />
        <img src="/matcha.jpg" alt="" className="absolute" style={{ top: '30%', right: '25%', width: '75px' }} />
        <img src="/matcha.jpg" alt="" className="absolute" style={{ bottom: '40%', right: '5%', width: '80px' }} />
        <img src="https://i.imgur.com/7OkK5Kj.gif" alt="" className="absolute" style={{ top: '25%', left: '45%', width: '65px' }} />
        <img src="https://i.imgur.com/Kvhv0Ss.gif" alt="" className="absolute" style={{ bottom: '55%', left: '80%', width: '70px' }} />
      </div>

      {/* Header with ULTRA TACKY styling */}
      <div className="p-8 text-center relative z-10">
        {/* Rainbow divider */}
        <div className="h-4 mb-4" style={{ 
          background: 'linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)',
        }}></div>

        <div className="inline-block bg-yellow-300 p-6 border-8 border-double" style={{ 
          borderColor: '#ff00ff #00ff00 #ff00ff #00ff00',
          boxShadow: '10px 10px 0px #000, 15px 15px 0px #ff0000, 20px 20px 0px #0000ff',
        }}>
          <h1 
            className="text-8xl font-black mb-2"
            style={{ 
              background: 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.15em',
              textShadow: 'none',
              fontFamily: '"Impact", "Arial Black", sans-serif',
              fontWeight: 900,
              transform: 'scaleY(1.3)',
            }}
          >
            ✨ STUPID SPOTIFY ✨
          </h1>
        </div>

        <div className="mt-6 inline-block bg-lime-400 px-8 py-3 border-4 border-black" style={{
          boxShadow: '5px 5px 0px #ff00ff',
        }}>
          <p 
            className="text-3xl font-black"
            style={{ 
              color: '#ff0000',
              textShadow: '2px 2px 0px #00ff00, 4px 4px 0px #0000ff',
              letterSpacing: '0.08em',
              fontFamily: '"Comic Sans MS", cursive',
            }}
          >
            ~~* vibing to the most skibidi tracks fr fr no cap *~~
          </p>
        </div>

        {/* Static emojis */}
        <div className="flex justify-center gap-8 mt-6">
          <span className="text-6xl">💫</span>
          <span className="text-6xl">🎶</span>
          <span className="text-6xl">✨</span>
          <span className="text-6xl">💖</span>
        </div>

        {/* Blinky text marquee */}
        <div 
          className="mt-6 text-5xl font-black inline-block px-6 py-3"
          style={{ 
            animation: 'blink 1s ease-in-out infinite',
            background: '#ff00ff',
            color: '#ffff00',
            textShadow: '3px 3px 0px #00ff00, 1px 1px 8px #000',
            fontFamily: '"Impact", "Arial Black", sans-serif',
            letterSpacing: '0.1em',
            border: '5px dashed #ff0000',
          }}
        >
          ★ ☆ ★ NOW PLAYING THE WORST HITS ★ ☆ ★
        </div>

        {/* Rainbow divider */}
        <div className="h-4 mt-4" style={{ 
          background: 'linear-gradient(90deg, violet, indigo, blue, green, yellow, orange, red)',
        }}></div>
      </div>

      {/* Main Content */}
      <div className="px-8 pb-32 relative z-10">
        {/* Group by color sections */}
        {Object.entries(groupedSongs).map(([colorName, songsInGroup]) => {
          const theme = colorThemes[colorName];
          
          return (
            <div key={colorName} className="mb-16">
              {/* Color group header */}
              <div 
                className="text-center mb-8 py-6 border-8 border-double"
                style={{
                  background: `linear-gradient(45deg, ${theme.bg}, ${theme.border})`,
                  borderColor: `${theme.shadow} ${theme.border} ${theme.shadow} ${theme.border}`,
                  boxShadow: `10px 10px 0px ${theme.shadow}, 20px 20px 0px #000`,
                  transform: 'rotate(-1deg)',
                }}
              >
                <h2 
                  className="text-6xl font-black"
                  style={{
                    color: '#fff',
                    textShadow: `5px 5px 0px #000, 10px 10px 0px ${theme.shadow}`,
                    fontFamily: '"Impact", sans-serif',
                    letterSpacing: '0.1em',
                  }}
                >
                  {theme.text}
                </h2>
              </div>

              {/* ULTRA STUPID GRID LAYOUT */}
              <div className="max-w-[1800px] mx-auto">
                <div className="grid gap-4" style={{
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                }}>
                  {songsInGroup.map((song, index) => {
                    const rotations = ['-5deg', '3deg', '-2deg', '4deg', '-3deg', '2deg'];
                    const borderStyles = ['ridge', 'groove', 'outset', 'inset', 'double', 'solid'];
                    const fontSize = ['18px', '24px', '16px', '22px', '20px', '26px'];
                    
                    return (
                      <div 
                        key={song.id}
                        className="cursor-pointer hover:scale-110 transition-transform"
                        style={{
                          background: theme.bg,
                          border: `${4 + (index % 5)}px ${borderStyles[index % borderStyles.length]} ${theme.border}`,
                          padding: '12px',
                          transform: `rotate(${rotations[index % rotations.length]}) scale(${0.9 + (index % 3) * 0.1})`,
                          boxShadow: `${3 + index % 5}px ${3 + index % 5}px 0px #000, ${6 + index % 7}px ${6 + index % 7}px 0px ${theme.shadow}`,
                        }}
                      >
                        {/* Rank badge */}
                        <div 
                          className="absolute -top-3 -left-3 w-12 h-12 rounded-full flex items-center justify-center font-black text-xl border-4 border-black"
                          style={{
                            background: `radial-gradient(circle, ${theme.border}, ${theme.shadow})`,
                            textShadow: '2px 2px 0px #fff',
                          }}
                        >
                          #{song.rank}
                        </div>

                        {/* Album art */}
                        <div className="relative mb-3">
                          <img 
                            src={song.image} 
                            alt={song.title}
                            className="w-full aspect-square object-cover border-4 border-black"
                            style={{
                              filter: `hue-rotate(${index * 30}deg) saturate(${100 + index * 20}%)`,
                              transform: `rotate(${index % 2 === 0 ? '2deg' : '-2deg'})`,
                            }}
                          />
                          {/* Random emoji overlay */}
                          <div 
                            className="absolute -bottom-2 -right-2 text-4xl"
                            style={{
                              transform: `rotate(${index * 15}deg)`,
                            }}
                          >
                            {['🔥', '💀', '✨', '💯', '👑', '🎵', '⭐', '💖', '🌟', '🦋'][index % 10]}
                          </div>
                        </div>

                        {/* Song info */}
                        <div className="space-y-1">
                          <h3 
                            className="font-black leading-tight line-clamp-2"
                            style={{ 
                              color: index % 3 === 0 ? '#fff' : '#000',
                              textShadow: index % 3 === 0 ? '2px 2px 0px #000, 4px 4px 0px rgba(255,0,255,0.5)' : '2px 2px 0px #fff',
                              fontSize: fontSize[index % fontSize.length],
                              fontFamily: index % 2 === 0 ? '"Comic Sans MS", cursive' : '"Impact", sans-serif',
                              letterSpacing: '0.05em',
                              textTransform: index % 4 === 0 ? 'uppercase' : 'none',
                            }}
                          >
                            {song.title}
                          </h3>
                          <p 
                            className="text-sm font-bold line-clamp-1"
                            style={{ 
                              color: index % 3 === 0 ? '#000' : '#fff',
                              textShadow: '1px 1px 0px rgba(0,0,0,0.5)',
                              fontFamily: '"Arial Black", sans-serif',
                            }}
                          >
                            {song.artist}
                          </p>
                        </div>

                        {/* Play button */}
                        <div 
                          className="mt-2 text-center py-2 border-4 border-black font-black cursor-pointer hover:scale-110 transition-transform"
                          style={{
                            background: `linear-gradient(45deg, ${theme.border}, ${theme.shadow})`,
                            boxShadow: '3px 3px 0px #000',
                            fontFamily: '"Comic Sans MS", cursive',
                            fontSize: '16px',
                          }}
                          onClick={() => playRandomSong(song)}
                        >
                          ▶️ PLAY NOW
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {/* Visitor counter and web rings */}
        <div className="text-center mt-8 space-y-4">
          <div 
            className="inline-block bg-black px-8 py-4 font-black border-6"
            style={{
              boxShadow: '8px 8px 0px #ff00ff, 16px 16px 0px #00ff00',
              fontFamily: '"Courier New", monospace',
              fontSize: '24px',
              border: '6px outset #ffff00',
              color: '#00ff00',
            }}
          >
            <span style={{ animation: 'blink 0.5s infinite' }}>👀</span> You are visitor #420,690 <span style={{ animation: 'blink 0.7s infinite' }}>👀</span>
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <div className="bg-blue-500 text-white px-4 py-2 border-4 border-white font-black" style={{ boxShadow: '4px 4px 0px #000' }}>
              GEOCITIES
            </div>
            <div className="bg-red-500 text-white px-4 py-2 border-4 border-white font-black" style={{ boxShadow: '4px 4px 0px #000' }}>
              ANGELFIRE
            </div>
            <div className="bg-green-500 text-white px-4 py-2 border-4 border-white font-black" style={{ boxShadow: '4px 4px 0px #000' }}>
              TRIPOD
            </div>
          </div>

          <div className="text-2xl font-black mt-4" style={{ 
            color: '#ff0000',
            textShadow: '2px 2px 0px #ffff00',
            fontFamily: '"Comic Sans MS", cursive'
          }}>
            🔥 Best viewed in Netscape Navigator 4.0! 🔥
          </div>
        </div>
      </div>

      {/* Static particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl font-black"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              textShadow: '3px 3px 0px rgba(0,0,0,0.8)',
              color: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'][Math.floor(Math.random() * 6)],
            }}
          >
            {['✨', '💫', '⭐', '🌟', '💖', '☁️', '🦋', '🌺', '🎀', '💕', '★', '☆'][Math.floor(Math.random() * 12)]}
          </div>
        ))}
      </div>
      </div>
    </>
  );
}
