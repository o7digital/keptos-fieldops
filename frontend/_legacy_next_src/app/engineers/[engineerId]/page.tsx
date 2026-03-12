'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AppShell } from '@/components/AppShell';
import { Guard } from '@/components/Guard';
import { EmptyState, KeyValueGrid, PageHeader, Panel, SectionHeading, StatusBadge } from '@/components/fieldops/ui';
import { labelMaps } from '@/features/fieldops/options';
import { useFieldOpsData } from '@/features/fieldops/store';
import { formatDateTime, toneFromEngineerStatus, toneFromInterventionStatus } from '@/features/fieldops/utils';

export default function EngineerDetailPage() {
  const params = useParams<{ engineerId: string }>();
  const { store } = useFieldOpsData();
  const engineer = store.engineers.find((item) => item.id === params.engineerId);

  if (!engineer) {
    return (
      <Guard>
        <AppShell>
          <EmptyState title="Engineer not found" description="The requested engineer does not exist in the current workspace." action={<Link href="/engineers" className="btn-primary">Back to engineers</Link>} />
        </AppShell>
      </Guard>
    );
  }

  const interventions = store.interventions.filter((item) => item.engineerId === engineer.id);
  const clientMap = new Map(store.clients.map((item) => [item.id, item]));
  const siteMap = new Map(store.sites.map((item) => [item.id, item]));

  return (
    <Guard>
      <AppShell>
        <PageHeader eyebrow="Engineer detail" title={engineer.fullName} description="Field profile, specialties, and assigned intervention history." actions={<Link href="/engineers" className="btn-secondary">Back to engineers</Link>} />
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Panel>
            <SectionHeading title="Profile" />
            <KeyValueGrid
              items={[
                { label: 'Status', value: <StatusBadge tone={toneFromEngineerStatus(engineer.status)}>{labelMaps.engineerStatus[engineer.status]}</StatusBadge> },
                { label: 'Email', value: engineer.email },
                { label: 'Phone', value: engineer.phone },
                { label: 'Region', value: engineer.region },
                { label: 'Specialties', value: engineer.specialties.join(' · ') },
                { label: 'Assigned interventions', value: String(interventions.length) },
              ]}
            />
          </Panel>
          <Panel>
            <SectionHeading title="Assigned interventions" />
            <div className="space-y-3">
              {interventions.map((intervention) => (
                <Link key={intervention.id} href={`/interventions/${intervention.id}`} className="block rounded-3xl border border-white/6 bg-white/[0.03] p-4 transition hover:border-cyan-400/30">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-white">{intervention.reference}</p>
                      <p className="mt-1 text-sm text-slate-400">
                        {clientMap.get(intervention.clientId)?.name} · {siteMap.get(intervention.siteId)?.name}
                      </p>
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
      </AppShell>
    </Guard>
  );
}
