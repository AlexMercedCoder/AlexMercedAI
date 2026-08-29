import type { Article } from './types';

export const article: Article = {
  slug: 'loro',
  title: 'Loro',
  kind: 'technology',
  layer: 'agent-harnesses',
  kicker: 'PROJECT / GOVERNED HARNESS',
  summary: 'A Python agent harness that starts with identity, policy, approvals, and audit, and adds capability inside those constraints.',
  standfirst: 'Loro is the harness I built for work where being able to demonstrate what happened matters as much as the work happening. Identity, permission decisions, approval records, sandboxing, and delivered audit are structural rather than features layered on afterwards.',
  keywords: ['Loro', 'governed agent harness', 'agent policy', 'agent audit', 'approval records', 'Iceberg agent memory', 'Polaris', 'enterprise AI agent'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'why-governed-first', label: 'Why I started with the controls' },
    { id: 'identity', label: 'Identity comes first' },
    { id: 'policy', label: 'Policy over normalized resources' },
    { id: 'approvals', label: 'Approvals that survive replay' },
    { id: 'sandboxing', label: 'Subprocess profiles' },
    { id: 'memory', label: 'Local memory and governed shared memory' },
    { id: 'audit', label: 'Audit is a delivery problem' },
    { id: 'artifacts', label: 'Artifacts with provenance' },
    { id: 'standards', label: 'Standards, adopted carefully' },
    { id: 'workspace', label: 'The 0.18 workspace and run center' },
    { id: 'gateways', label: 'Gateways widen the perimeter' },
    { id: 'who-for', label: 'Who this is for' },
    { id: 'limits', label: 'Limits and honest caveats' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Loro on GitHub', href: 'https://github.com/alexmerced-oss/loro', note: 'Source, documentation, and the project status page describing exactly what is stable and what is pre-1.0.' },
    { label: 'loro-agent on PyPI', href: 'https://pypi.org/project/loro-agent/', note: 'Installation, extras for data, cloud, MCP, gateway, and web UI.' },
    { label: 'Apache Polaris', href: 'https://polaris.apache.org', note: 'The open catalog Loro reads governed table metadata from.' },
    { label: 'Apache Iceberg', href: 'https://iceberg.apache.org', note: 'The table format behind governed shared memory.' },
    { label: 'Open Agent Profile', href: 'https://github.com/alexmerced-oss/open-agent-profile', note: 'The profile specification Loro implements with fail-closed narrowing.' },
  ],
  related: ['agent-harnesses', 'magagent', 'explicit-authority'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        Loro is a Python command line agent harness aimed at enterprise coding, governed data work, and productivity
        tasks. The name is Spanish for parrot: a bird that listens, learns, and helps information move between
        groups.
      </p>
      <p>
        What makes it different from the general category is where it starts. Identity, permission decisions,
        approvals, sandboxing, and audit are the foundation, and capability is added inside them. Most harnesses do
        the reverse, which produces systems that work well right up until someone asks who authorized a particular
        action.
      </p>

      <h2 id="why-governed-first">Why I started with the controls</h2>
      <p>
        I built the other way round first, and it did not work.
      </p>
      <p>
        The natural path is to build capability and add controls later. You get something useful quickly, and the
        controls become conditionals inside tool implementations. Ask what the agent may do and the answer requires
        reading code. Ask what it did and the answer requires reconstructing from logs that were never designed for
        the question.
      </p>
      <p>
        The point where this became untenable for me was not a security incident. It was a conversation. Someone
        reasonably asked which systems an agent had touched during a task, and I could not answer without spending a
        day, and my answer would have been an inference rather than a record. That is a bad position, and no amount of
        additional capability improves it.
      </p>
      <p>
        Retrofitting was worse than starting over. Authority added afterwards ends up distributed across every tool,
        with gaps wherever a tool was written before the model existed. So Loro starts with an explicit identity on
        every run, a policy decision point every tool action passes through, an approval record bound to the identity
        that gave it, and an audit stream that is delivered rather than merely written.
      </p>
      <div className="kb-callout">
        <b>The questions a harness should be able to answer</b>
        <p>
          Who was this agent acting for. What was it permitted to do. What did it actually do. Who approved the parts
          needing approval. Can that be demonstrated six months later. If those require investigation rather than a
          lookup, the governance is decorative.
        </p>
      </div>

      <h2 id="identity">Identity comes first</h2>
      <p>
        Loro establishes an identity context from configuration and environment, with required fields that can be
        managed centrally, and propagates it into audit records and session state.
      </p>
      <p>
        This addresses the structural weakness I see in most agent deployments. When an agent runs as itself with its
        own broad credentials, every action is attributed to the agent. Two different questions collapse into one:
        whether the agent was allowed to do something, and whether the person it was acting for was allowed. An agent
        then becomes a way to reach things the requester could not reach directly.
      </p>
      <p>
        That is a governance hole no prompt discipline closes, and it is invisible until someone looks. Carrying a
        real principal through the run means permission checks and audit records both refer to a person, which also
        makes the trail readable by people outside the engineering team.
      </p>

      <h2 id="policy">Policy over normalized resources</h2>
      <p>
        Loro normalizes what an agent can act on into resource kinds: filesystem, shell, Git, memory, catalog,
        provider, MCP, and session messages. Policy is expressed against those rather than against individual tools.
      </p>
      <p>
        Normalization is what makes policy complete. If every filesystem action from any tool resolves to a
        filesystem resource with an action and a path, one rule covers all of them. Without it, each tool carries its
        own idea of what a write is, and every new tool silently introduces a gap.
      </p>
      <p>
        There is also a command that explains why a specific decision was made, which is a small feature with an
        outsized effect. Policy that cannot be interrogated becomes policy nobody trusts, and the standard response
        to distrust is widening permissions until the friction stops. Being able to ask why keeps narrow policy
        workable rather than aspirational.
      </p>

      <h2 id="approvals">Approvals that survive replay</h2>
      <p>
        Approvals are identity-bound records with once, session, and deny options, plus replay protection.
      </p>
      <p>
        The replay part is the detail that took me a while to get right. A naive approval asks a person to confirm an
        action and then proceeds. If the same approval can be reused for a subsequent different action, the
        confirmation was theater. Binding an approval to the specific proposed action, and to the identity that
        granted it, means the approval covers what was actually shown.
      </p>
      <p>
        The related discipline is what gets displayed. A prompt asking whether to proceed, without the exact action,
        trains people to approve reflexively, and after twenty confirmations nobody is reading. Gating on
        irreversibility rather than on everything is not a shortcut, it is what keeps the remaining gates effective.
      </p>

      <h2 id="sandboxing">Subprocess profiles</h2>
      <p>
        Command execution runs through named subprocess profiles with minimized environments, bounded runtime and
        output, and optional sandbox enforcement.
      </p>
      <p>
        Each element addresses a specific failure I hit. Minimized environments stop credentials in environment
        variables from being visible to every command, which is a quiet and very common exposure. Bounded runtime
        stops a hung process holding a task open. Bounded output stops a command that prints a large file from
        filling the context and evicting the task, which produces incoherent behavior that looks like a model
        problem. Sandbox enforcement bounds what the process can reach regardless of what it decides to do.
      </p>
      <p>
        Together these are the adversarial test made concrete. If the model behaved adversarially, what could it
        actually do? With a narrow profile, a minimized environment, and enforcement underneath, the answer is
        bounded by construction rather than by instruction.
      </p>

      <h2 id="memory">Local memory and governed shared memory</h2>
      <p>
        Loro separates local memory from shared memory, and the separation carries the argument.
      </p>
      <p>
        Local memory is what one agent knows in one workspace. Shared memory is knowledge other agents and people
        will treat as true, and Loro backs it with Postgres and Apache Iceberg adapters. Shared writes are
        explicit-only and draft-gated rather than automatic.
      </p>
      <p>
        That restriction is deliberate friction. An agent writing freely into shared state is publishing, and its
        errors propagate rather than staying local. Requiring a staged, reviewed write means shared knowledge
        accumulates on purpose. Teams that route around it lose the property that made it safe.
      </p>
      <p>
        The Iceberg path also means agent memory can live in the same governed lakehouse as everything else, with the
        same catalog, the same access control, and the same snapshot history. Loro includes a read-only Polaris
        client so an agent discovers what tables exist through the catalog rather than from a hardcoded list that
        drifts.
      </p>
      <p>
        A safety scanner checks for obvious secrets before memory and artifact writes. That addresses a failure that
        is easy to overlook and hard to undo: an agent reads a configuration file and writes what it learned into a
        shared store, having just moved a credential somewhere it was not before.
      </p>

      <h2 id="audit">Audit is a delivery problem</h2>
      <p>
        Loro treats audit as versioned records delivered over files or HTTP, with bounded buffering, retries,
        diagnostics, an explicit flush, and verification commands.
      </p>
      <p>
        Framing this as delivery rather than logging is the correction I most want to pass on. Logs are written
        locally, lost when the machine is, ignored when nobody aggregates them, and truncated when a process exits
        unexpectedly. None of those failures announce themselves.
      </p>
      <p>
        An audit pipeline that stopped working three weeks ago is worse than none at all, because it produces
        confidence without coverage. That is why verification and diagnostics are part of the feature rather than an
        operational extra. Being able to check that delivery is healthy is the difference between a record and an
        assumption.
      </p>

      <h2 id="artifacts">Artifacts with provenance</h2>
      <p>
        Loro generates documents, presentations, and spreadsheets, and attaches provenance sidecars bound by
        checksum, with a verification command.
      </p>
      <p>
        This closes a loop most agentic systems leave open. Traces record what an agent did. Provenance connects what
        it did to the artifact that resulted, which is the direction the question actually gets asked from. A
        document produced by an agent gets emailed, filed, and cited, and six months later someone holding it wants
        to know where it came from. A checksum-bound record turns that into a lookup rather than a recollection.
      </p>

      <h2 id="standards">Standards, adopted carefully</h2>
      <p>
        Loro implements the portable formats I care about, and it implements them conservatively.
      </p>
      <p>
        Open Agent Profile support uses fail-closed narrowing, so a profile can only reduce capability. Profile state
        is treated as untrusted. Proposals are digest-bound. Writeback is restricted to an atomic state section.
        Every one of those constraints exists because a profile is a file, files can be edited, and a harness that
        lets a profile grant capability has moved its authority model into something anyone with write access can
        change.
      </p>
      <p>
        Agent Skills support includes digest tracking, progressive loading, and reviewed installs. The review step
        matters: a skill is instructions an agent will follow, so installing one without review is closer to running
        code than to reading documentation.
      </p>
      <p>
        Agentic Graph documents are validated and planned read-only over explicitly exported tools, and run with
        human gates held for an explicit decision. MCP connections work over stdio and streamable HTTP with
        deny-by-default handling of extensions, and Loro can act as an MCP server in a least-privilege mode with a
        read-only export ceiling.
      </p>
      <p>
        The pattern across all four is the same: adopt the portable format, and do not let adopting it become a route
        around the authority model.
      </p>

      <h2 id="workspace">The 0.18 workspace and run center</h2>
      <p>
        Version 0.18.0 closes the main desktop-workspace gaps around the governed runtime, and the framing in the
        release notes is the interesting part: it does this without turning the web UI into an authority boundary or
        a general-purpose editor.
      </p>
      <p>
        That constraint is doing real work. The temptation with a local UI is to let it read anything, run anything,
        and become the place where policy is decided. Loro instead added workspace file context, bounded uploads,
        authenticated artifact previews and downloads, and read-only staged and unstaged Git review, while keeping
        one isolated workspace and policy root per server. The UI shows you the governed runtime; it does not become
        a second way around it.
      </p>
      <p>
        The run center spans conversations and Agentic Graph runs together, with usage and approval visibility,
        opt-in completion notifications, and persistent governed graph schedules. Approvals appearing in the same
        place as the work is the detail that matters: an approval queue you have to go looking for is an approval
        queue that gets rubber-stamped.
      </p>
      <p>
        Group execution arrived here too, in three modes. Sequential runs agents one after another. Parallel runs
        them concurrently. Coordinator puts one agent in charge of dispatching to others. Each mode queues approvals
        independently, which is the part that keeps a parallel fan-out from turning into a pile of undifferentiated
        confirmation prompts.
      </p>
      <p>
        There is also an effective inventory of MCP servers, protocol extensions, and skills, with no credential
        disclosure, and adjacent-project discovery with copyable per-project launch commands. Both are answers to
        the same question a governed system should be able to answer on demand: what is actually configured here.
      </p>

      <h2 id="gateways">Gateways widen the perimeter</h2>
      <p>
        Loro supports signed, identity-mapped gateways to several chat platforms plus a generic one, and there is an
        optional local web interface. Both make an agent reachable from where people already work, and both change
        the security question enough to deserve saying out loud.
      </p>
      <p>
        A terminal agent has an implicit authority model: whoever is at the keyboard is the user, and their shell
        permissions bound what is possible. A gateway removes that. Requests arrive from a platform, possibly from
        people with no account on the machine, through a channel that may include people the agent was never intended
        to serve.
      </p>
      <p>
        Three properties matter, and the feature name states all three. Requests are <b>signed</b>, so the harness can
        verify a message came from the platform rather than from anyone who found the endpoint. They are
        <b>identity-mapped</b>, so a platform user resolves to a real principal with real permissions rather than to
        a shared account. And the resulting run carries that identity into policy decisions and audit records.
      </p>
      <p>
        The failure without these is worth naming because it is common and quiet. A chat-connected agent with a
        single service identity gives every member of a channel the union of that identity&apos;s permissions.
        Someone invites a contractor to the channel and has, without noticing, granted them whatever the agent can
        reach. Nothing misbehaved. The perimeter moved and nobody adjusted the authority model.
      </p>
      <p>
        The web interface follows the same reasoning applied to different mistakes. Loopback binding by default, a
        fresh token per launch, append-only conversations, profile revision pinning, and rendering that never
        evaluates raw HTML from model output are five specific defenses: do not expose a local service to the
        network, do not leave a long-lived session open, do not let history be rewritten, do not let a profile change
        underneath a running conversation, and do not let model output execute in the page displaying it.
      </p>

      <h2 id="who-for">Who this is for</h2>
      <ul>
        <li><b>Regulated or reviewed environments.</b> Where demonstrating authority and reconstructing actions is a requirement.</li>
        <li><b>Agents touching governed data.</b> Where lakehouse access through a catalog is the intended path rather than a tool someone wrote.</li>
        <li><b>Work with real consequences.</b> Where approval gates and reversibility matter more than autonomy.</li>
        <li><b>Organizations with existing identity infrastructure.</b> Where propagating a real principal is achievable.</li>
      </ul>
      <p>
        It is not for a solo developer wanting a fast coding assistant. The governance machinery is overhead with no
        corresponding benefit there, and I would point that person at MagAgent instead. The mismatch is the failure,
        not the category.
      </p>

      <h2 id="limits">Limits and honest caveats</h2>
      <ul>
        <li><b>Governance has setup cost.</b> Identity, approvals, audit, sandbox, and memory each need configuring. The setup wizards reduce it and do not remove it.</li>
        <li><b>Read the project status document.</b> Loro maintains a deliberately limited stable core with a larger set of surfaces at varying stages. Do not assume uniform maturity.</li>
        <li><b>Shared memory writes are awkward on purpose.</b> Draft gating is friction by design.</li>
        <li><b>Audit needs a destination and monitoring.</b> Configuring delivery and never checking it produces false confidence.</li>
        <li><b>Sandbox enforcement varies by platform.</b> Verify what is actually active rather than what is configured.</li>
        <li><b>Narrow policy needs maintenance.</b> Policy that blocks legitimate work creates pressure to widen it. Reviewing denials periodically is how narrow policy stays narrow.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        Loro is not a broker. It runs agents under governance. Choosing between several installed harnesses is a
        different job, which is what Merced AI does.
      </p>
      <p>
        Loro is not lightweight, and it is not trying to be. The machinery is the point.
      </p>
      <p>
        Loro is not a substitute for organizational policy. It provides mechanisms for expressing and enforcing
        authority. Deciding what the authority should be is a human decision, and a harness with excellent controls
        configured permissively is not governed.
      </p>
    </>
  );
}
