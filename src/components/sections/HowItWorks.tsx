'use client'

import { Package, MapPin, Send, CheckCircle, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const sectionTitleClass = 'text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight'
const sectionSubtitleClass = 'text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto'
const badgeClass = 'inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 uppercase text-xs font-semibold text-gray-600 tracking-widest'
const cardClass =
  'h-full rounded-[22px] border border-gray-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col gap-4'

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
    <section className="relative bg-light-gray overflow-hidden" style={{ marginTop: 0, paddingTop: '6rem', paddingBottom: '8rem' }}>

      {/* Top Wave from WhatWeProvide - Smooth Transition */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]" style={{ marginTop: '-1px' }}>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[80px]"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="currentColor"
            className="text-sky-blue/10"
          />
        </svg>
      </div>

      {/* Cloud Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-70">
        {/* Floating clouds */}
        <svg className="absolute top-20 right-10 w-52 h-52 text-sky-blue" viewBox="0 0 200 200" fill="currentColor">
          <path d="M145 65c-5-9-14-15-24-15-4 0-8 1-11 3C106 45 99 40 90 40c-13 0-24 9-28 21-11 2-19 11-19 22 0 12 10 22 22 22h78c10 0 18-8 18-18 0-8-5-15-12-17z" />
        </svg>

        <svg className="absolute bottom-40 left-16 w-44 h-44 text-sky-blue" viewBox="0 0 200 200" fill="currentColor">
          <ellipse cx="100" cy="100" rx="70" ry="35" opacity="0.6" />
          <ellipse cx="80" cy="90" rx="50" ry="25" opacity="0.8" />
        </svg>

        <svg className="absolute top-1/3 left-1/4 w-36 h-36 text-sky-blue" viewBox="0 0 200 200" fill="currentColor">
          <circle cx="100" cy="100" r="40" opacity="0.5" />
          <ellipse cx="100" cy="100" rx="60" ry="30" />
        </svg>

        {/* Extra Side Clouds */}
        <svg className="absolute top-1/4 -left-12 w-56 h-56 text-sky-blue" viewBox="0 0 200 200" fill="currentColor">
          <path d="M140 60c-5.5-10-15.5-17-27-17-5 0-10 1.2-14 3.5C95 38 86 32 76 32c-15 0-28 10-32 24-12 2-21 12-21 24 0 13.3 10.7 24 24 24h90c11 0 20-9 20-20 0-9-6-17-14-20z" />
        </svg>
        <svg className="absolute bottom-1/4 -right-10 w-60 h-60 text-sky-blue" viewBox="0 0 200 200" fill="currentColor">
          <ellipse cx="100" cy="100" rx="75" ry="35" />
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-12 xl:px-16 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`${badgeClass} mb-6`}
          >
            <span>Workflow</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`${sectionTitleClass} mb-4`}
          >
            Simple, seamless delivery flow.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={sectionSubtitleClass}
          >
            Empat langkah otomatis yang mengikuti ritme minimalis ala Apple—bersih, ringkas, dan mudah dipahami.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-20 -translate-y-1/2 pointer-events-none z-0">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <path
                d="M0,40 C200,40 200,80 400,80 C600,80 600,40 800,40 C1000,40 1000,80 1200,80 L1400,80"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="2"
                strokeDasharray="8 8"
                className="opacity-50"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`group relative h-full bg-white rounded-[32px] p-8 border border-gray-300 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col ${index % 2 === 1 ? 'lg:mt-16' : 'lg:mb-16'
                  }`}
              >
                {/* Step Number - Subtle Background */}
                <div className="absolute top-8 right-8 text-6xl font-bold text-gray-50 opacity-50 select-none pointer-events-none group-hover:text-teal/10 transition-colors duration-300">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${step.bg} group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                  <step.icon className={`w-7 h-7 ${step.color}`} />
                </div>

                {/* Content */}
                <div className="relative z-10 flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-sm font-medium">
                    {step.description}
                  </p>
                </div>

                {/* Mobile Arrow */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-6 text-gray-300">
                    <ArrowRight className="w-5 h-5 rotate-90 md:rotate-0" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>


    </section>
  )
}
