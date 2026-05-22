import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDownLeft, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { TransactionItem } from '../types';

interface TransactionsLedgerProps {
  transactions: TransactionItem[];
}

export function TransactionsLedger({ transactions }: TransactionsLedgerProps) {
  // Filter into deposits and withdrawals
  const deposits = transactions.filter((t) => t.type === 'deposit');
  const withdrawals = transactions.filter((t) => t.type === 'withdrawal');

  return (
    <section className="relative py-24 bg-[#08090C] border-b border-[#1E232D]" id="transactions-ledger">
      <div className="absolute left-[30%] top-1/4 w-80 h-80 bg-brand-gold-glow rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="font-display font-bold text-xs uppercase tracking-widest text-brand-gold px-3.5 py-1 bg-[#101217] border border-[#1E232D] rounded-full inline-block">
            Vault Ledger Ledger
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Real-Time Transaction Outflow
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto">
            Live blockchain indexer syncing international custody entries alongside outfall requests. Guaranteed verified entries.
          </p>
        </div>

        {/* 2-Column Split Ledger Monitor Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* DEPOSITS (Left Column) */}
          <div className="bg-[#101217] border border-[#1E232D] rounded-2xl p-5 shadow-xl space-y-4" id="ledger-deposits-column">
            
            <div className="flex justify-between items-center pb-3 border-b border-[#1E232D]">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">
                  <ArrowDownLeft className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-base text-white">Recent Deposits</h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10 animate-pulse">
                SYNCED LIVE
              </span>
            </div>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {deposits.map((tx) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, x: -15, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="flex justify-between items-center text-xs p-3 rounded-lg bg-[#08090C]/80 border border-[#1C212E] hover:border-brand-gold/15 transition-all"
                  >
                    <div className="text-left space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-gray-400 font-semibold">{tx.account}</span>
                        <span className="text-[9px] bg-slate-900 border border-[#2D3442] text-gray-500 font-bold px-1.5 py-0.5 rounded">
                          {tx.asset}
                        </span>
                      </div>
                      <span className="text-[9px] text-gray-500 font-mono block">{tx.time}</span>
                    </div>

                    <div className="text-right space-y-0.5">
                      <span className="font-mono font-bold text-emerald-400 text-sm block">
                        +${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                      <span className="text-[8px] text-gray-500 uppercase tracking-widest font-mono flex items-center justify-end gap-1.5">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" /> SECURED
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>

          {/* WITHDRAWALS (Right Column) */}
          <div className="bg-[#101217] border border-[#1E232D] rounded-2xl p-5 shadow-xl space-y-4" id="ledger-withdrawals-column">
            
            <div className="flex justify-between items-center pb-3 border-b border-[#1E232D]">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">
                  <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="font-display font-bold text-base text-white">Recent Withdrawals</h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10 animate-pulse">
                OUTFLOW SWIFT
              </span>
            </div>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {withdrawals.map((tx) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, x: 15, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="flex justify-between items-center text-xs p-3 rounded-lg bg-[#08090C]/80 border border-[#1C212E] hover:border-brand-gold/15 transition-all"
                  >
                    <div className="text-left space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-gray-400 font-semibold">{tx.account}</span>
                        <span className="text-[9px] bg-slate-900 border border-[#2D3442] text-gray-500 font-bold px-1.5 py-0.5 rounded">
                          {tx.asset}
                        </span>
                      </div>
                      <span className="text-[9px] text-gray-500 font-mono block">{tx.time}</span>
                    </div>

                    <div className="text-right space-y-0.5">
                      <span className="font-mono font-bold text-emerald-400 text-sm block">
                        -${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                      <span className="text-[8px] text-gray-500 uppercase tracking-widest font-mono flex items-center justify-end gap-1.5">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" /> COMPLETED
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
