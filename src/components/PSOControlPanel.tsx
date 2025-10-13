'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, Zap, Info, RotateCcw } from 'lucide-react'
import { PSOConfig, DEFAULT_PSO_CONFIG } from '@/lib/pso'

interface PSOControlPanelProps {
  config: PSOConfig
  onConfigChange: (config: PSOConfig) => void
  isEnabled: boolean
  onEnabledChange: (enabled: boolean) => void
  isOptimizing?: boolean
  optimizationProgress?: { iteration: number; bestFitness: number; maxIterations: number }
}

export const PSOControlPanel: React.FC<PSOControlPanelProps> = ({
  config,
  onConfigChange,
  isEnabled,
  onEnabledChange,
  isOptimizing = false,
  optimizationProgress
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleConfigUpdate = (key: keyof PSOConfig, value: number) => {
    onConfigChange({
      ...config,
      [key]: value
    })
  }

  const resetToDefaults = () => {
    onConfigChange(DEFAULT_PSO_CONFIG)
  }

  const presetConfigs = {
    fast: {
      populationSize: 30,
      maxIterations: 80,
      w: 0.7,
      c1: 1.5,
      c2: 1.0,
      maxVelocity: 0.008,
      waypointCount: 5,
      collisionWeight: 5000,
      distanceWeight: 3,
      smoothnessWeight: 3
    },
    balanced: DEFAULT_PSO_CONFIG,
    precise: {
      populationSize: 80,
      maxIterations: 200,
      w: 0.4,
      c1: 2.5,
      c2: 0.8,
      maxVelocity: 0.003,
      waypointCount: 12,
      collisionWeight: 15000,
      distanceWeight: 8,
      smoothnessWeight: 1
    }
  }

  const applyPreset = (preset: keyof typeof presetConfigs) => {
    onConfigChange(presetConfigs[preset])
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg overflow-hidden max-w-sm">
      {/* Header */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Zap className={`w-4 h-4 mr-2 ${isEnabled ? 'text-purple-500' : 'text-gray-400'}`} />
            <h3 className="font-semibold text-sm text-gray-900">PSO Settings</h3>
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              isEnabled
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-500'
            }`}>
              {isEnabled ? 'Active' : 'Inactive'}
            </span>
          </div>
          <button
            className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
            title="Toggle Settings"
          >
            <Settings className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-45' : ''}`} />
          </button>
        </div>
        
        {/* Status */}
        {isOptimizing && optimizationProgress && (
          <div className="mt-2 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-purple-600">Optimizing...</span>
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

      {/* Expanded Settings */}
      <AnimatePresence>
        {isExpanded && isEnabled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-2 space-y-2 max-h-60 overflow-y-auto">
              {/* Preset Buttons */}
              <div className="flex gap-1">
                <button
                  className="flex-1 px-1 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs transition-colors"
                  onClick={() => applyPreset('fast')}
                  title="Quick route planning with good building avoidance"
                >
                  Fast
                </button>
                <button
                  className="flex-1 px-1 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs transition-colors"
                  onClick={() => applyPreset('balanced')}
                  title="Optimal balance between distance and avoidance"
                >
                  Balanced
                </button>
                <button
                  className="flex-1 px-1 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs transition-colors"
                  onClick={() => applyPreset('precise')}
                  title="Maximum building avoidance, shortest routes"
                >
                  Precise
                </button>
              </div>

              {/* Configuration Sliders */}
              <div className="space-y-1">
                <div>
                  <label className="text-xs text-gray-600 flex justify-between">
                    <span>Population</span>
                    <span className="font-medium">{config.populationSize}</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={config.populationSize}
                    onChange={(e) => handleConfigUpdate('populationSize', parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    disabled={isOptimizing}
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-600 flex justify-between">
                    <span>Iterations</span>
                    <span className="font-medium">{config.maxIterations}</span>
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="200"
                    value={config.maxIterations}
                    onChange={(e) => handleConfigUpdate('maxIterations', parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    disabled={isOptimizing}
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-600 flex justify-between">
                    <span>Waypoints</span>
                    <span className="font-medium">{config.waypointCount}</span>
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    value={config.waypointCount}
                    onChange={(e) => handleConfigUpdate('waypointCount', parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    disabled={isOptimizing}
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-600 flex justify-between">
                    <span>Safety Distance</span>
                    <span className="font-medium">{config.collisionWeight/100}</span>
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="20000"
                    step="1000"
                    value={config.collisionWeight}
                    onChange={(e) => handleConfigUpdate('collisionWeight', parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    disabled={isOptimizing}
                  />
                </div>
              </div>

              {/* Reset Button */}
              <button
                className="w-full flex items-center justify-center gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs transition-colors"
                onClick={resetToDefaults}
                disabled={isOptimizing}
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )
    }

export default PSOControlPanel