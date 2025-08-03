import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rad 80s Tic Tac Toe',
  description: 'Totally tubular Tic Tac Toe game!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="retro80s">
      <body className="font-retro">{children}</body>
    </html>
  )
}