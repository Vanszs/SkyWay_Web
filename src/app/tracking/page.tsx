'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Clock, Package, CheckCircle, Truck, Plane, Camera, Bell, BellOff } from 'lucide-react'
import { BubbleCard, BubbleButton, BubbleInput } from '@/components/ui/skyway-components'

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
}

const mockTrackingData: TrackingData = {
  id: 'SKY2024-001',
  status: 'in_flight',
  currentLocation: { lat: -7.2575, lng: 112.7521, address: 'Jl. Raya Gubeng, Surabaya' },
  destination: { lat: -7.2492, lng: 112.7508, address: 'Jl. Simokerto, Surabaya' },
  estimatedArrival: '14:25',
  timeline: [
    { status: 'ordered', timestamp: '13:45', description: 'Pesanan diterima sistem', completed: true },
    { status: 'pickup_confirmed', timestamp: '13:52', description: 'Paket diambil dari partner', completed: true },
    { status: 'in_flight', timestamp: '14:05', description: 'Drone dalam perjalanan', completed: true },
    { status: 'arrived', timestamp: '14:25', description: 'Tiba di lokasi tujuan', completed: false },
    { status: 'delivered', timestamp: '14:30', description: 'Paket berhasil diterima', completed: false }
  ],
  droneId: 'SWD-447',
  partnerName: 'Tokopedia Express'
}

const statusConfig = {
  ordered: { color: 'text-neutral-400', bg: 'bg-neutral-400/20', icon: Package },
  pickup_confirmed: { color: 'text-blue-400', bg: 'bg-blue-400/20', icon: Truck },
  in_flight: { color: 'text-sky-gold', bg: 'bg-sky-gold/20', icon: Plane },
  arrived: { color: 'text-orange-400', bg: 'bg-orange-400/20', icon: MapPin },
  delivered: { color: 'text-green-400', bg: 'bg-green-400/20', icon: CheckCircle }
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
    // Redirect to map tracking page for any ID
    setTimeout(() => {
      router.push(`/tracking/map/${encodeURIComponent(trackingCode.trim())}`)
    }, 1000)
  }

  const currentStatus = trackingData ? statusConfig[trackingData.status] : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-navy via-sky-blue to-sky-navy pt-16">
      {/* Enhanced Header */}
      <div className="container mx-auto px-4 pt-8 pb-6">
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              Track Your <span className="text-sky-gold">Shipment</span>
            </h1>
            <p className="text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Monitor your drone delivery in real-time. Goods handled by our logistics partner, 
              flight and monitoring by SkyWay drones.
            </p>
          </div>
          
          {/* Live Stats */}
          <motion.div
            className="flex justify-center items-center space-x-8 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-sky-gold">847</div>
              <div className="text-sm text-neutral-400">Active Deliveries</div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">98.7%</div>
              <div className="text-sm text-neutral-400">Success Rate</div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">12min</div>
              <div className="text-sm text-neutral-400">Avg Delivery</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Tracking Input */}
      <div className="container mx-auto px-4 pb-8">
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <BubbleCard className="p-6 bg-white/10 backdrop-blur-md border-white/20">
            <div className="space-y-4">
              <BubbleInput
                placeholder="Enter tracking code (e.g., SKY2024-001)"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                className="text-center text-lg"
              />
              <BubbleButton
                onClick={handleTrack}
                disabled={!trackingCode.trim() || isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Tracking...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Search className="w-5 h-5" />
                    <span>Track Shipment</span>
                  </div>
                )}
              </BubbleButton>
            </div>
          </BubbleCard>
        </motion.div>
      </div>

      {/* Tracking Results */}
      <AnimatePresence>
        {trackingData && (
          <motion.div
            className="container mx-auto px-4 pb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Map & Status */}
              <div className="space-y-6">
                {/* Current Status */}
                <BubbleCard className="p-6 bg-white/10 backdrop-blur-md border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">Current Status</h3>
                    <span className="text-sky-gold font-mono text-sm">{trackingData.id}</span>
                  </div>
                  
                  {currentStatus && (
                    <div className={`inline-flex items-center space-x-3 px-4 py-3 rounded-2xl ${currentStatus.bg}`}>
                      <currentStatus.icon className={`w-6 h-6 ${currentStatus.color}`} />
                      <div>
                        <div className={`font-medium ${currentStatus.color}`}>
                          {trackingData.status.replace('_', ' ').toUpperCase()}
                        </div>
                        <div className="text-sm text-neutral-300">
                          ETA: {trackingData.estimatedArrival}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex justify-between text-sm text-neutral-300">
                      <span>Drone: {trackingData.droneId}</span>
                      <span>Partner: {trackingData.partnerName}</span>
                    </div>
                  </div>
                </BubbleCard>

                {/* Map Placeholder */}
                <BubbleCard className="p-6 bg-white/10 backdrop-blur-md border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">Live Map</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400 text-sm">Live</span>
                    </div>
                  </div>
                  
                  {/* Map Container */}
                  <div className="relative h-64 bg-gradient-to-br from-sky-blue/20 to-sky-gold/20 rounded-xl overflow-hidden">
                    {/* Route Line */}
                    <motion.div
                      className="absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-green-400 via-sky-gold to-orange-400"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 0.7 }}
                      transition={{ duration: 2 }}
                      style={{ originX: 0, transform: 'translateY(-50%)' }}
                    />

                    {/* Current Drone Position */}
                    <motion.div
                      className="absolute top-1/2 w-6 h-6 text-sky-gold flex items-center justify-center"
                      initial={{ left: 32 }}
                      animate={{ left: '60%' }}
                      transition={{ duration: 2, ease: 'easeInOut' }}
                      style={{ transform: 'translateY(-50%)' }}
                    >
                      🚁
                    </motion.div>

                    {/* Start Point */}
                    <div className="absolute left-4 top-1/2 w-4 h-4 bg-green-400 rounded-full transform -translate-y-1/2" />
                    <div className="absolute left-2 bottom-4 text-xs text-neutral-300">
                      {trackingData.currentLocation.address.split(',')[0]}
                    </div>

                    {/* End Point */}
                    <div className="absolute right-4 top-1/2 w-4 h-4 bg-orange-400 rounded-full transform -translate-y-1/2" />
                    <div className="absolute right-2 bottom-4 text-xs text-neutral-300 text-right">
                      {trackingData.destination.address.split(',')[0]}
                    </div>

                    {/* Map Overlay */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="text-white/70 text-sm bg-black/30 px-3 py-2 rounded-lg">
                        Interactive map integration coming soon
                      </div>
                    </div>
                  </div>
                </BubbleCard>
              </div>

              {/* Right Column - Timeline & Notifications */}
              <div className="space-y-6">
                {/* Notifications Toggle */}
                <BubbleCard className="p-4 bg-white/10 backdrop-blur-md border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {notificationsEnabled ? (
                        <Bell className="w-5 h-5 text-sky-gold" />
                      ) : (
                        <BellOff className="w-5 h-5 text-neutral-400" />
                      )}
                      <div>
                        <div className="text-white font-medium">Status Notifications</div>
                        <div className="text-sm text-neutral-400">Get updates via WhatsApp/Email</div>
                      </div>
                    </div>
                    <BubbleButton
                      variant={notificationsEnabled ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    >
                      {notificationsEnabled ? 'On' : 'Off'}
                    </BubbleButton>
                  </div>
                </BubbleCard>

                {/* Status Timeline */}
                <BubbleCard className="p-6 bg-white/10 backdrop-blur-md border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-6">Status Timeline</h3>
                  
                  <div className="space-y-4">
                    {trackingData.timeline.map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          item.completed 
                            ? 'bg-green-400/20 text-green-400' 
                            : 'bg-neutral-400/20 text-neutral-400'
                        }`}>
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className={`font-medium ${item.completed ? 'text-white' : 'text-neutral-400'}`}>
                            {item.description}
                          </div>
                          <div className="text-sm text-neutral-500">
                            {item.completed ? item.timestamp : 'Estimated ' + item.timestamp}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </BubbleCard>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No Results */}
      <AnimatePresence>
        {trackingCode && !trackingData && !isLoading && (
          <motion.div
            className="container mx-auto px-4 pb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BubbleCard className="max-w-md mx-auto p-8 text-center bg-white/10 backdrop-blur-md border-white/20">
              <div className="text-neutral-400 mb-4">
                <Package className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white">Tracking code not found</h3>
                <p className="text-sm">Please check your tracking code and try again.</p>
              </div>
            </BubbleCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ Section */}
      {!trackingData && (
        <div className="container mx-auto px-4 pb-12">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Frequently Asked Questions</h2>
              <p className="text-neutral-400">Learn more about our drone tracking system</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <BubbleCard className="p-6 bg-white/10 backdrop-blur-md border-white/20">
                <h3 className="text-lg font-semibold text-white mb-3">How accurate is real-time tracking?</h3>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  Our drones update location every 30 seconds with GPS accuracy of ±3 meters. 
                  You&apos;ll see near real-time position updates throughout the delivery journey.
                </p>
              </BubbleCard>
              
              <BubbleCard className="p-6 bg-white/10 backdrop-blur-md border-white/20">
                <h3 className="text-lg font-semibold text-white mb-3">What if weather affects delivery?</h3>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  Our system monitors weather conditions 24/7. If conditions become unsafe, 
                  your delivery will be automatically rescheduled and you&apos;ll receive instant notification.
                </p>
              </BubbleCard>
              
              <BubbleCard className="p-6 bg-white/10 backdrop-blur-md border-white/20">
                <h3 className="text-lg font-semibold text-white mb-3">How do I know my package is secure?</h3>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  Each drone has secure compartments with GPS locks. Only the recipient can unlock 
                  using the provided code. Every step is photo-documented for your peace of mind.
                </p>
              </BubbleCard>
              
              <BubbleCard className="p-6 bg-white/10 backdrop-blur-md border-white/20">
                <h3 className="text-lg font-semibold text-white mb-3">What&apos;s the delivery time range?</h3>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  Most deliveries within Surabaya complete in 8-20 minutes depending on distance and traffic. 
                  Cross-district deliveries typically take 15-25 minutes.
                </p>
              </BubbleCard>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Features Section */}
      {!trackingData && (
        <div className="container mx-auto px-4 pb-12">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Why Choose SkyWay Tracking?</h2>
              <p className="text-neutral-400">Advanced drone delivery monitoring system</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <BubbleCard className="p-6 text-center bg-white/10 backdrop-blur-md border-white/20">
                <div className="w-12 h-12 bg-green-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Precision Tracking</h3>
                <p className="text-neutral-300 text-sm">
                  GPS-enabled drones provide meter-level accuracy for complete visibility of your delivery.
                </p>
              </BubbleCard>
              
              <BubbleCard className="p-6 text-center bg-white/10 backdrop-blur-md border-white/20">
                <div className="w-12 h-12 bg-sky-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-sky-gold" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Real-Time Updates</h3>
                <p className="text-neutral-300 text-sm">
                  Instant notifications via WhatsApp, SMS, or email for every status change during delivery.
                </p>
              </BubbleCard>
              
              <BubbleCard className="p-6 text-center bg-white/10 backdrop-blur-md border-white/20">
                <div className="w-12 h-12 bg-blue-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Proof of Delivery</h3>
                <p className="text-neutral-300 text-sm">
                  Automated photo capture and timestamp documentation for complete delivery verification.
                </p>
              </BubbleCard>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}