import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Shield, Headset, HardDrive, Network, Sparkles, Check, AreaChart } from 'lucide-react';

export function AboutPlatform() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(35);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const corePillars = [
    {
      title: 'Secure Offline Cold Storage',
      desc: '98% of physical tokens are securely stored in air-gapped, geographical-split vault safes requiring multi-custodian signature schemas.',
      icon: <HardDrive className="w-5 h-5 text-brand-gold" />,
    },
    {
      title: '24/7 Dedicated Support Desk',
      desc: 'Instant direct lines to veteran portfolio administrators, available via secure chat or voice key for higher deposit tiers.',
      icon: <Headset className="w-5 h-5 text-emerald-400" />,
    },
    {
      title: 'Global Asset Indexing & Yield',
      desc: 'Seamlessly cross-index across crypto pools, tokenized commodities, and gold-backed futures inside a single, tax-efficient terminal.',
      icon: <Network className="w-5 h-5 text-indigo-400" />,
    },
  ];

  return (
    <section className="relative py-24 bg-[#08090C] border-b border-[#1E232D]" id="about-platform">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute right-0 top-1/2 w-96 h-96 bg-brand-gold-glow rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-[10%] top-[40%] w-72 h-72 bg-[#10B981]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <span className="font-display font-black text-xs uppercase tracking-widest text-brand-gold">
            Architectural Philosophy
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            We’re empowering investors to achieve greatness together
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-brand-gold to-brand-gold-dark mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT SIDE: Highly immersive, interactive video/chart viewport placeholder */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -top-4 -left-4 w-20 h-20 border-l border-t border-brand-gold/20 rounded-tl-xl pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-r border-b border-brand-gold/20 rounded-br-xl pointer-events-none" />
            
            <div className="relative overflow-hidden rounded-2xl gold-border bg-[#101217] shadow-2xl aspect-[16/10]" id="mock-video-player">
              
              {/* Cover Background Pattern representing charts */}
              <div className="absolute inset-0 bg-[#0E1015] flex flex-col justify-between p-4">
                
                {/* Header indicators */}
                <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
                    <span className="text-gray-400">{isPlaying ? 'LIVE ANALYSTS STREAM' : 'SYSTEM READY'}</span>
                  </div>
                  <span>CH-BTC/GOLD SECUTECH</span>
                </div>

                {/* Animated Chart Cockpit View */}
                <div className="flex-1 flex flex-col justify-center items-center py-4 relative">
                  
                  {/* Decorative digital overlay lines */}
                  <div className="w-full h-24 flex items-end justify-center gap-1.5 opacity-25">
                    {[30, 45, 35, 60, 50, 75, 40, 85, 90, 65, 80, 55, 70, 95, 40, 60, 50].map((h, i) => (
                      <div 
                        key={i} 
                        className={`w-2.5 rounded-t bg-gradient-to-t from-brand-gold to-emerald-400 transition-all duration-1000`}
                        style={{ height: isPlaying ? `${h}%` : `${h/2}%`, animationDelay: `${i*100}ms` }}
                      />
                    ))}
                  </div>

                  {/* Centered Large Play Button Control */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={togglePlay}
                    className="absolute z-10 w-16 h-16 rounded-full bg-brand-gold/90 text-slate-900 flex items-center justify-center cursor-pointer shadow-xl border-4 border-slate-900/60 transition group hover:bg-white"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    id="video-play-btn"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 fill-slate-900 text-slate-900" />
                    ) : (
                      <Play className="w-6 h-6 fill-slate-900 text-slate-900 translate-x-0.5" />
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {!isPlaying && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-[#0B0D11]/90 flex flex-col justify-center items-center p-6 text-center"
                      >
                        <div className="p-3 bg-brand-gold-glow rounded-xl border border-brand-gold/20 mb-3">
                          <AreaChart className="w-8 h-8 text-brand-gold" />
                        </div>
                        <h4 className="font-display font-bold text-white text-base">Watch Platform Security Briefing</h4>
                        <p className="text-gray-400 text-xs max-w-xs mt-1">Our Managing Director reviews offline cold nodes & automated payouts (1:45s)</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Video controls bottom bar */}
                <div className="bg-[#151922] border border-[#222936] rounded-lg px-3 py-2 flex items-center justify-between text-[11px] text-gray-400 font-mono">
                  <div className="flex items-center gap-3">
                    <button onClick={togglePlay} className="hover:text-white transition">
                      {isPlaying ? <Pause className="w-3.5 h-3.5 text-brand-gold" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    <span>{isPlaying ? '0:22 / 1:45' : '0:00 / 1:45'}</span>
                  </div>
                  <div className="flex-1 mx-4 h-1 bg-[#1E232D] rounded-full overflow-hidden relative">
                    <div 
                      className="absolute left-0 top-0 bottom-0 bg-brand-gold transition-all duration-300"
                      style={{ width: isPlaying ? '25%' : '0%' }}
                    />
                  </div>
                  <span className="text-brand-gold font-bold">1080P HD</span>
                </div>

              </div>

            </div>
          </div>

          {/* RIGHT SIDE: Rich Trust-building Copy & Pillars */}
          <div className="lg:col-span-6 space-y-8" id="about-platform-pillars">
            
            <div className="space-y-4">
              <h3 className="font-display font-extrabold text-2xl text-white tracking-tight">
                Institutional-Grade Assets Administration
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed" id="about-platform-brief">
                Aurex was established to answer a simple, major request: combine the exponential returns of decentralized crypto finance with the ironclad regulatory frameworks of traditional Swiss banking chambers.
              </p>
            </div>

            <div className="space-y-6">
              {corePillars.map((pillar, i) => (
                <div 
                  key={i} 
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#101217] transition border border-transparent hover:border-[#1E232D]"
                >
                  <div className="p-2 bg-[#101217] border border-[#1E232D] rounded-lg shrink-0">
                    {pillar.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-semibold text-white text-sm">
                      {pillar.title}
                    </h4>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
