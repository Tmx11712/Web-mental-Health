import { useState, useEffect } from "react";
import axios from "axios";

export default function Polling() {
  const [selected, setSelected] = useState(-1);
  const [voted, setVoted] = useState(false);
  const [pollingData, setPollingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

  useEffect(() => {
    fetchPolling();
  }, []);

  const fetchPolling = async () => {
    try {
      const res = await axios.get(`${API_URL}/polling`);
      if (res.data && res.data.data) {
        setPollingData(res.data.data);
      }
    } catch (error) {
      console.error("Failed to load polling", error);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  const handleVote = async () => {
    if (selected === -1) {
      showToast("Pilih salah satu opsi terlebih dahulu");
      return;
    }

    try {
      const optionId = pollingData.opsi[selected].id;
      await axios.post(`${API_URL}/polling/${pollingData.id}/vote`, {
        polling_option_id: optionId
      });

      setVoted(true);
      showToast("Terima kasih! Suaramu telah tercatat.");

      // Fetch updated results
      fetchPolling();
    } catch (error) {
      showToast("Gagal mengirim suara. Coba lagi nanti.");
    }
  };

  if (loading) {
    return (
      <section id="polling" className="px-[5%] py-16 text-center">
        <div className="text-gray-400">Memuat polling...</div>
      </section>
    );
  }

  if (!pollingData) {
    return null;
  }

  const total = pollingData.total_votes;

  return (
    <>
      <section id="polling" className="px-[5%] py-16">
        <div className="font-serif text-3xl font-semibold mb-2">
          Polling Kesehatan Mental
        </div>
        <div className="text-gray-400 text-[15px] mb-10">
          Suaramu penting untuk memahami kondisi mahasiswa
        </div>

        <div className="bg-green-light rounded-2xl p-10">
          <div className="font-serif text-[22px] font-semibold mb-1.5">
            {pollingData.pertanyaan}
          </div>
          <div className="text-gray-400 text-sm mb-7">
            Pilih satu jawaban yang paling sesuai dengan kondisimu saat ini
          </div>

          {/* Options */}
          <div className="flex flex-col gap-2.5">
            {pollingData.opsi.map((opt, i) => (
              <button
                key={opt.id}
                onClick={() => !voted && setSelected(i)}
                className={`bg-white border-[1.5px] rounded-xl px-5 py-3.5 cursor-pointer flex items-center gap-3 text-[15px] text-left transition-all duration-200 ${
                  selected === i
                    ? "border-green bg-[#f0faf6]"
                    : "border-black/10 hover:border-green"
                } ${voted ? "cursor-default" : ""}`}
              >
                {/* radio */}
                <span
                  className={`w-[18px] h-[18px] rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                    selected === i ? "border-green" : "border-black/10"
                  }`}
                >
                  {selected === i && (
                    <span className="w-2 h-2 rounded-full bg-green block" />
                  )}
                </span>
                {opt.teks_opsi}
              </button>
            ))}
          </div>

          {/* Vote button */}
          {!voted && (
            <button
              onClick={handleVote}
              className="mt-5 bg-green text-white border-none px-7 py-3 rounded-lg text-[15px] font-sans cursor-pointer transition-colors duration-200 hover:bg-green-dark"
            >
              Kirim Suara Saya
            </button>
          )}

          {/* Results */}
          {voted && (
            <div className="mt-7">
              <div className="text-sm font-medium text-green mb-4">
                Hasil Polling Sementara ({total} responden)
              </div>
              {pollingData.opsi.map((opt, i) => {
                const pct = total > 0 ? Math.round((opt.jumlah_vote / total) * 100) : 0;
                return (
                  <div key={opt.id} className="mb-3">
                    <div className="flex justify-between text-[13px] text-gray-400 mb-1">
                      <span>{opt.teks_opsi}</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-2 bg-black/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-mid rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 right-8 bg-green text-white px-6 py-3.5 rounded-xl text-sm z-50 shadow-lg animate-bounce-in">
          {toast}
        </div>
      )}
    </>
  );
}