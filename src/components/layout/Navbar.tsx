'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Works', href: '/projects' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'About me', href: '/about' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 py-6",
                isScrolled ? "py-4 bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--nav-border)]" : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" prefetch={false} className="group flex items-center gap-2">
                    <span className="font-extrabold text-2xl tracking-tighter text-[#020617] group-hover:text-[#0ea5e9] transition-colors">
                        hans<span className="text-[#0ea5e9]">.</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            prefetch={false}
                            className="text-[13px] font-medium text-[#64748b] hover:text-[#020617] transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    {/* Contact Button */}
                    <Link
                        href="/contact"
                        prefetch={false}
                        className="hidden md:block px-6 py-3 rounded-xl bg-[#0ea5e9] text-[11px] font-bold text-white hover:bg-[#0284c7] transition-all shadow-lg shadow-blue-500/20"
                    >
                        LET&apos;S TALK
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-[var(--foreground)] bg-[var(--search-bg)] rounded-xl border border-[var(--nav-border)]"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[var(--background)] backdrop-blur-2xl border-b border-[var(--nav-border)] overflow-hidden"
                    >
                        <div className="flex flex-col p-8 space-y-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    prefetch={false}
                                    className={cn(
                                        "text-2xl font-black tracking-tight",
                                        pathname === link.href ? "text-purple-400" : "text-[var(--foreground)]"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/contact"
                                prefetch={false}
                                className="w-full py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-center font-black uppercase tracking-widest text-white"
                            >
                                Let&apos;s Talk
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
