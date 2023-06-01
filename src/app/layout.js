import './globals.css'

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
