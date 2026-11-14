import { Check, Info } from '../../lib/icons'
import { formatIDR } from '../../lib/format'
import { PAYMENT_ADDON } from '../../data/paymentAddon'
import { useOrder } from '../../context/OrderContext'

/**
 * Toggle add-on Payment Gateway & QRIS Otomatis.
 * Dipakai di Step 1 (di bawah pilihan paket) dan bisa dipakai ulang di
 * ringkasan order. Seluruh kartu adalah satu tombol switch agar target
 * klik besar di mobile, tanpa kontrol bersarang.
 */
export default function PaymentGatewayToggle({ className = '', compact = false }) {
  const { includePaymentGateway, togglePaymentGateway } = useOrder()

  return (
    <button
      type="button"
      role="switch"
      aria-checked={includePaymentGateway}
      aria-label={`Add-on ${PAYMENT_ADDON.label}`}
      data-payment-addon={includePaymentGateway ? 'on' : 'off'}
      onClick={togglePaymentGateway}
      className={`group w-full rounded-xl border text-left transition-colors ${
        compact ? 'p-4' : 'p-5 sm:p-6'
      } ${
        includePaymentGateway ? 'border-ink bg-brand-wash/50 ring-1 ring-ink' : 'border-line-strong bg-white hover:border-ink/40'
      } ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <p className={`font-semibold text-ink ${compact ? 'text-[14.5px]' : 'text-[16px]'}`}>
            {PAYMENT_ADDON.label}
          </p>
          <p className="mt-1 text-[13.5px] text-mute">
            <span className="font-semibold text-ink">{PAYMENT_ADDON.priceLabel}</span>
            <span aria-hidden="true"> · </span>
            Opsional
          </p>

          <p className="mt-3 text-[14px] leading-relaxed text-body">{PAYMENT_ADDON.description}</p>

          {!compact && (
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
              {PAYMENT_ADDON.includes.map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5 text-[13.5px] text-body">
                  <Check className="h-3.5 w-3.5 shrink-0 text-ink" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          )}

          <p className="mt-3 text-[13px] text-mute">
            Provider: <span className="text-body">{PAYMENT_ADDON.providers.join(', ')}</span>
          </p>
        </div>

        <span
          aria-hidden="true"
          className={`mt-0.5 flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 ${
            includePaymentGateway ? 'bg-brand' : 'bg-line-strong'
          }`}
        >
          <span
            className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
              includePaymentGateway ? 'translate-x-5' : ''
            }`}
          />
        </span>
      </div>

      <p
        data-payment-addon-note
        className={`mt-4 flex items-start gap-2 rounded-lg px-3 py-2.5 text-[13px] leading-snug ${
          includePaymentGateway ? 'bg-white text-ink ring-1 ring-line' : 'bg-wash text-body'
        }`}
      >
        {includePaymentGateway ? (
          <>
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" strokeWidth={3} />
            <span>
              Ditambahkan <span className="font-semibold">+{formatIDR(PAYMENT_ADDON.price)}</span> ke total
              order. Invoice dirinci terpisah: setup paket + setup gateway.
            </span>
          </>
        ) : (
          <>
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mute" />
            <span>{PAYMENT_ADDON.fallbackNote}</span>
          </>
        )}
      </p>

      <p className="mt-3 text-[12.5px] leading-relaxed text-mute">{PAYMENT_ADDON.disclaimer}</p>
    </button>
  )
}
