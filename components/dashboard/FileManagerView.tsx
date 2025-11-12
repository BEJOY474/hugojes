// src/app/dashboard/FileManagementView/page.tsx (Assuming path)

"use client";

import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import searchIcon from "@/public/image/dashboard/search.svg";
import trashIcon from "@/public/image/dashboard/trash-2.svg";
import askAIIcon from "@/public/image/dashboard/sparkles.svg";
import filePlaceholderImage from "@/public/image/dashboard/upload.svg";
import uploadImage from "@/public/image/dashboard/upload.svg";
import foodImage from "@/public/image/dashboard/foodImage.png";
import downArrow from "@/public/image/dashboard/downArrow.svg";

import { Inter } from "next/font/google";
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// --- TypeScript Interface for File Data ---
interface FileData {
  id: number;
  name: string;
  uploaded: string;
  thumbnail: string;
}

// Dummy Data for Files
const INITIAL_DUMMY_FILES: FileData[] = [
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

// --- TypeScript Interface for Add File Modal Props ---
interface AddFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFile: (title: string, date: string, image: File | null) => void;
}

// --- Add File Modal Component ---
const AddFileModal: React.FC<AddFileModalProps> = ({
  isOpen,
  onClose,
  onAddFile,
}) => {
  const [newFileTitle, setNewFileTitle] = useState<string>("");
  const [newFileImage, setNewFileImage] = useState<File | null>(null);
  const [newFileDate, setNewFileDate] = useState<string>("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewFileImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (newFileTitle && newFileDate && newFileImage) {
      onAddFile(newFileTitle, newFileDate, newFileImage);
      setNewFileTitle("");
      setNewFileDate("");
      setNewFileImage(null);
      onClose(); // Added close on successful submission
    } else {
      alert("Please fill in all fields and select a file.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-w-[90%] mx-4">
        <h3 className="text-xl font-semibold text-[#101828] mb-4">
          Add New File
        </h3>

        <div className="mb-4">
          <label htmlFor="fileTitle" className="block text-sm text-gray-700">
            Title
          </label>
          <input
            id="fileTitle"
            type="text"
            value={newFileTitle}
            onChange={(e) => setNewFileTitle(e.target.value)}
            className="w-full p-2 border text-black  outline-none border-gray-300 rounded-lg"
            placeholder="Enter file title"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="fileImage" className="block text-sm  text-gray-700">
            Upload Image
          </label>
          <input
            id="fileImage"
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border text-black  outline-none border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="fileDate" className="block text-sm text-gray-700">
            Date
          </label>
          <input
            id="fileDate"
            type="date"
            value={newFileDate}
            onChange={(e) => setNewFileDate(e.target.value)}
            className="w-full p-2 text-black border outline-none border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add File
          </button>
        </div>
      </div>
    </div>
  );
};

// --- TypeScript Interface for Delete File Modal Props ---
interface DeleteFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteFile: () => void;
  fileName: string;
}

// --- Delete File Modal Component ---
const DeleteFileModal: React.FC<DeleteFileModalProps> = ({
  isOpen,
  onClose,
  onDeleteFile,
  fileName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-w-[90%] mx-4">
        <h3 className="text-xl font-semibold text-[#101828] mb-4">
          Confirm Deletion
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete the file: {fileName}? This action
          cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onDeleteFile}
            className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Toast Notification Component ---
const ToastNotification: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white py-3 px-5 rounded-lg shadow-lg">
      <p className="text-sm">{message}</p>
    </div>
  );
};

// --- Main File Management View ---
const FileManagementView: React.FC = () => {
  const [files, setFiles] = useState<FileData[]>(INITIAL_DUMMY_FILES);
  const [isAddFileModalOpen, setIsAddFileModalOpen] = useState<boolean>(false);
  const [isDeleteFileModalOpen, setIsDeleteFileModalOpen] =
    useState<boolean>(false);
  const [fileToDeleteId, setFileToDeleteId] = useState<number | null>(null);
  const [fileToDeleteName, setFileToDeleteName] = useState<string>("");
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleOpenAddFileModal = (): void => {
    setIsAddFileModalOpen(true);
  };

  const handleCloseAddFileModal = (): void => {
    setIsAddFileModalOpen(false);
  };

  const handleOpenDeleteFileModal = (id: number, name: string): void => {
    setFileToDeleteId(id);
    setFileToDeleteName(name);
    setIsDeleteFileModalOpen(true);
  };

  const handleCloseDeleteFileModal = (): void => {
    setIsDeleteFileModalOpen(false);
    setFileToDeleteId(null);
    setFileToDeleteName("");
  };

  const handleAddFile = (
    title: string,
    date: string,
    image: File | null
  ): void => {
    // FIX: Added null check before calling URL.createObjectURL(image)
    if (!image) {
      console.error("Attempted to add file without an image.");
      return;
    }

    const newFile = {
      id: files.length + 1,
      name: title,
      uploaded: date,
      thumbnail: URL.createObjectURL(image),
    };

    setFiles([...files, newFile]);
    setToastMessage("New file added successfully!");
    setIsToastVisible(true);

    // Hide toast after 3 seconds
    setTimeout(() => {
      setIsToastVisible(false);
    }, 3000);
  };

  const handleDeleteFile = (): void => {
    if (fileToDeleteId !== null) {
      const updatedFiles = files.filter((file) => file.id !== fileToDeleteId);
      setFiles(updatedFiles);
      setToastMessage("File deleted successfully!");
      setIsToastVisible(true);

      // Hide toast after 3 seconds
      setTimeout(() => {
        setIsToastVisible(false);
      }, 3000);
    }
    handleCloseDeleteFileModal();
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const highlightText = (text: string) => {
    if (!searchQuery) return text;

    const regex = new RegExp(`(${searchQuery})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span key={index} className="text-yellow-500">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="p-4 lg:p-8 flex-1 lg:mr-48 bg-[#F5F5F5] min-h-[calc(100vh-4rem)]">
      <div className="flex justify-between mt-10 items-center mb-6">
        <h1 className="text-[32px] font-semibold text-[#000]">Files</h1>
        <button
          className="flex items-center text-[16px] bg-[#7F56D9] text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={handleOpenAddFileModal}
        >
          <div className="relative w-7 h-7 mr-2">
            <Image
              src={uploadImage}
              alt="Add New File Icon"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <p>Add New File</p>
        </button>
      </div>

      {/* Display Toast Notification */}
      {isToastVisible && <ToastNotification message={toastMessage} />}

      <div className="flex items-center space-x-4 mb-8">
        <div className="relative flex-1 text-[#808080]">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5">
            <Image src={searchIcon} alt="Search Icon" fill />
          </div>
          <input
            type="text"
            placeholder="Search files"
            value={searchQuery}
            onChange={handleSearchChange}
            className={`${inter.className} w-full p-3 pl-10 text-[#808080] border border-[rgba(31,30,29,0.15)] bg-[#ffffff] outline-none focus:outline-none rounded-lg placeholder-gray-500`}
          />
        </div>
      </div>

      {filteredFiles.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-[20px] font-medium text-[#000000]">
            No file available
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-18 xl:gap-22">
          {filteredFiles.map((file) => (
            <div key={file.id} className="overflow-hidden">
              <div className="relative h-40 w-full rounded-xl overflow-hidden">
                <Image
                  src={foodImage}
                  alt="File Placeholder"
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent rounded-b-xl"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-2">
                  <div className="flex items-center justify-between w-full px-2">
                    <button
                      className="flex items-center bg-[#f9f5ff] text-[#7f56d9] py-1 px-3 rounded-md text-[12px] font-medium hover:bg-gray-100 transition-colors"
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

                    <button
                      className="p-1 rounded-full text-gray-500 shadow-md hover:text-red-500 transition-colors"
                      onClick={() =>
                        handleOpenDeleteFileModal(file.id, file.name)
                      }
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
              <div className="p-3">
                <p className="text-[18px] font-medium text-[#101828] truncate">
                  {highlightText(file.name)}
                </p>
                <p className="text-[14px] text-[#6a7282]">
                  Uploaded: {file.uploaded}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add File Modal */}
      <AddFileModal
        isOpen={isAddFileModalOpen}
        onClose={handleCloseAddFileModal}
        onAddFile={handleAddFile}
      />

      {/* Delete File Modal */}
      <DeleteFileModal
        isOpen={isDeleteFileModalOpen}
        onClose={handleCloseDeleteFileModal}
        onDeleteFile={handleDeleteFile}
        fileName={fileToDeleteName}
      />
    </div>
  );
};

export default FileManagementView;
