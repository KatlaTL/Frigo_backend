import { NextRequest, NextResponse } from "next/server";
import { validateSignOutParams } from "@/utils/validation/validateAuthParams";
import { setUserCurrentTokenIdentifier } from "@/repositories/userRepository";
import { NOT_FOUND, OK, SERVER_ERROR } from "@/constants/api";
import { Prisma } from "@prisma/client";

export const POST = async (request: NextRequest) => {
    const validationResults = await validateSignOutParams(request);


    if (validationResults instanceof NextResponse) {
        return validationResults;
    }

    try {
        const { userId, email } = validationResults;

        const user = await setUserCurrentTokenIdentifier(userId, email, "");

        if (user.currentTokenIdentifier.length > 0) {
            throw new Error("removing jti failed");
        } 

        return NextResponse.json({
            message: "Successfully logged out"
        }, {
            status: OK
        })

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                return NextResponse.json({
                    error: {
                        code: "USER_NOT_FOUND",
                        message: "No user found with the provided credentials"
                    }
                }, {
                    status: NOT_FOUND,
                });
            }
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