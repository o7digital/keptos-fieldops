import { useMemo, useState } from 'react';
import type { TicketRow, TicketSource } from '@/data/mock';

type Props = {
  tickets: TicketRow[];
  copy: {
    all: string;
    search: string;
    searchPlaceholder: string;
    columns: {
      id: string;
      source: string;
      client: string;
      site: string;
      priority: string;
      status: string;
      engineer: string;
      intervention: string;
      updated: string;
    };
  };
};

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

export function UnifiedTicketsTable({ tickets, copy }: Props) {
  const [source, setSource] = useState<TicketSource | 'All'>('All');
  const [search, setSearch] = useState('');
  const sourceOptions: Array<{ value: TicketSource | 'All'; label: string }> = [
    { value: 'All', label: copy.all },
    { value: 'Zendesk', label: 'Zendesk' },
    { value: 'Jira Service Management', label: 'Jira Service Management' },
    { value: 'ServiceNow', label: 'ServiceNow' },
    { value: 'Freshservice', label: 'Freshservice' },
  ];

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
              key={option.value}
              type="button"
              className={`filter-pill ${source === option.value ? 'filter-pill-active' : ''}`}
              onClick={() => setSource(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <label className="table-search">
          <span>{copy.search}</span>
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={copy.searchPlaceholder}
          />
        </label>
      </div>

      <div className="premium-table-shell">
        <table className="premium-table">
          <thead>
            <tr>
              <th>{copy.columns.id}</th>
              <th>{copy.columns.source}</th>
              <th>{copy.columns.client}</th>
              <th>{copy.columns.site}</th>
              <th>{copy.columns.priority}</th>
              <th>{copy.columns.status}</th>
              <th>{copy.columns.engineer}</th>
              <th>{copy.columns.intervention}</th>
              <th>{copy.columns.updated}</th>
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
