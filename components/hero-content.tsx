"use client"

import { FadeIn, SlideUp, ScaleIn } from "./animations"
import { HeroButton } from "./hero-button"

interface HeroContentProps {
  title: string
  subtitle?: string
  description: string
  primaryButtonText: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
}

export function HeroContent({
  title,
  subtitle,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  onPrimaryClick,
  onSecondaryClick
}: HeroContentProps) {
  return (
    <div className="relative z-10 text-center space-y-8 max-w-5xl mx-auto px-4">
      {/* Título principal */}
      <FadeIn delay={0.2}>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight">
          {title}
          {subtitle && (
            <span className="block bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
              {subtitle}
            </span>
          )}
        </h1>
      </FadeIn>

      {/* Descripción */}
      <SlideUp delay={0.6}>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
          {description}
        </p>
      </SlideUp>

      {/* Botón de acción */}
      <ScaleIn delay={1.0}>
        <div className="flex justify-center">
          <HeroButton
            variant="primary"
            size="lg"
            href={primaryButtonHref}
            onClick={onPrimaryClick}
            icon="arrow"
            className="min-w-[200px] mx-auto"
          >
            {primaryButtonText}
          </HeroButton>
        </div>
      </ScaleIn>

      {/* Indicador de scroll */}
      <FadeIn delay={1.4}>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
