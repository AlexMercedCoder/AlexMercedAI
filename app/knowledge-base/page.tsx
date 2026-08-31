import type { Metadata } from 'next';
import Link from 'next/link';
import WebMCP from '../WebMCP';
import { kbManifest } from '../_data/kb-manifest';
import { SiteHeader } from '../_components/SiteHeader';
import { NewsletterBand, SiteFooter } from '../_components/SiteFooter';
import { articles, conceptArticles, glossaryArticles, layerArticles, technologiesFor } from './_content';

export const metadata: Metadata = {
  title: 'Knowledge base',
  description: 'Plain-language reference pages for every project, specification, and design principle behind Alex Merced’s work in open agentic AI.',
  keywords: ['agentic AI knowledge base', 'Merced AI', 'Loro', 'MagAgent', 'MagGraph', 'Open Agent Profile', 'Agentic Graph Specification', 'Agent Approval Interchange Specification'],
  alternates: { canonical: '/knowledge-base' },
  openGraph: {
    title: 'Alex Merced AI knowledge base',
    description: 'Reference pages for every project, specification, and principle behind this work.',
    url: 'https://alexmercedai.com/knowledge-base',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Alex Merced AI knowledge base' }],
  },
};

const layerTone: Record<string, string> = {
  'agent-brokers': 'blue',
  'agent-harnesses': 'violet',
  'agent-memory': 'green',
  'open-contracts': 'orange',
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://alexmercedai.com/knowledge-base#page',
      name: 'Alex Merced AI knowledge base',
      description: 'Reference pages for every project, specification, and design principle behind this work.',
      url: 'https://alexmercedai.com/knowledge-base',
      isPartOf: { '@type': 'WebSite', '@id': 'https://alexmercedai.com/#website' },
      inLanguage: 'en-US',
    },
    {
      '@type': 'ItemList',
      '@id': 'https://alexmercedai.com/knowledge-base#index',
      name: 'Knowledge base articles',
      numberOfItems: articles.length,
      itemListElement: articles.map((entry, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: entry.title,
        url: `https://alexmercedai.com/knowledge-base/${entry.slug}`,
      })),
    },
  ],
};

export default function KnowledgeBaseIndex() {
  return (
    <main>
      <WebMCP knowledgeBase={kbManifest} />
      <SiteHeader />

      <section className="kb-hero shell">
        <p className="section-kicker">KNOWLEDGE BASE / REFERENCE</p>
        <h1>The work,<br />explained properly.</h1>
        <p className="kb-hero-copy">
          The homepage names the projects. These pages explain them. Each entry covers what something is, the
          problem it was built to solve, how it behaves in a real system, where it stops, and which primary sources
          to read next.
        </p>
      </section>

      {layerArticles.map((layer) => {
        const technologies = technologiesFor(layer.slug);
        return (
          <section className={`kb-group shell ${layerTone[layer.slug] ?? ''}`} key={layer.slug} id={layer.slug}>
            <div className="kb-group-head">
              <div>
                <p className="section-kicker">{layer.kicker}</p>
                <h2><Link href={`/knowledge-base/${layer.slug}`}>{layer.title}</Link></h2>
              </div>
              <p>{layer.summary}</p>
            </div>
            <div className="kb-card-grid">
              <Link className="kb-card feature" href={`/knowledge-base/${layer.slug}`}>
                <span>CATEGORY OVERVIEW</span>
                <b>{layer.title}</b>
                <p>{layer.standfirst}</p>
              </Link>
              {technologies.map((entry) => (
                <Link className="kb-card" href={`/knowledge-base/${entry.slug}`} key={entry.slug}>
                  <span>{entry.kicker}</span>
                  <b>{entry.title}</b>
                  <p>{entry.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {conceptArticles.length ? (
        <section className="kb-group shell" id="principles">
          <div className="kb-group-head">
            <div>
              <p className="section-kicker">DESIGN PRINCIPLES</p>
              <h2>Four operating principles</h2>
            </div>
            <p>The commitments that shape every project here, written out with what each one costs and where it is hard.</p>
          </div>
          <div className="kb-card-grid">
            {conceptArticles.map((entry) => (
              <Link className="kb-card" href={`/knowledge-base/${entry.slug}`} key={entry.slug}>
                <span>{entry.kicker}</span>
                <b>{entry.title}</b>
                <p>{entry.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {glossaryArticles.length ? (
        <section className="kb-group shell" id="reference">
          <div className="kb-group-head">
            <div>
              <p className="section-kicker">SHARED VOCABULARY</p>
              <h2>Reference</h2>
            </div>
            <p>Terms used consistently across this site, defined once so the rest of the pages can stay short.</p>
          </div>
          <div className="kb-card-grid">
            {glossaryArticles.map((entry) => (
              <Link className="kb-card" href={`/knowledge-base/${entry.slug}`} key={entry.slug}>
                <span>{entry.kicker}</span>
                <b>{entry.title}</b>
                <p>{entry.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <NewsletterBand />
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </main>
  );
}
