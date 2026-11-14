import { useEffect, useMemo, useState } from 'react'
import { ChevronDown, Search, X } from '../../lib/icons'
import { CATEGORIES, TEMPLATES, SEARCH_INDEX, countByCategory } from '../../data'
import TemplateCard from './TemplateCard'

/** Jumlah kartu yang tampil sebelum tombol "template lainnya" ditekan. */
const INITIAL_VISIBLE = 12

const CATEGORY_NOTES = {
  all: 'Semua template unggulan FRWeb — tiap kategori punya varian visual yang berlawanan.',
  sports: 'Booking lapangan, kelas, dan venue. Bandingkan gaya Neon Athletic vs Luxury Country Club.',
  fnb: 'Reservasi meja, kalkulator catering, dan toko D2C. Dari warm dining sampai wabi-sabi.',
  service: 'Booking jasa, kalkulator produksi, dan agency engagement. Brutalist grid sampai luxe editorial.',
  retail: 'Katalog produk fisik, RFQ grosir, dan toko D2C. Editorial bersih atau cyberpunk spec grid.',
  events: 'Travel, wedding organizer, dan event organizer. Hero destinasi sampai portfolio gathering.',
}

/**
 * Isi katalog template (pencarian, filter kategori, grid kartu).
 * Wrapper section + judul langkah dikelola oleh DesignModeSection.
 */
export default function CatalogSection({
  category,
  onCategoryChange,
  query,
  onQueryChange,
  onSelect,
  selectedTemplateId,
  onRequestCustom,
}) {
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return TEMPLATES.filter((template) => {
      const matchesCategory = category === 'all' || template.category === category
      const matchesQuery = !needle || SEARCH_INDEX[template.id].includes(needle)
      return matchesCategory && matchesQuery
    })
  }, [category, query])

  const reset = () => {
    onCategoryChange('all')
    onQueryChange('')
  }

  const [showAll, setShowAll] = useState(false)
  // Ganti kategori atau kata kunci → kembali ke 12 kartu pertama.
  useEffect(() => {
    setShowAll(false)
  }, [category, query])

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE)
  const hiddenCount = filtered.length - visible.length
  const canToggle = filtered.length > INITIAL_VISIBLE

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.map((item) => {
            const active = item.id === category
            const total = countByCategory(item.id)
            return (
              <button
                key={item.id}
                type="button"
                data-filter-tab={item.id}
                onClick={() => onCategoryChange(item.id)}
                aria-pressed={active}
                className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-[14px] font-medium transition-colors ${
                  active
                    ? 'border-ink bg-ink text-white'
                    : 'border-line-strong bg-white text-body hover:border-ink/40 hover:text-ink'
                }`}
              >
                {item.label}
                <span className={`text-[13px] tabular-nums ${active ? 'text-white/70' : 'text-mute'}`}>{total}</span>
              </button>
            )
          })}
        </div>

        <div className="w-full lg:w-[320px]">
          <label htmlFor="cari-template" className="sr-only">
            Cari template
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mute" />
            <input
              id="cari-template"
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Cari template, gaya, atau industri"
              className="field h-10 pl-10 pr-10 text-[14.5px] [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => onQueryChange('')}
                aria-label="Hapus pencarian"
                className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-mute hover:bg-wash hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p className="text-[14px] text-mute">{CATEGORY_NOTES[category]}</p>
        <p className="text-[14px] text-mute" aria-live="polite">
          Menampilkan <span className="font-semibold text-ink">{visible.length}</span> dari{' '}
          {filtered.length} template
        </p>
      </div>

      {filtered.length > 0 ? (
        <>
          <div id="grid-template-katalog" className="mt-6 grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelect={onSelect}
                selected={template.id === selectedTemplateId}
              />
            ))}
          </div>

          {canToggle && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                data-show-all-templates
                onClick={() => setShowAll((value) => !value)}
                aria-expanded={showAll}
                aria-controls="grid-template-katalog"
                className="btn btn-secondary"
              >
                {showAll ? (
                  <>
                    Tampilkan 12 template pertama
                    <ChevronDown className="h-4 w-4 rotate-180" />
                  </>
                ) : (
                  <>
                    Lihat {hiddenCount} template lainnya
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="mt-8 rounded-xl border border-dashed border-line-strong px-6 py-16 text-center">
          <p className="text-[18px] font-semibold text-ink">Template tidak ditemukan</p>
          <p className="mx-auto mt-2 max-w-sm text-[14.5px] leading-relaxed text-mute">
            Coba kata kunci lain seperti “booking”, “catering”, “brutalist”, atau “spec”.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button type="button" onClick={reset} className="btn btn-secondary">
              Reset filter
            </button>
            {onRequestCustom && (
              <button type="button" onClick={onRequestCustom} className="btn btn-primary">
                Buatkan desain kustom
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
