'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BubbleCard } from '@/components/ui/skyway-components'
import { Package, Zap, CheckCircle, ArrowRight } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      icon: Package,
      title: "Package Pickup",
      description: "Partner drops package at SkyWay hub. Our automated system handles intake, weighing, and route optimization.",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      icon: Zap,
      title: "Drone Dispatch",
      description: "AI selects optimal drone and flight path. Semi-autonomous flight with real-time monitoring and weather adaptation.",
      color: "from-sky-gold to-yellow-500"
    },
    {
      id: 3,
      icon: CheckCircle,
      title: "Smart Delivery",
      description: "Secure drop-off at designated point. Customer receives real-time updates and proof of delivery with photo confirmation.",
      color: "from-green-500 to-green-600"
    }
  ]

  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-display">
            How It Works
          </h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Three simple steps to transform your logistics with drone delivery technology
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <BubbleCard className="text-center h-full p-6 bg-sky-slate rounded-2xl">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-sky-gold text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {step.id}
                </div>

                {/* Icon */}
                <motion.div 
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mt-4`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-neutral-300 leading-relaxed">{step.description}</p>
              </BubbleCard>

              {/* Connecting Arrow */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="hidden lg:block absolute top-1/2 -right-4 z-10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                >
                  <ArrowRight className="w-8 h-8 text-sky-gold" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Process Flow Animation */}
        <motion.div 
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-soft-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Live Process Flow</h3>
          
          <div className="relative overflow-hidden h-32 bg-gradient-to-r from-sky-navy/20 via-sky-blue/20 to-sky-navy/20 rounded-2xl">
            {/* Animated Timeline */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-sky-gold/50 -translate-y-0.5" />
            
            {/* Timeline Points */}
            <div className="absolute top-1/2 left-8 w-4 h-4 bg-sky-gold rounded-full -translate-y-2 shadow-glow-sm" />
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-sky-gold rounded-full -translate-y-2 -translate-x-2" />
            <div className="absolute top-1/2 right-8 w-4 h-4 bg-green-500 rounded-full -translate-y-2" />

            {/* Moving Progress Bar */}
            <motion.div 
              className="absolute top-1/2 left-8 h-0.5 bg-sky-gold -translate-y-0.5"
              initial={{ width: 0 }}
              whileInView={{ width: 'calc(100% - 4rem)' }}
              viewport={{ once: true }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />

            {/* Status Labels */}
            <div className="absolute bottom-4 left-8 text-xs text-neutral-300 -translate-x-1/2">Pickup</div>
            <div className="absolute bottom-4 left-1/2 text-xs text-neutral-300 -translate-x-1/2">In Transit</div>
            <div className="absolute bottom-4 right-8 text-xs text-neutral-300 translate-x-1/2">Delivered</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}