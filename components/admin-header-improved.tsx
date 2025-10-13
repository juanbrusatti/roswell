"use client"

import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Package, BarChart3, Settings, Bell, User } from "lucide-react"
import { AdminLogoutButton } from "./admin-logout-button"

export function AdminHeader() {
  const { products } = useStore()


  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo y título */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-accent/10">
                <Package className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Panel Admin</h1>
                <p className="text-xs text-muted-foreground">Roswell Indumentaria</p>
              </div>
            </div>
            
          </div>

          {/* Acciones rápidas */}
          <div className="flex items-center space-x-2">
            {/* Logout */}
            <AdminLogoutButton />
          </div>
        </div>

      </div>
    </header>
  )
}
