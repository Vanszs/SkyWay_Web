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
        "flex h-full flex-col justify-between rounded-[2rem] bg-white p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 ease-out hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      {/* Header with label and icon */}
      <div className="mb-4 flex items-start justify-between">
        <span className="text-[13px] font-medium uppercase tracking-wide text-neutral-500">
          {label}
        </span>
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
            <Icon className="h-5 w-5 text-blue-600" />
          </div>
        )}
      </div>

      {/* Value */}
      <div>
        <div className="mb-2 text-3xl font-semibold tracking-tight text-neutral-900">
          {formattedValue}
        </div>

        {/* Delta indicator */}
        {delta && (
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                delta.direction === "up"
                  ? "bg-green-100/50 text-green-700"
                  : "bg-red-100/50 text-red-700"
              )}
              title={delta.tooltip}
            >
              {delta.direction === "up" ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>{Math.abs(delta.value)}%</span>
            </div>
            <span className="text-[11px] font-medium text-neutral-400">
              vs last period
            </span>
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
