import { useEffect, useState } from 'react'
import { Menu, MessageCircle, X } from '../../lib/icons'
import { WA_CONSULT } from '../../lib/format'
import { scrollToSection } from '../../context/OrderContext'
import Logo from './Logo'

const LINKS = [
  { label: 'Paket', target: 'paket' },
  { label: 'Domain', target: 'domain' },
  { label: 'Desain', target: 'katalog' },
  { label: 'Cara Kerja', target: 'cara-kerja' },
  { label: 'FAQ', target: 'faq' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Menu mobile ditutup dengan Escape.
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (target) => {
    setOpen(false)
    scrollToSection(target)
  }

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white px-4 transition-colors duration-200 sm:px-6 lg:px-8 ${
        scrolled || open ? 'border-line' : 'border-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo tone="light" onNavigate={() => setOpen(false)} />

        <nav aria-label="Navigasi utama" className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <button
              key={link.target}
              type="button"
              onClick={() => go(link.target)}
              className="text-[14.5px] font-medium text-body transition-colors hover:text-ink"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={WA_CONSULT} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden xs:inline">Chat Sales</span>
          </a>
          <button
            type="button"
            onClick={() => go('ringkasan')}
            className="btn btn-sm btn-primary hidden sm:inline-flex"
          >
            Ringkasan Order
          </button>
          <button
            type="button"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line-strong text-ink md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="-mx-4 border-t border-line bg-white px-4 pb-4 pt-1 sm:-mx-6 sm:px-6 md:hidden">
          {LINKS.map((link) => (
            <button
              key={link.target}
              type="button"
              onClick={() => go(link.target)}
              className="block w-full border-b border-line py-3.5 text-left text-[15px] font-medium text-ink"
            >
              {link.label}
            </button>
          ))}
          <button type="button" onClick={() => go('ringkasan')} className="btn btn-primary mt-4 w-full">
            Lihat ringkasan order
          </button>
        </div>
      )}
    </header>
  )
}
