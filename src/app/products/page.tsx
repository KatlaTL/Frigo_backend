// Acts as a server component
import React from 'react';
import { getAllCategoriesPanel } from "../../services/categoryService";
import ProductForm from './ProductForm';
import { deleteProduct, getAllProductsWithImages } from '@/services/productService';
import { revalidatePath } from 'next/cache';

/* --- TODO ---
1. Only the basic functionality has been implemented, the UI must therefore be made based
on the Figma design.
*/

// Handles server-side logic and actions
// Product page component, when /products is written in the url this page will be displayed
const Product = async () => {
    const categories = await getAllCategoriesPanel(); // Uses getAllCategoriesPanel from categoryService to fetch all categories
    const products = await getAllProductsWithImages(); // Uses getAllProductsWithImages from productService to fetch all products

    // Define the server action explicitly with "use server"
    async function handleDelete(formData: FormData) {
    "use server"; // Mark this as a server action

    // Convert categoryId from string to number
    const id = Number(formData.get("productId"));
    // Uses the deleteProduct function from productService placed in services
    const result = await deleteProduct(id);
  
      // Trigger a revalidation of this route to update the list of categories
      if (result.success) {
        revalidatePath("/products"); // Ensure the page re-renders with the updated data
      } else {
        throw new Error(result.error || "Failed to delete product.");
      }
    }

    return (
        <div>
            <ProductForm initialCategories={categories}/>

            <h2>All Products</h2>

            <div className="products-list">
                {products.map((product) => (
                    <div key={product.productId} className="product-item">
                        <form action={handleDelete}> {/* Uses the handleDelete function to delete a product */}
                        <input type="hidden" name="productId" value={product.productId} />
                        <img
                            src={`data:${product.imageType};base64,${product.image.toString('base64')}`} // Should work for multiple types of images (jpg, png, jpeg)
                            alt={product.name} // Alternative text if image is not displayed
                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        />
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price.toFixed(2)}</p>
                        <button type="submit">Delete</button> 
                        </form>
                    </div>
                ))}
            </div>
        </div>
    )

};

export default Product;
