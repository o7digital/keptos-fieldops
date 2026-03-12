export type EntityStatus = 'active' | 'inactive';
export type SiteStatus = 'operational' | 'maintenance' | 'at-risk' | 'inactive';
export type EngineerStatus = 'active' | 'inactive' | 'on-leave';
export type InterventionType = 'preventive' | 'corrective' | 'emergency' | 'network' | 'audit' | 'user';
export type InterventionStatus = 'todo' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type HealthScore = 'green' | 'orange' | 'red';
export type SyncStatus = 'queued' | 'success' | 'warning' | 'failed';
export type IntegrationPlatform = 'zendesk' | 'jira' | 'servicenow' | 'freshservice';

export type BaseRecord = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
};

export type Profile = BaseRecord & {
  fullName: string;
  email: string;
  role: 'admin' | 'manager' | 'engineer';
  phone?: string | null;
};

export type Client = BaseRecord & {
  name: string;
  status: EntityStatus;
  primaryContact: string;
  primaryEmail?: string | null;
  primaryPhone?: string | null;
  contractType: 'managed-services' | 'project' | 'hybrid' | 'retainer';
  sla: string;
  notes?: string | null;
};

export type ClientSite = BaseRecord & {
  clientId: string;
  name: string;
  address: string;
  localContact: string;
  localContactPhone?: string | null;
  gpsLatitude?: number | null;
  gpsLongitude?: number | null;
  gpsPlaceholder?: string | null;
  status: SiteStatus;
  healthScore: HealthScore;
};

export type Engineer = BaseRecord & {
  fullName: string;
  specialties: string[];
  phone: string;
  email: string;
  status: EngineerStatus;
  region: string;
};

export type ClientUser = BaseRecord & {
  clientId: string;
  siteId?: string | null;
  fullName: string;
  email: string;
  phone?: string | null;
  department?: string | null;
  jobTitle?: string | null;
  notes?: string | null;
  recurringIncidents: string[];
};

export type Intervention = BaseRecord & {
  reference: string;
  clientId: string;
  siteId: string;
  engineerId: string;
  type: InterventionType;
  status: InterventionStatus;
  priority: Priority;
  scheduledStartAt: string;
  scheduledEndAt?: string | null;
  actualStartAt?: string | null;
  actualEndAt?: string | null;
  durationMinutes?: number | null;
  slaTargetAt: string;
  internalComments?: string | null;
  checkInAt?: string | null;
  checkOutAt?: string | null;
  checkInGpsPlaceholder?: string | null;
  checkOutGpsPlaceholder?: string | null;
};

export type InterventionLog = BaseRecord & {
  interventionId: string;
  kind: 'created' | 'check-in' | 'check-out' | 'status-change' | 'comment' | 'sync';
  actor: string;
  message: string;
  gpsPlaceholder?: string | null;
};

export type InterventionReport = BaseRecord & {
  interventionId: string;
  diagnostic: string;
  probableCause: string;
  actionsTaken: string;
  result: string;
  hardware?: string | null;
  software?: string | null;
  impactedUsers?: string | null;
  attachmentIds: string[];
  clientValidation: 'pending' | 'placeholder';
  pdfStatus: 'planned' | 'pending';
};

export type NetworkReport = BaseRecord & {
  siteId: string;
  interventionId?: string | null;
  connectionType: string;
  provider: string;
  perceivedQuality: string;
  downloadMbps: number;
  uploadMbps: number;
  pingMs: number;
  packetLossPct: number;
  technicalRemarks?: string | null;
  healthScore: HealthScore;
};

export type Attachment = BaseRecord & {
  interventionId?: string | null;
  reportId?: string | null;
  name: string;
  fileType: 'photo' | 'document';
  url: string;
};

export type Integration = BaseRecord & {
  platform: IntegrationPlatform;
  name: string;
  status: 'planned' | 'ready' | 'paused';
  scope: string;
  description: string;
};

export type IntegrationAccount = BaseRecord & {
  integrationId: string;
  accountName: string;
  externalWorkspace: string;
  status: 'connected' | 'pending' | 'disconnected';
};

export type ExternalRecord = BaseRecord & {
  platform: IntegrationPlatform;
  localEntityType: 'intervention' | 'client' | 'site' | 'engineer';
  localEntityId: string;
  externalId: string;
  externalKey: string;
  syncStatus: SyncStatus;
  lastSyncAt?: string | null;
  payloadSnapshot: Record<string, unknown>;
};

export type SyncLog = BaseRecord & {
  integrationId?: string | null;
  platform: IntegrationPlatform;
  entityType: string;
  entityId: string;
  syncStatus: SyncStatus;
  direction: 'push' | 'pull';
  message: string;
  executedAt: string;
};

export type InterventionTypeOption = {
  id: string;
  name: string;
  code: InterventionType;
};

export type StatusCatalogItem = {
  id: string;
  entity: 'intervention' | 'site' | 'client' | 'engineer';
  value: string;
  label: string;
};

export type SlaCatalogItem = {
  id: string;
  name: string;
  responseHours: number;
  resolutionHours: number;
  coverage: string;
};

export type GeneralSettings = {
  companyName: string;
  commandCenterName: string;
  supportEmail: string;
  timezone: string;
};

export type FieldOpsStore = {
  profiles: Profile[];
  clients: Client[];
  sites: ClientSite[];
  engineers: Engineer[];
  clientUsers: ClientUser[];
  interventions: Intervention[];
  interventionLogs: InterventionLog[];
  interventionReports: InterventionReport[];
  networkReports: NetworkReport[];
  attachments: Attachment[];
  integrations: Integration[];
  integrationAccounts: IntegrationAccount[];
  externalRecords: ExternalRecord[];
  syncLogs: SyncLog[];
  interventionTypes: InterventionTypeOption[];
  statusCatalog: StatusCatalogItem[];
  slaCatalog: SlaCatalogItem[];
  generalSettings: GeneralSettings;
};
