'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BubbleCard, BubbleButton } from '@/components/ui/skyway-components'
import { MapPin, Navigation, Clock, Battery, Wifi } from 'lucide-react'
import dynamic from 'next/dynamic'

const DemoLiveMap = dynamic(() => import('@/components/ui/DemoLiveMap'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-sky-navy/20 rounded-xl flex items-center justify-center"><div className="text-white">Loading map...</div></div>
})

// Dummy data for the demo map
const demoDrones = [
  {
    id: 'SW-007',
    name: 'SkyWay Alpha',
    position: { lat: -6.229728, lng: 106.827149 },
    status: 'active' as const,
    battery: 82,
    altitude: 120,
    speed: 45,
    route: [
      { lat: -6.2607, lng: 106.8012, timestamp: '10:00' },
      { lat: -6.24, lng: 106.81, timestamp: '10:02' },
      { lat: -6.229728, lng: 106.827149, timestamp: '10:05' },
      { lat: -6.22, lng: 106.84, timestamp: '10:08' },
    ],
    destination: { lat: -6.21, lng: 106.85, name: 'Gedung Cyber' },
  },
]

export default function DemoMap() {
  const [activeDemo, setActiveDemo] = useState<'tracking' | 'planning' | 'live'>('tracking')

  const demoData = {
    tracking: {
      title: "Live Package Tracking",
      description: "Real-time GPS tracking with ETA updates and route optimization",
      route: "Jakarta Selatan → Jakarta Pusat",
      status: "In Transit",
      eta: "8 minutes",
      progress: 65
    },
    planning: {
      title: "Flight Route Planning",
      description: "AI-optimized routes considering weather, airspace, and efficiency",
      route: "Hub Central → Multiple Destinations",
      status: "Route Optimized",
      eta: "12 minutes",
      progress: 100
    },
    live: {
      title: "Fleet Management",
      description: "Monitor entire drone fleet with real-time status and analytics",
      route: "Multiple Active Routes",
      status: "5 Drones Active",
      eta: "Various",
      progress: 80
    }
  }

  const currentDemo = demoData[activeDemo]

  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-display">
            See SkyWay in Action
          </h2>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Experience our interactive demo showcasing real-time tracking, 
            route planning, and fleet management capabilities
          </p>
        </motion.div>

        {/* Demo Container */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Demo Controls */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Demo Options</h3>
            
            {Object.entries(demoData).map(([key, demo]) => (
              <motion.button
                key={key}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-300 ${
                  activeDemo === key 
                    ? 'border-sky-gold bg-sky-gold/5' 
                    : 'border-white/20 hover:border-sky-gold/50'
                }`}
                onClick={() => setActiveDemo(key as any)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h4 className={`font-bold mb-2 ${
                  activeDemo === key ? 'text-sky-gold' : 'text-neutral-300'
                }`}>
                  {demo.title}
                </h4>
                <p className="text-sm text-neutral-300">{demo.description}</p>
              </motion.button>
            ))}

            <div className="pt-4 space-y-3">
              <BubbleButton className="w-full">
                Start Live Demo
              </BubbleButton>
              <BubbleButton variant="ghost" className="w-full">
                Schedule Presentation
              </BubbleButton>
            </div>
          </motion.div>

          {/* Interactive Map Demo */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <BubbleCard className="p-0 overflow-hidden h-[500px]" hover={false}>
              {/* Demo Header */}
              <div className="p-6 bg-gradient-to-r from-sky-navy to-sky-blue text-white">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold">{currentDemo.title}</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm">Live</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-white/70">Route</div>
                    <div className="font-medium">{currentDemo.route}</div>
                  </div>
                  <div>
                    <div className="text-white/70">Status</div>
                    <div className="font-medium">{currentDemo.status}</div>
                  </div>
                </div>
              </div>

              {/* Map Area */}
              <div className="relative h-full bg-gradient-to-br from-sky-navy to-sky-blue">
                <DemoLiveMap drone={demoDrones[0]} />
              </div>
            </BubbleCard>
          </motion.div>
        </div>

        {/* Features Highlights */}
        <motion.div 
          className="grid md:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { icon: MapPin, title: "GPS Precision", desc: "±1 meter accuracy" },
            { icon: Clock, title: "Real-time Updates", desc: "Every 5 seconds" },
            { icon: Battery, title: "Flight Monitoring", desc: "Battery & performance" },
            { icon: Wifi, title: "Connectivity", desc: "4G/5G + backup" }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-soft"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <feature.icon className="w-8 h-8 text-sky-gold mx-auto mb-3" />
              <h4 className="font-bold text-white mb-1">{feature.title}</h4>
              <p className="text-sm text-neutral-300">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}