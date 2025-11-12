"use client";

import { useState } from "react";
import Image from "next/image";
import { Settings, X, ChevronDown, Bell } from "lucide-react";
import { Inter, Poppins } from "next/font/google";

// Placeholder imports (ensure paths exist)
// NOTE: Apnake ei path gulo thik korte hobe jodi apnar file structure alada hoy.
import Graph from "@/components/admin/Graph";
import KnowledgeView from "@/components/admin/Knowledge";
import Svg from "@/components/dashboard/Svg";
import UserManagementView from "@/components/admin/UserManagement";
import SettingsView from "@/components/admin/SettingsView";

// Image imports (ensure paths exist)
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

import Link from "next/link"; // useRouter import kora nei, karon ei code-e byabohito hoyni

// Fonts
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

// ----------------- NAV ITEMS -----------------
interface NavItem {
  name: string;
  icon: string;
}

const sidebarNavItems: NavItem[] = [
  { name: "Overview", icon: homeIcon },
  { name: "Knowledge", icon: knowledgeIcon },
  { name: "Users", icon: userIcon },
];

// ----------------- TEXTAREA COMPONENT -----------------
interface TextAreaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (val: string) => void;
  rows?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  placeholder,
  value = "",
  onChange,
  rows = 5,
}) => {
  const [text, setText] = useState<string>(value);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="text-gray-700 font-medium mb-2 text-[14px]">
          {label}
        </label>
      )}
      <textarea
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7F56D9] resize-none w-full text-[14px] text-gray-800"
      />
    </div>
  );
};

// ----------------- SIDEBAR -----------------
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
                  alt="Logo"
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
            <div className="flex items-center">
              {!isCollapsed && (
                <button
                  className="lg:hidden p-2 text-[#3D3D3A]"
                  onClick={() => toggleSidebar(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              )}
              <button
                className="hidden lg:inline-flex items-center p-2 text-gray-600"
                onClick={toggleCollapse}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <Svg />
              </button>
            </div>
          </div>

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
                      className={`absolute left-0 top-0 bottom-0 w-1 bg-[#7F56D9] rounded-l-md`}
                    />
                  )}
                  <div className="h-5 w-5 relative flex-shrink-0 mr-3 flex items-center justify-center">
                    <Image
                      src={item.icon}
                      alt={`${item.name} Icon`}
                      width={20}
                      height={20}
                      className={`object-contain ${
                        isActive
                          ? "opacity-100"
                          : "opacity-80 group-hover:opacity-100"
                      }`}
                    />
                  </div>
                  {!isCollapsed && (
                    <span className="text-[16px]">{item.name}</span>
                  )}
                </button>
              );
            })}

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
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#7F56D9] rounded-l-md" />
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

            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-2 text-[#3D3D3A]"
              >
                <ChevronDown className="h-4 w-4 text-[#3D3D3A] ml-2" />
              </button>

              {isDropdownOpen && (
                <div className="absolute bottom-full right-0 mb-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <ul>
                    <Link href="/">
                      <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                        Logout
                      </li>
                    </Link>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

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

// ----------------- NOTIFICATIONS PANEL COMPONENT (MODIFIED) -----------------
interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
}) => {
  const notifications = [
    { id: 1, message: "New user 'Alice' registered.", time: "5 min ago" },
    { id: 2, message: "Knowledge base updated.", time: "1 hour ago" },
    { id: 3, message: "Payment processed successfully.", time: "1 day ago" },
    {
      id: 4,
      message: "Weekly report available for download.",
      time: "2 days ago",
    },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-[60]"
          onClick={onClose}
        />
      )}

      {/* Notification Panel (Conditional Sliding) */}
      <div
        className={`fixed top-0 h-full w-full max-w-sm bg-white shadow-2xl z-[70] 
        transform transition-transform duration-300 ease-in-out

        /* Mobile (Default) - Slides from Right */
        right-0
        ${isOpen ? "translate-x-0" : "translate-x-full"}

        /* Desktop (lg: override) - Slides from Left */
        lg:left-0 lg:right-auto 
        ${isOpen ? "lg:translate-x-0" : "lg:-translate-x-full"}
        `}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#101828]">
            Notifications (3)
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 h-[calc(100%-65px)] overflow-y-auto">
          {notifications.length > 0 ? (
            <ul className="space-y-4">
              {notifications.map((notif, index) => (
                <li
                  key={notif.id}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    index < 3
                      ? "bg-[#F9F5FF] border border-[#7F56D9] shadow-sm"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <p className="text-sm font-medium text-[#101828]">
                    {notif.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-gray-500 py-10">
              No new notifications.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// ----------------- HEADER COMPONENTS -----------------
const DesktopHeader: React.FC<{
  user: string;
  role: string;
  toggleSidebar: (shouldOpen?: boolean) => void;
  toggleCollapse: () => void;
  isCollapsed: boolean;
  toggleNotifications: () => void;
}> = ({ user, role, toggleNotifications }) => (
  <header
    className="hidden lg:flex justify-between items-center w-full p-4 bg-white z-20 sticky top-0"
    style={{ borderBottom: "1.2px solid rgba(0,0,0,0.1)" }}
  >
    <div />
    <div className="flex items-center space-x-4 relative lg:right-5">
      <button
        className="relative cursor-pointer hover:opacity-90 mr-4"
        onClick={toggleNotifications}
        aria-label="Open notifications"
      >
        <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-[#7F56D9] text-white text-xs p-0 font-semibold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
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
      </button>
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

  // Placeholder components
  const PlaceholderView: React.FC<{ title: string }> = ({ title }) => (
    <div className="p-8 text-xl text-gray-600 h-screen">
      Content for <span className="font-semibold">{title}</span> goes here.
    </div>
  );

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

        {/* Assuming Graph is a component */}
        <div className="bg-white p-6 rounded-[14px] border-2 border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Sales Trends</h2>
          {/* Replace with actual Graph component if available */}
          <div className="h-64 flex items-center justify-center text-gray-400 border border-dashed rounded-lg">
            Placeholder for Graph Component
          </div>
          {/* <Graph /> */}
        </div>
        <div className="h-10" />

        {/* Textarea Section */}
        <div className="mt-8">
          <TextArea
            label="Your Notes"
            placeholder="Write something here..."
            onChange={(val) => console.log("Textarea value:", val)}
          />
        </div>
      </div>
    );
  } else if (activeItem === "Knowledge") {
    contentToRender = <PlaceholderView title="Knowledge View" />; // Replaced with Placeholder
  } else if (activeItem === "Users") {
    contentToRender = <PlaceholderView title="User Management View" />; // Replaced with Placeholder
  } else if (activeItem === "Settings") {
    contentToRender = <PlaceholderView title="Settings View" />; // Replaced with Placeholder
  } else {
    contentToRender = (
      <div className="p-8 text-xl text-gray-600 h-screen">
        Content for <span className="font-semibold">{activeItem}</span> goes
        here.
      </div>
    );
  }

  return <div className="flex-1">{contentToRender}</div>;
};

// ----------------- MAIN PAGE -----------------
export default function PageLayout() {
  const [activeItem, setActiveItem] = useState<string>("Overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  // Notifications state correctly handled with useState
  const [isNotificationsOpen, setIsNotificationsOpen] =
    useState<boolean>(false);

  const toggleSidebar = (shouldOpen?: boolean) => {
    if (typeof shouldOpen === "boolean") setIsSidebarOpen(shouldOpen);
    else setIsSidebarOpen((prev) => !prev);
  };

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  // Handlers for notifications
  const toggleNotifications = () => {
    setIsNotificationsOpen((prev) => !prev);
  };

  const closeNotifications = () => {
    setIsNotificationsOpen(false);
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
          toggleNotifications={toggleNotifications}
        />
        <MobileHeader toggleSidebar={toggleSidebar} />
        <div className="flex-1 overflow-y-auto">
          <DashboardView activeItem={activeItem} />
        </div>
      </div>

      {/* Notifications Panel Integration */}
      <NotificationPanel
        isOpen={isNotificationsOpen}
        onClose={closeNotifications}
      />
    </div>
  );
}
