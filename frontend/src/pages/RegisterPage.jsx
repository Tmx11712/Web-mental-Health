import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.password_confirmation) {
      setError("Password dan konfirmasi password tidak cocok");
      return;
    }
    if (form.password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.password_confirmation);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — Gradient Illustration */}
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #0F6E56 0%, #1D9E75 50%, #5DCAA5 100%)",
        }}
      >
        {/* Decorative circles */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-white/5 -top-32 -left-32" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-white/5 bottom-10 right-10" />
        <div className="absolute w-[200px] h-[200px] rounded-full bg-white/8 top-1/2 left-1/3" />

        <div className="relative z-10 text-white px-16 max-w-lg">
          <div className="text-6xl mb-6">🌱</div>
          <h2 className="font-serif text-4xl font-bold leading-tight mb-4">
            Mulai Perjalananmu
          </h2>
          <p className="text-white/80 text-lg leading-relaxed">
            Bergabunglah dengan ribuan mahasiswa UMSU yang sudah mendapatkan
            dukungan kesehatan mental melalui platform kami.
          </p>

          <div className="mt-10 space-y-4">
            {[
              { icon: "🛡️", text: "Data kamu aman dan terjaga kerahasiaannya" },
              { icon: "💬", text: "Akses konseling dan dukungan profesional" },
              { icon: "📊", text: "Pantau perkembangan kesehatan mentalmu" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span className="text-white/80 text-[15px]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-bg">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="inline-block mb-10 no-underline">
            <div className="font-serif text-xl text-green font-bold leading-tight">
              UMSU Mental Health
              <span className="block text-[11px] font-sans font-light text-gray-400">
                Universitas Muhammadiyah Sumatera Utara
              </span>
            </div>
          </Link>

          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">
            Buat Akun
          </h1>
          <p className="text-gray-400 text-[15px] mb-8">
            Daftar untuk memulai perjalanan kesehatan mentalmu
          </p>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-6 flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="register_name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nama lengkapmu..."
                required
                className="w-full px-4 py-3.5 border border-black/10 rounded-xl text-sm bg-white text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green/20 focus:border-green placeholder:text-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="register_email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="nama@students.umsu.ac.id"
                required
                className="w-full px-4 py-3.5 border border-black/10 rounded-xl text-sm bg-white text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green/20 focus:border-green placeholder:text-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="register_password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Minimal 6 karakter..."
                required
                className="w-full px-4 py-3.5 border border-black/10 rounded-xl text-sm bg-white text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green/20 focus:border-green placeholder:text-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Konfirmasi Password
              </label>
              <input
                type="password"
                id="register_password_confirm"
                value={form.password_confirmation}
                onChange={(e) =>
                  setForm({ ...form, password_confirmation: e.target.value })
                }
                placeholder="Ulangi password..."
                required
                className="w-full px-4 py-3.5 border border-black/10 rounded-xl text-sm bg-white text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green/20 focus:border-green placeholder:text-gray-300"
              />
            </div>

            <button
              type="submit"
              id="register_submit"
              disabled={loading}
              className="w-full bg-green text-white py-3.5 rounded-xl text-[15px] font-medium cursor-pointer transition-all duration-200 hover:bg-green-dark hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none border-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Memproses...
                </span>
              ) : (
                "Daftar"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="text-green font-medium no-underline hover:underline"
              >
                Masuk di sini
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-gray-400 no-underline hover:text-green transition-colors"
            >
              ← Kembali ke halaman utama
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
