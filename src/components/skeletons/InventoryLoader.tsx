// components/skeletons/InventorySkeleton.tsx
import Skeleton from "@/components/ui/Skeleton";

export function InventorySkeleton() {
  return (
    <div className="bg-black">
      {/* Spacer for header */}
      <div className="h-[72px]" />

      {/* ── Page header skeleton ── */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-16 pt-16 pb-12">
        <div className="mb-10">
          <Skeleton className="h-4 w-32 mb-3" />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-5 w-48" />
          </div>
        </div>
      </section>

      {/* ── Brand showroom skeleton ── */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-16 pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {Array.from({length: 8}).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/4.2] rounded-xl bg-black/30 overflow-hidden flex flex-col items-center justify-end p-4"
            >
              <Skeleton className="absolute inset-0 w-full h-full" />
              <div className="relative z-10 flex flex-col items-center gap-1">
                <Skeleton className="h-6 w-8" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <div className="h-px bg-[#BCBEC0]/18" />
      </div>

      {/* ── Inventory grid skeleton ── */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-16 py-12">
        {/* Search bar */}
        <div className="mb-8 max-w-xl">
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>

        {/* Model selector (hidden if no brand selected, but we show placeholder) */}
        <div className="flex flex-wrap gap-2 justify-center py-5">
          {Array.from({length: 6}).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-full" />
          ))}
        </div>

        {/* Heading */}
        <div className="mb-5">
          <div className="flex items-baseline gap-3 flex-wrap">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-10 w-64 mt-1" />
        </div>

        {/* Filter bar */}
        <div className="border-t border-b border-[#BCBEC0]/15 py-4 space-y-4">
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <div className="flex flex-wrap gap-2">
              {Array.from({length: 4}).map((_, i) => (
                <Skeleton key={i} className="h-7 w-16 rounded-full" />
              ))}
              <Skeleton className="h-7 w-24 rounded-full" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-7 w-32 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Vehicle cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {Array.from({length: 6}).map((_, i) => (
            <div
              key={i}
              className="bg-[#0a0a0a] rounded-2xl overflow-hidden border border-[#BCBEC0]/9"
            >
              <Skeleton className="aspect-[16/10] w-full" />
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <div className="pt-3 border-t border-[#BCBEC0]/12">
                  <Skeleton className="h-6 w-24 mb-3" />
                  <div className="flex gap-2">
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-9 w-24" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FinanceCTA, TrustSection, Testimonials, CTABand – you can add them if you want, but they are below the inventory */}

      {/* For simplicity, we leave them out – they’ll appear after the skeleton is gone */}
    </div>
  );
}
