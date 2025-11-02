'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { label: 'How It Works', href: '/#how-it-works' },
      { label: 'Features', href: '/#features' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'API Documentation', href: '/docs' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Partners', href: '/partners' },
      { label: 'Blog', href: '/blog' },
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Track Shipment', href: '/tracking' },
      { label: 'System Status', href: '/status' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Compliance', href: '/compliance' },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/skyway', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/skyway', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/skyway', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/skyway', label: 'LinkedIn' },
  ]

  return (
    <footer className="bg-sky-navy border-t border-white/10">
      <div className="container mx-auto px-6 lg:px-12 xl:px-16 max-w-7xl py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <img 
                src="/logo.png" 
                alt="SkyWay Logo" 
                className="h-12 w-auto object-contain"
              />
              <span className="text-white font-bold text-2xl">SkyWay</span>
            </Link>
            <p className="text-neutral-300 mb-6 leading-relaxed">
              Revolutionizing urban logistics with semi-autonomous drones and integrated monitoring systems.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3 text-neutral-300">
                <MapPin className="w-4 h-4 text-sky-gold flex-shrink-0" />
                <span>Surabaya, Indonesia</span>
              </div>
              <div className="flex items-center space-x-3 text-neutral-300">
                <Phone className="w-4 h-4 text-sky-gold flex-shrink-0" />
                <a href="tel:+6221234567" className="hover:text-sky-gold transition-colors">
                  +62 21 234 567
                </a>
              </div>
              <div className="flex items-center space-x-3 text-neutral-300">
                <Mail className="w-4 h-4 text-sky-gold flex-shrink-0" />
                <a href="mailto:info@skyway.id" className="hover:text-sky-gold transition-colors">
                  info@skyway.id
                </a>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-bold mb-4 text-lg">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-neutral-300 hover:text-sky-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-bold mb-4 text-lg">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-neutral-300 hover:text-sky-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-bold mb-4 text-lg">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-neutral-300 hover:text-sky-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-bold mb-4 text-lg">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-neutral-300 hover:text-sky-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Newsletter */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <span className="text-neutral-300 text-sm">Follow us:</span>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/5 hover:bg-sky-gold rounded-full flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="flex items-center space-x-3">
              <input 
                type="email" 
                placeholder="Subscribe to newsletter"
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-neutral-400 focus:outline-none focus:border-sky-gold transition-colors w-64"
              />
              <button className="px-6 py-2 bg-sky-gold hover:bg-sky-gold/90 text-white font-medium rounded-xl transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-300">
            <p>© {currentYear} SkyWay. All rights reserved.</p>
            <p className="text-center md:text-right">
              Made with ❤️ for urban logistics innovation
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
