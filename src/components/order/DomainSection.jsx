import { useEffect, useState } from 'react'
import { ArrowRight, Check, Globe, Loader2, X } from '../../lib/icons'
import {
  TLD_OPTIONS,
  checkDomainAvailability,
  fullDomain,
  sanitizeDomainInput,
  validateDomainName,
} from '../../lib/domain'
import { scrollToSection, useOrder } from '../../context/OrderContext'
import SectionHeader from '../catalog/SectionHeader'

const INCLUDED = [
  'Free SSL / HTTPS otomatis',
  'DNS pointing & propagasi dipantau',
  'Redirect www dan root domain',
  'Perpanjangan tahun pertama sudah termasuk',
]

export default function DomainSection() {
  const { order, setDomainName, setTld } = useOrder()
  const [status, setStatus] = useState({ state: 'idle', message: '', suggestions: [] })

  useEffect(() => {
    const clean = sanitizeDomainInput(order.domainName)
    if (!clean) {
      setStatus({ state: 'idle', message: '', suggestions: [] })
      return undefined
    }

    const validation = validateDomainName(clean)
    if (validation.state === 'invalid') {
      setStatus({ state: 'invalid', message: validation.message, suggestions: [] })
      return undefined
    }

    let cancelled = false
    const controller = new AbortController()
    setStatus({ state: 'checking', message: '', suggestions: [] })

    const timer = window.setTimeout(() => {
      checkDomainAvailability(clean, order.tld, { signal: controller.signal }).then((result) => {
        if (cancelled) return
        const domain = result.domain || fullDomain(clean, order.tld)
        setStatus({
          state: result.state,
          message:
            result.state === 'available'
              ? `${domain} tersedia — bisa langsung disambungkan saat setup.`
              : result.state === 'taken'
                ? `${domain} tidak tersedia — sudah ada yang menggunakan. Pilih rekomendasi di bawah atau ubah namanya.`
                : `Belum bisa memastikan ${domain} sekarang (registry tidak merespons). Coba lagi sebentar lagi atau lanjutkan — tim kami verifikasi manual.`,
          suggestions: result.suggestions,
        })
      })
    }, 400)

    return () => {
      cancelled = true
      controller.abort()
      window.clearTimeout(timer)
    }
  }, [order.domainName, order.tld])

  const handleChange = (event) => {
    const raw = event.target.value.toLowerCase().slice(0, 64)
    const matchesTld = [...TLD_OPTIONS]
      .sort((a, b) => b.value.length - a.value.length)
      .find((option) => raw.endsWith(option.value) && raw.length > option.value.length)

    if (matchesTld) {
      setTld(matchesTld.value)
      setDomainName(raw.slice(0, -matchesTld.value.length))
      return
    }
    setDomainName(raw)
  }

  const preview = fullDomain(order.domainName, order.tld)

  const statusStyles = {
    idle: 'border-line bg-wash text-body',
    invalid: 'border-bad/25 bg-bad-wash text-bad',
    checking: 'border-line bg-wash text-body',
    available: 'border-ok/25 bg-ok-wash text-ok',
    taken: 'border-bad/25 bg-bad-wash text-bad',
    unknown: 'border-warn/25 bg-warn-wash text-warn',
  }

  const StatusIcon =
    status.state === 'available'
      ? Check
      : status.state === 'invalid' || status.state === 'taken'
        ? X
        : status.state === 'checking'
          ? Loader2
          : Globe

  const canContinue = status.state === 'available' || status.state === 'unknown'

  return (
    <section id="domain" className="section border-y border-line bg-wash">
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        <div className="min-w-0">
          <SectionHeader label="Langkah 2 · Domain" title="Tentukan nama domain bisnis Anda">
            Tulis nama brand tanpa ekstensi, lalu pilih TLD-nya. Sistem langsung mengecek
            ketersediaan dan menyiapkan penyambungan domain saat proses go-live.
          </SectionHeader>

          <div className="mt-8 rounded-xl border border-line-strong bg-white p-5 sm:p-6">
            <label htmlFor="domain-name" className="text-[14px] font-semibold text-ink">
              Nama domain
            </label>

            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <input
                id="domain-name"
                value={order.domainName}
                onChange={handleChange}
                placeholder="namabisnis"
                autoComplete="off"
                autoCapitalize="none"
                inputMode="url"
                spellCheck={false}
                aria-describedby="domain-status"
                className="field h-12 flex-1 px-3.5 font-mono text-[15px]"
              />

              <div
                role="group"
                aria-label="Ekstensi domain"
                className="flex h-12 items-center gap-0.5 rounded-lg border border-line-strong bg-wash p-1"
              >
                {TLD_OPTIONS.map((option) => {
                  const active = option.value === order.tld
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setTld(option.value)}
                      aria-pressed={active}
                      title={option.note}
                      className={`h-full flex-1 rounded-md px-3 font-mono text-[13.5px] font-medium transition-colors sm:flex-none ${
                        active ? 'bg-white text-ink shadow-sm ring-1 ring-line-strong' : 'text-mute hover:text-ink'
                      }`}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <p className="mt-2 text-[13px] text-mute">
              Ekstensi {order.tld}:{' '}
              <span className="text-body">
                {TLD_OPTIONS.find((option) => option.value === order.tld)?.note ?? '—'}
              </span>
            </p>

            <div
              id="domain-status"
              aria-live="polite"
              className={`mt-4 flex items-start gap-2.5 rounded-lg border px-3.5 py-3 text-[14px] leading-snug transition-colors ${statusStyles[status.state]}`}
            >
              <StatusIcon
                className={`mt-0.5 h-4 w-4 shrink-0 ${status.state === 'checking' ? 'animate-spin' : ''}`}
                strokeWidth={status.state === 'available' ? 3 : 2}
              />
              <span>
                {status.state === 'idle' && 'Mulai ketik nama domain untuk cek ketersediaan otomatis.'}
                {status.state === 'invalid' && status.message}
                {status.state === 'checking' && 'Mengecek langsung ke registry domain (RDAP)…'}
                {status.state === 'available' && status.message}
                {status.state === 'taken' && status.message}
                {status.state === 'unknown' && status.message}
              </span>
            </div>

            {status.state === 'taken' && status.suggestions.length > 0 && (
              <div className="mt-4">
                <p className="text-[13px] font-semibold text-ink">Rekomendasi tersedia</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {status.suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => {
                        const detected = [...TLD_OPTIONS]
                          .sort((a, b) => b.value.length - a.value.length)
                          .find((option) => suggestion.endsWith(option.value))
                        if (!detected) return
                        setTld(detected.value)
                        setDomainName(suggestion.slice(0, -detected.value.length))
                      }}
                      className="rounded-md border border-line-strong bg-white px-3 py-1.5 font-mono text-[13px] text-ink transition-colors hover:border-ink/40 hover:bg-wash"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => scrollToSection('katalog')}
              disabled={!canContinue}
              className={`btn btn-lg mt-5 w-full ${canContinue ? 'btn-primary' : 'btn-disabled'}`}
            >
              Lanjut: Pilih Desain & Tema
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-3 text-[12.5px] leading-relaxed text-mute">
              Ketersediaan dicek real-time ke registry resmi (.com/.net: Verisign, .id/.co.id: PANDI).
              Verifikasi final tetap dilakukan tim kami saat aktivasi.
            </p>
          </div>
        </div>

        <aside className="min-w-0 lg:border-l lg:border-line lg:pl-16 lg:pt-8">
          <h3 className="text-[18px] font-semibold text-ink">
            Sudah termasuk dalam semua paket
          </h3>
          <p className="mt-1 text-[14px] text-mute">Tanpa biaya tambahan di muka</p>

          <ul className="mt-5 space-y-3">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[15px] leading-snug text-body">
                <Check className="mt-[3px] h-4 w-4 shrink-0 text-ink" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-line pt-6">
            <p className="text-[15px] font-semibold text-ink">Sudah punya domain sendiri?</p>
            <p className="mt-1.5 text-[14px] leading-relaxed text-body">
              Tidak masalah. Cukup siapkan akses DNS-nya, tim kami yang melakukan pointing ke
              website FRWeb tanpa downtime.
            </p>
          </div>

          <div className="mt-6 border-t border-line pt-6">
            <p className="text-[13px] text-mute">Domain terpilih</p>
            <p className="mt-1 truncate font-mono text-[17px] font-medium text-ink">{preview || '—'}</p>
          </div>
        </aside>
      </div>
    </section>
  )
}
