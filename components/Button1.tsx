import React from "react";
import { Inter } from "next/font/google";
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

interface LabelInputFieldProps {
  text: string;
}

const Button1: React.FC<LabelInputFieldProps> = ({ text }) => {
  return (
    <div>
      <button
        type="submit"
        className={`${inter.className} w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-[15px] font-medium text-white bg-[#7F56D9] hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out`}
      >
        {text}
      </button>
    </div>
  );
};

export default Button1;
