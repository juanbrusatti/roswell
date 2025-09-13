"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Shield, ShieldOff, LogOut } from "lucide-react"
import { AdminLoginModal } from "./admin-login-modal"

export function AdminToggle() {
  const { isAdmin, isAuthenticated, logout } = useStore()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const handleLogout = () => {
    logout()
  }

  if (isAdmin && isAuthenticated) {
    return (
      <>
        <Button
          onClick={handleLogout}
          variant="destructive"
          size="sm"
          className="fixed top-4 right-4 z-50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar Sesión
        </Button>
      </>
    )
  }

  return (
    <>
      <Button
        onClick={() => setIsLoginModalOpen(true)}
        variant="secondary"
        size="sm"
        className="fixed top-4 right-4 z-50 opacity-50 hover:opacity-100 transition-opacity"
      >
        <Shield className="w-4 h-4 mr-2" />
        Personal
      </Button>
      
      <AdminLoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  )
}
