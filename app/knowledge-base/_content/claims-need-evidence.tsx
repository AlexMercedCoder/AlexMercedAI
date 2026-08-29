import type { Article } from './types';

export const article: Article = {
  slug: 'claims-need-evidence',
  title: 'Claims need evidence',
  kind: 'concept',
  layer: null,
  kicker: 'PRINCIPLE / 04',
  summary: 'Useful autonomy comes from traceable decisions, observable work, and verifiable outcomes, not from an agent asserting that it finished.',
  standfirst: 'A model asked whether it completed a task will usually say yes. Building systems on that answer produces silent failures that compound. Every claim an agent makes should be checkable by something other than the agent.',
  keywords: ['agent evidence', 'success conditions', 'provenance', 'audit trail', 'verification', 'agent accountability', 'snapshot identifiers'],
  sections: [
    { id: 'the-principle', label: 'The principle' },
    { id: 'self-report', label: 'Why self-reported success fails' },
    { id: 'evaluated-not-asserted', label: 'Evaluated, not asserted' },
    { id: 'provenance', label: 'Evidence for answers' },
    { id: 'artifacts', label: 'Evidence for artifacts' },
    { id: 'authority-evidence', label: 'Evidence for authority' },
    { id: 'what-to-record', label: 'What to record' },
    { id: 'delivery', label: 'Records have to arrive' },
    { id: 'scenario', label: 'A question nine months later' },
    { id: 'retention', label: 'Retention is where this is lost' },
    { id: 'not', label: 'What this is not' },
  ],
  learnMore: [
    { label: 'Loro', href: 'https://github.com/alexmerced-oss/loro', note: 'Delivered audit records, identity-bound approvals, and checksum-bound artifact provenance.' },
    { label: 'Agentic Graph Specification', href: 'https://github.com/AlexMercedCoder/agentic-graph-spec', note: 'Success conditions evaluated by the harness rather than asserted by the model.' },
    { label: 'Apache Iceberg', href: 'https://iceberg.apache.org', note: 'Snapshot history, which is what makes a past data read reproducible rather than merely logged.' },
    { label: 'Open Agentic Platform', href: 'https://openagenticplatform.com/knowledge-base/auditable', note: 'The vendor-neutral treatment of auditability.' },
  ],
  related: ['agentic-graph-specification', 'loro', 'inspectable-state'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="the-principle">The principle</h2>
      <p>
        Useful autonomy comes from traceable decisions, observable work, and verifiable outcomes.
      </p>
      <p>
        The practical version: every claim an agent makes should be checkable by something other than the agent. That
        it completed the task. That the number is correct. That it was allowed to do what it did. All three are
        assertions until something else confirms them.
      </p>

      <h2 id="self-report">Why self-reported success fails</h2>
      <p>
        A model asked whether it completed a task will usually say yes. Not from dishonesty. Assessing your own work
        against a criterion you also interpreted is simply not a reliable operation, and it is not one we would trust
        from a person either, which is why code review exists.
      </p>
      <p>
        The failure mode this produces is specific and nasty. A step half-worked. The agent reported done. The next
        step built on it. By the time anything visibly breaks, three steps have been built on a bad foundation, and
        the visible failure is nowhere near the actual one.
      </p>
      <p>
        Systems that depend on self-reported completion accumulate these silently. Nothing errors. The traces look
        clean. Output arrives. It is simply wrong in ways nobody has a mechanism to detect.
      </p>

      <h2 id="evaluated-not-asserted">Evaluated, not asserted</h2>
      <p>
        This is why the Agentic Graph Specification requires that success conditions be evaluated by the harness
        rather than asserted by the model, and it is the constraint carrying most of that format&apos;s weight.
      </p>
      <p>
        A condition saying the test suite passes is checked by running something. A condition saying the output
        contains these fields is checked by looking. Neither depends on the model&apos;s opinion of its own work.
      </p>
      <p>
        Where a condition cannot be machine-checked, writing it down anyway is still worth doing, because a reviewer
        then knows what the step was supposed to achieve. An unchecked criterion is weaker than a checked one and far
        stronger than an unstated one.
      </p>
      <p>
        The practical advice I would give: make conditions checkable wherever the effort is reasonable, accept
        human-readable ones elsewhere, and never skip them on the grounds that the task is obviously either done or
        not. Obviousness is exactly what fails under unusual input.
      </p>

      <h2 id="provenance">Evidence for answers</h2>
      <p>
        When an agent produces a number, the useful question is not whether it is right. It is where it came from.
      </p>
      <p>
        An agent that queried a table can record which table, which snapshot, and which query. Someone questioning
        the answer next quarter reads exactly the same data the agent read, without re-running a pipeline or trusting
        a log. Table formats with snapshot history give this almost for free, provided the harness records the
        identifier.
      </p>
      <p>
        An agent that answered from recall can record nothing. There is no source to point at, no version, no date.
        The answer can only be repeated, never defended.
      </p>
      <p>
        This is the strongest practical argument for grounding, and it is usually made in terms of accuracy instead.
        Accuracy improves, and the durable benefit is that a grounded answer survives being questioned a year later.
      </p>
      <div className="kb-callout">
        <b>One field, large payoff</b>
        <p>
          Recording the snapshot identifier alongside an answer costs almost nothing at write time and converts an
          unverifiable claim into a reproducible one. It is the highest-value single field I know of in this layer.
        </p>
      </div>

      <h2 id="artifacts">Evidence for artifacts</h2>
      <p>
        Traces record what an agent did. Provenance connects what it did to the thing that resulted, which is the
        direction the question actually gets asked from.
      </p>
      <p>
        Generated artifacts leave the system. A document produced by an agent gets emailed, filed, and cited. Six
        months later someone holding that document wants to know where it came from, and a trace does not help unless
        something connects the two.
      </p>
      <p>
        A provenance record bound by checksum closes the loop. Given the artifact, identify the run that produced it,
        the sources it drew on, and the approvals that preceded it. Without one, the origin of an artifact is whatever
        someone remembers.
      </p>
      <p>
        The same reasoning applies to data an agent writes. A row inserted into a table should be traceable to the
        run that inserted it, which means carrying a run identifier into the write rather than reconstructing it from
        timestamps afterwards.
      </p>

      <h2 id="authority-evidence">Evidence for authority</h2>
      <p>
        The third kind of claim is the one people forget: that the agent was allowed to do what it did.
      </p>
      <p>
        This needs three things recorded at the time. The identity the run operated under, meaning a real principal
        rather than a service account. The authority in force at that moment, which is why profile revisions and
        digests matter, since permissions change and the current ones are not the ones that applied. And the
        approvals, bound to the specific actions and recording what the approver actually saw.
      </p>
      <p>
        An audit trail attributing everything to a service account has recorded that something happened and not who is
        accountable for it. That is the most common structural gap I see, and it cannot be filled retroactively.
      </p>

      <h2 id="what-to-record">What to record</h2>
      <p>
        The list is longer than typical logging, and each item maps onto a question someone will eventually ask.
      </p>
      <ul>
        <li><b>The request and the requester.</b> What was asked, by whom, through which channel.</li>
        <li><b>The identity and authority in force.</b> Which agent, which profile revision, which permissions. The revision matters because permissions change.</li>
        <li><b>Every step.</b> Context sent, tool called, arguments, result, including failures.</li>
        <li><b>Model and version per call.</b> So behavior changes can be attributed when a provider updates something behind a stable name.</li>
        <li><b>Data provenance.</b> Which tables, which snapshots, which queries.</li>
        <li><b>Approvals.</b> What was proposed, what was displayed, who decided, when, bound to that action.</li>
        <li><b>Changes made.</b> What was written where, with a way to identify the resulting records.</li>
        <li><b>Termination reason.</b> Completed, limit reached, denied, cancelled, errored.</li>
        <li><b>Artifacts produced.</b> With a checksum, so a document found later ties back to the run that made it.</li>
      </ul>
      <p>
        A note on audience, because this is where records usually fall short. They are designed by engineers and read
        by people who are not. The process owner checking whether work went correctly needs the sequence in business
        terms and cannot use a record naming service accounts. The investigator needs to find the run from an
        external artifact, which means the identifier has to travel with the output. The person reviewing authority
        needs the permissions as they were, not as they are.
      </p>
      <p>
        Producing a readable summary alongside the technical record, generated at the time from the structured data
        rather than written later, is what makes the record usable by three of those four audiences. It costs very
        little and it is the difference between a trail that answers questions and one that needs an engineer to
        interpret every time anyone asks.
      </p>

      <h2 id="delivery">Records have to arrive</h2>
      <p>
        Treating this as logging is how it fails quietly, and the distinction took me longer to internalize than it
        should have.
      </p>
      <p>
        A log is written locally. It is lost when the machine is, ignored when nobody aggregates it, and truncated
        when a process exits unexpectedly. None of those failures announce themselves.
      </p>
      <p>
        An audit record has to arrive somewhere durable, which makes it a delivery problem with the properties
        delivery problems have: bounded buffering so an outage does not consume the machine, retry so a transient
        failure does not lose records, diagnostics so someone can check delivery is healthy, and an explicit flush so
        a shutting-down process does not discard what it has not sent.
      </p>
      <p>
        A pipeline that stopped working three weeks ago is worse than none at all, because it produces confidence
        without coverage. Being able to verify that delivery is working is part of the feature rather than an
        operational extra.
      </p>

      <h2 id="scenario">A question nine months later</h2>
      <p>
        The abstract case is unpersuasive until you walk through an ordinary question.
      </p>
      <p>
        A customer disputes a pricing decision made nine months ago. An agent analyzed usage data and applied a
        discount tier. The customer says the tier was wrong. Nobody involved at the time is still on the team.
      </p>
      <p>
        Without evidence, the reconstruction goes badly. Traces were retained thirty days, so the run is gone. The
        billing record shows the tier and not why. The data has been updated many times since, so re-running produces
        a different answer, which proves nothing. The best available response is that the system applied its rules
        correctly, which is an assertion, and it is the kind of assertion that loses disputes.
      </p>
      <p>
        With evidence, it is a lookup. The run identifier is on the billing record. The record shows the request, the
        requester, the agent and profile revision in force, the tables and snapshots read, the query issued, the tier
        computed, and the approval that released it with what the approver saw. Reading the snapshot shows exactly
        the data the agent had. If the tier was wrong, the record shows whether the error was in the data, the
        definition, or the decision, which determines who owes what.
      </p>
      <p>
        Nothing in the second version is exotic. A run identifier carried into the write, a snapshot identifier
        recorded with the read, an approval bound to the action, and retention matched to the period over which
        disputes arise. Each is a small decision made at build time, and none of them can be made afterwards.
      </p>

      <h2 id="retention">Retention is where this is lost</h2>
      <p>
        Everything above can be implemented correctly and still fail, because retention defaults are set for
        operational logging rather than for the questions evidence answers.
      </p>
      <p>
        Operational logging is measured in days or weeks. Evidence questions arrive on a completely different
        timescale: a quarter-end review, an annual audit, a dispute about something from last year. A record deleted
        on day thirty cannot answer a question asked on day ninety, and nobody notices the gap until the question
        arrives.
      </p>
      <p>
        Retention also pulls against privacy, and pretending otherwise produces bad outcomes in both directions. A
        complete record contains everything that flowed through the system, including sensitive material a tool
        returned. Keeping all of it forever is not responsible, and keeping none of it makes the system
        unaccountable.
      </p>
      <p>
        Tiering resolves most of it. Keep full detail for a period matched to debugging needs. Keep structured
        metadata, meaning who, what, when, which sources, which approvals, and what changed, for as long as questions
        can plausibly be asked. Most evidence questions are answerable from metadata, and metadata is far less
        sensitive than full content.
      </p>
      <p>
        Two smaller points that matter more than they look. Integrity: for anything that might be contested,
        delivering records to a system the agent runtime cannot edit is a large fraction of the benefit of full
        tamper-evidence for a small fraction of the cost. And testing: pick a task from three months ago and try to
        answer the questions on this page. Whatever you cannot answer is your actual gap, and finding it that way is
        much cheaper than finding it during a dispute.
      </p>

      <h2 id="not">What this is not</h2>
      <p>
        Evidence is not the same as correctness. A perfectly recorded wrong decision is still wrong. What evidence
        provides is the ability to find out, which is a precondition for improvement rather than a substitute for it.
      </p>
      <p>
        Evidence is not the same as explanation. A record shows what a model was sent and what it returned. It does
        not explain why. Asking a model to explain a past decision produces a plausible story rather than a record,
        and treating that story as evidence is worse than having nothing, because it looks like an answer.
      </p>
      <p>
        Evidence is not free. Storage, delivery infrastructure, and the discipline of recording things nobody has
        asked for yet. That is the trade, and the reason to make it is that the alternative is not a smaller record
        but no answer at all.
      </p>
    </>
  );
}
