"use client";
import Link from "next/link";
import { Inter } from "next/font/google";
import HeaderText1 from "@/components/HeaderText1";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent } from "react";

import starIcon from "@/public/image/create-account/starIcon.svg";
import googleIcon from "@/public/image/create-account/googleIcon.svg";
import Text1 from "@/components/Text1";
import LabelInpytField from "@/components/LabelInpytField";
import Button1 from "@/components/Button1";
import Button2 from "@/components/Button2";
import { useRouter } from "next/navigation";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const CreateAccountPage = () => {
  const [email, setEmail] = useState<string>(""); // ✅ typed state
  const [error, setError] = useState<string | null>(null); // ✅ typed error
  const router = useRouter();

  // Handler for input change
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(null);
  };

  // Handle form submit
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
    } else {
      setError(null);
      router.push("/varification");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#f5f5f5]`}
    >
      <div className="p-8 w-full max-w-md text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#7F56D9] mb-6">
          <Image src={starIcon} alt="Star Icon" width={20} height={20} />
        </div>

        <HeaderText1 text="Create an account" />
        <Text1 text="Start your 30-day free trial." />
        <Button2 src={googleIcon} text="Sign up with Google" />

        <div className="relative mb-6">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span
              className={`${inter.className} px-2 text-gray-500 bg-[#f5f5f5]`}
            >
              OR
            </span>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <LabelInpytField
            name="email"
            label=""
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />

          {error && (
            <p
              className={`${inter.className} text-red-500 text-sm text-left pt-1`}
            >
              {error}
            </p>
          )}

          {/* ✅ Button1 with type submit */}
          <Button1 text="Get started" />
        </form>

        <div className={`${inter.className} mt-6 text-center`}>
          <span className="text-gray-600 text-[14px]">
            Already have an account?
          </span>
          <Link
            href="/login"
            className="font-bold text-[#6941c6] ml-1 text-[14px] hover:text-purple-500"
          >
            Log in.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;
