import React from "react";

import { Inter } from "next/font/google";
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

interface HeaderText1Props {
  text: string;
}

const Text1: React.FC<HeaderText1Props> = ({ text }) => {
  return (
    <>
      <p className={`${inter.className} text-[16px] text-[#535862] mb-6`}>
        {text}
      </p>
    </>
  );
};

export default Text1;
