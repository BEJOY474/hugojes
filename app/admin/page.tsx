"use client";

import { useState } from "react";
import Image from "next/image";
import { Settings, X, Search, Eye, Edit, Trash2, Plus } from "lucide-react"; // Added lucide icons
import { Inter, Poppins } from "next/font/google";

// --- Placeholder Imports for components you didn't provide ---
// NOTE: You must ensure these files exist in your project structure.
import Graph from "@/components/admin/Graph";
import KnowledgeView from "@/components/admin/Knowledge";
import Svg from "@/components/dashboard/Svg";
import UserManagementView from "@/components/admin/UserManagement"; // <-- NEW IMPORT

// --- Image Imports (ensure paths are correct) ---
import pIcon from "@/public/image/dashboard/pIcon.svg";
import menuIcon from "@/public/image/dashboard/menu-outline.svg";
import userIcon from "@/public/image/Admin/Icon (1).svg";
import knowledgeIcon from "@/public/image/Admin/Icon (2).svg";
import activeUserIcon from "@/public/image/Admin/Icon (3).svg";
import growthIcon from "@/public/image/Admin/grouth.svg";
import growthIconBlue from "@/public/image/Admin/Icon (4).svg";
import homeIcon from "@/public/image/Admin/home.svg";
import userImage from "@/public/image/Admin/userIcon.jpg";
import bellIcon from "@/public/image/Admin/bell.svg";

// --- Font Definitions ---
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

// --- Interface Definitions ---
interface NavItem {
  name: string;
  icon: string;
}

const sidebarNavItems: NavItem[] = [
  { name: "Overview", icon: homeIcon },
  { name: "Knowledge", icon: knowledgeIcon },
  { name: "Users", icon: userIcon },
];

interface SideBarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
  user: string;
  plan: string;
  role: string;
  isSidebarOpen: boolean;
  isCollapsed: boolean;
  toggleSidebar: (shouldOpen?: boolean) => void;
  toggleCollapse: () => void;
}

// ----------------- SIDEBAR COMPONENT -----------------
const SideBar: React.FC<SideBarProps> = ({
  activeItem,
  setActiveItem,
  user,
  plan,
  isSidebarOpen,
  isCollapsed,
  toggleSidebar,
  toggleCollapse,
}) => {
  // classes change when collapsed
  const baseWidthClass = isCollapsed ? "w-20" : "w-64";
  const itemPadding = isCollapsed ? "py-3 px-2" : "py-2 px-3";

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-screen bg-white p-4 flex flex-col justify-between z-50 
        transition-all duration-300 ease-in-out 
        ${baseWidthClass}
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static lg:flex-shrink-0`}
        style={{ borderRight: "1px solid rgba(0,0,0,0.04)" }}
      >
        <div>
          {/* Header */}
          <div
            className={`flex items-center justify-between mb-8 pr-2 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div
              className={`flex items-center ${isCollapsed ? "space-x-0" : ""}`}
            >
              <div className="h-6 w-6 relative flex-shrink-0 mr-1">
                <Image
                  src={pIcon}
                  alt="Petrobasin Logo"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              {!isCollapsed && (
                <span
                  className={`${poppins.variable} italic text-xl font-semibold text-[#3d3d3a]`}
                >
                  Petrobasin
                </span>
              )}
            </div>

            {/* Close button for small screens and collapse toggle */}
            <div className="flex items-center">
              {!isCollapsed && (
                <button
                  className="lg:hidden p-2 text-[#3D3D3A]"
                  onClick={() => toggleSidebar(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              )}
              {/* collapse toggle inside sidebar (small icon) */}
              <button
                className="hidden lg:inline-flex items-center p-2 text-gray-600"
                onClick={toggleCollapse}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                title={isCollapsed ? "Expand" : "Collapse"}
              >
                <Svg />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className={`${inter.className} text-[16px] space-y-1`}>
            {sidebarNavItems.map((item) => {
              const isActive = activeItem === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveItem(item.name);
                    toggleSidebar(false);
                  }}
                  className={`flex items-center w-full ${itemPadding} rounded-md transition-colors duration-150 relative group
                  ${
                    isActive
                      ? "bg-[#F9F5FF] text-[#7F56D9] font-medium"
                      : "text-[#3d3d3a] hover:bg-gray-100"
                  }`}
                  title={isCollapsed ? item.name : undefined}
                >
                  {isActive && (
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 bg-[#7F56D9] rounded-l-md ${
                        isCollapsed ? "left-0" : ""
                      }`}
                    />
                  )}
                  <div className="h-5 w-5 relative flex-shrink-0 mr-3 flex items-center justify-center">
                    <Image
                      src={item.icon}
                      alt={`${item.name} icon`}
                      fill
                      className={
                        isActive ? "filter-none" : "filter grayscale opacity-70"
                      }
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  {!isCollapsed && (
                    <span className="text-[16px]">{item.name}</span>
                  )}
                </button>
              );
            })}

            {/* Settings */}
            <button
              onClick={() => setActiveItem("Settings")}
              className={`flex items-center w-full ${itemPadding} mt-4 rounded-md transition-colors duration-150 relative group
              ${
                activeItem === "Settings"
                  ? "bg-[#F9F5FF] text-[#7F56D9] font-medium"
                  : "text-[#3d3d3a] hover:bg-gray-100"
              }`}
              title={isCollapsed ? "Settings" : undefined}
            >
              {activeItem === "Settings" && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#7F56D9] rounded-l-md"></div>
              )}
              <Settings
                className={`h-5 w-5 flex-shrink-0 ${
                  activeItem === "Settings" ? "text-[#7F56D9]" : "text-gray-500"
                } mr-3`}
              />
              {!isCollapsed && <span className="text-[16px]">Settings</span>}
            </button>
          </nav>
        </div>

        {/* Footer */}
        <div className="space-y-2 border-t border-gray-200 pt-4">
          <div
            className={`flex items-center justify-between p-2 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div
              className={`flex items-center ${isCollapsed ? "flex-col" : ""}`}
            >
              <div className="h-8 w-8 rounded-full bg-[#7F56D9] flex items-center justify-center text-white font-bold text-sm mr-3 flex-shrink-0">
                {user.charAt(0)}
              </div>
              {!isCollapsed && (
                <div>
                  <p className="text-[16px] font-medium text-[#101828]">
                    {user}
                  </p>
                  <p className="text-[12px] text-gray-500 font-light">{plan}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile when open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={() => toggleSidebar(false)}
        />
      )}
    </>
  );
};

// ----------------- STATS DATA & CARD -----------------

const statsData = [
  {
    title: "Total Users",
    value: "2,543",
    change: "+12% from last month",
    icon: userIcon,
    color: "text-[#4a5565]",
  },
  {
    title: "Total Knowledge",
    value: "1,234",
    change: "+8% from last month",
    icon: knowledgeIcon,
    color: "text-[#4a5565]",
  },
  {
    title: "Active Users",
    value: "892",
    change: "+23% from last month",
    icon: activeUserIcon,
    color: "text-[#4a5565]",
  },
  {
    title: "Monthly Growth",
    value: "15.3%",
    change: "+4.2% from last month",
    icon: growthIconBlue,
    color: "text-[#4a5565]",
  },
];

const StatCard: React.FC<{
  title: string;
  value: string;
  change: string;
  icon: string;
  color: string;
}> = ({ title, value, change, icon }) => (
  <div className="bg-white p-6 rounded-[14px] border-2 border-gray-200 flex flex-col justify-between">
    <div className="flex justify-between items-start mb-2">
      <h3
        className={`${inter.className} text-[16px] font-medium text-gray-700`}
      >
        {title}
      </h3>
      <div className="w-10 h-10 relative flex-shrink-0 p-3 bg-gray-100 rounded-lg">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image src={icon} alt={`${title} Icon`} height={20} width={20} />
        </div>
      </div>
    </div>
    <div className="mt-2">
      <p
        className={`${inter.className} text-3xl font-semibold text-[#101828] mb-1`}
      >
        {value}
      </p>
      <p
        className={`${inter.className} text-[16px] font-medium text-[#00a63e] flex items-center`}
      >
        <span className="mr-1 inline-block text-[14px] text-[#00a63e]">
          <Image
            src={growthIcon}
            alt={`${title} Growth`}
            height={20}
            width={20}
          />
        </span>
        {change}
      </p>
    </div>
  </div>
);

// ----------------- HEADER COMPONENTS -----------------

const DesktopHeader: React.FC<{
  user: string;
  role: string;
  toggleSidebar: (shouldOpen?: boolean) => void;
  toggleCollapse: () => void;
  isCollapsed: boolean;
}> = ({ user, role, toggleSidebar, toggleCollapse, isCollapsed }) => (
  <header
    className="hidden lg:flex justify-between items-center w-full p-4 bg-white z-20 sticky top-0"
    style={{ borderBottom: "1.2px solid rgba(0, 0, 0, 0.1)" }}
  >
    {/* left side: keep empty or logo placeholder */}
    <div />

    {/* center / right group */}
    <div className="flex items-center space-x-4 relative lg:right-5">
      <div className="relative cursor-pointer hover:opacity-90 mr-4">
        <div
          className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 
          bg-[#7F56D9] text-white text-xs p-0 font-semibold rounded-full 
          h-5 w-5 flex items-center justify-center border-2 border-white"
        >
          3
        </div>
        <div className="h-6 w-6 relative flex-shrink-0">
          <Image
            src={bellIcon}
            alt="Notifications"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      <div className="flex items-center cursor-pointer">
        <div className="h-8 w-8 rounded-full relative mr-2 flex-shrink-0">
          <Image
            src={userImage}
            alt={`${user} Profile`}
            fill
            className="rounded-full"
          />
        </div>
        <div className={`${inter.className} flex flex-col text-right`}>
          <p className="text-left text-[16px] font-semibold text-[#101828]">
            {user}
          </p>
          <p className="text-[14px] text-left text-gray-500 font-light">
            {role}
          </p>
        </div>
      </div>

      {/* small rectangle button on the right (replicates provided image) */}
    </div>
  </header>
);

const MobileHeader: React.FC<Pick<SideBarProps, "toggleSidebar">> = ({
  toggleSidebar,
}) => (
  <header className="sticky top-0 left-0 w-full bg-white p-4 border-b border-gray-200 flex items-center justify-start lg:hidden z-30 shadow-sm">
    <button
      onClick={() => toggleSidebar(true)}
      className="p-2 text-[#3D3D3A] z-10"
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

    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <span
        className={`${poppins.variable} italic text-xl font-semibold text-[#3d3d3a]`}
      >
        Petrobasin
      </span>
    </div>
  </header>
);

// ----------------- DASHBOARD VIEW -----------------

const DashboardView: React.FC<{ activeItem: string }> = ({ activeItem }) => {
  let contentToRender;

  if (activeItem === "Overview") {
    contentToRender = (
      <div className="p-4 lg:p-8 bg-[#F8F9FA]">
        <div className="mt-4 mb-8">
          <h1
            className={`${inter.className} text-[32px] font-semibold text-[#101828]`}
          >
            Dashboard
          </h1>
          <p className={`${inter.className} text-[16px] text-gray-500`}>
            Welcome back! Here's what's happening with your platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <Graph />
        <div className="h-48" />
      </div>
    );
  } else if (activeItem === "Knowledge") {
    contentToRender = <KnowledgeView />;
  } else if (activeItem === "Users") {
    // Renders the User Management screen
    contentToRender = <UserManagementView />;
  } else {
    contentToRender = (
      <div className="p-8 text-xl text-gray-600">
        Content for <span className="font-semibold">{activeItem}</span> goes
        here.
      </div>
    );
  }

  return <div className="flex-1">{contentToRender}</div>;
};

// ----------------- MAIN PAGE LAYOUT -----------------

export default function PageLayout() {
  const [activeItem, setActiveItem] = useState<string>("Overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const toggleSidebar = (shouldOpen?: boolean): void => {
    if (typeof shouldOpen === "boolean") setIsSidebarOpen(shouldOpen);
    else setIsSidebarOpen((prev) => !prev);
  };

  const toggleCollapse = (): void => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
      <SideBar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        user="Leo"
        plan="Free plan"
        role="Administrator"
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isCollapsed={isCollapsed}
        toggleCollapse={toggleCollapse}
      />

      <div className="flex-1 flex flex-col">
        <DesktopHeader
          user="Leo"
          role="Administrator"
          toggleSidebar={toggleSidebar}
          toggleCollapse={toggleCollapse}
          isCollapsed={isCollapsed}
        />
        <MobileHeader toggleSidebar={toggleSidebar} />

        <div className="flex-1 overflow-y-auto">
          <DashboardView activeItem={activeItem} />
        </div>
      </div>
    </div>
  );
}
