import { convertBufferToBase64 } from "@/lib/imageProcessing"
import { getAllFavoritesByUserId } from "@/repositories/productRepository"
import { CategoryType, isProductWithFavoritesArray, ProductAndFavoriteType } from "./types";

/**
 * Get all products that are set as favorite for a user. \
 * Maps the isFavorite array on the products to a boolean. \
 * Converts the image buffer to a base64
 * @param userId 
 * @returns 
 */
export const getAllUserFavoritesForApp = async (userId: number) => {
    if (!userId || isNaN(userId)) {
        throw new Error("Invalid userId");
    }

    try {
        const favorites: ProductAndFavoriteType = await getAllFavoritesByUserId(userId);

        // Transform the favorite products to include the 'isFavorite' boolean field
        const transformedFavorites = [{
            categoryId: -1,
            title: "Favoritter",
            products: await Promise.all(favorites.map(async (product) => ({
                productId: product.productId,
                name: product.name,
                image: await convertBufferToBase64(product.image as Buffer),
                price: product.price,
                isFavorite: isProductWithFavoritesArray(product) ? product.favorites.length > 0 : product.isFavorite
            })))
        }] as CategoryType[];

        return transformedFavorites;
    } catch (error) {
        throw error;
    }
}