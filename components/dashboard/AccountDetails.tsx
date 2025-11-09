import { Inter } from "next/font/google";
import React, { ReactNode } from "react";

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

const AccountDetails: React.FC = () => (
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
      <div className="space-y-4 lg:right-[200px] lg:mr-72 lg:relative">
        {/* Current Password */}
        <div>
          <label
            className={`${inter.className} block text-[14px] font-medium text-[#414651] mb-1`}
          >
            Current password
          </label>
          <input
            type="password"
            placeholder="**********"
            className={`${inter.className} block w-full bg-white border border-[#d5d7da] rounded-[8px] shadow-[0px_1px_2px_rgba(10,13,18,0.05)] text-[#181d27] focus:outline-none text-[16px] p-2.5`}
          />
        </div>

        {/* New Password */}
        <div>
          <label
            className={`${inter.className} block text-[14px] font-medium text-[#414651] mb-1`}
          >
            New password
          </label>
          <input
            type="password"
            placeholder="**********"
            className={`${inter.className} block w-full bg-white border border-[#d5d7da] rounded-[8px] shadow-[0px_1px_2px_rgba(10,13,18,0.05)] focus:outline-none text-[16px] p-2.5`}
          />
        </div>

        {/* Retype New Password */}
        <div>
          <label
            className={`${inter.className} block text-[14px] font-medium text-[#414651] mb-1`}
          >
            Retype new password
          </label>
          <input
            type="password"
            placeholder="**********"
            className={`${inter.className} block w-full bg-white border border-[#d5d7da] rounded-[8px] shadow-[0px_1px_2px_rgba(10,13,18,0.05)] focus:outline-none text-[16px] p-2.5`}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3 lg:right-[200px] lg:mr-72 lg:relative mt-6">
        <button
          type="button"
          className={`px-4 py-2 text-[14px] font-semibold text-[#414651] bg-white border border-[#d5d7da] rounded-[8px] shadow-[0px_1px_2px_rgba(10,13,18,0.05)] hover:bg-gray-50 focus:outline-none`}
        >
          Cancel
        </button>
        <button
          type="button"
          className={`px-4 py-2 text-[14px] font-semibold text-white bg-[#7f56d9] border border-[#7f56d9] rounded-[8px] shadow-[0px_1px_2px_rgba(10,13,18,0.05)] hover:bg-indigo-700 focus:outline-none`}
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
        className={`px-4 py-2 text-[14px] font-semibold text-[#b42318] bg-[#ffffff] border border-[#fecd59] rounded-[8px] shadow-[0px_1px_2px_rgba(10,13,18,0.05)] hover:bg-[#fbd3d2] focus:outline-none`}
      >
        Clear All Data
      </button>
    </InputField>

    <hr className="border-gray-200" />

    {/* Delete Account Section */}
    <InputField label="Delete Account" className="border-b-0">
      <button
        type="button"
        className={`px-4 py-2 text-[14px] font-semibold text-white bg-[#d92d20] border border-[#d92d20] rounded-[8px] shadow-[0px_1px_2px_rgba(10,13,18,0.05)] hover:bg-[#d92d20] focus:outline-none`}
      >
        Delete Account
      </button>
    </InputField>
  </div>
);

export default AccountDetails;
