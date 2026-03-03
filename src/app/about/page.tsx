'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';
import { Award, Code, Globe, Zap, Sparkles } from 'lucide-react';
import { fetchAPI } from '@/lib/api';
import Link from 'next/link';

export default function AboutPage() {
    const [content, setContent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchAPI('/content?type=about');
                setContent(data);
            } catch (error) {
                console.error('Failed to load about content:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) return null;

    return (
        <div className="min-h-screen text-[var(--foreground)] relative pearlescent overflow-hidden flex flex-col pt-32 transition-colors duration-500">
            <Navbar />

            {/* Background Glows synced with Home */}
            <div className="fixed top-[-20%] left-[-10%] w-[70%] h-[70%] bg-purple-600/[var(--blob-opacity)] blur-[180px] rounded-full pointer-events-none animate-slow-spin opacity-50" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-600/[var(--blob-opacity)] blur-[180px] rounded-full pointer-events-none animate-slow-spin-reverse opacity-50" />
            <div className="fixed top-[20%] right-[10%] w-[40%] h-[40%] bg-emerald-500/[var(--blob-opacity)] blur-[150px] rounded-full pointer-events-none animate-pulse opacity-40" />

            <main className="container mx-auto px-6 pb-32 flex-1 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    <div className="lg:col-span-4 space-y-12">
                        <SectionHeader
                            align="left"
                            badge="Profile"
                            title="The Mind Behind the Work"
                            subtitle="Passionate about bridging the gap between design and technology."
                        />

                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { label: "Experience", value: `${content?.yearsExperience || 8}+`, icon: <Zap className="w-4 h-4" /> },
                                { label: "Projects", value: `${content?.projectsCompleted || 120}+`, icon: <Code className="w-4 h-4" /> },
                                { label: "Clients", value: `${content?.clients || 85}+`, icon: <Globe className="w-4 h-4" /> },
                                { label: "Awards", value: "12", icon: <Award className="w-4 h-4" /> },
                            ].map((stat, i) => (
                                <GlassCard key={i} className="p-6 text-center" delay={i * 0.1}>
                                    <div className="inline-flex p-2 bg-purple-500/10 rounded-lg text-purple-400 mb-3">
                                        {stat.icon}
                                    </div>
                                    <div className="text-3xl font-black mb-1 tracking-tighter">{stat.value}</div>
                                    <div className="text-[10px] uppercase tracking-widest text-[var(--foreground-muted)] font-bold">{stat.label}</div>
                                </GlassCard>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-8 space-y-12">
                        <GlassCard className="lg:h-[600px] flex flex-col justify-center p-12">
                            <div className="max-w-none">
                                <p className="text-xl md:text-2xl text-[var(--foreground)] leading-relaxed font-bold mb-8">
                                    {content?.bio || "I am a multidisciplinary designer and developer..."}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-[var(--nav-border)]">
                                <div>
                                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-purple-400 mb-6 flex items-center gap-2">
                                        <Sparkles className="w-3 h-3" /> Core Philosophies
                                    </h4>
                                    <ul className="space-y-4 text-sm text-[var(--foreground-muted)] font-medium">
                                        <li>• Design is not just what it looks like, but how it works.</li>
                                        <li>• Simplicity is the ultimate sophistication.</li>
                                        <li>• Detail-oriented execution at every level.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-blue-400 mb-6 flex items-center gap-2">
                                        <Code className="w-3 h-3" /> Technical DNA
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['Typescript', 'Next.js', 'PHP', 'Tailwind', 'Framer Motion', 'PostgreSQL'].map((tech) => (
                                            <span key={tech} className="px-3 py-1 bg-[var(--tag-bg)] rounded-full text-[10px] uppercase tracking-widest font-bold border border-[var(--nav-border)]">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
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
