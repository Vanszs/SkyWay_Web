'use client'

import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10 relative overflow-hidden">
      {/* Top Wave Divider - Smooth transition from DemoMap */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180" style={{ marginTop: '-2px' }}>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[80px]"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#111827"
          />
        </svg>
      </div>



      <div className="container mx-auto px-6 lg:px-12 xl:px-16 max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-mint-green rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">SkyWay</span>
            </Link>
            <p className="text-neutral-400 leading-relaxed">
              Revolutionizing urban logistics with autonomous drone technology.
              Faster, cleaner, and smarter deliveries for everyone.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-mint-green hover:text-white transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Careers', 'Blog', 'Press', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/80 hover:text-mint-green transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Services</h4>
            <ul className="space-y-4">
              {['Drone Delivery', 'Fleet Management', 'API Integration', 'Partner Program', 'Coverage Map'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/80 hover:text-mint-green transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-mint-green mt-1" />
                <span className="text-white/80">
                  Menara SkyWay, Level 42<br />
                  Jl. Sudirman Kav. 52-53<br />
                  Jakarta Selatan, 12190
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-mint-green" />
                <span className="text-white/80">+62 21 555 0123</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-mint-green" />
                <span className="text-white/80">hello@skyway.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/70 text-sm">
            © {new Date().getFullYear()} SkyWay Logistics. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm text-neutral-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
