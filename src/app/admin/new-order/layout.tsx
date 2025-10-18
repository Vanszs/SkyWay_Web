import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/admin.css'

export const metadata: Metadata = {
  title: 'New Order - SkyWay Admin',
  description: 'Create a new delivery order for SkyWay drone delivery system.',
}

export default function NewOrderLayout({
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
