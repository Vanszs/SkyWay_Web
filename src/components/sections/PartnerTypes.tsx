'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BubbleCard, BubbleButton } from '@/components/ui/skyway-components'
import { Store, Truck, Building2, ShoppingBag, Package, Users, ArrowRight } from 'lucide-react'

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
      color: "from-blue-500 to-indigo-600",
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
    <section className="relative bg-[#F5F5F7] overflow-hidden" style={{ marginTop: 0, paddingTop: '6rem', paddingBottom: '8rem' }}>

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 mb-8 shadow-sm"
          >
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Partnerships</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
          >
            Built for every <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">business scale.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-500 font-light"
          >
            Whether you're a global logistics giant or a local bakery, SkyWay adapts to your needs.
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
              <div className="bg-white rounded-[32px] p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[100px] -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150 group-hover:bg-gray-100" />

                {/* Icon */}
                <div className={`w-16 h-16 mb-8 bg-gradient-to-br ${partner.color} rounded-2xl flex items-center justify-center shadow-lg relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                  <partner.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">
                  {partner.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 mb-8 leading-relaxed text-base relative z-10 flex-grow">
                  {partner.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8 relative z-10">
                  {partner.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                      <span className="text-sm text-gray-600 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Volume Badge */}
                <div className="mb-8 inline-flex self-start items-center bg-gray-50 px-4 py-2 rounded-full border border-gray-100 relative z-10">
                  <span className="text-sm font-bold text-gray-700">{partner.volume}</span>
                </div>

                {/* CTA */}
                <button className="w-full py-4 rounded-xl border-2 border-gray-100 text-gray-900 font-bold hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 relative z-10 flex items-center justify-center group-hover:shadow-lg">
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
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    <useCase.icon className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
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