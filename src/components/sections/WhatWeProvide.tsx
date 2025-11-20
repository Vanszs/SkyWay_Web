'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Shield,
  Zap,
  Clock,
  MapPin,
  BarChart3,
  Smartphone,
  Leaf,
  DollarSign,
  Activity,
  TrendingUp,
  Users,
  Building2,
  Clock3
} from 'lucide-react'

export default function WhatWeProvide() {
  const mainFeatures = [
    {
      icon: Clock,
      stat: '15min',
      title: 'Ultra-Fast Delivery',
      desc: '15-minute average delivery time within urban zones. 10x faster than traditional ground delivery.',
      color: 'blue',
      colSpan: 'md:col-span-2'
    },
    {
      icon: DollarSign,
      stat: '60%',
      statLabel: 'Savings',
      title: 'Cost Effective',
      desc: 'Reduce delivery costs by up to 60% compared to motorcycle couriers.',
      color: 'green',
      colSpan: 'md:col-span-1'
    },
    {
      icon: Leaf,
      stat: '0%',
      statLabel: 'Emission',
      title: 'Zero Emissions',
      desc: '100% electric drones with sustainable charging from renewable energy sources.',
      color: 'emerald',
      colSpan: 'md:col-span-1'
    },
    {
      icon: Shield,
      stat: '99.8%',
      title: '99.8% Reliability',
      desc: 'Advanced AI flight systems with redundant safety measures and weather adaptation.',
      color: 'purple',
      colSpan: 'md:col-span-2'
    },
    {
      icon: MapPin,
      stat: 'Live',
      statLabel: 'Updates',
      title: 'Real-time Tracking',
      desc: 'Live GPS tracking, instant notifications, and proof of delivery with photo confirmation.',
      color: 'orange',
      colSpan: 'md:col-span-1'
    },
    {
      icon: BarChart3,
      stat: 'Full',
      statLabel: 'Analytics',
      title: 'Analytics Dashboard',
      desc: 'Comprehensive insights on delivery performance, customer satisfaction, and operational metrics.',
      color: 'indigo',
      colSpan: 'md:col-span-2'
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
      traditional: '2-4 hours',
      advantage: true
    },
    {
      category: 'Cost per Delivery',
      skyway: '60% lower',
      traditional: 'Standard rate',
      advantage: true
    },
    {
      category: 'Environmental Impact',
      skyway: 'Zero emissions',
      traditional: 'High emissions',
      advantage: true
    },
    {
      category: 'Tracking Quality',
      skyway: 'Real-time GPS + Video',
      traditional: 'Basic location updates',
      advantage: true
    }
  ]

  return (
    <section className="relative bg-[#D4F4E8] overflow-hidden" style={{ marginTop: 0, paddingTop: '6rem', paddingBottom: '8rem' }}>

      {/* Top Wave Divider - Connecting from Hero */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180" style={{ marginTop: '-1px' }}>
        {/* This space is intentionally left blank as the Hero section's bottom wave covers the transition */}
      </div>

      {/* Decorative SVG Elements - Left Margin */}
      <div className="absolute left-0 top-20 w-32 h-32 opacity-[0.03]">
        <svg viewBox="0 0 200 200" className="w-full h-full text-blue-600">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="absolute left-8 top-96 w-24 h-24 opacity-[0.04]">
        <svg viewBox="0 0 100 100" className="w-full h-full text-purple-600">
          <path d="M50,10 L90,90 L10,90 Z" fill="currentColor" />
        </svg>
      </div>

      {/* Decorative SVG Elements - Right Margin */}
      <div className="absolute right-0 top-40 w-40 h-40 opacity-[0.03]">
        <svg viewBox="0 0 200 200" className="w-full h-full text-emerald-600">
          <rect x="20" y="20" width="160" height="160" fill="none" stroke="currentColor" strokeWidth="2" rx="20" />
          <rect x="50" y="50" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="2" rx="15" />
        </svg>
      </div>

      <div className="absolute right-12 bottom-96 w-28 h-28 opacity-[0.04]">
        <svg viewBox="0 0 100 100" className="w-full h-full text-orange-600">
          <polygon points="50,15 90,85 10,85" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="15" fill="currentColor" opacity="0.3" />
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-12 xl:px-16 max-w-7xl relative z-10">
        {/* Section Header - Apple Style */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm border border-white/60 mb-8"
          >
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            </div>
            <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">Key Features</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight"
          >
            Everything you need to{' '}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              scale your logistics.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-light"
          >
            A complete ecosystem designed for the future of urban delivery.
          </motion.p>
        </div>

        {/* Feature Cards Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {mainFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`
                  ${feature.colSpan}
                  bg-white/60 backdrop-blur-xl rounded-[32px] p-8 border border-white/50 shadow-sm hover:shadow-md transition-all duration-300
                  group
                `}
              >
                <div className="flex items-start justify-between mb-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-${feature.color}-50 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 text-${feature.color}-600`} />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">{feature.stat}</div>
                    {feature.statLabel && (
                      <div className="text-sm text-gray-500 font-medium">{feature.statLabel}</div>
                    )}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.desc}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-900 rounded-[32px] p-12 mb-24 relative overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />

          <div className="text-center mb-16 relative z-10">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight">
              Proven Track Record
            </h3>
            <p className="text-gray-400 text-lg">Performance metrics that speak for themselves</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-6 border border-white/10">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Comparison Section - Clean Apple Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-16">
            <h3 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight text-center">
              Why SkyWay?
            </h3>
          </div>

          <div className="bg-white/40 backdrop-blur-sm rounded-[32px] overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-8 px-12 py-8 border-b border-gray-200">
              <div></div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">SkyWay</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-400">Traditional</div>
              </div>
            </div>

            {/* Table Rows */}
            {comparison.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-8 px-12 py-10 border-b border-gray-100 last:border-0 items-center"
              >
                <div className="text-lg font-medium text-gray-900">{row.category}</div>
                <div className="text-center text-xl font-semibold text-gray-900">{row.skyway}</div>
                <div className="text-center text-lg text-gray-400">{row.traditional}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Wave Divider - Mint to White (Next Section Background) */}
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
    </section >
  )
}