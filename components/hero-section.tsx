"use client"

import { useEffect, useRef, useState } from "react"
import { BackgroundOverlay } from "./background-overlay"
import { FloatingElements } from "./geometric-elements"
import { HeroContent } from "./hero-content"

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calcular el progreso del scroll (0 a 1)
  const scrollProgress = Math.min(scrollY / (heroRef.current?.offsetHeight || 1000), 1)
  
  // Calcular la opacidad del texto (se desvanece con el scroll)
  const textOpacity = Math.max(1 - scrollProgress * 2, 0)
  
  // Calcular el desplazamiento del fondo (parallax)
  const backgroundOffset = scrollY * 0.5

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden parallax-container"
      style={{ height: '100vh' }}
    >
      {/* Overlay de fondo con parallax */}
      <div 
        className="absolute inset-0 z-0 parallax-background"
        style={{ 
          transform: `translateY(${backgroundOffset}px)`,
          willChange: 'transform'
        }}
      >
        <BackgroundOverlay
          imageUrl="/roswellFrente.png"
          opacity={0.6}
          gradient="dark"
          className="z-0"
        />
      </div>

      {/* Elementos flotantes decorativos */}
      <FloatingElements count={4} className="z-5" />

      {/* Contenido principal con fade out */}
      <div 
        className="relative z-10 w-full parallax-content"
        style={{ 
          opacity: textOpacity,
          transform: `translateY(${scrollY * 0.3}px)`,
          willChange: 'opacity, transform'
        }}
      >
        <HeroContent
          title="ROSWELL"
          subtitle="URBANO"
          description="Indumentaria urbana auténtica para la generación de la calle. Expresa tu estilo único con nuestra colección curada de buzos, remeras y accesorios que definen la cultura streetwear."
          primaryButtonText="Ver Colección"
          primaryButtonHref="#featured-products"
          secondaryButtonText="Nuestra Historia"
          secondaryButtonHref="/about"
        />
      </div>

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
