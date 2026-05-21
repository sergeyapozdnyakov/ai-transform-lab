// Deterministic number formatting — same on server and client to avoid hydration mismatches.
// Uses a regular space as thousands separator (no locale dependence).
export function fmtNum(n: number, fractionDigits = 0): string {
  const fixed = fractionDigits > 0 ? n.toFixed(fractionDigits) : Math.round(n).toString();
  const [int, frac] = fixed.split(".");
  const withSep = int.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");
  return frac ? `${withSep}.${frac}` : withSep;
}

export function fmtRub(n: number): string {
  return `${fmtNum(n)} ₽`;
}
