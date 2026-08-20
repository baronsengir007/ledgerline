# Ledgerline

A fictional B2B SaaS product: invoice reconciliation for agencies.
Built as a portfolio demonstration by Rienk Rienks. Not a real product;
the footer of the site says so too.

Live: https://baronsengir007.github.io/ledgerline/

## Stack

Next.js (App Router, static export), Tailwind CSS v4, TypeScript.
Deployed on GitHub Pages. No backend, no tracking, no cookies.

```
npm install
npm run dev      # local dev
npm run build    # static export to out/
```

## How this site was designed

This site was built behavior-first, not layout-first, following a
behavior-driven UI method used across my projects: every screen exists
to move a user through five states (Arrival, Orientation, Decision,
Action, Confirmation), and the layout is derived from a Behavior Read
instead of picked from trends.

**Behavior Read for this page:** get a skeptical agency owner (cold
visitor, trust-poor) to start a free trial; the main barrier is
motivation (does this actually fix my reconciliation pain?); the screen
carries them from Arrival to Decision; measured by trial-CTA
click-through.

Derived decisions, each traceable to that read:

- **Split-screen hero with a live payoff.** The barrier is motivation,
  so the product's value is shown, not described: the hero runs a
  self-playing ledger in which payments match invoices (highlighter
  sweep) and a partial payment gets flagged for review. It plays once
  and settles: no infinite loops in the interface, per the field
  guide's motion rules. Show the payoff early beats explain the payoff.
- **One primary behaviour per screen.** A single CTA ("Start free"),
  repeated at the Z-terminal; secondary links are visually subordinate.
- **No fabricated social proof.** A fictional product has no customers,
  and fake testimonials or usage counters fail the ethics gate
  (transparency test). Trust is built with specifics instead: how
  matching works, what the audit trail logs, what leaving costs.
- **Costs and exits visible before the decision.** Pricing on the page,
  "export everything, cancel in two clicks" stated next to it. Easy
  exits are advertised, not hidden.
- **Numbered steps only where order is real.** The 1-2-3 section is an
  actual sequence (connect, match, review); numbering encodes
  information, it does not decorate.
- **Pattern vocabulary** from an interface field guide (split screen,
  layer-cake sections, Z-pattern scan for a sparse landing page), chosen
  by behavioural state rather than by trend.

- **Reveals that cannot hide content.** Scroll reveals are CSS
  scroll-driven animations (`animation-timeline: view()`) rather than a
  JavaScript IntersectionObserver, wrapped in `@supports` and
  `prefers-reduced-motion: no-preference`. Without support, or with
  reduced motion requested, the `opacity: 0` starting state never
  applies, so content cannot get stuck invisible. Items in a section
  animate over slightly offset scroll ranges, which builds the section
  instead of flicking it into place.

Quality floor: responsive to mobile, visible keyboard focus,
`prefers-reduced-motion` respected (the ledger renders in its settled
state), semantic HTML, system status in the demo via `aria-live`.

## Also demonstrated here

- **A working app surface, not just marketing.** `/review` is the
  product's review queue as a live demo: filter tabs, approve/reject
  with undo, an empty state that means something, progress counter with
  `aria-live`, and state persisted to localStorage. Optimistic,
  reversible actions over confirmation dialogs.
- **Type-safe interaction code.** The queue is a typed React client
  component (discriminated status unions, no `any`), composed against
  static pages via the App Router.
- **Data thinking.** If this were real, the core schema is three tables:
  `invoices (id, client_id, amount_cents, currency, issued_at, status)`,
  `payments (id, amount_cents, currency, received_at, iban_hash, raw_ref)`
  and `matches (invoice_id, payment_id, confidence, matched_by,
  decided_at)` with an append-only `match_events` audit table: a shape
  that maps directly onto Postgres/Supabase with row-level security per
  agency.

## Design tokens

Paper `#f6f7f4`, ink `#16241f`, moss `#2e6b52` / `#1d4a38`, marker
yellow `#f2e34d`, flag orange `#b3542e`. Type: Fraunces (display),
IBM Plex Sans (body), IBM Plex Mono (ledger figures).

## How this was built

Written in Claude Code, but the design decisions come from a fixed
pipeline rather than from prompting until something looks nice. Two
reference documents of my own do the deciding: a behavior-driven UI
method (the five behavioural states and the Behavior Read above) and an
interface field guide (named layout patterns, style families, and the
cliches to avoid, refreshed as they rotate). Two Claude Code skills
execute against those: `design-taste-frontend` for visual direction and
anti-template discipline, and `emil-design-eng` for the motion rules
(transform and opacity only, ease-out curves, hover gated behind a
pointer query, reduced motion respected).

Behaviour outranks aesthetics at every conflict, and every visual
choice above is traceable back to the Behavior Read. Verification is
part of the loop, not a final glance: layouts are checked in a real
browser at desktop and 390px, and reduced-motion is tested with the
media feature actually forced on rather than assumed.
