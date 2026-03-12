export type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
export type TicketSource = 'Zendesk' | 'Jira Service Management' | 'ServiceNow' | 'Freshservice';
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type TicketStatus = 'New' | 'Triaged' | 'In Progress' | 'Waiting Vendor' | 'Resolved';

export type NavigationItem = {
  href: string;
  key: string;
  label: string;
  hint: string;
};

export type MetricCardData = {
  label: string;
  value: string;
  detail: string;
  trend: string;
  tone: Tone;
  spark: number[];
};

export type ActivityItem = {
  title: string;
  detail: string;
  timestamp: string;
  tone: Tone;
};

export type IncidentPulse = {
  source: TicketSource;
  opened: number;
  critical: number;
  medianResponse: string;
  tone: Tone;
};

export type EstateHealth = {
  site: string;
  client: string;
  health: 'Healthy' | 'Watch' | 'Critical';
  latency: string;
  packetLoss: string;
  utilization: string;
  tone: Tone;
};

export type MissionTimelineEntry = {
  time: string;
  title: string;
  detail: string;
  tone: Tone;
};

export type MissionReport = {
  summary: string;
  diagnosis: string;
  actions: string[];
  material: string;
  impactedUsers: string;
};

export type MissionNetwork = {
  health: 'Green' | 'Amber' | 'Red';
  down: string;
  up: string;
  ping: string;
  loss: string;
  remark: string;
};

export type Mission = {
  id: string;
  label: string;
  client: string;
  site: string;
  priority: TicketPriority;
  status: string;
  engineer: string;
  eta: string;
  checkIn: string;
  checkOut: string;
  progress: number;
  summary: string;
  workOrder: string;
  timeline: MissionTimelineEntry[];
  report: MissionReport;
  network: MissionNetwork;
};

export type TicketRow = {
  id: string;
  source: TicketSource;
  client: string;
  site: string;
  priority: TicketPriority;
  status: TicketStatus;
  engineer: string;
  intervention: string;
  updatedAt: string;
};

export type ConnectorCard = {
  name: TicketSource;
  status: 'Connected' | 'Available' | 'Pilot-ready';
  stateTone: Tone;
  description: string;
  lastSync: string;
  volume: string;
  latency: string;
  action: string;
  coverage: string[];
};

export type ClientSite = {
  name: string;
  city: string;
  health: string;
  incidentCount: string;
  upcomingVisit: string;
  tone: Tone;
};

export type ClientUser = {
  name: string;
  role: string;
  site: string;
  recurringIssue: string;
};

export type ClientIncident = {
  title: string;
  source: TicketSource;
  priority: TicketPriority;
  status: string;
  updatedAt: string;
};

export type ClientHistoryItem = {
  date: string;
  label: string;
  detail: string;
};

export type ClientProfile = {
  name: string;
  sector: string;
  contract: string;
  sla: string;
  renewal: string;
  mrr: string;
  serviceLead: string;
  healthScore: string;
  availability: string;
  sites: ClientSite[];
  users: ClientUser[];
  incidents: ClientIncident[];
  history: ClientHistoryItem[];
};

export type PortalTheme = {
  id: string;
  tenantName: string;
  logoLabel: string;
  accent: string;
  accentSoft: string;
  glow: string;
  headline: string;
  stats: Array<{ label: string; value: string; note: string }>;
  tickets: Array<{ id: string; title: string; status: string; source: TicketSource }>;
  reports: Array<{ title: string; date: string; engineer: string }>;
  incidents: Array<{ site: string; level: string; note: string }>;
};

export type AdminLog = {
  timestamp: string;
  connector: string;
  status: string;
  message: string;
};

export const navigation: NavigationItem[] = [
  { href: '/dashboard', key: 'dashboard', label: 'Executive', hint: 'Central cockpit' },
  { href: '/operations', key: 'operations', label: 'Field Ops', hint: 'Mission control' },
  { href: '/tickets', key: 'tickets', label: 'Unified Tickets', hint: 'Multi-source queue' },
  { href: '/connectors', key: 'connectors', label: 'Connectors', hint: 'Sync fabric' },
  { href: '/clients', key: 'clients', label: 'Client 360', hint: 'Account intelligence' },
  { href: '/portal', key: 'portal', label: 'White-label', hint: 'Tenant preview' },
  { href: '/admin', key: 'admin', label: 'Admin', hint: 'Control plane' },
];

export const workspaceSignals = [
  { label: 'Orbit status', value: 'All regions online' },
  { label: 'Platform tier', value: 'Enterprise orchestration' },
  { label: 'Surface', value: 'Keptos Operations Hub' },
];

export const executiveMetrics: MetricCardData[] = [
  {
    label: 'Open incidents',
    value: '148',
    detail: 'Cross-platform queue under live supervision.',
    trend: '+12 vs previous 24h',
    tone: 'danger',
    spark: [52, 48, 56, 74, 68, 82, 79],
  },
  {
    label: 'Interventions today',
    value: '34',
    detail: 'Preventive, urgent, and user-facing missions.',
    trend: '19 scheduled, 11 on site, 4 closing',
    tone: 'info',
    spark: [22, 34, 44, 39, 57, 60, 65],
  },
  {
    label: 'Engineers active',
    value: '18',
    detail: 'Field engineers currently dispatchable.',
    trend: '2 in reserve, 1 on leave',
    tone: 'success',
    spark: [68, 72, 70, 78, 80, 82, 84],
  },
  {
    label: 'SLA alerts',
    value: '7',
    detail: 'Breaches or near-breaches requiring review.',
    trend: '3 critical, 4 watchlist',
    tone: 'warning',
    spark: [12, 16, 14, 19, 22, 18, 24],
  },
  {
    label: 'Network health',
    value: '94.2',
    detail: 'Composite score across monitored sites.',
    trend: '+1.8 week over week',
    tone: 'success',
    spark: [84, 86, 88, 90, 92, 93, 94],
  },
];

export const incidentPulse: IncidentPulse[] = [
  { source: 'Zendesk', opened: 58, critical: 9, medianResponse: '11m', tone: 'danger' },
  { source: 'Jira Service Management', opened: 31, critical: 4, medianResponse: '14m', tone: 'warning' },
  { source: 'ServiceNow', opened: 42, critical: 6, medianResponse: '19m', tone: 'info' },
  { source: 'Freshservice', opened: 17, critical: 2, medianResponse: '8m', tone: 'success' },
];

export const executiveActivity: ActivityItem[] = [
  {
    title: 'Critical WAN degradation escalated for Orbital Hospitality / Paris HQ',
    detail: 'ServiceNow incident SN-88421 linked to field mission KOH-219.',
    timestamp: '2 min ago',
    tone: 'danger',
  },
  {
    title: 'Zendesk connector completed delta sync',
    detail: '427 ticket comments normalized into Keptos timeline.',
    timestamp: '9 min ago',
    tone: 'success',
  },
  {
    title: 'Field engineer Maya Chen checked in at Alpine Hotels / Lyon Riverside',
    detail: 'GPS placeholder stored, customer contact notified.',
    timestamp: '18 min ago',
    tone: 'info',
  },
  {
    title: 'SLA watchlist refreshed for Veridian Retail',
    detail: 'Two retail sites moved from amber to red due to ISP packet loss.',
    timestamp: '27 min ago',
    tone: 'warning',
  },
];

export const estateHealth: EstateHealth[] = [
  { site: 'Paris HQ', client: 'Orbital Hospitality', health: 'Critical', latency: '184 ms', packetLoss: '6.2%', utilization: '91%', tone: 'danger' },
  { site: 'Lyon Riverside', client: 'Alpine Hotels', health: 'Watch', latency: '61 ms', packetLoss: '1.9%', utilization: '72%', tone: 'warning' },
  { site: 'Lille Mega Store', client: 'Veridian Retail', health: 'Critical', latency: '149 ms', packetLoss: '5.1%', utilization: '88%', tone: 'danger' },
  { site: 'Madrid Warehouse', client: 'Northline Freight', health: 'Healthy', latency: '27 ms', packetLoss: '0.3%', utilization: '54%', tone: 'success' },
];

export const operationsMetrics = [
  { label: 'On-site now', value: '11', detail: 'Missions with confirmed check-in.', trend: '8 network, 3 user support', tone: 'info', spark: [20, 28, 31, 37, 41, 44, 49] },
  { label: 'Reports pending', value: '5', detail: 'Interventions awaiting closure report.', trend: '2 urgent, 3 standard', tone: 'warning', spark: [14, 13, 18, 15, 17, 19, 21] },
  { label: 'Internet escalations', value: '4', detail: 'Sites requiring provider coordination.', trend: 'Orange Business, Colt, Orange Retail', tone: 'danger', spark: [8, 10, 9, 12, 14, 16, 15] },
  { label: 'Engineer utilization', value: '81%', detail: 'Current dispatch saturation across the field team.', trend: 'High but still stable', tone: 'success', spark: [64, 68, 71, 75, 79, 83, 81] },
];

export const missions: Mission[] = [
  {
    id: 'koh-219',
    label: 'KOH-219',
    client: 'Orbital Hospitality Group',
    site: 'Paris HQ',
    priority: 'Critical',
    status: 'On site',
    engineer: 'Maya Chen',
    eta: 'Started 07:42',
    checkIn: '07:42',
    checkOut: 'Pending',
    progress: 72,
    summary: 'Core switch packet burst and WAN instability affecting guest services and reservation desks.',
    workOrder: 'Bridge WAN resilience, validate uplink health, and prepare interim customer briefing.',
    timeline: [
      { time: '07:21', title: 'Dispatch approved', detail: 'Mission created from ServiceNow critical incident.', tone: 'info' },
      { time: '07:42', title: 'Check-in validated', detail: 'Lobby beacon placeholder stored for future mobile wrapper.', tone: 'success' },
      { time: '08:06', title: 'Layer 3 diagnostics', detail: 'Observed asymmetric packet loss on primary fiber route.', tone: 'warning' },
      { time: '08:31', title: 'Failover rehearsal', detail: 'Secondary WAN path restored core access for reservation desks.', tone: 'success' },
      { time: '09:05', title: 'Customer update sent', detail: 'Executive summary pushed to service lead and local IT sponsor.', tone: 'info' },
    ],
    report: {
      summary: 'Service partially stabilized while provider escalation remains active.',
      diagnosis: 'Primary MPLS handoff saturating under burst load from conference floor uplinks.',
      actions: [
        'Rebalanced trunk priorities and validated failover to backup fiber.',
        'Applied emergency QoS policy for reservation and front desk traffic.',
        'Prepared evidence pack for Orange Business escalation.',
      ],
      material: 'Juniper EX core stack, Orange Business CPE',
      impactedUsers: 'Front desk, reservations, executive floor',
    },
    network: {
      health: 'Amber',
      down: '312 Mbps',
      up: '94 Mbps',
      ping: '68 ms',
      loss: '2.4%',
      remark: 'Service usable after failover, but primary carrier remains degraded.',
    },
  },
  {
    id: 'alp-144',
    label: 'ALP-144',
    client: 'Alpine Hotels',
    site: 'Lyon Riverside',
    priority: 'High',
    status: 'Awaiting sign-off',
    engineer: 'Romain N’Doye',
    eta: 'Closure in 38 min',
    checkIn: '06:55',
    checkOut: '09:18',
    progress: 91,
    summary: 'Conference wing Wi-Fi instability during executive event setup.',
    workOrder: 'Stabilize high-density access points and confirm roaming for event devices.',
    timeline: [
      { time: '06:55', title: 'Check-in validated', detail: 'Mission opened from Zendesk VIP escalation.', tone: 'success' },
      { time: '07:24', title: 'Spectrum sweep', detail: 'Detected adjacent-channel interference from unmanaged repeater.', tone: 'warning' },
      { time: '07:58', title: 'RF retune', detail: 'AP channel plan rebalanced and power profile normalized.', tone: 'success' },
      { time: '08:43', title: 'Client walkthrough', detail: 'Event manager confirmed stable roaming and streaming.', tone: 'info' },
    ],
    report: {
      summary: 'Service restored with customer validation pending final PDF.',
      diagnosis: 'Improper third-party repeater introduced channel overlap and AP retries.',
      actions: [
        'Removed unmanaged repeater from service area.',
        'Pushed corrected RF profile through Meraki template.',
        'Validated roaming across ballroom and executive suites.',
      ],
      material: 'Meraki MR access points',
      impactedUsers: 'Executive events team and conference guests',
    },
    network: {
      health: 'Green',
      down: '418 Mbps',
      up: '152 Mbps',
      ping: '22 ms',
      loss: '0.1%',
      remark: 'Stable after remediation, no residual saturation detected.',
    },
  },
  {
    id: 'vrd-088',
    label: 'VRD-088',
    client: 'Veridian Retail',
    site: 'Lille Mega Store',
    priority: 'Critical',
    status: 'En route',
    engineer: 'Lea Rousseau',
    eta: 'ETA 10:24',
    checkIn: 'Planned',
    checkOut: 'N/A',
    progress: 24,
    summary: 'PoS connectivity drops and payment queue latency during morning store opening.',
    workOrder: 'Investigate ISP instability, switching fabric saturation, and lane failback.',
    timeline: [
      { time: '08:47', title: 'Queue spike detected', detail: 'Freshservice alert ingested into unified ticket stream.', tone: 'danger' },
      { time: '08:55', title: 'Dispatch created', detail: 'On-site engineer assigned from north cluster.', tone: 'info' },
      { time: '09:10', title: 'Pre-flight diagnostic', detail: 'Remote ping and packet loss tests attached to mission.', tone: 'warning' },
    ],
    report: {
      summary: 'Intervention opened, report shell prepared for field completion.',
      diagnosis: 'Preliminary telemetry indicates intermittent carrier jitter and overloaded switch uplink.',
      actions: [
        'Prepared replacement SFP kit and PoS lane diagnostics checklist.',
        'Queued ISP comparison data in mission attachments.',
        'Reserved escalation slot with retail service desk.',
      ],
      material: 'Catalyst access switch, PoS edge router',
      impactedUsers: 'Store cashiers and payment services',
    },
    network: {
      health: 'Red',
      down: '126 Mbps',
      up: '37 Mbps',
      ping: '143 ms',
      loss: '6.6%',
      remark: 'Severe degradation confirmed before arrival; provider escalation likely required.',
    },
  },
];

export const engineerPulse = [
  { name: 'Maya Chen', status: 'On site', speciality: 'WAN / Core routing', zone: 'Paris Cluster', lastSeen: '2 min ago' },
  { name: 'Romain N’Doye', status: 'Closing', speciality: 'Wi-Fi / Hospitality', zone: 'Lyon Cluster', lastSeen: '6 min ago' },
  { name: 'Lea Rousseau', status: 'En route', speciality: 'Retail networks', zone: 'North Cluster', lastSeen: '11 min ago' },
  { name: 'Amir Dahan', status: 'Standby', speciality: 'VIP user support', zone: 'Central Reserve', lastSeen: '14 min ago' },
];

export const unifiedTicketMetrics = [
  { label: 'Unified backlog', value: '148', detail: 'Normalized queue across all connected sources.', trend: '52 Zendesk · 31 JSM · 42 SN · 17 Freshservice', tone: 'info', spark: [44, 48, 53, 61, 57, 66, 70] },
  { label: 'Linked interventions', value: '29', detail: 'Tickets already paired with field work.', trend: '19 active · 10 scheduled', tone: 'success', spark: [14, 18, 21, 26, 29, 31, 29] },
  { label: 'Critical tickets', value: '21', detail: 'Items above the orchestration red line.', trend: 'Carrier, WAN, VIP, retail PoS', tone: 'danger', spark: [11, 13, 15, 19, 18, 20, 21] },
  { label: 'Median update lag', value: '7m', detail: 'Time to synchronize context into the hub.', trend: 'Connector shell behaving nominally', tone: 'warning', spark: [9, 8, 7, 8, 7, 6, 7] },
];

export const unifiedTickets: TicketRow[] = [
  { id: 'ZD-40391', source: 'Zendesk', client: 'Alpine Hotels', site: 'Lyon Riverside', priority: 'High', status: 'In Progress', engineer: 'Romain N’Doye', intervention: 'ALP-144', updatedAt: '2 min ago' },
  { id: 'JSM-1148', source: 'Jira Service Management', client: 'Veridian Retail', site: 'Lille Mega Store', priority: 'Critical', status: 'Triaged', engineer: 'Lea Rousseau', intervention: 'VRD-088', updatedAt: '5 min ago' },
  { id: 'SN-88421', source: 'ServiceNow', client: 'Orbital Hospitality Group', site: 'Paris HQ', priority: 'Critical', status: 'In Progress', engineer: 'Maya Chen', intervention: 'KOH-219', updatedAt: '2 min ago' },
  { id: 'FS-2193', source: 'Freshservice', client: 'Northline Freight', site: 'Madrid Warehouse', priority: 'Medium', status: 'Resolved', engineer: 'Amir Dahan', intervention: 'NTL-041', updatedAt: '13 min ago' },
  { id: 'ZD-40412', source: 'Zendesk', client: 'Veridian Retail', site: 'Lille Mega Store', priority: 'High', status: 'Waiting Vendor', engineer: 'Lea Rousseau', intervention: 'VRD-088', updatedAt: '8 min ago' },
  { id: 'SN-88408', source: 'ServiceNow', client: 'Northline Freight', site: 'Antwerp Hub', priority: 'Medium', status: 'Triaged', engineer: 'Amir Dahan', intervention: 'NTL-039', updatedAt: '18 min ago' },
  { id: 'JSM-1123', source: 'Jira Service Management', client: 'Orbital Hospitality Group', site: 'Bordeaux Suites', priority: 'Low', status: 'New', engineer: 'Unassigned', intervention: 'Not linked', updatedAt: '22 min ago' },
  { id: 'FS-2174', source: 'Freshservice', client: 'Alpine Hotels', site: 'Nice Waterfront', priority: 'Medium', status: 'In Progress', engineer: 'Sofia El Idrissi', intervention: 'ALP-129', updatedAt: '31 min ago' },
  { id: 'ZD-40277', source: 'Zendesk', client: 'Orbital Hospitality Group', site: 'Paris HQ', priority: 'Critical', status: 'Triaged', engineer: 'Maya Chen', intervention: 'KOH-219', updatedAt: '34 min ago' },
  { id: 'SN-88390', source: 'ServiceNow', client: 'Veridian Retail', site: 'Rouen Flagship', priority: 'High', status: 'Resolved', engineer: 'Clara Joubert', intervention: 'VRD-077', updatedAt: '46 min ago' },
  { id: 'JSM-1094', source: 'Jira Service Management', client: 'Northline Freight', site: 'Madrid Warehouse', priority: 'Medium', status: 'In Progress', engineer: 'Amir Dahan', intervention: 'NTL-041', updatedAt: '1 h ago' },
  { id: 'FS-2162', source: 'Freshservice', client: 'Orbital Hospitality Group', site: 'Marseille Harbour', priority: 'Low', status: 'New', engineer: 'Unassigned', intervention: 'Not linked', updatedAt: '1 h ago' },
];

export const connectors: ConnectorCard[] = [
  {
    name: 'Zendesk',
    status: 'Connected',
    stateTone: 'success',
    description: 'Two-way ticket ingestion and timeline normalization already operational.',
    lastSync: '42 seconds ago',
    volume: '18.2k records / 24h',
    latency: '1.8s delta sync',
    action: 'Inspect sync health',
    coverage: ['Tickets', 'Comments', 'Tags', 'SLA state'],
  },
  {
    name: 'Jira Service Management',
    status: 'Available',
    stateTone: 'info',
    description: 'Schema and sync shell ready for tenant activation with project mapping.',
    lastSync: 'Mock preview mode',
    volume: '6.4k records / 24h',
    latency: '2.1s delta sync',
    action: 'Enable pilot tenant',
    coverage: ['Requests', 'Assignees', 'Priorities', 'Approvals'],
  },
  {
    name: 'ServiceNow',
    status: 'Available',
    stateTone: 'warning',
    description: 'Enterprise-grade incident orchestration path with CMDB-aware normalization.',
    lastSync: 'Mock preview mode',
    volume: '10.9k records / 24h',
    latency: '3.4s delta sync',
    action: 'Review enterprise mapping',
    coverage: ['Incidents', 'Tasks', 'Assignment groups', 'CMDB refs'],
  },
  {
    name: 'Freshservice',
    status: 'Available',
    stateTone: 'neutral',
    description: 'Tenant-friendly connector path optimized for white-label mid-market deployments.',
    lastSync: 'Mock preview mode',
    volume: '2.9k records / 24h',
    latency: '1.6s delta sync',
    action: 'Launch tenant preview',
    coverage: ['Tickets', 'Requesters', 'Agent notes', 'Status events'],
  },
];

export const connectorActivity = [
  { label: 'Records normalized', value: '38.4k', detail: 'Unified over the last 24 hours.' },
  { label: 'Average sync delay', value: '2.2s', detail: 'Across all connector streams.' },
  { label: 'Tenant-ready templates', value: '9', detail: 'Reusable mapping presets by vertical.' },
];

export const featuredClient: ClientProfile = {
  name: 'Orbital Hospitality Group',
  sector: 'Premium hospitality',
  contract: 'Managed services + field operations',
  sla: 'Gold 24/7 - 15 min triage - 4h on site',
  renewal: 'Renews 14 September 2026',
  mrr: 'EUR 38,400',
  serviceLead: 'Nora Klein',
  healthScore: '92 / 100',
  availability: '99.94% rolling 30 days',
  sites: [
    { name: 'Paris HQ', city: 'Paris', health: 'Critical watch', incidentCount: '9 open', upcomingVisit: 'Maya Chen on site', tone: 'danger' },
    { name: 'Bordeaux Suites', city: 'Bordeaux', health: 'Stable', incidentCount: '2 open', upcomingVisit: 'Preventive audit Friday', tone: 'success' },
    { name: 'Marseille Harbour', city: 'Marseille', health: 'Attention', incidentCount: '4 open', upcomingVisit: 'Follow-up tomorrow 09:30', tone: 'warning' },
  ],
  users: [
    { name: 'Celine Garnier', role: 'Group IT Director', site: 'Paris HQ', recurringIssue: 'Executive floor WAN resilience' },
    { name: 'Matteo Girard', role: 'Regional Hotel Ops', site: 'Bordeaux Suites', recurringIssue: 'Conference Wi-Fi demand spikes' },
    { name: 'Dina Rahal', role: 'Front Office Systems', site: 'Marseille Harbour', recurringIssue: 'Reservation desk device handoff' },
  ],
  incidents: [
    { title: 'WAN instability affecting reservation desks', source: 'ServiceNow', priority: 'Critical', status: 'In Progress', updatedAt: '2 min ago' },
    { title: 'VIP conference wing Wi-Fi degradation', source: 'Zendesk', priority: 'High', status: 'Resolved', updatedAt: '18 min ago' },
    { title: 'Edge firewall policy drift', source: 'Jira Service Management', priority: 'Medium', status: 'Triaged', updatedAt: '43 min ago' },
  ],
  history: [
    { date: 'Today', label: 'Critical carrier incident', detail: 'Field intervention KOH-219 opened and linked to SN-88421.' },
    { date: 'Yesterday', label: 'Boarding room network audit', detail: 'Preventive maintenance completed, score improved from 88 to 94.' },
    { date: 'Last week', label: 'White-label portal preview', detail: 'Orbital Hospitality tenant demo delivered to CIO and service lead.' },
  ],
};

export const clientPortfolio = [
  { name: 'Orbital Hospitality Group', health: '92 / 100', mrr: 'EUR 38.4k', sites: '12 sites', tone: 'success' },
  { name: 'Alpine Hotels', health: '88 / 100', mrr: 'EUR 24.2k', sites: '7 sites', tone: 'warning' },
  { name: 'Veridian Retail', health: '81 / 100', mrr: 'EUR 31.9k', sites: '26 sites', tone: 'danger' },
];

export const portalThemes: PortalTheme[] = [
  {
    id: 'orbital',
    tenantName: 'Orbital Hospitality Workspace',
    logoLabel: 'OH',
    accent: '#5be4ff',
    accentSoft: 'rgba(91, 228, 255, 0.14)',
    glow: 'rgba(91, 228, 255, 0.30)',
    headline: 'Executive visibility for premium hospitality infrastructure.',
    stats: [
      { label: 'Open tickets', value: '12', note: '4 high priority' },
      { label: 'Interventions this week', value: '18', note: '6 preventive' },
      { label: 'Network score', value: '94', note: 'rolling 30-day score' },
    ],
    tickets: [
      { id: 'OH-183', title: 'Reservation desks failover readiness', status: 'In Progress', source: 'ServiceNow' },
      { id: 'OH-171', title: 'Executive lounge Wi-Fi tuning', status: 'Resolved', source: 'Zendesk' },
    ],
    reports: [
      { title: 'Paris HQ WAN stabilization report', date: 'Today', engineer: 'Maya Chen' },
      { title: 'Bordeaux conference RF audit', date: 'Yesterday', engineer: 'Romain N’Doye' },
    ],
    incidents: [
      { site: 'Paris HQ', level: 'Critical', note: 'Carrier instability still monitored' },
      { site: 'Marseille Harbour', level: 'Watch', note: 'Packet loss elevated after 08:00' },
    ],
  },
  {
    id: 'veridian',
    tenantName: 'Veridian Retail Control Room',
    logoLabel: 'VR',
    accent: '#7ac4ff',
    accentSoft: 'rgba(122, 196, 255, 0.14)',
    glow: 'rgba(122, 196, 255, 0.30)',
    headline: 'Multi-store incident oversight with retail lane health and field dispatch.',
    stats: [
      { label: 'Open tickets', value: '27', note: '9 store operations' },
      { label: 'Interventions this week', value: '34', note: '11 network-related' },
      { label: 'Network score', value: '81', note: 'rolling 30-day score' },
    ],
    tickets: [
      { id: 'VR-802', title: 'PoS instability on Lille flagship', status: 'Triaged', source: 'Jira Service Management' },
      { id: 'VR-776', title: 'Camera uplink saturation', status: 'Waiting Vendor', source: 'Zendesk' },
    ],
    reports: [
      { title: 'Lille store switching review', date: 'Today', engineer: 'Lea Rousseau' },
      { title: 'Rouen failover drill', date: 'Monday', engineer: 'Clara Joubert' },
    ],
    incidents: [
      { site: 'Lille Mega Store', level: 'Critical', note: 'Payment queue latency ongoing' },
      { site: 'Rouen Flagship', level: 'Stable', note: 'Recovered after switch replacement' },
    ],
  },
  {
    id: 'northline',
    tenantName: 'Northline Freight Ops Surface',
    logoLabel: 'NF',
    accent: '#89f0d0',
    accentSoft: 'rgba(137, 240, 208, 0.14)',
    glow: 'rgba(137, 240, 208, 0.30)',
    headline: 'Warehouse uptime oversight with carrier visibility and intervention history.',
    stats: [
      { label: 'Open tickets', value: '8', note: '1 critical' },
      { label: 'Interventions this week', value: '9', note: '2 infrastructure' },
      { label: 'Network score', value: '96', note: 'rolling 30-day score' },
    ],
    tickets: [
      { id: 'NF-221', title: 'Scanner roaming investigation', status: 'In Progress', source: 'Freshservice' },
      { id: 'NF-218', title: 'Dock camera route cleanup', status: 'Resolved', source: 'ServiceNow' },
    ],
    reports: [
      { title: 'Madrid warehouse RF sweep', date: 'Tuesday', engineer: 'Amir Dahan' },
      { title: 'Antwerp edge hardening review', date: 'Last week', engineer: 'Clara Joubert' },
    ],
    incidents: [
      { site: 'Madrid Warehouse', level: 'Watch', note: 'Intermittent roaming spikes at dock gates' },
      { site: 'Antwerp Hub', level: 'Stable', note: 'No active escalations' },
    ],
  },
];

export const adminMetrics = [
  { label: 'Managed tenants', value: '14', detail: 'Potential white-label workspaces on deck.', trend: '3 ready for pilot', tone: 'info', spark: [5, 6, 7, 9, 11, 12, 14] },
  { label: 'Connector templates', value: '9', detail: 'Reusable mappings by vertical and ITSM source.', trend: 'Hospitality, retail, logistics', tone: 'success', spark: [2, 3, 4, 5, 6, 8, 9] },
  { label: 'Sync logs / hour', value: '1.8k', detail: 'Mock throughput for orchestration observability.', trend: '97.2% success rate', tone: 'warning', spark: [140, 180, 205, 233, 251, 278, 310] },
  { label: 'Brand packs', value: '6', detail: 'White-label identity kits prepared.', trend: '2 hospitality, 3 retail, 1 logistics', tone: 'neutral', spark: [1, 2, 2, 3, 4, 5, 6] },
];

export const adminLogs: AdminLog[] = [
  { timestamp: '09:14', connector: 'Zendesk', status: 'Success', message: 'Delta sync completed for Orbital Hospitality tenant in 1.8s.' },
  { timestamp: '09:06', connector: 'ServiceNow', status: 'Warning', message: 'CMDB enrichment mocked but awaiting per-tenant field mapping.' },
  { timestamp: '08:58', connector: 'Jira Service Management', status: 'Success', message: 'Pilot tenant queue normalization finished with 312 records.' },
  { timestamp: '08:45', connector: 'Freshservice', status: 'Info', message: 'White-label preview feed refreshed for Northline Freight workspace.' },
];

export const adminTenants = [
  { name: 'Orbital Hospitality', branding: 'Live preview', connectors: 'Zendesk + ServiceNow', status: 'Pilot ready' },
  { name: 'Veridian Retail', branding: 'Approved kit', connectors: 'JSM + Zendesk', status: 'Design sign-off' },
  { name: 'Northline Freight', branding: 'Draft', connectors: 'Freshservice', status: 'Mock only' },
];

export const adminEngineers = [
  { name: 'Maya Chen', region: 'Paris cluster', skill: 'WAN / Core', load: '82%' },
  { name: 'Romain N’Doye', region: 'Lyon cluster', skill: 'Wi-Fi / Hospitality', load: '76%' },
  { name: 'Lea Rousseau', region: 'North cluster', skill: 'Retail networks', load: '88%' },
  { name: 'Amir Dahan', region: 'Central reserve', skill: 'VIP user support', load: '61%' },
];

export const adminSites = [
  { client: 'Orbital Hospitality', site: 'Paris HQ', connectorState: 'ServiceNow linked', brandState: 'Tenant live' },
  { client: 'Alpine Hotels', site: 'Lyon Riverside', connectorState: 'Zendesk linked', brandState: 'Tenant preview' },
  { client: 'Veridian Retail', site: 'Lille Mega Store', connectorState: 'JSM linked', brandState: 'Tenant draft' },
];
