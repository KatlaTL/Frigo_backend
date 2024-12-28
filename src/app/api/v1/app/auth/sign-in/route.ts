import { OK, SERVER_ERROR, UNAUTHORIZED } from "@/constants/api";
import { verifyPassword } from "@/lib/auth/hash";
import { generateNewTokens } from "@/lib/auth/tokens";
import { getActiveAndVerifiedUserForApp } from "@/services/userService";
import { UnauthorizedError } from "@/utils/error/UnauthorizedError";
import { validateSignInParams } from "@/utils/validation/validateAuthParams";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const validationResults = await validateSignInParams(request);

    if (validationResults instanceof NextResponse) {
        return validationResults;
    }

    try {
        const user = await getActiveAndVerifiedUserForApp(validationResults.email);

        if (!user) {
            throw new UnauthorizedError("INCORRECT_EMAIL");
        }

        const isPasswordValid = await verifyPassword(validationResults.password, user.hashedPassword);

        if (!isPasswordValid) {
            throw new UnauthorizedError("INCORRECT_PASSWORD");
        }

        const { userId, email } = user;

        const tokens = await generateNewTokens(userId, email);

        if (!tokens) {
            throw new Error("Token generation failed");
        }

        const { accessToken, refreshToken } = tokens;

        return NextResponse.json({
            credentials: {
                userId: userId,
                email: email,
                accessToken: accessToken,
                refreshToken: refreshToken,
            },
        }, {
            status: OK
        })
    } catch (error) {
        if (error instanceof UnauthorizedError) {
            return NextResponse.json({
                error: {
                    code: "INCORRECT_CREDENTIALS",
                    message: "User doesn't exist with the provided credentials",
                    details: [{
                        code: "incorrect_credentials",
                    }],
                    guidance: "Please ensure to include the correct email and password in the body of the request"
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