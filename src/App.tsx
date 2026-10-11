import React, { useState } from 'react'
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from 'lucide-react'
import { useGatewayI18n, GATEWAY_LOCALES, type GatewayLocale } from './gatewayI18n'

const PILLARS_CONFIG = [
  { id: 0, icon: '🎭' },
  { id: 1, icon: '🤖' },
  { id: 2, icon: '🔲' },
  { id: 3, icon: '⚡' },
]

const GLOBAL_HUBS_CONFIG = [
  { flag: '🇨🇴', badgeColor: '#22c55e' },
  { flag: '🇹🇭', badgeColor: '#22d3ee' },
  { flag: '🇧🇷', badgeColor: '#ec4899' },
  { flag: '🇺🇸', badgeColor: '#22c55e' },
]

const CERCA_WEB_URL = 'https://qr4luv.com'
const CERCA_PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.qr4luv.cerca'

export default function App() {
  const [expandedPillar, setExpandedPillar] = useState<number | null>(0)
  const { locale, setLocale, t } = useGatewayI18n()

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
                {t.nav.poweredBy}
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
              <span>{t.nav.radarActive}</span>
            </div>

            {/* Language Dropdown */}
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as GatewayLocale)}
              aria-label="Select Language"
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
              {GATEWAY_LOCALES.map((l) => (
                <option key={l.code} value={l.code} style={{ background: '#07080c', color: '#fff' }}>
                  {l.flag} {l.label}
                </option>
              ))}
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
              <span>{t.nav.exploreMap}</span>
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
          <span>{t.hero.trustBadge}</span>
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
          {t.hero.headlineStart}{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #ec4899 0%, #22d3ee 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline',
            }}
          >
            {t.hero.headlineGradient}
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
          {t.hero.subheadline}
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
            <span>{t.hero.ctaMap}</span>
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
            <span>{t.hero.ctaPlay}</span>
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
            {t.pillars.tag}
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
            {t.pillars.heading}
          </h2>
        </div>

        {/* 4 Interactive Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {PILLARS_CONFIG.map((cfg) => {
            const isExpanded = expandedPillar === cfg.id
            const item = t.pillars.items[cfg.id]
            return (
              <div
                key={cfg.id}
                onClick={() => setExpandedPillar(isExpanded ? null : cfg.id)}
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
                    <span style={{ fontSize: '26px' }}>{cfg.icon}</span>
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
                      {item.badge}
                    </span>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: 800,
                        color: isExpanded ? '#ffffff' : '#f4f4f5',
                      }}
                    >
                      {item.title}
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
                  {item.short}
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
                    <div>{item.reveal}</div>
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
                        <span>{t.pillars.openFeature}</span>
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
            {t.hubs.tag}
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
            {t.hubs.heading}
          </h2>
          <p
            style={{
              fontSize: '14px',
              color: '#a1a1aa',
              margin: '8px auto 0',
              maxWidth: '600px',
            }}
          >
            {t.hubs.subheadline}
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
          {GLOBAL_HUBS_CONFIG.map((cfg, idx) => {
            const item = t.hubs.items[idx]
            return (
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
                    <span style={{ fontSize: '28px' }}>{cfg.flag}</span>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 800,
                        color: cfg.badgeColor,
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        border: `1px solid ${cfg.badgeColor}40`,
                      }}
                    >
                      {item.badge}
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
                    {item.city}
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
                    {item.country}
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
                  {item.detail}
                </p>
              </a>
            )
          })}
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
              <span>{t.footer.openWeb}</span>
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
              <span>{t.footer.downloadPlay}</span>
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
            {t.footer.copyright}
          </p>
        </div>
      </footer>
    </div>
  )
}
