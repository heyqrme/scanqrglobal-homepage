import { useEffect, useRef, useState } from 'react'

export interface StarfieldTransitionProps {
  active: boolean
  targetUrl: string
  locale?: string
  onComplete?: () => void
  destinationLabel?: string
}

interface Star {
  x: number
  y: number
  z: number
  pz: number
  color: string
}

interface LocalizedWarpCopy {
  words: [
    { word: string; sub: string },
    { word: string; sub: string },
    { word: string; sub: string },
  ]
  defaultDest: string
  mapDest: string
  datingDest: string
  contestDest: string
  launchingPrefix: string
  skip: string
}

const WARP_COPY: Record<string, LocalizedWarpCopy> = {
  en: {
    words: [
      { word: 'LOVE', sub: 'Proximity & Chemistry' },
      { word: 'CLUBS', sub: 'Live Nightlife & Secret Places' },
      { word: 'LIVE CHAT', sub: 'Zero Phone Numbers • Instant Knock' },
    ],
    defaultDest: 'ENTERING CERCA SOCIAL',
    mapDest: 'NEARBY PROXIMITY MAP',
    datingDest: 'CERCA DATING • VERIFIED ACCESS',
    contestDest: "WHO'S POPULAR CONTEST",
    launchingPrefix: 'LAUNCHING',
    skip: 'Skip ↗',
  },
  th: {
    words: [
      { word: 'ความรัก', sub: 'เคมีที่ตรงกัน • คนใกล้ตัวคุณ' },
      { word: 'คลับ & บาร์', sub: 'ไนท์ไลฟ์สดและสถานที่ลับ' },
      { word: 'แชทสด', sub: 'ไม่ต้องใช้เบอร์ • ทักทายทันที' },
    ],
    defaultDest: 'กำลังเข้าสู่ CERCA SOCIAL',
    mapDest: 'แผนที่เรดาร์คนใกล้คุณ',
    datingDest: 'CERCA เดทติ้ง • เชื่อมต่อทันที',
    contestDest: "การแข่งขัน WHO'S POPULAR",
    launchingPrefix: 'กำลังเปิด',
    skip: 'ข้าม ↗',
  },
  es: {
    words: [
      { word: 'AMOR', sub: 'Proximidad y Química' },
      { word: 'CLUBS', sub: 'Rumba en Vivo y Lugares Secretos' },
      { word: 'CHAT EN VIVO', sub: 'Cero Números • Toque Instantáneo' },
    ],
    defaultDest: 'ENTRANDO A CERCA SOCIAL',
    mapDest: 'MAPA DE PROXIMIDAD EN VIVO',
    datingDest: 'CERCA DATING • ACCESO VERIFICADO',
    contestDest: "CONCURSO WHO'S POPULAR",
    launchingPrefix: 'ENTRANDO A',
    skip: 'Saltar ↗',
  },
  pt: {
    words: [
      { word: 'PAIXÃO', sub: 'Proximidade e Química' },
      { word: 'BALADAS', sub: 'Noite ao Vivo e Lugares Secretos' },
      { word: 'CHAT AO VIVO', sub: 'Zero Telefones • Knock Instantâneo' },
    ],
    defaultDest: 'ENTRANDO NO CERCA SOCIAL',
    mapDest: 'MAPA DE PROXIMIDADE AO VIVO',
    datingDest: 'CERCA DATING • ACCESSO VERIFICADO',
    contestDest: "CONCURSO WHO'S POPULAR",
    launchingPrefix: 'ABRINDO',
    skip: 'Pular ↗',
  },
  fr: {
    words: [
      { word: 'AMOUR', sub: 'Proximité & Alchimie' },
      { word: 'CLUBS', sub: 'Nuit en Direct & Lieux Secrets' },
      { word: 'CHAT LIVE', sub: 'Zéro Numéro • Knock Instantané' },
    ],
    defaultDest: 'ENTRÉE DANS CERCA SOCIAL',
    mapDest: 'CARTE DE PROXIMITÉ EN DIRECT',
    datingDest: 'CERCA DATING • ACCÈS VÉRIFIÉ',
    contestDest: "CONCOURS WHO'S POPULAR",
    launchingPrefix: 'OUVERTURE DE',
    skip: 'Passer ↗',
  },
  de: {
    words: [
      { word: 'LIEBE', sub: 'Nähe & Chemie' },
      { word: 'CLUBS', sub: 'Live-Nachtleben & Geheime Orte' },
      { word: 'LIVE-CHAT', sub: 'Keine Nummern • Sofort-Knock' },
    ],
    defaultDest: 'EINTRITT IN CERCA SOCIAL',
    mapDest: 'LIVE-NÄHERUNGSKARTE',
    datingDest: 'CERCA DATING • VERIFIZIERTER ZUGANG',
    contestDest: "WHO'S POPULAR CONTEST",
    launchingPrefix: 'STARTE',
    skip: 'Überspringen ↗',
  },
  ja: {
    words: [
      { word: '恋愛', sub: '距離感とケミストリー' },
      { word: 'クラブ', sub: 'ライブナイトライフ＆秘密のスポット' },
      { word: 'ライブチャット', sub: '番号共有ゼロ • 瞬間ノック' },
    ],
    defaultDest: 'CERCA SOCIAL へ移動中',
    mapDest: '周辺ライブマップ',
    datingDest: 'CERCA デーティング',
    contestDest: "WHO'S POPULAR コンテスト",
    launchingPrefix: '起動中',
    skip: 'スキップ ↗',
  },
  zh: {
    words: [
      { word: '心动', sub: '近距感应与默契' },
      { word: '夜店俱乐部', sub: '实时夜生活与隐秘据点' },
      { word: '实时聊天', sub: '零号码泄露 • 即刻敲门' },
    ],
    defaultDest: '正在进入 CERCA SOCIAL',
    mapDest: '附近实时雷达地图',
    datingDest: 'CERCA 约会 • 认证通道',
    contestDest: '人气挑战赛',
    launchingPrefix: '正在开启',
    skip: '跳过 ↗',
  },
  it: {
    words: [
      { word: 'AMORE', sub: 'Prossimità & Chimica' },
      { word: 'CLUB', sub: 'Vita Notturna Live & Luoghi Segreti' },
      { word: 'CHAT LIVE', sub: 'Zero Numeri • Tocco Istantaneo' },
    ],
    defaultDest: 'INGRESSO IN CERCA SOCIAL',
    mapDest: 'MAPPA DI PROSSIMITÀ LIVE',
    datingDest: 'CERCA DATING • ACCESSO VERIFICATO',
    contestDest: "CONCORSO WHO'S POPULAR",
    launchingPrefix: 'APERTURA',
    skip: 'Salta ↗',
  },
  tl: {
    words: [
      { word: 'PAG-IBIG', sub: 'Malapit & Chemistry' },
      { word: 'CLUBS', sub: 'Live Nightlife & Secret Spots' },
      { word: 'LIVE CHAT', sub: 'Walang Number • Instant Knock' },
    ],
    defaultDest: 'PAPASOK SA CERCA SOCIAL',
    mapDest: 'LIVE NEARBY MAP',
    datingDest: 'CERCA DATING',
    contestDest: "WHO'S POPULAR CONTEST",
    launchingPrefix: 'BINUBUKSAN',
    skip: 'Laktawan ↗',
  },
  vi: {
    words: [
      { word: 'TÌNH YÊU', sub: 'Gần Gũi & Kết Nối' },
      { word: 'CLUBS', sub: 'Đêm Sôi Động & Điểm Hẹn Bí Mật' },
      { word: 'CHAT TRỰC TIẾP', sub: 'Không Lộ Số • Kết Nối Tức Thì' },
    ],
    defaultDest: 'ĐANG VÀO CERCA SOCIAL',
    mapDest: 'BẢN ĐỒ KẾT NỐI QUANH BẠN',
    datingDest: 'CERCA HẸN HÒ',
    contestDest: "CUỘC THI WHO'S POPULAR",
    launchingPrefix: 'ĐANG MỞ',
    skip: 'Bỏ qua ↗',
  },
}

const WORD_STYLES = [
  {
    gradient: 'from-rose-400 via-pink-300 to-amber-200',
    glowColor: 'rgba(255, 42, 109, 0.9)',
    startMs: 250,
    durationMs: 1150,
  },
  {
    gradient: 'from-cyan-300 via-blue-400 to-purple-400',
    glowColor: 'rgba(5, 217, 232, 0.9)',
    startMs: 1350,
    durationMs: 1150,
  },
  {
    gradient: 'from-fuchsia-400 via-rose-300 to-cyan-300',
    glowColor: 'rgba(217, 70, 239, 0.9)',
    startMs: 2450,
    durationMs: 1200,
  },
] as const

function detectFallbackLocale(): string {
  if (typeof window === 'undefined') return 'en'
  try {
    const params = new URLSearchParams(window.location.search)
    const urlLang = (params.get('lang') || params.get('locale') || '').toLowerCase().slice(0, 2)
    if (urlLang && WARP_COPY[urlLang]) return urlLang

    const saved = (
      localStorage.getItem('scanqr_locale') ||
      localStorage.getItem('cerca_preauth_locale') ||
      localStorage.getItem('cerca:preauth-locale-v2') ||
      ''
    )
      .toLowerCase()
      .slice(0, 2)
    if (saved && WARP_COPY[saved]) return saved

    const nav = (navigator.language || '').toLowerCase().slice(0, 2)
    if (nav && nav !== 'en' && WARP_COPY[nav]) return nav

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase()
    if (tz.includes('bangkok') || tz.includes('thailand')) return 'th'
    if (tz.includes('bogota') || tz.includes('colombia') || tz.includes('mexico')) return 'es'
    if (tz.includes('sao_paulo') || tz.includes('brazil')) return 'pt'
    if (tz.includes('tokyo')) return 'ja'
  } catch {
    // ignore
  }
  return 'en'
}

function localizeDestination(rawLabel: string | undefined, copy: LocalizedWarpCopy): string {
  if (!rawLabel || rawLabel === 'ENTERING CERCA SOCIAL') return copy.defaultDest
  if (rawLabel === 'NEARBY PROXIMITY MAP') return copy.mapDest
  if (rawLabel.startsWith('NEARBY PROXIMITY MAP • ')) {
    return `${copy.mapDest} • ${rawLabel.slice('NEARBY PROXIMITY MAP • '.length)}`
  }
  if (rawLabel === 'CERCA DATING • VERIFIED ACCESS') return copy.datingDest
  if (rawLabel.startsWith('CERCA DATING • ')) {
    return `${copy.datingDest.split(' • ')[0]} • ${rawLabel.slice('CERCA DATING • '.length)}`
  }
  if (rawLabel.startsWith('ENTERING CERCA • ')) {
    return `${copy.defaultDest} • ${rawLabel.slice('ENTERING CERCA • '.length)}`
  }
  if (rawLabel === "WHO'S POPULAR CONTEST") return copy.contestDest
  if (rawLabel.startsWith('LAUNCHING ')) {
    return `${copy.launchingPrefix} ${rawLabel.slice('LAUNCHING '.length)}`
  }
  return rawLabel
}

export function StarfieldTunnelTransition({
  active,
  targetUrl,
  locale,
  onComplete,
  destinationLabel = 'ENTERING CERCA SOCIAL',
}: StarfieldTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [currentWordIdx, setCurrentWordIdx] = useState<number>(-1)
  const [isFlashing, setIsFlashing] = useState(false)
  const animFrameRef = useRef<number | null>(null)
  const hasRedirectedRef = useRef(false)

  const resolvedLocale = (() => {
    const clean = (locale || '').trim().toLowerCase().slice(0, 2)
    if (clean && WARP_COPY[clean]) return clean
    return detectFallbackLocale()
  })()

  const copy = WARP_COPY[resolvedLocale] || WARP_COPY.en
  const isNonLatinScript = resolvedLocale === 'th' || resolvedLocale === 'ja' || resolvedLocale === 'zh'
  const localizedDest = localizeDestination(destinationLabel, copy)

  useEffect(() => {
    if (!active) {
      setCurrentWordIdx(-1)
      setIsFlashing(false)
      hasRedirectedRef.current = false
      return
    }

    const timers: ReturnType<typeof setTimeout>[] = []

    timers.push(
      setTimeout(() => {
        setCurrentWordIdx(0)
      }, WORD_STYLES[0].startMs),
    )

    timers.push(
      setTimeout(() => {
        setCurrentWordIdx(1)
      }, WORD_STYLES[1].startMs),
    )

    timers.push(
      setTimeout(() => {
        setCurrentWordIdx(2)
      }, WORD_STYLES[2].startMs),
    )

    timers.push(
      setTimeout(() => {
        setCurrentWordIdx(3)
        setIsFlashing(true)
      }, 3650),
    )

    timers.push(
      setTimeout(() => {
        if (!hasRedirectedRef.current) {
          hasRedirectedRef.current = true
          if (onComplete) onComplete()
          if (typeof window !== 'undefined') {
            window.location.href = targetUrl
          }
        }
      }, 4000),
    )

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [active, targetUrl, onComplete])

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    const starColors = [
      '#ffffff',
      '#ffffff',
      '#ff2a6d',
      '#05d9e8',
      '#e879f9',
      '#fde047',
      '#38bdf8',
    ]

    const NUM_STARS = 300
    const stars: Star[] = []
    for (let i = 0; i < NUM_STARS; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2.2,
        y: (Math.random() - 0.5) * height * 2.2,
        z: Math.random() * 1000 + 1,
        pz: 1000,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      })
    }

    const startTime = performance.now()

    const render = () => {
      const elapsed = performance.now() - startTime
      const speed = Math.min(10 + (elapsed / 3400) * 16, 26)

      ctx.fillStyle = 'rgba(2, 2, 4, 0.38)'
      ctx.fillRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2

      for (let i = 0; i < NUM_STARS; i++) {
        const star = stars[i]
        star.pz = star.z
        star.z -= speed

        if (star.z <= 0) {
          star.z = 1000
          star.pz = 1000
          star.x = (Math.random() - 0.5) * width * 2.2
          star.y = (Math.random() - 0.5) * height * 2.2
          star.color = starColors[Math.floor(Math.random() * starColors.length)]
          continue
        }

        const k = 280 / star.z
        const px = star.x * k + cx
        const py = star.y * k + cy

        const pk = 280 / star.pz
        const ppx = star.x * pk + cx
        const ppy = star.y * pk + cy

        if (px < -50 || px > width + 50 || py < -50 || py > height + 50) continue

        const depthRatio = 1 - star.z / 1000
        const strokeW = Math.max(0.6, depthRatio * 3.0)

        ctx.beginPath()
        ctx.strokeStyle = star.color
        ctx.lineWidth = strokeW
        ctx.globalAlpha = Math.min(1, depthRatio * 1.5)
        ctx.moveTo(ppx, ppy)
        ctx.lineTo(px, py)
        ctx.stroke()

        ctx.beginPath()
        ctx.fillStyle = star.color === '#ffffff' ? '#ffffff' : star.color
        ctx.arc(px, py, strokeW * 0.75, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1.0

      animFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [active])

  if (!active) return null

  const activeWordStyle =
    currentWordIdx >= 0 && currentWordIdx < WORD_STYLES.length
      ? WORD_STYLES[currentWordIdx]
      : null
  const activeWordText =
    currentWordIdx >= 0 && currentWordIdx < copy.words.length
      ? copy.words[currentWordIdx]
      : null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[999999] overflow-hidden bg-[#020204] select-none cursor-wait flex items-center justify-center"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      <style>{`
        @keyframes starfieldWordDrift {
          0% {
            transform: translate3d(-50%, -50%, -700px) scale(0.12);
            opacity: 0;
            filter: blur(14px);
          }
          20% {
            opacity: 0.95;
            filter: blur(0px);
          }
          60% {
            opacity: 1;
            transform: translate3d(-50%, -50%, 0px) scale(1.1);
            filter: blur(0px);
          }
          80% {
            opacity: 0.85;
            filter: blur(2px);
          }
          100% {
            transform: translate3d(-50%, -50%, 650px) scale(3.8);
            opacity: 0;
            filter: blur(20px);
          }
        }

        @keyframes warpTunnelExpand {
          0% { transform: scale(0.75) rotate(0deg); opacity: 0.25; }
          50% { transform: scale(1.1) rotate(180deg); opacity: 0.45; }
          100% { transform: scale(0.75) rotate(360deg); opacity: 0.25; }
        }

        @keyframes resolveFlashLight {
          0% { opacity: 0; }
          40% { opacity: 0.85; }
          100% { opacity: 1; }
        }
      `}</style>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none block" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] rounded-full border border-rose-500/10 blur-[1px]"
          style={{ animation: 'warpTunnelExpand 6s ease-in-out infinite' }}
        />
        <div
          className="absolute w-[45vw] h-[45vw] max-w-[450px] max-h-[450px] rounded-full border border-dashed border-cyan-400/10"
          style={{ animation: 'warpTunnelExpand 5s linear infinite reverse' }}
        />
        <div
          className="absolute w-[25vw] h-[25vw] max-w-[250px] max-h-[250px] rounded-full border border-purple-500/12"
          style={{ animation: 'warpTunnelExpand 4s ease-in-out infinite' }}
        />
      </div>

      {activeWordStyle && activeWordText && (
        <div
          key={`${resolvedLocale}-${currentWordIdx}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-30 w-[92vw] max-w-5xl"
          style={{
            animation: `starfieldWordDrift ${activeWordStyle.durationMs}ms cubic-bezier(0.16, 0.84, 0.3, 1) forwards`,
            willChange: 'transform, opacity, filter',
          }}
        >
          <div
            style={{
              fontFamily: isNonLatinScript
                ? "system-ui, -apple-system, 'Noto Sans Thai', sans-serif"
                : "'Cinzel', serif",
              letterSpacing: isNonLatinScript ? '0.02em' : '0.22em',
              lineHeight: isNonLatinScript ? 1.25 : 1,
              textShadow: `0 0 30px ${activeWordStyle.glowColor}, 0 0 60px ${activeWordStyle.glowColor}, 0 0 90px rgba(255,255,255,0.7)`,
            }}
            className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r ${activeWordStyle.gradient} ${
              isNonLatinScript ? '' : 'uppercase'
            }`}
          >
            {activeWordText.word}
          </div>

          <div
            style={{
              letterSpacing: isNonLatinScript ? '0.04em' : '0.32em',
            }}
            className={`mt-3 text-xs sm:text-sm md:text-base text-white/90 font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] ${
              isNonLatinScript ? '' : 'uppercase'
            }`}
          >
            {activeWordText.sub}
          </div>
        </div>
      )}

      <div className="absolute bottom-10 inset-x-0 flex flex-col items-center justify-center z-20 pointer-events-none px-4">
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/75 backdrop-blur-md border border-white/15 shadow-2xl">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span
            style={{ letterSpacing: isNonLatinScript ? '0.05em' : '0.28em' }}
            className={`text-[10px] sm:text-[11px] font-mono text-slate-200 ${
              isNonLatinScript ? '' : 'uppercase'
            }`}
          >
            {localizedDest}
          </span>
          <span className="text-rose-400 font-bold">⚡</span>
        </div>
      </div>

      {isFlashing && (
        <div
          className="absolute inset-0 z-40 bg-gradient-to-t from-white via-cyan-100 to-rose-100 pointer-events-none"
          style={{
            animation: 'resolveFlashLight 350ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
          }}
        />
      )}

      <button
        type="button"
        onClick={() => {
          hasRedirectedRef.current = true
          if (onComplete) onComplete()
          if (typeof window !== 'undefined') {
            window.location.href = targetUrl
          }
        }}
        className="absolute top-6 right-6 z-50 text-[10px] tracking-widest uppercase text-slate-400 hover:text-white bg-black/50 hover:bg-black/90 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md transition-colors cursor-pointer"
      >
        {copy.skip}
      </button>
    </div>
  )
}

export default StarfieldTunnelTransition
