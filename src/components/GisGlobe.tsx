'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Earth() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture('/textures/earth-light.jpg');

  useFrame((state, delta) => {
    if (groupRef.current && meshRef.current) {
      // Gentle constant rotation for the earth
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial 
          map={texture} 
          roughness={0.7}
          metalness={0.1}
          color="#ccfbf1"
        />
      </mesh>
    </group>
  );
}

// Ignore THREE.Clock warnings caused by React Three Fiber internals
if (typeof console !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (args[0] && typeof args[0] === 'string' && args[0].includes('THREE.Clock: This module has been deprecated')) {
      return;
    }
    originalWarn(...args);
  };
}

export default function GisGlobe() {
  return (
    <div className="absolute inset-0 z-0 opacity-80 cursor-grab active:cursor-grabbing" style={{ pointerEvents: 'auto' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 3, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#0d9488" />
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={true}
        />
      </Canvas>
    </div>
  );
}
