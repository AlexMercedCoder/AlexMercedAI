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
  '- [Merced AI](https://github.com/AlexMercedCoder/merced-ai): provider-neutral agent broker.',
  '- [Loro](https://github.com/alexmerced-oss/loro): governed agent harness built on policy, evidence, authority, and durable records.',
  '- [MagAgent](https://github.com/AlexMercedCoder/MagAgent): Python developer agent harness for providers, tools, memory, and workflows.',
  '- [MagGraph](https://github.com/AlexMercedCoder/MagGraph): graph-shaped agent memory and retrieval layer.',
])}
${section('Open specifications', [
  '- [Agentic Graph Specification](https://github.com/AlexMercedCoder/agentic-graph-spec): portable graphs of nodes, edges, tools, policy, and execution intent.',
  '- [Open Agent Profile](https://github.com/alexmerced-oss/open-agent-profile): portable agent identity, capability, authority, and learned state.',
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
