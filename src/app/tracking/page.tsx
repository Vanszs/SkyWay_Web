'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Clock, Package, CheckCircle, Truck, Plane, Camera, Bell, BellOff, ArrowRight, ChevronRight } from 'lucide-react'

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
    droneId: string
  }
  droneId: string
  partnerName: string
}

const mockTrackingData: TrackingData = {
  id: 'SKY2024-001',
  status: 'in_flight',
  currentLocation: { lat: -7.2575, lng: 112.7521, address: 'Jl. Raya Gubeng, Surabaya' },
  destination: { lat: -7.2492, lng: 112.7508, address: 'Jl. Simokerto, Surabaya' },
  estimatedArrival: '14:25',
  timeline: [
    { status: 'ordered', timestamp: '13:45', description: 'Order received', completed: true },
    { status: 'pickup_confirmed', timestamp: '13:52', description: 'Package collected', completed: true },
    { status: 'in_flight', timestamp: '14:05', description: 'Drone in transit', completed: true },
    { status: 'arrived', timestamp: '14:25', description: 'Arrived at destination', completed: false },
    { status: 'delivered', timestamp: '14:30', description: 'Delivered successfully', completed: false }
  ],
  droneId: 'SWD-447',
  partnerName: 'Tokopedia Express'
}

const statusConfig = {
  ordered: { color: 'text-gray-500', bg: 'bg-gray-100', icon: Package, label: 'Ordered' },
  pickup_confirmed: { color: 'text-blue-600', bg: 'bg-blue-50', icon: Truck, label: 'Picked Up' },
  in_flight: { color: 'text-sky-600', bg: 'bg-sky-50', icon: Plane, label: 'In Flight' },
  arrived: { color: 'text-orange-600', bg: 'bg-orange-50', icon: MapPin, label: 'Arrived' },
  delivered: { color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle, label: 'Delivered' }
}

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState('')
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleTrack = async () => {
    if (!trackingCode.trim()) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      if (trackingCode.trim().toUpperCase() === 'SKY2024-001') {
        setTrackingData(mockTrackingData)
      } else {
        // For demo purposes, just show mock data for any input
        setTrackingData(mockTrackingData)
      }
    }, 800)
  }

  const currentStatus = trackingData ? statusConfig[trackingData.status] : null

  return (
    <div className="min-h-screen bg-[#F5F5F7] pt-32 pb-24">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 tracking-tight mb-6">
            Track your delivery.
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Real-time updates from pickup to drop-off.
          </p>
        </motion.div>

        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-xl mx-auto mb-20"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gray-200 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
            <div className="relative flex items-center bg-white rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-200 p-2 transition-all duration-300 focus-within:shadow-[0_4px_20px_rgba(0,0,0,0.08)] focus-within:border-blue-500/30 focus-within:ring-4 focus-within:ring-blue-500/10">
              <div className="pl-6 text-gray-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Enter tracking number..."
                className="w-full bg-transparent border-none focus:ring-0 text-lg text-gray-900 placeholder-gray-400 px-4 py-3"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
              />
              <button
                onClick={handleTrack}
                disabled={!trackingCode.trim() || isLoading}
                className="bg-gray-900 text-white rounded-full p-3 pr-6 pl-6 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium flex items-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Track <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tracking Results */}
        <AnimatePresence mode="wait">
          {trackingData && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="grid lg:grid-cols-12 gap-8"
            >
              {/* Left Column: Status & Map (8 cols) */}
              <div className="lg:col-span-8 space-y-8">
                {/* Status Card */}
                <div className="bg-white rounded-[32px] p-8 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</div>
                      <div className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        {currentStatus?.label}
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${currentStatus?.bg}`}>
                          {currentStatus && <currentStatus.icon className={`w-4 h-4 ${currentStatus.color}`} />}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Estimated Arrival</div>
                      <div className="text-2xl font-bold text-gray-900">{trackingData.estimatedArrival}</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden mb-8">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '65%' }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">From</div>
                      <div className="font-medium text-gray-900">{trackingData.currentLocation.address}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">To</div>
                      <div className="font-medium text-gray-900">{trackingData.destination.address}</div>
                    </div>
                  </div>
                </div>

                {/* Map Card */}
                <div className="bg-white rounded-[32px] p-3 border border-gray-200 shadow-sm h-[400px] relative overflow-hidden group">
                  <div className="absolute inset-3 rounded-[24px] bg-gray-100 overflow-hidden">
                    {/* Abstract Map Background */}
                    <div className="absolute inset-0 opacity-50"
                      style={{
                        backgroundImage: 'radial-gradient(#CBD5E1 1.5px, transparent 1.5px)',
                        backgroundSize: '24px 24px'
                      }}
                    />

                    {/* Route Line Animation */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <motion.path
                        d="M 100 200 Q 400 100 700 200"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray="10 10"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />
                    </svg>

                    {/* Drone Icon Animation */}
                    <motion.div
                      initial={{ offsetDistance: "0%" }}
                      animate={{ offsetDistance: "100%" }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{
                        offsetPath: "path('M 100 200 Q 400 100 700 200')",
                        position: 'absolute'
                      }}
                      className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center z-10 text-blue-600"
                    >
                      <Plane className="w-6 h-6 fill-current" />
                    </motion.div>

                    {/* Map Overlay Text */}
                    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-white/50">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-gray-900">Live Tracking Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Timeline (4 cols) */}
              <div className="lg:col-span-4">
                <div className="bg-white rounded-[32px] p-8 border border-gray-200 shadow-sm h-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-8">Timeline</h3>

                  <div className="relative space-y-8 before:absolute before:top-2 before:bottom-2 before:left-[15px] before:w-0.5 before:bg-gray-100">
                    {trackingData.timeline.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-10"
                      >
                        <div className={`absolute left-0 top-1 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center z-10 ${item.completed ? 'bg-blue-500' : 'bg-gray-200'
                          }`}>
                          {item.completed && <CheckCircle className="w-4 h-4 text-white" />}
                        </div>

                        <div>
                          <div className={`font-semibold text-base ${item.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                            {item.description}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">{item.timestamp}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Notification Toggle */}
                  <div className="mt-12 pt-8 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${notificationsEnabled ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400'}`}>
                          {notificationsEnabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
                        </div>
                        <div className="text-sm font-medium text-gray-900">Notifications</div>
                      </div>
                      <button
                        onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${notificationsEnabled ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State / Features */}
        {!trackingData && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-3 gap-6 mt-20"
          >
            {[
              { icon: MapPin, title: 'Real-time GPS', desc: 'Precise location tracking within meters.' },
              { icon: Clock, title: 'Live Updates', desc: 'Instant status notifications.' },
              { icon: Camera, title: 'Photo Proof', desc: 'Visual confirmation upon delivery.' }
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-[24px] p-8 border border-gray-200 text-center hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-900">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}