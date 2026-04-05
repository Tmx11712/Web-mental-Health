export default function Navbar() {
  return (
    <nav className="bg-white border-b border-black/10 px-[5%] flex items-center justify-between h-16 sticky top-0 z-50">
      <div className="font-serif text-[18px] text-green font-bold leading-tight">
        UMSU Mental Health
        <span className="block text-[11px] font-sans font-light text-gray-400">
          Universitas Muhammadiyah Sumatera Utara
        </span>
      </div>
      <ul className="hidden md:flex gap-7 list-none">
        {[
          { href: "#masalah", label: "Masalah" },
          { href: "#artikel", label: "Artikel" },
          { href: "#polling", label: "Polling" },
          { href: "#lapor", label: "Lapor" },
          { href: "#bantuan", label: "Bantuan" },
        ].map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              className="text-sm text-gray-400 no-underline transition-colors duration-200 hover:text-green"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}