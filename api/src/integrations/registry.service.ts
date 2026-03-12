import { Injectable } from '@nestjs/common';
import { JiraConnectorService } from './jira/jira.connector.service';
import { ZendeskConnectorService } from './zendesk/zendesk.connector.service';
import { ServicenowConnectorService } from './servicenow/servicenow.connector.service';
import { FreshserviceConnectorService } from './freshservice/freshservice.connector.service';
import { BaseIntegrationConnector } from './common/base-connector';
import { ExternalPlatform } from './common/types';

@Injectable()
export class IntegrationsRegistryService {
  constructor(
    private readonly zendesk: ZendeskConnectorService,
    private readonly jira: JiraConnectorService,
    private readonly servicenow: ServicenowConnectorService,
    private readonly freshservice: FreshserviceConnectorService,
  ) {}

  listConnectors(): BaseIntegrationConnector[] {
    return [this.zendesk, this.jira, this.servicenow, this.freshservice];
  }

  getConnector(platform: ExternalPlatform): BaseIntegrationConnector {
    const connector = this.listConnectors().find((item) => item.describe().platform === platform);
    if (!connector) {
      throw new Error(`Unknown connector platform: ${platform}`);
    }
    return connector;
  }
}
