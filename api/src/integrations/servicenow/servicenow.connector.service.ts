import { Injectable } from '@nestjs/common';
import { BaseIntegrationConnector } from '../common/base-connector';

@Injectable()
export class ServicenowConnectorService extends BaseIntegrationConnector {
  describe() {
    return {
      platform: 'servicenow' as const,
      displayName: 'ServiceNow',
      health: 'planned' as const,
      capabilities: ['incident-link', 'cmdb-context', 'change-bridge'],
    };
  }
}
