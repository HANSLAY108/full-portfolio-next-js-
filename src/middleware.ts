import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'fallback_secret_change_me'
);

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect admin and api/cms routes
    if (pathname.startsWith('/admin') || pathname.startsWith('/api/cms')) {
        // Skip login page itself
        if (pathname === '/admin/login') {
            return NextResponse.next();
        }

        const token = request.cookies.get('admin_token')?.value;

        if (!token) {
            if (pathname.startsWith('/api/')) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        try {
            await jwtVerify(token, JWT_SECRET);
            return NextResponse.next();
        } catch (error) {
            if (pathname.startsWith('/api/')) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/api/cms/:path*'],
};
