'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

// Random points on a sphere for the "data nodes"
function DataNodes({ count = 200, radius = 2, color = "#2dd4bf", size = 0.03 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      p[i * 3] = x;
      p[i * 3 + 1] = y;
      p[i * 3 + 2] = z;
    }
    return p;
  }, [count, radius]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
      ref.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

function Satellites() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create 8 satellites
  const satellites = useMemo(() => {
    return Array.from({ length: 8 }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      ).normalize().multiplyScalar(2.5 + Math.random() * 1.5),
      speed: 0.2 + Math.random() * 0.5,
      axis: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize()
    }));
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {satellites.map((sat, i) => (
        <mesh key={i} position={sat.position}>
          <boxGeometry args={[0.06, 0.06, 0.12]} />
          <meshStandardMaterial color="#0d9488" emissive="#0d9488" emissiveIntensity={0.8} />
        </mesh>
      ))}
      {/* Satellite connection rings */}
      <Sphere args={[2.8, 32, 32]}>
        <meshBasicMaterial color="#0d9488" wireframe transparent opacity={0.06} />
      </Sphere>
      <Sphere args={[3.2, 32, 32]}>
        <meshBasicMaterial color="#2dd4bf" wireframe transparent opacity={0.03} />
      </Sphere>
    </group>
  );
}

function CoreGlobe() {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <Sphere ref={ref} args={[1.95, 32, 32]}>
      <meshStandardMaterial 
        color="#0f2035" 
        wireframe 
        transparent 
        opacity={0.15} 
      />
    </Sphere>
  );
}

export default function GisGlobe() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-auto opacity-70">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        {/* We don't add a background color so it uses the parent's background (bg-gray-50) */}
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#2dd4bf" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0d9488" />
        
        <CoreGlobe />
        <DataNodes count={1500} radius={2} color="#0d9488" size={0.02} />
        <DataNodes count={300} radius={2.1} color="#2dd4bf" size={0.03} />
        <Satellites />

        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.8} 
        />
      </Canvas>
    </div>
  );
}
