import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');

        if (!type) {
            return NextResponse.json({ error: 'Type is required' }, { status: 400 });
        }

        let data = null;

        switch (type) {
            case 'home':
                data = await prisma.homeContent.findUnique({ where: { id: 'home' } });
                break;
            case 'about':
                data = await prisma.aboutContent.findUnique({ where: { id: 'about' } });
                break;
            case 'contact':
                data = await prisma.contactInfo.findUnique({ where: { id: 'contact' } });
                if (data && typeof data.socialLinks === 'string') {
                    try {
                        data.socialLinks = JSON.parse(data.socialLinks);
                    } catch (e) {
                        console.warn('Failed to parse social links JSON');
                    }
                }
                break;
            case 'seo':
                const page = searchParams.get('page') || 'home';
                data = await prisma.seo.findUnique({ where: { page } });
                break;
            default:
                return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
        }

        if (!data) {
            return NextResponse.json({ error: 'Content not found' }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Detailed Content API Error:', {
            message: error.message,
            code: error.code,
            meta: error.meta,
            stack: error.stack
        });
        return NextResponse.json({
            error: 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        }, { status: 500 });
    }
}
