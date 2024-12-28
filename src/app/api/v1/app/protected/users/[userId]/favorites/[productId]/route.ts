import { NO_CONTENT, NOT_FOUND, SERVER_ERROR } from "@/constants/api";
import { removeProductAsFavoriteForUser } from "@/repositories/productRepository";
import { validateFavoriteParams } from "@/utils/validation/validateFavoriteParams";
import { NextRequest, NextResponse } from "next/server";


export const DELETE = async (request: NextRequest, { params }: { params: Promise<{ userId: string, productId?: string }> }) => {
    const validationResults = await validateFavoriteParams(params);

    if (validationResults instanceof NextResponse) {
        return validationResults;
    }

    try {
        const { parsedProductId, parsedUserId } = validationResults;

        const removedFavorite = await removeProductAsFavoriteForUser(parsedProductId, parsedUserId);

        if (removedFavorite.count === 0) {
            return NextResponse.json({
                error: {
                    message: "Resource not found",
                    status: "not found",
                    statusCode: NOT_FOUND,
                }
            }, {
                status: NOT_FOUND
            })
        }

        return new NextResponse(null, { status: NO_CONTENT });
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