// src/app/admin/UserManagementView/page.tsx (Assuming this is the path)

"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Image from "next/image";
import { Search, Eye, Edit, Trash2, Plus, X } from "lucide-react";
import { Inter } from "next/font/google";

// Assuming these are defined elsewhere
import UserDetailView from "./ViewUserDetails";
import UserEdit from "./UserEdit";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// --- Interface Definitions ---
export interface User {
  id: number;
  name: string;
  email: string;
  registeredDate: string;
  status: "Active" | "Inactive";
  avatarSrc: string;
  phone: string;
  lastLogin: string;
  totalLibrary: number;
  totalQueries: number;
  recentActivity: { id: number; description: string; time: string }[];
}

const initialMockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    registeredDate: "2025-10-15",
    status: "Active",
    avatarSrc: "/image/Admin/userIcon.jpg",
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
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    registeredDate: "2025-10-20",
    status: "Active",
    avatarSrc: "/image/Admin/userIcon.jpg",
    phone: "+1 (555) 555-0000",
    lastLogin: "2025-10-28 09:00 AM",
    totalLibrary: 30,
    totalQueries: 150,
    recentActivity: [],
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    registeredDate: "2025-10-22",
    status: "Active",
    avatarSrc: "/image/Admin/userIcon.jpg",
    phone: "+1 (555) 555-1111",
    lastLogin: "2025-10-29 02:00 PM",
    totalLibrary: 12,
    totalQueries: 80,
    recentActivity: [],
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    registeredDate: "2025-10-25",
    status: "Inactive",
    avatarSrc: "/image/Admin/userIcon.jpg",
    phone: "+1 (555) 555-2222",
    lastLogin: "2025-10-20 04:00 PM",
    totalLibrary: 5,
    totalQueries: 20,
    recentActivity: [],
  },
];

interface ConfirmDeleteModalProps {
  user: User | null;
  onClose: () => void;
  onConfirm: (userId: number) => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  user,
  onClose,
  onConfirm,
}) => {
  if (!user) return null;

  const handleDelete = () => {
    onConfirm(user.id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center p-4 z-[110]"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-xl shadow-2xl w-full max-w-sm ${inter.className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-red-600">
              Confirm Deletion
            </h3>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="text-gray-700 mb-6">
            Are you sure you want to permanently delete{" "}
            <span className="font-semibold text-[#101828]">{user.name}</span> (
            {user.email})?
          </p>
          <p className="text-sm text-gray-500 mb-6">
            This action cannot be undone.
          </p>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 text-sm"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AddNewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, email: string) => void;
}

const AddNewUserModal: React.FC<AddNewUserModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && email && password) {
      onAdd(name, email);
      setName("");
      setEmail("");
      setPassword("");
      onClose();
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center p-4 z-[100]"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-xl shadow-2xl w-full max-w-md ${inter.className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-start">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#101828]">
              Add New User
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Create a new user account for the platform
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#101828] mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              placeholder="Enter user name"
              className="w-full p-3 border text-black border-gray-300 rounded-lg bg-[#F3F3F5] outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#101828] mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              placeholder="Enter user email"
              className="w-full p-3 border border-gray-300 text-black rounded-lg bg-[#F3F3F5] outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#101828] mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              placeholder="Enter password"
              className="w-full p-3 border text-black border-gray-300 rounded-lg bg-[#F3F3F5] outline-none text-sm"
            />
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#7F56D9] text-white rounded-lg shadow-md hover:bg-[#6941C6] text-sm"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// =======================
// 🧩 User List Item (Responsiveness Focused)
// =======================
interface UserListItemProps {
  user: User;
  searchTerm: string;
  onDeleteClick: (user: User) => void;
  onViewClick: (user: User) => void;
  onEditClick: (user: User) => void;
}

// Highlight the text that matches the search term
const highlightText = (text: string, searchTerm: string) => {
  if (!searchTerm) return text;

  // Create a case-insensitive regular expression to find the search term
  const regex = new RegExp(`(${searchTerm})`, "gi");

  // Split the text by the search term and map over the parts
  return text.split(regex).map((part, index) => {
    // If the part matches the search term, wrap it with a span to highlight
    if (part.toLowerCase() === searchTerm.toLowerCase()) {
      return (
        <span key={index} className="bg-yellow-200">
          {part}
        </span>
      );
    }
    return part; // Otherwise, just return the original text
  });
};

// FIX: Component signature updated to use the full UserListItemProps interface
const UserListItem: React.FC<UserListItemProps> = ({
  user,
  searchTerm,
  onDeleteClick, // Destructure the new props
  onViewClick, // Destructure the new props
  onEditClick, // Destructure the new props
}) => {
  return (
    <div className="p-2 sm:p-4 bg-white">
      <div className="flex flex-col sm:flex-row justify-between w-full p-3 sm:p-4 rounded-lg items-start sm:items-center bg-white border border-gray-100">
        {/* User Info (Name, Email, Status, Date) */}
        <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 flex-1 min-w-0 mb-3 sm:mb-0">
          <div className="h-10 w-10 rounded-full relative overflow-hidden flex-shrink-0">
            <Image
              src={user.avatarSrc}
              alt={user.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center space-x-2 flex-wrap">
              {/* Highlight the user's name */}
              <p className="text-sm sm:text-[16px] font-medium text-[#101828] truncate max-w-full sm:max-w-none">
                {highlightText(user.name, searchTerm)} {/* Highlight name */}
              </p>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  user.status === "Active"
                    ? "bg-[#00C950] text-white"
                    : "bg-gray-100 text-gray-500"
                } mt-1 sm:mt-0`}
              >
                {highlightText(user.status, searchTerm)}{" "}
                {/* Highlight status */}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 truncate max-w-[80vw] sm:max-w-none">
              {highlightText(user.email, searchTerm)} {/* Highlight email */}
            </p>
            <p className="text-xs text-gray-400 mt-0.5 sm:mt-0">
              Registered: {user.registeredDate}
            </p>
          </div>
        </div>

        {/* Action Buttons (Added to use the new props) */}
        <div className="flex space-x-2 sm:space-x-3 flex-shrink-0">
          <button
            onClick={() => onViewClick(user)}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
            title="View User Details"
          >
            <Eye className="h-5 w-5" />
          </button>
          <button
            onClick={() => onEditClick(user)}
            className="p-2 rounded-full text-blue-500 hover:bg-blue-50 transition-colors"
            title="Edit User"
          >
            <Edit className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDeleteClick(user)}
            className="p-2 rounded-full text-red-500 hover:bg-red-50 transition-colors"
            title="Delete User"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// =======================
// 🧩 Main User Management View (Responsiveness Focused)
// =======================
const UserManagementView: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialMockUsers);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNewUser = (name: string, email: string) => {
    const newId =
      users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    const newUser: User = {
      id: newId,
      name,
      email,
      registeredDate: new Date().toISOString().split("T")[0],
      status: "Active",
      avatarSrc: "/image/Admin/userIcon.jpg",
      phone: "N/A",
      lastLogin: new Date().toLocaleTimeString(),
      totalLibrary: 0,
      totalQueries: 0,
      recentActivity: [],
    };
    setUsers((prev) => [...prev, newUser]);
  };

  const handleDeleteUser = (userId: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const openDeleteModal = (user: User) => setUserToDelete(user);
  const handleViewUser = (user: User) => setSelectedUser(user);
  const handleEditUser = (user: User) => setEditingUser(user);

  const handleBackToList = () => {
    setSelectedUser(null);
    setEditingUser(null);
  };

  const handleSaveEditedUser = (updatedUserPartial: any) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === updatedUserPartial.id) {
          return { ...u, ...updatedUserPartial } as User;
        }
        return u;
      })
    );
    setEditingUser(null);
  };

  if (selectedUser)
    return <UserDetailView user={selectedUser} onBack={handleBackToList} />;

  if (editingUser)
    return (
      <UserEdit
        user={editingUser}
        onBack={handleBackToList}
        onSave={handleSaveEditedUser}
      />
    );

  return (
    <div
      className={`p-4 sm:p-6 lg:p-8 bg-[#F8F9FA] min-h-full ${inter.className}`}
    >
      {/* Header and Add Button (Flex wrap on small screens) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl sm:text-[28px] lg:text-[32px] font-semibold text-[#101828]">
            User Management
          </h1>
          <p className="text-sm sm:text-[16px] text-gray-500">
            Manage platform users and their permissions
          </p>
        </div>
        <button
          className="flex items-center bg-[#7F56D9] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#6941C6] mt-4 sm:mt-0 text-sm sm:text-base"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
          Add New User
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 p-4 sm:p-6 rounded-lg bg-white border border-gray-300">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            className="w-full pl-10 pr-4 py-2 sm:py-3 border text-black border-gray-200 rounded-lg outline-none transition-shadow focus:ring-2 focus:ring-violet-300 text-sm sm:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* User List Container */}
      <div className="bg-white rounded-[14px] border border-gray-200 overflow-hidden">
        <h2 className="text-lg sm:text-[18px] font-semibold text-[#101828] px-4 mt-4">
          All Users ({users.length})
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 px-4 pb-4">
          Browse and manage user accounts
        </p>

        <div>
          {/* List Items */}
          {filteredUsers.map((user) => (
            <UserListItem
              key={user.id}
              user={user}
              searchTerm={searchTerm}
              onDeleteClick={openDeleteModal} // Now correctly assigned
              onViewClick={handleViewUser} // Now correctly assigned
              onEditClick={handleEditUser} // Now correctly assigned
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center p-4">
        <button className="text-sm text-[#7F56D9] font-medium hover:text-[#6941C6]">
          Load More
        </button>
      </div>

      <AddNewUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddNewUser}
      />

      <ConfirmDeleteModal
        user={userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleDeleteUser}
      />
    </div>
  );
};

export default UserManagementView;
