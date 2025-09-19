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
import { Separator } from "@/components/ui/separator"
import { X, Plus, Save, ArrowLeft, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

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
    featured: true,
  })

  const [newSize, setNewSize] = useState("")
  const [newColor, setNewColor] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const categories: Product["category"][] = ["hoodies", "tshirts", "pants", "coats", "accessories", "shoes"]
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

  const validateForm = () => {
    const newErrors: string[] = []
    
    if (!formData.title.trim()) newErrors.push("El título es obligatorio")
    if (!formData.description.trim()) newErrors.push("La descripción es obligatoria")
    if (!formData.price || Number.parseFloat(formData.price) <= 0) newErrors.push("El precio debe ser mayor a 0")
    if (!formData.category) newErrors.push("Debes seleccionar una categoría")
    if (formData.images.length === 0) newErrors.push("Debes subir al menos una imagen")
    if (formData.sizes.length === 0) newErrors.push("Debes agregar al menos un talle")
    if (formData.colors.length === 0) newErrors.push("Debes agregar al menos un color")
    
    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const productData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
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
      setErrors(['Error al guardar el producto. Intentá nuevamente.'])
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
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={onCancel}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg sm:text-xl break-words">
                  {productId ? "Editar Producto" : "Agregar Nuevo Producto"}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1 break-words">
                  {productId ? "Modifica la información del producto" : "Completa todos los campos para agregar un nuevo producto"}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {formData.images.length} imágenes
              </Badge>
              <Badge variant="outline" className="text-xs">
                {formData.sizes.length} talles
              </Badge>
              <Badge variant="outline" className="text-xs">
                {formData.colors.length} colores
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Errores */}
      {errors.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <ul className="space-y-1">
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Información básica */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">Título del Producto *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ej: Buzo Oversized Negro"
                    className={`text-sm ${errors.some(e => e.includes("título")) ? "border-destructive" : ""}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm font-medium">Precio (ARS) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    className={`text-sm ${errors.some(e => e.includes("precio")) ? "border-destructive" : ""}`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">Categoría *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value as Product["category"] })}
                >
                  <SelectTrigger className={`text-sm ${errors.some(e => e.includes("categoría")) ? "border-destructive" : ""}`}>
                    <SelectValue placeholder="Seleccioná una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'hoodies' ? 'Buzos' : 
                         category === 'tshirts' ? 'Remeras' : 
                         category === 'pants' ? 'Pantalones' : 
                         category === 'coats' ? 'Abrigos' :
                         category === 'accessories' ? 'Accesorios' : 
                         category === 'shoes' ? 'Zapatillas' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">Descripción *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe las características del producto..."
                  rows={4}
                  className={`text-sm resize-none ${errors.some(e => e.includes("descripción")) ? "border-destructive" : ""}`}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <Label className="text-sm font-medium">Configuración del Producto</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="inStock"
                      checked={formData.inStock}
                      onCheckedChange={(checked) => setFormData({ ...formData, inStock: !!checked })}
                    />
                    <Label htmlFor="inStock" className="text-sm">En Stock</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
                    />
                    <Label htmlFor="featured" className="text-sm">Producto Destacado</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Imágenes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Imágenes</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                images={formData.images}
                onImagesChange={(images) => setFormData({ ...formData, images })}
                onUpload={uploadImage}
                maxImages={5}
              />
            </CardContent>
          </Card>
        </div>

        {/* Talles y Colores */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {formData.category === 'pants' ? 'Números Disponibles' : 'Talles Disponibles'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={newSize} onValueChange={setNewSize}>
                  <SelectTrigger className="flex-1 text-sm">
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
                <Button type="button" onClick={() => addSize(newSize)} size="sm" className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.sizes.map((size) => (
                  <Badge key={size} variant="outline" className="flex items-center gap-2 text-xs">
                    {size}
                    <button type="button" onClick={() => removeSize(size)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Colores Disponibles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={newColor} onValueChange={setNewColor}>
                  <SelectTrigger className="flex-1 text-sm">
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
                <Button type="button" onClick={() => addColor(newColor)} size="sm" className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.colors.map((color) => (
                  <Badge key={color} variant="outline" className="flex items-center gap-2 text-xs">
                    {color}
                    <button type="button" onClick={() => removeColor(color)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botones de acción */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel} 
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? "Guardando..." : productId ? "Actualizar Producto" : "Agregar Producto"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
