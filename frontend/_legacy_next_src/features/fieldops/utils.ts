import type { HealthScore, Priority, SyncStatus, InterventionStatus, SiteStatus, EngineerStatus, EntityStatus } from './types';

export function createId(prefix: string) {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
  }
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function nowIso() {
  return new Date().toISOString();
}

export function formatDate(value?: string | null) {
  if (!value) return 'N/A';
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

export function formatDateTime(value?: string | null) {
  if (!value) return 'N/A';
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export function formatDuration(minutes?: number | null) {
  if (!minutes) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return `${rest}m`;
  if (!rest) return `${hours}h`;
  return `${hours}h ${rest}m`;
}

export function diffMinutes(start?: string | null, end?: string | null) {
  if (!start || !end) return null;
  const diff = new Date(end).getTime() - new Date(start).getTime();
  return Math.max(0, Math.round(diff / 60000));
}

export function createReference() {
  const base = new Date();
  const day = `${base.getFullYear()}${String(base.getMonth() + 1).padStart(2, '0')}${String(base.getDate()).padStart(2, '0')}`;
  const suffix = Math.floor(Math.random() * 900 + 100);
  return `INT-${day}-${suffix}`;
}

export function toneFromHealth(score: HealthScore) {
  if (score === 'green') return 'success';
  if (score === 'orange') return 'warning';
  return 'danger';
}

export function toneFromSync(status: SyncStatus) {
  if (status === 'success') return 'success';
  if (status === 'warning' || status === 'queued') return 'warning';
  return 'danger';
}

export function toneFromPriority(priority: Priority) {
  if (priority === 'critical') return 'danger';
  if (priority === 'high') return 'warning';
  if (priority === 'medium') return 'info';
  return 'neutral';
}

export function toneFromInterventionStatus(status: InterventionStatus) {
  if (status === 'completed') return 'success';
  if (status === 'in_progress') return 'info';
  if (status === 'on_hold') return 'warning';
  if (status === 'cancelled') return 'danger';
  return 'neutral';
}

export function toneFromSiteStatus(status: SiteStatus) {
  if (status === 'operational') return 'success';
  if (status === 'maintenance') return 'warning';
  if (status === 'at-risk') return 'danger';
  return 'neutral';
}

export function toneFromEngineerStatus(status: EngineerStatus) {
  if (status === 'active') return 'success';
  if (status === 'on-leave') return 'warning';
  return 'neutral';
}

export function toneFromEntityStatus(status: EntityStatus) {
  return status === 'active' ? 'success' : 'neutral';
}

export function parseNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function serializeList(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function healthFromMetrics(packetLossPct: number, pingMs: number) {
  if (packetLossPct > 4 || pingMs > 120) return 'red';
  if (packetLossPct > 1 || pingMs > 50) return 'orange';
  return 'green';
}
