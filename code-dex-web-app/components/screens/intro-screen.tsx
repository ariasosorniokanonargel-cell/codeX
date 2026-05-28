'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RetroWindow, RetroButton, Typewriter } from '../retro-ui'
import { useApp } from '@/lib/context'

const introSteps = [
  {
    title: 'BIENVENIDO A CODE X',
    content: 'Has accedido al sistema de descubrimiento de lenguajes de programación más avanzado del ciberespacio.',
    icon: '🖥️'
  },
  {
    title: 'TU MISIÓN',
    content: 'Descubrir qué lenguaje de programación es perfecto para ti basándose en tus habilidades, intereses y objetivos.',
    icon: '🎯'
  },
  {
    title: 'CÓMO FUNCIONA',
    content: 'Responderás un cuestionario de análisis. Nuestro algoritmo procesará tus respuestas y te recomendará los mejores lenguajes para ti.',
    icon: '⚡'
  },
  {
    title: 'SISTEMA DE APRENDIZAJE',
    content: 'Una vez selecciones tu lenguaje, tendrás acceso a un sistema de aprendizaje tipo Duolingo con ejercicios, XP, niveles y recompensas.',
    icon: '📚'
  },
  {
    title: '¿LISTO PARA EMPEZAR?',
    content: 'El análisis está preparado. Tus respuestas determinarán tu camino en el mundo de la programación.',
    icon: '🚀'
  }
]

export function IntroScreen() {
  const { setCurrentScreen, user } = useApp()
  const [currentStep, setCurrentStep] = useState(0)
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  const handleNext = () => {
    setIsTypingComplete(false)
    if (currentStep < introSteps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      setCurrentScreen('quiz')
    }
  }

  const handleSkip = () => {
    setCurrentScreen('quiz')
  }

  const step = introSteps[currentStep]

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <RetroWindow title="CODE_X_INTRO.exe" className="max-w-2xl w-full">
        <div className="space-y-6">
          {/* User greeting */}
          <div className="text-sm text-muted-foreground">
            {'>'} Usuario conectado: <span className="text-primary crt-glow">{user?.username || 'UNKNOWN'}</span>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2">
            {introSteps.map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Content area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="retro-border rounded-sm p-6 bg-secondary/30 min-h-[250px] flex flex-col items-center justify-center text-center"
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="text-6xl mb-4"
              >
                {step.icon}
              </motion.div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-bold text-primary crt-glow mb-4">
                {step.title}
              </h2>

              {/* Content */}
              <div className="text-lg text-foreground max-w-lg">
                <Typewriter 
                  text={step.content} 
                  speed={25}
                  onComplete={() => setIsTypingComplete(true)}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Terminal output */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p>{'>'} Módulo de introducción: {currentStep + 1}/{introSteps.length}</p>
            <p>{'>'} Estado: {isTypingComplete ? 'LISTO PARA CONTINUAR' : 'PROCESANDO...'}</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <RetroButton 
              onClick={handleSkip}
              variant="secondary"
              size="md"
            >
              SALTAR INTRO
            </RetroButton>

            <RetroButton 
              onClick={handleNext}
              size="lg"
              disabled={!isTypingComplete}
            >
              {currentStep < introSteps.length - 1 ? 'CONTINUAR' : 'INICIAR ANÁLISIS'}
            </RetroButton>
          </div>
        </div>
      </RetroWindow>
    </div>
  )
}
