'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([])
  const [showProgress, setShowProgress] = useState(false)
  const [progress, setProgress] = useState(0)

  const bootLines = [
    'CODE X BIOS v2.0.25',
    'Copyright (c) 2025 Code X Systems',
    '',
    'Iniciando secuencia de arranque...',
    'Detectando módulos de aprendizaje... OK',
    'Cargando base de datos de lenguajes... OK',
    'Inicializando motor de recomendaciones... OK',
    'Verificando integridad del sistema... OK',
    '',
    'Sistema de Entrenamiento Code X',
    'Version 1.0.0 - Terminal Edition',
    '',
  ]

  useEffect(() => {
    let lineIndex = 0
    const lineInterval = setInterval(() => {
      if (lineIndex < bootLines.length) {
        setLines(prev => [...prev, bootLines[lineIndex]])
        lineIndex++
      } else {
        clearInterval(lineInterval)
        setShowProgress(true)
      }
    }, 150)

    return () => clearInterval(lineInterval)
  }, [])

  useEffect(() => {
    if (!showProgress) return

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 5
      })
    }, 50)

    return () => clearInterval(progressInterval)
  }, [showProgress, onComplete])

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8 flex flex-col">
      <div className="max-w-3xl mx-auto w-full">
        {/* Boot text */}
        <div className="font-mono text-sm sm:text-base space-y-1">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-primary crt-glow"
            >
              {line || '\u00A0'}
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        {showProgress && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 space-y-2"
          >
            <div className="text-primary crt-glow">
              Cargando interfaz principal... {progress}%
            </div>
            <div className="retro-progress h-4 rounded-sm">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="retro-progress-bar h-full rounded-sm"
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* ASCII art */}
      <div className="mt-auto pt-8 text-center">
        <pre className="text-primary crt-glow text-xs sm:text-sm inline-block text-left">
{`
   ██████╗ ██████╗ ██████╗ ███████╗    ██╗  ██╗
  ██╔════╝██╔═══██╗██╔══██╗██╔════╝    ╚██╗██╔╝
  ██║     ██║   ██║██║  ██║█████╗       ╚███╔╝ 
  ██║     ██║   ██║██║  ██║██╔══╝       ██╔██╗ 
  ╚██████╗╚██████╔╝██████╔╝███████╗    ██╔╝ ██╗
   ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝    ╚═╝  ╚═╝
`}
        </pre>
      </div>
    </div>
  )
}
