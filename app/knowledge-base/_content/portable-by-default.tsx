import type { Article } from './types';

export const article: Article = {
  slug: 'portable-by-default',
  title: 'Portable by default',
  kind: 'concept',
  layer: null,
  kicker: 'PRINCIPLE / 01',
  summary: 'Agents, profiles, and workflows should move without being rebuilt around a single vendor, because the definitions are the part you cannot recreate.',
  standfirst: 'The runtime is replaceable. The model is replaceable. What an agent is, what it knows how to do, and what it has learned are not, because they took months of work and exist nowhere else. Those should be files you own.',
  keywords: ['portability', 'portable agents', 'vendor lock-in', 'open formats', 'agent definitions', 'exit cost'],
  sections: [
    { id: 'the-principle', label: 'The principle' },
    { id: 'what-cannot-be-recreated', label: 'What cannot be recreated' },
    { id: 'accumulation', label: 'Lock-in happens by accumulation' },
    { id: 'degrees', label: 'Degrees of portability' },
    { id: 'projection', label: 'Portability needs honest projection' },
    { id: 'cost', label: 'What it costs' },
    { id: 'internal', label: 'The internal case is stronger' },
    { id: 'time', label: 'Portability through time' },
    { id: 'testing', label: 'Testing it' },
    { id: 'objections', label: 'Objections I take seriously' },
    { id: 'not', label: 'What this is not' },
  ],
  learnMore: [
    { label: 'Open Agent Profile', href: 'https://github.com/alexmerced-oss/open-agent-profile', note: 'The format I wrote for the piece that was least portable: agent identity and learned state.' },
    { label: 'Agent Skills', href: 'https://agentskills.io', note: 'The capability format, with the broadest independent adoption of anything in this layer.' },
    { label: 'Open Agentic Platform', href: 'https://openagenticplatform.com/knowledge-base/portable', note: 'The vendor-neutral treatment of portability as an architectural property.' },
  ],
  related: ['open-contracts', 'open-agent-profile', 'inspectable-state'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="the-principle">The principle</h2>
      <p>
        Agents, profiles, and workflows should move without being rebuilt around a single vendor.
      </p>
      <p>
        This is not an argument against using good tools, including commercial ones. It is an argument about which
        artifacts belong to you. A harness is infrastructure and infrastructure gets replaced. What an agent is, what
        it knows how to do, and what it has learned about your work are not infrastructure. They are the output of
        months of accumulated effort, and they should not live inside something you might change.
      </p>

      <h2 id="what-cannot-be-recreated">What cannot be recreated</h2>
      <p>
        The useful test for whether something needs to be portable is whether you could rebuild it from knowledge you
        still have.
      </p>
      <p>
        Things that pass the test, meaning they can be rebuilt and therefore need not be portable: deployment
        configuration, monitoring dashboards, model choices, the harness itself. All ordinary work.
      </p>
      <p>
        Things that fail it:
      </p>
      <ul>
        <li>
          <b>Agent identity and permissions.</b> Including the reasoning behind narrow grants, which is the part
          nobody writes down and everybody needs when a permission is questioned.
        </li>
        <li>
          <b>Accumulated state.</b> What agents learned: conventions, corrections, open threads. There is no other
          source for this. It exists because sessions happened.
        </li>
        <li>
          <b>Skills and procedures.</b> Organizational knowledge that took months to elicit from people who held it
          in their heads.
        </li>
        <li>
          <b>Semantic definitions.</b> What a metric means, which table is authoritative. Recreating these means
          having the same arguments again with the same people.
        </li>
        <li>
          <b>Evaluation sets.</b> Real tasks with known answers, tedious to assemble and required for judging
          anything.
        </li>
      </ul>
      <p>
        Everything on that second list should be a file, in version control, in a format more than one thing can
        read. That is the whole practical content of this principle.
      </p>

      <h2 id="accumulation">Lock-in happens by accumulation</h2>
      <p>
        Nobody decides to become dependent. It happens one reasonable decision at a time.
      </p>
      <p>
        A team adopts a platform for model access, which is easy to leave. Then they use its tool integrations,
        because assembling those separately is real work. Then they define their agents in its format, because that
        is what the interface offers. Then they run on its hosting, because operating a process is a burden they did
        not want. Then their agents accumulate memory in its store, because that is where memory lives.
      </p>
      <p>
        Each step had an immediate benefit and no visible cost. Collectively they produce a system that cannot move,
        and the team discovers this at the moment they want to.
      </p>
      <p>
        Two of those five steps matter far more than the others. Agent definitions and accumulated memory are the
        artifacts with no other source. Model access, tool integrations, and hosting can all be rebuilt from
        knowledge you still have. A definition entered into a web form and a memory store with no export are what
        actually pin you.
      </p>
      <div className="kb-callout">
        <b>The habit that prevents it</b>
        <p>
          Keep a short written answer to what you would have to rebuild if each dependency went away. Update it when
          you start depending on something new. It takes minutes and converts an unnoticed accumulation into a series
          of visible decisions.
        </p>
      </div>

      <h2 id="degrees">Degrees of portability</h2>
      <p>
        Portability is not binary, and naming the levels makes the conversation more productive than arguing about
        whether something is portable.
      </p>
      <div className="kb-table-scroll">
        <table className="kb-table">
          <thead><tr><th>Level</th><th>What it means</th></tr></thead>
          <tbody>
            <tr><td>Trapped</td><td>No export. The artifact leaves only by being retyped.</td></tr>
            <tr><td>Exportable</td><td>An export exists in a proprietary shape. Moving means writing a converter.</td></tr>
            <tr><td>Open format</td><td>A documented format other things could read, whether or not any do.</td></tr>
            <tr><td>Portable in practice</td><td>Multiple independent implementations read it today.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The gap between the third and fourth levels is the one people underestimate, and I say that as someone who
        writes specifications. A published document with a single implementation has not been tested as a
        specification. The second implementation is what proves the document was sufficient, which is why counting
        independent implementations is a better signal than reading the specification.
      </p>
      <p>
        Applied to my own work: Agent Skills and MCP sit at the fourth level. My specifications sit at the third,
        moving toward the fourth. That is a real distinction and I would rather state it than blur it.
      </p>

      <h2 id="projection">Portability needs honest projection</h2>
      <p>
        A format alone does not deliver portability across heterogeneous systems, and this is the part I got wrong
        before I got it right.
      </p>
      <p>
        Runtimes support different things. A portable artifact moved between them does not necessarily mean the same
        thing in both places. There are three ways to handle that and only one is safe.
      </p>
      <p>
        Pretending uniformity and silently dropping what is unsupported is the worst. An artifact declaring a
        boundary runs somewhere that ignores it, and the operator believes in a control that does not exist. The
        system is now less safe than if the artifact had never existed, because the artifact manufactured confidence.
      </p>
      <p>
        Refusing anything not fully supported is safe and reduces portability to the intersection of every
        implementation, which is close to nothing useful.
      </p>
      <p>
        Projecting and reporting honestly is the third. Native here, approximated here, degraded in this specific
        way, unavailable there. The operator decides whether that is acceptable for the work.
      </p>
      <p>
        This is why I put a requirement into the Open Agent Profile specification that implementations must publish
        what they do not implement. Partial support is fine. Partial support that looks complete is not, because
        someone will review an artifact, run it elsewhere, and get something different from what they read.
      </p>

      <h2 id="cost">What it costs</h2>
      <p>
        Portability is usually argued for and rarely priced, which makes the argument weaker than it should be. The
        costs are real.
      </p>
      <p>
        <b>You work at the intersection.</b> A portable format supports what multiple implementations support, which
        is less than the best of them offers. That means occasionally declining a capability that would have been
        useful.
      </p>
      <p>
        <b>Artifacts need maintenance.</b> Skills go stale, profiles reference systems that changed, graphs point at
        retired tools. Portable artifacts are code-adjacent and need the same validation and review. Product state
        does not require this because the product enforces its own consistency.
      </p>
      <p>
        <b>Versions need tracking.</b> Each specification adopted is one more thing with a version and a migration
        path.
      </p>
      <p>
        <b>The benefit is contingent.</b> The payoff arrives if you migrate, if a vendor changes terms, if a team
        splits. None of those may happen, and the cost is paid regardless.
      </p>
      <p>
        That asymmetry is why portability loses arguments in the moment. Anyone advocating for it should be able to
        state the costs, because an advocate who cannot is easy to dismiss.
      </p>

      <h2 id="internal">The internal case is stronger</h2>
      <p>
        The vendor-migration argument is the weakest one available, and it is the one people usually lead with. The
        benefits that arrive immediately are more persuasive and more real.
      </p>
      <p>
        <b>Definitions move between teams.</b> A metric definition inside one group&apos;s BI project cannot be used
        by another group&apos;s agent, so the second group defines their own, and the organization now has two
        answers to one question. A portable definition prevents that on day one.
      </p>
      <p>
        <b>Procedures survive turnover.</b> Knowledge in one person&apos;s head is not portable. When they leave, it
        leaves. A skill capturing the same procedure moves to whoever needs it.
      </p>
      <p>
        <b>Non-engineers can review.</b> A profile or a skill is a file a domain expert can read, correct, and
        approve, with confidence the correction takes effect. Product configuration is not reviewable by the people
        responsible for the process.
      </p>
      <p>
        <b>Colleagues can pick things up.</b> An agent someone built is a file another person can copy and use,
        rather than a setup they have to reproduce from a description.
      </p>
      <p>
        None of these depend on ever migrating anything. They accrue while you stay exactly where you are, which is
        the version of the argument I would lead with now.
      </p>

      <h2 id="time">Portability through time</h2>
      <p>
        Most discussion of portability is about moving between systems. The harder direction, and the one I think
        about more now, is moving forward into a future where the tools that created an artifact no longer exist.
      </p>
      <p>
        The data layer solved this decades ago and the lesson transfers directly. A Parquet file written today is
        readable in fifteen years because it is self-describing: the schema travels with the data, the encodings are
        documented, and no external system is required to interpret it. That was designed in, and it is why the
        format outlived several generations of the engines that wrote it.
      </p>
      <p>
        Agentic artifacts mostly do not have that property yet. Judged individually:
      </p>
      <ul>
        <li>
          <b>Skills</b> age well. Markdown with a documented frontmatter convention is readable by a person with no
          tooling at all, which is the strongest form of durability available.
        </li>
        <li>
          <b>Profiles</b> age well for the same reason, provided the artifact declares which specification version it
          targets. Without that, a future reader has to guess what a field meant.
        </li>
        <li>
          <b>Graphs</b> age well as documents and less well as executable things, since they reference tools and
          systems that may be gone. A graph is still readable as a record of intent, which is often what you want from
          it years later anyway.
        </li>
        <li>
          <b>Accumulated state</b> ages worst. It describes systems, people, and situations that change, and a fact
          recorded three years ago with no timestamp or provenance is worse than nothing because it is confidently
          stale. This is why I insisted that state entries carry confidence and source rather than being plain text.
        </li>
      </ul>
      <p>
        The habits that follow are small: declare a version in every artifact, timestamp anything describing a state
        of the world, and prefer text formats a human could interpret without software. All three cost nothing at
        write time and cannot be added later.
      </p>

      <h2 id="testing">Testing it</h2>
      <p>
        Portability that is never exercised quietly stops working. The tests are cheap and almost nobody runs them.
      </p>
      <ol>
        <li><b>Load your skills in a second harness.</b> Once. See what activates and what does not.</li>
        <li><b>Run one profile through a broker onto a second runtime.</b> Read the projection report, not just the outcome.</li>
        <li><b>Export everything and try to reconstruct.</b> The most revealing test and the one nobody runs. Could a new environment be stood up from the exports alone?</li>
        <li><b>Check that the evaluation set is itself portable.</b> An evaluation harness tied to one provider is a portability gap in the thing you use to measure portability.</li>
      </ol>
      <p>
        The uncomfortable version of the question: if your primary vendor terminated your account tomorrow with a
        thirty-day export window, what would you actually be able to take? The answer is your real score.
      </p>

      <h2 id="objections">Objections I take seriously</h2>
      <p>
        Two objections to this principle are usually dismissed and are correct in specific cases. Since I advocate
        for portability constantly, I would rather engage with them than pretend they do not land.
      </p>
      <h3>It is premature generality</h3>
      <p>
        The argument is that building for a switch you may never make adds indirection now for a benefit later, which
        is the definition of speculative design. Often true. A custom abstraction over a database you will never
        change is pure cost.
      </p>
      <p>
        Where it fails is when the abstraction is nearly free. One function that every model call goes through is not
        an architecture, it is a habit. It costs an afternoon and converts a multi-week change into a configuration
        edit. The test is whether the abstraction is cheap and whether the component is genuinely likely to change.
        For models and harnesses right now, both are true, and they will not always be.
      </p>
      <h3>The intersection is worse than any specific option</h3>
      <p>
        The argument is that portable systems work at the lowest common denominator, giving up the best capability of
        every component. This is real, and I feel it every time I decline to use something because only one
        implementation supports it.
      </p>
      <p>
        The resolution is not to reject the constraint but to place it deliberately. Use specific capabilities where
        they matter and the dependency is bounded, and keep the surrounding structure portable. Prefix caching is a
        good example: adopting the design rule it implies, which is stable content first, costs nothing where it is
        unavailable and pays where it is. Capability adopted in a way that degrades gracefully is not lock-in.
      </p>
      <p>
        There is a third objection that is simply true and rarely stated: portability has a maintenance cost even
        when nothing changes. Abstractions drift from what they abstract. Evaluation sets go stale. A second path
        never exercised stops working. If you are not going to exercise it, be honest that you have written
        documentation rather than built a capability. I have shipped both and only one of them helped.
      </p>

      <h2 id="not">What this is not</h2>
      <p>
        Portable is not the same as identical. An artifact moved to a runtime with different capabilities may behave
        differently. The goal is that it moves and the differences are known, not that they do not exist.
      </p>
      <p>
        Portable is not the same as standard. A format can be standardized and unportable if no second implementation
        exists, which is a criticism that applies to young specifications including mine.
      </p>
      <p>
        Portable is not an argument for avoiding good tools. Use whatever works best. Keep the definitions in files
        you own, and the tool stays a choice rather than becoming a commitment.
      </p>
    </>
  );
}
