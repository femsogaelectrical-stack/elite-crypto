/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, UserCheck, Wallet, ArrowUpRight, Check, Sparkles, LogOut, Menu, X } from 'lucide-react';
import { MarketAsset, InvestmentPack, TransactionItem, LiveNotification } from './types';
import { LiveTicker } from './components/LiveTicker';
import { Hero } from './components/Hero';
import { StatsGrid } from './components/StatsGrid';
import { AboutPlatform } from './components/AboutPlatform';
import { InvestmentPacks } from './components/InvestmentPacks';
import { MarketTable } from './components/MarketTable';
import { TransactionsLedger } from './components/TransactionsLedger';
import { TeamSection } from './components/TeamSection';
import { RiskFooter } from './components/RiskFooter';
import { CreateAccountModal, SelectPlanModal } from './components/InteractiveModals';
import { AuthPages } from './components/AuthPages';
import { UserDashboard } from './components/UserDashboard';

// Initial dummy ledger data
const INITIAL_TRANSACTIONS: TransactionItem[] = [
  { id: 'tx-1', account: 'cryptoking_99', amount: 8716.40, type: 'deposit', asset: 'BTC', time: '1 min ago' },
  { id: 'tx-2', account: 'sophia_wealth', amount: 15450.00, type: 'deposit', asset: 'ETH', time: '5 mins ago' },
  { id: 'tx-3', account: 'austin_asset', amount: 4800.00, type: 'deposit', asset: 'SOL', time: '9 mins ago' },
  { id: 'tx-4', account: 'zurich_capital', amount: 120000.00, type: 'deposit', asset: 'BTC', time: '14 mins ago' },
  { id: 'tx-5', account: 'mrs_blockchain', amount: 950.00, type: 'deposit', asset: 'USDT', time: '18 mins ago' },
  { id: 'tx-6', account: 'vince_m', amount: 6200.00, type: 'withdrawal', asset: 'BTC', time: '2 mins ago' },
  { id: 'tx-7', account: 'kross_advisor', amount: 12450.00, type: 'withdrawal', asset: 'ETH', time: '6 mins ago' },
  { id: 'tx-8', account: 'maria_btc', amount: 2800.00, type: 'withdrawal', asset: 'XRP', time: '11 mins ago' },
  { id: 'tx-9', account: 'alex_invest', amount: 24500.00, type: 'withdrawal', asset: 'SOL', time: '15 mins ago' },
  { id: 'tx-10', account: 'sw_vault_22', amount: 68100.00, type: 'withdrawal', asset: 'ETH', time: '21 mins ago' },
];

export default function App() {
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);
  const [viewState, setViewState] = useState<'landing' | 'login' | 'signup' | 'dashboard'>('landing');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSelectPlanOpen, setIsSelectPlanOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPack | null>(null);
  const [transactions, setTransactions] = useState<TransactionItem[]>(INITIAL_TRANSACTIONS);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact generated path from the image generation step
  const HERO_IMAGE_URL = '/images/gold_crypto_coin_1779463114275.png';

  // Periodically simulate external transaction actions to make ledger alive
  useEffect(() => {
    const randomAccounts = [
      'g_block_trade', 'bernard_trust', 'melanie_k', 'singapore_exec',
      'geneva_vault', 'hk_token_flow', 'tokyo_node_80', 'stefan_ch',
      'nordic_whale', 'capital_keys', 'elizabeth_btc'
    ];
    const randomAssets: Array<'BTC' | 'ETH' | 'USDT' | 'XRP' | 'BNB' | 'SOL'> = [
      'BTC', 'ETH', 'USDT', 'XRP', 'BNB', 'SOL'
    ];

    const interval = setInterval(() => {
      const type: 'deposit' | 'withdrawal' = Math.random() > 0.4 ? 'deposit' : 'withdrawal';
      const account = randomAccounts[Math.floor(Math.random() * randomAccounts.length)];
      const asset = randomAssets[Math.floor(Math.random() * randomAssets.length)];
      
      let baseAmount = 1500;
      if (asset === 'BTC') baseAmount = 18000;
      if (asset === 'ETH') baseAmount = 9000;
      
      const multiplier = Math.random() * 4 + 0.5;
      const amount = parseFloat((baseAmount * multiplier).toFixed(2));

      const newTx: TransactionItem = {
        id: `tx-live-${Math.random()}`,
        account,
        amount,
        type,
        asset,
        time: 'Just now',
      };

      setTransactions((prev) => {
        // Keep to max 12 items for clean UX
        const filtered = [newTx, ...prev];
        return filtered.slice(0, 16);
      });
    }, 7500);

    return () => clearInterval(interval);
  }, []);

  // Set successfully logged account state
  const handleRegisterSuccess = (name: string, email: string) => {
    setCurrentUser({ name, email });
    setToastMessage(`Secure Portfolio established for ${name}! Checking keys...`);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  // Set selected investment pack & open calculator modal
  const handleOpenPlan = (plan: InvestmentPack) => {
    setSelectedPlan(plan);
    setIsSelectPlanOpen(true);
  };

  // Perform a simulated physical deposit and append it directly to ledger!
  const handleConfirmInvestment = (amount: number, planName: string) => {
    if (!currentUser) return;
    
    // Convert human name to clean low-caps account name e.g. "John Doe" -> "j_doe_custody"
    const accountName = `${currentUser.name.toLowerCase().replace(/\s+/g, '_')}_custody`;
    
    const newDepositTx: TransactionItem = {
      id: `tx-user-${Math.random()}`,
      account: accountName,
      amount,
      type: 'deposit',
      asset: 'BTC', // Default to BTC trust pool
      time: 'Just now',
    };

    setTransactions((prev) => [newDepositTx, ...prev]);
    
    setToastMessage(`Deposited $${amount.toLocaleString()} in ${planName}!`);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setViewState('landing');
    setToastMessage('Institutional Custodian logged out correctly.');
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  if (viewState === 'dashboard' && currentUser) {
    return (
      <div className="min-h-screen bg-[#080808] text-white">
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: -40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#101217] border border-brand-gold/45 text-white py-3.5 px-6 rounded-xl shadow-[0_10px_35px_rgba(212,175,55,0.15)] flex items-center gap-3"
              id="global-alert-toast"
            >
              <div className="w-6 h-6 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center border border-brand-gold/25">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-display font-black uppercase text-brand-gold tracking-widest">Aurex Ledger Update</p>
                <p className="text-xs text-slate-300 mt-0.5">{toastMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <UserDashboard 
          user={currentUser} 
          onNavigateHome={() => setViewState('landing')}
          onLogout={handleLogout}
          transactionsState={transactions}
          setTransactionsState={setTransactions}
          toastSuccess={(msg) => {
            setToastMessage(msg);
            setShowToast(true);
            setTimeout(() => {
              setShowToast(false);
            }, 4000);
          }}
        />
      </div>
    );
  }

  if (viewState === 'login' || viewState === 'signup') {
    return (
      <div className="min-h-screen bg-[#080808] text-white">
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: -40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#101217] border border-brand-gold/45 text-white py-3.5 px-6 rounded-xl shadow-[0_10px_35px_rgba(212,175,55,0.15)] flex items-center gap-3"
              id="global-alert-toast"
            >
              <div className="w-6 h-6 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center border border-brand-gold/25">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-display font-black uppercase text-brand-gold tracking-widest">Aurex Ledger Update</p>
                <p className="text-xs text-slate-300 mt-0.5">{toastMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AuthPages 
          initialState={viewState} 
          onNavigate={(target) => setViewState(target)}
          onLoginSuccess={(name, email) => {
            setCurrentUser({ name, email });
            setViewState('dashboard');
            setToastMessage(`Welcome authorized account: ${name}! establishing custody connection...`);
            setShowToast(true);
            setTimeout(() => {
              setShowToast(false);
            }, 4000);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-gray-100 flex flex-col font-sans antialiased text-left select-none overflow-x-hidden">
      
      {/* Dynamic Success Alert Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#101217] border border-brand-gold/45 text-white py-3.5 px-6 rounded-xl shadow-[0_10px_35px_rgba(245,196,83,0.15)] flex items-center gap-3"
            id="global-alert-toast"
          >
            <div className="w-6 h-6 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center border border-brand-gold/25">
              <Check className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <p className="text-xs font-display font-black uppercase text-brand-gold tracking-widest">Aurex Ledger Update</p>
              <p className="text-xs text-slate-300 mt-0.5">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* fixed Navigation Header */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#08090C]/85 backdrop-blur-md border-b border-[#1E232D]/80" id="global-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          
          {/* Platform Identity */}
          <a href="#hero-section" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-brand-gold to-brand-gold-dark text-[#08090C] font-display font-extrabold flex items-center justify-center text-sm shadow">
              AU
            </div>
            <div className="text-left">
              <span className="font-display font-black text-[#F3F4F6] text-sm tracking-tight uppercase block">
                Aurex Elite
              </span>
              <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold block -mt-0.5">
                Swiss Trustees
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-display font-bold uppercase tracking-wider text-gray-300">
            <a href="#about-platform" className="hover:text-brand-gold transition duration-150">Philosophy</a>
            <a href="#investment-plans" className="hover:text-brand-gold transition duration-150">Vault Tiers</a>
            <a href="#market-dashboard" className="hover:text-brand-gold transition duration-150">Market Indices</a>
            <a href="#transactions-ledger" className="hover:text-brand-gold transition duration-150">Live Ledger</a>
            <a href="#leadership-team" className="hover:text-brand-gold transition duration-150">Governance</a>
          </nav>

          {/* Desktop User Context / Action CTAs */}
          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-3.5">
                <button
                  onClick={() => setViewState('dashboard')}
                  className="px-4 py-2 rounded-xl bg-brand-gold/10 hover:bg-brand-gold/20 text-brand-gold border border-brand-gold/25 font-display text-xs font-bold uppercase cursor-pointer transition-all"
                >
                  Secure Dashboard Portal →
                </button>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#11141B] border border-brand-gold/25 text-brand-gold">
                  <UserCheck className="w-4 h-4 text-[#F5C453]" />
                  <div className="text-left">
                    <span className="text-[9px] font-sans font-extrabold block text-gray-400 uppercase leading-none">Institutional</span>
                    <span className="text-xs font-display font-black block">{currentUser.name}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setViewState('landing');
                  }}
                  className="p-2.5 rounded-xl hover:bg-rose-500/10 text-gray-500 hover:text-rose-400 border border-[#1E232D] transition cursor-pointer"
                  title="Logout Custodian"
                  id="logout-btn"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setViewState('login')}
                  className="px-4 py-2.5 text-gray-300 hover:text-brand-gold text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer"
                  id="header-login-btn"
                >
                  Login
                </button>
                <button
                  onClick={() => setViewState('signup')}
                  className="px-5 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider gold-glow-btn cursor-pointer transition-all"
                  id="header-signup-btn"
                >
                  Create Account
                </button>
              </div>
            )}
          </div>

          {"/* Mobile Menu Icon Toggle */"}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden text-gray-400 hover:text-white rounded-lg focus:outline-none"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

        {/* Mobile Navigation Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0A0C11] border-b border-[#1E232D] overflow-hidden"
              id="mobile-nav-panel"
            >
              <div className="px-5 py-6 space-y-4 text-left">
                <div className="flex flex-col gap-3 font-display font-bold text-xs uppercase tracking-wider text-gray-300">
                  <a href="#about-platform" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-brand-gold transition">Philosophy</a>
                  <a href="#investment-plans" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-brand-gold transition">Vault Tiers</a>
                  <a href="#market-dashboard" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-brand-gold transition">Market Indices</a>
                  <a href="#transactions-ledger" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-brand-gold transition">Live Ledger</a>
                  <a href="#leadership-team" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-brand-gold transition">Governance</a>
                  {currentUser && (
                    <button 
                      onClick={() => { setViewState('dashboard'); setMobileMenuOpen(false); }} 
                      className="py-1.5 font-bold text-brand-gold text-left underline uppercase"
                    >
                      Dashboard Portal
                    </button>
                  )}
                </div>

                <div className="pt-4 border-t border-[#1C212E]/50">
                  {currentUser ? (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-brand-gold">
                        <UserCheck className="w-4 h-4" />
                        <span className="font-display font-bold text-xs">{currentUser.name}</span>
                      </div>
                      <button
                        onClick={() => {
                          handleLogout();
                          setViewState('landing');
                          setMobileMenuOpen(false);
                        }}
                        className="text-xs text-rose-500 font-bold uppercase tracking-wider"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3.5">
                      <button
                        onClick={() => {
                          setViewState('login');
                          setMobileMenuOpen(false);
                        }}
                        className="py-2.5 text-center text-xs text-white font-bold tracking-wider uppercase border border-white/10 rounded-xl"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          setViewState('signup');
                          setMobileMenuOpen(false);
                        }}
                        className="py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider gold-glow-btn text-center"
                      >
                        Sign Up
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Primary single layout content blocks */}
      <main className="flex-grow">
        
        {/* Section 1: Hero view with live prices container beneath it */}
        <div className="relative">
          <Hero onTriggerRegister={() => setIsRegisterOpen(true)} imageUrl={HERO_IMAGE_URL} />
          <LiveTicker />
        </div>

        {/* Section 2: Platform Stats Grid */}
        <StatsGrid />

        {/* Section 3: About platform with video placeholder */}
        <AboutPlatform />

        {/* Section 4: Investment Packs with live notification notices in corner */}
        <InvestmentPacks onSelectPlan={handleOpenPlan} />

        {/* Section 5: Interactive market tables with indices trackers & global partner banner */}
        <MarketTable />

        {/* Section 6: Deposits and Withdrawals dynamic monitors */}
        <TransactionsLedger transactions={transactions} />

        {/* Section 7: Meet the steering board leadership team */}
        <TeamSection />

      </main>

      {/* Section 8: Legal Disclaimers & Zürich location details footer */}
      <RiskFooter />

      {/* Interactive registration form popup modal */}
      <CreateAccountModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSuccess={handleRegisterSuccess}
      />

      {/* Interactive Plan calculator and simulator modal */}
      <SelectPlanModal
        isOpen={isSelectPlanOpen}
        onClose={() => setIsSelectPlanOpen(false)}
        selectedPlan={selectedPlan}
        onInvest={handleConfirmInvestment}
        isRegistered={currentUser !== null}
        onTriggerRegister={() => {
          setIsSelectPlanOpen(false);
          setIsRegisterOpen(true);
        }}
      />

    </div>
  );
}
