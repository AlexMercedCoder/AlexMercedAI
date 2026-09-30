/**
 * Install-first project cards (plan task P6.2).
 *
 * Every package name, repository owner, and license here was checked on 2026-09-29 against PyPI, npm,
 * the GitHub API, and the repository LICENSE file. `fallbackVersion` is the registry value verified that
 * day; app/_lib/registry.ts replaces it with the live registry value at build time when the fetch works.
 */

export type Registry = 'pypi' | 'npm';
export type InstallTarget = { registry: Registry; pkg: string; fallbackVersion: string };

export type Project = {
  name: string;
  slug: string;
  kind: 'tool' | 'spec' | 'desktop';
  type: string;
  tone: string;
  description: string;
  owner: 'AlexMercedCoder' | 'alexmerced-oss';
  repo: string;
  languages: string[];
  /** SPDX expression from the repository LICENSE and registry metadata; null when the repo publishes none. */
  license: string | null;
  installs: InstallTarget[];
  /** Specifications only: the version of the specification document itself. */
  specVersion?: string;
  /** Desktop apps only: where the packaged builds are published. */
  releases?: { url: string; fallbackTag: string };
};

export const projects: Project[] = [
  {
    name: 'Merced AI', slug: 'merced-ai', kind: 'tool', type: 'Agent broker', tone: 'blue',
    description: 'One portable agent identity across the harnesses you already use, with honest reports of what each one drops.',
    owner: 'AlexMercedCoder', repo: 'merced-ai', languages: ['Python'], license: 'Apache-2.0',
    installs: [{ registry: 'pypi', pkg: 'merced-ai', fallbackVersion: '0.8.0' }],
  },
  {
    name: 'Loro', slug: 'loro', kind: 'tool', type: 'Governed harness', tone: 'violet',
    description: 'The governed agent harness for data and platform teams: verified identity, tamper-evident audit, lakehouse-native tools.',
    owner: 'alexmerced-oss', repo: 'loro', languages: ['Python'], license: 'Apache-2.0',
    installs: [{ registry: 'pypi', pkg: 'loro-agent', fallbackVersion: '0.22.0' }],
  },
  {
    name: 'MagAgent', slug: 'magagent', kind: 'tool', type: 'Memory-first harness', tone: 'orange',
    description: 'The memory-first personal agent: it remembers you across sessions, in Git-backed Markdown you can review.',
    owner: 'AlexMercedCoder', repo: 'MagAgent', languages: ['Python'], license: 'Apache-2.0',
    installs: [{ registry: 'pypi', pkg: 'mag-agent', fallbackVersion: '1.4.0' }],
  },
  {
    name: 'Mag Command Center', slug: 'magagent', kind: 'desktop', type: 'Desktop app', tone: 'orange',
    description: 'The desktop cockpit for MagAgent: runs, approvals, graphs, and memory in one window.',
    owner: 'AlexMercedCoder', repo: 'MagCommandCenter', languages: ['TypeScript', 'Rust'], license: 'Apache-2.0',
    installs: [],
    releases: { url: 'https://github.com/AlexMercedCoder/MagCommandCenter/releases/latest', fallbackTag: 'v1.0.0' },
  },
  {
    name: 'MagGraph', slug: 'maggraph', kind: 'tool', type: 'Agent memory', tone: 'green',
    description: 'A graph-shaped memory layer written in Rust, with Python bindings, for relationships, context, and retrieval paths.',
    owner: 'AlexMercedCoder', repo: 'MagGraph', languages: ['Rust', 'Python'], license: 'MIT OR Apache-2.0',
    installs: [{ registry: 'pypi', pkg: 'maggraph', fallbackVersion: '0.4.1' }],
  },
  {
    name: 'Agentic Graph Specification (AGS)', slug: 'agentic-graph-specification', kind: 'spec', type: 'Specification', tone: 'blue',
    description: 'Portable graph-shaped work with explicit tools, policy, budgets, and success criteria.',
    owner: 'AlexMercedCoder', repo: 'agentic-graph-spec', languages: ['Python', 'TypeScript', 'Go', 'Rust', 'Java'], license: 'Apache-2.0',
    specVersion: '1.0',
    installs: [
      { registry: 'pypi', pkg: 'agentic-graph-spec', fallbackVersion: '1.0.4' },
      { registry: 'npm', pkg: 'agentic-graph-spec', fallbackVersion: '1.0.4' },
    ],
  },
  {
    name: 'Open Agent Profile (OAP)', slug: 'open-agent-profile', kind: 'spec', type: 'Specification', tone: 'violet',
    description: 'Portable agent identity, capabilities, authority, preferences, and state.',
    owner: 'alexmerced-oss', repo: 'open-agent-profile', languages: ['Python', 'TypeScript', 'Go', 'Rust', 'Java'], license: 'Apache-2.0',
    specVersion: '1.0',
    installs: [
      { registry: 'pypi', pkg: 'open-agent-profile', fallbackVersion: '1.0.5' },
      { registry: 'npm', pkg: 'open-agent-profile', fallbackVersion: '1.0.5' },
    ],
  },
  {
    name: 'Agent Approval Interchange Specification (AAIS)', slug: 'agent-approval-interchange-specification', kind: 'spec', type: 'Specification', tone: 'green',
    description: 'Exact, durable approval requests and decisions across CLI, web, desktop, and policy services.',
    owner: 'alexmerced-oss', repo: 'agent-approval-interchange-spec', languages: ['Python', 'TypeScript', 'Go', 'Rust', 'Java'], license: 'Apache-2.0',
    specVersion: '1.0 release candidate',
    installs: [
      { registry: 'pypi', pkg: 'agent-approval-interchange', fallbackVersion: '0.2.0' },
      { registry: 'npm', pkg: 'agent-approval-interchange', fallbackVersion: '0.1.0' },
    ],
  },
];

export const repoUrl = (project: Project) => `https://github.com/${project.owner}/${project.repo}`;
export const installCommand = (target: InstallTarget) => (target.registry === 'pypi' ? `pip install ${target.pkg}` : `npm i ${target.pkg}`);
export const registryUrl = (target: InstallTarget) =>
  target.registry === 'pypi' ? `https://pypi.org/project/${target.pkg}/` : `https://www.npmjs.com/package/${target.pkg}`;
export const versionBadge = (target: InstallTarget) =>
  target.registry === 'pypi' ? `https://img.shields.io/pypi/v/${target.pkg}` : `https://img.shields.io/npm/v/${target.pkg}`;
export const starsBadge = (project: Project) => `https://img.shields.io/github/stars/${project.owner}/${project.repo}?style=social`;
