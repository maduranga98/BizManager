// All Edit-unloading maths lives here so every screen shows the same numbers.
// Money is handled in integer cents to avoid floating point drift.

export const toCents = (value) => Math.round((Number(value) || 0) * 100);
export const fromCents = (cents) => cents / 100;

const num = (v) => Math.max(0, Number(v) || 0);

/** cases + pieces -> total pieces */
export const toPieces = (cases, pieces, perCase) =>
  num(cases) * num(perCase) + num(pieces);

/** total pieces -> { cs, pcs } using perCase (perCase <= 1 keeps everything in pcs) */
export const splitPieces = (total, perCase) => {
  const pc = num(perCase);
  if (pc <= 1) return { cs: 0, pcs: total };
  const sign = total < 0 ? -1 : 1;
  const abs = Math.abs(total);
  return { cs: sign * Math.floor(abs / pc), pcs: sign * (abs % pc) };
};

export const formatQty = (total, perCase) => {
  const { cs, pcs } = splitPieces(total, perCase);
  if (cs && pcs) return `${cs} cs ${pcs} pcs`;
  if (cs) return `${cs} cs`;
  return `${pcs} pcs`;
};

/**
 * item: { price, per_case, loaded_pcs }          (loaded_pcs = total pieces)
 * entry: { un_cs, un_pcs, free_cs, free_pcs }
 * sold = loaded - unloaded - free issue (free issue is not charged)
 */
export const calcItem = (item, entry = {}) => {
  const perCase = item.per_case;
  const loaded = num(item.loaded_pcs);
  const unloaded = toPieces(entry.un_cs, entry.un_pcs, perCase);
  const free = toPieces(entry.free_cs, entry.free_pcs, perCase);
  const sold = loaded - unloaded - free;
  return {
    loaded,
    unloaded,
    free,
    sold,
    valid: sold >= 0,
    valueCents: sold > 0 ? sold * toCents(item.price) : 0,
  };
};

export const calcMeter = (opening, closing) => {
  const o = Number(opening);
  const c = Number(closing);
  if (opening === "" || closing === "" || Number.isNaN(o) || Number.isNaN(c))
    return null;
  return c >= o ? c - o : null;
};

/**
 * Settlement.
 *   expected cash = net sale - credit bills + credit received - cheques
 *   short         = expected cash - (cash on hand + cash expenses)
 * (positive short = money missing, negative = surplus)
 */
export const calcSettlement = ({
  netSale = 0,
  creditBills = 0,
  creditReceived = 0,
  cheques = 0,
  expenses = 0,
  cashOnHand = 0,
}) => {
  const expectedCents =
    toCents(netSale) -
    toCents(creditBills) +
    toCents(creditReceived) -
    toCents(cheques);
  const accountedCents = toCents(cashOnHand) + toCents(expenses);
  return {
    expectedCents,
    accountedCents,
    shortCents: expectedCents - accountedCents,
  };
};
