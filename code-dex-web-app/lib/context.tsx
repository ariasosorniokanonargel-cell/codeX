'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  id: string
  username: string
  email: string
  createdAt: string
}

export interface QuizAnswers {
  experience: string
  mathLevel: string
  interests: string[]
  objectives: string[]
  timeAvailable: string
  difficulty: string
  learningStyle: string
}

export interface LanguageProgress {
  languageId: string
  xp: number
  level: number
  lessonsCompleted: number[]
  quizzesCompleted: number[]
  streak: number
  lastStudyDate: string
  totalStudyTime: number
}

export interface UserProgress {
  totalXp: number
  currentStreak: number
  longestStreak: number
  languagesStarted: string[]
  selectedLanguage: string | null
  languageProgress: Record<string, LanguageProgress>
  quizCompleted: boolean
  quizAnswers: QuizAnswers | null
  recommendedLanguages: string[]
}

interface AppContextType {
  user: User | null
  progress: UserProgress
  currentScreen: Screen
  setCurrentScreen: (screen: Screen) => void
  login: (email: string, password: string) => boolean
  register: (username: string, email: string, password: string) => boolean
  logout: () => void
  saveQuizAnswers: (answers: QuizAnswers) => void
  selectLanguage: (languageId: string) => void
  completeLesson: (languageId: string, lessonId: number, xpEarned: number) => void
  completeQuiz: (languageId: string, quizId: number, xpEarned: number) => void
  updateStreak: () => void
}

export type Screen = 
  | 'boot'
  | 'welcome'
  | 'login'
  | 'register'
  | 'intro'
  | 'quiz'
  | 'results'
  | 'dashboard'
  | 'learning'

const defaultProgress: UserProgress = {
  totalXp: 0,
  currentStreak: 0,
  longestStreak: 0,
  languagesStarted: [],
  selectedLanguage: null,
  languageProgress: {},
  quizCompleted: false,
  quizAnswers: null,
  recommendedLanguages: []
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [progress, setProgress] = useState<UserProgress>(defaultProgress)
  const [currentScreen, setCurrentScreen] = useState<Screen>('boot')

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('codex_user')
    const savedProgress = localStorage.getItem('codex_progress')
    
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      setUser(parsedUser)
      
      if (savedProgress) {
        const parsedProgress = JSON.parse(savedProgress)
        setProgress(parsedProgress)
        
        // Determine starting screen based on progress
        if (parsedProgress.selectedLanguage) {
          setCurrentScreen('dashboard')
        } else if (parsedProgress.quizCompleted) {
          setCurrentScreen('results')
        } else {
          setCurrentScreen('intro')
        }
      } else {
        setCurrentScreen('intro')
      }
    } else {
      // Show boot animation first
      setTimeout(() => setCurrentScreen('welcome'), 3000)
    }
  }, [])

  // Save to localStorage when user or progress changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('codex_user', JSON.stringify(user))
    }
  }, [user])

  useEffect(() => {
    if (user) {
      localStorage.setItem('codex_progress', JSON.stringify(progress))
    }
  }, [progress, user])

  const login = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('codex_users') || '[]')
    const foundUser = users.find((u: User & { password: string }) => 
      u.email === email && u.password === password
    )
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      
      // Load user's progress
      const savedProgress = localStorage.getItem(`codex_progress_${foundUser.id}`)
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress))
      }
      
      return true
    }
    return false
  }

  const register = (username: string, email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('codex_users') || '[]')
    
    if (users.some((u: User) => u.email === email)) {
      return false
    }
    
    const newUser: User & { password: string } = {
      id: crypto.randomUUID(),
      username,
      email,
      password,
      createdAt: new Date().toISOString()
    }
    
    users.push(newUser)
    localStorage.setItem('codex_users', JSON.stringify(users))
    
    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    setProgress(defaultProgress)
    
    return true
  }

  const logout = () => {
    if (user) {
      localStorage.setItem(`codex_progress_${user.id}`, JSON.stringify(progress))
    }
    localStorage.removeItem('codex_user')
    localStorage.removeItem('codex_progress')
    setUser(null)
    setProgress(defaultProgress)
    setCurrentScreen('welcome')
  }

  const saveQuizAnswers = (answers: QuizAnswers) => {
    const recommended = calculateRecommendedLanguages(answers)
    setProgress(prev => ({
      ...prev,
      quizCompleted: true,
      quizAnswers: answers,
      recommendedLanguages: recommended
    }))
    setCurrentScreen('results')
  }

  const selectLanguage = (languageId: string) => {
    setProgress(prev => ({
      ...prev,
      selectedLanguage: languageId,
      languagesStarted: prev.languagesStarted.includes(languageId) 
        ? prev.languagesStarted 
        : [...prev.languagesStarted, languageId],
      languageProgress: {
        ...prev.languageProgress,
        [languageId]: prev.languageProgress[languageId] || {
          languageId,
          xp: 0,
          level: 1,
          lessonsCompleted: [],
          quizzesCompleted: [],
          streak: 0,
          lastStudyDate: new Date().toISOString(),
          totalStudyTime: 0
        }
      }
    }))
    setCurrentScreen('dashboard')
  }

  const completeLesson = (languageId: string, lessonId: number, xpEarned: number) => {
    setProgress(prev => {
      const langProgress = prev.languageProgress[languageId] || {
        languageId,
        xp: 0,
        level: 1,
        lessonsCompleted: [],
        quizzesCompleted: [],
        streak: 0,
        lastStudyDate: new Date().toISOString(),
        totalStudyTime: 0
      }

      const newXp = langProgress.xp + xpEarned
      const newLevel = Math.floor(newXp / 100) + 1

      return {
        ...prev,
        totalXp: prev.totalXp + xpEarned,
        languageProgress: {
          ...prev.languageProgress,
          [languageId]: {
            ...langProgress,
            xp: newXp,
            level: newLevel,
            lessonsCompleted: langProgress.lessonsCompleted.includes(lessonId)
              ? langProgress.lessonsCompleted
              : [...langProgress.lessonsCompleted, lessonId],
            lastStudyDate: new Date().toISOString()
          }
        }
      }
    })
  }

  const completeQuiz = (languageId: string, quizId: number, xpEarned: number) => {
    setProgress(prev => {
      const langProgress = prev.languageProgress[languageId]
      if (!langProgress) return prev

      const newXp = langProgress.xp + xpEarned
      const newLevel = Math.floor(newXp / 100) + 1

      return {
        ...prev,
        totalXp: prev.totalXp + xpEarned,
        languageProgress: {
          ...prev.languageProgress,
          [languageId]: {
            ...langProgress,
            xp: newXp,
            level: newLevel,
            quizzesCompleted: langProgress.quizzesCompleted.includes(quizId)
              ? langProgress.quizzesCompleted
              : [...langProgress.quizzesCompleted, quizId],
            lastStudyDate: new Date().toISOString()
          }
        }
      }
    })
  }

  const updateStreak = () => {
    const today = new Date().toDateString()
    const lastDate = progress.languageProgress[progress.selectedLanguage || '']?.lastStudyDate
    
    if (!lastDate) return

    const lastStudy = new Date(lastDate).toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()

    if (lastStudy === yesterday) {
      setProgress(prev => ({
        ...prev,
        currentStreak: prev.currentStreak + 1,
        longestStreak: Math.max(prev.longestStreak, prev.currentStreak + 1)
      }))
    } else if (lastStudy !== today) {
      setProgress(prev => ({
        ...prev,
        currentStreak: 1
      }))
    }
  }

  return (
    <AppContext.Provider value={{
      user,
      progress,
      currentScreen,
      setCurrentScreen,
      login,
      register,
      logout,
      saveQuizAnswers,
      selectLanguage,
      completeLesson,
      completeQuiz,
      updateStreak
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

// Algorithm to calculate recommended languages based on quiz answers
function calculateRecommendedLanguages(answers: QuizAnswers): string[] {
  const scores: Record<string, number> = {}
  
  const languages = [
    'python', 'javascript', 'typescript', 'java', 'csharp', 'go', 
    'rust', 'kotlin', 'swift', 'php', 'dart', 'lua', 'sql', 
    'bash', 'cpp', 'react', 'nodejs'
  ]
  
  languages.forEach(lang => scores[lang] = 0)

  // Experience level scoring
  switch (answers.experience) {
    case 'none':
      scores.python += 5
      scores.javascript += 4
      scores.lua += 3
      break
    case 'beginner':
      scores.python += 4
      scores.javascript += 5
      scores.typescript += 2
      break
    case 'intermediate':
      scores.typescript += 4
      scores.java += 3
      scores.go += 3
      scores.kotlin += 3
      break
    case 'advanced':
      scores.rust += 5
      scores.go += 4
      scores.cpp += 4
      scores.typescript += 3
      break
  }

  // Math level scoring
  switch (answers.mathLevel) {
    case 'basic':
      scores.python += 3
      scores.javascript += 3
      scores.php += 2
      break
    case 'intermediate':
      scores.java += 2
      scores.csharp += 2
      scores.typescript += 2
      break
    case 'advanced':
      scores.rust += 3
      scores.cpp += 3
      scores.go += 2
      break
  }

  // Interests scoring
  answers.interests.forEach(interest => {
    switch (interest) {
      case 'web':
        scores.javascript += 4
        scores.typescript += 4
        scores.react += 5
        scores.nodejs += 4
        scores.php += 3
        break
      case 'mobile':
        scores.kotlin += 5
        scores.swift += 5
        scores.dart += 5
        scores.react += 3
        break
      case 'games':
        scores.csharp += 5
        scores.cpp += 4
        scores.lua += 4
        scores.python += 2
        break
      case 'ai':
        scores.python += 6
        scores.javascript += 2
        break
      case 'data':
        scores.python += 5
        scores.sql += 5
        scores.javascript += 2
        break
      case 'systems':
        scores.rust += 5
        scores.cpp += 5
        scores.go += 4
        break
      case 'automation':
        scores.python += 4
        scores.bash += 5
        scores.javascript += 3
        break
      case 'backend':
        scores.nodejs += 5
        scores.go += 4
        scores.java += 4
        scores.python += 3
        break
    }
  })

  // Objectives scoring
  answers.objectives.forEach(objective => {
    switch (objective) {
      case 'job':
        scores.javascript += 3
        scores.python += 3
        scores.java += 3
        scores.typescript += 3
        break
      case 'freelance':
        scores.javascript += 4
        scores.php += 3
        scores.react += 4
        break
      case 'startup':
        scores.javascript += 3
        scores.python += 3
        scores.react += 4
        scores.nodejs += 4
        break
      case 'hobby':
        scores.python += 3
        scores.lua += 3
        scores.javascript += 2
        break
    }
  })

  // Difficulty preference
  switch (answers.difficulty) {
    case 'easy':
      scores.python += 4
      scores.javascript += 3
      scores.lua += 3
      break
    case 'medium':
      scores.java += 2
      scores.typescript += 2
      scores.kotlin += 2
      break
    case 'hard':
      scores.rust += 3
      scores.cpp += 3
      scores.go += 2
      break
  }

  // Learning style
  switch (answers.learningStyle) {
    case 'visual':
      scores.javascript += 2
      scores.react += 3
      scores.python += 2
      break
    case 'practical':
      scores.python += 3
      scores.javascript += 3
      break
    case 'theoretical':
      scores.java += 2
      scores.cpp += 2
      scores.rust += 2
      break
  }

  // Sort by score and return top languages
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([lang]) => lang)
}
