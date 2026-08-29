import Link from 'next/link';
import Image from 'next/image';
import WebMCP from './WebMCP';
import { SiteHeader } from './_components/SiteHeader';
import { NewsletterBand, SiteFooter } from './_components/SiteFooter';
import { aiBooks } from './_data/books';
import { kbManifest } from './_data/kb-manifest';

const projects = [
  { name: 'Merced AI', slug: 'merced-ai', version: '0.3.0', type: 'Agent broker', tone: 'blue', description: 'A provider-neutral broker for routing work across agents and model-powered tools.', href: 'https://github.com/AlexMercedCoder/merced-ai' },
  { name: 'Loro', slug: 'loro', version: '0.17.0', type: 'Governed harness', tone: 'violet', description: 'An agent harness built around explicit authority, policy, evidence, and durable records.', href: 'https://github.com/alexmerced-oss/loro' },
  { name: 'MagAgent', slug: 'magagent', version: '0.99.0', type: 'Developer harness', tone: 'orange', description: 'A practical Python agent framework for composing providers, tools, memory, and workflows.', href: 'https://github.com/AlexMercedCoder/MagAgent' },
  { name: 'MagGraph', slug: 'maggraph', version: '0.4.1', type: 'Agent memory', tone: 'green', description: 'A graph-shaped memory layer for representing relationships, context, and retrieval paths.', href: 'https://github.com/AlexMercedCoder/MagGraph' },
];

const principles: [string, string, string, string][] = [
  ['01', 'Portable by default', 'Agents, profiles, and workflows should move without being rebuilt around a single vendor.', 'portable-by-default'],
  ['02', 'Authority is explicit', 'An agent should know what it may do, what requires approval, and where its responsibility ends.', 'explicit-authority'],
  ['03', 'State is inspectable', 'Memory, context, and execution history should be understandable rather than trapped behind a magic interface.', 'inspectable-state'],
  ['04', 'Claims need evidence', 'Useful autonomy comes from traceable decisions, observable work, and verifiable outcomes.', 'claims-need-evidence'],
];

export default function Home() {
  return (
    <main>
      <WebMCP knowledgeBase={kbManifest} />
      <SiteHeader />

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Alex Merced on agentic AI</p>
          <h1>AI should be open<br />to <em>inspection.</em></h1>
          <p className="lede">I build open tools, specifications, and ideas for agentic systems that people can understand, govern, and move.</p>
          <div className="actions"><a className="button primary" href="#work">Explore the work ↓</a><Link className="button text" href="/knowledge-base">Read the knowledge base →</Link></div>
        </div>
        <div className="system-card" aria-label="Open agentic system diagram">
          <div className="system-top"><span>OPEN AGENTIC SYSTEM</span><span className="live">● LIVE</span></div>
          <div className="system-layer contracts"><small>CONTRACTS</small><div><b>AGS</b><b>OAP</b></div></div>
          <span className="connector">↓ portable instructions</span>
          <div className="system-layer routing"><small>ROUTING</small><div><b>MER</b><span>Merced AI</span></div></div>
          <span className="connector">↓ governed delegation</span>
          <div className="system-layer execution"><small>EXECUTION</small><div><b>MagAgent</b><b>Loro</b><b>Your harness</b></div></div>
          <div className="system-foot"><span>MEMORY</span><span>POLICY</span><span>RECORDS</span></div>
        </div>
      </section>

      <section className="manifesto" id="architecture">
        <div className="shell manifesto-grid"><p className="section-kicker">THE THESIS</p><blockquote>“The future of agentic AI is not one model, one agent, or one platform. It is <em>replaceable components</em> connected by open contracts.”</blockquote></div>
      </section>

      <section className="section shell" id="work">
        <div className="section-heading"><div><p className="section-kicker">SELECTED OPEN WORK</p><h2>Building the parts.<br />Defining the seams.</h2></div><p>Projects spanning brokerage, execution, memory, governance, and interoperability. Each one has a full explainer in the <Link href="/knowledge-base">knowledge base</Link>.</p></div>
        <div className="project-grid">{projects.map((project) => <Link className={`project-card ${project.tone}`} href={`/knowledge-base/${project.slug}`} key={project.name}><div className="card-meta"><span>{project.type}</span><span>v{project.version}</span></div><h3>{project.name}</h3><p>{project.description}</p><span className="card-link">Read the explainer →</span></Link>)}</div>
      </section>

      <section className="standards" id="standards">
        <div className="shell standards-grid"><div><p className="section-kicker">OPEN CONTRACTS</p><h2>Standards make ecosystems possible.</h2><p>Open software is strongest when its components share a durable language. These specifications focus on graph-shaped work and portable agent identity.</p><Link className="kb-link" href="/knowledge-base/open-contracts">Read about open contracts →</Link></div><div className="standard-list"><Link href="/knowledge-base/agentic-graph-specification"><span className="standard-mark">AGS</span><div><b>Agentic Graph Specification</b><p>A portable document format for defining nodes, edges, tools, policy, and execution intent.</p></div><span>1.0 →</span></Link><Link href="/knowledge-base/open-agent-profile"><span className="standard-mark">OAP</span><div><b>Open Agent Profile</b><p>A vendor-neutral profile for expressing an agent’s identity, capabilities, authority, and preferences.</p></div><span>1.0 →</span></Link></div></div>
      </section>

      <section className="section shell" id="principles">
        <div className="section-heading compact"><div><p className="section-kicker">DESIGN PRINCIPLES</p><h2>Open is an operating model.</h2></div></div>
        <div className="principle-grid">{principles.map(([number, title, body, slug]) => <article key={number}><span>{number}</span><h3><Link href={`/knowledge-base/${slug}`}>{title}</Link></h3><p>{body}</p></article>)}</div>
      </section>

      <section className="books" id="books">
        <div className="shell">
          <div className="books-heading">
            <div><p className="section-kicker">THE AI BOOKSHELF / {aiBooks.length} TITLES</p><h2>Ideas made<br />practical.</h2></div>
            <div><p>Explore Alex Merced’s nonfiction books on AI engineering, agentic systems, governance, evaluation, open models, semantic context, and the data foundations beneath modern AI.</p><a href="https://books.alexmerced.com" rel="noopener">Browse the complete book catalog ↗</a></div>
          </div>
          <div className="book-shelf" role="list" aria-label="AI books by Alex Merced">
            {aiBooks.map((book, index) => (
              <article className="book-card" role="listitem" key={book.title}>
                <a href={book.href} rel="noopener">
                  <div className="book-cover"><Image src={book.cover} alt={`Cover of ${book.title}`} width={350} height={500} sizes="(max-width: 520px) 220px, 260px" /><span>{String(index + 1).padStart(2, '0')}</span></div>
                  <div className="book-copy"><h3>{book.title}</h3><p>{book.description}</p><b>View book ↗</b></div>
                </a>
              </article>
            ))}
          </div>
          <p className="shelf-note">Scroll to explore all {aiBooks.length} titles →</p>
        </div>
      </section>

      <section className="about" id="about"><div className="shell about-grid"><div className="portrait">AM</div><div><p className="section-kicker">ABOUT ALEX</p><h2>Builder, educator,<br />open-systems advocate.</h2><p>Alex Merced works across data infrastructure, developer education, and agentic AI. His focus is making complex systems legible, and giving builders open foundations they can adapt, audit, and own.</p><div className="about-links"><a href="https://www.alexmerced.com">AlexMerced.com ↗</a><a href="https://openagenticplatform.com">OpenAgenticPlatform.com ↗</a><a href="https://www.alexmerceddata.com">Data work ↗</a><a href="https://www.alexmercedcoder.dev">Developer work ↗</a></div></div></div></section>

      <NewsletterBand />
      <SiteFooter />
    </main>
  );
}
