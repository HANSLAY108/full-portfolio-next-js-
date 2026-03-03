'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    FolderKanban,
    FileText,
    Settings,
    LogOut,
    User,
    Info,
    Phone,
    ChevronRight,
    Search,
    Globe,
    Mail
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Projects', icon: FolderKanban, href: '/admin/projects' },
    { name: 'Blog Manager', icon: FileText, href: '/admin/blog' },
    { name: 'Home Content', icon: FileText, href: '/admin/content/home' },
    { name: 'About Content', icon: Info, href: '/admin/content/about' },
    { name: 'Contact Info', icon: Phone, href: '/admin/content/contact' },
    { name: 'SEO Settings', icon: Settings, href: '/admin/content/seo' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch (e) {
            console.error("Logout failed", e);
        }
        localStorage.removeItem("user");
        router.push("/admin/login");
    };

    return (
        <div className="w-72 h-screen bg-black/40 backdrop-blur-xl border-r border-white/5 sticky top-0 flex flex-col p-6 overflow-y-auto">
            <div className="mb-10 px-4">
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent tracking-tight">
                    PortfolioPro CMS
                </h1>
            </div>

            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            prefetch={false}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group relative",
                                isActive
                                    ? "bg-purple-600/10 text-purple-400"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-purple-400" : "group-hover:scale-110 transition-transform")} />
                            <span className="font-medium">{item.name}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="active-indicator"
                                    className="absolute left-0 w-1 h-6 bg-purple-500 rounded-r-full"
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
                <div className="flex items-center gap-3 px-4 py-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center">
                        <User className="text-purple-400 w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-white">Admin User</p>
                        <p className="text-xs text-gray-500">Super Administrator</p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-500/5 transition-all duration-300"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </div>
    );
}
