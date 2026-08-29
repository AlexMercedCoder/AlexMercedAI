import type { Article } from './types';

export const article: Article = {
  slug: 'agentic-graph-specification',
  title: 'Agentic Graph Specification',
  kind: 'technology',
  layer: 'open-contracts',
  kicker: 'SPECIFICATION / WORK SHAPE',
  summary: 'An open format for decomposing a project into a graph of bounded agentic loops, so the plan can be reviewed, priced, and moved before it runs.',
  standfirst: 'Harnesses already decompose work. They do it internally, in their own shape, and the plan disappears when the session ends. AGS makes the decomposition a first-class artifact: written down, validated, reviewable, diffable, portable, and executable by any conformant harness.',
  keywords: ['Agentic Graph Specification', 'AGS', 'agent planning', 'DAG', 'human gates', 'capability tiers', 'success conditions', 'portable plans'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'four-consequences', label: 'Four consequences worth fixing' },
    { id: 'nodes', label: 'What a node declares' },
    { id: 'gates', label: 'Decisions and gates' },
    { id: 'tiers', label: 'Capability tiers, not model names' },
    { id: 'success', label: 'Success conditions are evaluated, not asserted' },
    { id: 'failure', label: 'Failure handling as a declared field' },
    { id: 'planning', label: 'What a plan tells you before you run it' },
    { id: 'composing', label: 'Composing with profiles' },
    { id: 'when', label: 'When a graph is worth writing' },
    { id: 'limits', label: 'Limits and honest caveats' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Agentic Graph Specification on GitHub', href: 'https://github.com/AlexMercedCoder/agentic-graph-spec', note: 'Specification, JSON Schema, examples, and support libraries.' },
    { label: 'The normative specification', href: 'https://github.com/AlexMercedCoder/agentic-graph-spec/blob/main/SPEC.md', note: 'The authoritative document describing nodes, edges, gates, and execution semantics.' },
    { label: 'Open Agent Profile', href: 'https://github.com/alexmerced-oss/open-agent-profile', note: 'The companion specification covering agent identity and learned state.' },
    { label: 'Loro', href: 'https://github.com/alexmerced-oss/loro', note: 'A harness that validates, plans, and executes graphs with human gates held for an explicit decision.' },
  ],
  related: ['open-contracts', 'open-agent-profile', 'claims-need-evidence'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        An Agentic Graph is a directed acyclic graph where every node is a bounded agentic loop, meaning one unit of
        work an agent runs end to end, and every edge is a control-flow dependency. The specification is an open,
        implementation-neutral format for writing that down, at version 1.0 with maintenance releases, under Apache
        2.0.
      </p>
      <p>
        A node is not a prompt and not a function call. It carries a precise brief, typed inputs and outputs, success
        conditions, a normalized capability tier, required tools, permissions and budgets, and failure handling.
        Graphs are written in YAML or JSON, with the two encodings equivalent.
      </p>

      <h2 id="four-consequences">Four consequences worth fixing</h2>
      <p>
        Harnesses decompose work internally. A planner emits steps, the steps live in the harness&apos;s own memory in
        its own shape, and the plan disappears when the session ends. Four things follow, and each one is familiar
        enough to recognize immediately.
      </p>
      <h3>You cannot review the plan before paying for it</h3>
      <p>
        By the time you see the decomposition, the tokens are spent and the work is done. If the plan was wrong, you
        find out afterwards. Writing it first moves review to where it is cheap.
      </p>
      <h3>You cannot move it</h3>
      <p>
        A decomposition produced by one harness is worthless to another. Everything the planning step figured out is
        discarded at the session boundary, and the next harness starts from nothing.
      </p>
      <h3>Done is whatever the model says</h3>
      <p>
        Without declared acceptance criteria, completion is a claim. An agent that says it finished has asserted
        something nobody checked. This is the source of most silent failures in agentic systems.
      </p>
      <h3>Every task gets the same model</h3>
      <p>
        Without a declared capability demand, a harness either overspends on trivia or underspends on the one
        architectural decision that mattered. Both are common and both are invisible.
      </p>
      <p>
        All four are consequences of the plan being implicit. Making it explicit addresses all four with one change,
        which is usually the sign of a well-chosen abstraction rather than a clever one.
      </p>

      <h2 id="nodes">What a node declares</h2>
      <p>
        The node is where the specification is opinionated, and the field list is deliberately more specific than a
        generic workflow format would be.
      </p>
      <ul>
        <li>
          <b>A precise brief.</b> Written so an agent that has seen nothing else can act on it. This constraint is
          the useful part: a brief that only makes sense given the previous node will fail the moment execution is
          parallel or resumed.
        </li>
        <li>
          <b>Typed inputs and outputs.</b> What it receives and what it must produce, declared with types, so a
          harness can check the shape rather than trusting a claim.
        </li>
        <li>
          <b>Success conditions.</b> Machine-checkable where possible, always human-readable, evaluated by the
          harness rather than asserted by the model.
        </li>
        <li>
          <b>A level of intelligence.</b> A normalized capability tier plus hints, so a harness routes to an
          appropriate model without the graph naming one.
        </li>
        <li>
          <b>Required tools, permissions, and budgets.</b> The ceiling on what this node may do and spend, per node
          rather than per run.
        </li>
        <li>
          <b>Failure handling.</b> Retries with feedback, fallbacks, escalation, and human checkpoints.
        </li>
      </ul>
      <p>
        Per-node permissions and budgets are what most distinguish this from an ordinary pipeline format. A graph
        where the implementation node may write source files and the review node may not is expressing an authority
        model, not just an order of operations.
      </p>

      <h2 id="gates">Decisions and gates</h2>
      <p>
        Edges are control-flow dependencies, which makes the graph acyclic by construction and its execution order
        derivable rather than declared. Two node kinds are where the format earns its place over a task list.
      </p>
      <p>
        <b>Decision nodes</b> branch on an outcome. Ready or needs work, with different downstream paths. This is how
        a graph expresses a remediation loop without becoming a cycle: the remediation path rejoins rather than
        looping back.
      </p>
      <p>
        <b>Gates</b> hold for an explicit human decision. Placing one before the first irreversible action, or before
        an expensive parallel fan-out, is the single most valuable structural choice available.
      </p>
      <p>
        The canonical example in the specification places them exactly where a person would want to look: after the
        API is designed and before it is implemented, and again before anything is published. Gate placement is
        mostly a question of where cost and irreversibility are, and getting it wrong in the obvious direction, which
        is placing a gate after the expensive part, is easy to do and easy to check for.
      </p>

      <h2 id="tiers">Capability tiers, not model names</h2>
      <p>
        The intelligence field declares a normalized tier and optional hints rather than a model identifier. This is
        the design decision I would defend most confidently.
      </p>
      <p>
        A graph naming a specific model is stale the moment that model is deprecated, and unusable on a harness
        configured with a different provider. A graph saying a node needs frontier-level capability with code
        generation hints stays valid indefinitely, and each harness resolves it against whatever it has.
      </p>
      <p>
        The economic consequence is the one that motivated it. Declaring capability demand per node is what lets a
        harness route the audit step to a standard model and the architectural decision to the strongest available.
        Without the declaration, the harness has no basis for the distinction and applies one model uniformly, which
        is wrong in one direction or the other on almost every node.
      </p>
      <p>
        The separation is between two kinds of knowledge. The graph author knows which step is hard. The harness
        knows which models are available. Keeping those apart is what lets both change independently, which is the
        same reasoning as the portable tier fallback in the profile format.
      </p>

      <h2 id="success">Success conditions are evaluated, not asserted</h2>
      <p>
        The specification is specific that success conditions are evaluated by the harness rather than asserted by
        the model, and that constraint carries most of the weight of the format.
      </p>
      <p>
        A model asked whether it completed a task will usually say yes. Not from dishonesty, but because assessing
        your own work against a criterion you also interpreted is not a reliable operation. Systems that depend on
        self-reported completion accumulate silent failures: a step that half-worked is reported as done, and the
        next step builds on it.
      </p>
      <p>
        Moving evaluation outside the model changes the character of the system. A condition saying the test suite
        passes, or that the output contains these fields, is checked by running something. A condition that is
        human-readable but not machine-checkable is at least written down, so a reviewer knows what to look at.
      </p>
      <p>
        My advice from writing a number of these: make conditions checkable wherever the effort is reasonable, and
        accept human-readable ones elsewhere rather than skipping them. An unchecked criterion is still better than
        an unstated one.
      </p>

      <h2 id="failure">Failure handling as a declared field</h2>
      <p>
        Most workflow formats treat failure as a runtime concern. AGS puts it in the document, because agentic nodes
        fail differently from deterministic steps.
      </p>
      <p>
        A node can produce output of the right shape that is wrong. It can fail a success condition it nearly met. It
        can fail for a transient reason or for one that will recur every time. Retrying blindly is correct for the
        first and wasteful for the second.
      </p>
      <p>
        Four mechanisms cover most cases. <b>Retry with feedback</b>, not a plain retry, because a retry that repeats
        the identical prompt usually produces the identical failure. <b>Fallback</b> to an alternative approach, often
        a different capability tier, since some failures are capability failures. <b>Escalation</b> to a different
        node or a stronger tier rather than continuing to attempt the same thing. And a <b>human checkpoint</b>, which
        is correct wherever a wrong automated recovery would be worse than a delay.
      </p>
      <p>
        Writing this down has a benefit that only shows up in review. A node with three retries, a fallback to a
        stronger tier, and an escalation path is expensive in the worst case, and seeing that in the document prompts
        the question of whether the brief should be clearer instead. Failure handling declared in a plan makes the
        cost of unreliability visible. Buried in a runtime, it does not.
      </p>

      <h2 id="planning">What a plan tells you before you run it</h2>
      <ul>
        <li><b>Dependency order.</b> What runs when, and what can run in parallel.</li>
        <li><b>Reachability.</b> Which nodes are reachable from the declared entry points, which surfaces orphaned work.</li>
        <li><b>Worst-case bounds.</b> What it costs if every retry path is taken, which is the number to budget against rather than the happy path.</li>
        <li><b>Cost and tier summary.</b> How much of this needs an expensive model.</li>
        <li><b>Unsupported features.</b> What this environment cannot do with this document, reported before running rather than discovered at step nine.</li>
        <li><b>A digest.</b> A stable identifier, which makes the plan citable in a review and comparable across revisions.</li>
      </ul>
      <p>
        The last two are why read-only planning is valuable even in a component that never executes graphs, which is
        exactly what Merced AI does with them.
      </p>

      <h2 id="composing">Composing with profiles</h2>
      <p>
        The two specifications I wrote were designed to work together, and the combination produces something neither
        provides alone.
      </p>
      <p>
        A profile says what an agent may do in general: its tool surface, its permissions, its standing authority. A
        graph node says what this particular step requires: which tools, which permissions, what budget. A harness
        granting the intersection of the two produces per-step authority narrower than the agent&apos;s standing
        permissions.
      </p>
      <p>
        That matters because standing permissions have to be wide enough for the broadest legitimate task, which
        means they are wider than necessary for almost every individual step. An agent that can write source files
        because one of its jobs involves writing source files is, during the review step, holding a capability it has
        no business holding. Per-node declarations close that window without making the standing grant narrower than
        the work requires.
      </p>
      <p>
        There is a second composition worth noting. Because the profile carries accumulated state and the graph
        carries the plan, resuming interrupted work has both halves: what the agent learned and where in the process
        it stopped. Either alone leaves you reconstructing the other.
      </p>
      <p>
        Both specifications also share a design instinct that I did not plan and would now defend deliberately. Each
        one restricts what an agent can change about its own operating conditions. A profile delta may only touch
        state. A graph is authored before execution and not rewritten during it. In both cases the agent works
        inside a contract it did not write, which is the property that makes either artifact worth reviewing.
      </p>

      <h2 id="when">When a graph is worth writing</h2>
      <p>
        Structure has a cost, and applying it everywhere is the fastest way to make an idea useless.
      </p>
      <p>
        A graph earns its place when the work has real structure worth reviewing: branches, approval points,
        parallelism, and consequences. Release processes, migrations, incident response, multi-stage builds. So does
        any work expensive enough that reviewing the plan first is worthwhile.
      </p>
      <p>
        It does not earn its place for conversational or exploratory work. A question with an unknown shape cannot be
        decomposed in advance, and forcing it into nodes produces a document that is wrong by the second step.
      </p>
      <p>
        The honest tension is that explicit structure reduces the room an agent has to improvise. That is the point in
        high-consequence work and the loss in exploratory work. I would rather reserve graphs for processes where the
        steps genuinely matter than argue that either style is correct everywhere.
      </p>

      <h2 id="limits">Limits and honest caveats</h2>
      <ul>
        <li><b>Over-decomposition is the common mistake.</b> Twenty nodes where four would do produces coordination overhead and context loss at every boundary. A node is a unit of work an agent can complete, not a single action.</li>
        <li><b>Briefs that assume context will fail.</b> The stand-alone requirement is not stylistic. A node may run in parallel with the ones that would have supplied the context.</li>
        <li><b>Unchecked success conditions are documentation.</b> Useful, and not a check. Know which of yours are which.</li>
        <li><b>Budgets should reflect the worst case.</b> Retries and fallbacks multiply cost.</li>
        <li><b>Graphs go stale.</b> A document referring to tools or systems that changed is confidently wrong. Validate them in continuous integration like any other artifact.</li>
        <li><b>Harness support varies.</b> Some implementations validate and plan without executing. Check what your runtime actually does before depending on it.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        AGS is not an execution engine. It describes work; harnesses run it. A graph is inert on its own, which is
        what makes it portable.
      </p>
      <p>
        AGS is not a general workflow language. It is specifically about decomposing work into agentic loops, with
        fields such as capability tier and success conditions that only make sense in that context. Using it for
        deterministic pipelines would be a poor fit in both directions.
      </p>
      <p>
        AGS is not a replacement for an agent&apos;s own planning. Within a node, the agent still decides how to
        proceed. The graph bounds the unit of work, states what success means, and declares what the node may use.
        What happens inside remains an agentic loop, which is the whole reason the nodes are called that.
      </p>
    </>
  );
}
