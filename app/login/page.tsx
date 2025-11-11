"use client";
import Link from "next/link";
// 💡 Import useRouter from next/navigation
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import HeaderText1 from "@/components/HeaderText1";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent } from "react";
import googleIcon from "@/public/image/create-account/googleIcon.svg";
import starIcon from "@/public/image/create-account/starIcon.svg";
import Text1 from "@/components/Text1";
import LabelInpytField from "@/components/LabelInpytField";
import Button1 from "@/components/Button1";
import Button2 from "@/components/Button2";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const Login: React.FC = () => {
  // 💡 Initialize the router hook
  const router = useRouter();

  // ✅ States
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [agree, setAgree] = useState<boolean>(false);

  // ✅ Handlers
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handleAgreeChange = (e: ChangeEvent<HTMLInputElement>) =>
    setAgree(e.target.checked);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!agree) {
      alert("Please select 'Remember for 30 days' before continuing.");
      return;
    }

    if (!email || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log("Login Submitted:", { email, password });

    // 🚀 Navigation added here
    // In a real application, you would perform an API call for authentication
    // before navigating. Assuming successful login after validation:
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#f5f5f5]">
      <div className="p-8 w-full max-w-md text-center">
        {/* Star Icon */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#7F56D9] mb-6">
          <Image src={starIcon} alt="Star Icon" width={20} height={20} />
        </div>

        {/* Header */}
        <HeaderText1 text="Log in to your account" />
        <div className="w-11/12 max-w-sm mx-auto text-center md:max-w-md">
          <Text1 text="Welcome back! Please enter your details." />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          {/* Email Field */}
          <LabelInpytField
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />

          {/* Password Field */}
          <LabelInpytField
            name="password"
            type="password"
            label="Password"
            placeholder="Type password"
            value={password}
            onChange={handlePasswordChange}
          />

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between text-left">
            <div className="flex items-center gap-2">
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
                Remember for 30 days
              </label>
            </div>

            <Link
              href="/forgot-password"
              className={`${inter.className} text-[14px] text-[#6941c6] font-semibold hover:underline`}
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button1 text="Sign in" />
        </form>

        <div className="mb-4"></div>

        {/* Google Sign In */}
        <Button2 src={googleIcon} text="Sign in with Google" />
        <Link
          href="/admin"
          className={`${inter.className} text-[14px] text-[#6941c6] font-semibold hover:underline`}
        >
          Go to admin page. **For testing purpose**
        </Link>
      </div>
    </div>
  );
};

export default Login;
