-- Run this in Supabase SQL Editor.
-- IMPORTANT: after creating your account, set app_metadata.role = 'admin'
-- for your own user in Supabase Dashboard > Authentication > Users.

create table if not exists public.works (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  media_type text not null check (media_type in ('image','video','document','education')),
  storage_path text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.visits (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  path text not null,
  visited_at timestamptz not null default now()
);

alter table public.works enable row level security;
alter table public.visits enable row level security;

create or replace function public.is_site_admin()
returns boolean language sql stable as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

-- Authenticated visitors may view published works. Only admin can write/delete.
create policy "authenticated users can view works"
on public.works for select to authenticated using (true);
create policy "admin can insert works"
on public.works for insert to authenticated with check (public.is_site_admin());
create policy "admin can update works"
on public.works for update to authenticated using (public.is_site_admin()) with check (public.is_site_admin());
create policy "admin can delete works"
on public.works for delete to authenticated using (public.is_site_admin());

-- Visitors can record their own visit. Only admin can inspect visit records.
create policy "users can record own visits"
on public.visits for insert to authenticated with check (auth.uid() = user_id);
create policy "admin can read visits"
on public.visits for select to authenticated using (public.is_site_admin());

-- Private storage bucket: media is not publicly addressable.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio-media','portfolio-media',false,524288000,
  array['image/jpeg','image/png','image/webp','video/mp4','video/webm','application/pdf'])
on conflict (id) do nothing;

create policy "authenticated visitors can view portfolio media"
on storage.objects for select to authenticated
using (bucket_id = 'portfolio-media');

create policy "only admin can upload portfolio media"
on storage.objects for insert to authenticated
with check (bucket_id = 'portfolio-media' and public.is_site_admin());

create policy "only admin can update portfolio media"
on storage.objects for update to authenticated
using (bucket_id = 'portfolio-media' and public.is_site_admin())
with check (bucket_id = 'portfolio-media' and public.is_site_admin());

create policy "only admin can delete portfolio media"
on storage.objects for delete to authenticated
using (bucket_id = 'portfolio-media' and public.is_site_admin());