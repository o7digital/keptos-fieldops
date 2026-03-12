'use client';

import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import { Guard } from '@/components/Guard';
import { DataTable, KeyValueGrid, KpiCard, PageHeader, Panel, SectionHeading } from '@/components/fieldops/ui';
import { useFieldOpsData } from '@/features/fieldops/store';

const adminTiles = [
  { href: '/clients', title: 'Clients management', description: 'Accounts, contracts, and SLA posture.' },
  { href: '/sites', title: 'Sites management', description: 'Location status, contacts, and GPS preparation.' },
  { href: '/engineers', title: 'Engineers management', description: 'Coverage, specialties, and region load.' },
  { href: '/client-users', title: 'Client users management', description: 'Stakeholders and recurring incidents.' },
  { href: '/admin/integrations', title: 'Connectors management', description: 'Connector base, external records, and accounts.' },
  { href: '/admin/sync-logs', title: 'Sync logs', description: 'Integration observability and troubleshooting.' },
] as const;

export default function AdminHomePage() {
  const { store, resetDemoData } = useFieldOpsData();

  return (
    <Guard>
      <AppShell>
        <PageHeader
          eyebrow="Internal admin"
          title="Admin"
          description="Structured internal admin covering business entities, status catalogs, SLA definitions, and the future connector layer."
          actions={
            <button type="button" className="btn-secondary" onClick={resetDemoData}>
              Reset demo data
            </button>
          }
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <KpiCard label="Clients" value={store.clients.length} hint="Managed organizations in the workspace." tone="info" />
          <KpiCard label="Sites" value={store.sites.length} hint="Operational locations under support." tone="neutral" />
          <KpiCard label="Engineers" value={store.engineers.length} hint="Profiles kept dispatch-ready." tone="success" />
          <KpiCard label="Integrations" value={store.integrations.length} hint="Connector entries configured." tone="warning" />
          <KpiCard label="Sync failures" value={store.syncLogs.filter((log) => log.syncStatus === 'failed').length} hint="Failed sync logs currently stored." tone="danger" />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_0.95fr]">
          <Panel>
            <SectionHeading title="Admin areas" />
            <div className="grid gap-4 md:grid-cols-2">
              {adminTiles.map((tile) => (
                <Link key={tile.href} href={tile.href} className="rounded-3xl border border-white/6 bg-white/[0.03] p-5 transition hover:border-cyan-400/30">
                  <p className="text-lg font-semibold text-white">{tile.title}</p>
                  <p className="mt-2 text-sm text-slate-400">{tile.description}</p>
                  <p className="mt-4 text-sm font-medium text-cyan-200">Open module</p>
                </Link>
              ))}
            </div>
          </Panel>

          <Panel>
            <SectionHeading title="General settings" />
            <KeyValueGrid
              items={[
                { label: 'Company name', value: store.generalSettings.companyName },
                { label: 'Command center', value: store.generalSettings.commandCenterName },
                { label: 'Support email', value: store.generalSettings.supportEmail },
                { label: 'Timezone', value: store.generalSettings.timezone },
              ]}
            />
          </Panel>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <Panel>
            <SectionHeading title="Intervention types" />
            <DataTable
              rows={store.interventionTypes}
              emptyLabel="No intervention types configured."
              columns={[
                { header: 'Name', render: (item) => item.name },
                { header: 'Code', render: (item) => item.code },
              ]}
            />
          </Panel>
          <Panel>
            <SectionHeading title="SLA catalog" />
            <DataTable
              rows={store.slaCatalog}
              emptyLabel="No SLA configured."
              columns={[
                { header: 'Plan', render: (item) => item.name },
                { header: 'Response', render: (item) => `${item.responseHours}h` },
                { header: 'Resolution', render: (item) => `${item.resolutionHours}h` },
                { header: 'Coverage', render: (item) => item.coverage },
              ]}
            />
          </Panel>
        </div>

        <div className="mt-8">
          <Panel>
            <SectionHeading title="Status catalog" description="Shared dictionaries used by client, site, engineer, and intervention flows." />
            <DataTable
              rows={store.statusCatalog}
              emptyLabel="No statuses configured."
              columns={[
                { header: 'Entity', render: (item) => item.entity },
                { header: 'Value', render: (item) => item.value },
                { header: 'Label', render: (item) => item.label },
              ]}
            />
          </Panel>
        </div>
      </AppShell>
    </Guard>
  );
}
