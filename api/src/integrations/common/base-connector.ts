import { ConnectorDescriptor, ConnectorPullRequest, ConnectorPushPayload, ConnectorSyncResult } from './types';

export abstract class BaseIntegrationConnector {
  abstract describe(): ConnectorDescriptor;

  async healthcheck(): Promise<ConnectorDescriptor> {
    return this.describe();
  }

  async pushRecord(payload: ConnectorPushPayload): Promise<ConnectorSyncResult> {
    return {
      platform: this.describe().platform,
      status: 'queued',
      message: `${this.describe().displayName} connector shell received a push request.`,
      externalKey: payload.externalKey || null,
      payloadSnapshot: payload.payload,
    };
  }

  async pullRecord(request: ConnectorPullRequest): Promise<ConnectorSyncResult> {
    return {
      platform: this.describe().platform,
      status: 'queued',
      message: `${this.describe().displayName} connector shell received a pull request.`,
      externalId: request.externalId,
      externalKey: request.externalKey || null,
    };
  }
}
