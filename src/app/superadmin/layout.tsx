import React from 'react';
import '../../styles/globals.css';
import ContentAreaSuperAdmin from '../../components/ContentAreaSuperAdmin';
import SidebarSuperAdmin from '../../components/SidebarSuperAdmin'

const SuperAdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>FriGo</title>
      </head>
      <body className=" bg-white tenxt-gray-800 overflow-auto">
        <div className="flex h-screen">
           {/* Sidebar */}
          <SidebarSuperAdmin/>

          {/* Main Content */}
          <main className="flex-1 flex flex-col">
          {/* Main Content */}
          <ContentAreaSuperAdmin title="Companies">{children}</ContentAreaSuperAdmin>
        </main>

          
        </div>
      </body>
    </html>
  );
};

export default SuperAdminLayout;
