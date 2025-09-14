"use client"

interface BackgroundOverlayProps {
  imageUrl: string
  opacity?: number
  gradient?: "dark" | "light" | "accent" | "custom"
  customGradient?: string
  className?: string
}

export function BackgroundOverlay({ 
  imageUrl, 
  opacity = 0.4, 
  gradient = "dark",
  customGradient,
  className = "" 
}: BackgroundOverlayProps) {
  const gradientClasses = {
    dark: "bg-gradient-to-br from-black/60 via-black/40 to-black/20",
    light: "bg-gradient-to-br from-white/60 via-white/40 to-white/20",
    accent: "bg-gradient-to-br from-accent/60 via-accent/40 to-accent/20",
    custom: customGradient || ""
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${imageUrl})`,
          opacity: opacity
        }}
      />
      
      {/* Overlay gradiente */}
      <div className={`absolute inset-0 ${gradientClasses[gradient]}`} />
      
      {/* Patrón de textura sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.1)_100%)]" />
    </div>
  )
}
