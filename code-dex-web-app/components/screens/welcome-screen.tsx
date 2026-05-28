'use client'

import { motion } from 'framer-motion'
import { Typewriter, RetroButton, RetroWindow } from '../retro-ui'
import { useApp } from '@/lib/context'

export function WelcomeScreen() {
  const { setCurrentScreen } = useApp()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <RetroWindow title="CODE_X_SYSTEM.exe" className="max-w-2xl w-full">
        <div className="space-y-8 text-center">
          {/* Logo ASCII */}
          <motion.pre
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-primary crt-glow text-xs sm:text-sm inline-block mx-auto"
          >
{`
 ██████╗ ██████╗ ██████╗ ███████╗
██╔════╝██╔═══██╗██╔══██╗██╔════╝
██║     ██║   ██║██║  ██║█████╗  
██║     ██║   ██║██║  ██║██╔══╝  
╚██████╗╚██████╔╝██████╔╝███████╗
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝
`}
          </motion.pre>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-primary crt-glow">
              Code X
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mt-2">
              Sistema de Descubrimiento de Lenguajes v1.0
            </p>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-primary text-left space-y-2"
          >
            <p className="text-lg">
              <Typewriter 
                text="> Bienvenido al sistema de análisis de lenguajes de programación." 
                speed={30}
              />
            </p>
          </motion.div>

          {/* Terminal info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="retro-border rounded-sm p-4 bg-secondary/30 text-left space-y-1"
          >
            <p className="text-muted-foreground text-sm">{'>'} Sistema: Code X Terminal</p>
            <p className="text-muted-foreground text-sm">{'>'} Versión: 1.0.0</p>
            <p className="text-muted-foreground text-sm">{'>'} Estado: OPERATIVO</p>
            <p className="text-primary text-sm crt-glow">{'>'} Usuarios registrados: 1,337</p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <RetroButton 
              onClick={() => setCurrentScreen('login')}
              size="lg"
            >
              INICIAR SESIÓN
            </RetroButton>
            <RetroButton 
              onClick={() => setCurrentScreen('register')}
              variant="secondary"
              size="lg"
            >
              REGISTRARSE
            </RetroButton>
          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="text-xs text-muted-foreground"
          >
            Presiona cualquier botón para continuar...
          </motion.p>
        </div>
      </RetroWindow>
    </div>
  )
}
