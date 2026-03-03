'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { FuturisticButton } from '@/components/ui/FuturisticButton';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, ArrowRight, ExternalLink, Code, Star } from 'lucide-react';
import { fetchAPI } from '@/lib/api';
import { cn } from '@/lib/utils';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await fetchAPI('/projects');
                // Assuming data is an array of project objects
                setProjects(data.filter((p: any) => p.status === 'PUBLISHED'));
            } catch (error) {
                console.error('Failed to load projects:', error);
            } finally {
                setLoading(false);
            }
        };
        loadProjects();
    }, []);

    const filters = ['All', 'Web', 'UI/UX', 'Mobile', '3D'];

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase());
        const tags = project.tags ? project.tags.split(',').map((tag: string) => tag.trim()) : [];
        const matchesFilter = activeFilter === 'All' || tags.includes(activeFilter);
        return matchesSearch && matchesFilter;
    });

    if (loading) return null;

    return (
        <div className="min-h-screen text-[var(--foreground)] relative pearlescent overflow-hidden flex flex-col pt-32 transition-colors duration-500">
            <Navbar />

            {/* Background Glows synced with Home */}
            <div className="fixed top-[-20%] left-[-10%] w-[70%] h-[70%] bg-purple-600/[var(--blob-opacity)] blur-[180px] rounded-full pointer-events-none animate-slow-spin opacity-50" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-600/[var(--blob-opacity)] blur-[180px] rounded-full pointer-events-none animate-slow-spin-reverse opacity-50" />
            <div className="fixed top-[20%] right-[10%] w-[40%] h-[40%] bg-emerald-500/[var(--blob-opacity)] blur-[150px] rounded-full pointer-events-none animate-pulse opacity-40" />

            <main className="container mx-auto px-6 pb-32 flex-1 relative z-10">
                <SectionHeader
                    align="left"
                    badge="Archive"
                    title="All Projects"
                    subtitle="Explore the complete collection of my digital works, experimental designs, and full-scale applications."
                />

                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row gap-6 mb-16 items-center justify-between">
                    <div className="w-full md:max-w-md relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-muted)] group-focus-within:text-purple-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by tech or title..."
                            className="w-full bg-[var(--search-bg)] border border-[var(--nav-border)] rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all placeholder:text-[var(--foreground-muted)]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-3 bg-[var(--search-bg)] border border-[var(--nav-border)] p-1 rounded-full overflow-x-auto no-scrollbar max-w-full">
                        {filters.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setActiveFilter(tag)}
                                className={cn(
                                    "px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap",
                                    activeFilter === tag ? "bg-[var(--card-hover-bg)] text-[var(--foreground)] shadow-lg border border-[var(--nav-border)]" : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                                )}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <AnimatePresence>
                        {filteredProjects.map((project: any, index: number) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                            >
                                <GlassCard className="p-0 group h-full flex flex-col" delay={index * 0.05}>
                                    <div className="relative h-64 w-full overflow-hidden">
                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                                        {project.featured == 1 && (
                                            <div className="absolute top-6 right-6 bg-gradient-to-r from-orange-500 to-amber-500 p-2 rounded-xl shadow-lg border border-white/10">
                                                <Star className="w-4 h-4 text-white fill-white" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.split(',').map((tag: string) => (
                                                <span key={tag} className="text-[10px] uppercase tracking-widest text-purple-400 font-bold px-2 py-1 bg-purple-500/10 border border-purple-500/10 rounded-full">
                                                    {tag.trim()}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className="text-2xl font-black tracking-tight mb-4 group-hover:text-purple-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-[var(--foreground-muted)] text-sm leading-relaxed mb-8 flex-1 line-clamp-3">
                                            {project.description}
                                        </p>
                                        <div className="flex gap-4">
                                            <Link
                                                href={`/projects/detail?id=${project.id}`}
                                                prefetch={false}
                                                className="px-6 py-3 glass hover:bg-[var(--card-hover-bg)] rounded-xl text-xs font-black uppercase tracking-widest transition-all text-[var(--foreground)]"
                                            >
                                                View Intel
                                            </Link>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
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
