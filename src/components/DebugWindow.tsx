'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bug, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react'
import { Point } from '@/types/route'

interface DebugWindowProps {
  route: Point[]
  isVisible: boolean
  onToggle: () => void
  isBelowMap?: boolean
}

export const DebugWindow: React.FC<DebugWindowProps> = ({
  route,
  isVisible,
  onToggle,
  isBelowMap = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const routeData = {
      waypoints: route.map((point, index) => ({
        index: index + 1,
        latitude: point.lat,
        longitude: point.lng,
        coordinates: [point.lng, point.lat]
      })),
      totalWaypoints: route.length,
      boundingBox: {
        minLat: Math.min(...route.map(p => p.lat)),
        maxLat: Math.max(...route.map(p => p.lat)),
        minLng: Math.min(...route.map(p => p.lng)),
        maxLng: Math.max(...route.map(p => p.lng))
      },
      metadata: {
        generatedAt: new Date().toISOString(),
        algorithm: 'PSO (Particle Swarm Optimization)',
        safetyDistance: '100m from no-fly zones'
      }
    }

    try {
      await navigator.clipboard.writeText(JSON.stringify(routeData, null, 2))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (!isVisible) {
    return (
      <button
        onClick={onToggle}
        className={`${isBelowMap ? 'relative' : 'fixed bottom-4 right-4'} z-[1000] bg-gray-800 text-white p-3 rounded-lg shadow-lg hover:bg-gray-700 transition-colors`}
        title="Show Debug Window"
      >
        <Bug className="w-4 h-4" />
      </button>
    )
  }

  return (
    <div className={`${isBelowMap ? 'relative w-full' : 'fixed bottom-4 right-4'} z-[1000] bg-gray-900 text-white rounded-lg shadow-xl max-w-md max-h-96 overflow-hidden`}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Bug className="w-4 h-4 text-green-400" />
          <span className="font-semibold text-sm">Debug Console</span>
          <span className="px-2 py-0.5 bg-green-500 text-black rounded-full text-xs font-medium">
            {route.length} waypoints
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
            title="Copy JSON"
          >
            {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
            title="Toggle Expand"
          >
            {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
          </button>
          <button
            onClick={onToggle}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
            title="Hide Debug"
          >
            ×
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-3 max-h-80 overflow-y-auto">
              <div className="space-y-3">
                {/* Route Summary */}
                <div className="bg-gray-800 p-2 rounded">
                  <h4 className="text-xs font-semibold text-green-400 mb-1">Route Summary</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-400">Total Points:</span>
                      <span className="ml-1 text-white">{route.length}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Algorithm:</span>
                      <span className="ml-1 text-white">PSO</span>
                    </div>
                  </div>
                </div>

                {/* Waypoints List */}
                <div className="bg-gray-800 p-2 rounded">
                  <h4 className="text-xs font-semibold text-blue-400 mb-2">Waypoints</h4>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {route.map((point, index) => (
                      <div key={index} className="text-xs font-mono bg-gray-900 p-1 rounded">
                        <span className="text-yellow-400">[{index + 1}]</span>
                        <span className="text-gray-300"> lat: </span>
                        <span className="text-white">{point.lat.toFixed(6)}</span>
                        <span className="text-gray-300">, lng: </span>
                        <span className="text-white">{point.lng.toFixed(6)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* JSON Preview */}
                <div className="bg-gray-800 p-2 rounded">
                  <h4 className="text-xs font-semibold text-purple-400 mb-1">JSON Preview</h4>
                  <pre className="text-xs font-mono bg-gray-900 p-2 rounded overflow-x-auto max-h-32 overflow-y-auto">
{JSON.stringify({
  waypoints: route.slice(0, 3).map((point, index) => ({
    index: index + 1,
    latitude: point.lat,
    longitude: point.lng
  })),
  totalWaypoints: route.length,
  preview: "... (click copy for full JSON)"
}, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed State */}
      {!isExpanded && (
        <div className="p-2 text-xs text-gray-400">
          <div className="flex items-center justify-between">
            <span>Route: {route.length} waypoints</span>
            <span className="text-green-400">PSO Optimized</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default DebugWindow