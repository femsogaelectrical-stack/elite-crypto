import React from 'react';
import { Users2, Globe, DollarSign, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

interface StatField {
  label: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
  accent: string;
}

export function StatsGrid() {
  const stats: StatField[] = [
    {
      label: 'Registered Assets Users',
      value: '36,482+',
      subtext: '+12% growth this quarter',
      icon: <Users2 className="w-5 h-5 text-brand-gold" />,
      accent: 'border-l-2 border-brand-gold',
    },
    {
      label: 'Supported Jurisdictions',
      value: '110+',
      subtext: 'Fully compliant globally',
      icon: <Globe className="w-5 h-5 text-emerald-400" />,
      accent: 'border-l-2 border-emerald-500',
    },
    {
      label: 'Monthly Withdrawn Assets',
      value: '$50.8M',
      subtext: 'Average process under 4 mins',
      icon: <DollarSign className="w-5 h-5 text-amber-500" />,
      accent: 'border-l-2 border-amber-600',
    },
    {
      label: 'Active Daily Custodians',
      value: '15,124',
      subtext: 'Live active allocations now',
      icon: <ShieldAlert className="w-5 h-5 text-teal-400" />,
      accent: 'border-l-2 border-teal-500',
    },
  ];

  return (
    <section className="relative py-16 bg-[#08090C] border-b border-[#1E232D]" id="platform-stats">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Section Header */}
        <div className="text-center md:text-left mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-display font-bold text-xs uppercase tracking-widest text-brand-gold block mb-2">Track Record</span>
            <h3 className="font-display font-bold text-2xl text-white tracking-tight">Verified Institutional Metrics</h3>
          </div>
          <p className="text-gray-500 text-xs font-medium max-w-xs md:text-right">
            All operational ledgers are independently audited on a bi-weekly schedule. Real-time data sync active.
          </p>
        </div>

        {/* 4-Column Performance Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`bg-[#101217] ${stat.accent} rounded-xl p-5 hover:bg-[#151922] transition-all border border-[#1E232D] shadow-lg flex flex-col justify-between h-36`}
              id={`stat-card-${idx}`}
            >
              <div className="flex justify-between items-start">
                <span className="text-gray-400 font-sans text-xs uppercase tracking-wider font-semibold">
                  {stat.label}
                </span>
                <div className="p-1.5 bg-[#08090C] rounded-lg border border-[#1E232D]">
                  {stat.icon}
                </div>
              </div>

              <div>
                <span className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight block">
                  {stat.value}
                </span>
                <span className="text-[10px] text-gray-500 block mt-0.5 font-medium">
                  {stat.subtext}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
