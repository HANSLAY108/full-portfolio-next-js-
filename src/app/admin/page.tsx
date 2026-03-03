'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import { motion } from 'framer-motion';
import { fetchAPI } from '@/lib/api';
import {
    Projector,
    Users,
    Clock,
    TrendingUp,
    FolderKanban,
    FileText,
    Settings
} from 'lucide-react';

export default function DashboardPage() {
    const [statsData, setStatsData] = useState<any>([]); // Renamed to avoid conflict with internal 'stats'
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const projects = await fetchAPI('/projects/index.php');
                const published = projects.filter((p: any) => p.status === 'PUBLISHED').length;
                const featured = projects.filter((p: any) => p.featured == 1).length;

                // Transform fetched data into the format expected by the JSX
                const newStats = [
                    { name: 'Total Projects', value: projects.length.toString(), icon: Projector, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                    { name: 'Published Projects', value: published.toString(), icon: FolderKanban, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                    { name: 'Featured Projects', value: featured.toString(), icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                    // Keep other static stats or remove if no longer needed
                    { name: 'Active Clients', value: '8', icon: Users, color: 'text-orange-400', bg: 'bg-orange-500/10' },
                    { name: 'Total Experience', value: '8 Years', icon: Clock, color: 'text-red-400', bg: 'bg-red-500/10' },
                    { name: 'Completion Rate', value: '98%', icon: TrendingUp, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
                ];

                setStatsData(newStats);
            } catch (error) {
                console.error("Failed to load stats", error);
                // Optionally set default stats or error state here
                setStatsData([
                    { name: 'Total Projects', value: 'N/A', icon: Projector, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                    { name: 'Published Projects', value: 'N/A', icon: FolderKanban, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                    { name: 'Featured Projects', value: 'N/A', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                    { name: 'Active Clients', value: '8', icon: Users, color: 'text-orange-400', bg: 'bg-orange-500/10' },
                    { name: 'Total Experience', value: '8 Years', icon: Clock, color: 'text-red-400', bg: 'bg-red-500/10' },
                    { name: 'Completion Rate', value: '98%', icon: TrendingUp, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
                ]);
            } finally {
                setLoading(false);
            }
        };
        loadStats();
    }, []);

    return (
        <div className="flex bg-[#050505] min-h-screen text-white">
            <Sidebar />
            <main className="flex-1 p-10 overflow-y-auto">
                <header className="mb-10">
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
                    <p className="text-gray-400 mt-2">Welcome back, Admin. Here's what's happening today.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {statsData.map((stat: any, index: number) => (
                        <motion.div
                            key={stat.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-6 h-32 flex flex-col justify-between hover:border-white/20 group cursor-default"
                        >
                            <div className="flex justify-between items-start">
                                <span className="text-gray-400 text-sm font-medium">{stat.name}</span>
                                <div className={`${stat.bg} p-2 rounded-xl group-hover:scale-110 transition-transform`}>
                                    <stat.icon className={`${stat.color} w-5 h-5`} />
                                </div>
                            </div>
                            <span className="text-2xl font-bold tracking-tight">{stat.value}</span>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="glass-card p-8 min-h-[400px]"
                    >
                        <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
                        <div className="space-y-6">
                            {[
                                { action: 'Updated project', target: 'Lumina OS', time: '2 hours ago' },
                                { action: 'Added new project', target: 'Vanguard Pay', time: '5 hours ago' },
                                { action: 'Modified About content', target: 'Portfolio', time: 'Yesterday' },
                                { action: 'Changed SEO metadata', target: 'Home page', time: '2 days ago' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                                    <div className="flex-1">
                                        <p className="text-sm">
                                            <span className="text-gray-400">{item.action}</span>{' '}
                                            <span className="text-white font-medium">{item.target}</span>
                                        </p>
                                    </div>
                                    <span className="text-xs text-gray-500">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="glass-card p-8 min-h-[400px]"
                    >
                        <h3 className="text-xl font-semibold mb-6">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-purple-500/30 transition-all group">
                                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <FolderKanban className="text-purple-400 w-6 h-6" />
                                </div>
                                <span className="text-sm font-medium">Add Project</span>
                            </button>
                            <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all group">
                                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <FileText className="text-blue-400 w-6 h-6" />
                                </div>
                                <span className="text-sm font-medium">Edit Home</span>
                            </button>
                            <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-emerald-500/30 transition-all group">
                                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Settings className="text-emerald-400 w-6 h-6" />
                                </div>
                                <span className="text-sm font-medium">SEO Audit</span>
                            </button>
                            <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-orange-500/30 transition-all group">
                                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Users className="text-orange-400 w-6 h-6" />
                                </div>
                                <span className="text-sm font-medium">Settings</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
