'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, Sparkles, Layout } from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';
import { GlassCard } from '@/components/ui/GlassCard';
import { FuturisticButton } from '@/components/ui/FuturisticButton';
import { fetchAPI } from '@/lib/api';
import ImageUpload from '@/components/admin/ImageUpload';

export default function HomeContentAdmin() {
    const [formData, setFormData] = useState({
        heroTitle: '',
        heroSubtitle: '',
        heroImage: '',
        ctaPrimary: '',
        cta_secondary: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchAPI('/content?type=home');
                if (data) {
                    setFormData({
                        heroTitle: data.heroTitle || '',
                        heroSubtitle: data.heroSubtitle || '',
                        heroImage: data.heroImage || '',
                        ctaPrimary: data.ctaPrimary || '',
                        cta_secondary: data.ctaSecondary || ''
                    });
                }
            } catch (error) {
                console.error("Failed to load home content", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            // Map camelCase to what PHP expects if needed, or just send it
            const payload = {
                heroTitle: formData.heroTitle,
                heroSubtitle: formData.heroSubtitle,
                heroImage: formData.heroImage,
                ctaPrimary: formData.ctaPrimary,
                ctaSecondary: formData.cta_secondary
            };

            await fetchAPI('/cms/content?type=home', {
                method: 'PUT',
                body: JSON.stringify(payload),
            });
            alert('Home content updated successfully');
        } catch (error) {
            alert('Failed to update content');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="flex bg-[#050505] min-h-screen text-white">
            <Sidebar />

            <main className="flex-1 p-8 md:p-12 overflow-y-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-black tracking-tight mb-2">Home Content</h1>
                    <p className="text-gray-500 font-medium">Refine the entrance experience of your portfolio.</p>
                </header>

                {loading ? (
                    <div className="flex items-center justify-center py-32">
                        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-12">
                            <GlassCard className="p-10">
                                <form onSubmit={handleSubmit} className="space-y-10">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                        <div className="space-y-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Hero Title</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-white/5 border border-white/5 rounded-2xl p-6 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all text-2xl font-black tracking-tight"
                                                    value={formData.heroTitle}
                                                    onChange={e => setFormData({ ...formData, heroTitle: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Hero Subtitle</label>
                                                <textarea
                                                    rows={4}
                                                    className="w-full bg-white/5 border border-white/5 rounded-2xl p-6 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all font-medium resize-none text-lg text-gray-400"
                                                    value={formData.heroSubtitle}
                                                    onChange={e => setFormData({ ...formData, heroSubtitle: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Hero Image</label>
                                                <ImageUpload
                                                    value={formData.heroImage}
                                                    onChange={(url) => setFormData({ ...formData, heroImage: url })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Primary CTA</label>
                                            <input
                                                type="text"
                                                className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all font-bold"
                                                value={formData.ctaPrimary}
                                                onChange={e => setFormData({ ...formData, ctaPrimary: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Secondary CTA</label>
                                            <input
                                                type="text"
                                                className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all font-bold"
                                                value={formData.cta_secondary}
                                                onChange={e => setFormData({ ...formData, cta_secondary: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-white/5 flex justify-end">
                                        <FuturisticButton
                                            type="submit"
                                            className="h-16 px-12"
                                            disabled={saving}
                                            icon={saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                        >
                                            {saving ? 'Transmitting data...' : 'Authorize & Save'}
                                        </FuturisticButton>
                                    </div>
                                </form>
                            </GlassCard>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
