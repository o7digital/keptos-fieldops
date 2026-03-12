import { Injectable } from '@nestjs/common';
import { BaseIntegrationConnector } from '../common/base-connector';

@Injectable()
export class JiraConnectorService extends BaseIntegrationConnector {
  describe() {
    return {
      platform: 'jira' as const,
      displayName: 'Jira Service Management',
      health: 'ready' as const,
      capabilities: ['request-link', 'status-sync', 'sla-mapping'],
    };
  }
}
