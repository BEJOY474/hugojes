import React from "react";

import { Inter } from "next/font/google";
import Image from "next/image";
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

interface HeaderText1Props {
  src: string;
  text: string;
}

const Button2: React.FC<HeaderText1Props> = ({ src, text }) => {
  return (
    <>
      <button
        className={`${inter.className} w-full flex items-center justify-center px-4 py-2 border border-[#d5d7da] rounded-lg shadow text-[15px] font-semibold text-[#414651] bg-white gap-2 hover:bg-gray-50 mb-6 transition duration-150 ease-in-out`}
      >
        <Image src={src} alt="Google Icon" width={20} height={20} />
        {text}
      </button>
    </>
  );
};

export default Button2;
