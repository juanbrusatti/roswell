"use client"

import Image from "next/image"
import { useProducts } from "@/hooks/use-products"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2, Eye } from "lucide-react"

interface AdminProductListProps {
  onEditProduct: (productId: string) => void
}

export function AdminProductList({ onEditProduct }: AdminProductListProps) {
  const { products, deleteProduct } = useProducts()

  const handleDelete = async (productId: string) => {
    if (confirm("¿Estás seguro de que querés eliminar este producto?")) {
      try {
        await deleteProduct(productId)
      } catch (error) {
        console.error('Error deleting product:', error)
        alert('Error al eliminar el producto')
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Productos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
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
                    <div>
                      <div className="font-medium">{product.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">{product.description}</div>
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
                <TableCell>${product.price.toLocaleString('es-AR')}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>Talles: {product.sizes.join(", ")}</div>
                    <div>Colores: {product.colors.join(", ")}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={product.inStock ? "default" : "destructive"}>
                    {product.inStock ? "En Stock" : "Sin Stock"}
                  </Badge>
                  {product.featured && (
                    <Badge variant="secondary" className="ml-2">
                      Destacado
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onEditProduct(product.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
