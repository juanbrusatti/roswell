"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "./admin-layout"
import { AdminHeader } from "./admin-header-improved"
import { AdminSidebar } from "./admin-sidebar-improved"
import { AdminProductList } from "./admin-product-list-improved"
import { ProductForm } from "./product-form-improved"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useProducts } from "@/hooks/use-products"
import { useStore } from "@/lib/store"
import { Shield, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const { products, loading } = useProducts()
  const { isAuthenticated, isAdmin } = useStore()

  // Redirigir si no está autenticado
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      // En una aplicación real, aquí redirigirías a la página de login
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
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Contenido del dashboard */}
          </div>
        )

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
              <div className="text-center py-12">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Aún no hay pedidos. Los pedidos aparecerán aquí cuando los clientes realicen compras.
                </p>
              </div>
            </CardContent>
          </Card>
        )

      case "analytics":
        return (
          <div className="space-y-6">
            <StatGrid>
              <StatCard
                title="Total Productos"
                value={products.length}
                icon={Package}
              />
              <StatCard
                title="En Stock"
                value={inStockProducts}
                icon={TrendingUp}
              />
              <StatCard
                title="Items en Carrito"
                value="0"
                icon={ShoppingCart}
              />
              <StatCard
                title="Valor del Catálogo"
                value={`$${totalRevenue.toLocaleString('es-AR')}`}
                icon={DollarSign}
              />
            </StatGrid>
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
    <AdminLayout
      header={<AdminHeader />}
      sidebar={<AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />}
    >
      {renderContent()}
    </AdminLayout>
  )
}
