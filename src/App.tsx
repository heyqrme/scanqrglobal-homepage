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
  Users,
  Plus,
  Calendar,
  Eye,
  TrendingUp,
} from 'lucide-react'
import {
  SUPPORTED_LOCALES,
  TRANSLATIONS,
  LOCATION_TRANSLATIONS,
  HOST_TRANSLATIONS,
  getStoredLocale,
  setStoredLocale,
  type Locale,
} from './i18n'
import { useExitTelemetry } from './hooks/useExitTelemetry'

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

  if (q.includes('split') || q.includes('table') || q.includes('vip') || q.includes('under $50') || q.includes('$50')) {
    return {
      query: rawQuery,
      intent: 'Live Table Splits Board',
      headline: 'Active VIP Table Splits Under $50 – $150 (Bangkok, Miami & Bogotá)',
      summary: 'Never pay full price for bottle service alone. Expats and travelers share premium VIP booths, bottle minimums, and daybeds across Bangkok, Miami, Rio, and Bogotá.',
      keyFacts: [
        'Bangkok: Sing Sing Theater VIP mezzanine split ($70/person) · 2 seats left.',
        'Bogotá: Theatron Chapinero VIP terrace split ($30/person) · 2 seats left.',
        'Miami: Club Space terrace sunrise bottle split ($150/person) · 2 seats left.',
      ],
      recommendedVenue: 'Live VIP Table Splits Board',
      actionUrl: '#classifieds',
      actionLabel: 'View Active Table Splits →',
      matchingMarket: 'thailand',
      matchingCitySlug: 'bangkok',
    }
  }

  if (q.includes('speakeasy') || q.includes('hidden') || q.includes('no cover')) {
    return {
      query: rawQuery,
      intent: 'Hidden Speakeasy Radar',
      headline: 'Hidden Speakeasies & Cocktail Dens (No Forced Cover)',
      summary: 'Explore vetted secret cocktail rooms behind vintage telephone booths, noodle shops, and hidden staircases across Bangkok Chinatown, NYC East Village, and Bogotá Chapinero.',
      keyFacts: [
        'Bangkok: Chinatown & Thonglor speakeasies hidden behind tea counters & phone booths.',
        'NYC: Please Don’t Tell (PDT) accessed through a phone booth inside a hot dog shop.',
        'Bogotá: Intimate cocktail bars tucked away along Carrera 4 in Chapinero Alto.',
      ],
      recommendedVenue: 'Bangkok Speakeasies Guided Micro-Crawl',
      actionUrl: '#classifieds',
      actionLabel: 'See Speakeasy Crawls →',
      matchingMarket: 'thailand',
      matchingCitySlug: 'bangkok',
    }
  }

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

export const CONCIERGE_PRIMARY_EMAIL = 'darwinscerca@gmail.com'
export const CONCIERGE_CC_EMAIL = 'qr4luv@gmail.com'

export function buildConciergeMailto(subject: string, body: string) {
  return `mailto:${CONCIERGE_PRIMARY_EMAIL}?cc=${encodeURIComponent(CONCIERGE_CC_EMAIL)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export interface ClassifiedListing {
  id: string
  title: string
  city: string
  country: string
  flag: string
  market: 'thailand' | 'colombia' | 'brazil' | 'usa'
  category: 'VIP Table Split' | 'Curated Guide' | 'Guestlist / Event' | 'Nomad Sublet'
  categoryBadge: string
  glow: string
  dateOrTime: string
  costPerPerson: string
  description: string
  hostName: string
  hostBadge: string
  hostHandle: string
  hostImg: string
  verified: boolean
  venueSlug?: string
  contactPrompt: string
  scarcityBadge?: string
}

export const CLASSIFIED_LISTINGS: ClassifiedListing[] = [
  {
    id: 'bkk-vip-singsing',
    title: 'Sing Sing Theater (Sukhumvit 45) — Splitting VIP Mezzanine Booth',
    city: 'Bangkok',
    country: 'Thailand',
    flag: '🇹🇭',
    market: 'thailand',
    category: 'VIP Table Split',
    categoryBadge: '🍾 VIP TABLE SPLIT',
    glow: '#ec4899',
    dateOrTime: 'This Friday · 10:30 PM',
    costPerPerson: '2,500 THB (~$70)',
    description: 'Reserved 6-person VIP booth for Friday Melodic House night. Looking for 2 friendly expats or travelers to share bottle service & table minimum.',
    hostName: 'Somchai R.',
    hostBadge: 'Bangkok Verified Curator',
    hostHandle: 'somchai_bkk',
    hostImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    verified: true,
    venueSlug: 'bangkok',
    scarcityBadge: '2 Seats Left',
    contactPrompt: 'Hi Darwin & Somchai, I saw the VIP table split listing for Sing Sing Theater Bangkok on ScanQR Global and would like to join the 2 open spots this Friday!',
  },
  {
    id: 'phuket-daybed-delmar',
    title: 'Café del Mar Kamala — Luxury Sunset Oceanfront Daybed Share',
    city: 'Phuket',
    country: 'Thailand',
    flag: '🇹🇭',
    market: 'thailand',
    category: 'VIP Table Split',
    categoryBadge: '🍾 VIP DAYBED SHARE',
    glow: '#06b6d4',
    dateOrTime: 'This Saturday · 3:00 PM - Sunset',
    costPerPerson: '2,000 THB (~$58)',
    description: 'Prime oceanfront daybed reserved for Saturday sunset session with international DJs. Looking for 2-3 chill people to split the spend & enjoy cocktails.',
    hostName: 'Captain Aek',
    hostBadge: 'Phuket Marine Ambassador',
    hostHandle: 'aek_phuket',
    hostImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80',
    verified: true,
    venueSlug: 'phuket',
    scarcityBadge: 'Filling Fast',
    contactPrompt: 'Hi Darwin & Captain Aek, I saw the Café del Mar Phuket daybed split on ScanQR Global and want to reserve a spot for Saturday sunset!',
  },
  {
    id: 'miami-vip-space',
    title: 'Club Space Miami (Terrace) — VIP Table Bottle Share',
    city: 'Miami',
    country: 'USA',
    flag: '🇺🇸',
    market: 'usa',
    category: 'VIP Table Split',
    categoryBadge: '🍾 VIP TABLE SPLIT',
    glow: '#ec4899',
    dateOrTime: 'Saturday Late Night · 3:00 AM - Sunrise',
    costPerPerson: '$150 / Person',
    description: 'Legendary Space Terrace sunrise session. Sharing table minimum & tequila service. Looking for 2 vibe-matched music lovers.',
    hostName: 'Lucas M.',
    hostBadge: 'Miami Resident',
    hostHandle: 'lucas_305',
    hostImg: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80',
    verified: true,
    venueSlug: 'miami',
    scarcityBadge: 'Only 2 Seats Left',
    contactPrompt: 'Hi Darwin & Lucas, I saw the Club Space Miami terrace split on ScanQR Global and want to join!',
  },
  {
    id: 'bogota-vip-theatron',
    title: 'Theatron Chapinero Mega-Club — VIP Terrace Table Reservation Split',
    city: 'Bogotá',
    country: 'Colombia',
    flag: '🇨🇴',
    market: 'colombia',
    category: 'VIP Table Split',
    categoryBadge: '🍾 VIP TABLE SPLIT',
    glow: '#ec4899',
    dateOrTime: 'Saturday · 11:00 PM',
    costPerPerson: '120,000 COP (~$30)',
    description: 'Reserved terrace table in Latin America’s most iconic mega-club complex (14 themed rooms). Looking for 3 people to join our table & drinks split.',
    hostName: 'Mateo V.',
    hostBadge: 'Bogotá Ambassador',
    hostHandle: 'mateo_bogota',
    hostImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80',
    verified: true,
    venueSlug: 'bogota',
    scarcityBadge: '2 Seats Left',
    contactPrompt: 'Hi Darwin & Mateo, I saw the Theatron Bogotá VIP table split on ScanQR Global and would love to join your group this Saturday!',
  },
  {
    id: 'rio-vip-ipanema',
    title: 'Ipanema Sunset Rooftop & Lapa Samba Table Share',
    city: 'Rio de Janeiro',
    country: 'Brazil',
    flag: '🇧🇷',
    market: 'brazil',
    category: 'VIP Table Split',
    categoryBadge: '🍾 VIP TABLE SPLIT',
    glow: '#06b6d4',
    dateOrTime: 'This Friday · 8:30 PM',
    costPerPerson: 'R$ 220 (~$42)',
    description: 'Reserved rooftop table overlooking Ipanema beach for caipirinhas and tapas before heading to Lapa samba clubs.',
    hostName: 'Gabriela S.',
    hostBadge: 'Rio Nightlife Insider',
    hostHandle: 'gabi_rio',
    hostImg: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
    verified: true,
    venueSlug: 'rio',
    scarcityBadge: '3 Spots Remaining',
    contactPrompt: 'Hi Darwin & Gabriela, I saw the Rio Ipanema table split on ScanQR Global and want to join your group!',
  },
  {
    id: 'samui-boat-charter',
    title: 'Private Traditional Longtail to Pig Island & Coral Reefs',
    city: 'Koh Samui',
    country: 'Thailand',
    flag: '🇹🇭',
    market: 'thailand',
    category: 'Curated Guide',
    categoryBadge: '🌴 ISLAND CHARTER',
    glow: '#10b981',
    dateOrTime: 'Sunday Morning · 9:00 AM',
    costPerPerson: '900 THB (~$26)',
    description: 'Chartering private longtail boat to Koh Madsum (Pig Island) & Koh Tan snorkeling reefs. Snorkel gear, fresh fruit & cold water included. Max 6 people.',
    hostName: 'Nok K.',
    hostBadge: 'Island Concierge',
    hostHandle: 'nok_samui',
    hostImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    verified: true,
    venueSlug: 'koh-samui',
    scarcityBadge: '3 Spots Left',
    contactPrompt: 'Hi Darwin & Nok, I want to join the private longtail boat charter to Pig Island on Koh Samui this Sunday!',
  },
  {
    id: 'bkk-speakeasy-tour',
    title: 'Chinatown & Thonglor Hidden Speakeasies Guided Micro-Crawl',
    city: 'Bangkok',
    country: 'Thailand',
    flag: '🇹🇭',
    market: 'thailand',
    category: 'Curated Guide',
    categoryBadge: '🍸 VERIFIED TOUR',
    glow: '#a855f7',
    dateOrTime: 'Thursday & Saturday · 8:30 PM',
    costPerPerson: '1,400 THB (~$40)',
    description: 'Intimate walking tour through 4 hidden cocktail speakeasies behind vintage phone booths and hidden tea counters. Guided by verified local nightlife host.',
    hostName: 'Somchai R.',
    hostBadge: 'Bangkok Host',
    hostHandle: 'somchai_bkk',
    hostImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    verified: true,
    venueSlug: 'bangkok',
    scarcityBadge: 'Closes in 3 Hours',
    contactPrompt: 'Hi Darwin & Somchai, I would like to book a spot on the Bangkok Speakeasies Guided Crawl!',
  },
  {
    id: 'samui-villa-sublet',
    title: 'Sea-View 1-Bed Pool Villa Studio in Chaweng Noi (1-3 Mo Sublet)',
    city: 'Koh Samui',
    country: 'Thailand',
    flag: '🇹🇭',
    market: 'thailand',
    category: 'Nomad Sublet',
    categoryBadge: '🏡 NOMAD SUBLET',
    glow: '#f59e0b',
    dateOrTime: 'Available Immediately',
    costPerPerson: '38,000 THB / Month',
    description: 'Private infinity plunge pool overlooking Chaweng Bay, 500mbps dedicated fiber wifi, full kitchen, scooter parking, maid service 2x/wk. Perfect for remote worker.',
    hostName: 'Cerca Verified Housing',
    hostBadge: 'Verified Property Partner',
    hostHandle: 'cerca_housing',
    hostImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80',
    verified: true,
    venueSlug: 'koh-samui',
    scarcityBadge: '1 Month Left',
    contactPrompt: 'Hi Darwin, I saw the Chaweng Noi Koh Samui pool villa monthly sublet on ScanQR Global and would like to check availability and viewing dates.',
  },
]

export default function App() {
  const [locale, setLocale] = useState<Locale>(() => getStoredLocale())
  const t = TRANSLATIONS[locale] || TRANSLATIONS.en

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale)
    setStoredLocale(newLocale)
  }

  const [activeMarket, setActiveMarket] = useState<'usa' | 'colombia' | 'brazil' | 'thailand'>('usa')
  const [dropIndex, setDropIndex] = useState(0)

  // Auto-switch regional hub tab when switching to a locale with a primary market
  useEffect(() => {
    if (locale === 'th') {
      setActiveMarket('thailand')
    } else if (locale === 'es') {
      setActiveMarket('colombia')
    } else if (locale === 'pt') {
      setActiveMarket('brazil')
    }
  }, [locale])

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

  // Classifieds & Community Board State
  const [classifiedTab, setClassifiedTab] = useState<string>('all')
  const [showPostModal, setShowPostModal] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const [postForm, setPostForm] = useState({
    type: 'VIP Table Split',
    city: 'Bangkok',
    title: '',
    details: '',
    contact: '',
  })

  // Traffic Telemetry & Campaign Monitor
  const [trafficStats, setTrafficStats] = useState(() => {
    try {
      const storedViews = parseInt(localStorage.getItem('sqg_page_views') || '0', 10)
      const storedClicks = parseInt(localStorage.getItem('sqg_clicks') || '0', 10)
      const baseViews = 2410 + storedViews
      const baseClicks = 618 + storedClicks
      return { views: baseViews, clicks: baseClicks }
    } catch {
      return { views: 2410, clicks: 618 }
    }
  })
  const [activeVisitorsCount, setActiveVisitorsCount] = useState(38)
  const [campaignRef, setCampaignRef] = useState<string>('direct')
  const [showTrafficModal, setShowTrafficModal] = useState(false)
  const [isSendingReport, setIsSendingReport] = useState(false)
  const [reportSendStatus, setReportSendStatus] = useState<string | null>(null)

  // Smart Geolocation & Hub State
  const [visitorLocation, setVisitorLocation] = useState<{
    city: string | null
    country: string | null
    isDetected: boolean
  }>({ city: null, country: null, isDetected: false })

  const [isLocalMode, setIsLocalMode] = useState<boolean>(() => {
    try {
      const stored = sessionStorage.getItem('sqg_mode')
      return stored === 'local' // Only starts in local mode if user explicitly selected it
    } catch {
      return false
    }
  })
  const [localHub, setLocalHub] = useState<HubGeo>(() => {
    try {
      const storedSlug = sessionStorage.getItem('sqg_hub')
      if (storedSlug) {
        const found = REGIONAL_HUBS.find((h) => h.slug === storedSlug)
        if (found) return found
      }
    } catch {}
    return REGIONAL_HUBS.find((h) => h.slug === 'bangkok') || REGIONAL_HUBS[0]
  })
  const [geoDetected, setGeoDetected] = useState<boolean>(false)

  // Auto-detect visitor location on landing: lock to hub if in city, otherwise activate Worldwide Explorer
  useEffect(() => {
    async function detectVisitorLocation() {
      try {
        const res = await fetch('/api/geo')
        if (res.ok) {
          const data = await res.json()
          if (data?.detectedCity || data?.detectedCountry) {
            setVisitorLocation({
              city: data.detectedCity ? decodeURIComponent(data.detectedCity) : null,
              country: data.detectedCountry || null,
              isDetected: !!data.detected,
            })
          }

          const userChoice = sessionStorage.getItem('sqg_mode')

          // 1. If user is in/near one of our 15 regional hubs and hasn't chosen global mode:
          if (data?.detected && data?.hub && userChoice !== 'global') {
            const found = REGIONAL_HUBS.find((h) => h.slug === data.hub.slug) || data.hub
            setLocalHub(found)
            setGeoDetected(true)
            setActiveMarket(found.market)
            setClassifiedTab(found.slug)
            setIsLocalMode(true)
            sessionStorage.setItem('sqg_mode', 'local')
            sessionStorage.setItem('sqg_hub', found.slug)
            return
          }

          // 2. If visitor is outside our 15 hubs (e.g. Philippines, UK, Europe, non-hub US) or prefers global:
          if (!data?.detected || data?.isGlobal || userChoice === 'global') {
            setIsLocalMode(false)
            setGeoDetected(false)
            if (userChoice !== 'global') {
              sessionStorage.setItem('sqg_mode', 'global')
            }
          }
        }
      } catch {
        // Fallback: check browser timezone strictly for local hubs
        try {
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase()
          let matched: HubGeo | undefined
          if (tz.includes('bangkok')) {
            matched = REGIONAL_HUBS.find((h) => h.slug === 'bangkok')
          } else if (tz.includes('bogota')) {
            matched = REGIONAL_HUBS.find((h) => h.slug === 'bogota')
          } else if (tz.includes('sao_paulo')) {
            matched = REGIONAL_HUBS.find((h) => h.slug === 'sao-paulo')
          } else if (tz.includes('new_york')) {
            matched = REGIONAL_HUBS.find((h) => h.slug === 'nyc')
          } else if (tz.includes('los_angeles')) {
            matched = REGIONAL_HUBS.find((h) => h.slug === 'la')
          } else if (tz.includes('austin')) {
            matched = REGIONAL_HUBS.find((h) => h.slug === 'austin')
          }

          if (matched) {
            const userChoice = sessionStorage.getItem('sqg_mode')
            if (userChoice !== 'global') {
              setLocalHub(matched)
              setGeoDetected(true)
              setActiveMarket(matched.market)
              setClassifiedTab(matched.slug)
              setIsLocalMode(true)
              sessionStorage.setItem('sqg_mode', 'local')
              sessionStorage.setItem('sqg_hub', matched.slug)
            }
          }
        } catch {
          // ignore
        }
      }
    }
    detectVisitorLocation()
  }, [])

  // Switch between Local and Global modes
  const handleSwitchToGlobal = () => {
    setIsLocalMode(false)
    sessionStorage.setItem('sqg_mode', 'global')
    setClassifiedTab('all')
    recordClick('switch_to_global')
  }

  const handleSwitchToLocal = (hub?: HubGeo) => {
    const target = hub || localHub || REGIONAL_HUBS.find((h) => h.slug === 'bangkok')!
    setLocalHub(target)
    setIsLocalMode(true)
    setActiveMarket(target.market)
    setClassifiedTab(target.slug)
    sessionStorage.setItem('sqg_mode', 'local')
    sessionStorage.setItem('sqg_hub', target.slug)
    recordClick(`switch_to_local_${target.slug}`)
  }

  // Exit Beacon & Scroll Depth Telemetry Hook
  const { recordInteraction } = useExitTelemetry({
    isLocalMode,
    currentHub: localHub?.slug,
    campaignRef,
  })

  // Lightweight non-blocking cloud telemetry ingest
  const sendTelemetryPing = (eventType: string, meta?: Record<string, any>) => {
    try {
      const payload = {
        event_type: eventType,
        path: window.location.pathname,
        referrer: document.referrer || '',
        campaign_ref: sessionStorage.getItem('sqg_campaign_ref') || campaignRef || 'direct',
        metadata: meta || {},
      }
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' })
        navigator.sendBeacon('/api/telemetry', blob)
      } else {
        fetch('/api/telemetry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(() => {})
      }
    } catch {
      // non-blocking
    }
  }

  // Trigger on-demand test daily report via cloud API (never opens Outlook)
  const handleTriggerDailyReport = async () => {
    setIsSendingReport(true)
    setReportSendStatus(null)
    try {
      let res = await fetch('/api/cron/daily-report?test=true')
      if (!res.ok) {
        res = await fetch('https://rrbvtgqhzqqzzkwphpqd.supabase.co/functions/v1/send-daily-telemetry-report', {
          method: 'POST',
          headers: {
            apikey: 'sb_publishable_0nUgFj3g_kBj-tgxPVFmeQ_lEq0y53A',
            'Content-Type': 'application/json',
          },
        })
      }
      const data = await res.json()
      if (data.ok) {
        setReportSendStatus('success')
      } else {
        setReportSendStatus(data.error || 'error')
      }
    } catch {
      try {
        const edgeRes = await fetch('https://rrbvtgqhzqqzzkwphpqd.supabase.co/functions/v1/send-daily-telemetry-report', {
          method: 'POST',
          headers: {
            apikey: 'sb_publishable_0nUgFj3g_kBj-tgxPVFmeQ_lEq0y53A',
            'Content-Type': 'application/json',
          },
        })
        const data = await edgeRes.json()
        if (data.ok) {
          setReportSendStatus('success')
        } else {
          setReportSendStatus(data.error || 'error')
        }
      } catch {
        setReportSendStatus('network_error')
      }
    } finally {
      setIsSendingReport(false)
    }
  }

  // Track page view and referrer on mount
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search)
      const ref = urlParams.get('ref') || urlParams.get('utm_source') || ''
      const referrer = document.referrer.toLowerCase()

      let detectedRef = 'direct'
      if (ref) {
        detectedRef = ref
      } else if (referrer.includes('facebook') || referrer.includes('fb.com')) {
        detectedRef = 'facebook_marketplace'
      } else if (referrer.includes('craigslist')) {
        detectedRef = 'craigslist_thailand'
      } else if (referrer.includes('bahtsold')) {
        detectedRef = 'bahtsold_thailand'
      } else if (referrer.includes('google')) {
        detectedRef = 'google_search'
      } else if (referrer) {
        try {
          detectedRef = new URL(document.referrer).hostname
        } catch {
          detectedRef = 'referral'
        }
      }

      setCampaignRef(detectedRef)
      sessionStorage.setItem('sqg_campaign_ref', detectedRef)

      if (detectedRef.includes('th') || detectedRef.includes('thai')) {
        setActiveMarket('thailand')
        setClassifiedTab('bangkok')
      }

      const curViews = parseInt(localStorage.getItem('sqg_page_views') || '0', 10)
      localStorage.setItem('sqg_page_views', (curViews + 1).toString())
      setTrafficStats((prev) => ({ ...prev, views: prev.views + 1 }))

      // Ping cloud telemetry
      sendTelemetryPing('page_view', { screen: `${window.innerWidth}x${window.innerHeight}` })
    } catch {
      // ignore
    }
  }, [])

  // Dynamic live visitor pulse
  useEffect(() => {
    const visitorInterval = setInterval(() => {
      setActiveVisitorsCount((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2
        const next = prev + delta
        return next < 28 ? 32 : next > 56 ? 48 : next
      })
    }, 4200)
    return () => clearInterval(visitorInterval)
  }, [])

  // Helper to log clicks and track conversions
  const recordClick = (actionName: string, extra?: Record<string, any>) => {
    try {
      recordInteraction(actionName)
      const curClicks = parseInt(localStorage.getItem('sqg_clicks') || '0', 10)
      localStorage.setItem('sqg_clicks', (curClicks + 1).toString())
      setTrafficStats((prev) => ({ ...prev, clicks: prev.clicks + 1 }))
      sendTelemetryPing('click', { action: actionName, ...extra })
    } catch {
      // ignore
    }
  }

  // Handle Classified Listing Submission
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!postForm.title.trim()) return

    const mailSubject = `[Cerca Classified Listing] ${postForm.type} - ${postForm.city}: ${postForm.title}`
    const mailBody = `Hello Darwin & Cerca Concierge Team,\n\nI would like to submit a new listing for the Cerca Community Board:\n\nCategory: ${postForm.type}\nCity: ${postForm.city}\nTitle: ${postForm.title}\nDetails & Cost: ${postForm.details}\nMy Contact (WhatsApp/Email): ${postForm.contact}\nReferral Source: ${campaignRef}\n\nPlease review and publish this listing on the Thailand & Global hubs.\n\nThank you!`

    window.location.href = buildConciergeMailto(mailSubject, mailBody)
    recordClick('submit_classified_listing')
    setPostSuccess(true)
    setTimeout(() => {
      setPostSuccess(false)
      setShowPostModal(false)
      setPostForm({ type: 'VIP Table Split', city: 'Bangkok', title: '', details: '', contact: '' })
    }, 3500)
  }

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

  // Active spotlight listing for mobile above-the-fold elevation
  const spotlightListing =
    (isLocalMode && localHub
      ? CLASSIFIED_LISTINGS.find((c) => c.venueSlug === localHub.slug)
      : null) || CLASSIFIED_LISTINGS[0]

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

        /* Responsive Mobile Layout (< 768px) */
        @media (max-width: 767px) {
          .sqg-nav {
            padding: 6px 12px !important;
            min-height: 44px !important;
            flex-wrap: nowrap !important;
          }
          .sqg-nav-logo-icon {
            width: 26px !important;
            height: 26px !important;
            font-size: 13px !important;
            border-radius: 8px !important;
          }
          .sqg-nav-logo-text {
            font-size: 15px !important;
          }
          .sqg-nav-desktop-only {
            display: none !important;
          }
          .sqg-nav-launch-btn {
            padding: 5px 10px !important;
            font-size: 11px !important;
            border-radius: 8px !important;
          }
          .sqg-nav-lang-picker {
            padding: 2px 6px !important;
          }
          .sqg-nav-lang-picker select {
            font-size: 11px !important;
          }

          .sqg-fomo-bar {
            top: 44px !important;
            padding: 4px 10px !important;
            min-height: 28px !important;
            font-size: 11px !important;
          }
          .sqg-fomo-desktop-only {
            display: none !important;
          }
          .sqg-fomo-mobile-only {
            display: inline !important;
          }
          .sqg-fomo-controls-desktop {
            display: none !important;
          }
          .sqg-fomo-center {
            padding: 2px 6px !important;
            gap: 4px !important;
            font-size: 10.5px !important;
          }
          .sqg-fomo-split-btn {
            padding: 2px 7px !important;
            font-size: 10px !important;
            white-space: nowrap !important;
          }

          .sqg-hero-section {
            min-height: auto !important;
            padding: 12px 12px 10px !important;
          }
          .sqg-hero-badge {
            padding: 3px 10px !important;
            font-size: 10px !important;
            margin-bottom: 8px !important;
          }
          .sqg-hero-headline {
            font-size: clamp(20px, 5.5vw, 24px) !important;
            line-height: 1.22 !important;
            margin: 0 0 6px !important;
          }
          .sqg-hero-subheadline {
            font-size: 12.5px !important;
            line-height: 1.4 !important;
            margin: 0 auto 10px !important;
            max-width: 100% !important;
          }
          .sqg-hero-actions {
            gap: 8px !important;
            margin-bottom: 10px !important;
            flex-wrap: nowrap !important;
          }
          .sqg-hero-btn {
            height: 38px !important;
            padding: 0 12px !important;
            font-size: 12px !important;
            border-radius: 10px !important;
            flex: 1 !important;
            justify-content: center !important;
          }
          .sqg-dest-pills-container {
            padding: 6px 8px !important;
            margin: 0 auto 8px !important;
          }
          .sqg-dest-pills-label {
            font-size: 10.5px !important;
            margin-bottom: 4px !important;
          }
          .sqg-dest-chips-row {
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            justify-content: flex-start !important;
            padding-bottom: 4px !important;
            scrollbar-width: none !important;
            -webkit-overflow-scrolling: touch !important;
          }
          .sqg-dest-chips-row::-webkit-scrollbar {
            display: none !important;
          }
          .sqg-dest-chip {
            flex-shrink: 0 !important;
            padding: 3px 9px !important;
            font-size: 11px !important;
            white-space: nowrap !important;
          }
          .sqg-trust-subline {
            font-size: 11px !important;
            margin-bottom: 10px !important;
          }

          .sqg-mobile-elevated-card {
            display: block !important;
          }

          .sqg-query-bar {
            padding: 14px 12px !important;
            border-radius: 16px !important;
          }
        }

        @media (min-width: 768px) {
          .sqg-fomo-mobile-only {
            display: none !important;
          }
          .sqg-mobile-elevated-card {
            display: none !important;
          }
        }
      `}</style>

      {/* NAVIGATION BAR */}
      <nav className="sqg-nav" style={{
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
          <div className="sqg-nav-logo-icon" style={{
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
          <span className="sqg-nav-logo-text" style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
            ScanQR<span style={{ color: '#06b6d4' }}>Global</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {/* LOCAL / GLOBAL PRESENCE PILL */}
          {isLocalMode && localHub ? (
            <div className="sqg-nav-presence-pill" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '4px 12px',
              borderRadius: 999,
              background: 'rgba(6, 182, 212, 0.15)',
              border: '1px solid rgba(6, 182, 212, 0.45)',
              boxShadow: '0 0 12px rgba(6, 182, 212, 0.25)',
            }}>
              <span style={{ fontSize: 12.5, fontWeight: 800, color: '#38bdf8', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <MapPin size={13} color="#22d3ee" />
                <span>{localHub.name} {localHub.flag}</span>
              </span>
              <button
                type="button"
                onClick={handleSwitchToGlobal}
                title="Switch from local city view to full 15-city global directory"
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: 'none',
                  borderRadius: 999,
                  color: '#fff',
                  padding: '3px 10px',
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  transition: 'background 0.2s',
                }}
              >
                <Globe size={11} />
                <span>Go Global</span>
              </button>
            </div>
          ) : (
            <div className="sqg-nav-presence-pill" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '4px 12px',
              borderRadius: 999,
              background: 'rgba(168, 85, 247, 0.15)',
              border: '1px solid rgba(168, 85, 247, 0.4)',
            }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: '#c084fc', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <Globe size={13} color="#c084fc" />
                <span>15 Global Hubs</span>
              </span>
              {localHub && (
                <button
                  type="button"
                  onClick={() => handleSwitchToLocal(localHub)}
                  title={`Lock view to ${localHub.name}`}
                  style={{
                    background: 'rgba(255, 255, 255, 0.12)',
                    border: 'none',
                    borderRadius: 999,
                    color: '#fff',
                    padding: '3px 10px',
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <MapPin size={11} />
                  <span>{localHub.name} {localHub.flag}</span>
                </button>
              )}
            </div>
          )}

          {/* TOP LANGUAGE PICKER */}
          <div className="sqg-nav-lang-picker" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            borderRadius: 10,
            padding: '4px 10px',
          }}>
            <Globe size={15} color="#06b6d4" />
            <select
              value={locale}
              onChange={(e) => handleLocaleChange(e.target.value as Locale)}
              aria-label={t.nav.languageLabel}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: 13,
                fontWeight: 700,
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              {SUPPORTED_LOCALES.map((l) => (
                <option key={l.code} value={l.code} style={{ background: '#0a0a10', color: '#fff' }}>
                  {l.flag} {l.label}
                </option>
              ))}
            </select>
          </div>

          <a
            className="sqg-nav-desktop-only"
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
            {t.nav.exploreMap}
          </a>
          <a
            className="sqg-nav-launch-btn"
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
            {t.nav.launchApp} <ArrowRight size={14} />
          </a>
        </div>
      </nav>

      {/* 0. LIVE GLOBAL FOMO ACTIVITY BAR */}
      <div
        className="sqg-fomo-bar"
        onMouseEnter={() => setIsTelemetryPaused(true)}
        onMouseLeave={() => setIsTelemetryPaused(false)}
        style={{
          background: 'rgba(5, 5, 8, 0.96)',
          borderBottom: '1px solid rgba(244, 63, 94, 0.25)',
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
        {/* Left: Glowing Red Live Beacon & Live Traveler Count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#ef4444',
            boxShadow: '0 0 10px #ef4444',
            display: 'inline-block',
            animation: 'pulseDot 1.8s infinite',
          }} />
          <span className="sqg-fomo-desktop-only" style={{ color: '#f8fafc', fontWeight: 800, fontSize: 11.5, letterSpacing: '0.02em' }}>
            🔴 LIVE NOW: <strong style={{ color: '#38bdf8' }}>{activeVisitorsCount} travelers</strong> checking nightlife in Bangkok & Miami
          </span>
          <span className="sqg-fomo-mobile-only" style={{ color: '#f8fafc', fontWeight: 800, fontSize: 11, letterSpacing: '0.01em', whiteSpace: 'nowrap' }}>
            🔴 LIVE: <strong style={{ color: '#38bdf8' }}>{activeVisitorsCount}</strong> active
          </span>
        </div>

        {/* Center: Dynamic FOMO Nightlife Highlights */}
        {(() => {
          const currentEvt = TELEMETRY_EVENTS[telemetryIndex]
          const evtLoc = LOCATION_TRANSLATIONS[currentEvt.slug]?.[locale] || LOCATION_TRANSLATIONS[currentEvt.slug]?.en
          const eventCityName = evtLoc?.name || currentEvt.city
          return (
            <div
              onClick={() => {
                if (currentEvt.market) setActiveMarket(currentEvt.market)
                if (currentEvt.slug) setHighlightedCitySlug(currentEvt.slug)
                document.getElementById('classifieds')?.scrollIntoView({ behavior: 'smooth' })
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                cursor: 'pointer',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                padding: '4px 12px',
                borderRadius: 8,
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'background 0.2s',
              }}
              className="sqg-fomo-center telemetry-hover"
              title="Click to view live table splits and crowd status"
            >
              <span style={{
                padding: '2px 7px',
                borderRadius: 4,
                fontSize: 10,
                fontWeight: 800,
                background: 'rgba(244, 63, 94, 0.18)',
                color: '#f472b6',
                border: '1px solid rgba(244, 63, 94, 0.4)',
              }}>
                🔥 LIVE PULSE
              </span>

              <span style={{ color: '#e4e4e7', fontWeight: 700 }}>
                {currentEvt.flag} [{eventCityName}]
              </span>

              <span style={{ color: '#06b6d4', fontWeight: 600 }}>
                {currentEvt.venue}
              </span>

              <span className="sqg-fomo-desktop-only" style={{ color: '#a1a1aa', display: 'inline', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                — {currentEvt.message}
              </span>

              <span style={{
                color: currentEvt.pulse === 'Peak' ? '#f43f5e' : currentEvt.pulse === 'Busy' ? '#fbbf24' : '#10b981',
                fontWeight: 800,
                fontSize: 11,
              }}>
                • {currentEvt.pulse.toUpperCase()}
              </span>

              <span style={{ color: '#38bdf8', fontSize: 11, display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                See Splits <ArrowRight size={10} />
              </span>
            </div>
          )
        })()}

        {/* Right: Quick Action Split Table CTA + Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <a
            className="sqg-fomo-split-btn"
            href="#classifieds"
            onClick={() => recordClick('topbar_split_table')}
            style={{
              padding: '4px 11px',
              borderRadius: 6,
              background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: 11,
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(236, 72, 153, 0.35)',
            }}
          >
            🍾 Split a Table
          </a>
          <button
            className="sqg-fomo-controls-desktop"
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
            className="sqg-fomo-controls-desktop"
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
      <section id="hero" className="sqg-hero-section" style={{
        position: 'relative',
        minHeight: '76vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '75px 20px 55px',
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
          <div className="sqg-hero-badge" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 18px',
            borderRadius: 999,
            background: isLocalMode ? 'rgba(6, 182, 212, 0.16)' : 'rgba(236, 72, 153, 0.12)',
            border: isLocalMode ? '1px solid rgba(6, 182, 212, 0.5)' : '1px solid rgba(236, 72, 153, 0.35)',
            color: isLocalMode ? '#38bdf8' : '#f472b6',
            fontSize: 12,
            fontWeight: 800,
            marginBottom: 22,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            boxShadow: isLocalMode ? '0 0 16px rgba(6, 182, 212, 0.25)' : 'none',
          }}>
            {isLocalMode && localHub ? (
              <>
                <MapPin size={14} color="#22d3ee" />
                <span>{localHub.name.toUpperCase()} LIVE RADAR • {localHub.flag} {localHub.pulse.toUpperCase()} TONIGHT</span>
              </>
            ) : (
              <>
                <Globe size={14} color="#ec4899" />
                <span>WORLDWIDE NIGHTLIFE RADAR • 15 CITIES ACROSS 4 CONTINENTS</span>
              </>
            )}
          </div>

          {/* Headline */}
          <h1 className="sqg-hero-headline" style={{
            fontSize: 'clamp(34px, 5.5vw, 60px)',
            fontWeight: 900,
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            margin: '0 0 20px',
            background: 'linear-gradient(135deg, #ffffff 40%, #c4b5fd 75%, #38bdf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {isLocalMode && localHub ? (
              <>
                Know Where the Party Is in {localHub.name} <span style={{ color: '#06b6d4', WebkitTextFillColor: '#06b6d4' }}>Tonight.</span>
              </>
            ) : (
              <>{t.hero.headline} {t.hero.headlineHighlight}</>
            )}
          </h1>

          {/* Subheadline */}
          <p className="sqg-hero-subheadline" style={{
            fontSize: 'clamp(16px, 2.3vw, 20px)',
            color: '#cbd5e1',
            lineHeight: 1.6,
            maxWidth: 740,
            margin: '0 auto 36px',
            fontWeight: 400,
          }}>
            {isLocalMode && localHub ? (
              <>
                Live crowd gauges, vetted expat hosts, and instant VIP table splits across {localHub.name}. Featuring {localHub.topSpot}. Know before you go.
              </>
            ) : (
              <>{t.hero.subheadline}</>
            )}
          </p>

          {/* Exactly 2 Clean Action Buttons */}
          <div className="sqg-hero-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginBottom: 16 }}>
            <a
              className="sqg-hero-btn"
              href={`${CERCA_BASE_URL}/explore${isLocalMode && localHub ? `?city=${localHub.slug}` : ''}`}
              onClick={() => recordClick('hero_cta_free_map')}
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
                transition: 'transform 0.15s ease',
              }}
            >
              <Flame size={16} color="#fff" />
              <span>{t.hero.ctaPrimary}</span>
              <ExternalLink size={15} />
            </a>

            <a
              className="sqg-hero-btn"
              href="#classifieds"
              onClick={() => {
                if (isLocalMode && localHub) setClassifiedTab(localHub.slug as any)
                recordClick('hero_cta_split_table')
              }}
              style={{
                height: 52,
                padding: '0 28px',
                borderRadius: 14,
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                color: '#f8fafc',
                fontSize: 15,
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                transition: 'background 0.15s ease',
              }}
            >
              <span>🍾 {t.hero.ctaSecondary}</span>
              <ArrowRight size={15} />
            </a>
          </div>

          {/* Toggle between Local & Global if in localMode, or destination chips if in globalMode */}
          {isLocalMode && localHub ? (
            <div style={{ marginBottom: 16 }}>
              <button
                type="button"
                onClick={handleSwitchToGlobal}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  fontSize: 12.5,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  textDecoration: 'underline',
                  textUnderlineOffset: 3,
                }}
              >
                <Globe size={13} />
                <span>Switch to Global Search (All 15 Cities)</span>
              </button>
            </div>
          ) : (
            <div className="sqg-dest-pills-container" style={{
              margin: '0 auto 20px',
              maxWidth: 780,
              padding: '12px 16px',
              borderRadius: 14,
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              textAlign: 'center',
            }}>
              <div className="sqg-dest-pills-label" style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                {visitorLocation.country && visitorLocation.country !== 'US' ? (
                  <>Visiting from <span style={{ color: '#38bdf8' }}>{visitorLocation.city || visitorLocation.country}</span>? Select your nightlife destination:</>
                ) : (
                  <>Select a destination to unlock live local radar & VIP tables:</>
                )}
              </div>
              <div className="sqg-dest-chips-row" style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
                {[
                  { name: 'Bangkok', slug: 'bangkok', flag: '🇹🇭' },
                  { name: 'Miami', slug: 'miami', flag: '🇺🇸' },
                  { name: 'Rio de Janeiro', slug: 'rio', flag: '🇧🇷' },
                  { name: 'Bogotá', slug: 'bogota', flag: '🇨🇴' },
                  { name: 'Phuket', slug: 'phuket', flag: '🇹🇭' },
                  { name: 'New York City', slug: 'nyc', flag: '🇺🇸' },
                  { name: 'São Paulo', slug: 'sao-paulo', flag: '🇧🇷' },
                  { name: 'Los Angeles', slug: 'la', flag: '🇺🇸' },
                ].map((dest) => (
                  <button
                    key={dest.slug}
                    className="sqg-dest-chip"
                    type="button"
                    onClick={() => {
                      const target = REGIONAL_HUBS.find((h) => h.slug === dest.slug)
                      if (target) handleSwitchToLocal(target)
                    }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                      borderRadius: 18,
                      padding: '4px 12px',
                      color: '#e2e8f0',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 5,
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span>{dest.flag}</span>
                    <span>{dest.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trust Subline */}
          <div className="sqg-trust-subline" style={{ fontSize: 13, color: '#94a3b8', marginBottom: 36, fontWeight: 500 }}>
            ⚡ No account required • Real-time crowd meter • 100% Free
          </div>

          {/* MOBILE ELEVATED LIVE TONIGHT VIP SPOTLIGHT CARD (<768px VIEWPORTS) */}
          <div className="sqg-mobile-elevated-card" style={{
            margin: '0 auto 16px',
            maxWidth: 480,
            background: 'linear-gradient(135deg, rgba(20, 20, 32, 0.95), rgba(12, 12, 20, 0.98))',
            border: '1px solid rgba(236, 72, 153, 0.45)',
            borderRadius: 16,
            padding: '12px 14px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(236, 72, 153, 0.15)',
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'left',
          }}>
            {/* Glowing accent bar at top */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: 'linear-gradient(90deg, #ec4899, #a855f7, #06b6d4)',
            }} />

            {/* Header row: Live indicator & Scarcity */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#ef4444',
                  boxShadow: '0 0 8px #ef4444',
                  display: 'inline-block',
                  animation: 'pulseDot 1.8s infinite',
                }} />
                <span style={{
                  fontSize: 10.5,
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: '#f472b6',
                }}>
                  {isLocalMode && localHub ? `LIVE IN ${localHub.name.toUpperCase()}` : 'LIVE TONIGHT SPOTLIGHT'}
                </span>
                <span style={{
                  fontSize: 9.5,
                  fontWeight: 800,
                  padding: '2px 6px',
                  borderRadius: 4,
                  background: 'rgba(236, 72, 153, 0.18)',
                  color: '#f472b6',
                  border: '1px solid rgba(236, 72, 153, 0.35)',
                }}>
                  {spotlightListing.categoryBadge}
                </span>
              </div>
              <span style={{
                fontSize: 10,
                fontWeight: 800,
                padding: '2px 6px',
                borderRadius: 4,
                background: 'rgba(239, 68, 68, 0.2)',
                color: '#f87171',
                border: '1px solid rgba(239, 68, 68, 0.4)',
              }}>
                🔥 {spotlightListing.scarcityBadge || 'Active Split'}
              </span>
            </div>

            {/* Listing title & location */}
            <div style={{ marginBottom: 6 }}>
              <h4 style={{
                margin: '0 0 2px',
                fontSize: 13.5,
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.3,
              }}>
                {spotlightListing.title}
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#94a3b8' }}>
                <MapPin size={11} color="#06b6d4" />
                <span>{spotlightListing.city}, {spotlightListing.country} {spotlightListing.flag}</span>
                <span style={{ color: '#475569' }}>•</span>
                <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{spotlightListing.dateOrTime}</span>
              </div>
            </div>

            {/* Price, Host & Action CTA row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              paddingTop: 8,
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              marginTop: 4,
            }}>
              <div>
                <div style={{ fontSize: 9.5, color: '#71717a', textTransform: 'uppercase', fontWeight: 700 }}>
                  Split Share
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 800, color: '#34d399' }}>
                  💰 {spotlightListing.costPerPerson}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <a
                  href={buildConciergeMailto(
                    `[VIP Table Inquiry] ${spotlightListing.title} (${spotlightListing.city})`,
                    `Hi Darwin & ${spotlightListing.hostName},\n\nI saw the spotlight listing on ScanQR Global mobile radar:\n\n"${spotlightListing.title}"\nLocation: ${spotlightListing.city}, ${spotlightListing.country}\nCost: ${spotlightListing.costPerPerson}\n\nI would like to join this VIP table split tonight.\n\nMy Details:\nGroup Size:\nPreferred Contact (WhatsApp/Email):\n\nThank you!`
                  )}
                  onClick={() => recordClick(`mobile_spotlight_inquire_${spotlightListing.id}`)}
                  style={{
                    padding: '6px 11px',
                    borderRadius: 8,
                    background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: 11,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    boxShadow: '0 2px 10px rgba(236, 72, 153, 0.35)',
                  }}
                >
                  <span>Join Split</span>
                  <ArrowRight size={11} />
                </a>

                <a
                  href="#classifieds"
                  onClick={() => recordClick('mobile_spotlight_view_all')}
                  style={{
                    padding: '6px 9px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#cbd5e1',
                    fontWeight: 700,
                    fontSize: 10.5,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 3,
                  }}
                >
                  <span>All Splits ↓</span>
                </a>
              </div>
            </div>
          </div>

          {/* CERCA AI QUERY BAR & NATURAL-LANGUAGE CONCIERGE */}
          <div id="query-bar" className="sqg-query-bar" style={{
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
                  Cerca AI Concierge
                </span>
                <span style={{
                  fontSize: 10,
                  fontWeight: 800,
                  padding: '2px 6px',
                  borderRadius: 4,
                  background: 'rgba(236, 72, 153, 0.15)',
                  color: '#f472b6',
                  border: '1px solid rgba(236, 72, 153, 0.35)',
                }}>
                  NIGHTLIFE INTELLIGENCE
                </span>
              </div>
              <span style={{ fontSize: 11, color: '#71717a' }}>
                {t.queryBar.title}
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
                placeholder={t.queryBar.placeholder}
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
                {isSynthesizing ? t.queryBar.synthesizing : 'Query AI'}
                <Zap size={14} />
              </button>
            </div>

            {/* High-Intent FOMO Curiosity Pills */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              marginTop: 12,
              alignItems: 'center',
            }}>
              <span style={{ fontSize: 11, color: '#71717a', fontWeight: 600 }}>Suggested:</span>
              {[
                { label: '🔥 Where is everyone going in Bangkok tonight?', q: 'Where is everyone going in Bangkok tonight?' },
                { label: '🍸 Best hidden speakeasy with no cover charge', q: 'Best hidden speakeasy with no cover charge' },
                { label: '🍾 Open VIP table splits under $50 right now', q: 'Open VIP table splits under $50 right now' },
                { label: '💃 Best rooftop party in Bogotá this weekend', q: 'Best rooftop party in Bogotá this weekend' },
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
                    padding: '5px 12px',
                    borderRadius: 999,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#e2e8f0',
                    fontSize: 11.5,
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

      {/* 2. TONIGHT'S LIVE VIP TABLE SPLITS & NIGHTLIFE COMMUNITY BOARD */}
      <section id="classifieds" style={{ maxWidth: 1200, margin: '0 auto 80px', padding: '0 24px' }}>
        {/* Local mode VIP board banner */}
        {isLocalMode && localHub && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            background: 'rgba(236, 72, 153, 0.08)',
            border: '1px solid rgba(236, 72, 153, 0.35)',
            borderRadius: 12,
            padding: '12px 18px',
            marginBottom: 24,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>🍾</span>
              <div>
                <strong style={{ color: '#f472b6', fontSize: 13.5 }}>Local VIP Board: {localHub.name} {localHub.flag}</strong>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>
                  Showing active table splits, nightlife guide bookings, and boat charters for {localHub.name}.
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSwitchToGlobal}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                borderRadius: 8,
                padding: '6px 14px',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              View Global Listings 🌐
            </button>
          </div>
        )}

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 28,
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: '#ec4899',
              fontSize: 12,
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: 6,
              letterSpacing: '0.06em',
            }}>
              <Flame size={14} /> {t.classifieds.badge}
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 800, margin: '0 0 8px' }}>
              {t.classifieds.title}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: 15, margin: 0, maxWidth: 640 }}>
              {t.classifieds.subtitle}
            </p>
          </div>

          {/* Action button: Post Listing / Propose Table Split */}
          <button
            type="button"
            onClick={() => {
              recordClick('open_post_modal')
              setShowPostModal(true)
            }}
            style={{
              padding: '10px 20px',
              borderRadius: 12,
              border: 'none',
              background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: 13,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 4px 18px rgba(236, 72, 153, 0.35)',
              transition: 'all 0.15s ease',
            }}
          >
            <Plus size={16} />
            <span>{t.classifieds.postBtn}</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: 'inline-flex',
          flexWrap: 'wrap',
          gap: 8,
          marginBottom: 24,
          padding: 4,
          background: '#121217',
          borderRadius: 12,
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}>
          {[
            { id: 'all', label: t.classifieds.allTab },
            { id: 'bangkok', label: t.classifieds.bangkokTab },
            { id: 'phuket', label: t.classifieds.phuketTab },
            { id: 'samui', label: t.classifieds.samuiTab },
            { id: 'miami', label: 'Miami 🇺🇸' },
            { id: 'global', label: t.classifieds.globalTab },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                recordClick(`classified_tab_${tab.id}`)
                setClassifiedTab(tab.id as any)
              }}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: 'none',
                background: classifiedTab === tab.id ? '#ec4899' : 'transparent',
                color: classifiedTab === tab.id ? '#fff' : '#a1a1aa',
                fontWeight: 700,
                fontSize: 12.5,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 20,
        }}>
          {CLASSIFIED_LISTINGS
            .filter((item) => {
              if (classifiedTab === 'all' || !classifiedTab) return true
              if (classifiedTab === 'bangkok') return item.city.toLowerCase().includes('bangkok')
              if (classifiedTab === 'phuket') return item.city.toLowerCase().includes('phuket')
              if (classifiedTab === 'samui') return item.city.toLowerCase().includes('samui')
              if (classifiedTab === 'miami') return item.city.toLowerCase().includes('miami')
              if (classifiedTab === 'global') return true
              return item.city.toLowerCase().includes(classifiedTab.toLowerCase())
            })
            .map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 18,
                  padding: '22px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Glow accent top bar */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: `linear-gradient(90deg, ${item.glow}, transparent)`,
                }} />

                {/* Badge, Scarcity & City */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{
                      fontSize: 10.5,
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: item.glow,
                      background: `${item.glow}18`,
                      border: `1px solid ${item.glow}44`,
                      padding: '3px 8px',
                      borderRadius: 6,
                    }}>
                      {item.categoryBadge}
                    </span>
                    {item.scarcityBadge && (
                      <span style={{
                        fontSize: 10,
                        fontWeight: 800,
                        padding: '2px 7px',
                        borderRadius: 6,
                        background: 'rgba(239, 68, 68, 0.18)',
                        color: '#f87171',
                        border: '1px solid rgba(239, 68, 68, 0.45)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 3,
                        boxShadow: '0 0 8px rgba(239, 68, 68, 0.25)',
                      }}>
                        🔥 {item.scarcityBadge}
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#94a3b8' }}>
                    <MapPin size={13} className="text-zinc-400" />
                    <span>{item.city}, {item.country} {item.flag}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: '#ffffff', lineHeight: 1.35 }}>
                  {item.title}
                </h3>

                {/* Chips: Date & Cost */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 12 }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '3px 9px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: '#e2e8f0',
                  }}>
                    <Calendar size={13} color="#38bdf8" />
                    <span>{item.dateOrTime}</span>
                  </div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '3px 9px',
                    borderRadius: 8,
                    background: 'rgba(16, 185, 129, 0.12)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    color: '#34d399',
                    fontWeight: 700,
                  }}>
                    <span>💰 {item.costPerPerson}</span>
                  </div>
                </div>

                {/* Description */}
                <p style={{ margin: 0, fontSize: 13, color: '#94a3b8', lineHeight: 1.55 }}>
                  {item.description}
                </p>

                {/* Host Info & Action Button */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  marginTop: 'auto',
                  paddingTop: 12,
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ position: 'relative', width: 34, height: 34, borderRadius: '50%', flexShrink: 0 }}>
                      <img
                        src={item.hostImg}
                        alt={item.hostName}
                        style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <span style={{ position: 'absolute', bottom: -2, right: -2, background: '#09090b', borderRadius: '50%', display: 'flex' }}>
                        <ShieldCheck size={14} className="text-cyan-400" />
                      </span>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{item.hostName}</div>
                      <div style={{ fontSize: 10.5, color: '#71717a' }}>@{item.hostHandle}</div>
                    </div>
                  </div>

                  <a
                    href={buildConciergeMailto(
                      `[Classified Inquiry] ${item.title} (${item.city})`,
                      `Hi Darwin & ${item.hostName},\n\nI saw this listing on ScanQR Global Community Board:\n\n"${item.title}"\nLocation: ${item.city}, ${item.country}\nCategory: ${item.category}\nDate / Time: ${item.dateOrTime}\nCost: ${item.costPerPerson}\n\nI would like to inquire about joining this table split / booking this service.\n\nMy Details:\nGroup Size:\nPreferred Contact (WhatsApp/Email):\n\nThank you!`
                    )}
                    onClick={() => recordClick(`inquire_listing_${item.id}`)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 10,
                      background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Mail size={13} />
                    <span>{t.classifieds.contactConcierge}</span>
                  </a>
                </div>
              </div>
            ))}
        </div>

        {/* POST LISTING MODAL */}
        {showPostModal && (
          <div
            role="dialog"
            aria-modal="true"
            onClick={() => setShowPostModal(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(3, 3, 5, 0.88)',
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
                background: '#0c0c14',
                border: '1px solid rgba(236, 72, 153, 0.4)',
                borderRadius: 22,
                maxWidth: 520,
                width: '100%',
                padding: '24px 22px',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(236, 72, 153, 0.2)',
                maxHeight: '92vh',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                boxSizing: 'border-box',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#ec4899', fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>
                  <Sparkles size={14} /> {t.classifieds.badge}
                </div>
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
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

              <div>
                <h3 style={{ margin: '0 0 6px', fontSize: 19, fontWeight: 800, color: '#fff' }}>
                  {t.classifieds.modalTitle}
                </h3>
                <p style={{ margin: 0, fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
                  {t.classifieds.modalSubtitle}
                </p>
              </div>

              {postSuccess ? (
                <div style={{
                  padding: '20px',
                  borderRadius: 14,
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  color: '#34d399',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                }}>
                  <CheckCircle2 size={32} />
                  <div style={{ fontSize: 14, fontWeight: 700 }}>
                    {t.classifieds.successMsg}
                  </div>
                  <div style={{ fontSize: 12, color: '#a1a1aa' }}>
                    Notifications dispatched to: <strong>darwinscerca@gmail.com</strong> (CC: <strong>qr4luv@gmail.com</strong>)
                  </div>
                </div>
              ) : (
                <form onSubmit={handlePostSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: 6 }}>
                        {t.classifieds.formType}
                      </label>
                      <select
                        value={postForm.type}
                        onChange={(e) => setPostForm({ ...postForm, type: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: 10,
                          background: '#161622',
                          border: '1px solid rgba(255, 255, 255, 0.14)',
                          color: '#fff',
                          fontSize: 13,
                          outline: 'none',
                        }}
                      >
                        <option value="VIP Table Split">🍾 VIP Table Split</option>
                        <option value="Curated Guide">🌴 Curated Tour / Guide</option>
                        <option value="Guestlist / Event">🎟️ Event Guestlist</option>
                        <option value="Nomad Sublet">🏡 Nomad Villa / Sublet</option>
                        <option value="Other Nightlife">✦ Other Request</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: 6 }}>
                        {t.classifieds.formCity}
                      </label>
                      <select
                        value={postForm.city}
                        onChange={(e) => setPostForm({ ...postForm, city: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: 10,
                          background: '#161622',
                          border: '1px solid rgba(255, 255, 255, 0.14)',
                          color: '#fff',
                          fontSize: 13,
                          outline: 'none',
                        }}
                      >
                        <option value="Bangkok">Bangkok 🇹🇭</option>
                        <option value="Phuket">Phuket 🇹🇭</option>
                        <option value="Koh Samui">Koh Samui 🇹🇭</option>
                        <option value="Miami">Miami 🇺🇸</option>
                        <option value="Bogotá">Bogotá 🇨🇴</option>
                        <option value="Rio de Janeiro">Rio de Janeiro 🇧🇷</option>
                        <option value="Other">Other Global Hub</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: 6 }}>
                      {t.classifieds.formTitle}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sing Sing Theater VIP Booth Split (2 seats)"
                      value={postForm.title}
                      onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 10,
                        background: '#161622',
                        border: '1px solid rgba(255, 255, 255, 0.14)',
                        color: '#fff',
                        fontSize: 13,
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: 6 }}>
                      {t.classifieds.formDetails}
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Details about the venue, time, group size, split cost per person..."
                      value={postForm.details}
                      onChange={(e) => setPostForm({ ...postForm, details: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 10,
                        background: '#161622',
                        border: '1px solid rgba(255, 255, 255, 0.14)',
                        color: '#fff',
                        fontSize: 13,
                        outline: 'none',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, display: 'block', marginBottom: 6 }}>
                      {t.classifieds.formContact}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="WhatsApp (+66...) or Email"
                      value={postForm.contact}
                      onChange={(e) => setPostForm({ ...postForm, contact: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 10,
                        background: '#161622',
                        border: '1px solid rgba(255, 255, 255, 0.14)',
                        color: '#fff',
                        fontSize: 13,
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div style={{ fontSize: 11, color: '#71717a', lineHeight: 1.4 }}>
                    🔒 Automatically sends notice to <strong>darwinscerca@gmail.com</strong> (CC: <strong>qr4luv@gmail.com</strong>).
                  </div>

                  <button
                    type="submit"
                    style={{
                      padding: '12px 20px',
                      borderRadius: 12,
                      border: 'none',
                      background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: 14,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      boxShadow: '0 4px 18px rgba(236, 72, 153, 0.35)',
                    }}
                  >
                    <Send size={15} />
                    <span>{t.classifieds.submitBtn}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </section>

      {/* 3. CORE PILLARS / MODES (4 Equal Columns, Light Card Background) */}
      <section id="pillars" style={{ maxWidth: 1200, margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 800, margin: '0 0 10px' }}>
            {t.pillars.sectionTitle}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 15, margin: 0 }}>
            {t.pillars.sectionSubtitle}
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
            <h3 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>{t.pillars.guestModeTitle}</h3>
            <p style={{ margin: 0, fontSize: 14, color: '#475569', lineHeight: 1.55 }}>
              {t.pillars.guestModeDesc}
            </p>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0284c7', marginTop: 'auto' }}>
              {t.pillars.guestModeCta} →
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
            <h3 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>{t.pillars.touristModeTitle}</h3>
            <p style={{ margin: 0, fontSize: 14, color: '#475569', lineHeight: 1.55 }}>
              {t.pillars.touristModeDesc}
            </p>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#059669', marginTop: 'auto' }}>
              {t.pillars.touristModeCta} →
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
            <h3 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>{t.pillars.pulseModeTitle}</h3>
            <p style={{ margin: 0, fontSize: 14, color: '#475569', lineHeight: 1.55 }}>
              {t.pillars.pulseModeDesc}
            </p>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#e11d48', marginTop: 'auto' }}>
              {t.pillars.pulseModeCta} →
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
            <h3 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>{t.pillars.qrModeTitle}</h3>
            <p style={{ margin: 0, fontSize: 14, color: '#475569', lineHeight: 1.55 }}>
              {t.pillars.qrModeDesc}
            </p>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#d97706', marginTop: 'auto' }}>
              {t.pillars.qrModeCta} →
            </span>
          </a>
        </div>
      </section>

      {/* 3. 4-MARKET CITY HUB (USA / Colombia / Brazil / Thailand) */}
      <section id="cities" style={{ maxWidth: 1200, margin: '0 auto 80px', padding: '0 24px' }}>
        {/* Local mode notice banner if active */}
        {isLocalMode && localHub && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            background: 'rgba(6, 182, 212, 0.08)',
            border: '1px solid rgba(6, 182, 212, 0.35)',
            borderRadius: 12,
            padding: '12px 18px',
            marginBottom: 24,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>{localHub.flag}</span>
              <div>
                <strong style={{ color: '#38bdf8', fontSize: 13.5 }}>Local Hub Detected: {localHub.name}</strong>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>
                  Showing verified nightlife spots, speakeasies & crowd levels in {localHub.name}.
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSwitchToGlobal}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                borderRadius: 8,
                padding: '6px 14px',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Explore All 15 Cities Globally 🌐
            </button>
          </div>
        )}

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
              <MapPin size={14} /> 15 Regional Hubs
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 800, margin: '0 0 8px' }}>
              {t.markets.sectionTitle}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: 15, margin: 0 }}>
              {t.markets.sectionSubtitle}
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
                {market === 'usa' ? t.markets.tabUsa : market === 'colombia' ? t.markets.tabColombia : market === 'brazil' ? t.markets.tabBrazil : t.markets.tabThailand}
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
            const loc = LOCATION_TRANSLATIONS[city.slug]?.[locale] || LOCATION_TRANSLATIONS[city.slug]?.en
            const cityName = loc?.name || city.name
            const cityTag = loc?.tag || city.tag
            const cityPulse = loc?.pulse || city.pulse
            const venuesCount = loc?.venuesCount || city.venuesCount

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
                  alt={cityName}
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
                      {cityTag}
                    </span>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: 'rgba(255, 255, 255, 0.15)', color: '#fff', fontWeight: 600 }}>
                      {venuesCount}
                    </span>
                  </div>

                  <h4 style={{ margin: '2px 0 6px', fontSize: 22, fontWeight: 900, color: '#fff' }}>
                    {cityName}
                  </h4>

                  <div style={{ fontSize: 12, color: '#cbd5e1', marginBottom: 12 }}>
                    🎵 {cityPulse}
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
                    {t.markets.viewCityGuide} <ArrowRight size={13} />
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </section>

      {/* 4. APP PREVIEW MODULE (Horizontal Scroll on Desktop / Stacked on Mobile) */}
      <section id="app-previews" style={{ maxWidth: 1200, margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 800, margin: '0 0 8px' }}>
            Interactive App Modules
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 15, margin: 0 }}>
            {t.carousel.badge}
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
      <section id="carousel" style={{ maxWidth: 1000, margin: '0 auto 80px', padding: '0 24px' }}>
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
                {t.carousel.viewFullGuide} <ArrowRight size={14} />
              </div>
            </div>
          </a>
        )}
      </section>

      {/* 6. VERIFIED HOSTS (5 Circular Avatars with Neon Rim Light + Badges) */}
      <section id="hosts" style={{ maxWidth: 1000, margin: '0 auto 80px', padding: '0 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, margin: '0 0 10px' }}>
          {t.hosts.sectionTitle}
        </h2>
        <p style={{ color: '#94a3b8', fontSize: 15, margin: '0 0 36px' }}>
          {t.hosts.sectionSubtitle}
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 24,
        }}>
          {verifiedHosts.map((host) => {
            const hostLoc = HOST_TRANSLATIONS[host.id]?.[locale] || HOST_TRANSLATIONS[host.id]?.en
            const hostName = hostLoc?.name || host.name
            const hostCity = hostLoc?.city || host.city
            const hostBadge = hostLoc?.badge || host.badge

            return (
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
                    alt={hostName}
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
                    {hostName}
                  </h4>
                  <div style={{ fontSize: 11.5, color: '#94a3b8', marginTop: 2 }}>
                    {hostCity} {host.flag}
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
                    <span>{hostBadge}</span>
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
                    <span>{host.rating.toFixed(1)} · {t.hosts.tapToEmail}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* HOST PROFILE & CONTACT DOSSIER MODAL */}
        {selectedHostModal && (() => {
          const modalHostLoc = HOST_TRANSLATIONS[selectedHostModal.id]?.[locale] || HOST_TRANSLATIONS[selectedHostModal.id]?.en
          const modalHostName = modalHostLoc?.name || selectedHostModal.name
          const modalHostRole = modalHostLoc?.role || selectedHostModal.role
          const modalHostCity = modalHostLoc?.city || selectedHostModal.city
          const modalHostBio = modalHostLoc?.bio || selectedHostModal.bio

          return (
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
                      {t.hosts.dossierBadge}
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
                      alt={modalHostName}
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
                      {modalHostName}
                    </h3>
                    <div style={{ fontSize: 12, color: '#38bdf8', fontWeight: 600, marginTop: 2 }}>
                      @{selectedHostModal.handle} · {modalHostRole}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, fontSize: 12, color: '#94a3b8' }}>
                      <MapPin size={12} className="text-zinc-400" />
                      <span>
                        {modalHostCity}, {selectedHostModal.country} {selectedHostModal.flag}
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
                    {t.hosts.overviewTitle}
                  </div>
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: '#e2e8f0' }}>
                    {modalHostBio}
                  </p>
                </div>

                {/* Available Services */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 6, letterSpacing: '0.05em' }}>
                    {t.hosts.servicesTitle}
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
                    {t.hosts.topSpotsTitle.includes('{city}') ? t.hosts.topSpotsTitle.replace('{city}', modalHostCity) : `${t.hosts.topSpotsTitle} ${modalHostCity}`}
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
                      {t.hosts.languagesTitle}
                    </div>
                    <div style={{ color: '#fff', fontWeight: 600 }}>{selectedHostModal.languages.join(', ')}</div>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 4 }}>
                      {t.hosts.musicTitle}
                    </div>
                    <div style={{ color: '#fff', fontWeight: 600 }}>{selectedHostModal.musicTags.join(', ')}</div>
                  </div>
                </div>

                {/* Action Buttons: Email Guide & Open Cerca App */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
                  {/* Button 1: Direct Email Booking */}
                  <a
                    href={buildConciergeMailto(
                      `Guide Inquiry: ${modalHostName} (${modalHostCity})`,
                      `Hi ${modalHostName} & Darwin,\n\nI saw your verified profile on ScanQR Global / Cerca for ${modalHostCity}. I am planning a visit and would like to connect for local nightlife recommendations and guide services.\n\nTravel Dates:\nGroup Size:\nPreferred Spots / Vibe:\n\nLooking forward to hearing from you!\n`
                    )}
                    onClick={() => recordClick(`host_email_${selectedHostModal.id}`)}
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
                    <span>{t.hosts.emailBtn}</span>
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
                    <span>{t.hosts.cercaBtn} ({modalHostCity})</span>
                    <ExternalLink size={13} />
                  </a>

                  {/* Button 3: WhatsApp Concierge */}
                  {selectedHostModal.whatsappSupported && (
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(
                        `Hi ${modalHostName}, I saw your verified host profile on ScanQR Global for ${modalHostCity} and would like to ask about local spots & tours!`
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
                      <span>{t.hosts.whatsappBtn}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        })()}
      </section>

      {/* 7. TRUST & COMPLIANCE (Centered Badges) */}
      <section id="trust" style={{ maxWidth: 900, margin: '0 auto 80px', padding: '0 24px', textAlign: 'center' }}>
        <h3 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#71717a', marginBottom: 20 }}>
          {t.trust.sectionTitle}
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
            <span>Secured by ScanQR Global (TLS 1.3)</span>
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

          {/* Badge 3: Support email with Dual Lead Dispatch */}
          <a
            href={buildConciergeMailto('VIP Host & Support Inquiry', 'Hi Darwin & Cerca team, I am reaching out regarding ScanQR Global support and verified host onboarding.')}
            onClick={() => recordClick('trust_email')}
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
            <span>darwinscerca@gmail.com</span>
          </a>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer id="footer" style={{
        background: '#040407',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '60px 24px 30px',
      }}>
        {/* COLLAPSIBLE OPERATOR & CONVERSION TELEMETRY PANEL */}
        <div style={{
          maxWidth: 1200,
          margin: '0 auto 48px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 16,
          overflow: 'hidden',
        }}>
          <details style={{ padding: '14px 20px' }}>
            <summary style={{
              cursor: 'pointer',
              fontSize: 12.5,
              fontWeight: 700,
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              userSelect: 'none',
            }}>
              <span style={{
                display: 'inline-block',
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 6px #10b981',
              }} />
              <span>⚙️ Operator Telemetry & Cloud Controls ({trafficStats.views} Views • {trafficStats.clicks} Actions)</span>
            </summary>
            <div style={{
              marginTop: 16,
              paddingTop: 16,
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                marginBottom: 16,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    position: 'relative',
                    display: 'flex',
                    height: 10,
                    width: 10,
                  }}>
                    <span style={{
                      position: 'absolute',
                      display: 'inline-flex',
                      height: '100%',
                      width: '100%',
                      borderRadius: '50%',
                      background: '#10b981',
                      opacity: 0.75,
                      animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
                    }} />
                    <span style={{
                      position: 'relative',
                      display: 'inline-flex',
                      borderRadius: '50%',
                      height: 10,
                      width: 10,
                      background: '#10b981',
                    }} />
                  </span>
                  <div>
                    <h4 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: '#f8fafc', letterSpacing: '0.04em' }}>
                      {t.telemetryMonitor.title}
                    </h4>
                    <div style={{ fontSize: 11.5, color: '#94a3b8', marginTop: 2 }}>
                      {t.telemetryMonitor.status}: <span style={{ color: '#34d399', fontWeight: 600 }}>Active Auto-Routing</span> &bull; Source: <span style={{ color: '#38bdf8', fontWeight: 700 }}>{campaignRef}</span>
                    </div>
                  </div>
                </div>

                {/* Actions: View breakdown + ping Darwin */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => {
                      recordClick('open_telemetry_modal')
                      setShowTrafficModal(true)
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '7px 14px',
                      borderRadius: 10,
                      background: 'rgba(56, 189, 248, 0.15)',
                      border: '1px solid rgba(56, 189, 248, 0.35)',
                      color: '#38bdf8',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Activity size={14} />
                    <span>Campaign Telemetry</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleTriggerDailyReport}
                    disabled={isSendingReport}
                    title="Trigger automated cloud report to darwinscerca@gmail.com and qr4luv@gmail.com without opening Outlook"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '7px 14px',
                      borderRadius: 10,
                      background: reportSendStatus === 'success' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(16, 185, 129, 0.15)',
                      border: reportSendStatus === 'success' ? '1px solid #10b981' : '1px solid rgba(16, 185, 129, 0.35)',
                      color: '#34d399',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: isSendingReport ? 'wait' : 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {isSendingReport ? (
                      <>
                        <Zap size={14} />
                        <span>Sending to Gmail...</span>
                      </>
                    ) : reportSendStatus === 'success' ? (
                      <>
                        <CheckCircle2 size={14} color="#10b981" />
                        <span>Sent to Gmail!</span>
                      </>
                    ) : (
                      <>
                        <Mail size={14} />
                        <span>Send Test Report to Gmail</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Metrics Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 12,
              }}>
                {/* Metric 1: Views */}
                <div style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 12,
                  padding: '12px 14px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 10.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {t.telemetryMonitor.sessionsToday}
                    </span>
                    <Eye size={14} color="#38bdf8" />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontSize: 22, fontWeight: 900, color: '#f8fafc' }}>
                      {trafficStats.views.toLocaleString()}
                    </span>
                    <span style={{ fontSize: 11, color: '#38bdf8', fontWeight: 600 }}>verified hits</span>
                  </div>
                </div>

                {/* Metric 2: Clicks */}
                <div style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 12,
                  padding: '12px 14px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 10.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {t.telemetryMonitor.appRoutes}
                    </span>
                    <TrendingUp size={14} color="#ec4899" />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontSize: 22, fontWeight: 900, color: '#f472b6' }}>
                      {trafficStats.clicks.toLocaleString()}
                    </span>
                    <span style={{ fontSize: 11, color: '#ec4899', fontWeight: 600 }}>
                      ({((trafficStats.clicks / Math.max(trafficStats.views, 1)) * 100).toFixed(1)}% CTR)
                    </span>
                  </div>
                </div>

                {/* Metric 3: Active Now */}
                <div style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 12,
                  padding: '12px 14px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 10.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {t.telemetryMonitor.activeNow}
                    </span>
                    <Users size={14} color="#10b981" />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontSize: 22, fontWeight: 900, color: '#34d399' }}>
                      {activeVisitorsCount}
                    </span>
                    <span style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>live users</span>
                  </div>
                </div>

                {/* Metric 4: Lead Dispatch Status */}
                <div style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 12,
                  padding: '12px 14px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 10.5, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Dispatch Dual Routing
                    </span>
                    <ShieldCheck size={14} color="#eab308" />
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    darwinscerca@gmail.com
                  </div>
                  <div style={{ fontSize: 10.5, color: '#38bdf8', marginTop: 2, fontWeight: 600 }}>
                    CC: qr4luv@gmail.com
                  </div>
                </div>
              </div>
            </div>
          </details>
        </div>
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
            <h4 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 16px', color: '#fff' }}>{t.footer.citiesCol}</h4>
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
            <h4 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 16px', color: '#fff' }}>{t.footer.featuresCol}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
              <li><a href={`${CERCA_BASE_URL}/explore`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>Live Heatmap</a></li>
              <li><a href={`${CERCA_BASE_URL}/tonight`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>Tonight's Pulse</a></li>
              <li><a href={`${CERCA_BASE_URL}/travel-buddy`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>Tourist Translator</a></li>
              <li><a href={`${CERCA_BASE_URL}/scan`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>Safe QR Handshake</a></li>
            </ul>
          </div>

          {/* Column: Safety & Contact + Language Selector */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 16px', color: '#fff' }}>{t.footer.safetyCol}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
              <li><a href={`${CERCA_BASE_URL}/privacy`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>{t.footer.privacy}</a></li>
              <li><a href={`${CERCA_BASE_URL}/terms`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>{t.footer.terms}</a></li>
              <li><a href="https://play.google.com/store/apps/details?id=com.qr4luv.cerca" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'none' }}>{t.footer.androidApp}</a></li>
              <li><a href="/llms.txt" style={{ color: '#a1a1aa', textDecoration: 'none' }}>{t.footer.aiContext}</a></li>
              <li>
                <a
                  href={buildConciergeMailto('Direct Portal Support', 'Hi Darwin & Cerca team, I am reaching out from scanqrglobal.ai')}
                  onClick={() => recordClick('footer_email')}
                  style={{ color: '#38bdf8', textDecoration: 'none' }}
                >
                  darwinscerca@gmail.com
                </a>
              </li>
            </ul>

            {/* 8-Language Selector */}
            <div style={{ marginTop: 12 }}>
              <label style={{ fontSize: 11, color: '#71717a', display: 'block', marginBottom: 6 }}>{t.footer.languageSelectorTitle}</label>
              <select
                value={locale}
                onChange={(e) => handleLocaleChange(e.target.value as Locale)}
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
                {SUPPORTED_LOCALES.map((l) => (
                  <option key={l.code} value={l.code} style={{ background: '#121217', color: '#fff' }}>
                    {l.flag} {l.label}
                  </option>
                ))}
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
            <span>© 2026 ScanQR Global • {t.footer.copyright}</span>
          </div>
          <div>
            <span>Connected to <strong style={{ color: '#cbd5e1' }}>qr4luv.com</strong> • Global Live Social Map</span>
          </div>
        </div>
      </footer>

      {/* 9. CAMPAIGN TELEMETRY & TRACKING MODAL */}
      {showTrafficModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(3, 3, 5, 0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
          onClick={() => setShowTrafficModal(false)}
        >
          <div
            style={{
              background: '#0d0d14',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: 24,
              maxWidth: 620,
              width: '100%',
              padding: '30px 28px',
              position: 'relative',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(6, 182, 212, 0.15)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowTrafficModal(false)}
              aria-label="Close Modal"
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '50%',
                width: 34,
                height: 34,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#cbd5e1',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <Activity size={20} color="#38bdf8" />
              <h3 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: '#fff' }}>
                Campaign Telemetry & Referral Engine
              </h3>
            </div>
            <p style={{ fontSize: 13, color: '#94a3b8', margin: '0 0 24px', lineHeight: 1.5 }}>
              Monitor incoming traffic, classified marketplace origins, and lead dispatch routing in real time.
            </p>

            {/* Active Origin Banner */}
            <div style={{
              background: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: 14,
              padding: '14px 18px',
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Current Session Referrer
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#38bdf8', marginTop: 2 }}>
                  {campaignRef}
                </div>
              </div>
              <span style={{
                fontSize: 11,
                padding: '4px 10px',
                borderRadius: 8,
                background: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                color: '#34d399',
                fontWeight: 700,
              }}>
                ● LIVE RECORDING
              </span>
            </div>

            {/* Campaign Links for Thailand Classifieds */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#f8fafc', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>🎯 Tracking URLs for Thailand Marketplace & Classifieds</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
                {[
                  { label: 'General Thailand Classifieds', url: 'https://scanqrglobal.ai/?ref=th_classifieds' },
                  { label: 'Bangkok VIP Nightlife & Tables', url: 'https://scanqrglobal.ai/?ref=bkk_nightlife' },
                  { label: 'Phuket Beach Clubs & Villas', url: 'https://scanqrglobal.ai/?ref=phuket_vip' },
                  { label: 'Koh Samui Charters & Sublets', url: 'https://scanqrglobal.ai/?ref=samui_nomads' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: 10,
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                    }}
                  >
                    <div>
                      <div style={{ color: '#cbd5e1', fontWeight: 600 }}>{item.label}</div>
                      <code style={{ color: '#38bdf8', fontSize: 11 }}>{item.url}</code>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(item.url)
                        alert(`Copied tracking link: ${item.url}`)
                      }}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#fff',
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Copy Link
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Notification Dispatch Dual Routing */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 14,
              padding: '16px 18px',
              marginBottom: 24,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>
                📬 Lead Dispatch Dual Routing
              </div>
              <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>
                Every classified response, host inquiry, and proposal triggers an immediate dispatch to:
                <br />
                • Primary inbox: <strong style={{ color: '#38bdf8' }}>darwinscerca@gmail.com</strong>
                <br />
                • Notification CC: <strong style={{ color: '#a855f7' }}>qr4luv@gmail.com</strong>
              </div>
            </div>

            {/* Automated Daily Report Info Box */}
            <div style={{
              background: 'rgba(6, 182, 212, 0.08)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              borderRadius: 14,
              padding: '16px 18px',
              marginBottom: 24,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700, color: '#38bdf8', marginBottom: 6 }}>
                <Zap size={16} />
                <span>Automated 24h Daily Cloud Report Active</span>
              </div>
              <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.6 }}>
                Vercel Cron triggers automatically every day at <strong>13:00 UTC (06:00 PT)</strong> to compile verified page views, Cerca app redirects, and nightlife classified interactions into an executive digest sent to:
                <br />
                • Primary: <strong style={{ color: '#38bdf8' }}>darwinscerca@gmail.com</strong>
                <br />
                • CC: <strong style={{ color: '#a855f7' }}>qr4luv@gmail.com</strong>
                <br />
                <span style={{ color: '#a1a1aa', fontSize: 11 }}>
                  Zero manual sending required. Windows will never open Outlook.
                </span>
              </div>

              {reportSendStatus === 'missing_key' && (
                <div style={{ marginTop: 10, padding: '8px 12px', borderRadius: 8, background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#fca5a5', fontSize: 11.5 }}>
                  ⚠️ Notice: Add <code>RESEND_API_KEY</code> or <code>SENDGRID_API_KEY</code> in your Vercel Environment Variables to activate cloud delivery to Gmail.
                </div>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => setShowTrafficModal(false)}
                style={{
                  padding: '10px 18px',
                  borderRadius: 10,
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#e4e4e7',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleTriggerDailyReport}
                disabled={isSendingReport}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 20px',
                  borderRadius: 10,
                  background: reportSendStatus === 'success'
                    ? 'linear-gradient(135deg, #059669, #10b981)'
                    : 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 700,
                  border: 'none',
                  cursor: isSendingReport ? 'wait' : 'pointer',
                  boxShadow: '0 4px 15px rgba(6, 182, 212, 0.4)',
                  transition: 'all 0.2s ease',
                }}
              >
                {isSendingReport ? (
                  <>
                    <Zap size={14} />
                    <span>Dispatching Cloud Email...</span>
                  </>
                ) : reportSendStatus === 'success' ? (
                  <>
                    <CheckCircle2 size={14} color="#fff" />
                    <span>Sent to Gmail!</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Trigger Test Report to Gmail</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
