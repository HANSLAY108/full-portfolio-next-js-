'use client';

import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';
import { Sparkles, User, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export const AgentCard = () => (
    <motion.div
        className="animate-float"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
    >
        <GlassCard className="p-4 flex flex-col items-center gap-3 w-32 md:w-40 border-[var(--nav-border)] shadow-2xl backdrop-blur-3xl">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-white/10 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 animate-slow-spin" />
                <Sparkles className="w-6 h-6 text-purple-400 relative z-10" />
            </div>
            <div className="text-center">
                <p className="text-[8px] font-black uppercase tracking-widest text-[var(--foreground-muted)] mb-1">AI-Agent For Help</p>
                <div className="flex items-center justify-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-bold text-[var(--foreground)] tracking-tight">Active</span>
                </div>
            </div>
        </GlassCard>
    </motion.div>
);

export const UserProfileCard = ({ name, role }: { name: string; role: string }) => (
    <motion.div
        className="animate-float-delayed"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
    >
        <div className="flex items-center gap-3 bg-[var(--search-bg)] backdrop-blur-2xl border border-[var(--nav-border)] py-2.5 px-4 rounded-full shadow-2xl shadow-purple-500/10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center border border-white/30 overflow-hidden">
                <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black tracking-tight text-[var(--foreground)] whitespace-nowrap">@{name.toLowerCase().replace(' ', '_')}</span>
                    <ShieldCheck className="w-3 h-3 text-blue-400" />
                </div>
                <p className="text-[8px] font-bold text-[var(--foreground-muted)] uppercase tracking-widest">{role}</p>
            </div>
        </div>
    </motion.div>
);
