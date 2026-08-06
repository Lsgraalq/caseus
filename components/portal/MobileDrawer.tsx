"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { FaUserCircle, FaFileAlt, FaHome, FaArrowLeft, FaPlus, FaTrash, FaTimes, FaRegCircle, FaCheckCircle, FaRegDotCircle, FaEllipsisV } from "react-icons/fa";
import { ClientProject } from "@/types/project";
import MobileBottomNav, { MobileTab } from "./MobileBottomNav";

interface DocumentItem {
  id: string;
  name: string;
  isGenerating?: boolean;
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
  
  // Sidebar props
  projects: ClientProject[];
  activeProjectId?: string;
  onSelectProject: (id: string) => void;
  onNewProject?: () => void;
  onDeleteProject?: (id: string) => void;
  authState: "initial" | "login_form" | "authenticated";
  setAuthState: (state: "initial" | "login_form" | "authenticated") => void;
  documents: DocumentItem[];
  animStage: string;
  onLoginSubmit: (e: React.FormEvent) => void;
  
  // RightPanel props
  project?: ClientProject;
}

const WORKFLOW_STAGES = [
  "Project Submitted",
  "Raw Cut",
  "SFX",
  "Colorgrading",
  "Final Review",
  "Project Completed",
] as const;

export default function MobileDrawer(props: MobileDrawerProps) {
  const { isOpen, onClose, activeTab, authState, animStage } = props;
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPass, setLoginPass] = React.useState("");
  const [deleteConfirmId, setDeleteConfirmId] = React.useState<string | null>(null);
  const [deletingIds, setDeletingIds] = React.useState<string[]>([]);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false);

  const [hasToggledAuth, setHasToggledAuth] = React.useState(false);
  const [openMenuProjectId, setOpenMenuProjectId] = React.useState<string | null>(null);

  // Close drawer when pressing Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const isProfileVisible = authState === "authenticated";

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside 
        className={`fixed inset-y-0 left-0 w-full md:w-80 bg-white z-50 lg:hidden flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <span className="font-bold text-[#0802E2]">
            {authState === "authenticated" ? (
              activeTab === "projects" ? "Projects" :
              activeTab === "documents" ? "Documents" :
              activeTab === "brief" ? "Project Brief" : "Status"
            ) : "Menu"}
          </span>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-[#0802E2] transition-colors rounded-full hover:bg-slate-100">
            <FaTimes />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 text-[#0802E2]">
          
          {/* Unauthenticated State */}
          {authState !== "authenticated" && (
            <div className="flex flex-col items-center justify-center h-full">
              {authState === "initial" && (
                <div className={`flex gap-2 w-full max-w-[240px] ${hasToggledAuth ? "animate-zoom-in" : "animate-fly-in-left"}`}>
                  <Link href="/" className="w-10 h-10 shrink-0 border-2 border-[#0802E2] text-[#0802E2] rounded-full flex items-center justify-center hover:bg-[#0802E2] hover:text-white transition-all">
                    <FaHome />
                  </Link>
                  <button onClick={() => { setHasToggledAuth(true); props.setAuthState("login_form"); }} className="flex-1 border-2 border-[#0802E2] text-[#0802E2] rounded-full px-4 py-2 font-medium hover:bg-[#0802E2] hover:text-white transition-all">
                    Log In
                  </button>
                </div>
              )}
              {authState === "login_form" && (
                <form onSubmit={props.onLoginSubmit} className="w-full max-w-[240px] space-y-3 animate-zoom-in">
                  <input type="email" placeholder="Email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="w-full border-2 border-slate-300 rounded-full px-4 py-2 text-sm focus:border-[#0802E2]" required />
                  <input type="password" placeholder="Password" value={loginPass} onChange={e => setLoginPass(e.target.value)} className="w-full border-2 border-slate-300 rounded-full px-4 py-2 text-sm focus:border-[#0802E2]" required />
                  <div className="flex gap-2">
                    <button type="button" onClick={() => props.setAuthState("initial")} className="w-10 h-10 shrink-0 border-2 border-[#0802E2] text-[#0802E2] rounded-full flex justify-center items-center hover:bg-[#0802E2] hover:text-white">
                      <FaArrowLeft />
                    </button>
                    <button type="submit" className="flex-1 bg-[#0802E2] text-white rounded-full px-4 py-2 text-sm font-bold hover:bg-blue-800">
                      Log In
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Authenticated State */}
          {authState === "authenticated" && (
            <>
              {/* TAB: Projects */}
              {activeTab === "projects" && (
                <div className="animate-fade-in">
                  <ul className="space-y-1 flex flex-col items-center">
                    {props.projects.map((project) => {
                      const isActive = project.id === props.activeProjectId;
                      const isConfirming = deleteConfirmId === project.id;
                      const isDeleting = deletingIds.includes(project.id);
                      return (
                        <li key={project.id} className="w-full relative overflow-visible group">
                          <div className={`w-full overflow-hidden transition-all duration-300 ${isDeleting ? "opacity-0 max-h-0" : "opacity-100 max-h-[60px]"}`}>
                            <div className="relative w-full h-[36px]">
                              {/* Confirm delete */}
                              <div className={`absolute inset-0 flex gap-2 w-full transition-all duration-300 ${isConfirming ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}>
                                <button onClick={() => setDeleteConfirmId(null)} className="flex-1 text-xs font-medium border-2 border-slate-300 text-slate-500 rounded-full py-1 hover:border-slate-400">Cancel</button>
                                <button onClick={() => {
                                  setDeletingIds(p => [...p, project.id]);
                                  setDeleteConfirmId(null);
                                  setTimeout(() => {
                                    props.onDeleteProject?.(project.id);
                                    setDeletingIds(p => p.filter(id => id !== project.id));
                                  }, 300);
                                }} className="text-xs font-medium border-2 border-red-500 text-red-500 rounded-full px-3 py-1 hover:bg-red-500 hover:text-white">Delete</button>
                              </div>
                              {/* Main row */}
                              <div onClick={() => props.onSelectProject(project.id)} className={`absolute inset-0 w-full border-2 rounded-full px-3 py-1.5 text-sm transition-all font-medium flex items-center justify-between cursor-pointer ${isConfirming ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"} ${isActive ? "border-[#0802E2] text-[#0802E2]" : "border-transparent text-slate-500"}`}>
                                <span className="truncate pr-2">{project.title}</span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenMenuProjectId(openMenuProjectId === project.id ? null : project.id);
                                  }}
                                  className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-[#0802E2] rounded-full shrink-0 transition-colors cursor-pointer"
                                  title="Project Options"
                                >
                                  <FaEllipsisV className="text-xs" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Context Dropdown Menu */}
                          {openMenuProjectId === project.id && (
                            <div 
                              className="absolute right-0 top-full mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-50 animate-fade-in"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                onClick={() => {
                                  setOpenMenuProjectId(null);
                                  setDeleteConfirmId(project.id);
                                }}
                                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              >
                                <FaTrash className="text-xs" />
                                <span>Delete Project</span>
                              </button>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* TAB: Documents */}
              {activeTab === "documents" && (
                <div className="animate-fade-in">
                  <ul className="space-y-1">
                    {props.documents.map((doc) => (
                      <li key={doc.id} className="w-full">
                        <div className="w-full border-2 border-transparent text-[#0802E2] rounded-full px-3 py-1.5 text-sm flex items-center justify-between hover:border-[#0802E2] transition-colors cursor-pointer">
                          {doc.isGenerating ? <div className="h-4 bg-slate-200 animate-pulse rounded w-24"></div> : <span className="font-medium truncate pr-2">{doc.name}</span>}
                          <FaFileAlt className={`shrink-0 ${doc.isGenerating ? "opacity-50" : ""}`} />
                        </div>
                      </li>
                    ))}
                    {props.documents.length === 0 && <p className="text-sm text-slate-400 italic px-1">No documents</p>}
                  </ul>
                </div>
              )}

              {/* TAB: Brief */}
              {activeTab === "brief" && props.project && (
                <div className="animate-fade-in">
                  {props.project.brief?.isGenerating ? (
                    <div className="space-y-3 animate-pulse">
                      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    </div>
                  ) : (
                    <div className="space-y-3 text-sm">
                      <div><span className="font-semibold text-slate-700">Duration & Price: </span><span className="text-slate-600">{props.project.brief?.durationAndPrice || "Not specified"}</span></div>
                      <div><span className="font-semibold text-slate-700">Upsells / Add-ons: </span>{props.project.brief?.upsells?.length ? <ul className="list-disc list-inside text-slate-600 pl-1 mt-1">{props.project.brief.upsells.map((u, i) => <li key={i}>{u}</li>)}</ul> : <span className="text-slate-600">None</span>}</div>
                      <div><span className="font-semibold text-slate-700">Brand Colors: </span><span className="text-slate-600">{props.project.brief?.brandColors || "Not specified"}</span></div>
                      <div><span className="font-semibold text-slate-700">Raw Files: </span><span className="text-slate-600">{props.project.brief?.hasRawFiles ? "Uploaded" : "Not uploaded"}</span></div>
                      {props.project.brief?.notes && <div><span className="font-semibold text-slate-700">Notes: </span><p className="text-slate-600 mt-0.5 italic">{props.project.brief.notes}</p></div>}
                    </div>
                  )}
                </div>
              )}

              {/* TAB: Status */}
              {activeTab === "status" && props.project && (
                <div className="animate-fade-in relative pt-2">
                  <div className="absolute left-[9px] top-4 bottom-2 w-0.5 bg-[#0802E2] opacity-20"></div>
                  <ul className="space-y-8 relative">
                    {WORKFLOW_STAGES.map((stage) => {
                      const milestone = props.project!.milestones?.find(m => m.title === stage);
                      const status = milestone?.status || "todo";
                      let Icon = FaRegCircle;
                      let iconClass = "text-slate-300 bg-white";
                      let textClass = "text-slate-400 font-medium";
                      if (status === "done") { Icon = FaCheckCircle; iconClass = "text-[#0802E2] bg-white"; textClass = "text-[#0802E2] font-bold"; } 
                      else if (status === "in_progress") { Icon = FaRegDotCircle; iconClass = "text-[#0802E2] bg-white animate-pulse"; textClass = "text-[#0802E2] font-bold"; }
                      return (
                        <li key={stage} className="flex gap-4 items-center">
                          <div className={`relative z-10 w-5 h-5 flex justify-center items-center rounded-full ${iconClass}`}><Icon className="w-full h-full" /></div>
                          <span className={`text-sm ${textClass}`}>{stage}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {isProfileVisible && (
          <div className="p-4 mt-auto space-y-3">
            {/* Toolbar Row: Compact Pill + Large Plus Button */}
            <div className="flex items-center gap-2 w-full">
              <MobileBottomNav 
                activeTab={activeTab} 
                onTabChange={props.onTabChange} 
                animStage={animStage} 
              />
              <button 
                onClick={props.onNewProject}
                title="New Project"
                className="w-11 h-11 shrink-0 rounded-full bg-[#0802E2] text-white flex items-center justify-center shadow-md hover:bg-blue-800 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <FaPlus className="text-base" />
              </button>
            </div>

            {/* Profile Tab (Very Bottom) */}
            <div className="relative w-full border-t border-slate-200 pt-3 mt-3">
              {isProfileMenuOpen && (
                <div className="absolute bottom-full left-0 w-full mb-2 bg-white border border-slate-200 rounded-xl shadow-lg p-2 animate-fade-in z-50">
                  <button onClick={() => { setIsProfileMenuOpen(false); props.setAuthState("initial"); onClose(); }} className="w-full text-left px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg">Log Out</button>
                </div>
              )}
              <div onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="w-full rounded-full px-4 py-2 flex items-center justify-between text-[#0802E2] hover:bg-slate-100 cursor-pointer">
                <span className="text-sm font-semibold truncate">Adolf Mueller</span>
                <FaUserCircle className="text-xl shrink-0" />
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
