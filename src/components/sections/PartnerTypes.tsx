'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Store, Building2, ShoppingBag, Package, Users, ArrowRight } from 'lucide-react'

const sectionTitleClass = 'text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight'
const sectionSubtitleClass = 'text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto'
const badgeClass = 'inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 uppercase text-xs font-semibold text-gray-600 tracking-widest shadow-sm'
const cardClass =
  'bg-white/80 backdrop-blur-xl rounded-[28px] p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-300 h-full flex flex-col relative overflow-hidden'

export default function PartnerTypes() {
  const partnerTypes = [
    {
      icon: Store,
      title: "E-commerce Platforms",
      description: "Shopee, Tokopedia, Blibli, and independent online stores looking to offer ultra-fast delivery options.",
      features: ["Same-day delivery", "Real-time tracking", "API integration", "Bulk pricing"],
      color: "from-orange-500 to-red-500",
      volume: "1000+ orders/day"
    },
    {
      icon: Building2,
      title: "Logistics Companies",
      description: "JNE, J&T, SiCepat, and other logistics providers expanding their last-mile delivery capabilities.",
      features: ["Fleet augmentation", "Peak hour support", "Weather backup", "Route optimization"],
      color: "from-teal to-mint-green",
      volume: "500+ packages/day"
    },
    {
      icon: ShoppingBag,
      title: "UMKM & Small Business",
      description: "Local restaurants, pharmacies, and small retailers serving nearby customers with speed.",
      features: ["Local delivery zones", "Affordable rates", "Easy onboarding", "Customer notifications"],
      color: "from-green-500 to-emerald-600",
      volume: "50+ deliveries/day"
    }
  ]

  const useCases = [
    {
      icon: Package,
      title: "Document Delivery",
      description: "Legal documents, contracts, and important papers",
      time: "10-15 min"
    },
    {
      icon: ShoppingBag,
      title: "Food & Beverage",
      description: "Restaurant orders, coffee, and fresh groceries",
      time: "15-20 min"
    },
    {
      icon: Users,
      title: "Medical Supplies",
      description: "Prescription medicines and emergency medical items",
      time: "8-12 min"
    }
  ]

  return (
    <section className="relative bg-sky-blue/10 overflow-hidden" style={{ marginTop: 0, paddingTop: '6rem', paddingBottom: '8rem' }}>

      {/* Top Wave from HowItWorks - Smooth Transition */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180" style={{ marginTop: '-1px' }}>
        {/* Matches HowItWorks bottom wave */}
      </div>

      <div className="container mx-auto px-6 lg:px-12 xl:px-16 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`${badgeClass} mb-6`}
          >
            <span>Partnerships</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`${sectionTitleClass} mb-4`}
          >
            Built for every business scale.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={sectionSubtitleClass}
          >
            Whether you're a global logistics giant or a local bakery, SkyWay adapts to your needs with the same clean, minimalist rhythm as our favorite Apple layouts.
          </motion.p>
        </div>

        {/* Partner Types Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {partnerTypes.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className={cardClass}>
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 pointer-events-none" />

                {/* Icon */}
                <div className={`w-16 h-16 mb-8 bg-gradient-to-br ${partner.color} rounded-2xl flex items-center justify-center shadow-md relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                  <partner.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 relative z-10">
                  {partner.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-8 leading-relaxed text-base relative z-10 flex-grow">
                  {partner.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8 relative z-10">
                  {partner.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 bg-teal rounded-full flex-shrink-0" />
                      <span className="text-sm text-gray-600 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Volume Badge */}
                <div className="mb-8 inline-flex self-start items-center bg-gray-50 px-4 py-2 rounded-full border border-gray-100 relative z-10">
                  <span className="text-sm font-semibold text-gray-700">{partner.volume}</span>
                </div>

                {/* CTA */}
                <button className="w-full py-4 rounded-xl border-2 border-gray-100 text-gray-900 font-semibold hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 relative z-10 flex items-center justify-center group-hover:shadow-md">
                  Become Partner
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Use Cases - Apple Style Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Popular Use Cases
            </h3>
            <p className="text-gray-500 text-lg">Tailored solutions for every industry.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-teal/10 transition-colors">
                    <useCase.icon className="w-6 h-6 text-gray-700 group-hover:text-teal transition-colors" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 px-3 py-1 rounded-full">
                    {useCase.time}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-gray-900 mb-2">{useCase.title}</h4>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {useCase.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>


      </div>

      {/* Bottom Wave Divider - Gray to White (Next Section Background) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]" style={{ marginBottom: '-1px' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="relative block w-full h-[80px] sm:h-[120px] lg:h-[160px]"
        >
          <path
            fill="#FFFFFF"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  )
}
