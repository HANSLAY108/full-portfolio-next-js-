import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

import "dotenv/config";
const prisma = new PrismaClient()

async function main() {
    const passwordHash = await bcrypt.hash('admin123', 12)

    // 1. Create Admin User
    const admin = await prisma.user.upsert({
        where: { email: 'admin@portfolio.com' },
        update: {},
        create: {
            email: 'admin@portfolio.com',
            name: 'Admin User',
            passwordHash: passwordHash,
            role: 'ADMIN',
        },
    })

    console.log({ admin })

    // 2. Initial Home Content
    await prisma.homeContent.upsert({
        where: { id: 'home' },
        update: {},
        create: {
            id: 'home',
            heroTitle: 'TOH HANS LAY',
            heroSubtitle: 'I design and build modern, high-performance digital experiences with a focus on futuristic aesthetics.',
            ctaPrimary: 'Hire Me',
            ctaSecondary: 'View Projects',
        },
    })

    // 3. Initial About Content
    await prisma.aboutContent.upsert({
        where: { id: 'about' },
        update: {},
        create: {
            id: 'about',
            bio: 'I am a passionate creative developer specialized in building sophisticated digital products. My approach combines modern styling, edge engineering, and seamless user experiences to deliver high-performance, aesthetically pleasing results.',
            yearsExperience: 8,
            projectsCompleted: 156,
            clients: 84,
        },
    })

    // 4. Initial Contact Info
    await prisma.contactInfo.upsert({
        where: { id: 'contact' },
        update: {},
        create: {
            id: 'contact',
            email: 'hans_lay@portfolio.com',
            phone: '+1 (555) 123-4567',
            socialLinks: {
                twitter: 'https://twitter.com/hans_lay',
                github: 'https://github.com/hans_lay',
                linkedin: 'https://linkedin.com/in/hans_lay',
            },
        },
    })

    // 5. Initial Projects
    const projects = [
        {
            title: 'Lumina OS',
            description: 'A futuristic operating system interface designed for seamless multitasking and immersive user experience.',
            imageUrl: '/projects/project1.png',
            featured: true,
            status: 'PUBLISHED',
            tags: 'React,Framer Motion,Tailwind',
        },
        {
            title: 'Vanguard Pay',
            description: 'A secure and lightning-fast cryptocurrency payment gateway with real-time analytics and global reach.',
            imageUrl: '/projects/project2.png',
            featured: true,
            status: 'PUBLISHED',
            tags: 'Next.js,PostgreSQL,Stripe',
        },
        {
            title: 'Nexus Engine',
            description: 'A high-performance 3D rendering engine for web-based games and interactive experiences.',
            imageUrl: '/projects/project3.png',
            featured: true,
            status: 'PUBLISHED',
            tags: 'Three.js,WebGL,TypeScript',
        },
    ]

    for (const project of projects) {
        await prisma.project.create({
            data: project,
        })
    }

    // 6. Initial SEO
    const pages = ['home', 'projects', 'about', 'contact']
    for (const page of pages) {
        await prisma.sEO.upsert({
            where: { page },
            update: {},
            create: {
                page,
                metaTitle: `${page.charAt(0).toUpperCase() + page.slice(1)} | Toh Hans Lay`,
                metaDescription: `Discover the professional portfolio of Toh Hans Lay, a creative developer specializing in futuristic digital experiences.`,
            },
        })
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
