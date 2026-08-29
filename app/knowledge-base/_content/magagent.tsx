import type { Article } from './types';

export const article: Article = {
  slug: 'magagent',
  title: 'MagAgent',
  kind: 'technology',
  layer: 'agent-harnesses',
  kicker: 'PROJECT / DEVELOPER HARNESS',
  summary: 'A terminal-native Python agent framework built around persistent graph memory, portable agent profiles, and a broad tool surface.',
  standfirst: 'MagAgent is the harness I use daily. Its organizing idea is memory: most agents forget everything between sessions, and this one is built so that what it learns about your projects, conventions, and preferences persists and compounds.',
  keywords: ['MagAgent', 'agent framework', 'Python agent', 'persistent memory', 'MagGraph', 'terminal agent', 'agent skills', 'language servers'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'memory-first', label: 'The memory-first bet' },
    { id: 'ecosystem', label: 'The Mag ecosystem' },
    { id: 'profiles', label: 'Agents as profiles' },
    { id: 'tools', label: 'Tools, language servers, and MCP' },
    { id: 'capability', label: 'Skills, recipes, and plugins' },
    { id: 'graphs', label: 'Graphs for planned work' },
    { id: 'sandboxes', label: 'Sandboxes and scoping' },
    { id: 'background', label: 'Background work' },
    { id: 'evals', label: 'Evaluation built in' },
    { id: 'daily-use', label: 'What daily use actually looks like' },
    { id: 'who-for', label: 'Who this is for' },
    { id: 'limits', label: 'Limits and honest caveats' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'MagAgent on GitHub', href: 'https://github.com/AlexMercedCoder/MagAgent', note: 'Source, documentation, and the roadmap toward 1.0.' },
    { label: 'mag-agent on PyPI', href: 'https://pypi.org/project/mag-agent/', note: 'Installation and release history.' },
    { label: 'MagGraph', href: 'https://github.com/AlexMercedCoder/MagGraph', note: 'The graph memory layer underneath.' },
    { label: 'Mag Command Center', href: 'https://github.com/AlexMercedCoder/MagCommandCenter', note: 'The desktop application for MagAgent projects, chat, memory, and configuration.' },
    { label: 'Open Agent Profile', href: 'https://github.com/alexmerced-oss/open-agent-profile', note: 'The profile specification MagAgent implements at Level 3.' },
  ],
  related: ['agent-harnesses', 'maggraph', 'loro'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        MagAgent is a terminal-native agent framework in Python, Apache 2.0 licensed. It handles coding and general
        productivity work: reading and editing files, running commands, searching the web, querying databases,
        generating documents, and orchestrating multi-step tasks.
      </p>
      <p>
        Two things distinguish it. Memory is a first-class component backed by a graph store that persists between
        sessions, not a session buffer. And agents are defined as portable profile documents rather than as
        configuration inside the tool.
      </p>
      <p>
        The name is short for magpie, a corvid. The family is known for memory, tool use, and problem solving, which
        is a reasonable summary of what I wanted the thing to be.
      </p>

      <h2 id="memory-first">The memory-first bet</h2>
      <p>
        The problem I built this around is the one every agent user recognizes. You explain your conventions, your
        architecture, and the three unusual decisions and why they were made. The session ends. Next time you explain
        them again.
      </p>
      <p>
        The approaches I tried before this all broke somewhere. Putting everything in the system prompt does not
        scale, because context is finite and a growing prompt dilutes the task. Summarizing conversations loses
        specifics, and specifics are usually the valuable part. Retrieval over past transcripts finds what was said
        rather than what was concluded, and gets worse as the store grows.
      </p>
      <p>
        MagAgent uses a persistent knowledge graph instead. Facts, decisions, and observations become nodes with
        relationships, stored as Markdown in a repository and versioned by Git. Retrieval pulls a connected subgraph
        rather than a similarity-ranked list of fragments, which returns connected context instead of isolated
        snippets.
      </p>
      <p>
        The design decision I feel most strongly about is that promotion into memory is explicit rather than
        automatic. This is counterintuitive and I am confident it is right. Memory that accumulates by default fills
        with noise, and noise competes in every future retrieval, so the system gets worse the more you use it.
        Requiring a deliberate promotion with a reason means memory grows slower and stays useful, and everything in
        it can be questioned because it was put there on purpose.
      </p>

      <h2 id="ecosystem">The Mag ecosystem</h2>
      <p>
        MagAgent is one of three related projects, and the separation is deliberate.
      </p>
      <ul>
        <li><b>MagGraph</b> is the memory layer: Rust-backed, Markdown nodes, Git-versioned, with its own Python API and a generated protocol server.</li>
        <li><b>MagAgent</b> is the harness: the loop, tools, providers, and terminal experience.</li>
        <li><b>Mag Command Center</b> is a cross-platform desktop application for projects, chat, configuration, memory, and plugins.</li>
      </ul>
      <p>
        Keeping memory in its own project is the part that matters architecturally. Memory is the artifact that
        cannot be recreated, and trapping it inside a runtime means changing runtimes costs everything the agent
        learned, which means you will not change runtimes. Because MagGraph exposes a protocol server, another agent
        entirely can read the same memory. That is the layering this site argues for, applied where it counts most.
      </p>

      <h2 id="profiles">Agents as profiles</h2>
      <p>
        MagAgent implements the Open Agent Profile specification at Level 3, storing agent definitions as files in
        the project or user directory rather than as internal configuration.
      </p>
      <p>
        A profile describes a named agent: role and instructions, model or capability tier, tools it may reach,
        permissions, and what previous sessions learned. Profiles support inheritance, so a specialized agent derives
        from a general one and narrows its capabilities, with narrowing the only permitted direction.
      </p>
      <p>
        Three consequences follow, and they are why I bothered.
      </p>
      <p>
        <b>Review.</b> A profile is a file. Someone who does not write Python can read it, diff it when it changes,
        and require it to pass review. Authority scattered through code cannot be audited because there is nothing to
        look at.
      </p>
      <p>
        <b>Sharing.</b> A useful agent becomes a file a colleague can copy. The reviewer that knows your conventions
        moves between machines and between people.
      </p>
      <p>
        <b>Portability.</b> Because the format is a published specification, another conformant harness reads the same
        profile. Running two harnesses becomes a configuration detail rather than a duplication problem.
      </p>

      <h2 id="tools">Tools, language servers, and MCP</h2>
      <p>
        MagAgent has a broad built-in tool surface covering files, shell, web search, HTTP, databases, and document
        generation, extended in two directions worth separating.
      </p>
      <p>
        <b>Language servers.</b> It runs real language server clients for Python, TypeScript and JavaScript, Rust, and
        Go, giving the agent actual symbol knowledge: definitions, references, diagnostics, hover, and rename. This
        replaces inference over text with lookup against a parsed project. The general principle is that a specific
        tool answering a question directly beats a general tool the model has to reason through, and symbol lookup is
        the clearest case of it I know.
      </p>
      <p>
        <b>MCP.</b> It connects to protocol servers over stdio and streamable HTTP, with catalogs of tools, prompts,
        and resources that invalidate when servers change. Integrations written once as servers are reachable without
        harness-specific work, which is the protocol doing its job.
      </p>
      <p>
        That combination is the shape I think an open harness should have. Deep native integration where the harness
        is the natural place for it, and a protocol boundary for everything else, so the tool ecosystem is not
        something the harness has to own.
      </p>

      <h2 id="capability">Skills, recipes, and plugins</h2>
      <p>
        Capability arrives through three mechanisms that solve different problems, and separating them keeps each one
        honest.
      </p>
      <p>
        <b>Skills</b> are portable folders of instructions loaded when relevant. This is knowledge: how to do a thing,
        in prose, reviewable by whoever owns the process.
      </p>
      <p>
        <b>Recipes</b> are saved reusable workflows for repeated operations such as release preparation, bug triage,
        documentation audits, dependency upgrades, and test repair. This is procedure with parameters, closer to a
        script.
      </p>
      <p>
        <b>Plugins</b> bundle agents, recipes, skills, tools, and MCP configuration, with importers that normalize
        assets from several other agent ecosystems into MagAgent-native form.
      </p>
      <p>
        That importing capability is the one I would highlight. Treating the wider ecosystem as a source rather than
        as competition means a team&apos;s existing procedures do not have to be rewritten to be usable here. If
        interoperability is the argument, importing other people&apos;s formats is where you demonstrate it rather
        than only claim it.
      </p>

      <h2 id="graphs">Graphs for planned work</h2>
      <p>
        MagAgent supports the Agentic Graph Specification, so a multi-step piece of work can be described as a
        document before it runs: nodes with briefs, typed inputs and outputs, success conditions, capability tiers,
        required tools and permissions, and human approval gates.
      </p>
      <p>
        The value is that the plan is reviewable before tokens are spent. An ordinary agent decomposes work
        internally, and by the time you see the decomposition the work is done. Writing it first moves review to
        where it is cheap.
      </p>
      <p>
        This is not right for everything. Conversational and exploratory work has no useful structure to write down,
        and forcing it into nodes produces a document that is wrong by the second step. Processes with branches,
        approval points, and consequences do have structure, and those are exactly the ones where an unreviewed plan
        is expensive.
      </p>

      <h2 id="sandboxes">Sandboxes and scoping</h2>
      <p>
        Saved plans and recipes can run inside sandboxes: a Git worktree, a copied workspace, or a Docker container.
        Each is a different point on the isolation and convenience curve.
      </p>
      <p>
        A worktree isolates changes from your working directory while sharing the repository, which suits parallel
        agent work on one project. A copied workspace isolates further at the cost of disk and setup. A container
        isolates the process, which is the option that bounds what a shell command can reach.
      </p>
      <p>
        Alongside sandboxes, profiles carry permissions and capability scoping, so a tool surface can be narrowed per
        profile rather than being global. This matters more than it sounds given the breadth of the built-in tools:
        tool selection quality degrades as the list grows, so scoping per profile is a quality improvement as much as
        a safety one.
      </p>

      <h2 id="background">Background work</h2>
      <p>
        A daemon queues background work: asks, recipes, plans, shell tasks, follow-ups, and tasks arriving through a
        gateway. This is structural rather than a convenience.
      </p>
      <p>
        An agent that only runs while someone watches can only answer. An agent with a queue can accept work now and
        finish it later, retry what failed, act on a schedule, and pick up a thread from a previous session. The
        difference is between a tool you use and a process that runs.
      </p>
      <p>
        It also raises the stakes on three things the interactive case tolerates. Bounded steps and spend, because
        nobody is watching the wrong turn. Durable state, because a restart should not lose the work. And a record
        complete enough to reconstruct what happened while you were away, because there is no memory of it other than
        what was written down.
      </p>

      <h2 id="evals">Evaluation built in</h2>
      <p>
        MagAgent includes isolated evaluation suites with independent validators, timing and token metrics, and
        reproducible offline and live-provider reports, plus separate evaluations for memory quality.
      </p>
      <p>
        The memory evaluations are the unusual part and they exist because memory fails silently. Recall returns
        something plausible but stale. Two contradictory facts both surface. The retrieved subgraph is large enough to
        crowd out the task. None of these produce an error. They produce gradually worse answers that get attributed
        to the model.
      </p>
      <p>
        Measuring precision, staleness, contradiction, provenance coverage, and the token cost of recall turns those
        into numbers. A memory-first design creates that risk for itself, so shipping the measurement alongside the
        feature seemed like the minimum honest thing to do.
      </p>

      <h2 id="daily-use">What daily use actually looks like</h2>
      <p>
        Feature lists are a poor description of a tool you use every day, so here is the honest version of how this
        gets used and what makes the difference between it being useful and being noise.
      </p>
      <h3>The first week is worse than a stateless agent</h3>
      <p>
        Memory has no content yet, and promotion feels like overhead for no return. This is the point where most
        people would turn it off. The return arrives around week three, when the agent stops needing to be told the
        same three things about a project, and it compounds from there. Knowing that in advance is most of what makes
        it survivable.
      </p>
      <h3>Configure providers by role, not globally</h3>
      <p>
        Setting a strong model for planning and a small fast one for classification and routing changes both cost and
        latency substantially, and it is a configuration step rather than an architectural one. Most people set one
        model and never revisit it, which means every trivial decision runs through the expensive path.
      </p>
      <h3>Write the project playbook early</h3>
      <p>
        Conventions, architectural boundaries, and things that look wrong but are deliberate belong in a file the
        agent reads rather than in a correction repeated every session. This is the same instinct as documentation,
        with a consumer that actually reads it, and it removes a surprising share of the friction people attribute to
        the model.
      </p>
      <h3>Commit in small pieces</h3>
      <p>
        Reviewing a hundred-line change is straightforward. Reviewing eight hundred lines produced in one session is
        not, and review is where correctness is actually established. Small commits also give a clean revert point
        when a direction turns out to be wrong.
      </p>
      <h3>Read the memory occasionally</h3>
      <p>
        It is Markdown in a repository. Skimming it monthly catches facts that went stale, conclusions drawn from a
        single ambiguous case, and duplicates that should be merged. Ten minutes of this is worth more than any
        amount of tuning, and it is the step nobody does unless they decide to.
      </p>

      <h2 id="who-for">Who this is for</h2>
      <ul>
        <li><b>Long-running relationships with a codebase.</b> Where the value comes from an agent that accumulates understanding rather than starting fresh daily.</li>
        <li><b>Python environments.</b> Where the harness being Python makes extension and embedding natural.</li>
        <li><b>Teams that want definitions in files.</b> Profiles, skills, and graphs under version control, reviewed like code.</li>
        <li><b>Mixed coding and non-coding work.</b> The tool surface extends into documents, databases, and web access.</li>
      </ul>
      <p>
        If your work needs demonstrable governance, identity-bound approvals, and delivered audit, I would point you
        at Loro instead. These are genuinely different products and I built both rather than compromising between
        them.
      </p>

      <h2 id="limits">Limits and honest caveats</h2>
      <ul>
        <li><b>Memory needs curation.</b> A graph that accumulates everything degrades recall. Explicit promotion is the mechanism, and someone has to use it.</li>
        <li><b>Memory is a data store.</b> Whatever the agent learned is written down, including anything sensitive it encountered. Treat the repository accordingly.</li>
        <li><b>Pre-1.0 surfaces move.</b> The project is approaching 1.0 and some integration surfaces are still stabilizing. The roadmap says which.</li>
        <li><b>Shell access is the boundary question.</b> As with any capable harness, running commands means the agent can do what you can, unless sandboxed.</li>
        <li><b>Breadth has a cost.</b> A large tool surface makes tool selection matter. Scope per profile.</li>
        <li><b>Language servers need a working project setup.</b> The symbol tooling is only as good as the project configuration underneath.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        MagAgent is not a broker. It runs agents. Deciding which of several installed harnesses should handle a
        request is a different job, which is what Merced AI does.
      </p>
      <p>
        MagAgent is not a model provider. It works against several and supplies none.
      </p>
      <p>
        MagAgent is not a hosted service. It runs on your machine, which means both the operational responsibility
        and the privacy properties are yours.
      </p>
    </>
  );
}
