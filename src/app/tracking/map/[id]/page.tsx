'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { ArrowLeft, MapPin, Clock, Package, CheckCircle, Truck, Plane, Camera, Bell, BellOff, Navigation, Zap } from 'lucide-react'
import { BubbleCard, BubbleButton } from '@/components/ui/skyway-components'

// Dynamically import map component to avoid SSR issues
const MapComponent = dynamic(() => import('./MapComponent'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-sky-navy/20 rounded-xl flex items-center justify-center"><div className="text-white">Loading map...</div></div>
}) as any

interface TrackingData {
  id: string
  status: 'ordered' | 'pickup_confirmed' | 'in_flight' | 'arrived' | 'delivered'
  currentLocation: { lat: number; lng: number; address: string }
  destination: { lat: number; lng: number; address: string }
  estimatedArrival: string
  timeline: Array<{
    status: string
    timestamp: string
    description: string
    completed: boolean
  }>
  deliveryProof?: {
    photo: string
    timestamp: string
    recipient: string
  }
  droneId: string
  partnerName: string
  distance: string
  speed: string
  altitude: string
  battery: number
}

// Generate mock data based on ID
const generateTrackingData = (id: string): TrackingData => {
  const statuses: Array<'ordered' | 'pickup_confirmed' | 'in_flight' | 'arrived' | 'delivered'> = 
    ['ordered', 'pickup_confirmed', 'in_flight', 'arrived', 'delivered']
  
  const partners = ['Tokopedia Express', 'Shopee Fast', 'Grab Delivery', 'GoSend Plus', 'JNE Drone']
  const locations = [
    'Jl. Raya Gubeng, Surabaya',
    'Jl. Simokerto, Surabaya', 
    'Jl. Diponegoro, Surabaya',
    'Jl. Pemuda, Surabaya',
    'Jl. Tunjungan Plaza, Surabaya'
  ]

  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
  const randomPartner = partners[Math.floor(Math.random() * partners.length)]
  const randomLocation = locations[Math.floor(Math.random() * locations.length)]
  const randomDestination = locations[Math.floor(Math.random() * locations.length)]

  return {
    id: id.toUpperCase(),
    status: randomStatus,
    currentLocation: { lat: -7.2575, lng: 112.7521, address: randomLocation },
    destination: { lat: -7.2492, lng: 112.7508, address: randomDestination },
    estimatedArrival: new Date(Date.now() + Math.random() * 30 * 60000).toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    timeline: [
      { status: 'ordered', timestamp: '13:45', description: 'Pesanan diterima sistem', completed: true },
      { status: 'pickup_confirmed', timestamp: '13:52', description: 'Paket diambil dari partner', completed: true },
      { status: 'in_flight', timestamp: '14:05', description: 'Drone dalam perjalanan', completed: randomStatus !== 'ordered' && randomStatus !== 'pickup_confirmed' },
      { status: 'arrived', timestamp: '14:25', description: 'Tiba di lokasi tujuan', completed: randomStatus === 'arrived' || randomStatus === 'delivered' },
      { status: 'delivered', timestamp: '14:30', description: 'Paket berhasil diterima', completed: randomStatus === 'delivered' }
    ],
    droneId: `SWD-${Math.floor(Math.random() * 999).toString().padStart(3, '0')}`,
    partnerName: randomPartner,
    distance: `${(Math.random() * 15 + 0.5).toFixed(1)} km`,
    speed: `${Math.floor(Math.random() * 20 + 25)} km/h`,
    altitude: `${Math.floor(Math.random() * 80 + 20)} m`,
    battery: Math.floor(Math.random() * 40 + 60)
  }
}

const statusConfig = {
  ordered: { color: 'text-neutral-400', bg: 'bg-neutral-500/20', icon: Package },
  pickup_confirmed: { color: 'text-blue-300', bg: 'bg-blue-400/20', icon: Truck },
  in_flight: { color: 'text-sky-gold', bg: 'bg-sky-gold/20', icon: Plane },
  arrived: { color: 'text-amber-400', bg: 'bg-amber-400/20', icon: MapPin },
  delivered: { color: 'text-cyan-300', bg: 'bg-cyan-400/20', icon: CheckCircle }
}

export default function MapTrackingPage() {
  const params = useParams()
  const router = useRouter()
  const trackingId = params.id as string
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [dronePosition, setDronePosition] = useState(20)
  const [droneLatLng, setDroneLatLng] = useState({ lat: -7.2575, lng: 112.7521 })

  useEffect(() => {
    // Simulate loading and generate data
    const timer = setTimeout(() => {
      const data = generateTrackingData(decodeURIComponent(trackingId))
      setTrackingData(data)
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [trackingId])

  // Animate drone movement with real coordinates
  useEffect(() => {
    if (!trackingData || trackingData.status === 'delivered') return

    const interval = setInterval(() => {
      setDronePosition(prev => {
        const next = prev + Math.random() * 2
        return next > 90 ? 90 : next
      })
      
      // Update drone coordinates (simulate movement from pickup to destination)
      setDroneLatLng(prev => {
        const progress = dronePosition / 100
        const newLat = trackingData.currentLocation.lat + 
          (trackingData.destination.lat - trackingData.currentLocation.lat) * progress
        const newLng = trackingData.currentLocation.lng + 
          (trackingData.destination.lng - trackingData.currentLocation.lng) * progress
        
        return { 
          lat: newLat + (Math.random() - 0.5) * 0.001, // Add slight random movement
          lng: newLng + (Math.random() - 0.5) * 0.001
        }
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [trackingData, dronePosition])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-navy via-sky-blue to-sky-navy pt-16 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-3 border-sky-gold border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="text-white text-xl">Loading tracking data...</div>
          <div className="text-neutral-400">Tracking ID: {decodeURIComponent(trackingId)}</div>
        </div>
      </div>
    )
  }

  if (!trackingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-navy via-sky-blue to-sky-navy pt-16">
        <div className="container mx-auto px-4 py-8">
          <BubbleButton
            onClick={() => router.back()}
            variant="secondary"
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tracking
          </BubbleButton>
          
          <div className="text-center">
            <div className="text-white text-xl mb-4">Tracking data not available</div>
            <div className="text-neutral-400">ID: {decodeURIComponent(trackingId)}</div>
          </div>
        </div>
      </div>
    )
  }

  const currentStatus = statusConfig[trackingData.status]

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-navy via-sky-blue to-sky-navy pt-16">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <BubbleButton
          onClick={() => router.back()}
          variant="secondary"
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tracking
        </BubbleButton>

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Live Tracking: <span className="text-sky-gold">{trackingData.id}</span>
          </h1>
          <p className="text-neutral-300">Real-time drone delivery monitoring</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Map */}
          <div className="lg:col-span-2">
            <BubbleCard className="p-4 bg-white/10 backdrop-blur-md border-white/20 h-[500px] overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Live Map Tracking</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="text-cyan-300 text-sm">Live OpenStreetMap</span>
                </div>
              </div>
              
              {/* Real Interactive OpenStreetMap */}
              <div className="relative h-[420px] overflow-hidden rounded-xl">
                <MapComponent
                  currentLocation={trackingData.currentLocation}
                  destination={trackingData.destination}
                  dronePosition={droneLatLng}
                  droneId={trackingData.droneId}
                  status={trackingData.status}
                />
                
                {/* Flight Info Overlay - Bottom Left */}
                <div className="absolute bottom-4 left-4 flex space-x-2 z-[1000]">
                  <div className="bg-black/90 text-white px-3 py-2 rounded-xl text-sm backdrop-blur-sm shadow-lg">
                    <div className="flex items-center space-x-2">
                      <Navigation className="w-4 h-4 text-sky-gold" />
                      <span className="font-medium">{trackingData.speed}</span>
                    </div>
                  </div>
                  <div className="bg-black/90 text-white px-3 py-2 rounded-xl text-sm backdrop-blur-sm shadow-lg">
                    <div className="flex items-center space-x-2">
                      <Plane className="w-4 h-4 text-blue-300" />
                      <span className="font-medium">{trackingData.altitude}</span>
                    </div>
                  </div>
                  <div className="bg-black/90 text-white px-3 py-2 rounded-xl text-sm backdrop-blur-sm shadow-lg">
                    <div className="flex items-center space-x-2">
                      <Zap className={`w-4 h-4 ${trackingData.battery > 70 ? 'text-cyan-300' : trackingData.battery > 30 ? 'text-amber-400' : 'text-red-500'}`} />
                      <span className="font-medium">{trackingData.battery}%</span>
                    </div>
                  </div>
                </div>

                {/* Distance Remaining Overlay - Top Right */}
                <div className="absolute top-4 right-4 bg-black/90 text-white px-4 py-2 rounded-xl backdrop-blur-sm shadow-lg z-[1000]">
                  <div className="text-xs text-neutral-300">Distance</div>
                  <div className="text-lg font-bold">{trackingData.distance}</div>
                </div>
              </div>
            </BubbleCard>
          </div>

          {/* Right - Info Panel */}
          <div className="space-y-6">
            {/* Status Card */}
            <BubbleCard className="p-6 bg-white/10 backdrop-blur-md border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Status</h3>
                <BubbleButton
                  variant={notificationsEnabled ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                >
                  {notificationsEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                </BubbleButton>
              </div>
              
              <div className={`inline-flex items-center space-x-3 px-4 py-3 rounded-2xl ${currentStatus.bg} mb-4`}>
                <currentStatus.icon className={`w-5 h-5 ${currentStatus.color}`} />
                <div>
                  <div className={`font-medium ${currentStatus.color}`}>
                    {trackingData.status.replace('_', ' ').toUpperCase()}
                  </div>
                  <div className="text-sm text-neutral-300">
                    ETA: {trackingData.estimatedArrival}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Partner:</span>
                  <span className="text-white">{trackingData.partnerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Drone:</span>
                  <span className="text-sky-gold font-mono">{trackingData.droneId}</span>
                </div>
              </div>
            </BubbleCard>

            {/* Timeline */}
            <BubbleCard className="p-6 bg-white/10 backdrop-blur-md border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Timeline</h3>
              
              <div className="space-y-3">
                {trackingData.timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                      item.completed 
                        ? 'bg-cyan-400/20 text-cyan-300' 
                        : 'bg-neutral-500/20 text-neutral-400'
                    }`}>
                      <CheckCircle className="w-3 h-3" />
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${item.completed ? 'text-white' : 'text-neutral-400'}`}>
                        {item.description}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {item.completed ? item.timestamp : 'Est. ' + item.timestamp}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </BubbleCard>

            {/* Quick Actions */}
            <BubbleCard className="p-6 bg-white/10 backdrop-blur-md border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <BubbleButton variant="secondary" size="sm" className="w-full">
                  <Camera className="w-4 h-4 mr-2" />
                  View Drone Camera
                </BubbleButton>
                <BubbleButton variant="secondary" size="sm" className="w-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  Share Location
                </BubbleButton>
                <BubbleButton variant="secondary" size="sm" className="w-full">
                  <Package className="w-4 h-4 mr-2" />
                  Contact Support
                </BubbleButton>
              </div>
            </BubbleCard>
          </div>
        </div>
      </div>
    </div>
  )
}