import { BAD_REQUEST } from "@/constants/api";
import { Decimal } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Define the schema for the purchase object
// Ensure userId, limit and offset are valid numbers in string form
const purchaseGetSchema = z.object({
    userId: z.string().regex(/^\d+$/),
    limit: z.string().regex(/^\d+$/).optional(),
    offset: z.string().regex(/^\d+$/).optional(),
}).strict();

export const validateGetPurchasesParams = async (request: NextRequest, params: Promise<{ userId: string }>) => {
    const { userId } = await params;
    
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");

    const validation = purchaseGetSchema.safeParse({
        userId,
        ...(limit && { limit }),
        ...(offset && { offset })
    });

    if (!validation.success) {
        return NextResponse.json({
            error: {
                code: "INVALID_OR_MISSING_PARAMS",
                message: "Missing or invalid param userId",
                details: validation.error.errors,
                guidance: "Please ensure the 'userId' is provided in the query string as valid integers. If 'limit' or 'offset' is provide, ensure they are valid integers"
            }
        }, {
            status: BAD_REQUEST,
        });
    }

    const { userId: validatedUserId, limit: validatedLimit, offset: validatedOffset } = validation.data;

    return {
        parsedUserId: Number(validatedUserId),
        parsedLimit: Number(validatedLimit),
        parsedOffset: Number(validatedOffset)
    }
}

// Define the schema for the purchase object
const purchasePostSchema = z.object({
    userId: z.string().regex(/^\d+$/),
    productId: z.number().int(),
    amount: z.number().int(),
    purchasePrice: z.string().refine((value) => !isNaN(parseFloat(value)))
}).strict();

export const validatePostPurchaseParam = async (request: NextRequest, params: Promise<{ userId: string }>) => {
    const { userId } = await params;
    const body = await request.json();

    const validation = purchasePostSchema.safeParse({
        ...body,
        userId
    })

    if (!validation.success) {
        return NextResponse.json({
            error: {
                code: "INVALID_OR_MISSING_BODY",
                message: "Invalid or missing body data",
                details: validation.error.errors,
                guidance: "Please ensure to include the userId, productId, amount and price in the body of the request"
            }
        }, {
            status: BAD_REQUEST
        })
    }

    return {
        ...validation.data,
        userId: Number(userId),
        purchasePrice: validation.data.purchasePrice as unknown as Decimal
    };
}