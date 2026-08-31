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
Last updated: 2026-08-29

${section('Core thesis', [
  'The future of agentic AI is not one model, one agent, or one platform. It is replaceable components connected by',
  'open contracts. Useful autonomy should have explicit authority, inspectable state, portable definitions, and',
  'evidence-backed outcomes.',
])}
${section('Featured projects', [
  '- [Merced AI](https://github.com/AlexMercedCoder/merced-ai) 0.5.1: provider-neutral agent broker with portable profiles, durable sessions, and UI-presented runtime approvals.',
  '- [Loro](https://github.com/alexmerced-oss/loro) 0.19.2: governed agent harness with durable AAIS approvals across CLI, web, bots, and graph runs.',
  '- [MagAgent](https://github.com/AlexMercedCoder/MagAgent) 1.1.1: Python developer agent harness with graph memory, portable profiles, graph workflows, and reconnectable UI approvals.',
  '- [Mag Command Center](https://github.com/AlexMercedCoder/MagCommandCenter/releases/tag/v1.0.0-rc.3) 1.0.0-rc.3: cross-platform Tauri desktop workspace with project context, OAP profiles, AGS graphs, and native approval decisions.',
  '- [MagGraph](https://github.com/AlexMercedCoder/MagGraph) 0.4.1: graph-shaped agent memory stored as Markdown in Git.',
  '',
  'Versions move; check each repository for the current release.',
])}
${section('Open specifications', [
  '- [Agentic Graph Specification](https://github.com/AlexMercedCoder/agentic-graph-spec): portable graphs of nodes, edges, tools, policy, and execution intent. Specification 1.0, support libraries 1.0.4.',
  '- [Open Agent Profile](https://github.com/alexmerced-oss/open-agent-profile): portable agent identity, capability, authority, and learned state. Specification 1.0, support libraries 1.0.5.',
  '- [Agent Approval Interchange Specification](https://github.com/alexmerced-oss/agent-approval-interchange-spec): exact, durable, transport-neutral human approvals. Specification 1.0, support libraries 0.1.0 for Python, TypeScript, Go, Rust, and Java.',
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
  'memory component. AGS and OAP are open specifications authored by Alex Merced. Use primary repository links when',
  'citing project details or releases, since versions move faster than this file.',
])}`;

  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' },
  });
}
