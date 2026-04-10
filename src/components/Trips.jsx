import { useMemo, useState } from "react";
import {
  CalendarDays,
  Users,
  Pencil,
  Share2,
  Sparkles,
  Trash2,
  Wallet,
  Star,
} from "lucide-react";
import Sidebar from "./Sidebar";

const tripEntries = [
  {
    id: 1,
    destination: "Kyoto, Japan",
    image: "https://www.datocms-assets.com/101439/1705405366-fushimi-inari-shrine.webp?auto=format&fit=max&w=1200",
    startDate: "2026-05-12",
    endDate: "2026-05-17",
    duration: "6 Days",
    people: 2,
    budget: "$2,450",
    status: "upcoming",
    saved: true,
    highlights: ["Arashiyama Bamboo Grove", "Gion Night Walk", "Kaiseki Dinner"],
    itinerary: [
      { day: "Day 1", plan: "Arrival, hotel check-in, evening walk in Pontocho" },
      { day: "Day 2", plan: "Fushimi Inari shrine trail and Nishiki market" },
      { day: "Day 3", plan: "Bamboo forest, monkey park, river cruise" },
      { day: "Day 4", plan: "Tea ceremony, Kiyomizu-dera, Gion district" },
      { day: "Day 5", plan: "Day trip to Nara and local food tasting" },
      { day: "Day 6", plan: "Souvenir shopping and departure" },
    ],
    budgetBreakdown: [
      { category: "Stay", amount: "$900", percent: 37 },
      { category: "Flights", amount: "$760", percent: 31 },
      { category: "Food", amount: "$430", percent: 18 },
      { category: "Activities", amount: "$360", percent: 14 },
    ],
  },
  {
    id: 2,
    destination: "Istanbul, Turkey",
    image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1400&q=80",
    startDate: "2026-03-04",
    endDate: "2026-03-09",
    duration: "5 Days",
    people: 4,
    budget: "$1,860",
    status: "completed",
    saved: false,
    highlights: ["Bosporus Cruise", "Hagia Sophia", "Grand Bazaar"],
    itinerary: [
      { day: "Day 1", plan: "Sultanahmet tour and rooftop dinner" },
      { day: "Day 2", plan: "Topkapi Palace and spice market" },
      { day: "Day 3", plan: "Bosphorus ferry and Ortakoy exploration" },
      { day: "Day 4", plan: "Balat streets and local cafe hopping" },
      { day: "Day 5", plan: "Shopping and departure" },
    ],
    budgetBreakdown: [
      { category: "Stay", amount: "$620", percent: 33 },
      { category: "Flights", amount: "$510", percent: 28 },
      { category: "Food", amount: "$360", percent: 19 },
      { category: "Activities", amount: "$370", percent: 20 },
    ],
  },
  {
    id: 3,
    destination: "Queenstown, New Zealand",
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1400&q=80",
    startDate: "2026-07-22",
    endDate: "2026-07-28",
    duration: "7 Days",
    people: 3,
    budget: "$3,200",
    status: "upcoming",
    saved: true,
    highlights: ["Milford Sound", "Skyline Luge", "Lake Wakatipu"],
    itinerary: [
      { day: "Day 1", plan: "Arrival and lakefront relaxation" },
      { day: "Day 2", plan: "Adventure sports and gondola ride" },
      { day: "Day 3", plan: "Wine valley guided tour" },
      { day: "Day 4", plan: "Milford Sound scenic cruise" },
      { day: "Day 5", plan: "Onsen spa and mountain views" },
      { day: "Day 6", plan: "Road trip to Glenorchy" },
      { day: "Day 7", plan: "Brunch and departure" },
    ],
    budgetBreakdown: [
      { category: "Stay", amount: "$1,240", percent: 39 },
      { category: "Flights", amount: "$1,100", percent: 34 },
      { category: "Food", amount: "$430", percent: 13 },
      { category: "Activities", amount: "$430", percent: 14 },
    ],
  },
];

const filters = [
  { id: "all", label: "All Trips" },
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
  { id: "saved", label: "Saved" },
];

const statusClasses = {
  upcoming: "bg-emerald-400/20 text-emerald-200 border-emerald-300/30",
  completed: "bg-indigo-400/20 text-indigo-200 border-indigo-300/30",
};

export default function Trips() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedTripId, setSelectedTripId] = useState(tripEntries[0].id);

  const filteredTrips = useMemo(() => {
    if (activeFilter === "all") {
      return tripEntries;
    }

    if (activeFilter === "saved") {
      return tripEntries.filter((trip) => trip.saved);
    }

    return tripEntries.filter((trip) => trip.status === activeFilter);
  }, [activeFilter]);

  const selectedTrip =
    filteredTrips.find((trip) => trip.id === selectedTripId) ?? filteredTrips[0] ?? null;

  const onTripAction = (action, destination) => {
    // Placeholder action handler until backend integration is ready.
    window.alert(`${action} action for ${destination}`);
  };

  return (
    <div className="h-screen overflow-hidden bg-transparent p-4 md:p-5">
      <div className="mx-auto grid h-full max-w-[1500px] gap-4 md:gap-5 lg:grid-cols-[220px_1fr]">
        <Sidebar />

        <main className="grid min-h-0 min-w-0 gap-4 md:gap-5">
          <header className="rounded-3xl border border-blue-100/15 bg-slate-900/55 p-5 backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-[Sora] text-2xl font-semibold text-slate-100 md:text-3xl">Trips</h2>
                <p className="mt-1 text-sm text-slate-300">Track plans, relive journeys, and regenerate ideas.</p>
              </div>
              <div className="rounded-xl border border-cyan-300/35 bg-cyan-400/10 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-cyan-200">
                {filteredTrips.length} visible
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                    activeFilter === filter.id
                      ? "bg-cyan-300 text-slate-900"
                      : "bg-slate-800/80 text-slate-200 hover:bg-slate-700"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </header>

          <section className="grid min-h-0 min-w-0 gap-4 md:gap-5 xl:grid-cols-[minmax(0,1fr)_430px]">
            <div className="min-h-0 min-w-0 overflow-y-auto pr-1">
              <div className="flex flex-col gap-3 pb-2 md:gap-4">
              {filteredTrips.map((trip) => (
                <article
                  key={trip.id}
                  onClick={() => setSelectedTripId(trip.id)}
                  className={`flex cursor-pointer flex-col overflow-hidden rounded-2xl border transition ${
                    selectedTrip?.id === trip.id
                      ? "border-cyan-300/60 bg-cyan-400/10"
                      : "border-blue-100/15 bg-slate-900/55 hover:border-cyan-300/40"
                  }`}
                >
                  <div className="relative h-44 w-full">
                    <img src={trip.image} alt={trip.destination} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent" />
                    <span
                      className={`absolute right-3 top-3 rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${statusClasses[trip.status]}`}
                    >
                      {trip.status}
                    </span>
                    <h3 className="absolute bottom-3 left-3 right-3 font-[Sora] text-lg font-semibold text-slate-100">
                      {trip.destination}
                    </h3>
                  </div>

                  <div className="space-y-4 p-4 md:p-5">
                    <div>
                      <h3 className="font-[Sora] text-lg font-semibold text-slate-100">{trip.destination}</h3>
                      <p className="mt-1 flex items-center gap-2 text-sm text-slate-300">
                        <CalendarDays size={15} /> {trip.startDate} to {trip.endDate} ({trip.duration})
                      </p>
                      <p className="mt-1 flex items-center gap-2 text-sm text-slate-300">
                        <Wallet size={15} /> Budget: {trip.budget}
                      </p>
                      <p className="mt-1 flex items-center gap-2 text-sm text-slate-300">
                        <Users size={15} /> People: {trip.people}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <ActionButton icon={Pencil} label="Edit" onClick={() => onTripAction("Edit", trip.destination)} />
                      <ActionButton icon={Trash2} label="Delete" onClick={() => onTripAction("Delete", trip.destination)} />
                      <ActionButton
                        icon={Sparkles}
                        label="Regenerate"
                        onClick={() => onTripAction("Regenerate (AI)", trip.destination)}
                      />
                      <ActionButton icon={Share2} label="Share" onClick={() => onTripAction("Share", trip.destination)} />
                    </div>
                  </div>
                </article>
              ))}
              </div>

              {filteredTrips.length === 0 && (
                <div className="rounded-2xl border border-blue-100/15 bg-slate-900/55 p-6 text-center text-slate-300">
                  No trips in this category yet.
                </div>
              )}
            </div>

            <aside className="min-h-0 overflow-y-auto rounded-3xl border border-blue-100/15 bg-slate-900/55 p-4 backdrop-blur-xl md:p-5">
              {!selectedTrip ? (
                <p className="text-sm text-slate-300">Select a trip to view details.</p>
              ) : (
                <div className="grid gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/90">Trip Details</p>
                    <h3 className="mt-1 font-[Sora] text-xl font-semibold text-slate-100">{selectedTrip.destination}</h3>
                    <p className="mt-1 flex items-center gap-2 text-sm text-slate-300">
                      <Users size={15} /> {selectedTrip.people} travelers
                    </p>
                  </div>

                  <div className="group relative block overflow-hidden rounded-2xl border border-blue-100/20">
                    <img
                      src={selectedTrip.image}
                      alt={`${selectedTrip.destination} preview`}
                      className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-white">
                      {selectedTrip.destination}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-blue-100/15 bg-slate-950/40 p-4">
                    <p className="mb-3 text-sm font-semibold text-slate-100">Day-wise Plan</p>
                    <ul className="grid gap-3">
                      {selectedTrip.itinerary.map((item) => (
                        <li key={item.day} className="rounded-xl border border-blue-100/10 bg-slate-900/60 p-3">
                          <p className="text-sm font-medium text-cyan-200">{item.day}</p>
                          <p className="mt-1 text-sm text-slate-300">{item.plan}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-blue-100/15 bg-slate-950/40 p-4">
                    <p className="mb-3 text-sm font-semibold text-slate-100">Budget Breakdown</p>
                    <ul className="grid gap-3">
                      {selectedTrip.budgetBreakdown.map((item) => (
                        <li key={item.category}>
                          <div className="flex items-center justify-between text-sm text-slate-300">
                            <span>{item.category}</span>
                            <span>{item.amount}</span>
                          </div>
                          <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/15">
                            <span
                              className="block h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                              style={{ width: `${item.percent}%` }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-blue-100/15 bg-slate-950/40 p-4">
                    <p className="mb-2 text-sm font-semibold text-slate-100">Highlights</p>
                    <ul className="grid gap-2">
                      {selectedTrip.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-center gap-2 text-sm text-slate-300">
                          <Star size={14} className="text-amber-300" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}

function ActionButton({ icon, label, onClick }) {
  const IconComponent = icon;

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className="inline-flex items-center gap-1.5 rounded-lg border border-blue-100/20 bg-slate-950/60 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition hover:border-cyan-300/70 hover:text-white"
    >
      <IconComponent size={14} /> {label}
    </button>
  );
}
