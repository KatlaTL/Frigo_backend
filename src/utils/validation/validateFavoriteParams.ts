import { BAD_REQUEST } from "@/constants/api";
import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

// Define the schema for the purchase object
// Ensure userId and productId are valid numbers in string form
const favoriteQuerySchema = z.object({
    userId: z.string().regex(/^\d+$/),
    productId: z.union([z.string().regex(/^\d+$/), z.number()]),
}).strict();

export const validateFavoriteParams = async (params: Promise<{ userId: string, productId?: string }>, request?: NextRequest) => {
    const { userId, productId } = await params;

    let body = {};
    if (request) {
        body = await request.json();
    }

    const validation = favoriteQuerySchema.safeParse({
        userId,
        ...(productId && { productId }),
        ...body
    });

    if (!validation.success) {
        return NextResponse.json({
            error: {
                code: "INVALID_OR_MISSING_PARAMS",
                message: "Required parameters are missing or invalid.",
                details: validation.error.errors,
                guidance: "Please ensure the 'productId' is provided in the URL path and 'userId' in the query string as valid integers."
            }
        }, {
            status: BAD_REQUEST,
        });
    }

    const { userId: validatedUserId, productId: validatedProductId } = validation.data;

    return {
        parsedUserId: Number(validatedUserId),
        parsedProductId: Number(validatedProductId)
    }
}