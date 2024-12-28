// Receives form data and interacts with the database using Prisma
import { NextResponse } from 'next/server';
import { createProduct } from '../../../services/productService';

export async function POST(request: Request) {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const image = formData.get("image") as string; // this is received as a base64 string from the client
    const price = parseFloat(formData.get("price") as string);
    const categoryId = parseInt(formData.get("categoryId") as string, 10);

    if (!name || !image || isNaN(price) || isNaN(categoryId)) {
        return NextResponse.json({ success: false, error: "Invalid product data" }, { status: 400 });
    }

    // Convert image data back to a buffer (assuming it was sent as a string)
    const imageBuffer = Buffer.from(image, 'base64');

    const result = await createProduct(name, imageBuffer, price, categoryId);

    if (result.success) {
        return NextResponse.json({ success: true, product: result.product });
    } else {
        return NextResponse.json({ success: false, error: result.error });
    }
}
