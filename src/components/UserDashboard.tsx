import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, ShieldCheck, DollarSign, Wallet, ArrowDown, ArrowUp, 
  Menu, X, User, ChevronDown, RefreshCw, BarChart3, Clock, 
  Settings, HelpCircle, ArrowUpRight, Check, AlertTriangle, Info,
  BookOpen, Layers, Users, ExternalLink, Mail, Phone, Lock, Landmark
} from 'lucide-react';
import { TransactionItem } from '../types';
import { DepositModal } from './DepositModal';

interface UserDashboardProps {
  user: { name: string; email: string };
  onNavigateHome: () => void;
  onLogout: () => void;
  transactionsState: TransactionItem[];
  setTransactionsState: React.Dispatch<React.SetStateAction<TransactionItem[]>>;
  toastSuccess: (msg: string) => void;
}

export function UserDashboard({ 
  user, 
  onNavigateHome, 
  onLogout, 
  transactionsState, 
  setTransactionsState,
  toastSuccess 
}: UserDashboardProps) {
  // Sidebar states
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions' | 'investment' | 'plans' | 'profile' | 'support'>('dashboard');
  const [userMenuDropdown, setUserMenuDropdown] = useState(false);

  // Core User Balances (simulated with standard state that grows with live actions!)
  const [availableBalance, setAvailableBalance] = useState<number>(146380.00);
  const [totalDeposit, setTotalDeposit] = useState<number>(95000.00);
  const [totalWithdraw, setTotalWithdraw] = useState<number>(31200.00);
  const [totalReferralBonus, setTotalReferralBonus] = useState<number>(4500.00);
  const [totalActivePlans, setTotalActivePlans] = useState<number>(4);
  const [totalPlanCount, setTotalPlanCount] = useState<number>(6);
  const [totalBonus, setTotalBonus] = useState<number>(9200.00);
  const [totalProfit, setTotalProfit] = useState<number>(78080.00);

  // Custom User Profile Sub-States
  const [phoneNumber, setPhoneNumber] = useState('+41 79 123 45 67');
  const [userCountry, setUserCountry] = useState('Switzerland');
  const [paymentAddress, setPaymentAddress] = useState('');
  const [paymentNetwork, setPaymentNetwork] = useState('BTC Bitcoin Core');

  // Interactive inline deposit form states
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('5000');
  const [depositCurrency, setDepositCurrency] = useState<'BTC' | 'ETH' | 'USDT'>('BTC');

  // Interactive withdraw form states
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('2000');
  const [withdrawAddress, setWithdrawAddress] = useState('0x71C...89af');

  // Notification Cards Dismiss indicators
  const [dismissWarning, setDismissWarning] = useState(false);
  const [dismissInfo, setDismissInfo] = useState(false);

  // Handle modal deposit success action
  const handleDepositModalSuccess = (amount: number, methodLabel: string, asset: 'BTC' | 'USDT') => {
    setAvailableBalance(prev => prev + amount);
    setTotalDeposit(prev => prev + amount);
    
    const newTx: TransactionItem = {
      id: `tx-user-dep-${Date.now()}`,
      account: methodLabel,
      amount: amount,
      type: 'deposit',
      asset: asset,
      time: 'Just now',
    };

    setTransactionsState(prev => [newTx, ...prev]);
    toastSuccess(`Submitted deposit of $${amount.toLocaleString()} via ${methodLabel} for custodian verification!`);
  };

  // Handle live simulation plan investment allocation
  const handleInvestEarnClick = () => {
    if (availableBalance < 1000) {
      alert("Minimum allocation plan requires $1,000 USD available portfolio funds.");
      return;
    }
    
    // Allocate some of available balance to Active Investment
    setAvailableBalance(prev => prev - 5000);
    setTotalActivePlans(prev => prev + 1);
    setTotalPlanCount(prev => prev + 1);
    setTotalProfit(prev => prev + 850); // instantly simulate yield index
    
    const newTx: TransactionItem = {
      id: `tx-user-inv-${Date.now()}`,
      account: 'Aurex Yield Pool Alpha',
      amount: 5000,
      type: 'withdrawal', // locked to plan
      asset: 'USDT',
      time: 'Just now',
    };

    setTransactionsState(prev => [newTx, ...prev]);
    toastSuccess("Successfully allocated $5,000 USD to Pro Vault Tier! Earnings standard calculation is active.");
  };

  const handleUpdateProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toastSuccess("Investor security information updated successfully.");
    setDismissInfo(true);
  };

  const handleAddPaymentAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentAddress.trim()) {
      alert("Please provide a valid cryptocurrency receiving address.");
      return;
    }
    toastSuccess(`Payment endpoint successfully bound to Network: ${paymentNetwork}`);
    setDismissWarning(true);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col justify-between select-none" id="dashboard-portal-frame">
      
      {/* HEADER & PROFILE GREETING */}
      <header className="h-20 bg-black/80 backdrop-blur-md border-b border-white/5 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40" id="dashboard-top-navigation">
        
        {/* Branding on left */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 px-2 rounded hover:bg-white/5 border border-white/10 text-gray-400 hover:text-white transition"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-gold to-brand-gold-dark flex items-center justify-center">
              <span className="text-black font-black text-sm">EU</span>
            </div>
            <span className="text-sm sm:text-base font-display font-black tracking-widest hidden sm:inline-block">
              ELITE<span className="text-brand-gold">ASSET</span>
            </span>
          </div>
        </div>

        {/* Welcome, [User Name]! & Profile Icon */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <span className="text-gray-400 text-[10px] block font-mono">PORTFOLIO PORTAL ONLINE</span>
            <span className="text-xs font-bold text-gray-200">
              Welcome, <span className="text-brand-gold">{user.name}</span>!
            </span>
          </div>

          {/* Profile Dropper button */}
          <div className="relative">
            <button 
              onClick={() => setUserMenuDropdown(!userMenuDropdown)}
              className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 hover:border-brand-gold/40 transition cursor-pointer"
              id="dashboard-user-profile-avatar"
            >
              <div className="w-8 h-8 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center border border-brand-gold/20 font-bold text-xs uppercase">
                {user.name.slice(0, 2)}
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            <AnimatePresence>
              {userMenuDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2.5 w-60 bg-[#0c0d12] border border-white/10 rounded-xl p-3 shadow-2xl space-y-1.5"
                  id="dashboard-user-dropdown-panel"
                >
                  <div className="px-2.5 py-2 border-b border-white/5 mb-1 text-left">
                    <p className="text-xs font-bold text-white truncate">{user.name}</p>
                    <p className="text-[10px] text-gray-400 truncate mt-0.5">{user.email}</p>
                  </div>
                  <button 
                    onClick={() => { setActiveTab('profile'); setUserMenuDropdown(false); }}
                    className="w-full text-left px-2.5 py-1.5 text-xs rounded hover:bg-white/5 transition flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-brand-gold" /> Investor Profile
                  </button>
                  <button
                    onClick={() => { onNavigateHome(); setUserMenuDropdown(false); }}
                    className="w-full text-left px-2.5 py-1.5 text-xs rounded hover:bg-white/5 text-gray-300 transition flex items-center gap-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Return to Website
                  </button>
                  <button 
                    onClick={() => { onLogout(); setUserMenuDropdown(false); }}
                    className="w-full text-left px-2.5 py-1.5 text-xs rounded hover:bg-rose-500/10 text-rose-400 font-bold transition flex items-center gap-2 border-t border-white/5 pt-2"
                  >
                    <ArrowDown className="w-3.5 h-3.5" /> Sign Out Portal
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <div className="flex-1 flex relative" id="dashboard-layout-body">
        
        {/* COLLAPSIBLE SIDEBAR MENU NAVIGATION */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="bg-black/90 border-r border-white/5 shrink-0 overflow-y-auto hidden md:flex flex-col z-10"
              id="dashboard-collapsible-aside"
            >
              {/* Header inside menu showing name, email and dropdown caret */}
              <div className="p-5 border-b border-white/5 flex items-center justify-between">
                <div className="text-left w-2/3">
                  <p className="text-xs font-bold text-white truncate max-w-full">{user.name}</p>
                  <p className="text-[10px] text-gray-400 truncate max-w-full">{user.email}</p>
                </div>
                {/* Dropdown caret indicator */}
                <div className="p-1 px-1.5 bg-brand-gold/10 rounded border border-brand-gold/25 text-brand-gold">
                  <span className="text-[9px] font-mono font-bold tracking-tight">VIP</span>
                </div>
              </div>

              {/* Navigation List with descriptive icons */}
              <nav className="p-4 flex-1 space-y-1.5 text-left">
                <p className="text-[9px] font-mono tracking-widest text-gray-500 font-medium px-2.5 mb-2.5 uppercase">INVESTOR SERVICES</p>
                
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-colors ${activeTab === 'dashboard' ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20' : 'text-gray-300 hover:bg-white/5'}`}
                >
                  <Wallet className="w-4 h-4 text-brand-gold" /> Dashboard
                </button>

                <button 
                  onClick={() => setActiveTab('transactions')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-colors ${activeTab === 'transactions' ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20' : 'text-gray-300 hover:bg-white/5'}`}
                >
                  <Clock className="w-4 h-4 text-brand-gold" /> Transaction History
                </button>

                <button 
                  onClick={() => setActiveTab('investment')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-colors ${activeTab === 'investment' ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20' : 'text-gray-300 hover:bg-white/5'}`}
                >
                  <Layers className="w-4 h-4 text-brand-gold" /> Investment Portfolios
                </button>

                <button 
                  onClick={() => setActiveTab('plans')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-colors ${activeTab === 'plans' ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20' : 'text-gray-300 hover:bg-white/5'}`}
                >
                  <BarChart3 className="w-4 h-4 text-brand-gold" /> Our Plans
                </button>

                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-colors ${activeTab === 'profile' ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20' : 'text-gray-300 hover:bg-white/5'}`}
                >
                  <User className="w-4 h-4 text-brand-gold" /> My Profile
                </button>

                <div className="border-t border-white/5 my-4 pt-4" />
                <p className="text-[9px] font-mono tracking-widest text-gray-500 font-medium px-2.5 mb-2.5 uppercase">SYSTEM UTILITIES</p>

                <button 
                  onClick={onNavigateHome}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-gray-300 hover:bg-white/5 uppercase tracking-wide transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-blue-400" /> Go to Home
                </button>

                <button 
                  onClick={() => setActiveTab('support')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-gray-300 hover:bg-white/5 uppercase tracking-wide transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-emerald-400" /> Contact/Support
                </button>
              </nav>

              <div className="p-4 border-t border-white/5 bg-black/40 text-center text-[10px] text-gray-500">
                <span className="block font-mono tracking-wider">SECURE CLIENT CUSTODY</span>
                <span className="block text-[9px] text-brand-gold mt-1">ID: AU-DB4062F0v</span>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Content Container area */}
        <main className="flex-grow p-4 sm:p-8 overflow-y-auto max-w-7xl mx-auto" id="dashboard-scrollable-content">
          
          {/* CRITICAL ACCOUNT NOTIFICATION CARDS */}
          <div className="space-y-3 mb-6" id="critical-onboarding-notifications">
            
            {/* Warning Card (Yellow / Gold border) */}
            <AnimatePresence>
              {!dismissWarning && (
                <motion.div 
                  initial={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="bg-[#D4AF37]/5 border-l-4 border-brand-gold p-4.5 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[#D4AF37]/5 shadow-sm"
                  id="onboarding-warning-card"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-brand-gold/10 text-brand-gold mt-0.5 md:mt-0 shrink-0">
                      <AlertTriangle className="w-4.5 h-4.5" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-white font-display uppercase tracking-wider">PAYMENT SETTLEMENT BINDING REQUIRED</p>
                      <p className="text-xs text-gray-300 mt-1">
                        Add an account that you'd like to receive payment or withdraw funds.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0 mt-2 md:mt-0">
                    <button 
                      onClick={() => { setActiveTab('profile'); }}
                      className="px-4 py-2 bg-brand-gold text-black rounded-lg text-xs font-bold transition-all hover:bg-brand-gold-dark cursor-pointer shadow-md inline-block whitespace-nowrap text-center"
                    >
                      Add Account
                    </button>
                    <button 
                      onClick={() => setDismissWarning(true)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg text-xs font-medium"
                    >
                      Dismiss
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Info Card (Green border) */}
            <AnimatePresence>
              {!dismissInfo && (
                <motion.div 
                  initial={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="bg-[#00F5A0]/5 border-l-4 border-[#00F5A0] p-4.5 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  id="onboarding-info-card"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#00F5A0]/10 text-[#00F5A0] mt-0.5 md:mt-0 shrink-0">
                      <Info className="w-4.5 h-4.5" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-white font-display uppercase tracking-wider">COMPLIMENTARY PORTFOLIO STATUS</p>
                      <p className="text-xs text-gray-300 mt-1">
                        Update your account information from your profile to complete account setup.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0 mt-2 md:mt-0">
                    <button 
                      onClick={() => { setActiveTab('profile'); }}
                      className="px-4 py-2 bg-[#00F5A0] text-black rounded-lg text-xs font-bold transition-all hover:opacity-90 cursor-pointer shadow-md inline-block whitespace-nowrap text-center"
                    >
                      Update Profile
                    </button>
                    <button 
                      onClick={() => setDismissInfo(true)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg text-xs font-medium"
                    >
                      Dismiss
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* DYNAMIC SCREEN SWITCHER */}
          <AnimatePresence mode="wait">
            
            {activeTab === 'dashboard' && (
              <motion.div 
                key="tab-dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                
                {/* FINANCIAL BALANCES GRID (CORE DASHBOARD INTERACTIVE WALLETS) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="dashboard-balances-grid">
                  
                  {/* WALLET 1: AVAILABLE BALANCE WALLET */}
                  <div className="lg:col-span-2 glass-card p-6 rounded-2xl relative overflow-hidden border border-white/10 text-left flex flex-col justify-between" id="available-balance-wallet-card">
                    {/* Atmospheric glow behind balances */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-brand-gold/10 to-transparent blur-2xl rounded-full pointer-events-none" />
                    
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#00F5A0] animate-pulse" />
                          <span className="text-[10px] font-mono tracking-widest text-[#00F5A0] uppercase font-bold">AVAILABLE PORTFOLIO FUNDS</span>
                        </div>
                        <span className="text-[9px] font-mono text-gray-500 uppercase bg-white/5 p-1 px-2 rounded">
                          ESCROW SECURED
                        </span>
                      </div>

                      {/* Prominent layout block displaying critical user balances */}
                      <p className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white mt-1">
                        ${availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      
                      <span className="text-[10px] text-gray-400 block tracking-wider uppercase font-semibold mt-1">
                        Investment Account Descriptor
                      </span>
                    </div>

                    {/* Immediate high-contrast action buttons */}
                    <div className="mt-8 flex flex-wrap gap-3">
                      <button 
                        onClick={() => setShowDepositModal(true)}
                        className="px-5 py-3 rounded-xl bg-brand-gold text-[#080808] font-bold font-display text-xs uppercase tracking-wider transition-all hover:bg-brand-gold-dark flex items-center gap-2 cursor-pointer shadow-lg"
                      >
                        Deposit →
                      </button>
                      
                      <button 
                        onClick={handleInvestEarnClick}
                        className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold font-display text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                      >
                        Invest & Earn
                      </button>

                      <button 
                        onClick={() => setShowWithdrawForm(!showWithdrawForm)}
                        className="px-4 py-3 rounded-xl hover:bg-white/5 border border-transparent text-gray-400 hover:text-white transition-all text-xs font-bold"
                      >
                        Withdraw Funds
                      </button>
                    </div>

                    {/* Expandable in-line Withdraw Form */}
                    <AnimatePresence>
                      {showWithdrawForm && (
                        <motion.form 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          onSubmit={(e) => {
                            e.preventDefault();
                            const parsed = parseFloat(withdrawAmount);
                            if (isNaN(parsed) || parsed <= 0) return;
                            if (parsed > availableBalance) {
                              alert("withdrawal authorization request exceeds available portfolio funds.");
                              return;
                            }
                            setAvailableBalance(prev => prev - parsed);
                            setTotalWithdraw(prev => prev + parsed);
                            
                            const newTx: TransactionItem = {
                              id: `tx-user-wd-${Date.now()}`,
                              account: `${user.name.toLowerCase().replace(/\s+/g, '_')}_wallet`,
                              amount: parsed,
                              type: 'withdrawal',
                              asset: 'BTC',
                              time: 'Just now',
                            };

                            setTransactionsState(prev => [newTx, ...prev]);
                            toastSuccess(`Withdrawal of $${parsed.toLocaleString()} logged in the queue! Standard check under 4 mins.`);
                            setShowWithdrawForm(false);
                          }}
                          className="mt-6 pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-3 items-end"
                        >
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1.5 font-bold">Receiver Token Code</label>
                            <input 
                              type="text" 
                              value={withdrawAddress} 
                              onChange={(e) => setWithdrawAddress(e.target.value)}
                              className="w-full bg-[#0c0d12] border border-white/10 p-2 text-xs rounded-lg text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1.5 font-bold">Withdraw Sum (USD)</label>
                            <input 
                              type="number"
                              value={withdrawAmount}
                              onChange={(e) => setWithdrawAmount(e.target.value)}
                              placeholder="2000"
                              min="10"
                              className="w-full bg-[#0c0d12] border border-white/10 p-2 text-xs rounded-lg text-white font-mono"
                            />
                          </div>
                          <div>
                            <button 
                              type="submit"
                              className="w-full h-9 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold uppercase rounded-lg transition"
                            >
                              Request Payout
                            </button>
                          </div>
                        </motion.form>
                      )}
                    </AnimatePresence>

                  </div>

                  {/* WALLET 2: INSTANT LEDGER HEALTH */}
                  <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#00F5A0]/5 to-transparent blur-xl rounded-full pointer-events-none" />
                    
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold block mb-1">CUSTODIAN SYSTEM GATE</span>
                      <p className="text-xl font-bold text-white font-display">Aurex High Liquidity Node</p>
                      <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                        Instant KYC validation node is synchronized with Zürich trust bank. Average audit latency is currently 3.4 seconds.
                      </p>
                    </div>

                    <div className="bg-[#11141B] border border-white/5 rounded-xl p-3.5 space-y-2 mt-4 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Node Latency:</span>
                        <span className="text-[#00F5A0] font-bold">4.2ms (Optimal)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Security Core:</span>
                        <span className="text-[#00F5A0] font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> HSM-256
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* FINANCIAL SUMMARY CARDS GRID */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-brand-gold text-left mb-4">
                    FINANCIAL ACCOUNTING SUMMARY
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="accounting-summary-metric-cards">
                    
                    {/* CARD 1: Total Deposit */}
                    <div className="glass-card p-5 rounded-xl border border-white/10 text-left relative group hover:border-[#D4AF37]/30 transition-colors">
                      <span className="text-[10px] font-semibold text-gray-400 tracking-wider block uppercase">Total Deposit</span>
                      <p className="text-xl sm:text-2xl font-black text-white font-display mt-1.5">
                        ${totalDeposit.toLocaleString()}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-emerald-400 font-mono mt-2 pt-2 border-t border-white/5">
                        <span>This Month Indicator</span>
                        <span className="font-bold flex items-center"><ArrowUp className="w-3 h-3" /> 12%</span>
                      </div>
                    </div>

                    {/* CARD 2: Total Withdraw */}
                    <div className="glass-card p-5 rounded-xl border border-white/10 text-left relative group hover:border-[#D4AF37]/30 transition-colors">
                      <span className="text-[10px] font-semibold text-gray-400 tracking-wider block uppercase">Total Withdraw</span>
                      <p className="text-xl sm:text-2xl font-black text-white font-display mt-1.5">
                        ${totalWithdraw.toLocaleString()}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono mt-2 pt-2 border-t border-white/5">
                        <span>This Month Indicator</span>
                        <span className="font-bold">Completed</span>
                      </div>
                    </div>

                    {/* CARD 3: Total Referral Bonus */}
                    <div className="glass-card p-5 rounded-xl border border-white/10 text-left relative group hover:border-[#D4AF37]/30 transition-colors">
                      <span className="text-[10px] font-semibold text-gray-400 tracking-wider block uppercase">Total Referral Bonus</span>
                      <p className="text-xl sm:text-2xl font-black text-white font-display mt-1.5">
                        ${totalReferralBonus.toLocaleString()}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-emerald-400 font-mono mt-2 pt-2 border-t border-white/5">
                        <span>This Month Indicator</span>
                        <span className="font-bold flex items-center"><ArrowUp className="w-3 h-3" /> Active</span>
                      </div>
                    </div>

                    {/* CARD 4: Total Active Investment Plans */}
                    <div className="glass-card p-5 rounded-xl border border-white/10 text-left relative group hover:border-[#D4AF37]/30 transition-colors">
                      <span className="text-[10px] font-semibold text-gray-400 tracking-wider block uppercase">Total Active Plans</span>
                      <p className="text-xl sm:text-2xl font-black text-white font-display mt-1.5">
                        {totalActivePlans} Active Tiers
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-brand-gold font-mono mt-2 pt-2 border-t border-white/5">
                        <span>This Month Indicator</span>
                        <span className="font-bold">Yielding</span>
                      </div>
                    </div>

                    {/* CARD 5: Total Investment Plan Count */}
                    <div className="glass-card p-5 rounded-xl border border-white/10 text-left relative group hover:border-[#D4AF37]/30 transition-colors">
                      <span className="text-[10px] font-semibold text-gray-400 tracking-wider block uppercase">Total Plan Count</span>
                      <p className="text-xl sm:text-2xl font-black text-white font-display mt-1.5">
                        {totalPlanCount} Allocated Plans
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono mt-2 pt-2 border-t border-white/5">
                        <span>This Month Indicator</span>
                        <span className="font-bold">All Time</span>
                      </div>
                    </div>

                    {/* CARD 6: Total Bonus */}
                    <div className="glass-card p-5 rounded-xl border border-white/10 text-left relative group hover:border-[#D4AF37]/30 transition-colors">
                      <span className="text-[10px] font-semibold text-gray-400 tracking-wider block uppercase">Total Bonus</span>
                      <p className="text-xl sm:text-2xl font-black text-white font-display mt-1.5">
                        ${totalBonus.toLocaleString()}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-emerald-400 font-mono mt-2 pt-2 border-t border-white/5">
                        <span>This Month Indicator</span>
                        <span className="font-bold">+ $1,200</span>
                      </div>
                    </div>

                    {/* CARD 7: Total Profit */}
                    <div className="lg:col-span-2 glass-card p-5 rounded-xl border border-white/10 text-left relative group hover:border-[#00F5A0]/20 transition-colors">
                      <span className="text-[10px] font-semibold text-gray-400 tracking-wider block uppercase text-emerald-400 font-bold">Total Net Profit</span>
                      <p className="text-2xl sm:text-3xl font-black text-[#00F5A0] font-display mt-1.5">
                        +${totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-[#00F5A0] font-mono mt-2 pt-2 border-t border-white/5">
                        <span>This Month Indicator</span>
                        <span className="font-bold flex items-center"><ArrowUp className="w-3 h-3" /> Average APR 42.4%</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* RECENT USER TRANSACTIONS LIST */}
                <div className="glass-card p-6 rounded-2xl border border-white/10 text-left">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-display font-bold text-sm tracking-widest text-[#D4AF37] uppercase">REAL-TIME TRUSTED ACCRUALS</h4>
                    <span className="text-[10px] font-mono text-gray-400">SYNCING LIVE</span>
                  </div>

                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-xs font-mono text-left">
                      <thead>
                        <tr className="text-gray-400 border-b border-white/10">
                          <th className="pb-3 text-left">ACCOUNT USER</th>
                          <th className="pb-3 text-left">ASSET</th>
                          <th className="pb-3 text-left">AMOUNT</th>
                          <th className="pb-3 text-left font-sans">TYPE</th>
                          <th className="pb-3 text-right">TIMESTAMP</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {transactionsState.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="py-4 text-center text-gray-500">No transactions recorded yet</td>
                          </tr>
                        ) : (
                          transactionsState.map((tx) => (
                            <tr key={tx.id} className="hover:bg-white/5">
                              <td className="py-3 font-semibold text-white">{tx.account}</td>
                              <td className="py-3 ">{tx.asset}</td>
                              <td className={`py-3 font-bold ${tx.type === 'deposit' ? 'text-[#00F5A0]' : 'text-[#FF3D57]'}`}>
                                {tx.type === 'deposit' ? '+' : '-'}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                              </td>
                              <td className="py-3 capitalize">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-sans ${tx.type === 'deposit' ? 'bg-[#00F5A0]/10 text-[#00F5A0]' : 'bg-rose-500/10 text-[#FF3D57]'}`}>
                                  {tx.type}
                                </span>
                              </td>
                              <td className="py-3 text-right text-gray-400">{tx.time}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </motion.div>
            )}

            {activeTab === 'transactions' && (
              <motion.div 
                key="tab-transactions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-card p-6 rounded-2xl border border-white/10 text-left space-y-6"
              >
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <div>
                    <h3 className="font-display font-bold text-xl text-white">Full Audited Ledger Transactions</h3>
                    <p className="text-gray-400 text-xs mt-1">Check recent deposits, yield payouts, and outbound node transfers.</p>
                  </div>
                  <button 
                    onClick={() => {
                      toastSuccess("Ledger synchronization completed freshly.");
                    }}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs"
                  >
                    Sync Cleanly
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-mono text-left">
                    <thead>
                      <tr className="text-gray-400 border-b border-white/10">
                        <th className="pb-3 text-left">TX-HASH ID</th>
                        <th className="pb-3 text-left">TARGET ACCOUNT / ROUTING</th>
                        <th className="pb-3 text-left">ASSET</th>
                        <th className="pb-3 text-left">AMOUNT</th>
                        <th className="pb-3 text-left font-sans">STATUS INDICATOR</th>
                        <th className="pb-3 text-right">TIMESTAMP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {transactionsState.map((tx, idx) => (
                        <tr key={tx.id} className="hover:bg-white/5">
                          <td className="py-3.5 text-gray-400 font-mono uppercase">
                            0x{tx.id.replace('tx-', '').slice(0, 8)}...
                          </td>
                          <td className="py-3.5 text-white font-semibold">{tx.account}</td>
                          <td className="py-3.5">{tx.asset}</td>
                          <td className={`py-3.5 font-bold ${tx.type === 'deposit' ? 'text-[#00F5A0]' : 'text-[#FF3D57]'}`}>
                            {tx.type === 'deposit' ? '+' : '-'}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-3.5 uppercase text-[10px] font-sans font-bold text-slate-300">
                            <span className="inline-flex items-center gap-1">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#00F5A0] animate-pulse" /> Verified Node
                            </span>
                          </td>
                          <td className="py-3.5 text-right text-gray-400">{tx.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'investment' && (
              <motion.div 
                key="tab-investment"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 text-left"
              >
                <div className="glass-card p-6 rounded-2xl border border-white/10">
                  <h3 className="font-display font-black text-xl text-white uppercase tracking-wider mb-2 text-brand-gold">
                    Active Cryptographic Yield Contracts
                  </h3>
                  <p className="text-gray-400 text-xs">
                    Your institutional funds are allocated across automated multi-asset liquid pools in Switzerland. Ensure contract health.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    
                    <div className="bg-[#11141B] border border-white/5 p-5 rounded-xl space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-brand-gold/15 text-brand-gold px-2.5 py-1 rounded font-bold uppercase">Pro Vault Allocation</span>
                        <span className="text-[11px] font-mono text-[#00F5A0] font-bold">● Yielding 25% ROI</span>
                      </div>
                      <div className="pt-2">
                        <span className="text-[10px] text-gray-500 block">TOTAL ALLOCATED</span>
                        <span className="text-2xl font-bold font-display text-white">$45,000.00</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 pt-2 border-t border-white/5">
                        <span>Maturing Period:</span>
                        <span>After 5 Days</span>
                      </div>
                    </div>

                    <div className="bg-[#11141B] border border-white/5 p-5 rounded-xl space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-emerald-500/10 text-[#00F5A0] px-2.5 py-1 rounded font-bold uppercase font-display">Expert Yielding Plan</span>
                        <span className="text-[11px] font-mono text-[#00F5A0] font-bold">● Yielding 40% ROI</span>
                      </div>
                      <div className="pt-2">
                        <span className="text-[10px] text-gray-500 block">TOTAL ALLOCATED</span>
                        <span className="text-2xl font-bold font-display text-white">$50,000.00</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 pt-2 border-t border-white/5">
                        <span>Maturing Period:</span>
                        <span>After 8 Days</span>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'plans' && (
              <motion.div 
                key="tab-plans"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 text-left"
              >
                <div className="glass-card p-6 rounded-2xl border border-white/10">
                  <h3 className="font-display font-bold text-xl text-white">Select Investment Tiers</h3>
                  <p className="text-xs text-gray-400 mt-1">Allocate funds from your available ledger into active interest-earning lock plans.</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-[#11141B] border border-white/5 p-5 rounded-xl space-y-4">
                      <div>
                        <h4 className="font-bold text-white uppercase text-sm">Starter Plan</h4>
                        <span className="text-[10px] text-gray-500">★★★★★ Rated Plan</span>
                      </div>
                      <p className="text-3xl font-bold text-emerald-400 font-display">10%</p>
                      <ul className="text-xs text-gray-300 space-y-2">
                        <li>• Range: $100 - $5,000</li>
                        <li>• Payout: After 3 Days</li>
                        <li>• Risk Rating: Extremely Low</li>
                      </ul>
                      <button 
                        onClick={handleInvestEarnClick}
                        className="w-full py-2 bg-brand-gold text-black rounded font-bold text-xs uppercase"
                      >
                        Quick Allocate
                      </button>
                    </div>

                    <div className="bg-[#D4AF37]/5 border border-brand-gold/40 p-5 rounded-xl space-y-4">
                      <div>
                        <span className="text-[9px] bg-brand-gold text-black uppercase px-2 py-0.5 rounded font-black float-right">Best</span>
                        <h4 className="font-bold text-white uppercase text-sm">Professional Plan</h4>
                        <span className="text-[10px] text-brand-gold">★★★★★ Popular Rating</span>
                      </div>
                      <p className="text-3xl font-bold text-emerald-400 font-display">25%</p>
                      <ul className="text-xs text-gray-200 space-y-2">
                        <li>• Range: $5,000 - $25,000</li>
                        <li>• Payout: After 5 Days</li>
                        <li>• Risk Rating: Secured</li>
                      </ul>
                      <button 
                        onClick={handleInvestEarnClick}
                        className="w-full py-2 bg-brand-gold text-black rounded font-black text-xs uppercase"
                      >
                        Allocate Now
                      </button>
                    </div>

                    <div className="bg-[#11141B] border border-white/5 p-5 rounded-xl space-y-4">
                      <div>
                        <h4 className="font-bold text-white uppercase text-sm">Expert Tier</h4>
                        <span className="text-[10px] text-gray-500">★★★★★ Corporate</span>
                      </div>
                      <p className="text-3xl font-bold text-emerald-400 font-display">40%</p>
                      <ul className="text-xs text-gray-300 space-y-2">
                        <li>• Range: $25,000+</li>
                        <li>• Payout: After 8 Days</li>
                        <li>• Risk Rating: Escrow Backed</li>
                      </ul>
                      <button 
                        onClick={handleInvestEarnClick}
                        className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded font-bold text-xs uppercase"
                      >
                        Quick Allocate
                      </button>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div 
                key="tab-profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left"
              >
                
                {/* Profile update form */}
                <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-white/10 text-left">
                  <h3 className="font-display font-medium text-lg text-white mb-4">Update Investor Profile Information</h3>
                  
                  <form onSubmit={handleUpdateProfileSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 text-xs font-semibold uppercase mb-1.5">Registered Name</label>
                        <input 
                          type="text" 
                          disabled
                          value={user.name}
                          className="w-full bg-white/5 border border-white/10 text-gray-400 p-2.5 rounded-lg text-xs"
                        />
                        <span className="text-[10px] text-gray-500 mt-1 block">Institutional names are locked to passport KYC registers.</span>
                      </div>
                      <div>
                        <label className="block text-gray-400 text-xs font-semibold uppercase mb-1.5">Primary Email</label>
                        <input 
                          type="text" 
                          disabled
                          value={user.email}
                          className="w-full bg-white/5 border border-white/10 text-gray-400 p-2.5 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 text-xs font-semibold uppercase mb-1.5">Swiss Phone Number</label>
                        <input 
                          type="text" 
                          value={phoneNumber} 
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full bg-[#0c0d12] border border-white/15 text-white p-2.5 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-xs font-semibold uppercase mb-1.5">Tax Jurisdiction Country</label>
                        <input 
                          type="text" 
                          value={userCountry}
                          onChange={(e) => setUserCountry(e.target.value)}
                          className="w-full bg-[#0c0d12] border border-white/15 text-white p-2.5 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button 
                        type="submit"
                        className="px-5 py-2.5 bg-brand-gold text-black rounded-lg text-xs font-bold uppercase font-display"
                      >
                        Save Security Keys
                      </button>
                    </div>
                  </form>
                </div>

                {/* Bind Payment Settlement Account */}
                <div className="glass-card p-6 rounded-2xl border border-white/10">
                  <h3 className="font-display font-medium text-base text-white mb-2">Bind Payment Address</h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4">
                    Bind your payout or withdrawal cryptocurrency wallet address. Required for withdrawals.
                  </p>

                  <form onSubmit={handleAddPaymentAccount} className="space-y-4">
                    <div>
                      <label className="block text-gray-300 text-xs font-semibold uppercase mb-1.5">Network Code</label>
                      <select 
                        value={paymentNetwork}
                        onChange={(e) => setPaymentNetwork(e.target.value)}
                        className="w-full bg-[#0c0d12] border border-white/10 text-white p-2.5 rounded-lg text-xs"
                      >
                        <option value="BTC Bitcoin Core">BTC Bitcoin Core</option>
                        <option value="ETH ERC20 Node">ETH Ethereum ERC-20</option>
                        <option value="USDT TRON Wave">USDT Tether (TRC-20)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-300 text-xs font-semibold uppercase mb-1.5">Your Ledger Address</label>
                      <input 
                        type="text" 
                        required
                        value={paymentAddress}
                        onChange={(e) => setPaymentAddress(e.target.value)}
                        placeholder="E.g., b1qp9ae07ea...xyz910"
                        className="w-full bg-[#0c0d12] border border-white/10 text-white p-2.5 rounded-lg text-xs font-mono"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-black rounded font-bold text-xs uppercase"
                    >
                      Authenticate Binding Account
                    </button>
                  </form>
                </div>

              </motion.div>
            )}

            {activeTab === 'support' && (
              <motion.div 
                key="tab-support"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-card p-6 rounded-2xl border border-white/10 text-left space-y-4"
              >
                <div className="max-w-xl">
                  <h3 className="font-display font-bold text-xl text-white">Aurex Elite Client Support</h3>
                  <p className="text-gray-400 text-xs mt-1.5">
                    As an authorized institutional investor, you are assigned a dedicated account specialist located in Zürich, Switzerland. Feel free to reach out anytime.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                    <Mail className="w-5 h-5 text-brand-gold mb-2" />
                    <span className="text-[10px] text-gray-500 uppercase block">Trust Officer Email</span>
                    <span className="text-xs text-white font-semibold">switzerland-trustees@aurex-wealth.com</span>
                  </div>
                  <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                    <Phone className="w-5 h-5 text-brand-gold mb-2" />
                    <span className="text-[10px] text-gray-500 uppercase block">Geneva Office Line</span>
                    <span className="text-xs text-white font-semibold">+41 22 901 02 03</span>
                  </div>
                  <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                    <Landmark className="w-5 h-5 text-brand-gold mb-2" />
                    <span className="text-[10px] text-gray-500 uppercase block">Zürich Vault Headquarters</span>
                    <span className="text-xs text-white font-semibold">Bahnhofstrasse 102, 8001 Zürich</span>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </main>

      </div>

      <footer className="h-16 border-t border-white/5 px-8 flex items-center justify-between text-[10px] text-gray-400 opacity-60">
        <div>Registered Zürich Wealth Partners Core. Authenticated Session of <span className="text-brand-gold font-bold">{user.email}</span>.</div>
        <div>System Version 3.40.1</div>
      </footer>

      <DepositModal 
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        user={user}
        onSuccess={handleDepositModalSuccess}
      />

    </div>
  );
}
