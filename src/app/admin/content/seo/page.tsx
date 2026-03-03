'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, Globe, Search, Eye } from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';
import { GlassCard } from '@/components/ui/GlassCard';
import { FuturisticButton } from '@/components/ui/FuturisticButton';
import { fetchAPI } from '@/lib/api';

export default function SEOAdmin() {
    const [pages, setPages] = useState<any[]>([]);
    const [selectedPage, setSelectedPage] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadSEO = async () => {
            try {
                // In a real app, we might have multiple pages in the SEO table
                // For now, we fetch one for 'home' as a placeholder or list
                const homeSEO = await fetchAPI('/content?type=seo&page=home');
                setPages([homeSEO]);
                setSelectedPage({
                    ...homeSEO,
                    metaTitle: homeSEO.metaTitle || '',
                    metaDescription: homeSEO.metaDescription || ''
                });
            } catch (error) {
                console.error("Failed to load SEO data", error);
            } finally {
                setLoading(false);
            }
        };
        loadSEO();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await fetchAPI('/cms/content?type=seo', {
                method: 'PUT',
                body: JSON.stringify(selectedPage),
            });
            alert('SEO configuration updated');
        } catch (error) {
            alert('Failed to update SEO');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="flex bg-[#050505] min-h-screen text-white">
            <Sidebar />

            <main className="flex-1 p-8 md:p-12 overflow-y-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-black tracking-tight mb-2">SEO Protocol</h1>
                    <p className="text-gray-500 font-medium">Fine-tune your digital footprint for global search engines.</p>
                </header>

                {loading ? (
                    <div className="flex items-center justify-center py-32">
                        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8">
                            <GlassCard className="p-10">
                                <form onSubmit={handleSubmit} className="space-y-10">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Target Page URI</label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 font-bold opacity-50"
                                            value={selectedPage?.page || 'home'}
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Meta Title</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white/5 border border-white/5 rounded-2xl p-6 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all text-xl font-bold tracking-tight"
                                            value={selectedPage?.metaTitle || ''}
                                            onChange={e => setSelectedPage({ ...selectedPage, metaTitle: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Meta Description</label>
                                        <textarea
                                            rows={6}
                                            className="w-full bg-white/5 border border-white/5 rounded-2xl p-6 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all font-medium resize-none text-gray-400"
                                            value={selectedPage?.metaDescription || ''}
                                            onChange={e => setSelectedPage({ ...selectedPage, metaDescription: e.target.value })}
                                        />
                                    </div>

                                    <div className="pt-8 border-t border-white/5 flex justify-end">
                                        <FuturisticButton
                                            type="submit"
                                            className="h-16 px-12"
                                            disabled={saving}
                                            icon={saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                        >
                                            {saving ? 'Transmitting...' : 'Authorize SEO Protocol'}
                                        </FuturisticButton>
                                    </div>
                                </form>
                            </GlassCard>
                        </div>

                        <div className="lg:col-span-4 space-y-8">
                            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5">
                                <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                    <Eye className="w-4 h-4 text-emerald-400" /> SERP Simulation
                                </h3>
                                <div className="space-y-4">
                                    <div className="text-blue-400 text-xl font-medium leading-tight truncate">
                                        {selectedPage?.metaTitle || 'Untitled Page'}
                                    </div>
                                    <div className="text-emerald-600 text-sm truncate">
                                        hansportfolio.com › {selectedPage?.page || 'home'}
                                    </div>
                                    <div className="text-gray-400 text-sm line-clamp-2">
                                        {selectedPage?.metaDescription || 'No description provided.'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
