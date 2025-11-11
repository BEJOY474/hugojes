import React, { useState } from "react";
import { Save, AlertTriangle } from "lucide-react";
import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// -------------------- TYPES --------------------
interface ToggleSwitchProps {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
  label: string;
  description?: string;
}

interface StatusMessageProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

// -------------------- COMPONENTS --------------------
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  enabled,
  setEnabled,
  label,
  description,
}) => (
  <div className="flex items-start justify-between p-4 bg-white border-b border-gray-100 last:border-b-0">
    <div className="flex-1 pr-4">
      <p className="text-base font-semibold text-gray-900">{label}</p>
      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}
    </div>

    <button
      type="button"
      onClick={() => setEnabled(!enabled)}
      className={`
        relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out
        ${enabled ? "bg-[#7F56D9]" : "bg-gray-200"}
        focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:ring-offset-2
      `}
      role="switch"
      aria-checked={enabled}
    >
      <span className="sr-only">Toggle {label}</span>
      <span
        aria-hidden="true"
        className={`
          pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
          ${enabled ? "translate-x-5" : "translate-x-0"}
        `}
      />
    </button>
  </div>
);

const StatusMessage: React.FC<StatusMessageProps> = ({
  message,
  type,
  onClose,
}) => {
  if (!message) return null;

  const typeClasses = {
    success: "bg-green-50 text-green-700 border-green-400",
    error: "bg-red-50 text-red-700 border-red-400",
  };

  return (
    <div
      className={`p-4 mb-4 rounded-lg border-l-4 shadow-md ${typeClasses[type]} flex justify-between items-center`}
      role="alert"
    >
      <div className="flex items-center">
        {type === "success" ? (
          <Save className="h-5 w-5 mr-3" />
        ) : (
          <AlertTriangle className="h-5 w-5 mr-3" />
        )}
        <p className="font-medium">{message}</p>
      </div>
      <button onClick={onClose} className="text-lg font-semibold ml-4">
        &times;
      </button>
    </div>
  );
};

// -------------------- MAIN APP --------------------
const App: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [twoFactorAuth, setTwoFactorAuth] = useState<boolean>(false);
  const [sessionTimeout, setSessionTimeout] = useState<boolean>(true);
  const [status, setStatus] = useState<{
    message: string;
    type: "success" | "error";
  }>({
    message: "",
    type: "success",
  });

  const handleSaveChanges = () => {
    setStatus({ message: "", type: "success" });

    if (newPassword) {
      if (newPassword !== confirmNewPassword) {
        setStatus({
          message: "New password and confirmation do not match.",
          type: "error",
        });
        return;
      }
      if (newPassword.length < 8) {
        setStatus({
          message: "New password must be at least 8 characters long.",
          type: "error",
        });
        return;
      }
    }

    setStatus({ message: "Saving...", type: "success" });

    setTimeout(() => {
      console.log("Saving changes...", {
        twoFactorAuth,
        sessionTimeout,
        passwordChangeAttempt: !!newPassword,
      });

      if (newPassword) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }

      setStatus({
        message: "Security settings updated successfully!",
        type: "success",
      });
    }, 500);
  };

  return (
    <div className={`${inter.className} min-h-screen flex justify-center`}>
      <div className="w-full rounded-[14px] bg-white border-[1.2px] border-black/10 p-4 sm:p-4">
        <div className="pb-6 border-b border-gray-200">
          <h1 className="text-[16px] font-medium text-[#0a0a0a]">
            Security Settings
          </h1>
          <p className="text-base text-gray-500 mt-1">
            Manage security and authentication settings for your account
          </p>
        </div>

        <div className="mt-6">
          <StatusMessage
            message={status.message}
            type={status.type}
            onClose={() => setStatus({ message: "", type: "success" })}
          />
        </div>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Change Password
          </h2>
          <div className="mb-6">
            <label
              htmlFor="current-password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Current Password
            </label>
            <input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border p-2 border-gray-300 rounded-lg text-gray-900 bg-white outline-none transition duration-150"
              placeholder="Enter current password"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              New Password (Min. 8 characters)
            </label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 bg-white outline-none transition duration-150"
              placeholder="Enter new password"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirm-new-password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm New Password
            </label>
            <input
              id="confirm-new-password"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 bg-white outline-none transition duration-150"
              placeholder="Confirm new password"
            />
          </div>
        </section>

        <ToggleSwitch
          enabled={twoFactorAuth}
          setEnabled={setTwoFactorAuth}
          label="Two-Factor Authentication (2FA)"
          description="Add an extra layer of security to your account"
        />

        <ToggleSwitch
          enabled={sessionTimeout}
          setEnabled={setSessionTimeout}
          label="Session Timeout"
          description="Auto-logout after 30 minutes of inactivity"
        />

        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleSaveChanges}
            disabled={status.message === "Saving..."}
            className="flex items-center w-full lg:w-1/4 justify-center px-6 py-3 bg-[#7F56D9] text-white font-medium rounded-lg shadow-md hover:bg-[#6941C6] transition duration-150 text-base focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:ring-offset-2 disabled:opacity-50"
          >
            <Save className="h-5 w-5 mr-2" />
            Update Security Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
