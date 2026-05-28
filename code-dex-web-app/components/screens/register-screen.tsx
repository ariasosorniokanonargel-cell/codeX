'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { RetroWindow, RetroButton, RetroInput } from '../retro-ui'
import { useApp } from '@/lib/context'

export function RegisterScreen() {
  const { register, setCurrentScreen } = useApp()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    if (username.length < 3) {
      setError('El nombre de usuario debe tener al menos 3 caracteres.')
      return
    }

    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    const success = register(username, email, password)
    if (success) {
      setCurrentScreen('intro')
    } else {
      setError('Este email ya está registrado. Intenta con otro.')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <RetroWindow 
        title="REGISTER_SYSTEM.exe" 
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
              REGISTRO DE USUARIO
            </motion.div>
            <p className="text-muted-foreground text-sm">
              {'>'} Crea tu cuenta en el sistema Code X
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4].map((step) => (
              <motion.div
                key={step}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: step * 0.1 }}
                className={`w-3 h-3 rounded-full ${
                  (step === 1 && username) || 
                  (step === 2 && email) || 
                  (step === 3 && password) || 
                  (step === 4 && confirmPassword)
                    ? 'bg-primary' 
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Form */}
          <div className="retro-border rounded-sm p-4 bg-secondary/30 space-y-4">
            <div className="text-xs text-muted-foreground">
              <p>CODE X USER REGISTRATION</p>
              <p>========================</p>
            </div>

            <RetroInput
              label="NOMBRE DE USUARIO"
              type="text"
              value={username}
              onChange={setUsername}
              placeholder="hacker_pro"
              required
            />

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

            <RetroInput
              label="CONFIRMAR CONTRASEÑA"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
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

          {/* Terms */}
          <div className="text-xs text-muted-foreground">
            <p>{'>'} Al registrarte, aceptas los términos del sistema Code X</p>
            <p>{'>'} Tus datos están protegidos por encriptación de nivel militar</p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <RetroButton 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'PROCESANDO...' : 'CREAR CUENTA'}
            </RetroButton>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setCurrentScreen('login')}
                className="text-primary hover:text-primary/80 text-sm underline"
              >
                {'>'} ¿Ya tienes cuenta? Inicia sesión
              </button>
            </div>
          </div>
        </form>
      </RetroWindow>
    </div>
  )
}
