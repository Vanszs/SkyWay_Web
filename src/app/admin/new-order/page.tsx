'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Package, MapPin, User, Phone, Weight, Clock, Save, X, Zap } from 'lucide-react'
import Link from 'next/link'
import { RouteMapContainer } from '@/components/MapContainer'
import type { RouteData } from '@/types/route'

export default function NewOrder() {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    origin: '',
    destination: '',
    weight: '',
    priority: 'medium',
    notes: ''
  })
  
  const [routeData, setRouteData] = useState<RouteData | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRouteSelect = (route: RouteData) => {
    setRouteData(route)
    // Update form data based on selected route
    setFormData(prev => ({
      ...prev,
      origin: route.start.address,
      destination: route.end.address
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('New order data:', { ...formData, routeData })
    // Here you would typically send the data to your backend
    alert('Order created successfully!')
    // Redirect back to shipments page
    window.location.href = '/admin#shipments'
  }

  return (
    <div className="min-h-screen">
      <div className="admin-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin#shipments" className="admin-btn admin-btn-outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shipments
            </Link>
            <div>
              <h1 className="admin-title">Create New Order</h1>
              <p className="admin-subtitle">Add a new shipment to the system</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="admin-card">
            <div className="admin-card-header">
              <h2 className="admin-card-title">Order Details</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="admin-card-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Customer Information
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      className="admin-input"
                      placeholder="Enter customer name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      className="admin-input"
                      placeholder="+62 812-3456-7890"
                      required
                    />
                  </div>
                </div>

                {/* Shipment Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    Shipment Details
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="admin-input"
                      placeholder="0.0"
                      step="0.1"
                      min="0.1"
                      max="5.0"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="admin-input"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Route Information */}
              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Route Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Origin
                    </label>
                    <input
                      type="text"
                      name="origin"
                      value={formData.origin}
                      onChange={handleInputChange}
                      className="admin-input"
                      placeholder="Enter pickup location or select on map"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Destination
                    </label>
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      className="admin-input"
                      placeholder="Enter delivery location or select on map"
                      required
                    />
                  </div>
                </div>
                
                {/* Route Information Display */}
                {routeData && (
                  <div className="admin-route-info">
                    <h4>Route Details</h4>
                    <div className="admin-route-stats">
                      <div className="admin-route-stat">
                        <span className="admin-route-stat-value">{routeData.distance.toFixed(2)} km</span>
                        <span className="admin-route-stat-label">Distance</span>
                      </div>
                      <div className="admin-route-stat">
                        <span className="admin-route-stat-value">{routeData.estimatedDuration} min</span>
                        <span className="admin-route-stat-label">Duration</span>
                      </div>
                      <div className="admin-route-stat">
                        <span className="admin-route-stat-value">{routeData.isSafe ? 'Safe' : 'Check'}</span>
                        <span className="admin-route-stat-label">Safety Status</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Map Container */}
                <div className="mt-6">
                  <div className="admin-card">
                    <div className="admin-card-header">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="admin-card-title flex items-center">
                            <Zap className="w-4 h-4 mr-2 text-purple-500" />
                            Interactive Route Map
                          </h4>
                          <p className="text-sm text-gray-600">
                            Click on the map to set pickup and delivery points for optimal drone routing
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                            PSO Enabled
                          </div>
                          <div className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            AI Optimized
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="admin-card-body p-0">
                      <div className="admin-map-container">
                        <RouteMapContainer
                          onRouteSelect={handleRouteSelect}
                          enablePSO={true}
                          enableGoogleMaps={false}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* PSO Information */}
                  <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-purple-500 mt-0.5" />
                      <div>
                        <h5 className="font-semibold text-purple-900 mb-1">PSO Route Optimization Active</h5>
                        <p className="text-sm text-purple-700 mb-2">
                          Particle Swarm Optimization is analyzing thousands of potential routes to find the optimal path that avoids no-fly zones while minimizing distance and ensuring smooth flight paths.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-purple-700">Collision Avoidance</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-purple-700">Distance Optimization</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-purple-700">Smooth Pathfinding</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="text-purple-700">No-Fly Zone Avoidance</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="mt-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="admin-input"
                  rows={4}
                  placeholder="Enter any special instructions or notes..."
                />
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-end space-x-4">
                <Link href="/admin#shipments" className="admin-btn admin-btn-outline">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Link>
                <button type="submit" className="admin-btn admin-btn-primary">
                  <Save className="w-4 h-4 mr-2" />
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}