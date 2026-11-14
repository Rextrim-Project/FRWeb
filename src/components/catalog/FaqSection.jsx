import { useState } from 'react'
import { ChevronDown, MessageCircle } from '../../lib/icons'
import { WA_CONSULT } from '../../lib/format'

const FAQS = [
  {
    q: 'Benarkah website bisa online dalam 30 menit?',
    a: 'Ya. Setelah pembayaran terkonfirmasi dan materi dasar (nama bisnis, nomor WhatsApp, logo/foto opsional) tersedia, sistem menyiapkan hosting, menerbitkan SSL, lalu memasang tema pilihan Anda. Proses ini rata-rata selesai 20–30 menit. Order di luar jam operasional 08.00–21.00 WIB dikerjakan pagi berikutnya.',
  },
  {
    q: 'Apa saja yang perlu saya siapkan?',
    a: 'Cukup nama bisnis, daftar layanan atau menu beserta harga, nomor WhatsApp tujuan, dan logo/foto bila ada. Jika belum punya logo, tim kami menyiapkan wordmark sederhana tanpa biaya tambahan.',
  },
  {
    q: 'Apakah harga sudah termasuk domain dan hosting?',
    a: 'Semua paket sudah mencakup setup hosting, SSL, dan pendaftaran domain untuk tahun pertama. Perpanjangan tahun berikutnya dibayarkan langsung oleh klien ke registrar, dan domain terdaftar atas nama bisnis Anda.',
  },
  {
    q: 'Saya sudah punya domain sendiri, bisa dipakai?',
    a: 'Bisa. Cukup berikan akses DNS atau arahkan nameserver sesuai instruksi kami. Tim FRWeb melakukan pointing dan memantau propagasi sampai website aktif tanpa downtime.',
  },
  {
    q: 'Bisakah desain dan fitur diubah?',
    a: 'Warna, tipografi, foto, urutan section, menu, dan konten dapat disesuaikan. Untuk kebutuhan yang jauh berbeda — multi-tenant API, integrasi ERP/POS, atau alur transaksi khusus — gunakan Paket Custom Solution agar arsitekturnya dirancang bersama tim Anda.',
  },
  {
    q: 'Bagaimana sistem pembayarannya?',
    a: 'Pembayaran via transfer bank atau QRIS dengan invoice resmi. Untuk Paket Custom Solution tersedia opsi DP 50% sebelum pengerjaan dan pelunasan setelah uji terima.',
  },
  {
    q: 'Apakah integrasi pembayaran online/QRIS otomatis sudah termasuk di dalam paket?',
    a: 'Semua website sudah mendukung pesanan & invoice via WhatsApp. Jika bisnis Anda membutuhkan integrasi gateway otomatis (QRIS real-time & Virtual Account bank terverifikasi otomatis via Midtrans/Xendit), tersedia modul add-on seharga Rp 1.000.000 (sudah termasuk setup API, webhook status, dan testing sandbox hingga go-live). Add-on ini opsional dan bisa diaktifkan langsung dari pilihan paket.',
  },
  {
    q: 'Apakah termasuk revisi?',
    a: 'Setiap paket mendapat garansi revisi konten selama 7 hari setelah go-live. Revisi struktur atau penambahan fitur di luar cakupan paket dihitung terpisah dan selalu dikonfirmasi lebih dulu.',
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="section border-t border-line bg-wash">
      <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 className="h2 mt-2">Pertanyaan yang sering diajukan</h2>
          <p className="lede mt-4">
            Belum menemukan jawabannya? Tim sales FRWeb siap membantu lewat WhatsApp pada jam
            operasional 08.00–21.00 WIB.
          </p>
          <a href={WA_CONSULT} target="_blank" rel="noreferrer" className="btn btn-secondary mt-6">
            <MessageCircle className="h-4 w-4" />
            Tanya langsung via WhatsApp
          </a>
        </div>

        <div className="border-t border-line-strong">
          {FAQS.map((item, index) => {
            const open = openIndex === index
            const panelId = `faq-panel-${index}`
            return (
              <div key={item.q} className="border-b border-line-strong">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? -1 : index)}
                    aria-expanded={open}
                    aria-controls={panelId}
                    className="group flex w-full items-start justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-[16.5px] font-semibold leading-snug text-ink group-hover:text-brand">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`mt-0.5 h-5 w-5 shrink-0 text-mute transition-transform duration-200 ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </h3>
                {open && (
                  <p id={panelId} className="animate-fade-in max-w-2xl pb-6 text-[15px] leading-relaxed text-body">
                    {item.a}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
