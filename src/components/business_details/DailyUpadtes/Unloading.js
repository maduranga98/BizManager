import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getDailyLoading, sendDailyUnloading } from "../../../server_data/api";
import CashTable from "./components/CashTable";
import CreditTable from "./components/CreditTable";
import CreditReceived from "./components/CreditReceived";
import ChequeDetail from "./components/ChequeDetail";
import Expences from "./components/Expences";
import ReturnDetails from "./components/ReturnDetails";
import Salary from "./components/Salary";
import CurrentDate from "../../../Modal/CurrentDate";
import WeatherSelector from "../../../Modal/WeatherSelector";

const EMPTY_INPUT = {
  add_cases: 0,
  add_pieces: 0,
  add_free_cases: 0,
  add_free_pieces: 0,
};

const INPUT_COLUMNS = [
  { key: "add_cases", label: "Cases" },
  { key: "add_pieces", label: "Pieces" },
  { key: "add_free_cases", label: "Free cases" },
  { key: "add_free_pieces", label: "Free pcs" },
];

const getToday = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
};

// Card shell; also makes child tables fill the card and hides their own captions.
const Card = ({ title, children, className = "" }) => (
  <section
    className={`flex min-w-0 flex-col rounded-xl border border-buttons/10 bg-chars shadow-sm ${className}`}
  >
    {title && (
      <h2 className="border-b border-buttons/10 px-5 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-buttons/70">
        {title}
      </h2>
    )}
    <div className="min-w-0 flex-1 overflow-x-auto p-5 [&_table]:!w-full [&_table]:!border-buttons/10 [&_caption]:hidden [&_th]:!border-buttons/10 [&_td]:!border-buttons/10">
      {children}
    </div>
  </section>
);

const Unloading = ({ business_id, routeName }) => {
  const [rows, setRows] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const [selectedWeather, setSelectedWeather] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null); // { type: "ok" | "error", text }

  useEffect(() => {
    if (!business_id) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const response = await getDailyLoading(business_id);
        if (cancelled || !Array.isArray(response)) return;

        setRows(
          response.map((e) => ({
            batch_number: e.batch_number,
            item_name: e.item_name,
            cases: e.cases,
            pieces: e.pieces,
            unit_price: e.unit_price,
            free_case: e.free_case,
            free_pieces: e.free_pieces,
            number_of_items_per_case: e.number_of_items_per_case,
            date: e.date,
          }))
        );
        setInputValues(response.map(() => ({ ...EMPTY_INPUT })));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [business_id]);

  const handleInputChange = useCallback((index, field, value) => {
    setInputValues((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: Number(value) || 0 } : item
      )
    );
  }, []);

  const totals = useMemo(
    () =>
      inputValues.reduce(
        (acc, v) => ({
          cases: acc.cases + v.add_cases,
          pieces: acc.pieces + v.add_pieces,
          freeCases: acc.freeCases + v.add_free_cases,
          freePieces: acc.freePieces + v.add_free_pieces,
        }),
        { cases: 0, pieces: 0, freeCases: 0, freePieces: 0 }
      ),
    [inputValues]
  );

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);
    const date = getToday();

    try {
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const input = inputValues[i];
        await sendDailyUnloading(
          business_id,
          row.batch_number,
          row.item_name,
          input.add_cases,
          input.add_pieces,
          row.unit_price,
          row.total_price,
          input.add_free_cases,
          input.add_free_pieces,
          date,
          selectedWeather || "Sunny"
        );
      }
      setStatus({ type: "ok", text: "Unloading saved" });
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", text: "Save failed. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  const numberInput =
    "w-full min-w-[3.5rem] rounded-md border border-buttons/20 bg-chars px-2 py-1.5 text-right text-sm tabular-nums text-black outline-none transition focus:border-bag focus:ring-2 focus:ring-bag/20";

  return (
    <div className="min-h-screen bg-stacks/10">
      <div className="mx-auto w-full max-w-[1920px] space-y-6 px-4 py-6 md:px-6 xl:px-10 2xl:px-14">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-buttons/10 bg-chars px-5 py-3 shadow-sm">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <h1 className="font-serif text-xl font-bold text-black">
              Unloading
            </h1>
            <div className="[&>div]:!m-0">
              <CurrentDate />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="[&>div]:!m-0">
              <WeatherSelector onWeatherChange={setSelectedWeather} />
            </div>
            {status && (
              <span
                role="status"
                className={`text-sm ${
                  status.type === "ok" ? "text-bag" : "text-black font-semibold"
                }`}
              >
                {status.text}
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={saving || rows.length === 0}
              className="rounded-lg bg-buttons px-6 py-2.5 text-sm font-medium text-chars transition hover:bg-bag disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save unloading"}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* Stock reconciliation */}
          <section className="flex min-w-0 flex-col rounded-xl border border-buttons/10 bg-chars shadow-sm xl:col-span-8 2xl:col-span-9">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-buttons/10 px-5 py-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-buttons/70">
                Stock returned
              </h2>
              <div className="flex gap-2 text-xs text-buttons/70">
                {[
                  ["Cases", totals.cases],
                  ["Pieces", totals.pieces],
                  ["Free cases", totals.freeCases],
                  ["Free pcs", totals.freePieces],
                ].map(([label, value]) => (
                  <span
                    key={label}
                    className="rounded-full bg-stacks/40 px-3 py-1 tabular-nums"
                  >
                    {label}: <b className="text-black">{value}</b>
                  </span>
                ))}
              </div>
            </div>

            {loading ? (
              <p className="p-10 text-center text-sm text-buttons/60">
                Loading…
              </p>
            ) : rows.length === 0 ? (
              <p className="p-10 text-center text-sm text-buttons/60">
                No loading data found for today.
              </p>
            ) : (
              <div className="max-h-[calc(100vh-16rem)] min-h-[24rem] overflow-auto">
                <table className="w-full border-separate border-spacing-0 text-sm">
                  <thead className="sticky top-0 z-10 bg-buttons text-chars">
                    <tr className="text-xs uppercase tracking-wide">
                      <th className="px-4 py-3 text-left font-medium">Batch</th>
                      <th className="px-4 py-3 text-left font-medium">Item</th>
                      <th className="px-4 py-3 text-right font-medium">Cases</th>
                      <th className="px-4 py-3 text-right font-medium">
                        Pieces
                      </th>
                      <th className="px-4 py-3 text-right font-medium">
                        Unit price
                      </th>
                      <th className="px-4 py-3 text-right font-medium">
                        Free cases
                      </th>
                      <th className="px-4 py-3 text-right font-medium">
                        Free pcs
                      </th>
                      {INPUT_COLUMNS.map((c) => (
                        <th
                          key={c.key}
                          className="bg-bag px-4 py-3 text-right font-medium"
                        >
                          + {c.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr
                        key={`${row.batch_number}-${index}`}
                        className="transition hover:bg-stacks/20"
                      >
                        <td className="border-b border-buttons/10 px-4 py-2 tabular-nums">
                          {row.batch_number}
                        </td>
                        <td className="border-b border-buttons/10 px-4 py-2 font-medium text-black">
                          {row.item_name}
                        </td>
                        {[
                          row.cases,
                          row.pieces,
                          row.unit_price,
                          row.free_case,
                          row.free_pieces,
                        ].map((v, i) => (
                          <td
                            key={i}
                            className="border-b border-buttons/10 px-4 py-2 text-right tabular-nums text-buttons/80"
                          >
                            {v}
                          </td>
                        ))}
                        {INPUT_COLUMNS.map((c) => (
                          <td
                            key={c.key}
                            className="border-b border-buttons/10 px-2 py-2"
                          >
                            <input
                              type="number"
                              min="0"
                              aria-label={`${row.item_name} ${c.label}`}
                              value={inputValues[index]?.[c.key] ?? 0}
                              onChange={(e) =>
                                handleInputChange(index, c.key, e.target.value)
                              }
                              className={numberInput}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Side column: returns + cash */}
          <div className="flex min-w-0 flex-col gap-6 xl:col-span-4 2xl:col-span-3">
            <Card title="Returns">
              <ReturnDetails />
            </Card>
            <Card title="Cash" className="flex-1">
              <CashTable />
            </Card>
          </div>

          {/* Money in */}
          <Card title="Credit bills" className="xl:col-span-4">
            <CreditTable routeName={routeName} />
          </Card>
          <Card title="Credit received" className="xl:col-span-4">
            <CreditReceived />
          </Card>
          <Card title="Salaries" className="xl:col-span-4">
            <Salary id={business_id} />
          </Card>

          {/* Cheques + expenses */}
          <Card title="Cheques" className="xl:col-span-8">
            <ChequeDetail id={business_id} routeName={routeName} />
          </Card>
          <Card title="Expenses" className="xl:col-span-4">
            <Expences id={business_id} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Unloading;
