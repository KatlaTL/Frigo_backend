import { prisma } from '../lib/prisma';

// Contains business logic, transformations, and any additional operations based on application needs
// By having the service depend on the repository, business logic is encapsulated and centralized, keeping it separate from the raw data fetching layer. 

//----------------------------------- For the admin panel ----------------------------------------

// Creates a new product based on the product information (name, image, price, and so on)
// This function uses Prisma directly since this action is not directly reusable for other parts of the application
export const createProduct = async (name: string, image: Buffer, price: number, categoryId: number) => {
    try {
        const newProduct = await prisma.product.create({
            data: {
                name,
                image,
                price,
                isActive: true,
                categoryId,
            },
        });
        return { success: true, product: newProduct }; // fixed to true on success
    } catch (error) {
        console.error("Could not create product:", error);
        return { success: false, error: error.message };
    }
};

// Deletes a product based on the productId
// This function uses Prisma directly since this action is not directly reusable for other parts of the application
export const deleteProduct = async (id: number) => {
    try {
        await prisma.product.delete({
            where: { productId: id },
        });
        return { success: true}; 
    } catch (error) {
        console.error("Could not delete product:", error);
        return { success: false, error: error.message}
    }
}

// Figures out which mime type the image is (image/jpeg or image/jpg or image/png)
const detectImageMimeType = (buffer: Buffer): string => {
    const pngSignature = "89504e47"; // First 4 bytes for PNG
    const jpgSignature = "ffd8ff";   // First 3 bytes for JPEG/JPG

    const hex = buffer.toString("hex", 0, 4); // Read first 4 bytes as hex

    if (hex.startsWith(pngSignature)) {
        return "image/png"; //if the image starts with a pngSignature image/png should be returned
            } else if (hex.startsWith(jpgSignature)) {
        return "image/jpeg"; //if the image starts with jpgSignature image/jpeg should be returned
    } else {
        return "application/octet-stream"; // Default if format is not recognized
    }
};

export const getAllProductsWithImages = async () => {
    const products = await prisma.product.findMany({
        select: {
            productId: true,
            name: true,
            price: true,
            image: true, // Assuming `image` is stored as a Buffer
        },
    });

    // Map each product to add its inferred image type
    return products.map((product) => ({
        ...product,
        imageType: detectImageMimeType(product.image), // Detect MIME type
    }));
};

