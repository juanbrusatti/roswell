"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "./admin-header"
import { AdminSidebar } from "./admin-sidebar"
import { AdminProductList } from "./admin-product-list"
import { ProductForm } from "./product-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { Package, DollarSign, ShoppingCart, TrendingUp, Shield, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products")
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const { products, cart, isAuthenticated, isAdmin } = useStore()

  // Redirigir si no está autenticado
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      // En una aplicación real, aquí redirigirías a la página de login
      // Por ahora, simplemente no renderizamos el dashboard
    }
  }, [isAuthenticated, isAdmin])

  // Mostrar mensaje de acceso denegado si no está autenticado
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <Shield className="h-6 w-6 text-destructive" />
            </div>
            <CardTitle className="text-xl">Acceso Restringido</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Solo el personal autorizado puede acceder al panel de administración.
              </AlertDescription>
            </Alert>
            <p className="text-sm text-muted-foreground">
              Si eres parte del equipo, contacta al administrador para obtener acceso.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const totalRevenue = products.reduce((sum, product) => sum + product.price, 0)
  const totalOrders = cart.length
  const inStockProducts = products.filter((p) => p.inStock).length

  const handleEditProduct = (productId: string) => {
    setEditingProductId(productId)
    setActiveTab("add-product")
  }

  const handleProductSaved = () => {
    setEditingProductId(null)
    setActiveTab("products")
  }

  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return <AdminProductList onEditProduct={handleEditProduct} />

      case "add-product":
        return (
          <ProductForm
            productId={editingProductId}
            onSave={handleProductSaved}
            onCancel={() => {
              setEditingProductId(null)
              setActiveTab("products")
            }}
          />
        )

      case "orders":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Pedidos Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Aún no hay pedidos. Los pedidos aparecerán aquí cuando los clientes realicen compras.
              </p>
            </CardContent>
          </Card>
        )

      case "analytics":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{products.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">En Stock</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{inStockProducts}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Items en Carrito</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalOrders}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Valor del Catálogo</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalRevenue.toLocaleString('es-AR')}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>{activeTab}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Esta sección estará disponible próximamente.</p>
            </CardContent>
          </Card>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
