'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { Guard } from '@/components/Guard';
import { DataTable, Field, Input, PageHeader, Panel, SectionHeading, Select, StatusBadge } from '@/components/fieldops/ui';
import { engineerStatusOptions, labelMaps } from '@/features/fieldops/options';
import { useFieldOpsData } from '@/features/fieldops/store';
import type { Engineer } from '@/features/fieldops/types';
import { serializeList, toneFromEngineerStatus } from '@/features/fieldops/utils';

type EngineerForm = {
  id: string;
  fullName: string;
  specialties: string;
  phone: string;
  email: string;
  status: Engineer['status'];
  region: string;
};

function emptyForm(): EngineerForm {
  return {
    id: '',
    fullName: '',
    specialties: '',
    phone: '',
    email: '',
    status: 'active' as const,
    region: '',
  };
}

export default function EngineersPage() {
  const { store, saveEngineer } = useFieldOpsData();
  const [selectedId, setSelectedId] = useState<string | null>(store.engineers[0]?.id ?? null);
  const [form, setForm] = useState<EngineerForm>(emptyForm());
  const selectedEngineer = useMemo(() => store.engineers.find((item) => item.id === selectedId) || null, [selectedId, store.engineers]);

  useEffect(() => {
    if (!selectedEngineer) {
      setForm(emptyForm());
      return;
    }
    setForm({
      id: selectedEngineer.id,
      fullName: selectedEngineer.fullName,
      specialties: selectedEngineer.specialties.join(', '),
      phone: selectedEngineer.phone,
      email: selectedEngineer.email,
      status: selectedEngineer.status,
      region: selectedEngineer.region,
    });
  }, [selectedEngineer]);

  return (
    <Guard>
      <AppShell>
        <PageHeader
          eyebrow="Field force"
          title="Engineers"
          description="Engineer operations hub for coverage, specialties, regions, and assigned intervention load."
          actions={
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setSelectedId(null);
                setForm(emptyForm());
              }}
            >
              New engineer
            </button>
          }
        />

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <Panel>
            <SectionHeading title="Field team" />
            <DataTable
              rows={store.engineers}
              emptyLabel="No engineers configured yet."
              columns={[
                {
                  header: 'Engineer',
                  render: (engineer) => (
                    <div>
                      <p className="font-medium text-white">{engineer.fullName}</p>
                      <p className="text-sm text-slate-400">{engineer.email}</p>
                    </div>
                  ),
                },
                {
                  header: 'Specialties',
                  render: (engineer) => engineer.specialties.join(' · '),
                },
                {
                  header: 'Region',
                  render: (engineer) => engineer.region,
                },
                {
                  header: 'Status',
                  render: (engineer) => (
                    <StatusBadge tone={toneFromEngineerStatus(engineer.status)}>
                      {labelMaps.engineerStatus[engineer.status]}
                    </StatusBadge>
                  ),
                },
                {
                  header: 'Action',
                  render: (engineer) => (
                    <div className="flex gap-3">
                      <button type="button" className="text-sm text-cyan-200" onClick={() => setSelectedId(engineer.id)}>
                        Edit
                      </button>
                      <Link href={`/engineers/${engineer.id}`} className="text-sm text-cyan-200">
                        Detail
                      </Link>
                    </div>
                  ),
                },
              ]}
            />
          </Panel>

          <Panel>
            <SectionHeading title={selectedEngineer ? 'Edit engineer' : 'Create engineer'} />
            <form
              className="grid gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                saveEngineer({
                  id: form.id || undefined,
                  fullName: form.fullName,
                  specialties: serializeList(form.specialties),
                  phone: form.phone,
                  email: form.email,
                  status: form.status,
                  region: form.region,
                });
                if (!form.id) setForm(emptyForm());
              }}
            >
              <Field label="Full name">
                <Input value={form.fullName} onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))} required />
              </Field>
              <Field label="Specialties" hint="Comma-separated values.">
                <Input value={form.specialties} onChange={(event) => setForm((current) => ({ ...current, specialties: event.target.value }))} placeholder="Network, Wi-Fi, Audit" />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Phone">
                  <Input value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} required />
                </Field>
                <Field label="Email">
                  <Input type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} required />
                </Field>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Status">
                  <Select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as typeof form.status }))}>
                    {engineerStatusOptions.map((value) => (
                      <option key={value} value={value}>
                        {labelMaps.engineerStatus[value]}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Region">
                  <Input value={form.region} onChange={(event) => setForm((current) => ({ ...current, region: event.target.value }))} required />
                </Field>
              </div>
              <button type="submit" className="btn-primary w-full justify-center">
                {selectedEngineer ? 'Save engineer' : 'Create engineer'}
              </button>
            </form>
          </Panel>
        </div>
      </AppShell>
    </Guard>
  );
}
