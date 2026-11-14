import { ArrowRight } from '../lib/icons'
import { catalogHref, HOME_PATH } from '../lib/router'

/**
 * Fallback 404 — dipakai untuk slug pratinjau yang tidak ada di katalog
 * maupun path aplikasi yang tidak dikenal.
 */
export default function NotFoundPage({ slug = '' }) {
  const isPreview = Boolean(slug)

  return (
    <div className="flex min-h-screen flex-col justify-center bg-white px-5 py-16 text-ink antialiased">
      <div className="mx-auto w-full max-w-xl">
        <p className="font-mono text-[14px] text-mute">
          404 · {isPreview ? 'Preview tidak tersedia' : 'Halaman tidak ditemukan'}
        </p>

        <h1 className="mt-4 text-[32px] font-semibold leading-[1.1] tracking-[-0.022em] text-ink sm:text-[44px]">
          {isPreview ? 'Template ini tidak ada di katalog' : 'Alamat ini tidak mengarah ke halaman mana pun'}
        </h1>

        <p className="mt-5 text-[16px] leading-relaxed text-body">
          {isPreview ? (
            <>
              Kami tidak menemukan template dengan slug{' '}
              <span className="rounded bg-wash px-1.5 py-0.5 font-mono text-[14px] text-ink">{slug}</span>.
              Kemungkinan tautan salah ketik atau template sudah diganti versi barunya.
            </>
          ) : (
            'Tautan mungkin sudah berubah. Kembali ke katalog untuk melihat 26 template siap go-live.'
          )}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={catalogHref()} className="btn btn-lg btn-primary">
            Kembali ke Katalog
            <ArrowRight className="h-4 w-4" />
          </a>
          <a href={HOME_PATH} className="btn btn-lg btn-secondary">
            Halaman Utama
          </a>
        </div>
      </div>
    </div>
  )
}
