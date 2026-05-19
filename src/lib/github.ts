export interface DynamicGitHubStats {
  publicRepos: number;
  openIssues: number;
  stackDepth: number;
  languages: { name: string; percent: number; color: string }[];
}

const USERNAME = "Habiboullah-Afouk";

interface GitHubRepo {
  open_issues_count: number;
  languages_url: string;
}

const COLORS: Record<string, string> = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  PHP: "#7377ad",
  HTML: "#e34c26",
  CSS: "#1572b6",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  "C#": "#178600",
  C: "#555555",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Vue: "#41b883",
  "Vue.js": "#41b883",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  Makefile: "#427819",
  SCSS: "#c6538c",
  Sass: "#c6538c",
  Less: "#1d365d",
  Markdown: "#083fa1",
  JSON: "#292929",
  YAML: "#cb171e",
  TOML: "#9c4221",
  Lua: "#000080",
  Perl: "#0298c3",
  R: "#198CE7",
  Scala: "#c22d40",
  Haskell: "#5e5086",
  Elixir: "#6e4a7e",
  Clojure: "#db5855",
  Erlang: "#B83998",
  OCaml: "#3be133",
  Julia: "#a270ba",
  PowerShell: "#012456",
  Batchfile: "#C1F12E",
  "Emacs Lisp": "#c065db",
  "Vim Script": "#199f4b",
  CoffeeScript: "#244776",
  "Objective-C": "#438eff",
  Assembly: "#6E4C13",
  Jupyter: "#DA5B0B",
  Pug: "#a86454",
  Stylus: "#ff6347",
  PostCSS: "#dd3a0a",
  Vite: "#646CFF",
  Nix: "#7e7eff",
  Gleam: "#ffaff3",
  Zig: "#ec915c",
  Carbon: "#222222",
  Blade: "#f7523f",
  "ASP.NET": "#9400ff",
};

export async function fetchGitHubStats(): Promise<DynamicGitHubStats | null> {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`),
      fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`),
    ]);

    if (!userRes.ok || !reposRes.ok) return null;

    const user = await userRes.json();
    const repos = await reposRes.json();
    if (!Array.isArray(repos) || repos.length === 0) return null;

    const openIssues = repos.reduce(
      (sum: number, repo: GitHubRepo) => sum + (repo.open_issues_count || 0),
      0
    );

    const langResults = await Promise.allSettled(
      repos.map((repo: GitHubRepo) =>
        fetch(repo.languages_url).then(async (r) => (r.ok ? r.json() : {}))
      )
    );

    const langBytes: Record<string, number> = {};
    for (const result of langResults) {
      if (result.status === "fulfilled" && result.value) {
        for (const [lang, bytes] of Object.entries(result.value)) {
          langBytes[lang] = (langBytes[lang] || 0) + (bytes as number);
        }
      }
    }

    const total = Object.values(langBytes).reduce((a, b) => a + b, 0);
    if (total === 0) return null;

    const languages = Object.entries(langBytes)
      .map(([name, bytes]) => ({
        name,
        percent: Math.round((bytes / total) * 100),
        color: COLORS[name] || "#5a6068",
      }))
      .filter((l) => l.percent > 0)
      .sort((a, b) => b.percent - a.percent)
      .slice(0, 8);

    // Normalize to sum exactly 100
    const sum = languages.reduce((a, b) => a + b.percent, 0);
    const diff = 100 - sum;
    if (diff !== 0 && languages.length > 0) {
      languages[0].percent += diff;
    }

    return {
      publicRepos: user.public_repos || 0,
      openIssues,
      stackDepth: languages.length,
      languages,
    };
  } catch {
    return null;
  }
}
