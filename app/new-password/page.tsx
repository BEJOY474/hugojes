"use client";
import Link from "next/link";
import { Inter } from "next/font/google";
import HeaderText1 from "@/components/HeaderText1";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ For navigation

import starIcon from "@/public/image/create-account/starIcon.svg";
import Text1 from "@/components/Text1";
import LabelInpytField from "@/components/LabelInpytField";
import Button1 from "@/components/Button1";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const NewPassword: React.FC = () => {
  const router = useRouter(); // ✅ Initialize router

  const [password, setPassword] = useState<string>("");
  const [retypePassword, setRetypePassword] = useState<string>("");
  const [agree, setAgree] = useState<boolean>(false);

  useEffect(() => {
    // Access localStorage only after the component has mounted (client-side)
    const storedPassword = localStorage.getItem("password");
    const storedRetypePassword = localStorage.getItem("retypePassword");

    if (storedPassword) setPassword(storedPassword);
    if (storedRetypePassword) setRetypePassword(storedRetypePassword);
  }, []);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    localStorage.setItem("password", e.target.value); // Save password to localStorage
  };

  const handleRetypePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRetypePassword(e.target.value);
    localStorage.setItem("retypePassword", e.target.value); // Save retype password to localStorage
  };

  const handleAgreeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAgree(e.target.checked);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ✅ Validation
    if (!password || !retypePassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (!agree) {
      alert("Please agree to the Terms & Policy before continuing.");
      return;
    }

    if (password !== retypePassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log("New password submitted:", password);

    // ✅ Navigate only if all validations pass
    router.push("/login");
  };

  useEffect(() => {
    // Clear the localStorage when the component unmounts or when the password is updated
    return () => {
      localStorage.removeItem("password");
      localStorage.removeItem("retypePassword");
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#f5f5f5]">
      <div className="p-8 w-full max-w-md text-center ">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#7F56D9] mb-6">
          <Image src={starIcon} alt="Star Icon" width={20} height={20} />
        </div>

        <HeaderText1 text="Create new password" />
        <div className="w-11/12 max-w-sm mx-auto text-center md:max-w-md">
          <Text1 text="Create a new password to login to your account" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <LabelInpytField
            name="password"
            type="password"
            label=""
            placeholder="Type password"
            value={password}
            onChange={handlePasswordChange}
          />

          <LabelInpytField
            name="retypePassword"
            type="password"
            label=""
            placeholder="Retype password"
            value={retypePassword}
            onChange={handleRetypePasswordChange}
          />

          <div className="flex items-start gap-2 text-left">
            <input
              type="checkbox"
              id="agree"
              checked={agree}
              onChange={handleAgreeChange}
              className="w-4 h-4 border border-[#d5d7da] bg-white cursor-pointer"
            />
            <label
              htmlFor="agree"
              className={`${inter.className} text-[14px] text-gray-700 font-medium leading-snug`}
            >
              I agree to the <span>Terms & Policy</span> and confirm that I am
              18 years of age.
            </label>
          </div>

          {/* ✅ No Link wrapper here */}
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

export default NewPassword;
