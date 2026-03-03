'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    Filter,
    Edit2,
    Trash2,
    ExternalLink,
    MoreVertical,
    CheckCircle2,
    Clock,
    AlertCircle,
    Loader2
} from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';
import { GlassCard } from '@/components/ui/GlassCard';
import { FuturisticButton } from '@/components/ui/FuturisticButton';
import ProjectForm from '@/components/admin/ProjectForm';
import { fetchAPI } from '@/lib/api';

export default function ProjectsAdmin() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<any>(null);

    const loadProjects = async () => {
        setLoading(true);
        try {
            const data = await fetchAPI('/projects/index.php');
            setProjects(data);
        } catch (error) {
            console.error("Failed to load projects", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        try {
            await fetchAPI(`/projects/delete.php?id=${id}`);
            loadProjects();
        } catch (error) {
            alert('Failed to delete project');
        }
    };

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex bg-[#050505] min-h-screen text-white">
            <Sidebar />

            <main className="flex-1 p-8 md:p-12 overflow-y-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight mb-2">Projects</h1>
                        <p className="text-gray-500 font-medium">Manage your portfolio works and experimental projects.</p>
                    </div>

                    <FuturisticButton
                        onClick={() => {
                            setEditingProject(null);
                            setIsFormOpen(true);
                        }}
                        icon={<Plus className="w-5 h-5" />}
                    >
                        Create Project
                    </FuturisticButton>
                </header>

                <div className="mb-10 flex flex-col md:flex-row gap-6">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-32">
                        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredProjects.map((project) => (
                            <GlassCard key={project.id} className="p-4 flex flex-col md:flex-row items-center gap-6 group">
                                <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden shrink-0 border border-white/5">
                                    <img
                                        src={project.image_url}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold tracking-tight truncate">{project.title}</h3>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${project.status === 'PUBLISHED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                                            }`}>
                                            {project.status}
                                        </span>
                                        {project.featured == 1 && (
                                            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-500 text-sm line-clamp-1 mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags?.split(',').map((tag: string) => (
                                            <span key={tag} className="text-[9px] font-bold text-gray-400 uppercase tracking-widest bg-white/5 px-2 py-1 rounded border border-white/5">
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => {
                                            setEditingProject(project);
                                            setIsFormOpen(true);
                                        }}
                                        className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/5"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors border border-red-500/20"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                )}
            </main>

            <ProjectForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                project={editingProject}
                onSuccess={() => {
                    setIsFormOpen(false);
                    loadProjects();
                }}
            />
        </div>
    );
}
