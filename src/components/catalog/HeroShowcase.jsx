import { useCallback, useEffect, useRef, useState } from 'react'
import { Loader2, Maximize2, Pause, Play, ShieldCheck } from '../../lib/icons'

const ROTATE_MS = 7000
const SLOW_AFTER_MS = 9000
const SANDBOX =
  'allow-scripts allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-downloads'

const SHORT_LABEL = {
  'padel-futsal-master': 'Padel & Futsal',
  'quadra-coffee-shop': 'Quadra Coffee',
  'sinartrans-customer': 'Sinartrans',
  'fine-wo': 'Fine WO',
}

function prefersReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function HeroShowcase({ templates = [], onOpenFullscreen, className = '' }) {
  const [index, setIndex] = useState(0)
  const [loadedId, setLoadedId] = useState('')
  const [slowId, setSlowId] = useState('')
  const [autoPlay, setAutoPlay] = useState(true)
  const [hovering, setHovering] = useState(false)
  const [inView, setInView] = useState(true)
  const [mounted, setMounted] = useState(false)
  const wrapRef = useRef(null)

  const active = templates[index] ?? templates[0] ?? null
  const activeId = active?.id ?? ''
  const isLoaded = Boolean(activeId) && loadedId === activeId
  const isSlow = Boolean(activeId) && !isLoaded && slowId === activeId

  // Timer "aset lambat" — hanya mengaktifkan state dari callback timeout (bukan render).
  useEffect(() => {
    if (!mounted || !activeId || isLoaded) return undefined
    const timer = window.setTimeout(() => setSlowId(activeId), SLOW_AFTER_MS)
    return () => window.clearTimeout(timer)
  }, [mounted, activeId, isLoaded])

  // iframe ditanam setelah paint pertama: template memuat Tailwind CDN + Lucide dari
  // jaringan, jadi teks hero dibiarkan tampil dulu sebelum frame dihidupkan.
  useEffect(() => {
    const start = () => setMounted(true)
    const hasIdle = typeof window.requestIdleCallback === 'function'
    const handle = hasIdle
      ? window.requestIdleCallback(start, { timeout: 1200 })
      : window.setTimeout(start, 250)
    return () => {
      if (hasIdle) window.cancelIdleCallback(handle)
      else window.clearTimeout(handle)
    }
  }, [])

  // Rotasi hanya jalan saat showcase terlihat di viewport.
  useEffect(() => {
    const node = wrapRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) setInView(entry.isIntersecting)
      },
      { threshold: 0.2 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Auto-rotation halus tiap 7 detik, berhenti saat hover/fokus atau setelah user klik.
  useEffect(() => {
    if (!autoPlay || hovering || !inView || templates.length < 2) return undefined
    if (prefersReducedMotion()) return undefined
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % templates.length)
    }, ROTATE_MS)
    return () => window.clearInterval(timer)
  }, [autoPlay, hovering, inView, templates.length])

  const selectTemplate = useCallback((nextIndex) => {
    setIndex(nextIndex)
    setAutoPlay(false)
  }, [])

  if (!active) return null

  const label = SHORT_LABEL[active.id] ?? active.name

  return (
    <div
      ref={wrapRef}
      data-hero-showcase
      className={`relative ${className}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={() => setHovering(false)}
    >
      {/* Frame browser */}
      <div className="overflow-hidden rounded-xl bg-white shadow-[0_30px_60px_-24px_rgba(0,0,0,0.6)] ring-1 ring-white/20">
        <div className="flex items-center gap-3 border-b border-line bg-wash px-3 py-2">
          <div
            className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-line bg-white px-2.5 py-1.5"
            title="Pratinjau sandbox — alamat demo, bukan URL publik"
          >
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-mute" />
            <p data-hero-address className="truncate font-mono text-[12px] text-mute">
              demo.frcloud.id
              <span className="text-ink">/{active.id}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenFullscreen?.(active)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1.5 text-[13px] font-semibold text-ink transition-colors hover:bg-line"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Buka preview penuh</span>
            <span className="sm:hidden">Buka</span>
          </button>
        </div>

        <div className="relative w-full">
          {mounted ? (
            <iframe
              key={active.id}
              src={active.htmlPath}
              title={`Pratinjau live template ${active.name}`}
              sandbox={SANDBOX}
              loading="eager"
              referrerPolicy="no-referrer"
              onLoad={() => setLoadedId(active.id)}
              className={`pointer-events-none h-[360px] w-full border-0 transition-opacity duration-500 ease-out md:pointer-events-auto md:h-[440px] ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <div aria-hidden="true" className="h-[360px] w-full md:h-[440px]" />
          )}

          <div
            className={`pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-2.5 bg-wash transition-opacity duration-300 ${
              isLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <Loader2 className="h-5 w-5 animate-spin text-mute" />
            <p className="text-[14px] font-semibold text-ink">Memuat {label}…</p>
            <p className="max-w-[280px] px-4 text-center text-[13px] leading-relaxed text-mute">
              {isSlow
                ? 'Aset CDN lambat. Buka preview penuh untuk melihat template utuh.'
                : 'Menyiapkan pratinjau live di dalam sandbox'}
            </p>
          </div>
        </div>
      </div>

      {/* Pemilih template + kontrol rotasi otomatis */}
      <div className="mt-3 flex w-full min-w-0 items-center gap-2">
        <div className="no-scrollbar flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
          {templates.map((tpl, tplIndex) => {
            const isActive = tplIndex === index
            const tplLabel = SHORT_LABEL[tpl.id] ?? tpl.name
            return (
              <button
                key={tpl.id}
                type="button"
                data-hero-pill
                onClick={() => selectTemplate(tplIndex)}
                aria-pressed={isActive}
                aria-label={`Tampilkan pratinjau ${tpl.name} di hero`}
                className={`relative shrink-0 overflow-hidden rounded-md px-3 py-2 text-[13.5px] font-medium whitespace-nowrap transition-colors ${
                  isActive ? 'bg-white/12 text-white' : 'text-silver hover:text-white'
                }`}
              >
                {tplLabel}
                {isActive ? (
                  <span
                    aria-hidden="true"
                    key={`${tpl.id}-${index}`}
                    className="animate-rotate-progress absolute inset-x-0 bottom-0 h-[2px] origin-left bg-sky"
                    style={{ animationPlayState: hovering || !autoPlay ? 'paused' : 'running' }}
                  />
                ) : null}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => setAutoPlay((current) => !current)}
          aria-pressed={autoPlay}
          aria-label={autoPlay ? 'Jeda rotasi otomatis' : 'Mulai rotasi otomatis'}
          title={autoPlay ? 'Jeda rotasi otomatis' : 'Mulai rotasi otomatis'}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-white/25 text-white transition-colors hover:bg-white/10"
        >
          {autoPlay ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        </button>
      </div>

      <p className="mt-2 text-[13px] leading-relaxed text-silver">
        Ini halaman asli template <span className="font-medium text-white">{active.name}</span> yang
        berjalan langsung, bukan gambar.
      </p>
    </div>
  )
}
