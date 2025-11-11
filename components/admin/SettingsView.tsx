"use client";

import React, { useState, useRef } from "react";
import { Settings, Upload, Save } from "lucide-react";
import { Inter } from "next/font/google";
import SecuritySetting from "@/components/admin/SecuritySetting";
import NotificationView from "@/components/admin/NotoficationView";
import ApiIntregation from "@/components/admin/ApiIntregation";

// --- Font Definitions ---
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// --- Tabs Data ---
const settingsTabs = [
  "General",
  "Security",
  "Notifications",
  "API Integrations",
];

const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("General");
  const [platformName, setPlatformName] = useState<string>("PetroBasin");
  const [supportEmail, setSupportEmail] = useState<string>(
    "support@petrobasin.com"
  );

  // --- Ref for file input ---
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveChanges = () => {
    console.log("Saving changes...", { platformName, supportEmail, activeTab });
    alert("Settings saved! (Placeholder)");
  };

  // --- General Settings Tab Content ---
  const GeneralSettingsContent = (
    <div className="pt-6 bg-white p-4 sm:p-6 rounded-[14px] border-[1.2px] border-black/10">
      <h3
        className={`${inter.className} text-[16px] font-medium text-[#0a0a0a] mb-3`}
      >
        General Settings
      </h3>
      <p className={`${inter.className} text-base text-gray-600 mb-8`}>
        Manage your platform's basic information
      </p>

      {/* Platform Name Field */}
      <div className="mb-8">
        <label
          htmlFor="platform-name"
          className={`${inter.className} block text-sm font-medium text-[#3d3d3a] mb-2`}
        >
          Platform Name
        </label>
        <input
          id="platform-name"
          type="text"
          value={platformName}
          onChange={(e) => setPlatformName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-[#101828] bg-gray-50 focus:ring-2 focus:ring-[#7F56D9] focus:border-[#7F56D9] outline-none transition duration-150"
          placeholder="Enter platform name"
        />
      </div>

      {/* Support Email Field */}
      <div className="mb-8">
        <label
          htmlFor="support-email"
          className={`${inter.className} block text-sm font-medium text-[#3d3d3a] mb-2`}
        >
          Support Email
        </label>
        <input
          id="support-email"
          type="email"
          value={supportEmail}
          onChange={(e) => setSupportEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-[#101828] bg-gray-50 focus:ring-2 focus:ring-[#7F56D9] focus:border-[#7F56D9] outline-none transition duration-150"
          placeholder="Enter support email"
        />
      </div>

      {/* Platform Logo Upload */}
      <div className="mb-8">
        <label
          htmlFor="logo-upload"
          className={`${inter.className} block text-sm font-medium text-[#3d3d3a] mb-2`}
        >
          Platform Logo
        </label>
        <div
          className="w-full flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer p-6 hover:bg-gray-100 transition duration-150"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-8 w-8 text-gray-400 mb-3" />
          <p className="text-base text-gray-700 font-medium text-center">
            Click or drag and drop the file
          </p>
          <p className="text-sm text-gray-500 mt-1 text-center">
            Supported Format: JPG, PNG, PDF, DOCS
          </p>
          <input
            ref={fileInputRef}
            id="logo-upload-input"
            type="file"
            className="hidden"
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Recommended size: 200×200px
        </p>
      </div>

      {/* Save Changes Button */}
      <div className="pt-6">
        <button
          onClick={handleSaveChanges}
          className="flex items-center w-full lg:w-1/8 justify-center px-6 py-3 bg-[#7F56D9] text-white font-medium rounded-lg shadow-sm hover:bg-[#6941C6] transition duration-150 text-base focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:ring-offset-2"
        >
          <Save className="h-5 w-5 mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );

  // Placeholder for other tabs
  const PlaceholderContent = (
    <div className="p-10 text-center text-gray-500">
      <Settings className="h-10 w-10 mx-auto mb-4" />
      <p>Content for the {activeTab} settings tab will go here.</p>
    </div>
  );

  return (
    <div className="p-4 sm:p-8 min-h-screen flex justify-center">
      <div className="w-full">
        {/* Header */}
        <div className="p-3 sm:p-6">
          <h1
            className={`${inter.className} text-2xl sm:text-3xl font-semibold text-[#101828] mb-1`}
          >
            Settings
          </h1>
          <p className={`${inter.className} text-base text-gray-500`}>
            Manage your platform settings and preferences
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="p-1 sm:p-2 border-gray-200 rounded-3xl lg:rounded-full bg-[#ECECF0] mx-3 sm:mx-0">
          <nav className="flex flex-wrap justify-start gap-1">
            {settingsTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  inter.className
                } px-3 py-2 text-sm sm:text-base flex-grow sm:flex-grow-0 w-full sm:w-auto min-w-[100px] sm:min-w-[120px] rounded-full font-medium transition duration-150 text-center ${
                  tab === activeTab
                    ? "bg-white text-[#0a0a0a] shadow-sm"
                    : "text-gray-600 hover:text-gray-700"
                }`}
                aria-current={tab === activeTab ? "page" : undefined}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-4 mx-3 sm:mx-0">
          {activeTab === "General" ? (
            GeneralSettingsContent
          ) : activeTab === "Security" ? (
            <SecuritySetting />
          ) : activeTab === "Notifications" ? (
            <NotificationView />
          ) : activeTab === "API Integrations" ? (
            <ApiIntregation />
          ) : (
            PlaceholderContent
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
