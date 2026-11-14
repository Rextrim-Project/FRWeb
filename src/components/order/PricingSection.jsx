import { ArrowRight, Check, Minus } from '../../lib/icons'
import { PLANS } from '../../data/plans'
import { PAYMENT_ADDON } from '../../data/paymentAddon'
import { formatIDR } from '../../lib/format'
import { scrollToSection, useOrder } from '../../context/OrderContext'
import SectionHeader from '../catalog/SectionHeader'
import PaymentGatewayToggle from './PaymentGatewayToggle'

const ASSURANCES = [
  'Invoice resmi & pembayaran transfer/QRIS',
  'Garansi revisi konten 7 hari',
  'Domain & hosting atas nama Anda',
]

function PlanCard({ plan }) {
  const { order, selectPlan } = useOrder()
  const selected = order.planId === plan.id
  const isCustom = plan.price === null

  return (
    <div
      className={`relative flex flex-col rounded-xl border bg-white p-6 transition-colors ${
        selected ? 'border-ink ring-1 ring-ink' : 'border-line-strong hover:border-ink/40'
      }`}
    >
      <button
        type="button"
        onClick={() => selectPlan(plan.id)}
        aria-pressed={selected}
        aria-label={`Pilih ${plan.name}`}
        className="absolute inset-0 z-0 cursor-pointer rounded-xl"
      />

      <div className="pointer-events-none relative z-10 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[18px] font-semibold text-ink">{plan.name}</h3>
          <span
            aria-hidden="true"
            className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors ${
              selected ? 'border-ink bg-ink text-white' : 'border-line-strong text-transparent'
            }`}
          >
            <Check className="h-3 w-3" strokeWidth={3.5} />
          </span>
        </div>

        <p className="mt-1.5 text-[14px] leading-snug text-mute">
          {plan.recommended && (
            <span className="mr-2 rounded bg-brand-wash px-1.5 py-0.5 text-[11.5px] font-semibold tracking-wide text-brand">
              {plan.badge}
            </span>
          )}
          {plan.tagline}
        </p>

        <div className="mt-6">
          {isCustom ? (
            <p className="text-[26px] font-semibold leading-none tracking-[-0.02em] text-ink">Hubungi WhatsApp</p>
          ) : (
            <p className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
              <span className="text-[30px] font-semibold leading-none tracking-[-0.02em] text-ink tabular-nums">
                {formatIDR(plan.price)}
              </span>
              <span className="text-[13.5px] text-mute">{plan.priceSuffix}</span>
            </p>
          )}
        </div>

        <p className="mt-4 text-[13.5px] leading-relaxed text-body">
          <span className="font-semibold text-ink">Cocok untuk: </span>
          {plan.bestFor}
        </p>

        <ul className="mt-5 flex-1 space-y-2.5 border-t border-line pt-5">
          {plan.specs.map((spec) => (
            <li key={spec} className="flex items-start gap-2.5 text-[14px] leading-snug text-body">
              <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-ink" strokeWidth={2.5} />
              {spec}
            </li>
          ))}
          {plan.notIncluded.map((spec) => (
            <li key={spec} className="flex items-start gap-2.5 text-[14px] leading-snug text-faint">
              <Minus className="mt-[3px] h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
              <span>
                <span className="sr-only">Tidak termasuk: </span>
                {spec}
              </span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => {
            selectPlan(plan.id)
            scrollToSection('domain')
          }}
          className={`btn pointer-events-auto mt-6 w-full ${selected ? 'btn-primary' : 'btn-secondary'}`}
        >
          {selected ? (
            <>
              Lanjut dengan paket ini
              <ArrowRight className="h-4 w-4" />
            </>
          ) : isCustom ? (
            'Konsultasi Custom'
          ) : (
            'Pilih Paket Ini'
          )}
        </button>
      </div>
    </div>
  )
}

export default function PricingSection() {
  const { plan, includePaymentGateway, orderTotal } = useOrder()
  const isCustomPlan = plan.price === null
  const liveTotal = isCustomPlan
    ? 'Custom — penawaran terpisah'
    : formatIDR(orderTotal)

  return (
    <section id="paket" className="section bg-white">
      <div className="container-page">
        <SectionHeader
          label="Langkah 1 · Paket"
          title="Pilih paket sesuai kebutuhan website Anda"
          aside={
            <a href="#domain" className="link-quiet inline-flex items-center gap-1.5">
              Sudah tahu paketnya? Lanjut ke domain
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          }
        >
          Harga setup sekali bayar, sudah termasuk aktivasi, SSL, dan penyambungan domain. Tidak
          ada biaya tersembunyi, dan Anda bisa upgrade kapan saja.
        </SectionHeader>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Add-on opsional: Payment Gateway & QRIS Otomatis (Step 1) */}
        <div id="addon-pembayaran" className="mt-12 scroll-mt-24">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="text-[18px] font-semibold text-ink">
              Add-on opsional
              <span className="ml-2 text-[14px] font-normal text-mute">tidak wajib</span>
            </h3>
            <p className="text-[14px] text-mute">
              {plan.name}
              {includePaymentGateway ? ' + add-on QRIS' : ' tanpa add-on'}
              <span className="mx-1.5">=</span>
              <span data-pricing-live-total className="font-semibold text-ink tabular-nums">
                {liveTotal}
              </span>
            </p>
          </div>

          <PaymentGatewayToggle className="mt-4" />

          <p className="mt-3 text-[13px] leading-relaxed text-mute">
            {PAYMENT_ADDON.footnote} Tanpa add-on, seluruh paket sudah termasuk checkout via WhatsApp
            dengan konfirmasi pembayaran manual oleh tim FRWeb.
          </p>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-6">
          {ASSURANCES.map((item) => (
            <li key={item} className="inline-flex items-center gap-2 text-[14px] text-body">
              <Check className="h-4 w-4 text-ink" strokeWidth={2.5} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
