import { BAD_REQUEST } from "@/constants/api";
import { NextResponse } from "next/server";
import { z } from "zod";

// Define the schema for the purchase object
// Ensure userId are valid numbers in string form
const categoryAndProductQuerySchema = z.object({
    userId: z.string().regex(/^\d+$/)
}).strict();

export const validateCategoriesProductsParams = async (params: Promise<{ userId: string }>) => {
    const { userId } = await params;
    
    const validation = categoryAndProductQuerySchema.safeParse({
        userId,
    });

    if (!validation.success) {
        return NextResponse.json({
            error: {
                code: "INVALID_OR_MISSING_PARAMS",
                message: "Required parameters are missing or invalid.",
                details: validation.error.errors,
                guidance: "Please ensure the 'userId' is provided in the URL path as valid integers."
            }
        }, {
            status: BAD_REQUEST,
        });
    }

    const { userId: validatedUserId } = validation.data;

    return {
        parsedUserId: Number(validatedUserId)
    }
}