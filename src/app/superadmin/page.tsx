// Acts as a server component
import { getAllCompaniesPanel } from '@/services/companyService';
import CompanyClient from './CompanyClient'; 

export default async function CompaniesPage() {
    // Fetch data for companies
    const rawCompanies = await getAllCompaniesPanel();

    // Transform data to match the expected shape
    const companies = rawCompanies.map((company: { companyId: number; name: string }) => ({
      id: company.companyId.toString(), // Convert companyId to a string
      name: company.name, // Keep the company name as it is
      departments: 0, // Default departments to 0 if not provided
    }));

    // Pass the transformed companies array as a prop to the CompanyClient component
  return (
      <CompanyClient companies={companies} />
  );
}
