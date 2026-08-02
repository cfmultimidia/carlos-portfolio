#!/usr/bin/env node
/**
 * Run this ONCE to create the table and seed initial data.
 * Usage: node scripts/setup.js
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mhzwsnhbriamhbqrlbcu.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oendzbmhicmlhbWhicXJsYmN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTY0MjY4NSwiZXhwIjoyMTAxMjE4Njg1fQ.df-8CHYqk8djBurPssGIC91fszLVBanr_gzcp62B_9c';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const defaultProjects = [
  {
    slug: 'promotool',
    title: 'Promotool AI',
    description: "Designing an AI-powered promotional campaign management platform that helps B2B teams plan, forecast and execute strategies with intelligent insights.",
    company: 'O Boticário',
    role: 'UX/UI Designer',
    year: '2025',
    coverImage: '/portfolio-1.png',
    coverBg: '#e8eaf0',
    isProtected: false,
    password: '',
    prototypeUrl: 'https://promotool.vercel.app',
    prototypeLabel: 'View Live Prototype',
    prototypeBg: '#295BF2',
    sections: [
      { type: 'image-full', src: '/portfolio-1.png', alt: 'Promotool Dashboard Overview', bg: '#d9d9d9' },
      { type: 'text', heading: 'Context', paragraphs: ['Promotool AI began with a clear product challenge: integrate artificial intelligence to make a complex, important workflow feel simple, trustworthy and easy to use.', 'I worked across product definition, UX and interface design to translate early requirements into a coherent AI-driven product experience.'] },
      { type: 'image-full', src: '/portfolio-2.png', alt: 'Promotool Interface 2', bg: '#d9d9d9' },
      { type: 'text', heading: 'Opportunity', paragraphs: ['The opportunity was to reduce friction without flattening the nuance of the product. Businesses needed a single place to manage promotional plans, historical context, and financial forecasts, leveraging AI for intelligent insights.', 'The design needed to feel calm and direct while giving users enough structure to act confidently on AI recommendations.'] },
      { type: 'promotool-widgets' },
      { type: 'text', heading: 'Shaping the Product', paragraphs: ['I mapped core journeys, clarified feature priorities and developed flows that connected business goals with user needs.', 'This helped turn a broad product direction into a practical system of screens, states and reusable patterns.'] },
      { type: 'uikit' },
    ],
  },
  {
    slug: 'premmia',
    title: 'Premmia App',
    description: "Redesigning Petrobras's loyalty app, elevating the user experience for millions of station customers across Brazil.",
    company: 'Petrobras / BR',
    role: 'Senior Product Designer',
    year: '2024',
    coverImage: '/premmia/capa.png',
    coverBg: '#1a5c35',
    isProtected: true,
    password: '1234',
    prototypeUrl: 'https://uxfol.io/p/carlosfilipe/cdb29fd4',
    prototypeLabel: 'View Case Study',
    prototypeBg: '#006633',
    sections: [
      { type: 'image-full', src: '/premmia/KVIO9Gcs8hyaggyu.webp', alt: 'Premmia App — Home screen', bg: '#006633' },
      { type: 'text', heading: 'Context', paragraphs: ["Premmia is Petrobras's loyalty app for service stations in Brazil — customers earn points when they fuel up or shop at BR Mania and Lubrax+, and redeem them for partner rewards.", 'Beyond rewards, the app also lets users pay directly at participating stations. This project was a full UI redesign focused on elevating the user experience and engagement.'] },
      { type: 'image-grid', images: [{ src: '/premmia/KKbvpgLhq5lSsrzM.webp', alt: 'Premmia — Perfil e Clube Premmia', bg: '#f0f0f0' }, { src: '/premmia/Qw7wVL48pJ4IEmzN.webp', alt: 'Premmia — Troca de pontos', bg: '#f0f0f0' }] },
      { type: 'text', heading: 'My Role', paragraphs: ["This project was a UI redesign, built on personas, pain points, and strategy already mapped by the client's Research team. I owned the end-to-end UI as a Senior Product Designer, leading 2 mid-level UI Designers."] },
      { type: 'deliverables', items: ['Design library & assets', 'Low-fidelity wireframes (flow validation)', 'High-fidelity UI', 'Handoff'] },
      { type: 'text', heading: 'Design Library & Assets', paragraphs: ['I started with a quick UI audit and set up the foundations: color and type scales, spacing tokens, grid, and an updated icon set.', 'I built the core components (buttons, inputs, cards, nav, banners) with variants and states, documented usage, and ensured contrast and touch-target compliance. Everything was structured in Figma with consistent naming, Auto Layout, and constraints for easy reuse.'] },
      { type: 'image-grid', images: [{ src: '/premmia/QnBUaa6iuTtX7QiN.webp', alt: 'Premmia — Cupons', bg: '#006633' }, { src: '/premmia/ZCXQfULmwRbUUtJH.webp', alt: 'Premmia — Detalhe de cupom', bg: '#006633' }] },
      { type: 'text', heading: 'Low-fidelity Wireframes', paragraphs: ['I mapped the critical journeys — onboarding/login, points accrual, payment at the station, rewards discovery/redemption, and campaign entry points.', 'Then I produced low-fi wireframes and a clickable prototype to validate IA, copy, and step count with Product and Research. Feedback led to fewer steps, clearer "Points balance + primary CTA" placement, and a simplified tab structure.'] },
      { type: 'text', heading: 'High-fidelity UI', paragraphs: ['With flows locked, I translated them into pixel-perfect screens using the new component system and brand guidelines. I designed empty, loading, and error states; added subtle motion guidelines for key interactions; and checked accessibility (contrast, hierarchy, target sizes).'] },
      { type: 'text', heading: 'Handoff', paragraphs: ['I organized Figma pages by flow, linked components, and provided specs via Inspect with redlines and spacing rules. I exported necessary assets (SVG/PNG), attached motion notes, and documented tokens and component props to mirror in code.', 'Finally, I ran a dev walkthrough, tracked open questions, and supported QA with quick UI fixes where needed.'] },
    ],
  },
];

async function main() {
  console.log('Seeding projects to Supabase...');
  
  const rows = defaultProjects.map((p, i) => ({ slug: p.slug, data: p, sort_order: i }));
  
  const { error } = await supabase
    .from('projects')
    .upsert(rows, { onConflict: 'slug' });
  
  if (error) {
    console.error('Error:', error.message);
    console.error('Hint:', error.hint || '');
    console.error('\nIf the table does not exist, create it in the Supabase SQL Editor:');
    console.error(`
CREATE TABLE IF NOT EXISTS public.projects (
  slug TEXT PRIMARY KEY,
  data JSONB NOT NULL DEFAULT '{}',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS public_read ON public.projects;
CREATE POLICY public_read ON public.projects FOR SELECT TO anon USING (true);
    `);
    process.exit(1);
  }
  
  console.log('✓ Seeded', rows.length, 'projects successfully!');
}

main();
