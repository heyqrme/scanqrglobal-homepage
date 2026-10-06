import { useEffect, useRef } from 'react'

export interface ExitTelemetryMetadata {
  exit_section: string
  max_scroll_depth: number
  dwell_time_seconds: number
  last_interaction: string
  screen?: string
  is_local_mode?: boolean
  hub?: string
  [key: string]: any
}

export interface UseExitTelemetryOptions {
  isLocalMode?: boolean
  currentHub?: string
  campaignRef?: string
  onMilestoneReached?: (milestone: number) => void
}

const SECTION_IDS = [
  'hero',
  'query-bar',
  'classifieds',
  'pillars',
  'cities',
  'app-previews',
  'carousel',
  'hosts',
  'trust',
  'footer',
]

/**
 * Sends non-blocking telemetry payloads. Prefers navigator.sendBeacon
 * for guaranteed delivery on tab-close / pagehide, falling back to keepalive fetch.
 */
export function sendTelemetryBeacon(
  eventType: string,
  metadata: Record<string, any> = {},
  fullPayloadOverride?: Record<string, any>
): void {
  try {
    const payload = fullPayloadOverride || {
      event_type: eventType,
      path: typeof window !== 'undefined' ? window.location.pathname : '/',
      referrer: typeof document !== 'undefined' ? document.referrer || '' : '',
      campaign_ref:
        typeof sessionStorage !== 'undefined'
          ? sessionStorage.getItem('sqg_campaign_ref') || 'direct'
          : 'direct',
      metadata,
    }

    const jsonStr = JSON.stringify(payload)

    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([jsonStr], { type: 'application/json' })
      const dispatched = navigator.sendBeacon('/api/telemetry', blob)
      if (!dispatched && typeof fetch !== 'undefined') {
        fetch('/api/telemetry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: jsonStr,
          keepalive: true,
        }).catch(() => {})
      }
    } else if (typeof fetch !== 'undefined') {
      fetch('/api/telemetry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonStr,
        keepalive: true,
      }).catch(() => {})
    }
  } catch {
    // non-blocking
  }
}

/**
 * Calculates which section is currently centered or most visible in the viewport.
 */
export function getCurrentVisibleSection(): string {
  if (typeof document === 'undefined' || typeof window === 'undefined') return 'hero'

  const vh = window.innerHeight || 800
  const scrollY = window.scrollY || window.pageYOffset || 0
  const viewportCenter = scrollY + vh / 2

  let bestSection = 'hero'
  let minDistance = Infinity

  for (const id of SECTION_IDS) {
    const el = document.getElementById(id)
    if (el) {
      const rect = el.getBoundingClientRect()
      // If the section dominates the center view
      if (rect.top <= vh * 0.7 && rect.bottom >= vh * 0.3) {
        return id
      }
      const elCenter = rect.top + scrollY + rect.height / 2
      const dist = Math.abs(viewportCenter - elCenter)
      if (dist < minDistance) {
        minDistance = dist
        bestSection = id
      }
    }
  }

  return bestSection
}

/**
 * Custom hook to monitor drop-offs, exit points, scroll depth milestones,
 * and session dwell time before exit.
 */
export function useExitTelemetry(options: UseExitTelemetryOptions = {}) {
  const startTimeRef = useRef<number>(Date.now())
  const maxScrollRef = useRef<number>(0)
  const firedMilestonesRef = useRef<Set<number>>(new Set())
  const lastInteractionRef = useRef<string>('none')
  const hasDispatchedExitRef = useRef<boolean>(false)

  // Keep options synced without reattaching listeners
  const optionsRef = useRef(options)
  useEffect(() => {
    optionsRef.current = options
  }, [options])

  const getDwellTimeSeconds = (): number => {
    return Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000))
  }

  const recordInteraction = (actionName: string) => {
    if (actionName) {
      lastInteractionRef.current = actionName.slice(0, 60)
    }
  }

  const dispatchExitBeacon = () => {
    if (hasDispatchedExitRef.current) return
    hasDispatchedExitRef.current = true

    const dwellTime = getDwellTimeSeconds()
    const exitSection = getCurrentVisibleSection()
    const maxDepth = maxScrollRef.current
    const screenStr = typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'unknown'

    sendTelemetryBeacon('page_exit', {
      exit_section: exitSection,
      max_scroll_depth: maxDepth,
      dwell_time_seconds: dwellTime,
      last_interaction: lastInteractionRef.current,
      screen: screenStr,
      is_local_mode: optionsRef.current.isLocalMode ?? false,
      hub: optionsRef.current.currentHub || 'global',
    })
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    // 1. Scroll Depth Monitor & Milestone Dispatcher
    let scrollTimeout: any = null
    const handleScroll = () => {
      if (scrollTimeout) return
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null
        try {
          const docHeight = document.documentElement.scrollHeight
          const winHeight = window.innerHeight
          const scrollable = docHeight - winHeight
          const scrollY = window.scrollY || window.pageYOffset || 0
          const currentDepth = scrollable > 0 ? Math.min(100, Math.max(0, Math.round((scrollY / scrollable) * 100))) : 100

          if (currentDepth > maxScrollRef.current) {
            maxScrollRef.current = currentDepth
          }

          // Check milestones: 25%, 50%, 75%, 100%
          for (const milestone of [25, 50, 75, 100]) {
            if (currentDepth >= milestone && !firedMilestonesRef.current.has(milestone)) {
              firedMilestonesRef.current.add(milestone)
              sendTelemetryBeacon('scroll_milestone', {
                milestone,
                max_scroll_depth: maxScrollRef.current,
                dwell_time_seconds: getDwellTimeSeconds(),
                current_section: getCurrentVisibleSection(),
                last_interaction: lastInteractionRef.current,
              })
              optionsRef.current.onMilestoneReached?.(milestone)
            }
          }
        } catch {
          // ignore
        }
      }, 120)
    }

    // 2. Global Interaction Listener
    const handleClick = (e: MouseEvent) => {
      try {
        const target = e.target as HTMLElement | null
        if (!target) return
        const trackedAction =
          target.getAttribute('data-track-action') ||
          target.closest('[data-track-action]')?.getAttribute('data-track-action') ||
          target.id ||
          target.getAttribute('aria-label') ||
          (target.tagName === 'BUTTON' ? target.innerText?.trim()?.slice(0, 30) : null) ||
          (target.tagName === 'A' ? target.innerText?.trim()?.slice(0, 30) : null)

        if (trackedAction) {
          recordInteraction(trackedAction)
        }
      } catch {
        // ignore
      }
    }

    // 3. Exit Events: visibilitychange & pagehide
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        dispatchExitBeacon()
      } else if (document.visibilityState === 'visible') {
        // User returned to tab - reset exit lock to capture subsequent dwell and exit
        hasDispatchedExitRef.current = false
      }
    }

    const handlePageHide = () => {
      dispatchExitBeacon()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('click', handleClick, { capture: true, passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('pagehide', handlePageHide)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('click', handleClick, { capture: true })
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('pagehide', handlePageHide)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [])

  return {
    recordInteraction,
    dispatchExitBeacon,
    getMaxScrollDepth: () => maxScrollRef.current,
    getDwellTimeSeconds,
    getCurrentSection: getCurrentVisibleSection,
  }
}
