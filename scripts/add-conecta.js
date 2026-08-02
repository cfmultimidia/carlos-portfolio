import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mhzwsnhbriamhbqrlbcu.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oendzbmhicmlhbWhicXJsYmN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTY0MjY4NSwiZXhwIjoyMTAxMjE4Njg1fQ.df-8CHYqk8djBurPssGIC91fszLVBanr_gzcp62B_9c';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const conectaProject = {
  slug: 'conecta',
  title: 'Company Vote UX Conecta',
  description: "It was requested to create a flow for the voting page, where we would have 12 categories, in each category we would have the details of each participant.",
  company: 'Zap Imóveis / Conecta Imobi',
  role: 'UX Designer',
  year: '2023',
  coverImage: '/conecta/cover.webp',
  coverBg: '#5a22d4',
  isProtected: false,
  password: '',
  prototypeUrl: '',
  prototypeLabel: '',
  prototypeBg: '',
  sections: [
    { type: 'image-full', src: '/conecta/flow.webp', alt: 'User Flow', bg: '#f5f5f5' },
    { type: 'text', heading: 'Wireframe', paragraphs: ['With the flow defined, the wireframes were created to structure the layout and establish the hierarchy of information before moving on to the final UI design.'] },
    { type: 'image-full', src: '/conecta/wireframe.webp', alt: 'Wireframe', bg: '#f5f5f5' },
    { type: 'text', heading: 'Final Design', paragraphs: ['The final interface brings the Zap brand identity into the voting experience, making it simple, intuitive, and highly accessible across all devices.'] },
    { type: 'image-grid', images: [
      { src: '/conecta/final-modal.webp', alt: 'Final Design Modal', bg: '#d9d9d9' },
      { src: '/conecta/final-grid.webp', alt: 'Final Design Grid', bg: '#d9d9d9' }
    ] }
  ],
};

async function main() {
  console.log('Inserting Conecta project to Supabase...');
  
  const { error } = await supabase
    .from('projects')
    .upsert([{ slug: conectaProject.slug, data: conectaProject, sort_order: 2 }], { onConflict: 'slug' });
  
  if (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
  
  console.log('✓ Conecta project inserted successfully!');
}

main();
