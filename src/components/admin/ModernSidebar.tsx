"use client";

import { useState } from "react";
import Link from "next/link";
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
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Fleet Management",
    url: "/admin/fleet",
    icon: Plane,
  },
  {
    title: "Live Map",
    url: "/admin/map",
    icon: Map,
  },
  {
    title: "Shipments",
    url: "/admin/shipments",
    icon: Package,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Analytics",
    url: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
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
        "fixed left-0 top-0 h-screen bg-gradient-to-b from-sky-navy via-sky-blue to-sky-navy text-white",
        "transition-all duration-300 ease-in-out",
        "flex flex-col border-r border-sky-gold/20 z-50 shadow-2xl",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-white/10">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="SkyWay Logo" 
              className="h-10 w-auto object-contain"
            />
            <div>
              <h1 className="text-lg font-bold text-white">SkyWay</h1>
              <p className="text-xs text-sky-gold">Admin Panel</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <img 
            src="/logo.png" 
            alt="SkyWay Logo" 
            className="h-8 w-auto object-contain mx-auto"
          />
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.url);

            return (
              <li key={item.url}>
                  <Link
                  href={item.url}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200",
                    "hover:bg-white/10 hover:translate-x-1",
                    active &&
                      "bg-gradient-to-r from-sky-gold to-yellow-500 shadow-lg shadow-sky-gold/30 text-white",
                    !active && "text-neutral-300",
                    isCollapsed ? "justify-center" : ""
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">{item.title}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        {!isCollapsed ? (
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-gold to-yellow-500 flex items-center justify-center shadow-lg">
              <span className="text-sm font-bold text-white">AD</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Admin</p>
              <p className="text-xs text-sky-gold">admin@skyway.id</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-gold to-yellow-500 flex items-center justify-center shadow-lg">
              <span className="text-sm font-bold text-white">AD</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
