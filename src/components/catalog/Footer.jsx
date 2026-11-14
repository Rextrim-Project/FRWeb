import { Mail, MapPin, MessageCircle, Phone } from '../../lib/icons'
import { BRAND, SALES_WHATSAPP, SALES_WHATSAPP_DISPLAY, WA_CONSULT } from '../../lib/format'
import { CATEGORIES, countByCategory } from '../../data'
import { scrollToSection } from '../../context/OrderContext'
import Logo from './Logo'

const displayPhone = SALES_WHATSAPP_DISPLAY

const ORDER_LINKS = [
  { label: '1. Pilih paket', target: 'paket' },
  { label: '2. Tentukan domain', target: 'domain' },
  { label: '3. Pilih desain & tema', target: 'katalog' },
  { label: '4. Ringkasan & checkout', target: 'ringkasan' },
]

const HEADING = 'text-[14px] font-semibold text-ink'
const LINK = 'text-left text-[14.5px] text-body transition-colors hover:text-ink'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white px-4 pb-28 pt-14 sm:px-6 lg:px-8 lg:pb-10">
      <div className="container-page">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-[14.5px] leading-relaxed text-body">
              FRWeb from FRCloud menyiapkan website resmi bisnis Anda dalam 30 menit: pilih paket,
              tentukan domain, pilih tema, langsung online.
            </p>
            <a href={WA_CONSULT} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary mt-5">
              <MessageCircle className="h-4 w-4" />
              Chat sales FRWeb
            </a>
          </div>

          <div>
            <h3 className={HEADING}>Alur order</h3>
            <ul className="mt-4 space-y-2.5">
              {ORDER_LINKS.map((item) => (
                <li key={item.target}>
                  <button type="button" onClick={() => scrollToSection(item.target)} className={LINK}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={HEADING}>Kategori template</h3>
            <ul className="mt-4 space-y-2.5">
              {CATEGORIES.filter((item) => item.id !== 'all').map((item) => (
                <li key={item.id}>
                  <button type="button" onClick={() => scrollToSection('katalog')} className={LINK}>
                    {item.label} <span className="text-mute">({countByCategory(item.id)})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={HEADING}>Kontak</h3>
            <ul className="mt-4 space-y-3 text-[14.5px] text-body">
              <li>
                <a
                  href={`https://wa.me/${SALES_WHATSAPP}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 transition-colors hover:text-ink"
                >
                  <Phone className="h-4 w-4 shrink-0 text-mute" />
                  {displayPhone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-center gap-2.5 break-all transition-colors hover:text-ink"
                >
                  <Mail className="h-4 w-4 shrink-0 text-mute" />
                  {BRAND.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mute" />
                <span>
                  {BRAND.city}
                  <br />
                  <span className="text-mute">Melayani seluruh Indonesia</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13.5px] text-mute">
            © {new Date().getFullYear()} {BRAND.name}. Seluruh hak cipta dilindungi.
          </p>
          <p className="text-[13.5px] text-mute">
            Nama brand, harga, dan ulasan di dalam preview template adalah contoh untuk keperluan demo.
          </p>
        </div>
      </div>
    </footer>
  )
}
