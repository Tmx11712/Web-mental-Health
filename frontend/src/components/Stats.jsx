const stats = [
  { num: "1 dari 3", label: "Mahasiswa alami stres akademik" },
  { num: "68%", label: "Tidak tahu harus melapor ke mana" },
  { num: "42%", label: "Pernah merasa kelelahan mental" },
  { num: "24/7", label: "Dukungan hotline tersedia" },
];

export default function Stats() {
  return (
    <div className="bg-white border-b border-black/10 px-[5%] grid grid-cols-2 md:grid-cols-4">
      {stats.map((s, i) => (
        <div
          key={i}
          className={`text-center py-8 px-5 ${
            i < stats.length - 1
              ? "border-b md:border-b-0 md:border-r border-black/10"
              : ""
          }`}
        >
          <div className="font-serif text-4xl text-green font-bold">{s.num}</div>
          <div className="text-[13px] text-gray-400 mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  );
}