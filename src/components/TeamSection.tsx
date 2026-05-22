import React from 'react';
import { motion } from 'motion/react';
import { Mail, ShieldAlert, Award, Star } from 'lucide-react';
import { TeamMember } from '../types';

export function TeamSection() {
  const team: TeamMember[] = [
    {
      id: 'director',
      name: 'Marcus Von Habsburg',
      role: 'Managing Director & Founder',
      initials: 'MH',
      colorScheme: 'from-amber-400 to-yellow-600 text-slate-900',
    },
    {
      id: 'administrator',
      name: 'Dr. Evelyn Sterling',
      role: 'Chief Operations Administrator',
      initials: 'ES',
      colorScheme: 'from-emerald-400 to-teal-600 text-slate-900',
    },
    {
      id: 'vip_manager',
      name: 'Soren Amundsen',
      role: 'Global VIP Client Manager',
      initials: 'SA',
      colorScheme: 'from-blue-400 to-indigo-600 text-slate-900',
    },
    {
      id: 'pro',
      name: 'Keiko Tanaka',
      role: 'Principal Portfolio Risk Officer (PRO)',
      initials: 'KT',
      colorScheme: 'from-purple-400 to-fuchsia-600 text-slate-900',
    },
  ];

  return (
    <section className="relative py-24 bg-[#08090C] border-b border-[#1E232D]" id="leadership-team">
      <div className="absolute right-[10%] bottom-1/4 w-[350px] h-[350px] bg-brand-gold-glow rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <span className="font-display font-bold text-xs uppercase tracking-widest text-brand-gold">
            Executive Leadership
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our Steering Team
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto">
            Governed by veteran commodity administrators, crypto developers, and institutional tax planners with combined 45+ years of digital risk management.
          </p>
          <div className="h-1 w-16 bg-gradient-to-r from-brand-gold to-brand-gold-dark mx-auto rounded-full mt-3" />
        </div>

        {/* 4-Member Team Profile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-[#101217] border border-[#1E232D] hover:bg-[#151922] p-6 rounded-2xl text-center hover:border-brand-gold/30 transition-all duration-300 relative shadow-xl overflow-hidden"
              id={`team-member-${member.id}`}
            >
              {/* Highlight accent vector line inside individual profile */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-brand-gold-glow rounded-full blur-xl group-hover:bg-brand-gold/15 transition-all pointer-events-none" />

              {/* High-end circular initial vector representing premium executive portrait */}
              <div className="inline-flex items-center justify-center mb-6 relative">
                {/* Decorative gold ring */}
                <span className="absolute -inset-1 rounded-full border border-solid border-brand-gold/20 group-hover:border-brand-gold/50 transition-all duration-300 pointer-events-none" />
                
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.colorScheme} font-display text-2xl font-black tracking-wide flex items-center justify-center shadow-lg transition duration-300 group-hover:scale-105`}>
                  {member.initials}
                </div>
              </div>

              {/* Credentials and Role Descriptions */}
              <div className="space-y-2">
                <h3 className="font-display font-bold text-[#F3F4F6] text-base tracking-tight leading-snug group-hover:text-brand-gold transition-colors">
                  {member.name}
                </h3>
                <p className="text-gray-400 text-xs font-medium tracking-wide">
                  {member.role}
                </p>
              </div>

              {/* Contact Button */}
              <div className="mt-5 pt-4 border-t border-[#1E232D]/55 flex items-center justify-center gap-4 text-gray-500">
                <div className="flex gap-1 items-center bg-[#08090C] border border-[#1C212E] group-hover:border-brand-gold/20 text-[10px] font-medium font-mono text-gray-400 px-3 py-1 rounded-full transition-all">
                  <ShieldCheckIcon className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                  BOARD MEMBER
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

// Minimal icons helper
function ShieldCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2a1 1 0 0 1 .76.97z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
