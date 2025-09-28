'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Lock, User, Eye, EyeOff, Shield } from 'lucide-react'
import { BubbleCard, BubbleButton, BubbleInput } from '@/components/ui/skyway-components'

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate login process
    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'skyway2024') {
        router.push('/admin')
      } else {
        setError('Invalid credentials. Use admin/skyway2024 for demo.')
      }
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-navy via-sky-blue to-sky-navy flex items-center justify-center pt-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="w-16 h-16 bg-sky-gold rounded-2xl flex items-center justify-center mx-auto mb-4"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Shield className="w-8 h-8 text-sky-navy" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-neutral-300">Access SkyWay Operations Dashboard</p>
          </div>

          {/* Login Form */}
          <BubbleCard className="p-8 bg-white/10 backdrop-blur-md border-white/20">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <label className="text-white text-sm font-medium">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <BubbleInput
                    type="text"
                    placeholder="Enter username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    className="pl-12"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-white text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <BubbleInput
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="pl-12 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  className="p-3 bg-red-400/20 border border-red-400/30 rounded-xl text-red-400 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}

              {/* Demo Credentials */}
              <div className="p-3 bg-sky-gold/20 border border-sky-gold/30 rounded-xl">
                <div className="text-sky-gold text-sm font-medium mb-1">Demo Credentials:</div>
                <div className="text-sky-gold/80 text-xs">
                  Username: <code className="bg-sky-gold/20 px-1 rounded">admin</code><br/>
                  Password: <code className="bg-sky-gold/20 px-1 rounded">skyway2024</code>
                </div>
              </div>

              {/* Login Button */}
              <BubbleButton
                type="submit"
                disabled={isLoading || !credentials.username || !credentials.password}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </BubbleButton>
            </form>
          </BubbleCard>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-neutral-400 text-sm">
              For branch admin access and support, contact{' '}
              <span className="text-sky-gold">ops@skyway.id</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}