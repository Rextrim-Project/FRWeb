import { ArrowRight, Check, MessageCircle, RotateCcw, ShieldCheck } from '../../lib/icons'
import { formatIDR } from '../../lib/format'
import { CUSTOM_TIMELINE, featureLabels } from '../../data/customFeatures'
import { PAYMENT_ADDON } from '../../data/paymentAddon'
import { scrollToSection, useOrder } from '../../context/OrderContext'
import SectionHeader from '../catalog/SectionHeader'
import PaymentGatewayToggle from './PaymentGatewayToggle'

const TEMPLATE_TIMELINE = [
  {
    title: 'Kirim detail order via WhatsApp',
    desc: 'Pesan otomatis berisi paket, domain, dan tema terkirim ke tim sales FRWeb.',
  },
  {
    title: 'Konfirmasi & pembayaran',
    desc: 'Invoice resmi dikirim, pembayaran via transfer atau QRIS, langsung diverifikasi.',
  },
  {
    title: 'Deploy & website aktif',
    desc: 'Website, SSL, dan tema dipasang otomatis. Website online dalam ± 30 menit.',
  },
]

const CUSTOM_TIMELINE_STEPS = [
  {
    title: 'Kirim brief via WhatsApp',
    desc: 'Pesan otomatis berisi paket, domain, referensi web, dan fitur khusus yang Anda centang.',
  },
  {
    title: 'Konsultasi & penawaran',
    desc: 'Tim FRWeb mempelajari brief, lalu mengirim estimasi biaya, ruang lingkup, dan timeline final.',
  },
  {
    title: 'Desain, development & go-live',
    desc: `Pengerjaan ${CUSTOM_TIMELINE} setelah brief disetujui — termasuk desain, development fitur, QA, dan revisi.`,
  },
]

function SummaryRow({ label, value, action, tone = 'default' }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line py-3.5 last:border-0">
      <div className="min-w-0 flex-1">
        <dt className="text-[13px] text-mute">{label}</dt>
        <dd className={`mt-0.5 truncate text-[15px] font-medium ${tone === 'muted' ? 'text-faint' : 'text-ink'}`}>
          {value}
        </dd>
      </div>
      {action}
    </div>
  )
}

function RowAction({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-0.5 shrink-0 text-[13.5px] font-medium text-brand underline-offset-4 hover:underline"
    >
      {children}
    </button>
  )
}

export default function OrderSection() {
  const {
    plan,
    template,
    domain,
    domainCheck,
    designMode,
    customBrief,
    isTemplateReady,
    isCustomDesignReady,
    checkoutReady,
    waOrderLink,
    resetOrder,
    clearTemplate,
    includePaymentGateway,
    addonPrice,
    orderTotal,
  } = useOrder()

  const isCustom = plan.price === null
  const isCustomMode = designMode === 'custom'
  const totalLabel = isCustom ? 'Custom' : formatIDR(orderTotal)
  const planSubtotalLabel = isCustom ? 'Penawaran terpisah' : formatIDR(plan.price)

  const designValue = isCustomMode
    ? customBrief.features.length > 0
      ? `Custom design — ${customBrief.features.length} fitur khusus`
      : customBrief.reference
        ? 'Custom design — brief terisi sebagian'
        : 'Custom design — brief belum diisi'
    : template
      ? template.name
      : 'Belum dipilih'

  const checklist = [
    {
      id: 'paket',
      target: 'paket',
      label: 'Paket',
      value: `${plan.name}${isCustom ? '' : ` — ${formatIDR(plan.price)}`}`,
      done: true,
    },
    {
      id: 'domain',
      target: 'domain',
      label: 'Nama domain',
      value: domainCheck.state === 'valid' && domain ? domain : 'Belum dipilih',
      done: domainCheck.state === 'valid',
    },
    {
      id: 'desain',
      target: 'katalog',
      label: 'Desain',
      value: designValue,
      done: isCustomMode ? isCustomDesignReady : isTemplateReady,
    },
  ]

  const missing = [
    domainCheck.state !== 'valid' ? 'domain' : null,
    isCustomMode ? (isCustomDesignReady ? null : 'brief desain') : isTemplateReady ? null : 'pilihan template',
  ].filter(Boolean)
  const checkoutLabel = isCustomMode ? 'Kirim Brief via WhatsApp' : 'Proses & Go-Live via WhatsApp'

  return (
    <section id="ringkasan" className="section border-y border-line bg-wash">
      <div className="container-page">
        <SectionHeader
          label="Langkah 4 · Ringkasan"
          title={isCustomMode ? 'Ringkasan brief & rencana pengerjaan' : 'Ringkasan pesanan & go-live 30 menit'}
        >
          {isCustomMode
            ? 'Periksa kembali brief desain Anda. Satu klik akan mengirim detail kebutuhan ke WhatsApp tim FRWeb untuk dihitung estimasi biaya dan timeline-nya.'
            : 'Periksa kembali pilihan Anda. Satu klik akan mengirim detail order ke WhatsApp tim FRWeb, lalu website Anda disiapkan dan aktif dalam ± 30 menit.'}
        </SectionHeader>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-12">
          <div className="min-w-0 space-y-10">
            <div>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[18px] font-semibold text-ink">Kelengkapan order</h3>
                <span className="text-[14px] text-mute">
                  <span className="font-semibold text-ink">{checklist.filter((item) => item.done).length}</span> dari 3
                  siap
                </span>
              </div>

              <ul className="mt-3 divide-y divide-line border-y border-line">
                {checklist.map((item) => (
                  <li key={item.id} className="flex items-center gap-3.5 py-4">
                    <span
                      aria-hidden="true"
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border ${
                        item.done ? 'border-ok bg-ok text-white' : 'border-line-strong bg-white text-transparent'
                      }`}
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={3.5} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-semibold text-ink">{item.label}</p>
                      <p className={`truncate text-[14px] ${item.done ? 'text-body' : 'text-mute'}`}>{item.value}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => scrollToSection(item.target)}
                      className={`btn btn-sm shrink-0 ${item.done ? 'btn-secondary' : 'btn-primary'}`}
                    >
                      {item.done ? 'Ubah' : 'Isi'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[18px] font-semibold text-ink">Setelah checkout</h3>
              <ol className="mt-4 space-y-5">
                {(isCustomMode ? CUSTOM_TIMELINE_STEPS : TEMPLATE_TIMELINE).map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="w-5 shrink-0 pt-0.5 font-mono text-[13px] text-mute">0{index + 1}</span>
                    <div>
                      <p className="text-[15px] font-semibold text-ink">{step.title}</p>
                      <p className="mt-1 text-[14px] leading-relaxed text-body">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <p className="flex items-start gap-2.5 border-t border-line pt-6 text-[14px] leading-relaxed text-body">
              <ShieldCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-ink" strokeWidth={1.75} />
              {isCustomMode
                ? 'Garansi revisi desain 2× dan revisi konten 7 hari setelah website live. Timeline final dikonfirmasi setelah brief disetujui.'
                : 'Garansi revisi konten 7 hari dan uang kembali jika website tidak bisa online dalam 24 jam setelah pembayaran.'}
            </p>
          </div>

          <div className="min-w-0 lg:sticky lg:top-24">
            <div className="rounded-xl border border-line-strong bg-white shadow-[0_16px_40px_-28px_rgba(15,26,43,0.3)]">
              <div className="flex items-baseline justify-between gap-3 rounded-t-xl bg-ink px-5 py-4 sm:px-6">
                <h3 className="text-[18px] font-semibold text-white">Detail pesanan</h3>
                <span className="text-[13.5px] text-silver">
                  Estimasi {isCustomMode ? CUSTOM_TIMELINE : '± 30 menit'}
                </span>
              </div>

              <dl className="px-5 py-1 sm:px-6">
                <SummaryRow
                  label="Paket"
                  value={`${plan.name}${isCustom ? ' — hubungi kami' : ` (${formatIDR(plan.price)})`}`}
                  action={<RowAction onClick={() => scrollToSection('paket')}>Ubah</RowAction>}
                />
                <SummaryRow
                  label="Domain"
                  value={domain || 'Belum dipilih'}
                  tone={domain ? 'default' : 'muted'}
                  action={<RowAction onClick={() => scrollToSection('domain')}>{domain ? 'Ubah' : 'Isi'}</RowAction>}
                />
                {isCustomMode ? (
                  <>
                    <SummaryRow label="Mode desain" value="Custom Design Request (bukan template)" />
                    <SummaryRow
                      label="Referensi web"
                      value={customBrief.reference.trim() || 'Belum diisi'}
                      tone={customBrief.reference.trim() ? 'default' : 'muted'}
                      action={
                        <RowAction onClick={() => scrollToSection('katalog')}>
                          {customBrief.reference.trim() ? 'Ubah' : 'Isi'}
                        </RowAction>
                      }
                    />
                    <SummaryRow
                      label="Fitur khusus"
                      value={
                        customBrief.features.length > 0
                          ? `${customBrief.features.length} fitur dipilih`
                          : 'Belum dipilih'
                      }
                      tone={customBrief.features.length > 0 ? 'default' : 'muted'}
                      action={
                        <RowAction onClick={() => scrollToSection('katalog')}>
                          {customBrief.features.length > 0 ? 'Ubah' : 'Pilih'}
                        </RowAction>
                      }
                    />
                    {customBrief.features.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 border-b border-line py-3">
                        {featureLabels(customBrief.features).map((label) => (
                          <span key={label} className="rounded-md bg-wash px-2 py-1 text-[13px] text-ink">
                            {label}
                          </span>
                        ))}
                      </div>
                    )}
                    <SummaryRow
                      label="Catatan brief"
                      value={customBrief.notes.trim() ? customBrief.notes.trim() : 'Tidak ada catatan tambahan'}
                      tone={customBrief.notes.trim() ? 'default' : 'muted'}
                    />
                  </>
                ) : (
                  <SummaryRow
                    label="Template"
                    value={template ? template.name : 'Belum dipilih'}
                    tone={template ? 'default' : 'muted'}
                    action={
                      template ? (
                        <RowAction onClick={clearTemplate}>Hapus</RowAction>
                      ) : (
                        <RowAction onClick={() => scrollToSection('katalog')}>Pilih</RowAction>
                      )
                    }
                  />
                )}
                <SummaryRow
                  label="Add-on pembayaran"
                  value={
                    includePaymentGateway
                      ? `Payment Gateway & QRIS Otomatis (+${formatIDR(PAYMENT_ADDON.price)})`
                      : 'Standard checkout WhatsApp (gratis)'
                  }
                  tone={includePaymentGateway ? 'default' : 'muted'}
                  action={
                    <RowAction onClick={() => scrollToSection('addon-pembayaran')}>
                      {includePaymentGateway ? 'Ubah' : 'Tambah'}
                    </RowAction>
                  }
                />
                <SummaryRow
                  label={isCustomMode ? 'Estimasi pengerjaan' : 'Estimasi go-live'}
                  value={
                    isCustomMode
                      ? `${CUSTOM_TIMELINE} setelah brief disetujui`
                      : '30 menit setelah pembayaran'
                  }
                />
              </dl>

              <div className="border-t border-line px-5 py-5 sm:px-6">
                <PaymentGatewayToggle compact />

                <div className="mt-5 space-y-2 text-[14px]">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-body">Paket {plan.name}</span>
                    <span className="font-medium text-ink tabular-nums">{planSubtotalLabel}</span>
                  </div>
                  {includePaymentGateway ? (
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-body">
                        Add-on Payment Gateway &amp; QRIS <span className="text-mute">(one-time)</span>
                      </span>
                      <span className="font-medium text-ink tabular-nums">+{formatIDR(addonPrice)}</span>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-body">Checkout WhatsApp manual</span>
                      <span className="shrink-0 font-medium text-mute">Gratis</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-end justify-between gap-3 border-t border-line pt-4">
                  <div>
                    <p className="text-[13.5px] text-mute">Total setup</p>
                    <p
                      data-order-total
                      className="mt-1 text-[28px] font-semibold leading-none tracking-[-0.02em] text-ink tabular-nums"
                    >
                      {totalLabel}
                    </p>
                  </div>
                  <p className="text-right text-[13px] leading-snug text-mute">
                    Sekali bayar,
                    <br />
                    tanpa biaya tersembunyi
                  </p>
                </div>

                {checkoutReady ? (
                  <a href={waOrderLink} target="_blank" rel="noreferrer" className="btn btn-lg btn-wa mt-5 w-full">
                    <MessageCircle className="h-4.5 w-4.5" />
                    {checkoutLabel}
                  </a>
                ) : (
                  <div className="mt-5">
                    <button type="button" disabled className="btn btn-lg btn-disabled w-full">
                      <MessageCircle className="h-4.5 w-4.5" />
                      {checkoutLabel}
                    </button>
                    <p className="mt-2.5 text-center text-[13.5px] text-body">
                      Lengkapi {missing.join(' & ')} untuk checkout.
                    </p>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <button type="button" onClick={resetOrder} className="link-quiet inline-flex items-center gap-1.5">
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset order
                  </button>
                  <span className="text-[13px] text-mute">Tanpa kartu kredit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line-strong bg-white px-4 py-3 lg:hidden">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] text-mute">
              Total · {isCustomMode ? CUSTOM_TIMELINE : '± 30 menit'}
              {includePaymentGateway && ' · termasuk add-on QRIS'}
            </p>
            <p className="truncate text-[17px] font-semibold leading-tight text-ink tabular-nums">{totalLabel}</p>
          </div>
          {checkoutReady ? (
            <a href={waOrderLink} target="_blank" rel="noreferrer" className="btn btn-wa shrink-0 px-4">
              <MessageCircle className="h-4 w-4" />
              {isCustomMode ? 'Kirim brief' : 'Go-Live'}
            </a>
          ) : (
            <button
              type="button"
              onClick={() => scrollToSection(domainCheck.state === 'valid' ? 'katalog' : 'domain')}
              className="btn btn-primary shrink-0 px-4"
            >
              Lengkapi order
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
