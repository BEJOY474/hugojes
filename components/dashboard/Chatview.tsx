import React, { useState } from "react";
import Image from "next/image";
import plusIcon from "@/public/image/dashboard/plus2.svg";
import elipshIcon from "@/public/image/dashboard/ellipsis.svg";
import searchIcon from "@/public/image/dashboard/search.svg";
import { Inter } from "next/font/google";
import rename from "@/public/image/dashboard/text-cursor-input.svg";
import deleteIcon from "@/public/image/dashboard/delete.svg";

// Font setup
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Dummy chat data
const INITIAL_CHATS = [
  {
    id: 1,
    title: "Custom Tool Integration UI Fields",
    lastMessageTime: "20 minutes ago",
  },
  {
    id: 2,
    title: "Another Chat Example",
    lastMessageTime: "1 hour ago",
  },
];

// Define the prop types for Chatview
interface ChatviewProps {
  setActiveItem: (item: string) => void;
}

const Chatview = ({ setActiveItem }: ChatviewProps) => {
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const handleNavigation = () => {
    setActiveItem("New Chat"); // Navigate to the "New Chat" screen
  };

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleDeleteChat = (chatId: number) => {
    const updatedChats = chats.filter((chat) => chat.id !== chatId);
    setChats(updatedChats);
    setOpenMenuId(null);
    console.log(
      `Attempted to delete chat ${chatId}. New chat list count: ${updatedChats.length}`
    );
  };

  return (
    <div className="p-4 lg:p-8 flex-1 lg:mr-8 bg-[#F5F5F5] min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex justify-between mt-10 items-center mb-6">
        <h1
          className={`${inter.className} text-[32px] font-medium text-[#000]`}
        >
          Chats
        </h1>
        <button
          className={`${inter.className} flex items-center font-normal text-[16px] bg-[#7F56D9] text-white pt-[12px] pr-[14px] pb-[12px] pl-[10px] rounded-[8px] hover:bg-indigo-700`}
          onClick={handleNavigation}
        >
          <div className="relative w-7 h-7 mr-2">
            <Image
              src={plusIcon}
              alt="Start New Chat Icon"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <p>Start New Chat</p>
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-8 relative text-[#808080]">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5">
          <Image src={searchIcon} alt="Search Icon" fill />
        </div>
        <input
          type="text"
          placeholder="Search chat"
          className={`${inter.className}
            w-full 
            p-3 
            pl-10 
            text-gray-800 
            border border-[rgba(31,30,29,0.15)] 	
            bg-[#ffffff]
            outline-none 
            focus:outline-none
            rounded-xl 
            placeholder-gray-500`}
        />
      </div>

      {/* Chat List */}
      <div className="space-y-3">
        {chats.length === 0 ? (
          <div className="flex justify-center items-center">
            <p
              className={`${inter.className} text-[#000000] text-[20px] text-lg font-medium`}
            >
              No chat available
            </p>
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className="relative flex justify-between items-center p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
            >
              {/* Chat Info */}
              <div
                className="flex-1 cursor-pointer"
                onClick={() => console.log(`Open chat ${chat.id}`)}
              >
                <p
                  className={`${inter.className} text-[16px] font-medium text-[#3d3d3a]`}
                >
                  {chat.title}
                </p>
                <p className={`${inter.className} text-[12px] text-[#6d6d6d]`}>
                  Last message {chat.lastMessageTime}
                </p>
              </div>

              {/* Options Button */}
              <button
                className="p-2 text-gray-500 hover:text-[#7F56D9] ml-4 relative w-6 h-6 z-10"
                onClick={() => toggleMenu(chat.id)}
                aria-label="Chat options"
              >
                <Image src={elipshIcon} alt="Options Icon" fill />
              </button>

              {/* Dropdown Menu */}
              {openMenuId === chat.id && (
                <div className="absolute right-7 mt-20 w-48 bg-white border border-[rgba(31,30,29,0.15)] rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] origin-top-right transform translate-x-1 translate-y-2 z-20">
                  <div className="py-1">
                    <button
                      className="flex items-center w-full gap-2 px-4 py-2 text-sm text-[#3D3D3A] hover:bg-gray-100"
                      onClick={() => {
                        console.log(`Rename chat ${chat.id}`);
                        setOpenMenuId(null);
                      }}
                    >
                      <Image src={rename} alt="rename" height={20} width={20} />
                      Rename
                    </button>
                    <button
                      className="flex font-medium items-center w-full px-4 py-3 text-sm text-[14px] text-[#DE1C1C] hover:bg-red-50"
                      onClick={() => handleDeleteChat(chat.id)}
                    >
                      <Image
                        src={deleteIcon}
                        alt="delete"
                        height={20}
                        width={20}
                      />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Chatview;
