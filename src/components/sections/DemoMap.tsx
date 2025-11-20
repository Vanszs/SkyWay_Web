'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Navigation, Clock, Battery, Wifi, BarChart3, Users, Bell } from 'lucide-react'
import dynamic from 'next/dynamic'

const DemoLiveMap = dynamic(() => import('@/components/ui/DemoLiveMap'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-50 rounded-xl flex items-center justify-center"><div className="text-blue-500">Loading map...</div></div>
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
    <section className="relative bg-white overflow-hidden" style={{ marginTop: 0, paddingTop: '6rem', paddingBottom: '8rem' }}>

      {/* Top Wave from PartnerTypes - Smooth Transition */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180" style={{ marginTop: '-1px' }}>
        {/* Matches PartnerTypes bottom wave */}
      </div>

      <div className="container mx-auto px-6 lg:px-12 xl:px-16 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 mb-8 shadow-sm"
          >
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Live Demo</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
          >
            Mission Control <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">at your fingertips.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-500 font-light"
          >
            Complete visibility over your entire autonomous fleet from a single dashboard.
          </motion.p>
        </div>

        {/* Laptop Mockup */}
        <motion.div
          className="relative max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Laptop Body */}
          <div className="relative bg-[#1D1D1F] rounded-t-[2rem] p-4 pb-0 shadow-2xl border-t border-x border-white/20 mx-auto w-full max-w-4xl">
            {/* Screen Bezel */}
            <div className="bg-black rounded-t-xl p-2 relative overflow-hidden">
              {/* Camera Dot */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-neutral-700 rounded-full" />

              {/* Screen Content */}
              <div className="bg-white rounded-lg overflow-hidden h-[400px] lg:h-[500px] relative">
                {/* Dashboard Header */}
                <div className="h-14 border-b border-gray-100 flex items-center justify-between px-6 bg-white">
                  <div className="flex items-center space-x-4">
                    <div className="font-bold text-gray-900 text-lg">SkyWay <span className="text-blue-500 font-normal">OS</span></div>
                    <div className="h-6 w-px bg-gray-200" />
                    <div className="flex space-x-1">
                      <button
                        onClick={() => setActiveTab('live')}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${activeTab === 'live' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                        Live Map
                      </button>
                      <button
                        onClick={() => setActiveTab('analytics')}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${activeTab === 'analytics' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                        Analytics
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs">
                      JD
                    </div>
                  </div>
                </div>

                {/* Dashboard Body */}
                <div className="flex h-[calc(100%-3.5rem)]">
                  {/* Sidebar */}
                  <div className="w-16 border-r border-gray-100 flex flex-col items-center py-4 space-y-6">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-500"><Navigation className="w-5 h-5" /></div>
                    <div className="p-2 text-gray-400 hover:text-gray-900 transition-colors"><BarChart3 className="w-5 h-5" /></div>
                    <div className="p-2 text-gray-400 hover:text-gray-900 transition-colors"><Users className="w-5 h-5" /></div>
                    <div className="p-2 text-gray-400 hover:text-gray-900 transition-colors"><Battery className="w-5 h-5" /></div>
                  </div>

                  {/* Main Content Area */}
                  <div className="flex-1 bg-gray-50 p-6">
                    {activeTab === 'live' ? (
                      <DemoLiveMap drone={demoDrones[0]} />
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                          <h4 className="text-gray-500 text-sm font-medium mb-2">Avg. Delivery Time</h4>
                          <div className="text-3xl font-bold text-gray-900">14m</div>
                          <div className="text-green-500 text-sm font-medium mt-1">-2m from avg</div>
                        </div>
                        <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-48 flex items-center justify-center text-gray-300">
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
          <div className="bg-[#2d2d2f] h-4 rounded-b-2xl mx-auto w-full max-w-4xl shadow-xl relative z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-[#3d3d3f] rounded-b-lg" />
          </div>
          {/* Reflection/Shadow */}
          <div className="absolute -bottom-10 left-10 right-10 h-10 bg-blue-500/20 blur-2xl rounded-[100%]" />
        </motion.div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 mt-16 mb-24">
          {[
            { icon: Wifi, text: "Real-time Telemetry" },
            { icon: MapPin, text: "Precision Tracking" },
            { icon: Battery, text: "Smart Power Mgmt" },
            { icon: Clock, text: "Instant Updates" }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200 text-gray-700 font-medium hover:border-blue-200 hover:text-blue-600 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + (i * 0.1) }}
            >
              <item.icon className="w-4 h-4 text-blue-500" />
              <span>{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div >

      {/* Bottom Wave Divider (White -> Footer Dark) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]" style={{ marginBottom: '-1px' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="relative block w-full h-[100px] sm:h-[140px] lg:h-[180px]"
        >
          <path
            fill="#1D1D1F"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,133.3C672,117,768,107,864,122.7C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  )
}