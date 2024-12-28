import { CREATED, DUPLICATE_CONFLICT, SERVER_ERROR } from "@/constants/api";
import { hashPassword } from "@/lib/auth/hash";
import { addUser } from "@/repositories/userRepository";
import { validateRegisterParams } from "@/utils/validation/validateAuthParams";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const validationResults = await validateRegisterParams(request);

    if (validationResults instanceof NextResponse) {
        return validationResults;
    }

    try {
        const hashedPassword = await hashPassword(validationResults.password);

        const newUser = await addUser({
            email: validationResults.email,
            name: validationResults.name,
            password: hashedPassword,
            currentTokenIdentifier: "",
            statusId: 1 // 1 is equal to active - TO-DO change to pending when verify logic has been set up
        });

        if (!newUser) {
            throw new Error(`Something went wrong when creating a new user`);
        }

        return NextResponse.json({
            message: "User created successfully",
            status: "success",
            statusCode: CREATED,
            timestamp: newUser.createdAt,
            data: {
                newUser
            }
        }, {
            status: CREATED
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return NextResponse.json({
                    error: {
                        code: "USER_ALREADY_EXIST",
                        message: "A user with the provide credentials already exist"
                    }
                }, {
                    status: DUPLICATE_CONFLICT,
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