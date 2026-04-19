import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/artikel");
        if (res.ok) {
          const data = await res.json();
          setArticles(data.slice(0, 6)); // Display max 6 on homepage
        }
      } catch (err) {
        console.error("Gagal menarik data artikel", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Use some default colors sequentially for aesthetics
  const bgColors = ["bg-green-light", "bg-amber-light", "bg-[#EEEDFE]", "bg-[#FCEBEB]"];

  return (
    <section id="artikel" className="bg-white px-[5%] py-16">
      <div className="font-serif text-3xl font-semibold mb-2">
        Artikel & Informasi
      </div>
      <div className="text-gray-400 text-[15px] mb-10">
        Bacaan ringan untuk membantu kamu memahami dan menjaga kesehatan mental
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="w-10 h-10 border-4 border-green/20 border-t-green rounded-full animate-spin" />
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-8 text-gray-400">Belum ada artikel tersedia.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a, i) => {
            const bgClass = bgColors[i % bgColors.length];
            return (
              <Link
                to={`/artikel/${a.slug}`}
                key={a.id}
                className="bg-white border border-black/10 rounded-xl overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg no-underline flex flex-col h-full"
              >
                <div
                  className={`h-36 flex items-center justify-center text-5xl flex-shrink-0 ${bgClass}`}
                >
                  {a.emoji || "📄"}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-[11px] text-green font-medium mb-2 uppercase tracking-wider">
                    {a.kategori}
                  </div>
                  <h3 className="text-base text-gray-900 font-medium leading-snug mb-2">{a.judul}</h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed flex-1 line-clamp-3">{a.ringkasan}</p>
                  <div className="text-[12px] text-gray-400 mt-3.5">
                    {a.waktu_baca} menit baca · {a.penulis}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}