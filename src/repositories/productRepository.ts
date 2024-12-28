
import { prisma } from '@/lib/prisma';
import { Favorite, Product } from '@prisma/client';

// Handles direct communication with the database
// The repository only returns data without any transformation or extra logic

//----------------------------------- For the app ----------------------------------------

export const getAllFavoritesByUserId = async (userId: number) => {
    return await prisma.product.findMany({
        select: {
            productId: true,
            name: true,
            image: true,
            price: true,
            favorites: {
                where: {
                    userId: userId
                },
                select: {
                    favoriteId: true
                }
            }
        },
        where: {
            isActive: true,
            favorites: {
                some: { // Use 'some' to check if at least one related favorite matches
                    userId: userId
                }
            }
        },
    })
}

export const setProductAsFavoriteForUser = async (productId: number, userId: number): Promise<Favorite> => {
    return await prisma.favorite.create({
        data: {
            productId,
            userId
        }
    })
}

export const removeProductAsFavoriteForUser = async (productId: number, userId: number): Promise<{ count: number }> => {
    return await prisma.favorite.deleteMany({
        where: {
            productId: {
                equals: productId
            },
            userId: {
                equals: userId
            }
        }
    })
}

type ProductSubset = Pick<Product, "name" | "price" | "image" | "categoryId" | "statusId">;

export const addProduct = async (productData: ProductSubset): Promise<Product> => {
    return await prisma.product.create({
        data: productData
    })
}