import { Inter } from "next/font/google";
import React, { ReactNode, useState } from "react";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// ✅ Type added here
interface InputFieldProps {
  label: string;
  children: ReactNode;
  description?: string;
  className?: string;
}
const inputClass =
  `w-full p-2.5 text-[16px] text-gray-900 font-inter bg-white border border-gray-300 ` +
  `rounded-lg focus:outline-none`;

const InputField: React.FC<InputFieldProps> = ({
  label,
  children,
  description,
  className = "",
}) => (
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

const AccountDetails: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  // State to manage input values
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");

  // Function to display message when a button is clicked
  const handleClick = (action: string) => {
    setMessage(`You clicked the ${action} button.`);

    // Clear message after 3 seconds
    setTimeout(() => setMessage(""), 3000);
  };

  // Function to clear all data
  const handleClearData = () => {
    setCurrentPassword("");
    setNewPassword("");
    setRetypeNewPassword("");
    setMessage("All data has been cleared.");

    // Clear message after 3 seconds
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className={`p-8 mx-auto rounded-xl ${inter.className}`}>
      <div className="pt-2 mb-8">
        <h2 className="text-[18px] font-semibold text-[#181d27]">Account</h2>
        <p className="text-[14px] text-[#535862]">
          Update your security and data settings here.
        </p>
      </div>
      <hr className="border-gray-200" />

      {/* Change Password Section */}
      <InputField label="Change Password">
        <div className="space-y-4 lg:mr-72 lg:relative">
          {/* Current Password */}
          <div>
            <label className="block text-[14px] font-medium text-[#414651] mb-1">
              Current password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="**********"
              className={inputClass}
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-[14px] font-medium text-[#414651] mb-1">
              New password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="**********"
              className={inputClass}
            />
          </div>

          {/* Retype New Password */}
          <div>
            <label className="block text-[14px] font-medium text-[#414651] mb-1">
              Retype new password
            </label>
            <input
              type="password"
              value={retypeNewPassword}
              onChange={(e) => setRetypeNewPassword(e.target.value)}
              placeholder="**********"
              className={inputClass}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 lg:mr-72 lg:relative mt-6">
          <button
            type="button"
            className="px-4 py-2 text-[14px] font-semibold text-[#414651] bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none"
            onClick={() => handleClick("Cancel")}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 text-[14px] font-semibold text-white bg-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none"
            onClick={() => handleClick("Save")}
          >
            Save
          </button>
        </div>
      </InputField>

      <hr className="border-gray-200" />

      {/* Data and Storage Section */}
      <InputField label="Data and Storage" className="border-b-0">
        <button
          type="button"
          className="px-4 py-2 text-[14px] font-semibold text-red-600 bg-white border border-yellow-400 rounded-lg hover:bg-red-50 focus:outline-none"
          onClick={handleClearData}
        >
          Clear All Data
        </button>
      </InputField>

      <hr className="border-gray-200" />

      {/* Delete Account Section */}
      <InputField label="Delete Account" className="border-b-0">
        <button
          type="button"
          className="px-4 py-2 text-[14px] font-semibold text-white bg-red-600 border border-red-600 rounded-lg hover:bg-red-700 focus:outline-none"
          onClick={() => handleClick("Delete Account")}
        >
          Delete Account
        </button>
      </InputField>

      {/* Message Display */}
      {message && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
          {message}
        </div>
      )}
    </div>
  );
};

export default AccountDetails;
