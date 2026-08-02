import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

function cors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password');
}

function checkAdmin(req: VercelRequest): boolean {
  return req.headers['x-admin-password'] === process.env.ADMIN_SECRET_PASSWORD;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  // ── GET /api/projects — list all (public) ──────────────────────────────────
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('projects')
      .select('data')
      .order('sort_order', { ascending: true });

    if (error) return res.status(500).json({ error: error.message });
    return res.json(data?.map((r) => r.data) ?? []);
  }

  // ── POST /api/projects — create (admin) ────────────────────────────────────
  if (req.method === 'POST') {
    if (!checkAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });

    const project = req.body;
    if (!project?.slug) return res.status(400).json({ error: 'Missing slug' });

    // Get next sort_order
    const { data: existing } = await supabase
      .from('projects')
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1);
    const sortOrder = ((existing?.[0]?.sort_order as number) ?? -1) + 1;

    const { error } = await supabase
      .from('projects')
      .insert({ slug: project.slug, data: project, sort_order: sortOrder });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json({ ok: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
