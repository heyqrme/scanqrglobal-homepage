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

export function CercaProximityRadarPreview({ onOpenRadar }: { onOpenRadar: () => void }) {
  return (
    <div
      onClick={onOpenRadar}
      className="w-full max-w-lg aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden mb-8 shadow-[0_0_60px_rgba(255,42,109,0.22)] relative group border border-rose-500/30 bg-[#06060c] cursor-pointer transition-all duration-300 hover:border-rose-400/60 hover:shadow-[0_0_75px_rgba(255,42,109,0.35)]"
    >
      <style>{`
        @keyframes radarSweepAnim {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* SVG Map Grid Aesthetic */}
      <svg
        className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="radarGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#radarGrid)" />
        {/* Subtle Map Roads & Contours */}
        <path
          d="M -20 180 Q 140 160 260 210 T 540 180"
          fill="none"
          stroke="rgba(5, 217, 232, 0.15)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M 120 -20 Q 180 120 220 260 T 310 400"
          fill="none"
          stroke="rgba(255, 42, 109, 0.12)"
          strokeWidth="1.5"
        />
        <path
          d="M 380 -20 Q 340 140 410 280"
          fill="none"
          stroke="rgba(255, 255, 255, 0.07)"
          strokeWidth="1.2"
        />
      </svg>

      {/* Radar Concentric Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Ring 1 - 28% */}
        <div className="w-[28%] aspect-square rounded-full border border-rose-500/20" />
        {/* Ring 2 - 56% */}
        <div className="absolute w-[56%] aspect-square rounded-full border border-dashed border-rose-500/25" />
        {/* Ring 3 - 86% */}
        <div className="absolute w-[86%] aspect-square rounded-full border border-rose-500/15" />
        {/* Crosshairs */}
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-rose-500/20 to-transparent" />
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-rose-500/20 to-transparent" />
      </div>

      {/* Rotating Radar Sweep Line & Cone */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, rgba(255, 42, 109, 0.04) 310deg, rgba(255, 42, 109, 0.28) 360deg)',
          animation: 'radarSweepAnim 5s linear infinite',
        }}
      />

      {/* Glowing Radial Pulsing Points (Nearby Hotspots & People) */}
      
      {/* 1. Center / You Node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
        <span className="relative flex h-4 w-4 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-300 shadow-[0_0_12px_#06b6d4]" />
        </span>
        <span className="text-[8px] font-black tracking-widest text-cyan-300 uppercase mt-0.5 bg-black/60 px-1 rounded">
          YOU
        </span>
      </div>

      {/* 2. Hotspot 1: Sing Sing Speakeasy */}
      <div className="absolute top-[28%] left-[66%] z-10">
        <div className="relative flex items-center gap-1.5">
          <span className="relative flex h-3 w-3 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-80" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500 shadow-[0_0_10px_#ff2a6d]" />
          </span>
          <div className="bg-[#0b0b14]/90 border border-rose-500/40 rounded-full px-2 py-0.5 text-[8.5px] font-bold text-rose-200 tracking-wider shadow-md backdrop-blur-sm whitespace-nowrap">
            🔥 Sing Sing • 0.3 mi
          </div>
        </div>
      </div>

      {/* 3. Hotspot 2: Beam Underground */}
      <div className="absolute top-[64%] left-[24%] z-10">
        <div className="relative flex items-center gap-1.5">
          <span className="relative flex h-3 w-3 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400 shadow-[0_0_10px_#a855f7]" />
          </span>
          <div className="bg-[#0b0b14]/90 border border-purple-500/40 rounded-full px-2 py-0.5 text-[8.5px] font-bold text-purple-200 tracking-wider shadow-md backdrop-blur-sm whitespace-nowrap">
            🎧 Beam Club • 0.6 mi
          </div>
        </div>
      </div>

      {/* 4. Hotspot 3: Sky VIP Lounge */}
      <div className="absolute top-[22%] left-[30%] z-10">
        <div className="relative flex items-center gap-1.5">
          <span className="relative flex h-2.5 w-2.5 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-300 shadow-[0_0_8px_#06b6d4]" />
          </span>
          <div className="bg-[#0b0b14]/90 border border-cyan-500/30 rounded-full px-1.5 py-0.5 text-[8px] font-semibold text-cyan-200 tracking-wider shadow-sm backdrop-blur-sm whitespace-nowrap">
            🍸 Sky Lounge
          </div>
        </div>
      </div>

      {/* 5. Hotspot 4: Secret Patio */}
      <div className="absolute top-[72%] left-[70%] z-10">
        <div className="relative flex items-center gap-1.5">
          <span className="relative flex h-2.5 w-2.5 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
          </span>
          <div className="bg-[#0b0b14]/90 border border-amber-500/30 rounded-full px-1.5 py-0.5 text-[8px] font-semibold text-amber-200 tracking-wider shadow-sm backdrop-blur-sm whitespace-nowrap">
            ✨ Secret Patio • 0.9 mi
          </div>
        </div>
      </div>

      {/* Primary Label Overlay Required: "CERCA PROXIMITY RADAR • LIVE NEARBY" */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#05050ab8] backdrop-blur-md border border-rose-500/40 shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-80" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500 shadow-[0_0_8px_#ff2a6d]" />
        </span>
        <span className="text-[9px] sm:text-[10.5px] font-bold tracking-[0.22em] text-rose-200 uppercase">
          CERCA PROXIMITY RADAR • LIVE NEARBY
        </span>
      </div>

      {/* Subtle Bottom Status Bar */}
      <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between pointer-events-none px-1 text-[9px] font-mono tracking-widest text-slate-400 uppercase">
        <span className="flex items-center gap-1.5 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active Scanner • 142 in Range</span>
        </span>
        <span className="text-rose-400 group-hover:text-rose-300 transition-colors bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm border border-rose-500/20">
          Tap to Open Radar ↗
        </span>
      </div>

      {/* Vignette Edge Shading */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-transparent to-[#05050A]/40 opacity-70 pointer-events-none" />
    </div>
  )
}

export function ScanQRGlobalHomeRoute() {
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

        {/* Dynamic Cerca Proximity Radar Preview Component */}
        <CercaProximityRadarPreview onOpenRadar={() => handleOpenRadar(0)} />

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

export default ScanQRGlobalHomeRoute
