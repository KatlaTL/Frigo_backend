import { CREATED, OK, SERVER_ERROR } from "@/constants/api";
import { addPurchase } from "@/repositories/purchaseRepository";
import { getPurchaseHistoryForApp } from "@/services/purchaseService";
import { validateGetPurchasesParams, validatePostPurchaseParam } from "@/utils/validation/validatePurchaseParams";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: Promise<{ userId: string }> }) => {
    const validationResults = await validateGetPurchasesParams(request, params);

    if (validationResults instanceof NextResponse) {
        return validationResults;
    }

    try {
        const { parsedUserId, parsedLimit, parsedOffset } = validationResults;

        const purchases = await getPurchaseHistoryForApp(parsedUserId, parsedOffset, parsedLimit);

        return NextResponse.json({
            message: `All purchases for the userId: ${parsedUserId}`,
            statusCode: OK,
            limit: parsedLimit || undefined,
            offset: parsedOffset || undefined,
            purchases: purchases
        }, {
            status: OK
        });

    } catch (error) {
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

export const POST = async (request: NextRequest, { params }: { params: Promise<{ userId: string }> }) => {
    const validationResults = await validatePostPurchaseParam(request, params);

    if (validationResults instanceof NextResponse) {
        return validationResults;
    }

    try {
        const purchase = await addPurchase(validationResults);

        if (!purchase) {
            throw new Error(`Something went wrong when creating a purchase`);
        }

        return NextResponse.json({
            message: "Purchase created successfully",
            status: "success",
            statusCode: CREATED,
            timestamp: purchase.createdAt,
            data: {
                purchase
            }
        }, {
            status: CREATED
        });

    } catch (error) {
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