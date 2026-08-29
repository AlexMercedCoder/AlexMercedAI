import type { Article } from './types';

export const article: Article = {
  slug: 'inspectable-state',
  title: 'State is inspectable',
  kind: 'concept',
  layer: null,
  kicker: 'PRINCIPLE / 03',
  summary: 'Memory, context, and execution history should be understandable rather than trapped behind an interface you cannot see into.',
  standfirst: 'Agentic systems fail as a sequence of individually reasonable steps that added up to something wrong. Reading that sequence is the only reliable way to improve them, which makes inspectability a working requirement rather than a preference.',
  keywords: ['inspectable state', 'agent tracing', 'observability', 'debugging agents', 'agent memory', 'transparency'],
  sections: [
    { id: 'the-principle', label: 'The principle' },
    { id: 'why-agents', label: 'Why agents need it more' },
    { id: 'two-kinds', label: 'Two kinds of inspectability' },
    { id: 'the-trace', label: 'What a usable trace contains' },
    { id: 'reading', label: 'How to read one' },
    { id: 'context', label: 'Context is the state people forget' },
    { id: 'memory', label: 'Memory you can open and correct' },
    { id: 'cost', label: 'What it costs and where to spend' },
    { id: 'privacy', label: 'The privacy tension' },
    { id: 'tooling', label: 'Tooling that helps' },
    { id: 'not', label: 'What this is not' },
  ],
  learnMore: [
    { label: 'MagGraph', href: 'https://github.com/AlexMercedCoder/MagGraph', note: 'Memory as Markdown in Git, chosen specifically so it can be read and corrected without tooling.' },
    { label: 'Loro', href: 'https://github.com/alexmerced-oss/loro', note: 'Policy decision explanation, delivered audit, and verification commands.' },
    { label: 'Open Agentic Platform', href: 'https://openagenticplatform.com/knowledge-base/inspectable', note: 'The vendor-neutral treatment of inspectability.' },
  ],
  related: ['agent-memory', 'maggraph', 'claims-need-evidence'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="the-principle">The principle</h2>
      <p>
        Memory, context, and execution history should be understandable. Not eventually, after adding logging and
        redeploying, but now, for something that already happened.
      </p>
      <p>
        The bar is higher than it sounds. Many systems are inspectable in principle and not in practice, because the
        information exists somewhere and assembling it takes a day. A system is inspectable when the answer to what
        happened is available to someone who did not anticipate the question.
      </p>

      <h2 id="why-agents">Why agents need it more</h2>
      <p>
        Ordinary software fails at a line. You get a stack trace, you read the line, you understand the failure.
        Agents do not work like that.
      </p>
      <p>
        An agent failure is usually a sequence of individually reasonable steps that added up to the wrong outcome. A
        search returned nothing, the agent read empty as none exist rather than as query was wrong, and every
        subsequent step built on that. No component errored. Every step was defensible. The result is wrong.
      </p>
      <p>
        Three things follow. The failure is usually much earlier than the visible symptom, so fixing the last step
        does nothing. Behavior is not reproducible from inputs alone, since the same request twice can take different
        paths, so you cannot re-run to debug and must have recorded it. And successful runs contain information too:
        wasted steps and context bloat never become visible bugs and entirely determine cost and latency.
      </p>

      <h2 id="two-kinds">Two kinds of inspectability</h2>
      <p>
        The word covers two properties that are worth separating, because a system can have one without the other.
      </p>
      <p>
        <b>Static inspectability</b> is whether you can understand how the system works by reading it. Open source
        gives you this, as does a published specification, a readable configuration format, and a small enough
        codebase.
      </p>
      <p>
        <b>Runtime inspectability</b> is whether you can see what a particular execution did. Traces, logs, recorded
        state. A closed-source component can be excellent at this and an open source one can be terrible at it.
      </p>
      <p>
        Agentic systems need both and need the second more. Reading a harness&apos;s source tells you the shape of the
        loop. It does not tell you why this task produced that answer, because the answer depended on the exact
        context assembled, which existed only at runtime.
      </p>

      <h2 id="the-trace">What a usable trace contains</h2>
      <p>
        Most logging captures far less than agentic debugging needs. Five things, and the first is the one most often
        missing.
      </p>
      <ul>
        <li>
          <b>The exact context sent, per step.</b> Not the template. The actual assembled content. The most common
          debugging dead end I hit is discovering the prompt template was logged and the problem was in what filled
          it.
        </li>
        <li>
          <b>Every tool call with full arguments.</b> Including the ones that returned nothing, which is frequently
          where the divergence started.
        </li>
        <li>
          <b>Every result, including errors.</b> Truncated if necessary, with the truncation marked, because a
          silently truncated result looks like a short result.
        </li>
        <li>
          <b>Model, version, and parameters.</b> So a behavior change can be attributed rather than argued about.
        </li>
        <li>
          <b>Why the loop ended.</b> Completed, limit reached, denied, cancelled, errored. One field, disproportionate
          value.
        </li>
      </ul>
      <p>
        Anything summarized before storage tends to omit exactly the detail that explains the failure. Keep both if
        storage allows, and never keep only the summary.
      </p>

      <h2 id="reading">How to read one</h2>
      <p>
        Having traces and reading traces are different things, and the second is a skill.
      </p>
      <p>
        Start at the end and work backwards to the first step where something the agent believed was not true. That
        divergence point is usually several steps before the visible mistake.
      </p>
      <p>
        At that step, ask what the agent could have known. Frequently the answer is that a tool gave it a misleading
        result: an empty list where an error was appropriate, a truncated response with no marker, an ambiguous field
        name. The fix is in the tool, not the prompt, and it fixes the whole class rather than the instance.
      </p>
      <p>
        Then check the context at that step. Was the relevant fact present and buried? Absent? Was something
        contradictory also present? Context assembly problems and capability problems look identical from outside and
        have completely different fixes.
      </p>
      <div className="kb-callout">
        <b>The habit</b>
        <p>
          Read a sample of real traces weekly, including successful ones. It is the most reliable source of
          improvements I know of, and it requires no tooling beyond the recording itself.
        </p>
      </div>

      <h2 id="context">Context is the state people forget</h2>
      <p>
        Memory gets attention because it is a feature. Context gets none, because it is assembled fresh each step and
        thrown away, which makes it the least visible and most consequential state in the system.
      </p>
      <p>
        Every model call in an agentic loop receives an assembled context: instructions, tool definitions, retrieved
        facts, prior steps, tool results, and the current request. What ends up in there, and in what order,
        determines most of the quality. And unless it is recorded, it does not exist afterwards.
      </p>
      <p>
        Three failures recur, and all three are invisible without a record of the actual context.
      </p>
      <p>
        <b>Buried material.</b> The relevant fact was present, forty thousand tokens in, where attention is weakest.
        The agent did not ignore it exactly; it was diluted. This looks identical to the fact being absent unless you
        can see the context.
      </p>
      <p>
        <b>Contradiction with no arbiter.</b> Two sources disagree, both are present, nothing indicates which is
        authoritative. The agent picks, and the pick looks arbitrary because it was.
      </p>
      <p>
        <b>Silent truncation.</b> Something got cut to fit and nothing marked that it was cut. A truncated result
        reads as a complete short result, and the agent reasons confidently from a partial view.
      </p>
      <p>
        The corrective is the same in all three cases: record the assembled context, not the template that produced
        it. This is the single most common gap in agentic logging, and it is the one that turns debugging into
        guesswork. When people tell me a model is underperforming, my first question is whether they can show me what
        it actually received, and the answer is usually no.
      </p>

      <h2 id="memory">Memory you can open and correct</h2>
      <p>
        This principle is why MagGraph stores memory as Markdown files in Git rather than in a database, and it is
        the design decision I would defend hardest across all my projects.
      </p>
      <p>
        Memory accumulates errors. That is not a defect, it is what happens when a system draws conclusions from
        partial information. An agent concludes something incorrect from one ambiguous session and carries it
        forward.
      </p>
      <p>
        In a store you cannot see into, that error is invisible until it produces a visibly wrong answer, and even
        then you cannot confirm memory was the cause. The usual response is to lose confidence in the memory and turn
        it off, which throws away the whole feature to avoid an error you could have fixed in ten seconds.
      </p>
      <p>
        In a store that is files, you open it and look. You fix the line. You commit the fix, and Git records when
        the wrong belief was introduced and when it was corrected. The difference between those two situations is
        the difference between a memory system people keep using and one they abandon.
      </p>
      <p>
        There is a second-order benefit I did not anticipate. Because the memory is readable, people read it, and
        reading it surfaces stale facts, duplicates, and conclusions drawn from a single case. A store nobody can
        read is also a store nobody curates.
      </p>

      <h2 id="cost">What it costs and where to spend</h2>
      <p>
        Complete recording of every step of every run is not free, and pretending otherwise leads to systems that
        record everything for two weeks and then quietly stop.
      </p>
      <p>
        The costs are storage, dominated by assembled prompts; write throughput at high volume; and the engineering
        time to build viewing tooling good enough that people actually read traces.
      </p>
      <p>
        Spend by separating what is expensive from what is valuable, because they are not the same material.
      </p>
      <ul>
        <li><b>Metadata is cheap and answers most questions.</b> Steps, tools, model, tokens, latency, cost, termination reason. Small, structured, worth keeping for a long time.</li>
        <li><b>Full context is expensive and only needed for diagnosis.</b> Shorter window, longer for failures.</li>
        <li><b>Tool arguments and results are in between.</b> Usually small, disproportionately valuable, since most divergences are visible there. If you keep one thing beyond metadata, keep this.</li>
      </ul>
      <p>
        Sampling is the other lever: full detail for every failure, a percentage of successes, metadata for
        everything. The one thing never to sample is failures, because a system capturing a random tenth of them will
        not have the one you need.
      </p>

      <h2 id="privacy">The privacy tension</h2>
      <p>
        These two goals genuinely conflict and I would rather say so than pretend the principle is free.
      </p>
      <p>
        A complete trace contains everything that flowed through the system: whatever tools returned, whatever the
        user said, whatever documents were read. That is a durable copy of potentially sensitive material, created as
        a side effect of debugging. The same is true of agent memory.
      </p>
      <p>
        Pretending otherwise produces one of two bad outcomes. Either traces and memory are stored casually and
        become unmanaged data stores, or inspectability is abandoned and the system becomes undebuggable.
      </p>
      <p>
        The workable middle is to treat these as the sensitive stores they are: access controlled, retention decided
        deliberately rather than by default, and redaction applied to categories never needed for diagnosis such as
        credentials. Tiered retention helps, keeping full traces briefly and structured metadata much longer, since
        most long-range questions are answerable from metadata alone.
      </p>

      <h2 id="tooling">Tooling that helps</h2>
      <p>
        Inspectability is mostly a recording discipline rather than a tooling problem, and a few capabilities make
        the recorded material much more usable.
      </p>
      <h3>A viewer that shows a run as a sequence</h3>
      <p>
        The most useful tool by a distance is something that renders one task as an ordered list of steps with
        context, calls, and results expandable. Reading traces from a log aggregator designed for single-line events
        is possible and painful enough that people stop doing it, which means the recording exists and does no good.
      </p>
      <h3>Linking by task identifier</h3>
      <p>
        Model calls, tool calls, costs, and the final outcome joined by one identifier. This is a schema decision
        rather than a tool, and it determines whether questions about complete tasks are answerable at all. Without
        it you have a stream of independent calls and no way to ask what one task cost.
      </p>
      <h3>Diffing two runs</h3>
      <p>
        When the same task succeeds once and fails once, the difference is the answer. Comparing two traces side by
        side turns a long investigation into a short one, and it is surprisingly rare in agent tooling.
      </p>
      <h3>Standard formats</h3>
      <p>
        Using an established tracing standard rather than a bespoke format means existing tooling works and the
        traces outlive the system that produced them. It also puts agent steps alongside the rest of an
        application&apos;s traces, which matters when the agent is one part of a larger request rather than the whole
        thing.
      </p>
      <p>
        None of this is exotic, and all of it is easier to add at the start than after the first incident, which is
        the general shape of this principle.
      </p>

      <h2 id="not">What this is not</h2>
      <p>
        Inspectable is not the same as open source. Source tells you how the system works in general. It does not
        tell you what this run did.
      </p>
      <p>
        Inspectable is not the same as explainable. Seeing exactly what a model was sent and what it returned does not
        explain why it returned that. Inspectability gives you the inputs and outputs of each step, which is enough to
        debug the system even when the model itself stays opaque.
      </p>
      <p>
        Inspectable is not the same as auditable. Inspection serves the builder improving the system. Audit serves
        someone reconstructing what happened for accountability. They overlap in the recording and differ in
        retention, integrity, and who is allowed to read.
      </p>
    </>
  );
}
