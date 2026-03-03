'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    className?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

export function FuturisticButton({
    children,
    href,
    onClick,
    variant = 'primary',
    className,
    icon,
    disabled,
    type = 'button'
}: ButtonProps) {
    const content = (
        <div className="flex items-center justify-center gap-2">
            {children}
            {icon && <span className="group-hover:translate-x-1 transition-transform duration-300">{icon}</span>}
        </div>
    );

    const baseStyles = "relative px-8 py-4 rounded-2xl font-bold tracking-tight text-sm uppercase transition-all duration-300 group overflow-hidden flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40",
        secondary: "bg-[var(--search-bg)] text-[var(--foreground)] backdrop-blur-md border border-[var(--nav-border)] hover:bg-[var(--card-hover-bg)] hover:border-[var(--card-hover-border)]",
        outline: "border border-[var(--nav-border)] text-[var(--foreground)] hover:bg-[var(--search-bg)] hover:border-[var(--card-hover-border)]",
        ghost: "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--search-bg)]"
    };

    const Component = href ? Link : 'button' as any;

    return (
        <motion.div
            whileHover={!disabled ? { scale: 1.02 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            className="relative"
        >
            {/* Background glow for primary */}
            {variant === 'primary' && !disabled && (
                <div className="absolute inset-0 bg-purple-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            )}

            <Component
                href={href as string}
                onClick={onClick}
                prefetch={href ? false : undefined}
                className={cn(baseStyles, variants[variant], className)}
                disabled={disabled}
                type={href ? undefined : type}
            >
                {/* Animated border effect for primary */}
                {variant === 'primary' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                )}

                <span className="relative z-10">{content}</span>
            </Component>
        </motion.div>
    );
}
