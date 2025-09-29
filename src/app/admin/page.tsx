'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Package, Plane, MapPin, Battery, AlertTriangle, BarChart3, Settings, Users, 
  Calendar, Filter, Plus, Search, RefreshCw, Home, Shield, FileText, Bell, 
  LogOut, Eye, Edit, Trash2, ChevronLeft, ChevronRight, ArrowUpDown, 
  CheckCircle, Clock, Zap
} from 'lucide-react'
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

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedShipments, setSelectedShipments] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const itemsPerPage = 5

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

  // Status color mappings
  const statusColors = {
    active: 'text-cyan-300 bg-cyan-400/20',
    idle: 'text-sky-blue bg-sky-blue/20', 
    charging: 'text-sky-gold bg-sky-gold/20',
    maintenance: 'text-red-300 bg-red-400/20',
    pending: 'text-amber-300 bg-amber-400/20',
    assigned: 'text-sky-blue bg-sky-blue/20',
    in_flight: 'text-sky-gold bg-sky-gold/20',
    delivered: 'text-cyan-300 bg-cyan-400/20',
    cancelled: 'text-red-300 bg-red-400/20',
    urgent: 'text-red-300',
    high: 'text-orange-300',
    medium: 'text-sky-gold',
    low: 'text-sky-blue',
    admin: 'text-purple-300 bg-purple-400/20',
    operator: 'text-sky-gold bg-sky-gold/20',
    pilot: 'text-cyan-300 bg-cyan-400/20',
    customer: 'text-gray-300 bg-gray-400/20'
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'fleet', label: 'Fleet Management', icon: Plane, badge: mockDrones.filter(d => d.status === 'active').length },
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
    <div className="min-h-screen bg-gradient-to-br from-sky-navy via-sky-blue to-sky-navy flex">
      {/* Sidebar */}
      <motion.div 
        className={`${sidebarCollapsed ? 'w-20' : 'w-72'} bg-white/10 backdrop-blur-xl border-r border-white/20 flex flex-col transition-all duration-300`}
        initial={false}
        animate={{ width: sidebarCollapsed ? 80 : 288 }}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div>
                <h2 className="text-xl font-bold text-white">SkyWay Admin</h2>
                <p className="text-sky-100/70 text-sm">Control Center</p>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-3' : 'px-4'} py-3 rounded-2xl transition-all duration-200 ${
                activeMenu === item.id 
                  ? 'bg-sky-gold text-sky-navy shadow-lg' 
                  : 'text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon className={`w-5 h-5 ${sidebarCollapsed ? '' : 'mr-3'}`} />
              {!sidebarCollapsed && (
                <>
                  <span className="font-medium flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="bg-red-400 text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </motion.button>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10">
          <button className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-3' : 'px-4'} py-3 text-white hover:bg-white/10 rounded-2xl transition-colors`}>
            <LogOut className={`w-5 h-5 ${sidebarCollapsed ? '' : 'mr-3'}`} />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white capitalize">
                {activeMenu === 'dashboard' ? 'Dashboard Overview' : 
                 activeMenu === 'fleet' ? 'Fleet Management' :
                 activeMenu === 'shipments' ? 'Shipment Management' :
                 activeMenu === 'users' ? 'User Management' :
                 activeMenu === 'analytics' ? 'Analytics & Reports' :
                 'System Settings'}
              </h1>
              <p className="text-sky-100/70">
                {new Date().toLocaleDateString('id-ID', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <BubbleButton variant="secondary" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </BubbleButton>
              <div className="w-10 h-10 bg-gradient-to-br from-sky-gold to-amber-400 rounded-2xl flex items-center justify-center">
                <Users className="w-5 h-5 text-sky-navy" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Dashboard */}
          {activeMenu === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <BubbleCard className="p-6 bg-white/10 backdrop-blur-xl border-white/20 rounded-3xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-white">{mockDrones.filter(d => d.status === 'active').length}</div>
                      <div className="text-sky-100/70 text-sm">Active Drones</div>
                    </div>
                    <Plane className="w-8 h-8 text-sky-gold" />
                  </div>
                </BubbleCard>

                <BubbleCard className="p-6 bg-white/10 backdrop-blur-xl border-white/20 rounded-3xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-white">{mockShipments.filter(s => s.status === 'pending').length}</div>
                      <div className="text-sky-100/70 text-sm">Pending Orders</div>
                    </div>
                    <Package className="w-8 h-8 text-amber-300" />
                  </div>
                </BubbleCard>

                <BubbleCard className="p-6 bg-white/10 backdrop-blur-xl border-white/20 rounded-3xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-white">{mockDrones.length}</div>
                      <div className="text-sky-100/70 text-sm">Total Fleet</div>
                    </div>
                    <Battery className="w-8 h-8 text-cyan-300" />
                  </div>
                </BubbleCard>

                <BubbleCard className="p-6 bg-white/10 backdrop-blur-xl border-white/20 rounded-3xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-white">98.5%</div>
                      <div className="text-sky-100/70 text-sm">Success Rate</div>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                </BubbleCard>
              </div>

              {/* System Overview */}
              <BubbleCard className="p-6 bg-white/10 backdrop-blur-xl border-white/20 rounded-3xl">
                <h3 className="text-lg font-semibold text-white mb-6">System Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-white/5 rounded-2xl">
                    <Plane className="w-12 h-12 text-sky-gold mx-auto mb-3" />
                    <h4 className="text-white font-medium mb-2">Fleet Status</h4>
                    <p className="text-sky-100/70 text-sm">All drones operational and ready for deployment</p>
                  </div>
                  
                  <div className="text-center p-4 bg-white/5 rounded-2xl">
                    <Package className="w-12 h-12 text-amber-300 mx-auto mb-3" />
                    <h4 className="text-white font-medium mb-2">Active Orders</h4>
                    <p className="text-sky-100/70 text-sm">Multiple deliveries in progress across the city</p>
                  </div>
                  
                  <div className="text-center p-4 bg-white/5 rounded-2xl">
                    <BarChart3 className="w-12 h-12 text-cyan-300 mx-auto mb-3" />
                    <h4 className="text-white font-medium mb-2">Performance</h4>
                    <p className="text-sky-100/70 text-sm">Excellent delivery times and customer satisfaction</p>
                  </div>
                </div>
              </BubbleCard>
            </motion.div>
          )}

          {/* Fleet Management */}
          {activeMenu === 'fleet' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Fleet Management</h2>
                <div className="flex items-center space-x-4">
                  <BubbleInput placeholder="Search drones..." className="w-64" />
                  <BubbleButton variant="secondary">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </BubbleButton>
                  <BubbleButton>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Drone
                  </BubbleButton>
                </div>
              </div>

              {/* Fleet Table */}
              <BubbleCard className="bg-white/10 backdrop-blur-xl border-white/20 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-white/10">
                      <tr className="text-left">
                        <th className="p-4 text-sky-100/70 font-medium">
                          <div className="flex items-center space-x-2">
                            <span>Drone ID</span>
                            <ArrowUpDown className="w-4 h-4" />
                          </div>
                        </th>
                        <th className="p-4 text-sky-100/70 font-medium">Status</th>
                        <th className="p-4 text-sky-100/70 font-medium">Battery</th>
                        <th className="p-4 text-sky-100/70 font-medium">Location</th>
                        <th className="p-4 text-sky-100/70 font-medium">Current Job</th>
                        <th className="p-4 text-sky-100/70 font-medium">Total Flights</th>
                        <th className="p-4 text-sky-100/70 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockDrones.map((drone) => (
                        <motion.tr 
                          key={drone.id}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-sky-gold/20 rounded-xl flex items-center justify-center">
                                <Plane className="w-5 h-5 text-sky-gold" />
                              </div>
                              <span className="text-white font-medium">{drone.id}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[drone.status]}`}>
                              {drone.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full transition-all duration-300 ${
                                    drone.battery > 60 ? 'bg-cyan-300' :
                                    drone.battery > 30 ? 'bg-sky-gold' :
                                    'bg-red-400'
                                  }`}
                                  style={{ width: `${drone.battery}%` }}
                                />
                              </div>
                              <span className={`text-sm font-medium ${
                                drone.battery > 60 ? 'text-cyan-300' :
                                drone.battery > 30 ? 'text-sky-gold' :
                                'text-red-400'
                              }`}>
                                {drone.battery}%
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="text-white text-sm">{drone.location.address}</span>
                          </td>
                          <td className="p-4">
                            {drone.currentJob ? (
                              <span className="text-sky-gold text-sm font-medium">{drone.currentJob}</span>
                            ) : (
                              <span className="text-sky-100/50 text-sm">-</span>
                            )}
                          </td>
                          <td className="p-4">
                            <span className="text-white text-sm">{drone.totalFlights.toLocaleString()}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-sky-blue hover:bg-white/10 rounded-lg transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-sky-gold hover:bg-white/10 rounded-lg transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-red-400 hover:bg-white/10 rounded-lg transition-colors">
                                <Settings className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </BubbleCard>
            </motion.div>
          )}

          {/* Shipment Management */}
          {activeMenu === 'shipments' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Shipment Management</h2>
                <div className="flex items-center space-x-4">
                  <BubbleInput 
                    placeholder="Search shipments..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                  <BubbleButton variant="secondary">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </BubbleButton>
                  <BubbleButton>
                    <Plus className="w-4 h-4 mr-2" />
                    New Order
                  </BubbleButton>
                </div>
              </div>

              {/* Shipment Table */}
              <BubbleCard className="bg-white/10 backdrop-blur-xl border-white/20 rounded-3xl">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-white/10">
                      <tr className="text-left">
                        <th className="p-4">
                          <input type="checkbox" className="rounded border-white/30" />
                        </th>
                        <th className="p-4 text-sky-100/70 font-medium">Tracking</th>
                        <th className="p-4 text-sky-100/70 font-medium">Customer</th>
                        <th className="p-4 text-sky-100/70 font-medium">Route</th>
                        <th className="p-4 text-sky-100/70 font-medium">Priority</th>
                        <th className="p-4 text-sky-100/70 font-medium">Status</th>
                        <th className="p-4 text-sky-100/70 font-medium">Weight</th>
                        <th className="p-4 text-sky-100/70 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentShipments.map((shipment) => (
                        <motion.tr 
                          key={shipment.id}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          <td className="p-4">
                            <input 
                              type="checkbox" 
                              className="rounded border-white/30"
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
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-amber-300/20 rounded-xl flex items-center justify-center">
                                <Package className="w-5 h-5 text-amber-300" />
                              </div>
                              <div>
                                <p className="text-white font-medium">{shipment.trackingNumber}</p>
                                <p className="text-sky-100/50 text-xs">{shipment.createdAt}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <p className="text-white text-sm">{shipment.customerName}</p>
                              <p className="text-sky-100/70 text-xs">{shipment.customerPhone}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm">
                              <p className="text-white">{shipment.origin}</p>
                              <p className="text-sky-100/70">↓</p>
                              <p className="text-white">{shipment.destination}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`text-sm font-medium ${statusColors[shipment.priority]}`}>
                              {shipment.priority.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[shipment.status]}`}>
                              {shipment.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="text-white text-sm">{shipment.weight} kg</span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-sky-blue hover:bg-white/10 rounded-lg transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-sky-gold hover:bg-white/10 rounded-lg transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-red-400 hover:bg-white/10 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between p-4 border-t border-white/10">
                  <div className="text-sky-100/70 text-sm">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredShipments.length)} of {filteredShipments.length} entries
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded-lg transition-colors ${
                          currentPage === page 
                            ? 'bg-sky-gold text-sky-navy font-medium' 
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button 
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </BubbleCard>
            </motion.div>
          )}

          {/* User Management */}
          {activeMenu === 'users' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">User Management</h2>
                <div className="flex items-center space-x-4">
                  <BubbleInput placeholder="Search users..." className="w-64" />
                  <BubbleButton variant="secondary">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </BubbleButton>
                  <BubbleButton>
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </BubbleButton>
                </div>
              </div>

              {/* User Table */}
              <BubbleCard className="bg-white/10 backdrop-blur-xl border-white/20 rounded-3xl">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-white/10">
                      <tr className="text-left">
                        <th className="p-4 text-sky-100/70 font-medium">User</th>
                        <th className="p-4 text-sky-100/70 font-medium">Role</th>
                        <th className="p-4 text-sky-100/70 font-medium">Status</th>
                        <th className="p-4 text-sky-100/70 font-medium">Last Login</th>
                        <th className="p-4 text-sky-100/70 font-medium">Created</th>
                        <th className="p-4 text-sky-100/70 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockUsers.map((user) => (
                        <motion.tr 
                          key={user.id}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-sky-gold to-amber-400 rounded-xl flex items-center justify-center">
                                <span className="text-sky-navy font-bold text-sm">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <p className="text-white font-medium">{user.name}</p>
                                <p className="text-sky-100/70 text-sm">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[user.role]}`}>
                              {user.role.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.status === 'active' ? 'text-cyan-300 bg-cyan-400/20' :
                              user.status === 'inactive' ? 'text-gray-300 bg-gray-400/20' :
                              'text-red-300 bg-red-400/20'
                            }`}>
                              {user.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="text-white text-sm">{user.lastLogin}</span>
                          </td>
                          <td className="p-4">
                            <span className="text-sky-100/70 text-sm">{user.createdAt}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-sky-blue hover:bg-white/10 rounded-lg transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-sky-gold hover:bg-white/10 rounded-lg transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-red-400 hover:bg-white/10 rounded-lg transition-colors">
                                <Shield className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </BubbleCard>
            </motion.div>
          )}

          {/* Analytics */}
          {activeMenu === 'analytics' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white">Analytics & Reports</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BubbleCard className="p-6 bg-white/10 backdrop-blur-xl border-white/20 rounded-3xl">
                  <h3 className="text-xl font-bold text-white mb-6">Performance Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sky-100/70">On-time Delivery</span>
                      <span className="text-cyan-300 font-semibold text-lg">98.5%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-cyan-300 h-2 rounded-full" style={{ width: '98.5%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sky-100/70">Fleet Utilization</span>
                      <span className="text-sky-gold font-semibold text-lg">87.2%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-sky-gold h-2 rounded-full" style={{ width: '87.2%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sky-100/70">Customer Satisfaction</span>
                      <span className="text-green-400 font-semibold text-lg">94.8%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{ width: '94.8%' }}></div>
                    </div>
                  </div>
                </BubbleCard>

                <BubbleCard className="p-6 bg-white/10 backdrop-blur-xl border-white/20 rounded-3xl">
                  <h3 className="text-xl font-bold text-white mb-6">Recent Alerts</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 bg-sky-gold/10 rounded-xl border border-sky-gold/20">
                      <AlertTriangle className="w-5 h-5 text-sky-gold mt-0.5" />
                      <div className="flex-1">
                        <p className="text-white font-medium">Weather Warning</p>
                        <p className="text-sky-100/70 text-sm">Strong winds expected 15:00-17:00</p>
                        <p className="text-sky-100/50 text-xs mt-1">2 minutes ago</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-cyan-300/10 rounded-xl border border-cyan-300/20">
                      <Battery className="w-5 h-5 text-cyan-300 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-white font-medium">SWD-449 Charging Complete</p>
                        <p className="text-sky-100/70 text-sm">Battery at 100%, ready for dispatch</p>
                        <p className="text-sky-100/50 text-xs mt-1">15 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </BubbleCard>
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
              <h2 className="text-2xl font-bold text-white">System Settings</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BubbleCard className="p-6 bg-white/10 backdrop-blur-xl border-white/20 rounded-3xl">
                  <h3 className="text-xl font-bold text-white mb-6">System Configuration</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <div>
                        <p className="text-white font-medium">Auto-assignment</p>
                        <p className="text-sky-100/70 text-sm">Automatically assign drones to shipments</p>
                      </div>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <div>
                        <p className="text-white font-medium">Real-time Notifications</p>
                        <p className="text-sky-100/70 text-sm">Push notifications for critical events</p>
                      </div>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    
                    <div className="flex justify-between items-center py-3">
                      <div>
                        <p className="text-white font-medium">Maintenance Alerts</p>
                        <p className="text-sky-100/70 text-sm">Alert when drones need maintenance</p>
                      </div>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                  </div>
                </BubbleCard>

                <BubbleCard className="p-6 bg-white/10 backdrop-blur-xl border-white/20 rounded-3xl">
                  <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
                  <div className="space-y-3">
                    <BubbleButton className="w-full justify-start" variant="secondary">
                      <RefreshCw className="w-5 h-5 mr-3" />
                      Refresh System Data
                    </BubbleButton>
                    <BubbleButton className="w-full justify-start" variant="secondary">
                      <FileText className="w-5 h-5 mr-3" />
                      Generate Reports
                    </BubbleButton>
                    <BubbleButton className="w-full justify-start" variant="secondary">
                      <Settings className="w-5 h-5 mr-3" />
                      System Diagnostics
                    </BubbleButton>
                  </div>
                </BubbleCard>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
