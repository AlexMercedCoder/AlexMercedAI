'use client';

import { useEffect } from 'react';
import { aiBooks } from './_data/books';
import type { KbEntry } from './_data/kb-manifest';

type ToolDefinition = {
  name: string;
  title: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: Record<string, unknown>) => Promise<unknown>;
  annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
};

type ModelContext = {
  registerTool: (tool: ToolDefinition, options?: { signal?: AbortSignal }) => Promise<void>;
};

declare global {
  interface Document { modelContext?: ModelContext }
}

const noInput = { type: 'object', properties: {}, additionalProperties: false };

export default function WebMCP({ knowledgeBase = [] }: { knowledgeBase?: KbEntry[] }) {
  useEffect(() => {
    const context = document.modelContext;
    if (!context) return;

    const controller = new AbortController();
    const tools: ToolDefinition[] = [
      {
        name: 'get_alex_merced_ai_overview',
        title: 'Get Alex Merced AI overview',
        description: 'Returns the site thesis, Alex Merced’s focus in agentic AI, and the major categories of work featured on this page.',
        inputSchema: noInput,
        execute: async () => ({
          thesis: 'Agentic AI should use replaceable components connected by open contracts.',
          focus: ['portable agents', 'explicit authority', 'inspectable state', 'evidence-backed autonomy'],
          categories: ['agent brokerage', 'agent harnesses', 'agent memory', 'open specifications'],
          canonicalUrl: 'https://alexmercedai.com/',
        }),
        annotations: { readOnlyHint: true, untrustedContentHint: false },
      },
      {
        name: 'list_alex_merced_ai_projects',
        title: 'List Alex Merced AI projects',
        description: 'Returns the featured open agentic AI projects with their role, version, summary, and primary repository URL.',
        inputSchema: noInput,
        execute: async () => ({ projects: [
          { name: 'Merced AI', version: '0.8.0', role: 'agent broker', url: 'https://github.com/AlexMercedCoder/merced-ai' },
          { name: 'Loro', version: '0.22.0', role: 'governed agent harness', url: 'https://github.com/alexmerced-oss/loro' },
          { name: 'MagAgent', version: '1.4.0', role: 'memory-first agent harness', url: 'https://github.com/AlexMercedCoder/MagAgent' },
          { name: 'Mag Command Center', version: '1.0.0', role: 'desktop cockpit for MagAgent', url: 'https://github.com/AlexMercedCoder/MagCommandCenter' },
          { name: 'MagGraph', version: '0.4.1', role: 'agent memory', url: 'https://github.com/AlexMercedCoder/MagGraph' },
        ] }),
        annotations: { readOnlyHint: true, untrustedContentHint: false },
      },
      {
        name: 'get_alex_merced_open_standards',
        title: 'Get Alex Merced open standards',
        description: 'Returns the AGS, OAP, and AAIS open specifications, their purpose, current document/support versions, and repository URLs.',
        inputSchema: noInput,
        execute: async () => ({ standards: [
          { name: 'Agentic Graph Specification', shortName: 'AGS', documentVersion: '1.0', supportVersion: '1.0.4', purpose: 'Portable agentic graph documents.', url: 'https://github.com/AlexMercedCoder/agentic-graph-spec' },
          { name: 'Open Agent Profile', shortName: 'OAP', documentVersion: '1.0', supportVersion: '1.0.5', purpose: 'Portable agent identity, capabilities, authority, and preferences.', url: 'https://github.com/alexmerced-oss/open-agent-profile' },
          { name: 'Agent Approval Interchange Specification', shortName: 'AAIS', documentVersion: '1.0', supportVersion: 'Python 0.2.0; TypeScript, Go, Rust, and Java 0.1.0', supportVersions: { python: '0.2.0', typescript: '0.1.0', go: '0.1.0', rust: '0.1.0', java: '0.1.0' }, purpose: 'Portable, exact-action human approval requests and decisions.', url: 'https://github.com/alexmerced-oss/agent-approval-interchange-spec' },
        ] }),
        annotations: { readOnlyHint: true, untrustedContentHint: false },
      },
      {
        name: 'list_knowledge_base_articles',
        title: 'List knowledge base articles',
        description: 'Returns every reference page in the Alex Merced AI knowledge base with its title, category, one-line summary, and canonical URL. Use this to find the right page before fetching one.',
        inputSchema: {
          type: 'object',
          properties: {
            kind: { type: 'string', enum: ['layer', 'technology', 'concept', 'glossary'], description: 'Optional filter: category overviews, individual projects and specifications, design principles, or reference pages.' },
            layer: { type: 'string', description: 'Optional filter by category slug, for example agent-harnesses or open-contracts.' },
          },
          additionalProperties: false,
        },
        execute: async (input) => {
          const kind = typeof input.kind === 'string' ? input.kind : undefined;
          const layer = typeof input.layer === 'string' ? input.layer : undefined;
          const matches = knowledgeBase.filter((entry) => (
            (!kind || entry.kind === kind) && (!layer || entry.layer === layer)
          ));
          return {
            count: matches.length,
            index: 'https://alexmercedai.com/knowledge-base',
            articles: matches.map(({ slug, title, kind: entryKind, layer: entryLayer, summary, url }) => ({
              slug, title, kind: entryKind, layer: entryLayer, summary, url,
            })),
          };
        },
        annotations: { readOnlyHint: true, untrustedContentHint: false },
      },
      {
        name: 'get_knowledge_base_article',
        title: 'Get a knowledge base article outline',
        description: 'Returns the summary, section outline, keywords, and primary sources for one knowledge base page. Fetch the returned URL for the full text.',
        inputSchema: {
          type: 'object',
          properties: { slug: { type: 'string', description: 'Article slug, for example merced-ai or open-agent-profile.' } },
          required: ['slug'],
          additionalProperties: false,
        },
        execute: async (input) => {
          const slug = typeof input.slug === 'string' ? input.slug : '';
          const entry = knowledgeBase.find((item) => item.slug === slug);
          if (!entry) {
            return {
              found: false,
              message: `No article with slug "${slug}".`,
              availableSlugs: knowledgeBase.map((item) => item.slug),
            };
          }
          return { found: true, ...entry };
        },
        annotations: { readOnlyHint: true, untrustedContentHint: false },
      },
      {
        name: 'search_knowledge_base',
        title: 'Search the knowledge base',
        description: 'Finds knowledge base pages whose title, summary, keywords, or section headings match a query. Returns ranked matches with canonical URLs.',
        inputSchema: {
          type: 'object',
          properties: { query: { type: 'string', description: 'Words to search for, for example "graph memory" or "capability narrowing".' } },
          required: ['query'],
          additionalProperties: false,
        },
        execute: async (input) => {
          const query = (typeof input.query === 'string' ? input.query : '').toLowerCase().trim();
          const terms = query.split(/\s+/).filter(Boolean);
          if (!terms.length) return { count: 0, matches: [] };
          const scored = knowledgeBase.map((entry) => {
            const title = entry.title.toLowerCase();
            const summary = entry.summary.toLowerCase();
            const keywords = entry.keywords.join(' ').toLowerCase();
            const sections = entry.sections.join(' ').toLowerCase();
            let score = 0;
            for (const term of terms) {
              if (title.includes(term)) score += 8;
              if (keywords.includes(term)) score += 4;
              if (summary.includes(term)) score += 3;
              if (sections.includes(term)) score += 2;
            }
            return { entry, score };
          }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 8);
          return {
            query,
            count: scored.length,
            matches: scored.map(({ entry, score }) => ({
              slug: entry.slug, title: entry.title, kind: entry.kind, summary: entry.summary, url: entry.url, score,
            })),
          };
        },
        annotations: { readOnlyHint: true, untrustedContentHint: false },
      },
      {
        name: 'get_alex_merced_newsletters',
        title: 'Get Alex Merced newsletters',
        description: 'Returns the two free weekly newsletters Alex Merced publishes and where to subscribe.',
        inputSchema: noInput,
        execute: async () => ({
          subscribeUrl: 'https://amdatalakehouse.substack.com',
          editions: [
            { day: 'Thursday', title: 'AI newsletter', covers: 'Model releases, agent tooling, protocols, and AI infrastructure from the past week.' },
            { day: 'Friday', title: 'Apache lakehouse newsletter', covers: 'What moved on the Apache Iceberg, Polaris, Arrow, and Parquet dev lists.' },
          ],
        }),
        annotations: { readOnlyHint: true, untrustedContentHint: false },
      },
      {
        name: 'list_alex_merced_ai_books',
        title: 'List Alex Merced AI books',
        description: 'Returns the nonfiction AI and agentic-systems books featured on AlexMercedAI.com.',
        inputSchema: noInput,
        execute: async () => ({
          count: aiBooks.length,
          books: aiBooks.map(({ title, description, slug, amazon }) => ({ title, description, url: `https://books.alexmerced.com/books/${slug}/`, amazon })),
          completeCatalog: 'https://books.alexmerced.com/',
        }),
        annotations: { readOnlyHint: true, untrustedContentHint: false },
      },
    ];

    Promise.allSettled(tools.map((tool) => context.registerTool(tool, { signal: controller.signal })));
    return () => controller.abort();
  }, [knowledgeBase]);

  return null;
}
