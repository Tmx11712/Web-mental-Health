import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, user } = useAuth();

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <nav className="bg-white border-b border-black/10 px-[5%] flex items-center justify-between h-16 sticky top-0 z-50">
      <Link to="/" className="no-underline">
        <div className="font-serif text-[18px] text-green font-bold leading-tight">
          UMSU Mental Health
          <span className="block text-[11px] font-sans font-light text-gray-400">
            Universitas Muhammadiyah Sumatera Utara
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-6">
        <ul className="hidden md:flex gap-7 list-none m-0 p-0">
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

        {/* Auth Button */}
        {isAuthenticated ? (
          <Link
            to="/dashboard"
            className="flex items-center gap-2.5 bg-green-light text-green px-4 py-2 rounded-xl no-underline transition-all duration-200 hover:bg-green hover:text-white group"
          >
            <div className="w-7 h-7 rounded-full bg-green text-white flex items-center justify-center text-[11px] font-medium group-hover:bg-white group-hover:text-green transition-colors">
              {getInitials(user?.name)}
            </div>
            <span className="text-sm font-medium hidden sm:inline">
              Dashboard
            </span>
          </Link>
        ) : (
          <Link
            to="/login"
            className="bg-green text-white px-5 py-2 rounded-xl text-sm font-medium no-underline transition-all duration-200 hover:bg-green-dark hover:-translate-y-0.5 hover:shadow-lg"
          >
            Masuk
          </Link>
        )}
      </div>
    </nav>
  );
}