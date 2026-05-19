/**
 * Single source of truth for portfolio copy & structure.
 * Sections are numbered like Linear's product-tour cadence (1.0 → 6.0).
 */

export const SITE = {
  handle: "habib",
  callsign: "@habib",
  role: "Systems Engineer · Infrastructure & Design",
  location: "Casablanca / Remote",
  available: "Open for selective engagements · Q3 26",
  email: "hello@habib.dev",
  social: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "X", href: "https://x.com/" },
    { label: "Linear", href: "https://linear.app/" },
    { label: "Read.cv", href: "https://read.cv/" },
  ],
} as const;

export const NAV = [
  { num: "01", label: "System", href: "#system" },
  { num: "02", label: "Workstation", href: "#workstation" },
  { num: "03", label: "Selected work", href: "#work" },
  { num: "04", label: "Process", href: "#process" },
  { num: "05", label: "Capabilities", href: "#capabilities" },
  { num: "06", label: "Signal", href: "#signal" },
] as const;

/* --------------------------------------------------------------
   01 — System / Manifesto (progressive-reveal)
   -------------------------------------------------------------- */
export const SYSTEM = {
  chapter: "01",
  label: "System",
  fig: "FIG 0.1 · Operating principles",
  heading:
    "I build the **infrastructure** that holds craft. The desk, the dotfiles, the deploy pipeline — one continuous system.",
  body: [
    "My workstation is an Arch + Hyprland rig tuned over years: tmux panes, custom keybinds, scripted boots, dotfiles version-controlled like a product. The way I configure my machine is the way I architect software — composable, observable, mine.",
    "I work the seam between systems engineering and editorial design. Backends that compose under load. Interfaces that read like editorial print. Pipelines you can hand to another engineer at 3am without notes.",
  ],
  closer: "Cinematic systems, shipped quietly.",
  signature: "habib",
} as const;

/* --------------------------------------------------------------
   02 — Workstation (sticky-stack)
   -------------------------------------------------------------- */
export const WORKSTATION = {
  chapter: "02",
  label: "Workstation",
  fig: "FIG 0.2 · Daily rig",
  heading: "A personal operating system.",
  lede: "Six years of tuning. Every keystroke trimmed. The shell is the studio.",
  windows: [
    {
      id: "neofetch",
      title: "habib@arch · ~ · zsh",
      kind: "terminal",
      lines: [
        { c: "muted", t: "$ neofetch" },
        { c: "accent", t: "       /\\       habib@arch" },
        { c: "accent", t: "      /  \\      ──────────────" },
        { c: "muted", t: "     /\\   \\     OS      · Arch Linux x86_64" },
        { c: "muted", t: "    /      \\    Host    · Framework 13" },
        { c: "muted", t: "   /   ,,   \\   Kernel  · 6.12.4-zen" },
        { c: "muted", t: "  /   |  |  -\\  WM      · Hyprland 0.45" },
        { c: "muted", t: " /_-''    ''-_\\ Shell   · zsh · starship" },
        { c: "muted", t: "                Editor  · neovim · helix" },
        { c: "muted", t: "                CPU     · AMD Ryzen 7 7840U" },
        { c: "muted", t: "                Memory  · 12.4 GiB / 32 GiB" },
        { c: "muted", t: "                Uptime  · 7d 14h 22m" },
      ],
    },
    {
      id: "hyprland",
      title: "~/.config/hypr/hyprland.conf",
      kind: "config",
      lines: [
        { c: "muted", t: "# layered animations" },
        { c: "accent", t: "animation = windows, 1, 5, overshot, slide" },
        { c: "accent", t: "animation = fade, 1, 4, default" },
        { c: "accent", t: "animation = workspaces, 1, 5, overshot, slidevert" },
        { c: "muted", t: "" },
        { c: "muted", t: "# blur · depth · grain" },
        { c: "accent", t: "decoration {" },
        { c: "muted", t: "    rounding        = 6" },
        { c: "muted", t: "    blur.enabled    = true" },
        { c: "muted", t: "    blur.size       = 8" },
        { c: "muted", t: "    blur.passes     = 3" },
        { c: "muted", t: "    drop_shadow     = true" },
        { c: "muted", t: "    shadow_range    = 24" },
        { c: "accent", t: "}" },
      ],
    },
    {
      id: "monitor",
      title: "btop · system monitor",
      kind: "monitor",
      stats: [
        { label: "CPU", value: 31, unit: "%", c: "accent" },
        { label: "MEM", value: 39, unit: "%", c: "accent" },
        { label: "GPU", value: 18, unit: "%", c: "accent" },
        { label: "NET", value: 4.2, unit: "MB/s", c: "term-green" },
        { label: "TMP", value: 52, unit: "°C", c: "term-amber" },
        { label: "PWR", value: 14, unit: "W", c: "term-green" },
      ],
    },
    {
      id: "tmux",
      title: "tmux · session: deploy",
      kind: "terminal",
      lines: [
        { c: "term-green", t: "✔ build · 14.2s · 3.1 MB" },
        { c: "term-green", t: "✔ typecheck · 2.4s" },
        { c: "term-green", t: "✔ lint · 0.8s · 0 warn" },
        { c: "muted", t: "→ push origin main" },
        { c: "muted", t: "→ vercel · deploying" },
        { c: "accent", t: "✦ live in 21s · iad1" },
      ],
    },
  ],
} as const;

/* --------------------------------------------------------------
   03 — Selected work (horizontal-scroll)
   -------------------------------------------------------------- */
export const WORK = {
  chapter: "03",
  label: "Selected work",
  fig: "FIG 0.3 · Recent engagements",
  heading: "Five from the archive.",
  lede:
    "A curated slice — infrastructure platforms, editorial commerce, internal tools. Most work lives under NDA.",
  projects: [
    {
      n: "01",
      title: "Telemetry mesh for a satellite ops team",
      client: "Confidential · Aerospace",
      year: "2025",
      role: "Lead platform engineer",
      stack: ["Rust", "NATS", "Postgres", "Grafana"],
      summary:
        "Replaced a brittle Kafka relay with a low-latency NATS JetStream mesh — 12 ms median end-to-end, sub-second replays across 14 ground stations.",
      tag: "Infrastructure",
    },
    {
      n: "02",
      title: "Editorial commerce rebuild for a luxury label",
      client: "Maison · Paris",
      year: "2024",
      role: "Frontend architecture · Motion design",
      stack: ["Next.js", "Sanity", "GSAP", "Three.js"],
      summary:
        "Reimagined the flagship storefront with cinematic scroll choreography. Conversion up 38 %, time-on-page 2.4×, store team ships seasonal drops solo.",
      tag: "Editorial",
    },
    {
      n: "03",
      title: "Internal control plane for an AI infra team",
      client: "Stealth · Series B",
      year: "2024",
      role: "Full-stack · Design engineering",
      stack: ["TypeScript", "tRPC", "ClickHouse", "Tailwind"],
      summary:
        "Replaced four dashboards and a spreadsheet with one operations console. Incident MTTR fell from 38 m to 7 m. Used daily by every engineer.",
      tag: "Tooling",
    },
    {
      n: "04",
      title: "Realtime grading pipeline for a film studio",
      client: "Studio · LA",
      year: "2024",
      role: "Pipeline engineer",
      stack: ["Go", "ffmpeg", "S3", "Redis Streams"],
      summary:
        "Designed an event-driven render queue with frame-accurate scrubbing. 6× throughput vs. their prior Nuke farm, reviewed shots ship same-day.",
      tag: "Infrastructure",
    },
    {
      n: "05",
      title: "Open-source: tmux-orbit",
      client: "Personal · github.com/habib/tmux-orbit",
      year: "2023 — present",
      role: "Author · Maintainer",
      stack: ["Lua", "tmux", "fzf"],
      summary:
        "Session graph + smart launcher for tmux. 4.1k stars, weekly releases, used at three companies on this list.",
      tag: "Tooling",
    },
  ],
} as const;

/* --------------------------------------------------------------
   04 — Process (pinned-scrub)
   -------------------------------------------------------------- */
export const PROCESS = {
  chapter: "04",
  label: "Process",
  fig: "FIG 0.4 · How the work moves",
  heading: "Six stages. No surprises.",
  lede:
    "Every engagement follows the same instrumented loop. You see the system, the trade-offs, and the receipts before anyone writes production code.",
  stages: [
    {
      n: "i",
      title: "Brief",
      summary:
        "60-minute working session. We map the constraints, the team, the deadline that actually matters.",
      out: "Constraint memo · 1 page",
    },
    {
      n: "ii",
      title: "Map",
      summary:
        "I sketch the system end-to-end — data flow, failure modes, who runs what at 3 a.m.",
      out: "Architecture diagram · ADRs",
    },
    {
      n: "iii",
      title: "Spike",
      summary:
        "A vertical slice ships in week one. Real data, real interface, real deploy — proves the model.",
      out: "Production-shaped prototype",
    },
    {
      n: "iv",
      title: "Build",
      summary:
        "Trunk-based, observable, reviewed in narrow PRs. Your team pairs in from day one.",
      out: "Daily Looms · weekly cut",
    },
    {
      n: "v",
      title: "Harden",
      summary:
        "Load tests, chaos drills, runbooks. The thing that wakes the on-call writes its own ticket.",
      out: "SLOs · dashboards · runbooks",
    },
    {
      n: "vi",
      title: "Hand-off",
      summary:
        "Codebase tour, written postmortem of the build, two weeks of support included.",
      out: "Handover doc · oncall rotation",
    },
  ],
} as const;

/* --------------------------------------------------------------
   05 — Capabilities (layered-parallax)
   -------------------------------------------------------------- */
export const CAPABILITIES = {
  chapter: "05",
  label: "Capabilities",
  fig: "FIG 0.5 · Stack & disciplines",
  heading: "Operates the full stack — top to silicon.",
  lede: "Twelve years of writing code in production. I keep a tight surface area so each tool stays sharp.",
  columns: [
    {
      group: "Infrastructure",
      items: [
        "AWS · GCP · bare metal",
        "Kubernetes · Nomad",
        "Terraform · Pulumi",
        "Postgres · ClickHouse · Redis",
        "NATS · Kafka · Temporal",
        "Observability — OpenTelemetry, Grafana, Honeycomb",
      ],
    },
    {
      group: "Backend",
      items: [
        "Rust · Go · TypeScript",
        "gRPC · GraphQL · tRPC",
        "Event sourcing · CQRS",
        "Postgres internals · pgvector",
        "WebSockets · WebRTC · WebTransport",
      ],
    },
    {
      group: "Frontend & motion",
      items: [
        "Next.js · React · Astro",
        "GSAP · Motion · Lenis",
        "Tailwind · CSS architecture",
        "Three.js · WebGL · WebGPU",
        "Editorial typography systems",
      ],
    },
    {
      group: "Design engineering",
      items: [
        "Design systems · tokens",
        "Figma → code pipelines",
        "Cinematic scroll choreography",
        "Editorial layout · grids",
        "Accessibility · prefers-reduced-motion",
      ],
    },
  ],
} as const;

/* --------------------------------------------------------------
   06 — Signal / Contact (terminal prompt + editorial closer)
   -------------------------------------------------------------- */
export const SIGNAL = {
  chapter: "06",
  label: "Signal",
  fig: "FIG 0.6 · Open a channel",
  heading: "Bring me a system worth building.",
  lede:
    "Best fits: infrastructure platforms, editorial commerce, internal tools that engineers respect. I take on two engagements at a time.",
  prompt: "habib@arch ~ $ mail -s 'project · ____' hello@habib.dev",
  cta: { label: "hello@habib.dev", href: "mailto:hello@habib.dev" },
  fineprint: [
    "Two-week minimum scoping engagement",
    "Remote-first · happy to fly for kickoff",
    "Booking from Q3 2026",
  ],
} as const;

/* --------------------------------------------------------------
   marquee strip — appears between sections
   -------------------------------------------------------------- */
export const MARQUEE = [
  "arch linux · since 2018",
  "hyprland 0.45",
  "neovim · helix",
  "rust · go · typescript",
  "tmux · zsh · starship",
  "postgres · clickhouse · nats",
  "next.js · gsap · motion",
  "kubernetes · terraform",
  "casablanca / remote",
  "open for q3 2026",
] as const;
