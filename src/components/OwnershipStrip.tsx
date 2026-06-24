"use client";
import {usePrefersReducedMotion} from "@/hooks/usePrefersReducedMotion";

const pillars = [
  {
    title: "Concierge",
    body: "Your personal assistant for every journey, 24/7.",
    icon: "✦",
    detail: "Available 24/7 via phone, chat, or in‑person.",
  },
  {
    title: "Maintenance",
    body: "5-year service plan included with every Veloura.",
    icon: "◆",
    detail: "Covers all scheduled servicing, parts, and labour.",
  },
  {
    title: "Track Experience",
    body: "Complimentary track day with your purchase.",
    icon: "◈",
    detail: "Professional instruction and full hospitality included.",
  },
];

function PillarCard({
  icon,
  title,
  body,
  detail,
}: {
  icon: string;
  title: string;
  body: string;
  detail: string;
}) {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <div
      className={`group relative bg-graphite rounded-2xl p-8 flex flex-col items-start justify-start overflow-hidden transition-all duration-500 ${
        prefersReduced
          ? ""
          : "hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/30"
      }`}
    >
      {/* Sliding overlay – color #f0f1f3 */}
      <div
        className={`absolute inset-0 z-0 rounded-2xl bg-[#f0f1f3] transform translate-y-full group-hover:translate-y-0 ${
          prefersReduced ? "" : "transition-transform duration-500 ease-out"
        }`}
      />

      {/* Content wrapper – above overlay */}
      <div className="relative z-10 flex flex-col items-start w-full">
        {/* Icon */}
        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors duration-500">
          <span className="text-gold text-base transition-transform duration-500 group-hover:scale-110">
            {icon}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-display text-silver mb-2 group-hover:text-gray-800 transition-colors duration-500">
          {title}
        </h3>

        {/* Body (always visible) */}
        <p className="text-sm text-platinum/70 leading-relaxed mb-4 group-hover:text-gray-600 transition-colors duration-500">
          {body}
        </p>

        {/* Detail text – fades in on hover */}
        <p
          className={`text-xs text-gold/70 leading-relaxed transition-all duration-500 group-hover:text-amber-800 ${
            prefersReduced ? "" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          {detail}
        </p>
      </div>
    </div>
  );
}

export default function OwnershipStrip() {
  return (
    <section className="py-20 px-8 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {pillars.map((p) => (
          <PillarCard
            key={p.title}
            icon={p.icon}
            title={p.title}
            body={p.body}
            detail={p.detail}
          />
        ))}
      </div>
    </section>
  );
}
