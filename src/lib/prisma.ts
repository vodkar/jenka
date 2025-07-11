import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from '../generated/prisma';

let prisma: PrismaClient;

if (typeof window === "undefined") {
    const globalForPrisma = global as unknown as {
        prisma: PrismaClient
    }

    prisma = globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate())

    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
}
// @ts-ignore
export default prisma