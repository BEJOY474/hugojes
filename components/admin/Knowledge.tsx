"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";

// --- Custom SVG icons ---
import searchIcon from "@/public/image/Admin/search.svg";
import plusIcon from "@/public/image/Admin/plus.svg";
import eliplsIcon from "@/public/image/Admin/ellipsis (1).svg";
import listIcon from "@/public/image/Admin/downIcon.svg";
import brainIcon from "@/public/image/Admin/brain.svg";

import CreateKnowledgeModal from "./CreateKnowledgeModal";
import CustomToolModel from "./CustopmToolModal";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// --- Mock Data ---
interface KnowledgeArticle {
  id: number;
  title: string;
  subtitle: string;
  date: string;
}

const mockKnowledgeArticles: KnowledgeArticle[] = [
  {
    id: 1,
    title: "Custom Tool Integration UI",
    subtitle: "Fields",
    date: "Yesterday",
  },
  {
    id: 2,
    title: "Custom Tool Integration UI",
    subtitle: "Fields",
    date: "Yesterday",
  },
  {
    id: 3,
    title: "Custom Tool Integration UI",
    subtitle: "Fields",
    date: "Yesterday",
  },
  {
    id: 4,
    title: "Custom Tool Integration UI",
    subtitle: "Fields",
    date: "Yesterday",
  },
  {
    id: 5,
    title: "Custom Tool Integration UI",
    subtitle: "Fields",
    date: "Yesterday",
  },
  {
    id: 6,
    title: "Custom Tool Integration UI",
    subtitle: "Fields",
    date: "Yesterday",
  },
  {
    id: 7,
    title: "Custom Tool Integration UI",
    subtitle: "Fields",
    date: "Yesterday",
  },
  {
    id: 8,
    title: "Custom Tool Integration UI",
    subtitle: "Fields",
    date: "Yesterday",
  },
];

const KNOWLEDGE_TYPES = ["All Type", "Documents", "Images", "PDFs"];
const SORT_OPTIONS = ["Recent", "Oldest", "Alphabetical"];

// --- Knowledge Card Component (unchanged) ---
interface KnowledgeCardProps extends KnowledgeArticle {
  onClick?: () => void;
}

const KnowledgeCard: React.FC<KnowledgeCardProps> = ({
  title,
  subtitle,
  date,
  onClick,
}) => (
  <div
    onClick={onClick}
    className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 flex flex-col justify-between hover:shadow-md transition-shadow duration-200 cursor-pointer"
  >
    <div className="flex justify-between items-start">
      <div className="flex items-start space-x-3">
        {/* Brain Icon */}
        <div className="p-1 rounded-full bg-gray-100">
          <Image src={brainIcon} alt="Settings Icon" width={24} height={24} />
        </div>
        <div className="truncate">
          <p
            className={`${inter.className} text-base sm:text-lg font-medium text-gray-900 truncate`}
          >
            {title}
          </p>
          <p className={`${inter.className} text-sm text-gray-500 truncate`}>
            {subtitle}
          </p>
          <p className={`${inter.className} text-xs text-gray-400 mt-1`}>
            {date}
          </p>
        </div>
      </div>

      {/* Ellipsis Icon */}
      <button className="p-1 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
        <Image src={eliplsIcon} alt="Menu" width={20} height={20} />
      </button>
    </div>
  </div>
);

// --- Dropdown Button Component ---
interface DropdownButtonProps {
  label: string;
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  options,
  selectedOption,
  onSelect,
  isOpen,
  setIsOpen,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Hook to close the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-violet-500"
      >
        <span>{selectedOption}</span>
        <Image
          src={listIcon}
          alt="Dropdown"
          width={16}
          height={16}
          className={`transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown Menu Panel */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 rounded-lg shadow-lg bg-white">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <a
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`block px-4 py-2 text-sm cursor-pointer ${
                  selectedOption === option
                    ? "bg-gray-100 text-violet-600 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                role="menuitem"
              >
                {option}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Knowledge Main View Component ---
const KnowledgeView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenCustomTools, setIsModalOpenCustomTools] = useState(false);

  // States for filter selection
  const [selectedType, setSelectedType] = useState(KNOWLEDGE_TYPES[0]); // "All Type"
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]); // "Recent"

  // States for dropdown visibility
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const openCustomToolModal = () => {
    setIsModalOpenCustomTools(true);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[#F8F9FA] min-h-full">
      {/* Header Section (unchanged) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
        <div className="space-y-1">
          <h1
            className={`${inter.className} text-2xl sm:text-3xl font-semibold text-[#101828]`}
          >
            Knowledge
          </h1>
          <p
            className={`${inter.className} text-sm sm:text-base text-gray-500`}
          >
            Manage your knowledge articles and content
          </p>
        </div>

        {/* Create New Button (unchanged) */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-[#7F56D9] text-white rounded-lg font-medium text-sm sm:text-base shadow-md hover:bg-[#6941C8] transition-colors"
        >
          <Image src={plusIcon} alt="Add" width={18} height={18} />
          <span>Create New</span>
        </button>
      </div>

      {/* Toolbar: Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center bg-white p-4 sm:p-5 rounded-xl border border-gray-200 mb-8 gap-3 sm:gap-4">
        {/* Search Input (unchanged) */}
        <div className="relative flex-1 w-full">
          <Image
            src={searchIcon}
            alt="Search"
            width={20}
            height={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search articles"
            className="w-full pl-10 pr-4 py-2 outline-none sm:py-2.5 border border-gray-300 rounded-lg text-gray-700 text-sm sm:text-base"
          />
        </div>

        {/* Filter Buttons: Using the new DropdownButton component */}
        <div className="flex flex-wrap sm:flex-nowrap space-x-0 sm:space-x-3 space-y-2 sm:space-y-0 justify-start">
          {/* Type Dropdown Button */}
          <DropdownButton
            label="All Type"
            options={KNOWLEDGE_TYPES}
            selectedOption={selectedType}
            onSelect={setSelectedType}
            isOpen={isTypeDropdownOpen}
            setIsOpen={setIsTypeDropdownOpen}
          />

          {/* Sort Dropdown Button */}
          <DropdownButton
            label="Recent"
            options={SORT_OPTIONS}
            selectedOption={selectedSort}
            onSelect={setSelectedSort}
            isOpen={isSortDropdownOpen}
            setIsOpen={setIsSortDropdownOpen}
          />
        </div>
      </div>

      {/* Knowledge Articles Grid (unchanged) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {mockKnowledgeArticles.map((article) => (
          <KnowledgeCard
            key={article.id}
            {...article}
            onClick={openCustomToolModal}
          />
        ))}
      </div>

      {/* Modals (unchanged) */}
      <CreateKnowledgeModal
        title="Create Knowledge"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <CustomToolModel
        isOpen={isModalOpenCustomTools}
        onClose={() => setIsModalOpenCustomTools(false)}
      />
    </div>
  );
};

export default KnowledgeView;
