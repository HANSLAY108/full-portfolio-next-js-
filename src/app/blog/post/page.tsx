'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { fetchAPI } from '@/lib/api';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';
import { Suspense } from 'react';

function BlogPostContent() {
    const searchParams = useSearchParams();
    const slug = searchParams?.get('slug') ?? '';
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!slug) { setLoading(false); setNotFound(true); return; }
        fetchAPI(`/blog/single.php?slug=${slug}`)
            .then(setPost)
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) return null;

    if (notFound || !post) {
        return (
            <main className="flex flex-col items-center justify-center flex-1 pt-36">
                <h1 className="text-4xl font-black text-[var(--foreground)]">Post not found</h1>
                <Link href="/blog" className="mt-6 text-purple-400 font-bold hover:underline">← Back to Blog</Link>
            </main>
        );
    }

    return (
        <article className="container mx-auto px-6 max-w-3xl pt-36 pb-32 relative z-10">
            {/* Back */}
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
                <Link href="/blog" className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-purple-400 text-sm font-bold mb-12 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Articles
                </Link>
            </motion.div>

            {/* Meta */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
                <div className="flex items-center gap-2 text-[var(--foreground-muted)] text-[11px] font-bold uppercase tracking-widest mb-4">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6 text-[var(--foreground)]">{post.title}</h1>
                {post.excerpt && (
                    <p className="text-lg text-[var(--foreground-muted)] leading-relaxed border-l-2 border-purple-500 pl-4">
                        {post.excerpt}
                    </p>
                )}
            </motion.div>

            {/* Featured image */}
            {post.featured_image && (
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="mb-12 rounded-3xl overflow-hidden border border-white/10">
                    <img src={post.featured_image} alt={post.title} className="w-full h-80 object-cover" />
                </motion.div>
            )}

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="prose-custom"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-[var(--nav-border)] flex items-center justify-between">
                <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-purple-400 hover:gap-4 transition-all">
                    <ArrowLeft className="w-4 h-4" /> All Articles
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--foreground-muted)] hover:text-purple-400 transition-colors">
                    Get in Touch <ExternalLink className="w-3 h-3" />
                </Link>
            </div>
        </article>
    );
}

export default function BlogPostPage() {
    return (
        <div className="min-h-screen text-[var(--foreground)] relative overflow-hidden flex flex-col transition-colors duration-500">
            <Navbar />
            <div className="fixed top-[-20%] left-[-10%] w-[70%] h-[70%] bg-purple-600/[var(--blob-opacity)] blur-[180px] rounded-full pointer-events-none animate-slow-spin opacity-30" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-600/[var(--blob-opacity)] blur-[180px] rounded-full pointer-events-none animate-slow-spin-reverse opacity-30" />
            <Suspense fallback={null}>
                <BlogPostContent />
            </Suspense>
        </div>
    );
}
