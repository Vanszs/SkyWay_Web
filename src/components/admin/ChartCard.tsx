"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function ChartCard({
  title,
  subtitle,
  children,
  className,
}: ChartCardProps) {
  return (
    <div
      role="group"
      aria-label={`Chart ${title}`}
      className={cn(
        "rounded-2xl bg-white shadow-lg p-6 border border-sky-gold/20 relative z-10",
        "hover:shadow-2xl hover:border-sky-gold/40 transition-all duration-300",
        className
      )}
    >
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-neutral-200">
        <h3 className="text-xl font-bold text-sky-navy">{title}</h3>
        {subtitle && (
          <p className="text-sm text-neutral-600 mt-1">{subtitle}</p>
        )}
      </div>

      {/* Chart Content */}
      <div className="w-full">{children}</div>
    </div>
  );
}

export function ChartCardSkeleton() {
  return (
    <div className="rounded-xl bg-white shadow-sm p-5 border border-gray-200">
      <div className="mb-4">
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="w-full h-64 bg-gray-200 rounded animate-pulse"></div>
    </div>
  );
}
