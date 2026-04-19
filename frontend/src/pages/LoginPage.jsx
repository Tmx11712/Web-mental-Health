import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
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
          <div className="text-6xl mb-6">🧠</div>
          <h2 className="font-serif text-4xl font-bold leading-tight mb-4">
            Selamat Datang Kembali
          </h2>
          <p className="text-white/80 text-lg leading-relaxed">
            Masuk ke akunmu untuk mengakses dashboard, melihat riwayat laporan,
            dan mendapatkan dukungan kesehatan mental yang personal.
          </p>
          <div className="mt-10 flex gap-8">
            <div>
              <div className="text-3xl font-serif font-bold">1.2K+</div>
              <div className="text-white/60 text-sm mt-1">Mahasiswa Terbantu</div>
            </div>
            <div>
              <div className="text-3xl font-serif font-bold">98%</div>
              <div className="text-white/60 text-sm mt-1">Tingkat Kepuasan</div>
            </div>
            <div>
              <div className="text-3xl font-serif font-bold">24/7</div>
              <div className="text-white/60 text-sm mt-1">Dukungan Tersedia</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right — Login Form */}
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
            Masuk
          </h1>
          <p className="text-gray-400 text-[15px] mb-8">
            Masuk ke akun untuk mengakses dashboard kesehatan mentalmu
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
                Email
              </label>
              <input
                type="email"
                id="login_email"
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
                id="login_password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Masukkan password..."
                required
                className="w-full px-4 py-3.5 border border-black/10 rounded-xl text-sm bg-white text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green/20 focus:border-green placeholder:text-gray-300"
              />
            </div>

            <button
              type="submit"
              id="login_submit"
              disabled={loading}
              className="w-full bg-green text-white py-3.5 rounded-xl text-[15px] font-medium cursor-pointer transition-all duration-200 hover:bg-green-dark hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none border-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Memproses...
                </span>
              ) : (
                "Masuk"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="text-green font-medium no-underline hover:underline"
              >
                Daftar sekarang
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
