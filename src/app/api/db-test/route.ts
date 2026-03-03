import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Test connection by counting users
        const userCount = await prisma.user.count();

        return NextResponse.json({
            status: 'ok',
            database: 'connected',
            userCount,
            env: process.env.NODE_ENV,
        });
    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            message: 'Diagnostic Check Failed',
            error: error.message,
            code: error.code,
            database_url_present: !!process.env.DATABASE_URL,
            hint: "Please ensure DATABASE_URL is set in Vercel Project Settings > Environment Variables."
        }, { status: 500 });
    }
}
