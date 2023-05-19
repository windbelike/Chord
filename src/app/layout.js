import './globals.css'
import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chord Reaction Training',
  description: 'Training your reaction to chords'
}

export default function RootLayout ({ children }) {
  return (
    <html lang="en">
      <body className='font-mono'>{children}</body>
    </html>
  )
}
