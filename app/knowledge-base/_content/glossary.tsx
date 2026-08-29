import type { Article } from './types';

export const article: Article = {
  slug: 'glossary',
  title: 'Glossary',
  kind: 'glossary',
  layer: null,
  kicker: 'REFERENCE / SHARED VOCABULARY',
  summary: 'The terms I use across this site and in my projects, defined once, with notes on where common usage collapses distinctions worth keeping.',
  standfirst: 'Agentic AI has a vocabulary problem. The same word means different things in different documents, and several important distinctions get flattened. These are the definitions I use, and where I disagree with common usage I say so.',
  keywords: ['agentic AI glossary', 'agent terminology', 'harness', 'broker', 'profile', 'delta', 'capability tier', 'grounding'],
  sections: [
    { id: 'how-to-read', label: 'How to read this' },
    { id: 'agents', label: 'Agents and runtimes' },
    { id: 'models', label: 'Models and inference' },
    { id: 'context', label: 'Context and memory' },
    { id: 'tools', label: 'Tools and capability' },
    { id: 'contracts', label: 'Contracts and artifacts' },
    { id: 'governance', label: 'Authority and accountability' },
    { id: 'data', label: 'Data and semantics' },
    { id: 'openness', label: 'Kinds of open' },
    { id: 'confusions', label: 'Distinctions worth keeping' },
  ],
  learnMore: [
    { label: 'Open Agent Profile', href: 'https://github.com/alexmerced-oss/open-agent-profile', note: 'Normative definitions for profiles, deltas, state, and conformance levels.' },
    { label: 'Agentic Graph Specification', href: 'https://github.com/AlexMercedCoder/agentic-graph-spec', note: 'Normative definitions for nodes, edges, gates, tiers, and success conditions.' },
    { label: 'Agent Skills', href: 'https://agentskills.io', note: 'The specification defining what a skill is and how progressive disclosure works.' },
    { label: 'Model Context Protocol', href: 'https://modelcontextprotocol.io', note: 'Canonical definitions for tools, resources, and prompts as protocol primitives.' },
  ],
  related: ['agent-harnesses', 'open-contracts', 'agent-memory'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="how-to-read">How to read this</h2>
      <p>
        These are the definitions I use. They are not the only reasonable ones, and where common usage differs I have
        said so rather than pretending there is consensus.
      </p>
      <p>
        The grouping is by area rather than alphabetical, because most confusion in this vocabulary comes from pairs
        of terms that are related and different. Reading a group together makes the distinctions clearer than looking
        up one word at a time.
      </p>

      <h2 id="agents">Agents and runtimes</h2>
      <p>
        <b>Agent.</b> A system that pursues a goal by taking actions, observing results, and deciding what to do next.
        The defining property is the loop, not the intelligence. A program that calls a model once and returns the
        answer is not an agent regardless of how capable the model is.
      </p>
      <p>
        <b>Harness.</b> The software that runs an agent: the loop, context assembly, tool execution, state, limits,
        recording, and termination. Most of the engineering in an agentic system lives here.
      </p>
      <p>
        <b>Broker.</b> A component that decides which harness or agent should receive a piece of work, dispatches it,
        and collects the result. It does not run the loop. A broker that grows a loop has become a harness.
      </p>
      <p>
        <b>Bot.</b> In my tooling specifically, a profile bound to a preferred harness with an optional fallback. The
        definition plus the routing preference.
      </p>
      <p>
        <b>Subagent.</b> An agent spawned by another to handle a subtask, with its own context and usually its own
        limits.
      </p>
      <p>
        <b>Termination reason.</b> Why a loop ended: completed, step limit, spend limit, time limit, policy denial,
        error, or cancellation. One recorded field with disproportionate diagnostic value.
      </p>

      <h2 id="models">Models and inference</h2>
      <p>
        <b>Model.</b> The trained artifact that produces output from input. It contributes judgment and nothing else.
        It holds no state, executes nothing, and enforces nothing.
      </p>
      <p>
        <b>Provider.</b> An organization operating models and selling access.
      </p>
      <p>
        <b>Router.</b> A layer presenting one interface over several providers or models, applying policy, fallback,
        and cost decisions. Can be a service, a proxy, or a function in your own code.
      </p>
      <p>
        <b>Capability tier.</b> A normalized description of how strong a model needs to be for a task, so a portable
        artifact can express a requirement without naming a model. Used in both the profile and graph specifications
        for the same reason.
      </p>
      <p>
        <b>Fallback.</b> Routing to an alternative when the primary is unavailable. Falling back to a different model
        is a silent quality change and should be an explicit recorded field rather than something inferred.
      </p>

      <h2 id="context">Context and memory</h2>
      <p>
        <b>Context.</b> Everything sent to the model for one call: instructions, tool definitions, retrieved facts,
        prior steps, and the current request. Assembled fresh each step, and where most quality is won or lost.
      </p>
      <p>
        <b>Context assembly.</b> The harness work of deciding what goes into context and in what order. Most problems
        that look like model problems are context assembly problems.
      </p>
      <p>
        <b>Working state.</b> The current task: steps taken, results so far, the goal. Belongs to the harness and
        should survive a restart if the task is long.
      </p>
      <p>
        <b>Conversation history.</b> What was said. Grows without bound, has to be trimmed, and is mostly disposable.
      </p>
      <p>
        <b>Long-term memory.</b> What persists across tasks: preferences, prior decisions, learned facts. The hardest
        of the three, because writing indiscriminately produces noise that degrades every future retrieval.
      </p>
      <p>
        <b>Promotion.</b> The deliberate act of writing something into long-term memory, with a reason. My position
        is that this should be explicit rather than automatic, because memory that accumulates by default gets worse
        as it grows.
      </p>
      <p>
        <b>Supersession.</b> Marking that a new fact replaces an old one. More work at write time and the thing that
        keeps a long-lived memory store coherent.
      </p>
      <p>
        <b>Recall bundle.</b> A retrieved subgraph rather than a ranked list of fragments. Returns connected context,
        including the reasoning behind a fact rather than only the fact.
      </p>
      <p>
        <b>Compaction.</b> Summarizing earlier context to make room. Lossy by construction, and the loss is silent,
        which is why durable things should not live only in conversation history.
      </p>

      <h2 id="tools">Tools and capability</h2>
      <p>
        <b>Tool.</b> A function an agent can call, with described arguments. Model-controlled: the agent decides when
        to invoke it. Where side effects live.
      </p>
      <p>
        <b>Resource.</b> Data a client can read, addressed by identifier. Application-controlled: the client decides
        what to include rather than the model deciding to fetch.
      </p>
      <p>
        <b>Skill.</b> Packaged procedural knowledge: a folder with instructions and optional supporting files, loaded
        when relevant. Know-how, not capability.
      </p>
      <p>
        <b>Progressive disclosure.</b> Loading only names and descriptions until a task matches, then loading full
        instructions. What lets a large library of skills cost almost nothing until used.
      </p>
      <p>
        <b>Recipe.</b> In my tooling, a saved reusable workflow for a repeated operation. Procedure with parameters,
        closer to a script than to a skill.
      </p>
      <p>
        <b>MCP server.</b> A process exposing tools, resources, and prompts over the Model Context Protocol, usable by
        any conformant client.
      </p>

      <h2 id="contracts">Contracts and artifacts</h2>
      <p>
        <b>Specification.</b> A document complete enough that someone can build a compatible implementation without
        reading the reference implementation&apos;s source. A published document that does not meet that bar is
        documentation.
      </p>
      <p>
        <b>Profile.</b> A document describing a named agent: role, model or tier, tool surface, permissions, and
        accumulated state. Who an agent is, as distinct from what it knows or what it can reach.
      </p>
      <p>
        <b>Delta.</b> A structured description of what a session learned, applied to produce a new profile revision.
        Restricting deltas to the state section is what prevents an agent rewriting its own contract.
      </p>
      <p>
        <b>Proposal.</b> A recorded request for a capability change, with a written rationale, held for human review.
        The mechanism that turns a refusal into a decision with evidence.
      </p>
      <p>
        <b>Narrowing.</b> The rule that a profile can only reduce capability relative to what the harness already
        allows, never expand it. The property that makes a portable agent file safe to accept from anyone.
      </p>
      <p>
        <b>Digest.</b> A stable content identifier computed canonically, so formatting and field order do not change
        it. What lets an approval refer to exactly the artifact that was reviewed.
      </p>
      <p>
        <b>Conformance level.</b> A declared subset of a specification that an implementation supports. Useful only
        when implementations also publish what they do not support.
      </p>
      <p>
        <b>Projection.</b> Mapping a portable artifact onto a runtime supporting only part of it. Should be reported
        as native, approximated, degraded, or unsupported rather than silently applied.
      </p>
      <p>
        <b>Agentic graph.</b> A directed acyclic graph where nodes are bounded units of agentic work and edges are
        control-flow dependencies, written down so the plan can be reviewed before it runs.
      </p>
      <p>
        <b>Gate.</b> A node that holds for an explicit human decision. Most valuable before the first irreversible
        action and before an expensive fan-out.
      </p>
      <p>
        <b>Success condition.</b> A declared criterion for completion, evaluated by the harness rather than asserted
        by the model. Without one, done is a claim.
      </p>

      <h2 id="governance">Authority and accountability</h2>
      <p>
        <b>Authority.</b> What an agent is permitted to do, enforced by the code that executes actions rather than
        requested in a prompt.
      </p>
      <p>
        <b>Capability scoping.</b> Giving an agent only the tools it should have. A tool that is not registered cannot
        be called.
      </p>
      <p>
        <b>Credential vending.</b> A service issuing short-lived, scoped credentials to an authorized caller instead
        of clients holding long-lived keys.
      </p>
      <p>
        <b>Approval gate.</b> A pause before a class of action, displaying the specific proposed action. Only
        meaningful if it shows the real action and is rare enough that people still read them.
      </p>
      <p>
        <b>Delegated authority.</b> An agent acting on behalf of a person, scoped to what that person could do. What
        prevents an agent from becoming a privilege escalation path.
      </p>
      <p>
        <b>Trace.</b> The recorded sequence of a run: context, calls, results, decisions, termination. The primary
        debugging artifact.
      </p>
      <p>
        <b>Provenance.</b> A record connecting an artifact or a written row back to the run that produced it, usually
        bound by checksum or identifier.
      </p>
      <p>
        <b>Prompt injection.</b> Content placed where an agent will read it, written to influence its behavior.
        Defended against by treating everything a tool returns as data, never by prompt instructions.
      </p>

      <h2 id="data">Data and semantics</h2>
      <p>
        <b>Table format.</b> Metadata making a collection of files behave like a table, with atomic commits, schema
        evolution, and history. Not a file format and not a catalog.
      </p>
      <p>
        <b>Catalog.</b> The service that resolves table names, performs atomic commits, enforces access, and vends
        credentials. The control point of the data layer, and distinct from a business glossary, which is also
        commonly called a catalog.
      </p>
      <p>
        <b>Snapshot.</b> A point-in-time state of a table. Recording a snapshot identifier alongside an answer is what
        makes that answer reproducible later.
      </p>
      <p>
        <b>Semantic layer.</b> Written definitions of what data means: authoritative sources, metric definitions,
        relationships, grain, freshness, and trust level.
      </p>
      <p>
        <b>Grounding.</b> Working from retrieved facts and written meaning rather than from model recall. What makes
        an answer checkable rather than merely plausible.
      </p>

      <h2 id="openness">Kinds of open</h2>
      <p>
        <b>Open source.</b> Source available under a license permitting use, modification, and redistribution,
        including by competitors.
      </p>
      <p>
        <b>Open weights.</b> Trained parameters downloadable and runnable on your own hardware. Says nothing about
        training code, training data, or license terms.
      </p>
      <p>
        <b>Open format.</b> A documented data or file format multiple implementations can read.
      </p>
      <p>
        <b>Open interface.</b> A documented API implemented by more than one provider, which makes clients portable
        regardless of what is behind it.
      </p>
      <p>
        <b>Open standard.</b> A specification complete enough to implement from, with more than one independent
        implementation, changed in public under a stated process.
      </p>

      <h2 id="confusions">Distinctions worth keeping</h2>
      <p>
        The pairs that get collapsed, and what is lost when they are.
      </p>
      <div className="kb-table-scroll">
        <table className="kb-table">
          <thead><tr><th>Often treated as one</th><th>Actually</th></tr></thead>
          <tbody>
            <tr><td>Model and agent</td><td>The model judges. The agent loops, acts, remembers, and is bounded.</td></tr>
            <tr><td>Harness and broker</td><td>The harness runs work. The broker decides where work goes.</td></tr>
            <tr><td>Tool and skill</td><td>A tool is reach. A skill is know-how. Neither substitutes for the other.</td></tr>
            <tr><td>Profile and skill</td><td>Who the agent is versus how to perform a procedure.</td></tr>
            <tr><td>Memory and data</td><td>What an agent learned versus what the organization knows. Storing one as the other goes badly.</td></tr>
            <tr><td>Local and shared memory</td><td>One agent&apos;s working knowledge versus something others will treat as true.</td></tr>
            <tr><td>Policy and prompt</td><td>Enforcement in code versus a request to a model. Only one is a boundary.</td></tr>
            <tr><td>Inspectable and auditable</td><td>Debugging now versus reconstructing months later. Different retention, integrity, and audience.</td></tr>
            <tr><td>Replaceable and portable</td><td>Can you swap the component versus does what you built move with you.</td></tr>
            <tr><td>Open source and open weights</td><td>The recipe versus the artifact.</td></tr>
            <tr><td>Specification version and library version</td><td>The document versus the tooling. Conflating them makes a stable standard look like it is churning.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Most of the circular architecture arguments I have been in resolved once one of these pairs was separated. If
        a discussion is going nowhere, checking whether two things in one row are being treated as one is usually
        productive.
      </p>
    </>
  );
}
