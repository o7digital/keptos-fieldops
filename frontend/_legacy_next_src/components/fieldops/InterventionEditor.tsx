'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Client, ClientSite, Engineer, Intervention } from '@/features/fieldops/types';
import { Field, Input, Select, Textarea } from './ui';
import { interventionStatusOptions, interventionTypeOptions, labelMaps, priorityOptions } from '@/features/fieldops/options';

type InterventionFormValue = {
  id?: string;
  clientId: string;
  siteId: string;
  engineerId: string;
  type: Intervention['type'];
  status: Intervention['status'];
  priority: Intervention['priority'];
  scheduledStartAt: string;
  scheduledEndAt: string;
  slaTargetAt: string;
  internalComments: string;
};

function defaultValue(clients: Client[], sites: ClientSite[], engineers: Engineer[]): InterventionFormValue {
  return {
    clientId: clients[0]?.id || '',
    siteId: sites[0]?.id || '',
    engineerId: engineers[0]?.id || '',
    type: 'preventive',
    status: 'todo',
    priority: 'medium',
    scheduledStartAt: new Date().toISOString().slice(0, 16),
    scheduledEndAt: '',
    slaTargetAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString().slice(0, 16),
    internalComments: '',
  };
}

function toLocalDateTime(value?: string | null) {
  if (!value) return '';
  return new Date(value).toISOString().slice(0, 16);
}

export function InterventionEditor({
  clients,
  sites,
  engineers,
  initial,
  onSubmit,
  submitLabel,
}: {
  clients: Client[];
  sites: ClientSite[];
  engineers: Engineer[];
  initial?: Intervention | null;
  onSubmit: (value: InterventionFormValue) => void;
  submitLabel: string;
}) {
  const [form, setForm] = useState<InterventionFormValue>(defaultValue(clients, sites, engineers));

  useEffect(() => {
    if (!initial) {
      setForm(defaultValue(clients, sites, engineers));
      return;
    }
    setForm({
      id: initial.id,
      clientId: initial.clientId,
      siteId: initial.siteId,
      engineerId: initial.engineerId,
      type: initial.type,
      status: initial.status,
      priority: initial.priority,
      scheduledStartAt: toLocalDateTime(initial.scheduledStartAt),
      scheduledEndAt: toLocalDateTime(initial.scheduledEndAt),
      slaTargetAt: toLocalDateTime(initial.slaTargetAt),
      internalComments: initial.internalComments || '',
    });
  }, [clients, engineers, initial, sites]);

  const filteredSites = useMemo(
    () => sites.filter((site) => site.clientId === form.clientId),
    [form.clientId, sites],
  );

  useEffect(() => {
    if (filteredSites.some((site) => site.id === form.siteId)) return;
    setForm((current) => ({
      ...current,
      siteId: filteredSites[0]?.id || '',
    }));
  }, [filteredSites, form.siteId]);

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(form);
      }}
    >
      <div className="grid gap-4 xl:grid-cols-2">
        <Field label="Client">
          <Select value={form.clientId} onChange={(event) => setForm((current) => ({ ...current, clientId: event.target.value }))}>
            {clients.map((client) => (
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
        <Field label="Engineer">
          <Select value={form.engineerId} onChange={(event) => setForm((current) => ({ ...current, engineerId: event.target.value }))}>
            {engineers.map((engineer) => (
              <option key={engineer.id} value={engineer.id}>
                {engineer.fullName}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Intervention type">
          <Select value={form.type} onChange={(event) => setForm((current) => ({ ...current, type: event.target.value as Intervention['type'] }))}>
            {interventionTypeOptions.map((value) => (
              <option key={value} value={value}>
                {labelMaps.interventionType[value]}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Status">
          <Select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as Intervention['status'] }))}>
            {interventionStatusOptions.map((value) => (
              <option key={value} value={value}>
                {labelMaps.interventionStatus[value]}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Priority">
          <Select value={form.priority} onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value as Intervention['priority'] }))}>
            {priorityOptions.map((value) => (
              <option key={value} value={value}>
                {labelMaps.priority[value]}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Scheduled start">
          <Input type="datetime-local" value={form.scheduledStartAt} onChange={(event) => setForm((current) => ({ ...current, scheduledStartAt: event.target.value }))} />
        </Field>
        <Field label="Scheduled end">
          <Input type="datetime-local" value={form.scheduledEndAt} onChange={(event) => setForm((current) => ({ ...current, scheduledEndAt: event.target.value }))} />
        </Field>
        <Field label="SLA target">
          <Input type="datetime-local" value={form.slaTargetAt} onChange={(event) => setForm((current) => ({ ...current, slaTargetAt: event.target.value }))} />
        </Field>
      </div>
      <Field label="Internal comments">
        <Textarea
          value={form.internalComments}
          onChange={(event) => setForm((current) => ({ ...current, internalComments: event.target.value }))}
          placeholder="Dispatch notes, context, spare parts, or external ticket refs."
        />
      </Field>
      <button type="submit" className="btn-primary w-full justify-center">
        {submitLabel}
      </button>
    </form>
  );
}
