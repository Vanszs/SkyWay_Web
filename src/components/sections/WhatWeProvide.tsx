'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Shield,
  Clock,
  MapPin,
  BarChart3,
  Leaf,
  DollarSign,
  TrendingUp,
  Users,
  Building2,
  Clock3
} from 'lucide-react'

const sectionTitleClass = 'text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight'
const sectionSubtitleClass = 'text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto'
const badgeClass = 'inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm border border-white/60 uppercase text-xs font-semibold text-gray-600 tracking-widest'
const cardClass =
  'bg-white/80 backdrop-blur-xl rounded-[24px] p-8 border border-white/70 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300'

const mainFeatures = [
  {
    icon: Clock,
    title: 'Ultra-Fast Delivery',
    desc: '15-minute average delivery time within urban zones. 10x faster than traditional ground delivery.',
    stat: '15 min avg',
    iconBg: 'bg-teal/10',
    iconColor: 'text-teal',
    chipClass: 'bg-teal/10 text-teal border-teal/20',
    gridClass: 'md:col-span-2 md:row-span-2' // Featured large card
  },
  {
    icon: DollarSign,
    title: 'Cost Effective',
    desc: 'Reduce delivery costs by up to 60% compared to motorcycle couriers.',
    stat: '60% savings',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    chipClass: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    gridClass: 'md:col-span-1'
  },
  {
    icon: Leaf,
    title: 'Zero Emissions',
    desc: '100% electric drones with sustainable charging from renewable energy sources.',
    stat: '0% emission',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
    chipClass: 'bg-teal-50 text-teal-700 border-teal-100',
    gridClass: 'md:col-span-1'
  },
  {
    icon: Shield,
    title: '99.8% Reliability',
    desc: 'Advanced AI flight systems with redundant safety measures and weather adaptation.',
    stat: '99.8% uptime',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    chipClass: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    gridClass: 'md:col-span-1'
  },
  {
    icon: MapPin,
    title: 'Real-time Tracking',
    desc: 'Live GPS tracking, instant notifications, and proof of delivery with photo confirmation.',
    stat: 'Live updates',
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
    chipClass: 'bg-orange-50 text-orange-700 border-orange-100',
    gridClass: 'md:col-span-1'
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    desc: 'Comprehensive insights on delivery performance, customer satisfaction, and operational metrics.',
    stat: 'Full analytics',
    iconColor: 'text-purple-600',
    chipClass: 'bg-purple-50 text-purple-700 border-purple-100',
    gridClass: 'md:col-span-1'
  }
]

const stats = [
  { value: '50k+', label: 'Successful Deliveries', icon: TrendingUp },
  { value: '250+', label: 'Partner Companies', icon: Users },
  { value: '15', label: 'Cities Covered', icon: Building2 },
  { value: '24/7', label: 'Operations', icon: Clock3 }
]

const comparison = [
  {
    category: 'Delivery Time',
    skyway: '15 minutes',
    traditional: '2-4 hours'
  },
  {
    category: 'Cost per Delivery',
    skyway: '60% lower',
    traditional: 'Standard rate'
  },
  {
    category: 'Environmental Impact',
    skyway: 'Zero emissions',
    traditional: 'High emissions'
  },
  {
    category: 'Tracking Quality',
    skyway: 'Real-time GPS + Video',
    traditional: 'Basic location updates'
  }
]

export default function WhatWeProvide() {
  return (
    <section className="relative bg-sky-blue/10 overflow-hidden" style={{ marginTop: 0, paddingTop: '6rem', paddingBottom: '8rem' }}>
      <div className="container mx-auto px-6 lg:px-12 xl:px-16 max-w-7xl relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={badgeClass}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint-green opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-mint-green" />
            </span>
            <span>What we provide</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={sectionTitleClass}
          >
            Everything you need to scale your logistics.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`${sectionSubtitleClass} mt-5`}
          >
            A complete ecosystem designed for the future of urban delivery with a crisp, Apple-inspired layout.
          </motion.p>
        </div>

        {/* Feature Cards - Bento Style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 auto-rows-fr">
          {mainFeatures.map((feature, index) => {
            const Icon = feature.icon
            const isFeatured = index === 0
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`${cardClass} ${feature.gridClass} ${isFeatured ? 'bg-gradient-to-br from-teal/10 to-mint-green/10 relative overflow-hidden' : ''}`}
              >
                {isFeatured && (
                  <div className="absolute -bottom-8 -right-8 opacity-5">
                    <Icon className="w-64 h-64 text-teal/10" />
                  </div>
                )}

                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`${isFeatured ? 'w-16 h-16' : 'w-12 h-12'} rounded-2xl flex items-center justify-center ${feature.iconBg} transition-transform hover:scale-110`}>
                      <Icon className={`${isFeatured ? 'w-8 h-8' : 'w-6 h-6'} ${feature.iconColor}`} />
                    </div>
                    <span className={`px-3 py-1 rounded-full ${isFeatured ? 'text-sm' : 'text-xs'} font-semibold border ${feature.chipClass}`}>
                      {feature.stat}
                    </span>
                  </div>

                  <div className="flex-grow">
                    <h3 className={`${isFeatured ? 'text-3xl md:text-4xl mb-6' : 'text-xl md:text-2xl mb-3'} font-semibold text-gray-900`}>
                      {feature.title}
                    </h3>
                    <p className={`text-gray-600 leading-relaxed ${isFeatured ? 'text-xl max-w-md' : 'text-base'}`}>
                      {feature.desc}
                    </p>
                  </div>

                  {isFeatured && (
                    <div className="mt-8 flex items-center text-teal font-semibold group cursor-pointer">
                      Learn more <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Stats Section - Innovative Mosaic Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
              Impact by the numbers
            </h3>
            <p className="text-gray-600 text-lg">Scaling operations across the globe.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Primary Stat - Large Card */}
            <div className="md:col-span-6 lg:col-span-5 bg-mint-green rounded-[32px] p-10 text-white relative overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl transition-transform group-hover:scale-150 duration-700" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/20 rounded-full -ml-12 -mb-12 blur-2xl" />

              <div className="relative z-10 h-full flex flex-col justify-between min-h-[280px]">
                <div>
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-white/80 font-medium text-lg mb-2">Total Deliveries</h4>
                  <div className="text-7xl font-bold">
                    50k<span className="text-white/70">+</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-3 text-sm font-medium text-white/90">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full bg-white border-2 border-white/50" />
                      ))}
                    </div>
                    <span>Trusted by top retailers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Stats - Grid Cluster */}
            <div className="md:col-span-6 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Partner Companies */}
              <div className="sm:col-span-2 bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-50 to-transparent" />
                <div className="relative z-10">
                  <div className="text-4xl font-bold text-gray-900 mb-1">250+</div>
                  <div className="text-gray-500 font-medium">Partner Companies</div>
                </div>
                <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center relative z-10">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
              </div>

              {/* Cities Covered */}
              <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-48">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-4xl font-bold text-gray-900 mb-1">15</div>
                  <div className="text-gray-500 font-medium text-sm">Major Cities</div>
                </div>
              </div>

              {/* Operations */}
              <div className="bg-[#1D1D1F] rounded-[32px] p-8 text-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-48 relative overflow-hidden">
                <div className="absolute top-4 right-4 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                  <Clock3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-4xl font-bold mb-1">24/7</div>
                  <div className="text-gray-400 font-medium text-sm">Active Operations</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comparison Section Title */}
        <div className="text-center mb-12 mt-24">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Which is right for you?
          </h3>
          <p className="text-gray-600 text-lg">See the difference for yourself.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-xl rounded-[24px] overflow-hidden border border-white/70 shadow-sm"
        >
          <div className="grid grid-cols-3 gap-6 px-8 md:px-12 py-6 border-b border-gray-100">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider text-left">Category</div>
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider text-center">SkyWay</div>
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider text-center">Traditional</div>
          </div>

          {comparison.map((row, index) => (
            <div
              key={row.category}
              className="grid grid-cols-3 gap-6 px-8 md:px-12 py-6 border-b border-gray-100 last:border-0 items-center"
            >
              <div className="text-base md:text-lg font-semibold text-gray-900">{row.category}</div>
              <div className="text-center text-base md:text-lg font-semibold text-gray-900">
                {row.skyway}
              </div>
              <div className="text-center text-sm md:text-base text-gray-500">{row.traditional}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]" style={{ marginBottom: '-1px' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="relative block w-full h-[80px] sm:h-[120px] lg:h-[160px]"
        >
          <path
            fill="#FFFFFF"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  )
}
