import { Module } from '@nestjs/common';
import { IntegrationsRegistryService } from './registry.service';
import { ZendeskConnectorService } from './zendesk/zendesk.connector.service';
import { JiraConnectorService } from './jira/jira.connector.service';
import { ServicenowConnectorService } from './servicenow/servicenow.connector.service';
import { FreshserviceConnectorService } from './freshservice/freshservice.connector.service';

@Module({
  providers: [
    IntegrationsRegistryService,
    ZendeskConnectorService,
    JiraConnectorService,
    ServicenowConnectorService,
    FreshserviceConnectorService,
  ],
  exports: [IntegrationsRegistryService],
})
export class IntegrationsModule {}
