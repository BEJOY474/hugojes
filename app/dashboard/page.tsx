// components/Sidebar.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Settings, X } from "lucide-react";
import { Inter, Poppins } from "next/font/google";
import pIcon from "@/public/image/dashboard/pIcon.svg";
import logOut from "@/public/image/dashboard/log-out.svg";
import plusIcon from "@/public/image/dashboard/plusIcon.svg";
import massageIcon from "@/public/image/dashboard/massageIcon.svg";
import fileIcon from "@/public/image/dashboard/fileIcon.svg";
import Svg from "@/components/dashboard/Svg";
import menuIcon from "@/public/image/dashboard/menu-outline.svg";
import MainContent from "@/components/dashboard/MainContent"; // Assuming MainContent is correctly typed or doesn't cause issues

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

// --- Type Definitions for Nav Items ---
interface NavItem {
  name: string;
  icon: string; // Assuming icon is a string path from the import
  content: string;
}

const navItems: NavItem[] = [
  {
    name: "Chats",
    icon: massageIcon as string, // Cast to string if needed, depending on how import resolves
    content: "This section shows your recent chat history.",
  },
  {
    name: "Library",
    icon: fileIcon as string, // Cast to string if needed
    content: "The Library stores useful resources and documents.",
  },
];

// --- SideBar Prop Interface (Crucial Fix) ---
interface SideBarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
  user: string;
  plan: string;
  isSidebarOpen: boolean;
  toggleSidebar: (shouldOpen?: boolean) => void; // Based on your toggleSidebar logic
}

const SideBar: React.FC<SideBarProps> = ({
  activeItem,
  setActiveItem,
  user,
  plan,
  isSidebarOpen,
  toggleSidebar,
}) => (
  <>
    {/* Sidebar */}
    <aside
      className={`fixed top-0 left-0 h-screen w-64 bg-white p-4 flex flex-col justify-between z-50 
      transition-transform duration-300 ease-in-out
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
      lg:translate-x-0 lg:static lg:flex-shrink-0`}
    >
      <div>
        <div className="flex items-center justify-between space-x-2 mb-8">
          <div className="flex items-center">
            <div className="h-8 w-8 relative">
              <Image
                src={pIcon}
                alt="Petrobasin Logo"
                fill
                style={{ objectFit: "contain" }}
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
            onClick={() => toggleSidebar(false)} // Pass false to close explicitly
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
          {/* New Chat */}
          <button
            key="New Chat"
            onClick={() => {
              setActiveItem("New Chat");
              toggleSidebar(false);
            }}
            className={`flex items-center w-full px-3 py-2 text-[16px] transition-colors duration-150 ${
              activeItem === "New Chat" ? "text-[#3D3D3A]" : "text-[#3D3D3A]"
            }`}
          >
            <div className="h-6 w-6 mr-3 relative flex-shrink-0 bg-[#3D3D3A] text-white rounded-full p-0.5">
              <Image
                src={plusIcon}
                alt="New Chat Icon"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            New Chat
          </button>

          {/* Other nav items */}
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActiveItem(item.name);
                toggleSidebar(false);
              }}
              className={`flex items-center w-full px-3 py-2 rounded-md text-[16px] transition-colors duration-150 ${
                activeItem === item.name
                  ? "bg-[#F9F5FF] text-[#3D3D3A]"
                  : "text-[#3D3D3A] hover:bg-gray-200"
              }`}
            >
              <div className="h-6 w-6 mr-3 relative flex-shrink-0">
                <Image
                  src={item.icon}
                  alt={`${item.name} Icon`}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              {item.name}
            </button>
          ))}

          {/* Recent Section */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className={`${inter.className} text-[12px] text-[#6d6d6d] mb-2`}>
              Recent
            </p>

            {["Recent 1", "Recent 2"].map((suffix) => (
              <button
                key={suffix}
                onClick={() => {
                  setActiveItem(
                    `Custom Tool Integration UI Fields - ${suffix}`
                  );
                  toggleSidebar(false);
                }}
                className={`flex items-center w-full py-2 px-3 rounded-md text-[13px] transition-colors duration-150 font-medium whitespace-nowrap ${
                  activeItem === `Custom Tool Integration UI Fields - ${suffix}`
                    ? "bg-[#F9F5FF] text-[#3D3D3A]"
                    : "text-[#3d3d3a] hover:bg-gray-100"
                }`}
              >
                Custom Tool Integration UI Fields
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Footer */}
      <div className="space-y-2">
        <div
          className="flex items-center justify-start text-gray-600 hover:text-indigo-700 cursor-pointer p-2 rounded-lg transition-colors duration-150"
          onClick={() => {
            setActiveItem("Settings"); // Update active item to "Settings"
            toggleSidebar(false); // Optionally close sidebar on click
          }}
        >
          <Settings className="h-5 w-5 mr-3" />
          <span className={`${inter.className} text-[16px] text-[#3D3D3A]`}>
            Settings
          </span>
        </div>

        <div className="flex items-center justify-between p-2">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-[#3D3D3A] flex items-center justify-center text-white font-bold text-sm mr-3">
              {user.charAt(0)}
            </div>
            <div>
              <p className="text-[16px] font-medium text-[#3D3D3A]">{user}</p>
              <p className="text-[12px] text-[#3D3D3A] font-light">{plan}</p>
            </div>
          </div>
          <button
            onClick={() => console.log("Logout")}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <div className="h-4 w-4 relative">
              <Image
                src={logOut}
                alt="Logout"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </button>
        </div>
      </div>
    </aside>

    {/* Mobile overlay */}
    {isSidebarOpen && (
      <div
        className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
        onClick={() => toggleSidebar(false)} // Pass false to close explicitly
      ></div>
    )}
  </>
);

// --- MobileHeader Prop Interface ---
interface MobileHeaderProps {
  toggleSidebar: (shouldOpen?: boolean) => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ toggleSidebar }) => (
  <header className="sticky top-0 left-0 w-full bg-white p-4 border-b border-gray-200 flex items-center justify-between lg:hidden z-30 shadow-sm">
    <button
      onClick={() => toggleSidebar(true)} // Pass true to open explicitly
      className="p-2 text-[#3D3D3A]"
      aria-label="Open menu"
    >
      <div className="h-6 w-6 relative">
        <Image
          src={menuIcon}
          alt="Menu Icon"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    </button>

    <div className="flex items-center flex-grow justify-center -ml-8">
      <div className="h-8 w-8 relative">
        <Image
          src={pIcon}
          alt="Petrobasin Logo"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <span
        className={`${poppins.variable} italic text-xl font-semibold ml-1 text-[#3d3d3a]`}
      >
        Petrobasin
      </span>
    </div>

    <div className="w-8"></div>
  </header>
);

interface MainContentProps {
  activeItem: string;
  contentMap: { [key: string]: string | null };
  setActiveItem: (item: string) => void;
}

const contentMap = {
  "New Chat": null,
  Chats: "Welcome to the Chats section. View your conversation history here.",
  Library:
    "Welcome to the Library. Access all your saved documents and resources.",
  Settings: "Welcome to the Settings page.",
  "Custom Tool Integration UI Fields":
    "Configure the UI fields for your custom tool integrations in this section.",
  "Custom Tool Integration UI Fields - Recent 1":
    "Details for the first recent custom tool integration.",
  "Custom Tool Integration UI Fields - Recent 2":
    "Details for the second recent custom tool integration.",
};

export default function PageLayout() {
  // Explicitly typing useState generic argument for better type safety
  const [activeItem, setActiveItem] = useState<string>("New Chat");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Defining the type for the toggleSidebar function
  const toggleSidebar = (shouldOpen?: boolean): void => {
    if (typeof shouldOpen === "boolean") setIsSidebarOpen(shouldOpen);
    else setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F9FA]">
      {/* Sidebar (fixed) */}
      <SideBar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        user="Boni"
        plan="Demo plan"
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Right side scrollable area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <MobileHeader toggleSidebar={toggleSidebar} />
        {/* Assuming MainContent takes these props */}
        <MainContent
          activeItem={activeItem}
          contentMap={contentMap}
          setActiveItem={setActiveItem}
        />
      </div>
    </div>
  );
}
