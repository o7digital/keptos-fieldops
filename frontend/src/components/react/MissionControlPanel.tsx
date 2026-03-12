import { useMemo, useState } from 'react';
import type { Mission } from '@/data/mock';

type Props = {
  missions: Mission[];
  copy: {
    checkIn: string;
    checkOut: string;
    missionProgress: string;
    missionTimeline: string;
    interventionReportDraft: string;
    summary: string;
    diagnosis: string;
    material: string;
    impactedUsers: string;
    internetReporting: string;
    downlink: string;
    uplink: string;
    ping: string;
    packetLoss: string;
  };
};

function toneFromPriority(priority: Mission['priority']) {
  if (priority === 'Critical') return 'danger';
  if (priority === 'High') return 'warning';
  if (priority === 'Medium') return 'info';
  return 'neutral';
}

export function MissionControlPanel({ missions, copy }: Props) {
  const [selectedId, setSelectedId] = useState(missions[0]?.id ?? '');

  const mission = useMemo(
    () => missions.find((entry) => entry.id === selectedId) ?? missions[0],
    [missions, selectedId],
  );

  if (!mission) return null;

  return (
    <div className="mission-control-grid">
      <div className="mission-roster">
        {missions.map((entry) => (
          <button
            key={entry.id}
            type="button"
            className={`mission-roster-item ${entry.id === mission.id ? 'mission-roster-item-active' : ''}`}
            onClick={() => setSelectedId(entry.id)}
          >
            <div className="mission-roster-top">
              <span className="mission-roster-label">{entry.label}</span>
              <span className={`status-pill status-pill-${toneFromPriority(entry.priority)}`}>{entry.priority}</span>
            </div>
            <p className="mission-roster-client">{entry.client}</p>
            <p className="mission-roster-site">{entry.site}</p>
            <div className="mission-roster-meta">
              <span>{entry.engineer}</span>
              <strong>{entry.status}</strong>
            </div>
          </button>
        ))}
      </div>

      <div className="mission-stage">
        <div className="mission-stage-header">
          <div>
            <p className="mission-stage-eyebrow">{mission.label}</p>
            <h3 className="mission-stage-title">{mission.client} / {mission.site}</h3>
            <p className="mission-stage-copy">{mission.summary}</p>
          </div>
          <div className="mission-stage-actions">
            <span className="chrome-chip">{copy.checkIn} {mission.checkIn}</span>
            <span className="chrome-chip chrome-chip-muted">{copy.checkOut} {mission.checkOut}</span>
          </div>
        </div>

        <div className="mission-progress">
          <div className="mission-progress-top">
            <span>{copy.missionProgress}</span>
            <strong>{mission.progress}%</strong>
          </div>
          <div className="mission-progress-track">
            <span style={{ width: `${mission.progress}%` }} />
          </div>
          <p className="mission-progress-copy">{mission.workOrder}</p>
        </div>

        <div className="mission-detail-grid">
          <div className="mission-panel">
            <p className="mission-panel-title">{copy.missionTimeline}</p>
            <div className="timeline-list">
              {mission.timeline.map((item) => (
                <div key={`${mission.id}-${item.time}`} className="timeline-row">
                  <span className={`timeline-dot timeline-dot-${item.tone}`}></span>
                  <div>
                    <div className="timeline-row-top">
                      <strong>{item.title}</strong>
                      <span>{item.time}</span>
                    </div>
                    <p>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mission-panel">
            <p className="mission-panel-title">{copy.interventionReportDraft}</p>
            <p className="mission-panel-copy"><strong>{copy.summary}:</strong> {mission.report.summary}</p>
            <p className="mission-panel-copy"><strong>{copy.diagnosis}:</strong> {mission.report.diagnosis}</p>
            <ul className="mission-bullet-list">
              {mission.report.actions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
            <div className="mission-meta-grid">
              <div>
                <span>{copy.material}</span>
                <strong>{mission.report.material}</strong>
              </div>
              <div>
                <span>{copy.impactedUsers}</span>
                <strong>{mission.report.impactedUsers}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="mission-network-card">
          <div className="mission-network-top">
            <div>
              <p className="mission-panel-title">{copy.internetReporting}</p>
              <p className="mission-panel-copy">{mission.network.remark}</p>
            </div>
            <span className={`status-pill status-pill-${mission.network.health === 'Green' ? 'success' : mission.network.health === 'Amber' ? 'warning' : 'danger'}`}>
              {mission.network.health}
            </span>
          </div>
          <div className="telemetry-grid">
            <div><span>{copy.downlink}</span><strong>{mission.network.down}</strong></div>
            <div><span>{copy.uplink}</span><strong>{mission.network.up}</strong></div>
            <div><span>{copy.ping}</span><strong>{mission.network.ping}</strong></div>
            <div><span>{copy.packetLoss}</span><strong>{mission.network.loss}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}
