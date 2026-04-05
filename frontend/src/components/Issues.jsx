const issues = [
  {
    icon: "🧠",
    iconBg: "bg-green-light",
    title: "Stres Akademik",
    desc: "Tekanan tugas, deadline, dan ekspektasi nilai yang tinggi sering menjadi pemicu utama stres mahasiswa.",
    badge: "Paling Umum",
    badgeBg: "bg-green-light",
    badgeColor: "text-green",
  },
  {
    icon: "😔",
    iconBg: "bg-amber-light",
    title: "Kesepian & Isolasi",
    desc: "Jauh dari keluarga, sulit beradaptasi, atau merasa tidak memiliki teman yang bisa dipercaya.",
    badge: "Perlu Perhatian",
    badgeBg: "bg-amber-light",
    badgeColor: "text-amber",
  },
  {
    icon: "😰",
    iconBg: "bg-[#EEEDFE]",
    title: "Kecemasan & Panik",
    desc: "Rasa cemas berlebihan saat presentasi, ujian, atau menghadapi situasi sosial baru di kampus.",
    badge: "Butuh Dukungan",
    badgeBg: "bg-[#EEEDFE]",
    badgeColor: "text-[#534AB7]",
  },
  {
    icon: "🔥",
    iconBg: "bg-[#FCEBEB]",
    title: "Burnout Mahasiswa",
    desc: "Kelelahan fisik dan mental akibat terlalu banyak aktivitas tanpa istirahat yang cukup.",
    badge: "Serius",
    badgeBg: "bg-[#FCEBEB]",
    badgeColor: "text-[#A32D2D]",
  },
  {
    icon: "💰",
    iconBg: "bg-green-light",
    title: "Masalah Finansial",
    desc: "Tekanan biaya kuliah, kebutuhan hidup, dan ketidakpastian finansial yang mempengaruhi kondisi mental.",
    badge: "Umum",
    badgeBg: "bg-green-light",
    badgeColor: "text-green",
  },
  {
    icon: "😴",
    iconBg: "bg-amber-light",
    title: "Gangguan Tidur",
    desc: "Insomnia, pola tidur tidak teratur, atau tidur berlebihan sebagai respons terhadap tekanan psikologis.",
    badge: "Perlu Perhatian",
    badgeBg: "bg-amber-light",
    badgeColor: "text-amber",
  },
];

export default function Issues() {
  return (
    <section id="masalah" className="px-[5%] py-16">
      <div className="font-serif text-3xl font-semibold mb-2">
        Masalah yang Sering Dihadapi Mahasiswa
      </div>
      <div className="text-gray-400 text-[15px] mb-10">
        Kenali tanda-tanda dan temukan cara mengatasinya bersama
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {issues.map((item, i) => (
          <div
            key={i}
            className="bg-white border border-black/10 rounded-xl p-7 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${item.iconBg}`}
            >
              {item.icon}
            </div>
            <h3 className="text-[17px] font-medium mb-2">{item.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
            <span
              className={`inline-block text-[11px] px-2.5 py-1 rounded-full mt-3.5 font-medium ${item.badgeBg} ${item.badgeColor}`}
            >
              {item.badge}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}