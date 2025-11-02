import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SkyWay - Drone-as-a-Service for Urban Logistics',
  description: 'SkyWay provides semi-autonomous delivery drones and full monitoring system for logistics companies, e-commerce merchants, and UMKM.',
  keywords: ['drone delivery', 'logistics', 'urban delivery', 'drone-as-a-service', 'tracking'],
  authors: [{ name: 'SkyWay Team' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0D1B2A',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className={`${inter.className} antialiased bg-sky-light`}>
        <Navigation />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
