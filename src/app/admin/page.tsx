'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import type { DroneMapData } from '@/components/ui/LiveMap'
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Package, Settings, BarChart3, Menu, X,
  Filter, Download, Plus, Edit, Trash2, Eye,
  Battery, Signal, MapPin, Clock, AlertTriangle,
  TrendingUp, TrendingDown, Activity, Shield, Bell, CheckCircle,
  Home, Plane, ChevronRight, ChevronLeft, LogOut, ArrowUpDown,
  RefreshCw, FileText, Search
} from 'lucide-react';
import { BubbleCard, BubbleButton, BubbleInput } from '@/components/ui/skyway-components'

// Interfaces for type safety
interface DroneStatus {
  id: string
  status: 'active' | 'idle' | 'maintenance' | 'charging'
  battery: number
  location: { lat: number; lng: number; address: string }
  currentJob?: string
  lastUpdate: string
  totalFlights: number
  lastMaintenance: string
}

interface Shipment {
  id: string
  trackingNumber: string
  status: 'pending' | 'assigned' | 'in_flight' | 'delivered' | 'cancelled'
  origin: string
  destination: string
  priority: 'urgent' | 'high' | 'medium' | 'low'
  estimatedTime: string
  droneId?: string
  weight: number
  customerName: string
  customerPhone: string
  createdAt: string
}

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'operator' | 'pilot' | 'customer'
  status: 'active' | 'inactive' | 'suspended'
  lastLogin: string
  createdAt: string
}

// Mock data for tables
const mockDrones: DroneStatus[] = [
  { id: 'SWD-447', status: 'active', battery: 78, location: { lat: -7.2575, lng: 112.7521, address: 'Jl. Raya Gubeng' }, currentJob: 'SKY2024-001', lastUpdate: '2 min ago', totalFlights: 1247, lastMaintenance: '2024-09-15' },
  { id: 'SWD-448', status: 'idle', battery: 95, location: { lat: -7.2504, lng: 112.7688, address: 'Hub Tunjungan' }, lastUpdate: '5 min ago', totalFlights: 892, lastMaintenance: '2024-09-20' },
  { id: 'SWD-449', status: 'charging', battery: 45, location: { lat: -7.2574, lng: 112.7575, address: 'Hub Gubeng' }, lastUpdate: '1 min ago', totalFlights: 1563, lastMaintenance: '2024-09-10' },
  { id: 'SWD-450', status: 'maintenance', battery: 0, location: { lat: -7.2574, lng: 112.7575, address: 'Maintenance Bay' }, lastUpdate: '30 min ago', totalFlights: 2341, lastMaintenance: '2024-09-28' }
]

const mockShipments: Shipment[] = [
  { id: 'SKY2024-002', trackingNumber: 'SW240002', status: 'pending', origin: 'Tunjungan Plaza', destination: 'Pakuwon Mall', priority: 'high', estimatedTime: '15 min', weight: 1.2, customerName: 'Ahmad Budiman', customerPhone: '+62 812-3456-7890', createdAt: '2024-09-29 08:30' },
  { id: 'SKY2024-003', trackingNumber: 'SW240003', status: 'assigned', origin: 'Surabaya Town Square', destination: 'Galaxy Mall', priority: 'medium', estimatedTime: '18 min', weight: 0.8, customerName: 'Sari Dewi', customerPhone: '+62 856-7890-1234', createdAt: '2024-09-29 09:15', droneId: 'SWD-448' },
  { id: 'SKY2024-004', trackingNumber: 'SW240004', status: 'in_flight', origin: 'Royal Plaza', destination: 'Ciputra World', priority: 'urgent', estimatedTime: '22 min', weight: 2.1, customerName: 'Budi Santoso', customerPhone: '+62 821-9876-5432', createdAt: '2024-09-29 07:45', droneId: 'SWD-447' },
  { id: 'SKY2024-005', trackingNumber: 'SW240005', status: 'delivered', origin: 'Gubeng Station', destination: 'ITC Surabaya', priority: 'low', estimatedTime: '12 min', weight: 0.5, customerName: 'Linda Putri', customerPhone: '+62 878-2345-6789', createdAt: '2024-09-29 06:20', droneId: 'SWD-451' }
]

const mockUsers: User[] = [
  { id: 'USR-001', name: 'Admin Utama', email: 'admin@skyway.id', role: 'admin', status: 'active', lastLogin: '2024-09-29 09:30', createdAt: '2024-01-15' },
  { id: 'USR-002', name: 'Operator Satu', email: 'operator1@skyway.id', role: 'operator', status: 'active', lastLogin: '2024-09-29 08:15', createdAt: '2024-02-20' },
  { id: 'USR-003', name: 'Pilot Andika', email: 'andika@skyway.id', role: 'pilot', status: 'active', lastLogin: '2024-09-29 07:45', createdAt: '2024-03-10' },
  { id: 'USR-004', name: 'Customer Beta', email: 'beta@example.com', role: 'customer', status: 'inactive', lastLogin: '2024-09-28 14:20', createdAt: '2024-03-25' }
]

const LiveMapComponent = dynamic(() => import('@/components/ui/LiveMap'), { ssr: false })

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedShipments, setSelectedShipments] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDrone, setSelectedDrone] = useState<string | null>(null)
  const itemsPerPage = 5

  // Mock data untuk live drone positions dan routes
  const createDrone = (drone: DroneMapData): DroneMapData => drone

  const liveDroneData = [
    createDrone({
      id: 'SWD-447',
      name: 'Sky Falcon Alpha',
      position: { lat: -7.2575, lng: 112.7521 }, // Surabaya
      status: 'active',
      battery: 78,
      altitude: 120,
      speed: 45,
      route: [
        { lat: -7.2575, lng: 112.7521, timestamp: '14:30' },
        { lat: -7.2590, lng: 112.7540, timestamp: '14:35' },
        { lat: -7.2610, lng: 112.7560, timestamp: '14:40' },
        { lat: -7.2630, lng: 112.7580, timestamp: '14:45' }
      ],
      destination: { lat: -7.2700, lng: 112.7650, name: 'Pakuwon Mall' }
    }),
    createDrone({
      id: 'SWD-448',
      name: 'Sky Falcon Beta',
      position: { lat: -7.2504, lng: 112.7688 }, // Tunjungan
      status: 'idle',
      battery: 95,
      altitude: 0,
      speed: 0,
      route: [
        { lat: -7.2504, lng: 112.7688, timestamp: '14:20' }
      ],
      destination: null
    }),
    createDrone({
      id: 'SWD-449',
      name: 'Sky Falcon Gamma',
      position: { lat: -7.2574, lng: 112.7575 }, // Hub Gubeng
      status: 'charging',
      battery: 45,
      altitude: 0,
      speed: 0,
      route: [
        { lat: -7.2574, lng: 112.7575, timestamp: '13:45' }
      ],
      destination: null
    })
  ]

  const poweredStatuses: Array<DroneMapData['status']> = ['active', 'idle', 'charging']
  const poweredDrones = liveDroneData.filter((drone) =>
    poweredStatuses.includes(drone.status)
  )
  const visibleSelectedDrone = poweredDrones.some((drone) => drone.id === selectedDrone)
    ? selectedDrone
    : null

  const defaultMapCenter: [number, number] = [-7.2575, 112.7521]
  const mapCenter: [number, number] = poweredDrones.length
    ? [
        poweredDrones.reduce((sum, drone) => sum + drone.position.lat, 0) / poweredDrones.length,
        poweredDrones.reduce((sum, drone) => sum + drone.position.lng, 0) / poweredDrones.length
      ] as [number, number]
    : defaultMapCenter

  // Hide navigation for admin dashboard
  useEffect(() => {
    // Create and inject CSS to hide navigation
    const style = document.createElement('style')
    style.id = 'admin-nav-hide'
    style.innerHTML = `
      nav, [data-navigation="true"], .navigation {
        display: none !important;
      }
      body {
        background: transparent !important;
      }
    `
    document.head.appendChild(style)

    // Also hide navigation elements directly
    const navElements = document.querySelectorAll('nav, [data-navigation="true"]')
    navElements.forEach(nav => {
      if (nav instanceof HTMLElement) {
        nav.style.display = 'none'
      }
    })

    return () => {
      // Cleanup when leaving admin
      const adminStyle = document.getElementById('admin-nav-hide')
      if (adminStyle) {
        adminStyle.remove()
      }
      navElements.forEach(nav => {
        if (nav instanceof HTMLElement) {
          nav.style.display = ''
        }
      })
      document.body.style.background = ''
    }
  }, [])

  // Status color mappings - Updated for light theme
  const statusColors = {
    active: 'text-emerald-700 bg-emerald-100 border-emerald-200',
    idle: 'text-blue-700 bg-blue-100 border-blue-200',
    charging: 'text-yellow-700 bg-yellow-100 border-yellow-200',
    maintenance: 'text-red-700 bg-red-100 border-red-200',
    pending: 'text-orange-700 bg-orange-100 border-orange-200',
    assigned: 'text-blue-700 bg-blue-100 border-blue-200',
    in_flight: 'text-yellow-700 bg-yellow-100 border-yellow-200',
    delivered: 'text-emerald-700 bg-emerald-100 border-emerald-200',
    cancelled: 'text-red-700 bg-red-100 border-red-200',
    urgent: 'text-red-700',
    high: 'text-orange-700',
    medium: 'text-yellow-700',
    low: 'text-blue-700',
    admin: 'text-purple-700 bg-purple-100 border-purple-200',
    operator: 'text-yellow-700 bg-yellow-100 border-yellow-200',
    pilot: 'text-blue-700 bg-blue-100 border-blue-200',
    customer: 'text-gray-700 bg-gray-100 border-gray-200'
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'fleet', label: 'Fleet Management', icon: Plane, badge: mockDrones.filter(d => d.status === 'active').length },
    { id: 'map', label: 'Live Map', icon: MapPin, badge: 'Live' },
    { id: 'shipments', label: 'Shipments', icon: Package, badge: mockShipments.filter(s => s.status === 'pending').length },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  // Filter and pagination logic
  const filteredShipments = mockShipments.filter(shipment =>
    shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.destination.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredShipments.length / itemsPerPage)
  const currentShipments = filteredShipments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="admin-dashboard min-h-screen flex">
      {/* Clean Flat Sidebar */}
      <motion.div
        className={`${sidebarCollapsed ? 'w-20' : 'w-64'} admin-sidebar flex flex-col transition-all duration-300`}
        initial={false}
        animate={{ width: sidebarCollapsed ? 80 : 256 }}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div>
                <h2 className="text-xl font-bold text-white">SkyWay</h2>
                <p className="text-slate-400 text-sm">Admin Panel</p>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`admin-sidebar-item w-full ${sidebarCollapsed ? 'justify-center' : ''} ${
                activeMenu === item.id ? 'active' : ''
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon className={`w-5 h-5 ${sidebarCollapsed ? '' : 'mr-3'}`} />
              {!sidebarCollapsed && (
                <>
                  <span className="font-medium flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </motion.button>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-700">
          <button className={`admin-sidebar-item w-full ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <LogOut className={`w-5 h-5 ${sidebarCollapsed ? '' : 'mr-3'}`} />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="admin-header">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="admin-title capitalize">
                {activeMenu === 'dashboard' ? 'Dashboard' :
                 activeMenu === 'fleet' ? 'Fleet Management' :
                 activeMenu === 'shipments' ? 'Shipment Management' :
                 activeMenu === 'users' ? 'User Management' :
                 activeMenu === 'analytics' ? 'Analytics & Reports' :
                 'System Settings'}
              </h1>
              <p className="admin-subtitle">
                {new Date().toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="admin-input pl-10 pr-4 py-2 w-64"
                />
              </div>
              <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 overflow-auto">
          {/* Dashboard */}
          {activeMenu === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="admin-stats-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="admin-stats-value">{mockDrones.filter(d => d.status === 'active').length}</div>
                      <div className="admin-stats-label">Active Drones</div>
                    </div>
                    <div className="admin-stats-icon bg-emerald-100">
                      <Plane className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                </div>

                <div className="admin-stats-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="admin-stats-value">{mockShipments.filter(s => s.status === 'pending').length}</div>
                      <div className="admin-stats-label">Pending Orders</div>
                    </div>
                    <div className="admin-stats-icon bg-orange-100">
                      <Package className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </div>

                <div className="admin-stats-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="admin-stats-value">{mockDrones.length}</div>
                      <div className="admin-stats-label">Total Fleet</div>
                    </div>
                    <div className="admin-stats-icon bg-blue-100">
                      <Battery className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="admin-stats-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="admin-stats-value">98.5%</div>
                      <div className="admin-stats-label">Success Rate</div>
                    </div>
                    <div className="admin-stats-icon bg-green-100">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3 className="admin-card-title">Revenue Overview</h3>
                  </div>
                  <div className="admin-card-body">
                    <div className="h-64 flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Revenue Chart</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3 className="admin-card-title">Recent Activity</h3>
                  </div>
                  <div className="admin-card-body">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">New order received</p>
                          <p className="text-xs text-gray-500">2 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Plane className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Drone SWD-447 deployed</p>
                          <p className="text-xs text-gray-500">5 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Weather warning issued</p>
                          <p className="text-xs text-gray-500">10 minutes ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Live Map */}
          {activeMenu === 'map' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="admin-card">
                <div className="admin-card-header">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="admin-card-title">Live Drone Map</h2>
                      <p className="text-sm text-gray-500">Real-time drone positions and flight paths</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setSelectedDrone(null)}
                        className="admin-btn admin-btn-outline"
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        Show All
                      </button>
                      <button className="admin-btn admin-btn-primary">
                        <Activity className="w-4 h-4 mr-2" />
                        Live Tracking
                      </button>
                    </div>
                  </div>
                </div>

                <div className="admin-card-body p-0">
                  <div className="relative h-[500px] w-full bg-gray-800 rounded-lg overflow-hidden">
                    <LiveMapComponent
                      drones={poweredDrones}
                      selectedDrone={visibleSelectedDrone}
                      onDroneSelect={setSelectedDrone}
                      center={mapCenter}
                      zoom={visibleSelectedDrone ? 14 : 12}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Fleet Management */}
          {activeMenu === 'fleet' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="admin-card">
                <div className="admin-card-header">
                  <div className="flex items-center justify-between">
                    <h2 className="admin-card-title">Fleet Management</h2>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search drones..."
                          className="admin-input pl-10 pr-4 py-2 w-64"
                        />
                      </div>
                      <button className="admin-btn admin-btn-outline">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </button>
                      <button className="admin-btn admin-btn-primary">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Drone
                      </button>
                    </div>
                  </div>
                </div>

                <div className="admin-card-body p-0">
                  <div className="overflow-x-auto">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Drone ID</th>
                          <th>Status</th>
                          <th>Battery</th>
                          <th>Location</th>
                          <th>Current Job</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockDrones.map((drone) => (
                          <tr key={drone.id}>
                            <td>
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <Plane className="w-5 h-5 text-blue-600" />
                                </div>
                                <span className="font-medium">{drone.id}</span>
                              </div>
                            </td>
                            <td>
                              <span className={`admin-badge ${
                                drone.status === 'active' ? 'admin-badge-success' :
                                drone.status === 'idle' ? 'admin-badge-info' :
                                drone.status === 'charging' ? 'admin-badge-warning' :
                                'admin-badge-danger'
                              }`}>
                                {drone.status.toUpperCase()}
                              </span>
                            </td>
                            <td>
                              <div className="flex items-center space-x-2">
                                <div className="admin-progress w-16">
                                  <div
                                    className={`admin-progress-bar ${
                                      drone.battery > 60 ? 'bg-emerald-500' :
                                      drone.battery > 30 ? 'bg-yellow-500' :
                                      'bg-red-500'
                                    }`}
                                    style={{ width: `${drone.battery}%` }}
                                  />
                                </div>
                                <span className={`text-sm font-medium ${
                                  drone.battery > 60 ? 'text-emerald-700' :
                                  drone.battery > 30 ? 'text-yellow-700' :
                                  'text-red-700'
                                }`}>
                                  {drone.battery}%
                                </span>
                              </div>
                            </td>
                            <td>
                              <span className="text-sm">{drone.location.address}</span>
                            </td>
                            <td>
                              {drone.currentJob ? (
                                <span className="text-sm font-medium text-blue-600">{drone.currentJob}</span>
                              ) : (
                                <span className="text-sm text-gray-400">-</span>
                              )}
                            </td>
                            <td>
                              <div className="flex items-center space-x-2">
                                <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                                  <Settings className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Shipment Management */}
          {activeMenu === 'shipments' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="admin-card">
                <div className="admin-card-header">
                  <div className="flex items-center justify-between">
                    <h2 className="admin-card-title">Shipment Management</h2>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search shipments..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="admin-input pl-10 pr-4 py-2 w-64"
                        />
                      </div>
                      <button className="admin-btn admin-btn-outline">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </button>
                      <button
                        className="admin-btn admin-btn-primary"
                        onClick={() => window.location.href = '/admin/new-order'}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        New Order
                      </button>
                    </div>
                  </div>
                </div>

                <div className="admin-card-body p-0">
                  <div className="overflow-x-auto">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th className="p-4">
                            <input type="checkbox" className="rounded" />
                          </th>
                          <th>Tracking</th>
                          <th>Customer</th>
                          <th>Route</th>
                          <th>Priority</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentShipments.map((shipment) => (
                          <tr key={shipment.id}>
                            <td className="p-4">
                              <input
                                type="checkbox"
                                className="rounded"
                                checked={selectedShipments.includes(shipment.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedShipments([...selectedShipments, shipment.id])
                                  } else {
                                    setSelectedShipments(selectedShipments.filter(id => id !== shipment.id))
                                  }
                                }}
                              />
                            </td>
                            <td>
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                  <Package className="w-5 h-5 text-orange-600" />
                                </div>
                                <div>
                                  <p className="font-medium">{shipment.trackingNumber}</p>
                                  <p className="text-xs text-gray-500">{shipment.createdAt}</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div>
                                <p className="text-sm">{shipment.customerName}</p>
                                <p className="text-xs text-gray-500">{shipment.customerPhone}</p>
                              </div>
                            </td>
                            <td>
                              <div className="text-sm">
                                <p>{shipment.origin}</p>
                                <p className="text-gray-500">↓</p>
                                <p>{shipment.destination}</p>
                              </div>
                            </td>
                            <td>
                              <span className={`admin-badge ${
                                shipment.priority === 'urgent' ? 'admin-badge-danger' :
                                shipment.priority === 'high' ? 'admin-badge-warning' :
                                shipment.priority === 'medium' ? 'admin-badge-info' :
                                'admin-badge-secondary'
                              }`}>
                                {shipment.priority.toUpperCase()}
                              </span>
                            </td>
                            <td>
                              <span className={`admin-badge ${
                                shipment.status === 'delivered' ? 'admin-badge-success' :
                                shipment.status === 'in_flight' ? 'admin-badge-warning' :
                                shipment.status === 'assigned' ? 'admin-badge-info' :
                                shipment.status === 'pending' ? 'admin-badge-warning' :
                                'admin-badge-danger'
                              }`}>
                                {shipment.status.replace('_', ' ').toUpperCase()}
                              </span>
                            </td>
                            <td>
                              <div className="flex items-center space-x-2">
                                <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between p-4 border-t">
                    <div className="text-sm text-gray-500">
                      Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredShipments.length)} of {filteredShipments.length} entries
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="admin-btn admin-btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`admin-btn ${
                            currentPage === page
                              ? 'admin-btn-primary'
                              : 'admin-btn-outline'
                          }`}
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="admin-btn admin-btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* User Management */}
          {activeMenu === 'users' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="admin-card">
                <div className="admin-card-header">
                  <div className="flex items-center justify-between">
                    <h2 className="admin-card-title">User Management</h2>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search users..."
                          className="admin-input pl-10 pr-4 py-2 w-64"
                        />
                      </div>
                      <button className="admin-btn admin-btn-outline">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </button>
                      <button className="admin-btn admin-btn-primary">
                        <Plus className="w-4 h-4 mr-2" />
                        Add User
                      </button>
                    </div>
                  </div>
                </div>

                <div className="admin-card-body p-0">
                  <div className="overflow-x-auto">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Role</th>
                          <th>Status</th>
                          <th>Last Login</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockUsers.map((user) => (
                          <tr key={user.id}>
                            <td>
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                  <span className="text-white font-bold text-sm">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-medium">{user.name}</p>
                                  <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className={`admin-badge ${
                                user.role === 'admin' ? 'admin-badge-danger' :
                                user.role === 'operator' ? 'admin-badge-warning' :
                                user.role === 'pilot' ? 'admin-badge-info' :
                                'admin-badge-secondary'
                              }`}>
                                {user.role.toUpperCase()}
                              </span>
                            </td>
                            <td>
                              <span className={`admin-badge ${
                                user.status === 'active' ? 'admin-badge-success' :
                                user.status === 'inactive' ? 'admin-badge-secondary' :
                                'admin-badge-danger'
                              }`}>
                                {user.status.toUpperCase()}
                              </span>
                            </td>
                            <td>
                              <span className="text-sm">{user.lastLogin}</span>
                            </td>
                            <td>
                              <div className="flex items-center space-x-2">
                                <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                                  <Shield className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Analytics */}
          {activeMenu === 'analytics' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="admin-card">
                <div className="admin-card-header">
                  <h2 className="admin-card-title">Analytics & Reports</h2>
                </div>

                <div className="admin-card-body">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="admin-card">
                      <div className="admin-card-header">
                        <h3 className="admin-card-title">Performance Metrics</h3>
                      </div>
                      <div className="admin-card-body">
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">On-time Delivery</span>
                              <span className="text-emerald-600 font-semibold">98.5%</span>
                            </div>
                            <div className="admin-progress">
                              <div className="admin-progress-bar bg-emerald-500" style={{ width: '98.5%' }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Fleet Utilization</span>
                              <span className="text-yellow-600 font-semibold">87.2%</span>
                            </div>
                            <div className="admin-progress">
                              <div className="admin-progress-bar bg-yellow-500" style={{ width: '87.2%' }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Customer Satisfaction</span>
                              <span className="text-green-600 font-semibold">94.8%</span>
                            </div>
                            <div className="admin-progress">
                              <div className="admin-progress-bar bg-green-500" style={{ width: '94.8%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="admin-card">
                      <div className="admin-card-header">
                        <h3 className="admin-card-title">Recent Alerts</h3>
                      </div>
                      <div className="admin-card-body">
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <div className="flex-1">
                              <p className="font-medium">Weather Warning</p>
                              <p className="text-sm text-gray-600">Strong winds expected 15:00-17:00</p>
                              <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                            <Battery className="w-5 h-5 text-emerald-600 mt-0.5" />
                            <div className="flex-1">
                              <p className="font-medium">SWD-449 Charging Complete</p>
                              <p className="text-sm text-gray-600">Battery at 100%, ready for dispatch</p>
                              <p className="text-xs text-gray-500 mt-1">15 minutes ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Settings */}
          {activeMenu === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="admin-card">
                <div className="admin-card-header">
                  <h2 className="admin-card-title">System Settings</h2>
                </div>

                <div className="admin-card-body">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="admin-card">
                      <div className="admin-card-header">
                        <h3 className="admin-card-title">System Configuration</h3>
                      </div>
                      <div className="admin-card-body">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center py-3 border-b">
                            <div>
                              <p className="font-medium">Auto-assignment</p>
                              <p className="text-sm text-gray-500">Automatically assign drones to shipments</p>
                            </div>
                            <input type="checkbox" className="rounded" defaultChecked />
                          </div>

                          <div className="flex justify-between items-center py-3 border-b">
                            <div>
                              <p className="font-medium">Real-time Notifications</p>
                              <p className="text-sm text-gray-500">Push notifications for critical events</p>
                            </div>
                            <input type="checkbox" className="rounded" defaultChecked />
                          </div>

                          <div className="flex justify-between items-center py-3">
                            <div>
                              <p className="font-medium">Maintenance Alerts</p>
                              <p className="text-sm text-gray-500">Alert when drones need maintenance</p>
                            </div>
                            <input type="checkbox" className="rounded" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="admin-card">
                      <div className="admin-card-header">
                        <h3 className="admin-card-title">Quick Actions</h3>
                      </div>
                      <div className="admin-card-body">
                        <div className="space-y-3">
                          <button className="admin-btn admin-btn-outline w-full text-left flex items-center">
                            <RefreshCw className="w-5 h-5 mr-3" />
                            Refresh System Data
                          </button>
                          <button className="admin-btn admin-btn-outline w-full text-left flex items-center">
                            <FileText className="w-5 h-5 mr-3" />
                            Generate Reports
                          </button>
                          <button className="admin-btn admin-btn-outline w-full text-left flex items-center">
                            <Settings className="w-5 h-5 mr-3" />
                            System Diagnostics
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}