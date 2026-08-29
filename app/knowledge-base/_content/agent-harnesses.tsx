import type { Article } from './types';

export const article: Article = {
  slug: 'agent-harnesses',
  title: 'Agent harnesses',
  kind: 'layer',
  layer: null,
  kicker: 'CATEGORY / EXECUTION',
  summary: 'The software that actually runs an agent: the loop, the tools, the state, the limits, and the record of what happened.',
  standfirst: 'A model produces text. A harness turns that into work. Almost everything that separates a demonstration from a system you would run against real infrastructure lives here, and almost none of it is about the model.',
  keywords: ['agent harness', 'agent runtime', 'agent loop', 'tool execution', 'agent limits', 'agent state', 'agent policy'],
  sections: [
    { id: 'what-it-is', label: 'What a harness is' },
    { id: 'the-loop', label: 'The loop is the easy part' },
    { id: 'responsibilities', label: 'Seven responsibilities' },
    { id: 'context', label: 'Context assembly decides quality' },
    { id: 'authority', label: 'Authority is not a prompt' },
    { id: 'two-harnesses', label: 'Why I built two of them' },
    { id: 'governed-vs-developer', label: 'Governed and developer harnesses' },
    { id: 'tools', label: 'Tool design is the real work' },
    { id: 'multiple', label: 'You will end up with several' },
    { id: 'evaluating', label: 'How I evaluate a harness' },
    { id: 'debugging', label: 'Debugging one' },
    { id: 'not', label: 'What a harness is not' },
  ],
  learnMore: [
    { label: 'Loro', href: 'https://github.com/alexmerced-oss/loro', note: 'My governed harness, organized around identity, policy, approvals, and audit.' },
    { label: 'MagAgent', href: 'https://github.com/AlexMercedCoder/MagAgent', note: 'My developer harness, organized around persistent memory and a broad tool surface.' },
    { label: 'Open Agentic Platform', href: 'https://openagenticplatform.com/knowledge-base/harnesses-and-brokers', note: 'The vendor-neutral treatment of this layer, with a survey of other harnesses.' },
    { label: 'Model Context Protocol', href: 'https://modelcontextprotocol.io', note: 'How a harness reaches tools without owning every integration.' },
  ],
  related: ['loro', 'magagent', 'agent-brokers'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What a harness is</h2>
      <p>
        A harness is the software that runs an agent. It assembles what the model sees, asks it what to do, checks
        whether the proposed action is permitted, executes it, captures the result, decides whether the task is done,
        and records enough that someone can reconstruct the sequence later.
      </p>
      <p>
        Everything between a model deciding something and the world changing happens here. That is a larger surface
        than it sounds, and it is where I have spent most of my building time.
      </p>

      <h2 id="the-loop">The loop is the easy part</h2>
      <p>
        Written out, an agent loop is short. Assemble context. Ask the model. If it proposes a tool call, check it,
        run it, capture the result. Add the result to context. Repeat until done, limited, or denied.
      </p>
      <p>
        Anyone can build that in an afternoon, and many people do, then conclude that agent frameworks are mostly
        marketing. The difficulty is not the shape. It is every branch the shape hides.
      </p>
      <p>
        What happens when a tool times out. When the model proposes the same failing call four times. When a tool
        returns two megabytes. When a user cancels mid-step. When the process restarts with a task in flight. When
        the accumulated context exceeds the window. When a tool result contains text that looks like an instruction.
      </p>
      <p>
        That last one deserves emphasis because it is a security property rather than a robustness one. Anything a
        tool returns is data, never instruction. Web pages, file contents, issue descriptions, and email bodies can
        all contain text addressed to the agent, written by anyone who can write to those systems. A harness that
        treats retrieved content as authoritative is exploitable by whoever can put text where the agent will read
        it, and no amount of prompt wording fixes it.
      </p>

      <h2 id="responsibilities">Seven responsibilities</h2>
      <p>
        When I evaluate a harness, mine or anyone else&apos;s, I check these seven.
      </p>
      <ol>
        <li><b>Context assembly.</b> What the model sees each step, how it is trimmed, and in what order.</li>
        <li><b>Tool execution.</b> With timeouts, argument validation, output size limits, and errors returned as results the agent can act on rather than as crashes.</li>
        <li><b>Authority enforcement.</b> Deciding whether an action is permitted, before it runs, by code the agent cannot change.</li>
        <li><b>State management.</b> Conversation, task, and progress, durable enough to survive a restart if the work is long.</li>
        <li><b>Limits.</b> Steps, wall-clock time, spend, and repeated-failure detection.</li>
        <li><b>Recording.</b> What was sent, what was called, what came back, what was decided. Built in, because you cannot record the past.</li>
        <li><b>Termination.</b> Knowing when the work is finished, when it has failed, and when it needs a person.</li>
      </ol>
      <p>
        The last one is the most underrated. Agents that cannot recognize failure keep trying, and each attempt costs
        money and sometimes does damage. Ending cleanly is a feature.
      </p>

      <h2 id="context">Context assembly decides quality</h2>
      <p>
        If I could persuade people of one thing about this layer, it would be this: most problems that look like
        model problems are context assembly problems.
      </p>
      <p>
        An agent that picks the wrong table was not shown which one is authoritative. An agent that ignores a
        constraint had that constraint stated forty thousand tokens earlier, buried in the middle of a long context
        where attention is weakest. An agent that repeats a failed approach was not shown that it already failed in a
        form it could recognize.
      </p>
      <p>
        The diagnostic is cheap. If a stronger model handles the task correctly with the same context, you have a
        capability problem and a better model or a different tier might help. If every model fails the same way, the
        context is wrong and no amount of model improvement will fix it.
      </p>
      <p>
        Three assembly habits carry most of the benefit. Put stable content first and volatile content last, which
        makes prefix caching possible and costs nothing where it is unavailable. Select rather than fill: ten
        thousand well-chosen tokens beat a hundred thousand assembled by a similarity threshold. And when sources
        conflict, say so explicitly and name the authoritative one rather than presenting both and hoping.
      </p>

      <h2 id="authority">Authority is not a prompt</h2>
      <p>
        The most consequential mistake in this layer is writing limits into a system prompt and believing they are
        enforcement.
      </p>
      <p>
        Do not delete anything. Do not send email without asking. Only touch these tables. These are requests to a
        system capable of not honoring them. They fail on misinterpretation, they fail on unusual input, and they
        fail reliably when a document the agent reads contains text designed to override them.
      </p>
      <p>
        Real authority is enforced outside the model, by the code that executes the action. Capability scoping, so a
        tool that is not registered cannot be called. Argument constraints, so the tool itself limits what it
        accepts. Credential scoping, so the credentials cannot perform the forbidden action at all. Approval gates
        for classes of action, showing the specific action rather than a summary. Process isolation for broad
        capabilities such as shell access, where argument constraints are meaningless.
      </p>
      <p>
        The test I apply before deploying anything: if the model were replaced with one that behaved adversarially,
        what could it actually do? Whatever the answer is, that is the real boundary. Everything else is a
        preference.
      </p>
      <div className="kb-callout">
        <b>Why I keep repeating this</b>
        <p>
          Because it is the failure I see most often, and because it produces systems that appear safe. A prompt
          instruction creates the feeling of a boundary without the boundary, which is more dangerous than having no
          boundary at all and knowing it.
        </p>
      </div>

      <h2 id="two-harnesses">Why I built two of them</h2>
      <p>
        Building both Loro and MagAgent looks redundant until you see what each is organized around, and the honest
        answer is that they solve different problems that I did not want to compromise between.
      </p>
      <p>
        <b>Loro starts with the controls.</b> Identity, permission decisions over normalized resources, identity-bound
        approvals with replay protection, sandboxed subprocess profiles, delivered audit records, and governed data
        access through a catalog. Capability is added inside those constraints. It is aimed at work where being able
        to demonstrate what happened matters as much as the work happening.
      </p>
      <p>
        <b>MagAgent starts with memory.</b> A persistent knowledge graph that accumulates across sessions, a broad
        tool surface including real language servers, and a fast terminal experience. It is aimed at the daily
        relationship between a developer and their projects, where the value comes from an agent that learns you.
      </p>
      <p>
        I tried, briefly, to make one thing do both. The result was worse at both. Governance machinery is overhead
        for a fast daily assistant, and a memory-first design that accumulates freely is exactly wrong when every
        write needs to be defensible. Those are genuinely different products, and pretending otherwise produced
        something nobody would choose.
      </p>
      <p>
        What makes running two acceptable is that the definitions do not live in either. Agents are profiles. Skills
        are folders. Plans are graphs. Tool connections are protocol servers. The harnesses are interchangeable
        because nothing important is stored inside them, which is the argument this entire site is making, applied
        to my own work.
      </p>

      <h2 id="governed-vs-developer">Governed and developer harnesses</h2>
      <p>
        I find this distinction more useful than the usual split by domain, because it predicts what a harness will
        be good at.
      </p>
      <div className="kb-table-scroll">
        <table className="kb-table">
          <thead><tr><th></th><th>Governed</th><th>Developer</th></tr></thead>
          <tbody>
            <tr><td>Starts from</td><td>Authority and evidence</td><td>Capability and speed</td></tr>
            <tr><td>Default posture</td><td>Deny, then permit specifically</td><td>Permit, then contain</td></tr>
            <tr><td>Setup cost</td><td>Real, and deliberate</td><td>Minimal</td></tr>
            <tr><td>Optimizes</td><td>Being able to show what happened</td><td>Time from intent to result</td></tr>
            <tr><td>Wrong for</td><td>A solo developer wanting a fast assistant</td><td>Regulated work needing demonstrable control</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Neither is more advanced. Choosing a governed harness for personal coding work produces friction with no
        corresponding benefit, and choosing a developer harness for work touching regulated data produces a system
        nobody can defend. The mismatch is the failure, not the category.
      </p>

      <h2 id="tools">Tool design is the real work</h2>
      <p>
        An agent can only do what its tools let it do, which makes tool design the highest-leverage work in this
        layer. It is closer to API design than to prompt writing, and it is where I have changed my mind most.
      </p>
      <h3>Specific beats general</h3>
      <p>
        A tool called <code>get_open_orders_for_account</code> is chosen correctly far more often than one called
        <code>run_query</code>. I used to prefer general tools on the theory that they were more flexible. They are,
        and they push the decision onto the model at every single call, where it can be wrong every time. A specific
        tool encodes the decision once, in code, where it can be tested.
      </p>
      <h3>The description is the interface</h3>
      <p>
        A tool description is not documentation for humans who will never read it. It is the entire basis on which a
        model decides whether this tool applies. Say what it does, when to use it, when not to, and what the
        arguments mean in domain terms. A terse description produces a tool that is used incorrectly regardless of
        how well it is implemented.
      </p>
      <h3>Shape results for reasoning, not for display</h3>
      <p>
        Returning a raw API response with sixty fields wastes context and buries the answer. Return the fields that
        matter, with units, and say what was filtered or truncated. For anything that can return a lot, return a
        description plus a sample rather than the whole thing, and keep the full result available under a handle.
      </p>
      <h3>Errors are input</h3>
      <p>
        The model reads errors and acts on them. An error saying an identifier was not found, and what identifiers
        look like, lets an agent correct itself. A stack trace does not. This means error text is part of the
        interface and deserves the same care as the success path.
      </p>
      <h3>Fewer is better</h3>
      <p>
        Tool selection quality degrades as the list grows. Beyond roughly two dozen, models start choosing badly, and
        the fix is not a stronger model, it is fewer tools in scope for a given task. Scoping tools per task rather
        than exposing everything is one of the cheapest quality improvements available and one of the least applied.
      </p>

      <h2 id="multiple">You will end up with several</h2>
      <p>
        This is worth stating plainly because a lot of architecture advice implicitly assumes standardization.
      </p>
      <p>
        Coding work wants deep repository and symbol awareness. Customer-facing work wants tight latency and
        conservative defaults. Data work wants query tooling and result handling. Background automation wants
        durability and retries more than interactivity. These are different products, and a single harness that
        serves all of them well is rare.
      </p>
      <p>
        Harnesses also arrive at different times and from different directions. One comes with an editor. One arrives
        embedded in a vendor product. One is built internally. The realistic goal is not to prevent this. It is to
        make sure that what matters lives outside all of them.
      </p>

      <h2 id="evaluating">How I evaluate a harness</h2>
      <ul>
        <li><b>Can I see the actual prompt?</b> Not the template. If not, debugging is guesswork.</li>
        <li><b>Does it verify, or does it trust the model?</b> A harness that reports success because the final model call said so is not doing the job.</li>
        <li><b>What are the limits, and are they enforced in code?</b> Steps, time, spend, repeated failures.</li>
        <li><b>Where does policy live?</b> If the answer involves the system prompt, that is not policy.</li>
        <li><b>Does it stop well?</b> Watch it fail. A harness that recognizes it is stuck is worth more than one that is slightly better when things go right.</li>
        <li><b>Would my definitions move?</b> Skills, agent identity, tool connections. If they would not, the harness is a commitment rather than a choice.</li>
        <li><b>What does it record, and for how long?</b> Because every question I will ask in three months depends on this answer.</li>
      </ul>

      <h2 id="debugging">Debugging one</h2>
      <p>
        Agents fail differently from ordinary software, and the method that works is different too.
      </p>
      <p>
        There is rarely a stack trace pointing at a line. There is a sequence of individually reasonable steps that
        added up to the wrong outcome. The only way to find the problem is to read the sequence, which means the
        trace is the primary debugging artifact and has to contain more than most logging captures by default: the
        exact context sent at each step rather than a template, every tool call with full arguments, every result
        including errors, the model and version, and why the loop stopped.
      </p>
      <p>
        Read it backwards, to the first step where something the agent believed was not true. That divergence point
        is usually several steps earlier than the visible mistake. Most of the time it turns out a tool gave a
        misleading result: an empty list where an error was appropriate, a truncated response with no indication of
        truncation, a column name that meant something other than it appeared to. Fixing the final step does nothing.
        Fixing the tool fixes the class.
      </p>
      <p>
        The habit I recommend and do not always keep is reading a sample of real traces weekly, including successful
        ones. Success traces show wasted steps, unnecessary tool calls, and context bloat that never become visible
        bugs and entirely determine what the system costs and how fast it feels. Nothing else surfaces that.
      </p>

      <h2 id="not">What a harness is not</h2>
      <p>
        A harness is not a model with extra steps. The model contributes judgment. The harness contributes structure,
        limits, memory, and accountability, none of which a model can provide about itself.
      </p>
      <p>
        A harness is not the right home for durable business data. Task state belongs here. Facts belong where they
        can be queried, governed, and used by systems that are not agents.
      </p>
      <p>
        A harness is not a substitute for standards. Every harness defines skills, tools, and agent identity somehow.
        If those definitions live only inside it, the system is portable in principle and captured in practice, which
        is the outcome all of this work exists to avoid.
      </p>
    </>
  );
}
