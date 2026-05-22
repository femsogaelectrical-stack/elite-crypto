import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Mail, Lock, User, Globe, AlertCircle, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

interface AuthPagesProps {
  initialState?: 'login' | 'signup';
  onNavigate: (view: 'landing' | 'login' | 'signup' | 'dashboard') => void;
  onLoginSuccess: (name: string, email: string) => void;
}

const COUNTRIES = [
  { name: 'United States', code: 'US' },
  { name: 'United Kingdom', code: 'UK' },
  { name: 'Switzerland', code: 'CH' },
  { name: 'Germany', code: 'DE' },
  { name: 'Canada', code: 'CA' },
  { name: 'Australia', code: 'AU' },
  { name: 'Singapore', code: 'SG' },
  { name: 'Japan', code: 'JP' },
  { name: 'Monaco', code: 'MC' },
  { name: 'Luxembourg', code: 'LU' }
];

export function AuthPages({ initialState = 'login', onNavigate, onLoginSuccess }: AuthPagesProps) {
  const [activeState, setActiveState] = useState<'login' | 'signup'>(initialState);
  
  // Registration States
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [signUpCountry, setSignUpCountry] = useState('Switzerland');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [signUpError, setSignUpError] = useState('');

  // Login States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Submitting loaders
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpError('');

    if (!signUpName.trim()) {
      setSignUpError('Full Name is required');
      return;
    }
    if (!signUpEmail.trim()) {
      setSignUpError('Email address is required');
      return;
    }
    if (signUpPassword.length < 6) {
      setSignUpError('Password must be at least 6 characters');
      return;
    }
    if (signUpPassword !== signUpConfirmPassword) {
      setSignUpError('Passwords do not match');
      return;
    }
    if (!termsAgreed) {
      setSignUpError('Please agree to the terms & conditions');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSignedUp(true);
    }, 1200);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail.trim() || !loginPassword) {
      setLoginError('All fields are required');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // Pre-fill a realistic name from email if not matching a mock signup user
      let resolvedName = 'Marcus Aurelius';
      if (signUpEmail && loginEmail.toLowerCase() === signUpEmail.toLowerCase()) {
        resolvedName = signUpName;
      } else {
        const localPart = loginEmail.split('@')[0];
        resolvedName = localPart.charAt(0).toUpperCase() + localPart.slice(1).replace(/[._-]/g, ' ');
      }
      onLoginSuccess(resolvedName, loginEmail);
    }, 1000);
  };

  const triggerDemoAccount = () => {
    setLoginEmail('investor@elite.com');
    setLoginPassword('securePass123');
  };

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col justify-start items-center py-16 px-4 relative overflow-hidden" id="auth-pages-container">
      {/* Visual background lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-[300px] h-[300px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Top Header Navigation */}
      <div className="w-full max-w-md flex justify-between items-center mb-8 z-10">
        <button 
          onClick={() => onNavigate('landing')} 
          className="flex items-center gap-2 text-gray-400 hover:text-brand-gold text-xs font-semibold tracking-wider uppercase transition-colors mr-auto"
          id="auth-back-home"
        >
          ← Go To Home
        </button>
        <span className="text-[10px] font-mono text-gray-500 bg-white/5 border border-white/5 px-2.5 py-1 rounded-full uppercase tracking-widest">
          High Security SSL Active
        </span>
      </div>

      <AnimatePresence mode="wait">
        {/* State A: SignUp Completion Verification state / dialog */}
        {isSignedUp ? (
          <motion.div
            key="signup-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-md glass-card p-8 rounded-2xl relative border border-white/10 text-center shadow-2xl z-20"
            id="auth-signup-success-card"
          >
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[#00F5A0] flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 animate-pulse" />
            </div>

            <h3 className="font-display font-bold text-xl text-white tracking-tight mb-3">
              Registration Completed!
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 font-sans">
              Registration completed successfully! Please check your inbox for a verification mail to activate your account.
            </p>

            <div className="bg-[#00F5A0]/5 border border-[#00F5A0]/10 rounded-xl p-4 mb-8 text-left text-xs text-[#00F5A0]/90 space-y-1">
              <p className="font-semibold font-display tracking-wide uppercase">Institutional Notice</p>
              <p>A secure cryptographic node has been provisioned for <span className="font-mono text-white underline">{signUpEmail}</span>. Verify link access within 15 minutes.</p>
            </div>

            <button
              onClick={() => {
                setIsSignedUp(false);
                setActiveState('login');
                setLoginEmail(signUpEmail);
                setLoginPassword('');
              }}
              className="w-full h-11 rounded-lg gold-glow-btn flex items-center justify-center gap-2 font-display text-xs uppercase tracking-wider cursor-pointer"
              id="return-to-login-btn"
            >
              Return To Login
            </button>
          </motion.div>
        ) : activeState === 'signup' ? (
          /* State B: Registration input form Card */
          <motion.div
            key="signup-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full max-w-md glass-card p-8 rounded-2xl relative border border-white/10 shadow-2xl z-20"
            id="auth-signup-card"
          >
            {/* Branding title */}
            <div className="text-center mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-gold to-brand-gold-dark text-[#080808] font-display font-black flex items-center justify-center text-base sm:text-lg shadow mx-auto mb-3">
                AU
              </div>
              <h2 className="font-display text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Establish Account Portfolio
              </h2>
              <p className="text-gray-400 text-xs mt-1">Multi-asset institutional Swiss custody</p>
            </div>

            {signUpError && (
              <div className="bg-red-500/10 border border-[#FF3D57]/30 text-[#FF3D57] rounded-xl p-3.5 mb-5 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{signUpError}</span>
              </div>
            )}

            <form onSubmit={handleSignUpSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-gray-300 text-xs font-semibold uppercase mb-1.5 tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    required
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    placeholder="E.g., Marcus Aurelius"
                    className="w-full bg-[#151922]/40 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-gold/50 transition-all font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-xs font-semibold uppercase mb-1.5 tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    required
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    placeholder="name@institution.com"
                    className="w-full bg-[#151922]/40 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-gold/50 transition-all font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-gray-300 text-xs font-semibold uppercase mb-1.5 tracking-wider">
                    Create Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="password"
                      required
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#151922]/40 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-gold/50 transition-all font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-xs font-semibold uppercase mb-1.5 tracking-wider">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="password"
                      required
                      value={signUpConfirmPassword}
                      onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#151922]/40 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-gold/50 transition-all font-sans"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-xs font-semibold uppercase mb-1.5 tracking-wider">
                  Country
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <select
                    value={signUpCountry}
                    onChange={(e) => setSignUpCountry(e.target.value)}
                    className="w-full bg-[#151922] border border-white/10 text-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none focus:border-brand-gold/50 transition-all font-sans appearance-none"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.name} value={c.name} className="bg-[#080808] text-white">
                        {c.name} ({c.code})
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs font-mono">
                    ▼
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <input
                  id="terms-checkbox"
                  type="checkbox"
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  className="mt-1 accent-brand-gold w-4 h-4 rounded cursor-pointer border border-white/10 bg-[#151922]"
                />
                <label htmlFor="terms-checkbox" className="text-gray-400 text-xs select-none cursor-pointer leading-relaxed">
                  I explicitly verify and agree to the general Terms and Conditions agreement and KYC security disclosures.
                </label>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 rounded-lg gold-glow-btn flex items-center justify-center gap-2 font-display text-xs uppercase tracking-wider cursor-pointer"
                  id="auth-signup-submit"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-[#080808] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Create Account
                      <ChevronRight className="w-4 h-4 text-inherit" />
                    </>
                  )}
                </button>
              </div>

              <div className="pt-4 border-t border-white/5 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setSignUpError('');
                    setActiveState('login');
                  }}
                  className="text-gray-400 hover:text-brand-gold text-xs font-medium transition-colors"
                  id="auth-toggle-login"
                >
                  Already have an account? <span className="text-brand-gold font-bold underline">Login</span>
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          /* State C: Login with "INVESTORM" branding header */
          <motion.div
            key="login-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full max-w-md glass-card p-8 rounded-2xl relative border border-white/10 shadow-2xl z-20"
            id="auth-login-card"
          >
            {/* High-security INVESTORM header branding */}
            <div className="text-center mb-6">
              <span className="text-[10px] font-mono font-black tracking-[0.3em] text-brand-gold block mb-1">
                SECURE ACCESS PORTAL
              </span>
              <h1 className="font-display text-4xl font-black text-white tracking-widest uppercase mb-1">
                INVEST<span className="text-brand-gold">ORM</span>
              </h1>
              <p className="text-gray-400 text-xs">Authorize institutional account portfolio keys</p>
            </div>

            {loginError && (
              <div className="bg-red-500/10 border border-[#FF3D57]/30 text-[#FF3D57] rounded-xl p-3.5 mb-5 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-gray-300 text-xs font-semibold uppercase mb-1.5 tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="investor@elite.com"
                    className="w-full bg-[#151922]/40 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-gold/50 transition-all font-sans"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-gray-300 text-xs font-semibold uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert("To recover your investment security code, please contact your Swiss Account Manager directly via live support.")}
                    className="text-brand-gold hover:underline text-[11px] font-bold"
                  >
                    Forgot Code?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#151922]/40 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-gold/50 transition-all font-sans"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 select-none">
                <div className="flex items-center gap-2">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-brand-gold w-3.5 h-3.5 rounded border border-white/10 bg-[#151922] cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="text-gray-400 text-xs cursor-pointer">
                    Remember Me
                  </label>
                </div>

                <button
                  type="button"
                  onClick={triggerDemoAccount}
                  className="text-xs text-[#00F5A0] hover:underline font-mono"
                >
                  [Autofill Demo Credentials]
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 rounded-lg gold-glow-btn flex items-center justify-center gap-2 font-display text-xs uppercase tracking-wider cursor-pointer"
                  id="auth-login-submit"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-[#080808] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Login
                      <ChevronRight className="w-4 h-4 text-inherit" />
                    </>
                  )}
                </button>
              </div>

              <div className="pt-4 border-t border-white/5 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setLoginError('');
                    setActiveState('signup');
                  }}
                  className="text-gray-400 hover:text-brand-gold text-xs font-medium transition-colors"
                  id="auth-toggle-signup"
                >
                  New on our platform? <span className="text-brand-gold font-bold underline">Create an account</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Safety Notice Banner */}
      <div className="w-full max-w-md mt-6 text-center opacity-40 text-[9px] text-gray-400 px-4 leading-relaxed font-mono">
        REGISTRATION JURISDICTION: ZÜRICH & GENEVA. FINANCIAL ASSETS ARE PROTECTED BY SWISS BLOCK DISCLOSURE ACTS 2026.
      </div>
    </div>
  );
}
