import type { Metadata } from "next";
import Link from "next/link";
import ReviewQueue from "./ReviewQueue";

export const metadata: Metadata = {
  title: "Review queue demo: Ledgerline",
  description:
    "A working demo of Ledgerline's review queue: approve, reject and undo exception matches with demo data, right in your browser.",
};

export default function Review() {
  return (
    <main>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight">
          Ledgerline
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-ink-soft hover:text-ink">
            Home
          </Link>
          <Link
            href="/#pricing"
            className="press inline-block rounded-md bg-moss-deep px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-moss"
          >
            Start free
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-24 pt-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-moss-deep">
          Product demo
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          The review queue, working
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
          Everything above 70% confidence would normally close itself; this
          queue holds what needs a human. Try it: approve, reject, undo.
          It runs entirely in your browser on demo data.
        </p>
        <div className="mt-10">
          <ReviewQueue />
        </div>
      </section>

      <footer className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-ink-soft">
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
            .
          </p>
        </div>
      </footer>
    </main>
  );
}
