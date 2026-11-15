import { Check, CreditCard, Globe, Layers, Rocket } from '../../lib/icons'
import { scrollToSection, useOrder } from '../../context/OrderContext'

export const ORDER_STEPS = [
  {
    id: 'paket',
    number: '01',
    title: 'Pilih Paket',
    short: 'Paket',
    desc: 'Pilih paket sesuai skala bisnis Anda',
    icon: CreditCard,
    target: 'paket',
  },
  {
    id: 'domain',
    number: '02',
    title: 'Tentukan Domain',
    short: 'Domain',
    desc: 'Cek & kunci nama domain bisnis',
    icon: Globe,
    target: 'domain',
  },
  {
    id: 'desain',
    number: '03',
    title: 'Pilih Desain',
    short: 'Desain',
    desc: 'Template instan atau custom design',
    icon: Layers,
    target: 'katalog',
  },
  {
    id: 'deploy',
    number: '04',
    title: 'Deploy & Go-Live',
    short: 'Deploy',
    desc: 'Aktif 30 menit atau sesuai brief custom',
    icon: Rocket,
    target: 'ringkasan',
  },
]

const RULE = {
  done: 'border-ink',
  active: 'border-brand',
  idle: 'border-line group-hover:border-line-strong',
}

/**
 * Pelacak langkah order: empat kolom dengan garis atas sebagai penanda status.
 * Setiap kolom adalah tombol yang menggulir ke section terkait.
 */
export default function Stepper({ className = '' }) {
  const { order, isDomainReady, isDesignReady, checkoutReady } = useOrder()

  const done = [Boolean(order.planId), isDomainReady, isDesignReady, checkoutReady]
  const activeIndex = done.findIndex((value) => !value)

  return (
    <ol
      aria-label="Alur pemesanan"
      className={`grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4 lg:gap-x-6 ${className}`}
    >
      {ORDER_STEPS.map((step, index) => {
        const isDone = done[index]
        const isActive = index === activeIndex
        const state = isDone ? 'done' : isActive ? 'active' : 'idle'

        return (
          <li key={step.id} className="min-w-0">
            <button
              type="button"
              onClick={() => scrollToSection(step.target)}
              aria-current={isActive ? 'step' : undefined}
              className={`group block w-full border-t-[3px] pt-3.5 text-left transition-colors ${RULE[state]}`}
            >
              <span className="flex items-center gap-2 text-[12.5px]">
                <span className="font-mono text-mute">{step.number}</span>
                {isDone && (
                  <span className="inline-flex items-center gap-1 font-medium text-ok">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    Selesai
                  </span>
                )}
                {isActive && <span className="font-medium text-brand">Berikutnya</span>}
              </span>
              <span
                className={`mt-1.5 block text-[16px] font-semibold ${
                  state === 'idle' ? 'text-body group-hover:text-ink' : 'text-ink'
                }`}
              >
                <span className="hidden sm:inline">{step.title}</span>
                <span className="sm:hidden">{step.short}</span>
              </span>
              <span className="mt-1 hidden text-[13.5px] leading-snug text-mute sm:block">{step.desc}</span>
            </button>
          </li>
        )
      })}
    </ol>
  )
}
