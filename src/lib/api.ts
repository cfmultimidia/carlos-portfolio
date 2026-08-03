import type { Project } from '../data/projects';
import { supabase } from './supabase';

const ADMIN_HEADER = 'x-admin-password';

// ─── Read (public, via Supabase anon key) ─────────────────────────────────────

export async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('data')
    .order('sort_order', { ascending: true });

  if (error || !data) {
    console.warn('Supabase read error:', error?.message);
    return [];
  }

  return data.map((row) => row.data as Project);
}

export async function fetchProject(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('data')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return data.data as Project;
}

// ─── Write (admin only, via Vercel API routes) ────────────────────────────────

async function adminRequest(
  method: string,
  path: string,
  adminPassword: string,
  body?: unknown,
) {
  const res = await fetch(path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      [ADMIN_HEADER]: adminPassword,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(err.error ?? `HTTP ${res.status}`);
  }

  return res.json();
}

export async function apiCreateProject(project: Project, adminPassword: string) {
  return adminRequest('POST', '/api/projects', adminPassword, project);
}

export async function apiUpdateProject(
  originalSlug: string,
  project: Project,
  adminPassword: string,
) {
  return adminRequest('PUT', `/api/projects/${originalSlug}`, adminPassword, project);
}

export async function apiDeleteProject(slug: string, adminPassword: string) {
  return adminRequest('DELETE', `/api/projects/${slug}`, adminPassword);
}

// ─── Image Upload ─────────────────────────────────────────────────────────────

export async function apiUploadImage(file: File, adminPassword: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = reader.result as string;
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            [ADMIN_HEADER]: adminPassword,
          },
          body: JSON.stringify({ filename: file.name, base64 }),
        });
        
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || `Error ${res.status}`);
        }
        
        const data = await res.json();
        resolve(data.url);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
  });
}

export async function apiSeedProjects(projects: Project[], adminPassword: string) {
  return adminRequest('POST', '/api/setup', adminPassword, { projects });
}
