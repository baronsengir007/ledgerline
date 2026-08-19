"use client";

import { useEffect, useMemo, useState } from "react";

type Exception = {
  id: string;
  invoice: string;
  client: string;
  invoiced: number;
  received: number;
  reason: string;
  confidence: number;
  status: "open" | "approved" | "rejected";
};

const SEED: Exception[] = [
  { id: "e1", invoice: "INV-2044", client: "Hollander Co", invoiced: 2110.5, received: 1055.25, reason: "partial payment, no reference", confidence: 62, status: "open" },
  { id: "e2", invoice: "INV-2038", client: "Studio Nord", invoiced: 3780, received: 3780, reason: "name mismatch: 'Studio Noord BV'", confidence: 88, status: "open" },
  { id: "e3", invoice: "INV-2029", client: "Atlas Events", invoiced: 640, received: 645, reason: "overpayment €5.00", confidence: 81, status: "open" },
  { id: "e4", invoice: "INV-2031", client: "Fairway Media", invoiced: 920, received: 920, reason: "paid from unknown IBAN", confidence: 74, status: "open" },
  { id: "e5", invoice: "INV-2027", client: "Bakker & Zn", invoiced: 1250, received: 1190, reason: "€60 short, possible bank fee", confidence: 57, status: "open" },
  { id: "e6", invoice: "INV-2022", client: "Peildatum BV", invoiced: 4400, received: 2200, reason: "50% instalment, no agreement on file", confidence: 41, status: "open" },
  { id: "e7", invoice: "INV-2019", client: "Studio Nord", invoiced: 1600, received: 1600, reason: "reference points to closed invoice", confidence: 69, status: "open" },
  { id: "e8", invoice: "INV-2016", client: "Atlas Events", invoiced: 980, received: 980, reason: "duplicate transfer, second ignored?", confidence: 52, status: "open" },
];

const STORAGE_KEY = "ledgerline-review-demo-v1";
const eur = (n: number) =>
  n.toLocaleString("en-IE", { style: "currency", currency: "EUR" });

export default function ReviewQueue() {
  const [items, setItems] = useState<Exception[]>(SEED);
  const [filter, setFilter] = useState<"all" | "high" | "low">("all");
  const [lastAction, setLastAction] = useState<{ id: string; prev: "open" } | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch {}
    }
  }, [items, loaded]);

  const open = items.filter((i) => i.status === "open");
  const shown = useMemo(() => {
    if (filter === "high") return open.filter((i) => i.confidence >= 70);
    if (filter === "low") return open.filter((i) => i.confidence < 70);
    return open;
  }, [open, filter]);

  const act = (id: string, status: "approved" | "rejected") => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    setLastAction({ id, prev: "open" });
  };

  const undo = () => {
    if (!lastAction) return;
    setItems((prev) =>
      prev.map((i) => (i.id === lastAction.id ? { ...i, status: "open" } : i)),
    );
    setLastAction(null);
  };

  const reset = () => {
    setItems(SEED);
    setLastAction(null);
  };

  const done = items.length - open.length;

  return (
    <div className="rounded-lg border border-rule bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-5 py-3">
        <div className="flex gap-1" role="tablist" aria-label="Filter exceptions">
          {(
            [
              ["all", `All (${open.length})`],
              ["high", "Confidence ≥ 70"],
              ["low", "Below 70"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              role="tab"
              aria-selected={filter === key}
              onClick={() => setFilter(key)}
              className={`rounded px-3 py-1.5 text-sm ${
                filter === key
                  ? "bg-moss-deep text-paper"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="font-mono text-ink-soft" aria-live="polite">
            {done} of {items.length} cleared
          </span>
          {lastAction && (
            <button
              onClick={undo}
              className="rounded border border-rule px-3 py-1.5 hover:border-moss-deep"
            >
              Undo
            </button>
          )}
          {done > 0 && (
            <button
              onClick={reset}
              className="rounded border border-rule px-3 py-1.5 text-ink-soft hover:text-ink"
            >
              Reset demo
            </button>
          )}
        </div>
      </div>

      {shown.length === 0 ? (
        <div className="px-5 py-16 text-center text-ink-soft">
          {open.length === 0
            ? "Queue cleared. Your books are days ahead of schedule."
            : "Nothing in this filter. Try another tab."}
        </div>
      ) : (
        <ul className="divide-y divide-rule/60">
          {shown.map((e) => (
            <li key={e.id} className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-mono text-sm">{e.invoice}</span>
                  <span className="font-medium">{e.client}</span>
                  <span className="font-mono text-sm text-ink-soft">
                    {eur(e.invoiced)} invoiced · {eur(e.received)} received
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-3 text-sm text-ink-soft">
                  <span
                    className={`inline-block rounded px-1.5 font-mono text-xs ${
                      e.confidence >= 70 ? "bg-mark/60" : "border border-rule"
                    }`}
                  >
                    {e.confidence}% match
                  </span>
                  {e.reason}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => act(e.id, "approved")}
                  className="rounded bg-moss-deep px-3 py-1.5 text-sm font-medium text-paper hover:bg-moss"
                >
                  Approve match
                </button>
                <button
                  onClick={() => act(e.id, "rejected")}
                  className="rounded border border-rule px-3 py-1.5 text-sm text-ink-soft hover:border-flag hover:text-flag"
                >
                  Not a match
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="border-t border-rule px-5 py-3 text-xs text-ink-soft">
        Demo data only. Your choices persist in this browser (localStorage)
        and nowhere else; Reset brings the queue back.
      </div>
    </div>
  );
}
