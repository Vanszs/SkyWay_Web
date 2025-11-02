"use client";

import { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPIStatProps {
  label: string;
  value: number | string;
  format?: "number" | "text";
  icon?: LucideIcon;
  delta?: {
    value: number;
    direction: "up" | "down";
    tooltip?: string;
  };
  className?: string;
}

export function KPIStat({
  label,
  value,
  format = "number",
  icon: Icon,
  delta,
  className,
}: KPIStatProps) {
  const formattedValue =
    typeof value === "number" && format === "number"
      ? value.toLocaleString()
      : value;

  return (
    <div
      role="status"
      aria-label={`KPI ${label}`}
      className={cn(
        "rounded-2xl bg-white shadow-lg p-6 border border-sky-gold/20",
        "hover:shadow-2xl hover:border-sky-gold/40 transition-all duration-300",
        "flex flex-col gap-3 group",
        className
      )}
    >
      {/* Header with label and icon */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-neutral-600 font-semibold">{label}</span>
        {Icon && (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-gold to-yellow-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-6 h-6 text-white" />
          </div>
        )}
      </div>

      {/* Value */}
      <div className="flex items-end justify-between gap-2">
        <div className="text-3xl font-bold text-sky-navy">
          {formattedValue}
        </div>

        {/* Delta indicator */}
        {delta && (
          <div
            className={cn(
              "flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold",
              delta.direction === "up"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            )}
            title={delta.tooltip}
          >
            {delta.direction === "up" ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            <span>{Math.abs(delta.value)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function KPIStatSkeleton() {
  return (
    <div className="rounded-xl bg-white shadow-sm p-5 border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
      <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
    </div>
  );
}
