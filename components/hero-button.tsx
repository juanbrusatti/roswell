"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

interface HeroButtonProps {
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  href?: string
  onClick?: () => void
  children: React.ReactNode
  icon?: "arrow" | "play" | "none"
  className?: string
}

export function HeroButton({ 
  variant = "primary", 
  size = "lg", 
  href, 
  onClick, 
  children, 
  icon = "arrow",
  className = "" 
}: HeroButtonProps) {
  const buttonVariants = {
    primary: "bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white",
    outline: "border-2 border-white hover:bg-white hover:text-black text-white"
  }

  const buttonSizes = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-3 text-base", 
    lg: "px-10 py-4 text-lg"
  }

  const iconComponents = {
    arrow: <ArrowRight className="w-4 h-4 ml-2" />,
    play: <Play className="w-4 h-4 ml-2" />,
    none: null
  }

  const buttonContent = (
    <>
      {children}
      {iconComponents[icon]}
    </>
  )

  const buttonClasses = `
    ${buttonVariants[variant]} 
    ${buttonSizes[size]} 
    transition-all duration-300 
    transform hover:scale-105 
    active:scale-95
    ${className}
  `

  if (href) {
    return (
      <Link href={href}>
        <Button className={buttonClasses}>
          {buttonContent}
        </Button>
      </Link>
    )
  }

  return (
    <Button onClick={onClick} className={buttonClasses}>
      {buttonContent}
    </Button>
  )
}
