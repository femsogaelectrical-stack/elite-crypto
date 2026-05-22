import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerAsset {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
}

const INITIAL_ASSETS: TickerAsset[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 67420.50, change24h: 3.42 },
  { symbol: 'ETH', name: 'Ethereum', price: 3450.20, change24h: 1.15 },
  { symbol: 'BNB', name: 'BNB', price: 582.40, change24h: -0.84 },
  { symbol: 'SOL', name: 'Solana', price: 142.75, change24h: 8.76 },
  { symbol: 'XRP', name: 'XRP', price: 0.584, change24h: -1.24 },
  { symbol: 'ADA', name: 'Cardano', price: 0.442, change24h: 0.12 },
  { symbol: 'LINK', name: 'Chainlink', price: 15.35, change24h: 4.88 },
  { symbol: 'DOT', name: 'Polkadot', price: 6.22, change24h: -2.31 },
  { symbol: 'DOGE', name: 'Dogecoin', price: 0.138, change24h: 12.35 },
];

export function LiveTicker() {
  const [assets, setAssets] = useState<TickerAsset[]>(INITIAL_ASSETS);
  const [lastUpdatedIndex, setLastUpdatedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    // Periodically update some prices randomly to simulate a real, live market feed!
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * assets.length);
      setAssets((prev) => {
        const next = [...prev];
        const changePct = (Math.random() * 0.4 - 0.2) / 100; // -0.2% to +0.2%
        const oldPrice = next[idx].price;
        const newPrice = oldPrice * (1 + changePct);
        
        next[idx] = {
          ...next[idx],
          price: parseFloat(newPrice.toFixed(next[idx].price > 10 ? 2 : 4)),
          change24h: parseFloat((next[idx].change24h + changePct * 10).toFixed(2)),
        };

        setLastUpdatedIndex(idx);
        setDirection(changePct >= 0 ? 'up' : 'down');
        
        // Clear flashing highlight after 800ms
        setTimeout(() => {
          setLastUpdatedIndex(null);
          setDirection(null);
        }, 800);

        return next;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [assets]);

  // Duplicate list to achieve a seamless horizontal scrolling marquee loop
  const doubleAssets = [...assets, ...assets, ...assets];

  return (
    <div className="w-full bg-[#08090C] border-y border-[#1E232D] py-3.5 overflow-hidden flex items-center relative z-20">
      {/* Visual Indicator Light */}
      <div className="absolute left-0 top-0 bottom-0 px-4 bg-[#08090C] border-r border-[#1E232D] flex items-center gap-1.5 focus:outline-none shrink-0 z-30">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse-slow" />
        <span className="font-display font-bold uppercase text-[10px] tracking-widest text-[#F3F4F6]">Live Feed</span>
      </div>

      <div className="flex gap-16 animate-marquee whitespace-nowrap pl-28">
        {doubleAssets.map((asset, i) => {
          const isFlashed = lastUpdatedIndex !== null && (i % assets.length) === lastUpdatedIndex;
          const isUp = asset.change24h >= 0;
          
          return (
            <div
              key={`${asset.symbol}-${i}`}
              className={`inline-flex items-center gap-2.5 transition-colors duration-300 ${
                isFlashed
                  ? direction === 'up'
                    ? 'text-emerald-400 bg-emerald-500/10 rounded px-1 -mx-1'
                    : 'text-rose-400 bg-rose-500/10 rounded px-1 -mx-1'
                  : 'text-gray-300'
              }`}
            >
              <span className="font-display font-extrabold text-xs text-white tracking-wide">
                {asset.symbol}
              </span>
              <span className="text-gray-500 text-[10px] font-sans font-medium">
                {asset.name}
              </span>
              <span className="font-mono text-xs font-semibold">
                ${asset.price.toLocaleString(undefined, { minimumFractionDigits: asset.price > 10 ? 2 : 4 })}
              </span>
              <span
                className={`inline-flex items-center font-mono text-[10px] font-bold ${
                  isUp ? 'text-emerald-400' : 'text-rose-500'
                }`}
              >
                {isUp ? '+' : ''}
                {asset.change24h}%
                {isUp ? (
                  <TrendingUp className="w-3 h-3 ml-0.5" />
                ) : (
                  <TrendingDown className="w-3 h-3 ml-0.5" />
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
