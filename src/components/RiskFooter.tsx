import React from 'react';
import { Mail, Phone, MapPin, ShieldAlert, Award } from 'lucide-react';

export function RiskFooter() {
  const companyLinks = ['About Wealth AG', 'Security Audits', 'Institutional Tiers', 'Pressroom'];
  const supportLinks = ['Broker Support Desk', 'API Connectivity', 'Identity KYC Support', 'System Status'];
  const policyLinks = ['Custody Agreement', 'Risk Disclosure', 'AML / KYC Protocols', '瑞士 Banking Code'];

  return (
    <footer className="relative bg-[#050608] border-t border-[#1E232D] text-gray-400 font-sans text-xs pt-16 pb-12" id="platform-footer">
      <div className="absolute inset-x-0 bottom-0 h-64 bg-brand-gold-glow rounded-full blur-[160px] opacity-20 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          
          {/* Logo Brand information */}
          <div className="lg:col-span-4 space-y-5 text-left text-sm">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-brand-gold/90 text-[#08090C] font-display font-black flex items-center justify-center text-xs shadow">
                AU
              </div>
              <span className="font-display font-black text-white text-base tracking-tight uppercase">
                Aurex Elite Platform
              </span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
              Secure institutional-grade custodian vaults bridging the highest decentralized blockchain returns with elite regulatory compliance layers.
            </p>
            {/* Quick trust stamps */}
            <div className="flex items-center gap-3 text-[10px] uppercase font-bold text-gray-500">
              <span className="flex items-center gap-1.5 border border-[#1E232D] px-2.5 py-1 rounded bg-[#0A0C10]">
                <Award className="w-3.5 h-3.5 text-brand-gold" /> CHF SECURE
              </span>
              <span className="flex items-center gap-1.5 border border-[#1E232D] px-2.5 py-1 rounded bg-[#0A0C10]">
                VQF MEMBER
              </span>
            </div>
          </div>

          {/* Navigation link Categories */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-6 text-left">
            
            <div className="space-y-3.5">
              <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 text-xs">
                {companyLinks.map((link) => (
                  <li key={link}>
                    <a href="#about-platform" className="hover:text-brand-gold transition duration-150">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3.5">
              <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">Support</h4>
              <ul className="space-y-2 text-xs">
                {supportLinks.map((link) => (
                  <li key={link}>
                    <a href="#investment-plans" className="hover:text-brand-gold transition duration-150">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3.5">
              <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">Policy Center</h4>
              <ul className="space-y-2 text-xs">
                {policyLinks.map((link) => (
                  <li key={link}>
                    <a href="#platform-stats" className="hover:text-brand-gold transition duration-150">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Contact coordinates and company registration info */}
          <div className="lg:col-span-3 text-left space-y-4">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">Institutional Register</h4>
            <ul className="space-y-3 text-xs text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>
                  Bahnhofstrasse 45, 8001 Zürich, Switzerland
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+41 44 211 40 01</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:vaults-desk@aurex-wealth.ch" className="hover:text-brand-gold transition">
                  desk@aurex-wealth.ch
                </a>
              </li>
            </ul>
            <div className="text-[10px] text-gray-500 font-mono pt-1">
              Federal ID: <span className="text-gray-300">CHE-109.824-001 MWST</span>
            </div>
          </div>

        </div>

        {/* Mandatory RISK DISCLAIMER as requested in item 8 */}
        <div className="border-t border-[#1C212E]/60 pt-8 space-y-4 text-[11px] leading-relaxed select-text" id="legal-disclaimer">
          <div className="flex items-center gap-2 text-brand-gold font-bold uppercase tracking-wider text-xs">
            <ShieldAlert className="w-4 h-4" />
            Mandatory Legal & Financial Risk Warning Disclosure
          </div>
          <p className="text-gray-500 text-left">
            <strong>Custody & Trading Risks:</strong> Allocation of capital into high-yield cryptocurrency networks, digital tokens, tokenized derivative structures, or margin contracts involves extraordinary financial volatility and corresponding capital risk. Prices of decentralized virtual currencies are exposed to speculative swings, high liquidity compression, and sudden sovereign restriction blocks.
          </p>
          <p className="text-gray-500 text-left">
            <strong>No Yield Guarantee:</strong> Expected daily returns or projected overall ROIs (such as 110%, 135%, 175%, or 250%) shown in active investment tier calculators are simulated based on historical trade outputs and decentralized hedge optimization records. Past operational history serves purely as benchmark data and is never a bulletproof assurance of prospective capital generation results. You should avoid depositing any principal that would trigger physical discomfort or distress upon loss. Swiss regulatory codes VQF / FINMA compliance details are provided upon secure KYC level authorization.
          </p>
        </div>

        {/* Lower copyright bar */}
        <div className="border-t border-[#1C212E]/40 pt-6 flex flex-col md:flex-row md:justify-between items-center text-[10px] text-gray-500 gap-4">
          <p>© 2026 Aurex Wealth AG. Bahnhofstrasse Swiss Trust Assets. All Rights Reserved throughout global jurisdictions.</p>
          <div className="flex gap-4 font-mono">
            <span className="text-[#F3F4F6]">SSL SHA-512 SECURED</span>
            <span>|</span>
            <span className="text-emerald-400 animate-pulse">VAULTS STATUS: ONLINE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
