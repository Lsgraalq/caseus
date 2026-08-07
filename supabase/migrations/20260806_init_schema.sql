-- Migration: 20260806_init_schema
-- Creates projects, project_briefs, chat_messages, and documents tables.

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: projects
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID, -- For future auth linking
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'planning',
  progress_percentage INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: project_briefs
CREATE TABLE IF NOT EXISTS public.project_briefs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  duration_and_price TEXT,
  upsells TEXT[] DEFAULT '{}',
  brand_colors TEXT,
  has_raw_files BOOLEAN DEFAULT FALSE,
  notes TEXT,
  is_generating BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: chat_messages
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'model', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: documents
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_briefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- For demo purposes, we will allow anonymous access for all operations 
-- (assuming you will add actual JWT auth later). 
-- WARNING: In production, these should be restricted to authenticated users matching user_id.

CREATE POLICY "Allow anonymous select on projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert on projects" ON public.projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update on projects" ON public.projects FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete on projects" ON public.projects FOR DELETE USING (true);

CREATE POLICY "Allow anonymous select on project_briefs" ON public.project_briefs FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert on project_briefs" ON public.project_briefs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update on project_briefs" ON public.project_briefs FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete on project_briefs" ON public.project_briefs FOR DELETE USING (true);

CREATE POLICY "Allow anonymous select on chat_messages" ON public.chat_messages FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert on chat_messages" ON public.chat_messages FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous select on documents" ON public.documents FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert on documents" ON public.documents FOR INSERT WITH CHECK (true);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER project_briefs_updated_at BEFORE UPDATE ON public.project_briefs FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Turn on realtime for project_briefs
alter publication supabase_realtime add table public.project_briefs;
