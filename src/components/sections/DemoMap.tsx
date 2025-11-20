'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BubbleButton } from '@/components/ui/skyway-components'
import { MapPin, Navigation, Clock, Battery, Wifi, BarChart3, Users, Bell } from 'lucide-react'
import dynamic from 'next/dynamic'

const DemoLiveMap = dynamic(() => import('@/components/ui/DemoLiveMap'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-sky-50 rounded-xl flex items-center justify-center"><div className="text-sky-blue">Loading map...</div></div>
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
  const [activeTab, setActiveTab] = useState<'live' | 'analytics'>('live')

  return (
    <section className="relative py-24 lg:py-32 bg-light-sky-blue overflow-hidden">
      {/* Floating Cloud Fragments */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white rounded-full blur-xl opacity-60 animate-float" />
      <div className="absolute bottom-40 right-20 w-32 h-32 bg-white rounded-full blur-xl opacity-60 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 right-10 w-16 h-16 bg-white rounded-full blur-lg opacity-40 animate-float" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-6 lg:px-12 xl:px-16 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-deep-navy mb-6 font-display">
            Mission Control
          </h2>
          <p className="text-lg lg:text-xl text-neutral-500 max-w-3xl mx-auto leading-relaxed">
            Complete visibility over your entire autonomous fleet from a single dashboard.
          </p>
        </motion.div>

        {/* Laptop Mockup */}
        <motion.div
          className="relative max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Laptop Body */}
          <div className="relative bg-deep-navy rounded-t-[2rem] p-4 pb-0 shadow-2xl border-t border-x border-white/20 mx-auto w-full max-w-4xl">
            {/* Screen Bezel */}
            <div className="bg-black rounded-t-xl p-2 relative overflow-hidden">
              {/* Camera Dot */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-neutral-700 rounded-full" />

              {/* Screen Content */}
              <div className="bg-white rounded-lg overflow-hidden h-[400px] lg:h-[500px] relative">
                {/* Dashboard Header */}
                <div className="h-14 border-b border-neutral-100 flex items-center justify-between px-6 bg-white">
                  <div className="flex items-center space-x-4">
                    <div className="font-bold text-deep-navy text-lg">SkyWay <span className="text-sky-blue font-normal">OS</span></div>
                    <div className="h-6 w-px bg-neutral-200" />
                    <div className="flex space-x-1">
                      <button
                        onClick={() => setActiveTab('live')}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${activeTab === 'live' ? 'bg-sky-blue/10 text-sky-blue' : 'text-neutral-400 hover:text-neutral-600'}`}
                      >
                        Live Map
                      </button>
                      <button
                        onClick={() => setActiveTab('analytics')}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${activeTab === 'analytics' ? 'bg-sky-blue/10 text-sky-blue' : 'text-neutral-400 hover:text-neutral-600'}`}
                      >
                        Analytics
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-sky-blue text-white flex items-center justify-center font-bold text-xs">
                      JD
                    </div>
                  </div>
                </div>

                {/* Dashboard Body */}
                <div className="flex h-[calc(100%-3.5rem)]">
                  {/* Sidebar */}
                  <div className="w-16 border-r border-neutral-100 flex flex-col items-center py-4 space-y-6">
                    <div className="p-2 bg-sky-blue/10 rounded-lg text-sky-blue"><Navigation className="w-5 h-5" /></div>
                    <div className="p-2 text-neutral-400 hover:text-deep-navy transition-colors"><BarChart3 className="w-5 h-5" /></div>
                    <div className="p-2 text-neutral-400 hover:text-deep-navy transition-colors"><Users className="w-5 h-5" /></div>
                    <div className="p-2 text-neutral-400 hover:text-deep-navy transition-colors"><Battery className="w-5 h-5" /></div>
                  </div>

                  {/* Main Area */}
                  <div className="flex-1 relative bg-neutral-50">
                    {activeTab === 'live' ? (
                      <div className="absolute inset-0">
                        <DemoLiveMap drone={demoDrones[0]} />

                        {/* Overlay Stats */}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-white/50 w-64">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-neutral-400 uppercase">Active Drone</span>
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          </div>
                          <div className="font-bold text-deep-navy text-lg mb-1">SkyWay Alpha</div>
                          <div className="flex items-center justify-between text-sm text-neutral-500">
                            <span>Battery</span>
                            <span className="text-green-600 font-medium">82%</span>
                          </div>
                          <div className="w-full bg-neutral-100 h-1.5 rounded-full mt-1 overflow-hidden">
                            <div className="bg-green-500 h-full w-[82%]" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 grid grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                          <h4 className="text-neutral-500 text-sm font-medium mb-2">Total Deliveries</h4>
                          <div className="text-3xl font-bold text-deep-navy">1,284</div>
                          <div className="text-green-500 text-sm font-medium mt-1">+12% this week</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                          <h4 className="text-neutral-500 text-sm font-medium mb-2">Avg. Delivery Time</h4>
                          <div className="text-3xl font-bold text-deep-navy">14m</div>
                          <div className="text-green-500 text-sm font-medium mt-1">-2m from avg</div>
                        </div>
                        <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm border border-neutral-100 h-48 flex items-center justify-center text-neutral-300">
                          Analytics Graph Placeholder
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Laptop Base */}
          <div className="bg-neutral-800 h-4 rounded-b-2xl mx-auto w-full max-w-4xl shadow-xl relative z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-neutral-700 rounded-b-lg" />
          </div>
          {/* Reflection/Shadow */}
          <div className="absolute -bottom-10 left-10 right-10 h-10 bg-sky-blue/20 blur-2xl rounded-[100%]" />
        </motion.div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 mt-16">
          {[
            { icon: Wifi, text: "Real-time Telemetry" },
            { icon: MapPin, text: "Precision Tracking" },
            { icon: Battery, text: "Smart Power Mgmt" },
            { icon: Clock, text: "Instant Updates" }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-sm border border-sky-100 text-deep-navy font-medium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + (i * 0.1) }}
            >
              <item.icon className="w-4 h-4 text-sky-blue" />
              <span>{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Wave Divider (Light Sky Blue -> Strong Blue Gradient) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px] lg:h-[120px]">
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2B7BFF" />
              <stop offset="100%" stopColor="#0090F3" />
            </linearGradient>
          </defs>
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="url(#wave-gradient)"></path>
        </svg>
      </div>
    </section>
  )
}