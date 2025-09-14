"use client"

import { BackgroundOverlay } from "./background-overlay"
import { FloatingElements } from "./geometric-elements"
import { HeroContent } from "./hero-content"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Overlay de fondo mejorado */}
      <BackgroundOverlay
        imageUrl="/urban-street-graffiti-wall.jpg"
        opacity={0.6}
        gradient="dark"
        className="z-0"
      />

      {/* Elementos flotantes decorativos */}
      <FloatingElements count={4} className="z-5" />

      {/* Contenido principal */}
      <HeroContent
        title="ROSWELL"
        subtitle="URBANO"
        description="Indumentaria urbana auténtica para la generación de la calle. Expresa tu estilo único con nuestra colección curada de buzos, remeras y accesorios que definen la cultura streetwear."
        primaryButtonText="Ver Colección"
        primaryButtonHref="#featured-products"
        secondaryButtonText="Nuestra Historia"
        secondaryButtonHref="/about"
      />

      {/* Efecto de partículas sutil */}
      <div className="absolute inset-0 z-1">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent/30 rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-accent/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
    </section>
  )
}
