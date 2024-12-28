import { prisma } from '../lib/prisma';

// Handles direct communication with the database
// The repository only returns data without any transformation or extra logic

export const getAllCategories = async () => {
    // Fetches all categories with only the needed fields
    return prisma.category.findMany({
        select: { categoryId: true, title: true },
    });
}

export const getAllCategoriesWithProductsByUserId = async (userId: number) => {
    return await prisma.category.findMany({
        select: {
            categoryId: true,
            title: true,
            products: {
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
                    isActive: true
                }
            }
        },
        orderBy: {
            categoryId: 'asc'
        }
    })
}

