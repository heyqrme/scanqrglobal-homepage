/// <reference types="node" />
import type { IncomingMessage, ServerResponse } from 'http'

export interface HubMatch {
  name: string
  slug: string
  market: 'usa' | 'colombia' | 'brazil' | 'thailand'
  country: string
  flag: string
  vibe: string
  topSpot: string
  lat: number
  lng: number
}

const REGIONAL_HUBS: HubMatch[] = [
  { name: 'Bogotá', slug: 'bogota', market: 'colombia', country: 'Colombia', flag: '🇨🇴', lat: 4.711, lng: -74.0721, vibe: 'Theatron & Andean Nightlife', topSpot: 'Theatron Chapinero' },
  { name: 'Los Angeles', slug: 'la', market: 'usa', country: 'United States', flag: '🇺🇸', lat: 34.0522, lng: -118.2437, vibe: 'Rooftops & Melodic House', topSpot: 'Élephante Santa Monica' },
  { name: 'Miami', slug: 'miami', market: 'usa', country: 'United States', flag: '🇺🇸', lat: 25.7617, lng: -80.1918, vibe: 'Afro-House & VIP Nightlife', topSpot: 'Club Space Terrace' },
  { name: 'New York City', slug: 'nyc', market: 'usa', country: 'United States', flag: '🇺🇸', lat: 40.7128, lng: -74.006, vibe: 'Underground & Speakeasies', topSpot: 'House of Yes' },
  { name: 'Austin', slug: 'austin', market: 'usa', country: 'United States', flag: '🇺🇸', lat: 30.2672, lng: -97.7431, vibe: 'Live Music & Patio Bars', topSpot: 'The Continental Club' },
  { name: 'Nashville', slug: 'nashville', market: 'usa', country: 'United States', flag: '🇺🇸', lat: 36.1627, lng: -86.7816, vibe: 'Honky Tonk & Bluegrass', topSpot: "Robert's Western World" },
  { name: 'São Paulo', slug: 'sao-paulo', market: 'brazil', country: 'Brazil', flag: '🇧🇷', lat: -23.5505, lng: -46.6333, vibe: 'Underground Electronic Temples', topSpot: 'D-Edge Barra Funda' },
  { name: 'Rio de Janeiro', slug: 'rio', market: 'brazil', country: 'Brazil', flag: '🇧🇷', lat: -22.9068, lng: -43.1729, vibe: 'Samba Rodas & Beach Lounges', topSpot: 'Circo Voador Lapa' },
  { name: 'Florianópolis', slug: 'florianopolis', market: 'brazil', country: 'Brazil', flag: '🇧🇷', lat: -27.5954, lng: -48.548, vibe: 'Electronic Beach Clubs', topSpot: 'P12 Jurerê Internacional' },
  { name: 'Salvador da Bahia', slug: 'salvador', market: 'brazil', country: 'Brazil', flag: '🇧🇷', lat: -12.9777, lng: -38.5016, vibe: 'Afro-Beats & Culture', topSpot: 'Pelourinho Rhythms' },
  { name: 'Bangkok', slug: 'bangkok', market: 'thailand', country: 'Thailand', flag: '🇹🇭', lat: 13.7563, lng: 100.5018, vibe: 'Theatrical Speakeasies & RCA', topSpot: 'Sing Sing Theater' },
  { name: 'Phuket', slug: 'phuket', market: 'thailand', country: 'Thailand', flag: '🇹🇭', lat: 7.8804, lng: 98.3923, vibe: 'Sunset Beach Clubs & Islands', topSpot: 'Café del Mar Kamala' },
  { name: 'Koh Samui', slug: 'koh-samui', market: 'thailand', country: 'Thailand', flag: '🇹🇭', lat: 9.512, lng: 100.0136, vibe: 'Oceanfront Day Clubs & Fire Shows', topSpot: 'Ark Bar Beach Club' },
  { name: 'Krabi', slug: 'krabi', market: 'thailand', country: 'Thailand', flag: '🇹🇭', lat: 8.0863, lng: 98.9063, vibe: 'Cliff Bars & Quiet Coasts', topSpot: 'Tew Lay Bar Railay' },
  { name: 'Pattaya', slug: 'pattaya', market: 'thailand', country: 'Thailand', flag: '🇹🇭', lat: 12.9276, lng: 100.8771, vibe: '34th-Floor Sky Bars & EDM', topSpot: 'Horizon Rooftop' },
]

function getHeader(req: IncomingMessage, name: string): string {
  const val = req.headers[name.toLowerCase()]
  if (Array.isArray(val)) return val[0] || ''
  return val || ''
}

function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Math.round(R * c)
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.statusCode = 200
    res.end('ok')
    return
  }

  const vercelCountry = getHeader(req, 'x-vercel-ip-country').toUpperCase()
  const vercelCity = getHeader(req, 'x-vercel-ip-city')
  const latStr = getHeader(req, 'x-vercel-ip-latitude')
  const lngStr = getHeader(req, 'x-vercel-ip-longitude')

  const clientLat = latStr ? parseFloat(latStr) : null
  const clientLng = lngStr ? parseFloat(lngStr) : null

  let matchedHub: HubMatch | null = null

  // 1. Direct country/city matching
  if (vercelCountry === 'TH') {
    const c = vercelCity.toLowerCase()
    if (c.includes('phuket')) matchedHub = REGIONAL_HUBS.find((h) => h.slug === 'phuket') || null
    else if (c.includes('samui')) matchedHub = REGIONAL_HUBS.find((h) => h.slug === 'koh-samui') || null
    else if (c.includes('pattaya')) matchedHub = REGIONAL_HUBS.find((h) => h.slug === 'pattaya') || null
    else if (c.includes('krabi')) matchedHub = REGIONAL_HUBS.find((h) => h.slug === 'krabi') || null
    else matchedHub = REGIONAL_HUBS.find((h) => h.slug === 'bangkok') || null
  } else if (vercelCountry === 'CO') {
    matchedHub = REGIONAL_HUBS.find((h) => h.slug === 'bogota') || null
  } else if (vercelCountry === 'BR') {
    const c = vercelCity.toLowerCase()
    if (c.includes('paulo')) matchedHub = REGIONAL_HUBS.find((h) => h.slug === 'sao-paulo') || null
    else if (c.includes('florian')) matchedHub = REGIONAL_HUBS.find((h) => h.slug === 'florianopolis') || null
    else if (c.includes('salvador')) matchedHub = REGIONAL_HUBS.find((h) => h.slug === 'salvador') || null
    else matchedHub = REGIONAL_HUBS.find((h) => h.slug === 'rio') || null
  } else if (vercelCountry === 'US') {
    const c = vercelCity.toLowerCase()
    if (c.includes('miami') || c.includes('lauderdale') || c.includes('orlando')) matchedHub = REGIONAL_HUBS.find((h) => h.slug === 'miami') || null
    else if (c.includes('angeles') || c.includes('diego') || c.includes('hollywood')) matchedHub = REGIONAL_HUBS.find((h) => h.slug === 'la') || null
    else if (c.includes('york') || c.includes('brooklyn') || c.includes('jersey')) matchedHub = REGIONAL_HUBS.find((h) => h.slug === 'nyc') || null
    else if (c.includes('austin') || c.includes('houston') || c.includes('dallas')) matchedHub = REGIONAL_HUBS.find((h) => h.slug === 'austin') || null
    else if (c.includes('nashville') || c.includes('memphis')) matchedHub = REGIONAL_HUBS.find((h) => h.slug === 'nashville') || null
    else matchedHub = REGIONAL_HUBS.find((h) => h.slug === 'miami') || null
  }

  // 2. Fallback to closest hub via coordinates
  if (!matchedHub && clientLat !== null && clientLng !== null) {
    let minDistance = Infinity
    for (const hub of REGIONAL_HUBS) {
      const dist = calculateDistanceKm(clientLat, clientLng, hub.lat, hub.lng)
      if (dist < minDistance) {
        minDistance = dist
        matchedHub = hub
      }
    }
  }

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(
    JSON.stringify({
      detected: !!matchedHub,
      detectedCity: vercelCity || matchedHub?.name || null,
      detectedCountry: vercelCountry || matchedHub?.country || null,
      hub: matchedHub || REGIONAL_HUBS.find((h) => h.slug === 'bangkok'), // Default to Bangkok as featured hub if totally unknown
    })
  )
}
