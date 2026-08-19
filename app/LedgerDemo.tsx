"use client";

import { useEffect, useState } from "react";

type Row = {
  invoice: string;
  client: string;
  amount: string;
  status: "open" | "matched" | "review";
};

const START: Row[] = [
  { invoice: "INV-2041", client: "Bakker & Zn", amount: "1,250.00", status: "open" },
  { invoice: "INV-2042", client: "Studio Nord", amount: "3,780.00", status: "open" },
  { invoice: "INV-2043", client: "Fairway Media", amount: "920.00", status: "open" },
  { invoice: "INV-2044", client: "Hollander Co", amount: "2,110.50", status: "open" },
  { invoice: "INV-2045", client: "Atlas Events", amount: "640.00", status: "open" },
];

const FEED = [
  { ref: "SEPA transfer · Bakker & Zn", amount: "1,250.00", hits: 0, kind: "matched" as const },
  { ref: "Stripe payout · Studio Nord", amount: "3,780.00", hits: 1, kind: "matched" as const },
  { ref: "Transfer · Hollander, no ref", amount: "1,055.25", hits: 3, kind: "review" as const },
  { ref: "SEPA transfer · Fairway Media", amount: "920.00", hits: 2, kind: "matched" as const },
  { ref: "iDEAL · Atlas Events", amount: "640.00", hits: 4, kind: "matched" as const },
];

export default function LedgerDemo() {
  const [rows, setRows] = useState<Row[]>(START);
  const [step, setStep] = useState(-1);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) {
      setRows(
        START.map((r, i) => ({
          ...r,
          status: i === 3 ? "review" : "matched",
        })),
      );
      return;
    }
    let i = 0;
    const tick = () => {
      if (i < FEED.length) {
        const f = FEED[i];
        setStep(i);
        setRows((prev) =>
          prev.map((r, idx) => (idx === f.hits ? { ...r, status: f.kind } : r)),
        );
        i += 1;
      } else {
        i = 0;
        setStep(-1);
        setRows(START);
      }
    };
    const id = setInterval(tick, 1700);
    return () => clearInterval(id);
  }, []);

  const feedItem = step >= 0 ? FEED[step] : null;

  return (
    <div className="rounded-lg border border-rule bg-card shadow-[0_1px_0_rgba(22,36,31,0.06),0_12px_32px_-16px_rgba(22,36,31,0.25)]">
      <div className="flex items-center justify-between border-b border-rule px-4 py-2.5">
        <span className="text-xs font-medium uppercase tracking-wider text-ink-soft">
          Open invoices · August
        </span>
        <span
          className="font-mono text-xs text-ink-soft"
          aria-live="polite"
        >
          {feedItem && !reduced ? `Bank feed: ${feedItem.ref}` : "Bank feed connected"}
        </span>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-rule text-left text-xs uppercase tracking-wider text-ink-soft">
            <th className="px-4 py-2 font-medium">Invoice</th>
            <th className="px-4 py-2 font-medium">Client</th>
            <th className="px-4 py-2 text-right font-medium">EUR</th>
            <th className="px-4 py-2 text-right font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="font-mono">
          {rows.map((r) => (
            <tr key={r.invoice} className="border-b border-rule/60 last:border-0">
              <td className={`px-4 py-2.5 ${r.status === "matched" ? "td-match" : ""}`}>{r.invoice}</td>
              <td className={`px-4 py-2.5 font-sans ${r.status === "matched" ? "td-match" : ""}`}>{r.client}</td>
              <td className={`px-4 py-2.5 text-right ${r.status === "matched" ? "td-match" : ""}`}>{r.amount}</td>
              <td className={`px-4 py-2.5 text-right ${r.status === "matched" ? "td-match" : ""}`}>
                {r.status === "open" && <span className="text-ink-soft">open</span>}
                {r.status === "matched" && (
                  <span className="font-medium text-moss-deep">✓ matched</span>
                )}
                {r.status === "review" && (
                  <span className="font-medium text-flag">→ review</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-t border-rule px-4 py-2.5 text-xs text-ink-soft">
        Partial payment on INV-2044 lands in your review queue with a
        confidence score. Everything else closes itself.
      </div>
    </div>
  );
}
