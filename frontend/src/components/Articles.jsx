const articles = [
  {
    emoji: "🌱",
    imgBg: "bg-green-light",
    tag: "Tips Kesehatan",
    title: "5 Cara Mudah Mengelola Stres saat Ujian",
    desc: "Teknik pernapasan, manajemen waktu, dan strategi belajar yang efektif untuk menjaga ketenangan pikiran.",
    meta: "10 menit baca · Kesehatan Mental",
  },
  {
    emoji: "🤝",
    imgBg: "bg-amber-light",
    tag: "Hubungan Sosial",
    title: "Cara Membangun Koneksi Sosial yang Sehat di Kampus",
    desc: "Panduan untuk mahasiswa baru dalam membangun pertemanan yang bermakna dan jaringan dukungan.",
    meta: "8 menit baca · Sosial",
  },
  {
    emoji: "💆",
    imgBg: "bg-[#EEEDFE]",
    tag: "Mindfulness",
    title: "Mengenal Mindfulness: Solusi Cemas di Era Digital",
    desc: "Latihan mindfulness sederhana yang bisa dilakukan kapan saja untuk meredakan kecemasan sehari-hari.",
    meta: "12 menit baca · Psikologi",
  },
];

export default function Articles() {
  return (
    <section id="artikel" className="bg-white px-[5%] py-16">
      <div className="font-serif text-3xl font-semibold mb-2">
        Artikel & Informasi
      </div>
      <div className="text-gray-400 text-[15px] mb-10">
        Bacaan ringan untuk membantu kamu memahami dan menjaga kesehatan mental
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((a, i) => (
          <div
            key={i}
            className="bg-white border border-black/10 rounded-xl overflow-hidden transition-transform duration-200 hover:-translate-y-1"
          >
            <div
              className={`h-36 flex items-center justify-center text-5xl ${a.imgBg}`}
            >
              {a.emoji}
            </div>
            <div className="p-5">
              <div className="text-[11px] text-green font-medium mb-2 uppercase tracking-wider">
                {a.tag}
              </div>
              <h3 className="text-base font-medium leading-snug mb-2">{a.title}</h3>
              <p className="text-[13px] text-gray-400 leading-relaxed">{a.desc}</p>
              <div className="text-[12px] text-gray-400 mt-3.5">{a.meta}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}