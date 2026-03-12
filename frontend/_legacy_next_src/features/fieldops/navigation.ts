export const primaryNavigation = [
  { href: '/dashboard', label: 'Dashboard', hint: 'Command center' },
  { href: '/clients', label: 'Clients', hint: 'Accounts and contracts' },
  { href: '/sites', label: 'Sites', hint: 'Operational locations' },
  { href: '/engineers', label: 'Engineers', hint: 'Field force' },
  { href: '/client-users', label: 'Client users', hint: 'Local stakeholders' },
  { href: '/interventions', label: 'Interventions', hint: 'Dispatch and SLA' },
  { href: '/reports', label: 'Reports', hint: 'Intervention output' },
  { href: '/network', label: 'Network', hint: 'Internet health' },
] as const;

export const secondaryNavigation = [
  { href: '/admin', label: 'Admin', hint: 'Internal setup' },
  { href: '/admin/integrations', label: 'Integrations', hint: 'Connector base' },
  { href: '/admin/sync-logs', label: 'Sync logs', hint: 'Observability' },
] as const;
