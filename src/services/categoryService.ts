import { getAllCategories } from "../repositories/categoryRepository";
import { prisma } from '../lib/prisma';
import { convertBufferToBase64 } from "@/lib/imageProcessing";
import { getAllCategoriesWithProductsByUserId } from "@/repositories/categoryRepository"
import { CategoryType, isProductWithFavoritesArray } from "./types";

// Contains business logic, transformations, and any additional operations based on application needs
// By having the service depend on the repository, business logic is encapsulated and centralized, keeping it separate from the raw data fetching layer. 

//-------------------------------- For the app ------------------------------------

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

//-------------------------------- For the admin panel ------------------------------------

// Fetches all categories and returns the title and id of the categories by calling getAllCategories
export const getAllCategoriesPanel = async () => {
    const categories = await getAllCategories();
    return categories;
}

// Deletes a category based on the categoryId
// This function uses Prisma directly since this action is not directly reusable for other parts of the application
export const deleteCategory = async (id: number) => {
    try {
        await prisma.category.delete({
            where: { categoryId: id },
        });
        return { success: true}; 
    } catch (error: any) {
        console.error("Could not delete category:", error);
        return { success: false, error: error.message}
    }
}

// Creates a new category based on the category title
// This function uses Prisma directly since this action is not directly reusable for other parts of the application
export const createCategory = async (title: string) => {
    try {
        const newCategory = await prisma.category.create({
            data:{
                title,
            },
        });
        return { success: true, category: newCategory };
    } catch (error: any) {
        console.error("Could not create category:", error);
        return { success: false, error: error.message}
    }
}