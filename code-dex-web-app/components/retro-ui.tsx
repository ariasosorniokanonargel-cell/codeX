'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface TypewriterProps {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
  showCursor?: boolean
}

export function Typewriter({ text, speed = 50, className = '', onComplete, showCursor = true }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setDisplayedText('')
    setIsComplete(false)
    let index = 0
    
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        setIsComplete(true)
        onComplete?.()
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, onComplete])

  return (
    <span className={className}>
      {displayedText}
      {showCursor && !isComplete && <span className="animate-pulse">█</span>}
    </span>
  )
}

interface RetroWindowProps {
  title: string
  children: React.ReactNode
  className?: string
  onClose?: () => void
}

export function RetroWindow({ title, children, className = '', onClose }: RetroWindowProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`retro-window rounded-sm overflow-hidden ${className}`}
    >
      <div className="retro-window-header flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-background font-bold text-lg">{title}</span>
        </div>
        <div className="flex gap-1">
          <button className="w-4 h-4 bg-accent border border-accent-foreground/30 text-xs flex items-center justify-center">_</button>
          <button className="w-4 h-4 bg-secondary border border-border text-xs flex items-center justify-center">□</button>
          {onClose && (
            <button 
              onClick={onClose}
              className="w-4 h-4 bg-destructive border border-destructive-foreground/30 text-xs flex items-center justify-center hover:bg-destructive/80"
            >
              ×
            </button>
          )}
        </div>
      </div>
      <div className="p-4">
        {children}
      </div>
    </motion.div>
  )
}

interface RetroProgressProps {
  value: number
  max?: number
  label?: string
  showPercentage?: boolean
  className?: string
}

export function RetroProgress({ value, max = 100, label, showPercentage = true, className = '' }: RetroProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={`space-y-1 ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between text-sm">
          {label && <span className="text-muted-foreground">{label}</span>}
          {showPercentage && <span className="text-primary crt-glow">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className="retro-progress h-4 rounded-sm">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="retro-progress-bar h-full rounded-sm"
        />
      </div>
    </div>
  )
}

interface RetroButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  type?: 'button' | 'submit'
}

export function RetroButton({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button'
}: RetroButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-6 py-2 text-base',
    lg: 'px-8 py-3 text-lg'
  }

  const variantClasses = {
    primary: 'retro-button',
    secondary: 'bg-secondary text-primary border-2 border-primary hover:bg-secondary/80',
    danger: 'bg-destructive text-destructive-foreground border-2 border-destructive hover:bg-destructive/80'
  }

  return (
    <motion.button
      type={type}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        font-bold rounded-sm transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </motion.button>
  )
}

interface RetroInputProps {
  label?: string
  type?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  required?: boolean
}

export function RetroInput({ label, type = 'text', value, onChange, placeholder, className = '', required }: RetroInputProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm text-primary crt-glow">
          {`> ${label}`}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="retro-input w-full px-4 py-2 rounded-sm text-lg"
      />
    </div>
  )
}

interface GlitchTextProps {
  text: string
  className?: string
}

export function GlitchText({ text, className = '' }: GlitchTextProps) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      whileHover={{ 
        textShadow: [
          '2px 0 #ff0000, -2px 0 #00ff00',
          '-2px 0 #ff0000, 2px 0 #00ff00',
          '2px 0 #ff0000, -2px 0 #00ff00',
        ]
      }}
      transition={{ duration: 0.1, repeat: Infinity }}
    >
      {text}
    </motion.span>
  )
}

interface ScanlineOverlayProps {
  intensity?: 'light' | 'medium' | 'heavy'
}

export function ScanlineOverlay({ intensity = 'light' }: ScanlineOverlayProps) {
  const opacities = {
    light: '0.03',
    medium: '0.08',
    heavy: '0.15'
  }

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, ${opacities[intensity]}) 2px,
          rgba(0, 0, 0, ${opacities[intensity]}) 4px
        )`
      }}
    />
  )
}

interface TerminalLineProps {
  prefix?: string
  children: React.ReactNode
  className?: string
}

export function TerminalLine({ prefix = '>', children, className = '' }: TerminalLineProps) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <span className="text-primary crt-glow">{prefix}</span>
      <span className="text-foreground">{children}</span>
    </div>
  )
}

interface StatBoxProps {
  label: string
  value: string | number
  icon?: string
  trend?: 'up' | 'down' | 'neutral'
  className?: string
}

export function StatBox({ label, value, icon, trend, className = '' }: StatBoxProps) {
  const trendColors = {
    up: 'text-primary',
    down: 'text-destructive',
    neutral: 'text-muted-foreground'
  }

  return (
    <div className={`retro-border rounded-sm p-4 bg-card ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-muted-foreground text-sm">{label}</span>
        {icon && <span className="text-xl">{icon}</span>}
      </div>
      <div className={`text-2xl font-bold crt-glow ${trend ? trendColors[trend] : 'text-primary'}`}>
        {value}
      </div>
    </div>
  )
}

interface LoadingBarProps {
  text?: string
}

export function LoadingBar({ text = 'CARGANDO' }: LoadingBarProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0
        return prev + Math.random() * 15
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-primary">
        <span className="loading-dots">{text}</span>
        <span>{Math.min(100, Math.round(progress))}%</span>
      </div>
      <div className="retro-progress h-3">
        <div 
          className="retro-progress-bar h-full transition-all duration-200"
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
    </div>
  )
}
