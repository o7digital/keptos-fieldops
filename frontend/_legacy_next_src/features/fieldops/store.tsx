'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fieldOpsSeed } from './mockData';
import type {
  Client,
  ClientSite,
  ClientUser,
  Engineer,
  FieldOpsStore,
  Integration,
  IntegrationAccount,
  Intervention,
  InterventionLog,
  InterventionReport,
  NetworkReport,
  SyncLog,
} from './types';
import { createId, createReference, diffMinutes, nowIso } from './utils';

const STORAGE_KEY = 'keptos-fieldops-store-v1';

type FieldOpsDataContextValue = {
  store: FieldOpsStore;
  resetDemoData: () => void;
  saveClient: (input: Partial<Client> & Pick<Client, 'name' | 'status' | 'primaryContact' | 'contractType' | 'sla'>) => void;
  saveSite: (input: Partial<ClientSite> & Pick<ClientSite, 'clientId' | 'name' | 'address' | 'localContact' | 'status' | 'healthScore'>) => void;
  saveEngineer: (input: Partial<Engineer> & Pick<Engineer, 'fullName' | 'phone' | 'email' | 'status' | 'region'> & { specialties: string[] }) => void;
  saveClientUser: (
    input: Partial<ClientUser> & Pick<ClientUser, 'clientId' | 'fullName' | 'email'> & { recurringIncidents: string[] },
  ) => void;
  saveIntervention: (
    input: Partial<Intervention> &
      Pick<Intervention, 'clientId' | 'siteId' | 'engineerId' | 'type' | 'status' | 'priority' | 'scheduledStartAt' | 'slaTargetAt'>,
  ) => string;
  saveInterventionReport: (
    input: Partial<InterventionReport> &
      Pick<InterventionReport, 'interventionId' | 'diagnostic' | 'probableCause' | 'actionsTaken' | 'result' | 'attachmentIds' | 'clientValidation' | 'pdfStatus'>,
  ) => void;
  saveNetworkReport: (
    input: Partial<NetworkReport> &
      Pick<NetworkReport, 'siteId' | 'connectionType' | 'provider' | 'perceivedQuality' | 'downloadMbps' | 'uploadMbps' | 'pingMs' | 'packetLossPct' | 'healthScore'>,
  ) => void;
  saveIntegration: (input: Partial<Integration> & Pick<Integration, 'platform' | 'name' | 'status' | 'scope' | 'description'>) => void;
  saveIntegrationAccount: (
    input: Partial<IntegrationAccount> & Pick<IntegrationAccount, 'integrationId' | 'accountName' | 'externalWorkspace' | 'status'>,
  ) => void;
  addSyncLog: (input: Omit<SyncLog, 'id' | 'createdAt' | 'updatedAt'>) => void;
  checkIn: (interventionId: string, actor?: string) => void;
  checkOut: (interventionId: string, actor?: string) => void;
};

const FieldOpsDataContext = createContext<FieldOpsDataContextValue | undefined>(undefined);

function readInitialStore() {
  if (typeof window === 'undefined') return fieldOpsSeed;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return fieldOpsSeed;
  try {
    return JSON.parse(stored) as FieldOpsStore;
  } catch {
    return fieldOpsSeed;
  }
}

function appendLog(logs: InterventionLog[], log: Omit<InterventionLog, 'id' | 'createdAt' | 'updatedAt'>) {
  const timestamp = nowIso();
  return [
    {
      ...log,
      id: createId('log'),
      createdAt: timestamp,
      updatedAt: timestamp,
    },
    ...logs,
  ];
}

function useFieldOpsStoreState() {
  const [store, setStore] = useState<FieldOpsStore>(fieldOpsSeed);

  useEffect(() => {
    setStore(readInitialStore());
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }, [store]);

  return [store, setStore] as const;
}

export function FieldOpsDataProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useFieldOpsStoreState();

  const resetDemoData = () => {
    setStore(fieldOpsSeed);
  };

  const saveClient: FieldOpsDataContextValue['saveClient'] = (input) => {
    const timestamp = nowIso();
    setStore((current) => {
      const existing = current.clients.find((item) => item.id === input.id);
      const next: Client = existing
        ? { ...existing, ...input, updatedAt: timestamp }
        : {
            id: createId('client'),
            name: input.name,
            status: input.status,
            primaryContact: input.primaryContact,
            primaryEmail: input.primaryEmail ?? null,
            primaryPhone: input.primaryPhone ?? null,
            contractType: input.contractType,
            sla: input.sla,
            notes: input.notes ?? null,
            createdAt: timestamp,
            updatedAt: timestamp,
          };

      return {
        ...current,
        clients: existing
          ? current.clients.map((item) => (item.id === existing.id ? next : item))
          : [next, ...current.clients],
      };
    });
  };

  const saveSite: FieldOpsDataContextValue['saveSite'] = (input) => {
    const timestamp = nowIso();
    setStore((current) => {
      const existing = current.sites.find((item) => item.id === input.id);
      const next: ClientSite = existing
        ? { ...existing, ...input, updatedAt: timestamp }
        : {
            id: createId('site'),
            clientId: input.clientId,
            name: input.name,
            address: input.address,
            localContact: input.localContact,
            localContactPhone: input.localContactPhone ?? null,
            gpsLatitude: input.gpsLatitude ?? null,
            gpsLongitude: input.gpsLongitude ?? null,
            gpsPlaceholder: input.gpsPlaceholder ?? null,
            status: input.status,
            healthScore: input.healthScore,
            createdAt: timestamp,
            updatedAt: timestamp,
          };

      return {
        ...current,
        sites: existing ? current.sites.map((item) => (item.id === existing.id ? next : item)) : [next, ...current.sites],
      };
    });
  };

  const saveEngineer: FieldOpsDataContextValue['saveEngineer'] = (input) => {
    const timestamp = nowIso();
    setStore((current) => {
      const existing = current.engineers.find((item) => item.id === input.id);
      const next: Engineer = existing
        ? { ...existing, ...input, updatedAt: timestamp }
        : {
            id: createId('engineer'),
            fullName: input.fullName,
            specialties: input.specialties,
            phone: input.phone,
            email: input.email,
            status: input.status,
            region: input.region,
            createdAt: timestamp,
            updatedAt: timestamp,
          };

      return {
        ...current,
        engineers: existing
          ? current.engineers.map((item) => (item.id === existing.id ? next : item))
          : [next, ...current.engineers],
      };
    });
  };

  const saveClientUser: FieldOpsDataContextValue['saveClientUser'] = (input) => {
    const timestamp = nowIso();
    setStore((current) => {
      const existing = current.clientUsers.find((item) => item.id === input.id);
      const next: ClientUser = existing
        ? { ...existing, ...input, updatedAt: timestamp }
        : {
            id: createId('client-user'),
            clientId: input.clientId,
            siteId: input.siteId ?? null,
            fullName: input.fullName,
            email: input.email,
            phone: input.phone ?? null,
            department: input.department ?? null,
            jobTitle: input.jobTitle ?? null,
            notes: input.notes ?? null,
            recurringIncidents: input.recurringIncidents,
            createdAt: timestamp,
            updatedAt: timestamp,
          };

      return {
        ...current,
        clientUsers: existing
          ? current.clientUsers.map((item) => (item.id === existing.id ? next : item))
          : [next, ...current.clientUsers],
      };
    });
  };

  const saveIntervention: FieldOpsDataContextValue['saveIntervention'] = (input) => {
    const timestamp = nowIso();
    const interventionId = input.id || createId('int');
    setStore((current) => {
      const existing = current.interventions.find((item) => item.id === interventionId);
      const next: Intervention = existing
        ? { ...existing, ...input, durationMinutes: diffMinutes(input.actualStartAt ?? existing.actualStartAt, input.actualEndAt ?? existing.actualEndAt), updatedAt: timestamp }
        : {
            id: interventionId,
            reference: input.reference || createReference(),
            clientId: input.clientId,
            siteId: input.siteId,
            engineerId: input.engineerId,
            type: input.type,
            status: input.status,
            priority: input.priority,
            scheduledStartAt: input.scheduledStartAt,
            scheduledEndAt: input.scheduledEndAt ?? null,
            actualStartAt: input.actualStartAt ?? null,
            actualEndAt: input.actualEndAt ?? null,
            durationMinutes: diffMinutes(input.actualStartAt ?? null, input.actualEndAt ?? null),
            slaTargetAt: input.slaTargetAt,
            internalComments: input.internalComments ?? null,
            checkInAt: input.checkInAt ?? null,
            checkOutAt: input.checkOutAt ?? null,
            checkInGpsPlaceholder: input.checkInGpsPlaceholder ?? null,
            checkOutGpsPlaceholder: input.checkOutGpsPlaceholder ?? null,
            createdAt: timestamp,
            updatedAt: timestamp,
          };

      const logs = existing
        ? current.interventionLogs
        : appendLog(current.interventionLogs, {
            interventionId,
            kind: 'created',
            actor: 'Dispatch manager',
            message: 'Intervention created from FieldOps operations board.',
            gpsPlaceholder: null,
          });

      return {
        ...current,
        interventions: existing
          ? current.interventions.map((item) => (item.id === interventionId ? next : item))
          : [next, ...current.interventions],
        interventionLogs: logs,
      };
    });
    return interventionId;
  };

  const saveInterventionReport: FieldOpsDataContextValue['saveInterventionReport'] = (input) => {
    const timestamp = nowIso();
    setStore((current) => {
      const existing = current.interventionReports.find((item) => item.id === input.id || item.interventionId === input.interventionId);
      const next: InterventionReport = existing
        ? { ...existing, ...input, updatedAt: timestamp }
        : {
            id: createId('report'),
            interventionId: input.interventionId,
            diagnostic: input.diagnostic,
            probableCause: input.probableCause,
            actionsTaken: input.actionsTaken,
            result: input.result,
            hardware: input.hardware ?? null,
            software: input.software ?? null,
            impactedUsers: input.impactedUsers ?? null,
            attachmentIds: input.attachmentIds,
            clientValidation: input.clientValidation,
            pdfStatus: input.pdfStatus,
            createdAt: timestamp,
            updatedAt: timestamp,
          };

      return {
        ...current,
        interventionReports: existing
          ? current.interventionReports.map((item) => (item.id === existing.id ? next : item))
          : [next, ...current.interventionReports],
      };
    });
  };

  const saveNetworkReport: FieldOpsDataContextValue['saveNetworkReport'] = (input) => {
    const timestamp = nowIso();
    setStore((current) => {
      const existing = current.networkReports.find((item) => item.id === input.id);
      const next: NetworkReport = existing
        ? { ...existing, ...input, updatedAt: timestamp }
        : {
            id: createId('network'),
            siteId: input.siteId,
            interventionId: input.interventionId ?? null,
            connectionType: input.connectionType,
            provider: input.provider,
            perceivedQuality: input.perceivedQuality,
            downloadMbps: input.downloadMbps,
            uploadMbps: input.uploadMbps,
            pingMs: input.pingMs,
            packetLossPct: input.packetLossPct,
            technicalRemarks: input.technicalRemarks ?? null,
            healthScore: input.healthScore,
            createdAt: timestamp,
            updatedAt: timestamp,
          };

      return {
        ...current,
        networkReports: existing
          ? current.networkReports.map((item) => (item.id === existing.id ? next : item))
          : [next, ...current.networkReports],
      };
    });
  };

  const saveIntegration: FieldOpsDataContextValue['saveIntegration'] = (input) => {
    const timestamp = nowIso();
    setStore((current) => {
      const existing = current.integrations.find((item) => item.id === input.id);
      const next: Integration = existing
        ? { ...existing, ...input, updatedAt: timestamp }
        : {
            id: createId('integration'),
            platform: input.platform,
            name: input.name,
            status: input.status,
            scope: input.scope,
            description: input.description,
            createdAt: timestamp,
            updatedAt: timestamp,
          };

      return {
        ...current,
        integrations: existing
          ? current.integrations.map((item) => (item.id === existing.id ? next : item))
          : [next, ...current.integrations],
      };
    });
  };

  const saveIntegrationAccount: FieldOpsDataContextValue['saveIntegrationAccount'] = (input) => {
    const timestamp = nowIso();
    setStore((current) => {
      const existing = current.integrationAccounts.find((item) => item.id === input.id);
      const next: IntegrationAccount = existing
        ? { ...existing, ...input, updatedAt: timestamp }
        : {
            id: createId('integration-account'),
            integrationId: input.integrationId,
            accountName: input.accountName,
            externalWorkspace: input.externalWorkspace,
            status: input.status,
            createdAt: timestamp,
            updatedAt: timestamp,
          };

      return {
        ...current,
        integrationAccounts: existing
          ? current.integrationAccounts.map((item) => (item.id === existing.id ? next : item))
          : [next, ...current.integrationAccounts],
      };
    });
  };

  const addSyncLog: FieldOpsDataContextValue['addSyncLog'] = (input) => {
    const timestamp = nowIso();
    setStore((current) => ({
      ...current,
      syncLogs: [
        {
          ...input,
          id: createId('sync'),
          createdAt: timestamp,
          updatedAt: timestamp,
        },
        ...current.syncLogs,
      ],
    }));
  };

  const checkIn: FieldOpsDataContextValue['checkIn'] = (interventionId, actor = 'Assigned engineer') => {
    const timestamp = nowIso();
    setStore((current) => ({
      ...current,
      interventions: current.interventions.map((item) =>
        item.id === interventionId
          ? {
              ...item,
              status: 'in_progress',
              actualStartAt: item.actualStartAt || timestamp,
              checkInAt: timestamp,
              checkInGpsPlaceholder: 'GPS placeholder ready for future mobile capture',
              updatedAt: timestamp,
            }
          : item,
      ),
      interventionLogs: appendLog(current.interventionLogs, {
        interventionId,
        kind: 'check-in',
        actor,
        message: 'Check-in validated.',
        gpsPlaceholder: 'GPS placeholder ready for future mobile capture',
      }),
    }));
  };

  const checkOut: FieldOpsDataContextValue['checkOut'] = (interventionId, actor = 'Assigned engineer') => {
    const timestamp = nowIso();
    setStore((current) => ({
      ...current,
      interventions: current.interventions.map((item) => {
        if (item.id !== interventionId) return item;
        const actualEndAt = timestamp;
        const actualStartAt = item.actualStartAt || item.checkInAt || timestamp;
        return {
          ...item,
          status: 'completed',
          actualStartAt,
          actualEndAt,
          durationMinutes: diffMinutes(actualStartAt, actualEndAt),
          checkOutAt: actualEndAt,
          checkOutGpsPlaceholder: 'GPS placeholder ready for future mobile capture',
          updatedAt: timestamp,
        };
      }),
      interventionLogs: appendLog(current.interventionLogs, {
        interventionId,
        kind: 'check-out',
        actor,
        message: 'Check-out validated.',
        gpsPlaceholder: 'GPS placeholder ready for future mobile capture',
      }),
    }));
  };

  const value = useMemo<FieldOpsDataContextValue>(
    () => ({
      store,
      resetDemoData,
      saveClient,
      saveSite,
      saveEngineer,
      saveClientUser,
      saveIntervention,
      saveInterventionReport,
      saveNetworkReport,
      saveIntegration,
      saveIntegrationAccount,
      addSyncLog,
      checkIn,
      checkOut,
    }),
    [store],
  );

  return <FieldOpsDataContext.Provider value={value}>{children}</FieldOpsDataContext.Provider>;
}

export function useFieldOpsData() {
  const ctx = useContext(FieldOpsDataContext);
  if (!ctx) throw new Error('useFieldOpsData must be used within FieldOpsDataProvider');
  return ctx;
}
