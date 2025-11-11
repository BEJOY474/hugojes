import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Inter } from "next/font/google";
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const data = [
  { month: "Apr", activeUsers: 65, knowledgeUsed: 45 },
  { month: "May", activeUsers: 75, knowledgeUsed: 55 },
  { month: "Jun", activeUsers: 85, knowledgeUsed: 70 },
  { month: "Jul", activeUsers: 78, knowledgeUsed: 65 },
  { month: "Aug", activeUsers: 90, knowledgeUsed: 80 },
  { month: "Sep", activeUsers: 108, knowledgeUsed: 90 },
  { month: "Oct", activeUsers: 125, knowledgeUsed: 105 },
];

const UsageStatisticsCard = () => {
  return (
    <div
      className={`${inter.className}bg-white rounded-xl  p-6`}
      style={{ border: "2px solid rgba(0, 0, 0, 0.1)" }}
    >
      <h2 className="text-lg font-semibold text-gray-900">Usage Statistics</h2>
      <p className="text-sm text-gray-500 mb-4">
        User and document activity over the last 7 months
      </p>

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 140]} tickCount={6} />
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span
                  style={{
                    color: value === "Active Users" ? "#8b5cf6" : "#3b82f6",
                  }}
                >
                  {value}
                </span>
              )}
            />
            <Line
              type="monotone"
              dataKey="activeUsers"
              name="Active Users"
              stroke="#8b5cf6"
              strokeWidth={2.5}
              dot={{ stroke: "#8b5cf6", fill: "#fff", strokeWidth: 2 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="knowledgeUsed"
              name="Knowledge Used"
              stroke="#3b82f6"
              strokeWidth={2.5}
              dot={{ stroke: "#3b82f6", fill: "#fff", strokeWidth: 2 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UsageStatisticsCard;
