'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Check, Loader2, Image as ImageIcon } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { FuturisticButton } from '@/components/ui/FuturisticButton';
import { fetchAPI } from '@/lib/api';
import ImageUpload from './ImageUpload';

interface ProjectFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    project?: any;
}

export default function ProjectForm({ isOpen, onClose, onSuccess, project }: ProjectFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        tags: '',
        status: 'PUBLISHED',
        featured: false
    });

    useEffect(() => {
        if (project) {
            setFormData({
                title: project.title || '',
                description: project.description || '',
                imageUrl: project.image_url || '',
                tags: project.tags || '',
                status: project.status || 'PUBLISHED',
                featured: project.featured == 1
            });
        } else {
            setFormData({
                title: '',
                description: '',
                imageUrl: '',
                tags: '',
                status: 'PUBLISHED',
                featured: false
            });
        }
    }, [project, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const endpoint = project ? '/projects/update.php' : '/projects/create.php';
            const payload = project ? { ...formData, id: project.id } : formData;

            await fetchAPI(endpoint, {
                method: 'POST',
                body: JSON.stringify(payload),
            });

            onSuccess();
        } catch (error) {
            alert('Failed to save project');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-4xl"
            >
                <GlassCard className="p-10 relative overflow-hidden">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <h2 className="text-3xl font-black tracking-tight mb-8">
                        {project ? 'Refine Project' : 'Initialize Project'}
                    </h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Project Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all font-medium"
                                    placeholder="Enter project name..."
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Description</label>
                                <textarea
                                    rows={5}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all font-medium resize-none"
                                    placeholder="Briefly describe the mission..."
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Technologies (Comma separated)</label>
                                <input
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all font-medium"
                                    placeholder="React, PHP, AI..."
                                    value={formData.tags}
                                    onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <ImageUpload
                                value={formData.imageUrl}
                                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                            />

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Status</label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all font-medium appearance-none"
                                        value={formData.status}
                                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option value="DRAFT">DRAFT</option>
                                        <option value="PUBLISHED">PUBLISHED</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Priority</label>
                                    <div
                                        onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                                        className={`w-full flex items-center justify-between border rounded-2xl p-4 cursor-pointer transition-all ${formData.featured ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' : 'bg-white/5 border-white/10 text-gray-500'
                                            }`}
                                    >
                                        <span className="text-sm font-bold">Featured</span>
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${formData.featured ? 'bg-purple-500 border-purple-500' : 'border-gray-600'
                                            }`}>
                                            {formData.featured && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/5 flex gap-4">
                                <FuturisticButton
                                    type="submit"
                                    className="flex-1 h-16"
                                    disabled={loading}
                                    icon={loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                                >
                                    {loading ? 'Transmitting...' : 'Confirm Changes'}
                                </FuturisticButton>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-8 bg-white/5 hover:bg-white/10 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all border border-white/10"
                                >
                                    Abort
                                </button>
                            </div>
                        </div>
                    </form>
                </GlassCard>
            </motion.div>
        </div>
    );
}
