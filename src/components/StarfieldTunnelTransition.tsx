import { useEffect, useRef, useState } from 'react'

export interface StarfieldTransitionProps {
  active: boolean
  targetUrl: string
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

const WARP_WORDS = [
  {
    word: 'LOVE',
    sub: 'Proximity & Chemistry',
    gradient: 'from-rose-400 via-pink-300 to-amber-200',
    glowColor: 'rgba(255, 42, 109, 0.85)',
    startMs: 120,
    durationMs: 820,
  },
  {
    word: 'CLUBS',
    sub: 'Live Nightlife & Secret Places',
    gradient: 'from-cyan-300 via-blue-400 to-purple-400',
    glowColor: 'rgba(5, 217, 232, 0.85)',
    startMs: 880,
    durationMs: 820,
  },
  {
    word: 'LIVE CHAT',
    sub: 'Zero Phone Numbers • Instant Knox',
    gradient: 'from-fuchsia-400 via-rose-300 to-cyan-300',
    glowColor: 'rgba(217, 70, 239, 0.85)',
    startMs: 1640,
    durationMs: 840,
  },
]

export function StarfieldTunnelTransition({
  active,
  targetUrl,
  onComplete,
  destinationLabel = 'ENTERING CERCA SOCIAL',
}: StarfieldTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [currentWordIdx, setCurrentWordIdx] = useState<number>(-1)
  const [isFlashing, setIsFlashing] = useState(false)
  const animFrameRef = useRef<number | null>(null)
  const hasRedirectedRef = useRef(false)

  // Trigger words sequence and final redirection
  useEffect(() => {
    if (!active) {
      setCurrentWordIdx(-1)
      setIsFlashing(false)
      hasRedirectedRef.current = false
      return
    }

    const timers: NodeJS.Timeout[] = []

    // Word 1: LOVE
    timers.push(
      setTimeout(() => {
        setCurrentWordIdx(0)
      }, WARP_WORDS[0].startMs)
    )

    // Word 2: CLUBS
    timers.push(
      setTimeout(() => {
        setCurrentWordIdx(1)
      }, WARP_WORDS[1].startMs)
    )

    // Word 3: LIVE CHAT
    timers.push(
      setTimeout(() => {
        setCurrentWordIdx(2)
      }, WARP_WORDS[2].startMs)
    )

    // Final hyperspace flash bloom
    timers.push(
      setTimeout(() => {
        setCurrentWordIdx(3)
        setIsFlashing(true)
      }, 2350)
    )

    // Resolution: Navigation into Cerca Social
    timers.push(
      setTimeout(() => {
        if (!hasRedirectedRef.current) {
          hasRedirectedRef.current = true
          if (onComplete) onComplete()
          if (typeof window !== 'undefined') {
            window.location.href = targetUrl
          }
        }
      }, 2650)
    )

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [active, targetUrl, onComplete])

  // Canvas 3D Space Warp Starfield Engine
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

    // Palette of vibrant hyperspace hues
    const starColors = [
      '#ffffff',
      '#ffffff',
      '#ff2a6d',
      '#05d9e8',
      '#d946ef',
      '#facc15',
      '#38bdf8',
    ]

    const NUM_STARS = 320
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
      // Accelerate warp speed from 24 to 58
      const speed = Math.min(24 + (elapsed / 2200) * 36, 62)

      // Translucent clear to leave subtle light streak trails
      ctx.fillStyle = 'rgba(5, 5, 10, 0.28)'
      ctx.fillRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2

      // Draw Hyperspace Stars & Streaks
      for (let i = 0; i < NUM_STARS; i++) {
        const star = stars[i]
        star.pz = star.z
        star.z -= speed

        // Recycle star when it rushes past the screen
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

        // Skip if off-screen
        if (px < -50 || px > width + 50 || py < -50 || py > height + 50) continue

        // Draw light streak line towards camera
        const depthRatio = 1 - star.z / 1000
        const strokeW = Math.max(0.6, depthRatio * 3.4)

        ctx.beginPath()
        ctx.strokeStyle = star.color
        ctx.lineWidth = strokeW
        ctx.globalAlpha = Math.min(1, depthRatio * 1.4)
        ctx.moveTo(ppx, ppy)
        ctx.lineTo(px, py)
        ctx.stroke()

        // Core star head
        ctx.beginPath()
        ctx.fillStyle = '#ffffff'
        ctx.arc(px, py, strokeW * 0.7, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1.0

      // Radial Center Warp Portal Iris Glow
      const portalGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(width, height) * 0.45)
      portalGrad.addColorStop(0, 'rgba(255, 42, 109, 0.12)')
      portalGrad.addColorStop(0.35, 'rgba(5, 217, 232, 0.08)')
      portalGrad.addColorStop(1, 'rgba(5, 5, 10, 0)')
      ctx.fillStyle = portalGrad
      ctx.fillRect(0, 0, width, height)

      animFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [active])

  if (!active) return null

  const activeWord = currentWordIdx >= 0 && currentWordIdx < WARP_WORDS.length ? WARP_WORDS[currentWordIdx] : null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[999999] overflow-hidden bg-[#05050A] select-none cursor-wait flex items-center justify-center"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      {/* Keyframe Styles for Typographic Starfield Warp & Light Bloom */}
      <style>{`
        @keyframes starfieldWordDrift {
          0% {
            transform: translate3d(-50%, -50%, -750px) scale(0.1);
            opacity: 0;
            filter: blur(16px);
          }
          18% {
            opacity: 0.95;
            filter: blur(0px);
          }
          62% {
            opacity: 1;
            transform: translate3d(-50%, -50%, 0px) scale(1.15);
            filter: blur(0px);
          }
          82% {
            opacity: 0.85;
            filter: blur(3px);
          }
          100% {
            transform: translate3d(-50%, -50%, 700px) scale(4.4);
            opacity: 0;
            filter: blur(24px);
          }
        }

        @keyframes warpTunnelExpand {
          0% { transform: scale(0.7) rotate(0deg); opacity: 0.4; }
          50% { transform: scale(1.15) rotate(180deg); opacity: 0.8; }
          100% { transform: scale(0.7) rotate(360deg); opacity: 0.4; }
        }

        @keyframes resolveFlashLight {
          0% { opacity: 0; }
          40% { opacity: 0.85; }
          100% { opacity: 1; }
        }
      `}</style>

      {/* 1. Fullscreen Warp Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none block" />

      {/* 2. Concentric Hyperspace Tunnel Energy Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] rounded-full border border-rose-500/25 blur-[1px]"
          style={{ animation: 'warpTunnelExpand 4s ease-in-out infinite' }}
        />
        <div
          className="absolute w-[45vw] h-[45vw] max-w-[450px] max-h-[450px] rounded-full border border-dashed border-cyan-400/25"
          style={{ animation: 'warpTunnelExpand 3s linear infinite reverse' }}
        />
        <div
          className="absolute w-[25vw] h-[25vw] max-w-[250px] max-h-[250px] rounded-full border border-purple-500/30"
          style={{ animation: 'warpTunnelExpand 2s ease-in-out infinite' }}
        />
      </div>

      {/* 3. Glowing Typographic Keywords Drifting Past the User ("LOVE", "CLUBS", "LIVE CHAT") */}
      {activeWord && (
        <div
          key={activeWord.word}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-30"
          style={{
            animation: `starfieldWordDrift ${activeWord.durationMs}ms cubic-bezier(0.16, 0.84, 0.3, 1) forwards`,
            willChange: 'transform, opacity, filter',
          }}
        >
          <div
            style={{
              fontFamily: "'Cinzel', serif",
              textShadow: `0 0 30px ${activeWord.glowColor}, 0 0 60px ${activeWord.glowColor}, 0 0 90px rgba(255,255,255,0.7)`,
            }}
            className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r ${activeWord.gradient} uppercase leading-none`}
          >
            {activeWord.word}
          </div>

          <div className="mt-3 text-xs sm:text-sm md:text-base uppercase tracking-[0.35em] text-white/90 font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            {activeWord.sub}
          </div>
        </div>
      )}

      {/* 4. Teleport Target Destination Badge at Bottom Center */}
      <div className="absolute bottom-10 inset-x-0 flex flex-col items-center justify-center z-20 pointer-events-none">
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 shadow-2xl">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] text-slate-200 uppercase">
            {destinationLabel}
          </span>
          <span className="text-rose-400 font-bold">⚡</span>
        </div>
      </div>

      {/* 5. Final Hyperspace Bloom & Flash Resolving into Main Map Landing View */}
      {isFlashing && (
        <div
          className="absolute inset-0 z-40 bg-gradient-to-t from-white via-cyan-100 to-rose-100 pointer-events-none"
          style={{
            animation: 'resolveFlashLight 350ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
          }}
        />
      )}

      {/* Skip button for instant navigation */}
      <button
        type="button"
        onClick={() => {
          hasRedirectedRef.current = true
          if (onComplete) onComplete()
          if (typeof window !== 'undefined') {
            window.location.href = targetUrl
          }
        }}
        className="absolute top-6 right-6 z-50 text-[10px] tracking-widest uppercase text-slate-400 hover:text-white bg-black/40 hover:bg-black/80 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md transition-colors cursor-pointer"
      >
        Skip ↗
      </button>
    </div>
  )
}

export default StarfieldTunnelTransition
