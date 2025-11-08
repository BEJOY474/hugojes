"use client";

// Next/React Imports (Keeping only what is strictly necessary for the main component's structure)
import { Settings, LogOut, MessageSquare, BookOpen, X } from "lucide-react";
import Image from "next/image";
import { Inter, Poppins } from "next/font/google";

// --- Type Definitions ---
// Import React for typing ElementType
import React from "react";

// Type for a single navigation link item
type NavLinkItem = {
  href: string;
  text: string;
  icon: React.ElementType; // Type for Lucide icons
};

// Type for the main SideBar component props
type SideBarProps = {
  activeItem: string;
  setActiveItem: (item: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void; // Simplified toggleSidebar signature
};

// Load fonts
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

// Define NavLinks (Now typed)
const NavLinks: NavLinkItem[] = [
  { href: "/home", text: "Chats", icon: MessageSquare }, // Using MessageSquare for Chats
  { href: "/library", text: "Library", icon: BookOpen },
  { href: "/settings", text: "Settings", icon: Settings }, // Using Settings icon
];

// NOTE: SidebarItem component was not used in the final render logic
// and relied on next/link, while SideBar uses buttons and state.
// It has been removed for component cleanup.

const SideBar: React.FC<SideBarProps> = ({
  activeItem,
  setActiveItem,
  isSidebarOpen,
  toggleSidebar,
}) => {
  // Mock imports for pIcon, plusIcon, and Svg since they are external to this file
  // In a real project, these paths must be correct.
  const pIcon = "/placeholder/pIcon.svg";
  const plusIcon = "/placeholder/plusIcon.svg";
  const Svg = () => (
    <div className="text-gray-400 text-xs">SVG Placeholder</div>
  );

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white p-4 flex flex-col justify-between z-50 
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static lg:flex-shrink-0 shadow-sm`}
      >
        <div>
          <div className="flex items-center justify-between space-x-2 mb-8">
            <div className="flex items-center">
              <div className="h-8 w-8 relative">
                {/* Logo */}
                <Image
                  src={pIcon}
                  alt="Petrobasin Logo"
                  fill
                  style={{ objectFit: "contain" }}
                  unoptimized
                />
              </div>
              <span
                className={`${poppins.variable} italic text-xl font-semibold ml-1 text-[#3d3d3a]`}
              >
                Petrobasin
              </span>
            </div>

            {/* Close Button (mobile only) */}
            <button
              className="lg:hidden p-2 text-[#3D3D3A]"
              onClick={toggleSidebar}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Decorative SVG (desktop only) */}
            <div className="hidden lg:block">
              <Svg />
            </div>
          </div>

          {/* Navigation */}
          <nav className={`${inter.className} text-[16px] space-y-1`}>
            {/* New Chat Button (Always at the top) */}
            <button
              key="New Chat"
              onClick={() => {
                setActiveItem("New Chat");
                toggleSidebar();
              }}
              className={`flex items-center w-full px-3 py-2 text-[16px] transition-colors duration-150 rounded-md
                ${
                  activeItem === "New Chat"
                    ? "bg-[#F9F5FF] text-purple-700 font-semibold"
                    : "text-[#3D3D3A] hover:bg-gray-200"
                }`}
            >
              <div className="h-6 w-6 mr-3 relative flex-shrink-0 bg-[#3D3D3A] text-white rounded-full p-0.5 flex items-center justify-center">
                {/* Using Lucide icon for New Chat for consistency, but keeping image logic if required */}
                <Image
                  src={plusIcon}
                  alt="New Chat Icon"
                  fill
                  style={{ objectFit: "contain" }}
                  unoptimized
                />
              </div>
              New Chat
            </button>

            {/* Other nav items */}
            {NavLinks.map((item) => {
              // Extract the Icon component type
              const Icon = item.icon;
              return (
                <button
                  key={item.text}
                  onClick={() => {
                    setActiveItem(item.text);
                    toggleSidebar();
                  }}
                  className={`flex items-center w-full px-3 py-2 rounded-md text-[16px] transition-colors duration-150 ${
                    activeItem === item.text
                      ? "bg-[#F9F5FF] text-purple-700 font-semibold"
                      : "text-[#3D3D3A] hover:bg-gray-200"
                  }`}
                >
                  {/* Correctly rendering the Lucide Icon component */}
                  <Icon className="h-6 w-6 mr-3 flex-shrink-0 text-[#3D3D3A]" />
                  {item.text}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default SideBar;
