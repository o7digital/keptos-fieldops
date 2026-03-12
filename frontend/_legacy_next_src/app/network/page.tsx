'use client';

import { useMemo, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { Guard } from '@/components/Guard';
import { NetworkReportEditor } from '@/components/fieldops/NetworkReportEditor';
import { DataTable, KpiCard, PageHeader, Panel, SectionHeading, StatusBadge } from '@/components/fieldops/ui';
import { labelMaps } from '@/features/fieldops/options';
import { useFieldOpsData } from '@/features/fieldops/store';
import { toneFromHealth } from '@/features/fieldops/utils';

export default function NetworkPage() {
  const { store, saveNetworkReport } = useFieldOpsData();
  const [selectedReportId, setSelectedReportId] = useState<string | null>(store.networkReports[0]?.id ?? null);
  const selectedReport = useMemo(() => store.networkReports.find((item) => item.id === selectedReportId) || null, [selectedReportId, store.networkReports]);
  const siteMap = new Map(store.sites.map((item) => [item.id, item]));
  const redCount = store.networkReports.filter((item) => item.healthScore === 'red').length;
  const avgPing = Math.round(
    store.networkReports.reduce((total, item) => total + item.pingMs, 0) / Math.max(store.networkReports.length, 1),
  );

  return (
    <Guard>
      <AppShell>
        <PageHeader
          eyebrow="Internet reporting"
          title="Network"
          description="Connection quality, throughput, ping, packet loss, and perceived quality all remain queryable per site."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <KpiCard label="Internet incidents" value={redCount} hint="Sites currently marked red." tone="danger" />
          <KpiCard label="Average ping" value={`${avgPing} ms`} hint="Mean observed ping across reports." tone="warning" />
          <KpiCard label="Reports captured" value={store.networkReports.length} hint="Historical internet reporting entries." tone="info" />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <Panel>
            <SectionHeading title="Network history by site" />
            <DataTable
              rows={store.networkReports}
              emptyLabel="No network report yet."
              columns={[
                {
                  header: 'Site',
                  render: (report) => (
                    <div>
                      <p className="font-medium text-white">{siteMap.get(report.siteId)?.name || 'Unknown site'}</p>
                      <p className="text-sm text-slate-400">{report.provider}</p>
                    </div>
                  ),
                },
                {
                  header: 'Metrics',
                  render: (report) => `Down ${report.downloadMbps} / Up ${report.uploadMbps} / ${report.pingMs} ms`,
                },
                {
                  header: 'Health',
                  render: (report) => <StatusBadge tone={toneFromHealth(report.healthScore)}>{labelMaps.healthScore[report.healthScore]}</StatusBadge>,
                },
                {
                  header: 'Action',
                  render: (report) => (
                    <button type="button" className="text-sm text-cyan-200" onClick={() => setSelectedReportId(report.id)}>
                      Edit
                    </button>
                  ),
                },
              ]}
            />
          </Panel>

          <Panel>
            <SectionHeading title={selectedReport ? 'Edit network report' : 'Create network report'} />
            <div className="mb-4">
              <label className="field-label">Site</label>
              <select
                className="field-control mt-2"
                value={selectedReport?.siteId || store.sites[0]?.id || ''}
                onChange={(event) =>
                  setSelectedReportId(store.networkReports.find((item) => item.siteId === event.target.value)?.id || null)
                }
              >
                {store.sites.map((site) => (
                  <option key={site.id} value={site.id}>
                    {site.name}
                  </option>
                ))}
              </select>
            </div>
            <NetworkReportEditor
              siteId={selectedReport?.siteId || store.sites[0]?.id || ''}
              initial={selectedReport}
              submitLabel={selectedReport ? 'Save network report' : 'Create network report'}
              onSubmit={(value) => {
                saveNetworkReport({
                  id: value.id,
                  siteId: value.siteId,
                  interventionId: value.interventionId || null,
                  connectionType: value.connectionType,
                  provider: value.provider,
                  perceivedQuality: value.perceivedQuality,
                  downloadMbps: value.downloadMbps,
                  uploadMbps: value.uploadMbps,
                  pingMs: value.pingMs,
                  packetLossPct: value.packetLossPct,
                  technicalRemarks: value.technicalRemarks || null,
                  healthScore: value.healthScore,
                });
              }}
            />
          </Panel>
        </div>
      </AppShell>
    </Guard>
  );
}
