import { prisma } from '@/lib/prisma';

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