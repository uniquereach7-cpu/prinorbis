/*
 * All site copy lives here so it can be edited without touching layout code.
 * Voice rules: verbs first, sentence case, no invented numbers, no em dashes.
 */

export const site = {
  name: "Prinorbis",
  legalName: "Prinorbis Technologies",
  line: "Move first.",
  descriptor: "AI strategy, agents and delivery.",
  description:
    "Prinorbis helps mid-sized businesses move first on AI: consulting-grade strategy, business process reimagination and agents that ship into real workflows.",
};

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/agentic-cfo", label: "Agentic CFO" },
  { href: "/#industries", label: "Industries" },
  { href: "/about", label: "About" },
];

export type StageId = "discover" | "prove" | "launch" | "orbit";

export type Stage = {
  id: StageId;
  code: string;
  name: string;
  formal: string;
  headline: string;
  summary: string;
  offerings: { name: string; detail: string }[];
  leaveWith: string;
  exit: string;
};

export const stages: Stage[] = [
  {
    id: "discover",
    code: "01",
    name: "Discover",
    formal: "Assessment",
    headline: "Find where AI pays back first.",
    summary:
      "We map your operating model, check the health of the processes underneath it, and choose the first point worth building.",
    offerings: [
      {
        name: "AI opportunity assessment",
        detail: "A structured look across functions to find the use cases with real payback, ranked by value and effort.",
      },
      {
        name: "Company health assessment",
        detail: "Where the business leaks time and money today, so AI goes where it moves the P&L.",
      },
      {
        name: "Agentic hotspot identification",
        detail: "The workflows where an agent, not a dashboard, is the right answer.",
      },
      {
        name: "Future-state roadmap",
        detail: "A sequenced plan from the first use case to the operating model you are building toward.",
      },
    ],
    leaveWith: "A ranked set of use cases and a business case for the first one.",
    exit: "You pick the first point, or decide AI is not the answer yet.",
  },
  {
    id: "prove",
    code: "02",
    name: "Prove",
    formal: "Design and proof of concept",
    headline: "Prove it on your own data.",
    summary:
      "We redesign the process around the use case, get the data ready, pick the technology, and build a working proof measured against the business case.",
    offerings: [
      {
        name: "Business process reimagination",
        detail: "We redesign how the work gets done, not just which tool does it.",
      },
      {
        name: "AI-ready data strategy",
        detail: "The data foundations the use case needs, and a plan for the ones that come after it.",
      },
      {
        name: "Technology evaluation",
        detail: "Build, buy or extend: an independent view of the options against your stack and budget.",
      },
      {
        name: "Proof of concept",
        detail: "One use case, built quickly on real data, with the measures agreed up front.",
      },
    ],
    leaveWith: "A working proof of concept and a clear go or no-go decision.",
    exit: "The proof meets the measures in the business case.",
  },
  {
    id: "launch",
    code: "03",
    name: "Launch",
    formal: "Implementation and support",
    headline: "Ship it into production.",
    summary:
      "Agents and integrations go live inside real workflows, connected to your systems and owned by your teams, with support from us.",
    offerings: [
      {
        name: "Implementation",
        detail: "Production build of the solution, including Orbis Agents where they fit.",
      },
      {
        name: "Systems integration",
        detail: "Connected to the ledgers, CRMs and tools your people already use.",
      },
      {
        name: "Adoption and change",
        detail: "Training, new ways of working and clear owners, so the system is used after we step back.",
      },
      {
        name: "Ongoing support",
        detail: "Monitoring, fixes and improvements once it is live.",
      },
    ],
    leaveWith: "AI in production, connected to your systems and teams.",
    exit: "It runs in the business without us in the loop.",
  },
  {
    id: "orbit",
    code: "04",
    name: "Orbit",
    formal: "Value realisation",
    headline: "Grow the value.",
    summary:
      "We track outcomes against the business case, extend to adjacent processes, and keep the system healthy as the business changes.",
    offerings: [
      {
        name: "Value realisation",
        detail: "Outcomes tracked against the business case, reported in the language of your P&L.",
      },
      {
        name: "Forecasting and scenario analysis",
        detail: "Forward-looking views that help leaders decide where to go next.",
      },
      {
        name: "Roadmap extension",
        detail: "The next use cases, chosen on evidence from the first ones.",
      },
    ],
    leaveWith: "A living roadmap and value that compounds across functions.",
    exit: "There is no exit. This is where the value keeps coming from.",
  },
];

export const pillars = [
  {
    code: "01",
    title: "Move first",
    body: "Speed with a method behind it. Short paths from question to working system, with a defined exit at every stage.",
  },
  {
    code: "02",
    title: "Built, not slideware",
    body: "Every engagement ends in something that runs. When a workflow needs an agent, we bring Orbis Agents built for it.",
  },
  {
    code: "03",
    title: "Senior in the room",
    body: "Consulting rigour from people who have run large AI and data programmes across the US, UK and India.",
  },
];

export type AgentStatus = "Early access" | "In development";

export const orbisAgents: {
  id: string;
  name: string;
  status: AgentStatus;
  body: string;
  href?: string;
}[] = [
  {
    id: "AGENT.CFO",
    name: "Agentic CFO",
    status: "Early access",
    body: "A suite of agents for the finance back office: accounting, payables and receivables, reconciliation, close and forecasting. Exceptions go to your team.",
    href: "/agentic-cfo",
  },
  {
    id: "AGENT.CRO",
    name: "Agentic CRO",
    status: "In development",
    body: "Keeps the revenue engine clean: pipeline hygiene, deal risk signals and forecast inputs your sales leaders can trust.",
  },
  {
    id: "AGENT.INSURE",
    name: "Agentic Insure",
    status: "In development",
    body: "Watches exposure: checks policies and risk against what the business is doing, and flags what needs a human decision.",
  },
];

export const cfoSuite = [
  {
    id: "CFO/ACCT",
    name: "Accounting agent",
    short: "Accounting",
    tasks: [
      "Codes transactions and drafts journal entries",
      "Keeps sub-ledgers in step with the general ledger",
      "Flags entries that break your policies",
    ],
    handsOff: "Reconciliation",
  },
  {
    id: "CFO/APAR",
    name: "AP and AR agent",
    short: "AP / AR",
    tasks: [
      "Reads invoices and matches them to POs and receipts",
      "Follows up with customers who have not paid, in your tone",
      "Routes exceptions to the right approver",
    ],
    handsOff: "Accounting",
  },
  {
    id: "CFO/RECON",
    name: "Reconciliation agent",
    short: "Reconciliation",
    tasks: [
      "Matches bank, card and intercompany lines",
      "Explains breaks instead of just listing them",
      "Keeps a trail of every match it makes",
    ],
    handsOff: "Close",
  },
  {
    id: "CFO/CLOSE",
    name: "Close agent",
    short: "Close",
    tasks: [
      "Runs the close checklist and tracks owners",
      "Drafts accruals and variance commentary",
      "Shows what is blocking sign-off, and who can clear it",
    ],
    handsOff: "Forecasting",
  },
  {
    id: "CFO/FCST",
    name: "Forecasting agent",
    short: "Forecasting",
    tasks: [
      "Refreshes the cash-flow forecast as actuals land",
      "Runs scenarios when you ask a what-if",
      "Explains what changed since the last version",
    ],
    handsOff: "Your team",
  },
];

export const consoleLines: { agent: string; text: string; handoff?: boolean }[] = [
  { agent: "agent.cfo/apar", text: "invoice matched to PO and goods receipt · queued for approval" },
  { agent: "agent.cfo/apar", text: "handoff → agent.cfo/acct", handoff: true },
  { agent: "agent.cfo/acct", text: "journal drafted · within policy · posted after controller approval" },
  { agent: "agent.cfo/recon", text: "bank lines matched · 2 breaks explained · 1 sent to treasury" },
  { agent: "agent.cfo/recon", text: "handoff → agent.cfo/close", handoff: true },
  { agent: "agent.cfo/close", text: "checklist updated · accrual draft ready for review" },
  { agent: "agent.cfo/fcst", text: "cash-flow forecast refreshed · variance note attached" },
];

export const industries = [
  {
    code: "01",
    name: "Healthcare & life sciences",
    uses: [
      "Claims and revenue-cycle reconciliation",
      "Supplier invoice matching across sites",
      "Demand and capacity scenarios",
    ],
  },
  {
    code: "02",
    name: "Manufacturing",
    uses: [
      "Three-way match on POs, receipts and invoices",
      "Explaining cost and inventory variances",
      "Cash forecasting against the production plan",
    ],
  },
  {
    code: "03",
    name: "CPG",
    uses: [
      "Trade spend and deductions reconciliation",
      "Distributor collections follow-up",
      "Promotion and demand scenarios",
    ],
  },
  {
    code: "04",
    name: "Communications & media",
    uses: [
      "Rights and royalty reconciliation",
      "Subscription revenue close",
      "Advertising revenue forecast inputs",
    ],
  },
  {
    code: "05",
    name: "Real estate",
    uses: [
      "Lease and rent-roll reconciliation",
      "Tenant receivables follow-up",
      "Portfolio cash-flow scenarios",
    ],
  },
  {
    code: "06",
    name: "Software & gaming",
    uses: [
      "Usage-based billing reconciliation",
      "Deferred revenue close tasks",
      "Bookings and cash forecasting",
    ],
  },
];

export const briefOptions = {
  functions: [
    "Finance",
    "Revenue and sales",
    "Operations",
    "Risk and insurance",
    "Technology",
    "Executive leadership",
  ],
  industries: industries.map((i) => i.name).concat("Something else"),
  maturity: [
    { value: "exploring", label: "Exploring what AI could do", stage: "discover" as StageId },
    { value: "piloting", label: "Running a pilot", stage: "prove" as StageId },
    { value: "scaling", label: "Ready to put AI in production", stage: "launch" as StageId },
    { value: "live", label: "Live, and want more value from it", stage: "orbit" as StageId },
  ],
};

export const cfoFaqs = [
  {
    q: "Is Agentic CFO available today?",
    a: "Not yet. It is in development, and we are working with a small group of early access partners to shape the first release. We will be plain with you about what is ready and what is not.",
  },
  {
    q: "Do we need to replace our ERP or accounting system?",
    a: "No. The agents are designed to work alongside the systems you already run. Exactly which systems we connect to is scoped with you during Discover.",
  },
  {
    q: "Who is in control of what the agents do?",
    a: "Your team. Agents propose and prepare; your people approve anything that posts, pays or goes to a customer. Rules, thresholds and approval chains follow your policies.",
  },
  {
    q: "What if we are not ready for agents?",
    a: "Then we start at Discover. Plenty of finance teams need cleaner processes and data before an agent pays back, and that work is valuable on its own.",
  },
  {
    q: "What does early access involve?",
    a: "A short conversation about your finance workflows, then a say in which agent we pilot with you first. There is no commitment to buy.",
  },
];

export const team = [
  {
    initials: "PN",
    name: "Partner name",
    role: "Founder and managing partner",
    bio: "Placeholder: prior firms, programmes led and markets served. Supply a photo and two lines of bio.",
  },
  {
    initials: "PN",
    name: "Partner name",
    role: "Partner, AI and data",
    bio: "Placeholder: prior firms, programmes led and markets served. Supply a photo and two lines of bio.",
  },
  {
    initials: "PN",
    name: "Partner name",
    role: "Partner, finance transformation",
    bio: "Placeholder: prior firms, programmes led and markets served. Supply a photo and two lines of bio.",
  },
];
