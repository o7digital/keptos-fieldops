import { Injectable } from '@nestjs/common';
import { BaseIntegrationConnector } from '../common/base-connector';

@Injectable()
export class ZendeskConnectorService extends BaseIntegrationConnector {
  describe() {
    return {
      platform: 'zendesk' as const,
      displayName: 'Zendesk Support',
      health: 'planned' as const,
      capabilities: ['ticket-link', 'status-sync', 'comment-bridge'],
    };
  }
}
