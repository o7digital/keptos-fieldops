'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

type Tone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={cx('panel', className)}>{children}</section>;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="page-header">
      <div className="page-header-copy">
        <p className="page-header-eyebrow">{eyebrow}</p>
        <h1 className="page-header-title">{title}</h1>
        <p className="page-header-description">{description}</p>
      </div>
      {actions ? <div className="page-header-actions">{actions}</div> : null}
    </div>
  );
}

const toneLabels: Record<Tone, string> = {
  success: 'Stable',
  warning: 'Attention',
  danger: 'Critical',
  info: 'Live',
  neutral: 'Baseline',
};

export function KpiCard({
  label,
  value,
  hint,
  tone = 'neutral',
}: {
  label: string;
  value: string | number;
  hint: string;
  tone?: Tone;
}) {
  return (
    <Panel className={cx('kpi-card', `kpi-card-${tone}`)}>
      <div className="kpi-topline">
        <div className="kpi-label-row">
          <span className={cx('kpi-signal', `kpi-signal-${tone}`)} />
          <p className="kpi-label">{label}</p>
        </div>
        <span className={cx('status-badge', `status-${tone}`)}>{toneLabels[tone]}</span>
      </div>
      <div className="kpi-value-row">
        <p className="kpi-value">{value}</p>
        <div className="kpi-glow-grid" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
      <p className="kpi-hint">{hint}</p>
    </Panel>
  );
}

export function StatusBadge({ children, tone = 'neutral' }: { children: ReactNode; tone?: Tone }) {
  return <span className={cx('status-badge', `status-${tone}`)}>{children}</span>;
}

export function SectionHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <h2 className="section-heading-title">{title}</h2>
        {description ? <p className="section-heading-description">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="field-wrap">
      <span className="field-label">{label}</span>
      {children}
      {hint ? <span className="field-hint">{hint}</span> : null}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cx('field-control', props.className)} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cx('field-control', props.className)} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cx('field-control min-h-[120px] resize-y', props.className)} />;
}

export function DataTable<T>({
  columns,
  rows,
  emptyLabel,
}: {
  columns: Array<{ header: string; render: (row: T) => ReactNode; className?: string }>;
  rows: T[];
  emptyLabel: string;
}) {
  return (
    <div className="table-shell">
      <table className="w-full">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.header} className={cx('table-head', column.className)}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-sm text-slate-400">
                {emptyLabel}
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={index} className="table-row">
                {columns.map((column) => (
                  <td key={column.header} className={cx('table-cell', column.className)}>
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <Panel className="text-center">
      <p className="text-lg font-semibold text-white">{title}</p>
      <p className="mx-auto mt-2 max-w-lg text-sm text-slate-400">{description}</p>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </Panel>
  );
}

export function KeyValueGrid({ items }: { items: Array<{ label: string; value: ReactNode }> }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl border border-white/6 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{item.label}</p>
          <div className="mt-2 text-sm text-slate-200">{item.value}</div>
        </div>
      ))}
    </div>
  );
}

export function Timeline({
  items,
}: {
  items: Array<{ id: string; title: string; description: string; meta: string }>;
}) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="timeline-item">
          <div className="timeline-dot" />
          <div>
            <p className="text-sm font-semibold text-white">{item.title}</p>
            <p className="mt-1 text-sm text-slate-300">{item.description}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-slate-500">{item.meta}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function InlineLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-sm font-medium text-cyan-200 transition hover:text-cyan-100">
      {label}
    </Link>
  );
}
