import { Inter, Cinzel, Cormorant_Garamond } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata = {
  title: 'Vishv Chetna Trust — The Enlightened World',
  description: 'Awaken your inner consciousness. Discover meditation, healing, yoga, and ancient wisdom to transform your life. A sanctuary for the awakening soul.',
  keywords: 'spirituality, meditation, yoga, kundalini, reiki, panch karma, moksha, past life regression, healing, ancient wisdom',
  openGraph: {
    title: 'Vishv Chetna Trust — The Enlightened World',
    description: 'Awaken your inner consciousness. Meditation, healing, yoga and ancient wisdom.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vishv Chetna Trust — The Enlightened World',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased">
        {children}
        <Toaster position="top-center" theme="dark" richColors />
      </body>
    </html>
  )
}
