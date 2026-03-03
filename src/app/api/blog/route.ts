import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');
        const search = searchParams.get('search');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = 6;
        const skip = (page - 1) * limit;

        // Fetch single post by slug
        if (slug) {
            const post = await prisma.blogPost.findUnique({
                where: { slug }
            });
            if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
            return NextResponse.json(post);
        }

        // Fetch paginated posts
        const where: any = { status: 'published' };
        if (search) {
            where.OR = [
                { title: { contains: search } },
                { content: { contains: search } }
            ];
        }

        const [posts, total] = await Promise.all([
            prisma.blogPost.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit
            }),
            prisma.blogPost.count({ where })
        ]);

        return NextResponse.json({
            posts,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        console.error('Blog API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
