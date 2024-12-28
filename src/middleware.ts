import { NextRequest, NextResponse } from "next/server";
import { SERVER_ERROR, UNAUTHORIZED } from "./constants/api";
import { UnauthorizedError } from "./utils/error/UnauthorizedError";
import { TokenType, verifyToken } from "./lib/auth/tokens";

/**
 * Middleware function. Matcher ensures this is only run for protected routes.
 */
export const middleware = async (request: NextRequest) => {
    const authHeader = request.headers.get("authorization");

    try {
        if (!authHeader || !authHeader.toLowerCase().startsWith("bearer")) {
            throw new UnauthorizedError("Authorization header missing", "authorization_header_missing");
        }

        // Find the the token in the authorization header
        const token = authHeader.split(" ")[1];

        if (!token) {
            throw new UnauthorizedError("Bearer token missing", "token_missing");
        }

        // Use verifyToken to validate the token. Throws an error if the validation fails
        await verifyToken(token, TokenType.ACCESS_TOKEN_SECRET);

        return NextResponse.next();

    } catch (error) {
        if (error instanceof UnauthorizedError) {
            return NextResponse.json({
                error: {
                    code: "UNAUTHORIZED",
                    message: "User is not authorized to access this route",
                    details: [{
                        ...(error.code && { code: error.code }),
                        message: error.message
                    }],
                    guidance: "Please ensure to include the a valid access token in the authorization header"
                }
            }, {
                status: UNAUTHORIZED
            })
        }

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


// Configure matcher to apply middleware only to specific routes
export const config = {
    matcher: ["/api/app/protected/:path*"], // Apply middleware to all routes in the api/app/protected directory
};