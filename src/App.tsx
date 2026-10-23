import React, { useState } from 'react'
import {
  Globe,
  Compass,
  Check,
  X,
  ChevronRight,
  Sparkles,
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
    recordInteraction('enter_cerca')
    const registerUrl = 'https://www.qr4luv.com/register'
    if (typeof window !== 'undefined') {
      window.location.href = registerUrl
    }
  }

  const handleOpenDating = () => {
    recordInteraction('enter_cerca_dating')
    const datingUrl = 'https://www.qr4luv.com/faces?dating=1'
    if (typeof window !== 'undefined') {
      window.location.href = datingUrl
    }
  }

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-100 flex flex-col justify-between items-center px-6 py-8 relative overflow-hidden selection:bg-rose-500/30 font-sans">
      {/* Ambient Atmospheric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-gradient-to-tr from-rose-600/15 via-purple-600/10 to-cyan-500/5 rounded-full blur-[150px] pointer-events-none animate-pulse" />

      {/* Top Header — Minimalist & Weightless */}
      <header className="relative z-10 w-full max-w-4xl flex justify-between items-center">
        <div
          className="cursor-pointer group"
          onClick={handleOpenRegistration}
          style={{ textDecoration: 'none' }}
        >
          <h1
            style={{ fontFamily: "'Cinzel', serif" }}
            className="text-xl md:text-2xl tracking-[0.35em] font-bold text-white group-hover:text-rose-400 transition-colors"
          >
            SCANQR GLOBAL
          </h1>
          <p className="text-[9px] uppercase tracking-[0.3em] text-slate-500 mt-0.5">
            Powered by Cerca
          </p>
        </div>

        {/* Working Language Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
          >
            <Globe className="w-3.5 h-3.5 text-rose-400" />
            <span className="tracking-widest uppercase font-medium">{locale} ▾</span>
          </button>

          {langDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 bg-[#0a0a0f] border border-rose-500/30 rounded-xl p-1.5 z-50 min-w-[130px] shadow-2xl">
              {GATEWAY_LOCALES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => {
                    setLocale(l.code)
                    setLangDropdownOpen(false)
                  }}
                  className={`w-full px-3 py-1.5 text-left text-xs rounded-lg flex items-center justify-between ${
                    locale === l.code
                      ? 'bg-rose-500/20 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{l.label}</span>
                  {locale === l.code && <Check size={12} className="text-rose-400" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Center Stage — Pure Vertical Typography, No Boxes, No Cards */}
      <main className="relative z-10 flex flex-col items-center text-center max-w-3xl my-auto">
        {/* Immersive Cinematic Headline */}
        <h2
          style={{ fontFamily: "'Cinzel', serif" }}
          className="text-3xl md:text-5xl font-normal tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-rose-300 leading-tight mb-6"
        >
          THE ROOM IS BLIND UNTIL YOU STEP IN.
        </h2>

        {/* Vertical Label Stack */}
        <div className="space-y-2 text-xs md:text-sm uppercase tracking-[0.3em] text-slate-400 font-light mb-8">
          <p className="text-slate-200 font-medium tracking-[0.35em]">
            FREE LIVE VIDEO • GLOBAL CHAT • UNTOLD PLACES
          </p>
          <p className="text-slate-500 tracking-[0.3em]">
            NO VIP WALLS. NO PAPER TRAILS. JUST CHEMISTRY.
          </p>
        </div>

        {/* Cinematic Centerpiece Image (Borderless, Floating Glass Glow) */}
        <div className="w-full max-w-md aspect-video rounded-2xl overflow-hidden mb-8 shadow-[0_0_50px_rgba(255,42,109,0.15)] relative group border border-white/10 bg-slate-950">
          <img
            src="https://lh3.googleusercontent.com/rd-gg-dl/AHiVA1m1OsiPeRQmjTgWwv4045bqGdQQG2-qfFjcQdbTaJ4l4EpbD0J4EEhy7OGaOnUWWuBm6KUiOBfoKLFXHuOir6Axu0XTGwXhUf0tkA_xV40KEHWx-3gUSijQtCJ7_ney5eBredLpjEUE98404NSw0VjMN_W1ZczT9yrMFnL3jdpZwqqqBjEhZfmR67xHclhEs96RJ8sJLGlLICHAe6B0RnIHjKW75sahE5UjQLAFe22uxZZSnjNFYsfCeAtn6WLMtgYiy7SjnzEVqf1IkC1JyyAXAdONeYfc3QKphgzr65elcmj3Cc6MZXHzCLj4sgPTC7SRYiLVXyTDY6EsGwCIYsgHQK2Ki8l5_wozKujaZiHGdG6wG0Ya0FEvyvZDT14rujkwLP6IS4S1-YnJYiaaeSaKdGPJxQnCG72EjZeQu--ekfUcqesQE_RdMXNN0nGTv-pLh3DEJNw_O8IZEbHalR8ktsG26NnK9SCF6St9TXWvrzzD0RewORf4cOSRldE2S58JjqkzVPrATSxp6eSP5nBVPp9XkcWhGaJ7J2vu0Iqp_wtfyBZRUr5sZOdLuXhL0pYlEkxdxEupSSsVjbZZ8_XIMF8QabxKMdQrjS59UmCRdQZUDGfCiarSYMV_KvYrwoLHL_5t_CuBOdOVPuoE52bOBOL0Jr0CREkuI9v_FRSrX-Wg6BLTq1jPfo2y6xiH_NgPBcqxGMzwIwrNwWI7J5Qky1oW27l6EGlLTpdP5jlOek1kyapMEb2BIZILzaAREgke_k53nEIEVTNRAiy1hmNs5PqkNN_qQXzmiO24ctIW6z_6ssZ9z8yvLtS7SAttd4lbWRFP27sW3r8kvOnSNJa7Gju2c2TXjmsS3kXzwDBmGSokXVCPqGvtWpfdzPpFuV4IYTo3Ey28nJGBp39kquSAiijBgEaB38RhuonA_DonTmwB29h88BrBJahLTgCDuY_43__uqNzasK7ef2yg_zKc8KhDg8ScrhdDm5v1N_Zgs7CEoYMg4SAcYjGieo3K1bIEoCpZI8rUqLj1WMS7RGlCHmbQ2oB1MoUbGJel6NXSG6Lfmmquzb5cWMXPuMANoYUHQZm1ecz-yA3RecOUlaewecu5_l_lz8U1DE3rph4eMb7_IjwnI2A6mTh7unwxR3ra0PsEWapIHj8aHp1bBJfKdkSKGrsfmnwPrZQZY14DckOOUcJBfOpBsFzKhwAPxrVQBj8Eczq29nzr9fiYBL_E3FPhTLkXU0oKvMxk6TJZgbQdLDAEMN7w1onBYLCkAdN3zxXqIU2vxYWJG_ebKqHqJWwHgW-HtNj4rEo4WQ=s1024-rj"
            alt="The Blind Room"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>

        {/* Clean, Velvet-Rope Entry Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mb-6">
          <button
            type="button"
            onClick={handleOpenRegistration}
            className="w-full sm:w-auto flex-1 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-medium py-3 px-6 rounded-full shadow-[0_0_25px_rgba(255,42,109,0.3)] hover:scale-[1.02] transition-all flex items-center justify-center space-x-2 text-xs tracking-[0.25em] uppercase cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-rose-200" />
            <span>ENTER CERCA</span>
          </button>

          <button
            type="button"
            onClick={handleOpenDating}
            className="w-full sm:w-auto flex-1 bg-transparent hover:bg-white/5 border border-white/20 text-white font-medium py-3 px-6 rounded-full hover:scale-[1.02] transition-all flex items-center justify-center space-x-2 text-xs tracking-[0.25em] uppercase cursor-pointer"
          >
            <span className="text-rose-400">♥</span>
            <span>CERCA DATING</span>
          </button>
        </div>

        {/* Secondary Proximity Trigger */}
        <button
          type="button"
          onClick={() => handleOpenRadar(0)}
          className="text-[11px] uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-colors flex items-center space-x-2 cursor-pointer pb-2"
        >
          <Compass
            className="w-3.5 h-3.5 text-cyan-400 animate-spin"
            style={{ animationDuration: '12s' }}
          />
          <span>SEE WHO’S OUT TONIGHT</span>
        </button>

        {/* Minimal Discretion Badges */}
        <div className="flex flex-wrap justify-center items-center gap-2 max-w-lg mt-6">
          {[
            'Zero Phone Numbers Shared',
            'Discretion Guaranteed',
            'Live Proximity Radar',
            '8-Language Real-Time Translation',
          ].map((text, idx) => (
            <span
              key={idx}
              className="text-[10px] tracking-wider uppercase text-slate-500 px-3 py-1 rounded-full border border-white/5 bg-white/[0.02]"
            >
              {text}
            </span>
          ))}
        </div>
      </main>

      {/* Subtle Bottom Discretion Footer */}
      <footer className="relative z-10 text-center text-[9px] tracking-[0.35em] text-slate-600 uppercase pt-6">
        DISCRETION GUARANTEED • 2026 • POWERED BY CERCA
      </footer>

      {/* Interactive Radar Scanner Modal */}
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
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#ff2a6d',
                  }}
                />
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
