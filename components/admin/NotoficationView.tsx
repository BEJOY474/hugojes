import React, { useState } from "react";
import { Save, AlertTriangle } from "lucide-react";

const inter = { className: "font-inter" };

// -------------------- FONT INJECTOR --------------------
const FontInjector: React.FC = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

      .font-inter {
          font-family: 'Inter', sans-serif !important;
      }
    `}
  </style>
);

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
  <div className="flex items-start justify-between py-4 bg-white ">
    <div className="flex-1 pr-4">
      <p className={`text-[16px] text-gray-900 ${inter.className}`}>{label}</p>
      {description && (
        <p className={`text-sm text-gray-500 mt-0.5 ${inter.className}`}>
          {description}
        </p>
      )}
    </div>

    <button
      type="button"
      onClick={() => setEnabled(!enabled)}
      className={`
        relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out
        ${enabled ? "bg-[#7F56D9]" : "bg-gray-300"}
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
  // -------------------- STATE --------------------
  const [newUserRegistration, setNewUserRegistration] = useState<boolean>(true);
  const [contentUpdates, setContentUpdates] = useState<boolean>(false);
  const [systemAlerts, setSystemAlerts] = useState<boolean>(true);
  const [securityAlertsSms, setSecurityAlertsSms] = useState<boolean>(false);
  const [criticalUpdatesSms, setCriticalUpdatesSms] = useState<boolean>(false);

  const [status, setStatus] = useState<{
    message: string;
    type: "success" | "error";
  }>({
    message: "",
    type: "success",
  });

  // -------------------- HANDLERS --------------------
  const handleSaveChanges = () => {
    setStatus({ message: "", type: "success" });

    setStatus({
      message: "Saving notification preferences...",
      type: "success",
    });

    setTimeout(() => {
      console.log("Saving notification preferences...", {
        newUserRegistration,
        contentUpdates,
        systemAlerts,
        securityAlertsSms,
        criticalUpdatesSms,
      });

      setStatus({
        message: "Notification preferences updated successfully!",
        type: "success",
      });
    }, 500);
  };

  // -------------------- RENDER --------------------
  return (
    <div
      className={`min-h-screen rounded-[14px] p-4 bg-white border-[1.2px] border-black/10 flex justify-center ${inter.className}`}
    >
      <FontInjector />

      <div className="w-full sm:p-4">
        {/* Header */}
        <div className="pb-6 border-b border-gray-200">
          <h1 className={`text-[16px] text-gray-900 ${inter.className}`}>
            Notification Settings
          </h1>
          <p className="text-base text-gray-500 mt-1">
            Manage how you receive notifications
          </p>
        </div>

        {/* Status Message */}
        <div className="mt-6">
          <StatusMessage
            message={status.message}
            type={status.type}
            onClose={() => setStatus({ message: "", type: "success" })}
          />
        </div>

        {/* Email Notifications */}
        <section className="mt-8">
          <h2 className={`text-[16px] text-gray-900 mb-2 ${inter.className}`}>
            Email Notifications
          </h2>
          <div className="rounded-xl overflow-hidden">
            <ToggleSwitch
              enabled={newUserRegistration}
              setEnabled={setNewUserRegistration}
              label="New User Registration"
              description="Receive email when a new user registers"
            />
            <ToggleSwitch
              enabled={contentUpdates}
              setEnabled={setContentUpdates}
              label="Content Updates"
              description="Receive email when content is updated"
            />
            <ToggleSwitch
              enabled={systemAlerts}
              setEnabled={setSystemAlerts}
              label="System Alerts"
              description="Receive critical system notifications"
            />
          </div>
        </section>

        <div className="border-t border-gray-200 mt-8 pt-4"></div>

        {/* SMS Notifications */}
        <section className="mt-4">
          <h2 className={`text-[16px] text-gray-900 mb-2 ${inter.className}`}>
            SMS Notifications
          </h2>
          <div className="rounded-xl overflow-hidden">
            <ToggleSwitch
              enabled={securityAlertsSms}
              setEnabled={setSecurityAlertsSms}
              label="Security Alerts"
              description="Receive SMS for security-related events"
            />
            <ToggleSwitch
              enabled={criticalUpdatesSms}
              setEnabled={setCriticalUpdatesSms}
              label="Critical Updates"
              description="Receive SMS for critical system updates"
            />
          </div>
        </section>

        {/* Save Button */}
        <div className="mt-8 pt-6">
          <button
            onClick={handleSaveChanges}
            className="flex items-center w-full lg:w-1/4 justify-center px-6 py-3 bg-[#7F56D9] text-white font-medium rounded-lg shadow-md hover:bg-[#6941C6] transition duration-150 text-base focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:ring-offset-2 disabled:opacity-50"
          >
            <Save className="h-5 w-5 mr-2" />
            Save Notification Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
