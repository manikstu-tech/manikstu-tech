-- Content admin (/admin): run this once in the Supabase SQL editor (Dashboard > SQL Editor > New query).

-- One row per editable page. Only the edits are stored; the original text stays in the code.
create table if not exists public.cms_content (
  key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- No policies on purpose: nobody can read or write this table from a browser.
-- The website's server uses the service-role key, which bypasses these rules.
alter table public.cms_content enable row level security;

-- Pictures and videos uploaded from the admin. Public, so the website can show them; 50 MB is the free plan's per-file limit.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cms-media',
  'cms-media',
  true,
  52428800,
  array['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'image/gif', 'video/mp4', 'video/webm']
)
on conflict (id) do nothing;
