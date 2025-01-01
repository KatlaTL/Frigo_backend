import { prisma } from '@/lib/prisma';
import { Purchase } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export const getAllPurchasesByUserId = async (userId: number, offset?: number | null, limit?: number | null) => {
    return await prisma.purchase.findMany({
        select: {
            purchaseId: true,
            purchasePrice: true,
            amount: true,
            createdAt: true,
            updatedAt: true,
            product: {
                select: {
                    productId: true,
                    name: true,
                    isActive: true
                }
            }
        },
        take: limit || undefined,
        skip: offset || 0,
        where: {
            userId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

type PurchaseType = {
    userId: number;
    productId: number;
    purchasePrice: Decimal;
    amount: number;
}

export const addPurchase = async (purchase: PurchaseType): Promise<Purchase> => {
    return await prisma.purchase.create({
        data: purchase
    })
}