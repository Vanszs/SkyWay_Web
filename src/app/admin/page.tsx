'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  Plane, 
  MapPin, 
  Battery, 
  AlertTriangle, 
  BarChart3, 
  Settings, 
  Users, 
  Calendar, 
  Filter,
  Plus,
  Search,
  RefreshCw
} from 'lucide-react'
import { BubbleCard, BubbleButton, BubbleInput, BubbleTabs } from '@/components/ui/skyway-components'

interface DroneStatus {
  id: string
  status: 'active' | 'idle' | 'maintenance' | 'charging'
  battery: number
  location: { lat: number; lng: number; address: string }
  currentJob?: string
  lastUpdate: string
}

interface Shipment {
  id: string
  status: 'pending' | 'assigned' | 'in_flight' | 'delivered'
  origin: string
  destination: string
  priority: 'high' | 'medium' | 'low'
  estimatedTime: string
  droneId?: string
  weight: number
}

const mockDrones: DroneStatus[] = [
  { id: 'SWD-447', status: 'active', battery: 78, location: { lat: -7.2575, lng: 112.7521, address: 'Jl. Raya Gubeng' }, currentJob: 'SKY2024-001', lastUpdate: '2 min ago' },
  { id: 'SWD-448', status: 'idle', battery: 95, location: { lat: -7.2504, lng: 112.7688, address: 'Hub Tunjungan' }, lastUpdate: '5 min ago' },
  { id: 'SWD-449', status: 'charging', battery: 45, location: { lat: -7.2574, lng: 112.7575, address: 'Hub Gubeng' }, lastUpdate: '1 min ago' },
  { id: 'SWD-450', status: 'maintenance', battery: 0, location: { lat: -7.2574, lng: 112.7575, address: 'Maintenance Bay' }, lastUpdate: '30 min ago' }
]

const mockShipments: Shipment[] = [
  { id: 'SKY2024-002', status: 'pending', origin: 'Tunjungan Plaza', destination: 'Pakuwon Mall', priority: 'high', estimatedTime: '15 min', weight: 1.2 },
  { id: 'SKY2024-003', status: 'pending', origin: 'Surabaya Town Square', destination: 'Galaxy Mall', priority: 'medium', estimatedTime: '18 min', weight: 0.8 },
  { id: 'SKY2024-004', status: 'assigned', origin: 'Royal Plaza', destination: 'Ciputra World', priority: 'low', estimatedTime: '22 min', weight: 2.1, droneId: 'SWD-448' },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedShipments, setSelectedShipments] = useState<string[]>([])

  const statusColors = {
    active: 'text-green-400 bg-green-400/20',
    idle: 'text-blue-400 bg-blue-400/20', 
    charging: 'text-yellow-400 bg-yellow-400/20',
    maintenance: 'text-red-400 bg-red-400/20',
    pending: 'text-orange-400 bg-orange-400/20',
    assigned: 'text-blue-400 bg-blue-400/20',
    in_flight: 'text-sky-gold bg-sky-gold/20',
    delivered: 'text-green-400 bg-green-400/20',
    high: 'text-red-400',
    medium: 'text-yellow-400',
    low: 'text-blue-400'
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'fleet', label: 'Fleet Status', icon: Plane },
    { id: 'shipments', label: 'Shipments', icon: Package },
    { id: 'planning', label: 'Flight Planning', icon: MapPin },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-navy via-sky-blue to-sky-navy pt-16">
      {/* Header */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">SkyWay Admin</h1>
              <p className="text-neutral-300">Branch Operations Dashboard</p>
            </div>
            <div className="flex items-center space-x-3">
              <BubbleButton variant="secondary" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </BubbleButton>
              <div className="w-8 h-8 bg-sky-gold rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-sky-navy" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <BubbleTabs
            tabs={tabs.map(tab => ({
              id: tab.id,
              label: tab.label,
              icon: tab.icon
            }))}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <BubbleCard className="p-6 bg-white/10 backdrop-blur-md border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">12</div>
                    <div className="text-neutral-300">Active Flights</div>
                  </div>
                  <Plane className="w-8 h-8 text-sky-gold" />
                </div>
              </BubbleCard>

              <BubbleCard className="p-6 bg-white/10 backdrop-blur-md border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">24</div>
                    <div className="text-neutral-300">Pending Orders</div>
                  </div>
                  <Package className="w-8 h-8 text-orange-400" />
                </div>
              </BubbleCard>

              <BubbleCard className="p-6 bg-white/10 backdrop-blur-md border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">8/12</div>
                    <div className="text-neutral-300">Available Drones</div>
                  </div>
                  <Battery className="w-8 h-8 text-green-400" />
                </div>
              </BubbleCard>

              <BubbleCard className="p-6 bg-white/10 backdrop-blur-md border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">98.5%</div>
                    <div className="text-neutral-300">On-Time Rate</div>
                  </div>
                  <BarChart3 className="w-8 h-8 text-blue-400" />
                </div>
              </BubbleCard>
            </div>

            {/* Live Fleet Map */}
            <BubbleCard className="p-6 bg-white/10 backdrop-blur-md border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Live Fleet Map</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-sm">Real-time</span>
                </div>
              </div>
              
              <div className="relative h-96 bg-gradient-to-br from-sky-blue/20 to-sky-gold/20 rounded-xl overflow-hidden">
                {/* Map Grid */}
                <div className="absolute inset-0 opacity-20">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="absolute inset-0 border-t border-white/10" style={{ top: `${i * 12.5}%` }} />
                  ))}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="absolute inset-0 border-l border-white/10" style={{ left: `${i * 8.33}%` }} />
                  ))}
                </div>

                {/* Drone Positions */}
                <motion.div
                  className="absolute w-6 h-6 text-green-400 flex items-center justify-center"
                  style={{ top: '20%', left: '30%' }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🚁
                </motion.div>
                
                <motion.div
                  className="absolute w-6 h-6 text-blue-400 flex items-center justify-center"
                  style={{ top: '60%', left: '70%' }}
                >
                  🚁
                </motion.div>

                <motion.div
                  className="absolute w-6 h-6 text-yellow-400 flex items-center justify-center"
                  style={{ top: '40%', left: '20%' }}
                >
                  🔋
                </motion.div>

                {/* Hubs */}
                <div className="absolute top-4 left-4 w-4 h-4 bg-sky-gold rounded-full" />
                <div className="absolute text-xs text-white bg-black/30 px-2 py-1 rounded" style={{ top: '2%', left: '8%' }}>
                  Hub Gubeng
                </div>

                <div className="absolute bottom-4 right-4 w-4 h-4 bg-sky-gold rounded-full" />
                <div className="absolute text-xs text-white bg-black/30 px-2 py-1 rounded" style={{ bottom: '2%', right: '8%' }}>
                  Hub Tunjungan
                </div>
              </div>
            </BubbleCard>
          </motion.div>
        )}

        {/* Fleet Status Tab */}
        {activeTab === 'fleet' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Fleet Status</h2>
              <BubbleButton variant="secondary" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </BubbleButton>
            </div>

            <div className="grid gap-4">
              {mockDrones.map((drone, index) => (
                <motion.div
                  key={drone.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <BubbleCard className="p-6 bg-white/10 backdrop-blur-md border-white/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-sky-gold/20 rounded-xl flex items-center justify-center">
                          <Plane className="w-6 h-6 text-sky-gold" />
                        </div>
                        <div>
                          <div className="text-white font-semibold">{drone.id}</div>
                          <div className="text-sm text-neutral-300">{drone.location.address}</div>
                          {drone.currentJob && (
                            <div className="text-sm text-sky-gold">Job: {drone.currentJob}</div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-white font-semibold">{drone.battery}%</div>
                          <div className="text-xs text-neutral-400">Battery</div>
                          <div className="w-12 h-2 bg-white/20 rounded-full mt-1">
                            <div 
                              className={`h-full rounded-full ${drone.battery > 50 ? 'bg-green-400' : drone.battery > 20 ? 'bg-yellow-400' : 'bg-red-400'}`}
                              style={{ width: `${drone.battery}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[drone.status]}`}>
                          {drone.status.replace('_', ' ').toUpperCase()}
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm text-neutral-400">Last Update</div>
                          <div className="text-sm text-white">{drone.lastUpdate}</div>
                        </div>
                      </div>
                    </div>
                  </BubbleCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Shipments Tab */}
        {activeTab === 'shipments' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Shipment Queue</h2>
              <div className="flex items-center space-x-3">
                <BubbleInput placeholder="Search shipments..." className="w-64" />
                <BubbleButton variant="secondary" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </BubbleButton>
                <BubbleButton size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Batch
                </BubbleButton>
              </div>
            </div>

            <div className="grid gap-4">
              {mockShipments.map((shipment, index) => (
                <motion.div
                  key={shipment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <BubbleCard className="p-6 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <input 
                          type="checkbox"
                          className="w-4 h-4 rounded border-white/30 text-sky-gold"
                          checked={selectedShipments.includes(shipment.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedShipments([...selectedShipments, shipment.id])
                            } else {
                              setSelectedShipments(selectedShipments.filter(id => id !== shipment.id))
                            }
                          }}
                        />
                        <div className="w-12 h-12 bg-package-orange/20 rounded-xl flex items-center justify-center">
                          <Package className="w-6 h-6 text-orange-400" />
                        </div>
                        <div>
                          <div className="text-white font-semibold">{shipment.id}</div>
                          <div className="text-sm text-neutral-300">{shipment.origin} → {shipment.destination}</div>
                          <div className="text-sm text-neutral-400">{shipment.weight}kg • EST: {shipment.estimatedTime}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className={`text-sm font-medium ${statusColors[shipment.priority]}`}>
                          {shipment.priority.toUpperCase()} PRIORITY
                        </div>
                        
                        {shipment.droneId && (
                          <div className="text-sm text-sky-gold">
                            Assigned: {shipment.droneId}
                          </div>
                        )}
                        
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[shipment.status]}`}>
                          {shipment.status.replace('_', ' ').toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </BubbleCard>
                </motion.div>
              ))}
            </div>

            {selectedShipments.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed bottom-6 left-1/2 transform -translate-x-1/2"
              >
                <BubbleCard className="p-4 bg-sky-gold text-sky-navy backdrop-blur-md">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">{selectedShipments.length} selected</span>
                    <BubbleButton variant="secondary" size="sm">
                      Assign to Flight
                    </BubbleButton>
                    <BubbleButton variant="secondary" size="sm">
                      Create Batch
                    </BubbleButton>
                  </div>
                </BubbleCard>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Flight Planning Tab */}
        {activeTab === 'planning' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-white">Flight Planning</h2>
            <BubbleCard className="p-8 bg-white/10 backdrop-blur-md border-white/20 text-center">
              <Calendar className="w-16 h-16 text-sky-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Flight Planning Module</h3>
              <p className="text-neutral-300 mb-4">Advanced flight planning with weather integration and route optimization</p>
              <BubbleButton>
                Launch Planning Tool
              </BubbleButton>
            </BubbleCard>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-white">Analytics & Reports</h2>
            <div className="grid lg:grid-cols-2 gap-6">
              <BubbleCard className="p-6 bg-white/10 backdrop-blur-md border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-neutral-300">On-time Delivery</span>
                    <span className="text-green-400 font-semibold">98.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-300">Fleet Utilization</span>
                    <span className="text-sky-gold font-semibold">87.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-300">CO₂ Saved</span>
                    <span className="text-blue-400 font-semibold">2.4 tons</span>
                  </div>
                </div>
              </BubbleCard>
              
              <BubbleCard className="p-6 bg-white/10 backdrop-blur-md border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Alerts</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-yellow-400/10 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <div>
                      <div className="text-white text-sm">Weather Warning</div>
                      <div className="text-neutral-400 text-xs">Strong winds expected 15:00-17:00</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-400/10 rounded-lg">
                    <Battery className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-white text-sm">SWD-449 Charging Complete</div>
                      <div className="text-neutral-400 text-xs">Battery at 100%, ready for dispatch</div>
                    </div>
                  </div>
                </div>
              </BubbleCard>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}