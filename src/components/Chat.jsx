import React, { useState } from "react";
import { Calendar, DollarSign, MapPin, Mic, Send, X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [zoomImage, setZoomImage] = useState(null);

  return (
    <div className="h-screen overflow-hidden bg-transparent p-4 md:p-5">
      <div className="mx-auto grid h-full max-w-[1500px] gap-4 md:gap-5 lg:grid-cols-[220px_1fr]">
        <Sidebar />

        <main className="grid min-h-0 min-w-0 gap-4 md:gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
          <section className="grid min-h-0 min-w-0 gap-4 md:gap-5 md:grid-rows-[250px_minmax(300px,1fr)]">
            <div className="relative overflow-hidden rounded-3xl border border-blue-200/20 bg-gradient-to-br from-slate-900/85 via-blue-950/75 to-cyan-900/60 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,#cbd5e11f_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e11f_1px,transparent_1px)] [background-size:28px_28px]" />
              <div className="relative z-10 space-y-2">
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/80">Live Route Preview</p>
                <h2 className="font-[Sora] text-3xl font-semibold text-slate-100 md:text-4xl">Pune, Maharashtra</h2>
                <p className="text-sm text-slate-300/90 md:text-base">3 hotspots discovered near your stay</p>
              </div>
            </div>

            <div className="grid min-h-0 grid-rows-[1fr_auto] gap-4 rounded-3xl border border-blue-200/15 bg-slate-900/50 p-4 shadow-[0_18px_70px_rgba(3,10,26,0.6)] backdrop-blur-xl md:p-5">
              <div className="grid min-h-0 gap-3 overflow-y-auto pr-1">
                <p className="w-fit max-w-[85%] rounded-2xl rounded-bl-sm bg-white/12 px-4 py-3 text-sm text-slate-100">
                  Ask me to plan your next trip with dates and budget.
                </p>
                <p className="justify-self-end rounded-2xl rounded-br-sm bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-3 text-sm font-medium text-slate-900">
                  Plan a 2-day Pune trip with food spots and forts.
                </p>
                <p className="w-fit max-w-[85%] rounded-2xl rounded-bl-sm bg-white/12 px-4 py-3 text-sm text-slate-100">
                  Great choice. I built a compact route with travel time in mind.
                </p>
              </div>

              <div className="grid grid-cols-[1fr_auto_auto] gap-2">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Plan a 2-day Pune trip..."
                  className="rounded-2xl border border-blue-100/20 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-cyan-300"
                />
                <button
                  className="grid h-11 w-11 place-items-center rounded-2xl border border-blue-100/20 bg-slate-950/70 text-cyan-100 transition hover:border-cyan-300"
                  type="button"
                  aria-label="Voice input"
                >
                  <Mic size={18} />
                </button>
                <button
                  className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-amber-300 to-orange-500 text-slate-900 transition hover:-translate-y-0.5"
                  type="button"
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </section>

          <aside className="grid min-h-0 content-start gap-3 overflow-y-auto rounded-3xl border border-blue-100/15 bg-slate-900/55 p-4 shadow-[0_20px_60px_rgba(2,8,24,0.6)] backdrop-blur-lg md:p-5">
            <h2 className="flex items-center gap-2 font-[Sora] text-lg font-semibold text-slate-50">
              <Calendar size={18} /> Itinerary
            </h2>

            <div className="rounded-2xl border border-blue-100/15 bg-slate-950/45 p-4">
              <h3 className="text-sm font-semibold text-slate-100">Day 1</h3>
              <button
                type="button"
                onClick={() =>
                  setZoomImage({
                    src: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
                    title: "Day 1 - Pune Old Town",
                  })
                }
                className="group relative mt-3 block w-full overflow-hidden rounded-xl border border-blue-100/20"
              >
                <img
                  src="https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
                  alt="Day 1 itinerary preview"
                  className="h-28 w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                <span className="absolute bottom-2 right-2 rounded-md border border-cyan-200/30 bg-cyan-300/15 px-2 py-1 text-[11px] text-cyan-100">
                  Zoom
                </span>
              </button>
              <ul className="mt-3 grid gap-2">
                <li className="flex items-center gap-2 text-sm text-slate-300"><MapPin size={14} /> Shaniwar Wada</li>
                <li className="flex items-center gap-2 text-sm text-slate-300"><MapPin size={14} /> Lunch Spot</li>
                <li className="flex items-center gap-2 text-sm text-slate-300"><MapPin size={14} /> Aga Khan Palace</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-blue-100/15 bg-slate-950/45 p-4">
              <h3 className="text-sm font-semibold text-slate-100">Day 2</h3>
              <button
                type="button"
                onClick={() =>
                  setZoomImage({
                    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
                    title: "Day 2 - Fort and Hillside",
                  })
                }
                className="group relative mt-3 block w-full overflow-hidden rounded-xl border border-blue-100/20"
              >
                <img
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80"
                  alt="Day 2 itinerary preview"
                  className="h-28 w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                <span className="absolute bottom-2 right-2 rounded-md border border-cyan-200/30 bg-cyan-300/15 px-2 py-1 text-[11px] text-cyan-100">
                  Zoom
                </span>
              </button>
              <ul className="mt-3 grid gap-2">
                <li className="flex items-center gap-2 text-sm text-slate-300"><MapPin size={14} /> Sinhagad Fort</li>
                <li className="flex items-center gap-2 text-sm text-slate-300"><MapPin size={14} /> Cafe Visit</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-blue-100/15 bg-slate-950/45 p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-100">
                <DollarSign size={16} /> Budget
              </h3>
              <p className="mt-2 text-sm text-slate-300">Rs 3000 / Rs 5000 used</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
                <span className="block h-full w-3/5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
              </div>
            </div>
          </aside>
        </main>
      </div>

      {zoomImage && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/85 p-4"
          onClick={() => setZoomImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Itinerary image zoom"
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-blue-100/25 bg-slate-900"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setZoomImage(null)}
              className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-lg border border-blue-100/25 bg-slate-950/65 px-2.5 py-1.5 text-xs font-medium text-slate-100"
            >
              <X size={14} /> Close
            </button>
            <img src={zoomImage.src} alt={zoomImage.title} className="max-h-[85vh] w-full object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
