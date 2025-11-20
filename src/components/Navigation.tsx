'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Home, Package, BarChart3, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { BubbleButton } from './ui/skyway-components'

interface NavigationProps {
  className?: string
}

export const Navigation: React.FC<NavigationProps> = ({ className = "" }) => {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20)
  })

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/tracking', label: 'Track Shipment', icon: Package },
    { href: '/login', label: 'Admin Login', icon: BarChart3 }
  ]

  return (
    <motion.nav
      data-navigation="true"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/80 backdrop-blur-md border-b border-white/50 shadow-sm py-2'
        : 'bg-transparent py-4'
        } ${className}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 lg:px-12 xl:px-16 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 transition-transform group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="SkyWay Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className={`font-bold text-2xl transition-colors ${isScrolled ? 'text-sky-950' : 'text-sky-900'}`}>
              SkyWay
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all font-medium ${isScrolled
                      ? isActive
                        ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                        : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50'
                      : isActive
                        ? 'bg-white text-sky-600 shadow-lg shadow-black/5'
                        : 'text-sky-900/80 hover:text-sky-900 hover:bg-white/20'
                      }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </motion.div>
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <BubbleButton
              variant={isScrolled ? "primary" : "secondary"}
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={!isScrolled ? "bg-white/20 text-sky-900 border-white/30 hover:bg-white/30" : ""}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </BubbleButton>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden py-4 mt-2 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 overflow-hidden"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
          >
            <div className="p-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${isActive
                        ? 'bg-sky-50 text-sky-600 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-sky-900'
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}