'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page
    router.push('/login');
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl mb-4">🎵 Stupid Spotify</h1>
        <p className="text-gray-400">Redirecting to login...</p>
      </div>
    </div>
  );
}
