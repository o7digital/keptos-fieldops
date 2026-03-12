import type {
  Client,
  EngineerStatus,
  EntityStatus,
  HealthScore,
  Integration,
  IntegrationAccount,
  IntegrationPlatform,
  InterventionStatus,
  InterventionType,
  Priority,
  SiteStatus,
  SyncStatus,
} from './types';

export const entityStatusOptions: EntityStatus[] = ['active', 'inactive'];
export const siteStatusOptions: SiteStatus[] = ['operational', 'maintenance', 'at-risk', 'inactive'];
export const healthScoreOptions: HealthScore[] = ['green', 'orange', 'red'];
export const engineerStatusOptions: EngineerStatus[] = ['active', 'inactive', 'on-leave'];
export const interventionStatusOptions: InterventionStatus[] = ['todo', 'in_progress', 'on_hold', 'completed', 'cancelled'];
export const priorityOptions: Priority[] = ['low', 'medium', 'high', 'critical'];
export const interventionTypeOptions: InterventionType[] = ['preventive', 'corrective', 'emergency', 'network', 'audit', 'user'];
export const contractTypeOptions: Client['contractType'][] = ['managed-services', 'project', 'hybrid', 'retainer'];
export const platformOptions: IntegrationPlatform[] = ['zendesk', 'jira', 'servicenow', 'freshservice'];
export const integrationStatusOptions: Integration['status'][] = ['planned', 'ready', 'paused'];
export const integrationAccountStatusOptions: IntegrationAccount['status'][] = ['connected', 'pending', 'disconnected'];
export const syncStatusOptions: SyncStatus[] = ['queued', 'success', 'warning', 'failed'];

export const labelMaps = {
  entityStatus: {
    active: 'Active',
    inactive: 'Inactive',
  },
  siteStatus: {
    operational: 'Operational',
    maintenance: 'Maintenance',
    'at-risk': 'At risk',
    inactive: 'Inactive',
  },
  engineerStatus: {
    active: 'Active',
    inactive: 'Inactive',
    'on-leave': 'On leave',
  },
  contractType: {
    'managed-services': 'Managed services',
    project: 'Project',
    hybrid: 'Hybrid',
    retainer: 'Retainer',
  },
  interventionType: {
    preventive: 'Preventive',
    corrective: 'Corrective',
    emergency: 'Emergency',
    network: 'Network',
    audit: 'Audit',
    user: 'User',
  },
  interventionStatus: {
    todo: 'To do',
    in_progress: 'In progress',
    on_hold: 'On hold',
    completed: 'Completed',
    cancelled: 'Cancelled',
  },
  priority: {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical',
  },
  healthScore: {
    green: 'Green',
    orange: 'Orange',
    red: 'Red',
  },
  integrationStatus: {
    planned: 'Planned',
    ready: 'Ready',
    paused: 'Paused',
  },
  integrationAccountStatus: {
    connected: 'Connected',
    pending: 'Pending',
    disconnected: 'Disconnected',
  },
  platform: {
    zendesk: 'Zendesk',
    jira: 'Jira Service Management',
    servicenow: 'ServiceNow',
    freshservice: 'Freshservice',
  },
  syncStatus: {
    queued: 'Queued',
    success: 'Success',
    warning: 'Warning',
    failed: 'Failed',
  },
} as const;
