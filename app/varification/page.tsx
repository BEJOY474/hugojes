"use client";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ Added for navigation
import { Inter } from "next/font/google";
import HeaderText1 from "@/components/HeaderText1";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent } from "react";

import starIcon from "@/public/image/create-account/starIcon.svg";
import Text1 from "@/components/Text1";
import LabelInpytField from "@/components/LabelInpytField";
import Button1 from "@/components/Button1";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const Verification: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState<string>("");
  const router = useRouter(); // ✅ Router initialized

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!verificationCode.trim()) {
      alert("Please enter your verification code.");
      return;
    }

    console.log("Verification Code Submitted:", verificationCode);

    // ✅ Navigate only if input has value
    router.push("/new-password"); // change route as needed
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#f5f5f5]">
      <div className="p-8 w-full max-w-md text-center ">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#7F56D9] mb-6">
          <Image src={starIcon} alt="Star Icon" width={20} height={20} />
        </div>

        <HeaderText1 text="Verification code sent" />
        <Text1 text="Enter the code generated from the link sent to boniaminyt@gmail.com" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="verificationCode"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={handleCodeChange}
            required
            className="w-full border bg-white border-gray-300 outline-none shadow-sm rounded-lg p-3"
          />

          <Button1 text="Continue" />
        </form>

        <div className={`${inter.className} mt-6 text-center`}>
          <span className="text-gray-600 text-[14px]">
            Not seeing the email in your inbox?
          </span>
          <Link
            href="/login"
            className="font-bold text-gray-600 ml-1 text-[14px] hover:text-purple-500"
          >
            Resend Code
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Verification;
