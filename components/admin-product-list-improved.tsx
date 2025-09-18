"use client"

import Image from "next/image"
import { useState } from "react"
import { useProducts } from "@/hooks/use-products"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2, Search } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

interface AdminProductListProps {
  onEditProduct: (productId: string) => void
}

export function AdminProductList({ onEditProduct }: AdminProductListProps) {
  const { products, deleteProduct } = useProducts()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const { toast } = useToast()

  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (productId: string) => {
    setProductIdToDelete(productId)
  }

  const confirmDelete = async () => {
    if (!productIdToDelete) return
    setIsDeleting(true)
    try {
      await deleteProduct(productIdToDelete)
      toast({
        title: "Producto eliminado",
        description: "El producto y sus imágenes fueron eliminados correctamente.",
      })
    } catch (error) {
      console.error('Error deleting product:', error)
      toast({
        title: "Error al eliminar",
        description: "No se pudo eliminar el producto. Intenta nuevamente.",
      })
    } finally {
      setIsDeleting(false)
      setProductIdToDelete(null)
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "in-stock" && product.inStock) ||
                         (statusFilter === "out-of-stock" && !product.inStock) ||
                         (statusFilter === "featured" && product.featured)
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const categories = [
    { value: "all", label: "Todas las categorías" },
    { value: "hoodies", label: "Buzos" },
    { value: "tshirts", label: "Remeras" },
    { value: "pants", label: "Pantalones" },
    { value: "accessories", label: "Accesorios" },
    { value: "shoes", label: "Zapatillas" }
  ]

  const statusOptions = [
    { value: "all", label: "Todos los estados" },
    { value: "in-stock", label: "En Stock" },
    { value: "out-of-stock", label: "Sin Stock" },
    { value: "featured", label: "Destacados" }
  ]

  return (
    <div className="space-y-6">
      {/* Header con filtros */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-xl">Gestión de Productos</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                {filteredProducts.length} de {products.length} productos
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Búsqueda */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filtros */}
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(status => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de productos */}
      <Card>
        <CardContent className="p-0">
          {/* Vista de escritorio */}
          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="w-[160px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="relative h-12 w-12 rounded-md overflow-hidden bg-muted">
                          <Image
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium truncate">{product.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {product.category === 'hoodies' ? 'Buzos' : 
                         product.category === 'tshirts' ? 'Remeras' : 
                         product.category === 'pants' ? 'Pantalones' : 
                         product.category === 'accessories' ? 'Accesorios' : 
                         product.category === 'shoes' ? 'Zapatillas' : product.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      ${product.price.toLocaleString('es-AR')}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div>Talles: {product.sizes.join(", ")}</div>
                        <div>Colores: {product.colors.join(", ")}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge variant={product.inStock ? "default" : "destructive"}>
                          {product.inStock ? "En Stock" : "Sin Stock"}
                        </Badge>
                        {product.featured && (
                          <Badge variant="secondary" className="text-xs">
                            Destacado
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => onEditProduct(product.id)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Vista móvil */}
          <div className="lg:hidden">
            <div className="divide-y">
              {filteredProducts.map((product) => (
                <div key={product.id} className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{product.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {product.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                          <Button variant="outline" size="sm" onClick={() => onEditProduct(product.id)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="capitalize text-xs">
                            {product.category === 'hoodies' ? 'Buzos' : 
                             product.category === 'tshirts' ? 'Remeras' : 
                             product.category === 'pants' ? 'Pantalones' : 
                             product.category === 'accessories' ? 'Accesorios' : 
                             product.category === 'shoes' ? 'Zapatillas' : product.category}
                          </Badge>
                          <span className="font-medium text-sm">
                            ${product.price.toLocaleString('es-AR')}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant={product.inStock ? "default" : "destructive"} className="text-xs">
                            {product.inStock ? "En Stock" : "Sin Stock"}
                          </Badge>
                          {product.featured && (
                            <Badge variant="secondary" className="text-xs">
                              Destacado
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {filteredProducts.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">
                {searchTerm || categoryFilter !== "all" || statusFilter !== "all" 
                  ? "No se encontraron productos con los filtros aplicados."
                  : "No hay productos disponibles."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmación de eliminación */}
      <AlertDialog open={productIdToDelete !== null} onOpenChange={(open) => !open && setProductIdToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar este producto?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará el producto de la base de datos y también borrará sus imágenes del almacenamiento. No se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={isDeleting}>
              {isDeleting ? 'Eliminando…' : 'Eliminar definitivamente'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
