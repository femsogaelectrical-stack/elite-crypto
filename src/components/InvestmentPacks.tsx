import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Shield, HelpCircle, Flame, ArrowUpRight, CheckCircle, Globe2 } from 'lucide-react';
import { InvestmentPack, LiveNotification } from '../types';

interface InvestmentPacksProps {
  onSelectPlan: (plan: InvestmentPack) => void;
}

const INVESTMENT_PLANS: InvestmentPack[] = [
  {
    id: 'starter',
    name: 'Starter Allocation',
    rate: '110% ROI',
    period: 'Within 7 Days',
    minDeposit: 100,
    maxDeposit: 999,
    badge: 'Core Entry',
    rating: 5,
    features: [
      'Standard custody node access',
      'Automated weekly payouts',
      'Bi-weekly audit statements',
      'Live chat broker support',
    ],
  },
  {
    id: 'amateur',
    name: 'Amateur Indexer',
    rate: '135% ROI',
    period: 'Within 14 Days',
    minDeposit: 1000,
    maxDeposit: 9999,
    badge: 'Crowd Choice',
    rating: 5,
    features: [
      'Enhanced node block priority',
      'Instant payout capability',
      'Custom wallet key security',
      '24/7 dedicated support desk',
    ],
  },
  {
    id: 'professional',
    name: 'Professional Yield',
    rate: '175% ROI',
    period: 'Within 30 Days',
    minDeposit: 10000,
    maxDeposit: 49999,
    badge: 'Institutional',
    rating: 5,
    features: [
      'Priority offline cold storage vault',
      'Zero routing withdrawal fees',
      'Direct WhatsApp personal broker',
      'Guaranteed secondary insurance pool',
    ],
  },
  {
    id: 'expert',
    name: 'Expert Sovereign',
    rate: '250% ROI',
    period: 'Within 45 Days',
    minDeposit: 50000,
    maxDeposit: 1000000,
    badge: 'VIP Elite',
    rating: 5,
    features: [
      'Dedicated private server keys',
      'Direct audit logs stream access',
      'Offline physical vault visits',
      'VIP client management tier',
    ],
  },
];

const RECENT_INVESTMENTS_DATA = [
  { country: 'Switzerland', flagCode: 'CH', amount: 84000, planName: 'Expert Sovereign' },
  { country: 'Australia', flagCode: 'AU', amount: 4500, planName: 'Amateur Indexer' },
  { country: 'United Kingdom', flagCode: 'UK', amount: 25000, planName: 'Professional Yield' },
  { country: 'Germany', flagCode: 'DE', amount: 800, planName: 'Starter Allocation' },
  { country: 'Singapore', flagCode: 'SG', amount: 120000, planName: 'Expert Sovereign' },
  { country: 'Canada', flagCode: 'CA', amount: 15400, planName: 'Professional Yield' },
  { country: 'Japan', flagCode: 'JP', amount: 6500, planName: 'Amateur Indexer' },
  { country: 'United States', flagCode: 'US', amount: 350, planName: 'Starter Allocation' },
];

export function InvestmentPacks({ onSelectPlan }: InvestmentPacksProps) {
  const [notification, setNotification] = useState<LiveNotification | null>(null);

  useEffect(() => {
    // Setting up the periodic live floating popups simulating recent investor activity
    const triggerNotification = () => {
      const randomItem = RECENT_INVESTMENTS_DATA[Math.floor(Math.random() * RECENT_INVESTMENTS_DATA.length)];
      setNotification({
        id: Math.random().toString(),
        country: randomItem.country,
        countryCode: randomItem.flagCode,
        amount: randomItem.amount + Math.floor(Math.random() * 500),
        planName: randomItem.planName,
        timeAgo: 'Just now',
      });

      // Clear after 6 seconds
      setTimeout(() => {
        setNotification(null);
      }, 6000);
    };

    // First trigger after 4s
    const firstTrigger = setTimeout(triggerNotification, 4000);

    // Repetitive trigger interval (15s)
    const interval = setInterval(triggerNotification, 16000);

    return () => {
      clearTimeout(firstTrigger);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative py-24 bg-[#08090C] border-b border-[#1E232D]" id="investment-plans">
      {/* Decorative glow and lines */}
      <div className="absolute top-[10%] left-[5%] w-[350px] h-[350px] bg-brand-gold-glow rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16 space-y-4">
          <span className="font-display font-bold text-xs uppercase tracking-widest text-brand-gold px-3 py-1 bg-[#101217] border border-[#1E232D] rounded-full inline-block">
            Investment Vaults
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Premium Asset Allocation Packages
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto">
            Choose a multi-tiered package that aligns with your capital risk parameters. Access secured offline returns and dedicated ledger transparency.
          </p>
        </div>

        {/* 4-Column Investment Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INVESTMENT_PLANS.map((plan) => {
            const isProfessional = plan.id === 'professional';
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6 }}
                className={`relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 ${
                  isProfessional
                    ? 'bg-[#12151D] border-2 border-brand-gold shadow-[0_15px_40px_rgba(245,196,83,0.1)]'
                    : 'bg-[#101217] border border-[#1E232D] hover:bg-[#151922] hover:border-brand-gold/30'
                }`}
                id={`plan-card-${plan.id}`}
              >
                {/* Popularity Badge */}
                {plan.badge && (
                  <span className={`absolute -top-3.5 left-6 px-3 py-1 rounded-full text-[9px] font-display font-black uppercase tracking-wider ${
                    isProfessional 
                      ? 'bg-gradient-to-r from-brand-gold to-brand-gold-dark text-[#08090C]'
                      : 'bg-[#1E232D] text-brand-gold border border-brand-gold/20'
                  }`}>
                    {plan.badge}
                  </span>
                )}

                {/* Rating & Title */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-0.5" id={`plan-stars-${plan.id}`}>
                    {[...Array(plan.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">{plan.name}</h3>
                    <p className="text-gray-500 text-[10px] uppercase font-semibold tracking-wider">Custodian Vault Profile</p>
                  </div>
                </div>

                {/* Percentage Return Hero */}
                <div className="my-6 py-4 border-y border-[#1E232D]/70 space-y-1">
                  <span className="block font-display text-3xl font-extrabold text-[#F3F4F6] tracking-tight">
                    {plan.rate}
                  </span>
                  <span className="block text-gray-400 text-xs font-semibold uppercase tracking-wider">
                    Guaranteed Return {plan.period}
                  </span>
                </div>

                {/* Min / Max Bounds */}
                <div className="space-y-2.5 mb-6 text-xs bg-[#08090C]/60 p-3 rounded-lg border border-[#1E232D]/50">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Minimum Limit:</span>
                    <span className="font-display font-bold text-brand-gold">${plan.minDeposit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Maximum Limit:</span>
                    <span className="font-display font-bold text-white">${plan.maxDeposit.toLocaleString()}</span>
                  </div>
                </div>

                {/* Feature checklist */}
                <ul className="space-y-3 mb-8 text-left flex-1 border-t border-[#1E232D]/45 pt-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action button */}
                <button
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider cursor-pointer transition-all ${
                    isProfessional
                      ? 'gold-glow-btn text-slate-950 font-black'
                      : 'bg-[#1E232D] hover:bg-brand-gold hover:text-slate-950 text-[#F3F4F6] font-bold border border-[#2D3442]'
                  }`}
                  id={`select-plan-${plan.id}-btn`}
                >
                  Select Plan
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Live pop-up notification element in the corner / floating activity */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, x: 50, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="fixed bottom-6 right-6 z-40 max-w-sm rounded-xl border border-brand-gold/30 bg-[#0E1015]/95 backdrop-blur-md p-4 shadow-2xl flex items-center gap-3.5"
              id="live_notification_popup"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <Globe2 className="w-5 h-5 animate-spin-slow" />
              </div>
              <div className="text-left space-y-0.5">
                <span className="text-[9px] font-display font-black text-brand-gold uppercase tracking-widest block">SECURED ALLOCATION REPORTED</span>
                <p className="text-xs text-white">
                  Investor from <span className="font-bold text-gray-200">{notification.country}</span> allocated{' '}
                  <span className="text-emerald-400 font-bold font-mono">${notification.amount.toLocaleString()}</span> into the{' '}
                  <span className="font-medium text-white">{notification.planName}</span>.
                </p>
                <div className="flex justify-between items-center text-[9px] text-gray-500 pt-1 font-mono">
                  <span>Tx Hash: 0x93df...{Math.floor(Math.random() * 900) + 100}</span>
                  <span className="text-emerald-400">{notification.timeAgo}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
