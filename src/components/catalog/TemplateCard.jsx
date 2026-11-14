import { useState } from 'react'
import { ArrowUpRight, Check } from '../../lib/icons'
import { getCategoryLabel } from '../../data'
import { PAYMENT_ADDON, hasPaymentHighlight } from '../../data/paymentAddon'
import { previewLinkProps, previewPath } from '../../lib/router'
import ArchetypeThumb from './ArchetypeThumb'

export default function TemplateCard({ template, onSelect, selected = false }) {
  const { badgeLabel, variantStyle, layoutType, colorPalette = [], thumbnail } = template
  const features = template.features ?? template.bullets ?? []
  const paymentHighlight = hasPaymentHighlight(features)
  const [thumbBroken, setThumbBroken] = useState(!thumbnail)

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-xl border bg-white transition-colors ${
        selected ? 'border-ink ring-1 ring-ink' : 'border-line-strong hover:border-ink/40'
      }`}
    >
      <a
        {...previewLinkProps(template.id)}
        className="relative block aspect-[16/10] w-full overflow-hidden border-b border-line bg-wash"
        aria-label={`Buka live preview ${template.name}`}
      >
        {thumbBroken ? (
          <div className="absolute inset-0">
            <ArchetypeThumb template={template} />
          </div>
        ) : (
          <img
            src={thumbnail}
            alt={`Pratinjau halaman ${template.name}`}
            width="1280"
            height="900"
            loading="lazy"
            decoding="async"
            onError={() => setThumbBroken(true)}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        )}

        {selected && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-ink px-2.5 py-1 text-[12.5px] font-semibold text-white">
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
            Tema terpilih
          </span>
        )}

        <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-ink/90 px-4 py-2.5 text-[13.5px] font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
          Buka live preview
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </a>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[13px] leading-snug text-mute">
            {getCategoryLabel(template.category)}
            <span aria-hidden="true" className="mx-1.5">·</span>
            {layoutType}
          </p>
          {badgeLabel && (
            <span className="shrink-0 rounded bg-wash px-1.5 py-0.5 text-[12px] font-medium text-body">
              {badgeLabel}
            </span>
          )}
        </div>

        <div className="mt-1.5 flex items-start justify-between gap-3">
          <h3 className="text-[19px] font-semibold leading-snug text-ink">{template.name}</h3>
          <div className="mt-1.5 flex shrink-0 items-center gap-1" aria-label="Palet warna template">
            {colorPalette.slice(0, 4).map((color, index) => (
              <span
                key={`${color}-${index}`}
                className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10"
                style={{ background: color }}
                title={color}
              />
            ))}
          </div>
        </div>
        <p className="mt-0.5 text-[13.5px] text-body">{variantStyle}</p>

        <p className="mt-3 text-[14.5px] leading-relaxed text-body">{template.description}</p>

        <ul className="mt-4 flex-1 space-y-2">
          {features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-[14px] leading-snug text-body">
              <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-ink" strokeWidth={2.5} />
              {feature}
            </li>
          ))}
        </ul>

        {paymentHighlight && (
          <p data-payment-footnote className="mt-3 text-[12.5px] leading-snug text-mute">
            *{PAYMENT_ADDON.footnote}
          </p>
        )}

        <p className="mt-4 border-t border-line pt-4 text-[13.5px] leading-snug text-body">
          <span className="text-mute">Cocok untuk </span>
          {template.bestFor}
        </p>

        {/* Satu paket = dua antarmuka (customer + admin) */}
        <a
          href={`${previewPath(template.id)}?view=admin`}
          title="Buka Dashboard Admin template ini"
          className="mt-2 inline-flex items-center gap-1 self-start text-[13.5px] font-medium text-brand underline-offset-4 hover:underline"
        >
          Termasuk dashboard admin
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <a {...previewLinkProps(template.id)} title="Live Preview" className="btn btn-sm btn-secondary h-10">
            Live Demo
          </a>
          <button
            type="button"
            onClick={() => onSelect(template)}
            aria-pressed={selected}
            className={`btn btn-sm h-10 ${selected ? 'border border-ink bg-white text-ink' : 'btn-primary'}`}
          >
            {selected && <Check className="h-4 w-4" strokeWidth={3} />}
            {selected ? 'Tema Terpilih' : 'Pilih Tema Ini'}
          </button>
        </div>
      </div>
    </article>
  )
}
