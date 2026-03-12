export type ExternalPlatform = 'zendesk' | 'jira' | 'servicenow' | 'freshservice';

export type ConnectorHealthStatus = 'ready' | 'planned' | 'paused';

export type ConnectorPushPayload = {
  localEntityType: string;
  localEntityId: string;
  externalKey?: string | null;
  payload: Record<string, unknown>;
};

export type ConnectorPullRequest = {
  externalId: string;
  externalKey?: string | null;
};

export type ConnectorSyncResult = {
  platform: ExternalPlatform;
  status: 'queued' | 'success' | 'warning' | 'failed';
  message: string;
  externalId?: string | null;
  externalKey?: string | null;
  payloadSnapshot?: Record<string, unknown>;
};

export type ConnectorDescriptor = {
  platform: ExternalPlatform;
  displayName: string;
  health: ConnectorHealthStatus;
  capabilities: string[];
};
