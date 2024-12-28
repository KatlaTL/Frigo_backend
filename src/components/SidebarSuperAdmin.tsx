import React from 'react';
import Image from "next/image"; // Next.js component for optimized image rendering
import Link from "next/link"; // Next.js component for client-side navigation

/* --- TODO ---
This component has a lot of static elements and needs to be made more dynamic/functional.
1. Make link switch between roles - create a new component.
2. Log out functionality. 
*/

// The sidebar that should be seen when the superadmin logs into the admin panel
const Sidebar = () => {
  return (
              <aside className="bg-custom-blue text-white w-64 flex flex-col">
              <div className="px-4 py-6">
                <Image
                  src="/main-logo.svg" // Logo image
                  height={110} // Height of the logo
                  width={110} // Width of the logo
                  alt="Logo"
                />
                <p className="text-sm mt-1">By Pentia</p>
              </div>
              <nav className="flex flex-col items-center justify-center flex-1 px-4">
                <ul className="space-y-2">
                  <li>
                    <button className="bg-gradient px-12 py-2 rounded-3xl text-white text-sm w-full flex items-center gap-2">
                      <Image
                        src="/company-icon-white.svg" // Icon for the company in white (from Figma)
                        height={20} // Height of the icon
                        width={20} // Width of the icon
                        alt="Logo"
                      />
                      <span>Companies</span> {/* Text label for the button */}
                    </button>
                  </li>
                  <li>
                    <button className="bg-custom-blue px-12 py-2 rounded-3xl text-white text-sm w-full flex items-center gap-2">
                      <Image
                        src="/account-icon-white.svg" // Icon for the account in white (from Figma)
                        height={20} // Height of the icon
                        width={20} // Width of the icon
                        alt="Logo"
                      />
                      <span>My Account</span> {/* Text label for the button */}
                    </button>
                  </li>
                </ul>
              </nav>
              <div className="px-4 py-4 border-t border-blue-800">
                <p className="text-sm">Henrik Grove</p>
                <p className="text-sm text-blue-300">Super Admin</p>
                <Link href="/switch-role" className="text-sm text-blue-300 underline mt-2 block">
                  Switch to Company Admin
                </Link>
                <button className="mt-4 w-full py-2 text-sm bg-red-500 hover:bg-red-600 rounded-3xl">
                  Log out
                </button>
              </div>
            </aside>
  );
};

export default Sidebar;
