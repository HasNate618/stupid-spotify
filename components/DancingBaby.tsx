'use client';

// Simple CSS-only spinning skull (no Three.js needed!)
export function DancingBaby() {
  return (
    <>
      <div 
        className="fixed top-4 right-4 z-50 pointer-events-none"
        style={{
          animation: 'spinSkull 3s linear infinite, floatSkull 2s ease-in-out infinite',
          filter: 'drop-shadow(0 0 20px rgba(255, 0, 255, 0.8))',
        }}
      >
        <div 
          className="text-8xl"
          style={{
            animation: 'wobbleSkull 1s ease-in-out infinite',
          }}
        >
          💀
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes spinSkull {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes floatSkull {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes wobbleSkull {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}</style>
    </>
  );
}
