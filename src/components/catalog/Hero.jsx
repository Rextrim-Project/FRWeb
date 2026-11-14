import { ArrowRight, Check, Star } from '../../lib/icons'
import { scrollToSection, useOrder } from '../../context/OrderContext'
import { TEMPLATES } from '../../data'
import HeroShowcase from './HeroShowcase'
import { openPreviewRoute } from '../../lib/router'
import Stepper from '../order/Stepper'

const VALUES = [
  'Tanpa urusan teknis, tanpa coding',
  'SSL, domain, dan hosting disiapkan',
  'Web customer dan dashboard admin di setiap paket',
  'Online hari ini, bukan minggu depan',
]

const STATS = [
  { value: '30 menit', label: 'Setup sampai online' },
  { value: `${TEMPLATES.length}`, label: 'Template, 5 kategori industri' },
  { value: '4', label: 'Pilihan paket' },
  { value: '0%', label: 'Potongan penjualan' },
]

const SHOWCASE_IDS = [
  'padel-futsal-master',
  'quadra-coffee-shop',
  'sinartrans-customer',
  'fine-wo',
]

const SHOWCASE_TEMPLATES = SHOWCASE_IDS.map((id) => TEMPLATES.find((template) => template.id === id)).filter(
  Boolean,
)

export default function Hero() {
  const { completedSteps } = useOrder()

  const openFullscreenPreview = (template) => {
    if (template?.id) openPreviewRoute(template.id)
  }

  return (
    <section id="top" className="bg-white px-4 text-ink sm:px-6 lg:px-8">
      <div className="container-page grid items-center gap-12 pb-14 pt-10 sm:pt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:pb-20 lg:pt-20">
        <div className="min-w-0">
          <p className="text-[14px] font-medium text-brand">Website instan untuk pemilik bisnis</p>

          <h1 className="mt-4 text-[38px] font-semibold leading-[1.04] tracking-[-0.028em] text-ink sm:text-[52px] xl:text-[60px]">
            Website bisnis Anda online dalam 30&nbsp;menit.
          </h1>

          <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-body">
            Pilih paket, tentukan domain, lalu pilih template atau ajukan desain custom. Hosting,
            SSL, dan instalasi kami yang urus, jadi website resmi bisnis Anda langsung bisa diakses
            pelanggan.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button type="button" onClick={() => scrollToSection('paket')} className="btn btn-lg btn-primary">
              Mulai dari pilih paket
              <ArrowRight className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => scrollToSection('katalog')} className="btn btn-lg btn-secondary">
              Lihat {TEMPLATES.length} template
            </button>
          </div>

          <ul className="mt-8 grid max-w-xl gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {VALUES.map((value) => (
              <li key={value} className="flex items-start gap-2.5 text-[14.5px] leading-snug text-body">
                <Check className="mt-[3px] h-4 w-4 shrink-0 text-ink" strokeWidth={2.5} />
                {value}
              </li>
            ))}
          </ul>

          <p className="mt-7 flex items-center gap-2 text-[14px] text-mute">
            <Star className="h-4 w-4 fill-[#E0A100] text-[#E0A100]" aria-hidden="true" />
            <span>
              <span className="font-semibold text-ink">4.9</span> dari 120+ pemilik bisnis
            </span>
          </p>
        </div>

        <div className="mx-auto w-full min-w-0 max-w-[560px] lg:max-w-none">
          <HeroShowcase templates={SHOWCASE_TEMPLATES} onOpenFullscreen={openFullscreenPreview} />
        </div>
      </div>

      <dl className="container-page grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line py-8 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <dt className="text-[14px] text-mute">{stat.label}</dt>
            <dd className="mt-1 text-[26px] font-semibold leading-none tracking-[-0.02em] text-ink">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="container-page border-t border-line pb-14 pt-8 lg:pb-16">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-[15px] font-semibold text-ink">
            Alur order
            <span className="ml-2 hidden font-normal text-mute sm:inline">
              Klik langkah untuk langsung ke bagiannya.
            </span>
          </h2>
          <p className="text-[14px] text-mute">
            <span className="font-semibold text-ink">{completedSteps}</span> dari 4 langkah siap
          </p>
        </div>
        <Stepper />
      </div>
    </section>
  )
}
