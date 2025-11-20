'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section
      className="
        relative min-h-screen flex items-center overflow-hidden pt-16 lg:pt-20
        bg-[radial-gradient(circle_at_top,_#4ED6FF33,_transparent_55%),linear-gradient(180deg,#2B7BFF,#0090F3,#4ED6FF)]
        text-white
      "
    >
      {/* Background: glow particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Soft dots */}
        <div className="absolute top-24 left-1/5 w-2 h-2 rounded-full bg-white/40 blur-[1px]" />
        <div className="absolute top-40 right-1/4 w-3 h-3 rounded-full bg-[#4ED6FF]/40 blur-[2px]" />
        <div className="absolute bottom-32 left-1/3 w-2 h-2 rounded-full bg-white/30 blur-[1px]" />
        <div className="absolute bottom-20 right-1/3 w-2 h-2 rounded-full bg-white/25 blur-[1px]" />

        {/* Subtle abstract cloud shapes */}
        <CloudBlob className="absolute -top-10 left-[-80px] opacity-[0.14]" />
        <CloudBlob className="absolute top-16 right-[-120px] scale-110 opacity-[0.12]" />
      </div>

      {/* Main layout */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-10 xl:px-0">
        {/* Left: Text block */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex-1 text-center lg:text-left"
        >
          {/* Eyebrow tag */}
          <div className="inline-flex items-center justify-center rounded-full bg-white/12 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[#EAF5FF] backdrop-blur-sm">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#4ED6FF]" />
            Intelligent Drone Logistics
          </div>

          {/* Heading */}
          <h1
            className="
              mt-6 font-display text-4xl font-bold tracking-tight leading-[1.1]
              sm:text-5xl lg:text-6xl xl:text-[3.5rem]
            "
          >
            The Future of
            <br />
            <span className="text-[#F8FBFF]">Urban Logistics</span>
          </h1>

          {/* Subheading */}
          <p
            className="
              mt-5 max-w-xl mx-auto lg:mx-0
              text-base sm:text-lg lg:text-xl
              font-normal leading-relaxed
              text-[#EAF5FF]
            "
          >
            Experience lightning-fast, semi-autonomous drone logistics designed for modern cities.
            SkyWay connects businesses using intelligent air corridors powered by IoT and swarm
            navigation.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start">
            {/* Primary: Track Shipment */}
            <Link href="/tracking">
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
                className="
                  group relative inline-flex items-center gap-2
                  rounded-[30px] bg-white px-7 py-3.5 text-sm sm:text-base font-semibold
                  text-[#0F1E3D] shadow-[0_14px_30px_rgba(15,30,61,0.28)]
                  transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B7BFF] focus-visible:ring-white
                "
              >
                <span className="relative z-10">Track Shipment</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                {/* soft glow overlay */}
                <span
                  className="
                    pointer-events-none absolute inset-0 rounded-[30px]
                    bg-[radial-gradient(circle_at_top_left,_#4ED6FF40,_transparent_55%)]
                    opacity-0 transition-opacity duration-200 group-hover:opacity-100
                  "
                />
              </motion.button>
            </Link>

            {/* Secondary: Watch Demo */}
            <Link href="/demo">
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
                className="
                  inline-flex items-center gap-2
                  rounded-[30px] border border-white/45 bg-white/0
                  px-7 py-3.5 text-sm sm:text-base font-semibold
                  text-[#F8FBFF]
                  backdrop-blur-sm transition-colors duration-200
                  hover:bg-white/8
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B7BFF] focus-visible:ring-white
                "
              >
                <span
                  className="
                    flex h-7 w-7 items-center justify-center
                    rounded-full bg-white/15
                  "
                >
                  <Play className="h-3.5 w-3.5" />
                </span>
                <span>Watch Demo</span>
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Right: Hexacopter illustration */}
        <motion.div
          initial={{ opacity: 0, x: 24, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="mt-12 flex-1 lg:mt-0"
        >
          <div className="relative mx-auto h-[280px] w-[280px] sm:h-[320px] sm:w-[320px] lg:h-[360px] lg:w-[360px]">
            {/* Soft circular halo */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_rgba(248,251,255,0.38),_transparent_70%)] blur-sm" />

            {/* Minimal circular corridor ring */}
            <div className="absolute inset-[14%] rounded-full border border-[#EAF5FF]/40" />
            <div className="absolute inset-[24%] rounded-full border border-[#EAF5FF]/25 border-dashed" />

            {/* Central body */}
            <div className="absolute inset-[34%] flex items-center justify-center rounded-[2rem] bg-[#F8FBFF] shadow-[0_12px_40px_rgba(15,30,61,0.32)]">
              <div className="flex h-[70%] w-[70%] items-center justify-center rounded-3xl bg-gradient-to-br from-[#EAF5FF] to-white shadow-inner">
                <div className="flex h-[52%] w-[52%] items-center justify-center rounded-2xl bg-[#2B7BFF] shadow-[0_10px_22px_rgba(43,123,255,0.6)]">
                  <div className="h-6 w-6 rounded-full bg-white/95" />
                </div>
              </div>
            </div>

            {/* Arms — hexacopter style (6 arms) */}
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <Arm key={angle} angle={angle} />
            ))}

            {/* Small telemetry tag */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="
                absolute -bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2
                rounded-full bg-white/90 px-4 py-1.5 text-xs font-medium text-[#0F1E3D]
                shadow-[0_10px_25px_rgba(15,30,61,0.25)] backdrop-blur-sm
              "
            >
              <span className="h-2 w-2 rounded-full bg-[#2B7BFF]" />
              Live flight corridor • IoT linked
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom smooth white wave (covers viewport edge cleanly) */}
      <div className="pointer-events-none absolute -bottom-2 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block h-[140px] w-[calc(100%+1.3px)] sm:h-[160px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C220,120 420,10 650,70 C880,130 1080,60 1200,85 L1200,140 L0,140 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </section>
  )
}

function Arm({ angle }: { angle: number }) {
  const rad = (angle * Math.PI) / 180
  const armRadiusInner = 80
  const armRadiusOuter = 135

  const x1 = 50 + armRadiusInner * Math.cos(rad)
  const y1 = 50 + armRadiusInner * Math.sin(rad)
  const x2 = 50 + armRadiusOuter * Math.cos(rad)
  const y2 = 50 + armRadiusOuter * Math.sin(rad)

  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        {/* arm line */}
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#EAF5FF"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeOpacity={0.9}
        />
        {/* rotor */}
        <g transform={`translate(${x2},${y2})`}>
          <circle r={10} fill="#F8FBFF" />
          <circle r={7.5} fill="#EAF5FF" />
          <circle r={3.2} fill="#2B7BFF" />
          <circle r={1.4} fill="#F8FBFF" />
        </g>
      </svg>
    </div>
  )
}

function CloudBlob({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="420"
      height="180"
      viewBox="0 0 420 180"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cloud-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F8FBFF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#EAF5FF" stopOpacity="0.2" />
        </linearGradient>
        <filter id="cloud-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="22" />
        </filter>
      </defs>
      <path
        d="M40 110C40 80 70 50 120 50C150 50 170 60 185 68C200 50 225 38 255 38C300 38 335 60 345 88C370 92 385 110 385 128C385 145 372 160 345 160H85C60 160 40 140 40 110Z"
        fill="url(#cloud-grad)"
        filter="url(#cloud-blur)"
      />
    </svg>
  )
}
