"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import searchIcon from "@/public/image/dashboard/search.svg";
import trashIcon from "@/public/image/dashboard/trash-2.svg";
import askAIIcon from "@/public/image/dashboard/sparkles.svg";
import filePlaceholderImage from "@/public/image/dashboard/upload.svg";
import uploadImage from "@/public/image/dashboard/upload.svg";
import foodImage from "@/public/image/dashboard/foodImage.png";
import downArrow from "@/public/image/dashboard/downArrow.svg"; // 👈 Imported downArrow

import { Inter } from "next/font/google";
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Dati fittizi per i file
const INITIAL_DUMMY_FILES = [
  {
    id: 1,
    name: "Getting Started Guide.pdf",
    uploaded: "2025-10-25",
    thumbnail: filePlaceholderImage,
  },
  {
    id: 2,
    name: "Project Brief.docx",
    uploaded: "2025-10-25",
    thumbnail: filePlaceholderImage,
  },
  {
    id: 3,
    name: "Financial Report.xlsx",
    uploaded: "2025-10-25",
    thumbnail: filePlaceholderImage,
  },
  {
    id: 4,
    name: "Design Mockups.zip",
    uploaded: "2025-10-25",
    thumbnail: filePlaceholderImage,
  },
  {
    id: 5,
    name: "Meeting Notes.txt",
    uploaded: "2025-10-25",
    thumbnail: filePlaceholderImage,
  },
  {
    id: 6,
    name: "Marketing Plan.pptx",
    uploaded: "2025-10-25",
    thumbnail: filePlaceholderImage,
  },
];

// --- Componente per la vista File (Library) ---
const FileManagementView = () => {
  // 1. Manage the file list state
  const [files, setFiles] = useState(INITIAL_DUMMY_FILES);

  // 2. Delete handler function
  const handleDeleteFile = (id: number) => {
    // Filter out the file with the given id
    const updatedFiles = files.filter((file) => file.id !== id);
    // Update the state
    setFiles(updatedFiles);
    console.log(`File with ID ${id} deleted.`);
  };

  // Check if the file list is empty
  const isListEmpty = files.length === 0;

  // Tailwind classes for the select styling, based on your CSS
  const selectStyles =
    "appearance-none bg-white text-[#808080] text-[14px] outline-none cursor-pointer border border-[rgba(31,30,29,0.15)] rounded-lg py-3 px-3 pl-[14px]";

  return (
    <div className="p-4 lg:p-8 flex-1 lg:mr-48 bg-[#F5F5F5] min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex justify-between mt-10 items-center mb-6">
        <h1
          className={`${inter.className} text-[32px] font-semibold text-[#000]`}
        >
          Files
        </h1>
        <button
          className="flex items-center text-[16px] bg-[#7F56D9] text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => console.log("Add New File")}
        >
          <div className="relative w-7 h-7 mr-2">
            <Image
              src={uploadImage}
              alt="Add New File Icon"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <p className={`${inter.className}`}>Add New File</p>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4 mb-8">
        {/* Search Input */}
        <div className="relative flex-1 text-[#808080]">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5">
            <Image src={searchIcon} alt="Search Icon" fill />
          </div>
          <input
            type="text"
            placeholder="Search chat"
            className={`${inter.className} w-full p-3 pl-10 text-[#808080] border border-[rgba(31,30,29,0.15)] bg-[#ffffff] outline-none focus:outline-none rounded-lg placeholder-gray-500`}
          />
        </div>

        {/* Type Filter Dropdown */}
        <div className="relative">
          <select className={`${selectStyles} ${inter.className} pr-10`}>
            <option>All Type</option>
            <option>PDF</option>
            <option>DOCX</option>
          </select>
          {/* Custom Down Arrow Image */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <Image
              src={downArrow}
              alt="Dropdown Arrow"
              width={16}
              height={16}
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        {/* Recent Filter Dropdown */}
        <div className="relative">
          <select className={`${selectStyles} ${inter.className} pr-10`}>
            <option>Recent</option>
            <option>Oldest</option>
          </select>
          {/* Custom Down Arrow Image */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <Image
              src={downArrow}
              alt="Dropdown Arrow"
              width={16}
              height={16}
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>

      {/* File Grid or Empty Message */}
      {isListEmpty ? (
        <div className={`${inter.className} text-center py-5`}>
          <p className="text-[20px] font-medium text-[#000000]">
            No file available
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-18 xl:gap-22">
          {files.map((file) => (
            <div key={file.id} className="overflow-hidden">
              {/* File Thumbnail/Image */}
              <div className="relative h-40 w-full rounded-xl overflow-hidden">
                <Image
                  src={foodImage}
                  alt="File Placeholder"
                  className="w-full h-full object-cover rounded-xl"
                />
                {/* Subtle transparent gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent rounded-b-xl"></div>

                {/* Overlay buttons */}
                <div className="absolute inset-0 flex flex-col justify-end p-2">
                  <div className="flex items-center justify-between w-full px-2">
                    {/* Ask AI Button */}
                    <button
                      className={`${inter.className} flex items-center bg-[#f9f5ff] text-[#7f56d9] py-1 px-3 rounded-md text-[12px] font-medium hover:bg-gray-100 transition-colors`}
                      onClick={() => console.log(`Ask AI about ${file.name}`)}
                    >
                      <div className="relative w-4 h-4 mr-1">
                        <Image
                          src={askAIIcon}
                          alt="Ask AI Icon"
                          fill
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                      Ask AI
                    </button>

                    {/* Delete Button */}
                    <button
                      className="p-1 rounded-full text-gray-500 shadow-md hover:text-red-500 transition-colors"
                      onClick={() => handleDeleteFile(file.id)}
                    >
                      <Image
                        src={trashIcon}
                        alt="Delete Icon"
                        height={24}
                        width={24}
                        style={{ objectFit: "contain" }}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* File Info */}
              <div className="p-3">
                <p
                  className={`${inter.className} text-[18px] font-medium text-[#101828] truncate`}
                >
                  {file.name}
                </p>
                <p className={`${inter.className} text-[14px] text-[#6a7282]`}>
                  Uploaded: {file.uploaded}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileManagementView;
