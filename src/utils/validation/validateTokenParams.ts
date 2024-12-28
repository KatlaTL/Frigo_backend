import { BAD_REQUEST } from "@/constants/api";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Define the schema for sign in a user
// Ensure userId, email and jti are valid
const refreshTokenSchema = z.object({
    refreshToken: z.string()
}).strict();

export const validateRefreshTokenParams = async (request: NextRequest) => {
    const body = await request.json();

    const validation = refreshTokenSchema.safeParse(body)

    if (!validation.success) {
        return NextResponse.json({
            error: {
                code: "INVALID_OR_MISSING_BODY",
                message: "Invalid or missing body data",
                details: validation.error.errors,
                guidance: "Please ensure to include the refresh token in the body of the request"
            }
        }, {
            status: BAD_REQUEST
        })
    }

    return validation.data;
}