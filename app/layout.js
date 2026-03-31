import './globals.css'
import { Inter } from 'next/font/google'

const metadata = {
  title: 'Space Camp Academy | Explora los Planetas',
  description: 'Un viaje educativo por el Sistema Solar para cadetes espaciales. Aprende sobre los 9 planetas y gana medallas intergalácticas.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {/* Starfield background container injected directly in root to persist across navigations */}
        <div id="starfield" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, pointerEvents: 'none' }}></div>
        {children}
      </body>
    </html>
  )
}
