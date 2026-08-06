"use client";

import React from "react";
import { ClientProject } from "@/types/project";
import { FaRegCircle, FaCheckCircle, FaRegDotCircle } from "react-icons/fa";

interface RightPanelProps {
  project?: ClientProject;
  authState: "initial" | "login_form" | "authenticated";
  animStage: string;
}

const WORKFLOW_STAGES = [
  "Project Submitted",
  "Raw Cut",
  "SFX",
  "Colorgrading",
  "Final Review",
  "Project Completed",
] as const;

export default function RightPanel({ project, authState, animStage }: RightPanelProps) {
  const showBrief = ["brief", "progress", "authenticated"].includes(animStage);
  const showProgress = ["progress", "authenticated"].includes(animStage);

  return (
    <aside data-lenis-prevent className="hidden lg:flex w-80 bg-white border-l border-slate-200 text-[#0802E2] flex-col h-full shrink-0 overflow-hidden">
      {project && (
        <div className="flex flex-col h-full">
          {/* Live Brief Section */}
          {showBrief && (
            <div data-lenis-prevent className="p-6 border-b border-slate-200 flex-1 min-h-0 overflow-y-auto animate-slide-in-right">
              <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-left">
                {project?.title ? `BRIEF: ${project.title}` : "PROJECT BRIEF"}
              </h3>
              
              {project.brief?.isGenerating ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                </div>
              ) : (
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-slate-700">Duration & Price: </span>
                    <span className="text-slate-600">{project.brief?.durationAndPrice || "Not specified"}</span>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-700">Upsells / Add-ons: </span>
                    {project.brief?.upsells && project.brief.upsells.length > 0 ? (
                      <ul className="list-disc list-inside text-slate-600 pl-1 mt-1 space-y-0.5">
                        {project.brief.upsells.map((upsell, i) => (
                          <li key={i}>{upsell}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-slate-600">None</span>
                    )}
                  </div>

                  <div>
                    <span className="font-semibold text-slate-700">Brand Colors: </span>
                    <span className="text-slate-600">{project.brief?.brandColors || "Not specified"}</span>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-700">Raw Files: </span>
                    <span className="text-slate-600">
                      {project.brief?.hasRawFiles ? "Uploaded" : "Not uploaded"}
                    </span>
                  </div>

                  {project.brief?.notes && (
                    <div>
                      <span className="font-semibold text-slate-700">Notes: </span>
                      <p className="text-slate-600 mt-0.5 italic">{project.brief.notes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Progress Tracker Section */}
          {showProgress && (
            <div data-lenis-prevent className="p-6 border-t border-slate-200 flex-1 min-h-0 overflow-y-auto animate-slide-in-right">
              <h3 className="text-sm font-semibold mb-6 uppercase tracking-wider text-left flex flex-col">
                <span>Project Progress</span>
              </h3>
              
              <div className="relative">
                {/* Vertical line connecting the steps */}
                <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-[#0802E2] opacity-20"></div>
                
                <ul className="space-y-8 relative">
                  {WORKFLOW_STAGES.map((stage) => {
                    const milestone = project.milestones?.find((m) => m.title === stage);
                    const status = milestone?.status || "todo";
                    
                    let Icon = FaRegCircle;
                    let iconClass = "text-slate-300 bg-white";
                    let textClass = "text-slate-400 font-medium";

                    if (status === "done") {
                      Icon = FaCheckCircle;
                      iconClass = "text-[#0802E2] bg-white";
                      textClass = "text-[#0802E2] font-bold";
                    } else if (status === "in_progress") {
                      Icon = FaRegDotCircle;
                      iconClass = "text-[#0802E2] bg-white animate-pulse";
                      textClass = "text-[#0802E2] font-bold";
                    }

                    return (
                      <li key={stage} className="flex gap-4 items-center">
                        <div className={`relative z-10 w-5 h-5 flex justify-center items-center rounded-full ${iconClass}`}>
                          <Icon className="w-full h-full" />
                        </div>
                        <span className={`text-sm ${textClass}`}>{stage}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
