'use client';

import { useEffect } from 'react';
import { aiBooks } from './_data/books';

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

export default function WebMCP() {
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
          { name: 'Merced AI', version: '0.3.0', role: 'agent broker', url: 'https://github.com/AlexMercedCoder/merced-ai' },
          { name: 'Loro', version: '0.17.0', role: 'governed agent harness', url: 'https://github.com/alexmerced-oss/loro' },
          { name: 'MagAgent', version: '0.99.0', role: 'developer agent harness', url: 'https://github.com/AlexMercedCoder/MagAgent' },
          { name: 'MagGraph', version: '0.4.1', role: 'agent memory', url: 'https://github.com/AlexMercedCoder/MagGraph' },
        ] }),
        annotations: { readOnlyHint: true, untrustedContentHint: false },
      },
      {
        name: 'get_alex_merced_open_standards',
        title: 'Get Alex Merced open standards',
        description: 'Returns the AGS and OAP open specifications, their purpose, current document/support versions, and repository URLs.',
        inputSchema: noInput,
        execute: async () => ({ standards: [
          { name: 'Agentic Graph Specification', shortName: 'AGS', documentVersion: '1.0', supportVersion: '1.0.1', purpose: 'Portable agentic graph documents.', url: 'https://github.com/AlexMercedCoder/agentic-graph-spec' },
          { name: 'Open Agent Profile', shortName: 'OAP', documentVersion: '1.0', supportVersion: '1.0.1', purpose: 'Portable agent identity, capabilities, authority, and preferences.', url: 'https://github.com/alexmerced-oss/open-agent-profile' },
        ] }),
        annotations: { readOnlyHint: true, untrustedContentHint: false },
      },
      {
        name: 'list_alex_merced_ai_books',
        title: 'List Alex Merced AI books',
        description: 'Returns the nonfiction AI and agentic-systems books featured on AlexMercedAI.com.',
        inputSchema: noInput,
        execute: async () => ({
          count: aiBooks.length,
          books: aiBooks.map(({ title, description, href }) => ({ title, description, url: href })),
          completeCatalog: 'https://books.alexmerced.com/',
        }),
        annotations: { readOnlyHint: true, untrustedContentHint: false },
      },
    ];

    Promise.allSettled(tools.map((tool) => context.registerTool(tool, { signal: controller.signal })));
    return () => controller.abort();
  }, []);

  return null;
}
