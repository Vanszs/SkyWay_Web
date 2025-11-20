'use client'

import { Package, MapPin, Send, CheckCircle, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const steps = [
  {
    title: 'Book Delivery',
    description: 'Enter pickup and drop-off locations in our app. Select your preferred drone type based on package size.',
    icon: Package,
    color: 'text-sky-blue',
    bg: 'bg-sky-blue/10',
    border: 'border-sky-blue/20'
  },
  {
    title: 'Drone Dispatch',
    description: 'Our nearest available drone is automatically dispatched to the pickup point. You can track it in real-time.',
    icon: Send,
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20'
  },
  {
    title: 'Secure Flight',
    description: 'The drone flies autonomously through our safe air corridors, monitored by our central control system.',
    icon: MapPin,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20'
  },
  {
    title: 'Precision Drop',
    description: 'The drone lands safely or lowers the package via tether at the destination. Confirmation is sent instantly.',
    icon: CheckCircle,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20'
  }
]

export default function HowItWorks() {
  return (
    <section className="relative bg-white overflow-hidden" style={{ marginTop: 0, paddingTop: '6rem', paddingBottom: '8rem' }}>

      {/* Top Wave from WhatWeProvide - Smooth Transition */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180" style={{ marginTop: '-1px' }}>
        {/* Matches WhatWeProvide bottom wave */}
      </div>

      <div className="container mx-auto px-6 lg:px-12 xl:px-16 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 mb-8"
          >
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Workflow</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
          >
            Simple, seamless <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">delivery flow.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-500 font-light"
          >
            From request to delivery in four automated steps.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-16 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative group"
              >
                <div className={`w-32 h-32 rounded-[2rem] bg-white border-4 border-white shadow-xl flex items-center justify-center mb-10 mx-auto relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  <div className={`w-full h-full rounded-[1.7rem] ${step.bg} flex items-center justify-center border ${step.border}`}>
                    <step.icon className={`w-12 h-12 ${step.color}`} />
                  </div>

                  {/* Step Number Badge */}
                  <div className="absolute -top-4 -right-4 w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center font-bold text-lg border-4 border-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                </div>

                <div className="text-center px-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-base">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for mobile/tablet flow indication */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-8 text-gray-300">
                    <ArrowRight className="w-6 h-6 rotate-90 md:rotate-0" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave Divider - White to Gray (Next Section Background) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]" style={{ marginBottom: '-1px' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="relative block w-full h-[80px] sm:h-[120px] lg:h-[160px]"
        >
          <path
            fill="#F5F5F7"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,133.3C672,117,768,107,864,122.7C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  )
}