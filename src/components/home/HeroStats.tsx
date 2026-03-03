import React from 'react';
import { motion } from 'framer-motion';

interface HeroStatsProps {
    stats: {
        label: string;
        value: string;
        sublabel: string;
    }[];
}

export const HeroStats = ({ stats }: HeroStatsProps) => {
    return (
        <div className="flex flex-wrap gap-8 md:gap-16 mt-12">
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    className="flex flex-col"
                >
                    <span className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-1">
                        {stat.value}
                    </span>
                    <span className="text-[10px] md:text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-widest leading-tight">
                        {stat.label}<br />{stat.sublabel}
                    </span>
                </motion.div>
            ))}
        </div>
    );
};
