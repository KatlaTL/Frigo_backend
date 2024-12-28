import '../styles/globals.css';

// Metadata for the application
export const metadata = {
  title: 'FriGo', // Title of the application displayed in the browser tab
  description: 'Admin Panel for FriGo',
};

// Root layout component
// This component wraps the entire application, providing a consistent structure and layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode; // Props type indicating that this component expects React children
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="bg-gradient tenxt-gray-800">{children}</body>
    </html>
  );
}
