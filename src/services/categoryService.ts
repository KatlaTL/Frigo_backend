import { convertBufferToBase64 } from "@/lib/imageProcessing";
import { getAllCategoriesWithProductsByUserId } from "@/repositories/categoryRepository"
import { CategoryType, isProductWithFavoritesArray } from "./types";


/**
 * Get all categories and products. \
 * Maps the isFavorite array on the products to a boolean. \
 * Converts the image buffer to a base64
 * @param userId 
 * @returns 
 */
export const getAllCategoriesWithProductsForApp = async (userId: number): Promise<CategoryType[]> => {
    if (!userId || isNaN(userId)) {
        throw new Error("Invalid userId");
    }

    try {
        const categories: CategoryType[] = await getAllCategoriesWithProductsByUserId(userId);
        
        // Transform the category products to include the 'isFavorite' boolean field
        const categoriesProductsWithIsFavorite: CategoryType[] = await Promise.all(categories.map(async (category) => ({
            ...category,
            products: await Promise.all(category.products.map(async (product) => ({
                productId: product.productId,
                name: product.name,
                image: await convertBufferToBase64(product.image as Buffer),
                price: product.price,
                isFavorite: isProductWithFavoritesArray(product) ? product.favorites.length > 0 : product.isFavorite
            })))
        })));

        return categoriesProductsWithIsFavorite;
    } catch (error) {
        throw error;
    }
}