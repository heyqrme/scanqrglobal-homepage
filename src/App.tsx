import React, { useState, useEffect } from 'react'
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
} from 'lucide-react'

const CERCA_BASE_URL = 'https://www.qr4luv.com'

export default function App() {
  const [activeMarket, setActiveMarket] = useState<'usa' | 'brazil' | 'thailand'>('usa')
  const [dropIndex, setDropIndex] = useState(0)
  const [selectedLanguage, setSelectedLanguage] = useState('English')

  // SECTION 3: 3-Market City Hub Data with direct links & verified CDN photography
  const cities = {
    usa: [
      {
        name: 'Los Angeles',
        slug: 'la',
        img: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=1000&auto=format&fit=crop&q=80',
        tag: 'Rooftops & Coast',
        pulse: 'Melodic House',
        venuesCount: '3+ Hotspots',
      },
      {
        name: 'Miami',
        slug: 'miami',
        img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1000&auto=format&fit=crop&q=80',
        tag: 'Nightlife & Latin Beats',
        pulse: 'Afro-House & Ocean',
        venuesCount: '4+ Hotspots',
      },
      {
        name: 'New York City',
        slug: 'nyc',
        img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&auto=format&fit=crop&q=80',
        tag: 'Underground & Speakeasies',
        pulse: 'Analog Sound & Jazz',
        venuesCount: '4+ Hotspots',
      },
      {
        name: 'Austin',
        slug: 'austin',
        img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1000&auto=format&fit=crop&q=80',
        tag: 'Live Music & Patio Bars',
        pulse: 'Two-Step & Psych-Rock',
        venuesCount: '4+ Hotspots',
      },
      {
        name: 'Nashville',
        slug: 'nashville',
        img: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1000&auto=format&fit=crop&q=80',
        tag: 'Honky Tonk & Bluegrass',
        pulse: 'Live Roots & Soul',
        venuesCount: '4+ Hotspots',
      },
    ],
    brazil: [
      {
        name: 'Rio de Janeiro',
        slug: 'rio',
        img: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1000&auto=format&fit=crop&q=80',
        tag: 'Samba & Beach Lounges',
        pulse: 'Street Roda & Bossa',
        venuesCount: '4+ Hotspots',
      },
      {
        name: 'Florianópolis',
        slug: 'florianopolis',
        img: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1000&auto=format&fit=crop&q=80',
        tag: 'Island Parties & Clear Waters',
        pulse: 'Electronic Beach Clubs',
        venuesCount: '4+ Hotspots',
      },
      {
        name: 'Salvador da Bahia',
        slug: 'salvador',
        img: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=1000&auto=format&fit=crop&q=80',
        tag: 'Afro-Beats & Culture',
        pulse: 'Samba-Reggae Drums',
        venuesCount: '4+ Hotspots',
      },
      {
        name: 'São Paulo',
        slug: 'sao-paulo',
        img: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1000&auto=format&fit=crop&q=80',
        tag: 'Techno Temples & Rooftops',
        pulse: 'Underground Electronic & D-Edge',
        venuesCount: '4+ Hotspots',
      },
    ],
    thailand: [
      {
        name: 'Bangkok',
        slug: 'bangkok',
        img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1000&auto=format&fit=crop&q=80',
        tag: 'Theatrical Speakeasies & RCA',
        pulse: 'Sing Sing Theater & Skybars',
        venuesCount: '4+ Hotspots',
      },
      {
        name: 'Phuket',
        slug: 'phuket',
        img: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1000&auto=format&fit=crop&q=80',
        tag: 'Sunset Clubs & Islands',
        pulse: 'Tropical House & Superclubs',
        venuesCount: '4+ Hotspots',
      },
      {
        name: 'Koh Samui',
        slug: 'koh-samui',
        img: 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?w=1000&auto=format&fit=crop&q=80',
        tag: 'Day Clubs & Fire Acrobats',
        pulse: 'Ark Bar Beach & Sunken Pools',
        venuesCount: '4+ Hotspots',
      },
      {
        name: 'Krabi',
        slug: 'krabi',
        img: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1000&auto=format&fit=crop&q=80',
        tag: 'Cliff Bars & Quiet Coasts',
        pulse: 'Cave Dining & Fire Shows',
        venuesCount: '4+ Hotspots',
      },
      {
        name: 'Pattaya',
        slug: 'pattaya',
        img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1000&auto=format&fit=crop&q=80',
        tag: 'Beach Lounges & Sky Bars',
        pulse: '34th Floor Terraces & EDM',
        venuesCount: '4+ Hotspots',
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
  const verifiedHosts = [
    {
      name: 'Elena Vance',
      city: 'Los Angeles',
      badge: 'Verified Host',
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80',
      glow: '#a855f7',
      link: `${CERCA_BASE_URL}/city/la`,
    },
    {
      name: 'Sofia Delgado',
      city: 'Miami',
      badge: 'Nightlife Insider',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
      glow: '#f43f5e',
      link: `${CERCA_BASE_URL}/city/miami`,
    },
    {
      name: 'Thiago Alencar',
      city: 'Rio de Janeiro',
      badge: 'Carioca Guide',
      img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80',
      glow: '#06b6d4',
      link: `${CERCA_BASE_URL}/city/rio`,
    },
    {
      name: 'Somchai Prasert',
      city: 'Phuket',
      badge: 'TAT Certified Guide',
      img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80',
      glow: '#10b981',
      link: `${CERCA_BASE_URL}/city/phuket`,
    },
    {
      name: 'Mayuree Chai',
      city: 'Krabi',
      badge: 'Verified Host',
      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80',
      glow: '#f59e0b',
      link: `${CERCA_BASE_URL}/city/krabi`,
    },
  ]

  // SECTION 5: Carousel auto-rotation timer
  useEffect(() => {
    const timer = setInterval(() => {
      setDropIndex((prev) => (prev + 1) % dailyDrops.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [dailyDrops.length])

  return (
    <div style={{ minHeight: '100vh', background: '#07070a', color: '#ffffff', overflowX: 'hidden', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* NAVIGATION BAR */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(7, 7, 10, 0.88)',
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
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 880, margin: '0 auto' }}>
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
            ⚡ Live Social Radar • USA • Brazil • Thailand
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
            maxWidth: 700,
            margin: '0 auto 40px',
            fontWeight: 400,
          }}>
            Explore cities, verify live crowd levels, discover curated hotspots, and meet people safely — in real time on <strong style={{ color: '#fff' }}>qr4luv.com</strong>.
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginBottom: 30 }}>
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
          </div>

          <div style={{ fontSize: 13, color: '#94a3b8' }}>
            ✓ No account required to browse • Real-time verified staff updates
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

      {/* 3. 3-MARKET CITY HUB (USA / Brazil / Thailand) */}
      <section id="city-hub" style={{ maxWidth: 1200, margin: '0 auto 80px', padding: '0 24px' }}>
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
            {(['usa', 'brazil', 'thailand'] as const).map((market) => (
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
                {market === 'usa' ? '🇺🇸 USA' : market === 'brazil' ? '🇧🇷 Brazil' : '🇹🇭 Thailand'}
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
          {cities[activeMarket].map((city) => (
            <a
              key={city.name}
              href={`${CERCA_BASE_URL}/city/${city.slug}`}
              style={{
                textDecoration: 'none',
                position: 'relative',
                height: 300,
                borderRadius: 20,
                overflow: 'hidden',
                background: '#18181b',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: 20,
                boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
                transition: 'transform 0.25s ease, border-color 0.25s ease',
              }}
            >
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
          ))}
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
          gap: 28,
        }}>
          {verifiedHosts.map((host) => (
            <a
              key={host.name}
              href={host.link}
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
                width: 140,
              }}
            >
              {/* Circular Avatar with Neon Rim Light */}
              <div style={{
                width: 88,
                height: 88,
                borderRadius: '50%',
                padding: 3,
                background: `linear-gradient(135deg, ${host.glow}, #ffffff)`,
                boxShadow: `0 0 20px ${host.glow}66`,
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
              </div>

              <div>
                <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#fff' }}>
                  {host.name}
                </h4>
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{host.city}</div>
                <span style={{
                  display: 'inline-block',
                  marginTop: 6,
                  padding: '2px 8px',
                  borderRadius: 999,
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#e4e4e7',
                }}>
                  {host.badge}
                </span>
              </div>
            </a>
          ))}
        </div>
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
          {/* Badge 1: Verified scanqr.ai */}
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
            <span>Verified by scanqr.ai</span>
          </div>

          {/* Badge 2: Google Play 4.8 */}
          <div style={{
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
          }}>
            <Star size={16} fill="#fbbf24" />
            <span>Google Play 4.8★ Rated</span>
          </div>

          {/* Badge 3: Support email */}
          <a
            href="mailto:info@scanqrglobal.net"
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
            <span>info@scanqrglobal.net</span>
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
              Live social map for people, places, nightlife &amp; travelers. Real-time translation, crowd pulse, and verified safety powered by Cerca.
            </p>
          </div>

          {/* Column: Cities */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 16px', color: '#fff' }}>Direct City Guides</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
              <li><a href={`${CERCA_BASE_URL}/city/la`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>Los Angeles</a> &bull; <a href={`${CERCA_BASE_URL}/city/miami`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>Miami</a></li>
              <li><a href={`${CERCA_BASE_URL}/city/nyc`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>New York City</a> &bull; <a href={`${CERCA_BASE_URL}/city/austin`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>Austin</a></li>
              <li><a href={`${CERCA_BASE_URL}/city/rio`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>Rio de Janeiro</a> &bull; <a href={`${CERCA_BASE_URL}/city/florianopolis`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>Florianópolis</a></li>
              <li><a href={`${CERCA_BASE_URL}/city/phuket`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>Phuket</a> &bull; <a href={`${CERCA_BASE_URL}/city/krabi`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>Krabi</a> &bull; <a href={`${CERCA_BASE_URL}/city/pattaya`} style={{ color: '#a1a1aa', textDecoration: 'none' }}>Pattaya</a></li>
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
              <li><a href="mailto:info@scanqrglobal.net" style={{ color: '#38bdf8', textDecoration: 'none' }}>info@scanqrglobal.net</a></li>
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
