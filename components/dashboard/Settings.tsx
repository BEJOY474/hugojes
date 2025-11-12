// components/SettingsPage.js or pages/settings.js

import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import emailIcon from "@/public/image/dashboard/settings/mail.svg";
import dragDropIcon from "@/public/image/dashboard/settings/upload-cloud (1).svg";
import avatarIcon from "@/public/image/dashboard/settings/Avatar.png";
import clockIcon from "@/public/image/dashboard/settings/clock.svg";
import usIcon from "@/public/image/dashboard/settings/Group.svg";

import { Inter } from "next/font/google";
import Image from "next/image";
import AccountDetails from "./AccountDetails";
import Billing from "./Billing";

// --- START: MOCK COUNTRY/TIMEZONE DATA (No change here) ---

const flagPlaceholder = usIcon;

const countryData = [
  {
    name: "United States",
    code: "US",
    flag: flagPlaceholder,
    timezone: "Pacific Standard Time (PST) UTC-08:00",
  },
  {
    name: "Canada",
    code: "CA",
    flag: flagPlaceholder,
    timezone: "Eastern Standard Time (EST) UTC-05:00",
  },
  {
    name: "United Kingdom",
    code: "GB",
    flag: flagPlaceholder,
    timezone: "Greenwich Mean Time (GMT) UTC+00:00",
  },
  {
    name: "Germany",
    code: "DE",
    flag: flagPlaceholder,
    timezone: "Central European Time (CET) UTC+01:00",
  },
  {
    name: "France",
    code: "FR",
    flag: flagPlaceholder,
    timezone: "Central European Time (CET) UTC+01:00",
  },
  {
    name: "Australia",
    code: "AU",
    flag: flagPlaceholder,
    timezone: "Australian Eastern Time (AET) UTC+10:00",
  },
  {
    name: "Japan",
    code: "JP",
    flag: flagPlaceholder,
    timezone: "Japan Standard Time (JST) UTC+09:00",
  },
  {
    name: "Brazil",
    code: "BR",
    flag: flagPlaceholder,
    timezone: "Brasília Standard Time (BRT) UTC-03:00",
  },
  {
    name: "India",
    code: "IN",
    flag: flagPlaceholder,
    timezone: "Indian Standard Time (IST) UTC+05:30",
  },
  {
    name: "China",
    code: "CN",
    flag: flagPlaceholder,
    timezone: "China Standard Time (CST) UTC+08:00",
  },
  {
    name: "Mexico",
    code: "MX",
    flag: flagPlaceholder,
    timezone: "Central Time (CT) UTC-06:00",
  },
  {
    name: "South Korea",
    code: "KR",
    flag: flagPlaceholder,
    timezone: "Korean Standard Time (KST) UTC+09:00",
  },
  {
    name: "Spain",
    code: "ES",
    flag: flagPlaceholder,
    timezone: "Central European Time (CET) UTC+01:00",
  },
  {
    name: "Italy",
    code: "IT",
    flag: flagPlaceholder,
    timezone: "Central European Time (CET) UTC+01:00",
  },
  {
    name: "Netherlands",
    code: "NL",
    flag: flagPlaceholder,
    timezone: "Central European Time (CET) UTC+01:00",
  },
  {
    name: "Switzerland",
    code: "CH",
    flag: flagPlaceholder,
    timezone: "Central European Time (CET) UTC+01:00",
  },
  {
    name: "Sweden",
    code: "SE",
    flag: flagPlaceholder,
    timezone: "Central European Time (CET) UTC+01:00",
  },
  {
    name: "New Zealand",
    code: "NZ",
    flag: flagPlaceholder,
    timezone: "New Zealand Standard Time (NZST) UTC+12:00",
  },
  {
    name: "Singapore",
    code: "SG",
    flag: flagPlaceholder,
    timezone: "Singapore Standard Time (SGT) UTC+08:00",
  },
  {
    name: "South Africa",
    code: "ZA",
    flag: flagPlaceholder,
    timezone: "South Africa Standard Time (SAST) UTC+02:00",
  },
];

// Generate Unique Timezone List for <select> options to avoid key errors
const uniqueTimezones = [...new Set(countryData.map((c) => c.timezone))];
// --- END: MOCK COUNTRY/TIMEZONE DATA ---

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// --------------------------------------------------------------------------
// 🛠️ TypeScript Types Added for Tab Navigation
// --------------------------------------------------------------------------
type TabName = "My details" | "Account" | "Billing";
type RoleType = "Student" | "Professional" | ""; // ADDED RoleType

interface SettingsTabsProps {
  activeTab: TabName;
  setActiveTab: (tab: TabName) => void;
}

const SettingsTabs = ({ activeTab, setActiveTab }: SettingsTabsProps) => {
  const tabs: TabName[] = ["My details", "Account", "Billing"];

  const getTabLabel = (tab: TabName) => {
    if (tab === "Billing") {
      return (
        <span className="flex items-center">
          {tab}
          <span className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#f5f5f5] text-[#414651] text-xs font-medium border border-[#fef0c7]">
            2
          </span>
        </span>
      );
    }
    return tab;
  };

  return (
    <div className="flex space-x-8 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`
            pb-5 transition-colors duration-200
            ${
              activeTab === tab
                ? `${inter.className} border-b-2 font-semibold text-[14px] border-[#6941c6] text-[#6941c6]`
                : `${inter.className} text-[#717680] text-[14px] font-semibold hover:text-gray-700`
            }
          `}
        >
          {getTabLabel(tab)}
        </button>
      ))}
    </div>
  );
};

// --------------------------------------------------------------------------
// 🛠️ TypeScript Types Added for InputField
// --------------------------------------------------------------------------
interface InputFieldProps {
  label: string;
  children: React.ReactNode;
  description?: string;
  className?: string;
}

const InputField = ({
  label,
  children,
  description,
  className = "",
}: InputFieldProps) => (
  <div
    className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 py-6 border-b border-gray-100 ${className}`}
  >
    <div className="col-span-1">
      <label className="text-[14px] font-semibold text-[#414651]">
        {label}
      </label>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
    <div className="col-span-2 space-y-1">{children}</div>
  </div>
);

// --------------------------------------------------------------------------
// 🛠️ TypeScript Types Added for PhotoUpload
// --------------------------------------------------------------------------

const PhotoUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (previewUrl) {
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [previewUrl]);

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      setSelectedFile(file);
      const newUrl = URL.createObjectURL(file);
      setPreviewUrl(newUrl);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e.target.files);
  };

  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  const imageSource = previewUrl || avatarIcon;

  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <Image
          src={imageSource}
          alt="Profile"
          className="h-20 w-20 rounded-full object-cover"
          height={80}
          width={80}
        />
      </div>
      <div
        className={`flex-1 border rounded-[8px] shadow-[0px_1px_2px_rgba(10,13,18,0.05)] p-6 text-center transition-colors
          ${
            dragActive
              ? "border-indigo-600 bg-indigo-50"
              : "border-[#d5d7da] hover:border-gray-300"
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          id="file-upload"
          multiple={false}
          accept="image/svg,image/png,image/jpeg,image/gif"
          onChange={onChange}
          className="hidden"
        />

        <Image
          src={dragDropIcon}
          alt="Drag and Drop Icon"
          height={32}
          width={32}
          className="mx-auto text-gray-400"
        />

        {selectedFile ? (
          <>
            <p className="mt-2 text-sm text-gray-600 font-medium">
              File selected: {selectedFile.name}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              <span
                className="font-medium text-indigo-600 cursor-pointer hover:text-indigo-500"
                onClick={onButtonClick}
              >
                Click to change
              </span>{" "}
              or drag a new one.
            </p>
          </>
        ) : (
          <>
            <p className="mt-2 text-sm text-gray-600">
              <span
                className="font-medium text-indigo-600 cursor-pointer hover:text-indigo-500"
                onClick={onButtonClick}
              >
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="mt-1 text-xs text-gray-500">
              SVG, PNG, JPG or GIF (max. 800×400px)
            </p>
          </>
        )}
      </div>
    </div>
  );
};

// --------------------------------------------------------------------------
// 🛠️ UPDATED: TypeScript Types for MyDetails Component
// --------------------------------------------------------------------------

interface NameState {
  first: string;
  last: string;
}

interface MyDetailsProps {
  name: NameState;
  setName: React.Dispatch<React.SetStateAction<NameState>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  role: RoleType; // ADDED
  setRole: React.Dispatch<React.SetStateAction<RoleType>>; // ADDED
  affiliation: string; // ADDED
  setAffiliation: React.Dispatch<React.SetStateAction<string>>; // ADDED
  position: string; // ADDED
  setPosition: React.Dispatch<React.SetStateAction<string>>; // ADDED
  country: string;
  handleCountryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  timezone: string;
  setTimezone: React.Dispatch<React.SetStateAction<string>>;
  getCurrentFlag: () => string;
}

// --- START: My Details Component (Updated with MyDetailsProps and new fields) ---
const MyDetails = ({
  name,
  setName,
  email,
  setEmail,
  role, // ADDED
  setRole, // ADDED
  affiliation, // ADDED
  setAffiliation, // ADDED
  position, // ADDED
  setPosition, // ADDED
  country,
  handleCountryChange,
  timezone,
  setTimezone,
  getCurrentFlag,
}: MyDetailsProps) => (
  <div>
    {/* Header and Buttons (My Details) */}
    <div className="flex justify-between items-start pt-2 mb-8">
      <div>
        <h2
          className={`${inter.className} text-[18px] font-semibold text-[#181d27]`}
        >
          Personal info
        </h2>
        <p className={`${inter.className} text-[14px] text-[#535862]`}>
          Update your photo and personal details here.
        </p>
      </div>
      <div className="flex space-x-3">
        <button
          type="button"
          className={`${inter.className} px-4 py-2 text-[14px] font-semibold text-[#414651] bg-white border border-[#d5d7da] rounded-[8] shadow-[0px_1px_2px_rgba(10,13,18,0.05)] hover:bg-gray-50 focus:outline-none`}
        >
          Cancel
        </button>
        <button
          type="button"
          className={`${inter.className} px-4 py-2 text-[14px] font-semibold text-white bg-[#7f56d9] border border-[#7f56d9] rounded-[8] shadow-[0px_1px_2px_rgba(10,13,18,0.05)] hover:bg-indigo-700 focus:outline-none`}
        >
          Save
        </button>
      </div>
    </div>
    <hr className=" border-gray-200" />

    {/* Form Fields */}
    <form className="divide-y divide-gray-200">
      {/* Name */}
      <InputField label="Name">
        <div className="flex space-x-3">
          <input
            type="text"
            placeholder="First name"
            value={name.first}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName({ ...name, first: e.target.value })
            }
            className={`${inter.className} flex-1 block w-full bg-white border border-[#d5d7da] rounded-[8px] focus:outline-none shadow-[0px_1px_2px_rgba(10,13,18,0.05)] text-gray-800 placeholder:text-gray-400 text-[16px] p-2.5`}
          />
          <input
            type="text"
            placeholder="Last name"
            value={name.last}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName({ ...name, last: e.target.value })
            }
            className={`${inter.className} flex-1 block w-full bg-white border border-[#d5d7da] rounded-[8px] focus:outline-none shadow-[0px_1px_2px_rgba(10,13,18,0.05)] text-gray-800 placeholder:text-gray-400 text-[16px] p-2.5`}
          />
        </div>
      </InputField>
      <hr className="border-gray-200" />

      {/* Email address */}
      <InputField label="Email address">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Image
              src={emailIcon}
              alt="Email Icon"
              height={16}
              width={16}
              className="object-contain text-gray-400"
            />
          </div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className={`${inter.className} block w-full bg-white border border-[#d5d7da] rounded-[8px] focus:outline-none text-gray-800 placeholder:text-gray-400 shadow-[0px_1px_2px_rgba(10,13,18,0.05)] text-[16px] p-2.5 pl-10`}
          />
        </div>
      </InputField>
      <hr className="border-gray-200" />

      {/* Student or Professional (Dropdown) */}
      <InputField label="Student or Professional">
        <div className="relative">
          <select
            value={role}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setRole(e.target.value as RoleType);
              setAffiliation("");
            }}
            className={`${inter.className} block w-full appearance-none bg-white border border-[#d5d7da] rounded-[8px] focus:outline-none text-gray-800 shadow-[0px_1px_2px_rgba(10,13,18,0.05)] text-[16px] p-2.5 pr-10`}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="Student">Student</option>
            <option value="Professional">Professional</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </InputField>

      {/* Conditional Affiliation Field */}
      {role && (
        <InputField
          label={role === "Student" ? "University Name" : "Company Name"}
        >
          <input
            type="text"
            placeholder={
              role === "Student" ? "e.g., Stanford University" : "e.g., Google"
            }
            value={affiliation}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAffiliation(e.target.value)
            }
            className={`${inter.className} block w-full bg-white border border-[#d5d7da] rounded-[8px] focus:outline-none text-gray-800 placeholder:text-gray-400 shadow-[0px_1px_2px_rgba(10,13,18,0.05)] text-[16px] p-2.5`}
          />
        </InputField>
      )}

      {/* Position Field */}
      {role === "Professional" && (
        <InputField label="Position">
          <input
            type="text"
            placeholder="e.g., Software Engineer"
            value={position}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPosition(e.target.value)
            }
            className={`${inter.className} block w-full bg-white border border-[#d5d7da] rounded-[8px] focus:outline-none text-gray-800 placeholder:text-gray-400 shadow-[0px_1px_2px_rgba(10,13,18,0.05)] text-[16px] p-2.5`}
          />
        </InputField>
      )}

      {/* Your photo */}
      <InputField
        className={`${inter.className}`}
        label="Your photo"
        description="This will be displayed on your profile."
      >
        <PhotoUpload />
      </InputField>
      <hr className="border-gray-200" />

      {/* Country (Dropdown) */}
      <InputField label="Country">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Image
              src={getCurrentFlag()}
              alt="Flag Icon"
              height={16}
              width={16}
              className="object-contain"
            />
          </div>
          <select
            value={country}
            onChange={handleCountryChange}
            className={`${inter.className} block w-full appearance-none bg-white border border-[#d5d7da] rounded-[8px] focus:outline-none text-gray-800 shadow-[0px_1px_2px_rgba(10,13,18,0.05)] text-[16px] p-2.5 pl-10 pr-10`}
          >
            {countryData.map((c) => (
              <option key={c.code} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </InputField>
      <hr className="border-gray-200" />

      {/* Timezone (Dropdown) */}
      <InputField label="Timezone" className="border-b-0">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Image
              src={clockIcon}
              alt="Clock Icon"
              height={16}
              width={16}
              className="object-contain"
            />
          </div>
          <select
            value={timezone}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setTimezone(e.target.value)
            }
            className={`${inter.className} focus:outline-none block w-full appearance-none bg-white border border-[#d5d7da] rounded-[8px] shadow-[0px_1px_2px_rgba(10,13,18,0.05)] text-gray-800 placeholder:text-gray-400 text-[16px] p-2.5 pl-10 pr-10`}
          >
            {uniqueTimezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </InputField>
    </form>
  </div>
);
// --- END: My Details Component ---

// Main Settings Page Component (Updated to handle all tabs)
const SettingsPage = () => {
  // Set default active tab to 'My details'
  const [activeTab, setActiveTab] = useState<TabName>("My details");
  const defaultCountry = countryData[0];

  // Mock state for form inputs (used for My details tab)
  const [name, setName] = useState<NameState>({ first: "Oliva", last: "Rhye" });
  const [email, setEmail] = useState("olivia@untitledui.com");

  // NEW STATE VARIABLES - ADDED
  const [role, setRole] = useState<RoleType>(""); // Student or Professional
  const [affiliation, setAffiliation] = useState(""); // University Name or Company Name
  const [position, setPosition] = useState(""); // Position
  // END NEW STATE VARIABLES

  const [country, setCountry] = useState(defaultCountry.name);
  const [timezone, setTimezone] = useState(defaultCountry.timezone);

  // Function to find the current flag based on the selected country
  const getCurrentFlag = (): string => {
    const selectedCountry = countryData.find((c) => c.name === country);
    // Note: The Image component expects a string (local path or URL)
    return selectedCountry ? selectedCountry.flag : usIcon.src;
  };

  // Handler to update country and automatically update timezone
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountryName = e.target.value;
    setCountry(newCountryName);
    const selectedCountry = countryData.find((c) => c.name === newCountryName);
    if (selectedCountry) {
      setTimezone(selectedCountry.timezone);
    }
  };

  return (
    <div className="min-h-screen p-10 lg:mr-12 mx-auto lg:bg-[#F5F5F5]">
      <h1
        className={`${inter.className} text-3xl font-semibold text-[#181d27] mb-6`}
      >
        Settings
      </h1>

      {/* Tabs */}
      <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content Area */}
      <div className="mt-8">
        {activeTab === "My details" && (
          <MyDetails
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            role={role} // ADDED
            setRole={setRole} // ADDED
            affiliation={affiliation} // ADDED
            setAffiliation={setAffiliation} // ADDED
            position={position} // ADDED
            setPosition={setPosition} // ADDED
            country={country}
            handleCountryChange={handleCountryChange}
            timezone={timezone}
            setTimezone={setTimezone}
            getCurrentFlag={getCurrentFlag}
          />
        )}

        {/* === ACCOUNT TAB CONTENT === */}
        {activeTab === "Account" && <AccountDetails />}

        {/* Add content for Billing tabs here */}
        {activeTab === "Billing" && <Billing />}
      </div>
    </div>
  );
};

export default SettingsPage;
