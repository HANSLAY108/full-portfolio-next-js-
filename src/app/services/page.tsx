'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { fetchAPI } from '@/lib/api';
import { motion } from 'framer-motion';
import {
    Monitor, Server, Globe, Zap, Cpu, Figma,
    Code, Layout, Database, Shield, Rocket, Bot,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const iconMap: Record<string, any> = {
    Monitor, Server, Globe, Zap, Cpu, Figma,
    Code, Layout, Database, Shield, Rocket, Bot,
};

export default function ServicesPage() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAPI('/services/index.php')
            .then(setServices)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return null;

    return (
        <div className="min-h-screen text-[var(--foreground)] relative overflow-hidden flex flex-col pt-32 transition-colors duration-500">
            <Navbar />

            {/* Background blobs — matching the rest of the site */}
            <div className="fixed top-[-20%] left-[-10%] w-[70%] h-[70%] bg-purple-600/[var(--blob-opacity)] blur-[180px] rounded-full pointer-events-none animate-slow-spin opacity-50" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-600/[var(--blob-opacity)] blur-[180px] rounded-full pointer-events-none animate-slow-spin-reverse opacity-50" />
            <div className="fixed top-[20%] right-[10%] w-[40%] h-[40%] bg-emerald-500/[var(--blob-opacity)] blur-[150px] rounded-full pointer-events-none animate-pulse opacity-40" />

            <main className="container mx-auto px-6 pb-32 flex-1 relative z-10">
                {/* Hero */}
                <SectionHeader
                    badge="What We Offer"
                    title="Services"
                    subtitle="End-to-end digital solutions crafted with precision — from concept to deployment. Every service is built around your unique goals."
                />

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
                    {services.map((service: any, index: number) => {
                        const Icon = iconMap[service.icon] ?? Zap;
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.5, delay: index * 0.07 }}
                            >
                                <GlassCard
                                    delay={index * 0.05}
                                    className="h-full group relative overflow-hidden"
                                >
                                    {/* Glow on hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                        style={{ background: 'radial-gradient(circle at 50% 0%,rgba(168,85,247,0.12) 0%,transparent 70%)' }} />

                                    {/* Icon */}
                                    <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-8 border border-purple-500/20 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-500">
                                        <Icon className="text-purple-400 w-7 h-7" />
                                    </div>

                                    <h3 className="text-xl font-black tracking-tight mb-3 group-hover:text-purple-300 transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-[var(--foreground-muted)] text-sm leading-relaxed flex-1 mb-8">
                                        {service.description}
                                    </p>

                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-purple-400 hover:gap-4 transition-all"
                                    >
                                        Get in touch <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </GlassCard>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-24 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-12 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                        Ready to start your project?
                    </h2>
                    <p className="text-[var(--foreground-muted)] mb-8 max-w-xl mx-auto">
                        Let&apos;s talk about what you&apos;re building. I&apos;m available for freelance and full-time opportunities.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-sm hover:opacity-90 transition-opacity"
                    >
                        Start a Conversation <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </main>

            <footer className="py-12 border-t border-[var(--nav-border)] bg-[var(--footer-bg)] backdrop-blur-md">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[var(--foreground-muted)] text-xs font-medium uppercase tracking-widest">
                        © {new Date().getFullYear()} TOH HANSLAY
                    </p>
                    <div className="flex items-center gap-8">
                        {['Twitter', 'LinkedIn', 'Github'].map((s) => (
                            <Link key={s} href="#" className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors text-[9px] font-black uppercase tracking-widest">{s}</Link>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}
