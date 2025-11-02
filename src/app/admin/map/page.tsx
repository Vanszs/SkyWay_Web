"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  Plane,
  Battery,
  MapPin,
  Activity,
  Maximize2,
  Minimize2,
  Layers,
  Navigation,
} from "lucide-react";
import { ModernSidebar } from "@/components/admin/ModernSidebar";
import { KPIStat } from "@/components/admin/KPIStat";

// Dynamic import for LiveMap
const LiveMapComponent = dynamic(
  () => import("@/components/ui/LiveMap").then((mod) => mod.LiveMap),
  {
    loading: () => (
      <div className="w-full h-full bg-gray-100 rounded-xl animate-pulse flex items-center justify-center">
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
    name: "SkyWay Alpha",
    status: "active" as const,
    battery: 85,
    location: "Surabaya Timur",
    currentJob: "PKG-12345",
    position: { lat: -7.2575, lng: 112.7521 },
  },
  {
    id: "DRONE-002",
    name: "SkyWay Beta",
    status: "idle" as const,
    battery: 100,
    location: "Surabaya Barat",
    position: { lat: -7.2675, lng: 112.7421 },
  },
  {
    id: "DRONE-003",
    name: "SkyWay Gamma",
    status: "charging" as const,
    battery: 45,
    location: "Hub Surabaya",
    position: { lat: -7.2775, lng: 112.7621 },
  },
  {
    id: "DRONE-004",
    name: "SkyWay Delta",
    status: "active" as const,
    battery: 72,
    location: "Surabaya Selatan",
    currentJob: "PKG-12347",
    position: { lat: -7.2475, lng: 112.7721 },
  },
];

export default function LiveMapPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedDrone, setSelectedDrone] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapLayers, setMapLayers] = useState({
    drones: true,
    routes: true,
    noFlyZones: true,
    buildings: true,
  });

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
  const avgBattery = Math.round(
    drones.reduce((acc, d) => acc + d.battery, 0) / drones.length
  );

  const selectedDroneData = selectedDrone
    ? drones.find((d) => d.id === selectedDrone)
    : null;

  return (
    <div className="min-h-screen bg-[#F0F0F0]">
      {/* Modern Sidebar */}
      {!isFullscreen && (
        <ModernSidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      )}

      {/* Main Content */}
      <div
        className={`min-h-screen transition-all duration-300 ${
          isFullscreen
            ? ""
            : sidebarCollapsed
            ? "lg:ml-20"
            : "lg:ml-72"
        }`}
      >
        {/* Top Bar */}
        {!isFullscreen && (
          <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Live Map</h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Real-time fleet tracking and monitoring
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    <Maximize2 className="w-4 h-4" />
                    Fullscreen
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className={isFullscreen ? "h-screen" : "p-6"}>
          <div
            className={
              isFullscreen ? "h-full" : "max-w-[1400px] mx-auto space-y-6"
            }
          >
            {/* KPI Stats - Hidden in fullscreen */}
            {!isFullscreen && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <KPIStat
                  label="Total Drones"
                  value={drones.length}
                  icon={Plane}
                />
                <KPIStat
                  label="Active"
                  value={activeDrones}
                  icon={Activity}
                  delta={{
                    value: 12.5,
                    direction: "up",
                    tooltip: "Currently flying",
                  }}
                />
                <KPIStat
                  label="Avg. Battery"
                  value={`${avgBattery}%`}
                  format="text"
                  icon={Battery}
                />
                <KPIStat
                  label="Tracking"
                  value={selectedDrone ? "1 Drone" : "All"}
                  format="text"
                  icon={MapPin}
                />
              </div>
            )}

            {/* Map Container */}
            <div
              className={`relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${
                isFullscreen ? "h-full" : "h-[calc(100vh-280px)]"
              }`}
            >
              {/* Map Controls Overlay */}
              <div className="absolute top-4 right-4 z-10 space-y-2">
                {/* Fullscreen Toggle */}
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-5 h-5 text-gray-700" />
                  ) : (
                    <Maximize2 className="w-5 h-5 text-gray-700" />
                  )}
                </button>

                {/* Layers Control */}
                <div className="bg-white rounded-lg shadow-md p-3 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-700 mb-2">
                    <Layers className="w-4 h-4" />
                    Layers
                  </div>
                  <label className="flex items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      checked={mapLayers.drones}
                      onChange={(e) =>
                        setMapLayers({ ...mapLayers, drones: e.target.checked })
                      }
                      className="rounded"
                    />
                    <span>Drones</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      checked={mapLayers.routes}
                      onChange={(e) =>
                        setMapLayers({ ...mapLayers, routes: e.target.checked })
                      }
                      className="rounded"
                    />
                    <span>Routes</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      checked={mapLayers.buildings}
                      onChange={(e) =>
                        setMapLayers({
                          ...mapLayers,
                          buildings: e.target.checked,
                        })
                      }
                      className="rounded"
                    />
                    <span>Buildings</span>
                  </label>
                </div>
              </div>

              {/* Drone Info Panel - When drone selected */}
              {selectedDroneData && (
                <div className="absolute bottom-4 left-4 z-10 bg-white rounded-xl shadow-lg p-4 w-72">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E0A458] to-[#c98d42] flex items-center justify-center">
                        <Plane className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {selectedDroneData.name}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {selectedDroneData.id}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedDrone(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedDroneData.status === "active"
                            ? "bg-green-100 text-green-700"
                            : selectedDroneData.status === "idle"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {selectedDroneData.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Battery</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div
                            className={`h-2 rounded-full ${
                              selectedDroneData.battery > 70
                                ? "bg-green-500"
                                : selectedDroneData.battery > 30
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${selectedDroneData.battery}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {selectedDroneData.battery}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Location</span>
                      <span className="text-sm text-gray-900">
                        {selectedDroneData.location}
                      </span>
                    </div>

                    {selectedDroneData.currentJob && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Current Job
                        </span>
                        <span className="text-sm font-medium text-indigo-600">
                          {selectedDroneData.currentJob}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Map */}
              <div className="w-full h-full">
                <LiveMapComponent
                  drones={drones.map((drone) => ({
                    id: drone.id,
                    name: drone.name,
                    position: drone.position,
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
