import { NextResponse } from 'next/server';

// Same bounding box used in ContactGisArt.tsx — keep these in sync.
const BUILDING_BBOX = {
  south: 6.022,
  west: 80.2108,
  north: 6.0312,
  east: 80.2212,
};

// Building footprints don't change often — cache for a day at the edge,
// and let Next.js serve stale data while it revalidates in the background.
export const revalidate = 86400;

export async function GET() {
  try {
    const { south, west, north, east } = BUILDING_BBOX;
    const query = `[out:json][timeout:25];(way["building"](${south},${west},${north},${east}););out body;>;out skel qt;`;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    const res = await fetch(url, {
      // A descriptive User-Agent is good practice for the public Overpass
      // instance and reduces the chance of being rate-limited/blocked.
      headers: { 'User-Agent': 'gis-portfolio-sahasra-mihisarani (Galle Fort 3D demo)' },
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      console.error('Overpass upstream error:', res.status, res.statusText);
      return NextResponse.json({ elements: [] }, { status: 502 });
    }

    const data = await res.json();

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    });
  } catch (e) {
    console.error('Failed to fetch/proxy Overpass building data:', e);
    return NextResponse.json({ elements: [] }, { status: 502 });
  }
}