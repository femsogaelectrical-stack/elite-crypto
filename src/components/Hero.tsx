import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowUpRight, TrendingUp, Cpu, Award } from 'lucide-react';

interface HeroProps {
  onTriggerRegister: () => void;
  imageUrl: string;
}

export function Hero({ onTriggerRegister, imageUrl }: HeroProps) {
  const scrollToPlans = () => {
    const el = document.getElementById('investment-plans');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-[#08090C]" id="hero-section">
      {/* Abstract Glowing Aura Background */}
      <div className="absolute top-1/4 right-[5%] w-[450px] h-[450px] bg-brand-gold-glow rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -left-20 bottom-10 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative Matrix Grid */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#1E232D_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" 
        style={{ maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)' }}
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101217] border border-[#1E232D] text-brand-gold font-display text-[11px] font-bold tracking-wider uppercase"
              id="trust-badge"
            >
              <Cpu className="w-3.5 h-3.5 animate-pulse text-[#E5B539]" />
              SECURE GLOBAL DIGITAL WEALTH HARVEST
            </motion.div>

            {/* Core Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.08]"
                id="hero-title"
              >
                The Smart Way to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-[#FFF2D0] to-brand-gold-dark">
                  Invest in Digital Assets
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl font-normal leading-relaxed"
                id="hero-subtext"
              >
                Maximize your portfolio through multi-asset indexing, military-grade offline cold vault storage, and secure yield generation tiers supervised by global market leaders.
              </motion.p>
            </div>

            {/* CTA Interaction Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
              id="hero-cta-group"
            >
              <button
                onClick={onTriggerRegister}
                className="px-8 py-4 rounded-xl font-display font-bold text-sm gold-glow-btn flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden group"
                id="hero-create-acc-btn"
              >
                Create Account
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              
              <button
                onClick={scrollToPlans}
                className="px-8 py-4 rounded-xl font-display font-bold text-sm bg-[#101217] hover:bg-[#161920] border border-[#1E232D] text-[#F3F4F6] hover:border-brand-gold/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="hero-explore-btn"
              >
                Explore Tiers
              </button>
            </motion.div>

            {/* Quick Security Trust Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-[#1C212E]/50"
              id="hero-security-highlights"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#101217] border border-[#1E232D] text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-white">Cold Custody</h4>
                  <p className="text-gray-500 text-[10px]">100% Offline Vaults</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#101217] border border-[#1E232D] text-brand-gold">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-white">SIPC Covered</h4>
                  <p className="text-gray-500 text-[10px]">Tier-1 Banking Trust</p>
                </div>
              </div>
              
              <div className="hidden sm:flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#101217] border border-[#1E232D] text-emerald-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-white">High Liquidity</h4>
                  <p className="text-gray-500 text-[10px]">Instant Local Outflow</p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Hero Right Floating Graphic (The Generated Image!) */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Glowing halos */}
            <div className="absolute w-72 h-72 bg-brand-gold-glow rounded-full blur-[80px] animate-pulse-slow pointer-events-none" />
            <div className="absolute border border-brand-gold/10 rounded-full w-[110%] h-[110%] animate-spin-slow pointer-events-none" style={{ animationDuration: '60s' }} />

            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-square rounded-2xl p-4 gold-glass border border-brand-gold/15 shadow-2xl flex items-center justify-center"
              id="hero-asset-card"
            >
              {/* Premium image viewport */}
              <div className="relative w-full h-full overflow-hidden rounded-xl">
                <img
                  src={imageUrl}
                  alt="Elite Golden Cryptocurrency 3D Coin"
                  className="w-full h-full object-cover object-center filter saturate-[1.10] contrast-[1.05]"
                  referrerPolicy="no-referrer"
                  id="hero-gold-coin-img"
                />
                
                {/* Floating telemetry widget for design luxury */}
                <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur border border-[#1E232D] rounded-lg p-3 flex justify-between items-center text-left">
                  <div>
                    <span className="text-[9px] font-sans font-bold text-gray-500 uppercase tracking-widest block">System Key Status</span>
                    <span className="font-display font-bold text-xs text-white">BTC Custody Pool-9</span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-400 font-mono text-xs font-bold block animate-pulse">● SECURED</span>
                    <span className="text-gray-500 text-[8px] font-mono">100% AUDITED</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
