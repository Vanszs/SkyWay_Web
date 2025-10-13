import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/admin.css'
import AdminSidebar from '@/components/AdminSidebar'

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
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="lg:pl-64">
        <div className="admin-dashboard min-h-screen">
          {children}
        </div>
      </div>
      <Toaster />
    </div>
  )
}