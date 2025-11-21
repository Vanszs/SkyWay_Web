"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Map,
  Settings,
  Users,
  BarChart3,
  Plane,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Fleet Management", url: "/admin/fleet", icon: Plane },
  { title: "Live Map", url: "/admin/map", icon: Map },
  { title: "Shipments", url: "/admin/shipments", icon: Package },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

interface ModernSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function ModernSidebar({
  isCollapsed = false,
  onToggle,
}: ModernSidebarProps) {
  const currentPath = usePathname() || "/";
  const isActive = (path: string) => currentPath === path;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 h-screen flex flex-col border-r border-white/5 bg-[#1c1c1e] text-white transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      {/* Header */}
      <div className="flex h-20 items-center justify-between border-b border-white/5 px-6">
        {!isCollapsed ? (
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8">
              <Image
                src="/logo.png"
                alt="SkyWay Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-tight text-white">
                SkyWay
              </h1>
              <p className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">
                Admin
              </p>
            </div>
          </div>
        ) : (
          <div className="relative mx-auto h-8 w-8">
            <Image
              src="/logo.png"
              alt="SkyWay Logo"
              fill
              className="object-contain"
            />
          </div>
        )}
        <button
          onClick={onToggle}
          className="rounded-md p-1.5 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.url);

            return (
              <li key={item.url}>
                <Link
                  href={item.url}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200",
                    active
                      ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                      : "text-neutral-400 hover:bg-white/5 hover:text-white",
                    isCollapsed ? "justify-center px-2" : ""
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 flex-shrink-0 transition-colors",
                      active
                        ? "text-white"
                        : "text-neutral-400 group-hover:text-white"
                    )}
                  />
                  {!isCollapsed && (
                    <span
                      className={cn(
                        "text-[13px] font-medium tracking-wide",
                        active ? "text-white" : ""
                      )}
                    >
                      {item.title}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
