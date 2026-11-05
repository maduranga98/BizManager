import React, { useMemo, useState } from "react";
import {
  calcItem,
  calcMeter,
  calcSettlement,
  formatQty,
  fromCents,
} from "./unloadingCalc";

/**
 * Large-screen "Edit unloading" workspace.
 *
 * props:
 *  routeName  string
 *  items      [{ id, name, price, per_case, loaded_pcs, un_cs?, un_pcs?, free_cs?, free_pcs? }]
 *  meter      { opening, closing }              (optional)
 *  money      { creditBills, creditReceived, cheques, expenses, cashOnHand } (optional)
 *  onSave     ({ meter, items, money, totals }) => Promise|void
 *  onClose    () => void
 */

const money = (cents) =>
  fromCents(cents).toLocaleString("en-LK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const field =
  "w-full rounded-md border border-buttons/20 bg-chars px-2 py-1.5 text-right text-sm tabular-nums text-black outline-none transition placeholder:text-buttons/30 focus:border-bag focus:ring-2 focus:ring-bag/20";

const Num = ({ value, onChange, label, step, placeholder = "0" }) => (
  <input
    type="number"
    min="0"
    step={step}
    inputMode="decimal"
    aria-label={label}
    placeholder={placeholder}
    value={value ?? ""}
    onChange={(e) => onChange(e.target.value)}
    className={field}
  />
);

const Row = ({ label, children, strong }) => (
  <div
    className={`flex items-center justify-between gap-4 py-2 ${
      strong ? "font-semibold text-black" : "text-buttons/80"
    }`}
  >
    <span className="text-sm">{label}</span>
    {children}
  </div>
);

const EditUnloading = ({
  routeName = "",
  items = [],
  meter: meterProp = {},
  money: moneyProp = {},
  onSave,
  onClose,
}) => {
  const [entries, setEntries] = useState(() =>
    Object.fromEntries(
      items.map((i) => [
        i.id,
        {
          un_cs: i.un_cs ?? "",
          un_pcs: i.un_pcs ?? "",
          free_cs: i.free_cs ?? "",
          free_pcs: i.free_pcs ?? "",
        },
      ])
    )
  );
  const [meter, setMeter] = useState({
    opening: meterProp.opening ?? "",
    closing: meterProp.closing ?? "",
  });
  const [cash, setCash] = useState({
    creditBills: moneyProp.creditBills ?? "",
    creditReceived: moneyProp.creditReceived ?? "",
    cheques: moneyProp.cheques ?? "",
    expenses: moneyProp.expenses ?? "",
    cashOnHand: moneyProp.cashOnHand ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const setEntry = (id, key, value) =>
    setEntries((prev) => ({ ...prev, [id]: { ...prev[id], [key]: value } }));

  const calc = useMemo(
    () => items.map((item) => calcItem(item, entries[item.id])),
    [items, entries]
  );

  const netSaleCents = calc.reduce((s, r) => s + r.valueCents, 0);
  const invalidCount = calc.filter((r) => !r.valid).length;
  const distance = calcMeter(meter.opening, meter.closing);

  const settlement = calcSettlement({
    netSale: fromCents(netSaleCents),
    ...cash,
  });
  const short = settlement.shortCents;

  const visible = items
    .map((item, i) => ({ item, r: calc[i] }))
    .filter(({ item }) =>
      item.name.toLowerCase().includes(query.trim().toLowerCase())
    );

  const handleSave = async () => {
    if (invalidCount) {
      setError("Fix items where unloaded + free issue exceeds loaded.");
      return;
    }
    setError("");
    setSaving(true);
    try {
      await onSave?.({
        meter: { ...meter, distance },
        items: items.map((item, i) => ({
          id: item.id,
          ...entries[item.id],
          sold: calc[i].sold,
          value: fromCents(calc[i].valueCents),
        })),
        money: cash,
        totals: {
          netSale: fromCents(netSaleCents),
          expectedCash: fromCents(settlement.expectedCents),
          short: fromCents(short),
        },
      });
    } catch (e) {
      console.error(e);
      setError("Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-stacks/10">
      <div className="mx-auto w-full max-w-[1920px] space-y-6 px-4 py-6 md:px-6 xl:px-10 2xl:px-14">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-black">
              Edit unloading
            </h1>
            {routeName && (
              <p className="text-sm text-buttons/60">{routeName}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {error && <span className="text-sm text-black">{error}</span>}
            {onClose && (
              <button
                onClick={onClose}
                className="rounded-lg border border-buttons/20 px-5 py-2.5 text-sm text-buttons transition hover:bg-stacks/30"
              >
                Close
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg bg-buttons px-6 py-2.5 text-sm font-medium text-chars transition hover:bg-bag disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="min-w-0 space-y-6 xl:col-span-8 2xl:col-span-9">
            {/* Vehicle meter */}
            <section className="rounded-xl border border-buttons/10 bg-chars p-5 shadow-sm">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-buttons/70">
                Vehicle meter
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  ["opening", "Opening"],
                  ["closing", "Closing"],
                ].map(([key, label]) => (
                  <label key={key} className="text-xs text-buttons/60">
                    {label}
                    <div className="mt-1">
                      <Num
                        value={meter[key]}
                        label={label}
                        placeholder="Meter reading"
                        onChange={(v) => setMeter((m) => ({ ...m, [key]: v }))}
                      />
                    </div>
                  </label>
                ))}
                <div className="text-xs text-buttons/60">
                  Distance
                  <div className="mt-1 rounded-md bg-stacks/30 px-3 py-1.5 text-right text-sm font-semibold tabular-nums text-black">
                    {distance === null ? "—" : `${distance} km`}
                  </div>
                </div>
              </div>
              {meter.opening === "" && (
                <p className="mt-3 text-xs text-black/70">
                  No opening meter saved with this loading, so distance can't be
                  calculated.
                </p>
              )}
            </section>

            {/* Items */}
            <section className="rounded-xl border border-buttons/10 bg-chars shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-buttons/10 px-5 py-3">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-buttons/70">
                  Items · {items.length}
                </h2>
                <input
                  type="search"
                  placeholder="Filter items…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-56 rounded-md border border-buttons/20 bg-chars px-3 py-1.5 text-sm outline-none focus:border-bag focus:ring-2 focus:ring-bag/20"
                />
              </div>
              <div className="max-h-[calc(100vh-24rem)] min-h-[20rem] overflow-auto">
                <table className="w-full border-separate border-spacing-0 text-sm">
                  <thead className="sticky top-0 z-10 bg-buttons text-xs uppercase tracking-wide text-chars">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Item</th>
                      <th className="px-4 py-3 text-right font-medium">
                        Price / pc
                      </th>
                      <th className="px-4 py-3 text-right font-medium">
                        Loaded
                      </th>
                      <th className="bg-bag px-2 py-3 text-center font-medium" colSpan={2}>
                        Unloaded (cs · pcs)
                      </th>
                      <th className="px-2 py-3 text-center font-medium" colSpan={2}>
                        Free issue (cs · pcs)
                      </th>
                      <th className="px-4 py-3 text-right font-medium">Sold</th>
                      <th className="px-4 py-3 text-right font-medium">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {visible.map(({ item, r }) => {
                      const e = entries[item.id];
                      const td = "border-b border-buttons/10";
                      return (
                        <tr key={item.id} className="hover:bg-stacks/20">
                          <td className={`${td} px-4 py-2 font-medium text-black`}>
                            {item.name}
                          </td>
                          <td className={`${td} px-4 py-2 text-right tabular-nums text-buttons/70`}>
                            {Number(item.price).toFixed(2)}
                          </td>
                          <td className={`${td} px-4 py-2 text-right tabular-nums text-buttons/70`}>
                            {formatQty(r.loaded, item.per_case)}
                          </td>
                          {["un_cs", "un_pcs", "free_cs", "free_pcs"].map((k) => (
                            <td key={k} className={`${td} w-24 px-1.5 py-2`}>
                              <Num
                                value={e[k]}
                                label={`${item.name} ${k}`}
                                onChange={(v) => setEntry(item.id, k, v)}
                              />
                            </td>
                          ))}
                          <td
                            className={`${td} px-4 py-2 text-right font-semibold tabular-nums ${
                              r.valid ? "text-black" : "text-black underline decoration-wavy"
                            }`}
                            title={r.valid ? "" : "Unloaded + free exceeds loaded"}
                          >
                            {r.valid ? formatQty(r.sold, item.per_case) : "Check"}
                          </td>
                          <td className={`${td} px-4 py-2 text-right tabular-nums`}>
                            {money(r.valueCents)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Settlement */}
          <aside className="xl:col-span-4 2xl:col-span-3">
            <div className="rounded-xl border border-buttons/10 bg-chars p-5 shadow-sm xl:sticky xl:top-6">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-buttons/70">
                Settlement
              </h2>
              <Row label="Net sale" strong>
                <span className="text-2xl tabular-nums text-bag">
                  {money(netSaleCents)}
                </span>
              </Row>
              <div className="divide-y divide-buttons/10 border-t border-buttons/10">
                {[
                  ["creditBills", "− Credit bills"],
                  ["creditReceived", "+ Credit received"],
                  ["cheques", "− Cheques"],
                ].map(([k, label]) => (
                  <Row key={k} label={label}>
                    <div className="w-36">
                      <Num
                        step="0.01"
                        value={cash[k]}
                        label={label}
                        onChange={(v) => setCash((c) => ({ ...c, [k]: v }))}
                      />
                    </div>
                  </Row>
                ))}
              </div>
              <Row label="Expected cash" strong>
                <span className="tabular-nums">
                  {money(settlement.expectedCents)}
                </span>
              </Row>
              <div className="divide-y divide-buttons/10 border-t border-buttons/10">
                {[
                  ["expenses", "Cash expenses"],
                  ["cashOnHand", "Cash on hand"],
                ].map(([k, label]) => (
                  <Row key={k} label={label}>
                    <div className="w-36">
                      <Num
                        step="0.01"
                        value={cash[k]}
                        label={label}
                        onChange={(v) => setCash((c) => ({ ...c, [k]: v }))}
                      />
                    </div>
                  </Row>
                ))}
              </div>
              <div
                className={`mt-4 rounded-lg px-4 py-3 ${
                  short === 0
                    ? "bg-stacks/40"
                    : short > 0
                    ? "bg-black text-chars"
                    : "bg-color1/40"
                }`}
              >
                <div className="text-xs uppercase tracking-wide opacity-70">
                  {short > 0 ? "Short" : short < 0 ? "Excess" : "Balanced"}
                </div>
                <div className="text-2xl font-semibold tabular-nums">
                  {money(Math.abs(short))}
                </div>
              </div>
              {invalidCount > 0 && (
                <p className="mt-3 text-xs text-black">
                  {invalidCount} item(s) have unloaded + free issue greater than
                  loaded.
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default EditUnloading;
