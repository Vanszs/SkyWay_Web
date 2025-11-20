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
      iconColor: 'text-blue-600'
    },
    {
      icon: Shield,
      title: '99.8% Reliability',
      desc: 'Advanced AI flight systems with redundant safety measures and weather adaptation.',
      iconColor: 'text-purple-600'
    },
    {
      icon: Zap,
      title: 'Zero Emissions',
      desc: '100% electric drones with sustainable charging from renewable energy sources.',
      iconColor: 'text-green-600'
    },
    {
      icon: MapPin,
      title: 'Real-time Tracking',
      desc: 'Live GPS tracking, instant notifications, and proof of delivery with photo confirmation.',
      iconColor: 'text-orange-600'
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

        {/* Simple Feature Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-20 lg:mb-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                {/* Simple Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center">
                    <feature.icon className={`w-6 h-6 ${feature.iconColor}`} strokeWidth={2} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
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