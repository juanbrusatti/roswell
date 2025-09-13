"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useStore } from "@/lib/store"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

interface ProductFormProps {
  productId?: string | null
  onSave: () => void
  onCancel: () => void
}

export function ProductForm({ productId, onSave, onCancel }: ProductFormProps) {
  const { products, addProduct, updateProduct } = useStore()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "" as Product["category"] | "",
    sizes: [] as string[],
    colors: [] as string[],
    images: [] as string[],
    inStock: true,
    featured: false,
  })

  const [newSize, setNewSize] = useState("")
  const [newColor, setNewColor] = useState("")
  const [newImage, setNewImage] = useState("")

  const categories: Product["category"][] = ["hoodies", "tshirts", "pants", "accessories", "shoes"]
  const commonSizes = ["XS", "S", "M", "L", "XL", "XXL"]
  const commonColors = ["Black", "White", "Gray", "Navy", "Red", "Blue", "Green", "Brown"]

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.description || !formData.price || !formData.category) {
      alert("Please fill in all required fields")
      return
    }

    const productData = {
      title: formData.title,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      category: formData.category as Product["category"],
      sizes: formData.sizes,
      colors: formData.colors,
      images: formData.images.length > 0 ? formData.images : ["/placeholder.svg"],
      inStock: formData.inStock,
      featured: formData.featured,
    }

    if (productId) {
      updateProduct(productId, productData)
    } else {
      addProduct(productData)
    }

    onSave()
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

  const addImage = () => {
    if (newImage && !formData.images.includes(newImage)) {
      setFormData({ ...formData, images: [...formData.images, newImage] })
    }
    setNewImage("")
  }

  const removeImage = (image: string) => {
    setFormData({ ...formData, images: formData.images.filter((img) => img !== image) })
  }

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>{productId ? "Edit Product" : "Add New Product"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Product Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter product title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="price">Price *</Label>
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
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value as Product["category"] })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="capitalize">
                        {category}
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
                  <Label htmlFor="inStock">In Stock</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
                  />
                  <Label htmlFor="featured">Featured Product</Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter product description"
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label>Product Images</Label>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Input
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                      placeholder="Image URL or /placeholder.svg"
                    />
                    <Button type="button" onClick={addImage} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.images.map((image, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-2">
                        Image {index + 1}
                        <button type="button" onClick={() => removeImage(image)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Available Sizes</Label>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Select value={newSize} onValueChange={setNewSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {commonSizes.map((size) => (
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
              <Label>Available Colors</Label>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Select value={newColor} onValueChange={setNewColor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
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
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">{productId ? "Update Product" : "Add Product"}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
