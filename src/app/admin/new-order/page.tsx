'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Package, 
  MapPin, 
  User, 
  Phone, 
  Weight, 
  Save, 
  X, 
  Zap, 
  CheckCircle, 
  AlertCircle, 
  DollarSign,
  Clock,
  Code,
  Copy,
  Check,
  Bug
} from 'lucide-react'
import { ModernSidebar } from '@/components/admin/ModernSidebar'
import { ChartCard } from '@/components/admin/ChartCard'
import { RouteMapContainer } from '@/components/MapContainer'
import type { RouteData } from '@/types/route'

interface FormData {
  customerName: string
  customerPhone: string
  origin: string
  destination: string
  weight: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  notes: string
}

interface Errors {
  [key: string]: string
}

export default function NewOrderPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    customerPhone: '',
    origin: '',
    destination: '',
    weight: '',
    priority: 'medium',
    notes: ''
  })
  const [routeData, setRouteData] = useState<RouteData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [jsonCopied, setJsonCopied] = useState(false)
  const [psoEnabled, setPsoEnabled] = useState(true)
  const [showPsoPopup, setShowPsoPopup] = useState(false)

  useEffect(() => {
    // Hide main navigation on admin pages
    const nav = document.querySelector('nav')
    if (nav) nav.style.display = 'none'
    return () => {
      if (nav) nav.style.display = 'block'
    }
  }, [])

  const validateField = (name: string, value: string) => {
    let error = ''
    
    switch(name) {
      case 'customerName':
        if (!value.trim()) error = 'Customer name is required'
        else if (value.trim().length < 3) error = 'Name must be at least 3 characters'
        break
        
      case 'customerPhone':
        if (!value.trim()) error = 'Phone number is required'
        else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(value)) {
          error = 'Invalid phone number format'
        }
        break
        
      case 'weight':
        if (!value) error = 'Weight is required'
        else if (parseFloat(value) < 0.1) error = 'Minimum weight is 0.1 kg'
        else if (parseFloat(value) > 5.0) error = 'Maximum weight is 5.0 kg'
        break
        
      case 'origin':
        if (!value.trim()) error = 'Pickup location is required'
        break
        
      case 'destination':
        if (!value.trim()) error = 'Delivery location is required'
        break
    }
    
    return error
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({
        ...prev,
        [name]: error
      }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleRouteSelect = (route: RouteData) => {
    setRouteData(route)
    setFormData(prev => ({
      ...prev,
      origin: route.start.address,
      destination: route.end.address
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields
    const newErrors: Errors = {}
    Object.keys(formData).forEach(key => {
      if (key !== 'notes') {
        const error = validateField(key, formData[key as keyof FormData])
        if (error) newErrors[key] = error
      }
    })
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}))
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('New order data:', { ...formData, routeData })
    
    // Show success and redirect
    alert('Order created successfully!')
    window.location.href = '/admin/shipments'
    
    setIsSubmitting(false)
  }

  const calculateEstimatedPrice = () => {
    if (!routeData || !formData.weight) return 0
    
    const basePrice = 15000
    const distanceRate = 5000
    const weightRate = 2000
    const priorityMultipliers: Record<string, number> = {
      low: 1,
      medium: 1.2,
      high: 1.5,
      urgent: 2
    }
    
    const priorityMultiplier = priorityMultipliers[formData.priority] || 1
    const price = (basePrice + (routeData.distance * distanceRate) + (parseFloat(formData.weight) * weightRate)) * priorityMultiplier
    return Math.round(price)
  }

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  const isFormValid = formData.customerName && formData.customerPhone && formData.weight && 
                    formData.origin && formData.destination && routeData &&
                    !errors.customerName && !errors.customerPhone && !errors.weight

  const getWaypointJSON = () => {
    if (!routeData || !routeData.waypoints) return null
    
    return JSON.stringify({
      route: {
        start: {
          lat: routeData.start.lat,
          lng: routeData.start.lng,
          address: routeData.start.address
        },
        end: {
          lat: routeData.end.lat,
          lng: routeData.end.lng,
          address: routeData.end.address
        },
        waypoints: routeData.waypoints.map((point, index) => ({
          index,
          lat: point.lat,
          lng: point.lng,
          timestamp: index * 30
        })),
        metadata: {
          totalDistance: routeData.distance,
          estimatedDuration: routeData.estimatedDuration,
          isSafe: routeData.isSafe,
          priority: formData.priority,
          weight: formData.weight,
          calculatedAt: new Date().toISOString()
        }
      }
    }, null, 2)
  }

  const copyJSON = () => {
    const json = getWaypointJSON()
    if (json) {
      navigator.clipboard.writeText(json)
      setJsonCopied(true)
      setTimeout(() => setJsonCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F0F0]">
      {/* Modern Sidebar */}
      <ModernSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div
        className={`min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'
        }`}
      >
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-[60]">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/admin/shipments"
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Create New Order
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Complete the form to create a new delivery order
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="max-w-[1400px] mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Customer Information */}
                  <ChartCard title="Customer Information">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Customer Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                              errors.customerName && touched.customerName
                                ? 'border-red-300 focus:border-red-500'
                                : 'border-gray-300 focus:border-indigo-500'
                            } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                            placeholder="Enter customer name"
                          />
                          {formData.customerName && !errors.customerName && (
                            <CheckCircle className="w-5 h-5 text-green-500 absolute right-3 top-1/2 -translate-y-1/2" />
                          )}
                        </div>
                        {errors.customerName && touched.customerName && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.customerName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            name="customerPhone"
                            value={formData.customerPhone}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                              errors.customerPhone && touched.customerPhone
                                ? 'border-red-300 focus:border-red-500'
                                : 'border-gray-300 focus:border-indigo-500'
                            } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                            placeholder="+62 812-3456-7890"
                          />
                          {formData.customerPhone && !errors.customerPhone && (
                            <CheckCircle className="w-5 h-5 text-green-500 absolute right-3 top-1/2 -translate-y-1/2" />
                          )}
                        </div>
                        {errors.customerPhone && touched.customerPhone && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.customerPhone}
                          </p>
                        )}
                      </div>
                    </div>
                  </ChartCard>

                  {/* Package Information */}
                  <ChartCard title="Package Information">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Weight (kg) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Weight className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                              errors.weight && touched.weight
                                ? 'border-red-300 focus:border-red-500'
                                : 'border-gray-300 focus:border-indigo-500'
                            } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                            placeholder="0.0"
                            step="0.1"
                            min="0.1"
                            max="5.0"
                          />
                          {formData.weight && !errors.weight && (
                            <CheckCircle className="w-5 h-5 text-green-500 absolute right-3 top-1/2 -translate-y-1/2" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Maximum: 5.0 kg</p>
                        {errors.weight && touched.weight && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.weight}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Priority Level <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="priority"
                          value={formData.priority}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        >
                          <option value="low">🟢 Low - Economy (4-8h)</option>
                          <option value="medium">🟡 Medium - Standard (2-4h)</option>
                          <option value="high">🟠 High - Priority (1-2h)</option>
                          <option value="urgent">🔴 Urgent - Express (&lt;30min)</option>
                        </select>
                      </div>
                    </div>
                  </ChartCard>

                  {/* Route Planning */}
                  <ChartCard title="Route Planning - AI PSO Optimization">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Pickup Location <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="origin"
                            value={formData.origin}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50"
                            placeholder="Click on map to select"
                            readOnly
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Delivery Location <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="destination"
                            value={formData.destination}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50"
                            placeholder="Click on map to select"
                            readOnly
                          />
                        </div>
                      </div>

                      {routeData && (
                        <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{routeData.distance.toFixed(2)}</div>
                            <div className="text-xs text-gray-600 mt-1">Distance (km)</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">{routeData.estimatedDuration}</div>
                            <div className="text-xs text-gray-600 mt-1">Duration (min)</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{routeData.isSafe ? '✓' : '⚠'}</div>
                            <div className="text-xs text-gray-600 mt-1">{routeData.isSafe ? 'Safe' : 'Check'}</div>
                          </div>
                        </div>
                      )}

                      {/* Map */}
                      <div className="border border-gray-200 rounded-xl overflow-hidden relative z-10">
                        <div className={`bg-gradient-to-r px-4 py-3 border-b border-gray-200 ${psoEnabled ? 'from-purple-50 to-blue-50' : 'from-gray-50 to-gray-100'}`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Zap className={`w-4 h-4 ${psoEnabled ? 'text-purple-600' : 'text-gray-500'}`} />
                              <span className="text-sm font-medium text-gray-900">
                                {psoEnabled ? 'AI-Powered Route Map' : 'Direct Route Map'}
                              </span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              psoEnabled 
                                ? 'bg-purple-100 text-purple-700' 
                                : 'bg-gray-200 text-gray-700'
                            }`}>
                              {psoEnabled ? 'PSO Active' : 'PSO Off'}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            Click to set pickup → Click to set delivery
                          </p>
                        </div>
                        <div className="relative z-0" style={{height: '400px'}}>
                          <RouteMapContainer
                            onRouteSelect={handleRouteSelect}
                            enablePSO={psoEnabled}
                            enableGoogleMaps={false}
                          />
                        </div>
                      </div>
                    </div>
                  </ChartCard>

                  {/* Waypoint JSON */}
                  <ChartCard title="Route Waypoints (JSON)">
                    {getWaypointJSON() ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600">
                            Complete route data with waypoint coordinates
                          </p>
                          <button
                            type="button"
                            onClick={copyJSON}
                            className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-xs font-medium flex items-center gap-2"
                          >
                            {jsonCopied ? (
                              <>
                                <Check className="w-3 h-3" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                Copy JSON
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-xs font-mono max-h-64 scrollbar-thin">
                          {getWaypointJSON()}
                        </pre>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="bg-blue-50 p-2 rounded text-center">
                            <div className="text-xs font-semibold text-blue-900">Waypoints</div>
                            <div className="text-sm text-blue-700">{routeData?.waypoints?.length || 0}</div>
                          </div>
                          <div className="bg-green-50 p-2 rounded text-center">
                            <div className="text-xs font-semibold text-green-900">Distance</div>
                            <div className="text-sm text-green-700">{routeData?.distance?.toFixed(2)} km</div>
                          </div>
                          <div className="bg-purple-50 p-2 rounded text-center">
                            <div className="text-xs font-semibold text-purple-900">Duration</div>
                            <div className="text-sm text-purple-700">{routeData?.estimatedDuration} min</div>
                          </div>
                          <div className="bg-orange-50 p-2 rounded text-center">
                            <div className="text-xs font-semibold text-orange-900">Safety</div>
                            <div className="text-sm text-orange-700">{routeData?.isSafe ? 'Safe' : 'Check'}</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Code className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500">No route data available</p>
                        <p className="text-sm text-gray-400 mt-1">
                          Create a route on the map to generate waypoint JSON
                        </p>
                      </div>
                    )}
                  </ChartCard>

                  {/* Notes */}
                  <ChartCard title="Additional Notes (Optional)">
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      rows={3}
                      placeholder="Any special delivery instructions..."
                    />
                  </ChartCard>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <Link
                      href="/admin/shipments"
                      className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      disabled={isSubmitting || !isFormValid}
                      className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#E0A458] to-[#c98d42] text-white hover:shadow-lg transition-all text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Create Order
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Sidebar - Summary */}
                <div className="space-y-6">
                  {/* Order Summary */}
                  <ChartCard title="Order Summary">{/* Removed sticky */}
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Customer:</span>
                          <span className="font-medium text-gray-900">{formData.customerName || '-'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Phone:</span>
                          <span className="font-medium text-gray-900">{formData.customerPhone || '-'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Weight:</span>
                          <span className="font-medium text-gray-900">{formData.weight ? `${formData.weight} kg` : '-'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Priority:</span>
                          <span className={`font-medium ${
                            formData.priority === 'urgent' ? 'text-red-600' :
                            formData.priority === 'high' ? 'text-orange-600' :
                            formData.priority === 'medium' ? 'text-yellow-600' :
                            'text-green-600'
                          }`}>
                            {formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1)}
                          </span>
                        </div>
                      </div>

                      {routeData && (
                        <>
                          <div className="border-t border-gray-200 pt-3 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Distance:</span>
                              <span className="font-medium text-gray-900">{routeData.distance.toFixed(2)} km</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Est. Time:</span>
                              <span className="font-medium text-gray-900">{routeData.estimatedDuration} min</span>
                            </div>
                          </div>

                          <div className="border-t-2 border-gray-300 pt-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Estimated Cost:</span>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-indigo-600">
                                  {formattedPrice(calculateEstimatedPrice())}
                                </div>
                                <div className="text-xs text-gray-500">Including fees</div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {!routeData && (
                        <div className="text-center py-6">
                          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Select route on map</p>
                          <p className="text-xs text-gray-400 mt-1">to calculate pricing</p>
                        </div>
                      )}
                    </div>
                  </ChartCard>

                  {/* PSO Info */}
                  <div className={`rounded-xl p-5 border ${
                    psoEnabled 
                      ? 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200' 
                      : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        psoEnabled ? 'bg-purple-600' : 'bg-gray-500'
                      }`}>
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className={`font-semibold mb-1 ${psoEnabled ? 'text-purple-900' : 'text-gray-900'}`}>
                          {psoEnabled ? 'AI Route Optimization' : 'Direct Route Mode'}
                        </h4>
                        <p className={`text-sm mb-3 ${psoEnabled ? 'text-purple-700' : 'text-gray-700'}`}>
                          {psoEnabled 
                            ? 'PSO algorithm finds the safest and most efficient route avoiding buildings and no-fly zones.'
                            : 'Route will be calculated as a straight line between pickup and delivery points.'
                          }
                        </p>
                        {psoEnabled && (
                          <>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-purple-700">Collision Free</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-purple-700">Optimized</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                <span className="text-purple-700">Smooth Flight</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <span className="text-purple-700">No-Fly Avoid</span>
                              </div>
                            </div>
                            <div className="mt-3 p-2 bg-purple-100 rounded-lg">
                              <p className="text-xs text-purple-800 font-medium">Building Clearance: 100m</p>
                              <p className="text-xs text-purple-600">Safe distance maintained</p>
                            </div>
                          </>
                        )}
                        {!psoEnabled && (
                          <div className="mt-3 p-2 bg-orange-100 rounded-lg border border-orange-200">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="w-3 h-3 text-orange-700 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-xs text-orange-800 font-medium">Warning: No Obstacle Avoidance</p>
                                <p className="text-xs text-orange-700">Route may pass through buildings or restricted zones</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* PSO Toggle Floating Button */}
        <div className="fixed bottom-6 right-6 z-50">
          {/* Popup Card */}
          {showPsoPopup && (
            <div className="absolute bottom-16 right-0 mb-2 animate-in slide-in-from-bottom-2 fade-in duration-200">
              <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-4 w-64">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Bug className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-900">Route Optimizer</h3>
                  </div>
                  <button
                    onClick={() => setShowPsoPopup(false)}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  <p className="text-xs text-gray-600">
                    Toggle PSO (Particle Swarm Optimization) for intelligent route planning
                  </p>
                  
                  {/* Toggle Switch */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Zap className={`w-4 h-4 ${psoEnabled ? 'text-purple-600' : 'text-gray-400'}`} />
                      <span className="text-sm font-medium text-gray-900">PSO Mode</span>
                    </div>
                    <button
                      onClick={() => setPsoEnabled(!psoEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        psoEnabled ? 'bg-purple-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          psoEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Status Description */}
                  <div className={`p-3 rounded-lg ${psoEnabled ? 'bg-purple-50 border border-purple-200' : 'bg-gray-50 border border-gray-200'}`}>
                    <div className="flex items-start gap-2">
                      {psoEnabled ? (
                        <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      )}
                      <div>
                        <p className={`text-xs font-medium ${psoEnabled ? 'text-purple-900' : 'text-gray-900'}`}>
                          {psoEnabled ? 'Smart Route Active' : 'Direct Route Mode'}
                        </p>
                        <p className={`text-xs mt-1 ${psoEnabled ? 'text-purple-700' : 'text-gray-600'}`}>
                          {psoEnabled 
                            ? 'AI avoids buildings with 100m clearance for safe flight path'
                            : 'Straight line route without obstacle avoidance'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Floating Bug Button */}
          <button
            onClick={() => setShowPsoPopup(!showPsoPopup)}
            className={`p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${
              psoEnabled 
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800' 
                : 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700'
            }`}
            title="Toggle Route Optimization"
          >
            <Bug className="w-6 h-6 text-white" />
            {psoEnabled && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
