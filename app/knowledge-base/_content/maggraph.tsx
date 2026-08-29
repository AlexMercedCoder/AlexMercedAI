import type { Article } from './types';

export const article: Article = {
  slug: 'maggraph',
  title: 'MagGraph',
  kind: 'technology',
  layer: 'agent-memory',
  kicker: 'PROJECT / MEMORY',
  summary: 'A Rust-backed graph memory layer where knowledge lives as Markdown files in Git and edges emerge from links between them.',
  standfirst: 'MagGraph stores what an agent knows as versioned Markdown nodes in your repository. Edges come from wiki-style links, Git provides history and sync, and a Python API plus a generated protocol server make it usable by agents other than mine.',
  keywords: ['MagGraph', 'graph memory', 'agent memory', 'Markdown knowledge graph', 'Rust', 'Git-versioned memory', 'MCP server', 'recall'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'the-design-bet', label: 'The design bet' },
    { id: 'nodes-and-edges', label: 'Nodes and edges' },
    { id: 'recall', label: 'Recall as a subgraph' },
    { id: 'git', label: 'Why Git is the sync layer' },
    { id: 'rust', label: 'Why the core is Rust' },
    { id: 'separate', label: 'Why it is a separate project' },
    { id: 'lakehouse', label: 'Lakehouse mode' },
    { id: 'using-it', label: 'Using it outside MagAgent' },
    { id: 'limits', label: 'Limits and honest caveats' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'MagGraph on GitHub', href: 'https://github.com/AlexMercedCoder/MagGraph', note: 'Source, Python API, CLI, and the MCP server scaffold.' },
    { label: 'maggraph on PyPI', href: 'https://pypi.org/project/maggraph/', note: 'Installation and release history.' },
    { label: 'MagAgent', href: 'https://github.com/AlexMercedCoder/MagAgent', note: 'The harness built on this memory layer.' },
    { label: 'Model Context Protocol', href: 'https://modelcontextprotocol.io', note: 'The protocol the generated server speaks, which is how other agents reach the same memory.' },
  ],
  related: ['agent-memory', 'magagent', 'inspectable-state'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        MagGraph is an in-process graph database designed for AI semantic layers, with a Rust core and Python
        bindings. Knowledge is stored as versioned Markdown nodes in a Git repository. Edges emerge automatically
        from wiki-style links inside the content. Git provides versioning and sync. A generated protocol server makes
        the same memory reachable from agents that are not mine.
      </p>
      <p>
        The name comes from the magpie, a corvid, chosen for the family&apos;s association with memory and tool use.
        The naming is not decoration: memory is the organizing idea rather than one feature.
      </p>

      <h2 id="the-design-bet">The design bet</h2>
      <p>
        The bet is that the substrate matters more than the algorithm.
      </p>
      <p>
        Most agent memory systems are databases with an API. They work, and they have a property I found disqualifying
        in practice: you cannot see what is in them without tooling, you cannot correct a wrong fact without tooling,
        and you cannot take the contents anywhere else without an export path someone remembered to build.
      </p>
      <p>
        Memory accumulates errors. That is not a defect, it is what happens when a system draws conclusions from
        partial information. A store where correcting an error requires a special interface is a store where errors
        persist, and an agent operating on persistent wrong beliefs is worse than one with no memory at all, because
        it is confidently wrong in a stable way.
      </p>
      <p>
        So the substrate is Markdown files. You can open one in any editor and read it. You can fix a wrong line. You
        can grep the whole store. You can diff it, review it, and move it. Everything else in the design follows from
        deciding that first.
      </p>
      <div className="kb-callout">
        <b>The test I applied</b>
        <p>
          When an agent behaves strangely, can I open its memory and see why? If the answer requires special tooling,
          I will stop trusting the memory, and the usual next step is turning it off.
        </p>
      </div>

      <h2 id="nodes-and-edges">Nodes and edges</h2>
      <p>
        A node is a Markdown file with frontmatter carrying a name, a description, and metadata such as type. The body
        is the content: a fact, a decision, a convention, an observation about a project.
      </p>
      <p>
        Edges are not declared separately. They emerge from wiki-style links inside the body. Writing a link to
        another node creates the relationship, and backlinks are derived rather than maintained.
      </p>
      <p>
        This is the part of the design I would defend hardest, because it addresses the reason most knowledge graphs
        fail. A graph needs edges. If creating an edge is a separate modeling step, nobody does it consistently, and
        within a few weeks you have a slower key value store with a graph API on top. Making the link the natural way
        to reference another node means edges accumulate as a side effect of writing normally.
      </p>
      <p>
        It also means the content and the structure cannot drift apart. There is no separate edge table to fall out
        of sync with the text, because the text is the edge.
      </p>

      <h2 id="recall">Recall as a subgraph</h2>
      <p>
        The retrieval operation returns a connected subgraph rather than a ranked list of text fragments, and this is
        the functional difference from similarity search over a document store.
      </p>
      <p>
        Consider what an agent actually needs to know about a codebase convention. Not just the convention, but the
        constraint that motivated it, the decision it came from, whether a later decision superseded part of it, and
        who owns the area it applies to. Those are five nodes connected by edges.
      </p>
      <p>
        Similarity search returns the convention and, if you are lucky, something related that happens to use similar
        wording. Subgraph recall returns the convention and its neighborhood. In practice this shows up as an agent
        that can explain why a rule exists rather than only that it does, which is the difference between one that
        follows rules and one that can judge exceptions.
      </p>
      <p>
        Recall bundles let a caller ask for a starting point and a traversal depth, which is the knob that controls
        the tradeoff between context and completeness. Too shallow and you lose the reasoning. Too deep and recall
        crowds out the task, which is a real failure mode and one worth measuring rather than guessing at.
      </p>

      <h2 id="git">Why Git is the sync layer</h2>
      <p>
        Using Git rather than building sync was the least original decision in the project and probably the best one.
      </p>
      <p>
        Memory needs history, because the useful question is often not what does the agent believe but when did it
        start believing that. It needs conflict handling, because two machines will write. It needs backup. It needs
        the ability to review changes before accepting them. Building all of that is months of work that Git already
        does.
      </p>
      <p>
        It also brings properties I did not initially plan for and now rely on. Changes to what an agent believes
        arrive as commits, which means they can be reviewed like code. Reverting a bad learning session is a revert.
        Blame tells you which session introduced a fact.
      </p>
      <p>
        The leader and follower sync arrangement handles the multi-machine case without requiring a server, which
        keeps the whole thing local-first. Nothing about this memory requires a service to be running somewhere.
      </p>

      <h2 id="rust">Why the core is Rust</h2>
      <p>
        The core is Rust with Python bindings, which is a choice worth explaining because it looks like a preference
        and is actually about a specific latency budget.
      </p>
      <p>
        Memory recall happens inside the agent loop, often several times per task, and it happens before the model
        call rather than in parallel with it. Every millisecond of recall is a millisecond the user waits with
        nothing on screen. In an agent taking twelve steps, a recall that takes two hundred milliseconds adds nearly
        two and a half seconds of pure waiting to a single task.
      </p>
      <p>
        Parsing Markdown, maintaining an index over it, resolving links, and traversing a graph are exactly the kind
        of work where a compiled implementation matters, and where a pure Python one becomes noticeable as the store
        grows past a few thousand nodes. Since the whole point is that memory improves as it accumulates, a design
        that gets slower as it accumulates is self-defeating.
      </p>
      <p>
        The bindings matter as much as the core. Agent tooling is overwhelmingly Python, and a memory layer that
        requires a separate process or a network hop to reach from Python would have given back much of the speed it
        gained. In-process bindings keep recall cheap enough that an agent can afford to check memory when it is
        unsure rather than only when it is confident it should.
      </p>
      <p>
        None of this would justify Rust for a store of a few hundred notes. It justifies it for one that a person
        uses daily for years, which is the case I was building for.
      </p>

      <h2 id="separate">Why it is a separate project</h2>
      <p>
        MagGraph could have been a module inside MagAgent. Keeping it separate was deliberate and I think it is the
        more important half of the pair.
      </p>
      <p>
        Memory is the artifact that cannot be recreated. Everything else in an agentic system can be rebuilt from
        knowledge you still have: the harness, the tools, the prompts, the model choice. What an agent has learned
        about your work over months is the one thing that has no other source.
      </p>
      <p>
        That makes it exactly the wrong thing to trap inside a runtime. If memory lives in the harness, then changing
        harnesses means losing the accumulated learning, which means you will not change harnesses, which means the
        harness has become a commitment rather than a choice.
      </p>
      <p>
        Separating it, giving it a Python API, and generating a protocol server means another agent can read the same
        memory. That is the layering this whole site argues for, applied to the piece where it matters most.
      </p>

      <h2 id="lakehouse">Lakehouse mode</h2>
      <p>
        MagGraph includes a reader that connects graph memory to lakehouse tables, which is where my data work and my
        agent work meet.
      </p>
      <p>
        The motivation is a boundary that keeps causing trouble. Agent memory is what an agent learned. Organizational
        data is what the business knows. Systems that blur these end up writing business facts into agent memory,
        where nobody governs them, or writing agent observations into analytical tables, where they pollute reporting.
      </p>
      <p>
        The useful arrangement is that memory holds the interpretive layer, meaning what tables mean, which one is
        authoritative, what a metric is defined as, what was concluded from previous analyses, while the tables hold
        the facts. An agent recalls the interpretation and queries the data. Neither substitutes for the other.
      </p>
      <p>
        This is also why I care about semantic definitions living somewhere machine-readable. A memory node saying
        which revenue table is authoritative, linked to the decision that established it, is a semantic layer with
        provenance attached.
      </p>

      <h2 id="using-it">Using it outside MagAgent</h2>
      <p>
        MagGraph is usable on its own, and I would rather people used it that way than not at all.
      </p>
      <ul>
        <li><b>As a Python library.</b> Read, search, traverse, and write nodes directly, with async support.</li>
        <li><b>As a CLI.</b> Query, search, recall, scaffold, and sync from a terminal, which makes it scriptable.</li>
        <li><b>As a protocol server.</b> Generated from your graph, so any agent speaking the Model Context Protocol can read the same memory. This is the path that matters for interoperability.</li>
        <li><b>As a personal knowledge base.</b> It is Markdown with links. A human can use it without any agent involved, and several people do.</li>
      </ul>
      <p>
        That last one is not a joke. A memory format that is also a usable note-taking format means the agent and the
        person are writing into the same store, which removes a synchronization problem that otherwise appears
        immediately.
      </p>

      <h2 id="limits">Limits and honest caveats</h2>
      <ul>
        <li><b>It is a data store.</b> Whatever an agent learned is written down, including anything sensitive it encountered. Treat the repository with the care you would give the code it describes.</li>
        <li><b>Edges need writing habits.</b> If nodes are written without links, you have a slower key value store. The format encourages links; it cannot force them.</li>
        <li><b>Recall depth needs tuning.</b> Too deep and memory crowds out the task. This is worth measuring rather than assuming, which is why MagAgent ships memory evaluations.</li>
        <li><b>Git is not a database.</b> Very large graphs and very high write rates are not what this is built for. It is built for a person or a team, not for a service tier.</li>
        <li><b>Curation is required.</b> A store that accumulates without pruning or supersession degrades recall precision over time. That is unavoidable and it is why promotion should be deliberate.</li>
      </ul>

      <h3>Two things I would change</h3>
      <p>
        Being honest about a project I maintain: two decisions I would revisit. Automatic edge derivation from links
        is excellent when people write links and invisible when they do not, and I have not found a good way to
        prompt for the missing ones without becoming annoying. And I underestimated how much supersession matters.
        Marking that a new fact replaces an old one is more work at write time and it is the thing that keeps a
        long-lived store coherent, so it should have been more prominent in the design rather than something you can
        skip.
      </p>

      <h2 id="not">What it is not</h2>
      <p>
        MagGraph is not a vector database. It does not replace embedding search for finding relevant text in a large
        corpus. It is for structured, curated knowledge with relationships, which is a different job.
      </p>
      <p>
        MagGraph is not an agent. It stores and retrieves. Deciding what to store and when to recall belongs to the
        harness.
      </p>
      <p>
        MagGraph is not the organization&apos;s data layer. Facts that other systems need belong in governed storage.
        Memory is the interpretive layer on top, and keeping that boundary clear is what stops either one from
        becoming a shadow version of the other.
      </p>
    </>
  );
}
