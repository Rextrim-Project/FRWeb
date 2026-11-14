import { Clock, Globe, ShieldCheck, Zap } from '../../lib/icons'
import { GO_LIVE_MINUTES } from '../../data/plans'

const ITEMS = [
  { icon: Clock, title: `Go-live ${GO_LIVE_MINUTES} menit`, desc: 'Setelah pembayaran terkonfirmasi' },
  { icon: ShieldCheck, title: 'SSL & keamanan aktif', desc: 'HTTPS, proteksi DDoS, backup' },
  { icon: Globe, title: 'Domain milik Anda', desc: 'Terdaftar atas nama bisnis sendiri' },
  { icon: Zap, title: 'Performa optimal', desc: 'Halaman cepat + caching otomatis' },
]

export default function ValueStrip() {
  return (
    <section aria-label="Yang Anda dapatkan" className="bg-navy px-4 sm:px-6 lg:px-8">
      <ul className="container-page grid gap-x-8 gap-y-6 py-9 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map(({ icon: Icon, title, desc }) => (
          <li key={title} className="flex items-start gap-3">
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-silver" strokeWidth={1.75} />
            <div>
              <p className="text-[15px] font-semibold text-white">{title}</p>
              <p className="mt-0.5 text-[14px] leading-snug text-silver">{desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
