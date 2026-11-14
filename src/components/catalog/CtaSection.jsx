import { ArrowRight, Check, MessageCircle } from '../../lib/icons'
import { WA_CONSULT } from '../../lib/format'
import { scrollToSection, useOrder } from '../../context/OrderContext'

const POINTS = [
  'Website aktif di domain Anda dalam 30 menit',
  'SSL, hosting, dan tema sudah terpasang',
  'Pendampingan konten via WhatsApp',
]

const GUARANTEES = [
  { label: 'Go-live ± 30 menit', note: 'Setelah pembayaran terkonfirmasi' },
  { label: 'Domain, SSL & hosting beres', note: 'Tidak ada biaya tersembunyi' },
  { label: 'Pendampingan 1-on-1', note: 'Langsung ke tim, bukan bot' },
]

export default function CtaSection() {
  const { checkoutReady, waOrderLink, isDomainReady, isDesignReady } = useOrder()

  // Order belum lengkap → tombol mengarah ke langkah pertama yang masih kosong.
  const nextTarget = !isDomainReady ? 'domain' : !isDesignReady ? 'katalog' : 'ringkasan'

  return (
    <section className="bg-ink px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
          <div>
            <h2 className="max-w-2xl text-[30px] font-semibold leading-[1.1] tracking-[-0.022em] sm:text-[42px]">
              Website resmi bisnis Anda bisa online sebelum makan siang.
            </h2>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/70">
              Pilih paket, kunci domain, tentukan tema, sisanya kami yang kerjakan. Tidak perlu tim
              IT, tidak perlu menunggu antrean pengembangan.
            </p>
            <ul className="mt-6 space-y-2">
              {POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-[15px] text-white/85">
                  <Check className="mt-[3px] h-4 w-4 shrink-0 text-white" strokeWidth={2.5} />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex flex-col gap-3">
              {checkoutReady ? (
                <a href={waOrderLink} target="_blank" rel="noreferrer" className="btn btn-lg btn-wa">
                  <MessageCircle className="h-4.5 w-4.5" />
                  Proses &amp; Go-Live via WhatsApp
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => scrollToSection(nextTarget)}
                  className="btn btn-lg bg-white text-ink hover:bg-white/90"
                >
                  Lanjutkan order
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}

              <a
                href={WA_CONSULT}
                target="_blank"
                rel="noreferrer"
                className="btn btn-lg border border-white/25 text-white hover:bg-white/10"
              >
                Konsultasi Dulu
              </a>
            </div>
            <p className="mt-3 text-[13.5px] text-white/55">
              {checkoutReady
                ? 'Pesanan Anda sudah lengkap, lanjut konfirmasi lewat WhatsApp.'
                : 'Belum lengkap? Tombol di atas mengarahkan ke langkah yang tersisa.'}
            </p>
          </div>
        </div>

        <dl className="mt-14 grid gap-x-10 gap-y-6 border-t border-white/15 pt-8 sm:grid-cols-3">
          {GUARANTEES.map(({ label, note }) => (
            <div key={label}>
              <dt className="text-[16px] font-semibold text-white">{label}</dt>
              <dd className="mt-1 text-[14px] text-white/60">{note}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
