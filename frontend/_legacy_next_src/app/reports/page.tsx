'use client';

import { useMemo, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { Guard } from '@/components/Guard';
import { ReportEditor } from '@/components/fieldops/ReportEditor';
import { DataTable, KpiCard, PageHeader, Panel, SectionHeading } from '@/components/fieldops/ui';
import { useFieldOpsData } from '@/features/fieldops/store';
import { formatDateTime } from '@/features/fieldops/utils';

export default function ReportsPage() {
  const { store, saveInterventionReport } = useFieldOpsData();
  const [selectedReportId, setSelectedReportId] = useState<string | null>(store.interventionReports[0]?.id ?? null);
  const [selectedInterventionId, setSelectedInterventionId] = useState<string>(store.interventions[0]?.id || '');
  const selectedReport = useMemo(
    () => store.interventionReports.find((item) => item.id === selectedReportId) || null,
    [selectedReportId, store.interventionReports],
  );
  const interventionMap = new Map(store.interventions.map((item) => [item.id, item]));
  const clientMap = new Map(store.clients.map((item) => [item.id, item]));

  return (
    <Guard>
      <AppShell>
        <PageHeader
          eyebrow="Intervention output"
          title="Reports"
          description="Structured intervention reports with placeholders ready for future PDF generation and storage buckets."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <KpiCard label="Reports" value={store.interventionReports.length} hint="Reports captured in the workspace." tone="info" />
          <KpiCard label="Pending validation" value={store.interventionReports.filter((item) => item.clientValidation === 'pending').length} hint="Customer validation placeholders still open." tone="warning" />
          <KpiCard label="PDF backlog" value={store.interventionReports.filter((item) => item.pdfStatus === 'planned').length} hint="Prepared for Railway PDF generation later." tone="neutral" />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <Panel>
            <SectionHeading title="Latest reports" />
            <DataTable
              rows={store.interventionReports}
              emptyLabel="No report created yet."
              columns={[
                {
                  header: 'Intervention',
                  render: (report) => {
                    const intervention = interventionMap.get(report.interventionId);
                    const client = intervention ? clientMap.get(intervention.clientId) : null;
                    return (
                      <div>
                        <p className="font-medium text-white">{intervention?.reference || 'Unknown intervention'}</p>
                        <p className="text-sm text-slate-400">{client?.name || 'Unknown client'}</p>
                      </div>
                    );
                  },
                },
                {
                  header: 'Result',
                  render: (report) => report.result,
                },
                {
                  header: 'Updated',
                  render: (report) => formatDateTime(report.updatedAt),
                },
                {
                  header: 'Action',
                  render: (report) => (
                    <button
                      type="button"
                      className="text-sm text-cyan-200"
                      onClick={() => {
                        setSelectedReportId(report.id);
                        setSelectedInterventionId(report.interventionId);
                      }}
                    >
                      Edit
                    </button>
                  ),
                },
              ]}
            />
          </Panel>

          <Panel>
            <SectionHeading title={selectedReport ? 'Edit report' : 'Create report'} />
            <div className="mb-4">
              <label className="field-label">Intervention</label>
              <select
                className="field-control mt-2"
                value={selectedInterventionId}
                onChange={(event) => {
                  setSelectedInterventionId(event.target.value);
                  const matching = store.interventionReports.find((item) => item.interventionId === event.target.value) || null;
                  setSelectedReportId(matching?.id || null);
                }}
              >
                {store.interventions.map((intervention) => (
                  <option key={intervention.id} value={intervention.id}>
                    {intervention.reference}
                  </option>
                ))}
              </select>
            </div>
            <ReportEditor
              interventionId={selectedInterventionId}
              initial={selectedReport?.interventionId === selectedInterventionId ? selectedReport : null}
              submitLabel={selectedReport?.interventionId === selectedInterventionId ? 'Save report' : 'Create report'}
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
                  attachmentIds: selectedReport?.attachmentIds || [],
                  clientValidation: 'placeholder',
                  pdfStatus: 'planned',
                });
              }}
            />
          </Panel>
        </div>
      </AppShell>
    </Guard>
  );
}
