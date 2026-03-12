'use client';

import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import { Guard } from '@/components/Guard';
import { InlineLink, KpiCard, PageHeader, Panel, SectionHeading, StatusBadge } from '@/components/fieldops/ui';
import { useFieldOpsData } from '@/features/fieldops/store';
import { getClientMap, getEngineerDashboard, getEngineerMap, getManagerDashboard, getSiteMap } from '@/features/fieldops/selectors';
import { formatDateTime, toneFromHealth, toneFromInterventionStatus } from '@/features/fieldops/utils';
import { useAuth } from '@/contexts/AuthContext';
import { labelMaps } from '@/features/fieldops/options';

export default function DashboardPage() {
  const { store } = useFieldOpsData();
  const { user } = useAuth();
  const manager = getManagerDashboard(store);
  const engineer = getEngineerDashboard(store, user?.email);
  const clientMap = getClientMap(store);
  const siteMap = getSiteMap(store);
  const engineerMap = getEngineerMap(store);
  const todayInterventions = [...store.interventions]
    .sort((a, b) => +new Date(a.scheduledStartAt) - +new Date(b.scheduledStartAt))
    .slice(0, 5);
  const criticalQueue = store.interventions.filter((item) => item.priority === 'critical' && item.status !== 'completed').length;
  const monitoredRedSites = store.sites.filter((site) => site.healthScore === 'red').length;

  return (
    <Guard>
      <AppShell>
        <PageHeader
          eyebrow="Operations command"
          title="Keptos FieldOps dashboard"
          description="A premium field service command center for supervision, dispatch, on-site validation, reporting, and future multi-ITSM orchestration."
          actions={
            <>
              <Link href="/interventions/new" className="btn-primary">
                Dispatch intervention
              </Link>
              <Link href="/admin" className="btn-secondary">
                Open admin
              </Link>
            </>
          }
        />

        <div className="dashboard-stage">
          <Panel className="dashboard-hero-panel">
            <div className="dashboard-hero-grid">
              <div className="dashboard-hero-copy">
                <span className="dashboard-chip">Command layer</span>
                <h2 className="dashboard-hero-title">Operational supervision built to look credible in front of a serious B2B client.</h2>
                <p className="dashboard-hero-description">
                  Keptos gets a clean enterprise control plane: client footprint, active interventions, network health, and execution reporting without falling into a generic helpdesk clone.
                </p>
                <div className="dashboard-hero-actions">
                  <Link href="/reports" className="btn-secondary">
                    Open reports
                  </Link>
                  <Link href="/network" className="btn-secondary">
                    Internet watch
                  </Link>
                </div>
              </div>

              <div className="dashboard-hero-metrics">
                <div className="dashboard-metric-tile">
                  <span className="dashboard-metric-label">Today</span>
                  <span className="dashboard-metric-value">{manager.interventionsToday}</span>
                  <span className="dashboard-metric-copy">scheduled interventions</span>
                </div>
                <div className="dashboard-metric-tile">
                  <span className="dashboard-metric-label">SLA</span>
                  <span className="dashboard-metric-value">{manager.slaAlerts}</span>
                  <span className="dashboard-metric-copy">alerts requiring action</span>
                </div>
                <div className="dashboard-metric-tile">
                  <span className="dashboard-metric-label">Network</span>
                  <span className="dashboard-metric-value">{monitoredRedSites}</span>
                  <span className="dashboard-metric-copy">sites currently red</span>
                </div>
                <div className="dashboard-metric-tile">
                  <span className="dashboard-metric-label">Critical</span>
                  <span className="dashboard-metric-value">{criticalQueue}</span>
                  <span className="dashboard-metric-copy">priority queue items</span>
                </div>
              </div>
            </div>
          </Panel>

          <div className="dashboard-side-stack">
            <Panel className="dashboard-side-panel">
              <p className="dashboard-side-label">Live posture</p>
              <div className="dashboard-side-value-row">
                <span className="dashboard-side-value">{manager.inProgress}</span>
                <StatusBadge tone="info">In progress</StatusBadge>
              </div>
              <p className="dashboard-side-copy">Engineers currently engaged on-site or in active execution.</p>
            </Panel>
            <Panel className="dashboard-side-panel">
              <p className="dashboard-side-label">Engineer coverage</p>
              <div className="dashboard-side-value-row">
                <span className="dashboard-side-value">{manager.activeEngineers}</span>
                <StatusBadge tone="success">Available</StatusBadge>
              </div>
              <p className="dashboard-side-copy">Active field capacity ready for dispatch today.</p>
            </Panel>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          <KpiCard label="Interventions today" value={manager.interventionsToday} hint="Scheduled or active visits across the board." tone="info" />
          <KpiCard label="Engineers active" value={manager.activeEngineers} hint="Currently available field capacity." tone="success" />
          <KpiCard label="Check-ins validated" value={manager.checkInsValidated} hint="On-site presence confirmed." tone="success" />
          <KpiCard label="Internet incidents" value={manager.internetIncidents} hint="Red network health situations to prioritize." tone="danger" />
          <KpiCard label="In progress" value={manager.inProgress} hint="Interventions currently underway." tone="warning" />
          <KpiCard label="SLA alerts" value={manager.slaAlerts} hint="Items beyond target or about to miss." tone="danger" />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <Panel>
              <SectionHeading
                title="Manager focus"
                description="Most active clients, recent reports, and monitored sites under pressure."
                action={<InlineLink href="/clients" label="Open clients" />}
              />
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="dashboard-subpanel">
                  <p className="text-sm font-medium text-white">Clients with highest activity</p>
                  <div className="mt-4 space-y-3">
                    {manager.topClients.map((entry) => (
                      <div key={entry.client.id} className="dashboard-list-item">
                        <div>
                          <p className="font-medium text-white">{entry.client.name}</p>
                          <p className="text-sm text-slate-400">
                            {labelMaps.contractType[entry.client.contractType]} · {entry.client.sla}
                          </p>
                        </div>
                        <StatusBadge tone="info">{entry.count} visits</StatusBadge>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="dashboard-subpanel">
                  <p className="text-sm font-medium text-white">Latest reports sent</p>
                  <div className="mt-4 space-y-3">
                    {manager.recentReports.map((report) => {
                      const intervention = store.interventions.find((item) => item.id === report.interventionId);
                      const client = intervention ? clientMap.get(intervention.clientId) : null;
                      return (
                        <div key={report.id} className="dashboard-list-item">
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-medium text-white">{client?.name || 'Unknown client'}</p>
                            <StatusBadge tone="neutral">{report.pdfStatus}</StatusBadge>
                          </div>
                          <p className="mt-2 text-sm text-slate-300">{report.result}</p>
                          <p className="mt-3 text-xs uppercase tracking-[0.25em] text-slate-500">{formatDateTime(report.updatedAt)}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-5 dashboard-subpanel">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-white">Sites under surveillance</p>
                  <InlineLink href="/network" label="Open network board" />
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {manager.monitoredSites.map((entry) => (
                    <div key={entry.site.id} className="dashboard-site-card">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-white">{entry.site.name}</p>
                          <p className="text-sm text-slate-400">{clientMap.get(entry.site.clientId)?.name}</p>
                        </div>
                        <StatusBadge tone={toneFromHealth(entry.site.healthScore)}>
                          {labelMaps.healthScore[entry.site.healthScore]}
                        </StatusBadge>
                      </div>
                      <p className="mt-3 text-sm text-slate-300">{entry.site.address}</p>
                      <p className="mt-3 text-xs uppercase tracking-[0.25em] text-slate-500">{entry.interventionsCount} interventions on record</p>
                    </div>
                  ))}
                </div>
              </div>
            </Panel>

            <Panel>
              <SectionHeading
                title="Operations board today"
                description="Nearest upcoming interventions and live execution status."
                action={<InlineLink href="/interventions" label="Open interventions" />}
              />
              <div className="space-y-3">
                {todayInterventions.map((intervention) => (
                  <div key={intervention.id} className="dashboard-ops-row">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-white">{intervention.reference}</p>
                        <p className="mt-1 text-sm text-slate-400">
                          {clientMap.get(intervention.clientId)?.name} · {siteMap.get(intervention.siteId)?.name}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <StatusBadge tone={toneFromInterventionStatus(intervention.status)}>
                          {labelMaps.interventionStatus[intervention.status]}
                        </StatusBadge>
                        <StatusBadge tone="neutral">{labelMaps.priority[intervention.priority]}</StatusBadge>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-300">
                      <span>{formatDateTime(intervention.scheduledStartAt)}</span>
                      <span>{engineerMap.get(intervention.engineerId)?.fullName}</span>
                      <Link href={`/interventions/${intervention.id}`} className="font-medium text-cyan-200 transition hover:text-cyan-100">
                        Open detail
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          <div className="space-y-6">
            <Panel>
              <SectionHeading
                title="Engineer dashboard"
                description="Personal execution view kept available inside the shared dashboard."
                action={<InlineLink href="/engineers" label="Open engineers" />}
              />
              {engineer.engineer ? (
                <div className="space-y-4">
                  <div className="dashboard-profile-card">
                    <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/70">Assigned profile</p>
                    <p className="mt-3 text-2xl font-semibold text-white">{engineer.engineer.fullName}</p>
                    <p className="mt-1 text-sm text-slate-300">{engineer.engineer.region}</p>
                    <p className="mt-3 text-sm text-slate-300">{engineer.engineer.specialties.join(' · ')}</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
                    <div className="dashboard-mini-stat">
                      <p className="text-sm text-slate-400">My interventions today</p>
                      <p className="mt-2 text-3xl font-semibold text-white">{engineer.interventionsToday.length}</p>
                    </div>
                    <div className="dashboard-mini-stat">
                      <p className="text-sm text-slate-400">Next appointment</p>
                      <p className="mt-2 text-lg font-semibold text-white">
                        {engineer.nextIntervention ? formatDateTime(engineer.nextIntervention.scheduledStartAt) : 'No upcoming intervention'}
                      </p>
                    </div>
                    <div className="dashboard-mini-stat">
                      <p className="text-sm text-slate-400">Last check-in</p>
                      <p className="mt-2 text-lg font-semibold text-white">
                        {engineer.lastCheckIn ? formatDateTime(engineer.lastCheckIn.checkInAt) : 'No check-in yet'}
                      </p>
                    </div>
                  </div>
                  <div className="dashboard-subpanel">
                    <p className="text-sm font-medium text-white">Recent reports</p>
                    <div className="mt-4 space-y-3">
                      {engineer.recentReports.map((report) => (
                        <div key={report.id} className="dashboard-list-item">
                          <p className="font-medium text-white">{report.result}</p>
                          <p className="mt-2 text-sm text-slate-400">{formatDateTime(report.updatedAt)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-400">No matching engineer profile found for the current user yet.</p>
              )}
            </Panel>
          </div>
        </div>
      </AppShell>
    </Guard>
  );
}
