import React, { useState } from 'react'
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MapPin,
  Sparkles,
} from 'lucide-react'

interface FeaturePillar {
  id: number
  icon: string
  badge: string
  title: string
  short: string
  reveal: string
}

const PILLARS: FeaturePillar[] = [
  {
    id: 0,
    icon: '🎭',
    badge: 'DISCOVERY',
    title: "Faces & 'Out to Meet'",
    short:
      'Visual proximity grid of travelers, nomads, and verified locals ready to meet right now.',
    reveal:
      "Filter by 'Live Now', 'Spots', or specific scenes (like Miami Afro-House or Bangkok Rooftops). Send an instant \"Say Hi 👋\" or knock to unlock mutual chat without sharing social media handles.",
  },
  {
    id: 1,
    icon: '🤖',
    badge: 'AI BRIDGE',
    title: 'The AI Wingman & Live Translation',
    short:
      'Two-way real-time voice, video, and text translation with contextual AI icebreakers.',
    reveal:
      'Chat effortlessly across Spanish, Thai, Portuguese, and English. The AI Wingman suggests smooth conversation starters, decodes venue menus, and bridges cultures so language is never a barrier.',
  },
  {
    id: 2,
    icon: '🔲',
    badge: 'PRIVACY FIRST',
    title: 'Knock, Share QR & Ghost Mode',
    short:
      'Connect via wearable/shareable personal QR codes without exposing your phone number or WhatsApp.',
    reveal:
      "Total privacy control. Use 'Window Open' to accept chat requests, or go full 'Invisible / Ghost Mode' to browse the live map and scout venues without displaying your presence to strangers.",
  },
  {
    id: 3,
    icon: '⚡',
    badge: 'NIGHTLIFE',
    title: 'Nightlife Hub & VIP Door Access',
    short:
      '10-second raw venue flips, table splits, guestlists, and 2 AM safe ride assistance.',
    reveal:
      'See unedited video drops posted in the last hour before paying cover, split bottle minimums with nearby verified groups, and access bilingual taxi placards when heading home safely.',
  },
]

interface HubCity {
  city: string
  country: string
  flag: string
  detail: string
  badge: string
  badgeColor: string
}

const GLOBAL_HUBS: HubCity[] = [
  {
    city: 'Bogotá',
    country: 'Colombia',
    flag: '🇨🇴',
    detail: 'Chapinero Lounges • Out to Meet Active • Wi-Fi VoIP',
    badge: 'LIVE NOW',
    badgeColor: '#22c55e',
  },
  {
    city: 'Bangkok',
    country: 'Thailand',
    flag: '🇹🇭',
    detail: 'Thonglor Rooftops • Live Flips • Auto-Translation',
    badge: 'TRENDING',
    badgeColor: '#22d3ee',
  },
  {
    city: 'Rio de Janeiro',
    country: 'Brazil',
    flag: '🇧🇷',
    detail: 'Lapa Samba Circles • Table Splits • Free Chat',
    badge: 'POPULAR',
    badgeColor: '#ec4899',
  },
  {
    city: 'Miami',
    country: 'United States',
    flag: '🇺🇸',
    detail: 'South Beach & Wynwood • Afro-House Sessions • VIP Access',
    badge: 'VIP ACTIVE',
    badgeColor: '#22c55e',
  },
]

const CERCA_WEB_URL = 'https://qr4luv.com'
const CERCA_PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.qr4luv.cerca'

export default function App() {
  const [expandedPillar, setExpandedPillar] = useState<number | null>(0)
  const [selectedLang, setSelectedLang] = useState('English')

  return (
    <div
      style={{
        backgroundColor: '#06070b',
        color: '#ffffff',
        minHeight: '100vh',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <style>{`
        @keyframes pulse-green-ring {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.35); opacity: 0.45; }
        }
        .pulse-live {
          animation: pulse-green-ring 1.8s infinite ease-in-out;
        }
        .hover-card:hover {
          border-color: rgba(236, 72, 153, 0.45) !important;
          transform: translateY(-2px);
        }
        .btn-hover:hover {
          opacity: 0.94;
          transform: translateY(-1px);
        }
      `}</style>

      {/* ========================================================= */}
      {/* 1. HEADER (STICKY GLASSMORPHIC BAR) */}
      {/* ========================================================= */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 999,
          backgroundColor: 'rgba(6, 7, 11, 0.94)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '10px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          {/* LEFT: Official CS Gradient Badge + ScanQRGlobal.ai + Powered by Cerca Social */}
          <a
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            {/* Official CS Gradient Badge */}
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #ec4899 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '15px',
                color: '#ffffff',
                boxShadow: '0 2px 10px rgba(236, 72, 153, 0.35)',
                flexShrink: 0,
              }}
            >
              CS
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 900,
                  letterSpacing: '-0.3px',
                  color: '#ffffff',
                }}
              >
                ScanQRGlobal<span style={{ color: '#22d3ee' }}>.ai</span>
              </span>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#a1a1aa',
                  whiteSpace: 'nowrap',
                }}
              >
                Powered by Cerca Social
              </span>
            </div>
          </a>

          {/* RIGHT CONTROLS */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            {/* Green Status Pill: Live Radar Active */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(34, 197, 94, 0.08)',
                border: '1px solid rgba(34, 197, 94, 0.28)',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 700,
                color: '#4ade80',
              }}
            >
              <span
                className="pulse-live"
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#22c55e',
                  display: 'inline-block',
                }}
              />
              <span>Live Radar Active</span>
            </div>

            {/* Language Dropdown */}
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                fontSize: '12px',
                padding: '6px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <option value="English" style={{ background: '#07080c', color: '#fff' }}>
                English
              </option>
              <option value="Español" style={{ background: '#07080c', color: '#fff' }}>
                Español
              </option>
              <option value="ภาษาไทย" style={{ background: '#07080c', color: '#fff' }}>
                ภาษาไทย
              </option>
              <option value="Português" style={{ background: '#07080c', color: '#fff' }}>
                Português
              </option>
              <option value="Français" style={{ background: '#07080c', color: '#fff' }}>
                Français
              </option>
              <option value="Deutsch" style={{ background: '#07080c', color: '#fff' }}>
                Deutsch
              </option>
            </select>

            {/* Primary CTA Button: Explore Map Free -> */}
            <a
              href={CERCA_WEB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hover"
              style={{
                background: 'linear-gradient(90deg, #ec4899 0%, #f43f5e 100%)',
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: '8px',
                padding: '8px 18px',
                fontSize: '13px',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 14px rgba(236, 72, 153, 0.35)',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
              }}
            >
              <span>Explore Map Free</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. HERO SECTION (THE AI RADAR HOOK) */}
      {/* ========================================================= */}
      <section
        style={{
          maxWidth: '1040px',
          margin: '0 auto',
          padding: '68px 24px 52px',
          textAlign: 'center',
        }}
      >
        {/* Top Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(34, 197, 94, 0.08)',
            border: '1px solid rgba(34, 197, 94, 0.35)',
            padding: '6px 18px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: 800,
            color: '#4ade80',
            letterSpacing: '0.5px',
            marginBottom: '24px',
          }}
        >
          <span>🌐 AI-POWERED PROXIMITY RADAR • FREE ON WI-FI WORLDWIDE</span>
        </div>

        {/* Main Headline */}
        <h1
          style={{
            fontSize: 'clamp(32px, 5.5vw, 56px)',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-1px',
            color: '#ffffff',
            margin: '0 auto 20px',
            maxWidth: '920px',
          }}
        >
          See Who’s Out Tonight. Knock to Connect.{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #ec4899 0%, #22d3ee 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline',
            }}
          >
            Never Leak Your Number.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(15px, 2.2vw, 18.5px)',
            lineHeight: 1.6,
            color: '#a1a1aa',
            maxWidth: '740px',
            margin: '0 auto 40px',
          }}
        >
          Real-time social map of nightlife, trending spots, and verified people nearby.
          Watch 10-second live flips, break language barriers with the AI Wingman, and
          exchange personal QR contact cards with zero cellular charges.
        </p>

        {/* Dual Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          {/* Action 1: Launch Live Map (Guest Mode) */}
          <a
            href={CERCA_WEB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hover"
            style={{
              background: 'linear-gradient(90deg, #ec4899 0%, #f43f5e 100%)',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '12px',
              padding: '15px 28px',
              fontSize: '15.5px',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 6px 22px rgba(236, 72, 153, 0.4)',
              transition: 'all 0.15s ease',
            }}
          >
            <span>🗺️ Launch Live Map (Guest Mode)</span>
            <ExternalLink size={16} />
          </a>

          {/* Action 2: Google Play App (4.8*) */}
          <a
            href={CERCA_PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hover"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '12px',
              padding: '15px 26px',
              fontSize: '15.5px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.15s ease',
            }}
          >
            <span>📱 Google Play App (4.8★)</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. THE 4 INTERACTIVE DISCOVERY PILLARS */}
      {/* ========================================================= */}
      <section
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '36px 24px 64px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#ec4899',
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
            }}
          >
            INSIDE THE CERCA ECOSYSTEM
          </span>
          <h2
            style={{
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: 900,
              color: '#ffffff',
              marginTop: '8px',
              letterSpacing: '-0.5px',
            }}
          >
            Tap to Preview How It Works
          </h2>
        </div>

        {/* 4 Interactive Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {PILLARS.map((pillar) => {
            const isExpanded = expandedPillar === pillar.id
            return (
              <div
                key={pillar.id}
                onClick={() => setExpandedPillar(isExpanded ? null : pillar.id)}
                className="hover-card"
                style={{
                  backgroundColor: isExpanded
                    ? 'rgba(236, 72, 153, 0.05)'
                    : 'rgba(255, 255, 255, 0.02)',
                  border: isExpanded
                    ? '1px solid #ec4899'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '22px 26px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isExpanded
                    ? '0 6px 26px rgba(236, 72, 153, 0.16)'
                    : 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span style={{ fontSize: '26px' }}>{pillar.icon}</span>
                    <span
                      style={{
                        backgroundColor: isExpanded
                          ? '#ec4899'
                          : 'rgba(255, 255, 255, 0.08)',
                        color: isExpanded ? '#ffffff' : '#a1a1aa',
                        fontSize: '11px',
                        fontWeight: 800,
                        letterSpacing: '0.8px',
                        padding: '3px 10px',
                        borderRadius: '6px',
                      }}
                    >
                      {pillar.badge}
                    </span>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: 800,
                        color: isExpanded ? '#ffffff' : '#f4f4f5',
                      }}
                    >
                      {pillar.title}
                    </h3>
                  </div>
                  <div
                    style={{
                      color: isExpanded ? '#ec4899' : '#a1a1aa',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {isExpanded ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
                  </div>
                </div>

                {/* Short Preview */}
                <p
                  style={{
                    margin: '12px 0 0',
                    color: '#a1a1aa',
                    fontSize: '14px',
                    lineHeight: 1.55,
                  }}
                >
                  {pillar.short}
                </p>

                {/* Expanded Reveal */}
                {isExpanded && (
                  <div
                    style={{
                      marginTop: '16px',
                      paddingTop: '16px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      color: '#e4e4e7',
                      fontSize: '14.5px',
                      lineHeight: 1.65,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                    }}
                  >
                    <div>{pillar.reveal}</div>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <a
                        href={CERCA_WEB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#ec4899',
                          fontSize: '13px',
                          fontWeight: 700,
                          textDecoration: 'none',
                        }}
                      >
                        <span>Open Feature in Cerca Web</span>
                        <span>→</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. LIVE GLOBAL HUBS GRID (STRUCTURED DATA FOR SEARCH) */}
      {/* ========================================================= */}
      <section
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '20px 24px 68px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#22d3ee',
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
            }}
          >
            ACTIVE PROXIMITY NETWORKS
          </span>
          <h2
            style={{
              fontSize: 'clamp(24px, 4vw, 34px)',
              fontWeight: 900,
              color: '#ffffff',
              marginTop: '8px',
              letterSpacing: '-0.5px',
            }}
          >
            Live Global Hubs &amp; Nightlife
          </h2>
          <p
            style={{
              fontSize: '14px',
              color: '#a1a1aa',
              margin: '8px auto 0',
              maxWidth: '600px',
            }}
          >
            Real-time radar feeds, verified checked-in crowds, and AI auto-translation
            active across major nightlife destinations worldwide.
          </p>
        </div>

        {/* 4 Active Cities Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
          }}
        >
          {GLOBAL_HUBS.map((hub, idx) => (
            <a
              key={idx}
              href={CERCA_WEB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-card"
              style={{
                backgroundColor: '#07080c',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '140px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                  }}
                >
                  <span style={{ fontSize: '28px' }}>{hub.flag}</span>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      color: hub.badgeColor,
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      border: `1px solid ${hub.badgeColor}40`,
                    }}
                  >
                    {hub.badge}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: '19px',
                    fontWeight: 900,
                    color: '#ffffff',
                    margin: '0 0 4px',
                  }}
                >
                  {hub.city}
                </h3>
                <span
                  style={{
                    fontSize: '11px',
                    color: '#71717a',
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  {hub.country}
                </span>
              </div>
              <p
                style={{
                  fontSize: '12.5px',
                  color: '#a1a1aa',
                  margin: 0,
                  lineHeight: 1.45,
                }}
              >
                {hub.detail}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. HIGH-CONVERTING BOTTOM BAR / FOOTER */}
      {/* ========================================================= */}
      <footer
        style={{
          marginTop: 'auto',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: '#06070b',
          padding: '36px 24px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '18px',
          }}
        >
          {/* Dual Action Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            <a
              href={CERCA_WEB_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#ec4899',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>Open Cerca Web App</span>
              <ExternalLink size={14} />
            </a>

            <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>

            <a
              href={CERCA_PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#22d3ee',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>Download on Google Play</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Clean Copyright & Gateway Attribution */}
          <p
            style={{
              margin: 0,
              fontSize: '13px',
              color: '#71717a',
              lineHeight: 1.6,
            }}
          >
            © 2026 ScanQRGlobal.ai • Official Gateway for Cerca Social (qr4luv.com)
          </p>
        </div>
      </footer>
    </div>
  )
}
