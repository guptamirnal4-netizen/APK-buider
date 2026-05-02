import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Header } from "../components/Layout";

export default function Connect() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<"A" | "B" | null>(null);
  const [step, setStep] = useState<"choose" | "connecting" | "done">("choose");

  function handleConnect(m: "A" | "B") {
    setMethod(m);
    setStep("connecting");
    setTimeout(() => setStep("done"), 1800);
    setTimeout(() => navigate("/dashboard"), 3000);
  }

  return (
    <div className="flex flex-col min-h-screen bg-bgsoft">
      <Header title="Connect Your Portfolio" subtitle="Step 1 of 4" showBack />

      {/* Progress bar */}
      <div className="bg-white px-4 pt-3 pb-2">
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full w-1/4 bg-accent rounded-full transition-all" />
        </div>
      </div>

      {step === "choose" && (
        <div className="flex-1 px-4 py-6 space-y-4">
          <p className="text-sm text-muted leading-relaxed">
            Choose how you'd like to share your portfolio. Both methods are read-only and SEBI-compliant.
          </p>

          {/* Method A */}
          <button
            onClick={() => handleConnect("A")}
            className="w-full bg-white border-2 border-ink rounded-2xl p-5 text-left active:scale-[0.99] transition-transform"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="bg-accent text-white text-[10px] font-bold tracking-widest px-2 py-1 rounded">
                METHOD A
              </span>
              <span className="text-xs text-accent font-semibold">RECOMMENDED</span>
            </div>
            <h3 className="font-semibold text-base text-ink mb-1">Broker API Connection</h3>
            <p className="text-xs text-muted mb-3">
              One OTP. Auto-syncs holdings. Works with all major brokers.
            </p>
            <div className="flex gap-2 flex-wrap">
              {["Zerodha", "Upstox", "ICICI", "Groww", "Angel One"].map((b) => (
                <span key={b} className="bg-bgsoft text-xs px-2 py-1 rounded font-medium text-ink border border-gray-200">
                  {b}
                </span>
              ))}
            </div>
          </button>

          {/* Method B */}
          <button
            onClick={() => handleConnect("B")}
            className="w-full bg-white border-2 border-gray-200 rounded-2xl p-5 text-left active:scale-[0.99] transition-transform"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="bg-ink text-white text-[10px] font-bold tracking-widest px-2 py-1 rounded">
                METHOD B
              </span>
            </div>
            <h3 className="font-semibold text-base text-ink mb-1">Manual Upload (CAS / CSV / Excel)</h3>
            <p className="text-xs text-muted mb-3">
              Upload your Consolidated Account Statement (CAS) PDF. Universal — works for every demat.
            </p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-xs text-muted">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-1">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
              </svg>
              Tap to upload file
            </div>
          </button>

          {/* User profile card at bottom */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 mt-2">
            <div className="text-[10px] uppercase tracking-widest text-accent font-bold mb-2">User Profile</div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Name</span>
                <span className="font-medium text-ink">Arjun Sharma</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">PAN</span>
                <span className="font-medium text-ink">ABCPS****X</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Residential Status</span>
                <span className="font-medium text-ink">Resident Indian</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === "connecting" && (
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-6" />
          <h2 className="text-lg font-semibold text-ink mb-2">
            {method === "A" ? "Connecting to your broker..." : "Parsing your CAS..."}
          </h2>
          <p className="text-sm text-muted text-center">
            {method === "A"
              ? "Authorizing read-only access via Account Aggregator (Sahamati). One-time OTP sent to your phone."
              : "Reading holdings from your Consolidated Account Statement."}
          </p>
        </div>
      )}

      {step === "done" && (
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-ink mb-2">8 holdings synced</h2>
          <p className="text-sm text-muted text-center">
            Loading your tax dashboard...
          </p>
        </div>
      )}
    </div>
  );
}
