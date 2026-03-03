import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FloatingTagProps {
    icon: LucideIcon;
    text: string;
    className?: string;
    delay?: number;
    color?: string;
}

export const FloatingTag = ({ icon: Icon, text, className = "", delay = 0, color = "#10b981" }: FloatingTagProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                delay,
                duration: 0.5,
                type: "spring",
                stiffness: 100
            }}
            className={`absolute flex items-center gap-3 bg-[var(--tag-bg)] border border-[var(--nav-border)] py-2.5 px-5 rounded-full shadow-xl shadow-black/[0.03] backdrop-blur-md z-30 group hover:scale-105 transition-transform cursor-default ${className}`}
        >
            <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg"
                style={{ backgroundColor: color }}
            >
                <Icon size={16} strokeWidth={2.5} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest text-[var(--foreground)] pr-2">
                {text}
            </span>

            {/* Pulsing glow effect */}
            <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 transition-opacity blur-md"
                style={{ backgroundColor: color }}
            />
        </motion.div>
    );
};
