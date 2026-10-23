import React, { useState } from 'react'
import {
  Globe,
  Compass,
  QrCode,
  Check,
  Heart,
  X,
  ChevronRight,
} from 'lucide-react'
import { useGatewayI18n, GATEWAY_LOCALES } from './gatewayI18n'
import { useExitTelemetry } from './hooks/useExitTelemetry'

export default function App() {
  const { locale, setLocale, t } = useGatewayI18n()
  const { recordInteraction } = useExitTelemetry()

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
        backgroundColor: '#050507',
        color: '#f4f4f6',
        minHeight: '100vh',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflowX: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {/* Ambient Cinematic Lighting & Shimmer Keyframes */}
      <style>{`
        @keyframes ambientPulse {
          0% { transform: translate(-50%, -50%) scale(0.85); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.9; }
        }

        @keyframes textShimmer {
          0% { filter: brightness(1); }
          100% { filter: brightness(1.25); }
        }

        .ambient-lighting {
          content: '';
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70vw;
          height: 70vw;
          background: radial-gradient(circle, rgba(255, 42, 109, 0.15) 0%, rgba(5, 217, 232, 0.04) 45%, transparent 70%);
          filter: blur(90px);
          z-index: 0;
          pointer-events: none;
          animation: ambientPulse 10s ease-in-out infinite alternate;
        }

        .label-line {
          font-size: clamp(0.9rem, 1.6vw, 1.15rem);
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: #9494a0;
          font-weight: 400;
          transition: all 0.4s ease;
          display: inline-block;
        }

        .label-line.primary {
          color: #f4f4f6;
          font-weight: 500;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.35);
        }

        .label-line:hover {
          color: #ffffff;
          text-shadow: 0 0 25px rgba(255, 42, 109, 0.7);
          transform: scale(1.02);
        }

        .cta-btn-glow {
          transition: all 0.25s ease;
        }
        .cta-btn-glow:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 12px 35px rgba(255, 42, 109, 0.5) !important;
        }
      `}</style>

      <div className="ambient-lighting" />

      {/* ========================================================= */}
      {/* HEADER AREA */}
      {/* ========================================================= */}
      <header
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1200px',
          paddingTop: '5vh',
          paddingLeft: '20px',
          paddingRight: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
        }}
      >
        {/* Brand Title + Subtitle */}
        <a
          href="https://qr4luv.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', textAlign: 'left', cursor: 'pointer' }}
        >
          <h1
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)',
              fontWeight: 700,
              letterSpacing: '0.35em',
              color: '#ffffff',
              marginBottom: '0.3rem',
              textShadow: '0 0 25px rgba(255, 255, 255, 0.25)',
            }}
          >
            SCANQR GLOBAL
          </h1>
          <p
            style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              color: '#9494a0',
              fontWeight: 400,
              margin: 0,
              transition: 'color 0.3s ease',
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
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
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
            <Globe size={13} style={{ color: '#ff2a6d' }} />
            <span>{locale.toUpperCase()}</span>
            <span style={{ fontSize: '9px', opacity: 0.7 }}>▾</span>
          </button>

          {langDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                backgroundColor: '#0a0a0f',
                border: '1px solid rgba(255, 42, 109, 0.3)',
                borderRadius: '14px',
                padding: '6px',
                zIndex: 100,
                minWidth: '130px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.85)',
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
                    backgroundColor: locale === l.code ? 'rgba(255, 42, 109, 0.2)' : 'transparent',
                    border: 'none',
                    color: locale === l.code ? '#ffffff' : '#9494a0',
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
                  {locale === l.code && <Check size={12} color="#ff2a6d" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ========================================================= */}
      {/* CORE CENTER STAGE */}
      {/* ========================================================= */}
      <main
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '2rem 1.5rem',
          maxWidth: '950px',
          width: '100%',
          margin: 'auto',
          boxSizing: 'border-box',
        }}
      >
        {/* Hero Headline */}
        <h2
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
            fontWeight: 600,
            letterSpacing: '0.06em',
            lineHeight: 1.25,
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, #ffffff 20%, #ffc857 60%, #ff2a6d 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'textShimmer 8s ease infinite alternate',
          }}
        >
          THE ROOM IS BLIND UNTIL YOU STEP IN.
        </h2>

        {/* Vertical Label Stack */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.4rem',
            alignItems: 'center',
            marginBottom: '2.5rem',
          }}
        >
          <span className="label-line primary">
            FREE LIVE VIDEO • GLOBAL CHAT • UNTOLD PLACES
          </span>
          <span className="label-line">
            NO VIP WALLS. NO PAPER TRAILS. JUST CHEMISTRY.
          </span>
        </div>

        {/* Featured Centerpiece Image */}
        <div
          style={{
            position: 'relative',
            maxWidth: '740px',
            width: '100%',
            borderRadius: '22px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 42, 109, 0.35)',
            boxShadow: '0 24px 70px rgba(0, 0, 0, 0.9), 0 0 45px rgba(255, 42, 109, 0.22)',
            marginBottom: '2.8rem',
            background: '#09090d',
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
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(5, 5, 7, 0.7) 0%, transparent 45%, rgba(5, 5, 7, 0.2) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* ========================================================= */}
        {/* DIRECT ACTION BUTTONS (ENTER CERCA / DATING / RADAR) */}
        {/* ========================================================= */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            flexWrap: 'wrap',
            maxWidth: '850px',
            margin: '0 auto 2.5rem',
            width: '100%',
          }}
        >
          {/* CTA 1: ENTER CERCA */}
          <a
            href="https://www.qr4luv.com/register"
            onClick={handleOpenRegistration}
            data-track-action="hero_enter_cerca"
            className="cta-btn-glow"
            style={{
              background: 'linear-gradient(135deg, #ff2a6d 0%, #d946ef 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '14px',
              padding: '16px 32px',
              fontSize: '14.5px',
              fontWeight: 800,
              letterSpacing: '0.05em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 8px 30px rgba(255, 42, 109, 0.4)',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            <QrCode size={18} />
            <span>ENTER CERCA →</span>
          </a>

          {/* CTA 2: CERCA DATING */}
          <a
            href="https://www.qr4luv.com/faces?dating=1"
            data-track-action="hero_cerca_dating"
            className="cta-btn-glow"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 42, 109, 0.2) 0%, rgba(217, 70, 239, 0.16) 100%)',
              border: '1.5px solid rgba(255, 42, 109, 0.55)',
              color: '#ffffff',
              borderRadius: '14px',
              padding: '16px 28px',
              fontSize: '14.5px',
              fontWeight: 800,
              letterSpacing: '0.05em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 6px 25px rgba(255, 42, 109, 0.22)',
              textDecoration: 'none',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Heart size={18} style={{ color: '#ff2a6d' }} />
            <span>CERCA DATING →</span>
          </a>

          {/* CTA 3: SEE WHO'S OUT TONIGHT */}
          <button
            type="button"
            onClick={() => handleOpenRadar(0)}
            data-track-action="hero_see_whos_out_tonight"
            className="cta-btn-glow"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              color: '#ffffff',
              borderRadius: '14px',
              padding: '16px 28px',
              fontSize: '14.5px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            }}
          >
            <Compass size={18} style={{ color: '#05d9e8' }} />
            <span>SEE WHO’S OUT TONIGHT</span>
          </button>
        </div>

        {/* Feature Badges */}
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
                border: '1px solid rgba(255, 255, 255, 0.07)',
                fontSize: '11.5px',
                color: '#9494a0',
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
      {/* MINIMAL DISCRETION FOOTER */}
      {/* ========================================================= */}
      <footer
        style={{
          position: 'relative',
          zIndex: 10,
          paddingBottom: '5vh',
          paddingTop: '2rem',
          textAlign: 'center',
          fontSize: '0.7rem',
          letterSpacing: '0.25em',
          color: 'rgba(148, 148, 160, 0.45)',
          textTransform: 'uppercase',
          width: '100%',
          borderTop: '1px solid rgba(255, 255, 255, 0.04)',
          boxSizing: 'border-box',
        }}
      >
        <p style={{ margin: '0 0 5px' }}>Discretion Guaranteed • 2026</p>
        <p style={{ margin: 0, fontSize: '0.65rem', color: 'rgba(148, 148, 160, 0.3)' }}>
          Powered by Cerca
        </p>
      </footer>

      {/* ========================================================= */}
      {/* INTERACTIVE RADAR MODAL */}
      {/* ========================================================= */}
      {showRadarModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(5, 5, 7, 0.9)',
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
              backgroundColor: '#09090f',
              border: '1px solid rgba(255, 42, 109, 0.35)',
              borderRadius: '22px',
              maxWidth: '560px',
              width: '100%',
              padding: '28px',
              position: 'relative',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 42, 109, 0.2)',
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
                  backgroundColor: 'rgba(255, 42, 109, 0.1)',
                  border: '1px solid rgba(255, 42, 109, 0.3)',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#ff2a6d',
                  marginBottom: '10px',
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ff2a6d' }} />
                <span>● Radar Active Feed</span>
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 900, margin: '0 0 6px', color: '#fff' }}>
                {t.modals.radarTitle}
              </h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#9494a0' }}>
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
                        ? 'rgba(255, 42, 109, 0.22)'
                        : 'rgba(255, 255, 255, 0.03)',
                    border:
                      selectedHubIndex === idx
                        ? '1px solid #ff2a6d'
                        : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    padding: '8px 4px',
                    color: selectedHubIndex === idx ? '#fff' : '#9494a0',
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
                backgroundColor: 'rgba(5, 5, 7, 0.9)',
                border: '1px solid rgba(255, 42, 109, 0.2)',
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
                  border: '1px dashed rgba(255, 42, 109, 0.35)',
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
                    border: '1px solid rgba(5, 217, 232, 0.4)',
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
                      backgroundColor: '#ff2a6d',
                      boxShadow: '0 0 16px #ff2a6d',
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  marginTop: '14px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#ff2a6d',
                }}
              >
                {t.hubs.cards[selectedHubIndex]?.city} • {t.hubs.cards[selectedHubIndex]?.badge}
              </div>
              <div style={{ fontSize: '11.5px', color: '#9494a0', marginTop: '2px' }}>
                {t.hubs.cards[selectedHubIndex]?.vibe}
              </div>
            </div>

            {/* Launch into Cerca Button */}
            <a
              href="https://www.qr4luv.com/register"
              onClick={handleOpenRegistration}
              style={{
                background: 'linear-gradient(135deg, #ff2a6d 0%, #d946ef 100%)',
                color: '#ffffff',
                borderRadius: '12px',
                padding: '13px 20px',
                fontSize: '14px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 8px 24px rgba(255, 42, 109, 0.35)',
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
