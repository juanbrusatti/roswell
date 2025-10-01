"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useProducts } from "@/hooks/use-products"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ImageUpload } from "@/components/image-upload"
import { X, Plus } from "lucide-react"

interface ProductFormProps {
  productId?: string | null
  onSave: () => void
  onCancel: () => void
}

export function ProductForm({ productId, onSave, onCancel }: ProductFormProps) {
  const { products, addProduct, updateProduct, uploadImage } = useProducts()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "" as Product["category"] | "",
    sizes: [] as string[],
    colors: [] as string[],
    images: [] as string[],
    inStock: true,
    featured: true, // Por defecto los productos nuevos son destacados
  })

  const [newSize, setNewSize] = useState("")
  const [newColor, setNewColor] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories: Product["category"][] = ["hoodies", "tshirts", "pants", "shirts", "shorts", "accessories", "shoes"]
  const commonSizes = ["XS", "S", "M", "L", "XL", "XXL"]
  const pantsSizes = Array.from({ length: 21 }, (_, i) => (30 + i).toString()) // 30, 31, 32... hasta 50
  const commonColors = ["Negro", "Blanco", "Gris", "Azul Marino", "Rojo", "Azul", "Verde", "Marrón"]

  useEffect(() => {
    if (productId) {
      const product = products.find((p) => p.id === productId)
      if (product) {
        setFormData({
          title: product.title,
          description: product.description,
          price: product.price.toString(),
          category: product.category,
          sizes: product.sizes,
          colors: product.colors,
          images: product.images,
          inStock: product.inStock,
          featured: product.featured,
        })
      }
    }
  }, [productId, products])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.description || !formData.price || !formData.category) {
      alert("Por favor completá todos los campos obligatorios")
      return
    }

    if (formData.images.length === 0) {
      alert("Por favor subí al menos una imagen del producto")
      return
    }

    setIsSubmitting(true)

    try {
      const productData = {
        title: formData.title,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        category: formData.category as Product["category"],
        sizes: formData.sizes,
        colors: formData.colors,
        images: formData.images,
        inStock: formData.inStock,
        featured: formData.featured,
      }

      if (productId) {
        await updateProduct(productId, productData)
      } else {
        await addProduct(productData)
      }

      onSave()
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Error al guardar el producto. Intentá nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const addSize = (size: string) => {
    if (size && !formData.sizes.includes(size)) {
      setFormData({ ...formData, sizes: [...formData.sizes, size] })
    }
    setNewSize("")
  }

  const removeSize = (size: string) => {
    setFormData({ ...formData, sizes: formData.sizes.filter((s) => s !== size) })
  }

  const addColor = (color: string) => {
    if (color && !formData.colors.includes(color)) {
      setFormData({ ...formData, colors: [...formData.colors, color] })
    }
    setNewColor("")
  }

  const removeColor = (color: string) => {
    setFormData({ ...formData, colors: formData.colors.filter((c) => c !== color) })
  }


  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>{productId ? "Editar Producto" : "Agregar Nuevo Producto"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título del Producto *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ingresá el título del producto"
                  required
                />
              </div>

              <div>
                <Label htmlFor="price">Precio *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Categoría *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value as Product["category"] })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccioná una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'hoodies' ? 'Abrigos' : 
                         category === 'tshirts' ? 'Remeras' : 
                         category === 'pants' ? 'Pantalones' : 
                         category === 'shirts' ? 'Camisas' :
                         category === 'shorts' ? 'Shorts' :
                         category === 'accessories' ? 'Accesorios' : 
                         category === 'shoes' ? 'Zapatillas' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inStock"
                    checked={formData.inStock}
                    onCheckedChange={(checked) => setFormData({ ...formData, inStock: !!checked })}
                  />
                  <Label htmlFor="inStock">En Stock</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
                  />
                  <Label htmlFor="featured">Producto Destacado</Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Descripción *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ingresá la descripción del producto"
                  rows={4}
                  required
                />
              </div>

              <ImageUpload
                images={formData.images}
                onImagesChange={(images) => setFormData({ ...formData, images })}
                onUpload={uploadImage}
                maxImages={5}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>{formData.category === 'pants' ? 'Números Disponibles' : 'Talles Disponibles'}</Label>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Select value={newSize} onValueChange={setNewSize}>
                    <SelectTrigger>
                      <SelectValue placeholder={formData.category === 'pants' ? "Seleccioná un número" : "Seleccioná un talle"} />
                    </SelectTrigger>
                    <SelectContent>
                      {(formData.category === 'pants' ? pantsSizes : commonSizes).map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button type="button" onClick={() => addSize(newSize)} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.sizes.map((size) => (
                    <Badge key={size} variant="outline" className="flex items-center gap-2">
                      {size}
                      <button type="button" onClick={() => removeSize(size)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Label>Colores Disponibles</Label>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Select value={newColor} onValueChange={setNewColor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccioná un color" />
                    </SelectTrigger>
                    <SelectContent>
                      {commonColors.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button type="button" onClick={() => addColor(newColor)} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.colors.map((color) => (
                    <Badge key={color} variant="outline" className="flex items-center gap-2">
                      {color}
                      <button type="button" onClick={() => removeColor(color)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : productId ? "Actualizar Producto" : "Agregar Producto"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
