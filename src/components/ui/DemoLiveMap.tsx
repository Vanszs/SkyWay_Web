
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

interface DemoLiveMapProps {
  drone: {
    id: string
    position: { lat: number; lng: number }
    route: { lat: number; lng: number; timestamp: string }[]
    destination?: { lat: number; lng: number; name: string } | null
  }
}

const DemoLiveMap: React.FC<DemoLiveMapProps> = ({ drone }) => {
  // Custom drone icon with hover effect
  const droneIcon = L.divIcon({
    html: `
      <div class="drone-marker">
        <div class="drone-icon">🚁</div>
        <div class="drone-label">${drone.id}</div>
      </div>
    `,
    className: 'custom-drone-marker',
    iconSize: [40, 60],
    iconAnchor: [20, 50]
  })

  // Route coordinates
  const routeCoords: [number, number][] = drone.route.map(p => [p.lat, p.lng])

  const center: [number, number] = [drone.position.lat, drone.position.lng]

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
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
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
      
      {/* Drone Position */}
      <Marker position={[drone.position.lat, drone.position.lng]} icon={droneIcon}>
        <Popup>
          <div className="text-center">
            <strong>Drone {drone.id}</strong><br />
            <small>Live position tracking</small>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default DemoLiveMap
