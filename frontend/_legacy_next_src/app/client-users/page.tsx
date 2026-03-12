'use client';

import { useEffect, useMemo, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { Guard } from '@/components/Guard';
import { DataTable, Field, Input, PageHeader, Panel, SectionHeading, Select, Textarea } from '@/components/fieldops/ui';
import { useFieldOpsData } from '@/features/fieldops/store';
import type { ClientUser } from '@/features/fieldops/types';
import { serializeList } from '@/features/fieldops/utils';

type ClientUserForm = {
  id: string;
  clientId: string;
  siteId: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  jobTitle: string;
  notes: string;
  recurringIncidents: string;
};

function emptyForm(clientId?: string, siteId?: string): ClientUserForm {
  return {
    id: '',
    clientId: clientId || '',
    siteId: siteId || '',
    fullName: '',
    email: '',
    phone: '',
    department: '',
    jobTitle: '',
    notes: '',
    recurringIncidents: '',
  };
}

export default function ClientUsersPage() {
  const { store, saveClientUser } = useFieldOpsData();
  const [selectedId, setSelectedId] = useState<string | null>(store.clientUsers[0]?.id ?? null);
  const [form, setForm] = useState<ClientUserForm>(emptyForm(store.clients[0]?.id, store.sites[0]?.id));
  const selectedUser = useMemo(() => store.clientUsers.find((item) => item.id === selectedId) || null, [selectedId, store.clientUsers]);
  const filteredSites = useMemo(() => store.sites.filter((site) => site.clientId === form.clientId), [form.clientId, store.sites]);
  const clientMap = new Map(store.clients.map((item) => [item.id, item]));
  const siteMap = new Map(store.sites.map((item) => [item.id, item]));

  useEffect(() => {
    if (!selectedUser) {
      setForm(emptyForm(store.clients[0]?.id, store.sites[0]?.id));
      return;
    }
    setForm({
      id: selectedUser.id,
      clientId: selectedUser.clientId,
      siteId: selectedUser.siteId || '',
      fullName: selectedUser.fullName,
      email: selectedUser.email,
      phone: selectedUser.phone || '',
      department: selectedUser.department || '',
      jobTitle: selectedUser.jobTitle || '',
      notes: selectedUser.notes || '',
      recurringIncidents: selectedUser.recurringIncidents.join(', '),
    });
  }, [selectedUser, store.clients, store.sites]);

  useEffect(() => {
    if (filteredSites.some((site) => site.id === form.siteId)) return;
    setForm((current) => ({ ...current, siteId: filteredSites[0]?.id || '' }));
  }, [filteredSites, form.siteId]);

  return (
    <Guard>
      <AppShell>
        <PageHeader
          eyebrow="Client stakeholders"
          title="Client users"
          description="Track end users, local contacts, recurring incidents, and site-level context."
        />
        <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Panel>
            <SectionHeading title="Stakeholders" />
            <DataTable
              rows={store.clientUsers}
              emptyLabel="No client users configured yet."
              columns={[
                {
                  header: 'User',
                  render: (user) => (
                    <div>
                      <p className="font-medium text-white">{user.fullName}</p>
                      <p className="text-sm text-slate-400">{user.email}</p>
                    </div>
                  ),
                },
                {
                  header: 'Client / site',
                  render: (user) => `${clientMap.get(user.clientId)?.name || 'N/A'} · ${siteMap.get(user.siteId || '')?.name || 'N/A'}`,
                },
                {
                  header: 'Role',
                  render: (user) => `${user.jobTitle || 'N/A'} · ${user.department || 'N/A'}`,
                },
                {
                  header: 'Action',
                  render: (user) => (
                    <button type="button" className="text-sm text-cyan-200" onClick={() => setSelectedId(user.id)}>
                      Edit
                    </button>
                  ),
                },
              ]}
            />
          </Panel>

          <Panel>
            <SectionHeading title={selectedUser ? 'Edit client user' : 'Create client user'} />
            <form
              className="grid gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                saveClientUser({
                  id: form.id || undefined,
                  clientId: form.clientId,
                  siteId: form.siteId || null,
                  fullName: form.fullName,
                  email: form.email,
                  phone: form.phone || null,
                  department: form.department || null,
                  jobTitle: form.jobTitle || null,
                  notes: form.notes || null,
                  recurringIncidents: serializeList(form.recurringIncidents),
                });
                if (!form.id) setForm(emptyForm(store.clients[0]?.id, store.sites[0]?.id));
              }}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Client">
                  <Select value={form.clientId} onChange={(event) => setForm((current) => ({ ...current, clientId: event.target.value }))}>
                    {store.clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Site">
                  <Select value={form.siteId} onChange={(event) => setForm((current) => ({ ...current, siteId: event.target.value }))}>
                    {filteredSites.map((site) => (
                      <option key={site.id} value={site.id}>
                        {site.name}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>
              <Field label="Full name">
                <Input value={form.fullName} onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))} required />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Email">
                  <Input type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} required />
                </Field>
                <Field label="Phone">
                  <Input value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} />
                </Field>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Department">
                  <Input value={form.department} onChange={(event) => setForm((current) => ({ ...current, department: event.target.value }))} />
                </Field>
                <Field label="Job title">
                  <Input value={form.jobTitle} onChange={(event) => setForm((current) => ({ ...current, jobTitle: event.target.value }))} />
                </Field>
              </div>
              <Field label="Recurring incidents">
                <Input value={form.recurringIncidents} onChange={(event) => setForm((current) => ({ ...current, recurringIncidents: event.target.value }))} />
              </Field>
              <Field label="Notes">
                <Textarea value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} />
              </Field>
              <button type="submit" className="btn-primary w-full justify-center">
                {selectedUser ? 'Save client user' : 'Create client user'}
              </button>
            </form>
          </Panel>
        </div>
      </AppShell>
    </Guard>
  );
}
