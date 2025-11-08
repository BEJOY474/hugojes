// app/(main)/page.js (New Chat / Home Page)
import { ArrowUp } from "lucide-react";

export default function HomePage() {
  return (
    <div className="w-full max-w-2xl text-center">
      <h1 className="text-4xl font-light text-gray-800 mb-10">Hello Boni</h1>

      {/* Chat Input Container */}
      <div className="bg-white border border-gray-300 rounded-2xl shadow-lg p-3 mx-auto max-w-xl">
        <div className="flex items-end space-x-3">
          <div className="p-2 text-gray-500 cursor-pointer hover:text-purple-600">
            +
          </div>
          <input
            type="text"
            placeholder="How can I help you today?"
            className="flex-1 py-2 text-lg focus:outline-none placeholder-gray-500"
          />
          <button className="bg-purple-600 p-3 rounded-xl text-white hover:bg-purple-700 transition-colors">
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
