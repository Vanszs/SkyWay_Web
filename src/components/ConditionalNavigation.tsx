'use client'

import { usePathname } from 'next/navigation'
import { Navigation } from '@/components/Navigation'

export function ConditionalNavigation() {
  const pathname = usePathname()
  
  // Hide navigation for admin routes
  if (pathname?.startsWith('/admin')) {
    return null
  }
  
  return <Navigation />
}