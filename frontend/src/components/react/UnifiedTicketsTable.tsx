import { useMemo, useState } from 'react';
import type { TicketRow, TicketSource } from '@/data/mock';

type Props = {
  tickets: TicketRow[];
};

const sourceOptions: Array<TicketSource | 'All'> = [
  'All',
  'Zendesk',
  'Jira Service Management',
  'ServiceNow',
  'Freshservice',
];

function toneFromSource(source: TicketSource) {
  if (source === 'Zendesk') return 'info';
  if (source === 'Jira Service Management') return 'warning';
  if (source === 'ServiceNow') return 'danger';
  return 'success';
}

function toneFromPriority(priority: TicketRow['priority']) {
  if (priority === 'Critical') return 'danger';
  if (priority === 'High') return 'warning';
  if (priority === 'Medium') return 'info';
  return 'neutral';
}

function toneFromStatus(status: TicketRow['status']) {
  if (status === 'Resolved') return 'success';
  if (status === 'In Progress') return 'info';
  if (status === 'Waiting Vendor') return 'warning';
  if (status === 'Triaged') return 'neutral';
  return 'danger';
}

export function UnifiedTicketsTable({ tickets }: Props) {
  const [source, setSource] = useState<TicketSource | 'All'>('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesSource = source === 'All' || ticket.source === source;
      const haystack = `${ticket.id} ${ticket.client} ${ticket.site} ${ticket.engineer} ${ticket.intervention}`.toLowerCase();
      const matchesSearch = !search.trim() || haystack.includes(search.trim().toLowerCase());
      return matchesSource && matchesSearch;
    });
  }, [search, source, tickets]);

  return (
    <div className="table-panel">
      <div className="table-toolbar">
        <div className="filter-pills">
          {sourceOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={`filter-pill ${source === option ? 'filter-pill-active' : ''}`}
              onClick={() => setSource(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <label className="table-search">
          <span>Search</span>
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Client, site, engineer, intervention"
          />
        </label>
      </div>

      <div className="premium-table-shell">
        <table className="premium-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Source</th>
              <th>Client</th>
              <th>Site</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Engineer</th>
              <th>Intervention linked</th>
              <th>Last update</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((ticket) => (
              <tr key={ticket.id}>
                <td className="mono-cell">{ticket.id}</td>
                <td>
                  <span className={`source-pill source-pill-${toneFromSource(ticket.source)}`}>{ticket.source}</span>
                </td>
                <td>{ticket.client}</td>
                <td>{ticket.site}</td>
                <td>
                  <span className={`status-pill status-pill-${toneFromPriority(ticket.priority)}`}>{ticket.priority}</span>
                </td>
                <td>
                  <span className={`status-pill status-pill-${toneFromStatus(ticket.status)}`}>{ticket.status}</span>
                </td>
                <td>{ticket.engineer}</td>
                <td>{ticket.intervention}</td>
                <td>{ticket.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
