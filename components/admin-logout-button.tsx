"use client"

import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function AdminLogoutButton() {
  const { isAdmin, isAuthenticated, logout } = useStore()

  // Solo mostrar el botón si está autenticado como admin
  if (!isAdmin || !isAuthenticated) {
    return null
  }

  return (
    <Button
      onClick={logout}
      variant="ghost"
      size="sm"
      className="h-9 px-3 text-muted-foreground hover:text-foreground"
      title="Cerrar Sesión"
    >
      <LogOut className="h-4 w-4" />
      <span className="sr-only">Cerrar Sesión</span>
    </Button>
  )
}
