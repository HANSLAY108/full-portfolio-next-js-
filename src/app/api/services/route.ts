import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const services = await prisma.service.findMany({
            orderBy: { sortOrder: 'asc' }
        });
        return NextResponse.json(services);
    } catch (error) {
        console.error('Services API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
