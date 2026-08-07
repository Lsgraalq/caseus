"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import RightPanel from "./RightPanel";
import { Message } from "@/types/chat";
import { ClientProject } from "@/types/project";
import { useChat } from "@/lib/hooks/useChat";
import { useRealtimeBrief } from "@/lib/hooks/useRealtimeBrief";
import MobileDrawer from "./MobileDrawer";
import { MobileTab } from "./MobileBottomNav";
import { FaBars } from "react-icons/fa";

const mockProjects: ClientProject[] = [
  {
    id: "proj-1",
    title: "Project 1",
    status: "in_progress",
    progressPercentage: 65,
    createdAt: new Date(),
    updatedAt: new Date(),
    milestones: [
      { id: "m-1", title: "Project Submitted", status: "done" },
      { id: "m-2", title: "Raw Cut", status: "done" },
      { id: "m-3", title: "SFX", status: "in_progress" },
      { id: "m-4", title: "Colorgrading", status: "todo" },
      { id: "m-5", title: "Final Review", status: "todo" },
      { id: "m-6", title: "Project Completed", status: "todo" },
    ],
    brief: {
      durationAndPrice: "1 min — €200",
      upsells: ["Color grading +€100"],
      brandColors: "#ja332 and #99sj8",
      hasRawFiles: true,
      notes: "Dynamic edit to music",
      isGenerating: false,
    }
  },
  {
    id: "proj-2",
    title: "Project 2",
    status: "planning",
    progressPercentage: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
    milestones: [
      { id: "m-21", title: "Project Submitted", status: "in_progress" },
    ],
    brief: {
      upsells: [],
      isGenerating: false,
    }
  },
];

const mockDocuments = [
  { id: "doc-1", name: "Contract" },
  { id: "doc-2", name: "Invoice" },
];

export default function PortalDashboard() {
  const [projects, setProjects] = useState<ClientProject[]>(mockProjects);
  const [activeProjectId, setActiveProjectId] = useState<string>("proj-1");
  const { messages, setMessages, isLoading, sendMessage: handleSendMessage } = useChat(activeProjectId, setProjects);
  
  useRealtimeBrief(activeProjectId, setProjects);
  
  const [authState, setAuthState] = useState<"initial" | "login_form" | "authenticated">("initial");
  const [animStage, setAnimStage] = useState<string>("unauthenticated");
  const [documents] = useState(mockDocuments);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState<MobileTab>("projects");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthState("authenticated");
    setAnimStage("crossfade");
    
    setTimeout(() => {
      setAnimStage("docking");
    }, 350);

    setTimeout(() => {
      setAnimStage("documents");
    }, 850);

    setTimeout(() => {
      setAnimStage("projects");
    }, 1150);

    setTimeout(() => {
      setAnimStage("brief");
    }, 1450);

    setTimeout(() => {
      setAnimStage("progress");
    }, 1750);

    setTimeout(() => {
      setAnimStage("authenticated");
    }, 2100);
  };

  useEffect(() => {
    const supabase = createClient();
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && authState !== "authenticated") {
        setAuthState("authenticated");
        setAnimStage("authenticated");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && event === 'SIGNED_IN' && authState !== "authenticated") {
        handleLoginSubmit(new Event('submit') as unknown as React.FormEvent);
        handleSendMessage("SYSTEM: Успешная регистрация и вход. Аккаунт подтвержден.");
      } else if (event === 'SIGNED_OUT') {
        setAuthState("initial");
        setAnimStage("unauthenticated");
      }
    });

    return () => subscription.unsubscribe();
  }, [authState, handleSendMessage]);

  const activeProject = projects.find((p) => p.id === activeProjectId);

  const handleSetAuthState = (state: "initial" | "login_form" | "authenticated") => {
    setAuthState(state);
    if (state !== "authenticated") {
      setAnimStage("unauthenticated");
    }
  };

  const handleNewProject = () => {
    const uniqueNum = Date.now().toString().slice(-6);
    const newId = `proj-${uniqueNum}`;
    const newProj: ClientProject = {
      id: newId,
      title: `Project ${projects.length + 1}`,
      status: "planning",
      progressPercentage: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      milestones: [
        { id: `m-${newId}-1`, title: "Project Submitted", status: "in_progress" },
        { id: `m-${newId}-2`, title: "Raw Cut", status: "todo" },
        { id: `m-${newId}-3`, title: "SFX", status: "todo" },
        { id: `m-${newId}-4`, title: "Colorgrading", status: "todo" },
        { id: `m-${newId}-5`, title: "Final Review", status: "todo" },
        { id: `m-${newId}-6`, title: "Project Completed", status: "todo" },
      ],
      brief: {
        upsells: [],
        isGenerating: false,
      },
    };
    setProjects((prev) => [newProj, ...prev]);
    setActiveProjectId(newId);
    setMessages([]);
  };

  const handleDeleteProject = (projectId: string) => {
    const index = projects.findIndex((p) => p.id === projectId);
    if (activeProjectId === projectId) {
      if (projects.length > 1) {
        // If deleting the first project, pick the next one. Otherwise pick the previous.
        const prevProject = index > 0 ? projects[index - 1] : projects[1];
        setActiveProjectId(prevProject.id);
      } else {
        setActiveProjectId("");
      }
    }
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  };

  // Chat is handled via useChat hook above

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white font-sans text-slate-800 antialiased">
      {/* Left panel */}
      <Sidebar
        projects={projects}
        activeProjectId={activeProjectId}
        onSelectProject={setActiveProjectId}
        onNewProject={handleNewProject}
        onDeleteProject={handleDeleteProject}
        authState={authState}
        setAuthState={handleSetAuthState}
        documents={documents}
        animStage={animStage}
        onLoginSubmit={handleLoginSubmit}
      />

      {/* Center panel */}
      <div className="relative flex-1 flex flex-col h-full overflow-hidden">
        {/* Hamburger Menu (Mobile Only) */}
        <button 
          onClick={() => setIsMobileDrawerOpen(true)}
          className="absolute top-4 left-4 z-30 lg:hidden w-10 h-10 bg-white rounded-full shadow-md border border-slate-200 flex items-center justify-center text-[#0802E2] active:scale-95 transition-all cursor-pointer"
        >
          <FaBars />
        </button>

        {/* Chat log */}
        <ChatWindow messages={messages} isGenerating={isLoading} />

        {/* Input box */}
        <ChatInput 
          onSendMessage={handleSendMessage} 
          isLoading={isLoading} 
          hasMessages={messages.length > 0} 
          suggestions={messages.slice().reverse().find(m => m.role === "model")?.suggestions}
        />
      </div>

      {/* Right panel */}
      <RightPanel project={activeProject} authState={authState} animStage={animStage} />

      {/* Mobile Components */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        activeTab={mobileActiveTab}
        onTabChange={(tab) => setMobileActiveTab(tab)}
        projects={projects}
        activeProjectId={activeProjectId}
        onSelectProject={(id) => { setActiveProjectId(id); setIsMobileDrawerOpen(false); }}
        onNewProject={() => { handleNewProject(); setIsMobileDrawerOpen(false); }}
        onDeleteProject={handleDeleteProject}
        authState={authState}
        setAuthState={handleSetAuthState}
        documents={documents}
        animStage={animStage}
        onLoginSubmit={(e) => { handleLoginSubmit(e); setIsMobileDrawerOpen(false); }}
        project={activeProject}
      />
    </div>
  );
}
