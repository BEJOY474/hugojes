"use client";

import React, { useState } from "react";
import { Edit } from "lucide-react";
import { Inter } from "next/font/google";
import Image from "next/image";

// --- Static Images ---
import image1 from "@/public/image/Admin/img1.png";
import image2 from "@/public/image/Admin/img2.png";
import image3 from "@/public/image/Admin/img3.png";
import aiIcon from "@/public/image/Admin/sparkles.svg";
import CreateKnowledgeModal from "./CreateKnowledgeModal";

// --- Font Setup ---
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// --- Type Definitions ---
interface CustomToolIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AttachedFile {
  id: number;
  name: string;
}

// --- Component ---
const CustomToolIntegrationModal: React.FC<CustomToolIntegrationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const knowledgeInstruction: string =
    "You are an information agent for answering informational queries. Your aim is to provide clear, concise responses to user questions. Use the policy below to assemble your answer.";

  const knowledgeContent: string =
    "Paystack is a leading African financial technology company that provides a payment gateway and solutions to help businesses on the continent accept payments online and in person.\n\nHere is a breakdown of how the Paystack payment system generally works, focusing on the flow for an online transaction";

  const [attachedFiles] = useState<AttachedFile[]>([
    { id: 1, name: "kaws.png" },
    { id: 2, name: "burger.jpeg" },
    { id: 3, name: "starbucks.jpg" },
  ]);

  const getImageUrl = (id: number): string => {
    if (id === 1) return image1.src || (image1 as any);
    if (id === 2) return image2.src || (image2 as any);
    if (id === 3) return image3.src || (image3 as any);
    return "https://via.placeholder.com/100x100";
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 px-5 flex items-center justify-center bg-[rgba(0,0,0,0.5)] ${inter.className}`}
      onClick={onClose}
    >
      <div
        className="w-full sm:w-11/12 lg:w-3/4 xl:w-[700px] max-h-[90vh] overflow-hidden bg-white rounded-lg shadow-2xl relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* --- Modal Header --- */}
        <div className="p-4 sm:p-6 flex justify-between items-center">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-xl font-semibold text-gray-800">
              Custom Tool Integration UI Fields
            </h2>

            {/* --- EDIT BUTTON --- */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent modal from closing
                setIsModalOpen(true); // Open child modal
              }}
              className="flex items-center justify-center gap-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-colors px-3 py-2 text-sm font-medium"
              aria-label="Edit item"
            >
              <Edit className="w-4 h-4" />
              <p>Edit</p>
            </button>
          </div>

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

        {/* --- Modal Body --- */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[75vh]">
          {/* Knowledge Instructions */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Knowledge</h3>
            <div className="text-sm text-gray-700 leading-relaxed">
              <p>{knowledgeInstruction}</p>
            </div>
          </div>

          {/* Knowledge Content + Ask AI Button */}
          <div className="mb-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-gray-800">Knowledge</h3>
              <button className="flex items-center space-x-1 px-4 py-2 text-violet-600 bg-violet-50 rounded-lg border border-violet-200 hover:bg-violet-100 transition-colors text-sm font-medium">
                <Image src={aiIcon} alt="Ask AI Icon" width={16} height={16} />
                <span>Ask AI</span>
              </button>
            </div>
            <div className="text-sm text-gray-600 leading-relaxed">
              {knowledgeContent.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Attachment Section */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Attachment</h3>
            <div className="flex space-x-3">
              {attachedFiles.map((file) => (
                <div
                  key={file.id}
                  className="relative w-1/3 aspect-square rounded-lg overflow-hidden border border-gray-300 shadow-md"
                >
                  <img
                    src={getImageUrl(file.id)}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Child Modal */}
            <CreateKnowledgeModal
              title="Edit"
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomToolIntegrationModal;
