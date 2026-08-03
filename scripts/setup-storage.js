import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mhzwsnhbriamhbqrlbcu.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oendzbmhicmlhbWhicXJsYmN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTY0MjY4NSwiZXhwIjoyMTAxMjE4Njg1fQ.df-8CHYqk8djBurPssGIC91fszLVBanr_gzcp62B_9c';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function main() {
  console.log('Creating portfolio-images bucket...');
  
  const { data, error } = await supabase.storage.createBucket('portfolio-images', {
    public: true,
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/gif'],
    fileSizeLimit: 10485760 // 10MB
  });

  if (error) {
    if (error.message.includes('already exists')) {
      console.log('Bucket already exists.');
    } else {
      console.error('Error creating bucket:', error.message);
      process.exit(1);
    }
  } else {
    console.log('✓ Bucket created successfully!');
  }
}

main();
