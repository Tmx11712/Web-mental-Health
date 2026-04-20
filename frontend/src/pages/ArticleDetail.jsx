import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getArticleBySlug } from "../data/artikelData";

export default function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Ambil dari data statis, bukan API
    const found = getArticleBySlug(slug);
    setArticle(found);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex flex-col">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-green/20 border-t-green rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-bg">
        <Navbar />
        <div className="flex-1 flex flex-col justify-center items-center px-6">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="font-serif text-2xl font-bold mb-2">Oops!</h2>
          <p className="text-gray-400 mb-6">Artikel tidak ditemukan</p>
          <Link
            to="/"
            className="text-green border border-green px-6 py-2 rounded-lg hover:bg-green hover:text-white transition-colors no-underline"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-12 md:py-20">
        <Link
          to="/"
          className="inline-block text-sm text-gray-400 hover:text-green mb-8 no-underline transition-colors"
        >
          ← Kembali ke Beranda
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-green-light text-green px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full">
              {article.kategori}
            </span>
            <span className="text-gray-400 text-sm">
              ⏳ {article.waktu_baca} menit baca
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {article.judul}
          </h1>

          <div className="flex items-center gap-3 border-t border-black/10 pt-6">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center text-lg">
              {article.emoji || "✍️"}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">{article.penulis}</div>
              <div className="text-xs text-gray-400">
                {new Date(article.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>
        </header>

        <article
          className="prose prose-green lg:prose-lg max-w-none text-gray-800 leading-relaxed
            prose-h2:font-serif prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4
            prose-p:mb-5 prose-p:text-[15px] md:prose-p:text-[17px] prose-a:text-green"
        >
          <div dangerouslySetInnerHTML={{ __html: article.konten }} />
        </article>
      </main>

      <Footer />
    </div>
  );
}
