'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RetroWindow, RetroButton, RetroProgress } from '../retro-ui'
import { useApp, QuizAnswers } from '@/lib/context'

interface Question {
  id: string
  title: string
  description: string
  type: 'single' | 'multiple'
  options: { value: string; label: string; description?: string }[]
}

const questions: Question[] = [
  {
    id: 'experience',
    title: 'NIVEL DE EXPERIENCIA',
    description: '¿Cuánta experiencia tienes programando?',
    type: 'single',
    options: [
      { value: 'none', label: 'NINGUNA', description: 'Nunca he programado' },
      { value: 'beginner', label: 'PRINCIPIANTE', description: 'He hecho algunos tutoriales' },
      { value: 'intermediate', label: 'INTERMEDIO', description: 'Tengo proyectos propios' },
      { value: 'advanced', label: 'AVANZADO', description: 'Trabajo como programador' }
    ]
  },
  {
    id: 'mathLevel',
    title: 'NIVEL DE MATEMÁTICAS',
    description: '¿Cómo describirías tu nivel de matemáticas?',
    type: 'single',
    options: [
      { value: 'basic', label: 'BÁSICO', description: 'Aritmética y álgebra simple' },
      { value: 'intermediate', label: 'INTERMEDIO', description: 'Álgebra, geometría, trigonometría' },
      { value: 'advanced', label: 'AVANZADO', description: 'Cálculo, estadística, álgebra lineal' }
    ]
  },
  {
    id: 'interests',
    title: 'ÁREAS DE INTERÉS',
    description: 'Selecciona las áreas que más te interesan (puedes elegir varias)',
    type: 'multiple',
    options: [
      { value: 'web', label: 'DESARROLLO WEB', description: 'Páginas y aplicaciones web' },
      { value: 'mobile', label: 'APPS MÓVILES', description: 'iOS y Android' },
      { value: 'games', label: 'VIDEOJUEGOS', description: 'Desarrollo de juegos' },
      { value: 'ai', label: 'INTELIGENCIA ARTIFICIAL', description: 'Machine Learning, Deep Learning' },
      { value: 'data', label: 'CIENCIA DE DATOS', description: 'Análisis y visualización' },
      { value: 'systems', label: 'SISTEMAS', description: 'SO, drivers, bajo nivel' },
      { value: 'automation', label: 'AUTOMATIZACIÓN', description: 'Scripts y herramientas' },
      { value: 'backend', label: 'BACKEND/SERVIDORES', description: 'APIs y microservicios' }
    ]
  },
  {
    id: 'objectives',
    title: 'OBJETIVOS PROFESIONALES',
    description: '¿Qué quieres lograr con la programación? (puedes elegir varios)',
    type: 'multiple',
    options: [
      { value: 'job', label: 'CONSEGUIR EMPLEO', description: 'Trabajar en una empresa' },
      { value: 'freelance', label: 'FREELANCE', description: 'Trabajar de forma independiente' },
      { value: 'startup', label: 'CREAR MI STARTUP', description: 'Emprender mi propio negocio' },
      { value: 'hobby', label: 'HOBBY PERSONAL', description: 'Proyectos personales por diversión' }
    ]
  },
  {
    id: 'timeAvailable',
    title: 'TIEMPO DISPONIBLE',
    description: '¿Cuánto tiempo puedes dedicar al aprendizaje por semana?',
    type: 'single',
    options: [
      { value: 'minimal', label: '1-5 HORAS', description: 'Poco tiempo libre' },
      { value: 'moderate', label: '5-10 HORAS', description: 'Tiempo moderado' },
      { value: 'dedicated', label: '10-20 HORAS', description: 'Bastante dedicación' },
      { value: 'fulltime', label: '+20 HORAS', description: 'Dedicación casi completa' }
    ]
  },
  {
    id: 'difficulty',
    title: 'PREFERENCIA DE DIFICULTAD',
    description: '¿Prefieres empezar con algo fácil o no te importa el reto?',
    type: 'single',
    options: [
      { value: 'easy', label: 'FÁCIL', description: 'Empezar suave y subir gradualmente' },
      { value: 'medium', label: 'MODERADO', description: 'Un balance entre facilidad y reto' },
      { value: 'hard', label: 'DIFÍCIL', description: 'Me gustan los retos desde el inicio' }
    ]
  },
  {
    id: 'learningStyle',
    title: 'ESTILO DE APRENDIZAJE',
    description: '¿Cómo prefieres aprender?',
    type: 'single',
    options: [
      { value: 'visual', label: 'VISUAL', description: 'Videos, diagramas, interfaces' },
      { value: 'practical', label: 'PRÁCTICO', description: 'Haciendo proyectos reales' },
      { value: 'theoretical', label: 'TEÓRICO', description: 'Leyendo documentación y libros' }
    ]
  }
]

export function QuizScreen() {
  const { saveQuizAnswers, setCurrentScreen } = useApp()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100
  const currentAnswer = answers[question.id]

  const handleSelect = (value: string) => {
    if (question.type === 'single') {
      setAnswers(prev => ({ ...prev, [question.id]: value }))
    } else {
      const current = (answers[question.id] as string[]) || []
      if (current.includes(value)) {
        setAnswers(prev => ({ 
          ...prev, 
          [question.id]: current.filter(v => v !== value) 
        }))
      } else {
        setAnswers(prev => ({ 
          ...prev, 
          [question.id]: [...current, value] 
        }))
      }
    }
  }

  const isSelected = (value: string) => {
    if (question.type === 'single') {
      return currentAnswer === value
    }
    return ((currentAnswer as string[]) || []).includes(value)
  }

  const canProceed = () => {
    if (question.type === 'single') {
      return !!currentAnswer
    }
    return ((currentAnswer as string[]) || []).length > 0
  }

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      // Finish quiz
      setIsAnalyzing(true)
      await new Promise(resolve => setTimeout(resolve, 2500))
      
      const quizAnswers: QuizAnswers = {
        experience: answers.experience as string,
        mathLevel: answers.mathLevel as string,
        interests: answers.interests as string[],
        objectives: answers.objectives as string[],
        timeAvailable: answers.timeAvailable as string,
        difficulty: answers.difficulty as string,
        learningStyle: answers.learningStyle as string
      }
      
      saveQuizAnswers(quizAnswers)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <RetroWindow title="ANALYZING_DATA.exe" className="max-w-lg w-full">
          <div className="space-y-6 text-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="text-6xl mx-auto w-fit"
            >
              ⚙️
            </motion.div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-primary crt-glow">
                ANALIZANDO RESPUESTAS
              </h2>
              <p className="text-muted-foreground">
                Procesando datos del usuario...
              </p>
            </div>

            <div className="space-y-4 text-left retro-border rounded-sm p-4 bg-secondary/30">
              <AnalyzingLine text="Verificando nivel de experiencia" delay={0} />
              <AnalyzingLine text="Calculando compatibilidad matemática" delay={0.5} />
              <AnalyzingLine text="Mapeando intereses tecnológicos" delay={1} />
              <AnalyzingLine text="Evaluando objetivos profesionales" delay={1.5} />
              <AnalyzingLine text="Generando recomendaciones" delay={2} />
            </div>
          </div>
        </RetroWindow>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <RetroWindow 
        title="CODE_X_QUIZ.exe" 
        className="max-w-2xl w-full"
        onClose={() => setCurrentScreen('intro')}
      >
        <div className="space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Pregunta {currentQuestion + 1} de {questions.length}</span>
              <span className="text-primary crt-glow">{Math.round(progress)}% completado</span>
            </div>
            <RetroProgress value={progress} showPercentage={false} />
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-primary crt-glow">
                  {question.title}
                </h2>
                <p className="text-muted-foreground">
                  {'>'} {question.description}
                </p>
              </div>

              {/* Options */}
              <div className="grid gap-3">
                {question.options.map((option, index) => (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleSelect(option.value)}
                    className={`
                      retro-border rounded-sm p-4 text-left transition-all
                      ${isSelected(option.value) 
                        ? 'border-primary bg-primary/20' 
                        : 'border-muted hover:border-primary/50 bg-secondary/30'
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`
                        w-5 h-5 rounded-sm border-2 flex items-center justify-center mt-0.5
                        ${isSelected(option.value) 
                          ? 'border-primary bg-primary' 
                          : 'border-muted-foreground'
                        }
                      `}>
                        {isSelected(option.value) && (
                          <span className="text-background text-xs">✓</span>
                        )}
                      </div>
                      <div>
                        <div className={`font-bold ${isSelected(option.value) ? 'text-primary crt-glow' : 'text-foreground'}`}>
                          {option.label}
                        </div>
                        {option.description && (
                          <div className="text-sm text-muted-foreground mt-1">
                            {option.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between gap-4">
            <RetroButton
              onClick={handlePrevious}
              variant="secondary"
              disabled={currentQuestion === 0}
            >
              ANTERIOR
            </RetroButton>

            <RetroButton
              onClick={handleNext}
              disabled={!canProceed()}
              size="lg"
            >
              {currentQuestion < questions.length - 1 ? 'SIGUIENTE' : 'FINALIZAR ANÁLISIS'}
            </RetroButton>
          </div>
        </div>
      </RetroWindow>
    </div>
  )
}

function AnalyzingLine({ text, delay }: { text: string; delay: number }) {
  const [show, setShow] = useState(false)
  const [complete, setComplete] = useState(false)

  useState(() => {
    const timer1 = setTimeout(() => setShow(true), delay * 1000)
    const timer2 = setTimeout(() => setComplete(true), (delay + 0.5) * 1000)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  })

  if (!show) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2 text-sm"
    >
      <span className="text-primary">{'>'}</span>
      <span className={complete ? 'text-primary crt-glow' : 'text-muted-foreground'}>
        {text}
      </span>
      {complete ? (
        <span className="text-primary crt-glow ml-auto">OK</span>
      ) : (
        <span className="text-muted-foreground ml-auto loading-dots">...</span>
      )}
    </motion.div>
  )
}
