import React, { useState } from 'react'
import {
  Globe,
  Compass,
  Check,
  X,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { useGatewayI18n, GATEWAY_LOCALES, type GatewayLocale } from './gatewayI18n'
import { useExitTelemetry } from './hooks/useExitTelemetry'
import { StarfieldTunnelTransition } from './components/StarfieldTunnelTransition'

interface GatewaySurfaceCopy {
  poweredBy: string
  headline: string
  subLine1: string
  subLine2: string
  mapHeaderBadge: string
  mapLiveNearby: string
  mapTapToOpen: string
  youLabel: string
  enterCerca: string
  cercaDating: string
  seeWhosOut: string
  contestCta: string
  badges: [string, string, string, string]
  footer: string
}

const SURFACE_COPY: Record<GatewayLocale, GatewaySurfaceCopy> = {
  en: {
    poweredBy: 'Powered by Cerca',
    headline: 'THE ROOM IS BLIND UNTIL YOU STEP IN.',
    subLine1: 'FREE LIVE VIDEO • GLOBAL CHAT • UNTOLD PLACES',
    subLine2: 'NO VIP WALLS. NO PAPER TRAILS. JUST CHEMISTRY.',
    mapHeaderBadge: 'CERCA FRIEND MAP • LIVE NEARBY',
    mapLiveNearby: 'Live Nearby • 4 Friends Active',
    mapTapToOpen: 'Tap to Open Map ↗',
    youLabel: 'YOU',
    enterCerca: 'ENTER CERCA',
    cercaDating: 'CERCA DATING',
    seeWhosOut: 'SEE WHO’S OUT TONIGHT',
    contestCta: '🎁 Enter to win prizes — Add friends & get free gear!',
    badges: [
      'Zero Phone Numbers Shared',
      'Discretion Guaranteed',
      'Live Proximity Radar',
      '8-Language Real-Time Translation',
    ],
    footer: 'DISCRETION GUARANTEED • 2026 • POWERED BY CERCA',
  },
  es: {
    poweredBy: 'Impulsado por Cerca',
    headline: 'LA SALA ESTÁ CIEGA HASTA QUE ENTRAS.',
    subLine1: 'VIDEO EN VIVO GRATIS • CHAT GLOBAL • LUGARES SECRETOS',
    subLine2: 'SIN MUROS VIP. SIN RASTROS. SOLO QUÍMICA.',
    mapHeaderBadge: 'MAPA DE AMIGOS CERCA • EN VIVO',
    mapLiveNearby: 'En Vivo Cerca • 4 Amigos Activos',
    mapTapToOpen: 'Toca para Abrir el Mapa ↗',
    youLabel: 'TÚ',
    enterCerca: 'ENTRAR A CERCA',
    cercaDating: 'CERCA DATING',
    seeWhosOut: 'MIRA QUIÉN SALIÓ ESTA NOCHE',
    contestCta: '🎁 Entra para ganar premios — ¡Agrega amigos y obtén mercancía gratis!',
    badges: [
      'Cero Números Compartidos',
      'Discreción Garantizada',
      'Radar de Proximidad en Vivo',
      'Traducción en Tiempo Real (8 Idiomas)',
    ],
    footer: 'DISCRECIÓN GARANTIZADA • 2026 • IMPULSADO POR CERCA',
  },
  th: {
    poweredBy: 'ขับเคลื่อนโดย Cerca',
    headline: 'ค่ำคืนนี้ยังเป็นความลับ จนกว่าคุณจะก้าวเข้ามา',
    subLine1: 'วิดีโอสดฟรี • แชททั่วโลก • สถานที่ลับใกล้คุณ',
    subLine2: 'ไม่ต้องแลกเบอร์ • เป็นส่วนตัว • เชื่อมต่อทันที',
    mapHeaderBadge: 'แผนที่เพื่อน CERCA • สดใกล้คุณ',
    mapLiveNearby: 'ออนไลน์ใกล้คุณ • เพื่อน 4 คน',
    mapTapToOpen: 'แตะเพื่อเปิดแผนที่ ↗',
    youLabel: 'คุณ',
    enterCerca: 'เข้าสู่ CERCA',
    cercaDating: 'CERCA เดทติ้ง',
    seeWhosOut: 'ดูว่าใครออกเที่ยวคืนนี้',
    contestCta: '🎁 ลุ้นรับของรางวัล — เพิ่มเพื่อนและรับเสื้อผ้าฟรี!',
    badges: [
      'ไม่ต้องเปิดเผยเบอร์โทรศัพท์',
      'รับประกันความเป็นส่วนตัว',
      'เรดาร์ค้นหาคนใกล้เคียงแบบสด',
      'แปลภาษาอัตโนมัติแบบเรียลไทม์ 8 ภาษา',
    ],
    footer: 'รับประกันความเป็นส่วนตัว • 2026 • ขับเคลื่อนโดย CERCA',
  },
  pt: {
    poweredBy: 'Desenvolvido por Cerca',
    headline: 'A SALA ESTÁ ÀS ESCURAS ATÉ VOCÊ ENTRAR.',
    subLine1: 'VÍDEO AO VIVO GRÁTIS • CHAT GLOBAL • LUGARES SECRETOS',
    subLine2: 'SEM LISTAS VIP. SEM RASTROS. APENAS QUÍMICA.',
    mapHeaderBadge: 'MAPA DE AMIGOS CERCA • AO VIVO PERTO',
    mapLiveNearby: 'Ao Vivo Perto • 4 Amigos Activos',
    mapTapToOpen: 'Toque para Abrir o Mapa ↗',
    youLabel: 'VOCÊ',
    enterCerca: 'ENTRAR NO CERCA',
    cercaDating: 'CERCA DATING',
    seeWhosOut: 'VEJA QUEM SAIU ESTA NOITE',
    contestCta: '🎁 Concorra a prêmios — Adicione amigos e ganhe produtos grátis!',
    badges: [
      'Zero Números de Telefone',
      'Discrição Garantida',
      'Radar de Proximidade ao Vivo',
      'Tradução em Tempo Real em 8 Idiomas',
    ],
    footer: 'DISCRIÇÃO GARANTIDA • 2026 • POWERED BY CERCA',
  },
  fr: {
    poweredBy: 'Propulsé par Cerca',
    headline: 'LA PIÈCE EST AVEUGLE JUSQU’À VOTRE ENTRÉE.',
    subLine1: 'VIDÉO EN DIRECT GRATUITE • CHAT GLOBAL • LIEUX SECRETS',
    subLine2: 'PAS DE MURS VIP. AUCUNE TRACE. JUSTE L’ALCHIMIE.',
    mapHeaderBadge: 'CARTE D’AMIS CERCA • EN DIRECT À PROXIMITÉ',
    mapLiveNearby: 'En Direct • 4 Amis Actifs',
    mapTapToOpen: 'Appuyez pour Ouvrir la Carte ↗',
    youLabel: 'VOUS',
    enterCerca: 'ENTRER DANS CERCA',
    cercaDating: 'CERCA DATING',
    seeWhosOut: 'VOIR QUI SORT CE SOIR',
    contestCta: '🎁 Gagnez des cadeaux — Ajoutez des amis et recevez du merch gratuit !',
    badges: [
      'Aucun Numéro Partagé',
      'Discrétion Garantie',
      'Radar de Proximité en Direct',
      'Traduction Instantanée en 8 Langues',
    ],
    footer: 'DISCRÉTION GARANTIE • 2026 • PROPULSÉ PAR CERCA',
  },
  de: {
    poweredBy: 'Powered by Cerca',
    headline: 'DER RAUM IST BLIND, BIS DU IHN BETRITTST.',
    subLine1: 'KOSTENLOSES LIVE-VIDEO • GLOBALER CHAT • GEHEIME ORTE',
    subLine2: 'KEINE VIP-MAUERN. KEINE SPUREN. NUR CHEMIE.',
    mapHeaderBadge: 'CERCA FREUNDESKARTE • LIVE IN DER NÄHE',
    mapLiveNearby: 'Live in der Nähe • 4 Freunde Aktiv',
    mapTapToOpen: 'Tippen zum Öffnen der Karte ↗',
    youLabel: 'DU',
    enterCerca: 'CERCA BETRETEN',
    cercaDating: 'CERCA DATING',
    seeWhosOut: 'SIEH WER HEUTE NACHT UNTERWEGS IST',
    contestCta: '🎁 Gewinne Preise — Füge Freunde hinzu & sichere dir Gratis-Merch!',
    badges: [
      'Keine Telefonnummern Geteilt',
      'Diskretion Garantiert',
      'Live-Näherungsradar',
      'Echtzeit-Übersetzung in 8 Sprachen',
    ],
    footer: 'DISKRETION GARANTERT • 2026 • POWERED BY CERCA',
  },
  ja: {
    poweredBy: 'Powered by Cerca',
    headline: '足を踏み入れるまで、その部屋は見えない。',
    subLine1: '無料ライブビデオ • グローバルチャット • 秘密のスポット',
    subLine2: 'VIPの壁なし。履歴なし。純粋なケミストリーだけ。',
    mapHeaderBadge: 'CERCA フレンドマップ • 周辺ライブ',
    mapLiveNearby: '周辺でライブ中 • 4人の友達がアクティブ',
    mapTapToOpen: 'タップしてマップを開く ↗',
    youLabel: 'あなた',
    enterCerca: 'CERCAに入る',
    cercaDating: 'CERCA デーティング',
    seeWhosOut: '今夜誰が出かけているか見る',
    contestCta: '🎁 賞品を当てよう — 友達を追加して限定グッズを無料でゲット！',
    badges: [
      '電話番号の共有ゼロ',
      '完全なプライバシー保護',
      'ライブ近接レーダー',
      '8言語リアルタイム翻訳',
    ],
    footer: 'プライバシー保証 • 2026 • POWERED BY CERCA',
  },
  zh: {
    poweredBy: '由 Cerca 驱动',
    headline: '在你踏入之前，房间一片未知。',
    subLine1: '免费实时视频 • 全球聊天 • 隐秘之地',
    subLine2: '无VIP门槛。无痕迹留存。只有纯粹的默契。',
    mapHeaderBadge: 'CERCA 好友地图 • 附近实时动态',
    mapLiveNearby: '附近实时 • 4位好友在线',
    mapTapToOpen: '点击打开地图 ↗',
    youLabel: '你',
    enterCerca: '进入 CERCA',
    cercaDating: 'CERCA 约会',
    seeWhosOut: '看看今晚谁在外面',
    contestCta: '🎁 参与赢取大奖 — 添加好友免费领取官方周边！',
    badges: [
      '零电话号码共享',
      '绝对隐私保障',
      '实时近距雷达',
      '8种语言实时翻译',
    ],
    footer: '绝对隐私保障 • 2026 • POWERED BY CERCA',
  },
}

export function CercaFriendMapPreview({
  onOpenMap,
  locale = 'en',
}: {
  onOpenMap: () => void
  locale?: GatewayLocale
}) {
  const c = SURFACE_COPY[locale] ?? SURFACE_COPY.en
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
          {c.youLabel}
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
          {c.mapHeaderBadge}
        </span>
      </div>

      {/* Subtle Bottom Status Bar */}
      <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between pointer-events-none px-1 text-[9px] font-mono tracking-widest text-slate-400 uppercase">
        <span className="flex items-center gap-1.5 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{c.mapLiveNearby}</span>
        </span>
        <span className="text-slate-300 group-hover:text-white transition-colors bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/10">
          {c.mapTapToOpen}
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
  const copy = SURFACE_COPY[locale] ?? SURFACE_COPY.en

  // Interactive Modal States
  const [showRadarModal, setShowRadarModal] = useState(false)
  const [selectedHubIndex, setSelectedHubIndex] = useState(0)
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)

  // ⚡ Cinematic Starfield Space Warp States ⚡
  const [isWarping, setIsWarping] = useState(false)
  const [warpTargetUrl, setWarpTargetUrl] = useState('https://www.qr4luv.com/faces')
  const [warpDestinationLabel, setWarpDestinationLabel] = useState('ENTERING CERCA SOCIAL')

  const triggerWarpEntrance = (
    targetUrl: string,
    destinationLabel = 'ENTERING CERCA SOCIAL'
  ) => {
    if (isWarping) return
    setWarpTargetUrl(targetUrl)
    setWarpDestinationLabel(destinationLabel)
    setIsWarping(true)
  }

  const handleOpenRadar = (hubIdx: number = 0) => {
    setSelectedHubIndex(hubIdx)
    setShowRadarModal(true)
    recordInteraction(`open_radar_hub_${hubIdx}`)
  }

  const handleOpenRegistration = () => {
    recordInteraction('enter_cerca')
    triggerWarpEntrance('https://www.qr4luv.com/faces?concierge=1', 'ENTERING CERCA SOCIAL')
  }

  const handleOpenDating = () => {
    recordInteraction('enter_cerca_dating')
    triggerWarpEntrance('https://www.qr4luv.com/faces?dating=1', 'CERCA DATING • VERIFIED ACCESS')
  }

  const handleMapCardClick = () => {
    recordInteraction('map_card_teleport')
    triggerWarpEntrance('https://www.qr4luv.com/faces?market=nearby', 'NEARBY PROXIMITY MAP')
  }

  const handleContestClick = () => {
    recordInteraction('contest_cta')
    triggerWarpEntrance(
      `https://www.qr4luv.com/contest?lang=${locale}`,
      "WHO'S POPULAR CONTEST"
    )
  }

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-100 flex flex-col justify-between items-center px-6 py-8 relative overflow-hidden selection:bg-rose-500/30 font-sans">
      {/* Ambient Atmospheric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-gradient-to-tr from-rose-600/15 via-purple-600/10 to-cyan-500/5 rounded-full blur-[150px] pointer-events-none animate-pulse" />

      {/* Top Header — Minimalist & Weightless */}
      <header className="relative z-50 w-full max-w-4xl flex justify-between items-center">
        <div
          className="cursor-pointer group"
          onClick={() => {
            recordInteraction('header_cerca')
            triggerWarpEntrance('https://www.qr4luv.com/faces', 'SCANQR GLOBAL • CERCA')
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
            {copy.poweredBy}
          </p>
        </div>

        {/* Working Language Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            aria-expanded={langDropdownOpen}
            className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
          >
            <Globe className="w-3.5 h-3.5 text-rose-400" />
            <span className="tracking-widest uppercase font-medium">
              {GATEWAY_LOCALES.find((l) => l.code === locale)?.label ?? locale.toUpperCase()} ▾
            </span>
          </button>

          {langDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setLangDropdownOpen(false)}
              />
              <div className="absolute top-full right-0 mt-2 bg-[#0a0a0f] border border-rose-500/30 rounded-xl p-1.5 z-50 min-w-[160px] shadow-2xl">
                {GATEWAY_LOCALES.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => {
                      setLocale(l.code)
                      setLangDropdownOpen(false)
                      recordInteraction(`switch_locale_${l.code}`)
                    }}
                    className={`w-full px-3 py-2 text-left text-xs rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                      locale === l.code
                        ? 'bg-rose-500/20 text-white font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{l.label}</span>
                    {locale === l.code && <Check size={12} className="text-rose-400" />}
                  </button>
                ))}
              </div>
            </>
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
          {copy.headline}
        </h2>

        {/* Vertical Label Stack */}
        <div className="space-y-2 text-xs md:text-sm uppercase tracking-[0.3em] text-slate-400 font-light mb-8">
          <p className="text-slate-200 font-medium tracking-[0.35em]">
            {copy.subLine1}
          </p>
          <p className="text-slate-500 tracking-[0.3em]">
            {copy.subLine2}
          </p>
        </div>

        {/* Static Cerca Friend Map Preview Card (Tapping triggers Starfield Space Warp) */}
        <CercaFriendMapPreview onOpenMap={handleMapCardClick} locale={locale} />

        {/* Clean, Velvet-Rope Entry Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mb-6">
          <button
            type="button"
            onClick={handleOpenRegistration}
            className="w-full sm:w-auto flex-1 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-medium py-3 px-6 rounded-full shadow-[0_0_25px_rgba(255,42,109,0.3)] hover:scale-[1.02] transition-all flex items-center justify-center space-x-2 text-xs tracking-[0.25em] uppercase cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-rose-200" />
            <span>{copy.enterCerca}</span>
          </button>

          <button
            type="button"
            onClick={handleOpenDating}
            className="w-full sm:w-auto flex-1 bg-transparent hover:bg-white/5 border border-white/20 text-white font-medium py-3 px-6 rounded-full hover:scale-[1.02] transition-all flex items-center justify-center space-x-2 text-xs tracking-[0.25em] uppercase cursor-pointer"
          >
            <span className="text-rose-400">♥</span>
            <span>{copy.cercaDating}</span>
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
          <span>{copy.seeWhosOut}</span>
        </button>

        {/* Contest Link */}
        <button
          type="button"
          onClick={handleContestClick}
          className="mt-3 text-xs font-semibold tracking-wide text-pink-400 hover:text-pink-300 animate-pulse transition-colors bg-transparent border-none cursor-pointer"
        >
          {copy.contestCta}
        </button>

        {/* Minimal Discretion Badges */}
        <div className="flex flex-wrap justify-center items-center gap-2 max-w-lg mt-6">
          {copy.badges.map((text, idx) => (
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
        {copy.footer}
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

            {/* Launch into Cerca Button with Starfield Space Warp */}
            <button
              type="button"
              onClick={() => {
                setShowRadarModal(false)
                const hubCity = t.hubs.cards[selectedHubIndex]?.city || ''
                triggerWarpEntrance(
                  `https://www.qr4luv.com/faces?hub=${encodeURIComponent(hubCity)}`,
                  `LAUNCHING ${hubCity.toUpperCase() || 'CERCA'}`
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

      {/* ⚡ CINEMATIC FULL-SCREEN STARFIELD TUNNEL TRANSITION ("LOVE", "CLUBS", "LIVE CHAT") ⚡ */}
      <StarfieldTunnelTransition
        active={isWarping}
        targetUrl={warpTargetUrl}
        destinationLabel={warpDestinationLabel}
        onComplete={() => setIsWarping(false)}
      />
    </div>
  )
}

export default ScanQRGlobalHomeRoute
