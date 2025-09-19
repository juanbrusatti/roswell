"use client"

import { useState, useRef, useEffect } from "react"
import { useStore } from "@/lib/store"
import { AdminLoginModal } from "./admin-login-modal"

interface SecretAdminAccessProps {
  children: React.ReactNode
  className?: string
}

export function SecretAdminAccess({ children, className }: SecretAdminAccessProps) {
  const { isAdmin, isAuthenticated } = useStore()
  const [clickCount, setClickCount] = useState(0)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleClick = () => {
    // Si ya está autenticado como admin, no hacer nada (el logout se maneja en AdminToggle)
    if (isAdmin && isAuthenticated) {
      return
    }

    setClickCount(prev => prev + 1)
    
    // Limpiar timeout anterior
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    // Si llegamos a 5 clicks, abrir modal
    if (clickCount + 1 >= 5) {
      setIsLoginModalOpen(true)
      setClickCount(0)
      return
    }
    
    // Resetear contador después de 2 segundos sin clicks
    timeoutRef.current = setTimeout(() => {
      setClickCount(0)
    }, 2000)
  }

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <>
      <div 
        onClick={handleClick}
        className={className}
        style={{ cursor: 'pointer' }}
      >
        {children}
      </div>
      
      <AdminLoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => {
          setIsLoginModalOpen(false)
          setClickCount(0)
        }} 
      />
    </>
  )
}
