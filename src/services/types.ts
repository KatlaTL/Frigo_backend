import { Decimal } from "@prisma/client/runtime/library"

type FavoriteArrayType = {
    favorites: { favoriteId: number }[]
}

type FavoriteBooleanType = {
    isFavorite: boolean
}

type ProductType = {
    productId: number;
    name: string;
    image: Buffer | string;
    price: Decimal;
}

// Extending ProductType with FavoriteArrayType - used for the data received from prisma
type ProductWithFavoritesArray = ProductType & FavoriteArrayType;

// Extending ProductType with FavoriteBooleanType - used as the return type
type ProductWithFavoriteBoolean = ProductType & FavoriteBooleanType;

export type ProductAndFavoriteType = (ProductWithFavoritesArray | ProductWithFavoriteBoolean)[];

export type CategoryType = {
    categoryId: number;
    title: string;
    products: ProductAndFavoriteType
}

/**
 * Type guard to check if the product has the `favorites` array
 * @param product - Product is ProductWithFavoritesArray is the type predicate that tells TypeScript that if the function returns true, product is of type ProductWithFavoritesArray
 * @returns boolean
 */
export const isProductWithFavoritesArray = (product: ProductWithFavoritesArray | ProductWithFavoriteBoolean): product is ProductWithFavoritesArray => {
    return (product as ProductWithFavoritesArray).favorites !== undefined;
}