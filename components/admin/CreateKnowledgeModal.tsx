"use client";

import React, { useState, useCallback, ChangeEvent } from "react";
import { Inter } from "next/font/google";

// 1. Initialize the font instance
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// ----------------------------
// Type Definitions
// ----------------------------

interface FileItemProps {
  fileName: string;
  onRemove: () => void;
}

interface FileData {
  id: number;
  name: string;
}

interface CreateKnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

// --- File Item Component ---
const FileItem: React.FC<FileItemProps> = ({ fileName, onRemove }) => (
  <div className="flex items-center justify-between p-3 mt-2 bg-gray-100 rounded-lg">
    {/* File Icon */}
    <div className="flex items-center space-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 21h10a2 2 0 002-2V9a2 2 0 00-2-2h-3.293l-1.5-1.5a2 2 0 00-1.414-.586H7a2 2 0 00-2 2v13a2 2 0 002 2z"
        />
      </svg>
      <span className="text-sm text-gray-800 truncate">{fileName}</span>
    </div>

    {/* Remove (X) Icon */}
    <button
      onClick={onRemove}
      className="text-gray-400 hover:text-gray-600 transition-colors"
      aria-label={`Remove ${fileName}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
);

// --- Main Modal Component ---
const CreateKnowledgeModal: React.FC<CreateKnowledgeModalProps> = ({
  isOpen,
  onClose,
  title,
}) => {
  const [knowledgeName, setKnowledgeName] = useState<string>("");
  const [knowledgeDescription, setKnowledgeDescription] = useState<string>("");
  const [attachedFiles, setAttachedFiles] = useState<FileData[]>([
    { id: 1, name: "Image.png" }, // Example default file
  ]);

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const uploadedFiles = event.target.files;
      if (!uploadedFiles || uploadedFiles.length === 0) return;

      const newFiles: FileData[] = Array.from(uploadedFiles).map(
        (file, index) => ({
          id: Date.now() + index,
          name: file.name,
        })
      );
      setAttachedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    },
    []
  );

  const handleRemoveFile = useCallback((id: number) => {
    setAttachedFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] px-5 lg:px-0 ${inter.className}`}
    >
      <div className="w-full sm:w-11/12 lg:w-1/2 xl:w-1/3 max-h-[90vh] overflow-hidden bg-white rounded-lg shadow-sm border border-[#d5d7da] relative">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[70vh]">
          {/* Knowledge Name Input */}
          <div className="mb-4">
            <label
              htmlFor="knowledgeName"
              className="block text-sm font-medium text-gray-700 sr-only"
            >
              Knowledge Name
            </label>
            <input
              type="text"
              id="knowledgeName"
              placeholder="Type a name"
              value={knowledgeName}
              onChange={(e) => setKnowledgeName(e.target.value)}
              className="block w-full px-4 py-2 border outline-none border-gray-300 rounded-lg placeholder-gray-400"
            />
          </div>

          {/* Instructions */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-1">
              Instructions
            </h3>
            <div className="p-4 text-sm text-gray-600 border border-gray-300 rounded-lg">
              You are an information agent for answering informational queries.
              Your aim is to provide clear, concise responses to user questions.
              Use the policy below to assemble your answer.
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-1">
              Knowledge
            </h3>
            <textarea
              id="knowledgeDescription"
              placeholder="Enter a description..."
              value={knowledgeDescription}
              onChange={(e) => setKnowledgeDescription(e.target.value)}
              rows={4}
              className="block w-full outline-none px-4 py-2 border border-gray-300 rounded-lg resize-y placeholder-gray-400"
            />
          </div>

          {/* File Upload */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Attach File
            </h3>
            <div className="relative border-2 border-gray-300 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors">
              <input
                type="file"
                multiple
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer outline-none"
                onChange={handleFileChange}
                aria-label="Attach File"
              />
              <div className="space-y-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 mx-auto text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">
                    Click or drag and drop the file
                  </span>
                </p>
                <p className="text-xs text-gray-500">
                  Supported Format: JPG, PNG, PDF, DOCS
                </p>
              </div>
            </div>

            {/* File List */}
            {attachedFiles.map((file) => (
              <FileItem
                key={file.id}
                fileName={file.name}
                onRemove={() => handleRemoveFile(file.id)}
              />
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-between p-4 sm:p-6 space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("Creating Knowledge:", {
                knowledgeName,
                knowledgeDescription,
                attachedFiles,
              });
              onClose();
            }}
            className="px-4 py-2 text-white bg-violet-600 rounded-lg hover:bg-violet-700 transition-colors"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateKnowledgeModal;
