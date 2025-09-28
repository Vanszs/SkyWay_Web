'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BubbleButton, BubbleCard } from '@/components/ui/skyway-components'
import { ArrowRight, Play, MapPin, Zap, Shield } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-sky min-h-screen flex items-center">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 rounded-full bg-sky-gold/10 animate-float" />
        <div className="absolute top-40 -left-32 w-60 h-60 rounded-full bg-white/5 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-1/4 w-40 h-40 rounded-full bg-sky-gold/5 animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container-custom px-4 py-8 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >


            {/* Headline */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight font-display">
                Drone + System
                <br />
                <span className="text-gradient bg-gradient-to-r from-sky-gold to-yellow-300 bg-clip-text text-transparent">
                  as a Service
                </span>
                <br />
                <span className="text-2xl lg:text-3xl text-neutral-300">for Urban Logistics</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-neutral-200 leading-relaxed max-w-lg">
                Complete drone fleet hardware + integrated monitoring system for Surabaya's logistics partners. 
                We provide the drones and technology - you manage the packages.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <BubbleButton size="lg" className="text-sky-navy">
                Integrate with SkyWay System
                <ArrowRight className="ml-2 w-5 h-5" />
              </BubbleButton>
              
              <Link href="/tracking">
                <BubbleButton variant="outline" size="lg" className="border-sky-gold text-sky-gold hover:bg-sky-gold hover:text-white">
                  Track Shipment
                </BubbleButton>
              </Link>

              <Link href="/login">
                <BubbleButton variant="ghost" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  Admin Login
                </BubbleButton>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-4 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-sky-gold">50k+</div>
                <div className="text-xs lg:text-sm text-neutral-300">Deliveries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-sky-gold">99.8%</div>
                <div className="text-xs lg:text-sm text-neutral-300">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-sky-gold">15min</div>
                <div className="text-xs lg:text-sm text-neutral-300">Avg Delivery</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Interactive Demo */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative max-w-md mx-auto">
              {/* Main Demo Card */}
              <BubbleCard className="bg-white/10 backdrop-blur-md border-white/20 p-6 space-y-4" hover={false} glow={true}>
                {/* Tracking Feature Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-sky-gold rounded-full animate-pulse" />
                    <span className="text-white font-medium">Tracking Feature</span>
                  </div>
                  <span className="text-sky-gold text-sm font-mono">#DEMO</span>
                </div>

                {/* Feature Demo Card */}
                <div className="bg-gradient-to-br from-sky-blue/10 to-sky-gold/10 rounded-xl p-4 space-y-4">
                  {/* Demo Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-green-400">📱</span>
                      <span className="text-white">Real-time Tracking</span>
                    </div>
                    <span className="text-sky-gold text-xs font-medium">GPS Enabled</span>
                  </div>

                  {/* Simple Route Demo */}
                  <div className="relative h-16 bg-white/5 rounded-lg overflow-hidden">
                    {/* Route Line */}
                    <motion.div
                      className="absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-green-400 via-sky-gold to-orange-400 rounded-full transform -translate-y-1/2"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      style={{ originX: 0 }}
                    />

                    {/* Moving Drone */}
                    <motion.div
                      className="absolute top-1/2 w-5 h-5 flex items-center justify-center text-sky-gold transform -translate-y-1/2"
                      initial={{ left: 12 }}
                      animate={{ left: "calc(100% - 32px)" }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
                    >
                      🚁
                    </motion.div>

                    {/* Start Point */}
                    <div className="absolute left-2 top-1/2 w-2.5 h-2.5 bg-green-400 rounded-full transform -translate-y-1/2"></div>
                    <div className="absolute left-0 bottom-1 text-[8px] text-neutral-300">Start</div>

                    {/* End Point */}
                    <div className="absolute right-2 top-1/2 w-2.5 h-2.5 bg-orange-400 rounded-full transform -translate-y-1/2"></div>
                    <div className="absolute right-0 bottom-1 text-[8px] text-neutral-300">Delivery</div>
                  </div>

                  {/* Feature Highlights */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-green-400 text-sm">✓</span>
                      <span className="text-neutral-300">Live Location</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-green-400 text-sm">✓</span>
                      <span className="text-neutral-300">ETA Updates</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-green-400 text-sm">✓</span>
                      <span className="text-neutral-300">Route History</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-green-400 text-sm">✓</span>
                      <span className="text-neutral-300">Status Alerts</span>
                    </div>
                  </div>
                </div>

                {/* Demo Status */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-400">Interactive Demo</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-sky-gold rounded-full animate-pulse"></div>
                    <span className="text-sky-gold text-xs">Live Preview</span>
                  </div>
                </div>

                {/* Try Button */}
                <Link href="/tracking">
                  <BubbleButton size="sm" className="w-full">
                    Try Tracking Feature
                  </BubbleButton>
                </Link>
              </BubbleCard>

              {/* Floating Elements */}
              <motion.div 
                className="absolute -top-4 -right-4 bg-sky-gold text-sky-navy px-3 py-1 rounded-pill text-sm font-medium"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Feature Demo
              </motion.div>

              <motion.div 
                className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded-pill text-sm"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                GPS Tracking
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div 
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div 
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}