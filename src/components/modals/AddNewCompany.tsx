import React, { useEffect, useRef } from 'react';

// Define the props for the AddNewCompany component
interface AddNewCompanyProps {
  isOpen: boolean; // Determines whether the dialog is open or closed
  onClose: () => void; // Callback function to handle closing the dialog
}

// AddNewCompany component definition
const AddNewCompany: React.FC<AddNewCompanyProps> = ({ isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null); // Reference to the dialog element

  // Handle opening and closing the dialog
  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen) {
        dialogRef.current.showModal(); // Open the dialog
      } else {
        dialogRef.current.close(); // Close the dialog
      }
    }
  }, [isOpen]); // Re-run the effect whenever isOpen changes

  return (
    <dialog
      ref={dialogRef} // Attach the dialogRef to the <dialog> element
      className="rounded-lg p-6 bg-white w-full min-w-[200px] max-w-[300px] shadow-lg border border-gray-200 relative"
    >
      {/* Close Button */}
      <button
        onClick={onClose} // Call onClose when the button is clicked
        className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 flex items-center gap-2"
      >
        <span className="text-lg">←</span> {/* Left arrow symbol */}
        <span>Go back</span> {/* Text for the close button */}
      </button>

      {/* Title */}
      <h2 className="text-2xl font-bold text-slate-800 mt-8 text-center">
        What do you want to add?
      </h2>
      <p className="text-center text-gray-600 mt-2">
        Click on one of the options below.
      </p>

      {/* Options */}
      <div className="flex justify-center gap-6 mt-6">
        {/* Company Option */}
        <button className="bg-blue-100 border border-blue-500 text-blue-600 p-6 rounded-lg w-50 shadow hover:bg-blue-200 flex flex-col items-center">
          <span className="text-lg font-medium">Company</span> {/* Button label */}
          <img
            src="/company-icon-black.svg"  // Icon for the "Company" option
            alt="Company Icon"
            className="mt-2 h-10 w-10" // Styling for the icon
          />
        </button>

        {/* Department Option */}
        <button className="bg-gray-100 border border-gray-300 text-gray-700 p-6 rounded-lg w-50 shadow hover:bg-gray-200 flex flex-col items-center">
          <span className="text-lg font-medium">Department</span> {/* Button label */}
          <img
            src="/department-icon-black.svg" // Icon for the "Department" option
            alt="Department Icon"
            className="mt-2 h-10 w-10" // Styling for the icon
          />
        </button>
      </div>

      {/* Continue Button */}
      <button
        onClick={() => console.log('Continue clicked')} // Placeholder functionality for the Continue button
        className="mt-8 bg-blue-500 hover:bg-blue-600 text-black py-2 px-8 rounded-lg block mx-auto text-center font-medium"
      >
        Continue →
      </button>
    </dialog>
  );
};

export default AddNewCompany;
