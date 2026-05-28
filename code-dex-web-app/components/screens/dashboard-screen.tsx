'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { RetroWindow, RetroButton, RetroProgress, StatBox } from '../retro-ui'
import { useApp } from '@/lib/context'
import { languages, lessonsData } from '@/lib/languages'

export function DashboardScreen() {
  const { user, progress, setCurrentScreen, logout } = useApp()
  const [showMenu, setShowMenu] = useState(false)

  const currentLang = progress.selectedLanguage ? languages[progress.selectedLanguage] : null
  const langProgress = progress.selectedLanguage 
    ? progress.languageProgress[progress.selectedLanguage] 
    : null
  
  const lessons = progress.selectedLanguage ? lessonsData[progress.selectedLanguage] || [] : []
  const completedLessons = langProgress?.lessonsCompleted.length || 0
  const totalLessons = lessons.length

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <motion.pre
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-primary crt-glow text-xs hidden sm:block"
            >
{`╔══════════╗
║ CODE X   ║
╚══════════╝`}
            </motion.pre>
            <div>
              <h1 className="text-2xl font-bold text-primary crt-glow">DASHBOARD</h1>
              <p className="text-muted-foreground text-sm">
                {'>'} Usuario: {user?.username} | Sesión activa
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <RetroButton 
              variant="secondary" 
              size="sm"
              onClick={() => setShowMenu(!showMenu)}
            >
              MENÚ
            </RetroButton>
            <RetroButton 
              variant="danger" 
              size="sm"
              onClick={logout}
            >
              CERRAR SESIÓN
            </RetroButton>
          </div>
        </div>

        {/* Menu dropdown */}
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="retro-border rounded-sm p-4 bg-card"
          >
            <div className="flex flex-wrap gap-2">
              <RetroButton 
                size="sm" 
                onClick={() => {
                  setCurrentScreen('results')
                  setShowMenu(false)
                }}
              >
                VER OTROS LENGUAJES
              </RetroButton>
              <RetroButton 
                size="sm"
                variant="secondary"
                onClick={() => {
                  setCurrentScreen('quiz')
                  setShowMenu(false)
                }}
              >
                REPETIR CUESTIONARIO
              </RetroButton>
            </div>
          </motion.div>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBox 
            label="XP TOTAL" 
            value={progress.totalXp.toLocaleString()} 
            icon="⚡"
            trend="up"
          />
          <StatBox 
            label="NIVEL" 
            value={langProgress?.level || 1} 
            icon="📊"
          />
          <StatBox 
            label="RACHA" 
            value={`${progress.currentStreak} días`} 
            icon="🔥"
            trend={progress.currentStreak > 0 ? 'up' : 'neutral'}
          />
          <StatBox 
            label="LECCIONES" 
            value={`${completedLessons}/${totalLessons}`} 
            icon="📚"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Current language */}
          <div className="lg:col-span-2 space-y-6">
            {currentLang && (
              <RetroWindow title={`${currentLang.name.toUpperCase()}_TRAINING.exe`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{currentLang.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-primary crt-glow">
                        {currentLang.name}
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        Dificultad: {currentLang.difficulty}
                      </p>
                    </div>
                  </div>

                  <RetroProgress 
                    value={(completedLessons / Math.max(totalLessons, 1)) * 100} 
                    label="Progreso del módulo"
                  />

                  <div className="flex gap-4 flex-wrap">
                    <RetroButton 
                      onClick={() => setCurrentScreen('learning')}
                      size="lg"
                    >
                      CONTINUAR APRENDIENDO
                    </RetroButton>
                  </div>
                </div>
              </RetroWindow>
            )}

            {/* Recent activity */}
            <RetroWindow title="ACTIVITY_LOG.dat">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">REGISTRO DE ACTIVIDAD RECIENTE</p>
                <p className="text-xs text-muted-foreground">{'='}.repeat(40)</p>
                
                {langProgress?.lessonsCompleted.length ? (
                  langProgress.lessonsCompleted.slice(-5).reverse().map((lessonId) => {
                    const lesson = lessons.find(l => l.id === lessonId)
                    return (
                      <motion.div
                        key={lessonId}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span className="text-primary">{'>'}</span>
                        <span className="text-green-400">COMPLETADO:</span>
                        <span className="text-foreground">{lesson?.title || `Lección ${lessonId}`}</span>
                        <span className="text-muted-foreground ml-auto">+{lesson?.xpReward || 20} XP</span>
                      </motion.div>
                    )
                  })
                ) : (
                  <p className="text-muted-foreground text-sm">
                    {'>'} No hay actividad reciente. ¡Empieza a aprender!
                  </p>
                )}
              </div>
            </RetroWindow>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User profile */}
            <RetroWindow title="USER_PROFILE.dat">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto retro-border rounded-sm bg-secondary flex items-center justify-center text-4xl mb-2">
                    👤
                  </div>
                  <h3 className="font-bold text-primary crt-glow">{user?.username}</h3>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nivel Global:</span>
                    <span className="text-primary">{Math.floor(progress.totalXp / 100) + 1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">XP Total:</span>
                    <span className="text-primary">{progress.totalXp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Racha máxima:</span>
                    <span className="text-primary">{progress.longestStreak} días</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lenguajes:</span>
                    <span className="text-primary">{progress.languagesStarted.length}</span>
                  </div>
                </div>
              </div>
            </RetroWindow>

            {/* Daily goal */}
            <RetroWindow title="DAILY_MISSION.exe">
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-muted-foreground text-sm mb-2">Meta diaria de XP</p>
                  <div className="text-4xl font-bold text-primary crt-glow">
                    {Math.min(langProgress?.xp || 0, 50)}/50
                  </div>
                </div>
                <RetroProgress 
                  value={Math.min((langProgress?.xp || 0), 50)} 
                  max={50}
                  showPercentage={false}
                />
                {(langProgress?.xp || 0) >= 50 ? (
                  <p className="text-green-400 text-center text-sm">
                    ¡Meta completada hoy!
                  </p>
                ) : (
                  <p className="text-muted-foreground text-center text-sm">
                    Faltan {50 - Math.min(langProgress?.xp || 0, 50)} XP
                  </p>
                )}
              </div>
            </RetroWindow>

            {/* Other languages */}
            {progress.languagesStarted.length > 1 && (
              <RetroWindow title="OTHER_MODULES.dat">
                <div className="space-y-2">
                  {progress.languagesStarted
                    .filter(id => id !== progress.selectedLanguage)
                    .slice(0, 3)
                    .map(langId => {
                      const lang = languages[langId]
                      const lp = progress.languageProgress[langId]
                      if (!lang) return null
                      return (
                        <button
                          key={langId}
                          onClick={() => {
                            // Switch to this language - would need to add this to context
                          }}
                          className="w-full flex items-center gap-3 p-2 rounded-sm hover:bg-secondary/50 transition-colors"
                        >
                          <span className="text-2xl">{lang.icon}</span>
                          <div className="text-left flex-1">
                            <p className="text-sm font-bold">{lang.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Nivel {lp?.level || 1} • {lp?.xp || 0} XP
                            </p>
                          </div>
                        </button>
                      )
                    })}
                </div>
              </RetroWindow>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
