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
        "rounded-xl bg-white shadow-sm p-5 border border-gray-200",
        "hover:shadow-md transition-all duration-200",
        "flex flex-col gap-3",
        className
      )}
    >
      {/* Header with label and icon */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600 font-medium">{label}</span>
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
            <Icon className="w-5 h-5 text-indigo-600" />
          </div>
        )}
      </div>

      {/* Value */}
      <div className="flex items-end justify-between gap-2">
        <div className="text-2xl font-semibold text-gray-900">
          {formattedValue}
        </div>

        {/* Delta indicator */}
        {delta && (
          <div
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium",
              delta.direction === "up"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            )}
            title={delta.tooltip}
          >
            {delta.direction === "up" ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
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
