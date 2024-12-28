import { revalidatePath } from "next/cache";
import { getAllCategoriesPanel, deleteCategory, createCategory } from "../../services/categoryService";
import React from "react";

/* --- TODO ---
1. Only the basic functionality has been implemented, the UI must therefore be made based
on the Figma design.
*/

// Category page component, when /categories is written in the url this page will be displayed
const Category = async () => {

  // Fetch data directly in the server component
  const categories = await getAllCategoriesPanel();

   // Define the server action for creating a category
   async function handleCreateCategory(formData: FormData) {
    "use server";

    const title = formData.get("title") as string; // Get the title from the form data

    // Call the createCategory service function
    const result = await createCategory(title);

    if (result.success) {
      revalidatePath("/categories"); // Revalidate to fetch the new category list
    } else {
      throw new Error(result.error || "Failed to create category.");
    }
  }

  // Define the server action explicitly with "use server"
  async function handleDelete(formData: FormData) {
    "use server"; // Mark this as a server action

    // Convert categoryId from string to number
    const id = Number(formData.get("categoryId"));

    const result = await deleteCategory(id);
  
      // Trigger a revalidation of this route to update the list of categories
      if (result.success) {
        revalidatePath("/categories"); // Ensure the page re-renders with the updated data
      } else {
        throw new Error(result.error || "Failed to delete category.");
      }
    }

  // Displays all categories by their title
  return (
    <div>
      <h1>Categories</h1>
      {/* Form for creating a new category */}
      <form action={handleCreateCategory}>
        <input type="text" name="title" placeholder="Enter category" required/>
        <button type="submit">Create category</button>
      </form>
      
      <ul>
        {categories.map((category) => (
          <li key={category.categoryId}>
            {category.title}
            {/* Form for deleting a category */}
            <form action={handleDelete}>
              <input type="hidden" name="categoryId" value={category.categoryId}/>
              <button type="submit">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
