import { getAllCompanies } from "../repositories/companyRepository";
import { prisma } from '../lib/prisma';

// Contains business logic, transformations, and any additional operations based on application needs
// By having the service depend on the repository, business logic is encapsulated and centralized, keeping it separate from the raw data fetching layer. 

// Fetches all companies and returns the name and id of the companies by calling getAllCompanies
export const getAllCompaniesPanel = async () => {
    const companies = await getAllCompanies();
    return companies;
}

// Deletes a company based on the companyId
// This function uses Prisma directly since this action is not directly reusable for other parts of the application
export const deleteCompany = async (id: number) => {
    try {
        await prisma.company.delete({
            where: { companyId: id },
        });
        return { success: true}; 
    } catch (error) {
        console.error("Could not delete category:", error);
        return { success: false, error: error.message}
    }
}

// Creates a new company based on the company name
// This function uses Prisma directly since this action is not directly reusable for other parts of the application
export const createCompany = async (name: string) => {
    try {
        const newCompany = await prisma.company.create({
            data:{
                name,
            },
        });
        return { success: true, company: newCompany };
    } catch (error) {
        console.error("Could not create company:", error);
        return { success: false, error: error.message}
    }
}