import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Shield, TrendingUp, DollarSign, Award, ChevronRight, Check } from 'lucide-react';
import { InvestmentPack } from '../types';

interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (name: string, email: string) => void;
}

export function CreateAccountModal({ isOpen, onClose, onSuccess }: CreateAccountModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('United States');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const countries = [
    { name: 'United States', code: 'US' },
    { name: 'United Kingdom', code: 'UK' },
    { name: 'Germany', code: 'DE' },
    { name: 'Canada', code: 'CA' },
    { name: 'Australia', code: 'AU' },
    { name: 'Singapore', code: 'SG' },
    { name: 'Japan', code: 'JP' },
    { name: 'Switzerland', code: 'CH' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess(name, email);
      onClose();
      // Reset
      setName('');
      setEmail('');
      setPassword('');
      setStep(1);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            id="modal-backdrop-signup"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl gold-border bg-[#0E1015] p-6 text-gray-100 shadow-2xl z-10"
            id="signup-modal-content"
          >
            {/* Design accents */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-brand-gold" />
                <span className="font-display font-medium uppercase tracking-wider text-xs text-brand-gold">Secure Vault Registration</span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition"
                id="close-signup-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center mb-6">
              <h3 className="font-display text-2xl font-semibold text-white tracking-tight">Create Institutional Account</h3>
              <p className="text-gray-400 text-xs mt-1">Provide accurate details to establish your secure investment portfolio</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-xs font-semibold uppercase mb-1.5 tracking-wider">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Johnathan Doe"
                  className="w-full bg-[#151922] border border-[#222936] rounded-lg px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-gold/50 transition-all font-sans"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-xs font-semibold uppercase mb-1.5 tracking-wider">Secure Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john.doe@private-wealth.com"
                  className="w-full bg-[#151922] border border-[#222936] rounded-lg px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-gold/50 transition-all font-sans"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-xs font-semibold uppercase mb-1.5 tracking-wider">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••"
                  className="w-full bg-[#151922] border border-[#222936] rounded-lg px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-gold/50 transition-all font-sans"
                />
                <span className="text-[10px] text-gray-500 mt-1 block">Must contain at least 8 elements, 1 uppercase, and 1 security code</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 text-xs font-semibold uppercase mb-1.5 tracking-wider">Country of Residence</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-[#151922] border border-[#222936] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-brand-gold/50 transition-all font-sans"
                  >
                    {countries.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name} ({c.code})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-xs font-semibold uppercase mb-1.5 tracking-wider">Verification Level</label>
                  <div className="w-full bg-[#151922]/50 border border-emerald-500/20 text-emerald-400 rounded-lg px-3 py-2.5 text-xs flex items-center gap-1.5.5 font-semibold font-sans">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Tier 1 Instant KYC Approved
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-display font-semibold text-sm h-11 rounded-lg gold-glow-btn flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                  id="submit-signup-btn"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-[#08090C] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Secure Account Setup
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-center text-gray-500 leading-normal pt-2">
                By ticking security registration, you certify that you have read and agreed to our 
                <span className="text-gray-400"> Digital Wealth Asset Agreement</span>, and authorize the platform keys setup.
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

interface SelectPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: InvestmentPack | null;
  onInvest: (amount: number, planName: string) => void;
  isRegistered: boolean;
  onTriggerRegister: () => void;
}

export function SelectPlanModal({
  isOpen,
  onClose,
  selectedPlan,
  onInvest,
  isRegistered,
  onTriggerRegister,
}: SelectPlanModalProps) {
  const [amount, setAmount] = useState<number>(0);
  const [calculatedProfit, setCalculatedProfit] = useState<number>(0);
  const [totalReturn, setTotalReturn] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (selectedPlan) {
      setAmount(selectedPlan.minDeposit);
    }
  }, [selectedPlan]);

  useEffect(() => {
    if (!selectedPlan || !amount) {
      setCalculatedProfit(0);
      setTotalReturn(0);
      return;
    }

    // Extract multiplier from rate, e.g. "200% Return" or "3.5% Daily"
    const isDaily = selectedPlan.rate.includes('Daily');
    const numericRate = parseFloat(selectedPlan.rate.replace(/[^0-9.]/g, '')) || 0;
    
    let totalReturnVal = 0;
    let profitVal = 0;
    
    if (isDaily) {
      // Suppose we run for 30 Days if daily
      const days = 30;
      profitVal = amount * (numericRate / 100) * days;
      totalReturnVal = amount + profitVal;
    } else {
      // Return percentage package
      totalReturnVal = amount + (amount * (numericRate / 100));
      profitVal = totalReturnVal - amount;
    }

    setCalculatedProfit(parseFloat(profitVal.toFixed(2)));
    setTotalReturn(parseFloat(totalReturnVal.toFixed(2)));
  }, [amount, selectedPlan]);

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;
    if (amount < selectedPlan.minDeposit || amount > selectedPlan.maxDeposit) return;

    if (!isRegistered) {
      onTriggerRegister();
      return;
    }

    setIsSimulating(true);

    setTimeout(() => {
      setIsSimulating(false);
      setIsSuccess(true);
      onInvest(amount, selectedPlan.name);
      
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2500);
    }, 1500);
  };

  if (!selectedPlan) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            id="modal-backdrop-plan"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl gold-border bg-[#0E1015] p-6 text-gray-100 shadow-2xl z-10"
            id="invest-modal-container"
          >
            {/* Design accents */}
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-brand-gold" />
                <span className="font-display font-medium uppercase tracking-wider text-xs text-brand-gold">
                  Plan Allocation Simulator
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition"
                id="close-invest-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
                  <Check className="w-8 h-8 animate-bounce" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">Investment Allocated!</h3>
                <p className="text-gray-300 text-sm max-w-sm mx-auto">
                  Your allocation of <span className="text-brand-gold font-bold">${amount.toLocaleString()}</span> has been fully credited to the <span className="font-medium text-white">{selectedPlan.name}</span> ledger. Check recent ledger transactions below.
                </p>
                <div className="text-[11px] text-gray-500 mt-2">
                  Contract Tx hash: <span className="font-mono text-emerald-400">0x8a92c...{Math.floor(Math.random() * 90000) + 10000}</span>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSimulate} className="space-y-4">
                {/* Plan Info Card */}
                <div className="bg-[#151922] border border-[#222936] rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-display font-bold text-white text-lg">{selectedPlan.name}</h4>
                    <p className="text-gray-400 text-xs mt-0.5">Rating: {Array(selectedPlan.rating).fill('★').join('')}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-display font-bold text-brand-gold block">{selectedPlan.rate}</span>
                    <span className="text-gray-400 text-[10px] uppercase font-semibold tracking-wider">{selectedPlan.period}</span>
                  </div>
                </div>

                {/* Bounds display */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-[#11141B] border border-[#1C212E] rounded-lg py-2">
                    <span className="text-gray-500 text-[10px] uppercase block">Minimum Deposit</span>
                    <span className="font-display font-bold text-white text-lg">${selectedPlan.minDeposit.toLocaleString()}</span>
                  </div>
                  <div className="bg-[#11141B] border border-[#1C212E] rounded-lg py-2">
                    <span className="text-gray-500 text-[10px] uppercase block">Maximum Deposit</span>
                    <span className="font-display font-bold text-white text-lg">${selectedPlan.maxDeposit.toLocaleString()}</span>
                  </div>
                </div>

                {/* Amount input */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Investment Principal ($)</label>
                    <span className="text-gray-500 text-[11px]">Dynamic Calculator</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-display font-semibold">$</span>
                    <input
                      type="number"
                      required
                      min={selectedPlan.minDeposit}
                      max={selectedPlan.maxDeposit}
                      value={amount || ''}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full bg-[#151922] border border-[#222936] rounded-lg pl-8 pr-16 py-3 text-lg text-white font-display font-bold tracking-wide focus:outline-none focus:border-brand-gold/50"
                    />
                    <button
                      type="button"
                      onClick={() => setAmount(selectedPlan.maxDeposit)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-[#1C212E] text-brand-gold hover:bg-brand-gold hover:text-[#08090C] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded transition cursor-pointer"
                    >
                      Max Alert
                    </button>
                  </div>
                  {amount < selectedPlan.minDeposit && amount > 0 && (
                    <p className="text-rose-500 text-[10px] mt-1.5 font-sans font-medium">
                      ⚠️ Principal is below the minimum required limit of ${selectedPlan.minDeposit.toLocaleString()} for this tier.
                    </p>
                  )}
                  {amount > selectedPlan.maxDeposit && (
                    <p className="text-rose-500 text-[10px] mt-1.5 font-sans font-medium">
                      ⚠️ Principal exceeds the maximum allocation limit of ${selectedPlan.maxDeposit.toLocaleString()} for this tier.
                    </p>
                  )}
                </div>

                {/* Dynamic Profit outputs */}
                <div className="bg-[#11141B] border border-[#1C212E] rounded-xl p-4 space-y-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <p className="text-gray-400 flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                      Calculated Portfolio Profit
                    </p>
                    <span className="font-display font-semibold text-emerald-400">+${calculatedProfit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <p className="text-gray-400 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-gray-400" />
                      Guaranteed Total Payout ({selectedPlan.period})
                    </p>
                    <span className="font-display font-bold text-white text-base">${totalReturn.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-[#1C212E]/50 pt-2.5 flex justify-between items-center text-[10px]">
                    <span className="text-gray-500 uppercase tracking-widest flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-brand-gold" /> Secure Return Protocol
                    </span>
                    <span className="text-emerald-400 font-bold uppercase">Escrow Locked</span>
                  </div>
                </div>

                {isRegistered ? (
                  <button
                    type="submit"
                    disabled={isSimulating || amount < selectedPlan.minDeposit || amount > selectedPlan.maxDeposit}
                    className="w-full h-12 font-display font-bold text-sm rounded-lg gold-glow-btn flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 transition"
                    id="simulate-invest-submit-btn"
                  >
                    {isSimulating ? (
                      <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      'Simulate Professional Deposit'
                    )}
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={onTriggerRegister}
                      className="w-full h-12 font-display font-bold text-sm rounded-lg gold-glow-btn flex items-center justify-center gap-2 cursor-pointer"
                      id="invest-register-trigger-btn"
                    >
                      Register to Begin Simulating
                    </button>
                    <p className="text-center text-[10px] text-gray-500">
                      You must open standard client custody profile before making simulated allocations.
                    </p>
                  </div>
                )}
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
