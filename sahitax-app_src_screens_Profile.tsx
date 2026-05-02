import { useNavigate } from "react-router-dom";
import { Header, BottomNav } from "../components/Layout";
import { arjun } from "../data/arjun";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-bgsoft">
      <Header title="Profile" />

      <div className="flex-1 px-4 py-4 space-y-4 pb-2">
        {/* User card */}
        <div className="bg-accent text-white rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
              {arjun.name[0]}
            </div>
            <div>
              <div className="text-lg font-bold">{arjun.name}</div>
              <div className="text-sm text-accent-soft">{arjun.occupation} · {arjun.city}</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-white/20">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-accent-soft font-bold">Tier</div>
              <div className="font-semibold text-sm">Premium</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-accent-soft font-bold">Saved</div>
              <div className="font-semibold text-sm">₹3,500</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-accent-soft font-bold">Banked</div>
              <div className="font-semibold text-sm">₹8,000</div>
            </div>
          </div>
        </div>

        {/* Settings list */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <SettingRow icon="🔗" label="Connected brokers" value={arjun.brokers.join(", ")} />
          <SettingRow icon="📄" label="PAN" value={arjun.pan.slice(0, 5) + "****" + arjun.pan.slice(-1)} />
          <SettingRow icon="📅" label="Tax year" value={`FY ${arjun.fy}`} />
          <SettingRow icon="🔔" label="WhatsApp alerts" value="Enabled" />
          <SettingRow icon="📋" label="ITR-2 helper" value="Auto-fill ready" last />
        </div>

        {/* Plan card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-accent font-bold mb-1">Your plan</div>
              <div className="text-base font-semibold text-ink">Harvester Premium</div>
              <div className="text-xs text-muted">₹499/year · Renews Mar 31, 2026</div>
            </div>
            <span className="bg-accent-soft text-accent text-[10px] font-bold tracking-widest px-2 py-1 rounded">
              ACTIVE
            </span>
          </div>
          <div className="text-xs text-body bg-bgsoft rounded-lg p-3 italic">
            You've saved 7× what you paid this year. We told you we'd pay you in saved rupees.
          </div>
        </div>

        {/* About / footer */}
        <div className="text-center pt-4">
          <div className="text-xs text-muted mb-1">Sahi Tax v0.1 · Demo prototype</div>
          <div className="text-[10px] text-muted">
            Built by Mirnal Gupta · BITS Pilani · Zupee Thesis 2026
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full text-warn text-sm py-3 font-medium"
        >
          Reset demo
        </button>
      </div>

      <BottomNav active="profile" />
    </div>
  );
}

function SettingRow({ icon, label, value, last = false }: { icon: string; label: string; value: string; last?: boolean }) {
  return (
    <div className={`px-4 py-3 flex items-center gap-3 ${!last ? "border-b border-gray-100" : ""}`}>
      <div className="text-xl">{icon}</div>
      <div className="flex-1">
        <div className="text-sm text-ink">{label}</div>
      </div>
      <div className="text-xs text-muted">{value}</div>
    </div>
  );
}
