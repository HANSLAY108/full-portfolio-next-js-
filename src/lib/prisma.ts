import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not defined in environment variables');
}

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['error', 'warn'],
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
