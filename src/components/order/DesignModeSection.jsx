import { ArrowRight, Check, Lock } from '../../lib/icons'
import { TEMPLATES } from '../../data'
import { useOrder } from '../../context/OrderContext'
import CatalogSection from '../catalog/CatalogSection'
import SectionHeader from '../catalog/SectionHeader'
import CustomDesignForm from './CustomDesignForm'

function ModeTab({ active, disabled, title, meta, onClick, controls, id }) {
  return (
    <button
      type="button"
      role="tab"
      id={id}
      aria-selected={active}
      aria-controls={controls}
      disabled={disabled}
      onClick={onClick}
      className={`flex items-start gap-3 rounded-xl border bg-white p-4 text-left transition-colors sm:p-5 ${
        active ? 'border-ink ring-1 ring-ink' : 'border-line-strong hover:border-ink/40'
      } ${disabled ? 'cursor-not-allowed opacity-50 hover:border-line-strong' : ''}`}
    >
      <span
        aria-hidden="true"
        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors ${
          active ? 'border-ink bg-ink text-white' : 'border-line-strong text-transparent'
        }`}
      >
        <Check className="h-3 w-3" strokeWidth={3.5} />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-2 text-[16px] font-semibold text-ink">
          {title}
          {disabled && <Lock className="h-3.5 w-3.5 shrink-0 text-mute" />}
        </span>
        <span className="mt-1 block text-[14px] leading-snug text-mute">{meta}</span>
      </span>
    </button>
  )
}

export default function DesignModeSection({
  category,
  onCategoryChange,
  query,
  onQueryChange,
  onSelect,
  onRequestCustom,
}) {
  const { designMode, setDesignMode, designLocked, template, plan, isDesignReady } = useOrder()

  const statusText = isDesignReady
    ? designMode === 'custom'
      ? 'Brief custom siap dikirim'
      : `Template terpilih: ${template?.name ?? '-'}`
    : designMode === 'custom'
      ? 'Brief belum lengkap'
      : 'Belum ada template dipilih'

  return (
    <section id="katalog" className="section bg-white">
      <div className="container-page">
        <SectionHeader
          label="Langkah 3 · Desain"
          title="Mau tayang cepat, atau desain khusus dari nol?"
          aside={
            <p
              className={`inline-flex items-center gap-2 text-[14px] font-medium ${
                isDesignReady ? 'text-ok' : 'text-mute'
              }`}
            >
              {isDesignReady && <Check className="h-4 w-4" strokeWidth={3} />}
              {statusText}
            </p>
          }
        >
          Pakai template katalog dan website tayang dalam{' '}
          <span className="font-semibold text-ink">± 30 menit</span>, atau ajukan brief custom bila
          butuh tampilan dan sistem yang benar-benar khusus. Semua template sudah termasuk web
          customer (landing &amp; booking) dan dashboard admin pengelola.
        </SectionHeader>

        {/* Toggle mode desain */}
        <div role="tablist" aria-label="Mode desain" className="mt-10 grid gap-3 sm:grid-cols-2">
          <ModeTab
            id="tab-template"
            controls="panel-template"
            active={designMode === 'template'}
            disabled={designLocked}
            title={`Katalog Template (${TEMPLATES.length} Template)`}
            meta="Go-live 30 menit setelah pembayaran terkonfirmasi"
            onClick={() => setDesignMode('template')}
          />
          <ModeTab
            id="tab-custom"
            controls="panel-custom"
            active={designMode === 'custom'}
            disabled={false}
            title="Request Custom Design"
            meta="Desain baru dari nol · 3–7 hari kerja"
            onClick={() => setDesignMode('custom')}
          />
        </div>

        {designLocked && (
          <p className="mt-4 flex items-start gap-2.5 rounded-lg border border-warn/25 bg-warn-wash px-4 py-3 text-[14px] leading-relaxed text-ink">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-warn" />
            <span>
              Paket <strong className="font-semibold">{plan.name}</strong> dirancang khusus, jadi
              Langkah 3 terkunci di mode Custom Design. Ingin pakai template katalog? Ganti paket ke
              Starter, Growth, atau Enterprise di Langkah 1.
            </span>
          </p>
        )}

        {designMode === 'template' ? (
          <div id="panel-template" role="tabpanel" aria-labelledby="tab-template" className="mt-10">
            <CatalogSection
              category={category}
              onCategoryChange={onCategoryChange}
              query={query}
              onQueryChange={onQueryChange}
              onSelect={onSelect}
              selectedTemplateId={template?.id ?? ''}
              onRequestCustom={onRequestCustom}
            />

            <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[16px] font-semibold text-ink">
                  Belum ada template yang mewakili brand Anda?
                </p>
                <p className="mt-1 text-[14px] leading-relaxed text-mute">
                  Tim desain bisa membuat konsep baru lengkap dengan fitur khusus, estimasi 3–7 hari
                  kerja.
                </p>
              </div>
              <button type="button" onClick={() => setDesignMode('custom')} className="btn btn-secondary shrink-0">
                Request Custom Design
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div id="panel-custom" role="tabpanel" aria-labelledby="tab-custom">
            <CustomDesignForm />
          </div>
        )}
      </div>
    </section>
  )
}
