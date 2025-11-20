'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="section-padding bg-[#F5F5F7]">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-[40px] bg-deep-navy px-6 py-24 text-center shadow-2xl md:px-12 md:py-32">
          {/* Background Effects */}
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-blue/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-tech-cyan/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
              Ready to transform <br />
              <span className="text-sky-blue">your logistics?</span>
            </h2>

            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Join the autonomous revolution. Experience faster, safer, and more efficient deliveries with SkyWay.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="btn-apple bg-white text-deep-navy hover:bg-gray-100 w-full sm:w-auto min-w-[160px]"
              >
                Get Started
              </Link>
              <Link
                href="/demo"
                className="btn-apple bg-white/10 text-white hover:bg-white/20 backdrop-blur-md w-full sm:w-auto min-w-[160px]"
              >
                View Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}