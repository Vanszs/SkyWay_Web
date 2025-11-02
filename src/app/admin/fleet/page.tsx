"use client";

import { useEffect, useState } from "react";
import {
  Plane,
  Battery,
  MapPin,
  Activity,
  Clock,
  Plus,
  Filter,
  Search,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
  CheckCircle,
  WifiOff,
} from "lucide-react";
import { ModernSidebar } from "@/components/admin/ModernSidebar";
import { KPIStat } from "@/components/admin/KPIStat";
import { ChartCard } from "@/components/admin/ChartCard";

// Sample fleet data
const fleet = [
  {
    id: "DRONE-001",
    name: "SkyWay Alpha",
    model: "DJI Matrice 300",
    status: "active" as const,
    battery: 85,
    location: { lat: -7.2575, lng: 112.7521, name: "Surabaya Timur" },
    currentJob: "PKG-12345",
    totalFlights: 245,
    lastMaintenance: "2024-10-15",
    nextMaintenance: "2024-11-15",
    maxPayload: 5.5,
    maxRange: 15,
  },
  {
    id: "DRONE-002",
    name: "SkyWay Beta",
    model: "DJI Matrice 300",
    status: "idle" as const,
    battery: 100,
    location: { lat: -7.2675, lng: 112.7421, name: "Surabaya Barat" },
    currentJob: undefined,
    totalFlights: 198,
    lastMaintenance: "2024-10-10",
    nextMaintenance: "2024-11-10",
    maxPayload: 5.5,
    maxRange: 15,
  },
  {
    id: "DRONE-003",
    name: "SkyWay Gamma",
    model: "DJI Matrice 350",
    status: "charging" as const,
    battery: 45,
    location: { lat: -7.2775, lng: 112.7621, name: "Hub Surabaya" },
    currentJob: undefined,
    totalFlights: 312,
    lastMaintenance: "2024-10-12",
    nextMaintenance: "2024-11-12",
    maxPayload: 6.0,
    maxRange: 18,
  },
  {
    id: "DRONE-004",
    name: "SkyWay Delta",
    model: "DJI Matrice 300",
    status: "active" as const,
    battery: 72,
    location: { lat: -7.2475, lng: 112.7721, name: "Surabaya Selatan" },
    currentJob: "PKG-12347",
    totalFlights: 267,
    lastMaintenance: "2024-10-18",
    nextMaintenance: "2024-11-18",
    maxPayload: 5.5,
    maxRange: 15,
  },
  {
    id: "DRONE-005",
    name: "SkyWay Epsilon",
    model: "DJI Matrice 350",
    status: "maintenance" as const,
    battery: 0,
    location: { lat: -7.2775, lng: 112.7621, name: "Maintenance Bay" },
    currentJob: undefined,
    totalFlights: 289,
    lastMaintenance: "2024-10-20",
    nextMaintenance: "2024-10-25",
    maxPayload: 6.0,
    maxRange: 18,
  },
];

export default function FleetManagement() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
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
  const totalDrones = fleet.length;
  const activeDrones = fleet.filter((d) => d.status === "active").length;
  const idleDrones = fleet.filter((d) => d.status === "idle").length;
  const maintenanceDrones = fleet.filter((d) => d.status === "maintenance").length;
  const avgBattery = Math.round(
    fleet.reduce((acc, d) => acc + d.battery, 0) / fleet.length
  );
  const totalFlights = fleet.reduce((acc, d) => acc + d.totalFlights, 0);

  // Filter drones
  const filteredFleet = fleet.filter((drone) => {
    const matchesSearch =
      drone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drone.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || drone.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "idle":
        return "bg-blue-100 text-blue-700";
      case "charging":
        return "bg-yellow-100 text-yellow-700";
      case "maintenance":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "idle":
        return <Clock className="w-4 h-4" />;
      case "charging":
        return <Battery className="w-4 h-4" />;
      case "maintenance":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <WifiOff className="w-4 h-4" />;
    }
  };

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
                <h1 className="text-2xl font-bold text-gray-900">
                  Fleet Management
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Manage and monitor your drone fleet
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#E0A458] to-[#c98d42] text-white hover:shadow-lg transition-all text-sm font-medium flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Drone
                </button>
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
                label="Total Fleet"
                value={totalDrones}
                icon={Plane}
                delta={{
                  value: 0,
                  direction: "up",
                  tooltip: "Total drones in fleet",
                }}
              />
              <KPIStat
                label="Active Drones"
                value={activeDrones}
                icon={Activity}
                delta={{
                  value: 15.2,
                  direction: "up",
                  tooltip: "Currently flying",
                }}
              />
              <KPIStat
                label="Avg. Battery"
                value={`${avgBattery}%`}
                format="text"
                icon={Battery}
                delta={{
                  value: 3.5,
                  direction: "up",
                  tooltip: "Fleet battery health",
                }}
              />
              <KPIStat
                label="Total Flights"
                value={totalFlights}
                icon={CheckCircle}
                delta={{
                  value: 12.8,
                  direction: "up",
                  tooltip: "All-time flights",
                }}
              />
            </div>

            {/* Search and Filter */}
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by drone name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="idle">Idle</option>
                <option value="charging">Charging</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            {/* Fleet Table */}
            <ChartCard title="">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Drone
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Model
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Battery
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Flights
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Next Maintenance
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Specs
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredFleet.map((drone) => (
                      <tr
                        key={drone.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E0A458] to-[#c98d42] flex items-center justify-center">
                              <Plane className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {drone.name}
                              </p>
                              <p className="text-xs text-gray-500">{drone.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">
                            {drone.model}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              drone.status
                            )}`}
                          >
                            {getStatusIcon(drone.status)}
                            {drone.status.charAt(0).toUpperCase() +
                              drone.status.slice(1)}
                          </span>
                          {drone.currentJob && (
                            <p className="text-xs text-gray-500 mt-1">
                              Job: <span className="text-indigo-600">{drone.currentJob}</span>
                            </p>
                          )}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
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
                            <div>
                              <p className="text-sm font-semibold text-gray-900">
                                {drone.battery}%
                              </p>
                              <div className="w-16 h-1.5 bg-gray-200 rounded-full mt-1">
                                <div
                                  className={`h-1.5 rounded-full ${
                                    drone.battery > 70
                                      ? "bg-green-500"
                                      : drone.battery > 30
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                  }`}
                                  style={{ width: `${drone.battery}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-900">
                              {drone.location.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">
                              {drone.totalFlights.toLocaleString()}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-900">
                              {new Date(drone.nextMaintenance).toLocaleDateString(
                                "id-ID",
                                { day: "2-digit", month: "short" }
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-xs text-gray-600">
                            <div>{drone.maxPayload} kg</div>
                            <div className="text-gray-500">{drone.maxRange} km</div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                              <Edit className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ChartCard>

            {/* Empty State */}
            {filteredFleet.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <Plane className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No drones found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedStatus("all");
                  }}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#E0A458] to-[#c98d42] text-white hover:shadow-lg transition-all text-sm font-medium"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
