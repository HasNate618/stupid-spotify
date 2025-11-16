'use client';

import { useState, useEffect } from 'react';
import { Player } from '@/components/Player';
import { GaslightBot } from '@/components/GaslightBot';
import { songService } from '@/services/songService';
import { Song } from '@/hooks/useAudioPlayer';

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSongs = async () => {
      const data = await songService.getAllSongs();
      setSongs(data);
      setLoading(false);
    };
    loadSongs();
  }, []);

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
          backgroundSize: '400% 400%',
          animation: 'dreamyGradient 15s ease infinite',
          fontFamily: '"Comic Sans MS", "Chalkboard SE", "Comic Neue", cursive',
        }}
      >
        <style jsx>{`
          @keyframes dreamyGradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">✨</div>
          <p className="text-3xl text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.8)' }}>
            loading ur vibe...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: '#00ffff',
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)',
      }}
    >
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>

      {/* AI Chatbot */}
      <GaslightBot />

      {/* Tiled background pattern */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ 
        backgroundImage: 'url(https://www.transparenttextures.com/patterns/45-degree-fabric-light.png)',
        opacity: 0.3 
      }}></div>

      {/* Random scattered images/stickers - STATIC */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img src="https://i.imgur.com/7OkK5Kj.gif" alt="" className="absolute" style={{ top: '5%', left: '10%', width: '80px' }} />
        <img src="https://i.imgur.com/Kvhv0Ss.gif" alt="" className="absolute" style={{ top: '15%', right: '15%', width: '100px' }} />
        <img src="https://i.imgur.com/qQtethR.gif" alt="" className="absolute" style={{ bottom: '20%', left: '5%', width: '90px' }} />
        <img src="https://i.imgur.com/M0vFcjl.gif" alt="" className="absolute" style={{ top: '50%', left: '20%', width: '70px' }} />
        <img src="https://i.imgur.com/7OkK5Kj.gif" alt="" className="absolute" style={{ bottom: '10%', right: '10%', width: '85px' }} />
        <img src="https://i.imgur.com/Kvhv0Ss.gif" alt="" className="absolute" style={{ top: '70%', left: '50%', width: '95px' }} />
        <img src="https://i.imgur.com/qQtethR.gif" alt="" className="absolute" style={{ top: '30%', right: '25%', width: '75px' }} />
        <img src="https://i.imgur.com/M0vFcjl.gif" alt="" className="absolute" style={{ bottom: '40%', right: '5%', width: '80px' }} />
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
        <div 
          className="max-w-4xl mx-auto p-8"
          style={{
            background: 'linear-gradient(45deg, #ffff00 25%, #00ffff 25%, #00ffff 50%, #ffff00 50%, #ffff00 75%, #00ffff 75%, #00ffff)',
            backgroundSize: '40px 40px',
            border: '8px ridge #ff00ff',
            boxShadow: '0 0 0 8px #00ff00, 15px 15px 0px #ff0000, 30px 30px 0px #0000ff',
          }}
        >
          {/* Song List */}
          <div className="space-y-6">
            {songs.map((song, index) => {
              const colors = [
                { bg: 'linear-gradient(90deg, #ff6b6b, #feca57)', border: '#ff0000', shadow: '#0000ff' },
                { bg: 'linear-gradient(90deg, #48dbfb, #0abde3)', border: '#00ff00', shadow: '#ff00ff' },
                { bg: 'linear-gradient(90deg, #ee5a6f, #f368e0)', border: '#ffff00', shadow: '#00ffff' },
                { bg: 'linear-gradient(90deg, #1dd1a1, #10ac84)', border: '#ff00ff', shadow: '#ff0000' },
                { bg: 'linear-gradient(90deg, #ff9ff3, #feca57)', border: '#00ffff', shadow: '#00ff00' },
              ];
              const color = colors[index % colors.length];
              
              return (
                <div 
                  key={song.id}
                  className="p-6 cursor-pointer"
                  style={{
                    background: color.bg,
                    border: `6px groove ${color.border}`,
                    boxShadow: `8px 8px 0px ${color.shadow}, 16px 16px 0px #000`,
                    transform: `rotate(${index % 2 === 0 ? '1deg' : '-1deg'})`,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-20 h-20 flex items-center justify-center text-4xl border-4 border-black"
                      style={{
                        background: 'radial-gradient(circle, #ff00ff, #00ffff)',
                      }}
                    >
                      🎵
                    </div>
                    <div className="flex-1">
                      <h3 
                        className="text-4xl font-black mb-1"
                        style={{ 
                          color: '#000',
                          textShadow: '3px 3px 0px #fff, 6px 6px 0px rgba(0,0,0,0.5)',
                          letterSpacing: '0.1em',
                          fontFamily: '"Arial Black", "Impact", sans-serif',
                        }}
                      >
                        {song.title}
                      </h3>
                      <p 
                        className="text-2xl font-black"
                        style={{ 
                          color: '#fff',
                          letterSpacing: '0.08em',
                          textShadow: '2px 2px 0px #000',
                          fontFamily: '"Comic Sans MS", cursive',
                        }}
                      >
                        {song.artist}
                      </p>
                    </div>
                    <div className="text-6xl">
                      ▶️
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Text */}
          <div className="text-center mt-8 bg-red-500 p-4 border-4 border-dashed border-blue-500" style={{
            boxShadow: '5px 5px 0px #ffff00',
          }}>
            <p 
              className="text-3xl font-black"
              style={{ 
                color: '#ffff00',
                textShadow: '3px 3px 0px #000',
                letterSpacing: '0.08em',
                fontFamily: '"Comic Sans MS", cursive',
              }}
            >
              ~~~ just here for the vibes ~~~ ☁️ 🌸 💭
            </p>
          </div>
        </div>

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
  );
}
