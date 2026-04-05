const contacts = [
  {
    icon: "🏫",
    name: "Konselor UMSU",
    detail: "Gedung Rektorat Lt. 2 · Senin–Jumat, 08.00–16.00",
  },
  {
    icon: "📞",
    name: "Into The Light Indonesia",
    detail: "119 ext. 8 · Hotline Nasional 24 Jam",
  },
  {
    icon: "💬",
    name: "Yayasan Pulih",
    detail: "(021) 788-42580 · Konsultasi Psikologi",
  },
  {
    icon: "🚨",
    name: "Darurat Medis",
    detail: "119 · Layanan Darurat 24 Jam",
  },
];

export default function Emergency() {
  return (
    <section id="bantuan" className="bg-white px-[5%] py-16">
      <div className="font-serif text-3xl font-semibold mb-2">
        Butuh Bantuan Sekarang?
      </div>
      <div className="text-gray-400 text-[15px] mb-10">
        Jika kamu atau seseorang sedang dalam kondisi darurat mental, hubungi segera
      </div>

      <div className="bg-[#fff8f0] border border-[#fac775] rounded-2xl p-8">
        <h3 className="font-serif text-xl text-[#854F0B] mb-2">
          Kontak Darurat Kesehatan Mental
        </h3>
        <p className="text-[#633806] text-sm leading-relaxed mb-5">
          Jangan tunggu sampai kondisinya memburuk. Tim profesional siap membantu kapan saja kamu membutuhkan.
        </p>

        <div className="flex flex-col gap-2.5">
          {contacts.map((c, i) => (
            <div
              key={i}
              className="flex items-center gap-3.5 bg-white rounded-xl px-4 py-3.5 border border-black/8"
            >
              <span className="text-xl w-9 text-center flex-shrink-0">{c.icon}</span>
              <div>
                <div className="font-medium text-[15px]">{c.name}</div>
                <div className="text-sm text-gray-400">{c.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}