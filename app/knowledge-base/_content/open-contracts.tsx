import type { Article } from './types';

export const article: Article = {
  slug: 'open-contracts',
  title: 'Open contracts',
  kind: 'layer',
  layer: null,
  kicker: 'CATEGORY / INTEROPERABILITY',
  summary: 'The specifications that let agent definitions, capability, and plans move between runtimes instead of being rebuilt.',
  standfirst: 'Every agentic system defines what an agent is, what it knows how to do, what it can reach, and what shape a piece of work takes. The only question is whether those definitions belong to your organization or to whichever tool you adopted first.',
  keywords: ['open contracts', 'agent standards', 'AGS', 'OAP', 'Agent Skills', 'MCP', 'interoperability', 'portable agents'],
  sections: [
    { id: 'what-they-are', label: 'What open contracts are' },
    { id: 'the-gap', label: 'The gap I was trying to fill' },
    { id: 'four-questions', label: 'Four questions, four contracts' },
    { id: 'why-write-specs', label: 'Why write specifications at all' },
    { id: 'what-makes-real', label: 'What makes a specification real' },
    { id: 'safety-rules', label: 'A portable format needs safety rules' },
    { id: 'honesty', label: 'Honest partial support' },
    { id: 'together', label: 'How they compose' },
    { id: 'versioning', label: 'Versioning and support libraries' },
    { id: 'adopting', label: 'Adopting contracts incrementally' },
    { id: 'not', label: 'What contracts do not do' },
  ],
  learnMore: [
    { label: 'Open Agent Profile', href: 'https://github.com/alexmerced-oss/open-agent-profile', note: 'My specification for persisting a named agent as a file, with a conformance suite and support libraries.' },
    { label: 'Agentic Graph Specification', href: 'https://github.com/AlexMercedCoder/agentic-graph-spec', note: 'My specification for decomposing a project into a reviewable graph of bounded agentic loops.' },
    { label: 'Agent Skills', href: 'https://agentskills.io', note: 'The capability format, developed by Anthropic and released as an open standard.' },
    { label: 'Model Context Protocol', href: 'https://modelcontextprotocol.io', note: 'The connection protocol, and the most widely adopted contract in this layer.' },
    { label: 'Open Agentic Platform', href: 'https://openagenticplatform.com/knowledge-base/open-standards', note: 'The vendor-neutral treatment of this layer.' },
  ],
  related: ['open-agent-profile', 'agentic-graph-specification', 'portable-by-default'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-they-are">What open contracts are</h2>
      <p>
        Open contracts are the specifications that describe agentic artifacts in a form more than one runtime can
        read. Who an agent is. What it knows how to do. What it can reach. What shape a piece of work takes.
      </p>
      <p>
        Every agentic system already has answers to those four questions. The answers exist whether or not anyone
        chose a format for them. What varies is whether they live in something portable or inside one product&apos;s
        configuration.
      </p>

      <h2 id="the-gap">The gap I was trying to fill</h2>
      <p>
        When I started building agent tooling seriously, two of the four questions already had good answers.
      </p>
      <p>
        The Model Context Protocol answered what an agent can reach, and answered it well enough that integrations
        written once became usable everywhere. Agent Skills answered what an agent knows how to do, and did it in a
        format a domain expert could write and review.
      </p>
      <p>
        The other two had nothing. There was no portable way to say who an agent is, which meant every useful agent I
        built died with its session or lived in a format only one tool read. And there was no portable way to write
        down the shape of a piece of work, which meant every harness planned internally, in its own shape, and threw
        the plan away when the session ended.
      </p>
      <p>
        Those two gaps are why I wrote the Open Agent Profile and the Agentic Graph Specification. Not because the
        world needed more specifications, but because I kept rebuilding the same agent in different tools and kept
        paying for plans I could not review before they ran.
      </p>

      <h2 id="four-questions">Four questions, four contracts</h2>
      <p>
        These do not compete. They answer different questions, and a serious system uses all four.
      </p>
      <div className="kb-table-scroll">
        <table className="kb-table">
          <thead><tr><th>Question</th><th>Contract</th><th>Artifact</th></tr></thead>
          <tbody>
            <tr><td>What can this agent reach?</td><td>Model Context Protocol</td><td>A running server exposing tools and resources</td></tr>
            <tr><td>What does it know how to do?</td><td>Agent Skills</td><td>A folder of instructions and supporting files</td></tr>
            <tr><td>Who is it, and what has it learned?</td><td>Open Agent Profile</td><td>A profile document with a contract and a state section</td></tr>
            <tr><td>What is the shape of this work?</td><td>Agentic Graph Specification</td><td>A graph of bounded agentic loops with gates and budgets</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The clearest way I have found to say it: skills are what an agent knows how to do, MCP is what it can reach,
        harness configuration is what it is allowed to do, and a profile is who it is and what it has learned. A graph
        is the fifth thing, describing the work rather than the worker.
      </p>

      <h2 id="why-write-specs">Why write specifications at all</h2>
      <p>
        Writing a specification is a strange amount of work for something that ships no features, so it is worth
        being clear about the reasoning.
      </p>
      <p>
        The situation I kept hitting was this. I would define an agent that was genuinely useful. A reviewer that
        knew my conventions, a researcher that cited the way I wanted, a data agent that had learned my table layout.
        Then the session ended, or I switched tools, or a colleague wanted the same thing, and there was nothing to
        hand over.
      </p>
      <p>
        Keeping a process alive is the obvious fix and the wrong one. It is expensive, it dies with the machine, it
        cannot be diffed or reviewed, and two people cannot share it. The right fix is to persist the agent as data.
      </p>
      <p>
        Once you decide that, you need a format. And once you have a format, you have two options: keep it private,
        which reproduces the problem one layer up, or specify it publicly so other implementations can read it. The
        second is more work and it is the only one that actually solves anything.
      </p>

      <h2 id="what-makes-real">What makes a specification real</h2>
      <p>
        Publishing a document is not the same as having a standard. I hold my own work to these, and I recommend
        applying them to anyone else&apos;s, including mine.
      </p>
      <ul>
        <li>
          <b>Complete enough to implement from.</b> If building a compatible implementation requires reading the
          reference implementation&apos;s source, you have documentation rather than a specification.
        </li>
        <li>
          <b>More than one independent implementation.</b> The strongest signal by a wide margin. Until a second
          implementation exists, nobody has tested whether the document was sufficient.
        </li>
        <li>
          <b>A conformance suite with negative cases.</b> A specification is defined as much by what it rejects as by
          what it accepts. An implementation that accepts an invalid artifact will produce something nobody reviewed.
        </li>
        <li>
          <b>Canonical digests.</b> Because artifacts can be written in several encodings with fields in any order,
          comparing them textually is unreliable. A stable content identifier is what lets you say the thing running
          is the thing that was approved.
        </li>
        <li>
          <b>A license permitting implementation without permission.</b> Including by people building something that
          competes with yours.
        </li>
        <li>
          <b>Public change process.</b> Versioning, deprecation, and a visible record of decisions.
        </li>
      </ul>
      <p>
        I will be honest that my specifications score well on most of these and are young. They have schemas,
        conformance suites with negative fixtures, cross-language support libraries tested against a shared corpus,
        and a small number of known implementations. That last number is the one that matters most and the one I have
        least control over.
      </p>

      <h2 id="safety-rules">A portable format needs safety rules</h2>
      <p>
        This is the part I did not anticipate when I started and now consider the most important design work in the
        whole category.
      </p>
      <p>
        A file that describes what an agent may do is a security question, not a convenience. If a profile can grant
        capability, then acquiring a profile from anywhere and running it is an escalation mechanism. If an agent can
        write to its own profile, then a single successful prompt injection becomes permanent: the attacker persuades
        the agent once, the agent writes the instruction into its own definition, and every future session starts
        already compromised.
      </p>
      <p>
        The Open Agent Profile answers this with three rules, and each one closes a hole the others leave.
      </p>
      <p>
        <b>A profile narrows, never widens.</b> A harness grants the intersection of what the profile asks for and
        what its own policy allows. There is no field or flag that reverses this. Moving a profile to a new machine
        can never grant capability the harness would not otherwise give, which is what makes a profile safe to accept
        from anyone.
      </p>
      <p>
        <b>An agent cannot rewrite its own contract.</b> Sessions emit a delta, and delta operations may only touch
        the state section. Changes to tools, permissions, model, or instructions go into a proposals block with a
        written rationale and wait for a human. This holds under every writeback setting, including automatic,
        because a boundary that configuration can relax is not a boundary.
      </p>
      <p>
        <b>Learned state is untrusted content.</b> Text an agent wrote about itself is injected as information, never
        as authority. A state entry saying the shell may now be used without asking changes nothing.
      </p>
      <div className="kb-callout">
        <b>The general lesson</b>
        <p>
          Any format that makes something portable also makes it acquirable from elsewhere. Portability without
          narrowing rules is a distribution channel for capability grants. This applies well beyond agent profiles.
        </p>
      </div>

      <h2 id="honesty">Honest partial support</h2>
      <p>
        The second design principle I would carry to any specification work: implementations must publish what they
        do not implement.
      </p>
      <p>
        Partial support is fine. Nobody implements a whole specification on day one, and conformance levels exist
        precisely so that partial support can be declared rather than approximated. Partial support that looks
        complete is not fine, because someone will review an artifact, run it somewhere else, and get a different
        agent than the one they read.
      </p>
      <p>
        This is the same principle as the projection reporting a broker needs, arrived at from a different direction.
        Silent degradation is the failure mode that destroys trust in portable formats, and once trust is gone people
        stop writing artifacts and go back to product configuration, which is where they started.
      </p>

      <h2 id="together">How they compose</h2>
      <p>
        The division of labor is easiest to see by following one request through a system that uses all four.
      </p>
      <p>
        An engineer asks an agent to investigate why a nightly job failed and open a ticket if the cause is known.
      </p>
      <ol>
        <li>
          <b>The profile loads first.</b> It establishes which agent this is, that it may read logs and job metadata,
          that it may create tickets in one project, and that it may not restart jobs without approval. The harness
          knows the boundaries before any model call happens.
        </li>
        <li>
          <b>A skill supplies the procedure.</b> The team&apos;s written method for investigating job failures loads
          into context: check the scheduler, then source freshness, then transformation logs, and these four causes
          account for most incidents. Written by the people who own the pipeline, not by whoever built the agent.
        </li>
        <li>
          <b>Protocol servers provide reach.</b> The log system, the scheduler, and the ticket tracker each expose a
          server, used by this harness and by a different one another team runs, without modification.
        </li>
        <li>
          <b>A graph shapes the escalation.</b> The branching part, deciding between opening a ticket, escalating to
          a person, or requesting a restart, is a document that was reviewed before it ever ran.
        </li>
      </ol>
      <p>
        Now change one variable: the team replaces the harness. The profile still describes the agent. The skill
        still describes the procedure. The servers still expose the same tools. The graph still describes the
        escalation. What changes is the runtime, which is the thing that should be cheap to change.
      </p>
      <p>
        A second composition is worth noting because it is stronger than either mechanism alone. A profile says what
        an agent may do in general. A graph node says what this particular step requires. A harness granting the
        intersection produces per-step authority narrower than the agent&apos;s standing permissions, which is a
        capability neither format provides by itself.
      </p>

      <h2 id="versioning">Versioning and support libraries</h2>
      <p>
        Two operational points that determine whether a specification is usable in practice rather than only in
        principle.
      </p>
      <h3>Two version numbers, not one</h3>
      <p>
        Specifications have a version and their tooling has a version, and conflating them makes a stable standard
        look like it is churning. A project can ship several library releases against one unchanged specification.
        Saying which is which plainly, so that a document version and a support version are separate fields, avoids a
        whole class of confusion about stability.
      </p>
      <p>
        The related discipline is that artifacts declare which specification version they target. An artifact without
        that declaration becomes ambiguous the first time the specification changes, and the ambiguity surfaces as
        behavior that differs between runtimes with no obvious cause.
      </p>
      <h3>Support libraries decide adoption</h3>
      <p>
        A specification without libraries is a document people admire and do not implement. Providing validation,
        canonical digests, inheritance, policy narrowing, and delta application as libraries in several languages
        removes most of the cost of supporting a format, which is the difference between a harness author deciding it
        is a week of work and deciding it is an afternoon.
      </p>
      <p>
        Testing those libraries against a shared corpus, including cases that must be rejected, is what makes them
        agree rather than merely exist. Five libraries that each interpret a specification plausibly are a
        portability problem wearing a portability solution&apos;s clothes.
      </p>
      <p>
        There is also a bridging option worth mentioning, because it lowers the barrier further. Where a harness has
        no native support, a skill can teach it to load a profile, assemble the prompt in the specified order, and
        report what it had to drop. That is not as good as native support and it means the format is usable today
        rather than after someone else&apos;s roadmap.
      </p>

      <h2 id="adopting">Adopting contracts incrementally</h2>
      <p>
        Nobody starts here. The realistic path is incremental, and the ordering matters more than the pace.
      </p>
      <ol>
        <li><b>Write the next integration as a protocol server.</b> Not a migration of existing ones. The next one, which you were writing anyway.</li>
        <li><b>Extract the procedures people already repeat.</b> The paragraph someone pastes into a chat every week is a skill that has been written and not saved.</li>
        <li><b>Write down authority for one agent.</b> The one with the broadest permissions, because that exercise reliably surfaces at least one grant nobody would defend.</li>
        <li><b>Document one process as a graph.</b> Preferably one people already argue about. The document usually settles the argument.</li>
        <li><b>Convert on contact.</b> When something needs changing anyway, move it to the portable form then. This spreads the cost across work already scheduled.</li>
        <li><b>Put all of it in version control.</b> Review, history, and rollback come along for free, and the history is often what settles a later dispute.</li>
      </ol>

      <h2 id="not">What contracts do not do</h2>
      <p>
        Contracts are not enforcement. A profile declaring an authority boundary describes what should be true.
        Something in the harness still has to make it true. This is why conformance statements matter: a harness that
        ignores a declared denylist turns the profile into a description rather than a control.
      </p>
      <p>
        Contracts are not free. Each one adopted is a specification to track, a version to manage, and a constraint on
        how you express things. Worth paying where portability matters, not worth paying for a definition that exists
        in one place and will never move.
      </p>
      <p>
        Contracts do not make an architecture open. It is entirely possible to use every specification on this page
        and still build a system where one component cannot be removed without everything stopping. The contracts
        make openness achievable. Whether it was achieved is a separate question, and it is the one worth asking
        about any system, including mine.
      </p>
    </>
  );
}
