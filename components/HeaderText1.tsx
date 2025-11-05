import React from "react";
import { Inter } from "next/font/google";
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

interface HeaderText1Props {
  text: string;
}

const HeaderText1: React.FC<HeaderText1Props> = ({ text }) => {
  return (
    <>
      <h1
        className={`${inter.className} text-[30px] font-semibold text-[#181d27] mb-2`}
      >
        {text}
      </h1>
    </>
  );
};

export default HeaderText1;
