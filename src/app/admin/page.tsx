"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  Plane,
  Package,
  Users,
  Battery,
  TrendingUp,
  CheckCircle,
  Clock,
  MapPin,
  Gauge,
  Activity,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  MoreVertical,
} from "lucide-react";
import { ModernSidebar } from "@/components/admin/ModernSidebar";
import { KPIStat } from "@/components/admin/KPIStat";
import { ChartCard } from "@/components/admin/ChartCard";
import { cn } from "@/lib/utils";

// Dynamic import for LiveMap
const LiveMapComponent = dynamic(
  () => import("@/components/ui/LiveMap").then((mod) => mod.LiveMap),
  {
    loading: () => (
      <div className="w-full h-[500px] bg-white rounded-xl animate-pulse flex items-center justify-center border border-sky-gold/20">
        <p className="text-neutral-500">Loading map...</p>
      </div>
    ),
    ssr: false,
  }
);

// Sample data
const drones = [
  {
    id: "DRONE-001",
    status: "active" as const,
    battery: 85,
    location: "Surabaya Timur",
    currentJob: "PKG-12345",
  },
  {
    id: "DRONE-002",
    status: "idle" as const,
    battery: 100,
    location: "Surabaya Barat",
    currentJob: undefined,
  },
  {
    id: "DRONE-003",
    status: "charging" as const,
    battery: 45,
    location: "Hub Surabaya",
    currentJob: undefined,
  },
  {
    id: "DRONE-004",
    status: "active" as const,
    battery: 72,
    location: "Surabaya Selatan",
    currentJob: "PKG-12347",
  },
];

const shipments = [
  {
    id: "PKG-12345",
    trackingNumber: "TRK001",
    status: "in_flight" as const,
    origin: "Surabaya Mall",
    destination: "Jl. Raya Darmo 123",
    priority: "urgent" as const,
    droneId: "DRONE-001",
    customerName: "Ahmad Rizki",
    estimatedTime: "15 menit",
  },
  {
    id: "PKG-12346",
    trackingNumber: "TRK002",
    status: "pending" as const,
    origin: "Warehouse A",
    destination: "Jl. Pemuda 456",
    priority: "high" as const,
    droneId: undefined,
    customerName: "Siti Nurhaliza",
    estimatedTime: "30 menit",
  },
  {
    id: "PKG-12347",
    trackingNumber: "TRK003",
    status: "in_flight" as const,
    origin: "Distribution Center",
    destination: "Jl. Basuki Rahmat 789",
    priority: "medium" as const,
    droneId: "DRONE-004",
    customerName: "Budi Santoso",
    estimatedTime: "20 menit",
  },
  {
    id: "PKG-12348",
    trackingNumber: "TRK004",
    status: "delivered" as const,
    origin: "Surabaya Plaza",
    destination: "Jl. Ahmad Yani 101",
    priority: "low" as const,
    droneId: undefined,
    customerName: "Dewi Lestari",
    estimatedTime: "Delivered",
  },
];

export default function AdminDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDrone, setSelectedDrone] = useState<string | null>(null);

  useEffect(() => {
    // Hide main navigation and footer on admin pages
    const nav = document.querySelector("nav");
    const footer = document.querySelector("footer");

    if (nav) nav.style.display = "none";
    if (footer) footer.style.display = "none";

    return () => {
      if (nav) nav.style.display = "block";
      if (footer) footer.style.display = "block";
    };
  }, []);

  // KPI calculations
  const activeDrones = drones.filter((d) => d.status === "active").length;
  const totalShipments = shipments.length;
  const deliveredToday = shipments.filter((s) => s.status === "delivered").length;
  const avgBattery = Math.round(
    drones.reduce((acc, d) => acc + d.battery, 0) / drones.length
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F5F7]">
      {/* Modern Sidebar */}
      <ModernSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div
        className={cn(
          "flex-1 overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "ml-20" : "ml-72"
        )}
      >
        {/* Top Bar */}
        <div className="sticky top-0 z-40 border-b border-neutral-200/50 bg-white/70 backdrop-blur-xl">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
                  Dashboard
                </h1>
                <p className="mt-0.5 flex items-center gap-2 text-sm text-neutral-500">
                  Overview of your fleet and shipments
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition-all hover:bg-neutral-50">
                  Export Data
                </button>
                <Link href="/admin/new-order">
                  <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-blue-600/20 transition-all hover:bg-blue-700">
                    + New Shipment
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mx-auto max-w-[1600px] space-y-8">
            {/* KPI Stats */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <KPIStat
                label="Active Drones"
                value={activeDrones}
                icon={Plane}
                delta={{
                  value: 12.5,
                  direction: "up",
                  tooltip: "Up from last week",
                }}
              />
              <KPIStat
                label="Total Shipments"
                value={totalShipments}
                icon={Package}
                delta={{
                  value: 8.3,
                  direction: "up",
                  tooltip: "Up from yesterday",
                }}
              />
              <KPIStat
                label="Delivered Today"
                value={deliveredToday}
                icon={CheckCircle}
                delta={{
                  value: 5.2,
                  direction: "down",
                  tooltip: "Down from yesterday",
                }}
              />
              <KPIStat
                label="Avg. Battery"
                value={`${avgBattery}%`}
                format="text"
                icon={Battery}
                delta={{
                  value: 3.1,
                  direction: "up",
                  tooltip: "Fleet health improving",
                }}
              />
            </div>

            {/* Live Map Section */}
            <ChartCard
              title="Live Fleet Map"
              subtitle="Real-time drone tracking"
            >
              <div className="relative z-10 h-[500px] w-full overflow-hidden rounded-3xl bg-neutral-100">
                <LiveMapComponent
                  drones={drones.map((drone) => ({
                    id: drone.id,
                    name: drone.id,
                    position: {
                      lat: -7.2575 + Math.random() * 0.1,
                      lng: 112.7521 + Math.random() * 0.1,
                    },
                    altitude: 100,
                    speed: drone.status === "active" ? 45 : 0,
                    status: drone.status,
                    battery: drone.battery,
                    route: [],
                  }))}
                  center={[-7.2575, 112.7521]}
                  zoom={13}
                  selectedDrone={selectedDrone}
                  onDroneSelect={setSelectedDrone}
                />
              </div>
            </ChartCard>

            {/* Fleet Status & Recent Shipments */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Fleet Status */}
              <ChartCard
                title="Fleet Status"
                subtitle="Current drone operations"
              >
                <div className="space-y-3">
                  {drones.map((drone) => (
                    <div
                      key={drone.id}
                      className="rounded-2xl border border-neutral-100 bg-neutral-50/50 p-4 transition-all duration-200 hover:border-blue-100 hover:bg-blue-50/30"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-2.5 w-2.5 rounded-full ${drone.status === "active"
                              ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                              : drone.status === "idle"
                                ? "bg-blue-500"
                                : drone.status === "charging"
                                  ? "bg-yellow-500"
                                  : "bg-neutral-400"
                              }`}
                          />
                          <div>
                            <p className="text-sm font-semibold text-neutral-900">
                              {drone.id}
                            </p>
                            <p className="text-xs text-neutral-500">
                              {drone.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 shadow-sm">
                          <Battery
                            className={`h-4 w-4 ${drone.battery > 70
                              ? "text-green-600"
                              : drone.battery > 30
                                ? "text-yellow-600"
                                : "text-red-600"
                              }`}
                          />
                          <span className="text-xs font-semibold text-neutral-700">
                            {drone.battery}%
                          </span>
                        </div>
                      </div>
                      {drone.currentJob && (
                        <div className="flex items-center justify-between border-t border-neutral-100 pt-2">
                          <span className="text-xs text-neutral-500">
                            Current Job
                          </span>
                          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
                            {drone.currentJob}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ChartCard>

              {/* Recent Shipments */}
              <ChartCard
                title="Recent Shipments"
                subtitle="Latest delivery requests"
              >
                <div className="space-y-3">
                  {shipments.slice(0, 4).map((shipment) => (
                    <div
                      key={shipment.id}
                      className="rounded-2xl border border-neutral-100 bg-neutral-50/50 p-4 transition-all duration-200 hover:border-blue-100 hover:bg-blue-50/30"
                    >
                      <div className="mb-2 flex items-start justify-between">
                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <p className="text-sm font-semibold text-neutral-900">
                              {shipment.trackingNumber}
                            </p>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${shipment.status === "delivered"
                                ? "bg-green-100 text-green-700"
                                : shipment.status === "in_flight"
                                  ? "bg-blue-100 text-blue-700"
                                  : shipment.status === "pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-neutral-100 text-neutral-700"
                                }`}
                            >
                              {shipment.status.replace("_", " ")}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-500">
                            {shipment.customerName}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium text-neutral-900">
                            {shipment.estimatedTime}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-500">
                        <MapPin className="h-3.5 w-3.5 text-neutral-400" />
                        <span className="truncate">{shipment.destination}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="rounded-[2rem] bg-white p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500">
                      Success Rate
                    </p>
                    <p className="text-2xl font-semibold text-neutral-900">
                      98.5%
                    </p>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-neutral-100">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: "98.5%" }}
                  ></div>
                </div>
              </div>

              <div className="rounded-[2rem] bg-white p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500">
                      Avg. Delivery Time
                    </p>
                    <p className="text-2xl font-semibold text-neutral-900">
                      18 min
                    </p>
                  </div>
                </div>
                <p className="text-sm text-neutral-500">
                  <span className="font-medium text-green-600">↓ 2 min</span>{" "}
                  faster than last week
                </p>
              </div>

              <div className="rounded-[2rem] bg-white p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50">
                    <Activity className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500">
                      Fleet Utilization
                    </p>
                    <p className="text-2xl font-semibold text-neutral-900">
                      76%
                    </p>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-neutral-100">
                  <div
                    className="h-2 rounded-full bg-purple-500"
                    style={{ width: "76%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
