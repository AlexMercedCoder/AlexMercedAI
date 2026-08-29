import type { Article } from './types';

export const article: Article = {
  slug: 'merced-ai',
  title: 'Merced AI',
  kind: 'technology',
  layer: 'agent-brokers',
  kicker: 'PROJECT / BROKER',
  summary: 'A local-first broker that finds the agent harnesses already installed on your machine and runs portable profiles across them.',
  standfirst: 'Merced AI is deliberately not another agent loop. It discovers what you already have, normalizes how those tools are invoked, and uses Open Agent Profile documents to create bots that run on whichever harness is available. The selected harness still owns everything about execution.',
  keywords: ['Merced AI', 'agent broker', 'harness discovery', 'portable bots', 'Open Agent Profile', 'local-first', 'multi-agent conversation'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'why-i-built-it', label: 'Why I built it' },
    { id: 'the-restraint', label: 'The restraint is the design' },
    { id: 'discovery', label: 'Discovery' },
    { id: 'bots', label: 'Profiles, bindings, and bots' },
    { id: 'projection', label: 'Projection reports' },
    { id: 'planning', label: 'Read-only graph planning' },
    { id: 'conversations', label: 'Sessions and group conversations' },
    { id: 'run-inspection', label: 'Workspace context and run inspection' },
    { id: 'workflow', label: 'What using it looks like' },
    { id: 'when', label: 'When it earns its place' },
    { id: 'limits', label: 'Limits and honest caveats' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Merced AI on GitHub', href: 'https://github.com/AlexMercedCoder/merced-ai', note: 'Source, installation guide, and the harness compatibility documentation.' },
    { label: 'merced-ai on PyPI', href: 'https://pypi.org/project/merced-ai/', note: 'Installation and release history.' },
    { label: 'Open Agent Profile', href: 'https://github.com/alexmerced-oss/open-agent-profile', note: 'The specification that makes a bot portable between harnesses.' },
    { label: 'Agentic Graph Specification', href: 'https://github.com/AlexMercedCoder/agentic-graph-spec', note: 'The plan format Merced AI validates and plans without executing.' },
  ],
  related: ['agent-brokers', 'open-agent-profile', 'loro'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        Merced AI is a local-first broker for agent harnesses already installed on your machine. It discovers them
        safely, normalizes their non-interactive interfaces, validates Open Agent Profile documents, and binds
        profiles to harnesses to create portable bots you can chat with or run one-shot.
      </p>
      <p>
        It also validates Agentic Graph documents and produces deterministic plans without executing them. Everything
        it does has machine-readable output alongside the human-readable form.
      </p>
      <p>
        What it does not do is run an agent loop. The selected harness owns model access, tools, authentication,
        sandboxing, approvals, and final policy enforcement. That boundary is the whole design.
      </p>

      <h2 id="why-i-built-it">Why I built it</h2>
      <p>
        I had four agent command line tools installed and a growing irritation.
      </p>
      <p>
        Each had its own configuration format, its own idea of what an agent is, and its own place to store
        definitions. An agent I had carefully shaped in one was unavailable in another. When I switched tools, or
        when a project needed a different one, I rebuilt the same reviewer, the same researcher, the same data agent.
        Each rebuild lost whatever the previous version had learned.
      </p>
      <p>
        The obvious responses did not work. Standardizing on one tool is impractical and temporary; a better one
        arrives. Accepting duplication meant three copies of the same definition drifting apart within a quarter.
      </p>
      <p>
        What I actually wanted was for the definition to be mine and the runtime to be a detail. That requires two
        things: a portable format for what an agent is, and something that can take that format and run it on
        whatever is present. The first became the Open Agent Profile. The second became Merced AI. They are the same
        project seen from two directions.
      </p>

      <h2 id="the-restraint">The restraint is the design</h2>
      <p>
        The strongest temptation in building this was to add an agent loop. It would have made demonstrations better
        and removed a dependency on other people&apos;s tools.
      </p>
      <p>
        I think that would have ruined it, for a reason that is structural rather than aesthetic. A broker that runs
        agents is a harness competing with the harnesses it brokers. It then has an incentive to route work to
        itself, and every routing decision becomes suspect. The neutrality that makes a broker useful comes from
        having nothing to gain from the choice.
      </p>
      <p>
        There is a second reason. Every harness I would be competing with has invested in things I did not want to
        rebuild: sandboxing, approval flows, provider handling, tool ecosystems, terminal experience. Reimplementing
        those badly in order to own the loop would produce a worse tool that also happened to be less useful as a
        broker.
      </p>
      <p>
        So the rule I hold to is that Merced AI decides where work goes and never does the work. When I want an agent
        loop with specific properties, I build a harness, and I have built two of those separately.
      </p>

      <h2 id="discovery">Discovery</h2>
      <p>
        Merced AI performs safe executable and version discovery across a substantial list of harnesses, spanning
        widely used commercial coding agents, open source agents, and my own projects.
      </p>
      <p>
        This turned out to be most of the work, which surprised me. Routing is easy once you know your options.
        Finding out what is installed, which version, how to invoke it non-interactively, and what that version
        actually supports is the hard part, and it stays hard because interfaces change between releases.
      </p>
      <p>
        Doing it safely matters too. Determining a version usually means executing something, which makes a discovery
        scan a subprocess execution surface. Merced AI runs bounded subprocesses without a shell, with timeouts and
        cancellation, and supports explicit executable overrides so path resolution never has to guess. A discovery
        feature that quietly executes whatever it finds on your path would be a poor trade for convenience.
      </p>

      <h2 id="bots">Profiles, bindings, and bots</h2>
      <p>
        The unit Merced AI works with is a bot, which is a profile plus a binding.
      </p>
      <p>
        The <b>profile</b> carries the definition: role and instructions, model or capability tier, tool policy,
        permissions, and accumulated state. It is a file, following a published specification, readable by anything
        that implements it.
      </p>
      <p>
        The <b>binding</b> carries the routing: which harness should normally run this bot and what to fall back to.
        Bindings can be project-local or user-global, which matches how people actually work. A project may require a
        particular harness while a personal assistant should run on whatever is present.
      </p>
      <p>
        Keeping these separate is deliberate. Moving a bot to a different harness is editing a binding, not
        recreating an agent. The definition and the runtime preference change independently, which is the property
        that makes the whole arrangement worth having.
      </p>

      <h2 id="projection">Projection reports</h2>
      <p>
        This is the feature I am most confident about and the one that took the longest to get right.
      </p>
      <p>
        Harnesses do not support the same things. One enforces a tool allowlist natively. One has no permission
        system and documents that clearly. One supports skills; one does not. One takes a capability tier; one needs
        a specific model name. Projecting a profile onto a harness means some of it survives and some does not.
      </p>
      <p>
        Merced AI reports the result in four states: native, projected, degraded, and unsupported. Per field, before
        anything runs.
      </p>
      <p>
        My first version did not do this. It projected as best it could and ran. That is the tempting design because
        it always works, and it is dangerous in a specific way: a profile declaring a tool denylist would run on a
        harness that ignores denylists, and I would believe a boundary existed that did not. The tool had
        manufactured confidence.
      </p>
      <div className="kb-callout">
        <b>The principle I took from this</b>
        <p>
          An abstraction over heterogeneous backends must report what it could not deliver, before running. Silent
          degradation is worse than no abstraction, because it replaces uncertainty with false certainty.
        </p>
      </div>
      <p>
        The practical advice that follows: read the projection report. A degraded projection is a real change in what
        the agent can do, and skipping the report reintroduces exactly the problem the report exists to prevent.
      </p>

      <h2 id="planning">Read-only graph planning</h2>
      <p>
        Merced AI validates Agentic Graph documents and produces plans with digests, dependency order, reachability,
        worst-case execution bounds, cost and tier summaries, and an explicit list of features it cannot support. It
        does not execute them, which is consistent with the broker position.
      </p>
      <p>
        Planning without executing is more useful than it sounds. It answers what order steps will run in, which
        nodes are unreachable from the declared entry points, what the worst case costs if every retry path is taken,
        how much of the work needs an expensive model, and which parts of the document this environment cannot
        handle.
      </p>
      <p>
        That last item is the broker-specific one. A graph written against a rich harness may use features a simpler
        one lacks. Knowing that before running is the difference between a planned adjustment and a failure at step
        nine.
      </p>

      <h2 id="conversations">Sessions and group conversations</h2>
      <p>
        Merced AI supports one-shot runs, multi-turn local chat, attributed multi-bot group conversations, and
        durable project-local sessions with resume.
      </p>
      <p>
        I built one-shot execution first, assuming it would be the common case. It was not. Most real use is
        multi-turn work spanning more than one sitting, which made durable sessions with atomic writes a requirement
        rather than a nicety. An interrupted write that corrupts a session is worse than losing it, because it fails
        confusingly instead of obviously.
      </p>
      <p>
        The group conversation is the feature I did not expect to care about. Several bots, potentially on different
        harnesses, in one conversation, with contributions attributed. It differs from the usual coordinator pattern
        in a way that matters: these are genuinely different agents with different definitions and different
        permissions, not personas of one system.
      </p>
      <p>
        That distinction has a practical consequence. When three personas of one agent disagree, that is the same
        system being inconsistent. When three bots with different tool access disagree, that is information. And an
        implementer with write access and a reviewer with read-only access are genuinely different authority
        profiles, which collapsing into one agent would defeat.
      </p>

      <h2 id="run-inspection">Workspace context and run inspection</h2>
      <p>
        Version 0.4.0 adds the two things a broker needs once people actually route real work through it: a way to
        hand the target harness the right context, and a way to see what came back.
      </p>
      <p>
        The workspace context picker handles text, binary, and image context through bounded browser uploads, with
        inline and path delivery manifests and protections against traversal into internal state. The delivery
        manifest is the part I would highlight: because the broker does not execute anything, it has to describe
        precisely what it handed over, and a manifest is that description.
      </p>
      <p>
        Run telemetry is normalized and durable, with recent-run inspection, elapsed time, partial-failure
        summaries, opt-in completion notifications, and copyable handoffs to the active harness. Normalized is the
        operative word. Each harness reports differently, and a broker that passes those differences straight
        through gives you a pile of incompatible logs rather than one record. Normalizing them is the only way the
        broker can answer what a run cost and how it ended across executors.
      </p>
      <p>
        Partial failure deserves its own mention. A run that half-succeeded is the case brokers handle worst,
        because the harness reports completion and the caller has no way to know a step failed inside. Surfacing it
        as a distinct state rather than folding it into success or failure is a small correctness win that shows up
        constantly in practice.
      </p>

      <h2 id="workflow">What using it looks like</h2>
      <ol>
        <li><b>Initialize and take inventory.</b> Scan for installed harnesses. Most people have more agent tooling than they remember.</li>
        <li><b>Create a profile.</b> A named agent with a description and instructions, as a file rather than as configuration inside a tool.</li>
        <li><b>Bind it, with a fallback.</b> Choosing the fallback deliberately rather than letting one be picked avoids surprises later.</li>
        <li><b>Check the projection.</b> Before running anything. This is the step that separates informed use from optimistic use.</li>
        <li><b>Dry run.</b> Validates the arrangement without model access, which makes it usable in continuous integration.</li>
        <li><b>Run, one-shot or as a session.</b> With durable records if the work spans more than one interaction.</li>
      </ol>
      <p>
        Two things about that sequence are deliberate. The inspection steps come before execution, which is the same
        instinct as writing a plan before running it. And every step has machine-readable output, which turns the
        tool from a convenience into a component other things can script and build on.
      </p>

      <h2 id="when">When it earns its place</h2>
      <p>
        I would rather be useful than promotional, so here is the honest version of who should and should not use
        this.
      </p>
      <p>
        It earns its place when you have more than one harness. That is the prerequisite, and everything else follows
        from it. Specifically:
      </p>
      <ul>
        <li>
          <b>You are evaluating harnesses.</b> Running the same bot on three runtimes and comparing is enormously
          easier than defining it three times, and the projection report tells you what each one actually supports
          rather than what its documentation claims.
        </li>
        <li>
          <b>Your team has heterogeneous machines.</b> Different people have different tools installed and the agent
          should work anyway.
        </li>
        <li>
          <b>Different work needs different execution properties.</b> A governed harness for anything touching real
          systems, a fast one for daily coding, with the same definitions across both.
        </li>
        <li>
          <b>You want agent definitions to outlive tool choices.</b> Which is the general case, and the one I care
          most about.
        </li>
      </ul>
      <p>
        It does not earn its place for a solo developer using one harness. There, it is indirection without benefit,
        and I would rather say so than have someone install it and wonder what it was for.
      </p>
      <p>
        The advice that applies to everyone, including people who will never use this tool: keep your agent
        definitions in a portable format. That is the durable part. A broker is one way to exercise portability, and
        the portability is what has value.
      </p>

      <h2 id="limits">Limits and honest caveats</h2>
      <ul>
        <li><b>Policy still lives in the harness.</b> A profile denying a tool is only enforced if the target harness can enforce it. The broker can decline to route and cannot make a harness do something it does not implement.</li>
        <li><b>Fallback changes behavior.</b> A second harness may mean different tools, different permissions, and different quality. Treat it as a configuration decision rather than a safety net.</li>
        <li><b>Harness interfaces move.</b> Discovery tracks versions because an upgrade can change a non-interactive interface underneath you.</li>
        <li><b>You need at least one harness installed and authenticated.</b> Inventory and dry runs work without model access; real runs do not.</li>
        <li><b>Profile state is data an agent wrote.</b> Review it rather than trusting it, especially when a profile moves between environments.</li>
        <li><b>It is local-first by design.</b> It discovers what is on the machine. It does not manage remote infrastructure, and I do not currently intend it to.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        Merced AI is not an agent harness. It does not run a loop, execute tools, or hold task state during
        execution. This is the point rather than a gap.
      </p>
      <p>
        Merced AI is not a policy enforcement point. It bounds its own subprocess execution and defers authority to
        the harness, and it says so explicitly rather than implying otherwise.
      </p>
      <p>
        Merced AI is not required in order to use profiles. If your harness implements the specification natively,
        use it directly. The broker earns its place when you have more than one runtime, which is also the point at
        which duplication starts.
      </p>
    </>
  );
}
