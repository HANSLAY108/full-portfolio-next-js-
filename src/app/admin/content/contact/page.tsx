'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, Mail, Phone, Globe, Plus, Trash2 } from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';
import { GlassCard } from '@/components/ui/GlassCard';
import { FuturisticButton } from '@/components/ui/FuturisticButton';
import { fetchAPI } from '@/lib/api';

export default function ContactContentAdmin() {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        socialLinks: {} as Record<string, string>
    });
    const [newSocial, setNewSocial] = useState({ name: '', url: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchAPI('/content/fetch.php?type=contact');
                if (data) {
                    setFormData({
                        email: data.email || '',
                        phone: data.phone || '',
                        socialLinks: data.socialLinks || {}
                    });
                }
            } catch (error) {
                console.error("Failed to load contact info", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const addSocial = () => {
        if (!newSocial.name || !newSocial.url) return;
        setFormData({
            ...formData,
            socialLinks: { ...formData.socialLinks, [newSocial.name]: newSocial.url }
        });
        setNewSocial({ name: '', url: '' });
    };

    const removeSocial = (name: string) => {
        const updated = { ...formData.socialLinks };
        delete updated[name];
        setFormData({ ...formData, socialLinks: updated });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await fetchAPI('/content/update.php?type=contact', {
                method: 'POST',
                body: JSON.stringify(formData),
            });
            alert('Contact info updated successfully');
        } catch (error) {
            alert('Failed to update info');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="flex bg-[#050505] min-h-screen text-white">
            <Sidebar />

            <main className="flex-1 p-8 md:p-12 overflow-y-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-black tracking-tight mb-2">Contact Info</h1>
                    <p className="text-gray-500 font-medium">Manage your professional contact channels and social footprint.</p>
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
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4 flex items-center gap-2">
                                                <Mail className="w-3 h-3" /> Professional Email
                                            </label>
                                            <input
                                                type="email"
                                                className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all font-bold"
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4 flex items-center gap-2">
                                                <Phone className="w-3 h-3" /> Contact Phone
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all font-bold"
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-white/5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4 mb-6 block">Social Mapping</label>

                                        <div className="space-y-4 mb-8">
                                            {Object.entries(formData.socialLinks).map(([name, url]: [string, any]) => (
                                                <div key={name} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                                                    <span className="font-bold min-w-[100px] text-purple-400">{name}</span>
                                                    <span className="flex-1 text-gray-500 truncate">{url as string}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSocial(name)}
                                                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex flex-col md:flex-row gap-4 items-end bg-white/5 p-6 rounded-3xl border border-white/5">
                                            <div className="flex-1 space-y-2">
                                                <label className="text-[9px] uppercase tracking-widest text-gray-600 ml-2">Platform Name</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-black/40 border border-white/5 rounded-xl p-3 focus:outline-none"
                                                    placeholder="e.g. LinkedIn"
                                                    value={newSocial.name}
                                                    onChange={e => setNewSocial({ ...newSocial, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="flex-[2] space-y-2">
                                                <label className="text-[9px] uppercase tracking-widest text-gray-600 ml-2">Profile URL</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-black/40 border border-white/5 rounded-xl p-3 focus:outline-none"
                                                    placeholder="https://..."
                                                    value={newSocial.url}
                                                    onChange={e => setNewSocial({ ...newSocial, url: e.target.value })}
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={addSocial}
                                                className="w-full md:w-auto h-12 px-6 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all"
                                            >
                                                <Plus className="w-4 h-4" /> Add Link
                                            </button>
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-white/5 flex justify-end">
                                        <FuturisticButton
                                            type="submit"
                                            className="h-16 px-12"
                                            disabled={saving}
                                            icon={saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                        >
                                            {saving ? 'Transmitting...' : 'Commit Contact Array'}
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
