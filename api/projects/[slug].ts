import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

function cors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password');
}

function checkAdmin(req: VercelRequest): boolean {
  return req.headers['x-admin-password'] === process.env.ADMIN_SECRET_PASSWORD;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { slug } = req.query as { slug: string };

  // ── PUT /api/projects/:slug — update (admin) ───────────────────────────────
  if (req.method === 'PUT') {
    if (!checkAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });

    const project = req.body;
    if (!project?.slug) return res.status(400).json({ error: 'Missing slug' });

    // Handle slug rename: if slug changed, delete old + insert new
    if (project.slug !== slug) {
      const { data: existing } = await supabase
        .from('projects')
        .select('sort_order')
        .eq('slug', slug)
        .single();

      await supabase.from('projects').delete().eq('slug', slug);
      const { error } = await supabase
        .from('projects')
        .insert({ slug: project.slug, data: project, sort_order: existing?.sort_order ?? 0 });

      if (error) return res.status(500).json({ error: error.message });
      return res.json({ ok: true });
    }

    const { error } = await supabase
      .from('projects')
      .update({ data: project, updated_at: new Date().toISOString() })
      .eq('slug', slug);

    if (error) return res.status(500).json({ error: error.message });
    return res.json({ ok: true });
  }

  // ── DELETE /api/projects/:slug — delete (admin) ────────────────────────────
  if (req.method === 'DELETE') {
    if (!checkAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });

    const { error } = await supabase.from('projects').delete().eq('slug', slug);
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ ok: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
