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

// Dynamic import for LiveMap
const LiveMapComponent = dynamic(
  () => import("@/components/ui/LiveMap").then((mod) => mod.LiveMap),
  {
    loading: () => (
      <div className="w-full h-[500px] bg-gray-100 rounded-xl animate-pulse flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
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
    // Hide main navigation on admin pages
    const nav = document.querySelector("nav");
    if (nav) nav.style.display = "none";
    return () => {
      if (nav) nav.style.display = "block";
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
    <div className="min-h-screen bg-[#F0F0F0]">
      {/* Modern Sidebar */}
      <ModernSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div
        className={`min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-72"
        }`}
      >
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Welcome back, Admin
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
                  Export Data
                </button>
                <Link href="/admin/new-order">
                  <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#E0A458] to-[#c98d42] text-white hover:shadow-lg transition-all text-sm font-medium">
                    + New Shipment
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="max-w-[1400px] mx-auto space-y-6">
            {/* KPI Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <KPIStat
                label="Active Drones"
                value={activeDrones}
                icon={Plane}
                delta={{ value: 12.5, direction: "up", tooltip: "Up from last week" }}
              />
              <KPIStat
                label="Total Shipments"
                value={totalShipments}
                icon={Package}
                delta={{ value: 8.3, direction: "up", tooltip: "Up from yesterday" }}
              />
              <KPIStat
                label="Delivered Today"
                value={deliveredToday}
                icon={CheckCircle}
                delta={{ value: 5.2, direction: "down", tooltip: "Down from yesterday" }}
              />
              <KPIStat
                label="Avg. Battery"
                value={`${avgBattery}%`}
                format="text"
                icon={Battery}
                delta={{ value: 3.1, direction: "up", tooltip: "Fleet health improving" }}
              />
            </div>

            {/* Live Map Section */}
            <ChartCard title="Live Fleet Map" subtitle="Real-time drone tracking">
              <div className="w-full h-[500px] rounded-lg overflow-hidden">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Fleet Status */}
              <ChartCard title="Fleet Status" subtitle="Current drone operations">
                <div className="space-y-3">
                  {drones.map((drone) => (
                    <div
                      key={drone.id}
                      className="p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              drone.status === "active"
                                ? "bg-green-500"
                                : drone.status === "idle"
                                ? "bg-blue-500"
                                : drone.status === "charging"
                                ? "bg-yellow-500"
                                : "bg-gray-500"
                            }`}
                          />
                          <div>
                            <p className="font-medium text-sm text-gray-900">
                              {drone.id}
                            </p>
                            <p className="text-xs text-gray-600">
                              {drone.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Battery
                            className={`w-4 h-4 ${
                              drone.battery > 70
                                ? "text-green-600"
                                : drone.battery > 30
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          />
                          <span className="text-sm font-medium text-gray-900">
                            {drone.battery}%
                          </span>
                        </div>
                      </div>
                      {drone.currentJob && (
                        <div className="mt-2 pt-2 border-t border-gray-100">
                          <p className="text-xs text-gray-600">
                            Current Job:{" "}
                            <span className="font-medium text-indigo-600">
                              {drone.currentJob}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ChartCard>

              {/* Recent Shipments */}
              <ChartCard title="Recent Shipments" subtitle="Latest delivery requests">
                <div className="space-y-3">
                  {shipments.slice(0, 4).map((shipment) => (
                    <div
                      key={shipment.id}
                      className="p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-sm text-gray-900">
                              {shipment.trackingNumber}
                            </p>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                shipment.status === "delivered"
                                  ? "bg-green-100 text-green-700"
                                  : shipment.status === "in_flight"
                                  ? "bg-blue-100 text-blue-700"
                                  : shipment.status === "pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {shipment.status}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">
                            {shipment.customerName}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium text-gray-900">
                            {shipment.estimatedTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 mt-2">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{shipment.destination}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="rounded-xl bg-white shadow-sm p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold text-gray-900">98.5%</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "98.5%" }}
                  ></div>
                </div>
              </div>

              <div className="rounded-xl bg-white shadow-sm p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg. Delivery Time</p>
                    <p className="text-2xl font-bold text-gray-900">18 min</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600">
                  <span className="text-green-600 font-medium">↓ 2 min</span>{" "}
                  faster than last week
                </p>
              </div>

              <div className="rounded-xl bg-white shadow-sm p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Fleet Utilization</p>
                    <p className="text-2xl font-bold text-gray-900">76%</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
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
