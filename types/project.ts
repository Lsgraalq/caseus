export type ProjectStatus = "planning" | "in_progress" | "review" | "completed";

export type WorkflowStage =
  | "Project Submitted"
  | "Проект отправлен"
  | "Raw Cut"
  | "SFX"
  | "Colorgrading"
  | "Final Review"
  | "Project Completed"
  | "Проект выполнен";

export interface ProjectMilestone {
  id: string;
  title: WorkflowStage;
  status: "todo" | "in_progress" | "done";
}

export interface LiveBrief {
  durationAndPrice?: string; // e.g. "1 минута - 200 евро"
  upsells: string[]; // e.g. "цветокоррекция +100"
  brandColors?: string; // e.g. "#ja332 и #99sj8"
  hasRawFiles?: boolean;
  notes?: string;
  isGenerating?: boolean; // For skeleton animation
}

export interface ClientProject {
  id: string;
  title: string;
  description?: string;
  status: ProjectStatus;
  progressPercentage: number;
  milestones: ProjectMilestone[];
  brief: LiveBrief;
  createdAt: Date;
  updatedAt: Date;
}
