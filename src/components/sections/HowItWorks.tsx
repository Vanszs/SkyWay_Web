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
      color: "text-sky-blue"
    },
    {
      id: 2,
      icon: Zap,
      title: "Drone Dispatch",
      description: "AI selects optimal flight path. Semi-autonomous rapid transport.",
      color: "text-sky-gold"
    },
    {
      id: 3,
      icon: CheckCircle,
      title: "Smart Delivery",
      description: "Secure drop-off with real-time photo confirmation.",
      color: "text-tech-cyan"
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

        {/* Floating White Card */}
        <motion.div
          className="bg-white/95 backdrop-blur-md rounded-[2rem] shadow-2xl p-8 lg:p-16 max-w-5xl mx-auto border border-white/50"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-deep-navy mb-4 font-display">
              How It Works
            </h2>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
              A seamless, automated process designed for speed and reliability.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-sky-blue/20 via-sky-gold/20 to-tech-cyan/20 -z-10" />

            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="flex flex-col items-center text-center relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                {/* Step Number Bubble */}
                <div className="absolute -top-3 right-1/3 w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center text-xs font-bold text-neutral-400 border border-neutral-100">
                  {step.id}
                </div>

                {/* Icon Circle */}
                <div className="w-24 h-24 rounded-full bg-white shadow-soft-md flex items-center justify-center mb-6 border border-neutral-50 group hover:scale-105 transition-transform duration-300">
                  <step.icon className={`w-10 h-10 ${step.color}`} />
                </div>

                <h3 className="text-xl font-bold text-deep-navy mb-3">{step.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed px-4">
                  {step.description}
                </p>

                {/* Mobile Arrow */}
                {index < steps.length - 1 && (
                  <div className="md:hidden mt-8 text-neutral-300">
                    <ArrowRight className="w-6 h-6 rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

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