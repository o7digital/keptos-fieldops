'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { Guard } from '@/components/Guard';
import { DataTable, Field, Input, PageHeader, Panel, SectionHeading, Select, StatusBadge, Textarea } from '@/components/fieldops/ui';
import { contractTypeOptions, entityStatusOptions, labelMaps } from '@/features/fieldops/options';
import { useFieldOpsData } from '@/features/fieldops/store';
import type { Client } from '@/features/fieldops/types';
import { toneFromEntityStatus } from '@/features/fieldops/utils';

type ClientForm = {
  id: string;
  name: string;
  status: Client['status'];
  primaryContact: string;
  primaryEmail: string;
  primaryPhone: string;
  contractType: Client['contractType'];
  sla: string;
  notes: string;
};

function emptyForm(): ClientForm {
  return {
    id: '',
    name: '',
    status: 'active' as const,
    primaryContact: '',
    primaryEmail: '',
    primaryPhone: '',
    contractType: 'managed-services' as const,
    sla: '',
    notes: '',
  };
}

export default function ClientsPage() {
  const { store, saveClient } = useFieldOpsData();
  const [selectedId, setSelectedId] = useState<string | null>(store.clients[0]?.id ?? null);
  const [form, setForm] = useState<ClientForm>(emptyForm());

  const selectedClient = useMemo(
    () => store.clients.find((client) => client.id === selectedId) || null,
    [selectedId, store.clients],
  );

  useEffect(() => {
    if (!selectedClient) {
      setForm(emptyForm());
      return;
    }
    setForm({
      id: selectedClient.id,
      name: selectedClient.name,
      status: selectedClient.status,
      primaryContact: selectedClient.primaryContact,
      primaryEmail: selectedClient.primaryEmail || '',
      primaryPhone: selectedClient.primaryPhone || '',
      contractType: selectedClient.contractType,
      sla: selectedClient.sla,
      notes: selectedClient.notes || '',
    });
  }, [selectedClient]);

  const activeCount = store.clients.filter((client) => client.status === 'active').length;

  return (
    <Guard>
      <AppShell>
        <PageHeader
          eyebrow="Client command"
          title="Clients"
          description="Manage contracts, primary contacts, SLA posture, and internal notes without dragging the product toward a generic ITSM clone."
          actions={
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setSelectedId(null);
                setForm(emptyForm());
              }}
            >
              New client
            </button>
          }
        />

        <div className="grid gap-4 md:grid-cols-3">
          <Panel>
            <p className="text-sm text-slate-400">Active clients</p>
            <p className="mt-3 text-3xl font-semibold text-white">{activeCount}</p>
          </Panel>
          <Panel>
            <p className="text-sm text-slate-400">Managed services contracts</p>
            <p className="mt-3 text-3xl font-semibold text-white">
              {store.clients.filter((client) => client.contractType === 'managed-services').length}
            </p>
          </Panel>
          <Panel>
            <p className="text-sm text-slate-400">Gold SLA coverage</p>
            <p className="mt-3 text-3xl font-semibold text-white">
              {store.clients.filter((client) => client.sla.toLowerCase().includes('gold')).length}
            </p>
          </Panel>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <Panel>
            <SectionHeading title="Client portfolio" description="Premium account view with drill-down on each customer." />
            <DataTable
              rows={store.clients}
              emptyLabel="No clients configured yet."
              columns={[
                {
                  header: 'Client',
                  render: (client) => (
                    <div>
                      <p className="font-medium text-white">{client.name}</p>
                      <p className="text-sm text-slate-400">{client.primaryContact}</p>
                    </div>
                  ),
                },
                {
                  header: 'Contract',
                  render: (client) => labelMaps.contractType[client.contractType],
                },
                {
                  header: 'SLA',
                  render: (client) => client.sla,
                },
                {
                  header: 'Status',
                  render: (client) => (
                    <StatusBadge tone={toneFromEntityStatus(client.status)}>
                      {labelMaps.entityStatus[client.status]}
                    </StatusBadge>
                  ),
                },
                {
                  header: 'Action',
                  render: (client) => (
                    <div className="flex flex-wrap gap-3">
                      <button type="button" className="text-sm text-cyan-200" onClick={() => setSelectedId(client.id)}>
                        Edit
                      </button>
                      <Link href={`/clients/${client.id}`} className="text-sm text-cyan-200">
                        Detail
                      </Link>
                    </div>
                  ),
                },
              ]}
            />
          </Panel>

          <Panel>
            <SectionHeading
              title={selectedClient ? 'Edit client' : 'Create client'}
              description="Reusable CRUD layer ready to swap to Supabase mutations later."
            />
            <form
              className="grid gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                saveClient({
                  id: form.id || undefined,
                  name: form.name,
                  status: form.status,
                  primaryContact: form.primaryContact,
                  primaryEmail: form.primaryEmail || null,
                  primaryPhone: form.primaryPhone || null,
                  contractType: form.contractType,
                  sla: form.sla,
                  notes: form.notes || null,
                });
                if (!form.id) setForm(emptyForm());
              }}
            >
              <Field label="Client name">
                <Input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} required />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Status">
                  <Select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as typeof form.status }))}>
                    {entityStatusOptions.map((value) => (
                      <option key={value} value={value}>
                        {labelMaps.entityStatus[value]}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Contract type">
                  <Select value={form.contractType} onChange={(event) => setForm((current) => ({ ...current, contractType: event.target.value as typeof form.contractType }))}>
                    {contractTypeOptions.map((value) => (
                      <option key={value} value={value}>
                        {labelMaps.contractType[value]}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>
              <Field label="Primary contact">
                <Input value={form.primaryContact} onChange={(event) => setForm((current) => ({ ...current, primaryContact: event.target.value }))} required />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Primary email">
                  <Input type="email" value={form.primaryEmail} onChange={(event) => setForm((current) => ({ ...current, primaryEmail: event.target.value }))} />
                </Field>
                <Field label="Primary phone">
                  <Input value={form.primaryPhone} onChange={(event) => setForm((current) => ({ ...current, primaryPhone: event.target.value }))} />
                </Field>
              </div>
              <Field label="SLA">
                <Input value={form.sla} onChange={(event) => setForm((current) => ({ ...current, sla: event.target.value }))} placeholder="Gold 4h / 8h" required />
              </Field>
              <Field label="Internal notes">
                <Textarea value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} />
              </Field>
              <button type="submit" className="btn-primary w-full justify-center">
                {selectedClient ? 'Save client' : 'Create client'}
              </button>
            </form>
          </Panel>
        </div>
      </AppShell>
    </Guard>
  );
}
