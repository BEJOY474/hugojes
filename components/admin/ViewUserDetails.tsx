"use client";

import { ChevronLeft, Mail, Calendar } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// --- Interface for User Details ---
interface UserDetail {
  id: number;
  name: string;
  email: string;
  registeredDate: string;
  status: "Active" | "Inactive";
  phone: string;
  lastLogin: string;
  totalLibrary: number;
  totalQueries: number;
  recentActivity: {
    id: number;
    description: string;
    time: string;
  }[];
}

// --- Mock Data for the Detail Page ---
const mockUserDetail: UserDetail = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  registeredDate: "2025-10-15",
  status: "Active",
  phone: "+1 (555) 123-4567",
  lastLogin: "2025-10-29 10:30 AM",
  totalLibrary: 45,
  totalQueries: 234,
  recentActivity: [
    {
      id: 101,
      description: "Asked query: What are the safety protocols?",
      time: "5 hours ago",
    },
    {
      id: 102,
      description: "Uploaded: Monthly Report.docx",
      time: "2 days ago",
    },
  ],
};

// --- User Detail View Component ---
interface UserDetailViewProps {
  user: UserDetail;
  onBack: () => void;
}

const UserDetailView: React.FC<UserDetailViewProps> = ({ user, onBack }) => {
  const pageBgColor = "bg-[#F7F7F9]";
  const subtleShadow = "shadow-[0_1px_3px_rgba(15,23,42,0.06)]";

  const StatCard: React.FC<{
    label: string;
    value: number;
    bgColor: string;
    valueColor: string;
  }> = ({ label, value, bgColor, valueColor }) => (
    <div className={`p-4 rounded-xl ${bgColor}`}>
      <p className="text-sm text-gray-700 font-normal mb-1">{label}</p>
      <p className={`text-2xl font-semibold ${valueColor}`}>{value}</p>
    </div>
  );

  return (
    <div
      className={`p-6 lg:p-8 ${pageBgColor} min-h-screen ${inter.className}`}
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center text-sm font-medium text-gray-600 hover:text-[#7F56D9] transition mb-6"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Users
      </button>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Main Info Card */}
          <div
            className={`bg-white rounded-xl border border-gray-200 ${subtleShadow}`}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full relative overflow-hidden flex-shrink-0">
                  <Image
                    src="/image/Admin/userIcon.jpg"
                    alt={`${user.name} avatar`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-[#101828]">
                    {user.name}
                  </h1>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#00C950] text-white">
                    {user.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="p-6 pb-0">
              <div className="grid grid-cols-2 gap-4">
                {/* Email */}
                <div className="bg-gray-50 p-3 rounded-lg flex flex-col justify-center">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-[#845ef2] opacity-80" />
                    <p className="text-sm text-gray-500">Email</p>
                  </div>
                  <p className="text-base font-medium text-[#101828] ml-7">
                    {user.email}
                  </p>
                </div>

                {/* Registered */}
                <div className="bg-gray-50 p-3 rounded-lg flex flex-col justify-center">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-[#845ef2] opacity-80" />
                    <p className="text-sm text-gray-500">Registered</p>
                  </div>
                  <p className="text-base font-medium text-[#101828] ml-7">
                    {user.registeredDate}
                  </p>
                </div>

                {/* Phone */}
                <div className="bg-gray-50 p-3 rounded-lg flex flex-col justify-center">
                  <div className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#845ef2"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-[#845ef2] opacity-80"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <p className="text-sm text-gray-500">Phone</p>
                  </div>
                  <p className="text-base font-medium text-[#101828] ml-7">
                    {user.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="p-6 pt-5">
              <h2 className="text-lg font-semibold text-[#101828] mb-4">
                Account Information
              </h2>
              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex justify-between items-center pb-2">
                  <span className="text-gray-700">Last Login</span>
                  <span className="font-medium text-[#101828]">
                    {user.lastLogin}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Account Status</span>
                  <span className="font-medium text-[#00C950]">
                    {user.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Recent Activity */}
          <div
            className={`bg-white p-6 rounded-xl border border-gray-200 ${subtleShadow}`}
          >
            <h2 className="text-lg font-semibold text-[#101828] mb-4">
              Recent Activity
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Latest actions performed by this user
            </p>
            <div className="space-y-3">
              {user.recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <p className="text-gray-700 text-base">
                    {activity.description}
                  </p>
                  <p className="text-sm text-gray-500 flex-shrink-0 ml-4">
                    {activity.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div
            className={`bg-white p-6 rounded-xl border border-gray-200 ${subtleShadow}`}
          >
            <h2 className="text-lg font-semibold text-[#101828] mb-4">
              Activity Stats
            </h2>
            <div className="space-y-4">
              <StatCard
                label="Total Library"
                value={user.totalLibrary}
                bgColor="bg-[#F6F5FF]"
                valueColor="text-[#7F56D9]"
              />
              <StatCard
                label="Total Queries"
                value={user.totalQueries}
                bgColor="bg-[#F5FBFF]"
                valueColor="text-[#1570EF]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailView;
