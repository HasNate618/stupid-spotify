'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

function Skull() {
  const { scene } = useGLTF('/skull_downloadable/scene.gltf');
  return <primitive object={scene} scale={2} />;
}

export function DancingBaby() {
  return (
    <div style={{
      position: 'fixed',
      bottom: '40px',
      left: '20px',
      width: '450px',
      height: '450px',
      zIndex: 1,
      pointerEvents: 'none'
    }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <directionalLight position={[-10, -10, -5]} intensity={1} />
        <pointLight position={[0, 5, 0]} intensity={1.5} color="#ffffff" />
        <spotLight position={[5, 5, 5]} intensity={1.5} angle={0.6} penumbra={1} />
        <Suspense fallback={null}>
          <Skull />
        </Suspense>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={3}
        />
      </Canvas>
    </div>
  );
}