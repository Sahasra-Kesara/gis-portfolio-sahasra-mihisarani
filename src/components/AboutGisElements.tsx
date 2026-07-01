'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// 1. Satellite Element
function Satellite({ position }: { position: [number, number, number] }) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.x += delta * 0.2;
      group.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1} position={position}>
      <group ref={group}>
        {/* Body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 1, 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Solar Panel 1 */}
        <mesh position={[-0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.1, 1.2, 0.6]} />
          <meshStandardMaterial color="#0ea5e9" metalness={0.5} roughness={0.5} />
        </mesh>
        {/* Solar Panel 2 */}
        <mesh position={[0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.1, 1.2, 0.6]} />
          <meshStandardMaterial color="#0ea5e9" metalness={0.5} roughness={0.5} />
        </mesh>
        {/* Dish */}
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.2, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
}

// 2. Location Pin
function LocationPin({ position }: { position: [number, number, number] }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.5} position={position}>
      <group ref={group}>
        {/* Top Sphere */}
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color="#ef4444" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Inner hole (white) */}
        <mesh position={[0, 0.5, 0.35]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={1} />
        </mesh>
        {/* Bottom Cone */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.4, 1, 32]} />
          <meshStandardMaterial color="#ef4444" roughness={0.3} metalness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

// 3. Abstract Spatial Data Node (Wireframe Icosahedron)
function DataNode({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={2} position={position}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial color="#14b8a6" wireframe opacity={0.6} transparent />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color="#0f766e" />
      </mesh>
    </Float>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating tracking based on mouse
      const targetX = (state.pointer.x * Math.PI) / 10;
      const targetY = (state.pointer.y * Math.PI) / 10;
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Satellite position={[-1.2, 1.2, 0]} />
      <LocationPin position={[1.2, 0.2, 1]} />
      <DataNode position={[-0.5, -1.5, -1]} />
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

export default function AboutGisElements() {
  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[500px] relative pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-5, -5, -5]} intensity={1} color="#5eead4" />
        <Scene />
      </Canvas>
    </div>
  );
}
