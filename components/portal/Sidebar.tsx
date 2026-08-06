"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ClientProject } from "@/types/project";
import { FaUserCircle, FaFileAlt, FaHome, FaArrowLeft, FaPlus, FaTrash, FaEllipsisV } from "react-icons/fa";

interface DocumentItem {
  id: string;
  name: string;
  isGenerating?: boolean;
}

interface SidebarProps {
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
}

export default function Sidebar({
  projects,
  activeProjectId,
  onSelectProject,
  onNewProject,
  authState,
  setAuthState,
  documents,
  animStage,
  onLoginSubmit,
  onDeleteProject,
}: SidebarProps) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deletingIds, setDeletingIds] = useState<string[]>([]);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const [hasToggledAuth, setHasToggledAuth] = useState(false);
  const [openMenuProjectId, setOpenMenuProjectId] = useState<string | null>(null);

  const isProfileVisible = animStage !== "unauthenticated";
  const isDocked = ["docking", "documents", "projects", "brief", "progress", "authenticated"].includes(animStage);
  const showDocuments = ["documents", "projects", "brief", "progress", "authenticated"].includes(animStage);
  const showProjects = ["projects", "brief", "progress", "authenticated"].includes(animStage);

  return (
    <aside data-lenis-prevent className="hidden lg:flex w-80 bg-white border-r border-slate-200 text-[#0802E2] flex-col h-full shrink-0 overflow-hidden">
      {/* Top Content: Documents & Projects */}
      <div className={`flex flex-col min-h-0 overflow-hidden transition-all duration-500 ${isDocked ? "flex-1" : "flex-[0_0_0px]"}`}>
        {showDocuments && (
          <div data-lenis-prevent className="flex-1 min-h-0 overflow-y-auto p-6 space-y-4 animate-slide-in-left">
            <h3 className="font-bold text-left mb-4 px-1">Documents</h3>
            <ul className="space-y-1 flex flex-col items-center">
              {documents.map((doc, index) => (
                <li
                  key={doc.id}
                  className={`w-full animate-slide-in-bottom`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-full border-2 border-transparent text-[#0802E2] rounded-full px-3 py-1.5 text-sm flex items-center justify-between hover:border-[#0802E2] cursor-pointer transition-colors">
                    {doc.isGenerating ? (
                      <div className="h-4 bg-slate-200 animate-pulse rounded w-24"></div>
                    ) : (
                      <span className="font-medium truncate pr-2">{doc.name}</span>
                    )}
                    <FaFileAlt className={`shrink-0 ${doc.isGenerating ? "opacity-50" : ""}`} />
                  </div>
                </li>
              ))}
              {documents.length === 0 && (
                <p className="text-sm text-slate-400 italic text-left w-full px-1">No documents</p>
              )}
            </ul>
          </div>
        )}

        {showProjects && (
          <div data-lenis-prevent className="flex-1 min-h-0 overflow-y-auto p-6 border-t border-slate-200 animate-slide-in-left">
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="font-bold text-left">Projects</h3>
              <button
                onClick={onNewProject}
                title="New Project"
                className="w-7 h-7 rounded-full border-2 border-[#0802E2] text-[#0802E2] flex items-center justify-center hover:bg-[#0802E2] hover:text-white transition-colors cursor-pointer"
              >
                <FaPlus className="text-xs" />
              </button>
            </div>
            <ul className="space-y-1 flex flex-col items-center">
              {projects.map((project) => {
                const isActive = project.id === activeProjectId;
                const isConfirming = deleteConfirmId === project.id;
                const isDeleting = deletingIds.includes(project.id);
                return (
                  <li key={project.id} className="w-full relative overflow-visible group">
                    <div className={`w-full overflow-hidden transition-all duration-300 ease-out ${isDeleting ? "opacity-0 max-h-0 !p-0 !m-0" : "opacity-100 max-h-[60px] animate-expand-down"}`}>
                      <div className="relative w-full h-[36px]">
                        {/* Confirm state */}
                        <div className={`absolute inset-0 flex gap-2 w-full transition-all duration-300 ${isConfirming ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="flex-1 text-xs font-medium border-2 border-slate-300 text-slate-500 rounded-full py-1 hover:border-slate-400 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              setDeletingIds((prev) => [...prev, project.id]);
                              setDeleteConfirmId(null);
                              setTimeout(() => {
                                onDeleteProject?.(project.id);
                                setDeletingIds((prev) => prev.filter(id => id !== project.id));
                              }, 300);
                            }}
                            className="text-xs font-medium border-2 border-red-500 text-red-500 rounded-full px-3 py-1 hover:bg-red-500 hover:text-white transition-colors"
                          >
                            Delete
                          </button>
                        </div>

                        {/* Default state */}
                        <div
                          onClick={() => onSelectProject(project.id)}
                          className={`absolute inset-0 w-full border-2 rounded-full px-3 py-1.5 text-sm text-left transition-all duration-300 font-medium cursor-pointer flex items-center justify-between ${
                            isConfirming ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100 pointer-events-auto"
                          } ${
                            isActive
                              ? "border-[#0802E2] text-[#0802E2]"
                              : "border-transparent text-slate-500 hover:border-[#0802E2] hover:text-[#0802E2]"
                          }`}
                        >
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
      </div>

      {/* Auth State Block */}
      <div
        className={`p-6 transition-all duration-500 ease-in-out flex flex-col items-center justify-center ${
          isDocked
            ? "mt-auto border-t border-slate-200 min-h-[90px]"
            : "flex-1"
        }`}
      >
        {!isProfileVisible && authState === "initial" && (
          <div
            className={`flex gap-2 w-full max-w-[240px] ${hasToggledAuth ? "animate-zoom-in" : "animate-fly-in-left"}`}
            style={hasToggledAuth ? undefined : { animationDelay: "450ms" }}
          >
            <Link
              href="/"
              className="w-10 h-10 shrink-0 border-2 border-[#0802E2] text-[#0802E2] rounded-full flex items-center justify-center hover:bg-[#0802E2] hover:text-white active:scale-95 transition-all duration-200"
            >
              <FaHome />
            </Link>
            <button
              onClick={() => {
                setHasToggledAuth(true);
                setAuthState("login_form");
              }}
              className="flex-1 border-2 border-[#0802E2] text-[#0802E2] rounded-full px-4 py-2 font-medium hover:bg-[#0802E2] hover:text-white active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
            >
              Log In
            </button>
          </div>
        )}

        {!isProfileVisible && authState === "login_form" && (
          <form onSubmit={onLoginSubmit} className="w-full max-w-[240px] space-y-3 animate-zoom-in">
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="w-full border-2 border-slate-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#0802E2] transition-colors"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPass}
              onChange={(e) => setLoginPass(e.target.value)}
              className="w-full border-2 border-slate-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#0802E2] transition-colors"
              required
            />
            <div className="flex gap-2 w-full">
              <button
                type="button"
                onClick={() => setAuthState("initial")}
                className="w-10 h-10 shrink-0 border-2 border-[#0802E2] text-[#0802E2] rounded-full flex items-center justify-center hover:bg-[#0802E2] hover:text-white active:scale-95 transition-all duration-200 cursor-pointer"
                title="Back"
              >
                <FaArrowLeft />
              </button>
              <button
                type="submit"
                className="flex-1 bg-[#0802E2] text-white rounded-full px-4 py-2 text-sm font-bold hover:bg-blue-800 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
              >
                Log In
              </button>
            </div>
            <p className="text-xs text-center text-slate-500 cursor-pointer hover:text-[#0802E2] transition-colors">
              Forgot password?
            </p>
          </form>
        )}

        {isProfileVisible && (
          <div className="relative w-full">
            {isProfileMenuOpen && (
              <div className="absolute bottom-full left-0 w-full mb-2 bg-white border border-slate-200 rounded-xl shadow-lg p-2 animate-slide-in-bottom animate-fade-in z-50">
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    setAuthState("initial");
                  }}
                  className="w-full text-left px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            )}
            <div 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="w-full rounded-full px-4 py-2 flex items-center justify-between text-[#0802E2] animate-fade-in hover:bg-slate-100 cursor-pointer transition-colors duration-300"
            >
              <span className="text-sm font-semibold truncate">Adolf Mueller</span>
              <FaUserCircle className="text-xl shrink-0" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
