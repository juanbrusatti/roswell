"use client"

interface GeometricShapeProps {
  className?: string
  variant?: "circle" | "square" | "triangle" | "diamond"
  size?: "sm" | "md" | "lg"
  color?: "primary" | "accent" | "muted"
}

export function GeometricShape({ 
  className = "", 
  variant = "circle", 
  size = "md", 
  color = "primary" 
}: GeometricShapeProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16", 
    lg: "w-24 h-24"
  }

  const colorClasses = {
    primary: "text-primary/20",
    accent: "text-accent/20",
    muted: "text-muted-foreground/10"
  }

  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-lg",
    triangle: "clip-path-triangle",
    diamond: "rotate-45 rounded-sm"
  }

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        ${shapeClasses[variant]} 
        ${colorClasses[color]} 
        ${className}
      `}
    />
  )
}

interface FloatingElementsProps {
  count?: number
  className?: string
}

export function FloatingElements({ count = 3, className = "" }: FloatingElementsProps) {
  const elements = Array.from({ length: count }, (_, i) => (
    <GeometricShape
      key={i}
      variant={["circle", "square", "diamond"][i % 3] as any}
      size={["sm", "md", "lg"][i % 3] as any}
      color={["primary", "accent", "muted"][i % 3] as any}
      className={`
        absolute 
        animate-float 
        ${i === 0 ? "top-1/4 left-1/4" : ""}
        ${i === 1 ? "top-3/4 right-1/4" : ""}
        ${i === 2 ? "top-1/2 left-3/4" : ""}
      `}
      style={{
        animationDelay: `${i * 0.5}s`,
        animationDuration: `${3 + i}s`
      }}
    />
  ))

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {elements}
    </div>
  )
}
