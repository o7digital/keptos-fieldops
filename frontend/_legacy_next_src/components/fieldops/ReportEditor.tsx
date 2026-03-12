'use client';

import { useEffect, useState } from 'react';
import type { InterventionReport } from '@/features/fieldops/types';
import { Field, Input, Textarea } from './ui';

type ReportFormValue = {
  id?: string;
  interventionId: string;
  diagnostic: string;
  probableCause: string;
  actionsTaken: string;
  result: string;
  hardware: string;
  software: string;
  impactedUsers: string;
};

export function ReportEditor({
  interventionId,
  initial,
  onSubmit,
  submitLabel,
}: {
  interventionId: string;
  initial?: InterventionReport | null;
  onSubmit: (value: ReportFormValue) => void;
  submitLabel: string;
}) {
  const [form, setForm] = useState<ReportFormValue>({
    interventionId,
    diagnostic: '',
    probableCause: '',
    actionsTaken: '',
    result: '',
    hardware: '',
    software: '',
    impactedUsers: '',
  });

  useEffect(() => {
    if (!initial) {
      setForm({
        interventionId,
        diagnostic: '',
        probableCause: '',
        actionsTaken: '',
        result: '',
        hardware: '',
        software: '',
        impactedUsers: '',
      });
      return;
    }
    setForm({
      id: initial.id,
      interventionId,
      diagnostic: initial.diagnostic,
      probableCause: initial.probableCause,
      actionsTaken: initial.actionsTaken,
      result: initial.result,
      hardware: initial.hardware || '',
      software: initial.software || '',
      impactedUsers: initial.impactedUsers || '',
    });
  }, [initial, interventionId]);

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(form);
      }}
    >
      <Field label="Diagnostic">
        <Textarea value={form.diagnostic} onChange={(event) => setForm((current) => ({ ...current, diagnostic: event.target.value }))} />
      </Field>
      <Field label="Probable cause">
        <Textarea value={form.probableCause} onChange={(event) => setForm((current) => ({ ...current, probableCause: event.target.value }))} />
      </Field>
      <Field label="Actions performed">
        <Textarea value={form.actionsTaken} onChange={(event) => setForm((current) => ({ ...current, actionsTaken: event.target.value }))} />
      </Field>
      <Field label="Result">
        <Textarea value={form.result} onChange={(event) => setForm((current) => ({ ...current, result: event.target.value }))} />
      </Field>
      <div className="grid gap-4 xl:grid-cols-3">
        <Field label="Hardware">
          <Input value={form.hardware} onChange={(event) => setForm((current) => ({ ...current, hardware: event.target.value }))} />
        </Field>
        <Field label="Software">
          <Input value={form.software} onChange={(event) => setForm((current) => ({ ...current, software: event.target.value }))} />
        </Field>
        <Field label="Impacted users">
          <Input value={form.impactedUsers} onChange={(event) => setForm((current) => ({ ...current, impactedUsers: event.target.value }))} />
        </Field>
      </div>
      <button type="submit" className="btn-primary w-full justify-center">
        {submitLabel}
      </button>
    </form>
  );
}
