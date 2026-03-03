'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { fetchAPI } from '@/lib/api';

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
}

export default function ImageUpload({ value, onChange, label = "Project Visual" }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Basic client-side validation
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError('File size must be less than 5MB');
            return;
        }

        setUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('image', file);

            // Using fetch directly for multipart/form-data as fetchAPI is configured for JSON
            const token = localStorage.getItem('auth_token');
            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Upload failed');
            }

            onChange(data.url);
        } catch (err: any) {
            setError(err.message || 'Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const clearImage = () => {
        onChange('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">{label}</label>

            <div className={`relative group border-2 border-dashed rounded-2xl transition-all duration-300 min-h-[200px] flex flex-col items-center justify-center p-6 ${value ? 'border-purple-500/30 bg-purple-500/5' : 'border-white/10 hover:border-purple-500/30 hover:bg-white/5'
                }`}>
                {value ? (
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden group/preview">
                        <img src={value} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="p-3 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all border border-white/10"
                            >
                                <Upload className="w-5 h-5 text-white" />
                            </button>
                            <button
                                type="button"
                                onClick={clearImage}
                                className="p-3 bg-red-500/10 backdrop-blur-md rounded-xl hover:bg-red-500/20 transition-all border border-red-500/20"
                            >
                                <X className="w-5 h-5 text-red-500" />
                            </button>
                        </div>
                        <div className="absolute top-4 right-4 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 p-2 rounded-lg">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </div>
                    </div>
                ) : (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center gap-4 cursor-pointer w-full"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            {uploading ? <Loader2 className="w-8 h-8 text-purple-400 animate-spin" /> : <Upload className="w-8 h-8 text-gray-500 group-hover:text-purple-400" />}
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-bold text-gray-300">Click to upload image</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">PNG, JPG, WEBP (Max 5MB)</p>
                        </div>
                    </div>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />

                {error && (
                    <p className="text-xs text-red-400 mt-4 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-lg">{error}</p>
                )}
            </div>

            {/* Direct URL input as fallback/manual override */}
            <div className="mt-4 relative group">
                <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all font-medium text-xs text-gray-400"
                    placeholder="Or paste external URL here..."
                    value={value}
                    onChange={e => onChange(e.target.value)}
                />
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
        </div>
    );
}
