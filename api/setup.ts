import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

function cors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password');
}

function checkAdmin(req: VercelRequest): boolean {
  return req.headers['x-admin-password'] === process.env.ADMIN_SECRET_PASSWORD;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!checkAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });

  const { projects } = req.body as { projects: Array<{ slug: string; [key: string]: unknown }> };
  if (!Array.isArray(projects)) return res.status(400).json({ error: 'Missing projects array' });

  // Upsert all projects
  const rows = projects.map((p, i) => ({ slug: p.slug, data: p, sort_order: i }));
  const { error } = await supabase.from('projects').upsert(rows, { onConflict: 'slug' });

  if (error) return res.status(500).json({ error: error.message });
  return res.json({ ok: true, seeded: projects.length });
}
