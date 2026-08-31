import type { Article } from './types';

export const article: Article = {
  slug: 'open-agent-profile',
  title: 'Open Agent Profile',
  kind: 'technology',
  layer: 'open-contracts',
  kicker: 'SPECIFICATION / IDENTITY',
  summary: 'An open specification for persisting a named agent as a file instead of a running process, with three rules that make it safe to leave switched on.',
  standfirst: 'A profile is a file describing a named agent: role, model, tool surface, permissions, and what previous sessions learned. A harness reads it to start a session and writes an updated revision when the session ends. No process is resident. The file is the agent.',
  keywords: ['Open Agent Profile', 'OAP', 'agent identity', 'portable agents', 'agent state', 'capability narrowing', 'prompt injection defense'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'the-problem', label: 'The problem I wrote it for' },
    { id: 'anatomy', label: 'What a profile contains' },
    { id: 'three-rules', label: 'The three rules' },
    { id: 'proposals', label: 'Proposals instead of refusals' },
    { id: 'levels', label: 'Conformance levels and honest gaps' },
    { id: 'implementations', label: 'Implementations and encodings' },
    { id: 'lifecycle', label: 'The lifecycle in practice' },
    { id: 'relationship', label: 'How it relates to the other contracts' },
    { id: 'adopting', label: 'Adopting it' },
    { id: 'limits', label: 'Limits and honest caveats' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Open Agent Profile on GitHub', href: 'https://github.com/alexmerced-oss/open-agent-profile', note: 'Specification, schemas, conformance suite, examples, and support libraries in five languages.' },
    { label: 'The normative specification', href: 'https://github.com/alexmerced-oss/open-agent-profile/blob/main/spec/v1/SPEC.md', note: 'The authoritative document, including the security model and conformance requirements.' },
    { label: 'Agentic Graph Specification', href: 'https://github.com/AlexMercedCoder/agentic-graph-spec', note: 'The companion specification describing the shape of a piece of work.' },
    { label: 'Agent Skills', href: 'https://agentskills.io', note: 'The capability format, covering what an agent knows how to do.' },
  ],
  related: ['open-contracts', 'agentic-graph-specification', 'explicit-authority'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        The Open Agent Profile is an open specification for persisting a named AI agent as a file rather than as a
        running process. A profile describes an agent: role and instructions, model or capability tier, tool surface,
        permissions, attached context, and what previous sessions learned.
      </p>
      <p>
        A harness reads the file to start a fresh session on demand and writes an updated revision when that session
        ends. Nothing needs to stay resident. It is Apache licensed, at version 1.0 with support libraries at 1.0.5, and
        ships schemas, a conformance suite, and support libraries in several languages.
      </p>

      <h2 id="the-problem">The problem I wrote it for</h2>
      <p>
        You define a useful agent. A reviewer that knows your conventions, a researcher that cites the way you want,
        a data agent that has learned your table layout. Then the session ends.
      </p>
      <p>
        That definition either dies with the session or lives in a format only one harness reads. Neither outcome
        carries what the agent actually learned: the conventions it picked up, the preferences you corrected it on,
        the investigation it was halfway through.
      </p>
      <p>
        The obvious fix is to keep a process alive, and it is the wrong one. It is expensive. It dies with the
        machine. It cannot be diffed or reviewed. Two people cannot share it. Every property you want from a durable
        agent, a running process fails to provide.
      </p>
      <p>
        Persisting the agent as data solves all four, and it introduces a set of safety problems that occupied most
        of the actual design work.
      </p>

      <h2 id="anatomy">What a profile contains</h2>
      <p>
        Three top-level parts, and the separation between them is where the design lives.
      </p>
      <p>
        <b>Metadata.</b> Name, description, and a revision number. The revision is what makes a profile something
        with a history rather than a current state.
      </p>
      <p>
        <b>Spec.</b> The contract. Role instructions and constraints, model provider and identifier plus a portable
        capability tier as a fallback, the tool policy with an allowlist or denylist, and lifecycle settings
        including how writeback is handled. A human authors and approves this.
      </p>
      <p>
        <b>State.</b> What previous sessions learned. A summary, discrete facts with confidence and provenance, and
        open threads with their status. Sessions write this.
      </p>
      <p>
        The model field captures a portability problem neatly and is worth calling out. It carries both a specific
        provider and identifier, which is what you want on a machine that has that provider configured, and a
        portable tier, which is what a different harness uses when the named model is unavailable. Naming a specific
        model is precise and unportable. Naming only a tier is portable and imprecise. Carrying both lets each
        consumer take what it can use, which is a pattern I have since applied elsewhere.
      </p>

      <h2 id="three-rules">The three rules</h2>
      <p>
        A file describing what an agent may do is a security question, not a convenience. These three rules are the
        reason the specification is more than a file format, and each closes a hole the others leave open.
      </p>
      <h3>A profile narrows. It never widens.</h3>
      <p>
        A harness grants the intersection of what the profile asks for and what its own policy allows. There is no
        field, flag, or trust label that reverses this. Moving a profile to a new machine can never grant capability
        the harness would not otherwise give.
      </p>
      <p>
        Without this, a portable agent file is an escalation mechanism: acquire a profile from somewhere, run it, and
        receive whatever it claims. With it, a profile is safe to accept from anyone, because the worst case is an
        agent with fewer capabilities than you already permit.
      </p>
      <h3>An agent cannot rewrite its own contract.</h3>
      <p>
        Sessions emit a state delta, and delta operations may only touch the state section. A change to tools,
        permissions, model, or instructions goes into a proposals block with a written rationale and waits for a
        human.
      </p>
      <p>
        This holds under every writeback setting, including fully automatic. That detail is deliberate: a boundary
        that configuration can relax is not a boundary, it is a default.
      </p>
      <h3>Learned state is untrusted content.</h3>
      <p>
        Text an agent wrote about itself is injected as information, never as authority. A state entry saying the
        shell may now be used without asking changes nothing.
      </p>
      <p>
        This rule closes the failure I find most alarming. Without it, one successful prompt injection becomes
        permanent. An attacker persuades the agent once, the agent writes the instruction into its own state, and
        every future session starts already compromised. Treating state as content keeps a one-time injection
        one-time.
      </p>
      <div className="kb-callout">
        <b>Why all three</b>
        <p>
          Narrowing stops a file from granting power. State-only writeback stops a session from granting itself
          power. Untrusted state stops persuasion from becoming policy. Any two without the third leaves a path.
        </p>
      </div>

      <h2 id="proposals">Proposals instead of refusals</h2>
      <p>
        This is the mechanism I am happiest with, because it turns a refusal into a conversation.
      </p>
      <p>
        When a session concludes it needs a capability it does not have, the naive options are both bad. Granting it
        means an agent expanding its own authority. Silently dropping the request means the agent keeps failing at
        the same thing and nobody finds out why.
      </p>
      <p>
        A proposal is the third option. The specific change being requested is recorded with a written rationale
        explaining what the agent could not do without it. A human reads that and decides.
      </p>
      <p>
        The rationale is what makes it work. A request to add shell access, with an explanation that the agent could
        not verify a flaky test claim without running the suite, is a reviewable engineering decision. A bare request
        to add shell access is not. The mechanism produces exactly the artifact a reviewer needs, at the moment the
        need is fresh.
      </p>
      <p>
        It also addresses the usual failure of least privilege. Narrow permissions block legitimate work, friction
        accumulates, and someone eventually widens the grant to stop the complaints. A structured request with a
        documented reason turns that pressure into a decision with evidence, which is the only version of least
        privilege I have seen survive contact with real work.
      </p>

      <h2 id="levels">Conformance levels and honest gaps</h2>
      <p>
        Three levels, so implementations can be honest about partial support.
      </p>
      <ul>
        <li><b>Level 1, Read.</b> Discover, validate, and instantiate an agent from a profile.</li>
        <li><b>Level 2, Read and Write.</b> Level 1 plus state injection, delta generation, and persistence.</li>
        <li><b>Level 3, Full.</b> Level 2 plus composition, MCP, skills, external memory, and delegation.</li>
      </ul>
      <p>
        The accompanying requirement matters as much as the levels: an implementation must publish what it does not
        implement. Partial support is fine. Partial support that looks complete is not, because someone will review a
        profile, run it elsewhere, and get a different agent than the one they read.
      </p>
      <p>
        I put that requirement in the specification rather than leaving it as advice, because I had already built the
        version that silently degraded and watched it manufacture confidence. It is the same principle as the
        projection reporting a broker needs, arrived at from the specification side.
      </p>

      <h2 id="implementations">Implementations and encodings</h2>
      <p>
        A specification is only as real as its second implementation, so tooling is part of the evaluation rather
        than a footnote.
      </p>
      <p>
        The repository ships a reference validator and applicator, plus support libraries for Python, TypeScript, Go,
        Rust, and Java, each covering validation, canonical digests, inheritance, policy narrowing, prompt rendering,
        and delta application. A shared conformance corpus is used across languages, including negative fixtures that
        a correct implementation must reject.
      </p>
      <p>
        Cross-language testing against a shared corpus is the part worth insisting on. It is the difference between
        five libraries that each interpret the specification plausibly and five libraries that demonstrably agree.
        Negative fixtures matter for the same reason: a specification is defined as much by what it rejects, and an
        implementation that accepts an invalid profile produces an agent nobody reviewed.
      </p>
      <p>
        Canonical digests deserve their own note. Because a profile can be written in more than one encoding with
        fields in any order, comparing two profiles textually is unreliable. A canonical digest gives a stable
        identifier for the content regardless of formatting, which is what lets you say the profile running in
        production is exactly the one that was approved.
      </p>
      <p>
        For harnesses without native support, the repository ships two Agent Skills that let a harness load a
        profile, assemble the prompt in the specified order, report what it dropped, and turn a session into a
        reviewable delta. That is not as good as native support, and it means the format is usable today rather than
        after someone else&apos;s roadmap.
      </p>

      <h2 id="lifecycle">The lifecycle in practice</h2>
      <p>
        The mechanism that turns a static file into something that accumulates is worth walking through, because the
        interesting decisions are in the details rather than the concept.
      </p>
      <p>
        A harness loads a profile and starts a session. The session runs. At the end it produces a delta: a
        structured description of what changed. Facts learned, threads opened or closed, the summary updated.
        Applying that delta produces a new revision.
      </p>
      <p>
        Writeback settings control how much human involvement that requires, ranging from proposing everything for
        approval through applying state updates automatically. What does not change across settings is which parts a
        delta may touch. Automatic writeback means state updates apply without review. It never means the contract
        can change without review.
      </p>
      <p>
        State entries carry more than text, and that structure is what keeps them maintainable. Facts have
        confidence, a source, and can be pinned. A fact whose source was one uncertain observation can be treated
        differently from one confirmed repeatedly. Pinned facts survive summarization, which is how you keep the
        three things that actually matter from being compacted away along with everything else.
      </p>
      <p>
        Open threads are the part people underestimate. An agent halfway through an investigation, with a thread
        marked blocked and a reason, resumes usefully next session. Without that, the next session starts by
        rediscovering that the investigation exists, which is most of the cost of having stopped.
      </p>
      <p>
        The practical advice from running this for a while: review state periodically rather than continuously.
        Continuous review defeats the purpose, since the point is that sessions accumulate learning without needing
        you. A monthly skim catches stale facts, conclusions drawn from one ambiguous case, and threads that were
        closed in reality but not in the profile.
      </p>

      <h2 id="relationship">How it relates to the other contracts</h2>
      <p>
        The division that I think is the clearest statement of this whole layer:
      </p>
      <ul>
        <li><b>Skills</b> are what an agent knows how to do.</li>
        <li><b>MCP</b> is what it can reach.</li>
        <li><b>Harness configuration</b> is what it is allowed to do.</li>
        <li><b>A profile</b> is who it is, and what it has learned.</li>
      </ul>
      <p>
        None of these substitutes for another. An agent needs all four, and before profiles the fourth was either
        absent or trapped inside a product. Identity and accumulated learning were the parts with no portable home,
        which is precisely why I wrote it.
      </p>

      <h2 id="adopting">Adopting it</h2>
      <p>
        The useful starting point is not converting everything. It is writing one profile for the agent with the most
        capability, because that exercise reveals the most.
      </p>
      <ol>
        <li><b>Pick the agent with the broadest permissions.</b> Writing down what it may do reliably surfaces at least one grant nobody would defend.</li>
        <li><b>Express the contract, not the current behavior.</b> What it should be permitted, rather than what it happens to be able to reach.</li>
        <li><b>Validate it.</b> The tooling checks the schema and produces a stable digest, which is what makes a profile citable in a review.</li>
        <li><b>Turn on state with proposal-based writeback.</b> Let sessions accumulate learning while capability changes wait for review.</li>
        <li><b>Read the proposals.</b> They are the most direct feedback available about where your permission model is wrong.</li>
        <li><b>Keep profiles in version control.</b> History, review, and rollback come free.</li>
      </ol>

      <h2 id="limits">Limits and honest caveats</h2>
      <ul>
        <li><b>Check your harness&apos;s conformance level.</b> Level 1 support means state does not persist, which changes what the profile is for.</li>
        <li><b>State needs curation.</b> Facts go stale. Confidence and provenance fields exist to support pruning, and someone has to do it.</li>
        <li><b>State is data an agent wrote.</b> Review it when a profile moves between environments, particularly one that has been running unattended.</li>
        <li><b>Narrowing means a profile can quietly do less elsewhere.</b> That is the safe direction and it can still surprise you. A projection report is how you find out.</li>
        <li><b>Do not put secrets in a profile.</b> It is a file meant to be shared, versioned, and copied. Credentials belong in a vault the harness references.</li>
        <li><b>It is young.</b> A small number of known implementations, all of which I can name. That is a real limitation, and the alternative is not a mature portable format but no portable format at all.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        A profile is not an enforcement mechanism. It expresses a contract; the harness enforces it. A harness that
        ignores a declared denylist makes the profile a description rather than a control, which is exactly why
        conformance statements matter.
      </p>
      <p>
        A profile is not a memory system. State captures what a session learned about the agent&apos;s own work.
        Putting large amounts of domain knowledge into profile state is using the wrong container, and there are
        better ones.
      </p>
      <p>
        A profile is not a skill. It says who the agent is, not how to perform a procedure. Conflating them produces
        profiles that grow into unmaintainable instruction documents, which I have done and do not recommend.
      </p>
    </>
  );
}
