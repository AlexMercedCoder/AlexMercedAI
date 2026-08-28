# AlexMercedAI.com Product Requirements

## Product summary

AlexMercedAI.com is Alex Merced’s canonical point-of-view site for his work in agentic AI. It connects projects, open specifications, advocacy, and educational work into one coherent narrative: useful AI systems should be portable, inspectable, governed, and assembled from replaceable components.

## Audience and jobs

- AI and data engineers evaluating open agent infrastructure.
- Technical leaders looking for legible alternatives to vertically integrated agent platforms.
- Educators, collaborators, and conference organizers seeking Alex’s perspective and body of work.
- Existing users who need a fast map of Merced AI, Loro, MagAgent, MagGraph, AGS, and OAP.

The homepage must answer, in order: what Alex believes, what he has built, how the pieces relate, and where a visitor should go next.

## Positioning

Personal, technical, and opinionated without becoming self-promotional. The site is a portfolio and a thesis—not product documentation and not a generic AI news site.

## Information architecture

1. Hero thesis and architecture sketch.
2. Short manifesto defining the open-component worldview.
3. Selected projects with role and current release line.
4. Open standards: AGS and OAP.
5. Four operating principles.
6. About Alex and links to adjacent bodies of work.

Future phases may add essays, talks, project detail pages, an ecosystem map, and a machine-readable project index.

## Content requirements

- Describe Merced AI accurately as a broker, not an execution harness.
- Distinguish software versions from specification document/support versions.
- Link claims about projects to their primary repositories.
- Prefer concrete architectural language over hype, model benchmarks, or predictions.
- Review release labels as part of every content refresh.

## Visual system

An editorial laboratory: warm paper, black ink, cobalt, safety yellow, strong condensed headlines, serif argument text, and monospace technical labels. The system diagram should feel instrument-like. Motion is limited to purposeful hover feedback and all interactions must respect reduced-motion preferences.

## Accessibility and responsive behavior

Semantic landmarks, visible focus behavior, meaningful link text, WCAG AA contrast, no essential information conveyed only by color, and a complete one-column mobile reading order. The architecture diagram has an accessible label and remains readable without animation.

## SEO and sharing

Unique title and description, canonical domain metadata, WebSite/Person structured data, Open Graph image, Twitter card, and crawlable project language. Future essay pages require Article metadata and canonical URLs.

## Technical requirements

- Next-compatible React scaffold delivered through OpenAI Sites/Vinext.
- Static-first; no database, authentication, analytics, or CMS in phase one.
- Production build and lint must pass before publication.
- Public GitHub repository is the phase-one delivery target; domain hosting is a separate release step.

## Success measures

- Visitors can name Alex’s core thesis and locate a relevant project in under one minute.
- Every featured project has a clear category and primary-source destination.
- Lighthouse-oriented implementation: fast initial render, responsive layout, and accessible semantics.

## Non-goals

Full project documentation, release automation, a blog CMS, model comparison rankings, lead capture, and domain deployment are outside the first scaffold.
