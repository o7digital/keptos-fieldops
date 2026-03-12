import { useMemo, useState } from 'react';
import type { PortalTheme } from '@/data/mock';

type Props = {
  themes: PortalTheme[];
};

export function PortalThemePreview({ themes }: Props) {
  const [selectedId, setSelectedId] = useState(themes[0]?.id ?? '');
  const theme = useMemo(
    () => themes.find((entry) => entry.id === selectedId) ?? themes[0],
    [selectedId, themes],
  );

  if (!theme) return null;

  return (
    <div className="portal-preview-root">
      <div className="filter-pills">
        {themes.map((entry) => (
          <button
            key={entry.id}
            type="button"
            className={`filter-pill ${entry.id === theme.id ? 'filter-pill-active' : ''}`}
            onClick={() => setSelectedId(entry.id)}
          >
            {entry.tenantName}
          </button>
        ))}
      </div>

      <div
        className="portal-preview-stage"
        style={
          {
            '--tenant-accent': theme.accent,
            '--tenant-accent-soft': theme.accentSoft,
            '--tenant-glow': theme.glow,
          } as React.CSSProperties
        }
      >
        <div className="portal-preview-header">
          <div className="portal-brand">
            <div className="portal-brand-mark">{theme.logoLabel}</div>
            <div>
              <p className="portal-brand-title">{theme.tenantName}</p>
              <p className="portal-brand-copy">{theme.headline}</p>
            </div>
          </div>
          <div className="portal-brand-badges">
            <span className="portal-brand-chip">White-label ready</span>
            <span className="portal-brand-chip">Client-facing</span>
          </div>
        </div>

        <div className="portal-stat-grid">
          {theme.stats.map((stat) => (
            <div key={stat.label} className="portal-stat-card">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <p>{stat.note}</p>
            </div>
          ))}
        </div>

        <div className="portal-content-grid">
          <div className="portal-card">
            <p className="portal-card-title">Client tickets</p>
            {theme.tickets.map((ticket) => (
              <div key={ticket.id} className="portal-list-row">
                <div>
                  <strong>{ticket.title}</strong>
                  <span>{ticket.id} · {ticket.source}</span>
                </div>
                <span className="portal-badge">{ticket.status}</span>
              </div>
            ))}
          </div>

          <div className="portal-card">
            <p className="portal-card-title">Reports</p>
            {theme.reports.map((report) => (
              <div key={report.title} className="portal-list-row">
                <div>
                  <strong>{report.title}</strong>
                  <span>{report.engineer}</span>
                </div>
                <span>{report.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="portal-content-grid">
          <div className="portal-card">
            <p className="portal-card-title">Incidents</p>
            {theme.incidents.map((incident) => (
              <div key={incident.site} className="portal-list-row">
                <div>
                  <strong>{incident.site}</strong>
                  <span>{incident.note}</span>
                </div>
                <span className="portal-badge">{incident.level}</span>
              </div>
            ))}
          </div>

          <div className="portal-card portal-card-message">
            <p className="portal-card-title">Why this matters</p>
            <p>
              Keptos can present the same premium orchestration platform as its own service surface, while preserving a differentiated identity for each client workspace.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
