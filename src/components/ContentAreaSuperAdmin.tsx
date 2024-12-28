import React from 'react';
// The content area for the super admin
// This content area could also be used by company admin or maybe there should be multiple content area components

// Define the props interface for the ContentArea component
interface ContentAreaProps {
  title: string; // Title to describe the content area
  children: React.ReactNode; // Dynamic content to be displayed inside the content area
}

// Functional component for rendering a flexible content area
const ContentArea: React.FC<ContentAreaProps> = ({ title, children }) => {
  return (
    <div className="flex-1 flex flex-col">
      {/* Content */}
      <div className="flex-1 bg-white px-6 py-4 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default ContentArea;
