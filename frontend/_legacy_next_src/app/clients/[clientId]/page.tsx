'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AppShell } from '@/components/AppShell';
import { Guard } from '@/components/Guard';
import { EmptyState, KeyValueGrid, PageHeader, Panel, SectionHeading, StatusBadge } from '@/components/fieldops/ui';
import { labelMaps } from '@/features/fieldops/options';
import { useFieldOpsData } from '@/features/fieldops/store';
import { formatDateTime, toneFromEntityStatus, toneFromInterventionStatus, toneFromSiteStatus } from '@/features/fieldops/utils';

export default function ClientDetailPage() {
  const params = useParams<{ clientId: string }>();
  const { store } = useFieldOpsData();
  const client = store.clients.find((item) => item.id === params.clientId);

  if (!client) {
    return (
      <Guard>
        <AppShell>
          <EmptyState
            title="Client not found"
            description="The requested client does not exist in the current FieldOps demo workspace."
            action={
              <Link href="/clients" className="btn-primary">
                Back to clients
              </Link>
            }
          />
        </AppShell>
      </Guard>
    );
  }

  const sites = store.sites.filter((site) => site.clientId === client.id);
  const clientUsers = store.clientUsers.filter((item) => item.clientId === client.id);
  const interventions = store.interventions.filter((item) => item.clientId === client.id);
  const engineerMap = new Map(store.engineers.map((item) => [item.id, item]));

  return (
    <Guard>
      <AppShell>
        <PageHeader
          eyebrow="Client detail"
          title={client.name}
          description="Single account view joining contractual posture, operational footprint, and intervention history."
          actions={
            <Link href="/clients" className="btn-secondary">
              Back to clients
            </Link>
          }
        />

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Panel>
            <SectionHeading title="Account profile" />
            <KeyValueGrid
              items={[
                {
                  label: 'Status',
                  value: <StatusBadge tone={toneFromEntityStatus(client.status)}>{labelMaps.entityStatus[client.status]}</StatusBadge>,
                },
                { label: 'Primary contact', value: client.primaryContact },
                { label: 'Email', value: client.primaryEmail || 'N/A' },
                { label: 'Phone', value: client.primaryPhone || 'N/A' },
                { label: 'Contract', value: labelMaps.contractType[client.contractType] },
                { label: 'SLA', value: client.sla },
                { label: 'Notes', value: client.notes || 'No internal note yet.' },
                { label: 'Updated', value: formatDateTime(client.updatedAt) },
              ]}
            />
          </Panel>

          <div className="space-y-6">
            <Panel>
              <SectionHeading title="Sites" description="Multiple client sites are first-class operational objects." />
              <div className="grid gap-3 md:grid-cols-2">
                {sites.map((site) => (
                  <Link
                    key={site.id}
                    href={`/sites/${site.id}`}
                    className="rounded-3xl border border-white/6 bg-white/[0.03] p-4 transition hover:border-cyan-400/30"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-white">{site.name}</p>
                        <p className="mt-1 text-sm text-slate-400">{site.address}</p>
                      </div>
                      <StatusBadge tone={toneFromSiteStatus(site.status)}>{labelMaps.siteStatus[site.status]}</StatusBadge>
                    </div>
                  </Link>
                ))}
              </div>
            </Panel>

            <Panel>
              <SectionHeading title="Client users" />
              <div className="space-y-3">
                {clientUsers.map((user) => (
                  <div key={user.id} className="rounded-3xl border border-white/6 bg-white/[0.03] p-4">
                    <p className="font-medium text-white">{user.fullName}</p>
                    <p className="mt-1 text-sm text-slate-400">
                      {user.jobTitle || 'N/A'} · {user.department || 'N/A'}
                    </p>
                    <p className="mt-3 text-sm text-slate-300">{user.recurringIncidents.join(' · ') || 'No recurrent incident logged.'}</p>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel>
              <SectionHeading title="Intervention history" />
              <div className="space-y-3">
                {interventions.map((intervention) => (
                  <Link
                    key={intervention.id}
                    href={`/interventions/${intervention.id}`}
                    className="block rounded-3xl border border-white/6 bg-white/[0.03] p-4 transition hover:border-cyan-400/30"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-white">{intervention.reference}</p>
                        <p className="mt-1 text-sm text-slate-400">{engineerMap.get(intervention.engineerId)?.fullName || 'Unknown engineer'}</p>
                      </div>
                      <StatusBadge tone={toneFromInterventionStatus(intervention.status)}>
                        {labelMaps.interventionStatus[intervention.status]}
                      </StatusBadge>
                    </div>
                    <p className="mt-3 text-sm text-slate-300">{formatDateTime(intervention.scheduledStartAt)}</p>
                  </Link>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </AppShell>
    </Guard>
  );
}
