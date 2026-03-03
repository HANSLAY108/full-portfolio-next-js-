'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Loader2, FileText, Globe } from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';
import { GlassCard } from '@/components/ui/GlassCard';
import { FuturisticButton } from '@/components/ui/FuturisticButton';
import BlogForm from '@/components/admin/BlogForm';
import { fetchAPI } from '@/lib/api';

export default function BlogAdmin() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<any>(null);

    const load = async () => {
        setLoading(true);
        try {
            const data = await fetchAPI('/blog');
            setPosts(data.posts || []); // Adjust if /api/blog returns {posts, pagination}
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this post permanently?')) return;
        try {
            await fetchAPI(`/cms/blog?id=${id}`, { method: 'DELETE' });
            load();
        } catch {
            alert('Delete failed');
        }
    };

    const handleToggleStatus = async (post: any) => {
        const newStatus = post.status === 'published' ? 'draft' : 'published';
        try {
            await fetchAPI('/cms/blog', { method: 'PUT', body: JSON.stringify({ ...post, status: newStatus }) });
            load();
        } catch {
            alert('Status update failed');
        }
    };

    const filtered = posts.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex bg-[#050505] min-h-screen text-white">
            <Sidebar />

            <main className="flex-1 p-8 md:p-12 overflow-y-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight mb-2">Blog Manager</h1>
                        <p className="text-gray-500 font-medium">Create and manage your articles and insights.</p>
                    </div>
                    <FuturisticButton
                        onClick={() => { setEditingPost(null); setIsFormOpen(true); }}
                        icon={<Plus className="w-5 h-5" />}
                    >
                        New Post
                    </FuturisticButton>
                </header>

                {/* Search */}
                <div className="mb-10">
                    <div className="relative max-w-md group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search posts..."
                            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {[
                        { label: 'Total', value: posts.length, color: 'text-white' },
                        { label: 'Published', value: posts.filter(p => p.status === 'published').length, color: 'text-emerald-400' },
                        { label: 'Drafts', value: posts.filter(p => p.status === 'draft').length, color: 'text-orange-400' },
                    ].map(s => (
                        <div key={s.label} className="glass-card p-4">
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{s.label}</p>
                            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                        </div>
                    ))}
                </div>

                {/* Posts list */}
                {loading ? (
                    <div className="flex items-center justify-center py-32">
                        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-32 text-gray-600">
                        <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p className="font-medium">No posts yet. Create your first article!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <AnimatePresence>
                            {filtered.map((post, i) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ delay: i * 0.03 }}
                                >
                                    <GlassCard className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 group">
                                        {/* Icon */}
                                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                                            <FileText className="text-purple-400 w-5 h-5" />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                <h3 className="text-base font-bold truncate">{post.title}</h3>
                                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${post.status === 'published'
                                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                    : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                                                    }`}>{post.status}</span>
                                            </div>
                                            <p className="text-gray-500 text-xs font-mono">/blog/{post.slug}</p>
                                            <p className="text-gray-600 text-[10px] mt-0.5">
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2 shrink-0">
                                            <button
                                                onClick={() => handleToggleStatus(post)}
                                                className={`p-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-colors ${post.status === 'published'
                                                    ? 'bg-orange-500/10 text-orange-400 border-orange-500/20 hover:bg-orange-500/20'
                                                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                                                    }`}
                                                title={post.status === 'published' ? 'Unpublish' : 'Publish'}
                                            >
                                                <Globe className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => { setEditingPost(post); setIsFormOpen(true); }}
                                                className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/5"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors border border-red-500/20"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </main>

            <BlogForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                post={editingPost}
                onSuccess={() => { setIsFormOpen(false); load(); }}
            />
        </div>
    );
}
