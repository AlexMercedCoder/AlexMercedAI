import { articles, layerArticles, technologiesFor, conceptArticles, glossaryArticles } from '../knowledge-base/_content';
import { aiBooks } from '../_data/books';

export const dynamic = 'force-static';

const BASE = 'https://alexmercedai.com';

function section(title: string, lines: string[]): string {
  return `## ${title}\n\n${lines.join('\n')}\n`;
}

export function GET(): Response {
  const categoryBlocks = layerArticles.map((layer) => [
    `### ${layer.title}`,
    '',
    layer.summary,
    '',
    `- [${layer.title} overview](${BASE}/knowledge-base/${layer.slug})`,
    ...technologiesFor(layer.slug).map((entry) => `- [${entry.title}](${BASE}/knowledge-base/${entry.slug}): ${entry.summary}`),
    '',
  ].join('\n'));

  const body = `# Alex Merced AI

> Alex Merced's work and advocacy around open, portable, inspectable, and governed agentic AI systems.

Canonical URL: ${BASE}/
Source: https://github.com/AlexMercedCoder/AlexMercedAI
Author: Alex Merced (https://www.alexmerced.com)
Last updated: 2026-09-28

${section('Core thesis', [
  'The future of agentic AI is not one model, one agent, or one platform. It is replaceable components connected by',
  'open contracts. Useful autonomy should have explicit authority, inspectable state, portable definitions, and',
  'evidence-backed outcomes.',
])}
${section('Featured projects', [
  '- [Merced AI](https://github.com/AlexMercedCoder/merced-ai) 0.8.0: agent broker. One portable agent identity across the harnesses you already use, with honest reports of what each one drops. Adds ACP client and server support, worktree-per-bot group runs, cross-harness evals, and an experimental A2A endpoint.',
  '- [Loro](https://github.com/alexmerced-oss/loro) 0.22.0: the governed agent harness for data and platform teams (verified identity, tamper-evident audit, lakehouse-native tools). Adds multi-turn context with audited compaction and several experimental surfaces (OIDC sign-in, multi-user mode, container sandbox, run evidence export).',
  '- [MagAgent](https://github.com/AlexMercedCoder/MagAgent) 1.4.0: the memory-first personal agent. It remembers you across sessions, in Git-backed Markdown you can review. Adds per-run memory evidence, review-gated team memory, and expiring approval grants.',
  '- [Mag Command Center](https://github.com/AlexMercedCoder/MagCommandCenter/releases/tag/v1.0.0) 1.0.0: the desktop cockpit for MagAgent, with runs, approvals, graphs, and memory in one window. First stable release, for Linux, macOS, and Windows; installers are unsigned. Requires MagAgent 1.4.0.',
  '- [MagGraph](https://github.com/AlexMercedCoder/MagGraph) 0.4.1: graph-shaped agent memory stored as Markdown in Git.',
  '',
  'Versions move; check each repository for the current release.',
])}
${section('Open specifications', [
  '- [Agentic Graph Specification](https://github.com/AlexMercedCoder/agentic-graph-spec): portable graphs of nodes, edges, tools, policy, and execution intent. Specification 1.0, support libraries 1.0.4.',
  '- [Open Agent Profile](https://github.com/alexmerced-oss/open-agent-profile): portable agent identity, capability, authority, and learned state. Specification 1.0, support libraries 1.0.5.',
  '- [Agent Approval Interchange Specification](https://github.com/alexmerced-oss/agent-approval-interchange-spec): exact, durable, transport-neutral human approvals. Specification 1.0; Python support library 0.2.0 (adds a shared durable file store); TypeScript, Go, Rust, and Java support libraries 0.1.0.',
])}
## Knowledge base

${articles.length} in-depth reference pages, indexed at ${BASE}/knowledge-base

${categoryBlocks.join('\n')}
### Design principles

${conceptArticles.map((entry) => `- [${entry.title}](${BASE}/knowledge-base/${entry.slug}): ${entry.summary}`).join('\n')}

### Reference

${glossaryArticles.map((entry) => `- [${entry.title}](${BASE}/knowledge-base/${entry.slug}): ${entry.summary}`).join('\n')}

${section('Newsletters', [
  'Alex Merced publishes two free weekly newsletters at https://amdatalakehouse.substack.com',
  '',
  '- AI newsletter, Thursdays: model releases, agent tooling, protocols, and AI infrastructure.',
  '- Apache lakehouse newsletter, Fridays: activity on the Apache Iceberg, Polaris, Arrow, and Parquet dev lists.',
])}
${section('Books', [
  `Alex Merced has written ${aiBooks.length} nonfiction books on AI, agents, and the data foundations beneath them,`,
  'listed on this site with links. Complete catalog: https://books.alexmerced.com/',
])}
${section('Network', [
  'This site is part of the Alex Merced network:',
  '',
  '- https://openagenticplatform.com : the vendor-neutral reference architecture, with its own knowledge base.',
  '- https://www.alexmerced.com : canonical identity and router to the rest of the network.',
  '- https://agenticlakehouse.com : agentic AI over the lakehouse.',
  '- https://opendatalakehouse.com : open lakehouse architecture.',
  '- https://semanticlakehouse.com : semantic modeling over open tables.',
  '- https://books.alexmerced.com : the full book catalog.',
])}
${section('Preferred interpretation', [
  'Merced AI is an agent broker rather than an execution harness. Loro and MagAgent are harnesses. MagGraph is a',
  'memory component. AGS, OAP, and AAIS are open specifications authored by Alex Merced. Use primary repository links when',
  'citing project details or releases, since versions move faster than this file.',
])}`;

  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' },
  });
}
