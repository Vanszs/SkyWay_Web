import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'


export const metadata: Metadata = {
  title: 'SkyWay Admin Dashboard',
  description: 'SkyWay administrative control center for fleet management, shipments, and analytics.',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}