'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BubbleCard, BubbleButton } from '@/components/ui/skyway-components'
import { 
  Plane, 
  Monitor, 
  Battery, 
  Shield, 
  Wifi, 
  MapPin, 
  BarChart3, 
  Settings,
  Zap,
  Clock,
  Cpu,
  Cloud,
  Smartphone,
  Globe,
  ArrowRight,
  CheckCircle,
  Target,
  Layers,
  Users
} from 'lucide-react'

type TabType = 'hardware' | 'software' | 'integration'

export default function WhatWeProvide() {
  const [activeTab, setActiveTab] = useState<TabType>('hardware')

  const tabs = [
    { 
      id: 'hardware' as TabType, 
      label: 'Drone Hardware', 
      icon: Plane,
      color: 'from-sky-gold to-yellow-500'
    },
    { 
      id: 'software' as TabType, 
      label: 'Monitoring System', 
      icon: Monitor,
      color: 'from-sky-gold to-sky-gold' 
    },
    { 
      id: 'integration' as TabType, 
      label: 'Full Integration', 
      icon: Layers,
      color: 'from-sky-gold to-yellow-500'
    }
  ]

  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 bg-sky-gold/10 px-6 py-3 rounded-full mb-6">
            <Target className="w-5 h-5 text-sky-gold" />
            <span className="text-sky-gold font-semibold">Complete Solution</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 font-display">
            What We <span className="text-gradient bg-gradient-to-r from-sky-gold to-sky-gold bg-clip-text text-transparent">Provide</span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-4xl mx-auto leading-relaxed">
            SkyWay delivers complete drone hardware + integrated monitoring system 
            for logistics partners in Surabaya's urban environment
          </p>
        </motion.div>

        {/* Interactive Tabs */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-center mb-12">
            <div className="bg-sky-navy/30 backdrop-blur-xl p-2 rounded-2xl shadow-xl border border-sky-gold/30">
              <div className="flex space-x-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.id
                  
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex items-center space-x-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
                        isActive 
                          ? 'text-white shadow-lg' 
                          : 'text-neutral-400 hover:text-white hover:bg-sky-gold/30'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-xl`}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <Icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-white' : ''}`} />
                      <span className="relative z-10">{tab.label}</span>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Content Based on Tab */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'hardware' && (
              <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  {/* Left Content */}
                  <div className="lg:col-span-5">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-14 h-14 bg-gradient-to-r from-sky-navy to-sky-blue rounded-3xl flex items-center justify-center">
                          <Plane className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-white">Professional Drone Fleet</h3>
                          <p className="text-sky-gold font-medium">Semi-autonomous • Urban optimized</p>
                        </div>
                      </div>

                      <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
                        Professional-grade semi-autonomous drones designed specifically for urban logistics 
                        with advanced safety features, weather resistance, and reliable performance.
                      </p>

                      {/* Floating Feature Cards */}
                      <div className="space-y-4">
                        {[
                          { icon: Shield, text: 'Redundant safety systems & obstacle avoidance', color: 'text-sky-navy' },
                          { icon: Cloud, text: 'Weather-adaptive flight control & monitoring', color: 'text-sky-gold' },
                          { icon: MapPin, text: 'Secure GPS-tracked package compartment', color: 'text-sky-gold' },
                          { icon: Zap, text: 'Emergency protocols & return-to-base systems', color: 'text-sky-navy' }
                        ].map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center space-x-4 p-4 bg-sky-slate rounded-2xl hover:bg-sky-slate/80 transition-all duration-300"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            whileHover={{ scale: 1.02, x: 10 }}
                          >
                            <div className={`w-10 h-10 bg-sky-gold/20 rounded-xl flex items-center justify-center shadow-sm`}>
                              <feature.icon className={`w-5 h-5 ${feature.color}`} />
                            </div>
                            <span className="text-neutral-200 font-medium">{feature.text}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Stats Grid */}
                  <div className="lg:col-span-7">
                    <div className="grid grid-cols-2 gap-6">
                      {[
                      {
                        icon: MapPin,
                        label: 'Range',
                        value: '15km',
                        desc: 'Urban coverage',
                        color: 'from-sky-slate to-sky-blue'
                      },
                        { icon: Battery, label: 'Payload', value: '2.5kg', desc: 'Max capacity', color: 'from-sky-gold to-sky-gold' },
                      { icon: Clock, label: 'Speed', value: '45km/h', desc: 'Cruise speed', color: 'from-sky-slate to-sky-blue' },
                        { icon: Shield, label: 'Safety', value: '99.8%', desc: 'Success rate', color: 'from-sky-gold to-sky-gold' }
                      ].map((stat, index) => (
                        <motion.div
                          key={index}
                          className={`relative p-8 bg-gradient-to-br ${stat.color} rounded-3xl text-white overflow-hidden group hover:shadow-2xl transition-all duration-500`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          whileHover={{ scale: 1.05, rotateY: 5 }}
                        >
                          <div className="absolute top-4 right-4 opacity-20">
                            <stat.icon className="w-12 h-12" />
                          </div>
                          <div className="relative z-10">
                            <div className="flex items-center space-x-2 mb-3">
                              <stat.icon className="w-5 h-5" />
                              <span className="text-sm font-medium opacity-90">{stat.label}</span>
                            </div>
                            <div className="text-3xl font-bold mb-1">{stat.value}</div>
                            <div className="text-sm opacity-80">{stat.desc}</div>
                          </div>
                          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'software' && (
              <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  {/* Left Content */}
                  <div className="lg:col-span-6">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-14 h-14 bg-gradient-to-r from-sky-gold to-sky-gold rounded-3xl flex items-center justify-center">
                          <Monitor className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-white">Integrated Monitoring Platform</h3>
                          <p className="text-sky-gold font-medium">Real-time • API-first • Analytics</p>
                        </div>
                      </div>

                      <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
                        End-to-end fleet management platform with real-time tracking, automated logistics 
                        optimization, and comprehensive analytics for intelligent drone operations.
                      </p>

                      {/* System Features */}
                      <div className="space-y-4">
                        {[
                          { icon: Wifi, text: 'Real-time flight tracking & telemetry dashboard', color: 'text-sky-gold' },
                          { icon: Cpu, text: 'RESTful API integration for partner systems', color: 'text-sky-gold' },
                          { icon: BarChart3, text: 'Automated flight planning & route optimization', color: 'text-sky-navy' },
                          { icon: Smartphone, text: 'Mobile apps for drivers & customer notifications', color: 'text-sky-gold' }
                        ].map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center space-x-4 p-4 bg-gradient-to-r from-sky-gold/5 to-orange-100/30 rounded-2xl border border-sky-gold/20 hover:border-sky-gold/40 transition-all duration-300"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            whileHover={{ scale: 1.02, x: 10 }}
                          >
                            <div className="w-10 h-10 bg-sky-gold/20 rounded-xl flex items-center justify-center shadow-sm">
                              <feature.icon className={`w-5 h-5 ${feature.color}`} />
                            </div>
                            <span className="text-neutral-200 font-medium">{feature.text}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Tech Stack */}
                  <div className="lg:col-span-6">
                    <div className="grid grid-cols-2 gap-6">
                      {[
                        { icon: Settings, label: 'API', value: 'RESTful', desc: 'Easy integration', color: 'from-sky-gold to-sky-gold' },
                        { icon: Wifi, label: 'Updates', value: '5sec', desc: 'Real-time data', color: 'from-sky-navy to-sky-blue' },
                        { icon: BarChart3, label: 'Analytics', value: 'Advanced', desc: 'Full insights', color: 'from-sky-gold to-sky-gold' },
                        { icon: Zap, label: 'Response', value: 'Instant', desc: 'Auto alerts', color: 'from-sky-navy to-sky-blue' }
                      ].map((tech, index) => (
                        <motion.div
                          key={index}
                          className={`relative p-8 bg-gradient-to-br ${tech.color} rounded-3xl text-white overflow-hidden group`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          whileHover={{ scale: 1.05, rotateX: 5 }}
                        >
                          <div className="absolute top-4 right-4 opacity-20">
                            <tech.icon className="w-12 h-12" />
                          </div>
                          <div className="relative z-10">
                            <div className="flex items-center space-x-2 mb-3">
                              <tech.icon className="w-5 h-5" />
                              <span className="text-sm font-medium opacity-90">{tech.label}</span>
                            </div>
                            <div className="text-3xl font-bold mb-1">{tech.value}</div>
                            <div className="text-sm opacity-80">{tech.desc}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'integration' && (
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex justify-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-sky-navy to-sky-blue rounded-full flex items-center justify-center">
                      <Layers className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-4xl font-bold text-white mb-6">Complete Integration Solution</h3>
                  <p className="text-xl text-neutral-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                    Our unified approach combines cutting-edge drone hardware with sophisticated monitoring software, 
                    delivering everything logistics partners need for successful urban operations.
                  </p>

                  {/* Integration Benefits */}
                  <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {[
                      {
                        icon: CheckCircle,
                        title: 'Seamless Setup',
                        desc: 'Hardware and software pre-integrated for immediate deployment'
                      },
                      {
                        icon: Users,
                        title: 'Single Support',
                        desc: 'One contact point for hardware, software, and operational support'
                      },
                      {
                        icon: Zap,
                        title: 'Rapid ROI',
                        desc: 'Faster implementation timeline with proven integration patterns'
                      }
                    ].map((benefit, index) => (
                      <motion.div
                        key={index}
                        className="p-8 bg-sky-slate rounded-3xl hover:bg-sky-slate/80 transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <benefit.icon className="w-12 h-12 text-sky-gold mx-auto mb-4" />
                        <h4 className="text-xl font-bold text-white mb-3">{benefit.title}</h4>
                        <p className="text-neutral-300">{benefit.desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="bg-gradient-sky rounded-3xl p-8 lg:p-12"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-2xl font-bold text-white mb-4">
                      Hardware + Software = Complete Service
                    </h4>
                    <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                      No integration headaches. No compatibility issues. Just a complete, 
                      tested solution ready for immediate urban logistics deployment.
                    </p>
                    <BubbleButton 
                      size="lg" 
                      className="bg-sky-gold text-sky-navy hover:bg-sky-gold/90"
                    >
                      View Integration Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </BubbleButton>
                  </motion.div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>


      </div>
    </section>
  )
}