'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section
      className="
        relative min-h-screen flex items-center justify-center overflow-hidden pt-20
        bg-gradient-to-br from-[#1F7BFF] via-[#1769FF] to-[#0F5BFF]
        text-white
      "
      style={{ width: '100%', minHeight: '100vh', paddingBottom: '12rem' }}
    >
      {/* Abstract Blue Tech Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        
        {/* Rounded Blobs */}
        <div 
          className="absolute opacity-[0.32]"
          style={{
            top: '-40px',
            left: '-20px',
            width: '380px',
            height: '380px',
            backgroundColor: '#6EA4FF',
            borderRadius: '180px'
          }}
        />
        
        <div 
          className="absolute opacity-[0.35]"
          style={{
            bottom: '-20px',
            right: '-15px',
            width: '420px',
            height: '420px',
            backgroundColor: '#003DCC',
            borderRadius: '210px'
          }}
        />

        {/* Soft Blur Circle */}
        <div 
          className="absolute opacity-[0.55]"
          style={{
            top: '120px',
            left: '120px',
            width: '260px',
            height: '260px',
            backgroundColor: '#6EA4FF',
            borderRadius: '50%',
            filter: 'blur(60px)'
          }}
        />

        {/* Diagonal Tech Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-85">
          {/* Right side lines */}
          <line x1="600" y1="200" x2="760" y2="200" 
            stroke="url(#lineGradient)" strokeWidth="2" 
            style={{ transform: 'rotate(-30deg)', transformOrigin: '600px 200px' }} />
          <line x1="640" y1="260" x2="800" y2="260" 
            stroke="url(#lineGradient)" strokeWidth="2" 
            style={{ transform: 'rotate(-30deg)', transformOrigin: '640px 260px' }} />
          <line x1="680" y1="340" x2="840" y2="340" 
            stroke="url(#lineGradient)" strokeWidth="2" 
            style={{ transform: 'rotate(-30deg)', transformOrigin: '680px 340px' }} />
          <line x1="740" y1="420" x2="900" y2="420" 
            stroke="url(#lineGradient)" strokeWidth="2" 
            style={{ transform: 'rotate(-30deg)', transformOrigin: '740px 420px' }} />

          {/* Left side lines */}
          <line x1="200" y1="280" x2="360" y2="280" 
            stroke="url(#lineGradient)" strokeWidth="2" 
            style={{ transform: 'rotate(-30deg)', transformOrigin: '200px 280px' }} />
          <line x1="240" y1="340" x2="400" y2="340" 
            stroke="url(#lineGradient)" strokeWidth="2" 
            style={{ transform: 'rotate(-30deg)', transformOrigin: '240px 340px' }} />
          <line x1="280" y1="400" x2="440" y2="400" 
            stroke="url(#lineGradient)" strokeWidth="2" 
            style={{ transform: 'rotate(-30deg)', transformOrigin: '280px 400px' }} />
          <line x1="320" y1="480" x2="480" y2="480" 
            stroke="url(#lineGradient)" strokeWidth="2" 
            style={{ transform: 'rotate(-30deg)', transformOrigin: '320px 480px' }} />

          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9AFFE0" />
              <stop offset="100%" stopColor="#63F7D0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content - Optimized Layout */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="flex flex-col items-center text-center space-y-6 sm:space-y-8"
        >
          {/* Eyebrow Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center justify-center rounded-full bg-white/15 backdrop-blur-md px-5 py-2.5 text-xs sm:text-sm font-medium uppercase tracking-[0.15em] text-white/95 border border-white/20 shadow-lg"
          >
            <span className="mr-2.5 h-2 w-2 rounded-full bg-[#63F7D0] animate-pulse shadow-[0_0_8px_rgba(99,247,208,0.8)]" />
            Intelligent Drone Logistics
          </motion.div>

          {/* Main Heading - Improved Hierarchy */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display font-bold tracking-tight leading-[1.08] max-w-4xl"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
              textShadow: '0 4px 20px rgba(0,0,0,0.15)'
            }}
          >
            The Future of
            <br />
            <span className="bg-gradient-to-r from-white via-[#F8FBFF] to-[#E0F2FF] bg-clip-text text-transparent">
              Urban Logistics
            </span>
          </motion.h1>

          {/* Subheading - Better Readability */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mx-auto max-w-3xl font-normal leading-[1.65] text-white/90"
            style={{
              fontSize: 'clamp(1.05rem, 2.5vw, 1.35rem)',
              textShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}
          >
            Experience lightning-fast, semi-autonomous drone logistics designed for modern cities.
            SkyWay connects businesses using intelligent air corridors powered by IoT and swarm
            navigation.
          </motion.p>

          {/* CTA Buttons - Enhanced Spacing & Design */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col items-center justify-center gap-4 pt-6 sm:flex-row sm:gap-5"
          >
            {/* Primary Button */}
            <Link href="/tracking">
              <motion.button
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="
                  group relative inline-flex items-center justify-center gap-3
                  rounded-full bg-white px-9 py-4 sm:px-10 sm:py-4.5
                  text-base sm:text-lg font-semibold
                  text-[#1769FF] 
                  shadow-[0_10px_40px_rgba(255,255,255,0.25),0_0_0_1px_rgba(255,255,255,0.1)]
                  transition-all duration-300
                  hover:shadow-[0_15px_50px_rgba(255,255,255,0.35),0_0_0_1px_rgba(255,255,255,0.2)]
                  focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30
                  min-w-[200px] sm:min-w-[220px]
                "
              >
                <span className="relative z-10 font-semibold">Track Shipment</span>
                <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </Link>

            {/* Secondary Button */}
            <Link href="/demo">
              <motion.button
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="
                  inline-flex items-center justify-center gap-3
                  rounded-full border-2 border-white/40 bg-white/10
                  backdrop-blur-md
                  px-9 py-4 sm:px-10 sm:py-4.5
                  text-base sm:text-lg font-semibold
                  text-white
                  shadow-[0_10px_30px_rgba(0,0,0,0.15)]
                  transition-all duration-300
                  hover:border-white/60 hover:bg-white/15
                  hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]
                  focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30
                  min-w-[200px] sm:min-w-[220px]
                "
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                  <Play className="h-4.5 w-4.5 fill-current" />
                </span>
                <span className="font-semibold">Watch Demo</span>
              </motion.button>
            </Link>
          </motion.div>

        </motion.div>
      </div>

      {/* Bottom smooth mint wave - seamless transition to green section with premium spacing */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full overflow-hidden leading-[0] block" style={{ marginBottom: '-1px' }}>
        <svg
          className="relative block h-[100px] w-[calc(100%+1.3px)] sm:h-[140px] lg:h-[180px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ display: 'block' }}
        >
          <path
            d="M0,50 C200,100 400,20 600,60 C800,100 1000,40 1200,70 L1200,120 L0,120 Z"
            fill="#D4F4E8"
          />
        </svg>
      </div>
    </section>
  )
}

// Helper component tidak diperlukan lagi untuk desain baru
