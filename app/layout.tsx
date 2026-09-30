import type { Metadata, Viewport } from 'next';
import './globals.css';
import { articles } from './knowledge-base/_content';
import { aiBooks, bookPage } from './_data/books';
import { getNetwork, getNetworkHeadScripts } from './_lib/network';

const network = getNetwork();
const headScripts = getNetworkHeadScripts();
const ALEX = { '@id': 'https://alexmerced.com/#alexmerced' };

const BASE = 'https://alexmercedai.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: { default: 'Open-source agent tools and specs by Alex Merced | Alex Merced AI', template: '%s | Alex Merced AI' },
  description: 'Open-source agent tools and specs by Alex Merced: Merced AI, Loro, MagAgent, MagGraph, Mag Command Center, AGS, OAP, and AAIS, with install commands, versions, licenses, and a knowledge base for each.',
  applicationName: 'Alex Merced AI',
  authors: [{ name: 'Alex Merced', url: 'https://alexmerced.com' }],
  creator: 'Alex Merced',
  publisher: 'Alex Merced',
  category: 'technology',
  keywords: [
    'Alex Merced', 'agentic AI', 'open source AI', 'Merced AI', 'Loro', 'MagAgent', 'Mag Command Center', 'MagGraph',
    'Agentic Graph Specification', 'AGS', 'Open Agent Profile', 'OAP', 'Agent Approval Interchange Specification', 'AAIS', 'agent broker', 'agent harness',
    'agent memory', 'Model Context Protocol', 'MCP', 'Agent Skills', 'portable agents', 'agent governance',
    'AI books', 'AI engineering',
  ],
  alternates: { canonical: '/', types: { 'text/plain': '/llms.txt' } },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  referrer: 'origin-when-cross-origin',
  openGraph: { title: 'Alex Merced AI', description: 'Open components. Explicit contracts. Accountable agents.', url: BASE, siteName: 'Alex Merced AI', type: 'website', locale: 'en_US', images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Alex Merced AI: open components, accountable agents' }] },
  twitter: { card: 'summary_large_image', site: network.twitterSite, title: 'Alex Merced AI', description: 'Open components. Explicit contracts. Accountable agents.', images: ['/og.png'] },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#f4f0e8', colorScheme: 'light' };

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${BASE}/#website`,
      name: 'Alex Merced AI',
      url: `${BASE}/`,
      description: 'Alex Merced’s work and advocacy across open agentic AI.',
      inLanguage: 'en-US',
      author: ALEX,
      publisher: ALEX,
      hasPart: { '@id': `${BASE}/knowledge-base#collection` },
    },
    {
      '@type': 'ItemList',
      '@id': `${BASE}/#projects`,
      name: 'Alex Merced open agentic AI projects',
      numberOfItems: 7,
      itemListElement: [
        { name: 'Merced AI', slug: 'merced-ai' },
        { name: 'Loro', slug: 'loro' },
        { name: 'MagAgent', slug: 'magagent' },
        { name: 'MagGraph', slug: 'maggraph' },
        { name: 'Agentic Graph Specification', slug: 'agentic-graph-specification' },
        { name: 'Open Agent Profile', slug: 'open-agent-profile' },
        { name: 'Agent Approval Interchange Specification', slug: 'agent-approval-interchange-specification' },
      ].map((entry, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: entry.name,
        url: `${BASE}/knowledge-base/${entry.slug}`,
      })),
    },
    {
      '@type': 'CollectionPage',
      '@id': `${BASE}/knowledge-base#collection`,
      name: 'Alex Merced AI knowledge base',
      url: `${BASE}/knowledge-base`,
      description: `Reference pages covering every project, specification, and design principle behind this work. ${articles.length} articles.`,
      isPartOf: { '@id': `${BASE}/#website` },
      inLanguage: 'en-US',
      author: ALEX,
      mainEntity: {
        '@type': 'ItemList',
        name: 'Knowledge base articles',
        numberOfItems: articles.length,
        itemListElement: articles.map((entry, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: entry.title,
          url: `${BASE}/knowledge-base/${entry.slug}`,
        })),
      },
    },
    {
      '@type': 'ItemList',
      '@id': `${BASE}/#books`,
      name: 'AI and agentic systems books by Alex Merced',
      numberOfItems: aiBooks.length,
      itemListElement: aiBooks.map((book, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Book',
          name: book.title,
          description: book.description,
          url: bookPage(book),
          author: ALEX,
        },
      })),
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {headScripts.map((script, index) =>
          script.src ? (
            <script key={index} async={script.async} src={script.src} />
          ) : (
            <script key={index} type={script.type} dangerouslySetInnerHTML={{ __html: script.content }} />
          ),
        )}
      </head>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
