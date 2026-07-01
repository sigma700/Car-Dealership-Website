import React from "react";

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({className = ""}: SkeletonProps) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-md
        bg-neutral-200 dark:bg-neutral-800
        ${className}
      `}
    >
      <div
        className="
          absolute inset-0
          animate-skeleton
          bg-gradient-to-r
          from-transparent
          via-white/25
          to-transparent
        "
      />
    </div>
  );
}
