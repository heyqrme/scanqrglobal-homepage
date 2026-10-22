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
  ChevronRight,
  Sliders,
  Heart,
  MapPin,
  Send,
  Zap,
} from 'lucide-react'
import { useGatewayI18n, GATEWAY_LOCALES, type GatewayLocale } from './gatewayI18n'
import { useExitTelemetry } from './hooks/useExitTelemetry'

export default function App() {
  const { locale, setLocale, t } = useGatewayI18n()
  const { recordInteraction, viewsCount } = useExitTelemetry()

  // Interactive Modal States
  const [showRadarModal, setShowRadarModal] = useState(false)
  const [selectedHubIndex, setSelectedHubIndex] = useState(0)
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)

  const handleOpenRadar = (hubIdx: number = 0) => {
    setSelectedHubIndex(hubIdx)
    setShowRadarModal(true)
    recordInteraction(`open_radar_hub_${hubIdx}`)
  }

  const handleOpenRegistration = () => {
    recordInteraction('get_personal_qr_code')
    const registerUrl = 'https://www.qr4luv.com/register'
    if (typeof window !== 'undefined') {
      window.location.href = registerUrl
    }
  }

  return (
    <div
      style={{
        backgroundColor: '#08080a',
        color: '#f3f3f6',
        minHeight: '100vh',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflowX: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {/* Ambient Pulsing Background Glow */}
      <style>{`
        @keyframes pulseGlow {
          0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.95; }
        }

        @keyframes colorShift {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(25deg); }
        }

        @keyframes pulse-seductive-glow {
          0%, 100% { opacity: 0.4; transform: scale(0.98); }
          50% { opacity: 0.85; transform: scale(1.02); }
        }

        .ambient-glow-layer {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 65vw;
          height: 65vw;
          max-width: 900px;
          max-height: 900px;
          background: radial-gradient(circle, rgba(255, 42, 109, 0.22) 0%, rgba(212, 175, 55, 0.08) 40%, rgba(5, 217, 232, 0.04) 60%, transparent 75%);
          filter: blur(90px);
          z-index: 0;
          pointer-events: none;
          animation: pulseGlow 9s ease-in-out infinite alternate;
        }

        .cta-btn-hover:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }
      `}</style>

      <div className="ambient-glow-layer" />

      {/* ========================================================= */}
      {/* 1. TOP HEADER & LANGUAGE SELECTOR */}
      {/* ========================================================= */}
      <header
        style={{
          position: 'relative',
          zIndex: 20,
          width: '100%',
          maxWidth: '1200px',
          padding: '24px 20px 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
        }}
      >
        {/* Brand Center/Left */}
        <a
          href="https://www.qr4luv.com"
          style={{ textDecoration: 'none', textAlign: 'left', cursor: 'pointer' }}
        >
          <h1
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(1.3rem, 2.8vw, 1.9rem)',
              fontWeight: 700,
              letterSpacing: '0.3em',
              color: '#ffffff',
              margin: 0,
              textShadow: '0 0 20px rgba(255,255,255,0.25)',
            }}
          >
            SCANQR GLOBAL
          </h1>
          <p
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.25em',
              color: '#8e8e99',
              fontWeight: 400,
              textTransform: 'uppercase',
              margin: '3px 0 0',
            }}
          >
            Powered by Cerca
          </p>
        </a>

        {/* Language Switcher Pill */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              color: '#ffffff',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.15s ease',
            }}
          >
            <Globe size={13} style={{ color: '#fda4af' }} />
            <span>{locale.toUpperCase()}</span>
            <span style={{ fontSize: '9px', opacity: 0.7 }}>▾</span>
          </button>

          {langDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                backgroundColor: '#0e0c16',
                border: '1px solid rgba(217, 70, 239, 0.3)',
                borderRadius: '14px',
                padding: '6px',
                zIndex: 100,
                minWidth: '130px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.8)',
              }}
            >
              {GATEWAY_LOCALES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => {
                    setLocale(l.code)
                    setLangDropdownOpen(false)
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    backgroundColor: locale === l.code ? 'rgba(217, 70, 239, 0.2)' : 'transparent',
                    border: 'none',
                    color: locale === l.code ? '#ffffff' : '#a1a1aa',
                    fontSize: '12.5px',
                    fontWeight: locale === l.code ? 700 : 500,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{l.label}</span>
                  {locale === l.code && <Check size={12} color="#f43f5e" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. MAIN HERO CENTER STAGE */}
      {/* ========================================================= */}
      <main
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '2.5rem 1.5rem 1.5rem',
          maxWidth: '920px',
          width: '100%',
          margin: 'auto',
          boxSizing: 'border-box',
        }}
      >
        {/* Ultra-Luxe Animated Headline */}
        <h2
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(1.9rem, 4.4vw, 3.4rem)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            lineHeight: 1.25,
            marginBottom: '1.4rem',
            background: 'linear-gradient(135deg, #ffffff 25%, #e2b714 68%, #ff2a6d 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'colorShift 10s ease infinite alternate',
            maxWidth: '850px',
          }}
        >
          THE ROOM IS BLIND UNTIL YOU STEP IN.
        </h2>

        {/* Seductive Subtext Labels */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.9rem',
            alignItems: 'center',
            marginBottom: '2rem',
          }}
        >
          <span
            style={{
              fontSize: 'clamp(0.85rem, 1.6vw, 1.05rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
              color: '#ffffff',
              fontWeight: 600,
              textShadow: '0 0 16px rgba(255, 255, 255, 0.4)',
            }}
          >
            FREE LIVE VIDEO • GLOBAL CHAT • UNTOLD PLACES
          </span>
          <span
            style={{
              fontSize: 'clamp(0.8rem, 1.4vw, 0.95rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: '#8e8e99',
              fontWeight: 400,
            }}
          >
            NO VIP WALLS. NO PAPER TRAILS. JUST CHEMISTRY.
          </span>
        </div>

        {/* Centerpiece Image Showcase */}
        <div
          style={{
            position: 'relative',
            maxWidth: '720px',
            width: '100%',
            borderRadius: '22px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 42, 109, 0.35)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.85), 0 0 40px rgba(255, 42, 109, 0.25)',
            marginBottom: '2.5rem',
            background: '#0e0c16',
          }}
        >
          <img
            src="https://lh3.googleusercontent.com/gg-dl/AHiVA1naNfi1PnEzSHp_2YH1FlgFBjFh5cE_jI0pT9RyMIHWSii2v3RzpCV5yNKDSsgtMLsge7jX7zp_vO_awlvu2ijFhFeA8RmmqFSniYknkqgPWfrDnUYELgLzVHNX4UXA03KqIitOQogM_F0tyQ99AtY2npgW3XaqYc3W1tunaW2fGUXS=s1024-rj"
            alt="The Blind Room — ScanQR Global"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'cover',
              maxHeight: '440px',
            }}
          />
          {/* Subtle bottom vignette overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(8, 8, 10, 0.65) 0%, transparent 45%, rgba(8, 8, 10, 0.25) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* ========================================================= */}
        {/* 3. DIRECT ACTION BUTTONS (ENTER CERCA / DATING / RADAR) */}
        {/* ========================================================= */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            flexWrap: 'wrap',
            maxWidth: '820px',
            margin: '0 auto 2.5rem',
            width: '100%',
          }}
        >
          {/* CTA 1: ENTER CERCA */}
          <a
            href="https://www.qr4luv.com/register"
            onClick={handleOpenRegistration}
            data-track-action="hero_enter_cerca"
            className="cta-btn-hover"
            style={{
              background: 'linear-gradient(135deg, #f43f5e 0%, #d946ef 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '14px',
              padding: '16px 32px',
              fontSize: '15px',
              fontWeight: 800,
              letterSpacing: '0.04em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 8px 30px rgba(244, 63, 94, 0.45)',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <QrCode size={18} />
            <span>ENTER CERCA →</span>
          </a>

          {/* CTA 2: CERCA DATING */}
          <a
            href="https://www.qr4luv.com/faces?dating=1"
            data-track-action="hero_cerca_dating"
            className="cta-btn-hover"
            style={{
              background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.2) 0%, rgba(217, 70, 239, 0.18) 100%)',
              border: '1.5px solid rgba(244, 63, 94, 0.55)',
              color: '#ffffff',
              borderRadius: '14px',
              padding: '16px 28px',
              fontSize: '15px',
              fontWeight: 800,
              letterSpacing: '0.04em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 6px 24px rgba(244, 63, 94, 0.25)',
              textDecoration: 'none',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.15s ease',
            }}
          >
            <Heart size={18} style={{ color: '#fb7185' }} />
            <span>CERCA DATING →</span>
          </a>

          {/* CTA 3: SEE WHO'S OUT TONIGHT */}
          <button
            type="button"
            onClick={() => handleOpenRadar(0)}
            data-track-action="hero_see_whos_out_tonight"
            className="cta-btn-hover"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              color: '#ffffff',
              borderRadius: '14px',
              padding: '16px 28px',
              fontSize: '15px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
              transition: 'all 0.15s ease',
            }}
          >
            <Compass size={18} style={{ color: '#38bdf8' }} />
            <span>SEE WHO’S OUT TONIGHT</span>
          </button>
        </div>

        {/* Feature Pill Highlights */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            maxWidth: '780px',
            margin: '0 auto',
          }}
        >
          {[
            { icon: '🔒', text: 'Zero Phone Numbers Shared' },
            { icon: '🛡️', text: 'Discretion Guaranteed' },
            { icon: '⚡', text: 'Live Proximity Radar' },
            { icon: '🌐', text: '8-Language Real-Time Translation' },
          ].map((badge, idx) => (
            <div
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '999px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: '11.5px',
                color: '#a1a1aa',
                letterSpacing: '0.02em',
              }}
            >
              <span>{badge.icon}</span>
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </main>

      {/* ========================================================= */}
      {/* 4. DISCREET MINIMAL FOOTER */}
      {/* ========================================================= */}
      <footer
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '2.5rem 1rem 3rem',
          fontSize: '0.75rem',
          letterSpacing: '0.22em',
          color: 'rgba(142, 142, 153, 0.55)',
          textTransform: 'uppercase',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <p style={{ margin: '0 0 6px' }}>Discretion Guaranteed • 2026</p>
        <p style={{ margin: 0, fontSize: '0.7rem', color: 'rgba(142, 142, 153, 0.35)' }}>
          Powered by Cerca Social
        </p>
      </footer>

      {/* ========================================================= */}
      {/* 5. INTERACTIVE LIVE RADAR MODAL */}
      {/* ========================================================= */}
      {showRadarModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(5, 5, 8, 0.88)',
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
              padding: '28px',
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
                top: '18px',
                right: '18px',
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
            <div style={{ marginBottom: '18px' }}>
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
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#f43f5e' }} />
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
                marginBottom: '20px',
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
                marginBottom: '18px',
              }}
            >
              <div
                style={{
                  width: '150px',
                  height: '150px',
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
                    width: '85px',
                    height: '85px',
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
              </div>
              <div
                style={{
                  marginTop: '14px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#f0abfc',
                }}
              >
                {t.hubs.cards[selectedHubIndex]?.city} • {t.hubs.cards[selectedHubIndex]?.badge}
              </div>
              <div style={{ fontSize: '11.5px', color: '#a1a1aa', marginTop: '2px' }}>
                {t.hubs.cards[selectedHubIndex]?.vibe}
              </div>
            </div>

            {/* Launch into Cerca Button */}
            <a
              href="https://www.qr4luv.com/register"
              onClick={handleOpenRegistration}
              style={{
                background: 'linear-gradient(135deg, #F43F5E 0%, #D946EF 100%)',
                color: '#ffffff',
                borderRadius: '12px',
                padding: '13px 20px',
                fontSize: '14px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 8px 24px rgba(244, 63, 94, 0.35)',
                textDecoration: 'none',
                cursor: 'pointer',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <span>{t.modals.radarLaunchButton}</span>
              <ChevronRight size={16} />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
