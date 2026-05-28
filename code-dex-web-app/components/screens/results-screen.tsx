'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RetroWindow, RetroButton, RetroProgress } from '../retro-ui'
import { useApp } from '@/lib/context'
import { languages, Language } from '@/lib/languages'

export function ResultsScreen() {
  const { progress, selectLanguage, setCurrentScreen } = useApp()
  const [selectedLang, setSelectedLang] = useState<string | null>(null)
  const [showDetail, setShowDetail] = useState(false)

  const recommendedLangs = progress.recommendedLanguages
    .map(id => languages[id])
    .filter(Boolean)

  const handleSelectLanguage = (langId: string) => {
    setSelectedLang(langId)
    setShowDetail(true)
  }

  const handleStartLearning = () => {
    if (selectedLang) {
      selectLanguage(selectedLang)
    }
  }

  const lang = selectedLang ? languages[selectedLang] : null

  return (
    <div className="min-h-screen bg-background p-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <RetroWindow title="ANALYSIS_RESULTS.exe" className="w-full">
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="text-6xl"
            >
              🔬
            </motion.div>
            <h1 className="text-3xl font-bold text-primary crt-glow">
              ANÁLISIS COMPLETADO
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              {'>'} Basándose en tus respuestas, el sistema ha identificado los siguientes lenguajes compatibles con tu perfil.
            </p>
          </div>
        </RetroWindow>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedLangs.map((language, index) => (
            <motion.div
              key={language.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <LanguageCard 
                language={language} 
                rank={index + 1}
                isSelected={selectedLang === language.id}
                onClick={() => handleSelectLanguage(language.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Detail Panel */}
        <AnimatePresence>
          {showDetail && lang && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <RetroWindow 
                title={`${lang.name.toUpperCase()}_MODULE.dat`}
                onClose={() => setShowDetail(false)}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left column */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-5xl">{lang.icon}</span>
                      <div>
                        <h2 className="text-2xl font-bold text-primary crt-glow">{lang.name}</h2>
                        <span className={`
                          text-sm px-2 py-0.5 rounded-sm
                          ${lang.difficulty === 'Fácil' ? 'bg-green-500/20 text-green-400' : ''}
                          ${lang.difficulty === 'Intermedio' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                          ${lang.difficulty === 'Difícil' ? 'bg-orange-500/20 text-orange-400' : ''}
                          ${lang.difficulty === 'Avanzado' ? 'bg-red-500/20 text-red-400' : ''}
                        `}>
                          {lang.difficulty}
                        </span>
                      </div>
                    </div>

                    <p className="text-foreground">{lang.description}</p>

                    <div>
                      <h3 className="text-primary crt-glow font-bold mb-2">{'>'} POPULARIDAD</h3>
                      <RetroProgress value={lang.popularity} label="Índice de mercado" />
                    </div>

                    <div>
                      <h3 className="text-primary crt-glow font-bold mb-2">{'>'} TIEMPO ESTIMADO</h3>
                      <p className="text-muted-foreground">{lang.estimatedTime}</p>
                    </div>
                  </div>

                  {/* Right column */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-primary crt-glow font-bold mb-2">{'>'} VENTAJAS</h3>
                      <ul className="space-y-1">
                        {lang.advantages.map((adv, i) => (
                          <li key={i} className="text-green-400 text-sm">
                            + {adv}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-primary crt-glow font-bold mb-2">{'>'} DESVENTAJAS</h3>
                      <ul className="space-y-1">
                        {lang.disadvantages.map((dis, i) => (
                          <li key={i} className="text-red-400 text-sm">
                            - {dis}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-primary crt-glow font-bold mb-2">{'>'} ÁREAS DE USO</h3>
                      <div className="flex flex-wrap gap-2">
                        {lang.areas.map((area, i) => (
                          <span 
                            key={i} 
                            className="text-xs px-2 py-1 bg-secondary rounded-sm text-muted-foreground"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-4 border-t border-border">
                  <RetroButton 
                    onClick={handleStartLearning}
                    size="lg"
                    className="flex-1"
                  >
                    INICIAR APRENDIZAJE DE {lang.name.toUpperCase()}
                  </RetroButton>
                </div>
              </RetroWindow>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <RetroButton 
            variant="secondary"
            onClick={() => setCurrentScreen('quiz')}
          >
            REPETIR ANÁLISIS
          </RetroButton>
          {!showDetail && recommendedLangs.length > 0 && (
            <RetroButton 
              onClick={() => handleSelectLanguage(recommendedLangs[0].id)}
              size="lg"
            >
              VER MEJOR MATCH: {recommendedLangs[0].name.toUpperCase()}
            </RetroButton>
          )}
        </div>
      </div>
    </div>
  )
}

interface LanguageCardProps {
  language: Language
  rank: number
  isSelected: boolean
  onClick: () => void
}

function LanguageCard({ language, rank, isSelected, onClick }: LanguageCardProps) {
  const compatibilityScore = Math.max(60, 100 - (rank - 1) * 8)

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        w-full text-left retro-border rounded-sm p-4 
        transition-all hover:shadow-lg
        ${isSelected 
          ? 'border-primary bg-primary/10' 
          : 'border-muted bg-card hover:border-primary/50'
        }
      `}
    >
      {/* Rank badge */}
      <div className="flex justify-between items-start mb-3">
        <span className="text-4xl">{language.icon}</span>
        <span className={`
          text-xs px-2 py-1 rounded-sm font-bold
          ${rank === 1 ? 'bg-yellow-500/20 text-yellow-400' : ''}
          ${rank === 2 ? 'bg-gray-400/20 text-gray-400' : ''}
          ${rank === 3 ? 'bg-orange-600/20 text-orange-400' : ''}
          ${rank > 3 ? 'bg-secondary text-muted-foreground' : ''}
        `}>
          #{rank}
        </span>
      </div>

      <h3 className={`font-bold text-lg mb-1 ${isSelected ? 'text-primary crt-glow' : 'text-foreground'}`}>
        {language.name}
      </h3>

      <span className={`
        text-xs px-2 py-0.5 rounded-sm inline-block mb-3
        ${language.difficulty === 'Fácil' ? 'bg-green-500/20 text-green-400' : ''}
        ${language.difficulty === 'Intermedio' ? 'bg-yellow-500/20 text-yellow-400' : ''}
        ${language.difficulty === 'Difícil' ? 'bg-orange-500/20 text-orange-400' : ''}
        ${language.difficulty === 'Avanzado' ? 'bg-red-500/20 text-red-400' : ''}
      `}>
        {language.difficulty}
      </span>

      <div className="space-y-2">
        <div className="text-xs text-muted-foreground">
          Compatibilidad
        </div>
        <RetroProgress 
          value={compatibilityScore} 
          showPercentage={true}
        />
      </div>
    </motion.button>
  )
}
