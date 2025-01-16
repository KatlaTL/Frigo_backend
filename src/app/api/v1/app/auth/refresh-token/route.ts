import { OK, SERVER_ERROR, UNAUTHORIZED } from "@/constants/api";
import { generateNewTokens, TokenType, validateJti, verifyToken } from "@/lib/auth/tokens";
import { UnauthorizedError } from "@/utils/error/UnauthorizedError";
import { validateRefreshTokenParams } from "@/utils/validation/validateTokenParams";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const validationResults = await validateRefreshTokenParams(request);

    if (validationResults instanceof NextResponse) {
        return validationResults;
    }

    try {
        const { refreshToken } = validationResults;

        const payload = await verifyToken(refreshToken, TokenType.REFRESH_TOKEN);

        const isTokenValid = await validateJti(payload);

        if (!isTokenValid) {
            throw new UnauthorizedError("Token is not valid or has been revoked", "token_invalid");
        }
        
        const { userId, email } = payload;

        const tokens = await generateNewTokens(userId, email);

        if (!tokens) {
            throw new Error("Token generation failed");
        }

        const { accessToken, refreshToken: newRefreshToken } = tokens;

        return NextResponse.json({
            credentials: {
                userId: userId,
                accessToken: accessToken,
                refreshToken: newRefreshToken,
            },
        }, {
            status: OK
        })
    } catch (error) {
        if (error instanceof UnauthorizedError) {
            return NextResponse.json({
                error: {
                    code: "UNAUTHORIZED",
                    message: "Refresh token is invalid",
                    details: [{
                        ...(error.code && { code: error.code }),
                        message: error.message
                    }],
                    guidance: "Please ensure to include the a valid refresh token in the body of the request"
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