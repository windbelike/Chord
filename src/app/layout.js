import './globals.css'
import { Inter } from 'next/font/google'

/**
 *  `cyrillic`, `cyrillic-ext`, `greek`, `greek-ext`, `latin`, `latin-ext`, `vietnamese`
 */
const inter = Inter({ subsets: ['greek'] })

export const metadata = {
  title: 'Chord Reaction Training',
  description: 'Training your reaction to chords'
}

export default function RootLayout ({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
