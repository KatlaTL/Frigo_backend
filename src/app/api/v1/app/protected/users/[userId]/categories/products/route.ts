import { OK, SERVER_ERROR } from "@/constants/api";
import { getAllCategoriesWithProductsForApp } from "@/services/categoryService";
import { validateCategoriesProductsParams } from "@/utils/validation/validateCategoriesProductsParams";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: Promise<{ userId: string }> }) => {
    const validationResults = await validateCategoriesProductsParams(params);

    if (validationResults instanceof NextResponse) {
        return validationResults;
    }

    try {
        const { parsedUserId } = validationResults;

        const categoriesWithProductsAndFavorites = await getAllCategoriesWithProductsForApp(parsedUserId);

        return NextResponse.json({
            message: `All categories with products and favorites for the userId: ${parsedUserId}`,
            statusCode: OK,
            categories: categoriesWithProductsAndFavorites
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