import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    console.error('❌ PRISMA_ERROR: DATABASE_URL is missing from environment variables!');
} else {
    console.log('✅ Prisma: DATABASE_URL is present (length: ' + databaseUrl.length + ')');
}

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['error', 'warn'],
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
