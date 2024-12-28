import { CREATED, OK, SERVER_ERROR } from "@/constants/api";
import { setProductAsFavoriteForUser } from "@/repositories/productRepository";
import { getAllUserFavoritesForApp } from "@/services/favoriteService";
import { validateCategoriesProductsParams } from "@/utils/validation/validateCategoriesProductsParams";
import { validateFavoriteParams } from "@/utils/validation/validateFavoriteParams";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (request: NextRequest, { params }: { params: Promise<{ userId: string }> }) => {
    const validationResults = await validateCategoriesProductsParams(params);

    if (validationResults instanceof NextResponse) {
        return validationResults;
    }

    try {
        const { parsedUserId } = validationResults;

        const favorites = await getAllUserFavoritesForApp(parsedUserId);

        return NextResponse.json({
            message: `All favorites for the userId: ${parsedUserId}`,
            statusCode: OK,
            favorites: favorites
        }, {
            status: OK
        });

    } catch (error) {
        return NextResponse.json({
            error: {
                code: "SERVER_ERROR",
                message: `Something went wrong: ${error}`
            }
        }, {
            status: SERVER_ERROR,
        });
    }
}

export const POST = async (request: NextRequest, { params }: { params: Promise<{ userId: string }> }) => {
    const validationResults = await validateFavoriteParams(params, request);

    if (validationResults instanceof NextResponse) {
        return validationResults;
    }

    try {
        const { parsedProductId, parsedUserId } = validationResults;

        const favorite = await setProductAsFavoriteForUser(parsedProductId, parsedUserId);

        if (!favorite) {
            throw new Error(`Something went wrong when setting the productId ${parsedProductId} as favorite`);
        }

        return NextResponse.json({
            message: "Favorite created successfully",
            status: "success",
            statusCode: CREATED,
            timestamp: favorite.createdAt,
            data: {
                favorite
            }
        }, {
            status: CREATED
        })
    } catch (error) {
        return NextResponse.json({
            error: {
                code: "SERVER_ERROR",
                message: `Something went wrong: ${error}`
            }
        }, {
            status: SERVER_ERROR,
        });
    }
}