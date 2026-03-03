import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request) {
    try {
        const { type, ...data } = await request.json();

        switch (type) {
            case 'home':
                await prisma.homeContent.update({ where: { id: 'home' }, data });
                break;
            case 'about':
                await prisma.aboutContent.update({ where: { id: 'about' }, data });
                break;
            case 'contact':
                const payload = { ...data };
                if (payload.socialLinks && typeof payload.socialLinks !== 'string') {
                    payload.socialLinks = JSON.stringify(payload.socialLinks);
                }
                await prisma.contactInfo.update({ where: { id: 'contact' }, data: payload });
                break;
            case 'seo':
                const { page, ...seoData } = data;
                await prisma.seo.update({ where: { page: page || 'home' }, data: seoData });
                break;
            default:
                return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('CMS Content Update Error:', error);
        return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
    }
}
