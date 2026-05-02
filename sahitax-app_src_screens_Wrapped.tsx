import { Header, BottomNav } from "../components/Layout";
import { yearEndStats, arjun, taxStatus } from "../data/arjun";
import { inr } from "../lib/format";

export default function Wrapped() {
  return (
    <div className="flex flex-col min-h-screen bg-bgsoft">
      <Header title="Year-End Wrapped" subtitle={`FY ${arjun.fy}`} />

      <div className="flex-1 px-4 py-4 space-y-3 pb-2">
        {/* Hero card */}
        <div className="bg-gradient-to-br from-ink to-gray-800 text-white rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
          <div className="text-[10px] uppercase tracking-widest text-accent-soft font-bold mb-2">
            FY {arjun.fy} Wrapped
          </div>
          <p className="text-base text-white/80 mb-1">{arjun.name.split(" ")[0]}, you saved</p>
          <div className="text-6xl font-bold tracking-tight mb-2">{inr(yearEndStats.totalTaxSaved)}</div>
          <p className="text-sm italic text-accent-soft mb-4">in tax this year.</p>

          <div className="border-t border-white/20 pt-4 space-y-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/60 font-bold mb-1">
                Carry-forward banked
              </div>
              <div className="text-2xl font-bold">{inr(yearEndStats.carryForwardBanked)}</div>
              <p className="text-xs italic text-accent-soft mt-0.5">
                Usable through {yearEndStats.carryForwardUsableUntil}
              </p>
            </div>
          </div>
        </div>

        {/* Stat cards grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <div className="text-[10px] uppercase tracking-widest text-muted font-bold mb-1">
              Total harvests
            </div>
            <div className="text-2xl font-bold text-ink">{yearEndStats.totalHarvests}</div>
            <p className="text-xs text-muted mt-1">opportunities found</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <div className="text-[10px] uppercase tracking-widest text-muted font-bold mb-1">
              Losses booked
            </div>
            <div className="text-2xl font-bold text-warn">{inr(yearEndStats.totalLossesBooked)}</div>
            <p className="text-xs text-muted mt-1">strategically harvested</p>
          </div>
        </div>

        {/* Top harvest */}
        <div className="bg-accent text-white rounded-2xl p-4">
          <div className="text-[10px] uppercase tracking-widest text-accent-soft font-bold mb-1">
            Your biggest win
          </div>
          <div className="flex items-center gap-3">
            <div className="text-3xl">🏆</div>
            <div>
              <div className="text-base font-bold">{yearEndStats.topHarvest.stock}</div>
              <div className="text-xs text-accent-soft">
                Saved {inr(yearEndStats.topHarvest.saved)} in one harvest
              </div>
            </div>
          </div>
        </div>

        {/* Rank card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4">
          <div className="text-[10px] uppercase tracking-widest text-muted font-bold mb-1">
            Your Sahi Tax rank
          </div>
          <div className="text-base font-semibold text-ink mb-1">{yearEndStats.rank}</div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full w-[92%] bg-gradient-to-r from-accent to-accent-dark rounded-full" />
          </div>
        </div>

        {/* Compounding callout */}
        <div className="bg-bgsoft border-2 border-dashed border-gray-300 rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-ink mb-1">
            What this saving means in 8 years
          </h3>
          <p className="text-xs text-body leading-relaxed">
            If you keep harvesting losses every year (avg {inr(taxStatus.potentialSavings)}/yr) and reinvest at 12%, you'll have
            built an extra <span className="font-bold text-accent">{inr(43000)}</span> by FY 2033-34 — without changing your investment style.
          </p>
        </div>

        {/* Share CTA */}
        <button className="w-full bg-[#25D366] text-white font-semibold py-4 rounded-xl active:scale-[0.99] transition-transform flex items-center justify-center gap-2 shadow-lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Share on WhatsApp
        </button>
        <button className="w-full text-accent text-sm font-medium py-2">
          Download ITR Schedule CG (PDF)
        </button>
      </div>

      <BottomNav active="wrapped" />
    </div>
  );
}
