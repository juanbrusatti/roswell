"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Shield, LogOut } from "lucide-react"
import { AdminLoginModal } from "./admin-login-modal"

interface AdminToggleProps {
  showLogout?: boolean
  onLogout?: () => void
}

export function AdminToggle({ showLogout = false, onLogout }: AdminToggleProps) {
  const { isAdmin, isAuthenticated, logout } = useStore()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const handleLogout = () => {
    logout()
    if (onLogout) {
      onLogout()
    }
  }

  return (
    <>
      {/* Botón Personal oculto por seguridad */}
      <div className="hidden">
        <Button
          onClick={() => setIsLoginModalOpen(true)}
          variant="secondary"
          size="sm"
          className="fixed top-20 right-4 z-50 opacity-50 hover:opacity-100 transition-opacity shadow-lg"
        >
          <Shield className="w-4 h-4 mr-2" />
          Personal
        </Button>
      </div>

      {/* Botón Cerrar Sesión que aparece al hacer click en el icono de personita */}
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
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  )
}
