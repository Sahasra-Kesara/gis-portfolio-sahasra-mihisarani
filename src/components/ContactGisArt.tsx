'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Sky } from '@react-three/drei';
import * as THREE from 'three';
import { galleFortLocations, GalleFortLocation } from '@/data/galleFortData';

// ============================================================================
// GIS Projection Settings
// This is the SAME simple equirectangular projection used before, kept
// unchanged so the markers still line up. It's applied consistently to both
// the markers and the satellite terrain below, so everything stays aligned.
// ============================================================================
const CENTER_LAT = 6.0269;
const CENTER_LNG = 80.2166;
const SCALE = 1200; // Adjust spread of coordinates

function project(lat: number, lng: number): [number, number, number] {
  const x = (lng - CENTER_LNG) * SCALE;
  const z = -(lat - CENTER_LAT) * SCALE;
  return [x, 0, z];
}

// SCALE above turns a *degree* difference into world units. Building heights
// come in from OSM as real *meters*, which live on a totally different
// scale — 1 degree of longitude is roughly 111,320m. Without converting,
// a 6.5m-tall building was being extruded 6.5 world units, i.e. taller than
// the entire ~8-unit-wide terrain plane (hence the skyscraper effect).
const METERS_PER_DEGREE = 111320;
const WORLD_UNITS_PER_METER = SCALE / METERS_PER_DEGREE;
// Real 2-3 storey buildings are genuinely short relative to a 700m+ wide
// scene, so a mild exaggeration keeps them visible without looking absurd.
const HEIGHT_EXAGGERATION = 4;

function metersToWorldHeight(meters: number): number {
  return meters * WORLD_UNITS_PER_METER * HEIGHT_EXAGGERATION;
}

// Temperature Color Mapping
function getTemperatureColor(temp: number): string {
  if (temp < 30) return '#3b82f6'; // Blue (Cool)
  if (temp < 33) return '#10b981'; // Green (Moderate)
  if (temp < 36) return '#eab308'; // Yellow (Warm)
  if (temp < 38) return '#f97316'; // Orange (Hot)
  return '#ef4444';                // Red (Very Hot)
}

// ============================================================================
// Real Satellite Imagery — stitched from public XYZ map tiles (Esri World
// Imagery, no API key required). We fetch a small grid of tiles around
// Galle Fort, draw them onto a single canvas, and turn that into a texture
// draped over a flat ground plane sized/positioned using the SAME project()
// function as the markers — so the imagery and the pins align.
// ============================================================================
const ZOOM = 18;          // Tile zoom level (18 gives street/building-level detail)
const TILE_SIZE = 256;    // Standard XYZ tile size in px
const GRID = 5;           // 5x5 tile grid — comfortably covers the whole fort peninsula

function lon2tileX(lon: number, zoom: number) {
  return ((lon + 180) / 360) * Math.pow(2, zoom);
}
function lat2tileY(lat: number, zoom: number) {
  const rad = (lat * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * Math.pow(2, zoom);
}
function tile2lon(x: number, zoom: number) {
  return (x / Math.pow(2, zoom)) * 360 - 180;
}
function tile2lat(y: number, zoom: number) {
  const n = Math.PI - (2 * Math.PI * y) / Math.pow(2, zoom);
  return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
}

interface TerrainBounds {
  w: number;
  h: number;
  cx: number;
  cz: number;
}

function useSatelliteTexture() {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  const [bounds, setBounds] = useState<TerrainBounds | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function build() {
      try {
        const centerX = lon2tileX(CENTER_LNG, ZOOM);
        const centerY = lat2tileY(CENTER_LAT, ZOOM);
        const startTileX = Math.floor(centerX) - Math.floor(GRID / 2);
        const startTileY = Math.floor(centerY) - Math.floor(GRID / 2);

        const canvas = document.createElement('canvas');
        canvas.width = GRID * TILE_SIZE;
        canvas.height = GRID * TILE_SIZE;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('no 2d context');

        const loads: Promise<void>[] = [];
        for (let row = 0; row < GRID; row++) {
          for (let col = 0; col < GRID; col++) {
            const tx = startTileX + col;
            const ty = startTileY + row;
            const url = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${ZOOM}/${ty}/${tx}`;
            loads.push(
              new Promise<void>((resolve) => {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = () => {
                  ctx.drawImage(img, col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                  resolve();
                };
                img.onerror = () => resolve(); // leave that tile blank rather than fail the whole grid
                img.src = url;
              })
            );
          }
        }

        await Promise.all(loads);
        if (cancelled) return;

        const tex = new THREE.CanvasTexture(canvas);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 8;
        tex.needsUpdate = true;

        // Geographic bounds of the stitched canvas, converted to world space
        // through the SAME project() used for markers, so texture <-> pins line up.
        const nwLon = tile2lon(startTileX, ZOOM);
        const nwLat = tile2lat(startTileY, ZOOM);
        const seLon = tile2lon(startTileX + GRID, ZOOM);
        const seLat = tile2lat(startTileY + GRID, ZOOM);

        const [x1, , z1] = project(nwLat, nwLon);
        const [x2, , z2] = project(seLat, seLon);

        setBounds({
          w: Math.abs(x2 - x1),
          h: Math.abs(z2 - z1),
          cx: (x1 + x2) / 2,
          cz: (z1 + z2) / 2,
        });
        setTexture(tex);
      } catch (e) {
        console.error('Satellite texture build failed:', e);
        if (!cancelled) setFailed(true);
      }
    }

    build();
    return () => {
      cancelled = true;
    };
  }, []);

  return { texture, bounds, failed };
}

// ============================================================================
// Real Building Footprints & Heights — pulled from OpenStreetMap via the
// public Overpass API. Each building's footprint is projected through the
// SAME project() function used everywhere else, then extruded vertically by
// its real (or estimated) height.
// ============================================================================
interface BuildingData {
  id: string;
  points: [number, number][]; // [worldX, worldZ] footprint outline
  height: number;             // meters
}

// Slightly wider than the marker extent so the fort walls/surroundings are covered
const BUILDING_BBOX = {
  south: 6.022,
  west: 80.2108,
  north: 6.0312,
  east: 80.2212,
};

function estimateHeight(tags: Record<string, string>): number {
  if (tags.height) {
    const h = parseFloat(tags.height);
    if (!isNaN(h) && h > 0) return h;
  }
  if (tags['building:levels']) {
    const levels = parseFloat(tags['building:levels']);
    if (!isNaN(levels) && levels > 0) return levels * 3.2; // ~3.2m per storey
  }
  // Reasonable defaults by building type when OSM has no explicit height
  const type = tags.building;
  if (type === 'church' || type === 'cathedral' || type === 'place_of_worship') return 14;
  if (type === 'hotel' || type === 'apartments') return 10;
  if (type === 'commercial' || type === 'retail' || type === 'warehouse') return 6;
  return 6.5; // typical 2-storey colonial-era building
}

// Shoelace formula — footprint area in world-unit^2
function polygonArea(points: [number, number][]): number {
  let sum = 0;
  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % points.length];
    sum += x1 * y2 - x2 * y1;
  }
  return Math.abs(sum) / 2;
}

// Reasonable footprint area bounds (world-unit^2) to reject OSM data glitches:
// slivers from missing nodes (near-zero area) and outlier polygons like the
// occasional mis-tagged block/courtyard that dwarfs every real building.
const MIN_FOOTPRINT_AREA = 0.0004;
const MAX_FOOTPRINT_AREA = 0.05;
const MAX_BUILDING_HEIGHT = 20; // meters — nothing in the fort is a skyscraper

function useBuildings() {
  const [buildings, setBuildings] = useState<BuildingData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchBuildings() {
      try {
        const { south, west, north, east } = BUILDING_BBOX;
        const query = `[out:json][timeout:25];(way["building"](${south},${west},${north},${east}););out body;>;out skel qt;`;
        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
        const res = await fetch(url);
        const json = await res.json();

        const nodes = new Map<number, { lat: number; lon: number }>();
        for (const el of json.elements) {
          if (el.type === 'node') nodes.set(el.id, { lat: el.lat, lon: el.lon });
        }

        const result: BuildingData[] = [];
        for (const el of json.elements) {
          if (el.type !== 'way' || !el.tags?.building) continue;
          const nodeIds: number[] = el.nodes || [];
          if (nodeIds.length < 3) continue;

          const pts: [number, number][] = [];
          for (const nid of nodeIds) {
            const n = nodes.get(nid);
            if (!n) continue;
            const [x, , z] = project(n.lat, n.lon);
            pts.push([x, z]);
          }
          if (pts.length < 3) continue;

          // Reject ways where too many referenced nodes were missing — these
          // produce degenerate slivers that extrude into thin spikes.
          if (pts.length < nodeIds.length * 0.8) continue;

          const area = polygonArea(pts);
          if (area < MIN_FOOTPRINT_AREA || area > MAX_FOOTPRINT_AREA) continue;

          result.push({
            id: String(el.id),
            points: pts,
            height: Math.min(estimateHeight(el.tags), MAX_BUILDING_HEIGHT),
          });
        }

        if (!cancelled) setBuildings(result);
      } catch (e) {
        console.error('Failed to load building footprints:', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchBuildings();
    return () => {
      cancelled = true;
    };
  }, []);

  return { buildings, loading };
}

// Deterministic pseudo-random value in [0, 1) derived from a string id.
// Used instead of Math.random() so render output stays pure/stable.
function hashToUnitFloat(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) | 0;
  }
  return (h >>> 0) / 4294967295;
}

// Single extruded building
function Building({
  id,
  points,
  height,
  texture,
  bounds,
}: {
  id: string;
  points: [number, number][];
  height: number;
  texture: THREE.CanvasTexture | null;
  bounds: TerrainBounds | null;
}) {
  const worldHeight = metersToWorldHeight(height);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    points.forEach(([x, z], i) => {
      // Shape lives in a local XY plane; we rotate the finished geometry
      // below so this footprint ends up flat on the ground (X/Z) and the
      // extrusion depth becomes height along world Y.
      if (i === 0) shape.moveTo(x, -z);
      else shape.lineTo(x, -z);
    });
    const geo = new THREE.ExtrudeGeometry(shape, { depth: worldHeight, bevelEnabled: false });
    geo.rotateX(-Math.PI / 2);

    // Recompute UVs so the roof/cap faces sample the SAME real satellite
    // photo used for the terrain, aligned to actual world position — this
    // is what makes the rooftops look like real imagery instead of a flat
    // color. Uses the identical mapping as the Terrain plane's default UVs.
    if (bounds) {
      const pos = geo.attributes.position;
      const uv = new Float32Array(pos.count * 2);
      for (let i = 0; i < pos.count; i++) {
        const wx = pos.getX(i);
        const wz = pos.getZ(i);
        const u = (wx - bounds.cx + bounds.w / 2) / bounds.w;
        const v = (bounds.cz - wz + bounds.h / 2) / bounds.h;
        uv[i * 2] = u;
        uv[i * 2 + 1] = v;
      }
      geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    }

    return geo;
  }, [points, worldHeight, bounds]);

  const wallColor = useMemo(() => {
    // Subtle warm sandstone/terracotta tint variation per building,
    // deterministic from the building's id rather than Math.random().
    const hue = 28 + hashToUnitFloat(id) * 10;
    const lightness = Math.max(55, 74 - height * 1.1);
    return new THREE.Color(`hsl(${hue}, 32%, ${lightness}%)`);
  }, [id, height]);

  // Group 0 = top/bottom caps (roof) — textured with the real satellite photo.
  // Group 1 = extruded side walls (solid tinted color).
  // (three.js's ExtrudeGeometry assigns lid faces to group 0 and side faces
  // to group 1 — easy to get backwards.)
  const materials = useMemo(
    () => [
      texture
        ? new THREE.MeshStandardMaterial({ map: texture, roughness: 0.9, metalness: 0 })
        : new THREE.MeshStandardMaterial({ color: wallColor, roughness: 0.85, metalness: 0.05 }),
      new THREE.MeshStandardMaterial({ color: wallColor, roughness: 0.85, metalness: 0.05 }),
    ],
    [wallColor, texture]
  );

  return (
    <mesh geometry={geometry} material={materials} position={[0, 0.01, 0]} castShadow receiveShadow />
  );
}

function Buildings({
  data,
  texture,
  bounds,
}: {
  data: BuildingData[];
  texture: THREE.CanvasTexture | null;
  bounds: TerrainBounds | null;
}) {
  return (
    <group>
      {data.map((b) => (
        <Building key={b.id} id={b.id} points={b.points} height={b.height} texture={texture} bounds={bounds} />
      ))}
    </group>
  );
}

// 1. Realistic Terrain (real Galle Fort satellite imagery on a ground plane)
function Terrain({
  texture,
  bounds,
  failed,
}: {
  texture: THREE.CanvasTexture | null;
  bounds: TerrainBounds | null;
  failed: boolean;
}) {
  if (!texture || !bounds) {
    // Placeholder while tiles load (or if the network blocked them)
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={failed ? '#8a8577' : '#3f6b46'} roughness={0.95} />
      </mesh>
    );
  }

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[bounds.cx, 0, bounds.cz]}
      receiveShadow
    >
      <planeGeometry args={[bounds.w, bounds.h, 1, 1]} />
      <meshStandardMaterial map={texture} roughness={0.95} metalness={0} />
    </mesh>
  );
}

// 2. Realistic Animated Ocean (large plane extending past the terrain edges)
function Ocean() {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(80, 80, 96, 96);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const positions = (meshRef.current.geometry as THREE.PlaneGeometry).attributes.position;
      const time = state.clock.elapsedTime;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const z = positions.getZ(i);
        const y =
          Math.sin(x * 0.4 + time * 0.8) * 0.08 +
          Math.sin(z * 0.3 + time * 0.6) * 0.1 +
          Math.sin((x + z) * 0.15 + time * 0.4) * 0.05;
        positions.setY(i, y - 0.35); // sit just below the terrain plane
      }
      positions.needsUpdate = true;
      meshRef.current.geometry.computeVertexNormals();
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} receiveShadow>
      <meshPhysicalMaterial
        color="#0e7490"
        roughness={0.15}
        metalness={0.3}
        clearcoat={1}
        clearcoatRoughness={0.2}
        transmission={0.35}
        thickness={1.5}
        ior={1.33}
        flatShading
        transparent
        opacity={0.92}
      />
    </mesh>
  );
}

// 3. Interactive Data Markers
function DataMarker({ data }: { data: GalleFortLocation }) {
  const [hovered, setHovered] = useState(false);
  const [x, , z] = project(data.latitude, data.longitude);
  const color = getTemperatureColor(data.temperature);

  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3 + data.latitude) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={[x, 0.9, z]}>
      <mesh
        ref={meshRef}
        castShadow
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'grab';
        }}
      >
        <sphereGeometry args={[hovered ? 0.25 : 0.15, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 0.8 : 0.4} />
      </mesh>

      <mesh position={[0, -0.45, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.9]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {hovered && (
        <Html position={[0, 0.4, 0]} center zIndexRange={[100, 0]}>
          <div className="bg-navy-950/90 backdrop-blur-md text-white p-3 rounded-lg shadow-2xl border border-gray-700 w-48 animate-fade-in pointer-events-none">
            <h4 className="font-bold text-sm text-teal-400 mb-1 leading-tight">{data.name}</h4>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-700">
              <span className="text-xs text-gray-400">Temperature</span>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded"
                style={{ backgroundColor: color, color: data.temperature > 35 ? 'white' : 'black' }}
              >
                {data.temperature}°C
              </span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

// Legend
function Legend() {
  return (
    <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 z-10 bg-navy-950/80 backdrop-blur-md p-4 rounded-xl border border-navy-700 shadow-lg pointer-events-none">
      <h4 className="text-teal-400 text-xs font-bold uppercase tracking-wider mb-3">Temperature Heatmap</h4>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span><span className="text-gray-300 text-xs">&lt; 30°C (Cool)</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span><span className="text-gray-300 text-xs">30 - 32°C (Moderate)</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]"></span><span className="text-gray-300 text-xs">33 - 35°C (Warm)</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></span><span className="text-gray-300 text-xs">36 - 37°C (Hot)</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span><span className="text-gray-300 text-xs">&ge; 38°C (Very Hot)</span></div>
      </div>
    </div>
  );
}

function LoadingHint({ text }: { text: string }) {
  return (
    <div className="absolute top-4 right-4 lg:top-6 lg:right-6 z-10 pointer-events-none bg-white/80 backdrop-blur-md text-navy-900 text-xs px-3 py-1.5 rounded-full border border-white shadow-sm">
      {text}
    </div>
  );
}

export default function ContactGisArt() {
  const { texture, bounds, failed } = useSatelliteTexture();
  const { buildings, loading: buildingsLoading } = useBuildings();

  const stillLoading = (!texture && !failed) || buildingsLoading;
  const loadingText = !texture && !failed
    ? 'Loading real satellite imagery…'
    : 'Loading real building footprints…';

  return (
    <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden border border-sky-400 shadow-2xl relative">
      <div className="absolute top-4 left-4 lg:top-6 lg:left-6 z-10 pointer-events-none bg-white/80 backdrop-blur-md text-navy-900 font-medium text-xs md:text-sm px-4 py-2 rounded-full border border-white shadow-sm flex items-center gap-2">
        <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
        <span>Interact & Rotate — Real Galle Fort Imagery</span>
      </div>

      <Legend />
      {stillLoading && <LoadingHint text={loadingText} />}

      <Canvas camera={{ position: [0, 7, 9], fov: 45 }} shadows>
        <Sky sunPosition={[10, 8, 5]} turbidity={4} rayleigh={1.2} mieCoefficient={0.005} mieDirectionalG={0.8} />
        <fog attach="fog" args={['#bcd8e8', 15, 45]} />

        <hemisphereLight args={['#e0f2fe', '#3b3b3b', 0.6]} />
        <directionalLight
          position={[10, 20, 5]}
          intensity={1.6}
          color="#fffbeb"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <Ocean />
        <Terrain texture={texture} bounds={bounds} failed={failed} />
        <Buildings data={buildings} texture={texture} bounds={bounds} />

        {galleFortLocations.map((loc) => (
          <DataMarker key={loc.id} data={loc} />
        ))}

        <OrbitControls
          enableZoom={true}
          minDistance={4}
          maxDistance={30}
          maxPolarAngle={Math.PI / 2 - 0.05}
          autoRotate={true}
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
}