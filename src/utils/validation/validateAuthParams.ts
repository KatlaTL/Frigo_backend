import { BAD_REQUEST } from "@/constants/api";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Define the schema for register a user
// Ensure name, email and password are of valid length and type
const registerSchema = z.object({
    name: z.string().min(3),
    email: z.string().email().min(5),
    password: z.string().min(6)
});

export const validateRegisterParams = async (request: NextRequest) => {
    const body = await request.json();

    const validation = registerSchema.safeParse(body)

    if (!validation.success) {
        return NextResponse.json({
            error: {
                code: "INVALID_OR_MISSING_BODY",
                message: "Invalid or missing body data",
                details: validation.error.errors,
                guidance: "Please ensure to include the name, email and password in the body of the request"
            }
        }, {
            status: BAD_REQUEST
        })
    }

    return validation.data;
}

// Define the schema for sign in a user
// Ensure email and password are of valid length and type
const signInSchema = z.object({
    email: z.string().email().min(5),
    password: z.string().min(6)
});

export const validateSignInParams = async (request: NextRequest) => {
    const body = await request.json();

    const validation = signInSchema.safeParse(body)

    if (!validation.success) {
        return NextResponse.json({
            error: {
                code: "INVALID_OR_MISSING_BODY",
                message: "Invalid or missing body data",
                details: validation.error.errors,
                guidance: "Please ensure to include the email and password in the body of the request"
            }
        }, {
            status: BAD_REQUEST
        })
    }

    return validation.data;
}

// Define the schema for sign out a user
// Ensure email and userId are of valid length and type
const signOutSchema = z.object({
    userId: z.number(),
    email: z.string().email().min(5),
});

export const validateSignOutParams = async (request: NextRequest) => {
    const body = await request.json();

    const validation = signOutSchema.safeParse(body)

    if (!validation.success) {
        return NextResponse.json({
            error: {
                code: "INVALID_OR_MISSING_BODY",
                message: "Invalid or missing body data",
                details: validation.error.errors,
                guidance: "Please ensure to include the email and userId in the body of the request"
            }
        }, {
            status: BAD_REQUEST
        })
    }

    return validation.data;
}