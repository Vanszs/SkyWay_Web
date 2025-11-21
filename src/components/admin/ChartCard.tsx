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
        "rounded-[2rem] bg-white p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]",
        className
      )}
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold tracking-tight text-neutral-900">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-0.5 text-sm text-neutral-500">{subtitle}</p>
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
