import type { Article } from './types';

export const article: Article = {
  slug: 'agent-memory',
  title: 'Agent memory',
  kind: 'layer',
  layer: null,
  kicker: 'CATEGORY / MEMORY',
  summary: 'What an agent knows that outlasts a session, how it gets written, and why writing indiscriminately makes an agent worse.',
  standfirst: 'Memory is the difference between a tool you re-explain everything to and something that gets better at working with you. It is also the component most likely to degrade quietly, because a store that accumulates everything makes every future retrieval worse.',
  keywords: ['agent memory', 'graph memory', 'MagGraph', 'long-term memory', 'retrieval', 'agent state', 'knowledge graph'],
  sections: [
    { id: 'what-it-is', label: 'What agent memory is' },
    { id: 'three-things', label: 'Three things called memory' },
    { id: 'the-problem', label: 'The problem it solves' },
    { id: 'approaches', label: 'Approaches, and where each breaks' },
    { id: 'why-graph', label: 'Why I went with a graph' },
    { id: 'markdown-git', label: 'Markdown and Git as the substrate' },
    { id: 'promotion', label: 'Promotion has to be deliberate' },
    { id: 'shared', label: 'Shared memory changes the rules' },
    { id: 'measuring', label: 'Measuring whether memory is working' },
    { id: 'risks', label: 'What memory costs you' },
    { id: 'not', label: 'What agent memory is not' },
  ],
  learnMore: [
    { label: 'MagGraph', href: 'https://github.com/AlexMercedCoder/MagGraph', note: 'My graph memory layer: Rust-backed, Markdown nodes, Git-versioned, with a generated MCP server.' },
    { label: 'MagAgent', href: 'https://github.com/AlexMercedCoder/MagAgent', note: 'The harness built on that memory, with explicit promotion and memory evaluations.' },
    { label: 'Open Agent Profile', href: 'https://github.com/alexmerced-oss/open-agent-profile', note: 'Profile state, which is a narrower kind of memory: what an agent learned about its own work.' },
    { label: 'Open Agentic Platform', href: 'https://openagenticplatform.com/knowledge-base/harnesses-and-brokers', note: 'The vendor-neutral treatment of state and memory inside the execution layer.' },
  ],
  related: ['maggraph', 'agent-harnesses', 'inspectable-state'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What agent memory is</h2>
      <p>
        Agent memory is what an agent knows that survives the end of a session. Not the conversation, which is
        transcript, and not the organization&apos;s data, which lives in the lakehouse. The middle thing: what this
        agent has learned about your projects, your conventions, your preferences, and the work in progress.
      </p>
      <p>
        It is the component that turns a capable tool into something that feels like it knows you, and it is the
        component most likely to get worse over time if nobody is paying attention.
      </p>

      <h2 id="three-things">Three things called memory</h2>
      <p>
        Separating these prevents most of the confusion in this area, and conflating them produces systems where each
        does its job badly.
      </p>
      <p>
        <b>Working state</b> is the current task: steps taken, results so far, the goal. It lives for the duration of
        the task and should survive a restart if the task is long. This belongs to the harness.
      </p>
      <p>
        <b>Conversation history</b> is what was said. It grows without bound, has to be trimmed or summarized, and is
        mostly disposable. Compaction is lossy, and the loss is silent, which is why anything important should not
        live only here.
      </p>
      <p>
        <b>Long-term memory</b> is what should persist across tasks. Preferences, prior decisions, learned facts about
        a codebase or a customer, open threads. This is the hard one and the one this page is about.
      </p>
      <p>
        The failure I see most often is treating conversation history as long-term memory. Everything said gets
        embedded and retrieved later, which produces recall of what was said rather than what was concluded, and the
        store fills with noise at a rate proportional to how much you use the system.
      </p>

      <h2 id="the-problem">The problem it solves</h2>
      <p>
        Anyone who has used an agent seriously recognizes it. You explain your conventions, the architecture, and the
        three unusual decisions and why they were made. The session ends. Next time you explain them again.
      </p>
      <p>
        The cost is not only the retyping. It is that an agent starting from nothing every time cannot develop
        judgment about your work. It will suggest the thing you rejected last month, because it does not know you
        rejected it or why. It will apply a general convention where you have a specific one. Each individual
        instance is minor and the aggregate is the difference between a tool you tolerate and one you rely on.
      </p>
      <p>
        There is also an organizational version of this. Knowledge held in one person&apos;s head is not portable.
        When they leave, it leaves. A memory store that captures the conclusions rather than the conversations is
        a form of institutional memory that happens to also serve the agent.
      </p>

      <h2 id="approaches">Approaches, and where each breaks</h2>
      <h3>Everything in the system prompt</h3>
      <p>
        Simple, and it does not scale. Context is finite and everything in it competes. A prompt that grows with
        accumulated knowledge costs more on every call and dilutes the task with material that is usually irrelevant.
        It also cannot be selective, so the agent carries your database conventions while writing a README.
      </p>
      <h3>Summarize the conversation</h3>
      <p>
        Cheap and lossy in a compounding way. Summaries of summaries drift. Specifics disappear first, and specifics
        are usually the valuable part. A summary saying you prefer explicit error handling is much less useful than
        the actual convention with an example.
      </p>
      <h3>Embed and retrieve past transcripts</h3>
      <p>
        The most common approach and it answers the wrong question. Similarity search finds text that resembles the
        current situation. What you want is the conclusion that was reached, not the discussion that led to it. It
        also degrades as the store grows, because more text means more plausible-looking irrelevant matches.
      </p>
      <h3>Structured facts with retrieval</h3>
      <p>
        Better. Discrete statements, stored deliberately, retrieved by relevance. The remaining gap is that facts
        rarely stand alone. A convention applies to a project. A decision relates to an earlier decision. A
        correction supersedes a previous belief. Flat facts lose all of that.
      </p>
      <h3>A graph</h3>
      <p>
        Facts as nodes with explicit relationships. Retrieval pulls a connected subgraph rather than a ranked list of
        fragments. This is where I landed, and the next section explains why.
      </p>

      <h2 id="why-graph">Why I went with a graph</h2>
      <p>
        The argument is not that graphs are fashionable. It is that the thing being stored is already
        relationship-shaped, and storing it flat throws that away.
      </p>
      <p>
        Consider what an agent actually learns about a codebase. This service uses this pattern. That pattern was
        chosen because of a constraint in a different service. That constraint came from a decision recorded in an
        architecture note. The person who owns that service prefers a specific review style. A recent change
        superseded part of the original decision.
      </p>
      <p>
        Every one of those is an edge. Retrieving the pattern without the constraint that motivated it gives an agent
        a rule with no ability to judge when it applies. Retrieving the decision without knowing it was partly
        superseded gives it stale guidance stated confidently.
      </p>
      <p>
        A graph retrieval that returns a node plus its neighborhood gives connected context. In practice this shows
        up as an agent that can explain why a convention exists rather than only that it does, which is the
        difference between one that follows rules and one that can reason about exceptions.
      </p>
      <div className="kb-callout">
        <b>The honest limitation</b>
        <p>
          Graphs need edges, and edges need to come from somewhere. If nothing creates them, you have a slower key
          value store. Deriving edges automatically from links inside the content is what makes this practical rather
          than a modeling exercise nobody keeps up with.
        </p>
      </div>

      <h2 id="markdown-git">Markdown and Git as the substrate</h2>
      <p>
        This choice matters more than the graph part, and it is the one I would defend hardest.
      </p>
      <p>
        Memory nodes are Markdown files in a Git repository. Edges emerge from wiki-style links inside the content.
        That is it. No database to operate, no proprietary store, no export problem.
      </p>
      <p>
        Four properties follow, and each one addresses something I have seen go wrong.
      </p>
      <p>
        <b>You can read it.</b> When an agent behaves strangely, you can open the memory and look. A store you cannot
        inspect produces behavior you cannot explain, and the usual response is to stop trusting the memory and turn
        it off.
      </p>
      <p>
        <b>You can correct it.</b> A wrong fact is an edit. This matters because memory does accumulate errors, and a
        store where correction requires tooling is a store where errors persist.
      </p>
      <p>
        <b>You get history for free.</b> Git tells you when a fact was learned and what changed. That turns out to be
        useful surprisingly often, because the question is usually not what does the agent believe but when did it
        start believing that.
      </p>
      <p>
        <b>It moves.</b> A memory store with no export path is the thing that actually pins you to a tool, more than
        any configuration format. A Git repository of Markdown moves anywhere, including into a different agent
        entirely.
      </p>

      <h2 id="promotion">Promotion has to be deliberate</h2>
      <p>
        This is the design decision I feel most strongly about, and it is counterintuitive.
      </p>
      <p>
        The obvious approach is to write to memory automatically. The agent notices something, stores it, and memory
        grows without effort. This is worse than it sounds, and it gets worse over time rather than better.
      </p>
      <p>
        Memory that accumulates by default fills with noise. Restatements of the same fact. Observations that were
        true of one file. Conclusions drawn from a single ambiguous case. Every one of those competes in future
        retrievals, so recall precision falls as the store grows. The system gets worse the more you use it, which is
        exactly backwards.
      </p>
      <p>
        Requiring explicit promotion, with a reason, changes the trajectory. Memory grows more slowly and stays
        useful. It also makes the store reviewable, because everything in it was put there on purpose and can be
        questioned.
      </p>
      <p>
        The related discipline is supersession. New knowledge frequently contradicts old knowledge, and a store that
        holds both surfaces both, which produces an agent that hedges or picks arbitrarily. Marking what a fact
        replaces is more work at write time and the only thing that keeps a long-lived store coherent.
      </p>

      <h2 id="shared">Shared memory changes the rules</h2>
      <p>
        Everything above assumes memory belongs to one agent working for one person. The moment memory is shared
        across agents or people, the requirements change enough that I treat it as a separate thing rather than a
        bigger version of the same thing.
      </p>
      <p>
        Local memory is what one agent knows in one workspace. Getting it wrong costs that agent&apos;s quality.
        Shared memory is knowledge other agents and people will treat as true. Getting it wrong propagates.
      </p>
      <p>
        That difference justifies friction that would be excessive locally. In Loro, shared memory writes are
        explicit-only and draft-gated: an agent stages a write, and it becomes shared knowledge through a deliberate
        step rather than automatically. This is deliberately awkward, and teams that route around it lose the
        property that makes shared memory safe.
      </p>
      <p>
        The reasoning is simple. An agent that writes freely into shared state is publishing. Publishing without
        review is fine for a personal notebook and not fine for something several systems will act on. The check is
        not about distrusting the agent; it is that an error which stays local costs one bad answer while an error
        which becomes shared knowledge costs an unknown number.
      </p>
      <p>
        Backing shared memory with the same governed storage as the rest of an organization&apos;s data follows from
        the same reasoning. If it lives in an Iceberg table behind a catalog, it inherits access control, snapshot
        history, and the ability to reconstruct what was believed at a point in time. If it lives in a bespoke store
        beside the agent, none of that comes along, and the shared knowledge is governed less carefully than the data
        it describes.
      </p>
      <p>
        There is also a scanning question that only appears at this boundary. An agent that reads a configuration
        file and then writes what it learned into shared memory may have just moved a credential somewhere it was not
        before. Checking for obvious secrets before memory writes is a small guard against a failure that is very
        hard to undo once it has propagated.
      </p>

      <h2 id="measuring">Measuring whether memory is working</h2>
      <p>
        Memory fails silently, which is why I ended up building evaluations specifically for it rather than trusting
        impressions.
      </p>
      <p>
        The failure modes do not produce errors. Recall returns something plausible but stale. Two contradictory
        facts both surface. The retrieved subgraph is large enough to crowd out the actual task. In every case the
        system produces a worse answer and nothing indicates that memory was the cause, so the model gets blamed.
      </p>
      <p>
        The things worth measuring:
      </p>
      <ul>
        <li><b>Precision.</b> What fraction of recalled material was relevant to the task.</li>
        <li><b>Staleness.</b> How often recall surfaces something that has been superseded.</li>
        <li><b>Contradiction.</b> How often two recalled facts conflict.</li>
        <li><b>Token cost.</b> How much context recall consumes, which is a direct cost and an indirect quality tax.</li>
        <li><b>Provenance coverage.</b> What fraction of facts can say where they came from.</li>
        <li><b>Explanation.</b> Whether the system can say why a given item was recalled, which is what makes the rest debuggable.</li>
      </ul>
      <p>
        None of these are exotic and none of them appear by default. Without them, the first sign that memory has
        degraded is a general feeling that the agent used to be better.
      </p>

      <h2 id="risks">What memory costs you</h2>
      <p>
        I want to be straightforward about the downsides, because a memory-first design creates risks that a stateless
        one does not.
      </p>
      <p>
        <b>It is a data store.</b> Whatever an agent learned about a project is written down, including anything
        sensitive it encountered along the way. A memory repository deserves the same access control and care as the
        code it describes, and it frequently does not get it because it looks like notes.
      </p>
      <p>
        <b>Errors persist.</b> A wrong conclusion drawn once and promoted becomes a durable wrong belief. This is
        strictly worse than a stateless agent being wrong once, and it is the strongest argument for reviewable,
        editable memory.
      </p>
      <p>
        <b>It is an injection target.</b> If an agent can write to memory based on content it read, then content it
        read can influence what it believes indefinitely. Treating stored state as information rather than as
        instruction is the defense, and it has to be structural rather than a convention.
      </p>
      <p>
        <b>It needs maintenance.</b> Pruning, supersession, and periodic review are ongoing work. A memory store
        nobody curates is a liability that grows.
      </p>

      <h2 id="not">What agent memory is not</h2>
      <p>
        Memory is not the organization&apos;s data. Facts that other systems need belong in governed storage where
        they can be queried, versioned, and used by things that are not agents. Writing business data into agent
        memory produces a shadow source of truth that nobody governs.
      </p>
      <p>
        Memory is not a substitute for retrieval. What an agent remembers about your preferences is different from
        what the current state of a system is. An agent that answers from memory when it should have checked will be
        confidently out of date.
      </p>
      <p>
        Memory is not the same as profile state. Profile state is narrower: what an agent learned about its own work
        and its own contract, restricted deliberately so that an agent cannot rewrite its own authority. General
        memory is broader and correspondingly needs more curation.
      </p>
    </>
  );
}
