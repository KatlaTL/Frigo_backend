import { prisma } from '../lib/prisma';

// Handles direct communication with the database
// The repository only returns data without any transformation or extra logic

export const getAllCompanies = async () => {
    // Fetches all companies with only the needed fields
    return prisma.company.findMany({
        select: { companyId: true, name: true },
    });
}