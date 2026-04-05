import { useState } from "react";

const options = [
  "Stres akademik dan tekanan tugas",
  "Masalah keuangan dan biaya hidup",
  "Kesepian dan kurangnya dukungan sosial",
  "Ketidakpastian masa depan dan karir",
];

const labels = [
  "Stres akademik",
  "Masalah finansial",
  "Kesepian & isolasi",
  "Ketidakpastian karir",
];

const initialData = [38, 27, 21, 14];

export default function Polling() {
  const [selected, setSelected] = useState(-1);
  const [voted, setVoted] = useState(false);
  const [data, setData] = useState(initialData);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  const handleVote = () => {
    if (selected === -1) {
      showToast("Pilih salah satu opsi terlebih dahulu");
      return;
    }
    const newData = [...data];
    newData[selected] += 1;
    setData(newData);
    setVoted(true);
    showToast("Terima kasih! Suaramu telah tercatat.");
  };

  const total = data.reduce((a, b) => a + b, 0);

  return (
    <>
      <section id="polling" className="px-[5%] py-16">
        <div className="font-serif text-3xl font-semibold mb-2">
          Polling Kesehatan Mental
        </div>
        <div className="text-gray-400 text-[15px] mb-10">
          Bantu kami memahami kondisi mahasiswa UMSU lebih baik
        </div>

        <div className="bg-green-light rounded-2xl p-10">
          <div className="font-serif text-[22px] font-semibold mb-1.5">
            Apa masalah terbesar yang kamu hadapi sebagai mahasiswa?
          </div>
          <div className="text-gray-400 text-sm mb-7">
            Pilih satu jawaban yang paling sesuai dengan kondisimu saat ini
          </div>

          {/* Options */}
          <div className="flex flex-col gap-2.5">
            {options.map((opt, i) => (
              <button
                key={i}
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
                {opt}
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
              {labels.map((label, i) => {
                const pct = Math.round((data[i] / total) * 100);
                return (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between text-[13px] text-gray-400 mb-1">
                      <span>{label}</span>
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