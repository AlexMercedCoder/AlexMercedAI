import WebMCP from './WebMCP';

const projects = [
  { name: 'Merced AI', version: '0.3.0', type: 'Agent broker', tone: 'blue', description: 'A provider-neutral broker for routing work across agents and model-powered tools.', href: 'https://github.com/AlexMercedCoder/merced-ai' },
  { name: 'Loro', version: '0.17.0', type: 'Governed harness', tone: 'violet', description: 'An agent harness built around explicit authority, policy, evidence, and durable records.', href: 'https://github.com/alexmerced-oss/loro' },
  { name: 'MagAgent', version: '0.99.0', type: 'Developer harness', tone: 'orange', description: 'A practical Python agent framework for composing providers, tools, memory, and workflows.', href: 'https://github.com/AlexMercedCoder/MagAgent' },
  { name: 'MagGraph', version: '0.4.1', type: 'Agent memory', tone: 'green', description: 'A graph-shaped memory layer for representing relationships, context, and retrieval paths.', href: 'https://github.com/AlexMercedCoder/MagGraph' },
];

const principles = [
  ['01', 'Portable by default', 'Agents, profiles, and workflows should move without being rebuilt around a single vendor.'],
  ['02', 'Authority is explicit', 'An agent should know what it may do, what requires approval, and where its responsibility ends.'],
  ['03', 'State is inspectable', 'Memory, context, and execution history should be understandable—not trapped behind a magic interface.'],
  ['04', 'Claims need evidence', 'Useful autonomy comes from traceable decisions, observable work, and verifiable outcomes.'],
];

export default function Home() {
  return (
    <main>
      <WebMCP />
      <header className="site-header shell">
        <a className="brand" href="#top" aria-label="Alex Merced AI home"><span>AM</span><b>AlexMercedAI</b></a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a><a href="#architecture">Architecture</a><a href="#principles">Principles</a><a className="nav-cta" href="https://github.com/AlexMercedCoder">GitHub ↗</a>
        </nav>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Alex Merced on agentic AI</p>
          <h1>AI should be open<br />to <em>inspection.</em></h1>
          <p className="lede">I build open tools, specifications, and ideas for agentic systems that people can understand, govern, and move.</p>
          <div className="actions"><a className="button primary" href="#work">Explore the work ↓</a><a className="button text" href="https://www.alexmerced.com">About Alex ↗</a></div>
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
        <div className="section-heading"><div><p className="section-kicker">SELECTED OPEN WORK</p><h2>Building the parts.<br />Defining the seams.</h2></div><p>Projects spanning brokerage, execution, memory, governance, and interoperability.</p></div>
        <div className="project-grid">{projects.map((project) => <a className={`project-card ${project.tone}`} href={project.href} key={project.name}><div className="card-meta"><span>{project.type}</span><span>v{project.version}</span></div><h3>{project.name}</h3><p>{project.description}</p><span className="card-link">View repository ↗</span></a>)}</div>
      </section>

      <section className="standards">
        <div className="shell standards-grid"><div><p className="section-kicker">OPEN CONTRACTS</p><h2>Standards make ecosystems possible.</h2><p>Open software is strongest when its components share a durable language. These specifications focus on graph-shaped work and portable agent identity.</p></div><div className="standard-list"><a href="https://github.com/AlexMercedCoder/agentic-graph-spec"><span className="standard-mark">AGS</span><div><b>Agentic Graph Specification</b><p>A portable document format for defining nodes, edges, tools, policy, and execution intent.</p></div><span>1.0 / 1.0.1 ↗</span></a><a href="https://github.com/alexmerced-oss/open-agent-profile"><span className="standard-mark">OAP</span><div><b>Open Agent Profile</b><p>A vendor-neutral profile for expressing an agent’s identity, capabilities, authority, and preferences.</p></div><span>1.0 / 1.0.1 ↗</span></a></div></div>
      </section>

      <section className="section shell" id="principles">
        <div className="section-heading compact"><div><p className="section-kicker">DESIGN PRINCIPLES</p><h2>Open is an operating model.</h2></div></div>
        <div className="principle-grid">{principles.map(([number,title,body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      </section>

      <section className="about"><div className="shell about-grid"><div className="portrait">AM</div><div><p className="section-kicker">ABOUT ALEX</p><h2>Builder, educator,<br />open-systems advocate.</h2><p>Alex Merced works across data infrastructure, developer education, and agentic AI. His focus is making complex systems legible—and giving builders open foundations they can adapt, audit, and own.</p><div className="about-links"><a href="https://www.alexmerced.com">AlexMerced.com ↗</a><a href="https://www.alexmerceddata.com">Data work ↗</a><a href="https://www.alexmercedcoder.dev">Developer work ↗</a></div></div></div></section>

      <footer className="shell"><a className="brand" href="#top"><span>AM</span><b>AlexMercedAI</b></a><p>Open components. Explicit contracts. Accountable agents.</p><span>© 2026 Alex Merced</span></footer>
    </main>
  );
}
