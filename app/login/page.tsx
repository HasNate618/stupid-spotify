'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Make the button shake when clicked
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
    
    // Just redirect to home after 1 second (no actual auth)
    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(45deg, #ff00ff, #00ffff, #ffff00, #ff0000, #00ff00)',
        backgroundSize: '400% 400%',
        animation: 'gradient 3s ease infinite',
      }}
    >
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
        @keyframes marquee {
          from { transform: translateX(100%); }
          to { transform: translateX(-100%); }
        }
      `}</style>

      <div 
        className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-8 rounded-3xl shadow-2xl max-w-md w-full border-8 border-dashed border-yellow-300"
        style={{
          transform: 'rotate(-2deg)',
          boxShadow: '10px 10px 0px #000, 20px 20px 0px rgba(255,0,0,0.5)',
        }}
      >
        <h1 
          className="text-6xl font-black text-center mb-8 text-white"
          style={{
            textShadow: '5px 5px 0px #ff00ff, 10px 10px 0px #00ffff',
            fontFamily: 'Comic Sans MS, cursive',
            animation: 'blink 2s infinite',
          }}
        >
          🎵 STUPID SPOTIFY 🎵
        </h1>

        <div 
          className="text-center mb-6 text-2xl font-bold"
          style={{
            animation: 'spin 2s linear infinite',
            display: 'inline-block',
            width: '100%',
          }}
        >
          🔥 LOGIN NOW 🔥
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              className="block text-3xl font-bold mb-2"
              style={{
                color: '#ffff00',
                textShadow: '3px 3px 0px #000',
                fontFamily: 'Impact, fantasy',
              }}
            >
              USERNAME (or email or whatever):
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 rounded-2xl border-8 border-double border-green-500 bg-yellow-200 text-black text-2xl font-bold"
              style={{
                transform: 'skew(-5deg)',
                boxShadow: 'inset 5px 5px 10px rgba(0,0,0,0.5)',
                fontFamily: 'Courier New, monospace',
              }}
              placeholder="ur name here lol"
              required
            />
          </div>

          <div>
            <label 
              className="block text-3xl font-bold mb-2"
              style={{
                color: '#00ff00',
                textShadow: '3px 3px 0px #ff0000',
                fontFamily: 'Impact, fantasy',
              }}
            >
              PASSWORD (we totally won't steal it):
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-2xl border-8 border-double border-blue-500 bg-pink-200 text-black text-2xl font-bold"
              style={{
                transform: 'skew(5deg)',
                boxShadow: 'inset 5px 5px 10px rgba(0,0,0,0.5)',
                fontFamily: 'Courier New, monospace',
              }}
              placeholder="super secret"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-6 rounded-full text-4xl font-black border-8 border-solid border-black ${isShaking ? 'animate-shake' : ''}`}
            style={{
              background: 'linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)',
              backgroundSize: '200% 200%',
              animation: isShaking ? 'shake 0.5s' : 'gradient 2s linear infinite',
              textShadow: '3px 3px 0px #000',
              transform: isShaking ? 'scale(0.95)' : 'scale(1)',
              transition: 'transform 0.1s',
              fontFamily: 'Comic Sans MS, cursive',
            }}
          >
            🚀 CLICK HERE TO LOGIN 🚀
          </button>
        </form>

        <div className="mt-6 text-center">
          <p 
            className="text-2xl font-bold"
            style={{
              color: '#ffffff',
              textShadow: '2px 2px 0px #000',
              fontFamily: 'Comic Sans MS, cursive',
            }}
          >
            Forgot password? <span className="underline cursor-pointer" style={{ color: '#00ffff' }}>Too bad! 😂</span>
          </p>
        </div>

        <div className="mt-4 flex justify-center gap-4">
          <div className="w-8 h-8 bg-red-500 rounded-full" style={{ animation: 'spin 1s linear infinite' }}>⭐</div>
          <div className="w-8 h-8 bg-blue-500 rounded-full" style={{ animation: 'spin 2s linear infinite' }}>💀</div>
          <div className="w-8 h-8 bg-green-500 rounded-full" style={{ animation: 'spin 1.5s linear infinite' }}>🔥</div>
        </div>

        <div className="mt-6 text-2xl font-bold text-white bg-black p-2 overflow-hidden">
          <div style={{ animation: 'marquee 10s linear infinite', whiteSpace: 'nowrap' }}>
            🎵 WELCOME TO THE WORST MUSIC APP EVER 🎵 YOUR EARS WILL REGRET THIS 🎵
          </div>
        </div>
      </div>
    </div>
  );
}
