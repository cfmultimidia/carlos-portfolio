import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mhzwsnhbriamhbqrlbcu.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oendzbmhicmlhbWhicXJsYmN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTY0MjY4NSwiZXhwIjoyMTAxMjE4Njg1fQ.df-8CHYqk8djBurPssGIC91fszLVBanr_gzcp62B_9c';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function main() {
  console.log('Updating Conecta project in Supabase...');
  
  const { data, error: fetchError } = await supabase
    .from('projects')
    .select('data, sort_order')
    .eq('slug', 'conecta')
    .single();

  if (fetchError || !data) {
    console.error('Error fetching project:', fetchError?.message);
    process.exit(1);
  }

  const projectData = data.data;
  const sortOrder = data.sort_order;

  // Change cover image
  projectData.coverImage = '/conecta/conecta.png';
  
  // Ensure the first section is the full image section and change it too
  // In our previous script, we didn't add a 'Context' image section, we only had:
  // sections: [{ type: 'image-full', src: '/conecta/flow.webp', ... }]
  // Let's prepend the new cover as the first internal image
  if (projectData.sections[0].src !== '/conecta/conecta.png') {
    projectData.sections.unshift({
      type: 'image-full',
      src: '/conecta/conecta.png',
      alt: 'Conecta Imobi Cover',
      bg: '#1a1061'
    });
  }
  
  const { error: updateError } = await supabase
    .from('projects')
    .update({ data: projectData })
    .eq('slug', 'conecta');
  
  if (updateError) {
    console.error('Error updating:', updateError.message);
    process.exit(1);
  }
  
  console.log('✓ Conecta project updated successfully!');
}

main();
