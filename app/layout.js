import './globals.css'
import { Inter } from 'next/font/google'

const metadata = {
  title: 'Agencia Mexicana de Divulgación Espacial | Explora los Planetas',
  description: 'Un viaje educativo por el Sistema Solar para cadetes espaciales. Aprende sobre los 9 planetas y gana medallas intergalácticas.',
}

import dynamic from 'next/dynamic'
const AstroD = dynamic(() => import('@/components/AstroD'), { ssr: false })

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {/* Starfield background container injected directly in root to persist across navigations */}
        <div id="starfield" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, pointerEvents: 'none' }}></div>
        {children}
        <AstroD />
      </body>
    </html>
  )
}
