import type { Metadata } from 'next'
import { Cormorant_Garamond, Cinzel } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant"
})

const cinzel = Cinzel({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel"
})

export const metadata: Metadata = {
  title: 'Amanda Bezerra | Tarô Rider Waite Deck',
  description: 'Leituras de tarô intuitivas e acolhedoras com o tradicional Tarô Rider Waite Deck. Descubra respostas para suas perguntas com atendimento personalizado e agendamento online.',
  keywords: ['tarot', 'taróloga', 'leitura de tarot', 'rider waite', 'tarô rider waite deck', 'consulta espiritual', 'tarot online'],
}

export const viewport = {
  themeColor: '#2d1b4e',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${cinzel.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
