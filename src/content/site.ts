/*
 * All site copy lives here so it can be edited without touching layout code.
 * Voice rules: verbs first, sentence case, no invented numbers, no em dashes.
 */

export const site = {
  name: "Prinorbis",
  legalName: "Prinorbis Technologies",
  line: "Move first.",
  descriptor: "AI strategy, agents and delivery.",
  idea: "Intelligence that grows into the way your business works.",
  description:
    "Prinorbis helps mid-sized businesses move first on AI: consulting-grade strategy, business process reimagination and agents that ship into real workflows.",
};

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/agents", label: "Orbis Agents" },
  { href: "/industries", label: "Industries" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
];

export type StageId = "discover" | "prove" | "launch" | "orbit";

export type Stage = {
  id: StageId;
  code: string;
  name: string;
  /** The growth metaphor: Seed, Root, Network, Canopy. */
  growth: string;
  growthLine: string;
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
    growth: "Seed",
    growthLine: "Find where AI pays back first. We map your operating model and choose the first point worth planting.",
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
    growth: "Root",
    growthLine: "Prove it on your own data. One use case, built quickly, measured against the business case.",
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
    growth: "Network",
    growthLine: "Ship it into production. Orbis Agents and integrations go live inside real workflows, with support.",
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
    leaveWith: "Agents in production, connected to your systems and teams.",
    exit: "It runs in the business without us in the loop.",
  },
  {
    id: "orbit",
    growth: "Canopy",
    growthLine: "Grow the value. We track outcomes, extend to adjacent processes, and keep the system healthy.",
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

export const crossAgentLines: { agent: string; text: string; handoff?: boolean }[] = [
  { agent: "agent.cro", text: "pipeline reviewed · deal risk flagged for owner" },
  { agent: "agent.cro", text: "handoff → agent.cfo", handoff: true },
  { agent: "agent.cfo", text: "forecast inputs updated · exception sent to controller" },
  { agent: "agent.cfo", text: "handoff → agent.insure", handoff: true },
  { agent: "agent.insure", text: "exposure checked · decision requested from risk lead" },
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

export type Industry = {
  code: string;
  slug: string;
  name: string;
  line: string;
  context: string;
  uses: string[];
  agents: string[];
  start: StageId;
};

export const industries: Industry[] = [
  {
    code: "01",
    slug: "healthcare",
    name: "Healthcare & life sciences",
    line: "Less time reconciling, more time on care and science.",
    context:
      "Multi-site operators and life sciences firms carry heavy back-office load: claims, supplier invoices, capacity planning. Most of it follows rules a well-governed agent can apply.",
    uses: [
      "Claims and revenue-cycle reconciliation",
      "Supplier invoice matching across sites",
      "Demand and capacity scenarios",
    ],
    agents: ["Agentic CFO"],
    start: "discover",
  },
  {
    code: "02",
    slug: "manufacturing",
    name: "Manufacturing",
    line: "Match the paperwork to the plant floor.",
    context:
      "Purchase orders, goods receipts and invoices rarely line up on the first try, and cost variances hide in the gaps. Agents can match, explain and escalate before month-end.",
    uses: [
      "Three-way match on POs, receipts and invoices",
      "Explaining cost and inventory variances",
      "Cash forecasting against the production plan",
    ],
    agents: ["Agentic CFO", "Agentic CRO"],
    start: "prove",
  },
  {
    code: "03",
    slug: "cpg",
    name: "CPG",
    line: "Trade spend you can see, deductions you can close.",
    context:
      "Promotions, distributor deductions and retailer claims create a long tail of reconciliation work. Most of it is pattern matching with a judgement call at the end.",
    uses: [
      "Trade spend and deductions reconciliation",
      "Distributor collections follow-up",
      "Promotion and demand scenarios",
    ],
    agents: ["Agentic CFO", "Agentic CRO"],
    start: "discover",
  },
  {
    code: "04",
    slug: "media",
    name: "Communications & media",
    line: "Rights, royalties and revenue, reconciled.",
    context:
      "Subscription, advertising and rights revenue flow through different systems. Pulling them into one close is where teams lose days every month.",
    uses: [
      "Rights and royalty reconciliation",
      "Subscription revenue close",
      "Advertising revenue forecast inputs",
    ],
    agents: ["Agentic CFO", "Agentic CRO"],
    start: "discover",
  },
  {
    code: "05",
    slug: "real-estate",
    name: "Real estate",
    line: "Every lease, every tenant, every month.",
    context:
      "Portfolios run on rent rolls, leases and tenant receivables that change constantly. Agents keep them in step and flag exposure before it becomes a write-off.",
    uses: [
      "Lease and rent-roll reconciliation",
      "Tenant receivables follow-up",
      "Portfolio cash-flow scenarios",
    ],
    agents: ["Agentic CFO", "Agentic Insure"],
    start: "prove",
  },
  {
    code: "06",
    slug: "software",
    name: "Software & gaming",
    line: "Usage-based revenue without usage-based chaos.",
    context:
      "Usage billing, deferred revenue and bookings move faster than month-end processes were built for. Agents close the gap between product data and the ledger.",
    uses: [
      "Usage-based billing reconciliation",
      "Deferred revenue close tasks",
      "Bookings and cash forecasting",
    ],
    agents: ["Agentic CFO", "Agentic CRO"],
    start: "launch",
  },
];

export type Insight = {
  slug: string;
  title: string;
  dek: string;
  stage: StageId;
  read: string;
  body: string[];
};

/* Draft field notes: to be reviewed and approved by the client before launch. */
export const insights: Insight[] = [
  {
    slug: "why-pilots-stall",
    title: "Why AI pilots stall, and how to plant one that grows",
    dek: "Most pilots are built to impress a steering committee, not to survive contact with a real workflow.",
    stage: "discover",
    read: "5 min",
    body: [
      "A pilot usually starts with a model and looks for a problem. The ones that reach production start the other way round: with a process that costs real money, an owner who feels the pain, and a measure everyone agrees on before anything is built.",
      "When we run Discover, we rank use cases on three questions. Does it pay back in this financial year? Is the data good enough today, or only in theory? Is there a person who will own the outcome once we step away? A use case that fails any one of them is a slide, not a seed.",
      "The first point worth planting is rarely the most exciting one. It is the one with a clear owner, clean enough data and a number that moves. Get that one into production and the second use case gets easier, because the plumbing, the governance and the trust are already in the ground.",
    ],
  },
  {
    slug: "agents-and-humans",
    title: "What an agent should never do without a person",
    dek: "Good agents are designed around the moments that need judgement, not in spite of them.",
    stage: "launch",
    read: "4 min",
    body: [
      "The fastest way to lose a finance team's trust is an agent that posts, pays or emails a customer without anyone looking. The fastest way to earn it is an agent that does the legwork and then asks at exactly the right moment.",
      "We draw the line early, with the people who own the process. Anything that moves money, changes a customer relationship or crosses a policy threshold waits for a human. Everything before that point, matching, drafting, chasing, explaining, is fair game.",
      "Designed this way, agents do not replace the controller. They give the controller a queue of decisions, each one prepared, explained and logged. That is the difference between automation that people tolerate and automation they ask for more of.",
    ],
  },
  {
    slug: "data-for-ai",
    title: "Your data is ready enough. Here is how to tell",
    dek: "Waiting for perfect data is the most expensive way to start with AI.",
    stage: "prove",
    read: "6 min",
    body: [
      "Almost every mid-sized business we meet believes its data is not ready for AI. Almost every one of them is partly right, and it rarely matters as much as they think.",
      "Readiness is not a property of the whole data estate. It is a property of one use case. For reconciliation, you need the ledger, the bank feed and the rules. For forecasting, you need clean actuals and a view of the drivers. You do not need a lakehouse.",
      "In Prove we test the use case on your real data, gaps and all, and measure what the gaps cost. That turns a vague data strategy into a short list of fixes that pay for themselves, in the order that matters.",
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
