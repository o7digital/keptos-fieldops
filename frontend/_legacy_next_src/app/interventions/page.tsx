'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { Guard } from '@/components/Guard';
import { InterventionEditor } from '@/components/fieldops/InterventionEditor';
import { DataTable, KpiCard, PageHeader, Panel, SectionHeading, StatusBadge } from '@/components/fieldops/ui';
import { labelMaps } from '@/features/fieldops/options';
import { useFieldOpsData } from '@/features/fieldops/store';
import { formatDateTime, toneFromInterventionStatus, toneFromPriority } from '@/features/fieldops/utils';

export default function InterventionsPage() {
  const { store, saveIntervention, checkIn, checkOut } = useFieldOpsData();
  const [selectedId, setSelectedId] = useState<string | null>(store.interventions[0]?.id ?? null);
  const selectedIntervention = useMemo(
    () => store.interventions.find((item) => item.id === selectedId) || null,
    [selectedId, store.interventions],
  );
  const clientMap = new Map(store.clients.map((item) => [item.id, item]));
  const siteMap = new Map(store.sites.map((item) => [item.id, item]));
  const engineerMap = new Map(store.engineers.map((item) => [item.id, item]));

  return (
    <Guard>
      <AppShell>
        <PageHeader
          eyebrow="Dispatch board"
          title="Interventions"
          description="Create, assign, monitor, and close interventions while keeping the local business core independent from external ITSM tools."
          actions={
            <Link href="/interventions/new" className="btn-primary">
              Full page creation
            </Link>
          }
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="To do" value={store.interventions.filter((item) => item.status === 'todo').length} hint="Queued interventions." tone="neutral" />
          <KpiCard label="In progress" value={store.interventions.filter((item) => item.status === 'in_progress').length} hint="Field work underway." tone="info" />
          <KpiCard label="On hold" value={store.interventions.filter((item) => item.status === 'on_hold').length} hint="Waiting on provider or customer." tone="warning" />
          <KpiCard label="Completed" value={store.interventions.filter((item) => item.status === 'completed').length} hint="Closed with visit completion." tone="success" />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Panel>
            <SectionHeading title="Operations board" />
            <DataTable
              rows={store.interventions}
              emptyLabel="No interventions configured yet."
              columns={[
                {
                  header: 'Reference',
                  render: (intervention) => (
                    <div>
                      <p className="font-medium text-white">{intervention.reference}</p>
                      <p className="text-sm text-slate-400">
                        {clientMap.get(intervention.clientId)?.name} · {siteMap.get(intervention.siteId)?.name}
                      </p>
                    </div>
                  ),
                },
                {
                  header: 'Engineer',
                  render: (intervention) => engineerMap.get(intervention.engineerId)?.fullName || 'N/A',
                },
                {
                  header: 'Window',
                  render: (intervention) => formatDateTime(intervention.scheduledStartAt),
                },
                {
                  header: 'Status',
                  render: (intervention) => (
                    <div className="flex flex-wrap gap-2">
                      <StatusBadge tone={toneFromInterventionStatus(intervention.status)}>
                        {labelMaps.interventionStatus[intervention.status]}
                      </StatusBadge>
                      <StatusBadge tone={toneFromPriority(intervention.priority)}>
                        {labelMaps.priority[intervention.priority]}
                      </StatusBadge>
                    </div>
                  ),
                },
                {
                  header: 'Actions',
                  render: (intervention) => (
                    <div className="flex flex-wrap gap-3">
                      <button type="button" className="text-sm text-cyan-200" onClick={() => setSelectedId(intervention.id)}>
                        Edit
                      </button>
                      <button type="button" className="text-sm text-cyan-200" onClick={() => checkIn(intervention.id, engineerMap.get(intervention.engineerId)?.fullName)}>
                        Check-in
                      </button>
                      <button type="button" className="text-sm text-cyan-200" onClick={() => checkOut(intervention.id, engineerMap.get(intervention.engineerId)?.fullName)}>
                        Check-out
                      </button>
                      <Link href={`/interventions/${intervention.id}`} className="text-sm text-cyan-200">
                        Detail
                      </Link>
                    </div>
                  ),
                },
              ]}
            />
          </Panel>

          <Panel>
            <SectionHeading title={selectedIntervention ? 'Edit intervention' : 'Quick create'} />
            <InterventionEditor
              clients={store.clients}
              sites={store.sites}
              engineers={store.engineers}
              initial={selectedIntervention}
              submitLabel={selectedIntervention ? 'Save intervention' : 'Create intervention'}
              onSubmit={(value) => {
                saveIntervention({
                  ...value,
                  id: value.id,
                  scheduledStartAt: new Date(value.scheduledStartAt).toISOString(),
                  scheduledEndAt: value.scheduledEndAt ? new Date(value.scheduledEndAt).toISOString() : null,
                  slaTargetAt: new Date(value.slaTargetAt).toISOString(),
                  internalComments: value.internalComments || null,
                });
                if (!value.id) setSelectedId(null);
              }}
            />
          </Panel>
        </div>
      </AppShell>
    </Guard>
  );
}
