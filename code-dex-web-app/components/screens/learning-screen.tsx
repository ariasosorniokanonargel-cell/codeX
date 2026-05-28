'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RetroWindow, RetroButton, RetroProgress, Typewriter } from '../retro-ui'
import { useApp } from '@/lib/context'
import { languages, lessonsData, Lesson } from '@/lib/languages'

type LearningMode = 'lessons' | 'lesson-detail' | 'exercise'

export function LearningScreen() {
  const { progress, completeLesson, setCurrentScreen } = useApp()
  const [mode, setMode] = useState<LearningMode>('lessons')
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const currentLang = progress.selectedLanguage ? languages[progress.selectedLanguage] : null
  const lessons = progress.selectedLanguage ? lessonsData[progress.selectedLanguage] || [] : []
  const langProgress = progress.selectedLanguage 
    ? progress.languageProgress[progress.selectedLanguage] 
    : null

  const handleStartLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson)
    setMode('lesson-detail')
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const handleStartExercise = () => {
    setMode('exercise')
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const handleAnswer = (index: number) => {
    if (showResult) return
    setSelectedAnswer(index)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !selectedLesson) return
    
    const correct = selectedAnswer === selectedLesson.content.exercise?.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)

    if (correct && progress.selectedLanguage) {
      completeLesson(progress.selectedLanguage, selectedLesson.id, selectedLesson.xpReward)
    }
  }

  const handleContinue = () => {
    if (isCorrect) {
      // Find next incomplete lesson
      const nextLesson = lessons.find(
        l => !langProgress?.lessonsCompleted.includes(l.id) && l.id !== selectedLesson?.id
      )
      if (nextLesson) {
        handleStartLesson(nextLesson)
      } else {
        setMode('lessons')
      }
    } else {
      // Retry
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const isLessonComplete = (lessonId: number) => {
    return langProgress?.lessonsCompleted.includes(lessonId) || false
  }

  // Lessons list view
  if (mode === 'lessons') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-primary crt-glow flex items-center gap-3">
                <span className="text-4xl">{currentLang?.icon}</span>
                {currentLang?.name} - MÓDULOS
              </h1>
              <p className="text-muted-foreground text-sm">
                {'>'} Selecciona una lección para comenzar
              </p>
            </div>
            <RetroButton 
              variant="secondary"
              onClick={() => setCurrentScreen('dashboard')}
            >
              VOLVER AL DASHBOARD
            </RetroButton>
          </div>

          {/* Progress */}
          <RetroWindow title="MODULE_PROGRESS.dat">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <RetroProgress 
                  value={(langProgress?.lessonsCompleted.length || 0) / Math.max(lessons.length, 1) * 100}
                  label={`${langProgress?.lessonsCompleted.length || 0} de ${lessons.length} lecciones completadas`}
                />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary crt-glow">{langProgress?.xp || 0}</p>
                <p className="text-xs text-muted-foreground">XP Total</p>
              </div>
            </div>
          </RetroWindow>

          {/* Lessons grid */}
          <div className="grid gap-4">
            {lessons.map((lesson, index) => {
              const completed = isLessonComplete(lesson.id)
              const locked = index > 0 && !isLessonComplete(lessons[index - 1].id)

              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => !locked && handleStartLesson(lesson)}
                    disabled={locked}
                    className={`
                      w-full text-left retro-border rounded-sm p-4 transition-all
                      ${locked 
                        ? 'opacity-50 cursor-not-allowed border-muted' 
                        : completed
                          ? 'border-green-500/50 bg-green-500/10 hover:bg-green-500/20'
                          : 'border-muted hover:border-primary bg-card hover:bg-secondary/30'
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      {/* Lesson number */}
                      <div className={`
                        w-12 h-12 rounded-sm flex items-center justify-center text-lg font-bold
                        ${locked 
                          ? 'bg-muted text-muted-foreground' 
                          : completed
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-primary/20 text-primary'
                        }
                      `}>
                        {locked ? '🔒' : completed ? '✓' : index + 1}
                      </div>

                      {/* Lesson info */}
                      <div className="flex-1">
                        <h3 className={`font-bold ${completed ? 'text-green-400' : 'text-foreground'}`}>
                          {lesson.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{lesson.description}</p>
                      </div>

                      {/* Meta */}
                      <div className="text-right hidden sm:block">
                        <div className="flex items-center gap-2 text-sm">
                          <span className={`
                            px-2 py-0.5 rounded-sm text-xs
                            ${lesson.type === 'theory' ? 'bg-blue-500/20 text-blue-400' : ''}
                            ${lesson.type === 'practice' ? 'bg-green-500/20 text-green-400' : ''}
                            ${lesson.type === 'challenge' ? 'bg-orange-500/20 text-orange-400' : ''}
                          `}>
                            {lesson.type === 'theory' ? 'TEORÍA' : lesson.type === 'practice' ? 'PRÁCTICA' : 'RETO'}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {lesson.duration} • +{lesson.xpReward} XP
                        </p>
                      </div>
                    </div>
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Lesson detail view
  if (mode === 'lesson-detail' && selectedLesson) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <RetroWindow 
            title={`LESSON_${selectedLesson.id}.exe`}
            onClose={() => setMode('lessons')}
          >
            <div className="space-y-6">
              {/* Lesson header */}
              <div className="text-center space-y-2">
                <span className={`
                  px-3 py-1 rounded-sm text-sm inline-block
                  ${selectedLesson.type === 'theory' ? 'bg-blue-500/20 text-blue-400' : ''}
                  ${selectedLesson.type === 'practice' ? 'bg-green-500/20 text-green-400' : ''}
                  ${selectedLesson.type === 'challenge' ? 'bg-orange-500/20 text-orange-400' : ''}
                `}>
                  {selectedLesson.type === 'theory' ? 'MÓDULO TEÓRICO' : selectedLesson.type === 'practice' ? 'PRÁCTICA' : 'RETO'}
                </span>
                <h2 className="text-2xl font-bold text-primary crt-glow">
                  {selectedLesson.title}
                </h2>
                <p className="text-muted-foreground">{selectedLesson.description}</p>
              </div>

              {/* Explanation */}
              <div className="retro-border rounded-sm p-4 bg-secondary/30">
                <h3 className="text-primary crt-glow font-bold mb-3">{'>'} EXPLICACIÓN</h3>
                <div className="text-foreground leading-relaxed">
                  <Typewriter text={selectedLesson.content.explanation} speed={10} showCursor={false} />
                </div>
              </div>

              {/* Code example */}
              {selectedLesson.content.codeExample && (
                <div className="retro-border rounded-sm p-4 bg-black/50">
                  <h3 className="text-primary crt-glow font-bold mb-3">{'>'} CÓDIGO DE EJEMPLO</h3>
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    <code>{selectedLesson.content.codeExample}</code>
                  </pre>
                </div>
              )}

              {/* Meta info */}
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Duración: {selectedLesson.duration}</span>
                <span>Recompensa: +{selectedLesson.xpReward} XP</span>
              </div>

              {/* Action button */}
              <div className="flex gap-4">
                <RetroButton 
                  variant="secondary"
                  onClick={() => setMode('lessons')}
                >
                  VOLVER
                </RetroButton>
                <RetroButton 
                  onClick={handleStartExercise}
                  size="lg"
                  className="flex-1"
                >
                  COMENZAR EJERCICIO
                </RetroButton>
              </div>
            </div>
          </RetroWindow>
        </div>
      </div>
    )
  }

  // Exercise view
  if (mode === 'exercise' && selectedLesson?.content.exercise) {
    const exercise = selectedLesson.content.exercise

    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <RetroWindow title="EXERCISE_MODULE.exe">
            <div className="space-y-6">
              {/* Question */}
              <div className="text-center space-y-4">
                <div className="text-5xl mb-4">🧠</div>
                <h2 className="text-xl font-bold text-primary crt-glow">
                  {exercise.question}
                </h2>
              </div>

              {/* Options */}
              <div className="grid gap-3">
                {exercise.options.map((option, index) => {
                  const isSelectedOption = selectedAnswer === index
                  const isCorrectOption = index === exercise.correctAnswer
                  
                  let optionClass = 'border-muted bg-card hover:border-primary/50'
                  
                  if (showResult) {
                    if (isCorrectOption) {
                      optionClass = 'border-green-500 bg-green-500/20'
                    } else if (isSelectedOption && !isCorrectOption) {
                      optionClass = 'border-red-500 bg-red-500/20'
                    }
                  } else if (isSelectedOption) {
                    optionClass = 'border-primary bg-primary/20'
                  }

                  return (
                    <motion.button
                      key={index}
                      whileHover={{ scale: showResult ? 1 : 1.01 }}
                      whileTap={{ scale: showResult ? 1 : 0.99 }}
                      onClick={() => handleAnswer(index)}
                      disabled={showResult}
                      className={`
                        w-full text-left retro-border rounded-sm p-4 transition-all
                        ${optionClass}
                        ${showResult ? 'cursor-default' : ''}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`
                          w-8 h-8 rounded-sm flex items-center justify-center font-bold text-sm
                          ${showResult && isCorrectOption 
                            ? 'bg-green-500 text-white' 
                            : showResult && isSelectedOption && !isCorrectOption
                              ? 'bg-red-500 text-white'
                              : isSelectedOption
                                ? 'bg-primary text-background'
                                : 'bg-secondary text-muted-foreground'
                          }
                        `}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className={showResult && isCorrectOption ? 'text-green-400' : 'text-foreground'}>
                          {option}
                        </span>
                        {showResult && isCorrectOption && (
                          <span className="ml-auto text-green-400">✓</span>
                        )}
                        {showResult && isSelectedOption && !isCorrectOption && (
                          <span className="ml-auto text-red-400">✗</span>
                        )}
                      </div>
                    </motion.button>
                  )
                })}
              </div>

              {/* Result feedback */}
              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`
                      retro-border rounded-sm p-4
                      ${isCorrect ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{isCorrect ? '🎉' : '😔'}</span>
                      <div>
                        <h3 className={`font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                          {isCorrect ? '¡CORRECTO!' : 'INCORRECTO'}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1">
                          {exercise.explanation}
                        </p>
                        {isCorrect && (
                          <p className="text-primary crt-glow mt-2">
                            +{selectedLesson.xpReward} XP ganados!
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex gap-4">
                {!showResult ? (
                  <>
                    <RetroButton 
                      variant="secondary"
                      onClick={() => setMode('lesson-detail')}
                    >
                      REVISAR LECCIÓN
                    </RetroButton>
                    <RetroButton 
                      onClick={handleSubmitAnswer}
                      disabled={selectedAnswer === null}
                      size="lg"
                      className="flex-1"
                    >
                      VERIFICAR RESPUESTA
                    </RetroButton>
                  </>
                ) : (
                  <RetroButton 
                    onClick={handleContinue}
                    size="lg"
                    className="w-full"
                  >
                    {isCorrect ? 'SIGUIENTE LECCIÓN' : 'INTENTAR DE NUEVO'}
                  </RetroButton>
                )}
              </div>
            </div>
          </RetroWindow>
        </div>
      </div>
    )
  }

  return null
}
