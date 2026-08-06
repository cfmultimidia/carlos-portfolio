-- ============================================================
-- SHOWFOLIO — Phase 1 Database Migration
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. Create user profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Add user_id column to projects (nullable initially for migration)
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- 3. Enable RLS on user_profiles
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Public can read any profile
DROP POLICY IF EXISTS public_read_profiles ON public.user_profiles;
CREATE POLICY public_read_profiles ON public.user_profiles
  FOR SELECT TO anon, authenticated USING (true);

-- Users can only update their own profile
DROP POLICY IF EXISTS self_update_profile ON public.user_profiles;
CREATE POLICY self_update_profile ON public.user_profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Users can insert their own profile (on signup)
DROP POLICY IF EXISTS self_insert_profile ON public.user_profiles;
CREATE POLICY self_insert_profile ON public.user_profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- 4. Update projects RLS policies for multi-tenancy

-- Keep public read (by slug, any project not protected)
DROP POLICY IF EXISTS public_read ON public.projects;
CREATE POLICY public_read ON public.projects
  FOR SELECT TO anon, authenticated USING (true);

-- Authenticated users can insert their own projects
DROP POLICY IF EXISTS auth_insert ON public.projects;
CREATE POLICY auth_insert ON public.projects
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Authenticated users can update only their own projects
DROP POLICY IF EXISTS auth_update ON public.projects;
CREATE POLICY auth_update ON public.projects
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Authenticated users can delete only their own projects
DROP POLICY IF EXISTS auth_delete ON public.projects;
CREATE POLICY auth_delete ON public.projects
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- 5. Create helper function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 6. Helper: fetch projects by username (for public portfolio pages)
CREATE OR REPLACE FUNCTION public.get_projects_by_username(p_username TEXT)
RETURNS SETOF projects AS $$
  SELECT p.*
  FROM public.projects p
  JOIN public.user_profiles up ON up.id = p.user_id
  WHERE up.username = p_username
  ORDER BY p.sort_order ASC;
$$ LANGUAGE sql SECURITY DEFINER;
