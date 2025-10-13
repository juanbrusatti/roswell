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
import { Shield, AlertTriangle, ShoppingCart, Package } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const { products, loading } = useProducts()
  const { isAuthenticated, isAdmin } = useStore()
  
  // Calculate statistics
  const inStockProducts = products.filter(p => p.inStock).length
  const featuredProducts = products.filter(p => p.featured).length
  const totalRevenue = products.reduce((sum, product) => sum + product.price, 0)

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
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Productos
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{products.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Productos en el catálogo
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">En Stock</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{inStockProducts}</div>
                  <p className="text-xs text-muted-foreground">
                    Productos disponibles
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Valor del Catálogo
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${totalRevenue.toLocaleString('es-AR')}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Valor total del inventario
                  </p>
                </CardContent>
              </Card>
            </div>
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
