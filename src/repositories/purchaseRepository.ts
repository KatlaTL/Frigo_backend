import { prisma } from '@/lib/prisma';
import { Purchase } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

// Handles direct communication with the database
// The repository only returns data without any transformation or extra logic

/* --- TODO ---
Implement functionality and UI for purchases when it comes to the admin panel, 
the code below is only used by the app for now. */

//----------------------------------- For the app ----------------------------------------

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