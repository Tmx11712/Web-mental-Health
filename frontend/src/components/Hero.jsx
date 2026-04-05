export default function Hero() {
  return (
    <div
      className="relative overflow-hidden px-[5%] py-20 text-white"
      style={{ background: "linear-gradient(135deg, #0F6E56 0%, #1D9E75 60%, #5DCAA5 100%)" }}
    >
      {/* bg circles */}
      <div className="absolute w-96 h-96 rounded-full bg-white/5 -top-24 -right-20 pointer-events-none" />
      <div className="absolute w-48 h-48 rounded-full bg-white/5 -bottom-14 left-[10%] pointer-events-none" />

      <div className="relative z-10">
        <span className="inline-block bg-white/20 text-white text-xs px-4 py-1 rounded-full mb-5 tracking-wide">
          Kesehatan Mental Mahasiswa UMSU
        </span>

        <h1 className="font-serif font-bold leading-tight mb-5 max-w-2xl text-[clamp(32px,5vw,52px)]">
          Kamu Tidak Sendirian <br className="hidden sm:block" />
          dalam Perjuangan Ini
        </h1>

        <p className="text-[17px] opacity-90 max-w-xl leading-relaxed mb-9">
          Platform untuk berbagi, melaporkan, dan mendapatkan dukungan terkait
          kesehatan mental mahasiswa Universitas Muhammadiyah Sumatera Utara.
        </p>

        <div className="flex flex-wrap gap-3.5">
          <a
            href="#lapor"
            className="bg-white text-green px-7 py-3 rounded-lg font-medium text-[15px] no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
          >
            Buat Laporan
          </a>
          <a
            href="#bantuan"
            className="bg-transparent text-white px-7 py-3 rounded-lg font-medium text-[15px] no-underline border border-white/60 transition-all duration-200 hover:bg-white/10"
          >
            Butuh Bantuan Segera?
          </a>
        </div>
      </div>
    </div>
  );
}