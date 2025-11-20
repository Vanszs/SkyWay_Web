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
  Globe,
  Clock3
} from 'lucide-react'

export default function WhatWeProvide() {
  const mainFeatures = [
    {
      icon: Clock,
      stat: '15min',
      title: 'Ultra-Fast Delivery',
      desc: '15-minute average delivery time within urban zones. 10x faster than traditional ground delivery.',
      color: 'blue'
    },
    {
      icon: DollarSign,
      stat: '60%',
      statLabel: 'Savings',
      title: 'Cost Effective',
      desc: 'Reduce delivery costs by up to 60% compared to motorcycle couriers. Pay per successful delivery.',
      color: 'green'
    },
    {
      icon: Leaf,
      stat: '0%',
      statLabel: 'Emission',
      title: 'Zero Emissions',
      desc: '100% electric drones with sustainable charging from renewable energy sources.',
      color: 'emerald'
    },
    {
      icon: Shield,
      stat: '99.8%',
      title: '99.8% Reliability',
      desc: 'Advanced AI flight systems with redundant safety measures and weather adaptation.',
      color: 'purple'
    },
    {
      icon: MapPin,
      stat: 'Live',
      statLabel: 'Updates',
      title: 'Real-time Tracking',
      desc: 'Live GPS tracking, instant notifications, and proof of delivery with photo confirmation.',
      color: 'orange'
    },
    {
      icon: BarChart3,
      stat: 'Full',
      statLabel: 'Analytics',
      title: 'Analytics Dashboard',
      desc: 'Comprehensive insights on delivery performance, customer satisfaction, and operational metrics.',
      color: 'indigo'
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
    <section className="relative bg-air-mint overflow-hidden" style={{ marginTop: 0, paddingTop: '6rem', paddingBottom: '8rem' }}>

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
        
        {/* Modern Header */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg border border-gray-100 mb-6"
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
            className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6 font-display"
          >
            Why Choose{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              SkyWay?
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto"
          >
            Transform your logistics with cutting-edge drone technology that delivers{' '}
            <span className="font-bold text-blue-600">speed</span>,{' '}
            <span className="font-bold text-purple-600">reliability</span>, and{' '}
            <span className="font-bold text-green-600">sustainability</span> in urban environments
          </motion.p>
        </div>

        {/* Main Features - Creative Asymmetric Bento Grid */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
            
            {/* Card 1: Ultra-Fast - Large Hero Card (Top Left Spanning) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="col-span-12 lg:col-span-8 group"
            >
              <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 lg:p-12 h-full min-h-[320px] shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-cyan-300/20 rounded-full blur-2xl" />
                
                <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between h-full gap-6">
                  <div className="flex-1">
                    {/* Mega Stat Display */}
                    <div className="inline-flex items-baseline gap-3 mb-6">
                      <div className="text-7xl lg:text-8xl font-black text-white drop-shadow-2xl">15</div>
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold text-white/90">min</span>
                        <span className="text-xs text-white/70 uppercase tracking-widest">Average</span>
                      </div>
                    </div>
                    
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold mb-4">
                      <Clock className="w-4 h-4" />
                      ULTRA-FAST DELIVERY
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
                      Lightning Speed Logistics
                    </h3>
                    <p className="text-white/80 text-base leading-relaxed max-w-lg">
                      15-minute average delivery time within urban zones. 10x faster than traditional ground delivery.
                    </p>
                    
                    {/* Mini Stats */}
                    <div className="flex items-center gap-6 mt-6">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">10x</span>
                        </div>
                        <span className="text-sm text-white/70">Faster</span>
                      </div>
                      <div className="h-8 w-px bg-white/30" />
                      <div className="flex items-center gap-2">
                        <Zap className="w-8 h-8 text-yellow-300" />
                        <span className="text-sm text-white/70">Speed Priority</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative Icon Circle */}
                  <div className="hidden lg:flex items-center justify-center w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm border-4 border-white/20 group-hover:scale-110 transition-transform duration-500">
                    <Clock className="w-16 h-16 text-white" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Cost Effective - Tall Right Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="col-span-12 lg:col-span-4 lg:row-span-2 group"
            >
              <div className="relative bg-white rounded-3xl p-8 h-full min-h-[320px] lg:min-h-[660px] shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-green-200 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-green-50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-100 rounded-full blur-3xl opacity-50" />
                
                <div className="relative z-10 h-full flex flex-col">
                  {/* Icon Badge */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-50 mb-6 self-start">
                    <DollarSign className="w-8 h-8 text-green-600" strokeWidth={2} />
                  </div>
                  
                  {/* Percentage Display */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-black text-green-600">60</span>
                      <span className="text-4xl font-bold text-green-500">%</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-100 text-green-700 text-xs font-bold mt-3">
                      COST SAVINGS
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Cost Effective
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Reduce delivery costs by up to 60% compared to motorcycle couriers. Pay per successful delivery.
                  </p>
                  
                  {/* Visual Comparison */}
                  <div className="mt-auto space-y-3 pt-6 border-t-2 border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Traditional</span>
                      <div className="flex-1 mx-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-gray-400" />
                      </div>
                      <span className="text-sm font-bold text-gray-400">100%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600 font-bold">SkyWay</span>
                      <div className="flex-1 mx-3 h-2 bg-green-100 rounded-full overflow-hidden">
                        <div className="h-full w-[40%] bg-gradient-to-r from-green-500 to-green-600" />
                      </div>
                      <span className="text-sm font-bold text-green-600">40%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Zero Emissions - Wide Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="col-span-12 lg:col-span-5 group"
            >
              <div className="relative bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl p-8 h-full min-h-[300px] shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Leaf Pattern Background */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <path d="M20,50 Q30,20 50,30 Q70,20 80,50 Q70,80 50,70 Q30,80 20,50" fill="white" />
                    <path d="M60,30 Q70,10 90,20" fill="white" />
                  </svg>
                </div>
                
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold mb-4">
                      <Leaf className="w-4 h-4" />
                      ECO-FRIENDLY
                    </div>
                    
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-7xl font-black text-white">0%</span>
                      <span className="text-xl text-white/80">Emission</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Zero Emissions
                    </h3>
                    <p className="text-white/90 leading-relaxed">
                      100% electric drones with sustainable charging from renewable energy sources.
                    </p>
                  </div>
                  
                  {/* Icon Badge Bottom */}
                  <div className="flex items-center gap-4 mt-6">
                    <div className="text-5xl">🌱</div>
                    <div className="text-5xl">⚡</div>
                    <div className="text-5xl">♻️</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 4: Reliability - Square Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="col-span-12 lg:col-span-3 group"
            >
              <div className="relative bg-white rounded-3xl p-8 h-full min-h-[300px] shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-purple-200 overflow-hidden">
                {/* Radial Gradient Background */}
                <div className="absolute inset-0 bg-gradient-radial from-purple-50 via-transparent to-transparent opacity-50" />
                
                <div className="relative z-10 flex flex-col items-center text-center h-full justify-between">
                  <div className="w-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-50 mb-6">
                      <Shield className="w-8 h-8 text-purple-600" strokeWidth={2} />
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-5xl font-black bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                        99.8%
                      </div>
                      <div className="text-xs text-purple-600 font-bold uppercase tracking-widest">Reliability</div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      AI-Powered Safety
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Advanced flight systems with redundant safety measures.
                    </p>
                  </div>
                  
                  {/* Check Icons */}
                  <div className="grid grid-cols-3 gap-2 w-full mt-6">
                    {[1,2,3].map((i) => (
                      <div key={i} className="w-full h-2 rounded-full bg-purple-200">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" style={{ width: '100%' }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 5: Real-time Tracking - Horizontal Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="col-span-12 lg:col-span-6 group"
            >
              <div className="relative bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 h-full min-h-[280px] shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Pulse Animation */}
                <div className="absolute top-8 right-8 w-4 h-4">
                  <div className="absolute w-4 h-4 bg-white rounded-full animate-ping" />
                  <div className="absolute w-4 h-4 bg-white rounded-full" />
                </div>
                
                <div className="relative z-10 h-full flex items-center gap-8">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold mb-4">
                      <MapPin className="w-4 h-4" />
                      LIVE TRACKING
                    </div>
                    
                    <h3 className="text-3xl font-bold text-white mb-4">
                      Real-time GPS
                    </h3>
                    <p className="text-white/90 leading-relaxed mb-6">
                      Live tracking, instant notifications, and photo confirmation.
                    </p>
                    
                    {/* Features List */}
                    <div className="space-y-2">
                      {['Live GPS', 'Push Alerts', 'Photo Proof'].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-white/90 text-sm font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Map Visual */}
                  <div className="hidden lg:block relative w-48 h-48">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-white/20 p-4">
                      <div className="relative w-full h-full">
                        <div className="absolute top-4 left-4 w-3 h-3 bg-white rounded-full animate-pulse" />
                        <div className="absolute bottom-4 right-4 w-4 h-4 bg-yellow-300 rounded-full" />
                        <svg className="absolute inset-2" viewBox="0 0 100 100">
                          <path d="M20,80 Q40,40 60,50 T85,25" stroke="white" strokeWidth="2" fill="none" strokeDasharray="5,5" opacity="0.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 6: Analytics - Square Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="col-span-12 lg:col-span-2 group"
            >
              <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 h-full min-h-[280px] shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
                  <BarChart3 className="w-16 h-16 text-white mb-4" strokeWidth={1.5} />
                  
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                    Full Analytics
                  </h3>
                  
                  <p className="text-white/80 text-sm leading-relaxed mb-4">
                    Comprehensive insights dashboard
                  </p>
                  
                  {/* Mini Chart Visualization */}
                  <div className="flex items-end justify-center gap-1 mt-auto">
                    {[40, 70, 50, 85, 65].map((height, i) => (
                      <div key={i} className="w-3 bg-white/30 rounded-t" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Stats Section - Modern Glassmorphism Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mb-20"
        >
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-700 overflow-hidden">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }} />
            </div>
            
            {/* Gradient Orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold mb-4">
                  <Activity className="w-4 h-4" />
                  PERFORMANCE METRICS
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white">
                  Proven Track Record
                </h3>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative group"
                    >
                      <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                        {/* Glow Effect on Hover */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300" />
                        
                        <div className="relative z-10 text-center">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                          </div>
                          <div className="text-3xl lg:text-4xl font-black text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                            {stat.value}
                          </div>
                          <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comparison Table - Split Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-xs font-bold mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              COMPARISON
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              SkyWay vs Traditional Delivery
            </h3>
            <p className="text-gray-600 text-lg">See how we revolutionize logistics</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* SkyWay Card - Premium */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 shadow-2xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-2xl font-bold text-white">SkyWay Drone</h4>
                  <div className="px-4 py-2 rounded-full bg-yellow-400 text-yellow-900 text-xs font-black">
                    WINNER 🏆
                  </div>
                </div>
                
                <div className="space-y-4">
                  {comparison.map((row, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="text-xs text-white/70 mb-1 uppercase tracking-wider font-semibold">
                        {row.category}
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-white font-semibold">{row.skyway}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Traditional Card - Basic */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-200"
            >
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-2xl font-bold text-gray-900">Traditional Courier</h4>
                <div className="px-4 py-2 rounded-full bg-gray-200 text-gray-600 text-xs font-bold">
                  OLD METHOD
                </div>
              </div>
              
              <div className="space-y-4">
                {comparison.map((row, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">
                      {row.category}
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600 font-medium">{row.traditional}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* Bottom Wave Divider - Mint to Blue with Premium Spacing */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]" style={{ marginBottom: '-1px' }}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="relative block w-full h-[100px] sm:h-[140px] lg:h-[180px]"
        >
          <path 
            fill="#1F7BFF" 
            fillOpacity="1" 
            d="M0,288L48,282.7C96,277,192,267,288,261.3C384,256,480,256,576,245.3C672,235,768,213,864,197.3C960,181,1056,171,1152,144C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  )
}