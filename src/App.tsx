import React, { useState } from 'react'
import {
  Globe,
  Radio,
  Eye,
  ShieldCheck,
  Flame,
  Sparkles,
  Lock,
  Compass,
  QrCode,
  Languages,
  Check,
  X,
  Copy,
  Smartphone,
  Share2,
  ChevronRight,
  Sliders,
  UserCheck,
  MapPin,
  Send,
  Zap,
} from 'lucide-react'
import { useGatewayI18n, GATEWAY_LOCALES, type GatewayLocale } from './gatewayI18n'
import { useExitTelemetry } from './hooks/useExitTelemetry'

export default function App() {
  const { locale, setLocale, t } = useGatewayI18n()
  const { recordInteraction } = useExitTelemetry()

  // Interactive Modal States (100% self-contained, zero external domains)
  const [showRadarModal, setShowRadarModal] = useState(false)
  const [selectedHubIndex, setSelectedHubIndex] = useState(0)
  const [showBadgeModal, setShowBadgeModal] = useState(false)
  const [showAppModal, setShowAppModal] = useState(false)
  const [ghostModeActive, setGhostModeActive] = useState(false)
  const [knockSentCity, setKnockSentCity] = useState<string | null>(null)
  const [copiedLink, setCopiedLink] = useState(false)

  // Interactive Feature Card previews
  const [activeCardPreview, setActiveCardPreview] = useState<number | null>(null)
  const [simulatedKnocks, setSimulatedKnocks] = useState<number>(84)
  const [clipPlaying, setClipPlaying] = useState(false)
  const [translationActive, setTranslationActive] = useState(false)

  const handleOpenRadar = (hubIdx: number = 0) => {
    setSelectedHubIndex(hubIdx)
    setShowRadarModal(true)
    recordInteraction(`open_radar_hub_${hubIdx}`)
  }

  const handleOpenBadge = () => {
    setShowBadgeModal(true)
    recordInteraction('open_private_qr_badge')
  }

  const handleOpenApp = () => {
    setShowAppModal(true)
    recordInteraction('open_mobile_app_modal')
  }

  const handleSendKnock = (target: string) => {
    setKnockSentCity(target)
    setSimulatedKnocks((prev) => prev + 1)
    setTimeout(() => setKnockSentCity(null), 3200)
    recordInteraction(`send_knock_${target}`)
  }

  const handleCopyBadge = () => {
    setCopiedLink(true)
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText('https://scanqrglobal.ai/radar/private-badge#enc-9184')
      }
    } catch {}
    setTimeout(() => setCopiedLink(false), 2400)
    recordInteraction('copy_private_badge_link')
  }

  return (
    <div
      style={{
        backgroundColor: '#070709',
        color: '#ffffff',
        minHeight: '100vh',
        fontFamily:
          '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Seductive Ambient Glows & Keyframes */}
      <style>{`
        @keyframes pulse-seductive-glow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.9;
            box-shadow: 0 0 10px #f43f5e, 0 0 20px rgba(244, 63, 94, 0.4);
          }
          50% {
            transform: scale(1.3);
            opacity: 0.4;
            box-shadow: 0 0 18px #d946ef, 0 0 32px rgba(217, 70, 239, 0.6);
          }
        }
        @keyframes radar-sweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes subtle-shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .pulse-dot {
          animation: pulse-seductive-glow 2.2s infinite ease-in-out;
        }
        .radar-sweep-anim {
          animation: radar-sweep 4s linear infinite;
        }
        .seductive-card {
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .seductive-card:hover {
          transform: translateY(-3px);
          border-color: rgba(217, 70, 239, 0.42) !important;
          box-shadow: 0 16px 44px -12px rgba(217, 70, 239, 0.22), 0 0 24px -4px rgba(124, 58, 237, 0.18) !important;
        }
        .btn-primary-glow {
          transition: all 0.2s ease;
        }
        .btn-primary-glow:hover {
          transform: translateY(-1.5px);
          box-shadow: 0 8px 32px rgba(244, 63, 94, 0.55) !important;
          opacity: 0.96;
        }
        .btn-secondary-glow {
          transition: all 0.2s ease;
        }
        .btn-secondary-glow:hover {
          transform: translateY(-1.5px);
          border-color: rgba(217, 70, 239, 0.55) !important;
          background-color: rgba(217, 70, 239, 0.1) !important;
        }
      `}</style>

      {/* Ambient Moody Glow Backdrop Behind Page */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '1200px',
          height: '680px',
          background:
            'radial-gradient(ellipse 75% 55% at 50% 0%, rgba(217, 70, 239, 0.14) 0%, rgba(124, 58, 237, 0.08) 45%, rgba(7, 7, 9, 0) 75%)',
          filter: 'blur(45px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ========================================================= */}
      {/* 1. HEADER (STICKY GLASSMORPHIC BAR) */}
      {/* ========================================================= */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 999,
          backgroundColor: 'rgba(7, 7, 9, 0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(217, 70, 239, 0.12)',
          padding: '12px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          {/* Brand: Cerca Social Logo + ScanQR Global + Powered by Cerca Social */}
          <a
            href="/"
            data-track-action="header_brand_logo"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <img
              src="/cerca-logo.png"
              alt="Cerca Social"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                objectFit: 'cover',
                boxShadow: '0 0 16px rgba(244, 63, 94, 0.45)',
                flexShrink: 0,
              }}
            />

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 900,
                  letterSpacing: '-0.4px',
                  color: '#ffffff',
                }}
              >
                ScanQR{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #F43F5E 0%, #D946EF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Global
                </span>
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

          {/* Right Controls: Subtle Badge + Sleek Minimal Globe Selector + Enter Radar CTA */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            {/* Status indicator: ● Radar Live in 4 Cities */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(217, 70, 239, 0.08)',
                border: '1px solid rgba(217, 70, 239, 0.22)',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 700,
                color: '#f5d0fe',
                letterSpacing: '0.2px',
              }}
            >
              <span
                className="pulse-dot"
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#f43f5e',
                  display: 'inline-block',
                }}
              />
              <span>{t.nav.badge}</span>
            </div>

            {/* Sleek Minimal Globe Selector (No Raw Flag Emojis) */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '2px 8px',
              }}
            >
              <Globe size={14} style={{ color: '#d946ef', flexShrink: 0 }} />
              <select
                value={locale}
                onChange={(e) => {
                  setLocale(e.target.value as GatewayLocale)
                  recordInteraction(`change_language_${e.target.value}`)
                }}
                aria-label="Select Language"
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#e4e4e7',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  padding: '5px 4px',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                {GATEWAY_LOCALES.map((l) => (
                  <option
                    key={l.code}
                    value={l.code}
                    style={{ background: '#0a0910', color: '#ffffff' }}
                  >
                    {l.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Nav Button: Enter Radar → */}
            <button
              onClick={() => handleOpenRadar(0)}
              data-track-action="header_enter_radar"
              className="btn-primary-glow"
              style={{
                background: 'linear-gradient(135deg, #F43F5E 0%, #D946EF 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 18px',
                fontSize: '13px',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 18px rgba(244, 63, 94, 0.35)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              <span>{t.nav.navButton}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. HERO SECTION */}
      {/* ========================================================= */}
      <section
        id="hero"
        style={{
          maxWidth: '1040px',
          margin: '0 auto',
          padding: '64px 24px 36px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Hero Tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(217, 70, 239, 0.08)',
            border: '1px solid rgba(217, 70, 239, 0.28)',
            padding: '7px 20px',
            borderRadius: '9999px',
            fontSize: '11.5px',
            fontWeight: 800,
            color: '#f472b6',
            letterSpacing: '1px',
            marginBottom: '26px',
            boxShadow: '0 0 20px rgba(217, 70, 239, 0.12)',
          }}
        >
          <Sparkles size={13} style={{ color: '#f43f5e' }} />
          <span>{t.hero.tag}</span>
        </div>

        {/* Main Headline */}
        <h1
          style={{
            fontSize: 'clamp(32px, 5.4vw, 58px)',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-1.5px',
            color: '#ffffff',
            margin: '0 auto 22px',
            maxWidth: '920px',
          }}
        >
          {t.hero.headlineLine1}{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #F43F5E 0%, #D946EF 45%, #C084FC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
            }}
          >
            {t.hero.headlineLine2}
          </span>
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontSize: 'clamp(15px, 2.1vw, 18px)',
            lineHeight: 1.65,
            color: '#a1a1aa',
            maxWidth: '740px',
            margin: '0 auto 38px',
          }}
        >
          {t.hero.subheadline}
        </p>

        {/* Dual Hero CTAs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '54px',
          }}
        >
          {/* Primary CTA: See Who’s Out Tonight → */}
          <button
            onClick={() => handleOpenRadar(0)}
            data-track-action="hero_see_who_out_tonight"
            className="btn-primary-glow"
            style={{
              background: 'linear-gradient(135deg, #F43F5E 0%, #D946EF 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '16px 32px',
              fontSize: '15.5px',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 30px rgba(244, 63, 94, 0.42)',
              cursor: 'pointer',
            }}
          >
            <span>{t.hero.ctaPrimary}</span>
          </button>

          {/* Secondary CTA: Scan Private QR Badge */}
          <button
            onClick={handleOpenBadge}
            data-track-action="hero_scan_private_badge"
            className="btn-secondary-glow"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(217, 70, 239, 0.3)',
              color: '#ffffff',
              borderRadius: '12px',
              padding: '16px 28px',
              fontSize: '15.5px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(124, 58, 237, 0.14)',
            }}
          >
            <QrCode size={18} style={{ color: '#d946ef' }} />
            <span>{t.hero.ctaSecondary}</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* 3. SOCIAL PROOF TICKER */}
        {/* ========================================================= */}
        <div
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            backgroundColor: 'rgba(14, 12, 22, 0.72)',
            border: '1px solid rgba(217, 70, 239, 0.18)',
            borderRadius: '16px',
            padding: '16px 24px',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow:
              '0 12px 36px -10px rgba(124, 58, 237, 0.22), 0 0 20px -4px rgba(217, 70, 239, 0.14)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            {/* Ticker Item 1 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '14px',
                fontWeight: 700,
                color: '#e4e4e7',
              }}
            >
              <span>{t.ticker.guests}</span>
            </div>

            <div
              style={{
                width: '1px',
                height: '24px',
                backgroundColor: 'rgba(217, 70, 239, 0.2)',
                display: 'none',
              }}
              className="ticker-divider"
            />

            {/* Ticker Item 2 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '14px',
                fontWeight: 700,
                color: '#e4e4e7',
              }}
            >
              <span>{t.ticker.knocks}</span>
            </div>

            {/* Ticker Item 3 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '14px',
                fontWeight: 700,
                color: '#e4e4e7',
              }}
            >
              <span>{t.ticker.lounges}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. FEATURE CARDS: THE RULES OF ENGAGEMENT */}
      {/* ========================================================= */}
      <section
        id="rules-of-engagement"
        style={{
          maxWidth: '1060px',
          margin: '0 auto',
          padding: '60px 24px 64px',
          width: '100%',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '42px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#f43f5e',
              letterSpacing: '1.4px',
              textTransform: 'uppercase',
            }}
          >
            {t.features.eyebrow}
          </span>
          <h2
            style={{
              fontSize: 'clamp(26px, 4vw, 38px)',
              fontWeight: 900,
              color: '#ffffff',
              marginTop: '10px',
              letterSpacing: '-0.6px',
            }}
          >
            {t.features.title}
          </h2>
        </div>

        {/* 4 Moody Seductive Feature Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '20px',
          }}
        >
          {t.features.cards.map((card, idx) => {
            const isPreviewActive = activeCardPreview === idx
            return (
              <div
                key={idx}
                className="seductive-card"
                onClick={() => {
                  setActiveCardPreview(isPreviewActive ? null : idx)
                  recordInteraction(`click_feature_card_${idx}`)
                }}
                style={{
                  backgroundColor: 'rgba(14, 12, 22, 0.72)',
                  border: isPreviewActive
                    ? '1px solid rgba(217, 70, 239, 0.55)'
                    : '1px solid rgba(217, 70, 239, 0.14)',
                  borderRadius: '20px',
                  padding: '28px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backdropFilter: 'blur(16px)',
                  boxShadow: isPreviewActive
                    ? '0 16px 44px -10px rgba(217, 70, 239, 0.28), 0 0 24px -4px rgba(124, 58, 237, 0.22)'
                    : '0 8px 24px -10px rgba(0, 0, 0, 0.5)',
                }}
              >
                {/* Subtle Moody Corner Glow */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '-40px',
                    width: '140px',
                    height: '140px',
                    background:
                      idx % 2 === 0
                        ? 'radial-gradient(circle, rgba(244, 63, 94, 0.16) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(217, 70, 239, 0.16) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Eyebrow Badge & Rule Tag */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.8px',
                      color: '#f472b6',
                      backgroundColor: 'rgba(217, 70, 239, 0.1)',
                      border: '1px solid rgba(217, 70, 239, 0.22)',
                      padding: '3px 10px',
                      borderRadius: '6px',
                    }}
                  >
                    {card.rule} • {card.tag}
                  </span>

                  <span style={{ color: '#d946ef' }}>
                    {idx === 0 && <Eye size={18} />}
                    {idx === 1 && <Flame size={18} />}
                    {idx === 2 && <ShieldCheck size={18} />}
                    {idx === 3 && <Languages size={18} />}
                  </span>
                </div>

                {/* Card Title */}
                <h3
                  style={{
                    fontSize: '19px',
                    fontWeight: 800,
                    color: '#ffffff',
                    margin: '0 0 12px',
                    lineHeight: 1.35,
                    letterSpacing: '-0.3px',
                  }}
                >
                  {card.title}
                </h3>

                {/* Card Body */}
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.6,
                    color: '#a1a1aa',
                    margin: '0 0 18px',
                  }}
                >
                  {card.body}
                </p>

                {/* Interactive Micro-Action Trigger */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    color: isPreviewActive ? '#f43f5e' : '#d946ef',
                    transition: 'color 0.2s ease',
                  }}
                >
                  <span>{card.action}</span>
                  <ChevronRight size={14} />
                </div>

                {/* Simulated Interactive Reveal State */}
                {isPreviewActive && (
                  <div
                    style={{
                      marginTop: '16px',
                      paddingTop: '16px',
                      borderTop: '1px solid rgba(217, 70, 239, 0.18)',
                      fontSize: '13px',
                      color: '#e4e4e7',
                      lineHeight: 1.5,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {idx === 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="pulse-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#f43f5e' }} />
                          <span style={{ color: '#fda4af', fontWeight: 600 }}>Knock radar simulated:</span>
                        </div>
                        <p style={{ margin: 0, color: '#a1a1aa' }}>
                          Anonymous ping transmitted across room radar. Mutual interest confirmed in 1.4s. Direct line active.
                        </p>
                      </div>
                    )}
                    {idx === 1 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: '#f43f5e', fontWeight: 700 }}>● 10s Live Clip:</span>
                          <span style={{ color: '#fda4af' }}>Roof Bar • 48 guests</span>
                        </div>
                        <p style={{ margin: 0, color: '#a1a1aa' }}>
                          Raw unedited feed streamed 4m ago. High energy, deep groove, velvet rope open.
                        </p>
                      </div>
                    )}
                    {idx === 2 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ color: '#c084fc', fontWeight: 600 }}>Stealth Cloak:</span>
                          <button
                            onClick={() => setGhostModeActive(!ghostModeActive)}
                            style={{
                              backgroundColor: ghostModeActive ? '#7C3AED' : 'rgba(255, 255, 255, 0.1)',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '3px 10px',
                              fontSize: '11px',
                              fontWeight: 700,
                              cursor: 'pointer',
                            }}
                          >
                            {ghostModeActive ? 'Ghost Active' : 'Go Ghost'}
                          </button>
                        </div>
                        <p style={{ margin: 0, color: '#a1a1aa' }}>
                          {ghostModeActive
                            ? 'You are invisible on the room map. Vitals browsing remains unhindered.'
                            : 'Radar visible to nearby guests with encrypted badges.'}
                        </p>
                      </div>
                    )}
                    {idx === 3 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: '#d946ef', fontWeight: 600 }}>Real-time Feed:</span>
                          <span style={{ color: '#f5d0fe' }}>ES ↔ EN ↔ TH</span>
                        </div>
                        <p style={{ margin: 0, color: '#a1a1aa' }}>
                          "¿Te gustaría unirte a nuestra mesa?" ➔ "Would you like to join our table tonight?" (0.2s latency)
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. LIVE HUBS: ACTIVE RADAR NETWORKS */}
      {/* ========================================================= */}
      <section
        id="radar-hubs"
        style={{
          maxWidth: '1060px',
          margin: '0 auto',
          padding: '20px 24px 72px',
          width: '100%',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '38px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#d946ef',
              letterSpacing: '1.4px',
              textTransform: 'uppercase',
            }}
          >
            {t.hubs.eyebrow}
          </span>
          <h2
            style={{
              fontSize: 'clamp(26px, 4vw, 36px)',
              fontWeight: 900,
              color: '#ffffff',
              marginTop: '10px',
              letterSpacing: '-0.5px',
            }}
          >
            {t.hubs.title}
          </h2>
        </div>

        {/* 4 Active City Cards in Responsive Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '18px',
          }}
        >
          {t.hubs.cards.map((hub, idx) => {
            return (
              <div
                key={idx}
                className="seductive-card"
                onClick={() => handleOpenRadar(idx)}
                style={{
                  backgroundColor: 'rgba(14, 12, 22, 0.76)',
                  border: '1px solid rgba(217, 70, 239, 0.16)',
                  borderRadius: '18px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '170px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 24px -10px rgba(0, 0, 0, 0.6)',
                }}
              >
                {/* Radial ambient glow */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '-30px',
                    left: '-30px',
                    width: '120px',
                    height: '120px',
                    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.14) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />

                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '10px',
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>{hub.icon}</span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#f472b6',
                        backgroundColor: 'rgba(217, 70, 239, 0.1)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        border: '1px solid rgba(217, 70, 239, 0.22)',
                      }}
                    >
                      {hub.neighborhood}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '20px',
                      fontWeight: 900,
                      color: '#ffffff',
                      margin: '0 0 4px',
                      letterSpacing: '-0.3px',
                    }}
                  >
                    {hub.city}
                  </h3>
                </div>

                <div style={{ marginTop: '14px' }}>
                  <p
                    style={{
                      fontSize: '13px',
                      lineHeight: 1.5,
                      color: '#d4d4d8',
                      margin: '0 0 14px',
                    }}
                  >
                    {hub.status}
                  </p>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      fontWeight: 800,
                      color: '#f43f5e',
                    }}
                  >
                    <span>Inspect Live Radar</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. BOTTOM CTA SECTION */}
      {/* ========================================================= */}
      <section
        style={{
          maxWidth: '980px',
          margin: '0 auto 80px',
          padding: '0 24px',
          width: '100%',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(14, 12, 22, 0.85)',
            border: '1px solid rgba(217, 70, 239, 0.24)',
            borderRadius: '24px',
            padding: '54px 32px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(20px)',
            boxShadow:
              '0 20px 60px -20px rgba(217, 70, 239, 0.22), 0 0 30px -10px rgba(124, 58, 237, 0.25)',
          }}
        >
          {/* Moody Radial Backdrop in Card */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '540px',
              height: '320px',
              background:
                'radial-gradient(ellipse at center, rgba(217, 70, 239, 0.16) 0%, rgba(124, 58, 237, 0.08) 50%, transparent 75%)',
              filter: 'blur(35px)',
              pointerEvents: 'none',
            }}
          />

          <h2
            style={{
              fontSize: 'clamp(26px, 4.4vw, 42px)',
              fontWeight: 900,
              color: '#ffffff',
              margin: '0 auto 12px',
              letterSpacing: '-0.8px',
              lineHeight: 1.2,
            }}
          >
            {t.bottomCta.headline}
          </h2>

          <p
            style={{
              fontSize: '16px',
              color: '#a1a1aa',
              margin: '0 auto 36px',
              maxWidth: '600px',
              lineHeight: 1.55,
            }}
          >
            {t.bottomCta.subheadline}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '18px',
              flexWrap: 'wrap',
            }}
          >
            {/* Primary Button: Unlock Live Proximity Radar → */}
            <button
              onClick={() => handleOpenRadar(0)}
              data-track-action="bottom_unlock_proximity_radar"
              className="btn-primary-glow"
              style={{
                background: 'linear-gradient(135deg, #F43F5E 0%, #D946EF 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 32px',
                fontSize: '15.5px',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 28px rgba(244, 63, 94, 0.45)',
                cursor: 'pointer',
              }}
            >
              <span>{t.bottomCta.primaryBtn}</span>
            </button>

            {/* Secondary Link: Get the Mobile App (4.8★) */}
            <button
              onClick={handleOpenApp}
              data-track-action="bottom_get_mobile_app"
              className="btn-secondary-glow"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(217, 70, 239, 0.3)',
                color: '#ffffff',
                borderRadius: '12px',
                padding: '16px 26px',
                fontSize: '15px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Smartphone size={16} style={{ color: '#d946ef' }} />
              <span>{t.bottomCta.secondaryLink}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. FOOTER */}
      {/* ========================================================= */}
      <footer
        style={{
          marginTop: 'auto',
          borderTop: '1px solid rgba(217, 70, 239, 0.12)',
          backgroundColor: '#070709',
          padding: '36px 24px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '11.5px',
              fontWeight: 700,
              color: '#d946ef',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            <Lock size={12} />
            <span>Encrypted Social Proximity</span>
          </div>

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

      {/* ========================================================= */}
      {/* 8. INTERACTIVE RADAR MODAL (100% SELF-CONTAINED) */}
      {/* ========================================================= */}
      {showRadarModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(5, 5, 8, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setShowRadarModal(false)}
        >
          <div
            style={{
              backgroundColor: '#0d0b14',
              border: '1px solid rgba(217, 70, 239, 0.3)',
              borderRadius: '22px',
              maxWidth: '560px',
              width: '100%',
              padding: '30px',
              position: 'relative',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(217, 70, 239, 0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowRadarModal(false)}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(244, 63, 94, 0.1)',
                  border: '1px solid rgba(244, 63, 94, 0.28)',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#fda4af',
                  marginBottom: '10px',
                }}
              >
                <span className="pulse-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#f43f5e' }} />
                <span>● Radar Active Feed</span>
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 900, margin: '0 0 6px', color: '#fff' }}>
                {t.modals.radarTitle}
              </h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#a1a1aa' }}>
                {t.modals.radarSubtitle}
              </p>
            </div>

            {/* City Selector Tabs */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '8px',
                marginBottom: '22px',
              }}
            >
              {t.hubs.cards.map((hub, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedHubIndex(idx)}
                  style={{
                    backgroundColor:
                      selectedHubIndex === idx
                        ? 'rgba(217, 70, 239, 0.22)'
                        : 'rgba(255, 255, 255, 0.03)',
                    border:
                      selectedHubIndex === idx
                        ? '1px solid #d946ef'
                        : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    padding: '8px 4px',
                    color: selectedHubIndex === idx ? '#fff' : '#a1a1aa',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div>{hub.icon}</div>
                  <div style={{ marginTop: '3px' }}>{hub.city}</div>
                </button>
              ))}
            </div>

            {/* Simulated Live Radar Scanner Display */}
            <div
              style={{
                backgroundColor: 'rgba(7, 7, 9, 0.85)',
                border: '1px solid rgba(217, 70, 239, 0.2)',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '20px',
              }}
            >
              {/* Concentric Radar Rings */}
              <div
                style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  border: '1px dashed rgba(217, 70, 239, 0.35)',
                  margin: '0 auto',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    border: '1px solid rgba(124, 58, 237, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: '#f43f5e',
                      boxShadow: '0 0 16px #f43f5e',
                    }}
                  />
                </div>
                {/* Rotating sweep line */}
                <div
                  className="radar-sweep-anim"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '78px',
                    height: '2px',
                    background: 'linear-gradient(90deg, #f43f5e, transparent)',
                    transformOrigin: '0 0',
                  }}
                />
              </div>

              <div style={{ marginTop: '16px' }}>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 800,
                    color: '#ffffff',
                  }}
                >
                  {t.hubs.cards[selectedHubIndex].city} • {t.hubs.cards[selectedHubIndex].neighborhood}
                </span>
                <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#a1a1aa' }}>
                  {t.hubs.cards[selectedHubIndex].status}
                </p>
              </div>
            </div>

            {/* Simulated Detected Guests in the Room */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#a1a1aa' }}>
                <span>Verified Guests in Proximity</span>
                <span style={{ color: '#d946ef' }}>● Encrypted Handshake</span>
              </div>

              {[
                { id: 'Guest #419', dist: '12m away', vibe: 'Speakeasy Lounge' },
                { id: 'Guest #802', dist: '24m away', vibe: 'VIP Rooftop' },
                { id: 'Guest #115', dist: '38m away', vibe: 'Bar Counter' },
              ].map((guest, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    padding: '10px 14px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: idx === 0 ? '#f43f5e' : '#7C3AED',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: 800,
                      }}
                    >
                      {guest.id.slice(-2)}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>
                        {guest.id}
                      </div>
                      <div style={{ fontSize: '11px', color: '#a1a1aa' }}>
                        {guest.dist} • {guest.vibe}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSendKnock(guest.id)}
                    style={{
                      backgroundColor: 'rgba(244, 63, 94, 0.15)',
                      border: '1px solid rgba(244, 63, 94, 0.35)',
                      color: '#fda4af',
                      borderRadius: '8px',
                      padding: '6px 12px',
                      fontSize: '12px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <Send size={12} />
                    <span>Send Knock</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Knock Feedback Toast */}
            {knockSentCity && (
              <div
                style={{
                  marginTop: '16px',
                  backgroundColor: 'rgba(244, 63, 94, 0.15)',
                  border: '1px solid #f43f5e',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12.5px',
                  color: '#ffffff',
                }}
              >
                <Zap size={15} style={{ color: '#f43f5e' }} />
                <span>
                  Knock delivered to {knockSentCity}. Line opens on mutual intrigue!
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 9. INTERACTIVE PRIVATE QR BADGE MODAL (100% SELF-CONTAINED) */}
      {/* ========================================================= */}
      {showBadgeModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(5, 5, 8, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setShowBadgeModal(false)}
        >
          <div
            style={{
              backgroundColor: '#0d0b14',
              border: '1px solid rgba(217, 70, 239, 0.3)',
              borderRadius: '22px',
              maxWidth: '480px',
              width: '100%',
              padding: '30px',
              position: 'relative',
              textAlign: 'center',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(217, 70, 239, 0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowBadgeModal(false)}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={18} />
            </button>

            <h3 style={{ fontSize: '22px', fontWeight: 900, margin: '0 0 6px', color: '#fff' }}>
              {t.modals.badgeTitle}
            </h3>
            <p style={{ margin: '0 0 24px', fontSize: '13px', color: '#a1a1aa' }}>
              {t.modals.badgeSubtitle}
            </p>

            {/* Stylized Encrypted Badge Card */}
            <div
              style={{
                backgroundColor: ghostModeActive
                  ? 'rgba(20, 16, 28, 0.95)'
                  : 'rgba(244, 63, 94, 0.06)',
                border: ghostModeActive
                  ? '1px dashed rgba(124, 58, 237, 0.5)'
                  : '1px solid rgba(217, 70, 239, 0.3)',
                borderRadius: '16px',
                padding: '28px 20px',
                marginBottom: '20px',
                transition: 'all 0.25s ease',
              }}
            >
              <div
                style={{
                  width: '150px',
                  height: '150px',
                  margin: '0 auto 16px',
                  borderRadius: '12px',
                  background: ghostModeActive
                    ? 'linear-gradient(135deg, #181524, #0a0812)'
                    : 'linear-gradient(135deg, #2a1128, #18091d)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(217, 70, 239, 0.2)',
                  position: 'relative',
                }}
              >
                {ghostModeActive ? (
                  <ShieldCheck size={64} style={{ color: '#7C3AED', opacity: 0.8 }} />
                ) : (
                  <QrCode size={110} style={{ color: '#f43f5e' }} />
                )}
              </div>

              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  color: ghostModeActive ? '#a78bfa' : '#fda4af',
                  letterSpacing: '0.6px',
                }}
              >
                {ghostModeActive ? t.modals.ghostModeActive : t.modals.ghostModeInactive}
              </div>
            </div>

            {/* Ghost Mode Toggle */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '22px',
              }}
            >
              <button
                onClick={() => setGhostModeActive(!ghostModeActive)}
                style={{
                  backgroundColor: ghostModeActive
                    ? 'rgba(124, 58, 237, 0.25)'
                    : 'rgba(244, 63, 94, 0.15)',
                  border: ghostModeActive
                    ? '1px solid #7C3AED'
                    : '1px solid rgba(244, 63, 94, 0.4)',
                  color: '#ffffff',
                  borderRadius: '10px',
                  padding: '10px 18px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.15s ease',
                }}
              >
                <Sliders size={15} />
                <span>
                  {ghostModeActive ? 'Disable Ghost Mode' : 'Step into Ghost Mode'}
                </span>
              </button>

              <button
                onClick={handleCopyBadge}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  borderRadius: '10px',
                  padding: '10px 16px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {copiedLink ? <Check size={15} style={{ color: '#4ade80' }} /> : <Copy size={15} />}
                <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
              </button>
            </div>

            <div style={{ fontSize: '11.5px', color: '#71717a' }}>
              🔒 No Phone Numbers Shared • Zero Paper Trails • Discretion Guaranteed
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 10. MOBILE APP MODAL (100% SELF-CONTAINED) */}
      {/* ========================================================= */}
      {showAppModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(5, 5, 8, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setShowAppModal(false)}
        >
          <div
            style={{
              backgroundColor: '#0d0b14',
              border: '1px solid rgba(217, 70, 239, 0.3)',
              borderRadius: '22px',
              maxWidth: '460px',
              width: '100%',
              padding: '32px 28px',
              position: 'relative',
              textAlign: 'center',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(217, 70, 239, 0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAppModal(false)}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={18} />
            </button>

            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #F43F5E 0%, #D946EF 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px',
              }}
            >
              <Smartphone size={24} color="#fff" />
            </div>

            <h3 style={{ fontSize: '22px', fontWeight: 900, margin: '0 0 6px', color: '#fff' }}>
              {t.modals.appTitle} (4.8★)
            </h3>
            <p style={{ margin: '0 0 24px', fontSize: '13px', color: '#a1a1aa' }}>
              {t.modals.appSubtitle}
            </p>

            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(217, 70, 239, 0.2)',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '22px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#d946ef', fontWeight: 800 }}>1.</span>
                <span style={{ fontSize: '13px', color: '#e4e4e7' }}>
                  Tap <strong>Share</strong> in Safari or Chrome on your mobile device.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#d946ef', fontWeight: 800 }}>2.</span>
                <span style={{ fontSize: '13px', color: '#e4e4e7' }}>
                  Select <strong>"Add to Home Screen"</strong> for instant zero-install access.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#d946ef', fontWeight: 800 }}>3.</span>
                <span style={{ fontSize: '13px', color: '#e4e4e7' }}>
                  Enjoy real-time proximity knocks and ghost radar with zero data leaks.
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowAppModal(false)
                handleOpenRadar(0)
              }}
              className="btn-primary-glow"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #F43F5E 0%, #D946EF 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                padding: '14px 20px',
                fontSize: '14px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              Launch Progressive Radar in Browser →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
