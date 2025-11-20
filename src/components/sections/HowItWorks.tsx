'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Package, Zap, CheckCircle, ArrowRight } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      icon: Package,
      title: "Package Pickup",
      description: "Partner drops package at SkyWay hub. Automated intake & weighing.",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      numberBg: "bg-blue-600"
    },
    {
      id: 2,
      icon: Zap,
      title: "Drone Dispatch",
      description: "AI selects optimal flight path. Semi-autonomous rapid transport.",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      numberBg: "bg-purple-600"
    },
    {
      id: 3,
      icon: CheckCircle,
      title: "Smart Delivery",
      description: "Secure drop-off with real-time photo confirmation.",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      numberBg: "bg-green-600"
    }
  ]

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-br from-[#1F7BFF] via-[#1769FF] to-[#0F5BFF] overflow-hidden" style={{ marginTop: 0, paddingTop: 0 }}>
      
      {/* Top Wave from Features - Smooth Premium Transition */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180" style={{ marginTop: '-1px' }}>
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

      <div className="container mx-auto px-6 lg:px-12 xl:px-16 max-w-7xl relative z-10" style={{ paddingTop: '10rem', paddingBottom: '2rem' }}>

        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-sm font-medium text-white uppercase tracking-wider">Simple Process</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 font-display"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base lg:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            A seamless, automated process designed for speed and reliability.
          </motion.p>
        </div>

        {/* Modern Flat Cards - Horizontal Layout */}
        <div className="grid gap-5 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative bg-white rounded-2xl p-6 lg:p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
                
                {/* Left Side - Number & Icon */}
                <div className="flex items-start gap-6">
                  {/* Step Number Circle */}
                  <div className="flex-shrink-0">
                    <div className={`w-14 h-14 rounded-2xl ${step.numberBg} flex items-center justify-center shadow-lg`}>
                      <span className="text-2xl font-bold text-white">{step.id}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                      
                      {/* Icon Badge */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${step.bgColor} flex items-center justify-center ml-4`}>
                        <step.icon className={`w-6 h-6 ${step.iconColor}`} strokeWidth={2} />
                      </div>
                    </div>
                    
                    <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* SVG Decoration - Bottom Right */}
                <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5 overflow-hidden rounded-2xl pointer-events-none">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="70" cy="70" r="40" className={step.iconColor} fill="currentColor" />
                    <circle cx="30" cy="30" r="20" className={step.iconColor} fill="currentColor" opacity="0.5" />
                  </svg>
                </div>
              </div>

              {/* Connecting Arrow - Between Cards */}
              {index < steps.length - 1 && (
                <div className="flex justify-center py-3">
                  <ArrowRight className="w-5 h-5 text-white/40 rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>

      {/* Bottom Wave Divider (Mint -> Light Sky Blue) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px] lg:h-[120px]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-light-sky-blue" style={{ transform: 'scaleY(-1) translateY(-120px)' }}></path>
          {/* Actually, to transition TO Light Sky Blue, the SVG should be Light Sky Blue and sit at the bottom. 
                Standard wave: fill is the color of the NEXT section. 
                So fill-light-sky-blue is correct. 
                But the shape needs to look like a wave. 
                Let's use a standard bottom wave.
             */}
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-light-sky-blue"></path>
        </svg>
      </div>
    </section>
  )
}