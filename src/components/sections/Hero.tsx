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
        
        {/* Animated Clouds - SVG Collection */}
        
        {/* Large Cloud 1 - Top Center */}
        <motion.svg
          className="absolute top-10 left-[45%] w-56 h-32 opacity-25"
          animate={{ x: [0, -50, 0], y: [0, 20, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          viewBox="0 0 200 120"
        >
          <path d="M35,65 Q20,40 45,32 Q52,18 72,25 Q85,12 105,25 Q125,15 140,30 Q160,28 158,55 Q165,75 145,78 H40 Q20,78 35,65 Z" 
                fill="white" opacity="0.9" />
        </motion.svg>

        {/* Large Cloud 2 - Bottom Left */}
        <motion.svg
          className="absolute bottom-32 left-[5%] w-52 h-30 opacity-22"
          animate={{ x: [0, 45, 0], y: [0, -25, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          viewBox="0 0 200 120"
        >
          <path d="M40,68 Q25,43 50,35 Q57,21 77,28 Q90,15 110,28 Q130,18 145,33 Q165,31 163,58 Q170,78 150,81 H45 Q25,81 40,68 Z" 
                fill="white" opacity="0.85" />
        </motion.svg>

        {/* Medium Cloud - Original Collection */}
        <motion.svg
          className="absolute top-20 left-10 w-32 h-20 opacity-20"
          animate={{ x: [0, 30, 0], y: [0, -10, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          viewBox="0 0 200 120"
        >
          <path d="M40,60 Q30,40 50,35 Q55,25 70,30 Q80,20 95,30 Q110,25 115,35 Q130,35 125,55 Q130,70 115,70 H45 Q30,70 40,60 Z" 
                fill="white" opacity="0.8" />
        </motion.svg>

        <motion.svg
          className="absolute top-32 right-20 w-40 h-24 opacity-15"
          animate={{ x: [0, -40, 0], y: [0, 15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          viewBox="0 0 200 120"
        >
          <path d="M45,70 Q35,50 55,45 Q60,35 75,40 Q85,30 100,40 Q115,35 120,45 Q135,45 130,65 Q135,80 120,80 H50 Q35,80 45,70 Z" 
                fill="white" opacity="0.7" />
        </motion.svg>

        {/* Extra Large Cloud - Right Side */}
        <motion.svg
          className="absolute top-[35%] right-[8%] w-64 h-36 opacity-18"
          animate={{ x: [0, -60, 0], y: [0, 30, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          viewBox="0 0 200 120"
        >
          <path d="M30,70 Q15,38 42,28 Q50,12 73,20 Q88,8 110,22 Q135,10 152,28 Q175,25 173,58 Q182,82 158,86 H38 Q18,86 30,70 Z" 
                fill="white" opacity="0.95" />
        </motion.svg>

        <motion.svg
          className="absolute bottom-40 left-[15%] w-36 h-22 opacity-25"
          animate={{ x: [0, 25, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          viewBox="0 0 200 120"
        >
          <path d="M50,65 Q40,45 60,40 Q65,30 80,35 Q90,25 105,35 Q120,30 125,40 Q140,40 135,60 Q140,75 125,75 H55 Q40,75 50,65 Z" 
                fill="white" opacity="0.6" />
        </motion.svg>

        {/* Small Clouds - Additional */}
        <motion.svg
          className="absolute top-[55%] left-[25%] w-28 h-18 opacity-28"
          animate={{ x: [0, 35, 0], y: [0, -12, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
          viewBox="0 0 200 120"
        >
          <path d="M52,66 Q42,46 62,41 Q67,31 82,36 Q92,26 107,36 Q122,31 127,41 Q142,41 137,61 Q142,76 127,76 H57 Q42,76 52,66 Z" 
                fill="white" opacity="0.65" />
        </motion.svg>

        <motion.svg
          className="absolute top-[60%] right-[10%] w-28 h-18 opacity-20"
          animate={{ x: [0, -20, 0], y: [0, 10, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          viewBox="0 0 200 120"
        >
          <path d="M55,68 Q45,48 65,43 Q70,33 85,38 Q95,28 110,38 Q125,33 130,43 Q145,43 140,63 Q145,78 130,78 H60 Q45,78 55,68 Z" 
                fill="white" opacity="0.5" />
        </motion.svg>

        {/* Large Cloud 3 - Top Right Corner */}
        <motion.svg
          className="absolute top-[15%] right-[2%] w-48 h-28 opacity-20"
          animate={{ x: [0, -35, 0], y: [0, 18, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          viewBox="0 0 200 120"
        >
          <path d="M38,67 Q23,42 48,34 Q55,20 75,27 Q88,14 108,27 Q128,17 143,32 Q163,30 161,57 Q168,77 148,80 H43 Q23,80 38,67 Z" 
                fill="white" opacity="0.88" />
        </motion.svg>

        <motion.svg
          className="absolute bottom-[25%] right-[25%] w-32 h-20 opacity-18"
          animate={{ x: [0, 35, 0], y: [0, -15, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          viewBox="0 0 200 120"
        >
          <path d="M48,62 Q38,42 58,37 Q63,27 78,32 Q88,22 103,32 Q118,27 123,37 Q138,37 133,57 Q138,72 123,72 H53 Q38,72 48,62 Z" 
                fill="white" opacity="0.7" />
        </motion.svg>
        
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
