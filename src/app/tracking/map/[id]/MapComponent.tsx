'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in React Leaflet v4
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  })
}

interface MapComponentProps {
  currentLocation: { lat: number; lng: number; address: string }
  destination: { lat: number; lng: number; address: string }
  dronePosition: { lat: number; lng: number }
  droneId: string
  status: string
}

const MapComponent: React.FC<MapComponentProps> = ({
  currentLocation,
  destination,
  dronePosition,
  droneId,
  status
}) => {

  // Custom drone icon with hover effect
  const droneIcon = L.divIcon({
    html: `
      <div class="drone-marker">
        <div class="drone-icon">🚁</div>
        <div class="drone-label">${droneId}</div>
      </div>
    `,
    className: 'custom-drone-marker',
    iconSize: [40, 60],
    iconAnchor: [20, 50]
  })

  // Custom pickup icon
  const pickupIcon = L.divIcon({
    html: `
      <div class="pickup-marker">
        <div class="pickup-icon">📦</div>
      </div>
    `,
    className: 'custom-pickup-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  })

  // Custom destination icon
  const destinationIcon = L.divIcon({
    html: `
      <div class="destination-marker">
        <div class="destination-icon">🏁</div>
      </div>
    `,
    className: 'custom-destination-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  })

  // Route coordinates
  const routeCoords: [number, number][] = [
    [currentLocation.lat, currentLocation.lng],
    [dronePosition.lat, dronePosition.lng],
    [destination.lat, destination.lng]
  ]

  const center: [number, number] = [
    (currentLocation.lat + destination.lat) / 2,
    (currentLocation.lng + destination.lng) / 2
  ]

  useEffect(() => {
    // Add custom CSS for markers with hover effects
    const style = document.createElement('style')
    style.textContent = `
      .drone-marker {
        display: flex;
        flex-direction: column;
        align-items: center;
        filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
        cursor: pointer;
        transition: all 0.3s ease;
      }
      .drone-icon {
        font-size: 24px;
        animation: bounce 2s infinite;
        background: rgba(224, 164, 88, 0.2);
        border-radius: 50%;
        padding: 4px;
        border: 2px solid #E0A458;
        transition: all 0.3s ease;
      }
      .drone-label {
        background: #E0A458;
        color: #0D1B2A;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 10px;
        font-weight: bold;
        margin-top: 4px;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-5px);
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        white-space: nowrap;
      }
      .drone-marker:hover .drone-label {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      .drone-marker:hover .drone-icon {
        transform: scale(1.1);
        background: rgba(224, 164, 88, 0.4);
        border-color: #E0A458;
        box-shadow: 0 0 15px rgba(224, 164, 88, 0.6);
      }
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
      }
      .drone-marker:hover .drone-icon {
        animation-play-state: paused;
      }
      .pickup-marker, .destination-marker {
        display: flex;
        align-items: center;
        justify-content: center;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
      }
      .pickup-icon, .destination-icon {
        font-size: 20px;
        background: rgba(255,255,255,0.9);
        border-radius: 50%;
        padding: 4px;
        border: 2px solid #10B981;
        transition: all 0.3s ease;
      }
      .destination-icon {
        border-color: #F97316;
      }
      .pickup-marker:hover .pickup-icon,
      .destination-marker:hover .destination-icon {
        transform: scale(1.1);
        box-shadow: 0 0 10px rgba(255,255,255,0.5);
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Add error handling for map initialization
  try {
    return (
      <div className="h-full w-full relative">
        <MapContainer
          center={center}
          zoom={13}
          className="h-full w-full rounded-xl"
        >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Route Line */}
        <Polyline
          positions={routeCoords}
          color="#E0A458"
          weight={4}
          opacity={0.8}
          dashArray="10, 5"
        />
        
        {/* Pickup Location */}
        <Marker position={[currentLocation.lat, currentLocation.lng]} icon={pickupIcon}>
          <Popup>
            <div className="text-center">
              <strong>Pickup Location</strong><br />
              {currentLocation.address}
            </div>
          </Popup>
        </Marker>
        
        {/* Destination */}
        <Marker position={[destination.lat, destination.lng]} icon={destinationIcon}>
          <Popup>
            <div className="text-center">
              <strong>Destination</strong><br />
              {destination.address}
            </div>
          </Popup>
        </Marker>
        
        {/* Drone Position */}
        <Marker position={[dronePosition.lat, dronePosition.lng]} icon={droneIcon}>
          <Popup>
            <div className="text-center">
              <strong>Drone {droneId}</strong><br />
              Status: <span className="capitalize">{status.replace('_', ' ')}</span><br />
              <small>Live position tracking</small>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      

    </div>
    )
  } catch (error) {
    // Fallback UI if map fails to load
    return (
      <div className="h-full w-full bg-gradient-to-br from-sky-blue/20 to-sky-gold/20 rounded-xl flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-2xl">🗺️</div>
          <div className="text-white">
            <div className="font-medium mb-2">Interactive Map Loading...</div>
            <div className="text-sm text-neutral-300">
              Drone {droneId} • Status: {status.replace('_', ' ')}
            </div>
            <div className="text-xs text-neutral-400 mt-2">
              From: {currentLocation.address.split(',')[0]}<br/>
              To: {destination.address.split(',')[0]}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MapComponent