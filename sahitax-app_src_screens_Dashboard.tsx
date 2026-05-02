import { useNavigate } from "react-router-dom";
import { Header, BottomNav } from "../components/Layout";
import { arjun, holdings, computePnL, taxStatus, totalInvested, totalCurrent } from "../data/arjun";
import { inr } from "../lib/format";

export default function Dashboard() {
  const navigate = useNavigate();
  const inv = totalInvested();
  const cur = totalCurrent();
  const totalPnL = cur - inv;
  const totalPct = (totalPnL / inv) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-bgsoft">
      <Header
        title={`Hi, ${arjun.name.split(" ")[0]}`}
        subtitle={`FY ${arjun.fy} · Updated ${arjun.lastUpdated}`}
        rightSlot={
          <button onClick={() => navigate("/profile")} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-semibold text-sm">
            {arjun.name[0]}
          </button>
        }
      />

      <div className="flex-1 px-4 py-4 space-y-4 pb-2">
        {/* Tax Owed Card — the headline */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-warn font-bold mb-1">You Owe (FY {arjun.fy})</div>
              <div className="text-4xl font-bold text-warn">{inr(taxStatus.taxOwed)}</div>
            </div>
            <div className="text-right text-xs text-muted">
              <div>STCG: {inr(taxStatus.realizedSTCG)}</div>
              <div>LTCG: {inr(taxStatus.realizedLTCG)}</div>
              <div className="italic">(under exemption)</div>
            </div>
          </div>
          <button
            onClick={() => navigate("/harvest")}
            className="w-full bg-accent text-white font-semibold py-3 rounded-xl active:scale-[0.99] transition-transform flex items-center justify-center gap-2"
          >
            Save {inr(taxStatus.potentialSavings)} with harvest →
          </button>
        </div>

        {/* Portfolio summary */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4">
          <div className="text-[10px] uppercase tracking-widest text-muted font-bold mb-2">Portfolio</div>
          <div className="flex justify-between items-baseline mb-3">
            <div className="text-2xl font-bold text-ink">{inr(cur)}</div>
            <div className={`text-sm font-semibold ${totalPnL >= 0 ? "text-accent" : "text-warn"}`}>
              {inr(totalPnL, { showSign: true })} ({totalPct >= 0 ? "+" : ""}{totalPct.toFixed(1)}%)
            </div>
          </div>
          <div className="flex gap-3 text-xs">
            <div className="flex-1">
              <div className="text-muted">Invested</div>
              <div className="font-semibold text-ink">{inr(inv)}</div>
            </div>
            <div className="flex-1">
              <div className="text-muted">Brokers</div>
              <div className="font-semibold text-ink">{arjun.brokers.join(", ")}</div>
            </div>
            <div className="flex-1">
              <div className="text-muted">Holdings</div>
              <div className="font-semibold text-ink">{holdings.length}</div>
            </div>
          </div>
        </div>

        {/* Holdings list */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-semibold text-sm text-ink">Your Holdings</h3>
            <span className="text-xs text-muted">{holdings.length}</span>
          </div>
          {holdings.map((h, i) => {
            const { current, pnl, pnlPct } = computePnL(h);
            const isLoss = pnl < 0;
            return (
              <div
                key={h.symbol}
                className={`px-4 py-3 ${i !== holdings.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-ink">{h.symbol}</span>
                      {isLoss && (
                        <span className="text-[9px] bg-red-50 text-warn px-1.5 py-0.5 rounded font-bold">
                          HARVEST
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-muted truncate">{h.name}</div>
                    <div className="text-[11px] text-muted mt-0.5">
                      {h.qty} · {h.holdingPeriod === "long" ? "LT" : "ST"} · {h.sector}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-ink">{inr(current)}</div>
                    <div className={`text-xs font-semibold ${isLoss ? "text-warn" : "text-accent"}`}>
                      {inr(pnl, { showSign: true })}
                    </div>
                    <div className="text-[10px] text-muted">{pnlPct >= 0 ? "+" : ""}{pnlPct.toFixed(1)}%</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Harvest opportunity callout */}
        <div className="bg-accent text-white rounded-2xl p-4">
          <div className="text-[10px] uppercase tracking-widest text-accent-soft font-bold mb-1">
            Harvest Opportunity
          </div>
          <div className="text-2xl font-bold mb-1">{inr(taxStatus.potentialHarvest)} in losses</div>
          <p className="text-xs text-accent-soft mb-3">
            Sitting in Vodafone, PNB, and Paytm. Worth {inr(taxStatus.potentialSavings)} in tax savings — if anyone helped you use them.
          </p>
          <button
            onClick={() => navigate("/harvest")}
            className="w-full bg-white text-accent font-semibold py-2.5 rounded-lg text-sm active:scale-[0.99] transition-transform"
          >
            See your harvest plan →
          </button>
        </div>
      </div>

      <BottomNav active="home" />
    </div>
  );
}
