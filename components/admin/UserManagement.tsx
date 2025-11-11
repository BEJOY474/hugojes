"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { Search, Eye, Edit, Trash2, Plus, X } from "lucide-react";
import { Inter } from "next/font/google";

import UserDetailView from "./ViewUserDetails";
import UserEdit from "./UserEdit";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// =======================
// 🧩 User Interface + Mock Data
// =======================
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

// =======================
// 🧩 Confirm Delete Modal
// =======================
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
      className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-[110]"
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
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// =======================
// 🧩 Add New User Modal
// =======================
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
      className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-[100]"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-xl shadow-2xl w-full max-w-md ${inter.className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold text-[#101828]">
              Add New User
            </h2>
            <p className="text-sm text-gray-500 mt-1">
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
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter user name"
              className="w-full p-3 border border-gray-300 rounded-lg bg-[#F3F3F5] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#101828] mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter user email"
              className="w-full p-3 border border-gray-300 rounded-lg bg-[#F3F3F5] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#101828] mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-3 border border-gray-300 rounded-lg bg-[#F3F3F5] outline-none"
            />
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#7F56D9] text-white rounded-lg shadow-md hover:bg-[#6941C6]"
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
// 🧩 User List Item
// =======================
interface UserListItemProps {
  user: User;
  onDeleteClick: (user: User) => void;
  onViewClick: (user: User) => void;
  onEditClick: (user: User) => void;
}

const UserListItem: React.FC<UserListItemProps> = ({
  user,
  onDeleteClick,
  onViewClick,
  onEditClick,
}) => {
  const statusClasses =
    user.status === "Active"
      ? "bg-[#00C950] text-white"
      : "bg-gray-100 text-gray-500";

  return (
    <div className="flex items-center justify-between p-4 bg-white">
      <div className="flex justify-between w-full p-4 rounded-lg items-center bg-white border border-gray-100">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <div className="h-10 w-10 rounded-full relative overflow-hidden">
            <Image
              src={user.avatarSrc}
              alt={user.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center space-x-2">
              <p className="text-[16px] font-medium text-[#101828] truncate">
                {user.name}
              </p>
              <span
                className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusClasses}`}
              >
                {user.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
            <p className="text-xs text-gray-400">
              Registered: {user.registeredDate}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-gray-500">
          <button
            className="p-1 hover:text-[#7F56D9]"
            title="View User"
            onClick={() => onViewClick(user)}
          >
            <Eye className="h-5 w-5" />
          </button>
          <button
            className="p-1 hover:text-[#7F56D9]"
            title="Edit User"
            onClick={() => onEditClick(user)}
          >
            <Edit className="h-5 w-5" />
          </button>
          <button
            className="p-1 hover:text-red-500"
            title="Delete User"
            onClick={() => onDeleteClick(user)}
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// =======================
// 🧩 Main User Management View
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

  // 🐛 FIX APPLIED HERE:
  // Changed the type from 'User' to 'any' (or the actual partial type used by UserEdit)
  // and merged the partial update with the existing user to retain properties
  // like 'avatarSrc' which UserEdit might not return.
  const handleSaveEditedUser = (updatedUserPartial: any) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === updatedUserPartial.id) {
          // Merge the existing user (u) with the partial update (updatedUserPartial)
          return { ...u, ...updatedUserPartial } as User;
        }
        return u;
      })
    );
    setEditingUser(null);
  };
  // -------------------------

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
    <div className={`p-4 lg:p-8 bg-[#F8F9FA] min-h-full ${inter.className}`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[28px] lg:text-[32px] font-semibold text-[#101828]">
            User Management
          </h1>
          <p className="text-[16px] text-gray-500">
            Manage platform users and their permissions
          </p>
        </div>
        <button
          className="flex items-center bg-[#7F56D9] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#6941C6]"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New User
        </button>
      </div>

      <div className="mb-6 p-6 rounded-lg bg-white border border-gray-300">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none transition-shadow focus:ring-2 focus:ring-violet-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-[14px] border border-gray-200 overflow-hidden">
        <h2 className="text-[18px] font-semibold text-[#101828] px-4 mt-4">
          All Users ({users.length})
        </h2>
        <p className="text-sm text-gray-500 px-4 pb-4">
          Browse and manage user accounts
        </p>

        <div>
          {filteredUsers.map((user) => (
            <UserListItem
              key={user.id}
              user={user}
              onDeleteClick={openDeleteModal}
              onViewClick={handleViewUser}
              onEditClick={handleEditUser}
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
