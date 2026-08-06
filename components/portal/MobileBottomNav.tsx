"use client";

import React from "react";
import { FaFolder, FaFileAlt, FaInfoCircle, FaCheckCircle } from "react-icons/fa";

export type MobileTab = "projects" | "documents" | "brief" | "status";

interface MobileBottomNavProps {
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
  animStage: string;
}

export default function MobileBottomNav({
  activeTab,
  onTabChange,
  animStage,
}: MobileBottomNavProps) {
  // Only show the pill if the user is in the docking or authenticated stages
  const isVisible = ["docking", "documents", "projects", "brief", "progress", "authenticated"].includes(animStage);

  if (!isVisible) return null;

  const tabs: { id: MobileTab; icon: React.ReactNode; label: string }[] = [
    { id: "projects", icon: <FaFolder />, label: "Projects" },
    { id: "documents", icon: <FaFileAlt />, label: "Documents" },
    { id: "brief", icon: <FaInfoCircle />, label: "Brief" },
    { id: "status", icon: <FaCheckCircle />, label: "Status" },
  ];

  return (
    <div className="flex-1 animate-fly-in-bottom lg:hidden">
      <div className="bg-white rounded-full shadow-[0_2px_12px_rgba(8,2,226,0.12)] border border-slate-100 p-1 flex justify-between items-center relative overflow-hidden">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-full transition-all duration-300 ${
                isActive ? "text-[#0802E2] bg-slate-100/80 font-bold" : "text-slate-400 hover:text-[#0802E2]"
              }`}
            >
              <div className={`text-base ${isActive ? "scale-105" : "scale-100"} transition-transform`}>
                {tab.icon}
              </div>
              <span className="text-[9px] font-semibold leading-none mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
