'use client';

import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/AppShell';
import { Guard } from '@/components/Guard';
import { InterventionEditor } from '@/components/fieldops/InterventionEditor';
import { PageHeader, Panel } from '@/components/fieldops/ui';
import { useFieldOpsData } from '@/features/fieldops/store';

export default function NewInterventionPage() {
  const { store, saveIntervention } = useFieldOpsData();
  const router = useRouter();

  return (
    <Guard>
      <AppShell>
        <PageHeader
          eyebrow="Dispatch creation"
          title="New intervention"
          description="Dedicated creation screen for planners who want to set the visit cleanly before sending the engineer."
        />
        <Panel>
          <InterventionEditor
            clients={store.clients}
            sites={store.sites}
            engineers={store.engineers}
            submitLabel="Create intervention"
            onSubmit={(value) => {
              const interventionId = saveIntervention({
                ...value,
                scheduledStartAt: new Date(value.scheduledStartAt).toISOString(),
                scheduledEndAt: value.scheduledEndAt ? new Date(value.scheduledEndAt).toISOString() : null,
                slaTargetAt: new Date(value.slaTargetAt).toISOString(),
                internalComments: value.internalComments || null,
              });
              router.push(`/interventions/${interventionId}`);
            }}
          />
        </Panel>
      </AppShell>
    </Guard>
  );
}
