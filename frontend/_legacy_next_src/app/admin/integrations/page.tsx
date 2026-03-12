'use client';

import { useMemo, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { Guard } from '@/components/Guard';
import { DataTable, Field, Input, PageHeader, Panel, SectionHeading, Select, StatusBadge, Textarea } from '@/components/fieldops/ui';
import { integrationAccountStatusOptions, integrationStatusOptions, labelMaps, platformOptions } from '@/features/fieldops/options';
import { useFieldOpsData } from '@/features/fieldops/store';
import type { Integration, IntegrationAccount } from '@/features/fieldops/types';
import { toneFromSync } from '@/features/fieldops/utils';

type IntegrationForm = {
  id: string;
  platform: Integration['platform'];
  name: string;
  status: Integration['status'];
  scope: string;
  description: string;
};

type IntegrationAccountForm = {
  id: string;
  integrationId: string;
  accountName: string;
  externalWorkspace: string;
  status: IntegrationAccount['status'];
};

function emptyIntegrationForm(): IntegrationForm {
  return {
    id: '',
    platform: 'zendesk' as const,
    name: '',
    status: 'planned' as const,
    scope: '',
    description: '',
  };
}

function emptyAccountForm(integrationId?: string): IntegrationAccountForm {
  return {
    id: '',
    integrationId: integrationId || '',
    accountName: '',
    externalWorkspace: '',
    status: 'pending' as const,
  };
}

export default function IntegrationsPage() {
  const { store, saveIntegration, saveIntegrationAccount } = useFieldOpsData();
  const [selectedIntegrationId, setSelectedIntegrationId] = useState<string | null>(store.integrations[0]?.id ?? null);
  const [integrationForm, setIntegrationForm] = useState<IntegrationForm>(emptyIntegrationForm());
  const [accountForm, setAccountForm] = useState<IntegrationAccountForm>(emptyAccountForm(store.integrations[0]?.id));
  const selectedIntegration = useMemo(
    () => store.integrations.find((item) => item.id === selectedIntegrationId) || null,
    [selectedIntegrationId, store.integrations],
  );

  return (
    <Guard>
      <AppShell>
        <PageHeader
          eyebrow="Multi-ITSM architecture"
          title="Integrations"
          description="Connector catalog, linked accounts, and external record mapping foundation for Zendesk, JSM, ServiceNow, and Freshservice."
        />

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <Panel>
            <SectionHeading title="Connector catalog" />
            <DataTable
              rows={store.integrations}
              emptyLabel="No integration configured."
              columns={[
                { header: 'Platform', render: (integration) => labelMaps.platform[integration.platform] },
                { header: 'Scope', render: (integration) => integration.scope },
                { header: 'Status', render: (integration) => <StatusBadge tone={toneFromSync(integration.status === 'ready' ? 'success' : integration.status === 'paused' ? 'warning' : 'queued')}>{labelMaps.integrationStatus[integration.status]}</StatusBadge> },
                {
                  header: 'Action',
                  render: (integration) => (
                    <button
                      type="button"
                      className="text-sm text-cyan-200"
                      onClick={() => {
                        setSelectedIntegrationId(integration.id);
                        setIntegrationForm({
                          id: integration.id,
                          platform: integration.platform,
                          name: integration.name,
                          status: integration.status,
                          scope: integration.scope,
                          description: integration.description,
                        });
                        setAccountForm((current) => ({ ...current, integrationId: integration.id }));
                      }}
                    >
                      Edit
                    </button>
                  ),
                },
              ]}
            />
          </Panel>

          <Panel>
            <SectionHeading title={selectedIntegration ? 'Edit connector' : 'Create connector'} />
            <form
              className="grid gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                saveIntegration({
                  id: integrationForm.id || undefined,
                  platform: integrationForm.platform,
                  name: integrationForm.name,
                  status: integrationForm.status,
                  scope: integrationForm.scope,
                  description: integrationForm.description,
                });
                if (!integrationForm.id) setIntegrationForm(emptyIntegrationForm());
              }}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Platform">
                  <Select value={integrationForm.platform} onChange={(event) => setIntegrationForm((current) => ({ ...current, platform: event.target.value as typeof current.platform }))}>
                    {platformOptions.map((platform) => (
                      <option key={platform} value={platform}>
                        {labelMaps.platform[platform]}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Status">
                  <Select value={integrationForm.status} onChange={(event) => setIntegrationForm((current) => ({ ...current, status: event.target.value as typeof current.status }))}>
                    {integrationStatusOptions.map((status) => (
                      <option key={status} value={status}>
                        {labelMaps.integrationStatus[status]}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>
              <Field label="Connector name">
                <Input value={integrationForm.name} onChange={(event) => setIntegrationForm((current) => ({ ...current, name: event.target.value }))} required />
              </Field>
              <Field label="Scope">
                <Input value={integrationForm.scope} onChange={(event) => setIntegrationForm((current) => ({ ...current, scope: event.target.value }))} required />
              </Field>
              <Field label="Description">
                <Textarea value={integrationForm.description} onChange={(event) => setIntegrationForm((current) => ({ ...current, description: event.target.value }))} />
              </Field>
              <button type="submit" className="btn-primary w-full justify-center">
                {selectedIntegration ? 'Save connector' : 'Create connector'}
              </button>
            </form>
          </Panel>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <Panel>
            <SectionHeading title="Integration accounts" />
            <DataTable
              rows={store.integrationAccounts}
              emptyLabel="No connector account configured."
              columns={[
                {
                  header: 'Account',
                  render: (account) => (
                    <div>
                      <p className="font-medium text-white">{account.accountName}</p>
                      <p className="text-sm text-slate-400">{store.integrations.find((item) => item.id === account.integrationId)?.name}</p>
                    </div>
                  ),
                },
                { header: 'Workspace', render: (account) => account.externalWorkspace },
                { header: 'Status', render: (account) => account.status },
              ]}
            />
          </Panel>
          <Panel>
            <SectionHeading title="Create connector account" />
            <form
              className="grid gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                saveIntegrationAccount({
                  id: accountForm.id || undefined,
                  integrationId: accountForm.integrationId,
                  accountName: accountForm.accountName,
                  externalWorkspace: accountForm.externalWorkspace,
                  status: accountForm.status,
                });
                setAccountForm(emptyAccountForm(selectedIntegrationId || store.integrations[0]?.id));
              }}
            >
              <Field label="Connector">
                <Select value={accountForm.integrationId} onChange={(event) => setAccountForm((current) => ({ ...current, integrationId: event.target.value }))}>
                  {store.integrations.map((integration) => (
                    <option key={integration.id} value={integration.id}>
                      {integration.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Account name">
                <Input value={accountForm.accountName} onChange={(event) => setAccountForm((current) => ({ ...current, accountName: event.target.value }))} required />
              </Field>
              <Field label="External workspace">
                <Input value={accountForm.externalWorkspace} onChange={(event) => setAccountForm((current) => ({ ...current, externalWorkspace: event.target.value }))} required />
              </Field>
              <Field label="Status">
                <Select value={accountForm.status} onChange={(event) => setAccountForm((current) => ({ ...current, status: event.target.value as typeof current.status }))}>
                  {integrationAccountStatusOptions.map((status) => (
                    <option key={status} value={status}>
                      {labelMaps.integrationAccountStatus[status]}
                    </option>
                  ))}
                </Select>
              </Field>
              <button type="submit" className="btn-primary w-full justify-center">
                Save connector account
              </button>
            </form>
          </Panel>
        </div>

        <div className="mt-8">
          <Panel>
            <SectionHeading title="External records" description="Every local intervention can be linked to an external ticket later without changing the local domain model." />
            <DataTable
              rows={store.externalRecords}
              emptyLabel="No external records stored."
              columns={[
                { header: 'Platform', render: (record) => labelMaps.platform[record.platform] },
                { header: 'Entity', render: (record) => `${record.localEntityType} · ${record.localEntityId}` },
                { header: 'External ref', render: (record) => `${record.externalKey} / ${record.externalId}` },
                { header: 'Sync status', render: (record) => <StatusBadge tone={toneFromSync(record.syncStatus)}>{labelMaps.syncStatus[record.syncStatus]}</StatusBadge> },
              ]}
            />
          </Panel>
        </div>
      </AppShell>
    </Guard>
  );
}
