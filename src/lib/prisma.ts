import { PrismaClient } from '@prisma/client';

// Attach the Prisma client instance to the global object so it persist between module reloads in development mode.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Creates a singleton Prisma client instance to prevent creating multiple instances of PrismaClient,
// which can lead to issues with database connection limits.
export const prisma = globalForPrisma.prisma || new PrismaClient({
    log: ['query'],
});

// In production, we avoid attaching it to the global object to prevent potential memory leaks.
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;