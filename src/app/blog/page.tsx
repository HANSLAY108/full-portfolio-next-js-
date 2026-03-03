'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { fetchAPI } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Search, ChevronLeft, ChevronRight } from 'lucide-react';

export default function BlogPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const load = async (p: number, q: string) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ page: String(p) });
            if (q) params.append('search', q);
            const data = await fetchAPI(`/blog/index.php?${params}`);
            setPosts(data.posts ?? []);
            setTotalPages(data.totalPages ?? 1);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(page, search); }, [page]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        load(1, search);
    };

    return (
        <div className="min-h-screen text-[var(--foreground)] relative overflow-hidden flex flex-col pt-32 transition-colors duration-500">
            <Navbar />

            <div className="fixed top-[-20%] left-[-10%] w-[70%] h-[70%] bg-purple-600/[var(--blob-opacity)] blur-[180px] rounded-full pointer-events-none animate-slow-spin opacity-50" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-600/[var(--blob-opacity)] blur-[180px] rounded-full pointer-events-none animate-slow-spin-reverse opacity-50" />

            <main className="container mx-auto px-6 pb-32 flex-1 relative z-10">
                <SectionHeader
                    badge="Blog"
                    title="Insights & Articles"
                    subtitle="Thoughts on design, development, and the intersection of creativity and technology."
                />

                {/* Search */}
                <form onSubmit={handleSearch} className="mb-14 max-w-md">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-muted)] group-focus-within:text-purple-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-[var(--search-bg)] border border-[var(--nav-border)] rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all placeholder:text-[var(--foreground-muted)]"
                        />
                    </div>
                </form>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-80 rounded-3xl bg-white/5 animate-pulse" />
                        ))}
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-32 text-[var(--foreground-muted)]">
                        <p className="text-lg font-medium">No articles found.</p>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={page + search}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {posts.map((post: any, i: number) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.06 }}
                                >
                                    <GlassCard className="p-0 group h-full flex flex-col overflow-hidden">
                                        {/* Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            {post.featured_image ? (
                                                <img
                                                    src={post.featured_image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-purple-900/30 to-blue-900/20 flex items-center justify-center">
                                                    <span className="text-4xl font-black text-purple-500/30">
                                                        {post.title.charAt(0)}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>

                                        {/* Body */}
                                        <div className="p-6 flex flex-col flex-1">
                                            <div className="flex items-center gap-2 text-[var(--foreground-muted)] text-[10px] font-bold uppercase tracking-widest mb-3">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                            </div>
                                            <h3 className="text-xl font-black tracking-tight mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-[var(--foreground-muted)] text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                            <Link
                                                href={`/blog/post?slug=${post.slug}`}
                                                prefetch={false}
                                                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-purple-400 hover:gap-4 transition-all"
                                            >
                                                Read More <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-16">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="p-3 rounded-2xl bg-white/5 border border-white/10 disabled:opacity-30 hover:bg-white/10 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="text-sm font-medium text-[var(--foreground-muted)]">
                            {page} / {totalPages}
                        </span>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="p-3 rounded-2xl bg-white/5 border border-white/10 disabled:opacity-30 hover:bg-white/10 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
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
