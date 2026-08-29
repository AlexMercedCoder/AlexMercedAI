import type { Article } from './types';

export const article: Article = {
  slug: 'agent-brokers',
  title: 'Agent brokers',
  kind: 'layer',
  layer: null,
  kicker: 'CATEGORY / ROUTING',
  summary: 'The component that decides which agent or harness should handle a piece of work, without running the work itself.',
  standfirst: 'A broker is the piece most people skip, because it does nothing visible. It runs no agent loop and executes no tools. It decides where work goes, under whose authority, with what budget, and it is the reason a system with several harnesses does not become several systems.',
  keywords: ['agent broker', 'agent routing', 'multi-harness', 'agent orchestration', 'harness discovery', 'portable bots'],
  sections: [
    { id: 'what-it-is', label: 'What a broker is' },
    { id: 'why-i-build-them', label: 'Why I think this category matters' },
    { id: 'the-line', label: 'The line between broker and harness' },
    { id: 'what-it-decides', label: 'What a broker actually decides' },
    { id: 'projection', label: 'The honesty problem' },
    { id: 'multi-bot', label: 'Several agents in one conversation' },
    { id: 'when-needed', label: 'When you need one' },
    { id: 'when-not', label: 'When you do not' },
    { id: 'building', label: 'What building one taught me' },
    { id: 'future', label: 'Where I think this goes' },
    { id: 'not', label: 'What a broker is not' },
  ],
  learnMore: [
    { label: 'Merced AI', href: 'https://github.com/AlexMercedCoder/merced-ai', note: 'My implementation of this category: a local-first broker over installed harnesses.' },
    { label: 'Open Agent Profile', href: 'https://github.com/alexmerced-oss/open-agent-profile', note: 'The portable agent format that makes brokering possible at all.' },
    { label: 'Open Agentic Platform', href: 'https://openagenticplatform.com/knowledge-base/harnesses-and-brokers', note: 'The vendor-neutral treatment of this layer, with a wider survey of the ecosystem.' },
  ],
  related: ['merced-ai', 'agent-harnesses', 'open-contracts'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What a broker is</h2>
      <p>
        A broker decides which agent, harness, or model-powered tool should receive a piece of work, hands it over,
        and collects the result. It does not run the agent loop. It does not execute tools. It does not hold task
        state while the work is happening.
      </p>
      <p>
        Described that way it sounds like it barely exists, which is roughly the point. The value of a broker is
        concentration: it puts a small number of decisions in one place that would otherwise be made implicitly,
        differently, in every application that wants an agent to do something.
      </p>

      <h2 id="why-i-build-them">Why I think this category matters</h2>
      <p>
        Most people arrive at multiple agent harnesses without deciding to. One came with an editor. One was adopted
        for coding. One arrived embedded in a vendor product. One was built internally for a workflow nothing else
        covered. This is the normal state of affairs, not a mess to be cleaned up.
      </p>
      <p>
        The problem is not that there are several. It is that each one has its own idea of what an agent is, its own
        configuration format, and its own place to store definitions. A useful agent defined in one is unavailable in
        another. Switching means rebuilding. Using two means maintaining two copies that drift apart within a
        quarter.
      </p>
      <p>
        The usual responses are both bad. Standardizing on one harness is impractical and temporary, since a new one
        will arrive. Accepting duplication degrades quietly, and by the time anyone notices, the copies have diverged
        in ways nobody can reconcile.
      </p>
      <p>
        A broker is the third option, and it only works if there is a portable definition of what an agent is. That
        is why my work on brokering and my work on the Open Agent Profile are the same project seen from two
        directions. Without a portable profile, brokering means translating between every pair of harness
        configuration formats, which does not scale and does not stay correct.
      </p>

      <h2 id="the-line">The line between broker and harness</h2>
      <p>
        This distinction gets collapsed constantly, and keeping it sharp is the most useful thing I can say about the
        category.
      </p>
      <div className="kb-table-scroll">
        <table className="kb-table">
          <thead><tr><th>Question</th><th>Harness</th><th>Broker</th></tr></thead>
          <tbody>
            <tr><td>Owns the agent loop</td><td>Yes</td><td>No</td></tr>
            <tr><td>Executes tools</td><td>Yes</td><td>No</td></tr>
            <tr><td>Holds task state</td><td>Yes</td><td>Routing and session state only</td></tr>
            <tr><td>Chooses the executor</td><td>No</td><td>Yes</td></tr>
            <tr><td>Enforces policy</td><td>Yes, at the point of action</td><td>Can decline to route, nothing more</td></tr>
            <tr><td>Typical failure</td><td>A task goes wrong</td><td>Work reaches the wrong place</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The reason to hold this line is not taxonomy. It is that a broker which grows an agent loop has become a
        harness competing with the harnesses it brokers, and at that point it has an incentive to route work to
        itself. The abstraction stops being neutral. Declining to run agents is what keeps the routing decision
        honest, which is why Merced AI is deliberately not another agent loop.
      </p>

      <h2 id="what-it-decides">What a broker actually decides</h2>
      <p>
        Five things, each of which is otherwise decided by whichever calling application was written first.
      </p>
      <ul>
        <li>
          <b>Which executor.</b> Based on the kind of work, the data involved, what is installed and authenticated,
          and what the definition needs.
        </li>
        <li>
          <b>Whether at all.</b> Some requests should be declined or escalated rather than routed, and that check
          belongs in one place rather than in five callers.
        </li>
        <li>
          <b>Under whose authority.</b> Identity is a property of the request rather than of the executor, and it
          should travel with the work.
        </li>
        <li>
          <b>With what budget.</b> Step, time, and spend limits attached at dispatch rather than assumed
          independently by each harness.
        </li>
        <li>
          <b>Where the record goes.</b> One usage and outcome record across every executor. Without a broker this is
          essentially impossible to assemble, because each harness records in its own shape.
        </li>
      </ul>

      <h2 id="projection">The honesty problem</h2>
      <p>
        Here is the part I find most interesting, and the part I got wrong before I got it right.
      </p>
      <p>
        Harnesses do not support the same things. One enforces a tool allowlist natively. Another has no permission
        system at all and says so. One supports skills. One accepts a capability tier; another needs a specific model
        name. When you project one portable definition onto a runtime, some of it survives and some of it does not.
      </p>
      <p>
        There are three ways to handle that and only one is safe.
      </p>
      <p>
        <b>Pretend uniformity.</b> Silently drop what is unsupported. This is the worst possible outcome. A profile
        declaring a tool denylist runs on a harness that ignores it, and the operator believes a boundary exists that
        does not. The system is now less safe than if there had been no profile at all, because the profile created
        confidence.
      </p>
      <p>
        <b>Refuse anything not fully supported.</b> Safe, and it reduces the broker to the intersection of every
        harness, which is close to nothing useful.
      </p>
      <p>
        <b>Project and report honestly.</b> This capability is native here. This one is approximated. This one is
        degraded in this specific way. This one is unavailable. The operator then decides whether the projection is
        acceptable for this work.
      </p>
      <p>
        I have come to think reporting degradation rather than hiding it is the single most important design
        principle for any abstraction over heterogeneous backends. Silent degradation is where trust in abstractions
        goes to die, and it is always the tempting option because it makes demonstrations smoother.
      </p>
      <div className="kb-callout">
        <b>The rule I hold myself to</b>
        <p>
          If a layer cannot deliver what an artifact declares, it must say so before running, not fail quietly
          afterwards. An abstraction that hides its own gaps is worse than no abstraction.
        </p>
      </div>

      <h2 id="multi-bot">Several agents in one conversation</h2>
      <p>
        One arrangement a broker enables is worth describing on its own, because it is different from the usual
        multi-agent pattern and I think it is underrated.
      </p>
      <p>
        The common pattern is a coordinator that decomposes work and dispatches to subordinates, each of which is a
        persona of the same system. The alternative a broker makes natural is several genuinely distinct bots,
        potentially running on different harnesses with different permissions, participating in one conversation with
        their contributions attributed.
      </p>
      <p>
        The difference matters for two reasons.
      </p>
      <p>
        <b>Attribution is real.</b> A person can see which bot said what. When three personas of one agent disagree,
        that is the same system being inconsistent. When three bots with different definitions and different tool
        access disagree, that is information.
      </p>
      <p>
        <b>Permissions can genuinely differ.</b> An implementer with write access, a reviewer with read-only access,
        and a documentation specialist with a narrow tool surface are three different authority profiles. Collapsing
        them into one agent with three hats gives all three the union of the permissions, which is precisely the
        arrangement the reviewer role existed to avoid.
      </p>
      <p>
        This maps onto how people actually work. We do not give one person every role and ask them to remember which
        hat they are wearing. The reason agent systems keep reinventing that arrangement is that, without a portable
        agent definition, creating a genuinely separate agent is expensive, so personas are the cheap approximation.
        Once agents are files, separate agents cost almost nothing, and the approximation stops being necessary.
      </p>

      <h2 id="when-needed">When you need one</h2>
      <ul>
        <li><b>More than one harness in use.</b> The prerequisite. This is the trigger, and it usually arrives sooner than expected.</li>
        <li><b>Agents that should outlive tool choices.</b> When a definition is worth more than the runtime it currently runs on.</li>
        <li><b>Evaluating harnesses.</b> Running the same bot on three runtimes and comparing is far easier than defining it three times.</li>
        <li><b>Heterogeneous machines.</b> When different people have different tools installed and the agent should work anyway.</li>
        <li><b>Mixed capability requirements.</b> When a governed harness should handle some work and a fast one should handle the rest.</li>
      </ul>

      <h2 id="when-not">When you do not</h2>
      <p>
        A single developer using one harness gains nothing from a broker and adds a component. I want to be
        straightforward about that, because the temptation in writing about your own work is to imply everyone needs
        it.
      </p>
      <p>
        The value appears at the point where duplication starts, which is the second harness rather than the first.
        Before that, a broker is indirection without benefit, and the right move is to keep your agent definitions in
        a portable format so that adding a broker later costs nothing.
      </p>
      <p>
        That last point is the real advice. The portable definition is what matters. The broker is one way to exercise
        it.
      </p>

      <h2 id="building">What building one taught me</h2>
      <p>
        Three things surprised me while building Merced AI, and they generalize beyond this category.
      </p>
      <h3>Discovery is harder than routing</h3>
      <p>
        Deciding where to send work is easy. Finding out what is installed, which version, how to invoke it
        non-interactively, and what it actually supports is most of the work. Interfaces change between versions, and
        a broker that assumes uniformity produces confident failures.
      </p>
      <p>
        It also has to be done safely. Determining a version usually means executing something, which means a
        discovery scan is a subprocess execution surface. Bounded execution without a shell, with timeouts and
        explicit path overrides, is not a detail.
      </p>
      <h3>Machine-readable output changes what a tool is</h3>
      <p>
        A broker whose output is only human-readable is a convenience. One whose inventory, profiles, dry runs, and
        results are all structured is a component other things can build on, script, and run in continuous
        integration. I did not appreciate the size of that difference until people started using it in ways I had not
        anticipated.
      </p>
      <h3>The inspection steps have to come first</h3>
      <p>
        Check the projection before running. Dry run before executing. This ordering feels slow and is what separates
        informed use from optimistic use. It is the same instinct behind writing a plan as a document before running
        it, and I now think it applies to every layer of an agentic system.
      </p>

      <h3>Sessions turn out to matter more than runs</h3>
      <p>
        I built one-shot execution first, assuming that would be the common case, and it was not. Most real use is
        multi-turn work that spans more than one sitting, which means durable session records with resume are not a
        convenience feature. Atomicity matters too: an interrupted write that corrupts a session is worse than losing
        it, because a corrupted session fails confusingly rather than obviously.
      </p>

      <h2 id="future">Where I think this goes</h2>
      <p>
        I will be direct about the speculative part, since this is my site and the reader can weigh it accordingly.
      </p>
      <p>
        The current situation, where every agent product invents its own idea of what an agent is, resembles the
        state of database access before drivers were standardized, or editor tooling before language servers. Those
        situations resolved the same way: not by one product winning, but by the interface between products becoming
        a specification that several people implemented.
      </p>
      <p>
        If that pattern holds here, three things follow.
      </p>
      <p>
        <b>Agent definitions become organizational assets rather than product state.</b> A company&apos;s agents,
        skills, and procedures become artifacts it owns and versions, the way it already owns its source and its
        schemas. The runtime becomes a choice rather than a commitment.
      </p>
      <p>
        <b>Brokering becomes routine infrastructure.</b> Nobody thinks of a database connection pool as an
        architectural statement. A component that decides which runtime should execute a piece of agentic work, under
        whose identity, with what budget, will be similarly unremarkable.
      </p>
      <p>
        <b>The interesting competition moves.</b> If definitions are portable, harnesses compete on execution
        quality, safety, and operational characteristics rather than on how much of your configuration they hold.
        That is a better competition for everyone except whoever currently holds the configuration.
      </p>
      <p>
        I could be wrong about the timeline and I am fairly confident about the direction, because the alternative
        requires every organization to accept that its agent definitions belong to whichever vendor it chose first.
        That has not been an acceptable arrangement in any previous layer of the stack, and I do not think it will be
        in this one.
      </p>

      <h2 id="not">What a broker is not</h2>
      <p>
        A broker is not a policy enforcement point. It can decline to route. It cannot make a harness enforce
        something the harness does not implement, which is exactly why the projection report matters.
      </p>
      <p>
        A broker is not an agent framework. If you find yourself adding an agent loop to a broker, you have started
        building a harness, and the honest move is to admit that rather than to keep calling it a broker.
      </p>
      <p>
        A broker is not a hosted platform. Everything I have built in this category is local-first, meaning it
        discovers what is on the machine rather than managing remote infrastructure. That is a design choice about
        where control sits, not a limitation I intend to remove.
      </p>
    </>
  );
}
