import './globals.css'
import { Inter } from 'next/font/google'

/**
 *  `cyrillic`, `cyrillic-ext`, `greek`, `greek-ext`, `latin`, `latin-ext`, `vietnamese`
 */
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chord Reaction Training',
  description: 'Training your reaction to chords'
}

export default function RootLayout ({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
