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
      
      {/* Decorative SVG Elements - Left Margin */}
      <div className="absolute left-0 top-1/4 w-32 h-32 opacity-[0.05]">
        <svg viewBox="0 0 200 200" className="w-full h-full text-white">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="10,10" />
          <circle cx="100" cy="100" r="50" fill="currentColor" opacity="0.2" />
        </svg>
      </div>

      <div className="absolute left-8 bottom-1/4 w-24 h-24 opacity-[0.06]">
        <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-300">
          <path d="M50,10 L90,50 L50,90 L10,50 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      {/* Decorative SVG Elements - Right Margin */}
      <div className="absolute right-0 top-1/3 w-40 h-40 opacity-[0.05]">
        <svg viewBox="0 0 200 200" className="w-full h-full text-white">
          <polygon points="100,20 180,180 20,180" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="100" cy="100" r="30" fill="currentColor" opacity="0.3" />
        </svg>
      </div>

      <div className="absolute right-12 bottom-1/3 w-28 h-28 opacity-[0.06]">
        <svg viewBox="0 0 100 100" className="w-full h-full text-blue-200">
          <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="2" rx="10" />
          <rect x="30" y="30" width="40" height="40" fill="currentColor" opacity="0.3" rx="5" />
        </svg>
      </div>

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

        {/* Enhanced Visibility Header for Blue Background */}
        <div className="max-w-6xl mx-auto mb-16 lg:mb-20">
          
          {/* Top Row - Badge and Steps Counter */}
          <div className="flex items-center justify-between mb-8">
            {/* Left - Animated Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.3)] border-2 border-white"
            >
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg">
                <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Process</span>
                <span className="text-sm font-bold text-gray-900">Simple & Fast</span>
              </div>
            </motion.div>

            {/* Right - Step Counter */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.25)] border-2 border-white"
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">3</div>
              <div className="text-xs text-gray-700 uppercase tracking-wider font-bold">Steps</div>
            </motion.div>
          </div>

          {/* Main Title with Enhanced Contrast */}
          <div className="grid lg:grid-cols-12 gap-6 items-end">
            
            {/* Left - Title */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight font-display drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                  How It{' '}
                  <span className="relative inline-block text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                    Works
                  </span>
                </h2>
                
                {/* Decorative Line Element - Higher Contrast */}
                <div className="flex items-center gap-3 mt-6">
                  <div className="h-1 w-20 rounded-full bg-gradient-to-r from-white via-cyan-300 to-transparent shadow-lg" />
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-white shadow-lg" />
                    <div className="w-2 h-2 rounded-full bg-cyan-300 shadow-lg" />
                    <div className="w-2 h-2 rounded-full bg-blue-300 shadow-lg" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right - Solid White Card for Maximum Contrast */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative p-6 rounded-2xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.3)] border-2 border-gray-100"
              >
                {/* Icon Corner - Brighter */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center shadow-[0_8px_20px_rgba(251,146,60,0.6)]">
                  <svg className="w-6 h-6 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>

                <p className="text-sm lg:text-base text-gray-700 leading-relaxed font-medium">
                  A seamless, automated process designed for{' '}
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-orange-100 text-orange-700 font-bold border border-orange-300">
                    speed
                  </span>
                  {' '}and{' '}
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-green-100 text-green-700 font-bold border border-green-300">
                    reliability
                  </span>
                </p>
                
                {/* Stats with Better Contrast */}
                <div className="flex items-center gap-4 mt-5 pt-4 border-t-2 border-gray-200">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-300">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm" />
                    <span className="text-xs text-green-800 font-bold">Automated</span>
                  </div>
                  <div className="w-px h-4 bg-gray-300" />
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-300">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm" />
                    <span className="text-xs text-blue-800 font-bold">Real-time</span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
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

              {/* Connecting Arrow - Between Cards - High Visibility */}
              {index < steps.length - 1 && (
                <div className="flex justify-center py-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg border-2 border-gray-200">
                    <ArrowRight className="w-5 h-5 text-blue-600 rotate-90 font-bold" strokeWidth={3} />
                  </div>
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