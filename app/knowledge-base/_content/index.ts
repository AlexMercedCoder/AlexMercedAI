import type { Article } from './types';

import { article as agentBrokers } from './agent-brokers';
import { article as agentHarnesses } from './agent-harnesses';
import { article as agentMemory } from './agent-memory';
import { article as openContracts } from './open-contracts';

import { article as mercedAi } from './merced-ai';
import { article as loro } from './loro';
import { article as magagent } from './magagent';
import { article as maggraph } from './maggraph';
import { article as agenticGraphSpecification } from './agentic-graph-specification';
import { article as openAgentProfile } from './open-agent-profile';

import { article as portableByDefault } from './portable-by-default';
import { article as explicitAuthority } from './explicit-authority';
import { article as inspectableState } from './inspectable-state';
import { article as claimsNeedEvidence } from './claims-need-evidence';

import { article as glossary } from './glossary';

export const articles: Article[] = [
  agentBrokers,
  agentHarnesses,
  agentMemory,
  openContracts,

  mercedAi,
  loro,
  magagent,
  maggraph,
  agenticGraphSpecification,
  openAgentProfile,

  portableByDefault,
  explicitAuthority,
  inspectableState,
  claimsNeedEvidence,

  glossary,
];

export const articlesBySlug = new Map(articles.map((entry) => [entry.slug, entry]));

export const layerArticles = articles.filter((entry) => entry.kind === 'layer');

export function technologiesFor(layerSlug: string): Article[] {
  return articles.filter((entry) => entry.kind === 'technology' && entry.layer === layerSlug);
}

export const conceptArticles = articles.filter((entry) => entry.kind === 'concept');
export const glossaryArticles = articles.filter((entry) => entry.kind === 'glossary');

export type { Article };
