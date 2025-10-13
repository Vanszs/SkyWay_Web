'use client'

import React, { useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { RefreshCw, MapPin, Navigation, X } from 'lucide-react'
import { generateSafeRoute, calculateRouteDistance } from '@/lib/pathfinding'
import { Point, Waypoint, BuildingFeature, RouteData, RoutePoint } from '@/types/route'
import { googleMapsService } from '@/lib/googleMapsService'
import 'leaflet/dist/leaflet.css'

// Dynamically import Leaflet components to avoid SSR issues
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
const Polyline = dynamic(
  () => import('react-leaflet').then((mod) => mod.Polyline),
  { ssr: false }
)
const Polygon = dynamic(
  () => import('react-leaflet').then((mod) => mod.Polygon),
  { ssr: false }
)

interface RouteMapProps {
  onRouteCalculated?: (route: Waypoint[], distance: number) => void
  onPointSelected?: (point: Point, type: 'start' | 'end') => void
  onRouteSelect?: (route: RouteData) => void
  initialCenter?: [number, number]
  initialZoom?: number
  enableGoogleMaps?: boolean
}

// Map click handler component
const MapEvents: React.FC<{
  onMapClick: (lat: number, lng: number) => void
}> = ({ onMapClick }) => {
  const [EventsComponent, setEventsComponent] = useState<any>(null)
  
  useEffect(() => {
    import('react-leaflet').then((mod) => {
      const { useMapEvents } = mod
      const EventsHandler = () => {
        useMapEvents({
          click: (e: any) => {
            onMapClick(e.latlng.lat, e.latlng.lng)
          },
        })
        return null
      }
      setEventsComponent(() => EventsHandler)
    })
  }, [onMapClick])
  
  if (!EventsComponent) return null
  return <EventsComponent />
}

export const RouteMapContainer: React.FC<RouteMapProps> = ({
  onRouteCalculated,
  onPointSelected,
  onRouteSelect,
  initialCenter = [-7.2575, 112.7521], // Default to Surabaya
  initialZoom = 13,
  enableGoogleMaps = true
}) => {
  const [mapReady, setMapReady] = useState(false)
  const [L, setL] = useState<any>(null)
  const [startPoint, setStartPoint] = useState<Point | null>(null)
  const [endPoint, setEndPoint] = useState<Point | null>(null)
  const [route, setRoute] = useState<Waypoint[]>([])
  const [isCalculating, setIsCalculating] = useState(false)
  const [buildings, setBuildings] = useState<BuildingFeature[]>([])
  const [elevationData, setElevationData] = useState<any[]>([])
  const [googleMapsEnabled, setGoogleMapsEnabled] = useState(enableGoogleMaps)

  // Load building data
  useEffect(() => {
    console.log('Loading building data...')
    fetch('/data/gedung.geojson')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        console.log('Building data loaded:', data.features?.length || 0, 'buildings')
        setBuildings(data.features || [])
      })
      .catch(error => {
        console.error('Error loading building data:', error)
        // Continue without buildings if loading fails
        setBuildings([])
      })
  }, [])

  useEffect(() => {
    // Import Leaflet on client side only
    import('leaflet').then((leaflet) => {
      console.log('Leaflet loaded successfully')
      setL(leaflet.default)
      setMapReady(true)
      
      // Fix default marker icons
      delete (leaflet.default.Icon.Default.prototype as any)._getIconUrl
      leaflet.default.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      })
    }).catch(error => {
      console.error('Error loading Leaflet:', error)
    })
  }, [])

  // Create custom icons for start and end points
  const createStartIcon = useCallback(() => {
    if (!L) return null
    return L.divIcon({
      className: 'custom-start-marker',
      html: `
        <div class="relative">
          <div class="w-8 h-8 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
            <div class="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap font-semibold">
            START
          </div>
        </div>
      `,
      iconSize: [32, 40],
      iconAnchor: [16, 40],
      popupAnchor: [0, -40]
    })
  }, [L])

  const createEndIcon = useCallback(() => {
    if (!L) return null
    return L.divIcon({
      className: 'custom-end-marker',
      html: `
        <div class="relative">
          <div class="w-8 h-8 bg-orange-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
            <div class="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap font-semibold">
            END
          </div>
        </div>
      `,
      iconSize: [32, 40],
      iconAnchor: [16, 40],
      popupAnchor: [0, -40]
    })
  }, [L])

  // Handle map clicks
  const handleMapClick = useCallback((lat: number, lng: number) => {
    const clickedPoint: Point = { lat, lng }

    if (!startPoint) {
      setStartPoint(clickedPoint)
      onPointSelected?.(clickedPoint, 'start')
    } else if (!endPoint) {
      setEndPoint(clickedPoint)
      onPointSelected?.(clickedPoint, 'end')
      
      // Calculate route when both points are selected
      calculateRoute(startPoint, clickedPoint)
    } else {
      // Reset and start new route
      clearRoute()
      setStartPoint(clickedPoint)
      onPointSelected?.(clickedPoint, 'start')
    }
  }, [startPoint, endPoint, onPointSelected])

  // Calculate safe route
  const calculateRoute = useCallback(async (start: Point, end: Point) => {
    setIsCalculating(true)
    try {
      console.log('Calculating route from', start, 'to', end)
      
      let finalRoute = []
      let distance = 0
      let startAddress = `Lat: ${start.lat.toFixed(6)}, Lng: ${start.lng.toFixed(6)}`
      let endAddress = `Lat: ${end.lat.toFixed(6)}, Lng: ${end.lng.toFixed(6)}`
      
      // Try to use Google Maps if enabled
      if (googleMapsEnabled) {
        try {
          const googleRouteData = await googleMapsService.getDroneOptimizedRoute(
            { lat: start.lat, lng: start.lng },
            { lat: end.lat, lng: end.lng }
          )
          
          // Convert Google Maps route to our format
          const decodedPath = googleRouteData.route.legs[0].steps.flatMap(step =>
            decodePolyline(step.polyline.encodedPolyline)
          )
          
          finalRoute = decodedPath.map(point => ({ lat: point.lat, lng: point.lng }))
          distance = googleRouteData.route.distanceMeters / 1000 // Convert to km
          startAddress = googleRouteData.addresses.origin
          endAddress = googleRouteData.addresses.destination
          
          // Store elevation data for visualization
          setElevationData(googleRouteData.terrainAnalysis.elevationProfile)
          
          console.log('Google Maps route calculated:', { googleRouteData })
        } catch (googleError) {
          console.warn('Google Maps routing failed, falling back to local pathfinding:', googleError)
          
          // Fallback to local pathfinding
          const safeRoute = generateSafeRoute(start, end, buildings, {
            bufferDistance: 0.0001, // ~10m buffer
            gridSize: 0.0002 // ~20m grid
          })
          
          finalRoute = safeRoute
          distance = calculateRouteDistance(safeRoute)
        }
      } else {
        // Use local pathfinding
        const safeRoute = generateSafeRoute(start, end, buildings, {
          bufferDistance: 0.0001, // ~10m buffer
          gridSize: 0.0002 // ~20m grid
        })
        
        finalRoute = safeRoute
        distance = calculateRouteDistance(safeRoute)
      }
      
      setRoute(finalRoute)
      
      // Create RouteData object
      const routeData: RouteData = {
        start: {
          lat: start.lat,
          lng: start.lng,
          address: startAddress
        },
        end: {
          lat: end.lat,
          lng: end.lng,
          address: endAddress
        },
        waypoints: finalRoute,
        distance: distance,
        estimatedDuration: Math.ceil(distance * 2), // Rough estimate: 2 minutes per km
        isSafe: true, // Assuming the calculated route is safe
        path: finalRoute.map(wp => [wp.lat, wp.lng] as [number, number])
      }
      
      // Notify parent components
      onRouteCalculated?.(finalRoute, distance)
      onRouteSelect?.(routeData)
      
      console.log('Route calculated successfully:', { route: finalRoute, distance, routeData })
    } catch (error) {
      console.error('Error calculating route:', error)
    } finally {
      setIsCalculating(false)
    }
  }, [buildings, onRouteCalculated, onRouteSelect, googleMapsEnabled])

  // Clear route and points
  const clearRoute = useCallback(() => {
    setStartPoint(null)
    setEndPoint(null)
    setRoute([])
    onPointSelected?.(null as any, 'start')
    onPointSelected?.(null as any, 'end')
  }, [onPointSelected])

  // Reset map
  const resetMap = useCallback(() => {
    clearRoute()
    window.location.reload()
  }, [clearRoute])

  if (!mapReady) {
    return (
      <div className="relative h-full min-h-[400px] rounded-xl overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 border border-gray-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              className="w-12 h-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-white text-lg font-semibold">Loading Route Map...</p>
            <p className="text-blue-100 text-sm mt-2">Initializing drone route planning system</p>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-150"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden border border-gray-200" style={{ minHeight: '500px' }}>
      <MapContainer
        center={initialCenter}
        zoom={initialZoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        scrollWheelZoom={true}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <MapEvents onMapClick={handleMapClick} />
        
        {/* Render buildings as no-fly zones */}
        {buildings.map((building, index) => (
          <Polygon
            key={index}
            positions={building.geometry.coordinates[0].map(coord => [coord[1], coord[0]] as [number, number])}
            pathOptions={{
              color: '#ff0000',
              fillColor: '#ff0000',
              fillOpacity: 0.3,
              weight: 2
            }}
          />
        ))}
        
        {/* Start point marker */}
        {startPoint && (
          <Marker
            position={[startPoint.lat, startPoint.lng]}
            icon={createStartIcon()}
          />
        )}
        
        {/* End point marker */}
        {endPoint && (
          <Marker
            position={[endPoint.lat, endPoint.lng]}
            icon={createEndIcon()}
          />
        )}
        
        {/* Route polyline */}
        {route.length > 1 && (
          <Polyline
            positions={route.map(point => [point.lat, point.lng] as [number, number])}
            pathOptions={{
              color: '#0066ff',
              weight: 4,
              opacity: 0.8,
              dashArray: '10, 5'
            }}
          />
        )}
      </MapContainer>
      
      {/* Map Controls - Moved to top right to avoid interference */}
      <div className="absolute top-4 right-16 z-[1000] flex flex-col gap-2">
        <button
          className="w-10 h-10 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg flex items-center justify-center text-gray-700 hover:bg-white transition-colors shadow-lg"
          onClick={clearRoute}
          title="Clear Route"
        >
          <X className="w-4 h-4" />
        </button>
        <button
          className="w-10 h-10 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg flex items-center justify-center text-gray-700 hover:bg-white transition-colors shadow-lg"
          onClick={resetMap}
          title="Reset Map"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
      
      {/* Instructions Panel - Smaller and positioned to not interfere */}
      <div className="absolute top-4 right-4 z-[1000] bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-3 shadow-lg max-w-[180px]">
        <h3 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
          <MapPin className="w-3 h-3 mr-1" />
          How to Use
        </h3>
        <div className="text-xs text-gray-600 space-y-1">
          <p>1. Click map for START</p>
          <p>2. Click again for END</p>
          <p>3. Route auto-calculates</p>
          <p>4. Red = no-fly zones</p>
        </div>
        
        {isCalculating && (
          <div className="mt-2 flex items-center text-blue-600">
            <motion.div
              className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full mr-1"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span className="text-xs">Calculating...</span>
          </div>
        )}
        
        {route.length > 0 && (
          <div className="mt-2 p-1 bg-green-50 border border-green-200 rounded text-xs">
            <p className="text-green-800 font-medium">
              ✓ Route ready!
            </p>
            <p className="text-green-600">
              {calculateRouteDistance(route).toFixed(2)} km
            </p>
          </div>
        )}
      </div>
      
      {/* Legend - Smaller and positioned at bottom left */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-2 shadow-lg">
        <h4 className="font-semibold text-gray-900 mb-1 text-xs">Legend</h4>
        <div className="grid grid-cols-2 gap-1 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
            <span>Start</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-1"></div>
            <span>End</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-0.5 bg-blue-500 mr-1"></div>
            <span>Route</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 opacity-30 border border-red-500 mr-1"></div>
            <span>No-Fly</span>
          </div>
        </div>
      </div>
      
      {/* Elevation Profile (if available) - Positioned at bottom right */}
      {elevationData.length > 0 && (
        <div className="absolute bottom-4 right-16 z-[1000] bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-2 shadow-lg">
          <h4 className="font-semibold text-gray-900 mb-1 text-xs">Elevation</h4>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Max:</span>
              <span className="font-medium">{Math.max(...elevationData.map((e: any) => e.elevation)).toFixed(1)}m</span>
            </div>
            <div className="flex justify-between">
              <span>Min:</span>
              <span className="font-medium">{Math.min(...elevationData.map((e: any) => e.elevation)).toFixed(1)}m</span>
            </div>
            <div className="flex justify-between">
              <span>Change:</span>
              <span className="font-medium">
                {(Math.max(...elevationData.map((e: any) => e.elevation)) -
                  Math.min(...elevationData.map((e: any) => e.elevation))).toFixed(1)}m
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Helper function to decode Google Maps polyline
function decodePolyline(encoded: string): { lat: number; lng: number }[] {
  const points: { lat: number; lng: number }[] = []
  let index = 0
  const len = encoded.length
  let lat = 0
  let lng = 0

  while (index < len) {
    let shift = 0
    let result = 0
    let b: number

    do {
      b = encoded.charCodeAt(index++) - 63
      result |= (b & 0x1f) << shift
      shift += 5
    } while (b >= 0x20)

    lat += ((result & 1) ? ~(result >> 1) : (result >> 1))

    shift = 0
    result = 0

    do {
      b = encoded.charCodeAt(index++) - 63
      result |= (b & 0x1f) << shift
      shift += 5
    } while (b >= 0x20)

    lng += ((result & 1) ? ~(result >> 1) : (result >> 1))

    points.push({
      lat: lat / 1e5,
      lng: lng / 1e5
    })
  }

  return points
}

export default RouteMapContainer