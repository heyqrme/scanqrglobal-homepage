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
} from 'lucide-react'

export default function App() {
  const [activeMarket, setActiveMarket] = useState<'usa' | 'brazil' | 'thailand'>('usa')
  const [dropIndex, setDropIndex] = useState(0)
  const [selectedLanguage, setSelectedLanguage] = useState('English')

  // SECTION 3: 3-Market City Hub Data
  const cities = {
    usa: [
      { name: 'Los Angeles', img: '/images/cities/los-angeles.jpg', tag: 'Rooftops & Beach' },
      { name: 'Miami', img: '/images/cities/miami.jpg', tag: 'Nightlife & Latin Beats' },
      { name: 'New York City', img: '/images/cities/new-york-city.jpg', tag: 'Underground & Speakeasies' },
      { name: 'Austin', img: '/images/cities/austin.jpg', tag: 'Live Music & Patio Bars' },
      { name: 'Nashville', img: '/images/cities/nashville.jpg', tag: 'Honky Tonk & Songwriters' },
    ],
    brazil: [
      { name: 'Rio de Janeiro', img: '/images/cities/rio.jpg', tag: 'Samba & Beach Lounges' },
      { name: 'Florianópolis', img: '/images/cities/florianopolis.jpg', tag: 'Island Parties & Clear Waters' },
      { name: 'Salvador', img: '/images/cities/salvador.jpg', tag: 'Afro-Beats & Culture' },
    ],
    thailand: [
      { name: 'Phuket', img: '/images/cities/phuket.jpg', tag: 'Sunset Clubs & Islands' },
      { name: 'Krabi', img: '/images/cities/krabi.jpg', tag: 'Cliff Bars & Quiet Coasts' },
      { name: 'Pattaya', img: '/images/cities/pattaya.jpg', tag: 'Beach Lounges & Night Markets' },
    ],
  }

  // SECTION 4: App Preview Data
  const appPreviews = [
    { title: 'Tonight Feed', caption: 'Real-time activity pulse and trending district drops.', img: '/images/app-previews/tonight-feed.png' },
    { title: 'Explore Map', caption: 'Live interactive map showing venues, heatmaps and hosts.', img: '/images/app-previews/explore-map.png' },
    { title: 'City Landing', caption: 'Curated nightlife, safety tips, beaches and micro-guides.', img: '/images/app-previews/city-landing.png' },
    { title: 'Seasonal Pack', caption: 'High-season beach alternatives and curated flight escapes.', img: '/images/app-previews/seasonal-pack.png' },
    { title: 'Pulse Levels', caption: 'Know if it’s Quiet, Moderate, Busy, or Peak before arriving.', img: '/images/app-previews/pulse-levels.png' },
  ]

  // SECTION 5: Daily Drops Data
  const dailyDrops = [
    { title: 'Wynwood Patio Lounge', tag: 'Nightlife', desc: 'Outdoor vinyl grooves & tropical craft cocktail pulse.', img: '/images/dailydrops/wynwood-patio.jpg' },
    { title: 'Echo Park Garage Sessions', tag: 'Micro-Guide', desc: 'Indie sets, natural wines, and intimate backyard beats.', img: '/images/dailydrops/echo-park-garage.jpg' },
    { title: 'Arraial Blue Cove Escape', tag: 'Beach', desc: 'Affordable turquoise beaches 2.5h from Copacabana.', img: '/images/dailydrops/arraial-blue-cove.jpg' },
    { title: 'Patong Night Street', tag: 'Nightlife', desc: 'Vibrant neon night walks and seaside live music.', img: '/images/dailydrops/patong-night-street.jpg' },
  ]

  // SECTION 6: Verified Hosts Data
  const verifiedHosts = [
    { name: 'Sofia M.', city: 'Los Angeles', badge: 'Nightlife Insider', img: '/images/hosts/sofia-la.png', glow: '#a855f7' },
    { name: 'Thiago R.', city: 'Rio de Janeiro', badge: 'Beach Hunter', img: '/images/hosts/thiago-rio.png', glow: '#06b6d4' },
    { name: 'Niran P.', city: 'Phuket', badge: 'Local Guide', img: '/images/hosts/niran-phuket.png', glow: '#10b981' },
    { name: 'Mia C.', city: 'Miami', badge: 'Host', img: '/images/hosts/mia-miami.png', glow: '#f43f5e' },
    { name: 'Kai T.', city: 'Krabi', badge: 'Explorer', img: '/images/hosts/kai-krabi.png', glow: '#f59e0b' },
  ]

  // SECTION 5: Carousel auto-rotation timer
  useEffect(() => {
    const timer = setInterval(() => {
      setDropIndex((prev) => (prev + 1) % dailyDrops.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [dailyDrops.length])

  return (
    <div style={{ minHeight: '100vh', background: '#07070a', color: '#ffffff', overflowX: 'hidden' }}>

      {/* NAVIGATION BAR */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(7, 7, 10, 0.85)',
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
          <img
            src="/images/logo/scanqrglobal-logo-dark.png"
            alt="ScanQR Global Logo"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none'
            }}
            style={{ height: 28, objectFit: 'contain' }}
          />
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
            ScanQR<span style={{ color: '#06b6d4' }}>Global</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <a
            href="https://www.qr4luv.com"
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
            Launch App
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
        padding: '70px 20px 50px',
        backgroundImage: `
          radial-gradient(circle at 50% 20%, rgba(168, 85, 247, 0.22), transparent 55%),
          radial-gradient(circle at 80% 40%, rgba(6, 182, 212, 0.18), transparent 50%),
          url('/images/hero/hero-bg-global-dark.png')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        {/* Glow overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'url(/images/hero/hero-overlay-glow.png) center/cover no-repeat',
          pointerEvents: 'none',
          opacity: 0.7,
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 840, margin: '0 auto' }}>
          {/* Tag badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 14px',
            borderRadius: 999,
            background: 'rgba(6, 182, 212, 0.12)',
            border: '1px solid rgba(6, 182, 212, 0.35)',
            color: '#38bdf8',
            fontSize: 12,
            fontWeight: 700,
            marginBottom: 24,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            ⚡ Live Social Radar • USA • Brazil • Thailand
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(32px, 5.5vw, 56px)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            margin: '0 0 20px',
            background: 'linear-gradient(135deg, #ffffff 40%, #c4b5fd 75%, #38bdf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Live Social Map for People, Places, Nightlife &amp; Travelers
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: 'clamp(16px, 2.5vw, 19px)',
            color: '#94a3b8',
            lineHeight: 1.6,
            maxWidth: 680,
            margin: '0 auto 36px',
            fontWeight: 400,
          }}>
            Explore cities, check crowd levels, meet people safely — all in real time.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginBottom: 40 }}>
            <a
              href="#city-hub"
              style={{
                height: 52,
                padding: '0 28px',
                borderRadius: 14,
                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                color: '#fff',
                fontSize: 15,
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 30px rgba(168, 85, 247, 0.38)',
              }}
            >
              Explore Cities
            </a>
            <a
              href="#app-previews"
              style={{
                height: 52,
                padding: '0 26px',
                borderRadius: 14,
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                color: '#f8fafc',
                fontSize: 15,
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
              }}
            >
              Tonight’s Pulse
            </a>
          </div>

          {/* Hero people group overlay illustration */}
          <div style={{ marginTop: 20 }}>
            <img
              src="/images/hero/hero-people-group.png"
              alt="People Group"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none'
              }}
              style={{ maxWidth: '100%', maxHeight: 220, objectFit: 'contain' }}
            />
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
            Designed for intuitive, real-world exploration.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 20,
        }}>
          {/* Pillar 1: Guest Mode */}
          <div style={{
            background: '#ffffff',
            color: '#0f172a',
            borderRadius: 18,
            padding: '28px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.25)',
          }}>
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
          </div>

          {/* Pillar 2: Tourist Mode */}
          <div style={{
            background: '#ffffff',
            color: '#0f172a',
            borderRadius: 18,
            padding: '28px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.25)',
          }}>
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
          </div>

          {/* Pillar 3: Nightlife & Event Pulse */}
          <div style={{
            background: '#ffffff',
            color: '#0f172a',
            borderRadius: 18,
            padding: '28px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.25)',
          }}>
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
          </div>

          {/* Pillar 4: Optional QR Identity */}
          <div style={{
            background: '#ffffff',
            color: '#0f172a',
            borderRadius: 18,
            padding: '28px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.25)',
          }}>
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
          </div>
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
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 800, margin: '0 0 8px' }}>
              3-Market City Hub
            </h2>
            <p style={{ color: '#94a3b8', fontSize: 15, margin: 0 }}>
              Live social discovery across the USA, Brazil, and Thailand.
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 18,
        }}>
          {cities[activeMarket].map((city) => (
            <div
              key={city.name}
              style={{
                position: 'relative',
                height: 260,
                borderRadius: 18,
                overflow: 'hidden',
                background: '#18181b',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: 18,
              }}
            >
              {/* City photo */}
              <img
                src={city.img}
                alt={city.name}
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none'
                }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0,
                }}
              />
              {/* Dark gradient overlay for text readability */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(7, 7, 10, 0.92) 0%, rgba(7, 7, 10, 0.3) 60%, transparent 100%)',
                zIndex: 1,
              }} />

              {/* City name overlay */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase' }}>
                  {city.tag}
                </span>
                <h4 style={{ margin: '4px 0 0', fontSize: 20, fontWeight: 800, color: '#fff' }}>
                  {city.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. APP PREVIEW MODULE (Horizontal Scroll on Desktop / Stacked on Mobile) */}
      <section id="app-previews" style={{ maxWidth: 1200, margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 800, margin: '0 0 8px' }}>
            App Preview Module
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 15, margin: 0 }}>
            Interactive features designed for real-time connection.
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
            <div
              key={preview.title}
              style={{
                flex: '0 0 280px',
                background: '#121217',
                borderRadius: 20,
                border: '1px solid rgba(255, 255, 255, 0.08)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ height: 220, background: '#1c1c24', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={preview.img}
                  alt={preview.title}
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none'
                  }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '16px 18px' }}>
                <h4 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 800, color: '#fff' }}>
                  {preview.title}
                </h4>
                <p style={{ margin: 0, fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
                  {preview.caption}
                </p>
              </div>
            </div>
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
          <div style={{
            position: 'relative',
            height: 320,
            borderRadius: 22,
            overflow: 'hidden',
            background: '#18181b',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 28,
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
          }}>
            <img
              src={dailyDrops[dropIndex].img}
              alt={dailyDrops[dropIndex].title}
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none'
              }}
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
              background: 'linear-gradient(to top, rgba(7, 7, 10, 0.95) 0%, rgba(7, 7, 10, 0.4) 60%, transparent 100%)',
              zIndex: 1,
            }} />

            <div style={{ position: 'relative', zIndex: 2, maxWidth: 640 }}>
              <span style={{
                display: 'inline-block',
                padding: '4px 10px',
                borderRadius: 6,
                background: 'rgba(168, 85, 247, 0.3)',
                border: '1px solid rgba(168, 85, 247, 0.5)',
                color: '#e9d5ff',
                fontSize: 12,
                fontWeight: 700,
                marginBottom: 10,
                textTransform: 'uppercase',
              }}>
                {dailyDrops[dropIndex].tag}
              </span>
              <h3 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: '#fff' }}>
                {dailyDrops[dropIndex].title}
              </h3>
              <p style={{ margin: 0, fontSize: 14, color: '#cbd5e1', lineHeight: 1.5 }}>
                {dailyDrops[dropIndex].desc}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* 6. VERIFIED HOSTS (5 Circular Avatars with Neon Rim Light + Badges) */}
      <section style={{ maxWidth: 1000, margin: '0 auto 80px', padding: '0 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, margin: '0 0 10px' }}>
          Verified Local Hosts
        </h2>
        <p style={{ color: '#94a3b8', fontSize: 15, margin: '0 0 36px' }}>
          Connect with trusted district insiders and local community creators.
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 28,
        }}>
          {verifiedHosts.map((host) => (
            <div
              key={host.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
                width: 140,
              }}
            >
              {/* Circular Avatar with Neon Rim Light */}
              <div style={{
                width: 84,
                height: 84,
                borderRadius: '50%',
                padding: 3,
                background: `linear-gradient(135deg, ${host.glow}, #ffffff)`,
                boxShadow: `0 0 18px ${host.glow}66`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img
                  src={host.img}
                  alt={host.name}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
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
                <div style={{ fontSize: 12, color: '#71717a', marginTop: 2 }}>{host.city}</div>
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
            </div>
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
            <img
              src="/images/badges/verified-scanqr.png"
              alt=""
              onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none' }}
              style={{ height: 18 }}
            />
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
            <span>Google Play 4.8★</span>
            <img
              src="/images/badges/google-play-4-8.png"
              alt=""
              onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none' }}
              style={{ height: 18 }}
            />
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
            <img
              src="/images/badges/support-email.png"
              alt=""
              onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none' }}
              style={{ height: 18 }}
            />
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
              <img
                src="/images/logo/scanqrglobal-logo-dark.png"
                alt="ScanQR Global Logo"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none'
                }}
                style={{ height: 26, objectFit: 'contain' }}
              />
              <span style={{ fontSize: 17, fontWeight: 800 }}>ScanQR Global</span>
            </div>
            <p style={{ fontSize: 13, color: '#71717a', lineHeight: 1.6, margin: 0 }}>
              Live social map for people, places, nightlife &amp; travelers. Real-time translation, crowd pulse, and verified safety.
            </p>
          </div>

          {/* Column: Cities */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 16px', color: '#fff' }}>Cities</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: '#a1a1aa' }}>
              <li>Los Angeles &amp; Miami</li>
              <li>New York City &amp; Austin</li>
              <li>Rio de Janeiro &amp; Florianópolis</li>
              <li>Phuket, Krabi &amp; Pattaya</li>
            </ul>
          </div>

          {/* Column: Hosts */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 16px', color: '#fff' }}>Hosts</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: '#a1a1aa' }}>
              <li>Verified Host Network</li>
              <li>Reputation Badges</li>
              <li>District Creators</li>
              <li>Host Partnerships</li>
            </ul>
          </div>

          {/* Column: Safety & Contact + Language Selector */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 16px', color: '#fff' }}>Safety &amp; Language</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: '#a1a1aa' }}>
              <li>Child Safety Compliance</li>
              <li>scanqr.ai Verification</li>
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
            <img
              src="/images/logo/favicon-32.png"
              alt=""
              onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none' }}
              style={{ width: 16, height: 16 }}
            />
            <span>© 2026 ScanQR Global • All rights reserved.</span>
          </div>
          <div>
            <span>Powered by scanqr.ai • Global Live Social Map</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
