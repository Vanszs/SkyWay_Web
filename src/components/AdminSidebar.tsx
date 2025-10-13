'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Package,
  Users,
  MapPin,
  BarChart3,
  Settings,
  Menu,
  X,
  Plane,
  Navigation,
  Clock,
  CheckCircle
} from 'lucide-react'

const sidebarItems = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: Home,
    current: false
  },
  {
    name: 'Fleet',
    href: '/admin#fleet',
    icon: Plane,
    current: false
  },
  {
    name: 'Shipments',
    href: '/admin#shipments',
    icon: Package,
    current: false
  },
  {
    name: 'New Order',
    href: '/admin/new-order',
    icon: MapPin,
    current: true
  },
  {
    name: 'Users',
    href: '/admin#users',
    icon: Users,
    current: false
  },
  {
    name: 'Analytics',
    href: '/admin#analytics',
    icon: BarChart3,
    current: false
  },
  {
    name: 'Settings',
    href: '/admin#settings',
    icon: Settings,
    current: false
  }
]

export default function AdminSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === href
    }
    return pathname === href
  }

  return (
    <>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-gray-900">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center">
              <Navigation className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-white">SkyWay</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-3 py-4">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-gray-900 border-r border-gray-800">
          <div className="flex h-16 items-center px-6">
            <Navigation className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold text-white">SkyWay</span>
          </div>
          <nav className="flex-1 space-y-1 px-3 py-4">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          
          {/* Bottom section with status */}
          <div className="border-t border-gray-800 p-4">
            <div className="flex items-center text-sm text-gray-400">
              <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
              System Online
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Last sync: Just now
            </div>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-gray-900 border-b border-gray-800">
        <div className="flex h-16 items-center justify-between px-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-400 hover:text-white"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center">
            <Navigation className="h-6 w-6 text-blue-500" />
            <span className="ml-2 text-lg font-bold text-white">SkyWay</span>
          </div>
          <div className="w-6"></div>
        </div>
      </div>

      {/* Mobile top padding for fixed header */}
      <div className="lg:hidden h-16"></div>
    </>
  )
}