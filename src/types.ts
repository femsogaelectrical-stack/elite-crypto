export interface MarketAsset {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: string;
  volume24h: string;
  sparkline: number[];
}

export interface InvestmentPack {
  id: string;
  name: string;
  rate: string; // e.g. "120% ROI" or "2.5% Daily"
  period: string; // e.g. "After 5 Days" or "Daily"
  minDeposit: number;
  maxDeposit: number;
  badge?: string;
  rating: number;
  features: string[];
}

export interface TransactionItem {
  id: string;
  account: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
  asset: 'BTC' | 'ETH' | 'USDT' | 'XRP' | 'BNB' | 'SOL';
  time: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  colorScheme: string; // Tailwind colors to make avatar look rich
}

export interface LiveNotification {
  id: string;
  country: string;
  countryCode: string;
  amount: number;
  planName: string;
  timeAgo: string;
}
