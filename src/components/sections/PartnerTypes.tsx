'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BubbleCard, BubbleButton } from '@/components/ui/skyway-components'
import { Store, Truck, Building2, ShoppingBag, Package, Users } from 'lucide-react'

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
            Partner with <span className="text-gradient bg-gradient-to-r from-sky-gold to-yellow-400 bg-clip-text text-transparent">SkyWay</span>
          </h2>
          <p className="text-lg lg:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            From e-commerce giants to local UMKM, we empower businesses of all sizes 
            with cutting-edge drone delivery technology
          </p>
        </motion.div>

        {/* Partner Types */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {partnerTypes.map((partner, index) => (
            <motion.div
              key={partner.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <BubbleCard className="h-full group p-8 bg-sky-slate/80 backdrop-blur-sm rounded-3xl border border-white/10">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <motion.div 
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${partner.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 5 }}
                  >
                    <partner.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div className="text-right">
                    <div className="text-sm text-neutral-400">Volume</div>
                    <div className="text-base lg:text-lg font-bold text-sky-gold">{partner.volume}</div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-sky-gold transition-colors">
                  {partner.title}
                </h3>
                <p className="text-neutral-300 mb-6 leading-relaxed text-base">
                  {partner.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {partner.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-sky-gold rounded-full flex-shrink-0" />
                      <span className="text-sm lg:text-base text-neutral-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <BubbleButton variant="outline" className="w-full group-hover:bg-sky-gold group-hover:text-white group-hover:border-sky-gold transition-all">
                  Become Partner
                </BubbleButton>
              </BubbleCard>
            </motion.div>
          ))}
        </div>

        {/* Use Cases */}
        <motion.div 
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 lg:p-12 shadow-soft-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Popular Use Cases
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div 
                  className="w-16 h-16 mx-auto mb-4 bg-sky-gold/10 rounded-2xl flex items-center justify-center"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgb(224, 164, 88)' }}
                  transition={{ duration: 0.3 }}
                >
                  <useCase.icon className="w-8 h-8 text-sky-gold" />
                </motion.div>
                
                <h4 className="text-lg font-bold text-white mb-2">{useCase.title}</h4>
                <p className="text-neutral-300 mb-3">{useCase.description}</p>
                
                <div className="inline-flex items-center space-x-2 bg-sky-gold/10 px-3 py-1 rounded-pill">
                  <div className="w-2 h-2 bg-sky-gold rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-sky-gold">{useCase.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partner Success Stories */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Partner Success Stories
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BubbleCard className="text-center p-6 bg-sky-slate rounded-2xl">
              <div className="w-16 h-16 mx-auto mb-4 bg-sky-gold/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🛒</span>
              </div>
              <h4 className="font-bold text-white mb-2">FreshMart</h4>
              <p className="text-sm text-neutral-300 mb-3">
                &quot;Reduced delivery time from 2 hours to 15 minutes. Customer satisfaction increased by 85%.&quot;
              </p>
              <div className="text-sky-gold font-bold">+300% Order Volume</div>
            </BubbleCard>

            <BubbleCard className="text-center p-6 bg-sky-slate rounded-2xl">
              <div className="w-16 h-16 mx-auto mb-4 bg-sky-gold/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🚛</span>
              </div>
              <h4 className="font-bold text-white mb-2">SpeedLogistics</h4>
              <p className="text-sm text-neutral-300 mb-3">
                &quot;SkyWay handles our peak hours perfectly. Operational costs down by 40%.&quot;
              </p>
              <div className="text-sky-gold font-bold">40% Cost Reduction</div>
            </BubbleCard>

            <BubbleCard className="text-center p-6 bg-sky-slate rounded-2xl">
              <div className="w-16 h-16 mx-auto mb-4 bg-sky-gold/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🏪</span>
              </div>
              <h4 className="font-bold text-white mb-2">Warung Bu Siti</h4>
              <p className="text-sm text-neutral-300 mb-3">
                &quot;Small business, big impact. Now we serve 5x more customers daily.&quot;
              </p>
              <div className="text-sky-gold font-bold">5x Daily Orders</div>
            </BubbleCard>
          </div>
        </motion.div>
      </div>
    </section>
  )
}