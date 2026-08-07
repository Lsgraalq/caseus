import { useEffect } from "react";
import { createClient } from "../supabase/client";
import { ClientProject } from "@/types/project";

export function useRealtimeBrief(activeProjectId: string, setProjects: React.Dispatch<React.SetStateAction<ClientProject[]>>) {
  useEffect(() => {
    if (!activeProjectId) return;

    const supabase = createClient();
    
    // Subscribe to changes on project_briefs
    const channel = supabase
      .channel(`public:project_briefs:project_id=eq.${activeProjectId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'project_briefs',
          filter: `project_id=eq.${activeProjectId}`,
        },
        (payload) => {
          const newBrief = payload.new;
          setProjects(prev => prev.map(p => {
            if (p.id === activeProjectId) {
              return {
                ...p,
                brief: {
                  ...p.brief,
                  durationAndPrice: newBrief.duration_and_price,
                  upsells: newBrief.upsells || [],
                  // Optionally map other fields if needed
                }
              };
            }
            return p;
          }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeProjectId, setProjects]);
}
