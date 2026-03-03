'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Eye, EyeOff, Upload } from 'lucide-react';
import { fetchAPI } from '@/lib/api';

interface BlogFormProps {
    isOpen: boolean;
    onClose: () => void;
    post?: any;
    onSuccess: () => void;
}

const EMPTY: any = {
    title: '', excerpt: '', content: '', featured_image: '',
    status: 'draft', meta_title: '', meta_description: '',
};

export default function BlogForm({ isOpen, onClose, post, onSuccess }: BlogFormProps) {
    const [form, setForm] = useState(EMPTY);
    const [saving, setSaving] = useState(false);
    const [preview, setPreview] = useState(false);
    const [uploading, setUploading] = useState(false);
    const isEditing = !!post;

    useEffect(() => {
        setForm(post ? { ...post } : EMPTY);
        setPreview(false);
    }, [post, isOpen]);

    const set = (field: string, value: string) => setForm((f: any) => ({ ...f, [field]: value }));

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('image', file);
            const res = await fetch('/hans_portfolio/api/upload.php', {
                method: 'POST',
                headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` },
                body: formData,
            });
            const data = await res.json();
            if (data.url) set('featured_image', data.url);
        } catch {
            alert('Image upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title.trim()) return;
        setSaving(true);
        try {
            if (isEditing) {
                await fetchAPI('/blog/update.php', { method: 'POST', body: JSON.stringify({ ...form, id: post.id }) });
            } else {
                await fetchAPI('/blog/create.php', { method: 'POST', body: JSON.stringify(form) });
            }
            onSuccess();
        } catch (err: any) {
            alert(err.message || 'Save failed');
        } finally {
            setSaving(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 20 }}
                        className="bg-[#0c0c0e] border border-white/10 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-white/5 bg-[#0c0c0e]">
                            <h2 className="text-xl font-black tracking-tight">
                                {isEditing ? 'Edit Post' : 'New Blog Post'}
                            </h2>
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setPreview(v => !v)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-sm font-bold hover:bg-white/10 transition-colors"
                                >
                                    {preview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    {preview ? 'Edit' : 'Preview'}
                                </button>
                                <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/10 transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Preview */}
                        {preview ? (
                            <div className="p-8">
                                {form.featured_image && (
                                    <img src={form.featured_image} alt="" className="w-full h-56 object-cover rounded-2xl mb-6" />
                                )}
                                <h1 className="text-3xl font-black mb-4">{form.title || 'Untitled'}</h1>
                                {form.excerpt && <p className="text-gray-400 mb-6 italic">{form.excerpt}</p>}
                                <div
                                    className="prose-custom text-gray-300 text-sm leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: form.content.replace(/\n/g, '<br/>') }}
                                />
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                {/* Title */}
                                <div>
                                    <label className="label-sm">Title *</label>
                                    <input
                                        required
                                        value={form.title}
                                        onChange={e => set('title', e.target.value)}
                                        placeholder="Your post title..."
                                        className="admin-input mt-1"
                                    />
                                    {!isEditing && form.title && (
                                        <p className="text-[10px] text-gray-500 mt-1 font-mono">
                                            slug: {form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}
                                        </p>
                                    )}
                                </div>

                                {/* Excerpt */}
                                <div>
                                    <label className="label-sm">Excerpt</label>
                                    <textarea
                                        value={form.excerpt}
                                        onChange={e => set('excerpt', e.target.value)}
                                        placeholder="Short summary for the blog grid..."
                                        rows={3}
                                        className="admin-input mt-1 resize-none"
                                    />
                                </div>

                                {/* Content */}
                                <div>
                                    <label className="label-sm">Content (HTML / Markdown)</label>
                                    <textarea
                                        value={form.content}
                                        onChange={e => set('content', e.target.value)}
                                        placeholder="Write your full article here. HTML is supported."
                                        rows={14}
                                        className="admin-input mt-1 resize-y font-mono text-sm"
                                    />
                                </div>

                                {/* Featured Image */}
                                <div>
                                    <label className="label-sm">Featured Image</label>
                                    <div className="flex items-center gap-3 mt-1">
                                        <input
                                            value={form.featured_image}
                                            onChange={e => set('featured_image', e.target.value)}
                                            placeholder="https://... or upload below"
                                            className="admin-input flex-1"
                                        />
                                        <label className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-sm font-bold cursor-pointer transition-colors">
                                            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                            Upload
                                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                        </label>
                                    </div>
                                    {form.featured_image && (
                                        <img src={form.featured_image} alt="preview" className="mt-2 h-24 rounded-xl object-cover" />
                                    )}
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="label-sm">Status</label>
                                    <select
                                        value={form.status}
                                        onChange={e => set('status', e.target.value)}
                                        className="admin-input mt-1"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                </div>

                                {/* SEO */}
                                <details className="group">
                                    <summary className="label-sm cursor-pointer select-none list-none flex items-center gap-2">
                                        SEO Metadata
                                        <span className="text-gray-600 text-[10px]">(optional)</span>
                                    </summary>
                                    <div className="mt-3 space-y-4 pl-1">
                                        <div>
                                            <label className="label-sm">Meta Title</label>
                                            <input value={form.meta_title} onChange={e => set('meta_title', e.target.value)} className="admin-input mt-1" placeholder="Defaults to post title" />
                                        </div>
                                        <div>
                                            <label className="label-sm">Meta Description</label>
                                            <textarea value={form.meta_description} onChange={e => set('meta_description', e.target.value)} rows={2} className="admin-input mt-1 resize-none" placeholder="160 chars max" maxLength={160} />
                                        </div>
                                    </div>
                                </details>

                                {/* Actions */}
                                <div className="flex justify-end gap-3 pt-2">
                                    <button type="button" onClick={onClose} className="px-6 py-3 rounded-2xl bg-white/5 text-sm font-bold hover:bg-white/10 transition-colors">
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-sm font-bold transition-colors disabled:opacity-50"
                                    >
                                        {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                                        {isEditing ? 'Update Post' : 'Create Post'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
