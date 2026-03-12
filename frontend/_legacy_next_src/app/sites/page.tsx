'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { Guard } from '@/components/Guard';
import { DataTable, Field, Input, PageHeader, Panel, SectionHeading, Select, StatusBadge } from '@/components/fieldops/ui';
import { healthScoreOptions, labelMaps, siteStatusOptions } from '@/features/fieldops/options';
import { useFieldOpsData } from '@/features/fieldops/store';
import type { ClientSite } from '@/features/fieldops/types';
import { toneFromHealth, toneFromSiteStatus } from '@/features/fieldops/utils';

type SiteForm = {
  id: string;
  clientId: string;
  name: string;
  address: string;
  localContact: string;
  localContactPhone: string;
  gpsLatitude: string;
  gpsLongitude: string;
  gpsPlaceholder: string;
  status: ClientSite['status'];
  healthScore: ClientSite['healthScore'];
};

function emptyForm(clientId?: string): SiteForm {
  return {
    id: '',
    clientId: clientId || '',
    name: '',
    address: '',
    localContact: '',
    localContactPhone: '',
    gpsLatitude: '',
    gpsLongitude: '',
    gpsPlaceholder: '',
    status: 'operational' as const,
    healthScore: 'green' as const,
  };
}

export default function SitesPage() {
  const { store, saveSite } = useFieldOpsData();
  const [selectedId, setSelectedId] = useState<string | null>(store.sites[0]?.id ?? null);
  const [form, setForm] = useState<SiteForm>(emptyForm(store.clients[0]?.id));
  const selectedSite = useMemo(() => store.sites.find((site) => site.id === selectedId) || null, [selectedId, store.sites]);
  const clientMap = useMemo(() => new Map(store.clients.map((client) => [client.id, client])), [store.clients]);

  useEffect(() => {
    if (!selectedSite) {
      setForm(emptyForm(store.clients[0]?.id));
      return;
    }
    setForm({
      id: selectedSite.id,
      clientId: selectedSite.clientId,
      name: selectedSite.name,
      address: selectedSite.address,
      localContact: selectedSite.localContact,
      localContactPhone: selectedSite.localContactPhone || '',
      gpsLatitude: selectedSite.gpsLatitude ? String(selectedSite.gpsLatitude) : '',
      gpsLongitude: selectedSite.gpsLongitude ? String(selectedSite.gpsLongitude) : '',
      gpsPlaceholder: selectedSite.gpsPlaceholder || '',
      status: selectedSite.status,
      healthScore: selectedSite.healthScore,
    });
  }, [selectedSite, store.clients]);

  return (
    <Guard>
      <AppShell>
        <PageHeader
          eyebrow="Site operations"
          title="Client sites"
          description="Track every supported location with address, local contact, operational health, and GPS placeholders for the future mobile layer."
          actions={
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setSelectedId(null);
                setForm(emptyForm(store.clients[0]?.id));
              }}
            >
              New site
            </button>
          }
        />

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <Panel>
            <SectionHeading title="Site portfolio" />
            <DataTable
              rows={store.sites}
              emptyLabel="No sites configured yet."
              columns={[
                {
                  header: 'Site',
                  render: (site) => (
                    <div>
                      <p className="font-medium text-white">{site.name}</p>
                      <p className="text-sm text-slate-400">{clientMap.get(site.clientId)?.name}</p>
                    </div>
                  ),
                },
                {
                  header: 'Address',
                  render: (site) => site.address,
                },
                {
                  header: 'Health',
                  render: (site) => <StatusBadge tone={toneFromHealth(site.healthScore)}>{labelMaps.healthScore[site.healthScore]}</StatusBadge>,
                },
                {
                  header: 'Status',
                  render: (site) => <StatusBadge tone={toneFromSiteStatus(site.status)}>{labelMaps.siteStatus[site.status]}</StatusBadge>,
                },
                {
                  header: 'Action',
                  render: (site) => (
                    <div className="flex gap-3">
                      <button type="button" className="text-sm text-cyan-200" onClick={() => setSelectedId(site.id)}>
                        Edit
                      </button>
                      <Link href={`/sites/${site.id}`} className="text-sm text-cyan-200">
                        Detail
                      </Link>
                    </div>
                  ),
                },
              ]}
            />
          </Panel>

          <Panel>
            <SectionHeading title={selectedSite ? 'Edit site' : 'Create site'} />
            <form
              className="grid gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                saveSite({
                  id: form.id || undefined,
                  clientId: form.clientId,
                  name: form.name,
                  address: form.address,
                  localContact: form.localContact,
                  localContactPhone: form.localContactPhone || null,
                  gpsLatitude: form.gpsLatitude ? Number(form.gpsLatitude) : null,
                  gpsLongitude: form.gpsLongitude ? Number(form.gpsLongitude) : null,
                  gpsPlaceholder: form.gpsPlaceholder || null,
                  status: form.status,
                  healthScore: form.healthScore,
                });
                if (!form.id) setForm(emptyForm(store.clients[0]?.id));
              }}
            >
              <Field label="Client">
                <Select value={form.clientId} onChange={(event) => setForm((current) => ({ ...current, clientId: event.target.value }))}>
                  {store.clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Site name">
                <Input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} required />
              </Field>
              <Field label="Address">
                <Input value={form.address} onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))} required />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Local contact">
                  <Input value={form.localContact} onChange={(event) => setForm((current) => ({ ...current, localContact: event.target.value }))} required />
                </Field>
                <Field label="Local phone">
                  <Input value={form.localContactPhone} onChange={(event) => setForm((current) => ({ ...current, localContactPhone: event.target.value }))} />
                </Field>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Latitude">
                  <Input value={form.gpsLatitude} onChange={(event) => setForm((current) => ({ ...current, gpsLatitude: event.target.value }))} />
                </Field>
                <Field label="Longitude">
                  <Input value={form.gpsLongitude} onChange={(event) => setForm((current) => ({ ...current, gpsLongitude: event.target.value }))} />
                </Field>
              </div>
              <Field label="GPS placeholder">
                <Input value={form.gpsPlaceholder} onChange={(event) => setForm((current) => ({ ...current, gpsPlaceholder: event.target.value }))} />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Status">
                  <Select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as typeof form.status }))}>
                    {siteStatusOptions.map((value) => (
                      <option key={value} value={value}>
                        {labelMaps.siteStatus[value]}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Health score">
                  <Select value={form.healthScore} onChange={(event) => setForm((current) => ({ ...current, healthScore: event.target.value as typeof form.healthScore }))}>
                    {healthScoreOptions.map((value) => (
                      <option key={value} value={value}>
                        {labelMaps.healthScore[value]}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>
              <button type="submit" className="btn-primary w-full justify-center">
                {selectedSite ? 'Save site' : 'Create site'}
              </button>
            </form>
          </Panel>
        </div>
      </AppShell>
    </Guard>
  );
}
