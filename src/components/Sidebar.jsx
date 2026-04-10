import { MessageSquare, Route, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Chat", icon: MessageSquare },
  { to: "/trips", label: "Trips", icon: Route },
  { to: "/ai", label: "AI Suggestions", icon: Sparkles },
];

export default function Sidebar() {
  return (
    <aside className="h-full rounded-3xl border border-blue-100/15 bg-slate-900/55 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl lg:sticky lg:top-0">
      <h1 className="font-[Sora] text-2xl font-semibold tracking-tight text-slate-100">RouteCraft AI</h1>
      <p className="mt-2 text-sm text-slate-300/90">Plan bold journeys in seconds</p>

      <nav className="mt-6 grid gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={`${item.to}-${item.label}`}
              to={item.to}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  isActive
                    ? "bg-cyan-300/20 text-cyan-100"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={16} className="opacity-90" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
