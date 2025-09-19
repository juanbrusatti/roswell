"use client"

import { useState, useRef, useEffect } from "react"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { AdminLoginModal } from "./admin-login-modal"

interface UserIconWithLogoutProps {
  children: React.ReactNode
}

export function UserIconWithLogout({ children }: UserIconWithLogoutProps) {
  const { isAdmin, isAuthenticated, logout } = useStore()
  const [showLogout, setShowLogout] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleClick = () => {
    if (isAdmin && isAuthenticated) {
      setShowLogout(!showLogout)
    } else {
      setClickCount(prev => prev + 1)
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      if (clickCount + 1 >= 5) {
        setIsLoginModalOpen(true)
        setClickCount(0)
        return
      }
      
      timeoutRef.current = setTimeout(() => {
        setClickCount(0)
      }, 2000)
    }
  }

  const handleLogout = () => {
    logout()
    setShowLogout(false)
  }

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
      
      {/* Botón de logout que aparece cuando está autenticado */}
      {isAdmin && isAuthenticated && showLogout && (
        <Button
          onClick={handleLogout}
          variant="destructive"
          size="sm"
          className="fixed top-20 right-4 z-50 shadow-lg animate-fade-in"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar Sesión
        </Button>
      )}
      
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
