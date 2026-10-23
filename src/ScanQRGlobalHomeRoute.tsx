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

export function CercaFriendMapPreview({ onOpenMap }: { onOpenMap: () => void }) {
  return (
    <div
      onClick={onOpenMap}
      className="w-full max-w-lg aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden mb-8 shadow-[0_0_50px_rgba(255,42,109,0.18)] relative group border border-white/10 bg-[#06060c] cursor-pointer transition-all duration-300 hover:border-rose-500/40 hover:shadow-[0_0_70px_rgba(255,42,109,0.28)]"
    >
      {/* SVG Dark Obsidian Map Background & Subtle Grid Lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="friendMapGrid" width="46" height="46" patternUnits="userSpaceOnUse">
            <path d="M 46 0 L 0 0 0 46" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#friendMapGrid)" />

        {/* Subtle Map Roads & Transit Routes */}
        <path
          d="M -30 200 C 110 160, 250 250, 560 170"
          fill="none"
          stroke="rgba(255, 42, 109, 0.14)"
          strokeWidth="2"
        />
        <path
          d="M 150 -20 C 190 120, 170 240, 270 420"
          fill="none"
          stroke="rgba(5, 217, 232, 0.14)"
          strokeWidth="2"
        />
        <path
          d="M 370 -20 C 330 130, 410 230, 470 380"
          fill="none"
          stroke="rgba(255, 255, 255, 0.06)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
      </svg>

      {/* Subtle Proximity Range Rings Centered on You */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[30%] aspect-square rounded-full border border-white/5" />
        <div className="absolute w-[60%] aspect-square rounded-full border border-dashed border-white/5" />
        <div className="absolute w-[88%] aspect-square rounded-full border border-white/5" />
      </div>

      {/* Center "YOU" Marker */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none">
        <span className="relative flex h-3.5 w-3.5 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300 shadow-[0_0_10px_#06b6d4]" />
        </span>
        <span className="text-[7.5px] font-bold tracking-widest text-cyan-300 uppercase mt-0.5 bg-black/70 px-1.5 py-0.2 rounded border border-cyan-500/30">
          YOU
        </span>
      </div>

      {/* Glowing Circular User Avatar Pins */}

      {/* 1. Sofia Delgado */}
      <div className="absolute top-[24%] left-[64%] z-10 group/avatar">
        <div className="relative flex items-center gap-2">
          <div className="relative w-11 h-11 rounded-full p-0.5 border-2 border-rose-500 shadow-[0_0_18px_rgba(255,42,109,0.55)] bg-slate-900 group-hover/avatar:scale-110 transition-transform">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
              alt="Sofia"
              className="w-full h-full rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black shadow-[0_0_6px_#34d399]" />
          </div>
          <div className="bg-[#0b0b14]/90 border border-rose-500/40 rounded-full px-2.5 py-0.5 text-[9px] font-semibold text-rose-200 tracking-wider shadow-md backdrop-blur-sm whitespace-nowrap">
            Sofia • 0.2 mi
          </div>
        </div>
      </div>

      {/* 2. Julian Chen */}
      <div className="absolute top-[60%] left-[20%] z-10 group/avatar">
        <div className="relative flex items-center gap-2">
          <div className="relative w-11 h-11 rounded-full p-0.5 border-2 border-cyan-400 shadow-[0_0_18px_rgba(5,217,232,0.5)] bg-slate-900 group-hover/avatar:scale-110 transition-transform">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
              alt="Julian"
              className="w-full h-full rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black shadow-[0_0_6px_#34d399]" />
          </div>
          <div className="bg-[#0b0b14]/90 border border-cyan-500/40 rounded-full px-2.5 py-0.5 text-[9px] font-semibold text-cyan-200 tracking-wider shadow-md backdrop-blur-sm whitespace-nowrap">
            Julian • 0.5 mi
          </div>
        </div>
      </div>

      {/* 3. Elena Vance */}
      <div className="absolute top-[28%] left-[24%] z-10 group/avatar">
        <div className="relative flex items-center gap-2">
          <div className="relative w-10 h-10 rounded-full p-0.5 border-2 border-purple-400 shadow-[0_0_16px_rgba(168,85,247,0.5)] bg-slate-900 group-hover/avatar:scale-110 transition-transform">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80"
              alt="Elena"
              className="w-full h-full rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-black shadow-[0_0_6px_#34d399]" />
          </div>
          <div className="bg-[#0b0b14]/90 border border-purple-500/40 rounded-full px-2.5 py-0.5 text-[8.5px] font-semibold text-purple-200 tracking-wider shadow-sm backdrop-blur-sm whitespace-nowrap">
            Elena • 0.4 mi
          </div>
        </div>
      </div>

      {/* 4. Travis Sterling */}
      <div className="absolute top-[65%] left-[66%] z-10 group/avatar">
        <div className="relative flex items-center gap-2">
          <div className="relative w-10 h-10 rounded-full p-0.5 border-2 border-amber-400 shadow-[0_0_16px_rgba(245,158,11,0.5)] bg-slate-900 group-hover/avatar:scale-110 transition-transform">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80"
              alt="Travis"
              className="w-full h-full rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-black shadow-[0_0_6px_#34d399]" />
          </div>
          <div className="bg-[#0b0b14]/90 border border-amber-500/40 rounded-full px-2.5 py-0.5 text-[8.5px] font-semibold text-amber-200 tracking-wider shadow-sm backdrop-blur-sm whitespace-nowrap">
            Travis • 0.7 mi
          </div>
        </div>
      </div>

      {/* Required Clean Label at the Top: "CERCA FRIEND MAP • LIVE NEARBY" */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#05050ab8] backdrop-blur-md border border-white/15 shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#34d399]" />
        </span>
        <span className="text-[9px] sm:text-[10.5px] font-bold tracking-[0.22em] text-slate-200 uppercase">
          CERCA FRIEND MAP • LIVE NEARBY
        </span>
      </div>

      {/* Subtle Bottom Status Bar */}
      <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between pointer-events-none px-1 text-[9px] font-mono tracking-widest text-slate-400 uppercase">
        <span className="flex items-center gap-1.5 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live Nearby • 4 Friends Active</span>
        </span>
        <span className="text-slate-300 group-hover:text-white transition-colors bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/10">
          Tap to Open Map ↗
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

  // Interactive Modal & Teleport States
  const [showRadarModal, setShowRadarModal] = useState(false)
  const [selectedHubIndex, setSelectedHubIndex] = useState(0)
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)

  // ⚡ Spin Entrance Teleport States ⚡
  const [isWarping, setIsWarping] = useState(false)
  const [warpInfo, setWarpInfo] = useState({
    title: 'ENTERING CERCA',
    subtitle: 'Connecting to Live Proximity',
    icon: '⚡',
  })

  const triggerWarpEntrance = (
    targetUrl: string,
    title = 'ENTERING CERCA',
    subtitle = 'Connecting to Live Proximity',
    icon = '⚡'
  ) => {
    if (isWarping) return
    setWarpInfo({ title, subtitle, icon })
    setIsWarping(true)
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.location.href = targetUrl
      }
    }, 800)
  }

  const handleOpenRadar = (hubIdx: number = 0) => {
    setSelectedHubIndex(hubIdx)
    setShowRadarModal(true)
    recordInteraction(`open_radar_hub_${hubIdx}`)
  }

  const handleOpenRegistration = () => {
    recordInteraction('enter_cerca')
    triggerWarpEntrance('https://www.qr4luv.com/register', 'ENTERING CERCA', 'Free Live Video & Proximity', '✨')
  }

  const handleOpenDating = () => {
    recordInteraction('enter_cerca_dating')
    triggerWarpEntrance('https://www.qr4luv.com/faces?dating=1', 'CERCA DATING', 'Verified 1-Click Access', '💖')
  }

  const handleMapCardClick = () => {
    recordInteraction('map_card_teleport')
    triggerWarpEntrance('https://www.qr4luv.com/faces?market=nearby', 'NEARBY PROXIMITY', 'Opening Live Friend Radar', '🗺️')
  }

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-100 flex flex-col justify-between items-center px-6 py-8 relative overflow-hidden selection:bg-rose-500/30 font-sans">
      {/* Keyframe Styles for Ambient Glow & Spin Entrance Portal */}
      <style>{`
        @keyframes warpSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(1080deg); }
        }
        @keyframes warpPulse {
          0%, 100% { opacity: 0.75; transform: scale(0.98); }
          50% { opacity: 1; transform: scale(1.04); }
        }
        @keyframes warpExpandIris {
          0% {
            transform: scale(0.06);
            opacity: 0.2;
            filter: blur(8px);
          }
          25% {
            transform: scale(0.45);
            opacity: 1;
            filter: blur(0px);
          }
          70% {
            transform: scale(1.35);
            opacity: 1;
            filter: blur(1px);
          }
          100% {
            transform: scale(4.4);
            opacity: 1;
            filter: blur(16px);
          }
        }
      `}</style>

      {/* Ambient Atmospheric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-gradient-to-tr from-rose-600/15 via-purple-600/10 to-cyan-500/5 rounded-full blur-[150px] pointer-events-none animate-pulse" />

      {/* Top Header — Minimalist & Weightless */}
      <header className="relative z-10 w-full max-w-4xl flex justify-between items-center">
        <div
          className="cursor-pointer group"
          onClick={() => {
            recordInteraction('header_cerca')
            triggerWarpEntrance('https://qr4luv.com', 'SCANQR GLOBAL', 'Powered by Cerca', '🌐')
          }}
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

        {/* Static Cerca Friend Map Preview Card (Tapping triggers warp entrance) */}
        <CercaFriendMapPreview onOpenMap={handleMapCardClick} />

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

            {/* Launch into Cerca Button with Spin Entrance */}
            <button
              type="button"
              onClick={() => {
                setShowRadarModal(false)
                triggerWarpEntrance(
                  'https://www.qr4luv.com/register',
                  `LAUNCHING ${t.hubs.cards[selectedHubIndex]?.city?.toUpperCase() || 'CERCA'}`,
                  'Live Proximity Nightlife',
                  '⚡'
                )
              }}
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
                border: 'none',
                cursor: 'pointer',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <span>{t.modals.radarLaunchButton}</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ⚡ RADAR CENTER-EXPANSION TELEPORT SPIN ENTRANCE PORTAL OVERLAY ⚡ */}
      {isWarping && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            backgroundColor: 'rgba(5, 5, 12, 0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            pointerEvents: 'all',
          }}
        >
          {/* Center Expanding & Spinning Radar Core */}
          <div
            style={{
              position: 'relative',
              width: 380,
              height: 380,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'warpExpandIris 820ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
              transformOrigin: 'center center',
            }}
          >
            {/* Spinning Outer Radar Sweep Cones */}
            <div
              style={{
                position: 'absolute',
                inset: -40,
                borderRadius: '50%',
                background:
                  'conic-gradient(from 0deg, transparent 0deg, rgba(244, 63, 94, 0.8) 180deg, rgba(217, 70, 239, 0.9) 270deg, #38bdf8 360deg)',
                animation: 'warpSpin 750ms linear infinite',
                filter: 'drop-shadow(0 0 50px rgba(217, 70, 239, 0.9))',
                opacity: 0.9,
              }}
            />

            {/* Glowing Secondary Counter-Spinning Reticle */}
            <div
              style={{
                position: 'absolute',
                inset: -20,
                borderRadius: '50%',
                border: '3px dashed #38bdf8',
                animation: 'warpSpin 550ms linear infinite reverse',
                boxShadow: '0 0 40px rgba(56, 189, 248, 0.8), inset 0 0 30px rgba(244, 63, 94, 0.6)',
              }}
            />

            {/* Glowing Target Badge in Center */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                width: 250,
                height: 250,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(244, 63, 94, 0.4) 0%, rgba(217, 70, 239, 0.3) 40%, #080816 85%)',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                boxShadow: '0 0 60px rgba(236, 72, 153, 0.95), inset 0 0 40px rgba(56, 189, 248, 0.7)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '20px',
                animation: 'warpPulse 600ms ease-in-out infinite',
              }}
            >
              <div
                style={{
                  fontSize: 44,
                  marginBottom: 6,
                  filter: 'drop-shadow(0 0 16px rgba(255,255,255,0.9))',
                }}
              >
                {warpInfo.icon}
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 900,
                  letterSpacing: '0.12em',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  textShadow: '0 0 15px rgba(56, 189, 248, 0.9)',
                }}
              >
                {warpInfo.title}
              </div>
              <div
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: '#f0abfc',
                  marginTop: 4,
                  textShadow: '0 0 10px rgba(217, 70, 239, 0.8)',
                }}
              >
                {warpInfo.subtitle}
              </div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: '#93c5fd',
                  marginTop: 8,
                  padding: '3px 10px',
                  borderRadius: 999,
                  background: 'rgba(56, 189, 248, 0.2)',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>Entering Cerca Social</span>
                <span
                  style={{
                    display: 'inline-block',
                    animation: 'warpSpin 400ms linear infinite',
                  }}
                >
                  ⚡
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ScanQRGlobalHomeRoute
