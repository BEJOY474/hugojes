// components/Sidebar.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Settings, X, LogOut as LogOutIcon } from "lucide-react";
import { Inter, Poppins } from "next/font/google";
import { useRouter } from "next/navigation"; // New import for navigation
import pIcon from "@/public/image/dashboard/pIcon.svg";
import logOut from "@/public/image/dashboard/log-out.svg";
import plusIcon from "@/public/image/dashboard/plusIcon.svg";
import massageIcon from "@/public/image/dashboard/massageIcon.svg";
import fileIcon from "@/public/image/dashboard/fileIcon.svg";
import Svg from "@/components/dashboard/Svg"; // Assuming Svg component exists
import menuIcon from "@/public/image/dashboard/menu-outline.svg";
import MainContent from "@/components/dashboard/MainContent"; // Assuming MainContent exists
// NOTE: For this to truly resolve the issue, the MainContentProps interface
// MUST be correctly defined and exported in "@/components/dashboard/MainContent.tsx"
// with the 'isSidebarCollapsed: boolean;' property.

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
  icon: string;
  content: string;
}

const navItems: NavItem[] = [
  {
    name: "Chats",
    icon: massageIcon as string,
    content: "This section shows your recent chat history.",
  },
  {
    name: "Library",
    icon: fileIcon as string,
    content: "The Library stores useful resources and documents.",
  },
];

// --- SideBar Prop Interface (Updated) ---
interface SideBarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
  user: string;
  plan: string;
  isSidebarOpen: boolean;
  toggleSidebar: (shouldOpen?: boolean) => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
  // NEW PROP
  openLogoutModal: () => void;
}

const SideBar: React.FC<SideBarProps> = ({
  activeItem,
  setActiveItem,
  user,
  plan,
  isSidebarOpen,
  toggleSidebar,
  isCollapsed,
  toggleCollapse,
  openLogoutModal, // Destructure new prop
}) => (
  <>
    {/* Sidebar */}
    <aside
      // --- COLLAPSIBLE WIDTH & TRANSITION ---
      className={`fixed top-0 left-0 h-screen p-4 flex flex-col justify-between z-50 
			transition-all duration-300 ease-in-out
			${isCollapsed ? "w-20" : "w-64"} 
			${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
			bg-white border-r border-gray-200
			lg:translate-x-0 lg:static lg:flex-shrink-0
			`}
    >
      <div>
        <div
          // Logo/Title container class updated for alignment in collapsed state
          className={`flex items-center space-x-2 mb-8 ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          <div className="flex items-center">
            <div className="h-8 w-8 relative flex-shrink-0">
              <Image
                src={pIcon}
                alt="Petrobasin Logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            {/* Title text hidden when collapsed */}
            <span
              className={`${
                poppins.variable
              } italic text-xl font-semibold ml-1 text-[#3d3d3a] 
							${isCollapsed ? "hidden" : "block"} transition-opacity duration-300`}
            >
              Petrobasin
            </span>
          </div>

          {/* Close Button (mobile only) */}
          <button
            className="lg:hidden p-2 text-[#3D3D3A]"
            onClick={() => toggleSidebar(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Svg Toggle Button (desktop only) */}
          <button
            onClick={toggleCollapse} // The collapse trigger
            className={`hidden lg:block p-1 rounded-full text-[#3D3D3A] hover:bg-gray-100 transition-colors ${
              isCollapsed ? "hidden" : "block"
            }`}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Svg />
          </button>
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
            // Adjusted layout for collapsed state
            className={`flex items-center w-full ${
              isCollapsed ? "justify-center" : "px-3"
            } py-2 text-[16px] transition-colors duration-150 rounded-md
						${
              activeItem === "New Chat"
                ? "bg-[#e5e7eb] text-[#3D3D3A]"
                : "text-[#3D3D3A] hover:bg-gray-100"
            }
						`}
          >
            <div
              className={`h-6 w-6 relative flex-shrink-0 bg-[#3D3D3A] text-white rounded-full ${
                isCollapsed ? "p-0.5" : "p-0.5 mr-3"
              }`}
            >
              <Image
                src={plusIcon}
                alt="New Chat Icon"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            {/* Text hidden when collapsed */}
            <span
              className={`${
                isCollapsed ? "hidden" : "block"
              } whitespace-nowrap`}
            >
              New Chat
            </span>
          </button>

          {/* Other nav items */}
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActiveItem(item.name);
                toggleSidebar(false);
              }}
              // Adjusted layout for collapsed state
              className={`flex items-center w-full ${
                isCollapsed ? "justify-center" : "px-3"
              } py-2 rounded-md text-[16px] transition-colors duration-150 ${
                activeItem === item.name
                  ? "bg-[#F9F5FF] text-[#7F56D9]"
                  : "text-[#3D3D3A] hover:bg-gray-200"
              }`}
            >
              <div
                className={`h-6 w-6 relative flex-shrink-0 ${
                  isCollapsed ? "" : "mr-3"
                }`}
              >
                <Image
                  src={item.icon}
                  alt={`${item.name} Icon`}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              {/* Text hidden when collapsed */}
              <span
                className={`${
                  isCollapsed ? "hidden" : "block"
                } whitespace-nowrap`}
              >
                {item.name}
              </span>
            </button>
          ))}

          {/* Recent Section */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            {/* Title hidden when collapsed */}
            <p
              className={`${inter.className} text-[12px] text-[#6d6d6d] mb-2 ${
                isCollapsed ? "hidden" : "block"
              }`}
            >
              Recent
            </p>

            {/* Recent Items are hidden when collapsed */}
            <div className={isCollapsed ? "hidden" : "block"}>
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
                    activeItem ===
                    `Custom Tool Integration UI Fields - ${suffix}`
                      ? "bg-[#F9F5FF] text-[#3D3D3A]"
                      : "text-[#3d3d3a] hover:bg-gray-100"
                  }`}
                >
                  Custom Tool Integration UI Fields
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Footer */}
      <div className="space-y-2">
        {/* Settings Button */}
        <div
          className={`flex items-center cursor-pointer rounded-lg transition-colors duration-150 p-2 
						${isCollapsed ? "justify-center" : "justify-start p-2"} 
						text-gray-600 hover:text-indigo-700`}
          onClick={() => {
            setActiveItem("Settings");
            toggleSidebar(false);
          }}
        >
          <Settings className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} />
          {/* Text hidden when collapsed */}
          <span
            className={`${inter.className} text-[16px] text-[#3D3D3A] ${
              isCollapsed ? "hidden" : "block"
            }`}
          >
            Settings
          </span>
        </div>

        {/* User Info & Logout */}
        <div
          className={`flex items-center justify-between p-2 border-t border-gray-200
						${isCollapsed ? "flex-col p-2" : "flex-row"}
						`}
        >
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-[#3D3D3A] flex items-center justify-center text-white font-bold text-sm mr-3 flex-shrink-0">
              {user.charAt(0)}
            </div>
            {/* User details hidden when collapsed */}
            <div className={isCollapsed ? "hidden" : "block"}>
              <p className="text-[16px] font-medium text-[#3D3D3A]">{user}</p>
              <p className="text-[12px] text-[#3D3D3A] font-light">{plan}</p>
            </div>
          </div>
          {/* UPDATED: Logout button to open the modal */}
          <button
            onClick={openLogoutModal}
            className="text-gray-400 hover:text-gray-600 p-1 flex-shrink-0"
            aria-label="Logout"
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
        onClick={() => toggleSidebar(false)}
      ></div>
    )}
  </>
);

// --- LogoutModal Component (NEW) ---
interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogout = () => {
    // Perform any client-side cleanup (e.g., clear localStorage, state)
    console.log("Logging out and redirecting...");
    router.push("/login"); // Navigate to the /login route
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-[100] flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4 p-6">
        <div className="flex flex-col items-center">
          <LogOutIcon className="h-10 w-10 text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Confirm Logout
          </h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Are you sure you want to log out of your account?
          </p>
          <div className="flex w-full space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Yes, Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MobileHeader Component ---
interface MobileHeaderProps {
  toggleSidebar: (shouldOpen?: boolean) => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ toggleSidebar }) => (
  <header className="sticky top-0 left-0 w-full bg-white p-4 border-b border-gray-200 flex items-center justify-between lg:hidden z-30 shadow-sm">
    <button
      onClick={() => toggleSidebar(true)}
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

// --- PageLayout Component (The main application wrapper) ---
export default function PageLayout() {
  const [activeItem, setActiveItem] = useState<string>("New Chat");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false); // State for collapse
  // NEW STATE for the modal
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

  const toggleSidebar = (shouldOpen?: boolean): void => {
    if (typeof shouldOpen === "boolean") setIsSidebarOpen(shouldOpen);
    else setIsSidebarOpen((prev) => !prev);
  };

  const toggleCollapse = (): void => {
    setIsCollapsed((prev) => !prev); // Function to toggle collapse
  };

  // NEW FUNCTIONS for the modal
  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  return (
    // Changed h-screen to min-h-screen for better content flow, keeping flex structure
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Sidebar */}
      <SideBar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        user="Boni"
        plan="Demo plan"
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isCollapsed={isCollapsed}
        toggleCollapse={toggleCollapse}
        openLogoutModal={openLogoutModal} // Pass the new function
      />

      {/* Right side scrollable area */}
      {/* FIX APPLIED: Removed the conditional lg:ml- classes. flex-1 handles the remaining space. */}
      <div className="flex-1 flex flex-col overflow-y-auto transition-all duration-300 ease-in-out">
        <MobileHeader toggleSidebar={toggleSidebar} />
        <MainContent
          activeItem={activeItem}
          contentMap={contentMap}
          setActiveItem={setActiveItem}
          // This prop is now relying on the imported type
        />
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutModal isOpen={isLogoutModalOpen} onClose={closeLogoutModal} />
    </div>
  );
}
