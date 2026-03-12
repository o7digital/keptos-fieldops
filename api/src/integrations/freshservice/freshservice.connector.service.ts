import { Injectable } from '@nestjs/common';
import { BaseIntegrationConnector } from '../common/base-connector';

@Injectable()
export class FreshserviceConnectorService extends BaseIntegrationConnector {
  describe() {
    return {
      platform: 'freshservice' as const,
      displayName: 'Freshservice',
      health: 'paused' as const,
      capabilities: ['ticket-link', 'priority-sync', 'service-catalog-context'],
    };
  }
}
