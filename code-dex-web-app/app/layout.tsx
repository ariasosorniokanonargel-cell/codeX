import type { Metadata, Viewport } from 'next'
import { VT323 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const vt323 = VT323({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323'
})

export const metadata: Metadata = {
  title: 'Code X - Sistema de Descubrimiento de Lenguajes',
  description: 'Descubre qué lenguaje de programación deberías aprender según tus habilidades, intereses y objetivos.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#0a1a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className={`${vt323.variable} font-mono antialiased min-h-screen matrix-bg crt-flicker`}>
        {children}
        <div className="crt-scanlines" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
