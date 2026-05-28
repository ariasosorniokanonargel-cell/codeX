'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react'

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
  const [mounted, setMounted] = useState(false)

  // FIX SSR: mount check
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Load from localStorage safely
  useEffect(() => {
    const savedUser =
      typeof window !== 'undefined'
        ? localStorage.getItem('codex_user')
        : null

    const savedProgress =
      typeof window !== 'undefined'
        ? localStorage.getItem('codex_progress')
        : null

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      setUser(parsedUser)

      if (savedProgress) {
        setProgress(JSON.parse(savedProgress))
      }

      setCurrentScreen('intro')
    } else {
      const t = setTimeout(() => {
        setCurrentScreen('welcome')
      }, 3000)

      return () => clearTimeout(t)
    }
  }, [])

  // Persist user
  useEffect(() => {
    if (typeof window !== 'undefined' && user) {
      localStorage.setItem('codex_user', JSON.stringify(user))
    }
  }, [user])

  // Persist progress
  useEffect(() => {
    if (typeof window !== 'undefined' && user) {
      localStorage.setItem('codex_progress', JSON.stringify(progress))
    }
  }, [progress, user])

  // ---------------- CORE FUNCTIONS ----------------

  const login = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('codex_users') || '[]')

    const found = users.find(
      (u: User & { password: string }) =>
        u.email === email && u.password === password
    )

    if (!found) return false

    const { password: _, ...safeUser } = found
    setUser(safeUser)
    setCurrentScreen('intro')

    return true
  }

  const register = (username: string, email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('codex_users') || '[]')

    if (users.some((u: User) => u.email === email)) return false

    const newUser = {
      id: crypto.randomUUID(),
      username,
      email,
      password,
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    localStorage.setItem('codex_users', JSON.stringify(users))

    const { password: _, ...safeUser } = newUser
    setUser(safeUser)
    setProgress(defaultProgress)
    setCurrentScreen('intro')

    return true
  }

  const logout = () => {
    if (user) {
      localStorage.setItem(
        `codex_progress_${user.id}`,
        JSON.stringify(progress)
      )
    }

    localStorage.removeItem('codex_user')
    localStorage.removeItem('codex_progress')

    setUser(null)
    setProgress(defaultProgress)
    setCurrentScreen('welcome')
  }

  const saveQuizAnswers = (answers: QuizAnswers) => {
    setProgress(prev => ({
      ...prev,
      quizCompleted: true,
      quizAnswers: answers,
      recommendedLanguages: []
    }))

    setCurrentScreen('results')
  }

  const selectLanguage = (languageId: string) => {
    setProgress(prev => ({
      ...prev,
      selectedLanguage: languageId
    }))

    setCurrentScreen('dashboard')
  }

  const completeLesson = () => {}
  const completeQuiz = () => {}
  const updateStreak = () => {}

  return (
    <AppContext.Provider
      value={{
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
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
