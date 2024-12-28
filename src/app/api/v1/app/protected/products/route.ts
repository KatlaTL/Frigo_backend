import { CREATED, SERVER_ERROR } from "@/constants/api";
import { convertImageToBuffer } from "@/lib/imageProcessing";
import { addProduct } from "@/repositories/productRepository";
import { validateProductFormdata } from "@/utils/validation/validateProductFormData";
import { Decimal } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {

    const validationResults = await validateProductFormdata(request);

    if (validationResults instanceof NextResponse) {
        return validationResults;
    }

    try {
        const { image } = validationResults;

        const imageBuffer = await convertImageToBuffer(image);

        const product = await addProduct({
            ...validationResults,
            image: imageBuffer,
            price: new Decimal(validationResults.price),
            statusId: 1 // 1 is equal to active
        });

        if (!product) {
            throw new Error(`Something went wrong when creating the product`);
        }

        return NextResponse.json({
            message: "Product created successfully",
            status: "success",
            statusCode: CREATED,
            timestamp: product.createdAt,
            data: {
                product
            }
        }, {
            status: CREATED
        })
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