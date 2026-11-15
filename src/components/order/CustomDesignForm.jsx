import { ArrowRight, Check } from '../../lib/icons'
import { CUSTOM_FEATURES, CUSTOM_NOTES_MAX, CUSTOM_TIMELINE } from '../../data/customFeatures'
import { scrollToSection, useOrder } from '../../context/OrderContext'

function StatusDot({ done }) {
  return (
    <span
      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
        done ? 'border-ok bg-ok text-white' : 'border-line-strong text-transparent'
      }`}
      aria-hidden="true"
    >
      <Check className="h-3 w-3" strokeWidth={3.5} />
    </span>
  )
}

export default function CustomDesignForm() {
  const {
    customBrief,
    setCustomReference,
    setCustomNotes,
    toggleCustomFeature,
    resetCustomBrief,
    isCustomDesignReady,
    plan,
    domain,
    designLocked,
  } = useOrder()

  const selectedFeatures = customBrief.features
  const notesLength = customBrief.notes.length

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
      {/* ── Form brief ─────────────────────────────────────────────── */}
      <div className="min-w-0">
        <h3 className="text-[20px] font-semibold text-ink">Brief singkat kebutuhan custom</h3>
        <p className="mt-1.5 max-w-2xl text-[14.5px] leading-relaxed text-body">
          Kami tidak akan memakai template katalog. Tim desain menyusun konsep baru dari nol
          berdasarkan brief di bawah ini.
        </p>

        {/* 1. Referensi */}
        <div className="mt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <label htmlFor="brief-referensi" className="text-[14.5px] font-semibold text-ink">
              Referensi desain / website impian
            </label>
            <span className="text-[13px] text-mute">URL atau nama website</span>
          </div>
          <input
            id="brief-referensi"
            value={customBrief.reference}
            onChange={(event) => setCustomReference(event.target.value)}
            placeholder="https://website-kompetitor.com atau nama brand favorit"
            className="field mt-2 h-12 px-3.5"
          />
          <p className="mt-2 text-[13px] leading-relaxed text-mute">
            Boleh lebih dari satu, pisahkan dengan koma. Yang kami pelajari: struktur halaman, gaya
            visual, dan alur yang Anda sukai, bukan menjiplak mentah.
          </p>
        </div>

        {/* 2. Fitur khusus */}
        <fieldset className="mt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <legend className="text-[14.5px] font-semibold text-ink">Kebutuhan fitur spesifik</legend>
            <span className="text-[13px] text-mute">
              {selectedFeatures.length} dipilih · opsional, bisa lebih dari satu
            </span>
          </div>

          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {CUSTOM_FEATURES.map((feature) => {
              const active = selectedFeatures.includes(feature.id)
              return (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => toggleCustomFeature(feature.id)}
                  aria-pressed={active}
                  data-feature-option={feature.id}
                  className={`flex items-start gap-3 rounded-lg border p-3.5 text-left transition-colors ${
                    active ? 'border-brand bg-brand-wash ring-2 ring-brand' : 'border-line-strong bg-white hover:border-ink/40'
                  }`}
                >
                  <span
                    className={`mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded border transition-colors ${
                      active ? 'border-brand bg-brand text-white' : 'border-line-strong bg-white text-transparent'
                    }`}
                    aria-hidden="true"
                  >
                    <Check className="h-3 w-3" strokeWidth={3.5} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14.5px] font-semibold text-ink">{feature.label}</span>
                    <span className="mt-0.5 block text-[13.5px] leading-snug text-mute">{feature.desc}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </fieldset>

        {/* 3. Catatan */}
        <div className="mt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <label htmlFor="brief-catatan" className="text-[14.5px] font-semibold text-ink">
              Catatan &amp; kebutuhan bisnis
            </label>
            <span
              className={`text-[13px] tabular-nums ${
                notesLength > CUSTOM_NOTES_MAX * 0.9 ? 'font-semibold text-warn' : 'text-mute'
              }`}
            >
              {notesLength}/{CUSTOM_NOTES_MAX}
            </span>
          </div>
          <textarea
            id="brief-catatan"
            value={customBrief.notes}
            onChange={(event) => setCustomNotes(event.target.value.slice(0, CUSTOM_NOTES_MAX))}
            rows={4}
            placeholder="Misal: 3 cabang kafe, butuh halaman menu per cabang, pesanan online dengan pickup, dan dashboard laporan harian untuk owner."
            className="field mt-2 resize-y px-3.5 py-3 leading-relaxed"
          />
        </div>

        {/* Estimasi pengerjaan */}
        <div className="mt-8 border-l-2 border-ink pl-4">
          <p className="text-[15px] font-semibold text-ink">Estimasi pengerjaan ± {CUSTOM_TIMELINE}</p>
          <p className="mt-1.5 text-[14px] leading-relaxed text-body">
            Dihitung sejak brief disetujui &amp; DP diterima. Termasuk wireframe, desain UI,
            development fitur khusus, QA lintas perangkat, dan 2x revisi mayor. Proyek dengan
            integrasi POS/ERP bisa lebih lama; estimasi final menyusul setelah diskusi teknis.
          </p>
        </div>
      </div>

      {/* ── Ringkasan brief (sticky) ────────────────────────────────── */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-xl border border-line-strong bg-white p-5 sm:p-6">
          <h3 className="text-[16px] font-semibold text-ink">Ringkasan brief</h3>

          <dl className="mt-4 space-y-2.5 text-[14px]">
            <div className="flex items-start justify-between gap-3">
              <dt className="text-mute">Paket</dt>
              <dd className="text-right font-medium text-ink">{plan.name}</dd>
            </div>
            <div className="flex items-start justify-between gap-3">
              <dt className="text-mute">Domain</dt>
              <dd className={`truncate text-right font-medium ${domain ? 'text-ink' : 'text-faint'}`}>
                {domain || 'belum diisi'}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-3">
              <dt className="text-mute">Mode desain</dt>
              <dd className="text-right font-medium text-ink">Custom Design</dd>
            </div>
            <div className="flex items-start justify-between gap-3">
              <dt className="text-mute">Estimasi</dt>
              <dd className="text-right font-medium text-ink">{CUSTOM_TIMELINE}</dd>
            </div>
          </dl>

          <div className="mt-5 space-y-2.5 border-t border-line pt-5">
            <p className="flex items-center gap-2.5 text-[14px] text-body">
              <StatusDot done={customBrief.reference.trim().length > 0} />
              Referensi web
            </p>
            <p className="flex items-center gap-2.5 text-[14px] text-body">
              <StatusDot done={selectedFeatures.length > 0} />
              Fitur khusus ({selectedFeatures.length})
            </p>
            <p className="flex items-center gap-2.5 text-[14px] text-body">
              <StatusDot done={customBrief.notes.trim().length > 0} />
              Catatan bisnis <span className="text-mute">(opsional)</span>
            </p>
          </div>

          {selectedFeatures.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-5">
              {CUSTOM_FEATURES.filter((feature) => selectedFeatures.includes(feature.id)).map(
                (feature) => (
                  <span key={feature.id} className="rounded-md bg-wash px-2 py-1 text-[13px] text-ink">
                    {feature.label}
                  </span>
                ),
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => scrollToSection('ringkasan')}
            disabled={!isCustomDesignReady}
            className={`btn mt-6 w-full ${isCustomDesignReady ? 'btn-primary' : 'btn-disabled'}`}
          >
            Lanjut ke ringkasan
            <ArrowRight className="h-4 w-4" />
          </button>

          {!isCustomDesignReady && (
            <p className="mt-3 text-[13px] leading-relaxed text-mute">
              Isi minimal satu: URL referensi atau centang fitur khusus yang dibutuhkan.
            </p>
          )}

          {designLocked && (
            <p className="mt-3 rounded-lg bg-wash px-3 py-2.5 text-[13px] leading-relaxed text-body">
              Paket {plan.name} otomatis memakai jalur Custom Design. Template katalog tidak
              tersedia untuk paket ini.
            </p>
          )}

          <button type="button" onClick={resetCustomBrief} className="link-quiet mt-4 block w-full text-center">
            Kosongkan brief
          </button>
        </div>
      </aside>
    </div>
  )
}
