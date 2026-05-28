'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { RetroWindow, RetroButton, RetroInput } from '../retro-ui'
import { useApp } from '@/lib/context'

export function LoginScreen() {
  const { login, setCurrentScreen } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000))

    const success = login(email, password)
    if (success) {
      setCurrentScreen('intro')
    } else {
      setError('Credenciales inválidas. Verifica tu email y contraseña.')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <RetroWindow 
        title="LOGIN_SYSTEM.exe" 
        className="max-w-md w-full"
        onClose={() => setCurrentScreen('welcome')}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-primary crt-glow text-2xl font-bold"
            >
              ACCESO AL SISTEMA
            </motion.div>
            <p className="text-muted-foreground text-sm">
              {'>'} Ingresa tus credenciales para continuar
            </p>
          </div>

          {/* Terminal decoration */}
          <div className="retro-border rounded-sm p-4 bg-secondary/30 space-y-4">
            <div className="text-xs text-muted-foreground">
              <p>CODE X AUTHENTICATION TERMINAL</p>
              <p>==============================</p>
            </div>

            <RetroInput
              label="EMAIL"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="usuario@codex.net"
              required
            />

            <RetroInput
              label="CONTRASEÑA"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              required
            />

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-destructive text-sm p-2 border border-destructive rounded-sm bg-destructive/10"
              >
                {'>'} ERROR: {error}
              </motion.div>
            )}
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <RetroButton 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'VERIFICANDO...' : 'ACCEDER AL SISTEMA'}
            </RetroButton>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setCurrentScreen('register')}
                className="text-primary hover:text-primary/80 text-sm underline"
              >
                {'>'} ¿No tienes cuenta? Regístrate aquí
              </button>
            </div>
          </div>

          {/* Footer info */}
          <div className="text-xs text-muted-foreground text-center space-y-1">
            <p>Sistema protegido por Code X Security</p>
            <p className="text-primary crt-glow">Conexión segura establecida</p>
          </div>
        </form>
      </RetroWindow>
    </div>
  )
}
