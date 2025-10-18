'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  Navigation,
  Clock,
  Code
} from 'lucide-react'
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

export default function NewOrder() {
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
    
    // Real-time validation
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
    window.location.href = '/admin#shipments'
    
    setIsSubmitting(false)
  }

  // Calculate estimated price
  const calculateEstimatedPrice = () => {
    if (!routeData || !formData.weight) return 0
    
    const basePrice = 15000 // Base price in IDR
    const distanceRate = 5000 // Per km
    const weightRate = 2000 // Per kg
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

  // Generate waypoint JSON for display
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
          elevation: 0, // Default elevation since Waypoint doesn't have elevation property
          timestamp: index * 30 // Estimated 30 seconds per waypoint
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

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #fafbfc 0%, #f8fafc 50%, #f1f5f9 100%)'}}>
      <div className="admin-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin#shipments" className="admin-btn admin-btn-outline group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Shipments
            </Link>
            <div>
              <h1 className="admin-title">Create New Order</h1>
              <p className="admin-subtitle">Complete the form to create a new delivery order</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="lg:col-span-2 space-y-6"
              >
                {/* Customer Information */}
                <div className="admin-card" style={{background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'}}>
                  <div className="admin-card-header border-b border-gray-100">
                    <h2 className="admin-card-title flex items-center">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      Customer Information
                    </h2>
                  </div>

                  <div className="admin-card-body">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Customer Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            className={`admin-input ${errors.customerName && touched.customerName ? 'border-red-300 focus:border-red-500' : ''}`}
                            placeholder="Enter customer name"
                          />
                          {formData.customerName && !errors.customerName && (
                            <CheckCircle className="w-5 h-5 text-green-500 absolute right-3 top-1/2 -translate-y-1/2" />
                          )}
                        </div>
                        {errors.customerName && touched.customerName && (
                          <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.customerName}
                          </motion.p>
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
                            className={`admin-input pl-10 ${errors.customerPhone && touched.customerPhone ? 'border-red-300 focus:border-red-500' : ''}`}
                            placeholder="+62 812-3456-7890"
                          />
                          {formData.customerPhone && !errors.customerPhone && (
                            <CheckCircle className="w-5 h-5 text-green-500 absolute right-3 top-1/2 -translate-y-1/2" />
                          )}
                        </div>
                        {errors.customerPhone && touched.customerPhone && (
                          <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.customerPhone}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Package Details */}
                <div className="admin-card" style={{background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'}}>
                  <div className="admin-card-header border-b border-gray-100">
                    <h2 className="admin-card-title flex items-center">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center mr-3">
                        <Package className="w-4 h-4 text-orange-600" />
                      </div>
                      Package Information
                    </h2>
                  </div>
                  
                  <div className="admin-card-body">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            className={`admin-input pl-10 ${errors.weight && touched.weight ? 'border-red-300 focus:border-red-500' : ''}`}
                            placeholder="0.0"
                            step="0.1"
                            min="0.1"
                            max="5.0"
                          />
                          {formData.weight && !errors.weight && (
                            <CheckCircle className="w-5 h-5 text-green-500 absolute right-3 top-1/2 -translate-y-1/2" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Maximum weight: 5.0 kg</p>
                        {errors.weight && touched.weight && (
                          <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.weight}
                          </motion.p>
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
                          className="admin-input"
                        >
                          <option value="low">🟢 Low Priority</option>
                          <option value="medium">🟡 Medium Priority</option>
                          <option value="high">🟠 High Priority</option>
                          <option value="urgent">🔴 Urgent</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">
                          {formData.priority === 'urgent' && 'Delivery in under 30 minutes'}
                          {formData.priority === 'high' && 'Priority processing (1-2 hours)'}
                          {formData.priority === 'medium' && 'Standard delivery (2-4 hours)'}
                          {formData.priority === 'low' && 'Economy delivery (4-8 hours)'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Route Information */}
                <div className="admin-card" style={{background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'}}>
                  <div className="admin-card-header border-b border-gray-100">
                    <h2 className="admin-card-title flex items-center">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mr-3">
                        <MapPin className="w-4 h-4 text-purple-600" />
                      </div>
                      Route Planning
                    </h2>
                  </div>
                  
                  <div className="admin-card-body space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pickup Location <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="origin"
                          value={formData.origin}
                          className="admin-input"
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
                          className="admin-input"
                          placeholder="Click on map to select"
                          readOnly
                        />
                      </div>
                    </div>

                    {routeData && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100"
                      >
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{routeData.distance.toFixed(2)} km</div>
                          <div className="text-xs text-gray-600 mt-1">Distance</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{routeData.estimatedDuration} min</div>
                          <div className="text-xs text-gray-600 mt-1">Est. Duration</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{routeData.isSafe ? '✓' : '⚠'}</div>
                          <div className="text-xs text-gray-600 mt-1">{routeData.isSafe ? 'Safe Route' : 'Check Route'}</div>
                        </div>
                      </motion.div>
                    )}

                    {/* Map */}
                    <div className="admin-card border-2 border-purple-100">
                      <div className="admin-card-header bg-gradient-to-r from-purple-50 to-blue-50 border-b border-purple-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="admin-card-title flex items-center text-purple-900">
                              <Zap className="w-4 h-4 mr-2 text-purple-500" />
                              AI-Powered Route Map
                            </h4>
                            <p className="text-xs text-purple-700 mt-1">
                              Click to set pickup → Click to set delivery
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium flex items-center">
                              <Zap className="w-3 h-3 mr-1" />
                              PSO Active
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="admin-card-body p-0">
                        <div className="admin-map-container" style={{height: '400px'}}>
                          <RouteMapContainer
                            onRouteSelect={handleRouteSelect}
                            enablePSO={true}
                            enableGoogleMaps={false}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="admin-card" style={{background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'}}>
                  <div className="admin-card-header border-b border-gray-100">
                    <h3 className="admin-card-title">Additional Notes (Optional)</h3>
                  </div>
                  <div className="admin-card-body">
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="admin-input"
                      rows={3}
                      placeholder="Any special delivery instructions..."
                    />
                  </div>
                </div>

                {/* Waypoint JSON Section */}
                <div className="admin-card" style={{background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'}}>
                  <div className="admin-card-header border-b border-gray-100">
                    <h3 className="admin-card-title flex items-center">
                      <Code className="w-5 h-5 mr-2 text-indigo-600" />
                      Route Waypoints (JSON)
                    </h3>
                  </div>
                  <div className="admin-card-body">
                    {getWaypointJSON() ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600">
                            Complete route data with waypoint coordinates and metadata
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(getWaypointJSON() || '')
                              alert('Waypoint JSON copied to clipboard!')
                            }}
                            className="admin-btn admin-btn-outline text-xs px-3 py-1"
                          >
                            Copy JSON
                          </button>
                        </div>
                        <div className="relative">
                          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-xs font-mono max-h-64 scrollbar-thin">
                            {getWaypointJSON()}
                          </pre>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                          <div className="bg-blue-50 p-2 rounded text-blue-700">
                            <div className="font-semibold">Waypoints</div>
                            <div>{routeData?.waypoints?.length || 0}</div>
                          </div>
                          <div className="bg-green-50 p-2 rounded text-green-700">
                            <div className="font-semibold">Distance</div>
                            <div>{routeData?.distance?.toFixed(2) || 0} km</div>
                          </div>
                          <div className="bg-purple-50 p-2 rounded text-purple-700">
                            <div className="font-semibold">Duration</div>
                            <div>{routeData?.estimatedDuration || 0} min</div>
                          </div>
                          <div className="bg-orange-50 p-2 rounded text-orange-700">
                            <div className="font-semibold">Safety</div>
                            <div>{routeData?.isSafe ? 'Safe' : 'Check'}</div>
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
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <Link href="/admin#shipments" className="admin-btn admin-btn-outline group">
                    <X className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" />
                    Cancel Order
                  </Link>
                  <button 
                    type="submit"
                    disabled={isSubmitting || !isFormValid}
                    className="admin-btn admin-btn-primary disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Creating Order...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        Create Order
                      </>
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Sidebar - Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Order Summary */}
                <div className="admin-card sticky top-24" style={{background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'}}>
                  <div className="admin-card-header bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                    <h3 className="admin-card-title flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                      Order Summary
                    </h3>
                  </div>
                  <div className="admin-card-body space-y-4">
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
                        <div className="border-t border-gray-200 pt-3 mt-3 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Distance:</span>
                            <span className="font-medium text-gray-900">{routeData.distance.toFixed(2)} km</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Est. Time:</span>
                            <span className="font-medium text-gray-900">{routeData.estimatedDuration} min</span>
                          </div>
                        </div>

                        <div className="border-t-2 border-gray-300 pt-3 mt-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Estimated Cost:</span>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-blue-600">
                                {formattedPrice(calculateEstimatedPrice())}
                              </div>
                              <div className="text-xs text-gray-500">Including all fees</div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {!routeData && (
                      <div className="text-center py-6">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                          <MapPin className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-500">Select route on map</p>
                        <p className="text-xs text-gray-400 mt-1">to calculate pricing</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* PSO Info */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="admin-card" 
                  style={{background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)'}}
                >
                  <div className="admin-card-body">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-1">AI Route Optimization</h4>
                        <p className="text-sm text-purple-700 mb-3">
                          Our Particle Swarm Optimization automatically finds the safest and most efficient route with enhanced building avoidance.
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-purple-700">Collision Free</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-purple-700">Optimized Path</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-purple-700">Smooth Flight</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="text-purple-700">No-Fly Avoid</span>
                          </div>
                        </div>
                        <div className="mt-3 p-2 bg-purple-100 rounded-lg">
                          <p className="text-xs text-purple-800 font-medium">Building Clearance: 100m</p>
                          <p className="text-xs text-purple-600">Routes maintain safe distance from structures</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}