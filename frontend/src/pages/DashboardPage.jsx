import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const statusConfig = {
  baru: {
    label: "Baru",
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-500",
  },
  diproses: {
    label: "Diproses",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  selesai: {
    label: "Selesai",
    bg: "bg-green-light",
    text: "text-green",
    dot: "bg-green",
  },
};

export default function DashboardPage() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("semua");

  useEffect(() => {
    fetchLaporan();
  }, []);

  const fetchLaporan = async () => {
    try {
      const res = await fetch("/api/user/laporan", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setLaporan(data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const filteredLaporan =
    activeTab === "semua"
      ? laporan
      : laporan.filter((l) => l.status === activeTab);

  const stats = {
    total: laporan.length,
    baru: laporan.filter((l) => l.status === "baru").length,
    diproses: laporan.filter((l) => l.status === "diproses").length,
    selesai: laporan.filter((l) => l.status === "selesai").length,
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Dashboard Navbar */}
      <nav className="bg-white border-b border-black/10 px-6 lg:px-10 flex items-center justify-between h-16 sticky top-0 z-50">
        <Link to="/" className="no-underline">
          <div className="font-serif text-[18px] text-green font-bold leading-tight">
            UMSU Mental Health
            <span className="block text-[11px] font-sans font-light text-gray-400">
              Dashboard
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="hidden sm:block text-sm text-gray-400 no-underline hover:text-green transition-colors"
          >
            Halaman Utama
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green text-white flex items-center justify-center text-sm font-medium">
              {getInitials(user?.name)}
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-medium text-gray-900 leading-tight">
                {user?.name}
              </div>
              <div className="text-[11px] text-gray-400">{user?.email}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-400 hover:text-red-500 transition-colors bg-transparent border-none cursor-pointer px-3 py-1.5 rounded-lg hover:bg-red-50"
          >
            Keluar
          </button>
        </div>
      </nav>

      <div className="px-6 lg:px-10 py-8 max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-1">
            Halo, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-gray-400 text-[15px]">
            Pantau dan kelola laporan kesehatan mentalmu dari sini
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Laporan",
              value: stats.total,
              icon: "📋",
              color: "border-green/20",
              bg: "bg-green-light",
            },
            {
              label: "Baru",
              value: stats.baru,
              icon: "🆕",
              color: "border-blue-200",
              bg: "bg-blue-50",
            },
            {
              label: "Diproses",
              value: stats.diproses,
              icon: "⏳",
              color: "border-amber-200",
              bg: "bg-amber-50",
            },
            {
              label: "Selesai",
              value: stats.selesai,
              icon: "✅",
              color: "border-green/20",
              bg: "bg-green-light",
            },
          ].map((s, i) => (
            <div
              key={i}
              className={`bg-white border ${s.color} rounded-2xl p-5 transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center text-lg`}
                >
                  {s.icon}
                </span>
              </div>
              <div className="font-serif text-3xl font-bold text-gray-900">
                {s.value}
              </div>
              <div className="text-[13px] text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Link
            to="/#lapor"
            className="inline-flex items-center gap-2 bg-green text-white px-5 py-2.5 rounded-xl text-sm font-medium no-underline transition-all duration-200 hover:bg-green-dark hover:-translate-y-0.5 hover:shadow-lg"
          >
            <span>✏️</span> Buat Laporan Baru
          </Link>
          <Link
            to="/#bantuan"
            className="inline-flex items-center gap-2 bg-white text-gray-700 border border-black/10 px-5 py-2.5 rounded-xl text-sm font-medium no-underline transition-all duration-200 hover:border-green hover:text-green hover:-translate-y-0.5"
          >
            <span>🆘</span> Kontak Darurat
          </Link>
        </div>

        {/* Reports Section */}
        <div className="bg-white border border-black/10 rounded-2xl overflow-hidden">
          {/* Header & Tabs */}
          <div className="px-6 pt-6 pb-0">
            <h2 className="font-serif text-xl font-semibold mb-1">
              Riwayat Laporan
            </h2>
            <p className="text-gray-400 text-sm mb-5">
              Semua laporan yang pernah kamu kirimkan
            </p>
            <div className="flex gap-1 border-b border-black/10">
              {[
                { key: "semua", label: "Semua", count: stats.total },
                { key: "baru", label: "Baru", count: stats.baru },
                { key: "diproses", label: "Diproses", count: stats.diproses },
                { key: "selesai", label: "Selesai", count: stats.selesai },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 bg-transparent cursor-pointer ${
                    activeTab === tab.key
                      ? "border-green text-green"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`ml-1.5 text-[11px] px-1.5 py-0.5 rounded-full ${
                      activeTab === tab.key
                        ? "bg-green-light text-green"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-green/20 border-t-green rounded-full animate-spin" />
                  <span className="text-gray-400 text-sm">
                    Memuat laporan...
                  </span>
                </div>
              </div>
            ) : filteredLaporan.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">📭</div>
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-2">
                  {activeTab === "semua"
                    ? "Belum Ada Laporan"
                    : `Tidak Ada Laporan ${statusConfig[activeTab]?.label || ""}`}
                </h3>
                <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
                  {activeTab === "semua"
                    ? "Kamu belum pernah mengirim laporan. Ceritakan masalahmu dan dapatkan dukungan."
                    : "Tidak ada laporan dengan status ini saat ini."}
                </p>
                {activeTab === "semua" && (
                  <Link
                    to="/#lapor"
                    className="inline-flex items-center gap-2 bg-green text-white px-6 py-3 rounded-xl text-sm font-medium no-underline hover:bg-green-dark transition-colors"
                  >
                    ✏️ Buat Laporan Pertamamu
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLaporan.map((item) => {
                  const status = statusConfig[item.status] || statusConfig.baru;
                  return (
                    <div
                      key={item.id}
                      className="border border-black/8 rounded-xl p-5 transition-all duration-200 hover:shadow-md hover:border-black/15"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-3 py-1 rounded-full text-[12px] font-medium flex items-center gap-1.5 ${status.bg} ${status.text}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${status.dot}`}
                            />
                            {status.label}
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            {item.jenis_masalah}
                          </span>
                        </div>
                        <span className="text-[12px] text-gray-400">
                          {formatDate(item.created_at)}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
                        {item.deskripsi}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-[12px] text-gray-400">
                        <span className="flex items-center gap-1">
                          📊 Tingkat:{" "}
                          <span className="font-medium text-gray-600">
                            {item.tingkat_keparahan}
                          </span>
                        </span>
                        {item.catatan_konselor && (
                          <span className="flex items-center gap-1 text-green">
                            💬 Ada catatan konselor
                          </span>
                        )}
                      </div>

                      {item.catatan_konselor && (
                        <div className="mt-3 bg-green-light/50 border border-green/10 rounded-lg p-3">
                          <div className="text-[11px] text-green font-medium mb-1">
                            Catatan Konselor:
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {item.catatan_konselor}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
