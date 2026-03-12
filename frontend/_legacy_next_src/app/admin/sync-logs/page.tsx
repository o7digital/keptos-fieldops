'use client';

import { AppShell } from '@/components/AppShell';
import { Guard } from '@/components/Guard';
import { DataTable, PageHeader, Panel, SectionHeading, StatusBadge } from '@/components/fieldops/ui';
import { labelMaps } from '@/features/fieldops/options';
import { useFieldOpsData } from '@/features/fieldops/store';
import { formatDateTime, toneFromSync } from '@/features/fieldops/utils';

export default function SyncLogsPage() {
  const { store } = useFieldOpsData();

  return (
    <Guard>
      <AppShell>
        <PageHeader
          eyebrow="Synchronization observability"
          title="Sync logs"
          description="Administrative view of connector flow, direction, entity mapping, and last known sync state."
        />
        <Panel>
          <SectionHeading title="Recent sync activity" />
          <DataTable
            rows={[...store.syncLogs].sort((a, b) => +new Date(b.executedAt) - +new Date(a.executedAt))}
            emptyLabel="No sync activity recorded."
            columns={[
              { header: 'When', render: (log) => formatDateTime(log.executedAt) },
              { header: 'Platform', render: (log) => labelMaps.platform[log.platform] },
              { header: 'Direction', render: (log) => log.direction },
              { header: 'Entity', render: (log) => `${log.entityType} · ${log.entityId}` },
              { header: 'Status', render: (log) => <StatusBadge tone={toneFromSync(log.syncStatus)}>{labelMaps.syncStatus[log.syncStatus]}</StatusBadge> },
              { header: 'Message', render: (log) => log.message },
            ]}
          />
        </Panel>
      </AppShell>
    </Guard>
  );
}
