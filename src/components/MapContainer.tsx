'use client'

import React, { useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { RefreshCw, MapPin, Navigation, X, Zap, Settings, Bug } from 'lucide-react'
import { generateSafeRoute, calculateRouteDistance } from '@/lib/pathfinding'
import { calculateSimpleRoute, isRouteSafe } from '@/lib/simpleRoute'
import { calculateFakePSORoute } from '@/lib/fakePso'
import DebugWindow from './DebugWindow'
import { Point, Waypoint, BuildingFeature, RouteData, RoutePoint } from '@/types/route'
import { googleMapsService } from '@/lib/googleMapsService'
import * as turf from '@turf/turf'
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
  enablePSO?: boolean
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
  enableGoogleMaps = true,
  enablePSO = true // PSO default enabled
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
  const [psoProgress, setPsoProgress] = useState<{ iteration: number; bestFitness: number; maxIterations: number } | null>(null)
  const [showCreateRouteButton, setShowCreateRouteButton] = useState(false)
  const [debugWindowVisible, setDebugWindowVisible] = useState(false)
  const [hasCollisions, setHasCollisions] = useState(false)

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

  // Clear route and points
  const clearRoute = useCallback(() => {
    setStartPoint(null)
    setEndPoint(null)
    setRoute([])
    setHasCollisions(false)
    onPointSelected?.(null as any, 'start')
    onPointSelected?.(null as any, 'end')
  }, [onPointSelected])

  // Reset map
  const resetMap = useCallback(() => {
    clearRoute()
    window.location.reload()
  }, [clearRoute])

  // Handle map clicks
  const handleMapClick = useCallback((lat: number, lng: number) => {
    const clickedPoint: Point = { lat, lng }

    if (!startPoint) {
      setStartPoint(clickedPoint)
      onPointSelected?.(clickedPoint, 'start')
      setShowCreateRouteButton(false)
    } else if (!endPoint) {
      setEndPoint(clickedPoint)
      onPointSelected?.(clickedPoint, 'end')
      setShowCreateRouteButton(true) // Show create route button when both points are selected
    } else {
      // Reset and start new route
      clearRoute()
      setStartPoint(clickedPoint)
      onPointSelected?.(clickedPoint, 'start')
      setShowCreateRouteButton(false)
    }
  }, [startPoint, endPoint, onPointSelected, clearRoute])

  // Check for collisions in a route
  const checkRouteCollisions = useCallback((route: Point[], buildings: any[]): boolean => {
    for (let i = 0; i < route.length - 1; i++) {
      const segment = [route[i], route[i + 1]]
      for (const building of buildings) {
        const line = turf.lineString([[segment[0].lng, segment[0].lat], [segment[1].lng, segment[1].lat]])
        if (turf.booleanIntersects(line, building)) {
          return true
        }
      }
    }
    return false
  }, [])

  // Calculate safe route with PSO support
  const calculateRoute = useCallback(async (start: Point, end: Point) => {
    setIsCalculating(true)
    try {
      console.log('Calculating route from', start, 'to', end, 'PSO enabled:', enablePSO)
      
      let finalRoute = []
      let distance = 0
      let startAddress = `Lat: ${start.lat.toFixed(6)}, Lng: ${start.lng.toFixed(6)}`
      let endAddress = `Lat: ${end.lat.toFixed(6)}, Lng: ${end.lng.toFixed(6)}`
      
      // If PSO is disabled, create a straight line route
      if (!enablePSO) {
        console.log('PSO disabled - creating straight line route')
        finalRoute = [start, end]
        distance = calculateRouteDistance(finalRoute)
        console.log('Straight line route calculated:', { route: finalRoute, distance })
      } else {
        // PSO is enabled - use PSO optimization
        console.log('PSO enabled - using Fake PSO for fast obstacle avoidance')
        
        // Use Fake PSO for instant results without lag
        const fakePsoRoute = calculateFakePSORoute(start, end, buildings, 100)
        finalRoute = fakePsoRoute
        distance = calculateRouteDistance(finalRoute)
        console.log('Fake PSO route calculated:', { route: finalRoute, distance })
        
        // Check if route is safe
        const routeIsSafe = isRouteSafe(finalRoute, buildings, 100)
        console.log('Fake PSO route safety check:', { isSafe: routeIsSafe })
      }
      
      setRoute(finalRoute)
      
      // Check for collisions in the final route
      const routeHasCollisions = checkRouteCollisions(finalRoute, buildings)
      setHasCollisions(routeHasCollisions)
      
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
        isSafe: !routeHasCollisions,
        path: finalRoute.map((wp: any) => [wp.lat, wp.lng] as [number, number])
      }
      
      // Notify parent components
      onRouteCalculated?.(finalRoute, distance)
      onRouteSelect?.(routeData)
      
      console.log('Route calculated successfully:', { route: finalRoute, distance, routeData, hasCollisions: routeHasCollisions })
    } catch (error) {
      console.error('Error calculating route:', error)
    } finally {
      setIsCalculating(false)
      setPsoProgress(null) // Clear progress when done
    }
  }, [buildings, onRouteCalculated, onRouteSelect, enablePSO, checkRouteCollisions])

  // Handle create route button click
  const handleCreateRoute = useCallback(() => {
    if (startPoint && endPoint) {
      calculateRoute(startPoint, endPoint)
      setShowCreateRouteButton(false)
    }
  }, [startPoint, endPoint, calculateRoute])

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

  // Return container with map and debug window below
  return (
    <div className="flex flex-col w-full h-full">
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
            <React.Fragment key={index}>
              {/* Building itself */}
              <Polygon
                positions={building.geometry.coordinates[0].map(coord => [coord[1], coord[0]] as [number, number])}
                pathOptions={{
                  color: '#ff0000',
                  fillColor: '#ff0000',
                  fillOpacity: 0.3,
                  weight: 2
                }}
              />
              {/* 100m safety buffer around building */}
              {(() => {
                const buffered = turf.buffer(building, 0.1, { units: 'kilometers' });
                if (buffered && buffered.geometry && buffered.geometry.coordinates && buffered.geometry.coordinates[0]) {
                  return (
                    <Polygon
                      positions={buffered.geometry.coordinates[0].map(coord => [coord[1], coord[0]] as [number, number])}
                      pathOptions={{
                        color: '#ff9900',
                        fillColor: '#ff9900',
                        fillOpacity: 0.1,
                        weight: 1,
                        dashArray: '5, 5'
                      }}
                    />
                  );
                }
                return null;
              })()}
            </React.Fragment>
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
          <button
            className="w-10 h-10 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg flex items-center justify-center text-gray-700 hover:bg-white transition-colors shadow-lg"
            onClick={() => setDebugWindowVisible(!debugWindowVisible)}
            title="Toggle Debug Window"
          >
            <Bug className="w-4 h-4" />
          </button>
        </div>

        {/* Create Route Button - Appears when both points are selected */}
        {showCreateRouteButton && startPoint && endPoint && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-[1000]">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              onClick={handleCreateRoute}
              disabled={isCalculating}
            >
              {isCalculating ? (
                <>
                  <motion.div
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Calculating Route...
                </>
              ) : (
                <>
                  <Navigation className="w-4 h-4" />
                  Create Route
                </>
              )}
            </motion.button>
          </div>
        )}
        
        {/* Instructions Panel - Smaller and positioned to not interfere */}
        <div className="absolute top-4 right-4 z-[1000] bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-3 shadow-lg max-w-[200px]">
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
            <MapPin className="w-3 h-3 mr-1" />
            How to Use
          </h3>
          <div className="text-xs text-gray-600 space-y-1">
            <p>1. Click map for START</p>
            <p>2. Click again for END</p>
            <p>3. Click &quot;Create Route&quot;</p>
            <p>4. Red = no-fly zones</p>
          </div>
          
          <div className="mt-2 p-1 bg-blue-50 border border-blue-200 rounded text-xs">
            <p className="text-blue-800 font-medium flex items-center">
              <Navigation className="w-3 h-3 mr-1" />
              {enablePSO ? 'Fast PSO Active' : 'Direct Route Active'}
            </p>
            <p className="text-blue-600">{enablePSO ? 'Smart obstacle avoidance' : 'Straight line path'}</p>
          </div>
          
          {showCreateRouteButton && (
            <div className="mt-2 p-1 bg-blue-50 border border-blue-200 rounded text-xs">
              <p className="text-blue-800 font-medium">
                📍 Points selected!
              </p>
              <p className="text-blue-600">Click &quot;Create Route&quot;</p>
            </div>
          )}
          
          {isCalculating && enablePSO && (
            <div className="mt-2 flex items-center text-purple-600">
              <motion.div
                className="w-3 h-3 border-2 border-purple-600 border-t-transparent rounded-full mr-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5, repeat: 2, ease: "linear" }}
              />
              <span className="text-xs">
                Fast PSO Optimizing...
              </span>
            </div>
          )}
          
          {isCalculating && !enablePSO && (
            <div className="mt-2 flex items-center text-blue-600">
              <motion.div
                className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full mr-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5, repeat: 2, ease: "linear" }}
              />
              <span className="text-xs">
                Calculating Direct Route...
              </span>
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
              <div className="w-3 h-0.5 mr-1 bg-blue-500"></div>
              <span>{enablePSO ? 'Smart Route' : 'Direct Route'}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 opacity-30 border border-red-500 mr-1"></div>
              <span>Building</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-400 opacity-20 border border-orange-400 mr-1"></div>
              <span>100m Buffer</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
              <span>{enablePSO ? 'PSO Active' : 'PSO Off'}</span>
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

      {/* Waypoint JSON Container - Below Map */}
      <div className="mt-4 w-full">
        <DebugWindow
          route={route}
          isVisible={debugWindowVisible}
          onToggle={() => setDebugWindowVisible(!debugWindowVisible)}
          isBelowMap={true}
        />
      </div>
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