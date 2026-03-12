'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AppShell } from '@/components/AppShell';
import { Guard } from '@/components/Guard';
import { NetworkReportEditor } from '@/components/fieldops/NetworkReportEditor';
import { ReportEditor } from '@/components/fieldops/ReportEditor';
import { EmptyState, KeyValueGrid, PageHeader, Panel, SectionHeading, StatusBadge, Timeline } from '@/components/fieldops/ui';
import { labelMaps } from '@/features/fieldops/options';
import { useFieldOpsData } from '@/features/fieldops/store';
import { formatDateTime, toneFromInterventionStatus, toneFromPriority } from '@/features/fieldops/utils';

export default function InterventionDetailPage() {
  const params = useParams<{ interventionId: string }>();
  const { store, checkIn, checkOut, saveInterventionReport, saveNetworkReport } = useFieldOpsData();
  const intervention = store.interventions.find((item) => item.id === params.interventionId);

  if (!intervention) {
    return (
      <Guard>
        <AppShell>
          <EmptyState title="Intervention not found" description="The requested intervention does not exist in the current workspace." action={<Link href="/interventions" className="btn-primary">Back to interventions</Link>} />
        </AppShell>
      </Guard>
    );
  }

  const client = store.clients.find((item) => item.id === intervention.clientId);
  const site = store.sites.find((item) => item.id === intervention.siteId);
  const engineer = store.engineers.find((item) => item.id === intervention.engineerId);
  const logs = store.interventionLogs
    .filter((item) => item.interventionId === intervention.id)
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  const report = store.interventionReports.find((item) => item.interventionId === intervention.id) || null;
  const networkReport = store.networkReports.find((item) => item.interventionId === intervention.id) || null;

  return (
    <Guard>
      <AppShell>
        <PageHeader
          eyebrow="Intervention detail"
          title={intervention.reference}
          description="Execution detail with timestamps, GPS placeholders, field activity log, intervention report, and internet diagnostics."
          actions={
            <>
              <button type="button" className="btn-secondary" onClick={() => checkIn(intervention.id, engineer?.fullName)}>
                Check-in
              </button>
              <button type="button" className="btn-primary" onClick={() => checkOut(intervention.id, engineer?.fullName)}>
                Check-out
              </button>
            </>
          }
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Panel>
            <p className="text-sm text-slate-400">Status</p>
            <div className="mt-3">
              <StatusBadge tone={toneFromInterventionStatus(intervention.status)}>{labelMaps.interventionStatus[intervention.status]}</StatusBadge>
            </div>
          </Panel>
          <Panel>
            <p className="text-sm text-slate-400">Priority</p>
            <div className="mt-3">
              <StatusBadge tone={toneFromPriority(intervention.priority)}>{labelMaps.priority[intervention.priority]}</StatusBadge>
            </div>
          </Panel>
          <Panel>
            <p className="text-sm text-slate-400">Check-in</p>
            <p className="mt-3 text-sm font-medium text-white">{formatDateTime(intervention.checkInAt)}</p>
          </Panel>
          <Panel>
            <p className="text-sm text-slate-400">Check-out</p>
            <p className="mt-3 text-sm font-medium text-white">{formatDateTime(intervention.checkOutAt)}</p>
          </Panel>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <Panel>
              <SectionHeading title="Operational summary" />
              <KeyValueGrid
                items={[
                  { label: 'Client', value: client?.name || 'N/A' },
                  { label: 'Site', value: site?.name || 'N/A' },
                  { label: 'Engineer', value: engineer?.fullName || 'N/A' },
                  { label: 'Type', value: labelMaps.interventionType[intervention.type] },
                  { label: 'Scheduled start', value: formatDateTime(intervention.scheduledStartAt) },
                  { label: 'SLA target', value: formatDateTime(intervention.slaTargetAt) },
                  { label: 'GPS check-in placeholder', value: intervention.checkInGpsPlaceholder || 'Not captured yet' },
                  { label: 'Internal comments', value: intervention.internalComments || 'No internal comment.' },
                ]}
              />
            </Panel>

            <Panel>
              <SectionHeading title="Activity log" />
              <Timeline
                items={logs.map((log) => ({
                  id: log.id,
                  title: `${log.kind} · ${log.actor}`,
                  description: `${log.message}${log.gpsPlaceholder ? ` (${log.gpsPlaceholder})` : ''}`,
                  meta: formatDateTime(log.createdAt),
                }))}
              />
            </Panel>
          </div>

          <div className="space-y-6">
            <Panel>
              <SectionHeading title="Intervention report" description="PDF generation structure is already represented via report metadata." />
              <ReportEditor
                interventionId={intervention.id}
                initial={report}
                submitLabel={report ? 'Save report' : 'Create report'}
                onSubmit={(value) => {
                  saveInterventionReport({
                    id: value.id,
                    interventionId: value.interventionId,
                    diagnostic: value.diagnostic,
                    probableCause: value.probableCause,
                    actionsTaken: value.actionsTaken,
                    result: value.result,
                    hardware: value.hardware || null,
                    software: value.software || null,
                    impactedUsers: value.impactedUsers || null,
                    attachmentIds: report?.attachmentIds || [],
                    clientValidation: 'placeholder',
                    pdfStatus: 'planned',
                  });
                }}
              />
            </Panel>

            <Panel>
              <SectionHeading title="Internet reporting" description="Network context can be attached directly to the intervention while remaining queryable by site." />
              <NetworkReportEditor
                siteId={intervention.siteId}
                interventionId={intervention.id}
                initial={networkReport}
                submitLabel={networkReport ? 'Save internet report' : 'Create internet report'}
                onSubmit={(value) => {
                  saveNetworkReport({
                    id: value.id,
                    siteId: value.siteId,
                    interventionId: value.interventionId || intervention.id,
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
        </div>
      </AppShell>
    </Guard>
  );
}
