import { Check } from '../../lib/icons'
import SectionHeader from './SectionHeader'
import { GO_LIVE_MINUTES } from '../../data/plans'

const STEPS = [
  {
    step: '01',
    time: '0–5 menit',
    title: 'Checkout & konfirmasi',
    desc: 'Detail paket, domain, dan tema terkirim otomatis via WhatsApp. Tim sales mengonfirmasi dan mengirim invoice.',
  },
  {
    step: '02',
    time: '5–15 menit',
    title: 'Aktivasi hosting & domain',
    desc: 'SSL diterbitkan, DNS diarahkan, dan website dipasang otomatis. Semua dipantau tanpa downtime.',
  },
  {
    step: '03',
    time: '15–25 menit',
    title: 'Pasang tema & konten',
    desc: 'Template terpasang, logo dan foto bisnis Anda diunggah, nomor WhatsApp serta menu/harga disesuaikan.',
  },
  {
    step: '04',
    time: '25–30 menit',
    title: 'QA & go-live',
    desc: 'Cek tampilan desktop–mobile, kecepatan, dan form. Website aktif di domain Anda dan siap dibagikan.',
  },
]

const NOTES = [
  'Tim standby 08.00–21.00 WIB',
  'Order di luar jam operasional dikerjakan pagi berikutnya',
  'Progress dikabari via WhatsApp',
]

export default function ProcessSection() {
  return (
    <section id="cara-kerja" className="section bg-white">
      <div className="container-page">
        <SectionHeader
          label="Cara kerja"
          title={`Dari checkout ke website online dalam ${GO_LIVE_MINUTES} menit`}
        >
          Tidak ada briefing berhari-hari, tidak ada instalasi manual. Empat tahap ini berjalan
          berurutan setelah pembayaran Anda terkonfirmasi.
        </SectionHeader>

        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ step, time, title, desc }) => (
            <li key={step} className="border-t-[3px] border-brand pt-4">
              <p className="flex items-baseline justify-between gap-3 font-mono text-[13px]">
                <span className="font-semibold text-brand">{step}</span>
                <span className="text-mute">{time}</span>
              </p>
              <h3 className="mt-4 text-[18px] font-semibold leading-snug text-ink">{title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-body">{desc}</p>
            </li>
          ))}
        </ol>

        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-6">
          {NOTES.map((note) => (
            <li key={note} className="inline-flex items-center gap-2 text-[14px] text-body">
              <Check className="h-4 w-4 text-ink" strokeWidth={2.5} />
              {note}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
