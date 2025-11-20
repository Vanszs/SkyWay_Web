'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Modern Button Component with Bubble Style
interface BubbleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'default' | 'lg' | 'xl'
  loading?: boolean
}

export const BubbleButton = React.forwardRef<HTMLButtonElement, BubbleButtonProps>(
  ({ className, variant = 'primary', size = 'default', loading = false, children, onClick, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-bubble'

    const variants = {
      primary: 'bg-sky-gold text-white shadow-glow-sm hover:shadow-glow hover:bg-secondary-600',
      secondary: 'bg-sky-blue text-white hover:bg-primary-800 shadow-soft hover:shadow-soft-lg',
      ghost: 'bg-transparent border-2 border-sky-mid text-sky-slate hover:bg-sky-light hover:border-sky-gold',
      outline: 'border-2 border-sky-gold text-sky-gold hover:bg-sky-gold hover:text-white',
    }

    const sizes = {
      sm: 'h-9 px-4 text-sm',
      default: 'h-11 px-6 py-3',
      lg: 'h-13 px-8 py-4 text-lg',
      xl: 'h-16 px-10 py-5 text-xl',
    }

    return (
      <motion.button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={loading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        {...(props as any)}
      >
        {loading && (
          <motion.div
            className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        )}
        {children}
      </motion.button>
    )
  }
)

BubbleButton.displayName = 'BubbleButton'

// Modern Card Component
interface BubbleCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export const BubbleCard: React.FC<BubbleCardProps> = ({
  children,
  className,
  hover = true,
  glow = false
}) => {
  return (
    <motion.div
      className={cn(
        'bg-white rounded-2xl border border-neutral-200 transition-all duration-300 p-6',
        hover && 'hover:shadow-soft-lg hover:-translate-y-1 cursor-pointer',
        glow && 'shadow-glow-sm',
        'shadow-soft',
        className
      )}
      whileHover={hover ? { y: -4, boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)' } : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  )
}

// Modern Input Component
interface BubbleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const BubbleInput = React.forwardRef<HTMLInputElement, BubbleInputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-sm font-medium text-neutral-700">{label}</label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {icon}
            </div>
          )}
          <input
            className={cn(
              'w-full px-4 py-3 rounded-bubble border-2 border-neutral-200',
              'focus:border-sky-gold focus:ring-2 focus:ring-sky-gold/20 focus:outline-none',
              'transition-all duration-300 ease-in-out placeholder:text-neutral-400',
              icon && 'pl-10',
              error && 'border-red-300 focus:border-red-400 focus:ring-red-100',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

BubbleInput.displayName = 'BubbleInput'

// Loading Component
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', className }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <motion.div
      className={cn(
        'border-2 border-sky-gold border-t-transparent rounded-full',
        sizeClasses[size],
        className
      )}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  )
}

// Status Badge Component
interface StatusBadgeProps {
  status: 'pending' | 'in-transit' | 'delivered' | 'exception'
  className?: string
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const statusConfig = {
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    'in-transit': { label: 'In Transit', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    delivered: { label: 'Delivered', color: 'bg-green-100 text-green-800 border-green-200' },
    exception: { label: 'Exception', color: 'bg-red-100 text-red-800 border-red-200' },
  }

  const config = statusConfig[status]

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-pill text-xs font-medium border',
        config.color,
        className
      )}
    >
      {config.label}
    </span>
  )
}

// Bubble Tabs Component
export interface BubbleTabsProps {
  tabs: Array<{
    id: string
    label: string
    icon?: React.ElementType
  }>
  activeTab: string
  onChange: (tabId: string) => void
  className?: string
}

export const BubbleTabs: React.FC<BubbleTabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = ""
}) => {
  return (
    <div className={cn("flex space-x-2 p-1 bg-white/5 rounded-2xl backdrop-blur-sm", className)}>
      {tabs.map((tab) => {
        const Icon = tab.icon
        return (
          <motion.button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2",
              activeTab === tab.id
                ? "text-sky-navy bg-sky-gold shadow-lg"
                : "text-neutral-300 hover:text-white hover:bg-white/10"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {Icon && <Icon className="w-4 h-4" />}
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-sky-gold rounded-xl -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}