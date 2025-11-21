'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BubbleCard } from '@/components/ui/skyway-components'
import { Clock, DollarSign, Leaf, Shield, Zap, BarChart, Check } from 'lucide-react'

export default function Benefits() {
  const benefits = [
    {
      icon: Clock,
      title: "Ultra-Fast Delivery",
      description: "15-minute average delivery time within urban zones. 10x faster than traditional ground delivery.",
      metric: "15min",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: DollarSign,
      title: "Cost Effective",
      description: "Reduce delivery costs by up to 60% compared to motorcycle couriers. Pay per successful delivery.",
      metric: "60% Savings",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Leaf,
      title: "Zero Emissions",
      description: "100% electric drones with sustainable charging from renewable energy sources.",
      metric: "0% Emission",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Shield,
      title: "99.8% Reliability",
      description: "Advanced AI flight systems with redundant safety measures and weather adaptation.",
      metric: "99.8%",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Zap,
      title: "Real-time Tracking",
      description: "Live GPS tracking, instant notifications, and proof of delivery with photo confirmation.",
      metric: "Live Updates",
      color: "from-sky-gold to-yellow-500"
    },
    {
      icon: BarChart,
      title: "Analytics Dashboard",
      description: "Comprehensive insights on delivery performance, customer satisfaction, and operational metrics.",
      metric: "Full Analytics",
      color: "from-indigo-500 to-indigo-600"
    }
  ]

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12 xl:px-16 max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 font-display">
            Why Choose <span className="text-gradient bg-gradient-to-r from-sky-gold to-yellow-400 bg-clip-text text-transparent">SkyWay</span>?
          </h2>
          <p className="text-lg lg:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Transform your logistics with cutting-edge drone technology that delivers speed,
            reliability, and sustainability in urban environments
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <BubbleCard className="group h-full p-8 bg-sky-slate/80 backdrop-blur-sm rounded-3xl border border-white/10">
                {/* Icon & Metric */}
                <div className="flex items-start justify-between mb-6">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 10 }}
                  >
                    <benefit.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div className="text-right">
                    <div className="text-2xl lg:text-3xl font-bold text-sky-gold">{benefit.metric}</div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-sky-gold transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-neutral-300 leading-relaxed text-base">
                  {benefit.description}
                </p>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-sky-gold rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  initial={false}
                />
              </BubbleCard>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="bg-gradient-to-br from-sky-slate/80 to-sky-navy/80 backdrop-blur-sm rounded-3xl p-12 lg:p-16 border border-sky-gold/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-4xl lg:text-6xl font-bold text-sky-gold mb-3">50k+</div>
              <div className="text-base lg:text-lg text-white/90 font-medium">Successful Deliveries</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl lg:text-6xl font-bold text-sky-gold mb-3">250+</div>
              <div className="text-base lg:text-lg text-white/90 font-medium">Partner Companies</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-4xl lg:text-6xl font-bold text-sky-gold mb-3">15</div>
              <div className="text-base lg:text-lg text-white/90 font-medium">Cities Covered</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="mt-8 flex items-center gap-2 text-sky-blue font-medium">
                <div className="w-6 h-6 rounded-full bg-sky-blue/10 flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
                <span>Proven advantage</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}