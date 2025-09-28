import Hero from '@/components/sections/Hero'
import WhatWeProvide from '@/components/sections/WhatWeProvide'
import HowItWorks from '@/components/sections/HowItWorks'
import Benefits from '@/components/sections/Benefits'
import PartnerTypes from '@/components/sections/PartnerTypes'
import DemoMap from '@/components/sections/DemoMap'
import CTA from '@/components/sections/CTA'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="bg-sky-blue">
        <WhatWeProvide />
        <HowItWorks />
        <Benefits />
        <PartnerTypes />
        <DemoMap />
      </div>
      <CTA />
    </main>
  )
}