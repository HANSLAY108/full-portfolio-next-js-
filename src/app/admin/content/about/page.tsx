'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, User, Globe, Zap, Code } from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';
import { GlassCard } from '@/components/ui/GlassCard';
import { FuturisticButton } from '@/components/ui/FuturisticButton';
import { fetchAPI } from '@/lib/api';

export default function AboutContentAdmin() {
    const [formData, setFormData] = useState({
        bio: '',
        yearsExperience: 8,
        projectsCompleted: 120,
        clients: 85
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchAPI('/content?type=about');
                if (data) {
                    setFormData({
                        bio: data.bio || '',
                        yearsExperience: data.yearsExperience || 8,
                        projectsCompleted: data.projectsCompleted || 120,
                        clients: data.clients || 85
                    });
                }
            } catch (error) {
                console.error("Failed to load about content", error);
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
            await fetchAPI('/cms/content?type=about', {
                method: 'PUT',
                body: JSON.stringify(formData),
            });
            alert('About content updated successfully');
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
                    <h1 className="text-4xl font-black tracking-tight mb-2">About Content</h1>
                    <p className="text-gray-500 font-medium">Narrate your journey and professional trajectory.</p>
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
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Biography</label>
                                        <textarea
                                            rows={8}
                                            className="w-full bg-white/5 border border-white/5 rounded-2xl p-6 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all font-medium resize-none text-lg text-gray-300 leading-relaxed"
                                            value={formData.bio}
                                            onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4 flex items-center gap-2">
                                                <Zap className="w-3 h-3" /> Years Experience
                                            </label>
                                            <input
                                                type="number"
                                                className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all font-bold"
                                                value={formData.yearsExperience}
                                                onChange={e => setFormData({ ...formData, yearsExperience: parseInt(e.target.value) })}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4 flex items-center gap-2">
                                                <Code className="w-3 h-3" /> Projects Completed
                                            </label>
                                            <input
                                                type="number"
                                                className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all font-bold"
                                                value={formData.projectsCompleted}
                                                onChange={e => setFormData({ ...formData, projectsCompleted: parseInt(e.target.value) })}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4 flex items-center gap-2">
                                                <Globe className="w-3 h-3" /> Satisfied Clients
                                            </label>
                                            <input
                                                type="number"
                                                className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all font-bold"
                                                value={formData.clients}
                                                onChange={e => setFormData({ ...formData, clients: parseInt(e.target.value) })}
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
                                            {saving ? 'Transmitting...' : 'Commit Biography'}
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
