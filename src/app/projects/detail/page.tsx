'use client';

import { useEffect, useState, Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { FuturisticButton } from '@/components/ui/FuturisticButton';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Layout } from 'lucide-react';
import Link from 'next/link';
import { fetchAPI } from '@/lib/api';
import { useSearchParams } from 'next/navigation';

function ProjectContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const loadProject = async () => {
            try {
                const projects = await fetchAPI('/projects/index.php');
                const found = projects.find((p: any) => p.id === id);
                setProject(found);
            } catch (error) {
                console.error('Failed to load project details:', error);
            } finally {
                setLoading(false);
            }
        };
        loadProject();
    }, [id]);

    if (!id) return <div className="min-h-screen flex items-center justify-center text-[var(--foreground)]">No project specified</div>;
    if (loading) return null;
    if (!project) return <div className="min-h-screen flex items-center justify-center text-[var(--foreground)]">Project not found</div>;

    const tags = project.tags ? project.tags.split(',').map((t: string) => t.trim()) : [];

    return (
        <div className="min-h-screen text-[var(--foreground)] relative pearlescent overflow-hidden transition-colors duration-500">
            <Navbar />

            {/* Immersive Background synced with theme */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-0 left-0 w-full h-[80vh] bg-cover bg-center opacity-20 blur-xl mask-gradient-b"
                    style={{ backgroundImage: `url(${project.image_url})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--background)] to-[var(--background)]" />
            </div>

            {/* Background Glows synced with Home */}
            <div className="fixed top-[-20%] left-[-10%] w-[70%] h-[70%] bg-purple-600/[var(--blob-opacity)] blur-[180px] rounded-full pointer-events-none animate-slow-spin opacity-50" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-600/[var(--blob-opacity)] blur-[180px] rounded-full pointer-events-none animate-slow-spin-reverse opacity-50" />
            <div className="fixed top-[20%] right-[10%] w-[40%] h-[40%] bg-emerald-500/[var(--blob-opacity)] blur-[150px] rounded-full pointer-events-none animate-pulse opacity-40" />

            <main className="container mx-auto px-6 pt-48 pb-32 relative z-10">
                <Link href="/projects" prefetch={false} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--foreground-muted)] hover:text-purple-400 transition-colors mb-12 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" /> Back to Projects
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-none"
                        >
                            {project.title}
                        </motion.h1>

                        <div className="flex flex-wrap gap-4 mb-12">
                            {tags.map((tag: string) => (
                                <span key={tag} className="px-5 py-2 glass border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-purple-400 shadow-xl shadow-purple-500/5">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 shadow-3xl mb-16">
                            <img
                                src={project.image_url}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="max-w-none">
                            <h2 className="text-4xl font-black tracking-tight mb-8 text-[var(--foreground)]">Concept & Execution</h2>
                            <p className="text-xl md:text-2xl text-[var(--foreground)] leading-relaxed font-bold mb-8">
                                {project.description}
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-48">
                        <GlassCard className="p-8 space-y-8 border-purple-500/10 shadow-2xl shadow-purple-500/5">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--foreground-muted)] mb-6 flex items-center gap-2">
                                    <Layout className="w-3 h-3 text-purple-400" /> Project Intel
                                </h4>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-widest">Released</span>
                                        <span className="text-sm font-black tracking-tight">{new Date(project.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-widest">Role</span>
                                        <span className="text-sm font-black tracking-tight">Full Stack Dev</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Status</span>
                                        <span className="text-sm font-black tracking-tight text-emerald-400">Deployed</span>
                                    </div>
                                </div>
                            </div>

                            <FuturisticButton className="w-full h-16" icon={<ExternalLink className="w-4 h-4" />}>
                                Live Deployment
                            </FuturisticButton>
                        </GlassCard>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function ProjectDetailsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[var(--background)] flex items-center justify-center text-[var(--foreground)]">Loading project architecture...</div>}>
            <ProjectContent />
        </Suspense>
    );
}
