import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Layout";
import { harvestPlan, taxStatus } from "../data/arjun";
import { inr } from "../lib/format";

export default function Confirm() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"review" | "executing" | "done">("review");
  const [progress, setProgress] = useState(0);

  function execute() {
    setPhase("executing");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setProgress(i);
      if (i >= harvestPlan.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("done"), 600);
      }
    }, 500);
  }

  return (
    <div className="flex flex-col min-h-screen bg-bgsoft">
      <Header title="Confirm & Execute" subtitle="Step 4 of 4" showBack={phase === "review"} />

      <div className="bg-white px-4 pt-3 pb-2">
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full w-full bg-accent rounded-full transition-all" />
        </div>
      </div>

      {phase === "review" && (
        <div className="flex-1 px-4 py-4 space-y-4">
          <div className="bg-white border-2 border-ink rounded-2xl p-4">
            <h3 className="font-semibold text-ink mb-3">Tax Saving Opportunity</h3>
            <ol className="space-y-2 text-xs text-body">
              <li>1. Sell 2,000 shares of Vodafone Idea (Loss: ₹24,000) to offset gains from HDFC (Gain: ₹12,000)</li>
              <li>2. Sell 25 shares of Paytm (Loss: ₹13,000) to offset gains from Reliance (Gain: ₹25,000)</li>
              <li>3. Sell 500 shares of PNB (Loss: ₹12,000) to offset gains from Stock-A HDFC (Gain: ₹12,000)</li>
              <li className="font-semibold text-accent pt-1 border-t border-gray-100">
                4. Summary of tax savings: {inr(taxStatus.potentialSavings)} saved in tax + {inr(taxStatus.carryForwardAvailable)} banked for future
              </li>
            </ol>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <h3 className="font-semibold text-sm text-ink mb-3">After execution</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Sell listed stocks</span>
                <span className="font-semibold text-ink flex items-center gap-1">
                  Today
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Use details for ITR-2</span>
                <span className="font-semibold text-ink flex items-center gap-1">
                  Auto-filled
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
            <div className="flex items-start gap-2">
              <span className="text-amber-700 text-base">⚠</span>
              <div className="text-xs text-amber-900">
                <strong>Final review:</strong> {harvestPlan.length} trades will execute via your Zerodha account. Total brokerage ≈ ₹{harvestPlan.length * 20}. Trades are reversible until they settle (T+1).
              </div>
            </div>
          </div>

          <button
            onClick={execute}
            className="w-full bg-accent text-white font-semibold py-4 rounded-xl active:scale-[0.99] transition-transform shadow-lg"
          >
            Proceed with Sale & Filing
          </button>
        </div>
      )}

      {phase === "executing" && (
        <div className="flex-1 px-4 py-6">
          <h2 className="text-lg font-semibold text-ink mb-1">Executing trades...</h2>
          <p className="text-sm text-muted mb-6">
            Routing through Zerodha Kite Connect. Do not close the app.
          </p>

          <div className="space-y-2">
            {harvestPlan.map((p, i) => (
              <div
                key={i}
                className={`bg-white rounded-xl p-3 flex items-center gap-3 transition-opacity ${
                  i < progress ? "opacity-100" : "opacity-40"
                }`}
              >
                {i < progress ? (
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                ) : i === progress ? (
                  <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
                )}
                <div className="flex-1">
                  <div className="text-sm font-semibold text-ink">
                    {p.action} {p.qty} {p.symbol}
                  </div>
                  <div className="text-xs text-muted">@ {inr(p.price)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {phase === "done" && (
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-ink mb-2">All done!</h2>
          <p className="text-base text-body mb-1">
            You just saved <span className="font-bold text-accent">{inr(taxStatus.potentialSavings)}</span> in tax.
          </p>
          <p className="text-sm text-muted mb-8">
            Plus {inr(taxStatus.carryForwardAvailable)} banked for the next 8 years.
          </p>

          <div className="bg-white border border-gray-200 rounded-2xl p-4 w-full mb-6 text-left">
            <div className="text-[10px] uppercase tracking-widest text-muted font-bold mb-2">Next steps</div>
            <ul className="space-y-1.5 text-xs text-body">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-accent" />
                ITR-2 Schedule CG will auto-populate in July
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-accent" />
                We'll alert you the next time gains book up
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-accent" />
                Year-End Wrapped drops on March 31
              </li>
            </ul>
          </div>

          <button
            onClick={() => navigate("/wrapped")}
            className="w-full bg-accent text-white font-semibold py-4 rounded-xl active:scale-[0.99] transition-transform shadow-lg"
          >
            See your Year-End Wrapped →
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full text-muted text-sm py-3 mt-1"
          >
            Back to dashboard
          </button>
        </div>
      )}
    </div>
  );
}
