'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BubbleButton, BubbleCard } from '@/components/ui/skyway-components'
import { ArrowRight, Phone, Mail, MessageSquare, Zap } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-sky relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-white/5 animate-float" />
        <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full bg-sky-gold/10 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-20 left-1/4 w-48 h-48 rounded-full bg-white/5 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 lg:px-12 xl:px-16 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-pill border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Zap className="w-4 h-4 text-sky-gold" />
              <span className="text-white text-sm font-medium">Start Your Drone Delivery Journey</span>
            </motion.div>

            {/* Headline */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight font-display">
                Ready to Transform
                <br />
                <span className="text-gradient bg-gradient-to-r from-sky-gold to-yellow-300 bg-clip-text text-transparent">
                  Your Logistics?
                </span>
              </h2>
              
              <p className="text-lg lg:text-xl text-neutral-200 leading-relaxed">
                Join 250+ companies already using SkyWay for faster, cheaper, 
                and more sustainable urban deliveries. Get started today.
              </p>
            </motion.div>

            {/* Primary CTAs */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/login">
                <BubbleButton size="lg" className="text-sky-navy">
                  Get API Access
                  <ArrowRight className="ml-2 w-5 h-5" />
                </BubbleButton>
              </Link>
              
              <Link href="/tracking">
                <BubbleButton variant="ghost" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  Try Tracking Demo
                </BubbleButton>
              </Link>
            </motion.div>

            {/* Contact Options */}
            <motion.div 
              className="space-y-4 pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <p className="text-white/80 text-sm">Or reach out directly:</p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="tel:+6221234567" 
                  className="flex items-center space-x-2 text-white/90 hover:text-sky-gold transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>+62 21 234 567</span>
                </a>
                <a 
                  href="mailto:partners@skyway.id" 
                  className="flex items-center space-x-2 text-white/90 hover:text-sky-gold transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>partners@skyway.id</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center space-x-2 text-white/90 hover:text-sky-gold transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Live Chat</span>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Benefits Cards */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {/* Quick Benefits */}
            <BubbleCard className="bg-white/10 backdrop-blur-md border-white/20 space-y-4" hover={false}>
              <h3 className="text-xl font-bold text-white mb-4">What You Get</h3>
              
              <div className="space-y-3">
                {[
                  { icon: "🚀", title: "Fast Integration", desc: "API ready in 24 hours" },
                  { icon: "💰", title: "No Setup Fees", desc: "Pay per successful delivery" },
                  { icon: "📊", title: "Real-time Analytics", desc: "Comprehensive dashboard" },
                  { icon: "🛡️", title: "Insurance Covered", desc: "Full package protection" },
                  { icon: "🌟", title: "24/7 Support", desc: "Dedicated account manager" },
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className="text-2xl">{benefit.icon}</div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{benefit.title}</div>
                      <div className="text-white/70 text-sm">{benefit.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </BubbleCard>

            {/* Testimonial */}
            <motion.div
              className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-sky-gold to-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">RD</span>
                </div>
                <div>
                  <div className="text-white font-medium">Rina Dewi</div>
                  <div className="text-white/70 text-sm">CEO, FreshMart</div>
                </div>
              </div>
              <blockquote className="text-white/90 italic">
                "SkyWay transformed our business overnight. We went from 2-hour deliveries 
                to 15 minutes, and our customers love the real-time tracking experience."
              </blockquote>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
            >
              <div className="text-center bg-white/5 backdrop-blur-sm p-4 rounded-2xl">
                <div className="text-3xl font-bold text-sky-gold mb-1">24h</div>
                <div className="text-white/70 text-sm">Setup Time</div>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-sm p-4 rounded-2xl">
                <div className="text-3xl font-bold text-sky-gold mb-1">0%</div>
                <div className="text-white/70 text-sm">Setup Fee</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="mt-16 pt-12 border-t border-white/20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Join the future of urban logistics today. Whether you're an e-commerce platform, 
            logistics company, or UMKM, SkyWay has the right solution for your delivery needs.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <BubbleButton size="lg" className="text-sky-navy">
              Start Free Trial
            </BubbleButton>
            <BubbleButton variant="outline" size="lg" className="border-sky-gold text-sky-gold hover:bg-sky-gold hover:text-white">
              Track a Package
            </BubbleButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}