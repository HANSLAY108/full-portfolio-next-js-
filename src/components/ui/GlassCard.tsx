'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    hover?: boolean;
}

export function GlassCard({ children, className, delay = 0, hover = true }: GlassCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={cn(
                "glass rounded-[2rem] overflow-hidden relative group",
                hover && "hover:border-[var(--card-hover-border)] hover:bg-[var(--card-hover-bg)] transition-all duration-500",
                className
            )}
        >
            {/* Internal Glow Effect */}
            <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.03),transparent_70%)] pointer-events-none group-hover:bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08),transparent_70%)] transition-colors duration-700" />

            {/* Top light beam */}
            <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[var(--foreground)] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-700" />

            <div className="relative z-10 px-8 py-10 h-full">
                {children}
            </div>
        </motion.div>
    );
}
