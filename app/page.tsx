import Link from 'next/link';
import Image from 'next/image';
import WebMCP from './WebMCP';
import { SiteHeader } from './_components/SiteHeader';
import { NewsletterBand, SiteFooter } from './_components/SiteFooter';
import { aiBooks, bookPage } from './_data/books';
import { installCommand, projects, registryUrl, repoUrl, starsBadge, versionBadge } from './_data/projects';
import { resolveProjects, type ResolvedProject } from './_lib/registry';
import { kbManifest } from './_data/kb-manifest';

const principles: [string, string, string, string][] = [
  ['01', 'Portable by default', 'Agents, profiles, and workflows should move without being rebuilt around a single vendor.', 'portable-by-default'],
  ['02', 'Authority is explicit', 'An agent should know what it may do, what requires approval, and where its responsibility ends.', 'explicit-authority'],
  ['03', 'State is inspectable', 'Memory, context, and execution history should be understandable rather than trapped behind a magic interface.', 'inspectable-state'],
  ['04', 'Claims need evidence', 'Useful autonomy comes from traceable decisions, observable work, and verifiable outcomes.', 'claims-need-evidence'],
];

const SPDX: Record<string, string[]> = {
  'Apache-2.0': ['https://spdx.org/licenses/Apache-2.0.html'],
  MIT: ['https://spdx.org/licenses/MIT.html'],
  'MIT OR Apache-2.0': ['https://spdx.org/licenses/MIT.html', 'https://spdx.org/licenses/Apache-2.0.html'],
};

const registryName = { pypi: 'PyPI', npm: 'npm' } as const;

function softwareSchema(resolved: ResolvedProject[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': resolved.map((project) => {
      const version = project.releaseTag ? project.releaseTag.replace(/^v/, '') : project.versions[0];
      const license = project.license ? SPDX[project.license] : undefined;
      return {
        '@type': 'SoftwareSourceCode',
        '@id': `https://alexmercedai.com/#software-${project.repo.toLowerCase()}`,
        name: project.name,
        description: project.description,
        url: `https://alexmercedai.com/knowledge-base/${project.slug}`,
        codeRepository: repoUrl(project),
        programmingLanguage: project.languages,
        ...(license ? { license: license.length === 1 ? license[0] : license } : {}),
        ...(version ? { softwareVersion: version } : {}),
        author: { '@id': 'https://alexmerced.com/#alexmerced' },
      };
    }),
  };
}

function ProjectCard({ project }: { project: ResolvedProject }) {
  const firstVersion = project.releaseTag ? project.releaseTag.replace(/^v/, '') : project.versions[0];
  return (
    <article className={`project-card ${project.tone}`}>
      <div className="card-meta"><span>{project.type}</span><span>github.com/{project.owner}</span></div>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      {project.specVersion ? (
        <p className="version-line"><strong>Specification:</strong> {project.specVersion}. <strong>Support libraries:</strong> {project.installs.map((target, index) => `${registryName[target.registry]} ${project.versions[index]}`).join(', ')}.</p>
      ) : null}
      {project.installs.length ? (
        <ul className="install-list">
          {project.installs.map((target, index) => (
            <li key={`${target.registry}-${target.pkg}`}>
              <code>{installCommand(target)}</code>
              <a href={registryUrl(target)} rel="noopener" className="badge-link" aria-label={`${target.pkg} ${project.versions[index]} on ${registryName[target.registry]}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={versionBadge(target)} alt={`${registryName[target.registry]} version`} height={20} loading="lazy" />
              </a>
              <span className="install-version">{registryName[target.registry]} {project.versions[index]}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {project.releases ? (
        <p className="version-line"><strong>Install:</strong> desktop app for macOS, Windows, and Linux, not published to npm. Latest release {project.releaseTag}: <a href={project.releases.url} rel="noopener">download from GitHub releases ↗</a></p>
      ) : null}
      <div className="badge-row">
        <a href={repoUrl(project)} rel="noopener" className="badge-link" aria-label={`${project.owner}/${project.repo} on GitHub`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={starsBadge(project)} alt="GitHub stars" height={20} loading="lazy" />
        </a>
        {project.license ? <span className="license">License: {project.license}</span> : null}
        {!project.specVersion && firstVersion ? <span className="license">Status: {firstVersion.startsWith('0.') ? 'pre-1.0 public release' : 'public release'}</span> : null}
      </div>
      <div className="project-links"><Link href={`/knowledge-base/${project.slug}`}>Read the explainer →</Link><a href={repoUrl(project)} rel="noopener">Source on GitHub ↗</a></div>
    </article>
  );
}

export default async function Home() {
  const resolved = await resolveProjects(projects);
  const tools = resolved.filter((project) => project.kind !== 'spec');
  const specs = resolved.filter((project) => project.kind === 'spec');
  const personal = resolved.filter((project) => project.owner === 'AlexMercedCoder').map((project) => project.name.replace(/ \(.*\)$/, ''));
  const org = resolved.filter((project) => project.owner === 'alexmerced-oss').map((project) => project.name.replace(/ \(.*\)$/, ''));
  const list = (names: string[]) => (names.length > 1 ? `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}` : names[0]);
  return (
    <main>
      <WebMCP knowledgeBase={kbManifest} />
      <SiteHeader />

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Alex Merced on agentic AI</p>
          <h1 className="hero-title">Open-source agent tools and specs by <em>Alex Merced</em></h1>
          <p className="hero-subline">AI should be open to inspection.</p>
          <p className="lede">I build open tools, specifications, and ideas for agentic systems that people can understand, govern, and move.</p>
          <div className="actions"><a className="button primary" href="#work">Install the tools ↓</a><Link className="button text" href="/knowledge-base">Read the knowledge base →</Link></div>
        </div>
        <div className="system-card" aria-label="Open agentic system diagram">
          <div className="system-top"><span>OPEN AGENTIC SYSTEM</span><span className="live">● LIVE</span></div>
          <div className="system-layer contracts"><small>CONTRACTS</small><div><b>AGS</b><b>OAP</b><b>AAIS</b></div></div>
          <span className="connector">↓ portable instructions</span>
          <div className="system-layer routing"><small>ROUTING</small><div><b>MER</b><span>Merced AI</span></div></div>
          <span className="connector">↓ governed delegation</span>
          <div className="system-layer execution"><small>EXECUTION</small><div><b>MagAgent</b><b>Loro</b><b>Your harness</b></div></div>
          <div className="system-foot"><span>MEMORY</span><span>POLICY</span><span>RECORDS</span></div>
        </div>
      </section>

      <section className="films" id="films">
        <div className="shell">
          <div className="films-heading"><p className="section-kicker">WATCH / THREE ORIGINAL FILMS</p><h2>Identity. Agents.<br />Open data.</h2><p>Three scene-rich music videos connect the person, the agentic platform, and the open lakehouse underneath modern AI.</p></div>
          <div className="film-grid">
            <article className="film-card"><video controls preload="metadata" playsInline poster="https://alexmerced.com/my-name-is-alex-poster.jpg" aria-label="My Name Is Alex music video"><source src="https://alexmerced.com/my-name-is-alex.mp4" type="video/mp4" /></video><div><span>PERSON / MUSIC VIDEO</span><h3>My Name Is Alex</h3><p>A personal, music-driven introduction to the builder behind the work.</p></div></article>
            <article className="film-card"><video controls preload="metadata" playsInline poster="https://openagenticplatform.com/open-the-stack-poster.jpg" aria-label="Open the Stack music video"><source src="https://openagenticplatform.com/open-the-stack.mp4" type="video/mp4" /></video><div><span>AGENTS / MUSIC VIDEO</span><h3>Open the Stack</h3><p>Composable agents, inspectable authority, model choice, and portable execution.</p></div></article>
            <article className="film-card"><video controls preload="metadata" playsInline poster="https://opendatalakehouse.com/the-iceberg-open-lakehouse-poster.jpg" aria-label="The Iceberg Open Lakehouse music video"><source src="https://opendatalakehouse.com/the-iceberg-open-lakehouse.mp4" type="video/mp4" /></video><div><span>DATA / MUSIC VIDEO</span><h3>The Iceberg Open Lakehouse</h3><p>The open data foundation that makes governed analytics and AI possible.</p></div></article>
          </div>
        </div>
      </section>

      <section className="manifesto" id="architecture">
        <div className="shell manifesto-grid"><p className="section-kicker">THE THESIS</p><blockquote>“The future of agentic AI is not one model, one agent, or one platform. It is <em>replaceable components</em> connected by open contracts.”</blockquote></div>
      </section>

      <section className="section shell" id="work">
        <div className="section-heading"><div><p className="section-kicker">INSTALL AND RUN</p><h2>Building the parts.<br />Defining the seams.</h2></div><p>Tools for brokerage, execution, memory, and governance. Every card shows the real package name, the version on the registry when this site was built, the license, and where the source lives. Each one has a full explainer in the <Link href="/knowledge-base">knowledge base</Link>.</p></div>
        <div className="project-grid">{tools.map((project) => <ProjectCard project={project} key={project.name} />)}</div>
      </section>

      <section className="section shell" id="specs">
        <div className="section-heading"><div><p className="section-kicker">OPEN SPECIFICATIONS</p><h2>Contracts you<br />can install.</h2></div><p>Each specification has two version numbers: the version of the specification document, and the version of the support libraries that parse and validate it. The document changes rarely. The libraries release more often.</p></div>
        <div className="project-grid">{specs.map((project) => <ProjectCard project={project} key={project.name} />)}</div>
      </section>

      <section className="section shell github-split" id="github">
        <div className="section-heading compact"><div><p className="section-kicker">WHERE THE CODE LIVES</p><h2>Two GitHub homes.</h2></div></div>
        <div className="split-grid">
          <article><h3><a href="https://github.com/AlexMercedCoder" rel="noopener">github.com/AlexMercedCoder ↗</a></h3><p>Alex&rsquo;s personal account since 2019. It holds hundreds of older projects, learning repos, and experiments. It is also home to {list(personal)}.</p></article>
          <article><h3><a href="https://github.com/alexmerced-oss" rel="noopener">github.com/alexmerced-oss ↗</a></h3><p>A separate GitHub organization for open-source agent tools and specs, kept apart from the personal account. It holds {list(org)}.</p></article>
        </div>
        <p className="split-note">The cards above name the owner of each repository, so every install badge and stars count points at the right place.</p>
      </section>

      <section className="standards" id="standards">
        <div className="shell standards-grid"><div><p className="section-kicker">OPEN CONTRACTS</p><h2>Standards make ecosystems possible.</h2><p>Open software is strongest when components share durable languages for work, identity, and human authorization.</p><Link className="kb-link" href="/knowledge-base/open-contracts">Read about open contracts →</Link></div><div className="standard-list"><Link href="/knowledge-base/agentic-graph-specification"><span className="standard-mark">AGS</span><div><b>Agentic Graph Specification</b><p>Portable graph-shaped work with explicit tools, policy, budgets, and success criteria.</p></div><span>SPEC 1.0 →</span></Link><Link href="/knowledge-base/open-agent-profile"><span className="standard-mark">OAP</span><div><b>Open Agent Profile</b><p>Portable agent identity, capabilities, authority, preferences, and state.</p></div><span>SPEC 1.0 →</span></Link><Link href="/knowledge-base/agent-approval-interchange-specification"><span className="standard-mark">AAIS</span><div><b>Agent Approval Interchange Specification</b><p>Exact, durable approval requests and decisions across CLI, web, desktop, and policy services.</p></div><span>SPEC 1.0 RC →</span></Link></div></div>
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
                <a href={bookPage(book)} rel="noopener">
                  <div className="book-cover"><Image src={book.cover} alt={`Cover of ${book.title}`} width={350} height={500} sizes="(max-width: 520px) 220px, 260px" /><span>{String(index + 1).padStart(2, '0')}</span></div>
                  <div className="book-copy"><h3>{book.title}</h3><p>{book.description}</p><b>About the book ↗</b></div>
                </a>
                <a className="book-buy" href={book.amazon} rel="noopener" data-network-event="book_amazon_click">Buy on Amazon ↗</a>
              </article>
            ))}
          </div>
          <p className="shelf-note">Scroll to explore all {aiBooks.length} titles →</p>
        </div>
      </section>

      <section className="about" id="about"><div className="shell about-grid"><div className="portrait">AM</div><div><p className="section-kicker">ABOUT ALEX</p><h2>Builder, educator,<br />open-systems advocate.</h2><p>Alex Merced works across data infrastructure, developer education, and agentic AI. His focus is making complex systems legible, and giving builders open foundations they can adapt, audit, and own.</p><div className="about-links"><a href="https://alexmerced.com">AlexMerced.com ↗</a><a href="https://openagenticplatform.com">OpenAgenticPlatform.com ↗</a><a href="https://www.alexmerceddata.com">Data work ↗</a><a href="https://www.alexmercedcoder.dev">Developer work ↗</a></div></div></div></section>

      <NewsletterBand />
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema(resolved)) }} />
    </main>
  );
}
