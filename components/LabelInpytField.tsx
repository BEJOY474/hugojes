import React from "react";
import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

interface LabelInputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  type: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const LabelInpytField: React.FC<LabelInputFieldProps> = ({
  name,
  label,
  placeholder,
  value,
  type,
  onChange,
}) => {
  // ✅ Determine input type based on name or label
  const inputType =
    name.toLowerCase().includes("password") ||
    label.toLowerCase().includes("password")
      ? "password"
      : name.toLowerCase().includes("email")
      ? "email"
      : "text";

  return (
    <div className={`${inter.className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 text-left mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={name}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className={`${inter.className} block w-full px-3 py-3 border bg-white border-gray-300 rounded-lg placeholder-gray-500 outline-none text-gray-700 shadow-sm  text-base`}
      />
    </div>
  );
};

export default LabelInpytField;
