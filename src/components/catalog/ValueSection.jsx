import {
  ArrowRight,
  Check,
  Gauge,
  Globe,
  Server,
  ShieldCheck,
  PenLine,
  Wallet,
} from '../../lib/icons'
import { scrollToSection } from '../../context/OrderContext'
import SectionHeader from './SectionHeader'

const CUSTOMER_POINTS = [
  'Landing page & halaman produk/jasa siap jual',
  'Form booking, jadwal, dan kalkulator harga',
  'Checkout / order via WhatsApp langsung ke admin',
  'Galeri, testimoni, dan info kontak bisnis',
]

const ADMIN_POINTS = [
  'Pantau pesanan & booking yang masuk',
  'Kelola jadwal dan ketersediaan slot',
  'Rekap transaksi serta laporan penjualan',
  'Ubah konten, harga, dan foto tanpa coding',
]

const FEATURES = [
  {
    icon: Server,
    title: 'Siap pakai tanpa urus teknis',
    desc: 'Website, SSL, dan domain sudah dikonfigurasi sesuai paket. Anda tidak perlu menyentuh terminal atau panel hosting.',
  },
  {
    icon: Globe,
    title: 'Domain & SSL tanpa drama',
    desc: 'Pointing DNS, penerbitan SSL, sampai redirect www ditangani tim kami. Domain tetap terdaftar atas nama bisnis Anda.',
  },
  {
    icon: Gauge,
    title: 'Dibuat untuk konversi',
    desc: 'Setiap template punya alur jelas: tombol WhatsApp, form booking, kalkulator harga, dan bukti sosial yang siap meyakinkan calon pelanggan.',
  },
  {
    icon: ShieldCheck,
    title: 'Aman & terpantau',
    desc: 'Proteksi DDoS, backup berkala, dan monitoring uptime. Jika ada gangguan, tim kami yang bergerak lebih dulu.',
  },
  {
    icon: Wallet,
    title: 'Harga transparan',
    desc: 'Satu harga setup, tanpa biaya tersembunyi. Upgrade paket kapan saja saat trafik bisnis Anda tumbuh.',
  },
  {
    icon: PenLine,
    title: 'Konten mudah diubah',
    desc: 'Ganti foto, menu, harga, dan jadwal lewat panel sederhana atau minta bantuan tim kami lewat WhatsApp.',
  },
]

const GUARANTEES = [
  'Garansi revisi konten 7 hari',
  'Website online ≤ 24 jam atau uang kembali',
  'Pendampingan onboarding via WhatsApp',
]

function InterfaceColumn({ title, audience, points }) {
  return (
    <div className="p-6 sm:p-8">
      <p className="text-[13px] text-mute">{audience}</p>
      <h4 className="mt-1 text-[18px] font-semibold text-ink">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-[14.5px] leading-snug text-body">
            <Check className="mt-[3px] h-4 w-4 shrink-0 text-ink" strokeWidth={2.5} />
            {point}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ValueSection() {
  return (
    <section id="keunggulan" className="section border-t border-line bg-white">
      <div className="container-page">
        <SectionHeader label="Keunggulan" title="Semua kerumitan teknis kami ambil alih">
          Fokus Anda adalah bisnisnya, bukan urusan teknis. FRWeb menangani setup, keamanan, dan
          performa agar website Anda siap menerima pelanggan sejak menit pertama.
        </SectionHeader>

        {/* Value proposition utama: paket = 2 antarmuka */}
        <div className="mt-12 overflow-hidden rounded-xl border border-line-strong">
          <div className="flex flex-col gap-3 border-b border-line bg-wash px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <h3 className="text-[18px] font-semibold text-ink">
                Satu paket, dua antarmuka: Web Customer + Dashboard Admin
              </h3>
              <p className="mt-1 text-[14.5px] text-body">
                Halaman untuk pelanggan Anda, dan panel untuk memantau pesanan, jadwal, serta
                transaksi.
              </p>
            </div>
            <button
              type="button"
              onClick={() => scrollToSection('katalog')}
              className="inline-flex shrink-0 items-center gap-1.5 self-start text-[14px] font-semibold text-brand underline-offset-4 hover:underline sm:self-auto"
            >
              Coba keduanya di Live Demo
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <InterfaceColumn title="Customer View" audience="Publik" points={CUSTOMER_POINTS} />
            <InterfaceColumn title="Admin View" audience="Pengelola" points={ADMIN_POINTS} />
          </div>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title}>
              <Icon className="h-6 w-6 text-brand" strokeWidth={1.6} />
              <h3 className="mt-4 text-[17px] font-semibold text-ink">{title}</h3>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-body">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-line pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-[17px] font-semibold text-ink">Jaminan FRWeb</h3>
            <ul className="mt-3 flex flex-col gap-x-8 gap-y-2 sm:flex-row sm:flex-wrap">
              {GUARANTEES.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[14.5px] leading-snug text-body">
                  <Check className="mt-[3px] h-4 w-4 shrink-0 text-ink" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <button type="button" onClick={() => scrollToSection('paket')} className="btn btn-primary shrink-0">
            Lihat Pilihan Paket
          </button>
        </div>
      </div>
    </section>
  )
}
