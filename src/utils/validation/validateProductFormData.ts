import { BAD_REQUEST } from "@/constants/api";
import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

// Define the schema for the product object
// Ensure the product formdata contains the correct data
const productQuerySchema = z.object({
    name: z.string(),
    price: z.string().refine((value) => !isNaN(parseFloat(value))),
    image: z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
        message: "Image must be a valid file",
    }),
    categoryId: z.string().regex(/^\d+$/)
}).strict();

export const validateProductFormdata = async (request: NextRequest) => {
    const formData = await request.formData();

    const data = {
        name: formData.get("name"),
        price: formData.get("price"),
        image: formData.get("image"),
        categoryId: formData.get("categoryId")
    }

    const validation = productQuerySchema.safeParse({
        ...data,
        image: data.image as File
    })

    if (!validation.success) {
        return NextResponse.json({
            error: {
                code: "INVALID_OR_MISSING_FORM_DATA",
                message: "Required fields are missing or invalid.",
                details: validation.error.errors,
                guidance: "Please ensure the formdata contains a valid name (string), price (decimal), image (file) and categoryId (integer)"
            }
        }, {
            status: BAD_REQUEST,
        });
    }

    const { categoryId } = validation.data;

    return {
        ...validation.data,
        categoryId: Number(categoryId),
    }
}