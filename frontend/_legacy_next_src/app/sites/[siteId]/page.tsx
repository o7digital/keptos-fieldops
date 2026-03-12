'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AppShell } from '@/components/AppShell';
import { Guard } from '@/components/Guard';
import { EmptyState, KeyValueGrid, PageHeader, Panel, SectionHeading, StatusBadge } from '@/components/fieldops/ui';
import { labelMaps } from '@/features/fieldops/options';
import { useFieldOpsData } from '@/features/fieldops/store';
import { formatDateTime, toneFromHealth, toneFromInterventionStatus, toneFromSiteStatus } from '@/features/fieldops/utils';

export default function SiteDetailPage() {
  const params = useParams<{ siteId: string }>();
  const { store } = useFieldOpsData();
  const site = store.sites.find((item) => item.id === params.siteId);

  if (!site) {
    return (
      <Guard>
        <AppShell>
          <EmptyState title="Site not found" description="The requested site does not exist in the current workspace." action={<Link href="/sites" className="btn-primary">Back to sites</Link>} />
        </AppShell>
      </Guard>
    );
  }

  const client = store.clients.find((item) => item.id === site.clientId);
  const interventions = store.interventions.filter((item) => item.siteId === site.id);
  const networkReports = store.networkReports.filter((item) => item.siteId === site.id);
  const engineerMap = new Map(store.engineers.map((item) => [item.id, item]));

  return (
    <Guard>
      <AppShell>
        <PageHeader
          eyebrow="Site detail"
          title={site.name}
          description="Operational location view with health status, intervention history, and internet reporting trail."
          actions={<Link href="/sites" className="btn-secondary">Back to sites</Link>}
        />

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Panel>
            <SectionHeading title="Location profile" />
            <KeyValueGrid
              items={[
                { label: 'Client', value: client?.name || 'N/A' },
                { label: 'Status', value: <StatusBadge tone={toneFromSiteStatus(site.status)}>{labelMaps.siteStatus[site.status]}</StatusBadge> },
                { label: 'Health score', value: <StatusBadge tone={toneFromHealth(site.healthScore)}>{labelMaps.healthScore[site.healthScore]}</StatusBadge> },
                { label: 'Address', value: site.address },
                { label: 'Local contact', value: site.localContact },
                { label: 'Local phone', value: site.localContactPhone || 'N/A' },
                { label: 'GPS', value: site.gpsLatitude && site.gpsLongitude ? `${site.gpsLatitude}, ${site.gpsLongitude}` : site.gpsPlaceholder || 'Placeholder only' },
                { label: 'Updated', value: formatDateTime(site.updatedAt) },
              ]}
            />
          </Panel>

          <div className="space-y-6">
            <Panel>
              <SectionHeading title="Intervention history" />
              <div className="space-y-3">
                {interventions.map((intervention) => (
                  <Link key={intervention.id} href={`/interventions/${intervention.id}`} className="block rounded-3xl border border-white/6 bg-white/[0.03] p-4 transition hover:border-cyan-400/30">
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

            <Panel>
              <SectionHeading title="Network history" description="Internet reporting remains tied to the site for trend analysis." />
              <div className="space-y-3">
                {networkReports.map((report) => (
                  <div key={report.id} className="rounded-3xl border border-white/6 bg-white/[0.03] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-white">{report.provider}</p>
                        <p className="mt-1 text-sm text-slate-400">{report.connectionType}</p>
                      </div>
                      <StatusBadge tone={toneFromHealth(report.healthScore)}>{labelMaps.healthScore[report.healthScore]}</StatusBadge>
                    </div>
                    <p className="mt-3 text-sm text-slate-300">
                      Down {report.downloadMbps} Mbps · Up {report.uploadMbps} Mbps · Ping {report.pingMs} ms · Loss {report.packetLossPct}%
                    </p>
                    <p className="mt-3 text-sm text-slate-400">{report.technicalRemarks || 'No technical remark.'}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </AppShell>
    </Guard>
  );
}
