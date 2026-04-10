import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Clock3,
  Compass,
  Flame,
  MapPinned,
  Plus,
  Search,
  Sparkles,
  Users,
  Wallet,
  X,
} from "lucide-react";
import Sidebar from "./Sidebar";

const suggestions = [
  {
    id: 1,
    destination: "Kyoto, Japan",
    image: "https://www.datocms-assets.com/101439/1705405366-fushimi-inari-shrine.webp?auto=format&fit=max&w=1200",
    duration: "6 Days",
    durationType: "short",
    season: "spring",
    vibe: "culture",
    groupType: "couple",
    intensity: "Balanced",
    alerts: ["Temple district crowds increase after 11 AM"],
    why: ["Cherry blossom season fit", "Strong food + heritage match", "Walkable city clusters"],
    highlights: ["Arashiyama morning trail", "Tea ceremony in Gion", "Nishiki market crawl"],
    plans: {
      budget: { estimatedCost: "$1,880", pace: "Relaxed", confidence: 86 },
      balanced: { estimatedCost: "$2,420", pace: "Moderate", confidence: 93 },
      premium: { estimatedCost: "$3,250", pace: "Curated", confidence: 88 },
    },
  },
  {
    id: 2,
    destination: "Lisbon, Portugal",
    image: "https://isleblue.co/magazine/wp-content/uploads/2020/02/lisbon-ranked-as-top-spring-holiday-destination-algarve-rock-1024x682.jpg",
    duration: "5 Days",
    durationType: "weekend",
    season: "summer",
    vibe: "food",
    groupType: "friends",
    intensity: "Active",
    alerts: ["Coastal stays are selling out early", "Midday heat can impact walking routes"],
    why: ["Great value flights this month", "High density of local food neighborhoods", "Fast transit links"],
    highlights: ["Alfama sunset walk", "Pastel de nata tasting map", "Sintra day loop"],
    plans: {
      budget: { estimatedCost: "$1,240", pace: "Fast", confidence: 82 },
      balanced: { estimatedCost: "$1,760", pace: "Moderate", confidence: 90 },
      premium: { estimatedCost: "$2,540", pace: "Curated", confidence: 85 },
    },
  },
  {
    id: 3,
    destination: "Banff, Canada",
    image: "https://inspiredroutes.com/wp-content/uploads/2023/08/banff-in-summer-728x546.jpg",
    duration: "7 Days",
    durationType: "long",
    season: "autumn",
    vibe: "nature",
    groupType: "family",
    intensity: "Balanced",
    alerts: ["Some trails close early in shoulder season"],
    why: ["Perfect for scenic + family mix", "Low noise destinations around lake area", "Great multi-age activities"],
    highlights: ["Moraine Lake sunrise", "Banff gondola", "Icefields Parkway drive"],
    plans: {
      budget: { estimatedCost: "$2,460", pace: "Relaxed", confidence: 81 },
      balanced: { estimatedCost: "$3,080", pace: "Moderate", confidence: 90 },
      premium: { estimatedCost: "$4,120", pace: "Curated", confidence: 87 },
    },
  },
  {
    id: 4,
    destination: "Bali, Indonesia",
    image: "https://www.iroamly.com/images/bali-indonesia-cover.webp",
    duration: "4 Days",
    durationType: "weekend",
    season: "winter",
    vibe: "adventure",
    groupType: "solo",
    intensity: "Fast",
    alerts: ["Rain bursts expected on 2 of 4 days"],
    why: ["Strong solo traveler route map", "Affordable stays with high ratings", "High regenerate potential by vibe"],
    highlights: ["Ubud waterfall trail", "Nusa Penida speedboat", "Sunset beach run"],
    plans: {
      budget: { estimatedCost: "$920", pace: "Fast", confidence: 88 },
      balanced: { estimatedCost: "$1,320", pace: "Moderate", confidence: 94 },
      premium: { estimatedCost: "$2,020", pace: "Curated", confidence: 89 },
    },
  },
];

const compareModes = ["budget", "balanced", "premium"];

export default function AiSuggestions() {
  const [searchText, setSearchText] = useState("");
  const [activeMode, setActiveMode] = useState("balanced");
  const [budgetFilter, setBudgetFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const [vibeFilter, setVibeFilter] = useState("all");
  const [groupFilter, setGroupFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(suggestions[0].id);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const visibleSuggestions = useMemo(() => {
    return suggestions.filter((suggestion) => {
      const matchesSearch = suggestion.destination.toLowerCase().includes(searchText.toLowerCase());
      const modeCost = suggestion.plans[activeMode].estimatedCost.replace(/[$,]/g, "");
      const costValue = Number(modeCost);
      const matchesBudget =
        budgetFilter === "all" ||
        (budgetFilter === "budget" && costValue <= 1500) ||
        (budgetFilter === "balanced" && costValue > 1500 && costValue <= 2800) ||
        (budgetFilter === "premium" && costValue > 2800);
      const matchesDuration = durationFilter === "all" || suggestion.durationType === durationFilter;
      const matchesVibe = vibeFilter === "all" || suggestion.vibe === vibeFilter;
      const matchesGroup = groupFilter === "all" || suggestion.groupType === groupFilter;

      return matchesSearch && matchesBudget && matchesDuration && matchesVibe && matchesGroup;
    });
  }, [activeMode, budgetFilter, durationFilter, groupFilter, searchText, vibeFilter]);

  const selectedSuggestion =
    visibleSuggestions.find((suggestion) => suggestion.id === selectedId) ?? visibleSuggestions[0] ?? null;

  const handleQuickAction = (label, destination) => {
    window.alert(`${label} for ${destination}`);
  };

  return (
    <div className="h-screen overflow-hidden bg-transparent p-4 md:p-5">
      <div className="mx-auto grid h-full max-w-[1500px] gap-4 md:gap-5 lg:grid-cols-[220px_1fr]">
        <Sidebar />

        <main className="grid min-h-0 min-w-0 gap-4 md:gap-5">
          <header className="rounded-3xl border border-blue-100/15 bg-slate-900/55 p-5 backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-[Sora] text-2xl font-semibold text-slate-100 md:text-3xl">AI Suggestions</h2>
                <p className="mt-1 text-sm text-slate-300">Inspiration to itinerary in one flow.</p>
              </div>
              <div className="rounded-xl border border-cyan-300/35 bg-cyan-400/10 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-cyan-200">
                {visibleSuggestions.length} ideas
              </div>
            </div>

            <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_auto]">
              <label className="relative block">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  placeholder="Where do you want to go?"
                  className="w-full rounded-xl border border-blue-100/20 bg-slate-950/70 py-2.5 pl-9 pr-4 text-sm text-white outline-none placeholder:text-slate-400 focus:border-cyan-300"
                />
              </label>

              <div className="flex flex-wrap gap-2">
                {compareModes.map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setActiveMode(mode)}
                    className={`rounded-xl px-4 py-2 text-sm font-medium capitalize transition ${
                      activeMode === mode
                        ? "bg-cyan-300 text-slate-900"
                        : "bg-slate-800/80 text-slate-200 hover:bg-slate-700"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <FilterChip
                label="Budget"
                value={budgetFilter}
                onChange={setBudgetFilter}
                options={["all", "budget", "balanced", "premium"]}
              />
              <FilterChip
                label="Duration"
                value={durationFilter}
                onChange={setDurationFilter}
                options={["all", "weekend", "short", "long"]}
              />
              <FilterChip
                label="Vibe"
                value={vibeFilter}
                onChange={setVibeFilter}
                options={["all", "culture", "food", "nature", "adventure"]}
              />
              <FilterChip
                label="Group"
                value={groupFilter}
                onChange={setGroupFilter}
                options={["all", "solo", "couple", "friends", "family"]}
              />
            </div>
          </header>

          <section className="grid min-h-0 min-w-0 gap-4 md:gap-5 xl:grid-cols-[minmax(0,1fr)_440px]">
            <div className="min-h-0 min-w-0 overflow-y-auto pr-1">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-400">Scroll suggestions</p>
              <div className="grid min-h-0 grid-cols-1 content-start gap-3 pb-2 md:grid-cols-2 md:gap-4">
              {visibleSuggestions.map((suggestion) => {
                const isSelected = selectedSuggestion?.id === suggestion.id;
                return (
                  <article
                    key={suggestion.id}
                    onClick={() => setSelectedId(suggestion.id)}
                    className={`w-full cursor-pointer overflow-hidden rounded-2xl border transition ${
                      isSelected
                        ? "border-cyan-300/60 bg-cyan-400/10"
                        : "border-blue-100/15 bg-slate-900/55 hover:border-cyan-300/40"
                    }`}
                  >
                    <div className="relative aspect-square w-full">
                      <img src={suggestion.image} alt={suggestion.destination} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <p className="font-[Sora] text-base font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)] md:text-lg">
                          {suggestion.destination}
                        </p>
                        <span className="rounded-full border border-cyan-200/30 bg-cyan-400/15 px-2.5 py-1 text-xs text-cyan-100">
                          {suggestion.intensity}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 p-4">
                      <div className="grid grid-cols-2 gap-2 text-sm text-slate-300">
                        <p className="flex items-center gap-1.5"><Clock3 size={14} /> {suggestion.duration}</p>
                        <p className="flex items-center gap-1.5"><Wallet size={14} /> {suggestion.plans[activeMode].estimatedCost}</p>
                        <p className="flex items-center gap-1.5 capitalize"><Compass size={14} /> {suggestion.vibe}</p>
                        <p className="flex items-center gap-1.5 capitalize"><Users size={14} /> {suggestion.groupType}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleQuickAction("Save inspiration", suggestion.destination);
                          }}
                          className="rounded-lg border border-blue-100/20 bg-slate-950/60 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition hover:border-cyan-300/70 hover:text-white"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleQuickAction("Generate trip", suggestion.destination);
                          }}
                          className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-cyan-300 to-blue-400 px-2.5 py-1.5 text-xs font-semibold text-slate-900"
                        >
                          <Sparkles size={13} /> Generate Trip
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
              </div>

              {visibleSuggestions.length === 0 && (
                <div className="rounded-2xl border border-blue-100/15 bg-slate-900/55 p-8 text-center text-sm text-slate-300">
                  No suggestions matched these filters. Try a different vibe or budget band.
                </div>
              )}
            </div>

            <aside className="min-h-0 overflow-y-auto rounded-3xl border border-blue-100/15 bg-slate-900/55 p-4 backdrop-blur-xl md:p-5">
              {!selectedSuggestion ? (
                <p className="text-sm text-slate-300">Select a destination to preview AI details.</p>
              ) : (
                <div className="grid gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/90">Suggestion Preview</p>
                    <h3 className="mt-1 font-[Sora] text-xl font-semibold text-slate-100">{selectedSuggestion.destination}</h3>
                    <p className="mt-1 text-sm text-slate-300">
                      {activeMode.charAt(0).toUpperCase() + activeMode.slice(1)} mode, confidence {selectedSuggestion.plans[activeMode].confidence}%
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsZoomOpen(true)}
                    className="group relative block overflow-hidden rounded-2xl border border-blue-100/20"
                  >
                    <img
                      src={selectedSuggestion.image}
                      alt={`${selectedSuggestion.destination} preview`}
                      className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">{selectedSuggestion.destination}</span>
                      <span className="rounded-md border border-cyan-200/35 bg-cyan-300/15 px-2 py-1 text-xs text-cyan-100">
                        Click to zoom
                      </span>
                    </div>
                  </button>

                  <div className="rounded-2xl border border-blue-100/15 bg-slate-950/40 p-4">
                    <p className="mb-2 text-sm font-semibold text-slate-100">Compare Options</p>
                    <ul className="grid gap-2">
                      {compareModes.map((mode) => (
                        <li key={mode} className="flex items-center justify-between rounded-xl border border-blue-100/10 bg-slate-900/60 px-3 py-2">
                          <span className="text-sm capitalize text-slate-300">{mode}</span>
                          <span className="text-sm font-medium text-slate-100">{selectedSuggestion.plans[mode].estimatedCost}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-blue-100/15 bg-slate-950/40 p-4">
                    <p className="mb-2 text-sm font-semibold text-slate-100">Why This Suggestion</p>
                    <ul className="grid gap-2">
                      {selectedSuggestion.why.map((reason) => (
                        <li key={reason} className="flex items-start gap-2 text-sm text-slate-300">
                          <Flame size={14} className="mt-0.5 text-amber-300" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-blue-100/15 bg-slate-950/40 p-4">
                    <p className="mb-2 text-sm font-semibold text-slate-100">Highlights</p>
                    <ul className="grid gap-2">
                      {selectedSuggestion.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-center gap-2 text-sm text-slate-300">
                          <MapPinned size={14} className="text-cyan-200" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-amber-300/30 bg-amber-400/10 p-4">
                    <p className="mb-2 text-sm font-semibold text-amber-100">Alerts</p>
                    <ul className="grid gap-2">
                      {selectedSuggestion.alerts.map((alert) => (
                        <li key={alert} className="flex items-start gap-2 text-sm text-amber-50/90">
                          <AlertTriangle size={14} className="mt-0.5" />
                          <span>{alert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickAction("Save inspiration", selectedSuggestion.destination)}
                      className="inline-flex items-center justify-center gap-1 rounded-xl border border-blue-100/20 bg-slate-950/60 px-3 py-2 text-sm font-medium text-slate-100"
                    >
                      <Plus size={14} /> Save
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickAction("Generate full itinerary", selectedSuggestion.destination)}
                      className="inline-flex items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-cyan-300 to-blue-400 px-3 py-2 text-sm font-semibold text-slate-900"
                    >
                      <Sparkles size={14} /> Generate
                    </button>
                  </div>
                </div>
              )}
            </aside>
          </section>
        </main>
      </div>

      {isZoomOpen && selectedSuggestion && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/85 p-4"
          onClick={() => setIsZoomOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedSuggestion.destination} image zoom`}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-blue-100/25 bg-slate-900"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsZoomOpen(false)}
              className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-lg border border-blue-100/25 bg-slate-950/65 px-2.5 py-1.5 text-xs font-medium text-slate-100"
            >
              <X size={14} /> Close
            </button>
            <img
              src={selectedSuggestion.image}
              alt={`${selectedSuggestion.destination} full size`}
              className="max-h-[85vh] w-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function FilterChip({ label, value, onChange, options }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-blue-100/20 bg-slate-950/60 px-2 py-1.5">
      <span className="text-slate-300">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-md border border-blue-100/20 bg-slate-900 px-2 py-1 text-slate-100 outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-slate-900 text-slate-100">
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
