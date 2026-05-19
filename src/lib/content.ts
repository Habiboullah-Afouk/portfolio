/**
 * Single source of truth for portfolio copy & structure.
 * Sections are numbered like Linear's product-tour cadence (01 → 07).
 */

export const SITE = {
  handle: "habiboullah",
  callsign: "@habiboullah",
  name: "Habiboullah Afouk",
  role: "Full-Stack Software Developer",
  location: "Laayoune, Morocco",
  age: "20",
  available: "Open · collaboration · freelance · internships",
  email: "sa27021984@gmail.com",
  social: [
    { label: "GitHub", href: "https://github.com/Habiboullah-Afouk" },
    { label: "GitLab", href: "https://gitlab.com/black-american-dev" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/habiboullah-afouk-209a433b9/" },
    { label: "X", href: "https://x.com/H_Afouk" },
    { label: "instagram", href: "https://www.instagram.com/7__habib/" },
  ],
} as const;

export const NAV = [
  { num: "01", label: "System", href: "#system" },
  { num: "02", label: "Workstation", href: "#workstation" },
  { num: "03", label: "Projects", href: "#work" },
  { num: "04", label: "Journey", href: "#journey" },
  { num: "05", label: "Stack", href: "#stack" },
  { num: "06", label: "Stats", href: "#stats" },
  { num: "07", label: "Contact", href: "#signal" },
] as const;

/* --------------------------------------------------------------
   01 — System Identity (fastfetch-style identity card)
   -------------------------------------------------------------- */
export const SYSTEM_ID = {
  fig: "FIG 0.0 · System Identity",
  firstName: "Habiboullah",
  lastName: "Afouk",
  role: "Full-Stack Software Developer",
  lede:
    "Twenty years old, two years deep into the craft. Building modern web, desktop, and mobile applications with a focus on performance, design, and real-world usability.",
  bootLog: [
    { status: "ok", text: "mounted /home/habiboullah" },
    { status: "ok", text: "started zsh on Linux" },
    { status: "ok", text: "loaded VS Code workspace" },
    { status: "ok", text: "connected to docker daemon" },
    { status: "ok", text: "ready · environment online" },
  ],
  specs: [
    { label: "name", value: "Habiboullah Afouk", color: "accent" as const },
    { label: "role", value: "Full-Stack Software Developer", color: "text" as const },
    { label: "age", value: "20 years", color: "muted" as const },
    { label: "location", value: "Laayoune, Morocco", color: "muted" as const },
    { label: "edu", value: "CMC OFPPT · 2-yr training", color: "muted" as const },
    { label: "os", value: "Linux · Fedora / Ubuntu", color: "muted" as const },
    { label: "shell", value: "bash · zsh", color: "muted" as const },
    { label: "editor", value: "VS Code · neovim", color: "muted" as const },
    { label: "building", value: "JobPick", color: "term-green" as const },
    { label: "learning", value: "TypeScript", color: "term-amber" as const },
  ],
  tags: [
    "Full-Stack",
    "Web · Mobile · Desktop",
    "Linux-native workflow",
    "Self-hosting curious",
  ],
} as const;

/* --------------------------------------------------------------
   02 — Manifesto / About (progressive-reveal)
   -------------------------------------------------------------- */
export const SYSTEM = {
  chapter: "01",
  label: "About",
  fig: "FIG 0.1 · About",
  heading:
    "I build **modern web, desktop, and mobile** applications — with care for performance, design, and the real-world problems they solve.",
  body: [
    "I'm Habiboullah Afouk, a Full-Stack Software Developer from Laayoune, Morocco. Two years of training at CMC OFPPT Laayoune, plus the long nights spent shipping my own builds.",
    "I started with HTML, CSS, JavaScript, PHP, and MySQL — then expanded into React, Laravel, Node.js, Express, React Native, and Electron. SQL and NoSQL databases, Linux systems, backend architecture, and mobile development all sit in the same toolkit.",
    "I enjoy building scalable applications, experimenting with self-hosted systems, and creating digital products that solve real-world problems.",
  ],
  closer: "Modern systems, shipped with care.",
  signature: "habiboullah",
} as const;

/* --------------------------------------------------------------
   03 — Workstation (sticky-stack)
   -------------------------------------------------------------- */
export const WORKSTATION = {
  chapter: "02",
  label: "Workstation",
  fig: "FIG 0.2 · Daily rig",
  heading: "A personal operating system.",
  lede: "Two years of tuning. Linux at the core, the terminal as the studio, the editor as the instrument.",
  windows: [
    {
      id: "neofetch",
      title: "habiboullah@workstation · ~ · bash",
      kind: "terminal",
      lines: [
        { c: "muted", t: "$ neofetch" },
        { c: "accent", t: "       /\\       habiboullah@workstation" },
        { c: "accent", t: "      /  \\      ──────────────────────" },
        { c: "muted", t: "     /\\   \\     OS       · Linux · Fedora / Ubuntu" },
        { c: "muted", t: "    /      \\    Host     · Personal Workstation" },
        { c: "muted", t: "   /   ,,   \\   Shell    · bash · zsh" },
        { c: "muted", t: "  /   |  |  -\\  Editor   · VS Code · neovim" },
        { c: "muted", t: " /_-''    ''-_\\ Runtime  · Node.js · PHP" },
        { c: "muted", t: "                Container· Docker" },
        { c: "muted", t: "                Region   · Laayoune, MA" },
        { c: "muted", t: "                Uptime   · 2y · still climbing" },
      ],
    },
    {
      id: "vscode",
      title: "~/.config/Code/User/settings.json",
      kind: "config",
      lines: [
        { c: "muted", t: "// editor — tuned for focus" },
        { c: "accent", t: "\"editor.fontFamily\": \"JetBrains Mono\"," },
        { c: "accent", t: "\"editor.fontLigatures\": true," },
        { c: "muted", t: "\"editor.smoothScrolling\": true," },
        { c: "muted", t: "\"editor.cursorBlinking\": \"smooth\"," },
        { c: "muted", t: "" },
        { c: "muted", t: "// workspace · stack" },
        { c: "accent", t: "\"extensions\": [" },
        { c: "muted", t: "  \"esbenp.prettier-vscode\"," },
        { c: "muted", t: "  \"bradlc.vscode-tailwindcss\"," },
        { c: "muted", t: "  \"onecentlin.laravel-blade\"," },
        { c: "muted", t: "  \"ms-azuretools.vscode-docker\"," },
        { c: "accent", t: "]" },
      ],
    },
    {
      id: "monitor",
      title: "btop · system monitor",
      kind: "monitor",
      stats: [
        { label: "CPU", value: 28, unit: "%", c: "accent" },
        { label: "MEM", value: 42, unit: "%", c: "accent" },
        { label: "GPU", value: 11, unit: "%", c: "accent" },
        { label: "NET", value: 2.7, unit: "MB/s", c: "term-green" },
        { label: "TMP", value: 48, unit: "°C", c: "term-amber" },
        { label: "DSK", value: 64, unit: "%", c: "muted" },
      ],
    },
    {
      id: "deploy",
      title: "tmux · session: JobPick",
      kind: "terminal",
      lines: [
        { c: "muted", t: "$ npm run build" },
        { c: "term-green", t: "✔ vite · 4.1s · 412 modules" },
        { c: "term-green", t: "✔ tailwind · 0.6s" },
        { c: "term-green", t: "✔ assets · 12 files · 1.4 MB" },
        { c: "muted", t: "$ git push origin main" },
        { c: "muted", t: "→ pushing to gitlab" },
        { c: "accent", t: "✦ deployed · 18s · JobPick.local" },
      ],
    },
  ],
} as const;

/* --------------------------------------------------------------
   04 — Selected work (horizontal-scroll) — top 4 projects
   -------------------------------------------------------------- */
export const WORK = {
  chapter: "03",
  label: "Projects",
  fig: "FIG 0.3 · Selected projects",
  heading: "Four from the workbench.",
  lede:
    "JobPick is the current build. Three slots are reserved for what's next — currently scoping, planning, or sketching at the whiteboard.",
  projects: [
    {
      n: "01",
      title: "JobPick — service marketplace",
      client: "Personal · in active development",
      year: "2025",
      role: "Full-stack developer",
      stack: ["React", "Laravel", "MySQL", "Tailwind"],
      summary:
        "A platform connecting customers with local craftspeople and service providers. Building the full stack end-to-end — Laravel API, React frontend, MySQL data layer, mobile-first UX.",
      tag: "Active build",
      status: "in development",
      href: "https://github.com/RVT-7/JobPick",
    },
    {
      n: "02",
      title: "HRdocs — employee management system",
      client: "Internship · Internal HR platform",
      year: "2025",
      role: "Fullstack engineering",
      stack: [
        "Express",
        "node",
        "React js",
        "MySQL",
        "JavaScript",
        "Desktop App",
        "Windows"
      ],
      summary:
        "A desktop-first employee management platform built for structured HR workflows across departments and cities. Features employee lifecycle management, yearly absence tracking, certificate generation, advanced filtering, and centralized document storage through a streamlined administrative interface.",
      tag: "Production",
      status: "deployed",
      href: "https://github.com/Habiboullah-Afouk/gestion_employes",
    },
    {
      n: "03",
      title: "NumberGame — browser-based logic playground",
      client: "Experimental interface system",
      year: "2024",
      role: "Interaction + frontend engineering",
      stack: [
        "JavaScript",
        "Laravel",
        "PHP",
        "HTML",
        "CSS",
        "Browser APIs"
      ],
      summary:
        "A lightweight browser game built around probabilistic guessing mechanics and responsive interaction design. Developed as a frontend exploration of game-state architecture, real-time feedback systems, and minimal UI composition with an emphasis on clarity, pacing, and interaction flow.",
      tag: "Lab",
      status: "complete",
      href: "https://github.com/Habiboullah-Afouk/numberGame",
    },
    {
      n: "04",
      title: "Self-hosted lab — experimental",
      client: "Personal · ongoing",
      year: "ongoing",
      role: "Systems",
      stack: ["Linux", "Docker", "Bash", "MongoDB"],
      summary:
        "An evolving self-hosted infrastructure — Docker stacks, custom dashboards, local-first tooling. A playground for backend architecture and Linux systems.",
      tag: "Experimental",
      status: "ongoing",
      href: "https://github.com/Habiboullah-Afouk",
    },
  ],
} as const;

/* --------------------------------------------------------------
   05 — Journey (was Process) — interactive timeline
   -------------------------------------------------------------- */
export const PROCESS = {
  chapter: "04",
  label: "Journey",
  fig: "FIG 0.4 · The two-year arc",
  heading: "From first <html> tag to full-stack systems.",
  lede:
    "Two years, one tight loop: learn → build → ship → repeat. Here's the trajectory — the stages that actually moved the needle.",
  stages: [
    {
      n: "i",
      title: "Foundations",
      summary:
        "Started at CMC OFPPT Laayoune. First lines of HTML, CSS, JavaScript. Learning how the web actually works under the hood — the box model, the DOM, the event loop.",
      out: "2023 · HTML · CSS · JavaScript",
    },
    {
      n: "ii",
      title: "Server side",
      summary:
        "Picked up PHP and MySQL. Built dynamic sites end-to-end. Discovered how data flows from form → database → user and back again.",
      out: "2024 · PHP · MySQL · backend",
    },
    {
      n: "iii",
      title: "Frameworks",
      summary:
        "Stepped into Laravel and React. Modern patterns, component architecture, MVC, Vite. The point where the pieces clicked into one cohesive workflow.",
      out: "2024 · Laravel · React · Vite",
    },
    {
      n: "iv",
      title: "JavaScript everywhere",
      summary:
        "Added Node.js and Express. REST APIs, authentication flows, real-time apps. Tailwind and Bootstrap for clean, responsive interfaces shipped fast.",
      out: "2024 · Node.js · Express · Tailwind",
    },
    {
      n: "v",
      title: "Beyond the browser",
      summary:
        "Reached for mobile (React Native) and desktop (Electron). Same JavaScript, three surfaces. Added MongoDB, Linux systems, Docker, and the self-hosting habit.",
      out: "2025 · React Native · Electron · Linux",
    },
    {
      n: "vi",
      title: "Today",
      summary:
        "Building JobPick. Diving into TypeScript. Open to collaboration, freelance work, internships, and the next system worth shipping with care.",
      out: "2025 → · TypeScript · JobPick · open",
    },
  ],
} as const;

/* --------------------------------------------------------------
   06 — Stack (was Capabilities) — full-stack disciplines
   -------------------------------------------------------------- */
export const CAPABILITIES = {
  chapter: "05",
  label: "Stack",
  fig: "FIG 0.5 · Stack & disciplines",
  heading: "Operates the full stack — frontend to systems.",
  lede:
    "Two years of writing code in production-shaped conditions. Tools chosen for clarity, not collection.",
  columns: [
    {
      group: "Frontend",
      items: [
        "HTML5 · CSS3 · JavaScript",
        "React · Vite",
        "Tailwind CSS · Bootstrap",
        "Responsive · mobile-first",
        "Component architecture",
        "Animation · GSAP curious",
      ],
    },
    {
      group: "Backend",
      items: [
        "PHP · Laravel",
        "Node.js · Express.js",
        "REST APIs · auth flows",
        "MVC architecture",
        "Backend patterns",
        "Server-side rendering",
      ],
    },
    {
      group: "Mobile & Desktop",
      items: [
        "React Native",
        "Electron",
        "Cross-platform builds",
        "Mobile-first UX",
        "Native packaging",
        "Offline-capable apps",
      ],
    },
    {
      group: "Systems & Data",
      items: [
        "MySQL · SQLite · MongoDB",
        "Linux · Fedora · Ubuntu",
        "Docker · Bash scripting",
        "Git · GitHub · GitLab",
        "VS Code · neovim",
        "Figma → code pipelines",
      ],
    },
  ],
} as const;

/* --------------------------------------------------------------
   07 — Stats (NEW) — top languages + activity (btop-styled)
   -------------------------------------------------------------- */
export const STATS = {
  chapter: "06",
  label: "Stats",
  fig: "FIG 0.6 · Code patterns",
  heading: "Where time goes at the keyboard.",
  lede:
    "A two-year snapshot of language distribution and build cadence. Updated quarterly · pulled from local activity logs.",
  topLanguages: [
    { name: "JavaScript", percent: 34, color: "#f7df1e" },
    { name: "PHP", percent: 21, color: "#7377ad" },
    { name: "HTML", percent: 14, color: "#e34c26" },
    { name: "CSS", percent: 11, color: "#1572b6" },
    { name: "TypeScript", percent: 8, color: "#3178c6" },
    { name: "Bash", percent: 5, color: "#7ee787" },
    { name: "SQL", percent: 4, color: "#c084fc" },
    { name: "Other", percent: 3, color: "#5a6068" },
  ],
  activity: [
    { label: "Public repos", value: "12", trend: "+3 this quarter" },
    { label: "Commits · 2025", value: "284", trend: "active streak · 14d" },
    { label: "Stack depth", value: "16", trend: "tools in regular rotation" },
    { label: "Open issues", value: "0", trend: "inbox zero · this week" },
  ],
  /* 7×24 mock contribution grid — values 0–4 (intensity) */
  contributions: [
    [0,1,2,1,0,2,3,2,1,0,1,2,3,4,2,1,0,1,2,2,1,0,1,2],
    [1,2,3,2,1,0,1,2,3,2,1,0,2,3,4,2,1,1,2,3,2,1,0,1],
    [0,1,2,3,2,1,2,3,4,3,2,1,2,2,3,2,1,2,3,2,1,0,1,2],
    [2,3,2,1,2,3,4,3,2,1,2,3,2,1,0,1,2,3,2,1,2,1,0,1],
    [1,2,3,4,3,2,1,2,3,2,1,2,3,4,2,1,2,3,2,1,0,1,2,3],
    [0,1,2,2,3,2,1,2,3,2,1,0,1,2,3,4,3,2,1,2,3,2,1,0],
    [1,2,1,0,1,2,3,2,1,2,3,4,2,1,0,1,2,2,1,0,1,2,3,2],
  ],
} as const;

/* --------------------------------------------------------------
   08 — Signal / Contact (terminal prompt + editorial closer)
   -------------------------------------------------------------- */
export const SIGNAL = {
  chapter: "07",
  label: "Contact",
  fig: "FIG 0.7 · Open a channel",
  heading: "Let's build something together.",
  lede:
    "Open to collaboration, freelance work, internships, and software development projects. Best fits: full-stack web apps, mobile builds, or any system worth shipping with care.",
  prompt: "habiboullah@workstation ~ $ mail -s 'project · ____' sa27021984@gmail.com",
  cta: { label: "sa27021984@gmail.com", href: "mailto:sa27021984@gmail.com" },
  fineprint: [
    "Open to collaboration",
    "Available for freelance + internships",
    "Based in Laayoune · Morocco · remote-friendly",
    "Languages · Arabic · English · French",
  ],
} as const;

/* --------------------------------------------------------------
   marquee strip — appears between sections
   -------------------------------------------------------------- */
export const MARQUEE = [
  "habiboullah afouk",
  "full-stack software developer",
  "laayoune · morocco",
  "react · laravel · node.js",
  "react native · electron",
  "linux · docker · bash",
  "mysql · sqlite · mongodb",
  "currently learning typescript",
  "building JobPick",
  "open for collaboration",
] as const;
