import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-accent to-accent-dark text-white">
      {/* Top: logo area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="flex items-center gap-3 mb-6">
          {/* Simple logo mark — checkmark + arrow */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur" />
            <svg viewBox="0 0 64 64" className="absolute inset-0">
              <circle cx="32" cy="32" r="26" fill="none" stroke="#fff" strokeWidth="3" />
              <path d="M20 34 L28 42 L46 22" fill="none" stroke="#86efac" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M40 18 L52 18 L52 30" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M30 40 L52 18" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Sahi Tax</h1>
        </div>
        <p className="text-lg text-center text-white/90 leading-relaxed">
          India's first AI Tax Optimizer
          <br />
          for retail investors.
        </p>
        <p className="mt-4 text-sm italic text-accent-soft">
          We pay you in saved rupees.
        </p>
      </div>

      {/* Stats strip */}
      <div className="px-6 mb-8">
        <div className="bg-white/10 backdrop-blur rounded-2xl p-4 flex justify-around text-center">
          <div>
            <div className="text-2xl font-bold">₹8K+</div>
            <div className="text-[10px] uppercase tracking-wider text-white/70">avg saved/yr</div>
          </div>
          <div className="w-px bg-white/20" />
          <div>
            <div className="text-2xl font-bold">3 min</div>
            <div className="text-[10px] uppercase tracking-wider text-white/70">to set up</div>
          </div>
          <div className="w-px bg-white/20" />
          <div>
            <div className="text-2xl font-bold">8 yr</div>
            <div className="text-[10px] uppercase tracking-wider text-white/70">carry-forward</div>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="px-6 pb-10 space-y-3">
        <button
          onClick={() => navigate("/connect")}
          className="w-full bg-white text-accent font-semibold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-transform"
        >
          Get started — connect portfolio
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full text-white/90 text-sm py-2"
        >
          Try with Arjun's portfolio (demo) →
        </button>
      </div>
    </div>
  );
}
