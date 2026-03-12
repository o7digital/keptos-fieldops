import type { FieldOpsStore } from './types';

export function getClientMap(store: FieldOpsStore) {
  return new Map(store.clients.map((item) => [item.id, item]));
}

export function getSiteMap(store: FieldOpsStore) {
  return new Map(store.sites.map((item) => [item.id, item]));
}

export function getEngineerMap(store: FieldOpsStore) {
  return new Map(store.engineers.map((item) => [item.id, item]));
}

export function getManagerDashboard(store: FieldOpsStore) {
  const today = new Date().toDateString();
  const interventionsToday = store.interventions.filter(
    (item) => new Date(item.scheduledStartAt).toDateString() === today,
  );
  const activeEngineers = store.engineers.filter((item) => item.status === 'active').length;
  const checkInsValidated = store.interventions.filter((item) => Boolean(item.checkInAt)).length;
  const internetIncidents = store.networkReports.filter((item) => item.healthScore === 'red').length;
  const inProgress = store.interventions.filter((item) => item.status === 'in_progress').length;
  const slaAlerts = store.interventions.filter(
    (item) => item.status !== 'completed' && item.status !== 'cancelled' && new Date(item.slaTargetAt).getTime() < Date.now(),
  ).length;
  const topClients = store.clients
    .map((client) => ({
      client,
      count: store.interventions.filter((intervention) => intervention.clientId === client.id).length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);
  const recentReports = [...store.interventionReports]
    .sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt))
    .slice(0, 4);
  const monitoredSites = store.sites
    .map((site) => ({
      site,
      interventionsCount: store.interventions.filter((item) => item.siteId === site.id).length,
    }))
    .sort((a, b) => (a.site.healthScore < b.site.healthScore ? -1 : 1))
    .slice(0, 4);

  return {
    interventionsToday: interventionsToday.length,
    activeEngineers,
    checkInsValidated,
    internetIncidents,
    inProgress,
    slaAlerts,
    topClients,
    recentReports,
    monitoredSites,
  };
}

export function getEngineerDashboard(store: FieldOpsStore, engineerEmail?: string | null) {
  const engineer =
    store.engineers.find((item) => item.email.toLowerCase() === engineerEmail?.toLowerCase()) ||
    store.engineers.find((item) => item.status === 'active') ||
    null;

  if (!engineer) {
    return {
      engineer: null,
      interventionsToday: [],
      nextIntervention: null,
      lastCheckIn: null,
      recentReports: [],
    };
  }

  const interventions = store.interventions
    .filter((item) => item.engineerId === engineer.id)
    .sort((a, b) => +new Date(a.scheduledStartAt) - +new Date(b.scheduledStartAt));

  const today = new Date().toDateString();
  const interventionsToday = interventions.filter(
    (item) => new Date(item.scheduledStartAt).toDateString() === today,
  );
  const nextIntervention =
    interventions.find((item) => new Date(item.scheduledStartAt).getTime() >= Date.now()) || interventions[0] || null;
  const lastCheckIn =
    [...interventions]
      .filter((item) => item.checkInAt)
      .sort((a, b) => +new Date(b.checkInAt || 0) - +new Date(a.checkInAt || 0))[0] || null;
  const recentReports = store.interventionReports
    .filter((report) => interventions.some((intervention) => intervention.id === report.interventionId))
    .sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt))
    .slice(0, 3);

  return {
    engineer,
    interventionsToday,
    nextIntervention,
    lastCheckIn,
    recentReports,
  };
}
