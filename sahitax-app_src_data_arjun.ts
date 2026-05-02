// Arjun's portfolio — used across all prototype screens
// Numbers match the Sahi Tax deck story exactly

export interface Holding {
  symbol: string;
  name: string;
  qty: number;
  avgBuyPrice: number;
  currentPrice: number;
  sector: string;
  holdingPeriod: "short" | "long"; // <12mo = short, >=12mo = long
}

export const arjun = {
  name: "Arjun Sharma",
  age: 30,
  city: "Bengaluru",
  occupation: "Software Engineer",
  pan: "ABCPS1234X",
  fy: "2025-26",
  lastUpdated: "Oct 20, 2025",
  brokers: ["Zerodha", "Groww"],
};

export const holdings: Holding[] = [
  { symbol: "RELIANCE",  name: "Reliance Industries",  qty: 50,  avgBuyPrice: 2400,  currentPrice: 2900,  sector: "Energy",      holdingPeriod: "long" },
  { symbol: "VODAFONE",  name: "Vodafone Idea",        qty: 2000, avgBuyPrice: 28,   currentPrice: 16,    sector: "Telecom",     holdingPeriod: "short" },
  { symbol: "PNB",       name: "Punjab National Bank", qty: 500,  avgBuyPrice: 100,  currentPrice: 76,    sector: "Banking",     holdingPeriod: "short" },
  { symbol: "PAYTM",     name: "One97 Communications", qty: 25,   avgBuyPrice: 1360, currentPrice: 840,   sector: "Fintech",     holdingPeriod: "short" },
  { symbol: "HDFCBANK",  name: "HDFC Bank",            qty: 60,   avgBuyPrice: 1600, currentPrice: 1800,  sector: "Banking",     holdingPeriod: "long" },
  { symbol: "INFY",      name: "Infosys",              qty: 40,   avgBuyPrice: 1450, currentPrice: 1620,  sector: "IT Services", holdingPeriod: "long" },
  { symbol: "TCS",       name: "Tata Consultancy",     qty: 20,   avgBuyPrice: 3200, currentPrice: 3550,  sector: "IT Services", holdingPeriod: "long" },
  { symbol: "ITC",       name: "ITC Ltd",              qty: 100,  avgBuyPrice: 380,  currentPrice: 420,   sector: "FMCG",        holdingPeriod: "long" },
];

// Computed values
export function computePnL(h: Holding) {
  const invested = h.qty * h.avgBuyPrice;
  const current = h.qty * h.currentPrice;
  const pnl = current - invested;
  return { invested, current, pnl, pnlPct: (pnl / invested) * 100 };
}

export function totalInvested() {
  return holdings.reduce((sum, h) => sum + h.qty * h.avgBuyPrice, 0);
}

export function totalCurrent() {
  return holdings.reduce((sum, h) => sum + h.qty * h.currentPrice, 0);
}

// Tax calculation (simplified)
export const taxStatus = {
  realizedSTCG: 17500, // Already booked short-term gains (e.g., from earlier in FY)
  realizedLTCG: 35000, // Already booked long-term gains (under 1L exemption)
  taxOwed: 3500,       // 20% on STCG of 17500 (simplified — STCG @ 20% per current rules)
  potentialHarvest: 49000, // Sum of unrealized losses (Vodafone, PNB, Paytm)
  potentialSavings: 3500,
  carryForwardAvailable: 8000, // Remaining loss after offsetting current FY gains
};

// The harvest plan — what AI suggests
export interface HarvestAction {
  action: "SELL" | "BUY";
  symbol: string;
  name: string;
  qty: number;
  price: number;
  rationale: string;
  taxImpact?: number; // Loss booked (negative) or replacement
  pairedWith?: string; // For replacement buys, what sell is this paired with
}

export const harvestPlan: HarvestAction[] = [
  {
    action: "SELL",
    symbol: "VODAFONE",
    name: "Vodafone Idea",
    qty: 2000,
    price: 16,
    rationale: "Booking ₹24,000 short-term loss to offset STCG.",
    taxImpact: -24000,
  },
  {
    action: "BUY",
    symbol: "BHARTIARTL",
    name: "Bharti Airtel",
    qty: 25,
    price: 1280,
    rationale: "Telecom sector exposure preserved. Beta-matched replacement.",
    pairedWith: "VODAFONE",
  },
  {
    action: "SELL",
    symbol: "PAYTM",
    name: "One97 Communications",
    qty: 25,
    price: 840,
    rationale: "Booking ₹13,000 short-term loss. Paytm has structural concerns.",
    taxImpact: -13000,
  },
  {
    action: "BUY",
    symbol: "NYKAA",
    name: "FSN E-Commerce (Nykaa)",
    qty: 30,
    price: 175,
    rationale: "New-age tech exposure preserved. Sector-matched replacement.",
    pairedWith: "PAYTM",
  },
  {
    action: "SELL",
    symbol: "PNB",
    name: "Punjab National Bank",
    qty: 500,
    price: 76,
    rationale: "Booking ₹12,000 short-term loss. PSU bank weakness.",
    taxImpact: -12000,
  },
  {
    action: "BUY",
    symbol: "SBIN",
    name: "State Bank of India",
    qty: 25,
    price: 740,
    rationale: "Banking sector exposure preserved. Stronger PSU alternative.",
    pairedWith: "PNB",
  },
];

// Year-end wrapped summary
export const yearEndStats = {
  totalHarvests: 3,
  totalLossesBooked: 49000,
  totalTaxSaved: 3500,
  carryForwardBanked: 8000,
  carryForwardUsableUntil: "FY 2033-34", // 8 years
  topHarvest: { stock: "Vodafone Idea", saved: 1200 },
  rank: "Top 8% of Sahi Tax users by tax saved",
};
