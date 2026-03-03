import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['query'],
        datasource: {
            url: process.env.DATABASE_URL
        }
    } as any); // Use as any if types are being strict about this new Prisma 7 pattern

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
