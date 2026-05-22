import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Star, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { MarketAsset } from '../types';

const INITIAL_MARKET_DATA: MarketAsset[] = [
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 67420.50,
    change24h: 3.42,
    marketCap: '$1.32 Trillion',
    volume24h: '$31.20 Billion',
    sparkline: [62, 63.5, 61.2, 64.8, 65.2, 66.8, 67.42],
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3450.20,
    change24h: 1.15,
    marketCap: '$415.80 Billion',
    volume24h: '$18.45 Billion',
    sparkline: [40, 38.5, 41.2, 42.1, 41.9, 43.5, 43.1],
  },
  {
    id: 'bnb',
    name: 'BNB Vault',
    symbol: 'BNB',
    price: 582.40,
    change24h: -0.84,
    marketCap: '$85.60 Billion',
    volume24h: '$1.82 Billion',
    sparkline: [52, 53.5, 51.2, 50.8, 49.5, 48.8, 48.4],
  },
  {
    id: 'sol',
    name: 'Solana Index',
    symbol: 'SOL',
    price: 142.75,
    change24h: 8.76,
    marketCap: '$66.10 Billion',
    volume24h: '$4.20 Billion',
    sparkline: [20, 22.1, 21.5, 25.4, 28.1, 29.5, 32.7],
  },
  {
    id: 'xrp',
    name: 'Ripple Trust',
    symbol: 'XRP',
    price: 0.5841,
    change24h: -1.24,
    marketCap: '$32.40 Billion',
    volume24h: '$1.14 Billion',
    sparkline: [60, 58.5, 59.2, 57.1, 55.9, 56.5, 55.4],
  },
  {
    id: 'doge',
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: 0.1382,
    change24h: 12.35,
    marketCap: '$19.82 Billion',
    volume24h: '$1.95 Billion',
    sparkline: [10, 12, 11, 15, 14, 18, 22.3],
  },
];

export function MarketTable() {
  const [marketData, setMarketData] = useState<MarketAsset[]>(INITIAL_MARKET_DATA);
  const [favouriteIds, setFavouriteIds] = useState<string[]>(['btc', 'eth', 'sol']);
  const [searchTerm, setSearchTerm] = useState('');
  const [flashStates, setFlashStates] = useState<Record<string, 'up' | 'down' | null>>({});

  // Micro fluctuations for realistic live market feedback
  useEffect(() => {
    const updatePrices = setInterval(() => {
      const idx = Math.floor(Math.random() * marketData.length);
      const asset = marketData[idx];
      const changePct = (Math.random() * 0.3 - 0.15) / 100; // -0.15% to +0.15%
      const newPrice = asset.price * (1 + changePct);
      const isUp = changePct >= 0;

      // Update market items state
      setMarketData((prev) => {
        const next = [...prev];
        const updatedSpark = [...next[idx].sparkline.slice(1), parseFloat((next[idx].sparkline[next[idx].sparkline.length - 1] * (1 + changePct)).toFixed(2))];
        next[idx] = {
          ...next[idx],
          price: parseFloat(newPrice.toFixed(asset.price > 10 ? 2 : 4)),
          change24h: parseFloat((next[idx].change24h + changePct * 8).toFixed(2)),
          sparkline: updatedSpark,
        };
        return next;
      });

      // Handle custom brief cell flash effect
      setFlashStates((prev) => ({ ...prev, [asset.id]: isUp ? 'up' : 'down' }));
      setTimeout(() => {
        setFlashStates((prev) => ({ ...prev, [asset.id]: null }));
      }, 700);

    }, 3200);

    return () => clearInterval(updatePrices);
  }, [marketData]);

  const toggleFavourite = (id: string) => {
    setFavouriteIds((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const filteredAssets = marketData.filter((asset) =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper to convert standard numbers array to SVG polyline coordinates
  const generatePolylinePoints = (arr: number[]) => {
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = max - min || 1;
    const width = 120;
    const height = 30;
    
    return arr
      .map((val, idx) => {
        const x = (idx / (arr.length - 1)) * width;
        // Invert Y so higher is up
        const y = height - ((val - min) / range) * (height - 6) - 3;
        return `${x},${y}`;
      })
      .join(' ');
  };

  return (
    <section className="relative py-24 bg-[#08090C] border-b border-[#1E232D]" id="market-dashboard">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 text-left">
            <span className="font-display font-bold text-xs uppercase tracking-widest text-[#F5C453]">
              Global Asset Flow
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Live Interactive Assets Desk
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm max-w-md">
              Real-time multi-asset indices tracking physical tokens against sovereign currencies. Real-time secure API connectivity.
            </p>
          </div>

          {/* Search bar inside header */}
          <div className="relative w-full max-w-xs self-start md:self-end">
            <input
              type="text"
              placeholder="Search ticker assets (BTC, ETH...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#101217] text-xs font-sans text-white placeholder-gray-500 rounded-lg pl-3.5 pr-10 py-2.5 border border-[#1E232D] focus:outline-none focus:border-brand-gold/40 transition"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-[10px]">SECURED</span>
          </div>
        </div>

        {/* Main interactive market table layout */}
        <div className="w-full overflow-x-auto rounded-xl border border-[#1E232D] bg-[#101217] mb-16 shadow-xl" id="market-data-table-container">
          <table className="w-full text-left border-collapse" id="assets-dashboard-table">
            <thead>
              <tr className="border-b border-[#1E232D]/85 text-gray-400 uppercase font-display text-[10px] tracking-widest bg-[#0C0E13]">
                <th className="py-4 px-5 text-center w-12">Favorite</th>
                <th className="py-4 px-4">Asset Name</th>
                <th className="py-4 px-4 text-right">Last Price</th>
                <th className="py-4 px-4 text-right">24h Change</th>
                <th className="py-4 px-4 text-right hidden md:table-cell">Market Capitalization</th>
                <th className="py-4 px-4 text-right hidden lg:table-cell">24h Trading Volume</th>
                <th className="py-4 px-6 text-center w-36">7-Day Sparkline</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-500 text-sm font-sans">
                    No ticker elements found matching "{searchTerm}"
                  </td>
                </tr>
              ) : (
                filteredAssets.map((asset) => {
                  const isUp = asset.change24h >= 0;
                  const isFavourited = favouriteIds.includes(asset.id);
                  const flash = flashStates[asset.id];
                  
                  return (
                    <tr
                      key={asset.id}
                      className="border-b border-[#1E232D]/45 hover:bg-[#141720]/80 transition duration-150 align-middle text-sm text-gray-100"
                    >
                      {/* Active favorite action icon */}
                      <td className="py-4 px-5 text-center">
                        <button
                          onClick={() => toggleFavourite(asset.id)}
                          className="p-1.5 rounded-full hover:bg-white/5 transition cursor-pointer"
                          aria-label="Add to watch list"
                        >
                          <Star
                            className={`w-3.5 h-3.5 transition-colors ${
                              isFavourited ? 'fill-brand-gold text-brand-gold' : 'text-gray-600'
                            }`}
                          />
                        </button>
                      </td>

                      {/* Asset name */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#191D26] border border-[#232936] flex items-center justify-center font-display font-bold text-xs text-brand-gold shrink-0">
                            {asset.symbol.substring(0, 2)}
                          </div>
                          <div>
                            <span className="font-display font-semibold text-[#F3F4F6] block leading-none">
                              {asset.name}
                            </span>
                            <span className="text-[10px] text-gray-500 font-mono uppercase font-bold tracking-wide mt-1 block">
                              {asset.symbol}/USDT
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Moving price column */}
                      <td
                        className={`py-4 px-4 text-right font-mono transition-colors duration-500 font-bold ${
                          flash === 'up'
                            ? 'text-emerald-400 bg-emerald-500/5'
                            : flash === 'down'
                            ? 'text-rose-400 bg-rose-500/5'
                            : 'text-white'
                        }`}
                      >
                        ${asset.price.toLocaleString(undefined, { minimumFractionDigits: asset.price > 10 ? 2 : 4 })}
                      </td>

                      {/* 24h change */}
                      <td className="py-4 px-4 text-right">
                        <span
                          className={`inline-flex items-center gap-1 font-mono text-xs font-bold ${
                            isUp ? 'text-emerald-400' : 'text-rose-500'
                          }`}
                        >
                          {isUp ? '+' : ''}
                          {asset.change24h}%
                          {isUp ? (
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
                          )}
                        </span>
                      </td>

                      {/* Market capitalization values */}
                      <td className="py-4 px-4 text-right text-gray-300 font-mono text-xs hidden md:table-cell">
                        {asset.marketCap}
                      </td>

                      {/* Volume 24h */}
                      <td className="py-4 px-4 text-right text-gray-300 font-mono text-xs hidden lg:table-cell">
                        {asset.volume24h}
                      </td>

                      {/* Sparkline trend representation */}
                      <td className="py-4 px-6 text-center">
                        <div className="inline-block" id={`sparkline-${asset.id}`}>
                          <svg width="120" height="30" className="opacity-95">
                            <polyline
                              fill="none"
                              stroke={isUp ? '#10B981' : '#EF4444'}
                              strokeWidth="1.8"
                              points={generatePolylinePoints(asset.sparkline)}
                            />
                            {/* Glow behind sparkline */}
                            <polyline
                              fill="none"
                              stroke={isUp ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'}
                              strokeWidth="4"
                              points={generatePolylinePoints(asset.sparkline)}
                            />
                          </svg>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Global Financial Partnerships Grayed Marquee display */}
        <div className="space-y-4 pt-4 border-t border-[#1E232D]/60" id="brand-partners-logos">
          <p className="font-display font-medium text-[10px] uppercase text-gray-500 tracking-widest text-center">
            As Referenced In & Authorized Integration Partner Channels
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-35 hover:opacity-50 transition-opacity duration-300 px-4 py-3">
            
            <div className="flex items-center gap-1">
              <span className="font-display font-extrabold tracking-tight text-white text-base">BINANCE</span>
              <span className="text-[10px] font-sans px-1 border border-white/20 rounded">Cloud</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-sans font-black tracking-normal text-white text-base">bitpay</span>
              <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
            </div>

            <div className="flex items-center gap-1">
              <span className="font-display font-extrabold italic text-[#EDEDED] text-base">NEXO</span>
              <span className="text-gray-400 font-sans text-[11px] font-bold">Pro</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-sans font-extrabold tracking-tighter text-white text-lg lowercase">forbes</span>
              <span className="text-gray-500 text-[10px] font-mono leading-none">2026</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="font-display font-black text-[#F3F4F6] text-sm uppercase tracking-wider">CoinMarketCap</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
