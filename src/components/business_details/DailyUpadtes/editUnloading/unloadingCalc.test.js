import {
  calcItem,
  calcSettlement,
  calcMeter,
  formatQty,
  fromCents,
} from "./unloadingCalc";

test("sold matches the screenshot rows", () => {
  // Dairy Fat Spread: loaded 1cs 13pcs, unloaded 1cs 6pcs -> 7 pcs
  const dairy = { price: 315, per_case: 24, loaded_pcs: 24 + 13 };
  expect(calcItem(dairy, { un_cs: 1, un_pcs: 6 }).sold).toBe(7);
  // FC 1L: loaded 1cs 6pcs, unloaded 2 pcs -> 1cs 4pcs
  const fc = { price: 472, per_case: 12, loaded_pcs: 12 + 6 };
  const r = calcItem(fc, { un_pcs: 2 });
  expect(formatQty(r.sold, 12)).toBe("1 cs 4 pcs");
  expect(r.valueCents).toBe(16 * 47200);
});

test("free issue is deducted and not charged", () => {
  const item = { price: 100, per_case: 10, loaded_pcs: 20 };
  const r = calcItem(item, { un_pcs: 5, free_pcs: 3 });
  expect(r.sold).toBe(12);
  expect(r.valueCents).toBe(12 * 10000);
});

test("over-unloading is flagged invalid with zero value", () => {
  const r = calcItem({ price: 10, per_case: 10, loaded_pcs: 5 }, { un_pcs: 9 });
  expect(r.valid).toBe(false);
  expect(r.valueCents).toBe(0);
});

test("short is exact to the cent", () => {
  const s = calcSettlement({ netSale: 13492.1, cashOnHand: 13250 });
  expect(fromCents(s.shortCents)).toBe(242.1);
});

test("meter distance", () => {
  expect(calcMeter("100", "145")).toBe(45);
  expect(calcMeter("", "145")).toBeNull();
});
