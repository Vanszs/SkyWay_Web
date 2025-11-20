'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Shield,
  Zap,
  Clock,
  MapPin,
  BarChart3,
  Smartphone
} from 'lucide-react'

export default function WhatWeProvide() {
  const features = [
    {
      icon: Clock,
      title: '15-min Delivery',
      desc: 'Average delivery time within urban zones. 10x faster than traditional ground delivery.',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      accentColor: 'bg-blue-600'
    },
    {
      icon: Shield,
      title: '99.8% Reliability',
      desc: 'Advanced AI flight systems with redundant safety measures and weather adaptation.',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      accentColor: 'bg-purple-600'
    },
    {
      icon: Zap,
      title: 'Zero Emissions',
      desc: '100% electric drones with sustainable charging from renewable energy sources.',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      accentColor: 'bg-green-600'
    },
    {
      icon: MapPin,
      title: 'Real-time Tracking',
      desc: 'Live GPS tracking, instant notifications, and proof of delivery with photo confirmation.',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      accentColor: 'bg-orange-600'
    }
  ]

  return (
    <section className="relative bg-air-mint overflow-hidden" style={{ marginTop: 0, paddingTop: '6rem', paddingBottom: '10rem' }}>

      <div className="container mx-auto px-6 lg:px-12 xl:px-16 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-gray-200 mb-4">
            <div className="w-2 h-2 rounded-full bg-blue-600" />
            <span className="text-sm font-medium text-gray-700 uppercase tracking-wider">Key Features</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 font-display">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              SkyWay
            </span>
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transform your logistics with cutting-edge drone technology that delivers speed, reliability, and sustainability.
          </p>
        </div>

        {/* Bento Box Grid - Creative Asymmetric Layout */}
        <div className="max-w-7xl mx-auto mb-20 lg:mb-24">
          {/* Grid Container - Complex Layout */}
          <div className="grid grid-cols-12 gap-4 lg:gap-5">
            
            {/* Card 1: 15-min Delivery - Large Horizontal (Top Left) */}
            <div className="col-span-12 md:col-span-7 lg:col-span-7 group">
              <div className="relative bg-white rounded-3xl p-8 lg:p-10 h-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-all duration-500 border-2 border-gray-200/80 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.03]">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="40" fill="currentColor" className="text-blue-600" />
                  </svg>
                </div>
                
                <div className="relative z-10">
                  {/* Large Icon */}
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50">
                      <Clock className="w-8 h-8 text-blue-600" strokeWidth={2} />
                    </div>
                  </div>
                  
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    FASTEST
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                    15-min Delivery
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed max-w-md">
                    Average delivery time within urban zones. 10x faster than traditional ground delivery.
                  </p>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-6 mt-6">
                    <div>
                      <div className="text-3xl font-bold text-blue-600">10x</div>
                      <div className="text-xs text-gray-500">Faster</div>
                    </div>
                    <div className="h-12 w-px bg-gray-200" />
                    <div>
                      <div className="text-3xl font-bold text-blue-600">15min</div>
                      <div className="text-xs text-gray-500">Average</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: 99.8% Reliability - Tall (Top Right) */}
            <div className="col-span-12 md:col-span-5 lg:col-span-5 md:row-span-2 group">
              <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 lg:p-10 h-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-all duration-500 border-2 border-purple-200 overflow-hidden">
                {/* Decorative Circles */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-200/30 rounded-full blur-3xl" />
                
                <div className="relative z-10 h-full flex flex-col">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-sm">
                      <Shield className="w-8 h-8 text-purple-600" strokeWidth={2} />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                    99.8% Reliability
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    Advanced AI flight systems with redundant safety measures and weather adaptation.
                  </p>
                  
                  {/* Big Number Display */}
                  <div className="mt-auto">
                    <div className="text-6xl lg:text-7xl font-bold text-purple-600 mb-2">99.8%</div>
                    <div className="text-sm text-gray-500">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Zero Emissions - Wide (Middle Left) */}
            <div className="col-span-12 md:col-span-7 lg:col-span-7 group">
              <div className="relative bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 lg:p-10 hover:shadow-2xl transition-all duration-500 border border-green-100 overflow-hidden">
                {/* SVG Pattern */}
                <div className="absolute bottom-0 right-0 opacity-5">
                  <svg width="200" height="200" viewBox="0 0 200 200">
                    <path d="M100,20 L120,60 L160,60 L130,85 L145,125 L100,100 L55,125 L70,85 L40,60 L80,60 Z" 
                          fill="currentColor" className="text-green-600" />
                  </svg>
                </div>
                
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="mb-4">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/80">
                        <Zap className="w-7 h-7 text-green-600" strokeWidth={2} />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                      Zero Emissions
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
                      100% electric drones with sustainable charging from renewable energy sources.
                    </p>
                  </div>
                  
                  {/* Icon Badge */}
                  <div className="hidden lg:flex items-center justify-center w-24 h-24 rounded-full bg-green-600/10">
                    <div className="text-4xl">🌱</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Real-time Tracking - Square (Bottom Right) */}
            <div className="col-span-12 md:col-span-12 lg:col-span-12 group">
              <div className="relative bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 rounded-3xl p-8 lg:p-10 hover:shadow-2xl transition-all duration-500 border border-orange-100 overflow-hidden">
                {/* Animated Pulse */}
                <div className="absolute top-8 right-8 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                <div className="absolute top-8 right-8 w-3 h-3 bg-orange-500 rounded-full animate-ping" />
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="mb-4">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/80">
                        <MapPin className="w-7 h-7 text-orange-600" strokeWidth={2} />
                      </div>
                    </div>
                    
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 text-orange-600 text-xs font-semibold mb-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
                      LIVE NOW
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                      Real-time Tracking
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Live GPS tracking, instant notifications, and proof of delivery with photo confirmation.
                    </p>
                  </div>
                  
                  {/* Mini Map Illustration */}
                  <div className="hidden md:flex items-center justify-center">
                    <div className="relative w-full max-w-xs aspect-square bg-white/50 backdrop-blur-sm rounded-2xl p-6">
                      <div className="absolute inset-4 border-2 border-dashed border-orange-300 rounded-xl" />
                      <div className="absolute top-8 left-8 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                      <div className="absolute bottom-12 right-12 w-4 h-4 bg-blue-500 rounded-full" />
                      <svg className="absolute inset-6" viewBox="0 0 100 100">
                        <path d="M20,80 Q30,50 50,40 T80,20" 
                              stroke="url(#lineGrad)" strokeWidth="2" fill="none" 
                              strokeDasharray="5,5" className="animate-pulse" />
                        <defs>
                          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f97316" />
                            <stop offset="100%" stopColor="#3b82f6" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
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