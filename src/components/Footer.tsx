'use client'

import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-sky-navy to-[#071021] text-white pt-20 pb-10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-sky-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 xl:px-16 max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-blue to-sky-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-blue/20">
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
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-sky-blue hover:text-white transition-all duration-300"
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
                  <Link href="#" className="text-neutral-400 hover:text-sky-gold transition-colors">
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
                  <Link href="#" className="text-neutral-400 hover:text-sky-gold transition-colors">
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
                <MapPin className="w-5 h-5 text-sky-blue mt-1" />
                <span className="text-neutral-400">
                  Menara SkyWay, Level 42<br />
                  Jl. Sudirman Kav. 52-53<br />
                  Jakarta Selatan, 12190
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-sky-blue" />
                <span className="text-neutral-400">+62 21 555 0123</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-sky-blue" />
                <span className="text-neutral-400">hello@skyway.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-neutral-500 text-sm">
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
