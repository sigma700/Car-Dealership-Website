"use client";
import {motion} from "framer-motion";
import Link from "next/link";

interface Model {
  name: string;
  tagline: string;
  slug: string;
  startingPrice: number;
  navImage: string;
}

export default function MegaMenu({
  models,
  onClose,
}: {
  models: Model[];
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{opacity: 0, y: -8, scaleY: 0.96}}
      animate={{opacity: 1, y: 0, scaleY: 1}}
      exit={{opacity: 0, y: -8, scaleY: 0.96}}
      transition={{duration: 0.25, ease: [0.16, 1, 0.3, 1]}}
      className="absolute top-full left-0 w-screen max-w-4xl bg-void border border-smoke shadow-2xl p-8 rounded-b-lg"
      onMouseLeave={onClose}
    >
      <div className="grid grid-cols-3 gap-6">
        {models.map((model) => (
          <Link
            key={model.slug}
            href={`/models/${model.slug}`}
            className="group block"
            onClick={onClose}
          >
            <div className="aspect-[4/3] overflow-hidden rounded bg-graphite mb-3">
              <img
                src={model.navImage}
                alt={model.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h4 className="text-md font-display text-silver">{model.name}</h4>
            <p className="text-xs text-platinum/60 mt-1">{model.tagline}</p>
            <span className="text-sm font-mono text-gold mt-2 block">
              From AED {model.startingPrice.toLocaleString()}
            </span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
