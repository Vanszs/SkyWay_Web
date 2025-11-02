'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, AlertTriangle, Shield, CheckCircle } from 'lucide-react'

interface PSOControlPanelProps {
  isOptimizing?: boolean
  optimizationProgress?: { iteration: number; bestFitness: number; maxIterations: number }
  hasCollisions?: boolean
  routeGenerated?: boolean
}

export const PSOControlPanel: React.FC<PSOControlPanelProps> = ({
  isOptimizing = false,
  optimizationProgress,
  hasCollisions = false,
  routeGenerated = false
}) => {
  return (
    <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg overflow-hidden max-w-sm">
      {/* Header */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Zap className="w-4 h-4 mr-2 text-purple-500" />
            <h3 className="font-semibold text-sm text-gray-900">Auto Route Optimizer</h3>
            <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
              Automatic
            </span>
          </div>
          <div className="flex items-center gap-1">
            {routeGenerated && !hasCollisions && (
              <div className="px-2 py-1 bg-green-100 border border-green-200 rounded text-xs">
                <CheckCircle className="w-3 h-3 text-green-600 inline mr-1" />
                Optimal
              </div>
            )}
            {hasCollisions && (
              <div className="px-2 py-1 bg-red-100 border border-red-200 rounded text-xs">
                <AlertTriangle className="w-3 h-3 text-red-600 inline mr-1" />
                Recalculating
              </div>
            )}
          </div>
        </div>
        
        {/* Status */}
        {isOptimizing && optimizationProgress && (
          <div className="mt-2 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-purple-600">Finding optimal route...</span>
              <span className="text-gray-600">
                {optimizationProgress.iteration}/{optimizationProgress.maxIterations}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <motion.div
                className="bg-purple-500 h-1.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ 
                  width: `${(optimizationProgress.iteration / optimizationProgress.maxIterations) * 100}%` 
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="text-xs text-gray-600">
              Best Fitness: {optimizationProgress.bestFitness.toFixed(2)}
            </div>
          </div>
        )}
      </div>

      {/* Status Messages */}
      <AnimatePresence>
        {isOptimizing && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-3 py-2 bg-blue-50 border-b border-blue-200">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <div className="text-xs text-blue-800">
                  <p className="font-medium">Auto-Optimization Active</p>
                  <p>Calculating safest, straightest route...</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {routeGenerated && !hasCollisions && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-3 py-2 bg-green-50 border-b border-green-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <div className="text-xs text-green-800">
                  <p className="font-medium">Optimal Route Found</p>
                  <p>Straightest path with maximum safety</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {hasCollisions && !isOptimizing && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-3 py-2 bg-red-50 border-b border-red-200">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <div className="text-xs text-red-800">
                  <p className="font-medium">Route Optimization Required</p>
                  <p>Auto-adjusting for collision-free path...</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Section */}
      <div className="p-3 bg-gray-50">
        <div className="text-xs text-gray-600 space-y-1">
          <p className="font-medium text-gray-700">Automatic Features:</p>
          <ul className="space-y-1">
            <li className="flex items-center gap-1">
              <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
              <span>Straightest possible routes</span>
            </li>
            <li className="flex items-center gap-1">
              <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
              <span>Maximum collision avoidance</span>
            </li>
            <li className="flex items-center gap-1">
              <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
              <span>Optimal waypoint generation</span>
            </li>
            <li className="flex items-center gap-1">
              <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
              <span>Auto parameter tuning</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PSOControlPanel