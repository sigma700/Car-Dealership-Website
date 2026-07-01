// src/components/skeletons/IndivDetailsLoader.tsx
import Skeleton from "@/components/ui/Skeleton";

export function IndivDetailsLoader() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0e0e0e] transition-colors duration-300">
      {/* ── Sticky header ── */}
      <div className="sticky top-0 z-40 bg-white/90 dark:bg-[#0e0e0e]/90 backdrop-blur-md border-b border-[#BCBEC0]/12 dark:border-[#BCBEC0]/8">
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-5 w-32" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-8 rounded-full" />
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-14 py-10 md:py-14">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2">
          <Skeleton className="h-4 w-24" />
          <span className="text-[#BCBEC0]/30">/</span>
          <Skeleton className="h-4 w-20" />
          <span className="text-[#BCBEC0]/30">/</span>
          <Skeleton className="h-4 w-28" />
        </div>

        {/* Two‑column layout */}
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-start">
          {/* Left column – 65% */}
          <div className="w-full lg:w-[65%] min-w-0">
            {/* Gallery – main image + thumbnails */}
            <div className="relative w-full overflow-hidden rounded-xl bg-[#f5f5f5] dark:bg-[#141414] aspect-[16/10]">
              <Skeleton className="absolute inset-0 w-full h-full" />
              <div className="absolute top-4 left-4">
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <div className="absolute bottom-4 right-4">
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {Array.from({length: 4}).map((_, i) => (
                <Skeleton
                  key={i}
                  className="w-[72px] h-[48px] rounded-lg flex-shrink-0"
                />
              ))}
            </div>

            {/* Title & meta */}
            <div className="mt-8 mb-6 space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-3/4" />
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <Skeleton className="h-4 w-16" />
                <span className="text-[#BCBEC0]/30">·</span>
                <Skeleton className="h-4 w-20" />
                <span className="text-[#BCBEC0]/30">·</span>
                <Skeleton className="h-4 w-16" />
                <span className="text-[#BCBEC0]/30">·</span>
                <Skeleton className="h-4 w-24" />
              </div>
            </div>

            {/* Mobile price (hidden on desktop) */}
            <div className="lg:hidden mb-8 pb-8 border-b border-[#BCBEC0]/12 dark:border-[#BCBEC0]/8 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-40" />
              <div className="flex flex-wrap gap-x-5 gap-y-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>

            {/* Description */}
            <div className="mb-10 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-10/12" />
              <Skeleton className="h-4 w-9/12" />
            </div>

            {/* Mobile purchase card (hidden on desktop) */}
            <div className="lg:hidden mb-10">
              <div className="rounded-xl border border-[#BCBEC0]/18 dark:border-[#BCBEC0]/10 p-6 space-y-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-40" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-6 w-full" />
              </div>
            </div>

            {/* Specifications */}
            <div className="mb-10">
              <Skeleton className="h-4 w-32 mb-1" />
              <Skeleton className="h-6 w-48 mb-6" />
              <div className="rounded-xl border border-[#BCBEC0]/15 dark:border-[#BCBEC0]/10 overflow-hidden px-5">
                {Array.from({length: 12}).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-baseline justify-between py-3.5 border-b border-[#BCBEC0]/12 dark:border-[#BCBEC0]/8 last:border-0"
                  >
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mb-10">
              <Skeleton className="h-4 w-32 mb-1" />
              <Skeleton className="h-6 w-48 mb-6" />
              <div className="flex flex-wrap gap-2">
                {Array.from({length: 6}).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-24 rounded-full" />
                ))}
              </div>
            </div>

            {/* Prev / Next navigation */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#BCBEC0]/12 dark:border-[#BCBEC0]/8">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          {/* Right column – sticky purchase card (desktop only) */}
          <div className="hidden lg:block w-full lg:w-[35%] flex-shrink-0">
            <div className="sticky top-20 rounded-xl border border-[#BCBEC0]/18 dark:border-[#BCBEC0]/10 bg-white dark:bg-[#111] p-6 space-y-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-40" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-6 w-full" />
              <div className="pt-4 border-t border-[#BCBEC0]/12 dark:border-[#BCBEC0]/8 space-y-2">
                <Skeleton className="h-4 w-32" />
                {Array.from({length: 5}).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-40" />
                ))}
              </div>
              <div className="pt-4 border-t border-[#BCBEC0]/12 dark:border-[#BCBEC0]/8 flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Recommendations ── */}
        <section className="mt-20 pt-12 border-t border-[#BCBEC0]/12 dark:border-[#BCBEC0]/8">
          <div className="mb-8">
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({length: 4}).map((_, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border border-[#BCBEC0]/15 dark:border-[#BCBEC0]/10 bg-white dark:bg-[#111]"
              >
                <Skeleton className="aspect-[16/10] w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
