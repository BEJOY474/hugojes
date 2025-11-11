import React, { useState } from "react";
import {
  Save,
  AlertTriangle,
  Eye,
  EyeOff,
  Zap,
  Shield,
  HelpCircle,
} from "lucide-react";
import Image from "next/image";

const inter = { className: "font-inter" };

import warningIcon from "@/public/image/Admin/warningIcon.svg";
import keyAiIcon from "@/public/image/Admin/keyAIIcon.svg";

const FontInjector = () => (
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
  type: "success" | "error" | "info";
  onClose: () => void;
}

// -------------------- COMPONENTS --------------------
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  enabled,
  setEnabled,
  label,
  description,
}) => (
  <div className="flex items-start justify-between py-4 bg-white last:pb-0">
    <div className="flex-1 pr-4">
      <p className={`text-base font-semibold text-gray-900 ${inter.className}`}>
        {label}
      </p>
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
    info: "bg-blue-50 text-blue-700 border-blue-400",
  };

  return (
    <div
      className={`p-4 mb-4 rounded-lg border-l-4 shadow-md ${typeClasses[type]} flex justify-between items-center`}
      role="alert"
    >
      <div className="flex items-center">
        {type === "success" && <Save className="h-5 w-5 mr-3" />}
        {type === "error" && <AlertTriangle className="h-5 w-5 mr-3" />}
        {type === "info" && <HelpCircle className="h-5 w-5 mr-3" />}
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
  const [apiKey, setApiKey] = useState<string>(
    "sk-proj-xxxxxxxxxxxxxxxxxxxxxxx"
  );
  const [model, setModel] = useState<string>("gpt-4-turbo");
  const [orgId, setOrgId] = useState<string>("org-xxxxxxxxxxxxxxxxx");
  const [enableQA, setEnableQA] = useState<boolean>(true);
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [status, setStatus] = useState<{
    message: string;
    type: "success" | "error" | "info";
  }>({
    message: "",
    type: "info",
  });
  const [connectionStatus, setConnectionStatus] = useState<
    "" | "testing" | "success" | "failure"
  >("");

  const handleSaveConfiguration = () => {
    setStatus({ message: "", type: "info" });
    if (!apiKey.startsWith("sk-proj-") || apiKey.length < 20) {
      setStatus({
        message: "Please enter a valid OpenAI API key.",
        type: "error",
      });
      return;
    }

    setStatus({ message: "Saving configuration...", type: "info" });

    setTimeout(() => {
      console.log("Saving configuration...", {
        apiKey,
        model,
        orgId,
        enableQA,
      });
      setStatus({
        message: "API configuration saved successfully!",
        type: "success",
      });
    }, 800);
  };

  const handleTestConnection = () => {
    setStatus({ message: "", type: "info" });
    setConnectionStatus("testing");

    setTimeout(() => {
      if (apiKey && apiKey.length > 20) {
        setConnectionStatus("success");
        setStatus({
          message:
            "Connection successful! Model responded with a test message.",
          type: "success",
        });
      } else {
        setConnectionStatus("failure");
        setStatus({
          message: "Connection failed. Check your API Key and Organization ID.",
          type: "error",
        });
      }
    }, 1500);
  };

  const isTesting =
    connectionStatus === "testing" ||
    status.message === "Saving configuration...";

  return (
    <div
      className={`min-h-screen bg-gray-50 flex justify-center ${inter.className}`}
    >
      <FontInjector />
      <div className="w-full rounded-[14px] p-4 bg-white border-[1.2px] border-black/10 sm:p-10">
        <div className="flex items-start p-4 bg-purple-50 rounded-lg border border-purple-200 mb-8">
          <Image src={warningIcon} alt="Warning" height={20} width={20} />
          <p className="ml-3 text-sm text-purple-800">
            Configure API keys for AI services used by PetroBasin. Keep your API
            keys secure and never share them publicly.
          </p>
        </div>

        <StatusMessage
          message={status.message}
          type={status.type}
          onClose={() => setStatus({ message: "", type: "info" })}
        />

        <div className="pb-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-start">
              <Image src={keyAiIcon} alt="Ai Icon" height={22} width={22} />
              <div className="ml-2">
                <h1
                  className={`text-xl font-semibold text-gray-900 ${inter.className}`}
                >
                  OpenAI API
                </h1>
                <p className="text-base text-gray-500 mt-1">
                  Configure OpenAI for natural language processing and AI
                  responses
                </p>
              </div>
            </div>
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Active
            </span>
          </div>
        </div>

        <section className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="api-key"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              API Key
            </label>
            <div className="relative">
              <input
                id="api-key"
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-gray-50 pr-10 focus:ring-2 focus:ring-[#7F56D9] focus:border-[#7F56D9] outline-none transition duration-150"
                placeholder="Enter your API Key"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                aria-label={showApiKey ? "Hide API Key" : "Show API Key"}
              >
                {showApiKey ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="model"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Model
            </label>
            <input
              id="model"
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-gray-50 focus:ring-2 focus:ring-[#7F56D9] focus:border-[#7F56D9] outline-none transition duration-150"
              placeholder="e.g., gpt-4-turbo"
            />
          </div>

          <div>
            <label
              htmlFor="org-id"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Organization ID (Optional)
            </label>
            <input
              id="org-id"
              type="text"
              value={orgId}
              onChange={(e) => setOrgId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-gray-50 focus:ring-2 focus:ring-[#7F56D9] focus:border-[#7F56D9] outline-none transition duration-150"
              placeholder="e.g., org-xxxxxxxxxxxxxxxxx"
            />
          </div>

          <div className="pt-4 pb-2">
            <ToggleSwitch
              enabled={enableQA}
              setEnabled={setEnableQA}
              label="Enable for Question Answering"
              description="Use OpenAI to answer user questions"
            />
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-3 pt-6">
          <button
            onClick={handleSaveConfiguration}
            disabled={isTesting}
            className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-[#7F56D9] text-white font-medium rounded-lg shadow-md hover:bg-[#6941C6] transition duration-150 text-base focus:outline-none focus:ring-2 focus:ring-[#7F56D9] focus:ring-offset-2 disabled:opacity-50"
          >
            {isTesting && status.message.includes("Saving") ? (
              "Saving..."
            ) : (
              <>
                <Save className="h-5 w-5 mr-2" />
                Save Configuration
              </>
            )}
          </button>

          <button
            onClick={handleTestConnection}
            disabled={isTesting}
            className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 transition duration-150 text-base focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 disabled:opacity-50"
          >
            {isTesting && connectionStatus === "testing"
              ? "Testing..."
              : "Test Connection"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
