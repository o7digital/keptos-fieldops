export type Locale = 'fr' | 'en' | 'es' | 'de';
export type PageKey = 'dashboard' | 'operations' | 'tickets' | 'connectors' | 'clients' | 'portal' | 'admin';

export const locales: Locale[] = ['fr', 'en', 'es', 'de'];
export const defaultLocale: Locale = 'fr';

export const pageSegments: Record<PageKey, string> = {
  dashboard: '/dashboard',
  operations: '/operations',
  tickets: '/tickets',
  connectors: '/connectors',
  clients: '/clients',
  portal: '/portal',
  admin: '/admin',
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && locales.includes(value as Locale);
}

export function getLocaleStaticPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}

export function getPagePath(locale: Locale, page: PageKey) {
  return `/${locale}${pageSegments[page]}`;
}

export function getLocaleHome(locale: Locale) {
  return `/${locale}/dashboard`;
}

const copyByLocale = {
  en: {
    localeLabel: 'Language',
    localeNames: {
      fr: 'FR',
      en: 'EN',
      es: 'ES',
      de: 'DE',
    },
    toneLabels: {
      neutral: 'neutral',
      info: 'live',
      success: 'stable',
      warning: 'watch',
      danger: 'critical',
    },
    layout: {
      appName: 'Keptos Operations Hub',
      appTagline: 'Premium orchestration surface',
      showcaseEyebrow: 'Why it feels premium',
      showcaseTitle: 'A control plane designed above the helpdesk layer.',
      showcaseCopy:
        'The product presents itself as a central orchestration cockpit, capable of absorbing Zendesk, Jira Service Management, ServiceNow, and Freshservice without looking like any of them.',
      cockpitLabel: 'Cockpit',
      workspaceSignalsLabel: 'Workspace signals',
      designPreview: 'Design preview',
      mockDataOnly: 'Mock data only',
      navigation: {
        dashboard: { label: 'Executive', hint: 'Central cockpit' },
        operations: { label: 'Field Ops', hint: 'Mission control' },
        tickets: { label: 'Unified Tickets', hint: 'Multi-source queue' },
        connectors: { label: 'Connectors', hint: 'Sync fabric' },
        clients: { label: 'Client 360', hint: 'Account intelligence' },
        portal: { label: 'White-label', hint: 'Tenant preview' },
        admin: { label: 'Admin', hint: 'Control plane' },
      },
      workspaceSignals: [
        { label: 'Orbit status', value: 'All regions online' },
        { label: 'Platform tier', value: 'Enterprise orchestration' },
        { label: 'Surface', value: 'Keptos Operations Hub' },
      ],
    },
    components: {
      mission: {
        checkIn: 'Check-in',
        checkOut: 'Check-out',
        missionProgress: 'Mission progress',
        missionTimeline: 'Mission timeline',
        interventionReportDraft: 'Intervention report draft',
        summary: 'Summary',
        diagnosis: 'Diagnosis',
        material: 'Material',
        impactedUsers: 'Impacted users',
        internetReporting: 'Internet reporting',
        downlink: 'Downlink',
        uplink: 'Uplink',
        ping: 'Ping',
        packetLoss: 'Packet loss',
      },
      tickets: {
        all: 'All',
        search: 'Search',
        searchPlaceholder: 'Client, site, engineer, intervention',
        columns: {
          id: 'ID',
          source: 'Source',
          client: 'Client',
          site: 'Site',
          priority: 'Priority',
          status: 'Status',
          engineer: 'Engineer',
          intervention: 'Intervention linked',
          updated: 'Last update',
        },
      },
      portal: {
        whiteLabelReady: 'White-label ready',
        clientFacing: 'Client-facing',
        clientTickets: 'Client tickets',
        reports: 'Reports',
        incidents: 'Incidents',
        whyMatters: 'Why this matters',
        whyMattersCopy:
          'Keptos can present the same premium orchestration platform as its own service surface, while preserving a differentiated identity for each client workspace.',
      },
    },
    pages: {
      dashboard: {
        title: 'Executive Dashboard',
        description:
          'Premium command center for incident pressure, field execution, and client-facing service quality across the entire Keptos managed estate.',
        eyebrow: 'Executive command',
        actions: {
          primary: 'Open field ops',
          secondary: 'Unified queue',
        },
        heroEyebrow: 'Orchestration above the helpdesk layer',
        heroTitle:
          'A serious control cockpit for enterprise infogérance, not a repainted ticketing tool.',
        heroCopy:
          'Keptos Operations Hub consolidates dispatch, network oversight, and multi-platform ticket intake into one premium operational surface designed to feel strategic from the first screen.',
        heroChips: ['34 interventions live today', '4 ticket sources normalized', '11 engineers currently on site'],
        heroMini: [
          {
            label: 'SLA posture',
            value: '7',
            copy: 'breaches or near-breaches under active review',
          },
          {
            label: 'Normalized signals',
            value: '38.4k',
            copy: 'events and records synchronized in the last 24 hours',
          },
        ],
        networkScoreTitle: 'Network command score',
        networkScoreHeading: 'Estate health remains premium-grade despite live carrier pressure.',
        healthScore: 'health score',
        telemetryLabels: ['Critical sites', 'Average response', 'Check-ins validated', 'WAN escalations'],
        recentActivityTitle: 'Recent activity',
        recentActivityHeading: 'The operational timeline reads like a premium command log.',
        recentActivityCopy:
          'Every escalation, connector sync, and field update is surfaced with enough context to brief management without opening another tool.',
        sourcePulseTitle: 'Source pulse',
        sourcePulseHeading: 'Multi-ITSM intake remains readable and executive-friendly.',
        sourceOpenSuffix: 'open incidents',
        sourceCriticalSuffix: 'critical items currently demanding orchestration attention.',
        medianResponse: 'Median response',
        sitesTitle: 'Sites under surveillance',
        sitesHeading: 'Every monitored site is framed as an operational asset, not just a ticket origin.',
        latency: 'Latency',
        loss: 'Loss',
        utilization: 'Utilization',
        momentumTitle: 'Client momentum',
        momentumHeading: 'Accounts with the highest operational intensity today.',
        momentumIndex: 'Service quality index',
      },
      operations: {
        title: 'Field Operations',
        description:
          'Mission control for interventions, engineer activity, check-in validation, intervention reporting, and network diagnostics in one unified operational surface.',
        eyebrow: 'Field orchestration',
        actions: {
          primary: 'Inspect connectors',
          secondary: 'Link ticket',
        },
        heroEyebrow: 'Dispatch and execution',
        heroTitle:
          'A mission cockpit that treats check-in, reporting, and internet health as one continuous field workflow.',
        heroCopy:
          'Engineers can be tracked, missions can be closed, and customer-facing reports can be prepared from the same orchestration view without dropping into a backend system.',
        heroMini: [
          { label: 'Check-in status', value: '100%', copy: 'all active on-site interventions validated' },
          { label: 'Report cadence', value: '5', copy: 'closure reports still pending approval or PDF export' },
        ],
        sequenceTitle: 'Operational sequence',
        sequenceHeading: 'Check-in, diagnose, restore, report, synchronize.',
        sequenceSteps: [
          {
            title: '1. Mission activation',
            copy: 'Engineer assignment, ETA, and intervention context are prepared before departure.',
          },
          {
            title: '2. Check-in / check-out',
            copy: 'Timestamp validation and GPS placeholder support future mobile workflows without blocking the current demo.',
          },
          {
            title: '3. Intervention report',
            copy: 'Diagnosis, probable cause, actions performed, impacted users, and material context are captured in a structured draft.',
          },
          {
            title: '4. Internet reporting',
            copy: 'Downlink, uplink, ping, packet loss, and health scoring live beside the mission timeline.',
          },
        ],
        missionControlTitle: 'Mission control',
        missionControlHeading: 'Operations view with timeline, report draft, and internet telemetry.',
        missionControlCopy:
          'This is the heart of the field product: interventions feel orchestrated, not merely recorded.',
        engineerActivityTitle: 'Engineer activity',
        engineerActivityHeading: 'Live pulse of the field team.',
        lastUpdate: 'Last update',
        closureTitle: 'Closure readiness',
        closureHeading: 'Field data already structured for future PDF and sync pipelines.',
        closureCopy:
          'Even without a real backend yet, the front-end prototype already frames the future product logic: intervention closure, customer validation, and connector synchronization remain first-class concepts.',
        closureSuffix: 'check-in',
        closureOutSuffix: 'check-out',
        futureReadyTitle: 'Future-ready by design',
        futureReadyCopy:
          'GPS validation, customer signature, PDF export, and external ticket synchronization are already anticipated in the interaction model.',
      },
      tickets: {
        title: 'Unified Tickets',
        description:
          'A premium multi-source queue where Zendesk, Jira Service Management, ServiceNow, and Freshservice become one normalized operational stream.',
        eyebrow: 'Multi-ITSM intake',
        actions: {
          primary: 'Dispatch field work',
          secondary: 'Connector health',
        },
        heroEyebrow: 'Beyond the source system',
        heroTitle:
          'Tickets remain native to their platform, but become strategically usable inside one orchestration surface.',
        heroCopy:
          'The hub does not imitate Zendesk. It elevates ticket data into an operational layer that can drive dispatch, supervision, and executive reporting across any ITSM source.',
        heroChips: ['Zendesk connected', 'JSM, ServiceNow, Freshservice ready'],
        hubTitle: 'Normalization hub',
        hubHeading: 'One premium layer in the middle of the ecosystem.',
        hubCoreTitle: 'Keptos Hub',
        hubCoreCopy: 'Normalization, dispatch logic, reporting, and SLA oversight.',
        hubNodes: ['Ticket stream active', 'Project mapping ready', 'CMDB-aware path', 'Tenant-ready preview'],
        sourceIntelligenceTitle: 'Source intelligence',
        sourceIntelligenceHeading:
          'Each badge signals origin without fragmenting the operator experience.',
        sourceOpen: 'open',
        sourceCritical: 'critical items',
        medianResponse: 'median response',
        normalizedQueue: 'Normalized into the central queue',
        superiorTitle: 'Why it feels superior',
        superiorHeading: 'Operators get context, not just rows.',
        superiorCopy:
          'The unified queue is designed to feed dispatch decisions, customer reviews, and account reporting. It presents itself as an orchestration system with ticket awareness, not as another service desk clone.',
        superiorRows: [
          {
            title: 'Source badge preserved',
            copy: 'Each row keeps the upstream origin visible so operators understand the source of truth instantly.',
            meta: 'Zendesk · JSM · ServiceNow · Freshservice',
          },
          {
            title: 'Intervention linkage built in',
            copy: 'Tickets can already be associated with field work, which gives the product a strong managed-services identity.',
            meta: 'Mission-aware queueing',
          },
          {
            title: 'Designed for executive roll-up',
            copy: 'Unified volume, source health, and response lag can be surfaced upstream without switching tools.',
            meta: 'Reporting-grade surface',
          },
        ],
        queueTitle: 'Unified queue',
        queueHeading: 'A polished multi-platform ticket grid ready for demo and product projection.',
      },
      connectors: {
        title: 'Connectors',
        description:
          'Integration fabric preview for Zendesk, Jira Service Management, ServiceNow, and Freshservice with premium visibility into status, sync posture, and white-label readiness.',
        eyebrow: 'Integration fabric',
        actions: {
          primary: 'Control plane',
          secondary: 'Open unified queue',
        },
        heroEyebrow: 'Premium sync layer',
        heroTitle: 'The connector surface is presented like infrastructure, not like a settings page.',
        heroCopy:
          'This page frames Keptos as a platform that can absorb multiple ITSM ecosystems while preserving a coherent enterprise identity and future white-label potential.',
        topologyTitle: 'Connector topology',
        topologyHeading: 'Keptos in the middle, tenant-ready connectors at the edge.',
        topologyCoreTitle: 'Sync fabric',
        topologyCoreCopy: 'Mappings, normalization, sync logs, and white-label connector shells.',
        catalogTitle: 'Connector catalog',
        catalogHeading: 'Every integration is shown like a premium capability module.',
        catalogCallout:
          'The connector surface is ready to support future activation, mapping, and observability flows.',
        latestTitle: 'Latest sync activity',
        latestHeading: 'Operational visibility into the integration fabric.',
      },
      clients: {
        title: 'Client 360',
        description:
          'A premium account intelligence surface combining client profile, sites, users, incidents, interventions, service history, and SLA posture.',
        eyebrow: 'Account intelligence',
        actions: {
          primary: 'Open interventions',
          secondary: 'White-label preview',
        },
        featuredLabel: 'Featured account',
        featuredCopy:
          'account managed through a premium operations layer, with live field context, normalized tickets, and a service posture intended for executive review.',
        healthScore: 'health score',
        stats: ['MRR', 'Renewal', 'Service lead', 'Availability'],
        sitesTitle: 'Client sites',
        sitesHeading: 'Estate view with health, incident density, and next visit context.',
        incidentsTitle: 'Client incidents',
        incidentsHeading: 'Active issues contextualized for account management.',
        incidentColumns: ['Incident', 'Source', 'Priority', 'Status', 'Updated'],
        usersTitle: 'Client users',
        usersHeading: 'Business stakeholders and recurrent operational friction points.',
        historyTitle: 'Service history',
        historyHeading: 'Client narrative prepared for management reviews.',
        linkedTitle: 'Linked interventions',
        linkedHeading: 'Field activity already visible from the account surface.',
        portfolioTitle: 'Portfolio context',
        portfolioHeading: 'Other managed accounts positioned on the same premium scale.',
      },
      portal: {
        title: 'White-label Portal',
        description:
          'Client-facing tenant preview showing how Keptos can package the platform as a premium branded portal for its own customers.',
        eyebrow: 'White-label business layer',
        actions: {
          primary: 'Manage branding',
          secondary: 'Client 360',
        },
        heroEyebrow: 'Monetizable surface',
        heroTitle:
          'Keptos can rent the same premium orchestration layer to each customer under their own brand identity.',
        heroCopy:
          'The white-label view proves the product can become both an internal operations hub and a client-facing service platform, without losing coherence or quality.',
        heroMini: [
          { label: 'Brand packs', value: '6', copy: 'tenant identity kits already prepared for demos' },
          { label: 'Pilot tenants', value: '3', copy: 'workspaces ready to be positioned commercially' },
        ],
        postureTitle: 'Commercial posture',
        postureHeading: 'Each tenant can present the platform as its own premium service layer.',
        switcherTitle: 'Tenant preview switcher',
        switcherHeading: 'A single premium product, multiple identities.',
        switcherCopy:
          'Logos, color accents, dashboard copy, ticket snapshots, reports, and incident posture can all shift per tenant without degrading the premium feel.',
        seesTitle: 'What the client sees',
        seesHeading: 'A calm, executive-friendly portal instead of raw helpdesk noise.',
        seesRows: [
          {
            title: 'Dashboard and service health',
            copy: 'Clients can consume network score, incidents, interventions, and SLA summaries from one controlled surface.',
          },
          {
            title: 'Tickets and reports',
            copy: 'The same premium UI can expose normalized tickets and engineer reports without exposing internal tooling complexity.',
          },
          {
            title: 'Intervention history',
            copy: 'Every on-site mission becomes part of a visible service narrative that reinforces perceived value.',
          },
        ],
        sellsTitle: 'Why this sells',
        sellsHeading:
          'Keptos can position the product as a branded digital service, not just managed support.',
        sellsCopy:
          'That changes the commercial story: the platform becomes part of the offering, strengthens stickiness, and differentiates Keptos from traditional MSP presentations.',
        leverageTitle: 'White-label leverage',
        leverageCopy:
          'A strong client-facing surface increases perceived maturity, supports premium pricing, and opens room for multi-tenant packaging later.',
      },
      admin: {
        title: 'Admin Control Plane',
        description:
          'Internal administration surface for tenants, engineers, managed sites, connector governance, sync visibility, and white-label configuration.',
        eyebrow: 'Internal control plane',
        actions: {
          primary: 'Connector catalog',
          secondary: 'Tenant preview',
        },
        heroEyebrow: 'Operate the platform',
        heroTitle:
          'An internal admin surface that feels like product infrastructure, not back-office clutter.',
        heroCopy:
          'Tenant setup, sync supervision, branding, and operational staffing are represented as clean control layers inside the same premium visual system.',
        connectorPostureTitle: 'Connector posture',
        connectorPostureHeading: 'At-a-glance governance for the integration estate.',
        tenantsTitle: 'Managed tenants',
        tenantsHeading: 'White-label configuration posture.',
        tenantColumns: ['Tenant', 'Branding', 'Connectors', 'Status'],
        logsTitle: 'Synchronization logs',
        logsHeading: 'Mock observability for the integration fabric.',
        engineersTitle: 'Engineer roster',
        engineersHeading: 'Utilization and specialty coverage.',
        engineerColumns: ['Engineer', 'Region', 'Skill', 'Load'],
        sitesTitle: 'Managed sites',
        sitesHeading: 'Connector and tenant state by site.',
        siteColumns: ['Client', 'Site', 'Connector', 'Brand state'],
      },
    },
  },
  fr: {
    localeLabel: 'Langue',
    localeNames: {
      fr: 'FR',
      en: 'EN',
      es: 'ES',
      de: 'DE',
    },
    toneLabels: {
      neutral: 'neutre',
      info: 'live',
      success: 'stable',
      warning: 'surveille',
      danger: 'critique',
    },
    layout: {
      appName: 'Keptos Operations Hub',
      appTagline: "Surface d'orchestration premium",
      showcaseEyebrow: 'Pourquoi ça fait premium',
      showcaseTitle: "Un cockpit conçu au-dessus de la couche helpdesk.",
      showcaseCopy:
        "Le produit se présente comme un cockpit central d'orchestration, capable d'absorber Zendesk, Jira Service Management, ServiceNow et Freshservice sans ressembler à aucun d'eux.",
      cockpitLabel: 'Cockpit',
      workspaceSignalsLabel: 'Signaux workspace',
      designPreview: 'Preview design',
      mockDataOnly: 'Données mock uniquement',
      navigation: {
        dashboard: { label: 'Exécutif', hint: 'Cockpit central' },
        operations: { label: 'Terrain', hint: 'Contrôle mission' },
        tickets: { label: 'Tickets unifiés', hint: 'File multi-source' },
        connectors: { label: 'Connecteurs', hint: 'Tissu de synchro' },
        clients: { label: 'Client 360', hint: 'Intelligence compte' },
        portal: { label: 'White-label', hint: 'Preview tenant' },
        admin: { label: 'Admin', hint: 'Plan de contrôle' },
      },
      workspaceSignals: [
        { label: 'Statut orbite', value: 'Toutes les régions en ligne' },
        { label: 'Niveau plateforme', value: 'Orchestration enterprise' },
        { label: 'Surface', value: 'Keptos Operations Hub' },
      ],
    },
    components: {
      mission: {
        checkIn: 'Check-in',
        checkOut: 'Check-out',
        missionProgress: 'Progression mission',
        missionTimeline: 'Timeline mission',
        interventionReportDraft: "Brouillon de rapport d'intervention",
        summary: 'Résumé',
        diagnosis: 'Diagnostic',
        material: 'Matériel',
        impactedUsers: 'Utilisateurs impactés',
        internetReporting: 'Reporting internet',
        downlink: 'Débit descendant',
        uplink: 'Débit montant',
        ping: 'Ping',
        packetLoss: 'Perte de paquets',
      },
      tickets: {
        all: 'Tous',
        search: 'Recherche',
        searchPlaceholder: 'Client, site, ingénieur, intervention',
        columns: {
          id: 'ID',
          source: 'Source',
          client: 'Client',
          site: 'Site',
          priority: 'Priorité',
          status: 'Statut',
          engineer: 'Ingénieur',
          intervention: 'Intervention liée',
          updated: 'Dernière mise à jour',
        },
      },
      portal: {
        whiteLabelReady: 'White-label prêt',
        clientFacing: 'Côté client',
        clientTickets: 'Tickets client',
        reports: 'Rapports',
        incidents: 'Incidents',
        whyMatters: "Pourquoi c'est important",
        whyMattersCopy:
          "Keptos peut présenter la même plateforme premium d'orchestration comme surface de service propre, tout en gardant une identité différenciée pour chaque workspace client.",
      },
    },
    pages: {
      dashboard: {
        title: 'Dashboard exécutif',
        description:
          "Centre de commandement premium pour la pression incident, l'exécution terrain et la qualité de service côté client sur tout le parc géré par Keptos.",
        eyebrow: 'Commande exécutive',
        actions: {
          primary: 'Ouvrir les opérations',
          secondary: 'File unifiée',
        },
        heroEyebrow: 'Orchestration au-dessus du helpdesk',
        heroTitle:
          "Un cockpit de pilotage sérieux pour l'infogérance enterprise, pas un ticketing repeint.",
        heroCopy:
          "Keptos Operations Hub consolide dispatch, supervision réseau et intake multi-plateforme dans une surface opérationnelle premium pensée pour paraître stratégique dès le premier écran.",
        heroChips: ["34 interventions en direct aujourd'hui", '4 sources ticket normalisées', '11 ingénieurs actuellement sur site'],
        heroMini: [
          {
            label: 'Posture SLA',
            value: '7',
            copy: 'risques ou dépassements en revue active',
          },
          {
            label: 'Signaux normalisés',
            value: '38.4k',
            copy: 'événements et enregistrements synchronisés sur 24h',
          },
        ],
        networkScoreTitle: 'Score de pilotage réseau',
        networkScoreHeading: 'La santé du parc reste premium malgré la pression opérateur en direct.',
        healthScore: 'score santé',
        telemetryLabels: ['Sites critiques', 'Réponse moyenne', 'Check-ins validés', 'Escalades WAN'],
        recentActivityTitle: 'Activité récente',
        recentActivityHeading: 'La timeline opérationnelle se lit comme un journal de commandement premium.',
        recentActivityCopy:
          "Chaque escalade, synchro connecteur et mise à jour terrain est remontée avec assez de contexte pour briefer le management sans ouvrir un autre outil.",
        sourcePulseTitle: 'Pulse des sources',
        sourcePulseHeading: "L'intake multi-ITSM reste lisible et exploitable côté direction.",
        sourceOpenSuffix: 'incidents ouverts',
        sourceCriticalSuffix: "éléments critiques demandant une orchestration immédiate.",
        medianResponse: 'Réponse médiane',
        sitesTitle: 'Sites sous surveillance',
        sitesHeading: "Chaque site est présenté comme un actif opérationnel, pas seulement comme une origine de ticket.",
        latency: 'Latence',
        loss: 'Perte',
        utilization: 'Utilisation',
        momentumTitle: 'Momentum clients',
        momentumHeading: "Comptes ayant l'intensité opérationnelle la plus forte aujourd'hui.",
        momentumIndex: 'Indice qualité de service',
      },
      operations: {
        title: 'Opérations terrain',
        description:
          "Contrôle mission pour les interventions, l'activité ingénieur, la validation check-in, le rapport d'intervention et les diagnostics réseau dans une surface unifiée.",
        eyebrow: 'Orchestration terrain',
        actions: {
          primary: 'Inspecter les connecteurs',
          secondary: 'Lier un ticket',
        },
        heroEyebrow: 'Dispatch et exécution',
        heroTitle:
          'Un cockpit mission qui traite check-in, reporting et santé internet comme un seul workflow terrain continu.',
        heroCopy:
          "Les ingénieurs peuvent être suivis, les missions clôturées et les rapports client préparés depuis la même vue d'orchestration sans tomber dans un backend.",
        heroMini: [
          { label: 'Statut check-in', value: '100%', copy: 'toutes les interventions actives sur site sont validées' },
          { label: 'Cadence rapport', value: '5', copy: 'rapports de clôture encore en attente de validation ou export PDF' },
        ],
        sequenceTitle: 'Séquence opérationnelle',
        sequenceHeading: 'Check-in, diagnostiquer, restaurer, rapporter, synchroniser.',
        sequenceSteps: [
          {
            title: '1. Activation mission',
            copy: "L'affectation ingénieur, l'ETA et le contexte intervention sont préparés avant le départ.",
          },
          {
            title: '2. Check-in / check-out',
            copy: 'La validation temporelle et le placeholder GPS préparent le mobile futur sans bloquer la démo actuelle.',
          },
          {
            title: "3. Rapport d'intervention",
            copy: 'Diagnostic, cause probable, actions, utilisateurs impactés et contexte matériel sont capturés dans un brouillon structuré.',
          },
          {
            title: '4. Reporting internet',
            copy: 'Débit descendant, montant, ping, perte et score santé vivent directement à côté de la timeline mission.',
          },
        ],
        missionControlTitle: 'Contrôle mission',
        missionControlHeading: 'Vue opérations avec timeline, brouillon de rapport et télémétrie internet.',
        missionControlCopy:
          "C'est le coeur du produit terrain : les interventions paraissent orchestrées, pas simplement enregistrées.",
        engineerActivityTitle: 'Activité ingénieur',
        engineerActivityHeading: 'Pulse live de la team terrain.',
        lastUpdate: 'Dernière mise à jour',
        closureTitle: 'Préparation clôture',
        closureHeading: 'Les données terrain sont déjà structurées pour les futurs pipelines PDF et sync.',
        closureCopy:
          "Même sans backend réel, le prototype front prépare déjà la logique produit future : clôture, validation client et synchronisation externe restent des concepts de premier rang.",
        closureSuffix: 'check-in',
        closureOutSuffix: 'check-out',
        futureReadyTitle: 'Pensé pour la suite',
        futureReadyCopy:
          "La validation GPS, la signature client, l'export PDF et la synchronisation ticket externe sont déjà anticipés dans le modèle d'interaction.",
      },
      tickets: {
        title: 'Tickets unifiés',
        description:
          'Une file premium multi-source où Zendesk, Jira Service Management, ServiceNow et Freshservice deviennent un flux opérationnel normalisé.',
        eyebrow: 'Intake multi-ITSM',
        actions: {
          primary: 'Dispatcher le terrain',
          secondary: 'Santé connecteurs',
        },
        heroEyebrow: 'Au-delà du système source',
        heroTitle:
          'Les tickets restent natifs à leur plateforme, mais deviennent stratégiquement exploitables dans une seule surface d’orchestration.',
        heroCopy:
          "Le hub n'imite pas Zendesk. Il élève la donnée ticket dans une couche opérationnelle capable de piloter dispatch, supervision et reporting exécutif quelle que soit la source ITSM.",
        heroChips: ['Zendesk connecté', 'JSM, ServiceNow, Freshservice prêts'],
        hubTitle: 'Hub de normalisation',
        hubHeading: "Une couche premium au centre de l'écosystème.",
        hubCoreTitle: 'Keptos Hub',
        hubCoreCopy: 'Normalisation, logique de dispatch, reporting et supervision SLA.',
        hubNodes: ['Flux tickets actif', 'Mapping projet prêt', 'Parcours CMDB-aware', 'Preview tenant prête'],
        sourceIntelligenceTitle: 'Intelligence source',
        sourceIntelligenceHeading: "Chaque badge signale l'origine sans fragmenter l'expérience opérateur.",
        sourceOpen: 'ouverts',
        sourceCritical: 'éléments critiques',
        medianResponse: 'réponse médiane',
        normalizedQueue: 'Normalisé dans la file centrale',
        superiorTitle: 'Pourquoi ça semble supérieur',
        superiorHeading: 'Les opérateurs obtiennent du contexte, pas seulement des lignes.',
        superiorCopy:
          "La file unifiée est conçue pour alimenter dispatch, revues client et reporting compte. Elle se présente comme un système d'orchestration conscient du ticket, pas comme un clone de service desk.",
        superiorRows: [
          {
            title: 'Badge source conservé',
            copy: "Chaque ligne garde l'origine amont visible pour comprendre instantanément la source de vérité.",
            meta: 'Zendesk · JSM · ServiceNow · Freshservice',
          },
          {
            title: "Lien intervention natif",
            copy: "Les tickets peuvent déjà être associés au terrain, ce qui donne au produit une vraie identité managed services.",
            meta: 'Queue orientée mission',
          },
          {
            title: 'Pensé pour le roll-up exécutif',
            copy: 'Volume unifié, santé des sources et latence de mise à jour remontent sans changer d’outil.',
            meta: 'Surface prête pour le reporting',
          },
        ],
        queueTitle: 'File unifiée',
        queueHeading: 'Une grille ticket multi-plateforme polie, prête pour la démo et la projection produit.',
      },
      connectors: {
        title: 'Connecteurs',
        description:
          'Preview du tissu d’intégration pour Zendesk, Jira Service Management, ServiceNow et Freshservice avec visibilité premium sur statut, sync et readiness white-label.',
        eyebrow: "Tissu d'intégration",
        actions: {
          primary: 'Plan de contrôle',
          secondary: 'Ouvrir la file unifiée',
        },
        heroEyebrow: 'Couche de sync premium',
        heroTitle: 'La surface connecteurs est présentée comme de l’infrastructure, pas comme une page de réglages.',
        heroCopy:
          "Cette page positionne Keptos comme une plateforme capable d’absorber plusieurs écosystèmes ITSM tout en gardant une identité enterprise cohérente et un potentiel white-label.",
        topologyTitle: 'Topologie connecteurs',
        topologyHeading: 'Keptos au centre, connecteurs tenant-ready à la périphérie.',
        topologyCoreTitle: 'Tissu de sync',
        topologyCoreCopy: 'Mappings, normalisation, logs de sync et shells connecteurs white-label.',
        catalogTitle: 'Catalogue connecteurs',
        catalogHeading: 'Chaque intégration est montrée comme un module premium de capacité.',
        catalogCallout:
          "La surface connecteurs est prête pour les futurs flux d'activation, mapping et observabilité.",
        latestTitle: 'Dernière activité de sync',
        latestHeading: "Visibilité opérationnelle sur le tissu d'intégration.",
      },
      clients: {
        title: 'Client 360',
        description:
          'Une surface premium d’intelligence compte combinant fiche client, sites, utilisateurs, incidents, interventions, historique de service et posture SLA.',
        eyebrow: 'Intelligence compte',
        actions: {
          primary: 'Ouvrir les interventions',
          secondary: 'Preview white-label',
        },
        featuredLabel: 'Compte vedette',
        featuredCopy:
          'géré via une couche premium d’opérations, avec contexte terrain live, tickets normalisés et posture de service pensée pour la revue exécutive.',
        healthScore: 'score santé',
        stats: ['MRR', 'Renouvellement', 'Service lead', 'Disponibilité'],
        sitesTitle: 'Sites client',
        sitesHeading: 'Vue parc avec santé, densité incident et prochain passage.',
        incidentsTitle: 'Incidents client',
        incidentsHeading: 'Sujets actifs contextualisés pour le pilotage de compte.',
        incidentColumns: ['Incident', 'Source', 'Priorité', 'Statut', 'Mis à jour'],
        usersTitle: 'Utilisateurs client',
        usersHeading: 'Parties prenantes métier et points de friction récurrents.',
        historyTitle: 'Historique service',
        historyHeading: 'Narratif client prêt pour les revues management.',
        linkedTitle: 'Interventions liées',
        linkedHeading: 'L’activité terrain est déjà visible depuis la surface compte.',
        portfolioTitle: 'Contexte portefeuille',
        portfolioHeading: 'Autres comptes gérés positionnés sur la même échelle premium.',
      },
      portal: {
        title: 'Portail white-label',
        description:
          'Preview tenant côté client montrant comment Keptos peut packager la plateforme comme portail premium brandé pour ses propres clients.',
        eyebrow: 'Couche business white-label',
        actions: {
          primary: 'Gérer le branding',
          secondary: 'Client 360',
        },
        heroEyebrow: 'Surface monétisable',
        heroTitle:
          'Keptos peut louer la même couche premium d’orchestration à chaque client sous sa propre identité de marque.',
        heroCopy:
          'La vue white-label prouve que le produit peut devenir à la fois un hub interne d’opérations et une plateforme client-facing, sans perdre sa cohérence ni sa qualité.',
        heroMini: [
          { label: 'Brand packs', value: '6', copy: 'kits identitaires tenant déjà préparés pour les démos' },
          { label: 'Tenants pilote', value: '3', copy: 'workspaces prêts à être positionnés commercialement' },
        ],
        postureTitle: 'Posture commerciale',
        postureHeading: 'Chaque tenant peut présenter la plateforme comme sa propre couche de service premium.',
        switcherTitle: 'Sélecteur de preview tenant',
        switcherHeading: 'Un produit premium unique, plusieurs identités.',
        switcherCopy:
          'Logos, accents, copie dashboard, tickets, rapports et posture incident peuvent changer par tenant sans dégrader le rendu premium.',
        seesTitle: 'Ce que voit le client',
        seesHeading: 'Un portail calme et exécutif, pas du bruit helpdesk brut.',
        seesRows: [
          {
            title: 'Dashboard et santé de service',
            copy: 'Le client peut consommer score réseau, incidents, interventions et synthèses SLA depuis une surface contrôlée.',
          },
          {
            title: 'Tickets et rapports',
            copy: 'La même UI premium peut exposer tickets normalisés et rapports ingénieur sans révéler la complexité des outils internes.',
          },
          {
            title: "Historique d'interventions",
            copy: 'Chaque mission sur site devient une partie visible du récit de service, ce qui renforce la valeur perçue.',
          },
        ],
        sellsTitle: 'Pourquoi ça se vend',
        sellsHeading:
          'Keptos peut positionner le produit comme un service digital brandé, pas seulement comme du support managé.',
        sellsCopy:
          "Le récit commercial change : la plateforme devient une partie de l'offre, renforce le stickiness et différencie Keptos des présentations MSP classiques.",
        leverageTitle: 'Levier white-label',
        leverageCopy:
          'Une forte surface client-facing augmente la maturité perçue, soutient le pricing premium et ouvre la voie à du multi-tenant ensuite.',
      },
      admin: {
        title: 'Plan de contrôle admin',
        description:
          'Surface interne d’administration pour tenants, ingénieurs, sites gérés, gouvernance connecteurs, visibilité sync et configuration white-label.',
        eyebrow: 'Plan de contrôle interne',
        actions: {
          primary: 'Catalogue connecteurs',
          secondary: 'Preview tenant',
        },
        heroEyebrow: 'Opérer la plateforme',
        heroTitle:
          "Une surface admin interne qui ressemble à de l'infrastructure produit, pas à du back-office brouillon.",
        heroCopy:
          'Setup tenant, supervision sync, branding et staffing opérationnel sont représentés comme des couches de contrôle propres dans le même langage visuel premium.',
        connectorPostureTitle: 'Posture connecteurs',
        connectorPostureHeading: "Gouvernance instantanée du parc d'intégration.",
        tenantsTitle: 'Tenants gérés',
        tenantsHeading: 'Posture de configuration white-label.',
        tenantColumns: ['Tenant', 'Branding', 'Connecteurs', 'Statut'],
        logsTitle: 'Logs de synchronisation',
        logsHeading: "Observabilité mock du tissu d'intégration.",
        engineersTitle: 'Roster ingénieurs',
        engineersHeading: 'Utilisation et couverture des spécialités.',
        engineerColumns: ['Ingénieur', 'Région', 'Compétence', 'Charge'],
        sitesTitle: 'Sites gérés',
        sitesHeading: 'État connecteur et tenant par site.',
        siteColumns: ['Client', 'Site', 'Connecteur', 'État marque'],
      },
    },
  },
  es: {
    localeLabel: 'Idioma',
    localeNames: {
      fr: 'FR',
      en: 'EN',
      es: 'ES',
      de: 'DE',
    },
    toneLabels: {
      neutral: 'neutro',
      info: 'activo',
      success: 'estable',
      warning: 'vigilar',
      danger: 'crítico',
    },
    layout: {
      appName: 'Keptos Operations Hub',
      appTagline: 'Superficie premium de orquestación',
      showcaseEyebrow: 'Por qué se ve premium',
      showcaseTitle: 'Un plano de control diseñado por encima de la capa helpdesk.',
      showcaseCopy:
        'El producto se presenta como un cockpit central de orquestación, capaz de absorber Zendesk, Jira Service Management, ServiceNow y Freshservice sin parecerse a ninguno de ellos.',
      cockpitLabel: 'Cockpit',
      workspaceSignalsLabel: 'Señales del workspace',
      designPreview: 'Preview de diseño',
      mockDataOnly: 'Solo datos mock',
      navigation: {
        dashboard: { label: 'Ejecutivo', hint: 'Cockpit central' },
        operations: { label: 'Campo', hint: 'Control de misión' },
        tickets: { label: 'Tickets unificados', hint: 'Cola multi-fuente' },
        connectors: { label: 'Conectores', hint: 'Malla de sync' },
        clients: { label: 'Cliente 360', hint: 'Inteligencia de cuenta' },
        portal: { label: 'White-label', hint: 'Preview tenant' },
        admin: { label: 'Admin', hint: 'Plano de control' },
      },
      workspaceSignals: [
        { label: 'Estado de órbita', value: 'Todas las regiones en línea' },
        { label: 'Nivel de plataforma', value: 'Orquestación enterprise' },
        { label: 'Superficie', value: 'Keptos Operations Hub' },
      ],
    },
    components: {
      mission: {
        checkIn: 'Check-in',
        checkOut: 'Check-out',
        missionProgress: 'Progreso de misión',
        missionTimeline: 'Timeline de misión',
        interventionReportDraft: 'Borrador del informe de intervención',
        summary: 'Resumen',
        diagnosis: 'Diagnóstico',
        material: 'Material',
        impactedUsers: 'Usuarios impactados',
        internetReporting: 'Reporting de internet',
        downlink: 'Bajada',
        uplink: 'Subida',
        ping: 'Ping',
        packetLoss: 'Pérdida de paquetes',
      },
      tickets: {
        all: 'Todos',
        search: 'Buscar',
        searchPlaceholder: 'Cliente, sitio, ingeniero, intervención',
        columns: {
          id: 'ID',
          source: 'Fuente',
          client: 'Cliente',
          site: 'Sitio',
          priority: 'Prioridad',
          status: 'Estado',
          engineer: 'Ingeniero',
          intervention: 'Intervención vinculada',
          updated: 'Última actualización',
        },
      },
      portal: {
        whiteLabelReady: 'White-label listo',
        clientFacing: 'De cara al cliente',
        clientTickets: 'Tickets del cliente',
        reports: 'Informes',
        incidents: 'Incidentes',
        whyMatters: 'Por qué importa',
        whyMattersCopy:
          'Keptos puede presentar la misma plataforma premium de orquestación como su propia superficie de servicio, preservando una identidad diferenciada para cada workspace cliente.',
      },
    },
    pages: {
      dashboard: {
        title: 'Dashboard ejecutivo',
        description:
          'Centro de mando premium para presión de incidentes, ejecución en campo y calidad de servicio del lado cliente en todo el parque gestionado por Keptos.',
        eyebrow: 'Comando ejecutivo',
        actions: {
          primary: 'Abrir operaciones',
          secondary: 'Cola unificada',
        },
        heroEyebrow: 'Orquestación por encima del helpdesk',
        heroTitle:
          'Un cockpit serio para managed services enterprise, no una herramienta de tickets repintada.',
        heroCopy:
          'Keptos Operations Hub consolida dispatch, supervisión de red e intake multi-plataforma en una superficie operacional premium diseñada para parecer estratégica desde la primera pantalla.',
        heroChips: ['34 intervenciones en vivo hoy', '4 fuentes de tickets normalizadas', '11 ingenieros actualmente en sitio'],
        heroMini: [
          {
            label: 'Postura SLA',
            value: '7',
            copy: 'riesgos o incumplimientos bajo revisión activa',
          },
          {
            label: 'Señales normalizadas',
            value: '38.4k',
            copy: 'eventos y registros sincronizados en las últimas 24h',
          },
        ],
        networkScoreTitle: 'Score de mando de red',
        networkScoreHeading: 'La salud del parque sigue siendo premium pese a la presión del operador.',
        healthScore: 'score de salud',
        telemetryLabels: ['Sitios críticos', 'Respuesta media', 'Check-ins validados', 'Escaladas WAN'],
        recentActivityTitle: 'Actividad reciente',
        recentActivityHeading: 'La timeline operativa se lee como un log de mando premium.',
        recentActivityCopy:
          'Cada escalada, sync de conector y actualización de campo se muestra con suficiente contexto para informar a management sin abrir otra herramienta.',
        sourcePulseTitle: 'Pulso de fuentes',
        sourcePulseHeading: 'El intake multi-ITSM sigue siendo legible y útil para dirección.',
        sourceOpenSuffix: 'incidentes abiertos',
        sourceCriticalSuffix: 'elementos críticos que requieren orquestación inmediata.',
        medianResponse: 'Respuesta mediana',
        sitesTitle: 'Sitios bajo vigilancia',
        sitesHeading: 'Cada sitio se presenta como un activo operacional, no solo como origen de ticket.',
        latency: 'Latencia',
        loss: 'Pérdida',
        utilization: 'Utilización',
        momentumTitle: 'Momentum clientes',
        momentumHeading: 'Cuentas con mayor intensidad operativa hoy.',
        momentumIndex: 'Índice de calidad de servicio',
      },
      operations: {
        title: 'Operaciones de campo',
        description:
          'Control de misión para intervenciones, actividad de ingenieros, validación de check-in, informes y diagnósticos de red en una sola superficie operacional.',
        eyebrow: 'Orquestación de campo',
        actions: {
          primary: 'Inspeccionar conectores',
          secondary: 'Vincular ticket',
        },
        heroEyebrow: 'Dispatch y ejecución',
        heroTitle:
          'Un cockpit de misión que trata check-in, reporting y salud de internet como un único flujo continuo de campo.',
        heroCopy:
          'Los ingenieros pueden seguirse, las misiones cerrarse y los informes al cliente prepararse desde la misma vista de orquestación sin entrar en un backend.',
        heroMini: [
          { label: 'Estado check-in', value: '100%', copy: 'todas las intervenciones activas en sitio validadas' },
          { label: 'Cadencia de informes', value: '5', copy: 'informes de cierre aún pendientes de aprobación o export PDF' },
        ],
        sequenceTitle: 'Secuencia operacional',
        sequenceHeading: 'Check-in, diagnosticar, restaurar, reportar, sincronizar.',
        sequenceSteps: [
          {
            title: '1. Activación de misión',
            copy: 'Asignación del ingeniero, ETA y contexto de intervención preparados antes de la salida.',
          },
          {
            title: '2. Check-in / check-out',
            copy: 'La validación temporal y el placeholder GPS preparan el móvil futuro sin bloquear la demo actual.',
          },
          {
            title: '3. Informe de intervención',
            copy: 'Diagnóstico, causa probable, acciones, usuarios impactados y contexto material se capturan en un borrador estructurado.',
          },
          {
            title: '4. Reporting internet',
            copy: 'Bajada, subida, ping, pérdida y score de salud viven junto a la timeline de misión.',
          },
        ],
        missionControlTitle: 'Control de misión',
        missionControlHeading: 'Vista de operaciones con timeline, borrador de informe y telemetría de internet.',
        missionControlCopy:
          'Este es el corazón del producto de campo: las intervenciones se sienten orquestadas, no simplemente registradas.',
        engineerActivityTitle: 'Actividad de ingenieros',
        engineerActivityHeading: 'Pulso en vivo del equipo de campo.',
        lastUpdate: 'Última actualización',
        closureTitle: 'Preparación de cierre',
        closureHeading: 'Los datos de campo ya están estructurados para futuros pipelines PDF y sync.',
        closureCopy:
          'Incluso sin backend real, el prototipo front ya anticipa la lógica futura: cierre, validación del cliente y sincronización externa siguen siendo conceptos de primer nivel.',
        closureSuffix: 'check-in',
        closureOutSuffix: 'check-out',
        futureReadyTitle: 'Preparado para el futuro',
        futureReadyCopy:
          'La validación GPS, la firma del cliente, la exportación PDF y la sincronización con tickets externos ya están previstas en el modelo de interacción.',
      },
      tickets: {
        title: 'Tickets unificados',
        description:
          'Una cola premium multi-fuente donde Zendesk, Jira Service Management, ServiceNow y Freshservice se convierten en un flujo operacional normalizado.',
        eyebrow: 'Intake multi-ITSM',
        actions: {
          primary: 'Despachar campo',
          secondary: 'Salud conectores',
        },
        heroEyebrow: 'Más allá del sistema origen',
        heroTitle:
          'Los tickets siguen siendo nativos de su plataforma, pero se vuelven estratégicamente utilizables dentro de una sola superficie de orquestación.',
        heroCopy:
          'El hub no imita Zendesk. Eleva los datos de tickets a una capa operacional capaz de dirigir dispatch, supervisión y reporting ejecutivo desde cualquier fuente ITSM.',
        heroChips: ['Zendesk conectado', 'JSM, ServiceNow y Freshservice listos'],
        hubTitle: 'Hub de normalización',
        hubHeading: 'Una capa premium en el centro del ecosistema.',
        hubCoreTitle: 'Keptos Hub',
        hubCoreCopy: 'Normalización, lógica de dispatch, reporting y supervisión SLA.',
        hubNodes: ['Flujo de tickets activo', 'Mapeo de proyecto listo', 'Ruta consciente de CMDB', 'Preview tenant lista'],
        sourceIntelligenceTitle: 'Inteligencia de fuente',
        sourceIntelligenceHeading: 'Cada badge marca el origen sin fragmentar la experiencia del operador.',
        sourceOpen: 'abiertos',
        sourceCritical: 'elementos críticos',
        medianResponse: 'respuesta mediana',
        normalizedQueue: 'Normalizado en la cola central',
        superiorTitle: 'Por qué se siente superior',
        superiorHeading: 'Los operadores obtienen contexto, no solo filas.',
        superiorCopy:
          'La cola unificada está diseñada para alimentar decisiones de dispatch, revisiones cliente y reporting de cuenta. Se presenta como un sistema de orquestación consciente del ticket, no como otro clon de service desk.',
        superiorRows: [
          {
            title: 'Badge de origen preservado',
            copy: 'Cada fila mantiene visible el origen upstream para entender al instante la fuente de verdad.',
            meta: 'Zendesk · JSM · ServiceNow · Freshservice',
          },
          {
            title: 'Vínculo con intervención integrado',
            copy: 'Los tickets ya pueden asociarse con trabajo de campo, lo que da al producto una fuerte identidad managed services.',
            meta: 'Cola orientada a misión',
          },
          {
            title: 'Diseñado para reporting ejecutivo',
            copy: 'Volumen unificado, salud de fuentes y latencia de actualización pueden elevarse sin cambiar de herramienta.',
            meta: 'Superficie lista para reporting',
          },
        ],
        queueTitle: 'Cola unificada',
        queueHeading: 'Una rejilla multi-plataforma pulida, lista para demo y proyección del producto.',
      },
      connectors: {
        title: 'Conectores',
        description:
          'Preview de la malla de integración para Zendesk, Jira Service Management, ServiceNow y Freshservice con visibilidad premium sobre estado, sync y readiness white-label.',
        eyebrow: 'Malla de integración',
        actions: {
          primary: 'Plano de control',
          secondary: 'Abrir cola unificada',
        },
        heroEyebrow: 'Capa premium de sync',
        heroTitle: 'La superficie de conectores se presenta como infraestructura, no como una página de configuración.',
        heroCopy:
          'Esta página posiciona a Keptos como una plataforma capaz de absorber múltiples ecosistemas ITSM manteniendo una identidad enterprise coherente y potencial white-label.',
        topologyTitle: 'Topología de conectores',
        topologyHeading: 'Keptos en el centro, conectores tenant-ready en el borde.',
        topologyCoreTitle: 'Malla de sync',
        topologyCoreCopy: 'Mappings, normalización, logs de sync y shells white-label.',
        catalogTitle: 'Catálogo de conectores',
        catalogHeading: 'Cada integración se muestra como un módulo premium de capacidad.',
        catalogCallout:
          'La superficie de conectores está lista para soportar futuros flujos de activación, mapping y observabilidad.',
        latestTitle: 'Última actividad de sync',
        latestHeading: 'Visibilidad operacional sobre la malla de integración.',
      },
      clients: {
        title: 'Cliente 360',
        description:
          'Una superficie premium de inteligencia de cuenta que combina ficha cliente, sitios, usuarios, incidentes, intervenciones, historial de servicio y postura SLA.',
        eyebrow: 'Inteligencia de cuenta',
        actions: {
          primary: 'Abrir intervenciones',
          secondary: 'Preview white-label',
        },
        featuredLabel: 'Cuenta destacada',
        featuredCopy:
          'gestionada mediante una capa premium de operaciones, con contexto de campo en vivo, tickets normalizados y una postura de servicio pensada para revisión ejecutiva.',
        healthScore: 'score de salud',
        stats: ['MRR', 'Renovación', 'Service lead', 'Disponibilidad'],
        sitesTitle: 'Sitios del cliente',
        sitesHeading: 'Vista de parque con salud, densidad de incidentes y próxima visita.',
        incidentsTitle: 'Incidentes del cliente',
        incidentsHeading: 'Asuntos activos contextualizados para la gestión de la cuenta.',
        incidentColumns: ['Incidente', 'Fuente', 'Prioridad', 'Estado', 'Actualizado'],
        usersTitle: 'Usuarios del cliente',
        usersHeading: 'Stakeholders de negocio y puntos de fricción recurrentes.',
        historyTitle: 'Historial de servicio',
        historyHeading: 'Narrativa cliente preparada para revisiones de management.',
        linkedTitle: 'Intervenciones vinculadas',
        linkedHeading: 'La actividad de campo ya es visible desde la superficie de cuenta.',
        portfolioTitle: 'Contexto de portafolio',
        portfolioHeading: 'Otras cuentas gestionadas posicionadas en la misma escala premium.',
      },
      portal: {
        title: 'Portal white-label',
        description:
          'Preview tenant de cara al cliente mostrando cómo Keptos puede empaquetar la plataforma como portal premium de marca para sus propios clientes.',
        eyebrow: 'Capa de negocio white-label',
        actions: {
          primary: 'Gestionar branding',
          secondary: 'Cliente 360',
        },
        heroEyebrow: 'Superficie monetizable',
        heroTitle:
          'Keptos puede alquilar la misma capa premium de orquestación a cada cliente bajo su propia identidad de marca.',
        heroCopy:
          'La vista white-label demuestra que el producto puede convertirse tanto en un hub interno de operaciones como en una plataforma client-facing, sin perder coherencia ni calidad.',
        heroMini: [
          { label: 'Brand packs', value: '6', copy: 'kits de identidad tenant ya preparados para demos' },
          { label: 'Tenants piloto', value: '3', copy: 'workspaces listos para posicionarse comercialmente' },
        ],
        postureTitle: 'Postura comercial',
        postureHeading: 'Cada tenant puede presentar la plataforma como su propia capa premium de servicio.',
        switcherTitle: 'Selector de preview tenant',
        switcherHeading: 'Un único producto premium, múltiples identidades.',
        switcherCopy:
          'Logos, acentos de color, copy de dashboard, tickets, informes y postura de incidentes pueden cambiar por tenant sin degradar la sensación premium.',
        seesTitle: 'Lo que ve el cliente',
        seesHeading: 'Un portal calmado y ejecutivo en lugar de ruido helpdesk bruto.',
        seesRows: [
          {
            title: 'Dashboard y salud del servicio',
            copy: 'Los clientes pueden consumir score de red, incidentes, intervenciones y resúmenes SLA desde una sola superficie controlada.',
          },
          {
            title: 'Tickets e informes',
            copy: 'La misma UI premium puede exponer tickets normalizados e informes de ingenieros sin revelar la complejidad de las herramientas internas.',
          },
          {
            title: 'Historial de intervenciones',
            copy: 'Cada misión en sitio se convierte en una parte visible de la narrativa del servicio y refuerza el valor percibido.',
          },
        ],
        sellsTitle: 'Por qué se vende',
        sellsHeading:
          'Keptos puede posicionar el producto como un servicio digital de marca, no solo como soporte gestionado.',
        sellsCopy:
          'Eso cambia la historia comercial: la plataforma se convierte en parte de la oferta, refuerza el stickiness y diferencia a Keptos de las presentaciones MSP tradicionales.',
        leverageTitle: 'Palanca white-label',
        leverageCopy:
          'Una fuerte superficie client-facing aumenta la madurez percibida, sostiene el pricing premium y abre espacio para el multi-tenant más adelante.',
      },
      admin: {
        title: 'Plano de control admin',
        description:
          'Superficie interna de administración para tenants, ingenieros, sitios gestionados, gobernanza de conectores, visibilidad de sync y configuración white-label.',
        eyebrow: 'Plano de control interno',
        actions: {
          primary: 'Catálogo de conectores',
          secondary: 'Preview tenant',
        },
        heroEyebrow: 'Operar la plataforma',
        heroTitle:
          'Una superficie admin interna que se siente como infraestructura de producto, no como un back-office desordenado.',
        heroCopy:
          'Setup de tenants, supervisión de sync, branding y staffing operacional se representan como capas de control limpias dentro del mismo sistema visual premium.',
        connectorPostureTitle: 'Postura de conectores',
        connectorPostureHeading: 'Gobernanza inmediata del estate de integración.',
        tenantsTitle: 'Tenants gestionados',
        tenantsHeading: 'Postura de configuración white-label.',
        tenantColumns: ['Tenant', 'Branding', 'Conectores', 'Estado'],
        logsTitle: 'Logs de sincronización',
        logsHeading: 'Observabilidad mock de la malla de integración.',
        engineersTitle: 'Roster de ingenieros',
        engineersHeading: 'Utilización y cobertura de especialidades.',
        engineerColumns: ['Ingeniero', 'Región', 'Skill', 'Carga'],
        sitesTitle: 'Sitios gestionados',
        sitesHeading: 'Estado del conector y del tenant por sitio.',
        siteColumns: ['Cliente', 'Sitio', 'Conector', 'Estado de marca'],
      },
    },
  },
  de: {
    localeLabel: 'Sprache',
    localeNames: {
      fr: 'FR',
      en: 'EN',
      es: 'ES',
      de: 'DE',
    },
    toneLabels: {
      neutral: 'neutral',
      info: 'live',
      success: 'stabil',
      warning: 'beobachten',
      danger: 'kritisch',
    },
    layout: {
      appName: 'Keptos Operations Hub',
      appTagline: 'Premium-Orchestrierungsoberfläche',
      showcaseEyebrow: 'Warum es premium wirkt',
      showcaseTitle: 'Eine Control Plane oberhalb der Helpdesk-Schicht.',
      showcaseCopy:
        'Das Produkt präsentiert sich als zentrales Orchestrierungs-Cockpit, das Zendesk, Jira Service Management, ServiceNow und Freshservice absorbieren kann, ohne wie eines davon auszusehen.',
      cockpitLabel: 'Cockpit',
      workspaceSignalsLabel: 'Workspace-Signale',
      designPreview: 'Design-Vorschau',
      mockDataOnly: 'Nur Mock-Daten',
      navigation: {
        dashboard: { label: 'Executive', hint: 'Zentrales Cockpit' },
        operations: { label: 'Field Ops', hint: 'Missionskontrolle' },
        tickets: { label: 'Unified Tickets', hint: 'Multi-Source-Queue' },
        connectors: { label: 'Connectors', hint: 'Sync-Fabric' },
        clients: { label: 'Client 360', hint: 'Account-Intelligence' },
        portal: { label: 'White-label', hint: 'Tenant-Vorschau' },
        admin: { label: 'Admin', hint: 'Control Plane' },
      },
      workspaceSignals: [
        { label: 'Orbit-Status', value: 'Alle Regionen online' },
        { label: 'Plattform-Level', value: 'Enterprise-Orchestrierung' },
        { label: 'Surface', value: 'Keptos Operations Hub' },
      ],
    },
    components: {
      mission: {
        checkIn: 'Check-in',
        checkOut: 'Check-out',
        missionProgress: 'Missionsfortschritt',
        missionTimeline: 'Missions-Timeline',
        interventionReportDraft: 'Entwurf Einsatzbericht',
        summary: 'Zusammenfassung',
        diagnosis: 'Diagnose',
        material: 'Material',
        impactedUsers: 'Betroffene Nutzer',
        internetReporting: 'Internet-Reporting',
        downlink: 'Downlink',
        uplink: 'Uplink',
        ping: 'Ping',
        packetLoss: 'Paketverlust',
      },
      tickets: {
        all: 'Alle',
        search: 'Suche',
        searchPlaceholder: 'Kunde, Standort, Ingenieur, Einsatz',
        columns: {
          id: 'ID',
          source: 'Quelle',
          client: 'Kunde',
          site: 'Standort',
          priority: 'Priorität',
          status: 'Status',
          engineer: 'Ingenieur',
          intervention: 'Verknüpfter Einsatz',
          updated: 'Letztes Update',
        },
      },
      portal: {
        whiteLabelReady: 'White-label bereit',
        clientFacing: 'Kundenseitig',
        clientTickets: 'Kundentickets',
        reports: 'Berichte',
        incidents: 'Incidents',
        whyMatters: 'Warum das wichtig ist',
        whyMattersCopy:
          'Keptos kann dieselbe Premium-Orchestrierungsplattform als eigene Service-Oberfläche präsentieren und dabei für jeden Kunden-Workspace eine differenzierte Identität bewahren.',
      },
    },
    pages: {
      dashboard: {
        title: 'Executive Dashboard',
        description:
          'Premium-Kommandozentrale für Incident-Druck, Feldeinsatz und kundenseitige Servicequalität über das gesamte von Keptos betreute Estate.',
        eyebrow: 'Executive Command',
        actions: {
          primary: 'Field Ops öffnen',
          secondary: 'Unified Queue',
        },
        heroEyebrow: 'Orchestrierung oberhalb des Helpdesks',
        heroTitle:
          'Ein ernsthaftes Control-Cockpit für Enterprise Managed Services, kein neu lackiertes Ticketsystem.',
        heroCopy:
          'Keptos Operations Hub bündelt Dispatch, Netzwerkaufsicht und Multi-Plattform-Ticket-Ingestion in einer Premium-Oberfläche, die vom ersten Screen an strategisch wirkt.',
        heroChips: ['34 aktive Einsätze heute', '4 normalisierte Ticketquellen', '11 Ingenieure aktuell vor Ort'],
        heroMini: [
          {
            label: 'SLA-Status',
            value: '7',
            copy: 'Verstöße oder Risiken in aktiver Prüfung',
          },
          {
            label: 'Normalisierte Signale',
            value: '38.4k',
            copy: 'Ereignisse und Datensätze in den letzten 24h synchronisiert',
          },
        ],
        networkScoreTitle: 'Netzwerk-Kommando-Score',
        networkScoreHeading: 'Die Estate-Gesundheit bleibt trotz Carrier-Druck auf Premium-Niveau.',
        healthScore: 'Health Score',
        telemetryLabels: ['Kritische Standorte', 'Ø Reaktionszeit', 'Validierte Check-ins', 'WAN-Eskalationen'],
        recentActivityTitle: 'Letzte Aktivität',
        recentActivityHeading: 'Die operative Timeline liest sich wie ein Premium-Kommando-Log.',
        recentActivityCopy:
          'Jede Eskalation, jeder Connector-Sync und jedes Field-Update wird mit genug Kontext angezeigt, um Management zu briefen ohne ein weiteres Tool zu öffnen.',
        sourcePulseTitle: 'Source Pulse',
        sourcePulseHeading: 'Multi-ITSM-Ingestion bleibt lesbar und managementtauglich.',
        sourceOpenSuffix: 'offene Incidents',
        sourceCriticalSuffix: 'kritische Elemente mit akutem Orchestrierungsbedarf.',
        medianResponse: 'Median Reaktionszeit',
        sitesTitle: 'Standorte unter Beobachtung',
        sitesHeading: 'Jeder überwachte Standort wird als operatives Asset dargestellt, nicht nur als Ticket-Ursprung.',
        latency: 'Latenz',
        loss: 'Verlust',
        utilization: 'Auslastung',
        momentumTitle: 'Kundenmomentum',
        momentumHeading: 'Accounts mit der höchsten operativen Intensität heute.',
        momentumIndex: 'Servicequalitätsindex',
      },
      operations: {
        title: 'Field Operations',
        description:
          'Missionskontrolle für Einsätze, Ingenieuraktivität, Check-in-Validierung, Einsatzberichte und Netzwerkdiagnostik in einer einheitlichen operativen Oberfläche.',
        eyebrow: 'Field Orchestration',
        actions: {
          primary: 'Connectors prüfen',
          secondary: 'Ticket verknüpfen',
        },
        heroEyebrow: 'Dispatch und Ausführung',
        heroTitle:
          'Ein Missions-Cockpit, das Check-in, Reporting und Internetgesundheit als einen zusammenhängenden Field-Workflow behandelt.',
        heroCopy:
          'Ingenieure können verfolgt, Missionen geschlossen und kundenfähige Berichte vorbereitet werden, ohne in ein Backend-System zu springen.',
        heroMini: [
          { label: 'Check-in-Status', value: '100%', copy: 'alle aktiven Einsätze vor Ort validiert' },
          { label: 'Report-Takt', value: '5', copy: 'Abschlussberichte noch zur Freigabe oder PDF-Export offen' },
        ],
        sequenceTitle: 'Operative Sequenz',
        sequenceHeading: 'Check-in, diagnostizieren, wiederherstellen, berichten, synchronisieren.',
        sequenceSteps: [
          {
            title: '1. Missionsaktivierung',
            copy: 'Ingenieurzuweisung, ETA und Einsatzkontext werden vor Abfahrt vorbereitet.',
          },
          {
            title: '2. Check-in / check-out',
            copy: 'Zeitvalidierung und GPS-Placeholder bereiten künftige Mobile-Workflows vor, ohne die aktuelle Demo zu blockieren.',
          },
          {
            title: '3. Einsatzbericht',
            copy: 'Diagnose, wahrscheinliche Ursache, Maßnahmen, betroffene Nutzer und Materialkontext werden in einem strukturierten Entwurf erfasst.',
          },
          {
            title: '4. Internet-Reporting',
            copy: 'Downlink, Uplink, Ping, Verlust und Health Score liegen direkt neben der Missions-Timeline.',
          },
        ],
        missionControlTitle: 'Missionskontrolle',
        missionControlHeading: 'Operations-Ansicht mit Timeline, Berichtsentwurf und Internet-Telemetrie.',
        missionControlCopy:
          'Das ist das Herz des Field-Produkts: Einsätze fühlen sich orchestriert an, nicht nur erfasst.',
        engineerActivityTitle: 'Ingenieuraktivität',
        engineerActivityHeading: 'Live-Puls des Field-Teams.',
        lastUpdate: 'Letztes Update',
        closureTitle: 'Abschlussbereitschaft',
        closureHeading: 'Field-Daten sind bereits für künftige PDF- und Sync-Pipelines strukturiert.',
        closureCopy:
          'Auch ohne echtes Backend bildet der Frontend-Prototyp bereits die spätere Produktlogik ab: Abschluss, Kundenvalidierung und externe Synchronisation bleiben erstklassige Konzepte.',
        closureSuffix: 'Check-in',
        closureOutSuffix: 'Check-out',
        futureReadyTitle: 'Future-ready by design',
        futureReadyCopy:
          'GPS-Validierung, Kundensignatur, PDF-Export und externe Ticket-Synchronisierung sind bereits im Interaktionsmodell vorgesehen.',
      },
      tickets: {
        title: 'Unified Tickets',
        description:
          'Eine Premium-Multi-Source-Queue, in der Zendesk, Jira Service Management, ServiceNow und Freshservice zu einem normalisierten operativen Strom werden.',
        eyebrow: 'Multi-ITSM Intake',
        actions: {
          primary: 'Field Work dispatchen',
          secondary: 'Connector-Status',
        },
        heroEyebrow: 'Jenseits des Quellsystems',
        heroTitle:
          'Tickets bleiben nativ in ihrer Plattform, werden aber innerhalb einer einzigen Orchestrierungsoberfläche strategisch nutzbar.',
        heroCopy:
          'Der Hub imitiert Zendesk nicht. Er hebt Ticketdaten in eine operative Schicht, die Dispatch, Aufsicht und Executive Reporting über jede ITSM-Quelle hinweg steuern kann.',
        heroChips: ['Zendesk verbunden', 'JSM, ServiceNow, Freshservice bereit'],
        hubTitle: 'Normalisierungs-Hub',
        hubHeading: 'Eine Premium-Schicht in der Mitte des Ökosystems.',
        hubCoreTitle: 'Keptos Hub',
        hubCoreCopy: 'Normalisierung, Dispatch-Logik, Reporting und SLA-Aufsicht.',
        hubNodes: ['Ticket-Stream aktiv', 'Projekt-Mapping bereit', 'CMDB-bewusster Pfad', 'Tenant-Preview bereit'],
        sourceIntelligenceTitle: 'Source Intelligence',
        sourceIntelligenceHeading: 'Jedes Badge zeigt den Ursprung, ohne die Operator-Erfahrung zu fragmentieren.',
        sourceOpen: 'offen',
        sourceCritical: 'kritische Elemente',
        medianResponse: 'Median-Reaktionszeit',
        normalizedQueue: 'In die zentrale Queue normalisiert',
        superiorTitle: 'Warum es überlegen wirkt',
        superiorHeading: 'Operatoren bekommen Kontext, nicht nur Zeilen.',
        superiorCopy:
          'Die Unified Queue ist darauf ausgelegt, Dispatch-Entscheidungen, Kundenreviews und Account-Reporting zu speisen. Sie wirkt wie ein Orchestrierungssystem mit Ticketbewusstsein, nicht wie ein weiterer Service-Desk-Klon.',
        superiorRows: [
          {
            title: 'Quell-Badge bleibt erhalten',
            copy: 'Jede Zeile behält den Upstream-Ursprung sichtbar, damit Operatoren die Quelle der Wahrheit sofort erkennen.',
            meta: 'Zendesk · JSM · ServiceNow · Freshservice',
          },
          {
            title: 'Einsatz-Verknüpfung eingebaut',
            copy: 'Tickets können bereits mit Field Work verbunden werden, was dem Produkt eine starke Managed-Services-Identität gibt.',
            meta: 'Missionsbewusste Queue',
          },
          {
            title: 'Für Executive Roll-up entworfen',
            copy: 'Unified Volume, Source Health und Update-Lag können ohne Toolwechsel nach oben aggregiert werden.',
            meta: 'Reporting-taugliche Oberfläche',
          },
        ],
        queueTitle: 'Unified Queue',
        queueHeading: 'Ein poliertes Multi-Plattform-Ticket-Grid, bereit für Demo und Produktprojektion.',
      },
      connectors: {
        title: 'Connectors',
        description:
          'Integrations-Fabric-Vorschau für Zendesk, Jira Service Management, ServiceNow und Freshservice mit Premium-Sicht auf Status, Sync-Lage und White-label-Bereitschaft.',
        eyebrow: 'Integrations-Fabric',
        actions: {
          primary: 'Control Plane',
          secondary: 'Unified Queue öffnen',
        },
        heroEyebrow: 'Premium-Sync-Layer',
        heroTitle: 'Die Connector-Oberfläche wird wie Infrastruktur präsentiert, nicht wie eine Einstellungsseite.',
        heroCopy:
          'Diese Seite rahmt Keptos als Plattform, die mehrere ITSM-Ökosysteme absorbieren kann und dabei eine kohärente Enterprise-Identität und künftiges White-label-Potenzial bewahrt.',
        topologyTitle: 'Connector-Topologie',
        topologyHeading: 'Keptos in der Mitte, tenant-ready Connectors am Rand.',
        topologyCoreTitle: 'Sync Fabric',
        topologyCoreCopy: 'Mappings, Normalisierung, Sync-Logs und White-label-Connector-Shells.',
        catalogTitle: 'Connector-Katalog',
        catalogHeading: 'Jede Integration wird wie ein Premium-Fähigkeitsmodul dargestellt.',
        catalogCallout:
          'Die Connector-Oberfläche ist bereit, künftige Aktivierungs-, Mapping- und Observability-Flows zu unterstützen.',
        latestTitle: 'Neueste Sync-Aktivität',
        latestHeading: 'Operative Sichtbarkeit in die Integrations-Fabric.',
      },
      clients: {
        title: 'Client 360',
        description:
          'Eine Premium-Account-Intelligence-Oberfläche, die Kundenprofil, Standorte, Nutzer, Incidents, Einsätze, Servicehistorie und SLA-Lage kombiniert.',
        eyebrow: 'Account Intelligence',
        actions: {
          primary: 'Einsätze öffnen',
          secondary: 'White-label-Vorschau',
        },
        featuredLabel: 'Featured Account',
        featuredCopy:
          'Account, der über eine Premium-Operations-Schicht geführt wird, mit Live-Field-Kontext, normalisierten Tickets und einer für Executive Reviews gedachten Service-Haltung.',
        healthScore: 'Health Score',
        stats: ['MRR', 'Renewal', 'Service Lead', 'Availability'],
        sitesTitle: 'Kundenstandorte',
        sitesHeading: 'Estate-Ansicht mit Health, Incident-Dichte und nächstem Besuch.',
        incidentsTitle: 'Kunden-Incidents',
        incidentsHeading: 'Aktive Themen, kontextualisiert für das Account-Management.',
        incidentColumns: ['Incident', 'Quelle', 'Priorität', 'Status', 'Aktualisiert'],
        usersTitle: 'Kundennutzer',
        usersHeading: 'Business-Stakeholder und wiederkehrende operative Reibungspunkte.',
        historyTitle: 'Servicehistorie',
        historyHeading: 'Kundennarrativ für Management-Reviews vorbereitet.',
        linkedTitle: 'Verknüpfte Einsätze',
        linkedHeading: 'Field-Aktivität ist bereits von der Account-Oberfläche aus sichtbar.',
        portfolioTitle: 'Portfolio-Kontext',
        portfolioHeading: 'Weitere betreute Accounts auf derselben Premium-Skala.',
      },
      portal: {
        title: 'White-label Portal',
        description:
          'Kundenseitige Tenant-Vorschau, die zeigt, wie Keptos die Plattform als Premium-Brand-Portal für eigene Kunden paketieren kann.',
        eyebrow: 'White-label Business Layer',
        actions: {
          primary: 'Branding verwalten',
          secondary: 'Client 360',
        },
        heroEyebrow: 'Monetarisierbare Oberfläche',
        heroTitle:
          'Keptos kann dieselbe Premium-Orchestrierungsschicht an jeden Kunden unter dessen eigener Markenidentität vermieten.',
        heroCopy:
          'Die White-label-Ansicht beweist, dass das Produkt sowohl ein internes Operations-Hub als auch eine client-facing Plattform sein kann, ohne Kohärenz oder Qualität zu verlieren.',
        heroMini: [
          { label: 'Brand Packs', value: '6', copy: 'Tenant-Identity-Kits bereits für Demos vorbereitet' },
          { label: 'Pilot-Tenants', value: '3', copy: 'Workspaces bereit für die kommerzielle Positionierung' },
        ],
        postureTitle: 'Kommerzielle Positionierung',
        postureHeading: 'Jeder Tenant kann die Plattform als eigene Premium-Service-Schicht präsentieren.',
        switcherTitle: 'Tenant-Preview-Switcher',
        switcherHeading: 'Ein einziges Premium-Produkt, mehrere Identitäten.',
        switcherCopy:
          'Logos, Farb-Akzente, Dashboard-Texte, Tickets, Reports und Incident-Lage können je Tenant wechseln, ohne das Premium-Gefühl zu verlieren.',
        seesTitle: 'Was der Kunde sieht',
        seesHeading: 'Ein ruhiges, Executive-freundliches Portal statt rohem Helpdesk-Lärm.',
        seesRows: [
          {
            title: 'Dashboard und Service Health',
            copy: 'Kunden können Netzwerk-Score, Incidents, Einsätze und SLA-Zusammenfassungen aus einer kontrollierten Oberfläche konsumieren.',
          },
          {
            title: 'Tickets und Reports',
            copy: 'Dieselbe Premium-UI kann normalisierte Tickets und Ingenieurberichte zeigen, ohne die Komplexität interner Tools offenzulegen.',
          },
          {
            title: 'Einsatzhistorie',
            copy: 'Jede Vor-Ort-Mission wird Teil einer sichtbaren Service-Erzählung und stärkt den wahrgenommenen Wert.',
          },
        ],
        sellsTitle: 'Warum es verkauft',
        sellsHeading:
          'Keptos kann das Produkt als gebrandeten digitalen Service positionieren, nicht nur als Managed Support.',
        sellsCopy:
          'Das verändert die kommerzielle Story: Die Plattform wird Teil des Angebots, stärkt die Bindung und differenziert Keptos von klassischen MSP-Präsentationen.',
        leverageTitle: 'White-label-Hebel',
        leverageCopy:
          'Eine starke kundenseitige Oberfläche erhöht die wahrgenommene Reife, stützt Premium-Pricing und eröffnet später Raum für Multi-Tenant-Packaging.',
      },
      admin: {
        title: 'Admin Control Plane',
        description:
          'Interne Verwaltungsoberfläche für Tenants, Ingenieure, betreute Standorte, Connector-Governance, Sync-Sichtbarkeit und White-label-Konfiguration.',
        eyebrow: 'Interne Control Plane',
        actions: {
          primary: 'Connector-Katalog',
          secondary: 'Tenant-Vorschau',
        },
        heroEyebrow: 'Die Plattform betreiben',
        heroTitle:
          'Eine interne Admin-Oberfläche, die sich wie Produkt-Infrastruktur anfühlt, nicht wie unaufgeräumtes Backoffice.',
        heroCopy:
          'Tenant-Setup, Sync-Aufsicht, Branding und operatives Staffing werden als saubere Control-Layer innerhalb desselben Premium-Visual-Systems dargestellt.',
        connectorPostureTitle: 'Connector-Lage',
        connectorPostureHeading: 'Auf einen Blick Governance für das Integrations-Estate.',
        tenantsTitle: 'Betreute Tenants',
        tenantsHeading: 'White-label-Konfigurationslage.',
        tenantColumns: ['Tenant', 'Branding', 'Connectors', 'Status'],
        logsTitle: 'Synchronisationslogs',
        logsHeading: 'Mock-Observability für die Integrations-Fabric.',
        engineersTitle: 'Ingenieur-Roster',
        engineersHeading: 'Auslastung und Skill-Abdeckung.',
        engineerColumns: ['Ingenieur', 'Region', 'Skill', 'Load'],
        sitesTitle: 'Betreute Standorte',
        sitesHeading: 'Connector- und Tenant-Status je Standort.',
        siteColumns: ['Kunde', 'Standort', 'Connector', 'Brand-Status'],
      },
    },
  },
} as const;

export function getCopy(locale: Locale) {
  return copyByLocale[locale];
}

export function getToneLabel(locale: Locale, tone: string) {
  const labels = copyByLocale[locale].toneLabels as Record<string, string>;
  return labels[tone] ?? tone;
}
