import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { apiUrl } from "../lib/api";

export default function FormLaporan() {
    const { user, token, isAuthenticated } = useAuth();

    const [form, setForm] = useState({
        nama: "",
        nim: "",
        jenis: "",
        level: "",
        cerita: "",
        email: "",
    });
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState("");

    // Auto-fill user data when authenticated
    useEffect(() => {
        if (isAuthenticated && user) {
            setForm((prev) => ({
                ...prev,
                nama: user.name || prev.nama,
                email: user.email || prev.email,
            }));
        }
    }, [isAuthenticated, user]);

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(""), 3500);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id.replace("f_", "")]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.jenis) {
            showToast("Pilih jenis masalah terlebih dahulu");
            return;
        }
        if (!form.cerita.trim()) {
            showToast("Tolong ceritakan masalahmu");
            return;
        }

        setLoading(true);
        try {
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
            };

            // Send auth token if logged in
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }

            const response = await fetch(apiUrl("/laporan"), {
                method: "POST",
                headers,
                body: JSON.stringify({
                    nama: form.nama,
                    nim: form.nim,
                    email: form.email,
                    jenis: form.jenis,
                    level: form.level,
                    cerita: form.cerita,
                }),
            });

            const data = await response.json();
            if (!response.ok)
                throw new Error(data.message || "Terjadi kesalahan");

            showToast(
                "Laporan berhasil dikirim! Konselor akan menghubungimu segera.",
            );
            setForm({
                nama: user?.name || "",
                nim: "",
                jenis: "",
                level: "",
                cerita: "",
                email: user?.email || "",
            });
        } catch (err) {
            showToast("Gagal mengirim laporan: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "w-full px-3.5 py-3 border border-black/10 rounded-lg text-sm font-sans bg-bg text-gray-900 transition-colors duration-200 focus:outline-none focus:border-green";

    return (
        <>
            <section id="lapor" className="px-[5%] py-16">
                <div className="font-serif text-3xl font-semibold mb-2">
                    Buat Laporan / Pengaduan
                </div>
                <div className="text-gray-400 text-[15px] mb-10">
                    Ceritakan masalahmu — kami akan membantu menghubungkanmu
                    dengan dukungan yang tepat
                </div>

                <div className="bg-white border border-black/10 rounded-2xl p-10 max-w-2xl">
                    {/* Auth badge */}
                    {isAuthenticated && (
                        <div className="flex items-center gap-2 bg-green-light text-green text-sm px-4 py-2.5 rounded-xl mb-6">
                            <span>✅</span>
                            <span>
                                Kamu masuk sebagai <strong>{user?.name}</strong>{" "}
                                — laporan akan otomatis terhubung ke akunmu
                            </span>
                        </div>
                    )}

                    {/* Nama & NIM */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Nama (opsional)
                            </label>
                            <input
                                type="text"
                                id="f_nama"
                                placeholder="Nama kamu..."
                                value={form.nama}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                NIM (opsional)
                            </label>
                            <input
                                type="text"
                                id="f_nim"
                                placeholder="Nomor Induk Mahasiswa"
                                value={form.nim}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* Jenis Masalah */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium mb-2">
                            Jenis Masalah
                        </label>
                        <select
                            id="f_jenis"
                            value={form.jenis}
                            onChange={handleChange}
                            className={inputClass}
                        >
                            <option value="">— Pilih kategori —</option>
                            <option value="Stres Akademik">
                                Stres Akademik
                            </option>
                            <option value="Kecemasan & Panik">
                                Kecemasan &amp; Panik
                            </option>
                            <option value="Burnout">Burnout</option>
                            <option value="Masalah Finansial">
                                Masalah Finansial
                            </option>
                            <option value="Kesepian & Isolasi">
                                Kesepian &amp; Isolasi
                            </option>
                            <option value="Gangguan Tidur">
                                Gangguan Tidur
                            </option>
                            <option value="Lainnya">Lainnya</option>
                        </select>
                    </div>

                    {/* Tingkat Keparahan */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium mb-2">
                            Tingkat Keparahan
                        </label>
                        <select
                            id="f_level"
                            value={form.level}
                            onChange={handleChange}
                            className={inputClass}
                        >
                            <option value="">— Pilih tingkat —</option>
                            <option value="Ringan">
                                Ringan — masih bisa diatasi sendiri
                            </option>
                            <option value="Sedang">
                                Sedang — perlu dukungan dari orang lain
                            </option>
                            <option value="Berat">
                                Berat — sangat mengganggu aktivitas
                            </option>
                            <option value="Darurat">
                                Darurat — butuh bantuan segera
                            </option>
                        </select>
                    </div>

                    {/* Cerita */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium mb-2">
                            Ceritakan Masalahmu
                        </label>
                        <textarea
                            id="f_cerita"
                            placeholder="Tuliskan apa yang sedang kamu rasakan atau alami... Semua informasi bersifat rahasia."
                            value={form.cerita}
                            onChange={handleChange}
                            rows={4}
                            className={inputClass + " resize-y min-h-[100px]"}
                        />
                        <div className="text-[12px] text-gray-400 mt-1.5">
                            Laporan ini bersifat anonim dan hanya dapat diakses
                            oleh konselor kampus.
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">
                            Email (untuk tindak lanjut)
                        </label>
                        <input
                            type="email"
                            id="f_email"
                            placeholder="email@students.umsu.ac.id"
                            value={form.email}
                            onChange={handleChange}
                            className={inputClass}
                        />
                        <div className="text-[12px] text-gray-400 mt-1.5">
                            Opsional — isi jika ingin dihubungi kembali oleh tim
                            konselor.
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-green text-white border-none py-3.5 rounded-lg text-[15px] font-sans cursor-pointer transition-all duration-200 hover:bg-green-dark hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Mengirim..." : "Kirim Laporan"}
                    </button>
                </div>
            </section>

            {/* Toast */}
            {toast && (
                <div className="fixed bottom-8 right-8 bg-green text-white px-6 py-3.5 rounded-xl text-sm z-50 shadow-lg">
                    {toast}
                </div>
            )}
        </>
    );
}
