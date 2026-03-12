create extension if not exists pgcrypto;

create type app_role as enum ('admin', 'manager', 'engineer');
create type entity_status as enum ('active', 'inactive');
create type site_status as enum ('operational', 'maintenance', 'at-risk', 'inactive');
create type engineer_status as enum ('active', 'inactive', 'on-leave');
create type intervention_type as enum ('preventive', 'corrective', 'emergency', 'network', 'audit', 'user');
create type intervention_status as enum ('todo', 'in_progress', 'on_hold', 'completed', 'cancelled');
create type priority_level as enum ('low', 'medium', 'high', 'critical');
create type health_score as enum ('green', 'orange', 'red');
create type integration_platform as enum ('zendesk', 'jira', 'servicenow', 'freshservice');
create type sync_status as enum ('queued', 'success', 'warning', 'failed');

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  role app_role not null default 'engineer',
  phone text,
  avatar_url text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  deleted_at timestamptz
);

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  status entity_status not null default 'active',
  primary_contact text not null,
  primary_email text,
  primary_phone text,
  contract_type text not null,
  sla text not null,
  notes text,
  created_by uuid references profiles(id),
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  deleted_at timestamptz
);

create table if not exists client_sites (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  name text not null,
  address text not null,
  local_contact text not null,
  local_contact_phone text,
  gps_latitude numeric(10, 7),
  gps_longitude numeric(10, 7),
  gps_placeholder text,
  status site_status not null default 'operational',
  health_score health_score not null default 'green',
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  deleted_at timestamptz
);

create table if not exists engineers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete set null,
  full_name text not null,
  specialties text[] not null default '{}',
  phone text not null,
  email text not null,
  status engineer_status not null default 'active',
  geographic_zone text not null,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  deleted_at timestamptz
);

create table if not exists client_users (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  site_id uuid references client_sites(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  department text,
  job_title text,
  notes text,
  recurring_incidents text[] not null default '{}',
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  deleted_at timestamptz
);

create table if not exists interventions (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  client_id uuid not null references clients(id) on delete restrict,
  site_id uuid not null references client_sites(id) on delete restrict,
  engineer_id uuid references engineers(id) on delete set null,
  type intervention_type not null,
  status intervention_status not null default 'todo',
  priority priority_level not null default 'medium',
  scheduled_start_at timestamptz not null,
  scheduled_end_at timestamptz,
  actual_start_at timestamptz,
  actual_end_at timestamptz,
  duration_minutes integer,
  sla_target_at timestamptz not null,
  internal_comments text,
  check_in_at timestamptz,
  check_out_at timestamptz,
  check_in_gps_placeholder text,
  check_out_gps_placeholder text,
  created_by uuid references profiles(id),
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  deleted_at timestamptz
);

create table if not exists intervention_logs (
  id uuid primary key default gen_random_uuid(),
  intervention_id uuid not null references interventions(id) on delete cascade,
  kind text not null,
  actor_name text not null,
  message text not null,
  gps_placeholder text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists intervention_reports (
  id uuid primary key default gen_random_uuid(),
  intervention_id uuid not null unique references interventions(id) on delete cascade,
  diagnostic text not null,
  probable_cause text not null,
  actions_performed text not null,
  result text not null,
  hardware text,
  software text,
  impacted_users text,
  client_validation text not null default 'placeholder',
  pdf_status text not null default 'planned',
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists network_reports (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references client_sites(id) on delete cascade,
  intervention_id uuid references interventions(id) on delete set null,
  connection_type text not null,
  provider text not null,
  perceived_quality text not null,
  download_mbps numeric(10, 2) not null,
  upload_mbps numeric(10, 2) not null,
  ping_ms numeric(10, 2) not null,
  packet_loss_pct numeric(10, 2) not null,
  technical_remarks text,
  health_score health_score not null,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists attachments (
  id uuid primary key default gen_random_uuid(),
  intervention_id uuid references interventions(id) on delete cascade,
  report_id uuid references intervention_reports(id) on delete cascade,
  file_name text not null,
  file_type text not null,
  storage_path text not null,
  content_type text,
  created_by uuid references profiles(id),
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists integrations (
  id uuid primary key default gen_random_uuid(),
  platform integration_platform not null,
  name text not null,
  status text not null default 'planned',
  scope text not null,
  description text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists integration_accounts (
  id uuid primary key default gen_random_uuid(),
  integration_id uuid not null references integrations(id) on delete cascade,
  account_name text not null,
  external_workspace text not null,
  credentials jsonb,
  status text not null default 'pending',
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists external_records (
  id uuid primary key default gen_random_uuid(),
  platform integration_platform not null,
  local_entity_type text not null,
  local_entity_id uuid not null,
  external_id text not null,
  external_key text,
  sync_status sync_status not null default 'queued',
  last_sync_at timestamptz,
  payload_snapshot jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists sync_logs (
  id uuid primary key default gen_random_uuid(),
  integration_id uuid references integrations(id) on delete set null,
  platform integration_platform not null,
  entity_type text not null,
  entity_id text not null,
  direction text not null,
  sync_status sync_status not null default 'queued',
  message text not null,
  executed_at timestamptz not null default timezone('utc'::text, now()),
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_client_sites_client_id on client_sites(client_id);
create index if not exists idx_client_users_client_id on client_users(client_id);
create index if not exists idx_client_users_site_id on client_users(site_id);
create index if not exists idx_interventions_client_id on interventions(client_id);
create index if not exists idx_interventions_site_id on interventions(site_id);
create index if not exists idx_interventions_engineer_id on interventions(engineer_id);
create index if not exists idx_interventions_status on interventions(status);
create index if not exists idx_network_reports_site_id on network_reports(site_id);
create index if not exists idx_external_records_local_entity on external_records(local_entity_type, local_entity_id);
create index if not exists idx_sync_logs_platform_status on sync_logs(platform, sync_status);

create trigger set_profiles_updated_at before update on profiles for each row execute procedure set_updated_at();
create trigger set_clients_updated_at before update on clients for each row execute procedure set_updated_at();
create trigger set_client_sites_updated_at before update on client_sites for each row execute procedure set_updated_at();
create trigger set_engineers_updated_at before update on engineers for each row execute procedure set_updated_at();
create trigger set_client_users_updated_at before update on client_users for each row execute procedure set_updated_at();
create trigger set_interventions_updated_at before update on interventions for each row execute procedure set_updated_at();
create trigger set_intervention_logs_updated_at before update on intervention_logs for each row execute procedure set_updated_at();
create trigger set_intervention_reports_updated_at before update on intervention_reports for each row execute procedure set_updated_at();
create trigger set_network_reports_updated_at before update on network_reports for each row execute procedure set_updated_at();
create trigger set_attachments_updated_at before update on attachments for each row execute procedure set_updated_at();
create trigger set_integrations_updated_at before update on integrations for each row execute procedure set_updated_at();
create trigger set_integration_accounts_updated_at before update on integration_accounts for each row execute procedure set_updated_at();
create trigger set_external_records_updated_at before update on external_records for each row execute procedure set_updated_at();
create trigger set_sync_logs_updated_at before update on sync_logs for each row execute procedure set_updated_at();

alter table profiles enable row level security;
alter table clients enable row level security;
alter table client_sites enable row level security;
alter table engineers enable row level security;
alter table client_users enable row level security;
alter table interventions enable row level security;
alter table intervention_logs enable row level security;
alter table intervention_reports enable row level security;
alter table network_reports enable row level security;
alter table attachments enable row level security;
alter table integrations enable row level security;
alter table integration_accounts enable row level security;
alter table external_records enable row level security;
alter table sync_logs enable row level security;

create policy "authenticated read access" on clients for select using (auth.role() = 'authenticated');
create policy "authenticated read access on client_sites" on client_sites for select using (auth.role() = 'authenticated');
create policy "authenticated read access on engineers" on engineers for select using (auth.role() = 'authenticated');
create policy "authenticated read access on client_users" on client_users for select using (auth.role() = 'authenticated');
create policy "authenticated read access on interventions" on interventions for select using (auth.role() = 'authenticated');
create policy "authenticated read access on intervention_logs" on intervention_logs for select using (auth.role() = 'authenticated');
create policy "authenticated read access on intervention_reports" on intervention_reports for select using (auth.role() = 'authenticated');
create policy "authenticated read access on network_reports" on network_reports for select using (auth.role() = 'authenticated');
create policy "authenticated read access on attachments" on attachments for select using (auth.role() = 'authenticated');
create policy "authenticated read access on integrations" on integrations for select using (auth.role() = 'authenticated');
create policy "authenticated read access on integration_accounts" on integration_accounts for select using (auth.role() = 'authenticated');
create policy "authenticated read access on external_records" on external_records for select using (auth.role() = 'authenticated');
create policy "authenticated read access on sync_logs" on sync_logs for select using (auth.role() = 'authenticated');

create policy "admin manage profiles" on profiles for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write clients" on clients for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write client_sites" on client_sites for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write engineers" on engineers for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write client_users" on client_users for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write interventions" on interventions for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write intervention_logs" on intervention_logs for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write intervention_reports" on intervention_reports for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write network_reports" on network_reports for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write attachments" on attachments for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write integrations" on integrations for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write integration_accounts" on integration_accounts for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write external_records" on external_records for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write sync_logs" on sync_logs for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

insert into storage.buckets (id, name, public)
values ('fieldops-attachments', 'fieldops-attachments', false)
on conflict (id) do nothing;
