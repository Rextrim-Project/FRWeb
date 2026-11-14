/**
 * Judul section landing: label kecil, heading, paragraf pengantar, dan slot
 * opsional di sisi kanan (tautan atau status).
 */
export default function SectionHeader({ label, title, children, aside, className = '' }) {
  return (
    <div className={`flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between ${className}`}>
      <div className="max-w-2xl">
        {label && <p className="eyebrow">{label}</p>}
        <h2 className="h2 mt-2">{title}</h2>
        {children && <div className="lede mt-4">{children}</div>}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  )
}
