"use client";

import { useEffect, useState } from "react";
import {
  Package,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Clock,
  User,
  Plane,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUpDown,
} from "lucide-react";
import { ModernSidebar } from "@/components/admin/ModernSidebar";
import { KPIStat } from "@/components/admin/KPIStat";
import { ChartCard } from "@/components/admin/ChartCard";

// Sample shipments data
const allShipments = [
  {
    id: "PKG-12345",
    trackingNumber: "TRK001",
    status: "in_flight" as const,
    origin: "Surabaya Mall",
    destination: "Jl. Raya Darmo 123",
    priority: "urgent" as const,
    droneId: "DRONE-001",
    customerName: "Ahmad Rizki",
    customerPhone: "+62 812-3456-7890",
    estimatedTime: "15 menit",
    weight: 2.5,
    createdAt: "2024-10-22T10:30:00",
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
    customerPhone: "+62 813-4567-8901",
    estimatedTime: "30 menit",
    weight: 1.8,
    createdAt: "2024-10-22T11:00:00",
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
    customerPhone: "+62 814-5678-9012",
    estimatedTime: "20 menit",
    weight: 3.2,
    createdAt: "2024-10-22T11:15:00",
  },
  {
    id: "PKG-12348",
    trackingNumber: "TRK004",
    status: "delivered" as const,
    origin: "Surabaya Plaza",
    destination: "Jl. Ahmad Yani 101",
    priority: "low" as const,
    droneId: "DRONE-002",
    customerName: "Dewi Lestari",
    customerPhone: "+62 815-6789-0123",
    estimatedTime: "Delivered",
    weight: 1.5,
    createdAt: "2024-10-22T09:00:00",
  },
  {
    id: "PKG-12349",
    trackingNumber: "TRK005",
    status: "cancelled" as const,
    origin: "Hub Central",
    destination: "Jl. Sudirman 202",
    priority: "medium" as const,
    droneId: undefined,
    customerName: "Rudi Hartono",
    customerPhone: "+62 816-7890-1234",
    estimatedTime: "Cancelled",
    weight: 2.0,
    createdAt: "2024-10-22T08:30:00",
  },
  {
    id: "PKG-12350",
    trackingNumber: "TRK006",
    status: "delivered" as const,
    origin: "Warehouse B",
    destination: "Jl. Diponegoro 303",
    priority: "urgent" as const,
    droneId: "DRONE-003",
    customerName: "Linda Wijaya",
    customerPhone: "+62 817-8901-2345",
    estimatedTime: "Delivered",
    weight: 4.5,
    createdAt: "2024-10-22T08:00:00",
  },
];

export default function ShipmentsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Hide main navigation on admin pages
    const nav = document.querySelector("nav");
    if (nav) nav.style.display = "none";
    return () => {
      if (nav) nav.style.display = "block";
    };
  }, []);

  // KPI calculations
  const totalShipments = allShipments.length;
  const pendingShipments = allShipments.filter((s) => s.status === "pending").length;
  const inFlightShipments = allShipments.filter((s) => s.status === "in_flight").length;
  const deliveredToday = allShipments.filter((s) => s.status === "delivered").length;

  // Filter shipments
  const filteredShipments = allShipments.filter((shipment) => {
    const matchesSearch =
      shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || shipment.status === selectedStatus;
    const matchesPriority =
      selectedPriority === "all" || shipment.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "in_flight":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-600";
      case "high":
        return "text-orange-600";
      case "medium":
        return "text-blue-600";
      case "low":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "in_flight":
        return <Plane className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
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
                <h1 className="text-2xl font-bold text-gray-900">Shipments</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Track and manage all shipments
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Export
                </button>
                <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#E0A458] to-[#c98d42] text-white hover:shadow-lg transition-all text-sm font-medium flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  New Shipment
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
                label="Total Shipments"
                value={totalShipments}
                icon={Package}
                delta={{
                  value: 12.5,
                  direction: "up",
                  tooltip: "Compared to last week",
                }}
              />
              <KPIStat
                label="Pending"
                value={pendingShipments}
                icon={Clock}
                delta={{
                  value: 5.2,
                  direction: "up",
                  tooltip: "Waiting for assignment",
                }}
              />
              <KPIStat
                label="In Flight"
                value={inFlightShipments}
                icon={Plane}
                delta={{
                  value: 8.3,
                  direction: "up",
                  tooltip: "Currently being delivered",
                }}
              />
              <KPIStat
                label="Delivered Today"
                value={deliveredToday}
                icon={CheckCircle}
                delta={{
                  value: 3.1,
                  direction: "down",
                  tooltip: "Completed deliveries",
                }}
              />
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by tracking number, customer, or destination..."
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
                <option value="pending">Pending</option>
                <option value="in_flight">In Flight</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Priority</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Shipments Table */}
            <ChartCard title="">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Tracking #
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Destination
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Drone
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        ETA
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredShipments.map((shipment) => (
                      <tr
                        key={shipment.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {shipment.trackingNumber}
                              </p>
                              <p className="text-xs text-gray-500">
                                {shipment.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-900">
                                {shipment.customerName}
                              </p>
                              <p className="text-xs text-gray-500">
                                {shipment.customerPhone}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-900">
                              {shipment.destination}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              shipment.status
                            )}`}
                          >
                            {getStatusIcon(shipment.status)}
                            {shipment.status.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span
                            className={`text-xs font-medium ${getPriorityColor(
                              shipment.priority
                            )}`}
                          >
                            {shipment.priority.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {shipment.droneId ? (
                            <div className="flex items-center gap-2">
                              <Plane className="w-4 h-4 text-indigo-600" />
                              <span className="text-sm text-gray-900">
                                {shipment.droneId}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">
                              Unassigned
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-900">
                              {shipment.estimatedTime}
                            </span>
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

              {/* Empty State */}
              {filteredShipments.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No shipments found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedStatus("all");
                      setSelectedPriority("all");
                    }}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#E0A458] to-[#c98d42] text-white hover:shadow-lg transition-all text-sm font-medium"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </ChartCard>
          </div>
        </div>
      </div>
    </div>
  );
}
