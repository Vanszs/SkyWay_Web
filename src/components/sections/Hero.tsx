'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Cloud, Wind } from 'lucide-react'

export default function Hero() {
  return (
    <section
      className="
        relative min-h-screen flex items-center justify-center overflow-hidden pt-20
        bg-gradient-to-b from-sky-blue via-sky-blue/80 via-40% to-sky-blue/30
      "
      style={{ width: '100%', minHeight: '100vh', paddingBottom: '8rem' }}
    >
      {/* Blue Sky Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Cloud 1 - Top Left (Slow Float) */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.8 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-20 left-[10%] text-white/80"
        >
          <Cloud className="w-32 h-32 fill-white blur-sm" />
        </motion.div>
        <motion.div
          animate={{ x: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[10%]"
        >
          <Cloud className="w-32 h-32 text-white/90 fill-white" />
        </motion.div>

        {/* Cloud 2 - Top Right (Slower) */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.6 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute top-32 right-[15%] text-white/70"
        >
          <Cloud className="w-48 h-48 fill-white blur-md" />
        </motion.div>
        <motion.div
          animate={{ x: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-[15%]"
        >
          <Cloud className="w-48 h-48 text-white/80 fill-white" />
        </motion.div>

        {/* Cloud 3 - Bottom Left (Subtle) */}
        <motion.div
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-[5%] opacity-60"
        >
          <Cloud className="w-24 h-24 text-white fill-white" />
        </motion.div>

        {/* Vector Elements - Birds/Drones */}
        <motion.div
          initial={{ x: -50, y: 50, opacity: 0 }}
          animate={{ x: "100vw", y: -100, opacity: [0, 1, 1, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute top-1/3 left-0"
        >
          {/* Simple Bird/Drone Silhouette */}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-teal/20 rotate-12">
            <path d="M2 12L22 12M12 2L12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
          </svg>
        </motion.div>

        {/* Wind/Air Lines */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-1 bg-gradient-to-r from-transparent via-white to-transparent rotate-[-5deg]" />
          <div className="absolute top-1/2 right-1/4 w-96 h-1 bg-gradient-to-r from-transparent via-white to-transparent rotate-[-3deg]" />
        </div>

      </div>

      {/* Hero Content - Apple Style Typography */}
      <div className="container relative z-20 mx-auto px-6 lg:px-12 xl:px-16 max-w-7xl">
        <div className="text-center max-w-5xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/40 shadow-sm mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-mint-green"></span>
            </span>
            <span className="text-sm font-bold text-text-dark tracking-wide uppercase">The Future of Logistics</span>
          </motion.div>

          {/* Headline - Apple Style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.95] tracking-tighter mb-8 text-text-dark drop-shadow-sm">
              Drone delivery.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-purple">Reimagined.</span>
            </h1>
          </motion.div>

          {/* Subtitle - Clean & Minimal */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl sm:text-2xl lg:text-3xl text-text-gray font-medium leading-relaxed mb-10 max-w-3xl mx-auto tracking-tight"
          >
            Ultra-fast, eco-friendly deliveries powered by AI.
            <br className="hidden sm:block" />
            Experience the future of logistics today.
          </motion.p>

          {/* CTA Buttons - Apple Style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <Link href="/tracking">
              <button className="group relative px-8 py-4 bg-mint-green text-white rounded-full font-bold text-lg hover:bg-mint-green/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
                Track delivery
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <Link href="/admin">
              <button className="group relative px-8 py-4 bg-white/80 backdrop-blur-sm text-teal rounded-full font-bold text-lg border border-teal/20 hover:bg-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm">
                <Play className="inline-block mr-2 w-5 h-5 fill-current" />
                Watch demo
              </button>
            </Link>
          </motion.div>

          {/* Stats - Minimal & Clean */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto border-t border-teal/10 pt-10"
          >
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-teal mb-1 tracking-tight">15min</div>
              <div className="text-sm font-bold text-text-gray uppercase tracking-wider">Avg delivery</div>
            </div>
            <div className="text-center border-l border-r border-teal/10">
              <div className="text-3xl sm:text-4xl font-bold text-teal mb-1 tracking-tight">99.8%</div>
              <div className="text-sm font-bold text-text-gray uppercase tracking-wider">Reliability</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-mint-green mb-1 tracking-tight">0%</div>
              <div className="text-sm font-bold text-text-gray uppercase tracking-wider">Emissions</div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom Wave Divider - Smooth Transition to Next Section */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]" style={{ marginBottom: '-1px' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="relative block w-full h-[80px] sm:h-[120px] lg:h-[160px]"
        >
          <path
            fill="#D4F4E8" // Matches WhatWeProvide background
            fillOpacity="1"
            d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,149.3C672,139,768,149,864,170.7C960,192,1056,224,1152,224C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  )
}
