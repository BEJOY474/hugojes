"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import commentPlusIcon from "@/public/image/dashboard/ComponentPlusIcon.svg";
import commentUploadIcon from "@/public/image/dashboard/ComponentUploadIcon.svg";

import FileManagementView from "@/components/dashboard/FileManagerView";
import Chatview from "./Chatview";

import knowledgeIcon from "@/public/image/dashboard/brain.svg";
import filePdfIcon from "@/public/image/dashboard/file-type-2.svg";
import foleTextIcon from "@/public/image/dashboard/file-text.svg";

import startIcon from "@/public/image/dashboard/startWhiteIcon.svg";
import copytIcon from "@/public/image/dashboard/copy.svg";
import likeIcon from "@/public/image/dashboard/like.svg";
import dislikeIcon from "@/public/image/dashboard/dislike.svg";
import reloadIcon from "@/public/image/dashboard/refresh.svg";

import { Inter } from "next/font/google";
import Settings from "./Settings";
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

interface SlashCommandPopupProps {
  command: string;
  position: string;
}

interface FileIconComponentProps {
  fileType: "pdf" | "txt" | string | null;
}

interface ChatMessageProps {
  sender: "AI" | "Human" | string;
  text: string;
}

interface ChatContentDisplayProps {
  title: string;
  placeholder: string;
}

interface MainContentProps {
  activeItem: string;
  contentMap?: any;
  setActiveItem: (item: string) => void;
}

const KnowledgeIconComponent = () => (
  <span className="mr-3 rounded-full flex items-center justify-center">
    <Image
      src={knowledgeIcon}
      alt="Knowledge Icon"
      width={22}
      height={22}
      className="text-[#7F56D9]"
    />
  </span>
);

const FileIconComponent = ({ fileType }: FileIconComponentProps) => {
  const type = fileType || "txt";
  const iconSrc = type === "pdf" ? filePdfIcon : foleTextIcon;

  return (
    <span className="mr-3 flex-shrink-0">
      <Image src={iconSrc} alt={`${type} file icon`} width={22} height={22} />
    </span>
  );
};

const SlashCommandPopup = ({ command, position }: SlashCommandPopupProps) => {
  const items = [
    { type: "knowledge", name: "knowledge name", fileType: null },
    { type: "file", name: "Filename.pdf", fileType: "pdf" },
    { type: "file", name: "Filename.txt", fileType: "txt" },
    { type: "file", name: "Filename.txt", fileType: "txt" },
    { type: "file", name: "Filename.txt", fileType: "txt" },
  ];

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(command.toLowerCase())
  );

  if (filteredItems.length === 0) return null;

  return (
    <div
      className={`absolute left-0 w-64 bg-white p-3 rounded-xl border border-[rgba(31,30,29,0.15)] shadow-[0px_4px_20px_rgba(0,0,0,0.04)] text-[14px] font-medium ${position} z-50`}
    >
      {filteredItems.map((item, index) => (
        <button
          key={index}
          className={`${
            inter.className
          } flex items-center w-full p-2 font-medium text-[14px] rounded-xl text-left transition-colors duration-150 ${
            index === 0
              ? "bg-[#f9f5ff] text-[#3d3d3a] text-[14px] font-medium"
              : "hover:bg-gray-50 text-[#3D3D3A]"
          }`}
        >
          {item.type === "knowledge" ? (
            <KnowledgeIconComponent />
          ) : (
            <FileIconComponent fileType={item.fileType} />
          )}
          <span className="truncate">{item.name}</span>
        </button>
      ))}
    </div>
  );
};

const ChatMessage = ({ sender, text }: ChatMessageProps) => {
  const isAI = sender === "AI";

  const aiMessageClasses = " text-[#4B4B4B] ";
  const userMessageClasses =
    "bg-[#FFFFFF] text-[#727272] rounded-tl-[20px] rounded-tr-[0px] rounded-bl-[20px] rounded-br-[20px] border border-gray-300 border border-[rgba(31,30,29,0.15)] w-3/4 ";

  const visibleIconButtonClasses =
    "text-[#7F56D9] hover:text-[#6941C6] transition-colors p-1 rounded";

  return (
    <div
      className={`flex ${isAI ? "justify-start" : "justify-end"} w-full mb-4`}
    >
      <div
        className={`px-4 py-3 rounded-xl ${
          isAI ? aiMessageClasses : userMessageClasses
        }`}
      >
        <div>
          <p
            className={`${inter.className} text-[16px] ${
              isAI ? "pl-11 pt-1 pb-1" : ""
            }`}
          >
            {text}
          </p>
        </div>

        {isAI && (
          <div className="flex items-center mt-3 justify-between">
            <div className="mr-2 flex items-center justify-center w-10 h-10 bg-[#7F56D9] rounded-full">
              <Image
                src={startIcon}
                alt="AI Start Icon"
                width={20}
                height={20}
              />
            </div>

            <div className="flex items-center gap-2 space-x-2">
              <button
                aria-label="Copy message"
                className={visibleIconButtonClasses}
              >
                <Image src={copytIcon} alt="Copy" width={20} height={20} />
              </button>
              <button aria-label="Like" className={visibleIconButtonClasses}>
                <Image src={likeIcon} alt="Like" width={18} height={18} />
              </button>
              <button aria-label="Dislike" className={visibleIconButtonClasses}>
                <Image src={dislikeIcon} alt="Dislike" width={20} height={20} />
              </button>
              <button
                aria-label="Retry"
                className="text-[#7F56D9] hover:text-[#6941C6] flex items-center space-x-1"
              >
                <span className="text-[16px] mr-2 text-[#727272]">Retry</span>
                <Image src={reloadIcon} alt="Retry" width={20} height={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ChatContentDisplay = ({
  title,
  placeholder,
}: ChatContentDisplayProps) => {
  const [inputValue, setInputValue] = useState("");
  const [showSlashCommand, setShowSlashCommand] = useState(false);
  const [slashCommandValue, setSlashCommandValue] = useState("");

  // FIX: useRef-এ সঠিক DOM এলিমেন্ট টাইপ প্রয়োগ করা হলো
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  const [popupPosition, setPopupPosition] = useState("bottom-full mb-3");

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Human",
      text: "To integrate a custom tool, what are the required fields that I need to have on my UI?",
    },
    {
      id: 2,
      sender: "AI",
      text: "To integrate a custom tool, you need a user interface that captures the essential details for making an API request. The fields can be broken down into core requirements and recommended additions for a better user experience.",
    },
  ]);

  const scrollToBottom = () => {
    // FIX: chatBodyRef.current চেক করা হলো
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setInputValue(value);

    // FIX: element-এর টাইপ নিশ্চিত করা হলো
    const element = textareaRef.current;
    if (element) {
      element.style.height = "auto";
      element.style.height = element.scrollHeight + "px";

      if (value.startsWith("/")) {
        setShowSlashCommand(true);
        setSlashCommandValue(value.substring(1));

        const rect = element.getBoundingClientRect();
        if (rect.top > window.innerHeight * 0.5) {
          setPopupPosition("bottom-full mb-3");
        } else {
          setPopupPosition("top-full mt-3");
        }
      } else {
        setShowSlashCommand(false);
        setSlashCommandValue("");
        setPopupPosition("bottom-full mb-3");
      }
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      sender: "Human",
      text: inputValue.trim(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");

    // FIX: textareaRef.current চেক করা হলো
    if (textareaRef.current) {
      textareaRef.current.style.height = "24px";
    }

    setTimeout(() => {
      const aiReply = {
        id: messages.length + 2,
        sender: "AI",
        text: "Thank you for the input. I will process your request now. For core integration, the API URL, Authentication type, and Tool Description are essential.",
      };
      setMessages((prevMessages) => [...prevMessages, aiReply]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-4rem)] bg-white lg:bg-[#F5F5F5]">
      <div className="p-4 lg:p-6">
        <div className="flex items-center">
          <span className="text-xl font-semibold text-[#3D3D3A]">{title}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-1 text-gray-500 cursor-pointer"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div
        ref={chatBodyRef}
        className="flex-1 overflow-y-auto p-4 py-8 lg:p-8 flex flex-col pb-28 lg:pb-32"
      >
        <div className="w-full max-w-2xl mx-auto flex flex-col space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              sender={message.sender}
              text={message.text}
            />
          ))}
        </div>
      </div>

      <div className="p-4 lg:p-8 flex justify-center w-full z-20 lg:border-t-0 fixed bottom-0 left-0 right-0">
        <div className="bg-white p-4 lg:ml-60 rounded-3xl shadow-[0px_4px_20px_rgba(0,0,0,0.04),_0px_0px_0px_0.5px_rgba(31,30,29,0.15)] flex-col items-end justify-between w-full max-w-2xl lg:w-1/2">
          <div className="w-full flex relative">
            {showSlashCommand && (
              <SlashCommandPopup
                command={slashCommandValue}
                position={popupPosition}
              />
            )}

            <div className="flex-grow mx-2 overflow-hidden">
              <textarea
                ref={textareaRef}
                placeholder={placeholder}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                value={inputValue}
                className="custom-textarea-style relative bg-[#FFFFFF] text-[#727272] w-full resize-none outline-none placeholder-gray-500"
              />
            </div>
          </div>
          <div className="w-full flex justify-between mt-2">
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              aria-label="Add attachment"
            >
              <Image
                src={commentPlusIcon}
                alt="Add attachment"
                width={20}
                height={20}
              />
            </button>
            <button
              onClick={handleSendMessage}
              className="bg-[#7F56D9] text-white p-2 rounded-full hover:bg-indigo-700 transition-colors flex-shrink-0"
              aria-label="Send message"
            >
              <Image
                src={commentUploadIcon}
                alt="Send message"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainContent = ({
  activeItem = "Chats",
  contentMap,
  setActiveItem,
}: MainContentProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const chatPlaceholder = "How can I help you today?";
  const [uploadedImage, setUploadedImage] = useState<
    string | ArrayBuffer | null
  >(null); // Type added for uploadedImage
  const [newChatInputValue, setNewChatInputValue] = useState("");
  const [newChatShowSlashCommand, setNewChatShowSlashCommand] = useState(false);
  const [newChatSlashCommandValue, setNewChatSlashCommandValue] = useState("");
  const [newChatPopupPosition, setNewChatPopupPosition] =
    useState("bottom-full mb-3");

  const isRecentChatView = activeItem.startsWith(
    "Custom Tool Integration UI Fields - Recent"
  );
  const isNewChatView = activeItem === "New Chat";
  const isChatListView = activeItem === "Chats";
  const isLibraryView = activeItem === "Library";
  // FIX: isSettingsView is not defined in the original code, but used in the conditional rendering.
  const isSettingsView = activeItem === "Settings";

  const chatTitle = "Custom Tool Integration UI Fields";

  const globalStyles = (
    <style jsx global>{`
      .custom-textarea-style {
        padding: 0px 8px;
        min-height: 24px;
        max-height: 200px;
        line-height: 24px;
        background-color: transparent;
        border: none;
      }
      .custom-textarea-style::-webkit-scrollbar {
        width: 6px;
      }
      .custom-textarea-style::-webkit-scrollbar-track {
        background: transparent;
      }
      .custom-textarea-style::-webkit-scrollbar-thumb {
        background-color: #d1d5db;
        border-radius: 3px;
      }
      .custom-textarea-style::-webkit-scrollbar-thumb:hover {
        background-color: #9ca3af;
      }
    `}</style>
  );

  if (isChatListView) {
    return (
      <main className="flex-1 min-h-screen bg-white lg:bg-[#F5F5F5]">
        {globalStyles}
        <Chatview setActiveItem={setActiveItem} />
      </main>
    );
  }

  if (isLibraryView) {
    return (
      <main className="flex-1 min-h-screen bg-[#F5F5F5]">
        {globalStyles}
        <FileManagementView />
      </main>
    );
  }

  if (isRecentChatView) {
    return (
      <main className="flex-1 min-h-screen bg-gray-100">
        {globalStyles}
        <ChatContentDisplay title={chatTitle} placeholder={chatPlaceholder} />
      </main>
    );
  }

  if (isNewChatView) {
    const handleInputChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      const value = event.target.value;
      setNewChatInputValue(value);

      const element = textareaRef.current;
      if (element) {
        element.style.height = "auto";
        element.style.height = element.scrollHeight + "px";

        if (value.startsWith("/")) {
          setNewChatShowSlashCommand(true);
          setNewChatSlashCommandValue(value.substring(1));

          const rect = element.getBoundingClientRect();
          if (rect.top > window.innerHeight * 0.5) {
            setNewChatPopupPosition("bottom-full mb-3");
          } else {
            setNewChatPopupPosition("top-full mt-3");
          }
        } else {
          setNewChatShowSlashCommand(false);
          setNewChatSlashCommandValue("");
          setNewChatPopupPosition("bottom-full mb-3");
        }
      }
    };

    return (
      <main className="flex-1 min-h-screen bg-[#F5F5F5]">
        {globalStyles}
        <div className="flex flex-col items-center bg-[#F5F5F5] justify-center h-full min-h-[calc(100vh-4rem)]">
          <h1 className="font-sans text-[48px] font-medium text-[#727272] mb-8">
            Hello Boni
          </h1>
          <div className="p-4 lg:p-8 flex justify-center w-full z-10">
            <div className="w-full lg:w-1/2 max-w-2xl bg-white p-4 rounded-3xl shadow-[0px_4px_20px_rgba(0,0,0,0.04),_0px_0px_0px_0.5px_rgba(31,30,29,0.15)] flex-col items-end justify-between">
              <div className="w-full flex relative">
                {newChatShowSlashCommand && (
                  <SlashCommandPopup
                    command={newChatSlashCommandValue}
                    position={newChatPopupPosition}
                  />
                )}

                <div className="flex-grow mx-2 overflow-hidden">
                  {uploadedImage && (
                    <div className="relative w-16 h-16 mb-2 rounded-md overflow-hidden">
                      {/* uploadedImage is used here, so its type should be compatible with src */}
                      <Image
                        src={uploadedImage as string}
                        alt="Preview"
                        fill
                        className="object-cover rounded-md"
                      />
                      <button
                        onClick={() => setUploadedImage(null)}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                  <textarea
                    ref={textareaRef}
                    placeholder="How can I help you today?"
                    onChange={handleInputChange}
                    value={newChatInputValue}
                    className="custom-textarea-style bg-[#FFFFFF] text-[#727272] w-full resize-none outline-none placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="w-full flex justify-between mt-2">
                {/* Upload Image Button */}
                <div className="relative flex items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    id="fileUpload"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      // Type added for e
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setUploadedImage(reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    aria-label="Add attachment"
                  >
                    <Image
                      src={commentPlusIcon}
                      alt="Add attachment"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>

                <button
                  className="bg-[#7F56D9] text-white p-2 rounded-full hover:bg-indigo-700 transition-colors flex-shrink-0"
                  aria-label="Send message"
                >
                  <Image
                    src={commentUploadIcon}
                    alt="Send message"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isSettingsView) {
    return (
      <main className="flex-1 min-h-screen lg:bg-[#F5F5F5]">
        <Settings />
      </main>
    );
  }

  return (
    <main className="flex-1 min-h-screen bg-gray-100">
      {globalStyles}
      <ChatContentDisplay title={chatTitle} placeholder={chatPlaceholder} />
    </main>
  );
};

export default MainContent;
