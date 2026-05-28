'use client'

import { AppProvider, useApp } from '@/lib/context'
import { BootScreen } from '@/components/screens/boot-screen'
import { WelcomeScreen } from '@/components/screens/welcome-screen'
import { LoginScreen } from '@/components/screens/login-screen'
import { RegisterScreen } from '@/components/screens/register-screen'
import { IntroScreen } from '@/components/screens/intro-screen'
import { QuizScreen } from '@/components/screens/quiz-screen'
import { ResultsScreen } from '@/components/screens/results-screen'
import { DashboardScreen } from '@/components/screens/dashboard-screen'
import { LearningScreen } from '@/components/screens/learning-screen'
import { AnimatePresence, motion } from 'framer-motion'

function AppContent() {
  const { currentScreen, setCurrentScreen } = useApp()

  const renderScreen = () => {
    switch (currentScreen) {
      case 'boot':
        return <BootScreen onComplete={() => setCurrentScreen('welcome')} />
      case 'welcome':
        return <WelcomeScreen />
      case 'login':
        return <LoginScreen />
      case 'register':
        return <RegisterScreen />
      case 'intro':
        return <IntroScreen />
      case 'quiz':
        return <QuizScreen />
      case 'results':
        return <ResultsScreen />
      case 'dashboard':
        return <DashboardScreen />
      case 'learning':
        return <LearningScreen />
      default:
        return <WelcomeScreen />
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentScreen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderScreen()}
      </motion.div>
    </AnimatePresence>
  )
}

export default function Home() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
