'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    badge?: string;
    align?: 'left' | 'center';
}

export function SectionHeader({ title, subtitle, badge, align = 'center' }: SectionHeaderProps) {
    return (
        <div className={`mb-16 flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
            {badge && (
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-400 mb-4 px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20"
                >
                    {badge}
                </motion.span>
            )}
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="text-4xl md:text-6xl lg:text-8xl font-black text-[var(--foreground)] tracking-tighter mb-8 drop-shadow-sm leading-[0.9]"
            >
                {title}
            </motion.h2>
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-[var(--foreground)] opacity-90 text-lg md:text-2xl max-w-3xl font-bold leading-relaxed tracking-tight"
                >
                    {subtitle}
                </motion.p>
            )}

            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 1 }}
                className={`h-[2px] w-32 bg-gradient-to-r from-purple-600 to-blue-600 mt-10 ${align === 'center' ? '' : 'origin-left'}`}
            />
        </div>
    );
}
