# PROJECT BRIEF
Design a responsive web application for **SkyWay** – a Drone + System as a Service platform.
SkyWay provides:
- Semi-autonomous delivery drones (hardware/fleet).
- Integrated monitoring & tracking system (software).
SkyWay does NOT handle the goods; logistics partners manage packages.

## BRAND & VISUAL DIRECTION
- **Color Palette – Sky-Tech Clean**
  - Primary: #0D1B2A (deep navy – core brand background)
  - Secondary: #1B263B (navy – section panels)
  - Support: #3E4C59 (slate gray – card/typography support)
  - Accent: #E0A458 (soft gold/amber – CTAs and highlights)
  - Neutral Light: #F7F9FC (clean backgrounds)
  - Neutral Mid: #A9B1B9 (borders, muted text)
- Typography: modern sans (Inter / Poppins)
- Style keywords: **modern, clean, smooth, futuristic, B2B oriented**
  - Modern = flat-clean with creative rounded/bubble elements and soft micro-interactions
  - Avoid over-glossy or heavy 3D effects.

---

## PAGES TO DESIGN

### 1️⃣ Landing Page – Public & Partner-Focused
Purpose: explain SkyWay’s dual value as **drone hardware + integrated monitoring system** and convert logistics companies / merchants.

Sections:
- **Hero**  
  - Drone fleet imagery + Surabaya skyline.  
  - Headline: “Drone + System as a Service for Urban Logistics”.  
  - CTAs: *Integrate with SkyWay System*, *Track Shipment*, *Become Partner*.
- **What We Provide**  
  - Two-column split:  
    - **Drone Fleet**: specs highlight (range, payload, safety).  
    - **Monitoring System**: API integration, real-time telemetry, partner dashboard.
- **How It Works**: 3-step creative flow (Integrate → Dispatch → Monitor).
- **Key Benefits**: Speed, Cost Saving, Low Emission, Real-time Monitoring.
- **Partner Types**: UMKM, e-commerce, logistics hubs/couriers.
- **Demo Mini Map**: animated sample drone route.
- **CTA Section**: bold, with smooth curved background and floating action button.
- **Footer**: modern minimal.

Design cue:
- Use **rounded/bubble cards** or diagonally sliced sections for freshness.
- No heavy gradients—focus on subtle layering and white space.

---

### 2️⃣ User Tracking Page – End-Customer
- **Tracking Code Input**: center-placed, bubble-style.
- **Realtime Map View**: Mapbox/Leaflet style
  - Drone location (slightly delayed for privacy)
  - ETA updates
  - Route and checkpoints
- **Status Timeline**: ORDERED → PICKUP_CONFIRMED → IN_FLIGHT → ARRIVED → DELIVERED.
- **Proof of Delivery (POD)**: photo and timestamp.
- Optional **notification toggle** for WhatsApp/email.
- Clear statement: “Goods handled by our logistics partner. Flight and monitoring by SkyWay drones.”

---

### 3️⃣ Branch Admin Dashboard – Partner / Logistics Hub
Audience: operators of logistics partners and SkyWay internal fleet managers.

Modules:
- **Shipment Queue (Drone-Eligible)**: filter & assign flights.
- **Flight Planning & Batch Management**: create single or multi-stop flights; weather and corridor checks.
- **Live Fleet Map**: every drone with battery %, telemetry, and route.
- **Drop Point Manager**: manage takeoff/landing spots, capacity, status.
- **Exception Center**: handle weather, low battery, NFZ, recipient no-show.
- **Reports & Analytics**: on-time %, diverted flights, CO₂ saved, fleet utilization.

UI cues:
- Bubble/rounded tabs, card-table hybrid for data.
- Smooth hover, animated transitions, soft curves.
- Clear separation between **hardware data** (battery, sensors) and **shipment data**.

---

## MODERN UI/UX STYLE — KEY DIRECTIVES
- **Clean, flat, and futuristic**, not glossy or heavy 3D.
- **Creative geometry**: rounded corners, pill-shaped active tabs, softly curved section dividers.
- **Micro-interactions**: gentle hover, animated bubble tab transitions, subtle motion.
- **Generous white space** and balanced negative space for an uncluttered, premium feel.

---

## UI LIBRARY GUIDANCE
- AI is **free to choose** any cutting-edge UI/component library
  (e.g. Radix UI, Chakra UI, Mantine, Ant Design, MUI, shadcn/ui, Tailwind-based kits)
  or combine multiple to achieve the best modern, clean UX.

---

## DESIGN SYSTEM & COMPONENTS
- Provide color tokens, typography scales, spacing, shadow, and border-radius tokens.
- Build reusable components: bubble-style tabs, rounded cards, smooth map widgets.
- Include hover/active/disabled/loading states.

---

## OUTPUT
Deliver:
- High-fidelity, responsive mockups for Landing Page, User Tracking Page, and Branch Admin Dashboard.
- A design system with reusable tokens and components.
- Section/card designs **modern, smooth, and playful (bubble-inspired)**, avoiding monotone boxes and over-design.
- Example states (loading, success, exception) for tracking and admin views.

Style adjectives to guide AI:
**modern clean smooth**, **bubble-inspired tabs & rounded cards**,  
**flat-futuristic**, **playful yet professional**, **Sky-Tech Clean palette**,  
**drone hardware + integrated system emphasis**.
