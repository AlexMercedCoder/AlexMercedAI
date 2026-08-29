import type { Article } from './types';

export const article: Article = {
  slug: 'explicit-authority',
  title: 'Authority is explicit',
  kind: 'concept',
  layer: null,
  kicker: 'PRINCIPLE / 02',
  summary: 'An agent should know what it may do, what requires approval, and where its responsibility ends, enforced in code rather than requested in a prompt.',
  standfirst: 'The most consequential mistake in agentic systems is writing limits into a system prompt and believing they are enforcement. Instructions to a model are a request. A boundary is something the model cannot cross regardless of what it decides.',
  keywords: ['agent authority', 'least privilege', 'approval gates', 'prompt injection', 'delegated identity', 'sandboxing', 'agent permissions'],
  sections: [
    { id: 'the-principle', label: 'The principle' },
    { id: 'the-mistake', label: 'The mistake' },
    { id: 'real-enforcement', label: 'What enforcement actually is' },
    { id: 'the-test', label: 'The adversarial test' },
    { id: 'approval', label: 'Approval that means something' },
    { id: 'reversibility', label: 'Reversibility is the cheapest boundary' },
    { id: 'identity', label: 'Whose authority is it' },
    { id: 'composition', label: 'Combinations nobody designed' },
    { id: 'progression', label: 'A progression that works' },
    { id: 'sustaining', label: 'Keeping narrow permissions sustainable' },
    { id: 'limits', label: 'Where I find this hard' },
    { id: 'not', label: 'What this is not' },
  ],
  learnMore: [
    { label: 'Loro', href: 'https://github.com/alexmerced-oss/loro', note: 'The harness where I tried to make this structural: identity, policy, approvals, sandboxing, and audit.' },
    { label: 'Open Agent Profile', href: 'https://github.com/alexmerced-oss/open-agent-profile', note: 'A specification whose core rules are all about authority: narrowing only, no self-modification, untrusted state.' },
    { label: 'Open Agentic Platform', href: 'https://openagenticplatform.com/knowledge-base/bounded', note: 'The vendor-neutral treatment of bounded authority.' },
  ],
  related: ['loro', 'open-agent-profile', 'claims-need-evidence'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="the-principle">The principle</h2>
      <p>
        An agent should know what it may do, what requires approval, and where its responsibility ends. All three
        expressed in a form something enforces.
      </p>
      <p>
        This is the property that separates an agentic system you can point at real infrastructure from one you can
        only demonstrate. It is also the property most commonly claimed on the basis of something that does not
        provide it.
      </p>

      <h2 id="the-mistake">The mistake</h2>
      <p>
        The system prompt says: do not delete anything, do not send email without asking, only query these tables,
        never modify production.
      </p>
      <p>
        That is not enforcement. It is a request to a system capable of not honoring it, and it fails in three ways
        that are entirely predictable.
      </p>
      <p>
        <b>Misinterpretation.</b> An instruction not to modify production meets a task where the model concludes this
        particular change is not really a modification, or this system is not really production. No malice required.
      </p>
      <p>
        <b>Unusual input.</b> Instructions that hold across ordinary tasks stop holding when a task is strange, which
        is exactly when the consequences are largest.
      </p>
      <p>
        <b>Injection.</b> An agent reads a document, a page, an issue, an email. That content contains text addressed
        to the agent, written by anyone who can write to those systems. If the system treats retrieved content as
        anything other than data, whoever can put text where the agent reads it can influence what it does. A prompt
        instruction is not a defense, because the attacker is writing into the same channel.
      </p>
      <div className="kb-callout">
        <b>The rule</b>
        <p>
          Anything a tool returns is data, never instruction. A system where that line is blurred is exploitable by
          whoever can write into the sources it reads.
        </p>
      </div>

      <h2 id="real-enforcement">What enforcement actually is</h2>
      <p>
        Authority is enforced outside the model, by the code that executes the action. Five mechanisms, and they
        compose.
      </p>
      <ul>
        <li>
          <b>Capability scoping.</b> The agent is given only the tools it should have. A tool that is not registered
          cannot be called. Simplest and most effective, and frequently skipped because giving an agent everything is
          easier during development.
        </li>
        <li>
          <b>Argument constraints.</b> The tool limits what it accepts. This file tool writes only under this
          directory. This email tool sends only to internal domains. Enforcement at the point of action, testable
          like any other code.
        </li>
        <li>
          <b>Credential scoping.</b> The credentials cannot perform the forbidden action. A read-only token cannot
          write regardless of what the agent attempts. The strongest form, because it holds even when everything else
          has a bug.
        </li>
        <li>
          <b>Approval gates.</b> Certain classes of action pause for a person, displaying the specific proposed
          action.
        </li>
        <li>
          <b>Process isolation.</b> A container or sandbox bounds what the agent can reach at all, which matters most
          for broad capabilities such as shell access where argument constraints are meaningless.
        </li>
      </ul>
      <p>
        A deployment with capability scoping, scoped credentials, and isolation has defense that does not depend on
        the model behaving well. That is the target.
      </p>

      <h2 id="the-test">The adversarial test</h2>
      <p>
        One question cuts through every discussion about agent safety, and I apply it literally before deploying
        anything.
      </p>
      <p>
        If the model were replaced with one that behaved adversarially, what could it actually do?
      </p>
      <p>
        Whatever the answer is, that is your real security boundary. Everything else is a preference. The exercise
        works because it forces you to ignore every control that depends on the model cooperating, which is usually
        most of them.
      </p>
      <p>
        Applied honestly the answer is often uncomfortable. An agent with shell access can do anything the user can.
        An agent with a broad database credential can read everything in the database. An agent driving a logged-in
        browser can reach everything that browser is signed into.
      </p>
      <p>
        The point is not that those capabilities are unacceptable. Plenty of useful work requires them. The point is
        that they should be chosen with the answer in view, and paired with isolation and scoping that reduce it.
      </p>

      <h2 id="approval">Approval that means something</h2>
      <p>
        Approval gates are the mechanism most often implemented in a way that produces the appearance of control
        without the substance.
      </p>
      <p>
        A prompt asking whether to proceed, without showing exactly what will happen, trains people to approve
        reflexively. After the twentieth confirmation, nobody is reading. The gate has become a delay.
      </p>
      <p>
        Three properties make an approval real. It displays the specific action with actual arguments, in a form a
        person can evaluate. It is bound to that action, so an approval cannot be reused for a different one. And it
        is rare enough that people still read them, which means gating on irreversibility and consequence rather than
        on everything.
      </p>
      <p>
        That last point is a design constraint people resist. Gating too much is a failure mode, not a safe default.
        A system where everything requires approval trains the reviewer to stop looking, which makes the gates that
        matter less effective than having fewer of them would have been.
      </p>

      <h2 id="reversibility">Reversibility is the cheapest boundary</h2>
      <p>
        The most underused control is not a restriction. It is changing the action.
      </p>
      <p>
        Where a reversible form exists, prefer it. Draft rather than send. Branch rather than push. Propose rather
        than apply. Soft delete rather than hard. Write to staging rather than to production.
      </p>
      <p>
        This converts a class of failure from an incident into a review item. A drafted email that should not have
        been written costs nothing. A sent one costs a conversation. A system built so the agent&apos;s output is a
        proposal by default, with a separate commit step, needs far fewer approval gates because the default action
        is already safe.
      </p>
      <p>
        It also changes the economics of autonomy in a direction people underestimate. An agent that can only produce
        reversible outputs can be given much more freedom, because the worst case is wasted work rather than damage.
        If you want more autonomy, make the actions reversible before loosening the controls.
      </p>

      <h2 id="identity">Whose authority is it</h2>
      <p>
        The question that determines whether the rest holds together: when an agent acts, whose permissions apply?
      </p>
      <p>
        The common arrangement is that an agent has its own credentials, typically broad, and acts as itself
        regardless of who asked. Two failures follow at once. The agent becomes a way to reach things the requester
        could not reach directly, which is a governance hole no prompt discipline closes. And the access record shows
        the agent rather than the person, which makes attribution impossible.
      </p>
      <p>
        The stronger arrangement is delegated authority: the agent acts on behalf of a person, with access scoped to
        what that person could do. Then an agent cannot become a privilege escalation path, and records name a
        principal rather than a service account.
      </p>
      <p>
        This is harder to implement and it is the difference between an agent that is genuinely bounded and one that
        merely has limits. It has an unexpected benefit too: with delegated authority, what an agent may do becomes
        what its users may do, which is a question the organization has usually already answered.
      </p>

      <h2 id="composition">Combinations nobody designed</h2>
      <p>
        Individual tools can each be reasonable while their combination is not, and per-tool review does not catch
        this.
      </p>
      <p>
        An agent with a tool that reads internal documents is fine. An agent with a tool that posts publicly is fine.
        An agent with both has a path from private to public that neither tool author considered, and it gets
        exercised the first time someone asks it to summarize something internal in a public thread.
      </p>
      <p>
        The shape is a read from a sensitive source combined with a write to a less sensitive destination. Once you
        look for it, it appears everywhere: a database reader plus a web request tool, a file reader plus an email
        sender, a ticket reader plus a code writer where ticket text is untrusted input reaching a repository, any
        read tool plus a memory write since memory is a durable and often shared destination.
      </p>
      <p>
        Three responses help. Review the configured tool set as a whole rather than tool by tool. Scope tools per
        task so the dangerous combination only exists when the task needs it. And treat any write to a destination
        outside the current trust boundary as a gate regardless of how ordinary the tool looks.
      </p>
      <p>
        This is also the strongest argument for small tool surfaces. Combinations grow much faster than tools, so an
        agent with forty tools has a review problem nobody will solve by inspection.
      </p>

      <h2 id="progression">A progression that works</h2>
      <p>
        Nobody designs an authority model up front and then builds inside it. What works is a progression, and the
        order is what makes it survivable.
      </p>
      <ol>
        <li>
          <b>Read-only, narrow scope.</b> Useful tools that change nothing, over a small set of sources. Most of the
          value, almost none of the risk, and it teaches you what agents actually reach for rather than what you
          assumed.
        </li>
        <li>
          <b>Limits before the second tool.</b> Steps, wall-clock time, spend, and repeated-failure detection. An
          hour of work, and the difference between a confused agent that stops and one that runs until a bill notices.
        </li>
        <li>
          <b>Recording from the start.</b> Not a boundary itself, and the thing that makes every subsequent decision
          evidence-based rather than speculative. You cannot instrument the past.
        </li>
        <li>
          <b>One reversible write.</b> Draft, branch, or staging table. Learn what goes wrong when the agent produces
          output that persists, while the worst case is still wasted work.
        </li>
        <li>
          <b>Scoped credentials before broader access.</b> Before widening what an agent can touch, make sure the
          credential itself cannot exceed it. This is the control that holds when others have bugs.
        </li>
        <li>
          <b>Approval gates on irreversible actions.</b> Showing the specific action, and only where it is warranted.
        </li>
        <li>
          <b>Delegated identity when more than one person uses it.</b> The moment several people can trigger an agent
          is the moment a shared account becomes a privilege escalation path.
        </li>
        <li>
          <b>Narrow against usage.</b> After a few months of records, reduce grants to what was actually used.
        </li>
      </ol>
      <p>
        The ordering matters more than any individual item. Teams that start at step six, with elaborate approval
        machinery over an agent whose credentials can do anything, have built friction rather than a boundary.
      </p>

      <h2 id="sustaining">Keeping narrow permissions sustainable</h2>
      <p>
        Least privilege has a well-known failure mode. Narrow permissions block legitimate work, friction
        accumulates, and someone widens the grant to stop the complaints. The wide grant then outlives the reason for
        it.
      </p>
      <p>
        Three things keep it workable.
      </p>
      <p>
        <b>Make denials explicable.</b> A system that can explain why a specific action was denied turns an obstacle
        into information. Policy that cannot be interrogated becomes policy nobody trusts.
      </p>
      <p>
        <b>Provide a structured request path.</b> When an agent needs a capability it lacks, recording that as a
        proposal with a written rationale produces exactly the artifact a reviewer needs. A request with a reason is a
        decision. A blocked task with no channel is pressure.
      </p>
      <p>
        <b>Narrow against evidence.</b> Start with roughly what people already had, then reduce based on what records
        show is actually used. Narrowing against usage data works. Narrowing against a guess produces a stream of
        requests and eventually a wildcard.
      </p>

      <h2 id="limits">Where I find this hard</h2>
      <p>
        I want to be honest that this principle is easier to state than to live with, and three tensions come up
        repeatedly.
      </p>
      <h3>Enforcement points multiply</h3>
      <p>
        Every new tool is a new place where argument constraints have to be written, and it is easy for one to be
        added without them. This is exactly why normalizing resources into a small set of kinds matters: if every
        filesystem action from any tool resolves to a filesystem resource, one rule covers all of them and a new tool
        cannot silently introduce a gap. Getting that abstraction right took me longer than building the tools it
        governs.
      </p>
      <h3>Broad capabilities resist constraint</h3>
      <p>
        Shell access and code execution are the two capabilities where argument constraints are close to meaningless,
        because the argument is arbitrary. Containment has to move to the process boundary, which is a heavier and
        more operational answer than a tool-level check. Any system offering those capabilities and claiming
        fine-grained control is describing something it does not have.
      </p>
      <h3>Delegated identity is a real project</h3>
      <p>
        The strongest version of this principle is that an agent acts with the requester&apos;s permissions rather
        than its own. That requires identity infrastructure the agent can consult, credentials it can obtain on
        behalf of someone, and every downstream system honoring the distinction. For many organizations that is a
        quarter of work rather than a configuration change, and the intermediate position, meaning a dedicated agent
        principal with narrow grants and the requester recorded, is a reasonable place to stop while you get there.
      </p>
      <p>
        None of these are reasons to abandon the principle. They are reasons to expect the work, and to be suspicious
        of anything that claims this comes free.
      </p>

      <h2 id="not">What this is not</h2>
      <p>
        Bounded is not the same as restricted. A well-bounded agent can have substantial capability. The property is
        that the capability is deliberate and enforced, not that there is little of it.
      </p>
      <p>
        Bounded is not the same as safe. Boundaries limit what can go wrong. They do not make the work correct. An
        agent perfectly constrained to the wrong action performs it reliably.
      </p>
      <p>
        Bounded is not something a model provider&apos;s safety training gives you. That training reduces the
        likelihood of certain outputs. It is not a boundary, because it depends on the model, and your boundary
        should not depend on the model.
      </p>
    </>
  );
}
