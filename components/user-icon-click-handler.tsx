"use client"

import { useState, useRef, useEffect } from "react"
import { useStore } from "@/lib/store"
import { AdminToggle } from "./admin-toggle"
import { AdminLoginModal } from "./admin-login-modal"

interface UserIconClickHandlerProps {
  children: React.ReactNode
}

export function UserIconClickHandler({ children }: UserIconClickHandlerProps) {
  const { isAdmin, isAuthenticated } = useStore()
  const [showLogout, setShowLogout] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleClick = () => {
    console.log('🔍 UserIconClickHandler clicked')
    console.log('🔍 isAdmin:', isAdmin, 'isAuthenticated:', isAuthenticated)
    console.log('🔍 Current showLogout:', showLogout)
    
    if (isAdmin && isAuthenticated) {
      // Si ya está autenticado, mostrar/ocultar logout
      console.log('✅ Admin authenticated, toggling logout button')
      setShowLogout(!showLogout)
    } else {
      // Si no está autenticado, usar el sistema de clicks secretos
      console.log('🔐 Not authenticated, using secret click system. Click count:', clickCount + 1)
      setClickCount(prev => prev + 1)
      
      // Limpiar timeout anterior
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      // Si llegamos a 5 clicks, abrir modal
      if (clickCount + 1 >= 5) {
        console.log('🎯 5 clicks reached, opening login modal')
        setIsLoginModalOpen(true)
        setClickCount(0)
        return
      }
      
      // Resetear contador después de 2 segundos sin clicks
      timeoutRef.current = setTimeout(() => {
        setClickCount(0)
      }, 2000)
    }
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
      <div onClick={handleClick} style={{ cursor: 'pointer' }}>
        {children}
      </div>
      <AdminToggle showLogout={showLogout} onLogout={() => setShowLogout(false)} />
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
