// lib/inventoryFilters.ts
// ─── Shared filter utilities ─────────────────────────────────────────────────
// Both ModelsPreviewSection and the Inventory page import from here so that
// filter semantics, budget bands and URL serialisation are never duplicated

export const BUDGET_BANDS = [
  {label: "Under KSh 3M", min: 0, max: 3_000_000},
  {label: "KSh 3M – 6M", min: 3_000_000, max: 6_000_000},
  {label: "KSh 6M – 12M", min: 6_000_000, max: 12_000_000},
  {label: "KSh 12M – 20M", min: 12_000_000, max: 20_000_000},
  {label: "Above KSh 20M", min: 20_000_000, max: 999_999_999},
] as const;

export type BudgetBand = (typeof BUDGET_BANDS)[number];

export interface PreviewFilters {
  make: string;
  model: string;
  bodyType: string;
  budget: string; // label string from BUDGET_BANDS
}

/** Serialise preview-section filters into URLSearchParams. */
export function filtersToParams(f: PreviewFilters): URLSearchParams {
  const p = new URLSearchParams();
  if (f.make) p.set("make", f.make);
  if (f.model) p.set("model", f.model);
  if (f.bodyType) p.set("bodyType", f.bodyType);
  const band = BUDGET_BANDS.find((b) => b.label === f.budget);
  if (band) {
    p.set("minPrice", String(band.min));
    if (band.max < 999_999_999) p.set("maxPrice", String(band.max));
  }
  return p;
}

/** Deserialise URLSearchParams back into the inventory-page filter shape. */
export function paramsToInventoryState(params: URLSearchParams): {
  brand: string | null;
  model: string | null;
  filters: Record<string, string>;
} {
  const brand = params.get("make") || null;
  const model = params.get("model") || null;
  const bodyType = params.get("bodyType") || "";
  const minPrice = params.get("minPrice") || "";
  const maxPrice = params.get("maxPrice") || "";

  const filters: Record<string, string> = {};
  if (bodyType) filters.bodyType = bodyType;
  if (minPrice) filters.minPrice = minPrice;
  if (maxPrice) filters.maxPrice = maxPrice;

  return {brand, model, filters};
}

/** Returns true when any filter is meaningfully set. */
export function hasActiveFilters(f: PreviewFilters): boolean {
  return !!(f.make || f.model || f.bodyType || f.budget);
}
