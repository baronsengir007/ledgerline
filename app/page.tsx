import Link from "next/link";
import LedgerDemo from "./LedgerDemo";

const STEPS = [
  {
    n: "1",
    title: "Connect your accounts",
    body: "Link your bank feed and your invoicing tool. Read-only access: Ledgerline can see transactions, never move money.",
  },
  {
    n: "2",
    title: "Ledgerline matches",
    body: "Amounts, references, names and near-misses are compared on every new transaction. Each match carries a confidence score you can inspect.",
  },
  {
    n: "3",
    title: "You review the exceptions",
    body: "High-confidence matches close themselves. Partial payments, bundles and unclear references land in one review queue, ordered by amount.",
  },
];

const FEATURES = [
  {
    title: "Confidence you can audit",
    body: "Every automatic match shows why it matched: amount, reference, counterparty history. One click to unmatch.",
  },
  {
    title: "Partial payments and bundles",
    body: "One payment for three invoices, or half an invoice now and half next month. Ledgerline splits and links them correctly.",
  },
  {
    title: "Multi-currency",
    body: "Invoices in euros, payments in pounds. Matched at the daily rate, differences booked to an account you choose.",
  },
  {
    title: "An audit trail that holds up",
    body: "Every match, split and manual correction is logged with who, when and why. Export the trail with your books.",
  },
  {
    title: "A digest, not a dashboard vigil",
    body: "One morning summary in Slack or email: what closed itself, what needs you. No login required to know where you stand.",
  },
  {
    title: "Leave whenever you want",
    body: "Your matches export to CSV and to your accounting tool at any moment. Cancelling takes two clicks and keeps your data available for 90 days.",
  },
];

const PLANS = [
  {
    name: "Starter",
    price: "€0",
    per: "forever",
    body: "For a first look at your books.",
    items: ["100 matches per month", "1 bank connection", "CSV export"],
    highlight: false,
  },
  {
    name: "Studio",
    price: "€49",
    per: "per month",
    body: "For agencies closing books monthly.",
    items: [
      "Unlimited matches",
      "3 bank connections",
      "Review queue with confidence scores",
      "Slack and email digests",
    ],
    highlight: true,
  },
  {
    name: "Agency",
    price: "€149",
    per: "per month",
    body: "For teams with multiple entities.",
    items: [
      "Everything in Studio",
      "Unlimited connections and entities",
      "Multi-currency",
      "Full audit-trail export",
    ],
    highlight: false,
  },
];

function Cta({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#pricing"
      className="inline-block rounded-md bg-moss-deep px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-moss"
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <main>
      {/* Nav */}
      <header className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5">
        <span className="font-display text-xl font-semibold tracking-tight">
          Ledgerline
        </span>
        <nav className="flex items-center gap-6 text-sm">
          <a href="#how" className="text-ink-soft hover:text-ink">
            How it works
          </a>
          <Link href="/review/" className="text-ink-soft hover:text-ink">
            Product demo
          </Link>
          <a href="#pricing" className="text-ink-soft hover:text-ink">
            Pricing
          </a>
          <Cta>Start free</Cta>
        </nav>
      </header>

      {/* Hero: split screen: headline left, live payoff right */}
      <section className="mx-auto grid max-w-[1400px] items-center gap-10 px-6 pb-20 pt-12 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div>
          <p className="rise mb-4 text-xs font-medium uppercase tracking-[0.18em] text-moss-deep">
            Invoice reconciliation for agencies
          </p>
          <h1 className="rise rise-1 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Every invoice finds its&nbsp;payment.
          </h1>
          <p className="rise rise-2 mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
            Ledgerline matches incoming payments to open invoices
            automatically, flags the ones that need a human, and closes your
            books days earlier.
          </p>
          <div className="rise rise-3 mt-8 flex items-center gap-4">
            <Cta>Start free</Cta>
            <Link
              href="/review/"
              className="text-sm font-medium text-moss-deep underline-offset-4 hover:underline"
            >
              Try the review queue
            </Link>
          </div>
        </div>
        <div className="rise rise-2">
          <LedgerDemo />
        </div>
      </section>

      {/* How it works: a real sequence, so numbered */}
      <section id="how" className="border-y border-rule bg-card">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            Three steps, then it runs itself
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n}>
                <div className="font-mono text-sm text-moss-deep">{s.n} /</div>
                <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-[1400px] px-6 py-20">
        <h2 className="font-display text-3xl font-semibold tracking-tight">
          Built for the messy reality of getting paid
        </h2>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="border-t border-rule pt-4">
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-y border-rule bg-card">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            Plain pricing, no surprises at renewal
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`rounded-lg border p-6 ${
                  p.highlight
                    ? "border-moss-deep bg-paper shadow-[0_12px_32px_-16px_rgba(29,74,56,0.35)]"
                    : "border-rule bg-paper"
                }`}
              >
                {p.highlight && (
                  <div className="mb-3 inline-block rounded bg-mark px-2 py-0.5 text-xs font-medium">
                    Recommended
                  </div>
                )}
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-mono text-3xl">{p.price}</span>
                  <span className="text-sm text-ink-soft">{p.per}</span>
                </div>
                <p className="mt-2 text-sm text-ink-soft">{p.body}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {p.items.map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-moss-deep">✓</span>
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-soft">
            Every plan: read-only bank access, data stored in the EU, export
            everything at any time, cancel in two clicks.
          </p>
        </div>
      </section>

      {/* Final CTA at the Z-terminal */}
      <section className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              Close this month days earlier.
            </h2>
            <p className="mt-2 text-ink-soft">
              Connect a bank feed and watch the first hundred invoices match
              themselves. Free, no card.
            </p>
          </div>
          <Cta>Start free</Cta>
        </div>
      </section>

      {/* Footer with honest disclosure */}
      <footer className="border-t border-rule">
        <div className="mx-auto max-w-[1400px] px-6 py-10 text-sm text-ink-soft">
          <p>
            <span className="font-display font-semibold text-ink">
              Ledgerline
            </span>{" "}
            is a fictional product. A portfolio project by Rienk Rienks -{" "}
            <a
              href="https://github.com/baronsengir007/ledgerline"
              className="text-moss-deep underline underline-offset-4"
            >
              source and design notes on GitHub
            </a>
            . Built with Next.js and Tailwind CSS, statically exported.
          </p>
        </div>
      </footer>
    </main>
  );
}
