
'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plane, Battery, MapPin, Activity, Clock, Signal,
  Navigation, Zap, Target, Plus, X
} from 'lucide-react'
import { BubbleCard } from './skyway-components'
import 'leaflet/dist/leaflet.css'

// Dynamically import MapContainer to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)
const Polyline = dynamic(
  () => import('react-leaflet').then((mod) => mod.Polyline),
  { ssr: false }
)

interface DroneMapData {
  id: string
  name: string
  position: { lat: number; lng: number }
  status: 'active' | 'idle' | 'charging' | 'maintenance'
  battery: number
  altitude: number
  speed: number
  route: { lat: number; lng: number; timestamp: string }[]
  destination?: { lat: number; lng: number; name: string } | null
}

interface LiveMapProps {
  drones: DroneMapData[]
  selectedDrone: string | null
  onDroneSelect: (droneId: string | null) => void
  center?: [number, number]
  zoom?: number
}

// Custom drone icon component
const DroneIcon = ({ drone, isSelected }: { drone: DroneMapData, isSelected: boolean }) => {
  const statusColors = {
    active: 'from-emerald-400 to-cyan-400',
    idle: 'from-amber-400 to-orange-400', 
    charging: 'from-blue-400 to-indigo-400',
    maintenance: 'from-red-400 to-pink-400'
  }

  return (
    <motion.div
      className={`relative w-10 h-10 rounded-full bg-gradient-to-br ${statusColors[drone.status]} 
        shadow-lg flex items-center justify-center cursor-pointer
        ${isSelected ? 'ring-4 ring-sky-gold/50 ring-offset-2 ring-offset-slate-800' : ''}`}
      animate={{
        scale: isSelected ? 1.2 : 1,
        boxShadow: isSelected 
          ? '0 0 0 4px rgba(255, 215, 0, 0.3), 0 8px 16px -4px rgba(0, 0, 0, 0.4)'
          : '0 4px 8px -2px rgba(0, 0, 0, 0.3)'
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Plane className="w-5 h-5 text-white drop-shadow-sm" />
      
      {/* Battery indicator */}
      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-slate-800 flex items-center justify-center">
        <div className={`w-2 h-2 rounded-full ${
          drone.battery > 60 ? 'bg-green-400' :
          drone.battery > 30 ? 'bg-amber-400' : 'bg-red-400'
        }`} />
      </div>
      
      {/* Status pulse for active drones */}
      {drone.status === 'active' && (
        <motion.div
          className="absolute inset-0 rounded-full bg-emerald-400"
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.6, 0, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  )
}

// Drone info popup component
const DroneInfoPopup = ({ drone }: { drone: DroneMapData }) => {
  const statusColors = {
    active: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    idle: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    charging: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    maintenance: 'bg-red-500/20 text-red-300 border-red-500/30'
  }

  return (
    <div className="bg-slate-900/95 backdrop-blur-sm border border-sky-gold/30 rounded-xl p-4 min-w-72 shadow-2xl">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-sky-gold text-lg">{drone.name}</h4>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[drone.status]}`}>
            {drone.status.toUpperCase()}
          </span>
        </div>
        
        {/* Drone Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sky-100/70 flex items-center gap-1">
                <Target className="w-3 h-3" />
                ID:
              </span>
              <span className="text-white font-mono">{drone.id}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sky-100/70 flex items-center gap-1">
                <Battery className="w-3 h-3" />
                Battery:
              </span>
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${
                  drone.battery > 60 ? 'bg-green-400' :
                  drone.battery > 30 ? 'bg-amber-400' : 'bg-red-400'
                }`} />
                <span className="text-white">{drone.battery}%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sky-100/70 flex items-center gap-1">
                <Navigation className="w-3 h-3" />
                Altitude:
              </span>
              <span className="text-white">{drone.altitude}m</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sky-100/70 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Speed:
              </span>
              <span className="text-white">{drone.speed} km/h</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sky-100/70 flex items-center gap-1">
                <Signal className="w-3 h-3" />
                Signal:
              </span>
              <span className="text-white">Strong</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sky-100/70 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Updated:
              </span>
              <span className="text-white">2m ago</span>
            </div>
          </div>
        </div>
        
        {/* Destination */}
        {drone.destination && (
          <div className="pt-2 border-t border-sky-gold/20">
            <div className="flex items-center justify-between">
              <span className="text-sky-100/70 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Destination:
              </span>
              <span className="text-white text-sm">{drone.destination.name}</span>
            </div>
          </div>
        )}

        {/* Flight Path */}
        {drone.route.length > 1 && (
          <div className="pt-2 border-t border-sky-gold/20">
            <div className="text-xs text-sky-100/70 mb-2 flex items-center gap-1">
              <Activity className="w-3 h-3" />
              Recent Path:
            </div>
            <div className="flex gap-1 overflow-x-auto">
              {drone.route.slice(-4).map((point, idx) => (
                <div key={idx} className="flex-shrink-0 bg-slate-700/50 rounded-lg px-2 py-1">
                  <div className="text-xs text-white">{point.timestamp}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const LiveMap: React.FC<LiveMapProps> = ({ 
  drones, 
  selectedDrone, 
  onDroneSelect,
  center = [-7.2575, 112.7521], // Default to Surabaya
  zoom = 13 
}) => {
  const [mapReady, setMapReady] = useState(false)
  const [L, setL] = useState<any>(null)

  useEffect(() => {
    // Import Leaflet on client side only
    import('leaflet').then((leaflet) => {
      setL(leaflet.default)
      setMapReady(true)
      
      // Fix default marker icons
      delete (leaflet.default.Icon.Default.prototype as any)._getIconUrl
      leaflet.default.Icon.Default.mergeOptions({
        iconRetinaUrl: '/leaflet/marker-icon-2x.png',
        iconUrl: '/leaflet/marker-icon.png',
        shadowUrl: '/leaflet/marker-shadow.png',
      })
    })
  }, [])

  // Create custom drone icon
  const createDroneIcon = (drone: DroneMapData, isSelected: boolean) => {
    if (!L) return null
    
    const statusColors = {
      active: '#10b981', // emerald-500
      idle: '#f59e0b',   // amber-500
      charging: '#3b82f6', // blue-500
      maintenance: '#ef4444' // red-500
    }
    
    const ringClass = isSelected ? 'ring-4 ring-yellow-400 ring-opacity-60' : ''
    
    return L.divIcon({
      className: 'custom-drone-marker',
      html: `
        <div class="relative w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-xl transform transition-all duration-200 hover:scale-110 ${ringClass}"
          style="background: linear-gradient(135deg, ${statusColors[drone.status]}, ${statusColors[drone.status]}dd); border: 2px solid rgba(255,255,255,0.3);">
          <svg class="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
          </svg>
          
          <!-- Battery Indicator -->
          <div class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-slate-900 border border-white flex items-center justify-center">
            <div class="w-2 h-2 rounded-full" style="background-color: ${
              drone.battery > 60 ? '#10b981' :
              drone.battery > 30 ? '#f59e0b' : '#ef4444'
            }"></div>
          </div>
          
          <!-- Drone ID Label -->
          <div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded-md border border-gray-600 whitespace-nowrap font-mono">
            ${drone.id}
          </div>
          
          ${drone.status === 'active' ? `
            <div class="absolute inset-0 rounded-full animate-ping" style="background-color: ${statusColors[drone.status]}; opacity: 0.3;"></div>
          ` : ''}
        </div>
      `,
      iconSize: [48, 48],
      iconAnchor: [24, 24],
      popupAnchor: [0, -24]
    })
  }

  if (!mapReady) {
    return (
      <div className="relative h-full min-h-[320px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-sky-gold/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              className="w-12 h-12 border-4 border-sky-gold border-t-transparent rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-white text-lg">Loading Live Map...</p>
            <p className="text-sky-100/70 text-sm mt-2">Initializing drone tracking system</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden border border-sky-gold/20">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        scrollWheelZoom={true}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Render drones */}
        {drones.map((drone) => {
          const isSelected = selectedDrone === drone.id
          const icon = createDroneIcon(drone, isSelected)
          
          return (
            <React.Fragment key={drone.id}>
              {/* Drone marker */}
              <Marker
                position={[drone.position.lat, drone.position.lng]}
                icon={icon}
                eventHandlers={{
                  click: () => onDroneSelect(isSelected ? null : drone.id),
                }}
              >
                <Popup
                  closeButton={false}
                  className="custom-popup"
                >
                  <DroneInfoPopup drone={drone} />
                </Popup>
              </Marker>
              
              {/* Flight route - show when drone is selected or active */}
              {drone.route.length > 1 && (isSelected || drone.status === 'active') && (
                <Polyline
                  positions={drone.route.map(point => [point.lat, point.lng] as [number, number])}
                  pathOptions={{
                    color: isSelected ? '#ffd700' : '#10b981',
                    weight: isSelected ? 4 : 3,
                    opacity: isSelected ? 1 : 0.7,
                    dashArray: isSelected ? '5, 10' : '10, 10'
                  }}
                />
              )}
              
              {/* Destination marker - show when drone is selected */}
              {drone.destination && isSelected && (
                <Marker
                  position={[drone.destination.lat, drone.destination.lng]}
                  icon={L.divIcon({
                    className: 'destination-marker',
                    html: `
                      <div class="relative">
                        <div class="w-8 h-8 bg-red-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center animate-bounce">
                          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                          </svg>
                        </div>
                        <div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                          ${drone.destination.name}
                        </div>
                      </div>
                    `,
                    iconSize: [32, 32],
                    iconAnchor: [16, 16]
                  })}
                />
              )}
            </React.Fragment>
          )
        })}
      </MapContainer>
      
      {/* Custom Map Controls */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <button 
          className="w-10 h-10 bg-slate-800/90 backdrop-blur-sm border border-sky-gold/30 rounded-xl flex items-center justify-center text-white hover:bg-slate-700/90 transition-colors"
          onClick={() => {/* Zoom in logic */}}
        >
          <Plus className="w-5 h-5" />
        </button>
        <button 
          className="w-10 h-10 bg-slate-800/90 backdrop-blur-sm border border-sky-gold/30 rounded-xl flex items-center justify-center text-white hover:bg-slate-700/90 transition-colors"
          onClick={() => {/* Reset view logic */}}
        >
          <Target className="w-5 h-5" />
        </button>
      </div>
      
      {/* Live Status Indicator */}
      <div className="absolute top-4 left-4 z-[1000]">
        <div className="flex items-center gap-3 bg-slate-800/95 backdrop-blur-sm border border-sky-gold/30 rounded-xl px-4 py-2">
          <motion.div
            className="w-3 h-3 bg-green-400 rounded-full"
            animate={{
              opacity: [1, 0.3, 1],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span className="text-green-400 text-sm font-semibold">LIVE TRACKING</span>
          <span className="text-white text-xs">
            {drones.filter(d => d.status === 'active').length} Active
          </span>
        </div>
      </div>
      
      {/* Selected Drone Info Panel */}
      <AnimatePresence>
        {selectedDrone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 right-4 z-[1000]"
          >
            {(() => {
              const drone = drones.find(d => d.id === selectedDrone)
              if (!drone) return null
              
              return (
                <BubbleCard className="p-4 bg-slate-800/95 backdrop-blur-lg border-sky-gold/30">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sky-gold font-bold text-lg">{drone.name}</h4>
                    <button
                      onClick={() => onDroneSelect(null)}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-sky-400" />
                      <div>
                        <p className="text-sky-100/70">ID</p>
                        <p className="text-white font-mono">{drone.id}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Battery className={`w-4 h-4 ${
                        drone.battery > 60 ? 'text-green-400' :
                        drone.battery > 30 ? 'text-amber-400' : 'text-red-400'
                      }`} />
                      <div>
                        <p className="text-sky-100/70">Battery</p>
                        <p className="text-white">{drone.battery}%</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Navigation className="w-4 h-4 text-blue-400" />
                      <div>
                        <p className="text-sky-100/70">Altitude</p>
                        <p className="text-white">{drone.altitude}m</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-purple-400" />
                      <div>
                        <p className="text-sky-100/70">Speed</p>
                        <p className="text-white">{drone.speed} km/h</p>
                      </div>
                    </div>
                  </div>
                  
                  {drone.destination && (
                    <div className="mt-3 pt-3 border-t border-sky-gold/20">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-400" />
                        <div>
                          <p className="text-sky-100/70">Destination</p>
                          <p className="text-white">{drone.destination.name}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </BubbleCard>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LiveMap
