import React, { useState, useEffect, useRef } from 'react'
import {
  Compass,
  Globe,
  Flame,
  QrCode,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Star,
  Mail,
  ExternalLink,
  ArrowRight,
  MapPin,
  Sparkles,
  Radio,
  Search,
  Terminal,
  Zap,
  Crosshair,
  Activity,
  Wifi,
  Send,
  CheckCircle2,
  Cpu,
  Layers,
  Bot,
  X,
  MessageCircle,
} from 'lucide-react'

const CERCA_BASE_URL = 'https://www.qr4luv.com'

// 1. REGIONAL HUB GEOLOCATION DATA for Proximity Geo-Ping & Great-Circle Triangulation
export interface HubGeo {
  name: string
  slug: string
  market: 'usa' | 'colombia' | 'brazil' | 'thailand'
  country: string
  flag: string
  lat: number
  lng: number
  vibe: string
  topSpot: string
  pulse: string
}

export const REGIONAL_HUBS: HubGeo[] = [
  { name: 'Bogotá', slug: 'bogota', market: 'colombia', country: 'Colombia', flag: '🇨🇴', lat: 4.711, lng: -74.0721, vibe: 'Theatron & Andean Nightlife', topSpot: 'Theatron Chapinero', pulse: 'Peak' },
  { name: 'Los Angeles', slug: 'la', market: 'usa', country: 'United States', flag: '🇺🇸', lat: 34.0522, lng: -118.2437, vibe: 'Rooftops & Melodic House', topSpot: 'Élephante Santa Monica', pulse: 'Busy' },
  { name: 'Miami', slug: 'miami', market: 'usa', country: 'United States', flag: '🇺🇸', lat: 25.7617, lng: -80.1918, vibe: 'Afro-House & VIP Nightlife', topSpot: 'Club Space Terrace', pulse: 'Peak' },
  { name: 'New York City', slug: 'nyc', market: 'usa', country: 'United States', flag: '🇺🇸', lat: 40.7128, lng: -74.006, vibe: 'Underground & Speakeasies', topSpot: 'House of Yes', pulse: 'Busy' },
  { name: 'Austin', slug: 'austin', market: 'usa', country: 'United States', flag: '🇺🇸', lat: 30.2672, lng: -97.7431, vibe: 'Live Music & Patio Bars', topSpot: 'The Continental Club', pulse: 'Moderate' },
  { name: 'Nashville', slug: 'nashville', market: 'usa', country: 'United States', flag: '🇺🇸', lat: 36.1627, lng: -86.7816, vibe: 'Honky Tonk & Bluegrass', topSpot: "Robert's Western World", pulse: 'Busy' },
  { name: 'São Paulo', slug: 'sao-paulo', market: 'brazil', country: 'Brazil', flag: '🇧🇷', lat: -23.5505, lng: -46.6333, vibe: 'Underground Electronic Temples', topSpot: 'D-Edge Barra Funda', pulse: 'Peak' },
  { name: 'Rio de Janeiro', slug: 'rio', market: 'brazil', country: 'Brazil', flag: '🇧🇷', lat: -22.9068, lng: -43.1729, vibe: 'Samba Rodas & Beach Lounges', topSpot: 'Circo Voador Lapa', pulse: 'Peak' },
  { name: 'Florianópolis', slug: 'florianopolis', market: 'brazil', country: 'Brazil', flag: '🇧🇷', lat: -27.5954, lng: -48.548, vibe: 'Electronic Beach Clubs', topSpot: 'P12 Jurerê Internacional', pulse: 'Moderate' },
  { name: 'Salvador da Bahia', slug: 'salvador', market: 'brazil', country: 'Brazil', flag: '🇧🇷', lat: -12.9777, lng: -38.5016, vibe: 'Afro-Beats & Culture', topSpot: 'Pelourinho Rhythms', pulse: 'Moderate' },
  { name: 'Bangkok', slug: 'bangkok', market: 'thailand', country: 'Thailand', flag: '🇹🇭', lat: 13.7563, lng: 100.5018, vibe: 'Theatrical Speakeasies & RCA', topSpot: 'Sing Sing Theater', pulse: 'Peak' },
  { name: 'Phuket', slug: 'phuket', market: 'thailand', country: 'Thailand', flag: '🇹🇭', lat: 7.8804, lng: 98.3923, vibe: 'Sunset Beach Clubs & Islands', topSpot: 'Café del Mar Kamala', pulse: 'Busy' },
  { name: 'Koh Samui', slug: 'koh-samui', market: 'thailand', country: 'Thailand', flag: '🇹🇭', lat: 9.512, lng: 100.0136, vibe: 'Oceanfront Day Clubs & Fire Shows', topSpot: 'Ark Bar Beach Club', pulse: 'Peak' },
  { name: 'Krabi', slug: 'krabi', market: 'thailand', country: 'Thailand', flag: '🇹🇭', lat: 8.0863, lng: 98.9063, vibe: 'Cliff Bars & Quiet Coasts', topSpot: 'Tew Lay Bar Railay', pulse: 'Moderate' },
  { name: 'Pattaya', slug: 'pattaya', market: 'thailand', country: 'Thailand', flag: '🇹🇭', lat: 12.9276, lng: 100.8771, vibe: '34th-Floor Sky Bars & EDM', topSpot: 'Horizon Rooftop', pulse: 'Busy' },
]

export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
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

// 2. LIVE GLOBAL TELEMETRY STREAM EVENTS
export interface TelemetryEvent {
  id: string
  type: 'SIGNAL LOCK' | 'SCAN DETECTED' | 'GEO HANDSHAKE' | 'VIP DROP' | 'PULSE PING'
  city: string
  country: string
  flag: string
  venue: string
  message: string
  pulse: 'Peak' | 'Busy' | 'Moderate'
  latency: string
  market: 'usa' | 'colombia' | 'brazil' | 'thailand'
  slug: string
}

export const TELEMETRY_EVENTS: TelemetryEvent[] = [
  {
    id: 't-1',
    type: 'SIGNAL LOCK',
    city: 'Bogotá',
    country: 'Colombia',
    flag: '🇨🇴',
    venue: 'Theatron Chapinero',
    message: '1,420 guests active · 13 music rooms raging · Main EDM stage peak',
    pulse: 'Peak',
    latency: '18ms',
    market: 'colombia',
    slug: 'bogota',
  },
  {
    id: 't-2',
    type: 'SCAN DETECTED',
    city: 'Bangkok',
    country: 'Thailand',
    flag: '🇹🇭',
    venue: 'Sing Sing Theater',
    message: 'VIP speakeasy unlocked · 1930s Shanghai noir aerialists performing',
    pulse: 'Peak',
    latency: '24ms',
    market: 'thailand',
    slug: 'bangkok',
  },
  {
    id: 't-3',
    type: 'GEO HANDSHAKE',
    city: 'Miami',
    country: 'USA',
    flag: '🇺🇸',
    venue: 'Club Space Terrace',
    message: 'Afro-house sunrise marathon streaming · Decibel level: 91dB',
    pulse: 'Peak',
    latency: '14ms',
    market: 'usa',
    slug: 'miami',
  },
  {
    id: 't-4',
    type: 'SIGNAL LOCK',
    city: 'São Paulo',
    country: 'Brazil',
    flag: '🇧🇷',
    venue: 'D-Edge Barra Funda',
    message: 'Audio-reactive LED cube locked · Industrial techno pulse',
    pulse: 'Peak',
    latency: '22ms',
    market: 'brazil',
    slug: 'sao-paulo',
  },
  {
    id: 't-5',
    type: 'VIP DROP',
    city: 'Los Angeles',
    country: 'USA',
    flag: '🇺🇸',
    venue: 'Élephante Santa Monica',
    message: 'Sunset terrace full · Walk-in lounge bar serving Aperol spritzes',
    pulse: 'Busy',
    latency: '16ms',
    market: 'usa',
    slug: 'la',
  },
  {
    id: 't-6',
    type: 'PULSE PING',
    city: 'Koh Samui',
    country: 'Thailand',
    flag: '🇹🇭',
    venue: 'Ark Bar Beach Club',
    message: 'Oceanfront fire acrobats starting · Chaweng beach dancefloor packed',
    pulse: 'Peak',
    latency: '36ms',
    market: 'thailand',
    slug: 'koh-samui',
  },
  {
    id: 't-7',
    type: 'GEO HANDSHAKE',
    city: 'Bogotá',
    country: 'Colombia',
    flag: '🇨🇴',
    venue: 'Andrés D.C. Zona T',
    message: 'Hell & Purgatory floors active · Live actors & salsa big band',
    pulse: 'Peak',
    latency: '19ms',
    market: 'colombia',
    slug: 'bogota',
  },
  {
    id: 't-8',
    type: 'SIGNAL LOCK',
    city: 'Rio de Janeiro',
    country: 'Brazil',
    flag: '🇧🇷',
    venue: 'Circo Voador Lapa',
    message: 'Samba de Raiz live circle under Lapa arches · Cold chopp flowing',
    pulse: 'Peak',
    latency: '27ms',
    market: 'brazil',
    slug: 'rio',
  },
  {
    id: 't-9',
    type: 'SCAN DETECTED',
    city: 'New York City',
    country: 'USA',
    flag: '🇺🇸',
    venue: 'House of Yes Brooklyn',
    message: 'Costumed theatrical dance party underway · Aerialists active',
    pulse: 'Busy',
    latency: '12ms',
    market: 'usa',
    slug: 'nyc',
  },
  {
    id: 't-10',
    type: 'PULSE PING',
    city: 'Phuket',
    country: 'Thailand',
    flag: '🇹🇭',
    venue: 'Café del Mar Kamala',
    message: 'Sunset melodic house session · Andaman ocean cabanas locked',
    pulse: 'Busy',
    latency: '38ms',
    market: 'thailand',
    slug: 'phuket',
  },
  {
    id: 't-11',
    type: 'VIP DROP',
    city: 'Austin',
    country: 'USA',
    flag: '🇺🇸',
    venue: 'The Continental Club',
    message: 'South Congress honky-tonk & psych-rock live selector',
    pulse: 'Moderate',
    latency: '17ms',
    market: 'usa',
    slug: 'austin',
  },
  {
    id: 't-12',
    type: 'SIGNAL LOCK',
    city: 'Florianópolis',
    country: 'Brazil',
    flag: '🇧🇷',
    venue: 'P12 Jurerê Internacional',
    message: 'Beach club electronic set · Sunset champagne terrace open',
    pulse: 'Moderate',
    latency: '29ms',
    market: 'brazil',
    slug: 'florianopolis',
  },
]

// 3. CERCA AI QUERY SYNTHESIZER
export interface AIQueryResult {
  query: string
  intent: string
  headline: string
  summary: string
  keyFacts: string[]
  recommendedVenue: string
  actionUrl: string
  actionLabel: string
  matchingMarket?: 'usa' | 'colombia' | 'brazil' | 'thailand'
  matchingCitySlug?: string
}

export function synthesizeAIQuery(rawQuery: string): AIQueryResult {
  const q = rawQuery.toLowerCase().trim()

  if (q.includes('bogot') || q.includes('colombia')) {
    return {
      query: rawQuery,
      intent: 'Regional Nightlife Intelligence',
      headline: 'Bogotá Nightlife: Theatron 13-Room Universe & Zona Rosa Gastronomy',
      summary: 'Perched 2,600m in the Andes, Bogotá boasts Latin America’s most electric nightlife. The crown jewel is Theatron in Chapinero (13 distinct music rooms across an entire city block), paired with theatrical salsa dining at Andrés D.C. and speakeasies in Chapinero Alto.',
      keyFacts: [
        'Theatron Chapinero: 13 themed rooms (EDM, Pop, Techno, Salsa) open Thu–Sat until 5 AM.',
        'Andrés D.C. Zona T: 4 floors of Dante-themed theatrical dining, live actors & big band salsa.',
        'Zona Rosa & Parque 93: Open-air cocktail terraces, Latin jazz & Carlos Vives’ Gaira Cumbia House.',
      ],
      recommendedVenue: 'Theatron Chapinero (Pulse: Peak)',
      actionUrl: `${CERCA_BASE_URL}/city/bogota`,
      actionLabel: 'Explore Bogotá City Guide →',
      matchingMarket: 'colombia',
      matchingCitySlug: 'bogota',
    }
  }

  if (q.includes('bangkok') || q.includes('thailand') || q.includes('rca')) {
    return {
      query: rawQuery,
      intent: 'Theatrical Speakeasies & Skybars',
      headline: 'Bangkok Nightlife: Sing Sing 1930s Speakeasy & Sukhumvit Skybars',
      summary: 'Bangkok delivers a high-voltage clash of immersive 1930s Shanghai noir clubs (Sing Sing Theater), glowing Avatar-tree skybars (Tichuca), and festival-scale sound arenas on Royal City Avenue (RCA).',
      keyFacts: [
        'Sing Sing Theater Sukhumvit: Theatrical Shanghai cabaret with dragon lanterns & underground house.',
        'Tichuca Rooftop: 46th-floor glowing avatar tree lounge with panoramic city views.',
        'Onyx RCA: Bangkok’s festival superclub featuring laser engineering & international DJ lineups.',
      ],
      recommendedVenue: 'Sing Sing Theater (Pulse: Peak)',
      actionUrl: `${CERCA_BASE_URL}/city/bangkok`,
      actionLabel: 'Explore Bangkok City Guide →',
      matchingMarket: 'thailand',
      matchingCitySlug: 'bangkok',
    }
  }

  if (q.includes('sao paulo') || q.includes('são paulo') || q.includes('techno') || q.includes('d-edge')) {
    return {
      query: rawQuery,
      intent: 'Electronic Music Capital',
      headline: 'São Paulo: Underground Techno Temples & Subterranean Architecture',
      summary: 'As Latin America’s electronic capital, São Paulo is anchored by Renato Ratier’s legendary D-Edge (audio-reactive LED room) and subterranean architectural marvels like Bar dos Arcos beneath the Municipal Theater.',
      keyFacts: [
        'D-Edge Barra Funda: World-renowned sound engineering & 24hr electronic marathons.',
        'Bar dos Arcos: Subterranean cocktail labyrinth beneath the historic 1911 Municipal Theater.',
        'Tokyo SP Centro: 9-story retro-futuristic karaoke, vinyl disco & rooftop terrace.',
      ],
      recommendedVenue: 'D-Edge Barra Funda (Pulse: Peak)',
      actionUrl: `${CERCA_BASE_URL}/city/sao-paulo`,
      actionLabel: 'Explore São Paulo City Guide →',
      matchingMarket: 'brazil',
      matchingCitySlug: 'sao-paulo',
    }
  }

  if (q.includes('miami') || q.includes('liv') || q.includes('space') || q.includes('afro')) {
    return {
      query: rawQuery,
      intent: 'Ultra-Clubs & Ocean Lounges',
      headline: 'Miami Nightlife: Club Space Sunrise Terrace & LIV Ultraclub',
      summary: 'Miami thrives on sunrise house marathons on the open-air Club Space terrace, world-famous VIP production at LIV inside Fontainebleau, and 24/7 entertainment at E11EVEN.',
      keyFacts: [
        'Club Space Terrace: Iconic open-air terrace with legendary marathon sunrise house sets.',
        'LIV Miami: Multi-million dollar stadium lighting and global superstar DJ residencies.',
        'Baoli & Wynwood: Secret patio vinyl bars, Afro-house selectors & craft cocktail lounges.',
      ],
      recommendedVenue: 'Club Space Terrace (Pulse: Peak)',
      actionUrl: `${CERCA_BASE_URL}/city/miami`,
      actionLabel: 'Explore Miami City Guide →',
      matchingMarket: 'usa',
      matchingCitySlug: 'miami',
    }
  }

  if (q.includes('la') || q.includes('los angeles') || q.includes('rooftop') || q.includes('elephante')) {
    return {
      query: rawQuery,
      intent: 'Golden Hour Rooftops & Melodic House',
      headline: 'Los Angeles: Coastal Lounges & Sunset Strip Hideaways',
      summary: 'LA nightlife balances oceanfront sunset spritzes at Santa Monica’s Élephante with the 70s Hollywood honky-tonk rooftop Desert 5 Spot and intimate warehouse grooves in the Arts District.',
      keyFacts: [
        'Élephante Santa Monica: Coastal Italian lounge overlooking Pacific surf breaks.',
        'Desert 5 Spot Hollywood: 70s Palm Springs vintage rooftop with live outlaw country & DJs.',
        'Sound Nightclub Hollywood: Pure acoustic Pioneer audio system and dark room house music.',
      ],
      recommendedVenue: 'Élephante Santa Monica (Pulse: Busy)',
      actionUrl: `${CERCA_BASE_URL}/city/la`,
      actionLabel: 'Explore Los Angeles City Guide →',
      matchingMarket: 'usa',
      matchingCitySlug: 'la',
    }
  }

  if (q.includes('nyc') || q.includes('new york') || q.includes('brooklyn') || q.includes('speakeasy')) {
    return {
      query: rawQuery,
      intent: 'Underground Electronic & Bespoke Speakeasies',
      headline: 'New York City: House of Yes Spectacles & Secret Speakeasies',
      summary: 'NYC spans wild theatrical performance dance at House of Yes in Bushwick to secret vintage telephone-booth cocktail hideaways like Please Don’t Tell (PDT) in the East Village.',
      keyFacts: [
        'House of Yes Brooklyn: Acrobats, circus spectacles, costumed crowds & deep house.',
        'Please Don’t Tell (PDT): Hidden cocktail bar accessed through a vintage phone booth.',
        'Nebula NYC: Manhattan’s premiere kinetic-ceiling nightclub with international headliners.',
      ],
      recommendedVenue: 'House of Yes Brooklyn (Pulse: Peak)',
      actionUrl: `${CERCA_BASE_URL}/city/nyc`,
      actionLabel: 'Explore New York City Guide →',
      matchingMarket: 'usa',
      matchingCitySlug: 'nyc',
    }
  }

  if (q.includes('rio') || q.includes('samba') || q.includes('lapa')) {
    return {
      query: rawQuery,
      intent: 'Samba Rodas & Beachfront Lounges',
      headline: 'Rio de Janeiro: Lapa Street Sambas & Coastal Sunsets',
      summary: 'Rio nightlife pulses from open-air street circles in Lapa (Circo Voador, Rio Scenarium) to the iconic sunset applause at Arpoador and upscale outdoor lounges in Gávea.',
      keyFacts: [
        'Circo Voador Lapa: Historic open-air music arena beneath the iconic Roman arches.',
        'Rio Scenarium: 3-story antique palace filled with live choro and traditional samba bands.',
        'Bosque Bar Gávea: Open-air garden cocktail lounge inside the Brazilian Jockey Club.',
      ],
      recommendedVenue: 'Circo Voador Lapa (Pulse: Peak)',
      actionUrl: `${CERCA_BASE_URL}/city/rio`,
      actionLabel: 'Explore Rio de Janeiro Guide →',
      matchingMarket: 'brazil',
      matchingCitySlug: 'rio',
    }
  }

  if (q.includes('samui') || q.includes('phuket') || q.includes('beach club') || q.includes('fire')) {
    return {
      query: rawQuery,
      intent: 'Tropical Day Clubs & Fire Shows',
      headline: 'Thailand Islands: Ark Bar Beach Shows & Café del Mar Kamala',
      summary: 'From Chaweng Beach pool parties with fire acrobats on Koh Samui to Phuket’s upscale sunset day club Café del Mar and the neon energy of Bangla Road superclubs.',
      keyFacts: [
        'Ark Bar Beach Club Samui: Oceanfront fire twirlers, beach daybed DJs & sunken pools.',
        'Café del Mar Phuket: Balearic sunset sessions, beach cabanas & international selectors.',
        'Illuzion Phuket: 5,000-capacity superclub with world top 100 sound engineering.',
      ],
      recommendedVenue: 'Ark Bar Beach Club Samui (Pulse: Peak)',
      actionUrl: `${CERCA_BASE_URL}/city/koh-samui`,
      actionLabel: 'Explore Island Day Clubs Guide →',
      matchingMarket: 'thailand',
      matchingCitySlug: 'koh-samui',
    }
  }

  if (q.includes('qr') || q.includes('handshake') || q.includes('check in') || q.includes('connect')) {
    return {
      query: rawQuery,
      intent: 'Safe Contact Exchange Protocol',
      headline: 'Safe QR Handshake: Zero-Friction Social Contact Exchange',
      summary: 'Cerca’s QR Handshake lets you instantly swap contact details, Instagram handles, or ephemeral chat sessions in loud clubs without shouting phone numbers across crowded dancefloors.',
      keyFacts: [
        'Dynamic Encrypted QR: Generates temporary handshake tokens that expire safely.',
        'Zero Phone Number Exposure: Share only what you choose (socials, bio, or guest avatar).',
        'One-Tap Scan: Open the scanner on qr4luv.com/scan to link profiles in 2 seconds.',
      ],
      recommendedVenue: 'All 15 Regional Hotspots',
      actionUrl: `${CERCA_BASE_URL}/scan`,
      actionLabel: 'Launch Safe QR Handshake →',
    }
  }

  if (q.includes('guest') || q.includes('free') || q.includes('account') || q.includes('login') || q.includes('barrier') || q.includes('pay')) {
    return {
      query: rawQuery,
      intent: 'Zero-Barrier Privacy Architecture',
      headline: 'Zero-Barrier Guest Mode: Instant Exploration With No Forced Signup',
      summary: 'Unlike legacy social apps that lock venues behind signup walls or subscription fees, Cerca operates with zero barriers. You can browse live city maps, check crowd gauges, and read host vitals immediately without an account.',
      keyFacts: [
        'Instant Access: Browse all 15 global city guides immediately without an email or password.',
        'Real-Time Crowd Pulse: View Quiet, Moderate, Busy, or Peak status for free.',
        'Ghost & Discretion Modes: Keep your location fuzzy and browse completely invisibly.',
      ],
      recommendedVenue: 'Live Social Heatmap on qr4luv.com',
      actionUrl: `${CERCA_BASE_URL}/explore`,
      actionLabel: 'Open Live Social Heatmap →',
    }
  }

  return {
    query: rawQuery,
    intent: 'Global Intelligence Telemetry',
    headline: `Telemetry Match for "${rawQuery}"`,
    summary: `Cerca AI scanned our 15 active telemetry hubs across the USA, Colombia, Brazil, and Thailand. Curated venues, verified hosts, and live crowd gauges are ready for instant exploration with zero-barrier guest access.`,
    keyFacts: [
      '15 Live Regional Hubs: Curated nightlife, beach clubs, and speakeasies.',
      'Real-Time Pulse Gauges: Quiet, Moderate, Busy, or Peak crowd levels reported live.',
      'Zero-Barrier Access: Explore city guides without creating an account.',
    ],
    recommendedVenue: 'Explore 15 Active Global Hubs',
    actionUrl: `${CERCA_BASE_URL}/explore`,
    actionLabel: 'Launch Global Social Map →',
    matchingMarket: 'usa',
  }
}

export interface VerifiedHostData {
  id: string
  name: string
  handle: string
  city: string
  country: string
  flag: string
  badge: string
  role: string
  img: string
  glow: string
  rating: number
  reviewsCount: number
  bio: string
  languages: string[]
  musicTags: string[]
  topSpots: string[]
  availableFor: string[]
  lastActiveText: string
  slug: string
  whatsappSupported?: boolean
}

export default function App() {
  const [activeMarket, setActiveMarket] = useState<'usa' | 'colombia' | 'brazil' | 'thailand'>('usa')
  const [dropIndex, setDropIndex] = useState(0)
  const [selectedLanguage, setSelectedLanguage] = useState('English')

  // Selected host for Interactive Dossier Modal
  const [selectedHostModal, setSelectedHostModal] = useState<VerifiedHostData | null>(null)

  // Telemetry Stream state
  const [telemetryIndex, setTelemetryIndex] = useState(0)
  const [isTelemetryPaused, setIsTelemetryPaused] = useState(false)

  // Cerca AI Query Bar state
  const [queryInput, setQueryInput] = useState('')
  const [aiResult, setAiResult] = useState<AIQueryResult | null>(null)
  const [isSynthesizing, setIsSynthesizing] = useState(false)

  // Proximity Geo-Ping state
  const [geoStatus, setGeoStatus] = useState<'idle' | 'scanning' | 'locked' | 'fallback'>('idle')
  const [geoScanStep, setGeoScanStep] = useState(1)
  const [geoData, setGeoData] = useState<{
    lat: number
    lng: number
    nearestHub: HubGeo
    distanceKm: number
    isFallback?: boolean
  } | null>(null)

  // Targeted city slug for pulsing card border
  const [highlightedCitySlug, setHighlightedCitySlug] = useState<string | null>(null)

  // SECTION 3: 4-Market City Hub Data with direct links & verified CDN photography
  const cities = {
    usa: [
      {
        name: 'Los Angeles',
        slug: 'la',
        img: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=1000&auto=format&fit=crop&q=80',
        tag: 'Rooftops & Coast',
        pulse: 'Melodic House',
        venuesCount: 'Curated Rooftops',
      },
      {
        name: 'Miami',
        slug: 'miami',
        img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1000&auto=format&fit=crop&q=80',
        tag: 'Nightlife & Latin Beats',
        pulse: 'Afro-House & Ocean',
        venuesCount: 'Ultra-Clubs & VIP',
      },
      {
        name: 'New York City',
        slug: 'nyc',
        img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&auto=format&fit=crop&q=80',
        tag: 'Underground & Speakeasies',
        pulse: 'Analog Sound & Jazz',
        venuesCount: 'Hidden Speakeasies',
      },
      {
        name: 'Austin',
        slug: 'austin',
        img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1000&auto=format&fit=crop&q=80',
        tag: 'Live Music & Patio Bars',
        pulse: 'Two-Step & Psych-Rock',
        venuesCount: 'Live Music Venues',
      },
      {
        name: 'Nashville',
        slug: 'nashville',
        img: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1000&auto=format&fit=crop&q=80',
        tag: 'Honky Tonk & Bluegrass',
        pulse: 'Live Roots & Soul',
        venuesCount: 'Honky Tonk Stages',
      },
    ],
    colombia: [
      {
        name: 'Bogotá',
        slug: 'bogota',
        img: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=1000&auto=format&fit=crop&q=80',
        tag: 'Zona Rosa & Chapinero',
        pulse: 'Theatron & Andean Nightlife',
        venuesCount: 'Mega-Clubs & Dining',
      },
    ],
    brazil: [
      {
        name: 'Rio de Janeiro',
        slug: 'rio',
        img: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1000&auto=format&fit=crop&q=80',
        tag: 'Samba & Beach Lounges',
        pulse: 'Street Roda & Bossa',
        venuesCount: 'Samba & Beach Lounges',
      },
      {
        name: 'Florianópolis',
        slug: 'florianopolis',
        img: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1000&auto=format&fit=crop&q=80',
        tag: 'Island Parties & Clear Waters',
        pulse: 'Electronic Beach Clubs',
        venuesCount: 'Day & Beach Clubs',
      },
      {
        name: 'Salvador da Bahia',
        slug: 'salvador',
        img: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=1000&auto=format&fit=crop&q=80',
        tag: 'Afro-Beats & Culture',
        pulse: 'Samba-Reggae Drums',
        venuesCount: 'Cultural Venues',
      },
      {
        name: 'São Paulo',
        slug: 'sao-paulo',
        img: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1000&auto=format&fit=crop&q=80',
        tag: 'Techno Temples & Rooftops',
        pulse: 'Underground Electronic & D-Edge',
        venuesCount: 'Electronic Temples',
      },
    ],
    thailand: [
      {
        name: 'Bangkok',
        slug: 'bangkok',
        img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1000&auto=format&fit=crop&q=80',
        tag: 'Theatrical Speakeasies & RCA',
        pulse: 'Sing Sing Theater & Skybars',
        venuesCount: 'Theatrical Speakeasies',
      },
      {
        name: 'Phuket',
        slug: 'phuket',
        img: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1000&auto=format&fit=crop&q=80',
        tag: 'Sunset Clubs & Islands',
        pulse: 'Tropical House & Superclubs',
        venuesCount: 'Sunset Beach Clubs',
      },
      {
        name: 'Koh Samui',
        slug: 'koh-samui',
        img: 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?w=1000&auto=format&fit=crop&q=80',
        tag: 'Day Clubs & Fire Acrobats',
        pulse: 'Ark Bar Beach & Sunken Pools',
        venuesCount: 'Ocean Day Clubs',
      },
      {
        name: 'Krabi',
        slug: 'krabi',
        img: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1000&auto=format&fit=crop&q=80',
        tag: 'Cliff Bars & Quiet Coasts',
        pulse: 'Cave Dining & Fire Shows',
        venuesCount: 'Cliff & Cavern Bars',
      },
      {
        name: 'Pattaya',
        slug: 'pattaya',
        img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1000&auto=format&fit=crop&q=80',
        tag: 'Beach Lounges & Sky Bars',
        pulse: '34th Floor Terraces & EDM',
        venuesCount: 'Sky Bars & EDM',
      },
    ],
  }

  // SECTION 4: App Preview Data with direct routes
  const appPreviews = [
    {
      title: 'Tonight Live Feed',
      caption: 'Real-time activity pulse and trending district drops from verified hosts.',
      img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
      link: `${CERCA_BASE_URL}/tonight`,
      action: 'Open Tonight Feed →',
    },
    {
      title: 'Explore Social Map',
      caption: 'Live interactive map showing verified venues, heatmaps and nearby travelers.',
      img: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80',
      link: `${CERCA_BASE_URL}/explore`,
      action: 'Open Social Map →',
    },
    {
      title: 'Curated City Guides',
      caption: 'Curated nightlife, safety advice, iconic beaches and localized pulse indicators.',
      img: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&auto=format&fit=crop&q=80',
      link: `${CERCA_BASE_URL}/city/la`,
      action: 'View City Guides →',
    },
    {
      title: 'Seasonal Pack Escapes',
      caption: 'High-season beach alternatives and secret coastal coves avoiding tourist crowds.',
      img: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&auto=format&fit=crop&q=80',
      link: `${CERCA_BASE_URL}/thailand-alternatives`,
      action: 'Explore Escapes →',
    },
    {
      title: 'Real-Time Pulse Levels',
      caption: 'Live crowd gauges: Quiet, Moderate, Busy, or Peak before you step out the door.',
      img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
      link: `${CERCA_BASE_URL}/tonight`,
      action: 'Check Live Pulse →',
    },
  ]

  // SECTION 5: Daily Drops Data
  const dailyDrops = [
    {
      title: 'Wynwood Patio & Vinyl Lounge',
      city: 'Miami',
      tag: 'Nightlife Drop',
      desc: 'Outdoor gravel gardens, natural wine, and guest selector rare groove vinyl under the Miami palms.',
      img: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=1200&auto=format&fit=crop&q=80',
      link: `${CERCA_BASE_URL}/city/miami`,
    },
    {
      title: 'Echo Park Garage & Backyard Beats',
      city: 'Los Angeles',
      tag: 'Local Micro-Guide',
      desc: 'Indie sets, natural wines, and intimate backyard beats tucked into the hills of East LA.',
      img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80',
      link: `${CERCA_BASE_URL}/city/la`,
    },
    {
      title: 'Arpoador Sunset & Prainha Coves',
      city: 'Rio de Janeiro',
      tag: 'Beach Sanctuary',
      desc: 'Bypass tourist beaches for wild Atlantic rainforest reserves and the daily sunset applause ritual.',
      img: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1200&auto=format&fit=crop&q=80',
      link: `${CERCA_BASE_URL}/city/rio`,
    },
    {
      title: 'Railay Karst Sunset & Cave Dining',
      city: 'Krabi',
      tag: 'Island Discovery',
      desc: 'Car-free emerald peninsula with candlelit limestone caverns and overwater hammock canopies.',
      img: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&auto=format&fit=crop&q=80',
      link: `${CERCA_BASE_URL}/city/krabi`,
    },
  ]

  // SECTION 6: Verified Hosts Data matching Cerca starter profiles
  const verifiedHosts: VerifiedHostData[] = [
    {
      id: 'camila-bogota',
      name: 'Camila Morales',
      handle: 'camila_bogota',
      city: 'Bogotá',
      country: 'Colombia',
      flag: '🇨🇴',
      badge: 'Bogotá Insider',
      role: 'Local Guide & Curator',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
      glow: '#06b6d4',
      rating: 5.0,
      reviewsCount: 68,
      bio: 'Zona Rosa gastronomy curator and nightlife photographer. Showing travelers the best 13-room parties at Theatron, salsa dining at Andrés D.C., and underground electronic spots in Chapinero.',
      languages: ['Spanish', 'English'],
      musicTags: ['Cumbia', 'Salsa', 'EDM', 'Melodic Techno'],
      topSpots: ['Theatron Chapinero', 'Andrés D.C.', 'Esposito Zona Rosa'],
      availableFor: ['Tour', 'Drinks', 'Tips', 'Events'],
      lastActiveText: 'Active 5m ago',
      slug: 'bogota',
      whatsappSupported: true,
    },
    {
      id: 'sofia-miami',
      name: 'Sofia Delgado',
      handle: 'sofi_mia',
      city: 'Miami',
      country: 'United States',
      flag: '🇺🇸',
      badge: 'VIP Host',
      role: 'Nightlife Insider',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
      glow: '#f43f5e',
      rating: 4.9,
      reviewsCount: 64,
      bio: 'South Beach events concierge & Wynwood creative. Connecting travelers with rooftop guestlists, beach volleyball mixers, and underground Afro-house parties.',
      languages: ['English', 'Spanish', 'Portuguese'],
      musicTags: ['Afro-House', 'Reggaeton', 'Deep House', 'Tech-House'],
      topSpots: ['Gramps Wynwood', '1 Hotel Beach Club', 'Space Terrace'],
      availableFor: ['Events', 'Drinks', 'Tips'],
      lastActiveText: 'Active 5m ago',
      slug: 'miami',
      whatsappSupported: true,
    },
    {
      id: 'elena-la',
      name: 'Elena Vance',
      handle: 'elena_lalive',
      city: 'Los Angeles',
      country: 'United States',
      flag: '🇺🇸',
      badge: 'Verified Host',
      role: 'District Ambassador',
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80',
      glow: '#a855f7',
      rating: 4.9,
      reviewsCount: 51,
      bio: 'West Hollywood photographer & sunset hike organizer. Ask me about golden hour rooftops, Venice Beach surf sessions, and hidden downtown speakeasies.',
      languages: ['English', 'French'],
      musicTags: ['Melodic House', 'Sunset Disco', 'R&B'],
      topSpots: ['Élephante', 'Broken Shaker', 'Sound Nightclub'],
      availableFor: ['Drinks', 'Tips', 'Tour'],
      lastActiveText: 'Active 3m ago',
      slug: 'la',
      whatsappSupported: true,
    },
    {
      id: 'julian-nyc',
      name: 'Julian Chen',
      handle: 'julian_nyc',
      city: 'New York City',
      country: 'United States',
      flag: '🇺🇸',
      badge: 'Local Guide',
      role: 'Audio & Speakeasy Guide',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
      glow: '#38bdf8',
      rating: 5.0,
      reviewsCount: 42,
      bio: 'Brooklyn audio engineer & Lower East Side resident. Passionate about vinyl listening bars, natural wine cellars, and late-night Bushwick dance floors.',
      languages: ['English', 'Mandarin'],
      musicTags: ['Vinyl Sets', 'Minimal Techno', 'Jazz', 'Indie'],
      topSpots: ['Nowadays', 'Tokyo Record Bar', 'Dime Deli'],
      availableFor: ['Tips', 'Drinks', 'Tour'],
      lastActiveText: 'Active 18m ago',
      slug: 'nyc',
      whatsappSupported: true,
    },
    {
      id: 'travis-austin',
      name: 'Travis Sterling',
      handle: 'travis_atx',
      city: 'Austin',
      country: 'United States',
      flag: '🇺🇸',
      badge: 'Verified Host',
      role: 'Music Scene Host',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80',
      glow: '#f97316',
      rating: 5.0,
      reviewsCount: 38,
      bio: 'East Austin resident, guitarist & door host at Hotel Vegas. Happy to show visitors two-stepping basics, secret taco trailers, and live honky-tonk bars.',
      languages: ['English', 'Spanish'],
      musicTags: ['Indie Rock', 'Americana', 'Psych-Rock', 'Country'],
      topSpots: ['The White Horse', 'Hotel Vegas', 'Justine’s Brasserie'],
      availableFor: ['Drinks', 'Tips', 'Events'],
      lastActiveText: 'Active 12m ago',
      slug: 'austin',
      whatsappSupported: true,
    },
    {
      id: 'thiago-rio',
      name: 'Thiago Alencar',
      handle: 'thiago_carioca',
      city: 'Rio de Janeiro',
      country: 'Brazil',
      flag: '🇧🇷',
      badge: 'Carioca Guide',
      role: 'Local Guide',
      img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80',
      glow: '#06b6d4',
      rating: 5.0,
      reviewsCount: 77,
      bio: 'Born and raised in Ipanema. Surf coach & samba guitarist. Guiding international visitors to wild beaches (Prainha, Grumari), Arpoador sunsets, and Lapa street circles.',
      languages: ['Portuguese', 'English', 'Spanish'],
      musicTags: ['Samba de Raiz', 'Bossa Nova', 'Funk Carioca', 'Reggae'],
      topSpots: ['Pedra do Sal', 'Prainha Beach', 'Bar Urca'],
      availableFor: ['Tour', 'Language Exchange', 'Drinks'],
      lastActiveText: 'Active now',
      slug: 'rio',
      whatsappSupported: true,
    },
    {
      id: 'renato-saopaulo',
      name: 'Renato "Tato" Silveira',
      handle: 'tato_sp',
      city: 'São Paulo',
      country: 'Brazil',
      flag: '🇧🇷',
      badge: 'Underground Host',
      role: 'Nightlife Insider',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
      glow: '#ec4899',
      rating: 4.9,
      reviewsCount: 64,
      bio: 'Electronic music producer and resident selector in Barra Funda. Helping music lovers find D-Edge techno nights, hidden underground vaults, and rooftop disco views over Edifício Copan.',
      languages: ['Portuguese', 'English', 'Spanish'],
      musicTags: ['Techno', 'Tech-House', 'Nu-Disco', 'MPB'],
      topSpots: ['D-Edge', 'Tokyo SP Rooftop', 'Bar dos Arcos'],
      availableFor: ['Drinks', 'Tips', 'Events'],
      lastActiveText: 'Active 8m ago',
      slug: 'sao-paulo',
      whatsappSupported: true,
    },
    {
      id: 'top-bangkok',
      name: 'Natthapol "Top" Thongdee',
      handle: 'top_bangkok',
      city: 'Bangkok',
      country: 'Thailand',
      flag: '🇹🇭',
      badge: 'VIP Host',
      role: 'Nightlife Insider',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
      glow: '#eab308',
      rating: 5.0,
      reviewsCount: 77,
      bio: 'Sukhumvit hospitality curator and Thong Lo insider. Connecting travelers to secret mezzanine lounges at Sing Sing Theater, RCA mega-clubs, and sunset skyline cocktails at Tichuca.',
      languages: ['Thai', 'English'],
      musicTags: ['Deep House', 'EDM', 'Afro Beats', 'Melodic Techno'],
      topSpots: ['Sing Sing Theater', 'Onyx RCA', 'Tichuca Rooftop'],
      availableFor: ['Drinks', 'Tips', 'Events'],
      lastActiveText: 'Active now',
      slug: 'bangkok',
      whatsappSupported: true,
    },
    {
      id: 'somchai-phuket',
      name: 'Somchai Prasert',
      handle: 'somchai_andaman',
      city: 'Phuket',
      country: 'Thailand',
      flag: '🇹🇭',
      badge: 'TAT Certified Guide',
      role: 'Island & Nightlife Guide',
      img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80',
      glow: '#10b981',
      rating: 5.0,
      reviewsCount: 89,
      bio: 'PADI Master Scuba Diver & island boat captain. Specializes in sunrise speedboat tours avoiding tourist packs, secluded freedom beaches, and night market culinary walks.',
      languages: ['Thai', 'English'],
      musicTags: ['Tropical House', 'Reggae', 'Thai Pop'],
      topSpots: ['Banana Beach', 'Bang Tao Sunset Clubs', 'Phuket Old Town Market'],
      availableFor: ['Tour', 'Tips', 'Events'],
      lastActiveText: 'Active now',
      slug: 'phuket',
      whatsappSupported: true,
    },
    {
      id: 'may-krabi',
      name: 'Mayuree "May" Chai',
      handle: 'may_railay',
      city: 'Krabi',
      country: 'Thailand',
      flag: '🇹🇭',
      badge: 'Verified Host',
      role: 'Railay Host',
      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80',
      glow: '#f59e0b',
      rating: 4.9,
      reviewsCount: 53,
      bio: 'Eco-lodge owner on Railay Beach and rock-climbing instructor. Helping travelers navigate longtail boat routes, hidden emerald pools, and fire shows by the water.',
      languages: ['Thai', 'English'],
      musicTags: ['Acoustic', 'Chillout', 'Deep House'],
      topSpots: ['Railay East Viewpoint', 'Hong Island Lagoon', 'Ao Nang Night Market'],
      availableFor: ['Tour', 'Tips', 'Language Exchange'],
      lastActiveText: 'Active 21m ago',
      slug: 'krabi',
      whatsappSupported: true,
    },
  ]

  // SECTION 5: Carousel auto-rotation timer
  useEffect(() => {
    const timer = setInterval(() => {
      setDropIndex((prev) => (prev + 1) % dailyDrops.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [dailyDrops.length])

  // SECTION 5B: Telemetry stream auto-cycle timer
  useEffect(() => {
    if (isTelemetryPaused) return
    const timer = setInterval(() => {
      setTelemetryIndex((prev) => (prev + 1) % TELEMETRY_EVENTS.length)
    }, 3800)
    return () => clearInterval(timer)
  }, [isTelemetryPaused])

  // Handler: Proximity Geo-Ping Triangulation
  const handleGeoPing = () => {
    setGeoStatus('scanning')
    setGeoScanStep(1)

    setTimeout(() => setGeoScanStep(2), 350)
    setTimeout(() => setGeoScanStep(3), 700)

    const executeDistanceMatching = (lat: number, lng: number, isFallback = false) => {
      let closestHub = REGIONAL_HUBS[0]
      let minDistance = calculateDistanceKm(lat, lng, closestHub.lat, closestHub.lng)

      for (let i = 1; i < REGIONAL_HUBS.length; i++) {
        const dist = calculateDistanceKm(lat, lng, REGIONAL_HUBS[i].lat, REGIONAL_HUBS[i].lng)
        if (dist < minDistance) {
          minDistance = dist
          closestHub = REGIONAL_HUBS[i]
        }
      }

      setGeoData({
        lat,
        lng,
        nearestHub: closestHub,
        distanceKm: minDistance,
        isFallback,
      })
      setGeoStatus(isFallback ? 'fallback' : 'locked')
      setActiveMarket(closestHub.market)
      setHighlightedCitySlug(closestHub.slug)

      // Smooth scroll to city hubs directory
      setTimeout(() => {
        document.getElementById('cities-directory')?.scrollIntoView({ behavior: 'smooth' })
      }, 950)
    }

    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setTimeout(() => {
            executeDistanceMatching(position.coords.latitude, position.coords.longitude, false)
          }, 850)
        },
        () => {
          // Graceful fallback: simulated Latin American Telemetry Gateway (Bogotá)
          setTimeout(() => {
            executeDistanceMatching(4.711, -74.0721, true)
          }, 900)
        },
        { timeout: 5000 }
      )
    } else {
      setTimeout(() => {
        executeDistanceMatching(4.711, -74.0721, true)
      }, 900)
    }
  }

  // Handler: Cerca AI Query submission & keyword synthesis
  const handleQuerySubmit = (text: string) => {
    if (!text.trim()) return
    setIsSynthesizing(true)
    setTimeout(() => {
      const result = synthesizeAIQuery(text)
      setAiResult(result)
      setIsSynthesizing(false)
      if (result.matchingMarket) {
        setActiveMarket(result.matchingMarket)
      }
      if (result.matchingCitySlug) {
        setHighlightedCitySlug(result.matchingCitySlug)
      }
    }, 280)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#030305', color: '#ffffff', overflowX: 'hidden', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style>{`
        @keyframes radarSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.85); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1200%); }
        }
        .telemetry-hover:hover {
          background: rgba(6, 182, 212, 0.12) !important;
        }
        .chip-hover:hover {
          background: rgba(6, 182, 212, 0.22) !important;
          border-color: rgba(6, 182, 212, 0.6) !important;
          transform: translateY(-1px);
        }
      `}</style>

      {/* NAVIGATION BAR */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(3, 3, 5, 0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: 1240,
        margin: '0 auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #06b6d4, #a855f7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 900,
            fontSize: 16,
            boxShadow: '0 0 16px rgba(6, 182, 212, 0.4)',
          }}>
            ⚡
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
            ScanQR<span style={{ color: '#06b6d4' }}>Global</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a
            href={`${CERCA_BASE_URL}/explore`}
            style={{
              padding: '8px 16px',
              borderRadius: 10,
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#e4e4e7',
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
          >
            Explore Map
          </a>
          <a
            href={CERCA_BASE_URL}
            style={{
              padding: '8px 18px',
              borderRadius: 10,
              background: 'linear-gradient(135deg, #a855f7, #ec4899)',
              color: '#fff',
              fontSize: 13,
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 18px rgba(168, 85, 247, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            Launch Cerca App <ArrowRight size={14} />
          </a>
        </div>
      </nav>

      {/* 0. LIVE GLOBAL TELEMETRY STREAM TICKER */}
      <div
        onMouseEnter={() => setIsTelemetryPaused(true)}
        onMouseLeave={() => setIsTelemetryPaused(false)}
        style={{
          background: 'rgba(5, 5, 8, 0.96)',
          borderBottom: '1px solid rgba(6, 182, 212, 0.22)',
          borderTop: '1px solid rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(12px)',
          padding: '8px 16px',
          position: 'sticky',
          top: 61,
          zIndex: 90,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          fontSize: 12,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace, sans-serif",
          overflow: 'hidden',
        }}
      >
        {/* Left: Glowing Live Beacon & Orbital Node Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '3px 8px',
            borderRadius: 6,
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            color: '#10b981',
            fontWeight: 800,
            fontSize: 11,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            <span style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 8px #10b981',
              display: 'inline-block',
              animation: 'pulseDot 1.8s infinite',
            }} />
            Live Telemetry
          </div>
          <span style={{ color: '#52525b', fontSize: 11 }}>
            15 HUBS ONLINE • AES-256
          </span>
        </div>

        {/* Center: Dynamic Active Signal */}
        {(() => {
          const currentEvt = TELEMETRY_EVENTS[telemetryIndex]
          return (
            <div
              onClick={() => {
                setActiveMarket(currentEvt.market)
                setHighlightedCitySlug(currentEvt.slug)
                document.getElementById('cities-directory')?.scrollIntoView({ behavior: 'smooth' })
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                cursor: 'pointer',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                padding: '3px 10px',
                borderRadius: 8,
                transition: 'background 0.2s',
              }}
              className="telemetry-hover"
              title="Click to jump to this active hub"
            >
              <span style={{
                padding: '2px 6px',
                borderRadius: 4,
                fontSize: 10,
                fontWeight: 800,
                background: currentEvt.type === 'SIGNAL LOCK' ? 'rgba(6, 182, 212, 0.18)' : currentEvt.type === 'VIP DROP' ? 'rgba(236, 72, 153, 0.18)' : 'rgba(168, 85, 247, 0.18)',
                color: currentEvt.type === 'SIGNAL LOCK' ? '#22d3ee' : currentEvt.type === 'VIP DROP' ? '#f472b6' : '#c084fc',
                border: `1px solid ${currentEvt.type === 'SIGNAL LOCK' ? 'rgba(6, 182, 212, 0.4)' : currentEvt.type === 'VIP DROP' ? 'rgba(236, 72, 153, 0.4)' : 'rgba(168, 85, 247, 0.4)'}`,
              }}>
                {currentEvt.type}
              </span>

              <span style={{ color: '#e4e4e7', fontWeight: 700 }}>
                {currentEvt.flag} [{currentEvt.city}]
              </span>

              <span style={{ color: '#06b6d4', fontWeight: 600 }}>
                {currentEvt.venue}
              </span>

              <span style={{ color: '#a1a1aa', display: 'inline', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                — {currentEvt.message}
              </span>

              <span style={{
                color: currentEvt.pulse === 'Peak' ? '#f43f5e' : currentEvt.pulse === 'Busy' ? '#fbbf24' : '#10b981',
                fontWeight: 800,
                fontSize: 11,
              }}>
                • {currentEvt.pulse}
              </span>

              <span style={{ color: '#52525b', fontSize: 10 }}>
                ({currentEvt.latency})
              </span>

              <span style={{ color: '#38bdf8', fontSize: 11, display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                Jump <ArrowRight size={10} />
              </span>
            </div>
          )
        })()}

        {/* Right: Controls & Index */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <span style={{ color: '#52525b', fontSize: 11 }}>
            {telemetryIndex + 1}/{TELEMETRY_EVENTS.length}
          </span>
          <button
            onClick={() => setTelemetryIndex((prev) => (prev - 1 + TELEMETRY_EVENTS.length) % TELEMETRY_EVENTS.length)}
            style={{
              width: 22,
              height: 22,
              borderRadius: 4,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#a1a1aa',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Previous Signal"
          >
            <ChevronLeft size={12} />
          </button>
          <button
            onClick={() => setTelemetryIndex((prev) => (prev + 1) % TELEMETRY_EVENTS.length)}
            style={{
              width: 22,
              height: 22,
              borderRadius: 4,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#a1a1aa',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Next Signal"
          >
            <ChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <section style={{
        position: 'relative',
        minHeight: '84vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 20px 60px',
        backgroundImage: `
          radial-gradient(circle at 50% 20%, rgba(168, 85, 247, 0.25), transparent 55%),
          radial-gradient(circle at 80% 40%, rgba(6, 182, 212, 0.2), transparent 50%),
          linear-gradient(to bottom, rgba(7, 7, 10, 0.75), #07070a),
          url('https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1600&auto=format&fit=crop&q=80')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 960, margin: '0 auto' }}>
          {/* Tag badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 999,
            background: 'rgba(6, 182, 212, 0.12)',
            border: '1px solid rgba(6, 182, 212, 0.35)',
            color: '#38bdf8',
            fontSize: 12,
            fontWeight: 700,
            marginBottom: 24,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}>
            ⚡ ScanQR Global • The Master Gateway for Cerca Social on qr4luv.com
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(34px, 5.5vw, 60px)',
            fontWeight: 900,
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            margin: '0 0 22px',
            background: 'linear-gradient(135deg, #ffffff 40%, #c4b5fd 75%, #38bdf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Live Social Map for People, Places, Nightlife &amp; Travelers
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: 'clamp(16px, 2.5vw, 20px)',
            color: '#cbd5e1',
            lineHeight: 1.6,
            maxWidth: 720,
            margin: '0 auto 40px',
            fontWeight: 400,
          }}>
            Explore global cities, verify live crowd levels, discover curated nightlife, and connect safely with zero-barrier guest access — powered by Cerca on <strong style={{ color: '#fff' }}>qr4luv.com</strong>.
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginBottom: 20 }}>
            <a
              href={`${CERCA_BASE_URL}/explore`}
              style={{
                height: 52,
                padding: '0 30px',
                borderRadius: 14,
                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                color: '#fff',
                fontSize: 15,
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 8px 30px rgba(168, 85, 247, 0.38)',
              }}
            >
              Explore Live Cities <ExternalLink size={16} />
            </a>
            <a
              href={`${CERCA_BASE_URL}/tonight`}
              style={{
                height: 52,
                padding: '0 28px',
                borderRadius: 14,
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                color: '#f8fafc',
                fontSize: 15,
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                backdropFilter: 'blur(10px)',
              }}
            >
              Tonight’s Live Pulse <Flame size={16} color="#f43f5e" />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.qr4luv.cerca"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                height: 52,
                padding: '0 24px',
                borderRadius: 14,
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                color: '#f8fafc',
                fontSize: 15,
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                backdropFilter: 'blur(10px)',
              }}
            >
              📱 Google Play App
            </a>
          </div>

          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 20 }}>
            ✓ No account required to browse • Real-time verified staff updates • Instant guest access
          </div>

          {/* PROXIMITY GEO-PING BUTTON & RADAR LOCK HUD */}
          <div style={{ marginTop: 24, marginBottom: 18 }}>
            <button
              type="button"
              onClick={handleGeoPing}
              disabled={geoStatus === 'scanning'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '13px 26px',
                borderRadius: 14,
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(168, 85, 247, 0.2))',
                border: '1px solid rgba(6, 182, 212, 0.55)',
                color: '#38bdf8',
                fontSize: 14,
                fontWeight: 800,
                cursor: geoStatus === 'scanning' ? 'wait' : 'pointer',
                boxShadow: '0 0 24px rgba(6, 182, 212, 0.28)',
                transition: 'all 0.2s ease',
              }}
            >
              <Crosshair size={18} style={{ animation: geoStatus === 'scanning' ? 'radarSpin 1.4s linear infinite' : 'none' }} />
              <span>{geoStatus === 'scanning' ? '🛰️ Acquiring Orbital Telemetry...' : '⚡ Detect My Vibe / Radar Ping Nearest Hub'}</span>
            </button>
          </div>

          {/* PROXIMITY RADAR HUD (When scanning, locked, or fallback) */}
          {geoStatus !== 'idle' && (
            <div style={{
              maxWidth: 780,
              margin: '0 auto 34px',
              padding: '22px 24px',
              borderRadius: 20,
              background: 'rgba(8, 8, 14, 0.94)',
              border: geoStatus === 'scanning' ? '1px solid rgba(6, 182, 212, 0.5)' : '1px solid rgba(16, 185, 129, 0.55)',
              boxShadow: '0 0 35px rgba(6, 182, 212, 0.22), inset 0 0 20px rgba(6, 182, 212, 0.05)',
              textAlign: 'left',
              backdropFilter: 'blur(16px)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Scanline element */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: 'linear-gradient(90deg, transparent, #06b6d4, #a855f7, transparent)',
                animation: 'scanline 2.5s linear infinite',
                pointerEvents: 'none',
              }} />

              {geoStatus === 'scanning' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    border: '2px solid #06b6d4',
                    borderTopColor: 'transparent',
                    animation: 'radarSpin 0.9s linear infinite',
                    flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#38bdf8', marginBottom: 4 }}>
                      [STAGE {geoScanStep}/3] {geoScanStep === 1 ? '🛰️ Calibrating orbital sensor mesh...' : geoScanStep === 2 ? '📡 Triangulating GPS latitude & longitude...' : '⚡ Calculating Great-Circle distance to 15 hubs...'}
                    </div>
                    <div style={{ fontSize: 12, color: '#71717a' }}>
                      Locating closest active telemetry node across USA, Colombia, Brazil &amp; Thailand...
                    </div>
                  </div>
                </div>
              ) : geoData ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <span style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: '#10b981',
                        boxShadow: '0 0 10px #10b981',
                        display: 'inline-block',
                      }} />
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        SIGNAL LOCKED • {geoData.isFallback ? 'TELEMETRY SIMULATION' : 'GPS HIGH-PRECISION'}
                      </span>
                    </div>
                    <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#71717a' }}>
                      LAT: {geoData.lat.toFixed(4)}° • LNG: {geoData.lng.toFixed(4)}°
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
                    <div>
                      <div style={{ fontSize: 20, fontWeight: 900, color: '#fff', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span>{geoData.nearestHub.flag}</span>
                        <span>{geoData.nearestHub.name}, {geoData.nearestHub.country}</span>
                        <span style={{
                          fontSize: 12,
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: 6,
                          background: 'rgba(6, 182, 212, 0.15)',
                          color: '#38bdf8',
                          border: '1px solid rgba(6, 182, 212, 0.3)',
                        }}>
                          {geoData.distanceKm} km away
                        </span>
                      </div>
                      <p style={{ margin: '0 0 8px', fontSize: 13, color: '#cbd5e1' }}>
                        Current Pulse: <strong style={{ color: '#ec4899' }}>{geoData.nearestHub.pulse}</strong> • Vibe: <strong style={{ color: '#a855f7' }}>{geoData.nearestHub.vibe}</strong>
                      </p>
                      <p style={{ margin: 0, fontSize: 12, color: '#94a3b8' }}>
                        Recommended Hotspot: <strong style={{ color: '#fff' }}>{geoData.nearestHub.topSpot}</strong>
                      </p>
                    </div>

                    <a
                      href={`${CERCA_BASE_URL}/city/${geoData.nearestHub.slug}`}
                      style={{
                        padding: '10px 18px',
                        borderRadius: 12,
                        background: 'linear-gradient(135deg, #06b6d4, #a855f7)',
                        color: '#fff',
                        fontSize: 13,
                        fontWeight: 800,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        boxShadow: '0 4px 16px rgba(6, 182, 212, 0.3)',
                        flexShrink: 0,
                      }}
                    >
                      Enter {geoData.nearestHub.name} Live Map <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* CERCA AI QUERY BAR & NATURAL-LANGUAGE SYNTHESIZER */}
          <div style={{
            maxWidth: 860,
            margin: '0 auto',
            textAlign: 'left',
            background: 'rgba(7, 7, 12, 0.94)',
            border: '1px solid rgba(6, 182, 212, 0.35)',
            borderRadius: 22,
            padding: '24px 22px',
            boxShadow: '0 0 35px rgba(6, 182, 212, 0.12), inset 0 0 20px rgba(168, 85, 247, 0.05)',
            backdropFilter: 'blur(20px)',
          }}>
            {/* Header label */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  background: 'linear-gradient(135deg, #06b6d4, #a855f7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: 12,
                }}>
                  <Bot size={14} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.01em' }}>
                  Cerca AI Query Engine
                </span>
                <span style={{
                  fontSize: 10,
                  fontWeight: 800,
                  padding: '2px 6px',
                  borderRadius: 4,
                  background: 'rgba(6, 182, 212, 0.14)',
                  color: '#38bdf8',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                }}>
                  ACTIVE .AI STREAM
                </span>
              </div>
              <span style={{ fontSize: 11, color: '#71717a' }}>
                Natural Language Parser • 15 Hubs
              </span>
            </div>

            {/* Input Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: '#0d0d13',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: 14,
              padding: '6px 8px 6px 14px',
              boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.5)',
            }}>
              <Search size={18} color="#06b6d4" style={{ flexShrink: 0 }} />
              <input
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleQuerySubmit(queryInput)
                }}
                placeholder="Ask Cerca AI: 'Where is the best nightlife in Bogotá?', 'Bangkok speakeasies', 'How does QR handshake work?'..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  fontSize: 14,
                  fontFamily: 'inherit',
                }}
              />
              {queryInput && (
                <button
                  type="button"
                  onClick={() => {
                    setQueryInput('')
                    setAiResult(null)
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#71717a',
                    cursor: 'pointer',
                    padding: 4,
                    display: 'flex',
                  }}
                >
                  <X size={16} />
                </button>
              )}
              <button
                type="button"
                onClick={() => handleQuerySubmit(queryInput)}
                disabled={isSynthesizing || !queryInput.trim()}
                style={{
                  height: 40,
                  padding: '0 18px',
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #06b6d4, #a855f7)',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 800,
                  border: 'none',
                  cursor: isSynthesizing || !queryInput.trim() ? 'not-allowed' : 'pointer',
                  opacity: isSynthesizing || !queryInput.trim() ? 0.6 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: '0 4px 14px rgba(6, 182, 212, 0.35)',
                  flexShrink: 0,
                  transition: 'all 0.15s ease',
                }}
              >
                {isSynthesizing ? 'Synthesizing...' : 'Query AI'}
                <Zap size={14} />
              </button>
            </div>

            {/* Quick Prompt Suggestion Chips */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              marginTop: 12,
              alignItems: 'center',
            }}>
              <span style={{ fontSize: 11, color: '#71717a', fontWeight: 600 }}>Try queries:</span>
              {[
                { label: '🔥 Nightlife in Bogotá', q: 'Where is the best nightlife in Bogotá?' },
                { label: '🍸 Bangkok Speakeasies', q: 'Theatrical speakeasies in Bangkok' },
                { label: '🎧 São Paulo Techno', q: 'Best underground techno in São Paulo' },
                { label: '🏖️ Koh Samui Day Clubs', q: 'Beach day clubs on Koh Samui' },
                { label: '📲 Safe QR Handshake', q: 'How does the safe QR handshake work?' },
                { label: '🛡️ Zero-Barrier Guest Mode', q: 'Is Cerca free for guests without login?' },
              ].map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => {
                    setQueryInput(chip.q)
                    handleQuerySubmit(chip.q)
                  }}
                  className="chip-hover"
                  style={{
                    padding: '4px 11px',
                    borderRadius: 999,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#cbd5e1',
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* AI Synthesized Response Card */}
            {aiResult && (
              <div style={{
                marginTop: 18,
                padding: '18px 20px',
                borderRadius: 16,
                background: 'rgba(12, 12, 18, 0.95)',
                border: '1px solid rgba(6, 182, 212, 0.45)',
                boxShadow: '0 8px 30px rgba(6, 182, 212, 0.18)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '3px 8px',
                    borderRadius: 6,
                    background: 'rgba(168, 85, 247, 0.15)',
                    border: '1px solid rgba(168, 85, 247, 0.35)',
                    color: '#c084fc',
                    fontSize: 10,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}>
                    ⚡ {aiResult.intent} • 18ms SYNTHESIS
                  </div>
                  <span style={{ fontSize: 11, color: '#71717a' }}>
                    Verified Telemetry Node
                  </span>
                </div>

                <h3 style={{
                  fontSize: 16,
                  fontWeight: 800,
                  margin: '0 0 8px',
                  color: '#ffffff',
                }}>
                  {aiResult.headline}
                </h3>

                <p style={{
                  fontSize: 13,
                  color: '#cbd5e1',
                  lineHeight: 1.6,
                  margin: '0 0 14px',
                }}>
                  {aiResult.summary}
                </p>

                {/* Key Facts list */}
                <div style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: 10,
                  padding: '10px 14px',
                  marginBottom: 14,
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#38bdf8', marginBottom: 6, textTransform: 'uppercase' }}>
                    Key Intelligence Signals:
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: '#e4e4e7', lineHeight: 1.6 }}>
                    {aiResult.keyFacts.map((fact, i) => (
                      <li key={i}>{fact}</li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Spot & Action button */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>
                    Recommended Spot: <strong style={{ color: '#38bdf8' }}>{aiResult.recommendedVenue}</strong>
                  </div>

                  <a
                    href={aiResult.actionUrl}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 10,
                      background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 800,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      boxShadow: '0 4px 14px rgba(168, 85, 247, 0.35)',
                    }}
                  >
                    {aiResult.actionLabel}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. CORE PILLARS / MODES (4 Equal Columns, Light Card Background) */}
      <section style={{ maxWidth: 1200, margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 800, margin: '0 0 10px' }}>
            Four Modes. Zero Confusion.
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 15, margin: 0 }}>
            Designed for intuitive, real-world exploration and spontaneous nights out.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 20,
        }}>
          {/* Pillar 1: Guest Mode */}
          <a
            href={`${CERCA_BASE_URL}/explore`}
            style={{
              textDecoration: 'none',
              background: '#ffffff',
              color: '#0f172a',
              borderRadius: 18,
              padding: '28px 22px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.25)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: '#0ea5e9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}>
              <Compass size={24} />
            </div>
            <h3 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>Guest Mode</h3>
            <p style={{ margin: 0, fontSize: 14, color: '#475569', lineHeight: 1.55 }}>
              Browse active city heatmaps, venues, events, and curated micro-guides immediately without creating an account.
            </p>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0284c7', marginTop: 'auto' }}>
              Explore Map as Guest →
            </span>
          </a>

          {/* Pillar 2: Tourist Mode */}
          <a
            href={`${CERCA_BASE_URL}/travel-buddy`}
            style={{
              textDecoration: 'none',
              background: '#ffffff',
              color: '#0f172a',
              borderRadius: 18,
              padding: '28px 22px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.25)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}>
              <Globe size={24} />
            </div>
            <h3 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>Tourist Mode</h3>
            <p style={{ margin: 0, fontSize: 14, color: '#475569', lineHeight: 1.55 }}>
              Real-time multi-language translation, vetted safety advice, and insider beach &amp; nightlife itineraries worldwide.
            </p>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#059669', marginTop: 'auto' }}>
              Open Travel Buddy →
            </span>
          </a>

          {/* Pillar 3: Nightlife & Event Pulse */}
          <a
            href={`${CERCA_BASE_URL}/tonight`}
            style={{
              textDecoration: 'none',
              background: '#ffffff',
              color: '#0f172a',
              borderRadius: 18,
              padding: '28px 22px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.25)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: '#f43f5e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}>
              <Flame size={24} />
            </div>
            <h3 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>Nightlife &amp; Event Pulse</h3>
            <p style={{ margin: 0, fontSize: 14, color: '#475569', lineHeight: 1.55 }}>
              Live crowd levels (Quiet, Moderate, Busy, Peak), music genres, dress vibe, and entry costs before heading out.
            </p>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#e11d48', marginTop: 'auto' }}>
              Check Tonight's Pulse →
            </span>
          </a>

          {/* Pillar 4: Optional QR Identity */}
          <a
            href={`${CERCA_BASE_URL}/scan`}
            style={{
              textDecoration: 'none',
              background: '#ffffff',
              color: '#0f172a',
              borderRadius: 18,
              padding: '28px 22px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.25)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: '#f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}>
              <QrCode size={24} />
            </div>
            <h3 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>Optional QR Identity</h3>
            <p style={{ margin: 0, fontSize: 14, color: '#475569', lineHeight: 1.55 }}>
              Safe physical handshake for venue check-ins and verified social card exchanges without revealing personal numbers.
            </p>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#d97706', marginTop: 'auto' }}>
              Scan QR Contact Card →
            </span>
          </a>
        </div>
      </section>

      {/* 3. 4-MARKET CITY HUB (USA / Colombia / Brazil / Thailand) */}
      <section id="cities-directory" style={{ maxWidth: 1200, margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 28,
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#38bdf8', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>
              <MapPin size={14} /> Curated Global Hubs
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 800, margin: '0 0 8px' }}>
              Live City Guides &amp; Hotspots
            </h2>
            <p style={{ color: '#94a3b8', fontSize: 15, margin: 0 }}>
              Click any city to view its curated venues, live host statuses, and district vibes on Cerca.
            </p>
          </div>

          {/* Market selector tabs */}
          <div style={{
            display: 'inline-flex',
            padding: 4,
            background: '#121217',
            borderRadius: 12,
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}>
            {(['usa', 'colombia', 'brazil', 'thailand'] as const).map((market) => (
              <button
                key={market}
                onClick={() => setActiveMarket(market)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 8,
                  border: 'none',
                  background: activeMarket === market ? '#a855f7' : 'transparent',
                  color: activeMarket === market ? '#fff' : '#a1a1aa',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  transition: 'all 0.15s ease',
                }}
              >
                {market === 'usa' ? '🇺🇸 USA' : market === 'colombia' ? '🇨🇴 Colombia' : market === 'brazil' ? '🇧🇷 Brazil' : '🇹🇭 Thailand'}
              </button>
            ))}
          </div>
        </div>

        {/* City cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20,
        }}>
          {cities[activeMarket].map((city) => {
            const isTargeted = highlightedCitySlug === city.slug
            return (
              <a
                key={city.name}
                id={`city-card-${city.slug}`}
                href={`${CERCA_BASE_URL}/city/${city.slug}`}
                style={{
                  textDecoration: 'none',
                  position: 'relative',
                  height: 300,
                  borderRadius: 20,
                  overflow: 'hidden',
                  background: '#18181b',
                  border: isTargeted ? '2px solid #06b6d4' : '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: 20,
                  boxShadow: isTargeted ? '0 0 35px rgba(6, 182, 212, 0.65)' : '0 8px 30px rgba(0,0,0,0.35)',
                  transform: isTargeted ? 'translateY(-4px)' : 'none',
                  transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                }}
              >
                {/* Radar target badge if active */}
                {isTargeted && (
                  <div style={{
                    position: 'absolute',
                    top: 14,
                    left: 14,
                    zIndex: 3,
                    background: 'linear-gradient(135deg, #06b6d4, #a855f7)',
                    color: '#fff',
                    fontSize: 10,
                    fontWeight: 900,
                    padding: '4px 10px',
                    borderRadius: 999,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    boxShadow: '0 0 16px rgba(6, 182, 212, 0.8)',
                  }}>
                    <Zap size={11} /> Targeted Hub
                  </div>
                )}
              {/* City photo */}
              <img
                src={city.img}
                alt={city.name}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0,
                  transition: 'transform 0.4s ease',
                }}
              />
              {/* Dark gradient overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(7, 7, 10, 0.95) 0%, rgba(7, 7, 10, 0.45) 55%, transparent 100%)',
                zIndex: 1,
              }} />

              {/* City info */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {city.tag}
                  </span>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: 'rgba(255, 255, 255, 0.15)', color: '#fff', fontWeight: 600 }}>
                    {city.venuesCount}
                  </span>
                </div>

                <h4 style={{ margin: '2px 0 6px', fontSize: 22, fontWeight: 900, color: '#fff' }}>
                  {city.name}
                </h4>

                <div style={{ fontSize: 12, color: '#cbd5e1', marginBottom: 12 }}>
                  🎵 {city.pulse}
                </div>

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#a855f7',
                  background: 'rgba(168, 85, 247, 0.15)',
                  padding: '4px 10px',
                  borderRadius: 8,
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                }}>
                  View Live City Guide <ArrowRight size={13} />
                </div>
              </div>
            </a>
          )})}
        </div>
      </section>

      {/* 4. APP PREVIEW MODULE (Horizontal Scroll on Desktop / Stacked on Mobile) */}
      <section id="app-previews" style={{ maxWidth: 1200, margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 800, margin: '0 0 8px' }}>
            Interactive App Modules
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 15, margin: 0 }}>
            Curated tools engineered for immediate connection without paywalls.
          </p>
        </div>

        {/* Scrollable container */}
        <div style={{
          display: 'flex',
          gap: 20,
          overflowX: 'auto',
          paddingBottom: 16,
          WebkitOverflowScrolling: 'touch',
        }}>
          {appPreviews.map((preview) => (
            <a
              key={preview.title}
              href={preview.link}
              style={{
                textDecoration: 'none',
                flex: '0 0 280px',
                background: '#121217',
                borderRadius: 20,
                border: '1px solid rgba(255, 255, 255, 0.08)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.2s',
              }}
            >
              <div style={{ height: 180, background: '#1c1c24', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={preview.img}
                  alt={preview.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: '#fff' }}>
                  {preview.title}
                </h4>
                <p style={{ margin: 0, fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
                  {preview.caption}
                </p>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#38bdf8', marginTop: 'auto', paddingTop: 8 }}>
                  {preview.action}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 5. DAILY DROPS (Auto-rotating carousel) */}
      <section style={{ maxWidth: 1000, margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
          <div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, margin: '0 0 6px' }}>
              Today’s Daily Drops
            </h2>
            <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>
              Curated daily gems across high-vibe nightlife, beaches, and micro-guides.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setDropIndex((prev) => (prev - 1 + dailyDrops.length) % dailyDrops.length)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: '#1c1c24',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setDropIndex((prev) => (prev + 1) % dailyDrops.length)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: '#1c1c24',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel card */}
        {dailyDrops[dropIndex] && (
          <a
            href={dailyDrops[dropIndex].link}
            style={{
              textDecoration: 'none',
              position: 'relative',
              height: 340,
              borderRadius: 22,
              overflow: 'hidden',
              background: '#18181b',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 30,
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
            }}
          >
            <img
              src={dailyDrops[dropIndex].img}
              alt={dailyDrops[dropIndex].title}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0,
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(7, 7, 10, 0.95) 0%, rgba(7, 7, 10, 0.45) 60%, transparent 100%)',
              zIndex: 1,
            }} />

            <div style={{ position: 'relative', zIndex: 2, maxWidth: 640 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: 6,
                  background: 'rgba(168, 85, 247, 0.35)',
                  border: '1px solid rgba(168, 85, 247, 0.5)',
                  color: '#e9d5ff',
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}>
                  {dailyDrops[dropIndex].tag}
                </span>
                <span style={{ fontSize: 13, color: '#38bdf8', fontWeight: 600 }}>
                  📍 {dailyDrops[dropIndex].city}
                </span>
              </div>

              <h3 style={{ margin: '0 0 8px', fontSize: 26, fontWeight: 900, color: '#fff' }}>
                {dailyDrops[dropIndex].title}
              </h3>
              <p style={{ margin: '0 0 16px', fontSize: 14, color: '#cbd5e1', lineHeight: 1.55 }}>
                {dailyDrops[dropIndex].desc}
              </p>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                borderRadius: 10,
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                fontSize: 13,
                fontWeight: 700,
              }}>
                View Full Guide on Cerca <ArrowRight size={14} />
              </div>
            </div>
          </a>
        )}
      </section>

      {/* 6. VERIFIED HOSTS (5 Circular Avatars with Neon Rim Light + Badges) */}
      <section style={{ maxWidth: 1000, margin: '0 auto 80px', padding: '0 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, margin: '0 0 10px' }}>
          Verified Local Hosts &amp; Concierges
        </h2>
        <p style={{ color: '#94a3b8', fontSize: 15, margin: '0 0 36px' }}>
          Connect with trusted district insiders and local creators live on Cerca.
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 24,
        }}>
          {verifiedHosts.map((host) => (
            <div
              key={host.id}
              onClick={() => setSelectedHostModal(host)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedHostModal(host) }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
                width: 156,
                padding: '16px 12px',
                borderRadius: 20,
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              }}
            >
              {/* Circular Avatar with Neon Rim Light */}
              <div style={{
                position: 'relative',
                width: 88,
                height: 88,
                borderRadius: '50%',
                padding: 3,
                background: `linear-gradient(135deg, ${host.glow}, #ffffff)`,
                boxShadow: `0 0 22px ${host.glow}66`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img
                  src={host.img}
                  alt={host.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    background: '#27272a',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    background: '#09090b',
                    borderRadius: 999,
                    display: 'flex',
                  }}
                >
                  <ShieldCheck size={18} className="text-cyan-400" />
                </span>
              </div>

              <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: 0, fontSize: 14.5, fontWeight: 700, color: '#fff' }}>
                  {host.name}
                </h4>
                <div style={{ fontSize: 11.5, color: '#94a3b8', marginTop: 2 }}>
                  {host.city} {host.flag}
                </div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 3,
                  marginTop: 6,
                  padding: '2px 8px',
                  borderRadius: 999,
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  fontSize: 10.5,
                  fontWeight: 600,
                  color: '#e4e4e7',
                }}>
                  <span>{host.badge}</span>
                </div>
                <div style={{
                  marginTop: 6,
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: '#38bdf8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 3,
                }}>
                  <Star size={10} fill="#facc15" color="#facc15" />
                  <span>{host.rating.toFixed(1)} · Tap to Email</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* HOST PROFILE & CONTACT DOSSIER MODAL */}
        {selectedHostModal && (
          <div
            role="dialog"
            aria-modal="true"
            onClick={() => setSelectedHostModal(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(3, 3, 5, 0.85)',
              backdropFilter: 'blur(10px)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px 12px',
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#0a0a10',
                border: `1px solid ${selectedHostModal.glow}66`,
                borderRadius: 24,
                maxWidth: 520,
                width: '100%',
                padding: '24px 22px',
                boxShadow: `0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px ${selectedHostModal.glow}33`,
                maxHeight: '92vh',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                textAlign: 'left',
                boxSizing: 'border-box',
              }}
            >
              {/* Modal Top Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      fontSize: 10.5,
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#38bdf8',
                      background: 'rgba(6, 182, 212, 0.14)',
                      padding: '3px 8px',
                      borderRadius: 6,
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                    }}
                  >
                    Verified Host Dossier
                  </span>
                  <span style={{ fontSize: 11, color: '#4ade80', fontWeight: 600 }}>
                    ● {selectedHostModal.lastActiveText}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedHostModal(null)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Profile Hero */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div
                  style={{
                    position: 'relative',
                    width: 76,
                    height: 76,
                    borderRadius: '50%',
                    padding: 3,
                    background: `linear-gradient(135deg, ${selectedHostModal.glow}, #ffffff)`,
                    boxShadow: `0 0 25px ${selectedHostModal.glow}88`,
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={selectedHostModal.img}
                    alt={selectedHostModal.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      background: '#18181b',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      background: '#09090b',
                      borderRadius: 999,
                      display: 'flex',
                    }}
                  >
                    <ShieldCheck size={20} className="text-cyan-400" />
                  </span>
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: '#fff' }}>
                    {selectedHostModal.name}
                  </h3>
                  <div style={{ fontSize: 12, color: '#38bdf8', fontWeight: 600, marginTop: 2 }}>
                    @{selectedHostModal.handle} · {selectedHostModal.role}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, fontSize: 12, color: '#94a3b8' }}>
                    <MapPin size={12} className="text-zinc-400" />
                    <span>
                      {selectedHostModal.city}, {selectedHostModal.country} {selectedHostModal.flag}
                    </span>
                    <span>·</span>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 3, color: '#facc15', fontWeight: 700 }}>
                      <Star size={12} fill="#facc15" />
                      <span>{selectedHostModal.rating.toFixed(1)} ({selectedHostModal.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div
                style={{
                  borderRadius: 14,
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '12px 14px',
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 6, letterSpacing: '0.05em' }}>
                  Local Insider Dossier
                </div>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: '#e2e8f0' }}>
                  {selectedHostModal.bio}
                </p>
              </div>

              {/* Available Services */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 6, letterSpacing: '0.05em' }}>
                  Available Concierge Services
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {selectedHostModal.availableFor.map((service) => (
                    <span
                      key={service}
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: 999,
                        background: 'rgba(168, 85, 247, 0.15)',
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                        color: '#c084fc',
                      }}
                    >
                      ✦ {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Curated Top Spots in City */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 6, letterSpacing: '0.05em' }}>
                  Top Recommended Spots in {selectedHostModal.city}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {selectedHostModal.topSpots.map((spot) => (
                    <a
                      key={spot}
                      href={`${CERCA_BASE_URL}/city/${selectedHostModal.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: 11.5,
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: 8,
                        background: 'rgba(6, 182, 212, 0.12)',
                        border: '1px solid rgba(6, 182, 212, 0.25)',
                        color: '#38bdf8',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <span>📍 {spot}</span>
                      <ExternalLink size={11} className="text-cyan-400" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Languages & Music */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 12 }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 4 }}>
                    Languages
                  </div>
                  <div style={{ color: '#fff', fontWeight: 600 }}>{selectedHostModal.languages.join(', ')}</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 4 }}>
                    Music Pulse
                  </div>
                  <div style={{ color: '#fff', fontWeight: 600 }}>{selectedHostModal.musicTags.join(', ')}</div>
                </div>
              </div>

              {/* Action Buttons: Email Guide & Open Cerca App */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
                {/* Button 1: Direct Email Booking */}
                <a
                  href={`mailto:info@scanqrglobal.ai?subject=${encodeURIComponent(`Guide Inquiry: ${selectedHostModal.name} (${selectedHostModal.city})`)}&body=${encodeURIComponent(
                    `Hi ${selectedHostModal.name},\n\nI saw your verified profile on ScanQR Global / Cerca for ${selectedHostModal.city}. I am planning a visit and would like to connect for local nightlife recommendations and guide services.\n\nTravel Dates:\nGroup Size:\nPreferred Spots / Vibe:\n\nLooking forward to hearing from you!\n`
                  )}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '12px 16px',
                    borderRadius: 12,
                    background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 13,
                    textDecoration: 'none',
                    boxShadow: '0 4px 16px rgba(37, 99, 235, 0.35)',
                    cursor: 'pointer',
                  }}
                >
                  <Mail size={16} />
                  <span>Email Guide / Request Booking</span>
                </a>

                {/* Button 2: Open Cerca App */}
                <a
                  href={`${CERCA_BASE_URL}/city/${selectedHostModal.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '11px 16px',
                    borderRadius: 12,
                    background: 'rgba(168, 85, 247, 0.18)',
                    border: '1px solid rgba(168, 85, 247, 0.35)',
                    color: '#e9d5ff',
                    fontWeight: 700,
                    fontSize: 13,
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <Sparkles size={16} className="text-purple-300" />
                  <span>Explore {selectedHostModal.city} on Cerca App</span>
                  <ExternalLink size={13} />
                </a>

                {/* Button 3: WhatsApp Concierge */}
                {selectedHostModal.whatsappSupported && (
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `Hi ${selectedHostModal.name}, I saw your verified host profile on ScanQR Global for ${selectedHostModal.city} and would like to ask about local spots & tours!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      padding: '10px 16px',
                      borderRadius: 12,
                      background: 'rgba(34, 197, 94, 0.12)',
                      border: '1px solid rgba(34, 197, 94, 0.25)',
                      color: '#4ade80',
                      fontWeight: 700,
                      fontSize: 12.5,
                      textDecoration: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp Direct Concierge</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 7. TRUST & COMPLIANCE (Centered Badges) */}
      <section style={{ maxWidth: 900, margin: '0 auto 80px', padding: '0 24px', textAlign: 'center' }}>
        <h3 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#71717a', marginBottom: 20 }}>
          Trust, Security &amp; Compliance
        </h3>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
        }}>
          {/* Badge 1: Secured by ScanQR Global */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 18px',
            borderRadius: 14,
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#34d399',
            fontSize: 13,
            fontWeight: 700,
          }}>
            <ShieldCheck size={18} />
            <span>Secured by ScanQR Global</span>
          </div>

          {/* Badge 2: Google Play 4.8 */}
          <a
            href="https://play.google.com/store/apps/details?id=com.qr4luv.cerca"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              borderRadius: 14,
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              color: '#fbbf24',
              fontSize: 13,
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            <Star size={16} fill="#fbbf24" />
            <span>Google Play · Cerca (4.8★)</span>
          </a>

          {/* Badge 3: Support email */}
          <a
            href="mailto:info@scanqrglobal.ai"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              borderRadius: 14,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#e4e4e7',
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            <Mail size={16} />
            <span>info@scanqrglobal.ai</span>
          </a>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer style={{
        background: '#040407',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '60px 24px 30px',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 36,
          marginBottom: 48,
        }}>
          {/* Logo & About */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: 'linear-gradient(135deg, #06b6d4, #a855f7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 900,
                fontSize: 14,
              }}>
                ⚡
              </div>
              <span style={{ fontSize: 17, fontWeight: 800 }}>ScanQR Global</span>
            </div>
            <p style={{ fontSize: 13, color: '#71717a', lineHeight: 1.6, margin: 0 }}>
              The Master Intelligence Gateway for Cerca Social on qr4luv.com. Real-time translation, crowd pulse, and verified safety with zero-barrier guest access.
            </p>
          </div>

          {/* Column: Cities */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 16px', color: '#fff' }}>Direct City Guides</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
              <li><a href={`${CERCA_BASE_URL}/city/la`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>Los Angeles</a> &bull; <a href={`${CERCA_BASE_URL}/city/miami`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>Miami</a></li>
              <li><a href={`${CERCA_BASE_URL}/city/nyc`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>New York City</a> &bull; <a href={`${CERCA_BASE_URL}/city/austin`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>Austin</a></li>
              <li><a href={`${CERCA_BASE_URL}/city/bogota`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>Bogotá</a> &bull; <a href={`${CERCA_BASE_URL}/city/sao-paulo`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>São Paulo</a></li>
              <li><a href={`${CERCA_BASE_URL}/city/rio`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>Rio de Janeiro</a> &bull; <a href={`${CERCA_BASE_URL}/city/florianopolis`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>Florianópolis</a></li>
              <li><a href={`${CERCA_BASE_URL}/city/bangkok`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>Bangkok</a> &bull; <a href={`${CERCA_BASE_URL}/city/phuket`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>Phuket</a> &bull; <a href={`${CERCA_BASE_URL}/city/koh-samui`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>Samui</a></li>
            </ul>
          </div>

          {/* Column: Live Modes */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 16px', color: '#fff' }}>Explore Modes</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
              <li><a href={`${CERCA_BASE_URL}/explore`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>Live Heatmap</a></li>
              <li><a href={`${CERCA_BASE_URL}/tonight`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>Tonight's Pulse</a></li>
              <li><a href={`${CERCA_BASE_URL}/travel-buddy`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>Tourist Translator</a></li>
              <li><a href={`${CERCA_BASE_URL}/scan`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>Safe QR Handshake</a></li>
            </ul>
          </div>

          {/* Column: Safety & Contact + Language Selector */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 16px', color: '#fff' }}>Safety &amp; Compliance</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
              <li><a href={`${CERCA_BASE_URL}/privacy`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>Privacy Policy</a></li>
              <li><a href={`${CERCA_BASE_URL}/terms`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>Terms of Service</a></li>
              <li><a href="https://play.google.com/store/apps/details?id=com.qr4luv.cerca" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'none' }}>Android App (Google Play)</a></li>
              <li><a href="/llms.txt" style={{ color: '#a1a1aa', textDecoration: 'none' }}>AI Context (llms.txt)</a></li>
              <li><a href="mailto:info@scanqrglobal.ai" style={{ color: '#38bdf8', textDecoration: 'none' }}>info@scanqrglobal.ai</a></li>
            </ul>

            {/* 8-Language Selector */}
            <div style={{ marginTop: 12 }}>
              <label style={{ fontSize: 11, color: '#71717a', display: 'block', marginBottom: 6 }}>Language (8 Languages)</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  background: '#121217',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  color: '#e4e4e7',
                  fontSize: 12,
                  outline: 'none',
                }}
              >
                <option value="English">English</option>
                <option value="Español">Español</option>
                <option value="Português">Português</option>
                <option value="Français">Français</option>
                <option value="Deutsch">Deutsch</option>
                <option value="Italiano">Italiano</option>
                <option value="日本語">日本語</option>
                <option value="中文">中文</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bottom bar: Favicon + Copyright */}
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: 24,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 14,
          fontSize: 12,
          color: '#52525b',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>© 2026 ScanQR Global • All rights reserved.</span>
          </div>
          <div>
            <span>Connected to <strong style={{ color: '#cbd5e1' }}>qr4luv.com</strong> • Global Live Social Map</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
