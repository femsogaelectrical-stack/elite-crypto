import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Check, Copy, Upload, ShieldCheck, Gift, Wallet, 
  Smartphone, HelpCircle, Lock, AlertCircle, Coins, ArrowRight 
} from 'lucide-react';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; email: string };
  onSuccess: (amount: number, methodLabel: string, asset: 'BTC' | 'USDT') => void;
}

export function DepositModal({ isOpen, onClose, user, onSuccess }: DepositModalProps) {
  const [activeMethod, setActiveMethod] = useState<'giftcard' | 'btc' | 'cashapp'>('giftcard');
  const [giftCode, setGiftCode] = useState('');
  const [cashTag, setCashTag] = useState('');
  const [depositAmount, setDepositAmount] = useState('1000');
  
  // File upload state trackers
  const [giftCardFile, setGiftCardFile] = useState<File | null>(null);
  const [btcReceiptFile, setBtcReceiptFile] = useState<File | null>(null);
  const [cashAppFile, setCashAppFile] = useState<File | null>(null);

  // Copy buttons visual state tracker
  const [copiedBtc, setCopiedBtc] = useState(false);
  const [copiedCash, setCopiedCash] = useState(false);

  // Submission / Flow States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');

  // Input file refs
  const giftFileRef = useRef<HTMLInputElement>(null);
  const btcFileRef = useRef<HTMLInputElement>(null);
  const cashFileRef = useRef<HTMLInputElement>(null);

  const BTC_ADDRESS = 'bc1q9x5z4unvdvsc6kpq0y37h3q78vj8v6969p4yut';
  const CASH_APP_TAG = '$AurexSettlements';

  const handleCopyBtc = () => {
    navigator.clipboard.writeText(BTC_ADDRESS);
    setCopiedBtc(true);
    setTimeout(() => setCopiedBtc(false), 2000);
  };

  const handleCopyCash = () => {
    navigator.clipboard.writeText(CASH_APP_TAG);
    setCopiedCash(true);
    setTimeout(() => setCopiedCash(false), 2000);
  };

  const handleGiftFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setGiftCardFile(e.target.files[0]);
    }
  };

  const handleBtcFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBtcReceiptFile(e.target.files[0]);
    }
  };

  const handleCashFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCashAppFile(e.target.files[0]);
    }
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(depositAmount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please specify a valid deposit amount.");
      return;
    }

    // Basic fields validation based on selection
    if (activeMethod === 'giftcard') {
      if (!giftCode.trim()) {
        alert("Please enter your Gift Card pin code or e-code.");
        return;
      }
      if (!giftCardFile) {
        alert("Please upload an image of your physical card or e-code invoice.");
        return;
      }
    } else if (activeMethod === 'btc') {
      if (!btcReceiptFile) {
        alert("Please upload the transaction hash screenshot or blockchain payment receipt.");
        return;
      }
    } else if (activeMethod === 'cashapp') {
      if (!cashTag.trim()) {
        alert("Please enter the Cash App $Username/Cashtag used in making the transfer.");
        return;
      }
      if (!cashAppFile) {
        alert("Please upload your completed Cash App transaction screen screenshot.");
        return;
      }
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
      const label = activeMethod === 'giftcard' ? 'Gift Card Code' : activeMethod === 'cashapp' ? 'Cash App Tag' : 'BTC Ledger';
      const asset = activeMethod === 'btc' ? 'BTC' : 'USDT';
      onSuccess(parsedAmount, `${label} (Manual Auditing Required)`, asset);
    }, 2000);
  };

  const resetForm = () => {
    setActiveMethod('giftcard');
    setGiftCode('');
    setCashTag('');
    setDepositAmount('1000');
    setGiftCardFile(null);
    setBtcReceiptFile(null);
    setCashAppFile(null);
    setStep('form');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            id="deposit-modal-backdrop"
          />

          {/* Secure Deposit Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-[#0c0d12] border border-[#d4af25]/25 p-5 sm:p-7 text-gray-100 shadow-2xl z-10 my-8"
            id="deposit-modal-panel"
          >
            {/* Ambient Background Gold Radiance */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

            {/* Modal Heading Section */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-gold" />
                <span className="font-display font-medium uppercase tracking-wider text-xs text-brand-gold">SECURE ASSET FUNDING</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition"
                id="close-deposit-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {step === 'form' ? (
                <motion.div
                  key="deposit-form-step"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  <div className="text-left mb-6">
                    <h3 className="font-display text-2xl font-semibold text-white tracking-tight">Deposit Funds</h3>
                    <p className="text-gray-400 text-xs mt-1">Select your preferred payment gateway and follow the secure verification process.</p>
                  </div>

                  {/* STEP SELECTOR PILLS */}
                  <div className="grid grid-cols-3 gap-2.5 mb-6 bg-[#11141b] p-1.5 rounded-xl border border-white/5" id="deposit-selector-pills">
                    {[
                      { id: 'giftcard', label: 'GIFT CARD', icon: Gift },
                      { id: 'btc', label: 'BTC Core', icon: Wallet },
                      { id: 'cashapp', label: 'CASH APP', icon: Smartphone }
                    ].map((method) => {
                      const Icon = method.icon;
                      const isSelected = activeMethod === method.id;
                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setActiveMethod(method.id as any)}
                          className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-brand-gold/10 border-brand-gold/50 text-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.08)]' 
                              : 'bg-transparent border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5'
                          }`}
                        >
                          <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-brand-gold' : 'text-gray-400'}`} />
                          <span className="font-display font-bold text-[10px] tracking-wider uppercase">{method.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* ACTIVE METHOD DETAILS & FORM FIELDS */}
                  <form onSubmit={handleDepositSubmit} className="space-y-5 text-left">
                    
                    {activeMethod === 'giftcard' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="bg-[#151922] border border-[#222936] p-4 rounded-xl">
                          <p className="text-xs text-slate-300 font-semibold mb-1">Fund Account via Gift Card</p>
                          <p className="text-[11px] text-gray-400">Fund your account using popular Gift Cards (Apple, Amazon, Steam, etc.). Premium settlement rates applied instantly.</p>
                        </div>

                        <div>
                          <label className="block text-gray-300 text-xs font-semibold uppercase mb-1.5 tracking-wider">Gift Card Code / Pin</label>
                          <input
                            type="text"
                            required
                            value={giftCode}
                            onChange={(e) => setGiftCode(e.target.value)}
                            placeholder="Type 16-digit pin code (e.g. AMZ-982X-774P-3420)"
                            className="w-full bg-[#151922] border border-[#222936] rounded-lg px-4 py-3 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-gold/50 font-mono transition-all"
                            id="gift-code-input"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-300 text-xs font-semibold uppercase mb-2 tracking-wider">Image Verification</label>
                          <input
                            type="file"
                            accept="image/*"
                            ref={giftFileRef}
                            onChange={handleGiftFileChange}
                            className="hidden"
                            id="gift-image-uploader"
                          />
                          <div 
                            onClick={() => giftFileRef.current?.click()}
                            className="w-full bg-[#11141b]/50 border-2 border-dashed border-[#222936] rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-brand-gold/40 transition-all group"
                          >
                            <div className="w-10 h-10 rounded-full bg-brand-gold/5 flex items-center justify-center border border-brand-gold/10 group-hover:bg-brand-gold/10 mb-3 transition">
                              <Upload className="w-4.5 h-4.5 text-brand-gold" />
                            </div>
                            <span className="font-display font-medium text-xs text-white uppercase tracking-wider mb-1">Upload Gift Card Image</span>
                            <span className="text-[10px] text-gray-400">Attach clear physical card photo or digital code screenshot (JPG, PNG)</span>

                            {/* Live Status indicator */}
                            {giftCardFile ? (
                              <div className="mt-4 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/25 rounded-md flex items-center gap-2 text-emerald-400 font-mono text-xs">
                                <Check className="w-3.5 h-3.5" />
                                <span>{giftCardFile.name} (Ready)</span>
                              </div>
                            ) : (
                              <div className="mt-4 px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-gray-500 font-mono text-[10px]">
                                No file selected
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeMethod === 'btc' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="bg-[#151922] border border-[#222936] p-4 rounded-xl">
                          <p className="text-xs text-slate-300 font-semibold mb-1">Fund Account via BTC Bitcoin Wallet</p>
                          <p className="text-[11px] text-gray-400">Send Bitcoin directly to the platform's secure company wallet. Processing is established after 1 network confirmation.</p>
                        </div>

                        <div>
                          <label className="block text-gray-300 text-xs font-semibold uppercase mb-2 tracking-wider">Company Bitcoin Address</label>
                          <div className="flex gap-2">
                            <div className="flex-1 bg-[#151922] border border-[#222936] rounded-lg px-4 py-3 text-xs text-gray-100 font-mono select-all overflow-x-auto whitespace-nowrap flex items-center shadow-inner">
                              {BTC_ADDRESS}
                            </div>
                            <button
                              type="button"
                              onClick={handleCopyBtc}
                              className="px-4 bg-[#151922] hover:bg-white/5 border border-[#222936] hover:border-brand-gold/30 rounded-lg text-xs font-semibold text-brand-gold flex items-center justify-center gap-1.5 transition cursor-pointer"
                              id="copy-btc-btn"
                            >
                              {copiedBtc ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="text-emerald-400">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-300 text-xs font-semibold uppercase mb-2 tracking-wider">Blockchain Audit Proof</label>
                          <input
                            type="file"
                            accept="image/*"
                            ref={btcFileRef}
                            onChange={handleBtcFileChange}
                            className="hidden"
                            id="btc-receipt-uploader"
                          />
                          <div 
                            onClick={() => btcFileRef.current?.click()}
                            className="w-full bg-[#11141b]/50 border-2 border-dashed border-[#222936] rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-brand-gold/40 transition-all group"
                          >
                            <div className="w-10 h-10 rounded-full bg-brand-gold/5 flex items-center justify-center border border-brand-gold/10 group-hover:bg-brand-gold/10 mb-3 transition">
                              <Upload className="w-4.5 h-4.5 text-brand-gold" />
                            </div>
                            <span className="font-display font-medium text-xs text-white uppercase tracking-wider mb-1">Upload Payment Receipt</span>
                            <span className="text-[10px] text-gray-400">Attach receipt confirmation scan or transaction dashboard image (JPG, PNG)</span>

                            {/* Live Status indicator */}
                            {btcReceiptFile ? (
                              <div className="mt-4 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/25 rounded-md flex items-center gap-2 text-emerald-400 font-mono text-xs">
                                <Check className="w-3.5 h-3.5" />
                                <span>{btcReceiptFile.name} (Ready)</span>
                              </div>
                            ) : (
                              <div className="mt-4 px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-gray-500 font-mono text-[10px]">
                                No file selected
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeMethod === 'cashapp' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="bg-[#151922] border border-[#222936] p-4 rounded-xl">
                          <p className="text-xs text-slate-300 font-semibold mb-1">Fund Account via Cash App</p>
                          <p className="text-[11px] text-gray-400">Pay seamlessly using Cash App. Perform standard transfer on Cash App to our secure business cashtag listed below.</p>
                        </div>

                        <div>
                          <label className="block text-gray-300 text-xs font-semibold uppercase mb-2 tracking-wider">Company Cashtag</label>
                          <div className="flex gap-2">
                            <div className="flex-1 bg-[#151922] border border-[#222936] rounded-lg px-4 py-3 text-xs text-gray-100 font-mono font-bold flex items-center shadow-inner">
                              {CASH_APP_TAG}
                            </div>
                            <button
                              type="button"
                              onClick={handleCopyCash}
                              className="px-4 bg-[#151922] hover:bg-white/5 border border-[#222936] hover:border-brand-gold/30 rounded-lg text-xs font-semibold text-brand-gold flex items-center justify-center gap-1.5 transition cursor-pointer"
                              id="copy-cash-btn"
                            >
                              {copiedCash ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="text-emerald-400">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-300 text-xs font-semibold uppercase mb-1.5 tracking-wider">Your Cash App $Cashtag / Username</label>
                          <input
                            type="text"
                            required
                            value={cashTag}
                            onChange={(e) => setCashTag(e.target.value)}
                            placeholder="e.g. $MyTraderTag (to trace transaction)"
                            className="w-full bg-[#151922] border border-[#222936] rounded-lg px-4 py-3 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-gold/50 font-mono transition-all"
                            id="user-cash-tag-input"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-300 text-xs font-semibold uppercase mb-2 tracking-wider">Transaction Proof</label>
                          <input
                            type="file"
                            accept="image/*"
                            ref={cashFileRef}
                            onChange={handleCashFileChange}
                            className="hidden"
                            id="cash-receipt-uploader"
                          />
                          <div 
                            onClick={() => cashFileRef.current?.click()}
                            className="w-full bg-[#11141b]/50 border-2 border-dashed border-[#222936] rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-brand-gold/40 transition-all group"
                          >
                            <div className="w-10 h-10 rounded-full bg-brand-gold/5 flex items-center justify-center border border-brand-gold/10 group-hover:bg-brand-gold/10 mb-3 transition">
                              <Upload className="w-4.5 h-4.5 text-brand-gold" />
                            </div>
                            <span className="font-display font-medium text-xs text-white uppercase tracking-wider mb-1">Upload Confirmation Screenshot</span>
                            <span className="text-[10px] text-gray-400">Attach payment details screenshot showing the completed transfer (JPG, PNG)</span>

                            {/* Live Status indicator */}
                            {cashAppFile ? (
                              <div className="mt-4 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/25 rounded-md flex items-center gap-2 text-emerald-400 font-mono text-xs">
                                <Check className="w-3.5 h-3.5" />
                                <span>{cashAppFile.name} (Ready)</span>
                              </div>
                            ) : (
                              <div className="mt-4 px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-gray-500 font-mono text-[10px]">
                                No file selected
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* ALWAYS VISIBLE BOTTOM DEPOSIT AMOUNT INPUT */}
                    <div className="border-t border-white/5 pt-4">
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Amount to Deposit (USD)</label>
                        <span className="text-gray-500 text-[10px] uppercase font-mono">Secured Escrow</span>
                      </div>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-display font-semibold">$</span>
                        <input
                          type="number"
                          required
                          min="10"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          className="w-full bg-[#151922] border border-[#222936] rounded-lg pl-8 pr-4 py-3 text-base text-white font-display font-bold focus:outline-none focus:border-brand-gold/50"
                          id="deposit-amount-input"
                        />
                      </div>
                    </div>

                    {/* CONFIRM BUTTON */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 font-display font-bold text-xs uppercase tracking-wider rounded-lg gold-glow-btn flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 transition-all"
                        id="submit-deposit-review-btn"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <ShieldCheck className="w-4 p-0 h-4 text-black" />
                            Submit Deposit for Review
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-1 text-[10px] text-gray-500 py-1 font-mono uppercase tracking-widest text-center">
                      <Lock className="w-3 h-3 text-brand-gold/40" /> 256-Bit Vault SSL Cryptography
                    </div>

                  </form>
                </motion.div>
              ) : (
                /* SUCCESS SCREEN */
                <motion.div
                  key="deposit-success-step"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-6 space-y-5"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-1">
                    <Check className="w-8 h-8 animate-bounce text-emerald-400" />
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold text-white uppercase tracking-wide">Deposit Submitted</h3>
                  
                  <p className="text-gray-300 text-sm max-w-md mx-auto">
                    Your manual deposit of <span className="text-brand-gold font-bold">${parseFloat(depositAmount).toLocaleString()} USD</span> is securely logged and awaiting review.
                  </p>

                  <div className="bg-[#11141b]/75 border border-white/5 rounded-xl p-4 text-left max-w-sm mx-auto space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Method applied:</span>
                      <span className="text-white capitalize">{activeMethod} Gate</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Creditor Account:</span>
                      <span className="text-brand-gold">{user.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Audit Status:</span>
                      <span className="text-[#00F5A0] font-black flex items-center gap-1 animate-pulse">
                        <Coins className="w-3.5 h-3.5" /> PENDING REVIEW
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Est. Settlement:</span>
                      <span className="text-gray-300">10-15 Minutes</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-500 max-w-xs mx-auto leading-normal">
                    Human custodians are currently validating your attachment. Verified receipts are automatically credited to your principal balance.
                  </p>

                  <div className="pt-4 max-w-xs mx-auto">
                    <button
                      onClick={() => {
                        resetForm();
                        onClose();
                      }}
                      className="w-full py-3 bg-brand-gold hover:bg-brand-gold-dark text-black text-xs font-bold font-display uppercase tracking-wider rounded-xl transition cursor-pointer"
                    >
                      Close Portal Panel
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
