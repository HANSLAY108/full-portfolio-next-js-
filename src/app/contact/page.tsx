'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { FuturisticButton } from '@/components/ui/FuturisticButton';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, MessageSquare } from 'lucide-react';
import { fetchAPI } from '@/lib/api';
import Link from 'next/link';

export default function ContactPage() {
    const [content, setContent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchAPI('/content/fetch.php?type=contact');
                setContent(data);
            } catch (error) {
                console.error('Failed to load contact info:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) return null;

    const socialLinks = content?.socialLinks || {};

    return (
        <div className="min-h-screen text-[var(--foreground)] relative pearlescent overflow-hidden flex flex-col pt-32 transition-colors duration-500">
            <Navbar />

            {/* Background Glows synced with Home */}
            <div className="fixed top-[-20%] left-[-10%] w-[70%] h-[70%] bg-purple-600/[var(--blob-opacity)] blur-[180px] rounded-full pointer-events-none animate-slow-spin opacity-50" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-600/[var(--blob-opacity)] blur-[180px] rounded-full pointer-events-none animate-slow-spin-reverse opacity-50" />
            <div className="fixed top-[20%] right-[10%] w-[40%] h-[40%] bg-emerald-500/[var(--blob-opacity)] blur-[150px] rounded-full pointer-events-none animate-pulse opacity-40" />

            <main className="container mx-auto px-6 pb-32 flex-1 relative z-10">
                <SectionHeader
                    badge="Connect"
                    title="Let's Build the Future"
                    subtitle="Have a project in mind? Let's discuss how we can bring your visionary ideas to life with experimental design and robust engineering."
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-6">
                            {[
                                { icon: <Mail className="text-purple-400" />, title: "Email Me", value: content?.email || 'hello@portfolio.com', sub: "Available 24/7" },
                                { icon: <Phone className="text-blue-400" />, title: "Call Me", value: content?.phone || '+1 (555) 000-0000', sub: "Mon - Fri, 9am - 5pm" },
                                { icon: <MapPin className="text-emerald-400" />, title: "Location", value: "Worldwide / Remote", sub: "Working from UTC+8" },
                            ].map((item, i) => (
                                <GlassCard key={i} className="p-6 flex items-start gap-6 border-[var(--nav-border)]" delay={i * 0.1}>
                                    <div className="w-14 h-14 bg-[var(--search-bg)] rounded-2xl flex items-center justify-center border border-[var(--nav-border)] shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black uppercase tracking-widest text-[var(--foreground-muted)] mb-1">{item.title}</h4>
                                        <p className="text-2xl font-black tracking-tight">{item.value}</p>
                                        <p className="text-xs text-[var(--foreground-muted)] mt-1">{item.sub}</p>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>

                        <div className="pt-8 border-t border-[var(--nav-border)]">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--foreground-muted)] mb-8">Follow My Journey</h3>
                            <div className="flex gap-4">
                                {Object.entries(socialLinks).map(([name, url]: [string, any]) => (
                                    <a
                                        key={name}
                                        href={url}
                                        className="w-12 h-12 bg-[var(--search-bg)] rounded-xl border border-[var(--nav-border)] flex items-center justify-center hover:bg-purple-600/20 hover:border-purple-500/30 transition-all group"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {name === 'Github' ? <Github className="w-5 h-5 text-[var(--foreground-muted)] group-hover:text-[var(--foreground)] transition-colors" /> :
                                            name === 'LinkedIn' ? <Linkedin className="w-5 h-5 text-[var(--foreground-muted)] group-hover:text-[var(--foreground)] transition-colors" /> :
                                                name === 'Twitter' ? <Twitter className="w-5 h-5 text-[var(--foreground-muted)] group-hover:text-[var(--foreground)] transition-colors" /> :
                                                    <span className="text-[10px] font-black uppercase tracking-tighter text-[var(--foreground-muted)] group-hover:text-[var(--foreground)] transition-colors">{name.substring(0, 2)}</span>}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <GlassCard className="p-10">
                            <form className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--foreground-muted)] ml-4">Full Name</label>
                                        <input type="text" className="w-full bg-[var(--search-bg)] border border-[var(--nav-border)] rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all font-medium text-[var(--foreground)]" placeholder="Toh Hans" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--foreground-muted)] ml-4">Email Address</label>
                                        <input type="email" className="w-full bg-[var(--search-bg)] border border-[var(--nav-border)] rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all font-medium text-[var(--foreground)]" placeholder="hello@example.com" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--foreground-muted)] ml-4">Subject</label>
                                    <input type="text" className="w-full bg-[var(--search-bg)] border border-[var(--nav-border)] rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all font-medium text-[var(--foreground)]" placeholder="How can I help you?" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--foreground-muted)] ml-4">Your Message</label>
                                    <textarea rows={6} className="w-full bg-[var(--search-bg)] border border-[var(--nav-border)] rounded-2xl p-6 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all font-medium resize-none text-[var(--foreground)]" placeholder="Tell me about your project..."></textarea>
                                </div>
                                <FuturisticButton className="w-full h-16" icon={<Send className="w-4 h-4" />}>
                                    Transmit Message
                                </FuturisticButton>
                            </form>
                        </GlassCard>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-12 border-t border-[var(--nav-border)] bg-[var(--footer-bg)] backdrop-blur-md">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                    <p className="text-[var(--foreground-muted)] text-xs font-medium uppercase tracking-widest">
                        © {new Date().getFullYear()} TOH HANSLAY
                    </p>
                    <div className="flex items-center gap-8">
                        {['Twitter', 'LinkedIn', 'Github'].map((social) => (
                            <Link key={social} href="#" prefetch={false} className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors text-[9px] font-black uppercase tracking-widest">
                                {social}
                            </Link>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}
