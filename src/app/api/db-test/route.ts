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
        console.error('Database Health Check Failed:', {
            message: error.message,
            code: error.code,
            meta: error.meta,
        });

        return NextResponse.json({
            status: 'error',
            message: 'Database connection or schema issue',
            details: error.message,
            code: error.code,
        }, { status: 500 });
    }
}
