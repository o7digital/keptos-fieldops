'use client';

import { useEffect, useState } from 'react';
import type { NetworkReport } from '@/features/fieldops/types';
import { Field, Input, Select, Textarea } from './ui';
import { healthScoreOptions, labelMaps } from '@/features/fieldops/options';

type NetworkFormValue = {
  id?: string;
  siteId: string;
  interventionId?: string;
  connectionType: string;
  provider: string;
  perceivedQuality: string;
  downloadMbps: number;
  uploadMbps: number;
  pingMs: number;
  packetLossPct: number;
  technicalRemarks: string;
  healthScore: NetworkReport['healthScore'];
};

export function NetworkReportEditor({
  siteId,
  interventionId,
  initial,
  onSubmit,
  submitLabel,
}: {
  siteId: string;
  interventionId?: string;
  initial?: NetworkReport | null;
  onSubmit: (value: NetworkFormValue) => void;
  submitLabel: string;
}) {
  const [form, setForm] = useState<NetworkFormValue>({
    siteId,
    interventionId,
    connectionType: 'Fiber',
    provider: '',
    perceivedQuality: '',
    downloadMbps: 0,
    uploadMbps: 0,
    pingMs: 0,
    packetLossPct: 0,
    technicalRemarks: '',
    healthScore: 'green',
  });

  useEffect(() => {
    if (!initial) {
      setForm({
        siteId,
        interventionId,
        connectionType: 'Fiber',
        provider: '',
        perceivedQuality: '',
        downloadMbps: 0,
        uploadMbps: 0,
        pingMs: 0,
        packetLossPct: 0,
        technicalRemarks: '',
        healthScore: 'green',
      });
      return;
    }
    setForm({
      id: initial.id,
      siteId,
      interventionId: initial.interventionId || interventionId,
      connectionType: initial.connectionType,
      provider: initial.provider,
      perceivedQuality: initial.perceivedQuality,
      downloadMbps: initial.downloadMbps,
      uploadMbps: initial.uploadMbps,
      pingMs: initial.pingMs,
      packetLossPct: initial.packetLossPct,
      technicalRemarks: initial.technicalRemarks || '',
      healthScore: initial.healthScore,
    });
  }, [initial, interventionId, siteId]);

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(form);
      }}
    >
      <div className="grid gap-4 xl:grid-cols-2">
        <Field label="Connection type">
          <Input value={form.connectionType} onChange={(event) => setForm((current) => ({ ...current, connectionType: event.target.value }))} />
        </Field>
        <Field label="Provider">
          <Input value={form.provider} onChange={(event) => setForm((current) => ({ ...current, provider: event.target.value }))} />
        </Field>
        <Field label="Perceived quality">
          <Input value={form.perceivedQuality} onChange={(event) => setForm((current) => ({ ...current, perceivedQuality: event.target.value }))} />
        </Field>
        <Field label="Health score">
          <Select value={form.healthScore} onChange={(event) => setForm((current) => ({ ...current, healthScore: event.target.value as NetworkReport['healthScore'] }))}>
            {healthScoreOptions.map((value) => (
              <option key={value} value={value}>
                {labelMaps.healthScore[value]}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Download Mbps">
          <Input type="number" value={form.downloadMbps} onChange={(event) => setForm((current) => ({ ...current, downloadMbps: Number(event.target.value) }))} />
        </Field>
        <Field label="Upload Mbps">
          <Input type="number" value={form.uploadMbps} onChange={(event) => setForm((current) => ({ ...current, uploadMbps: Number(event.target.value) }))} />
        </Field>
        <Field label="Ping (ms)">
          <Input type="number" value={form.pingMs} onChange={(event) => setForm((current) => ({ ...current, pingMs: Number(event.target.value) }))} />
        </Field>
        <Field label="Packet loss (%)">
          <Input type="number" step="0.1" value={form.packetLossPct} onChange={(event) => setForm((current) => ({ ...current, packetLossPct: Number(event.target.value) }))} />
        </Field>
      </div>
      <Field label="Technical remarks">
        <Textarea value={form.technicalRemarks} onChange={(event) => setForm((current) => ({ ...current, technicalRemarks: event.target.value }))} />
      </Field>
      <button type="submit" className="btn-primary w-full justify-center">
        {submitLabel}
      </button>
    </form>
  );
}
