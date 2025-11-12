"use client";

import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export interface UserDetail {
  id: number;
  name: string;
  email: string;
  registeredDate: string;
  status: "Active" | "Inactive";
  phone: string;
  lastLogin: string;
  totalLibrary: number;
  totalQueries: number;
  recentActivity: {
    id: number;
    description: string;
    time: string;
  }[];
}

// ==========================
// Reusable Input Component
// ==========================
const FormInput: React.FC<{
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, value, onChange }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2.5 text-base border border-gray-300 rounded-lg bg-gray-50 text-[#101828] outline-none  transition duration-150"
    />
  </div>
);

// ==========================
// Toggle Switch Component
// ==========================
const ToggleSwitch: React.FC<{
  label: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
}> = ({ label, description, checked, onToggle }) => (
  <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 last:border-b-0">
    <div className="flex flex-col">
      <span className="text-base font-medium text-[#101828]">{label}</span>
      <span className="text-sm text-gray-500">{description}</span>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="sr-only peer"
      />
      <div
        className={`w-11 h-6 rounded-full transition-colors relative ${
          checked ? "bg-[#7F56D9]" : "bg-gray-200"
        } after:content-[''] after:absolute after:top-[2px] after:left-[2px]
          after:bg-white after:border-gray-300 after:border after:rounded-full
          after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full`}
      />
    </label>
  </div>
);

// ==========================
// EditUserView Component
// ==========================
interface EditUserViewProps {
  user: UserDetail;
  onBack: () => void;
  onSave: (updatedUser: UserDetail) => void;
}

const EditUserView: React.FC<EditUserViewProps> = ({
  user,
  onBack,
  onSave,
}) => {
  const [formData, setFormData] = useState<{
    fullName: string;
    email: string;
    phone: string;
    status: "Active" | "Inactive";
    canUpload: boolean;
    canDelete: boolean;
  }>({
    fullName: user.name,
    email: user.email,
    phone: user.phone,
    status: user.status,
    canUpload: true,
    canDelete: false,
  });

  const handleChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        field === "status" &&
        (e.target.value === "Active" || e.target.value === "Inactive")
          ? (e.target.value as "Active" | "Inactive")
          : e.target.value;
      setFormData({ ...formData, [field]: value });
    };

  const handleToggle = (field: "canUpload" | "canDelete") => () => {
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = () => {
    const updatedUser: UserDetail = {
      ...user,
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      status: formData.status,
    };
    onSave(updatedUser);
  };

  const subtleShadow = "shadow-[0_1px_3px_rgba(15,23,42,0.06)]";

  return (
    <div
      className={`mx-8 my-10 p-6 lg:p-8 bg-white rounded-xl border border-gray-200 ${subtleShadow} ${inter.className}`}
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center text-sm font-medium text-gray-600 hover:text-[#7F56D9] transition mb-6"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Users
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-[#101828]">Edit User</h1>
        <p className="text-sm text-gray-500">
          Update user information and permissions
        </p>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-10">
        <FormInput
          label="Full Name"
          value={formData.fullName}
          onChange={handleChange("fullName")}
        />
        <FormInput
          label="Email"
          value={formData.email}
          onChange={handleChange("email")}
        />
        <FormInput
          label="Phone"
          value={formData.phone}
          onChange={handleChange("phone")}
        />

        {/* Status Dropdown */}
        <div className="space-y-1.5 relative">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <div className="relative">
            <select
              value={formData.status}
              onChange={handleChange("status")}
              className="w-full px-3 py-2.5 text-base border border-gray-300 rounded-lg bg-gray-50 text-[#101828] outline-none transition duration-150 appearance-none cursor-pointer"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Not active</option>
            </select>

            {/* Dropdown Arrow Icon */}
            <svg
              className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Permissions */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[#101828] mb-4">
          Permissions
        </h2>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <ToggleSwitch
            label="Can Upload Documents"
            description="Allow user to upload new documents"
            checked={formData.canUpload}
            onToggle={handleToggle("canUpload")}
          />
          <ToggleSwitch
            label="Can Delete Documents"
            description="Allow user to delete documents"
            checked={formData.canDelete}
            onToggle={handleToggle("canDelete")}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-100">
        <button
          onClick={onBack}
          className="w-full sm:w-auto px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto px-4 py-2 text-base font-medium text-white bg-[#7F56D9] rounded-lg shadow-sm hover:bg-[#6943C5] transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditUserView;
