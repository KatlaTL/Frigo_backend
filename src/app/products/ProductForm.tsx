// Act as a client component
"use client";

import React, { useState } from 'react';

/* --- TODO ---
1. Only the basic functionality has been implemented, the UI must therefore be made based
on the Figma design.
*/
// Handles client-side logic such as managing form inputs, validating user data and submitting the form

// Define the type for a single category object
type Category = {
    categoryId: number;
    title: string;
};

// Define the props for the ProductForm component
type ProductFormProps = {
    initialCategories: Category[]; // List of categories passed as props from the server-side
};

// React functional component for the product creation form
const ProductForm: React.FC<ProductFormProps> = ({ initialCategories }) => {
    // Initialize the state for categories, name, price, image, and selected category
    const [categories] = useState<Category[]>(initialCategories); // Categories are fetched from the server 
    const [name, setName] = useState(''); // State for the product name
    const [price, setPrice] = useState(''); // State for the product price
    const [image, setImage] = useState<File | null>(null); // State for the product iamge file
    const [categoryTitle, setCategoryTitle] = useState(''); // State for the selected category title

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();  // Prevent the default form submission behavior

         // Find the selected category object based on the title
        const selectedCategory = categories.find((cat) => cat.title === categoryTitle);
        if (!selectedCategory) {
            alert("Please select a valid category"); // Validation for category selection
            return;
        }

        if (!image) {
            alert("Please upload an image"); // Validation for image upload
            return;
        }

       // Read the image file as a base65 string
        const reader = new FileReader();
        reader.readAsDataURL(image); // Convert the file to a DataURL (base64 encoded)

        reader.onloadend = async () => {
            const base64String = reader.result?.toString().split(",")[1]; // Extract base64 data after the comma

            if (!base64String) {
                alert("Failed to read image as base64"); // Handle errors in reading the image
                return;
            }

             // Prepare the form data to send to the backend
            const formData = new FormData();
            formData.append("name", name); // Add the product name
            formData.append("image", base64String); // Add the base64-encoded image
            formData.append("price", price); // Add the product price
            formData.append("categoryId", selectedCategory.categoryId.toString()); // Add the category ID

            // Send a POST request to create the product
            const response = await fetch('/api/products', {
                method: 'POST',
                body: formData, // Send the form data
            });

            const result = await response.json(); // Parse the response
            if (result.success) {
                alert("Product created successfully!"); // Notify the user of success
            } else {
                alert(`Error creating product: ${result.error}`); // Notify the user on error
            }
        };

    };

    return (
        <div>
            {/* Form title */}
            <h1>Create Product</h1>
            {/* Form submission handler */}
            <form onSubmit={handleSubmit}>
                 {/* Input field for the product name */}
                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                 {/* Input field for uploading an image */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    required
                />
                 {/* Input field for the product price */}
                <input
                    type="text"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                {/* Dropdown for selecting a category */}
                <select
                    value={categoryTitle}
                    onChange={(e) => setCategoryTitle(e.target.value)}
                    required
                >
                    <option value="">Select a Category</option>
                    {categories.map((category) => (
                        <option key={category.categoryId} value={category.title}>
                            {category.title}
                        </option>
                    ))}
                </select>
                {/* Submit button */}
                <button type="submit">Create Product</button>
                {/* Reset button to clear the form */}
                <input type='reset' value="Reset"/>
            </form>
        </div>
    );
};

export default ProductForm;
