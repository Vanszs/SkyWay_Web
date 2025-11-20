'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BubbleButton } from '@/components/ui/skyway-components'
import { ArrowRight, Bell, MapPin, Package, User } from 'lucide-react'

export default function CTA() {
  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-sky-blue to-deep-navy overflow-hidden">
      {/* Layered Wave Shapes Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute bottom-0 left-0 w-full h-full opacity-10" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 400C240 550 480 550 720 400C960 250 1200 250 1440 400V800H0V400Z" fill="white" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-full h-full opacity-5" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 600C300 500 600 500 900 600C1200 700 1350 700 1440 600V800H0V600Z" fill="white" />
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-12 xl:px-16 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg lg:text-xl text-sky-50 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Track shipments, manage fleets, and get real-time notifications
              directly from our mobile app.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Link href="/demo">
                <BubbleButton variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  View Demo
                </BubbleButton>
              </Link>
            </div>
          </motion.div>

          {/* Right Content - Phone Mockup */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Phone Frame */}
            <div className="relative w-[300px] h-[600px] bg-deep-navy rounded-[3rem] border-[8px] border-deep-navy shadow-2xl overflow-hidden">
              {/* Screen */}
              <div className="w-full h-full bg-white relative overflow-hidden">
                {/* Status Bar */}
                <div className="h-8 bg-sky-blue flex justify-between items-center px-6 text-[10px] text-white font-bold">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-white rounded-full opacity-50" />
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>

                {/* App Header */}
                <div className="bg-sky-blue p-6 pb-12 rounded-b-[2rem] shadow-sm relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white relative">
                      <Bell className="w-4 h-4" />
                      <div className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full border border-sky-blue" />
                    </div>
                  </div>
                  <div className="text-white">
                    <div className="text-sm opacity-80">Good Morning,</div>
                    <div className="text-2xl font-bold">Budi Santoso</div>
                  </div>
                </div>

                {/* Floating Card - Active Delivery */}
                <div className="mx-4 -mt-8 bg-white rounded-2xl p-4 shadow-lg relative z-20">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-sky-blue bg-sky-50 px-2 py-1 rounded-full">In Transit</span>
                    <span className="text-xs text-neutral-400">2 mins away</span>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-blue">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-deep-navy">Package #8832</div>
                      <div className="text-xs text-neutral-500">Electronics • 2.5kg</div>
                    </div>
                  </div>
                  <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-sky-blue h-full w-[85%]" />
                  </div>
                </div>

                {/* Map Area Placeholder */}
                <div className="absolute inset-0 top-[200px] bg-sky-50 z-0">
                  {/* Map Pattern */}
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#2B7BFF 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                  {/* Route Line */}
                  <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                    <path d="M150 100 Q 200 200 150 300" stroke="#2B7BFF" strokeWidth="3" fill="none" strokeDasharray="5 5" />
                    <circle cx="150" cy="100" r="6" fill="#2B7BFF" />
                    <circle cx="150" cy="300" r="6" fill="#2B7BFF" />
                  </svg>

                  {/* Drone Icon */}
                  <div className="absolute top-[180px] left-[180px] w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-sky-blue animate-bounce-gentle">
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Nav */}
                <div className="absolute bottom-0 left-0 w-full bg-white border-t border-neutral-100 p-4 flex justify-around text-neutral-400">
                  <div className="text-sky-blue"><MapPin className="w-6 h-6" /></div>
                  <div><Package className="w-6 h-6" /></div>
                  <div><User className="w-6 h-6" /></div>
                </div>
              </div>
            </div>

            {/* Floating Elements around Phone */}
            <div className="absolute top-1/4 -right-10 w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl animate-float" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-1/4 -left-10 w-20 h-20 bg-sky-gold/20 backdrop-blur-md rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave Divider (Strong Blue -> Footer Gradient) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px] lg:h-[120px]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-sky-navy" style={{ transform: 'scaleY(-1) translateY(-120px)' }}></path>
          {/* Footer Gradient is #0F1E3D (sky-navy) to #071021. 
                So fill-sky-navy is a good start. 
                Let's use a standard wave shape.
            */}
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-sky-navy"></path>
        </svg>
      </div>
    </section>
  )
}