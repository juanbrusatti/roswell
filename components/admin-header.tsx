"use client"

import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, BarChart3, Settings, LogOut } from "lucide-react"
import { AdminLogoutButton } from "./admin-logout-button"

export function AdminHeader() {
  const { products } = useStore()

  return (
    <header className="border-b bg-card">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-accent" />
            <h1 className="text-xl font-bold">Panel de Administración</h1>
          </div>
          <Badge variant="secondary">{products.length} Productos</Badge>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Análisis
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configuración
          </Button>
          <AdminLogoutButton />
        </div>
      </div>
    </header>
  )
}
