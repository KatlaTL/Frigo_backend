// Act as a client component
'use client'; 

import React, { useState } from 'react';
import AddNewCompany from '../../components/modals/AddNewCompany';
import TopNavigation from '../../components/TopNavigation';

// Define the type for the props passed to the CompanyClient component
interface CompaniesClientProps {
  companies: Array<{ 
    id: string; // Unique identifier for each company
    name: string; // Name of the company
    departments: number // Number of departments in the company
  }>;
}

// React functional component for managing and displaying companies
const CompanyClient: React.FC<CompaniesClientProps> = ({ companies }) => {
  // State that manages the visibility of the modal for adding a new company
  const [isModalOpen, setModalOpen] = useState(false);

  // Function to open the modal 
  const openModal = () => setModalOpen(true);
  // Function to close the modal
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      {/* Uses the TopNavigation component */}
      <TopNavigation title="Companies" onAddNewClick={openModal} />

      {/* Main Content */}
      <div className="space-y-4">
        {companies.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-500"> {/* Creates a table*/}
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th> {/* Creates a column for name */}
                <th scope="col" className="px-6 py-3">Departments</th> {/* Creates a column for departments */}
              </tr>
            </thead>
            <tbody> 
              {/* Map through the list of companies and render each one as a table row */}
              {companies.map((company) => (
                <tr key={company.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{company.name}</td> {/* Display the company names */}
                  <td className="px-6 py-4">{company.departments}</td> {/* Display the company departments */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No companies available.</p>  // If no companies is available/can be fetched this paragraph is displayed
        )}
      </div>

      {/* Uses the AddNewCompany component */}
      <AddNewCompany isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default CompanyClient;
