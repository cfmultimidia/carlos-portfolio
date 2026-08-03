import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase with service role for admin rights
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Adjust as needed
    },
  },
};

function checkAdmin(req: VercelRequest): boolean {
  return req.headers['x-admin-password'] === process.env.ADMIN_SECRET_PASSWORD;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!checkAdmin(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { filename, base64 } = req.body;

    if (!filename || !base64) {
      return res.status(400).json({ error: 'Missing filename or base64 data' });
    }

    // Extract mime type and the actual base64 data from Data URI
    // Format is like "data:image/png;base64,iVBORw0KGgo..."
    const matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: 'Invalid base64 string' });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];

    // Convert base64 to Buffer
    const buffer = Buffer.from(base64Data, 'base64');

    // Create a unique path to avoid overwriting (timestamp + random + safe filename)
    const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const path = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}-${safeFilename}`;

    const { data, error } = await supabase.storage
      .from('portfolio-images')
      .upload(path, buffer, {
        contentType: mimeType,
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return res.status(500).json({ error: 'Failed to upload image' });
    }

    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(data.path);

    return res.status(200).json({ url: publicUrlData.publicUrl });
  } catch (error) {
    console.error('Upload handler error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
