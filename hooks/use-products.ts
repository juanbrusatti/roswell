"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/lib/types'

// Variables de entorno para verificación
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar productos desde Supabase
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Convertir datos de Supabase al formato de la aplicación
      const formattedProducts: Product[] = (data ?? []).map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        price: item.price,
        category: item.category,
        sizes: item.sizes ?? [],
        colors: item.colors ?? [],
        images: item.images ?? [],
        inStock: item.in_stock,
        featured: item.featured,
        createdAt: new Date(item.created_at)
      }))

      setProducts(formattedProducts)
      setError(null)
    } catch (err) {
      console.error('Error fetching products:', err)
      setError('Error al cargar los productos')
    } finally {
      setLoading(false)
    }
  }

  // Agregar producto
  const addProduct = async (productData: Omit<Product, "id" | "createdAt">) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert({
          title: productData.title,
          description: productData.description,
          price: productData.price,
          category: productData.category,
          sizes: productData.sizes,
          colors: productData.colors,
          images: productData.images,
          in_stock: productData.inStock,
          featured: productData.featured,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error

      // Actualizar estado local
      const newProduct: Product = {
        ...productData,
        id: data.id,
        createdAt: new Date(data.created_at)
      }
      setProducts(prev => [newProduct, ...prev])
      
      return data
    } catch (err) {
      console.error('Error adding product:', err)
      throw new Error('Error al agregar el producto')
    }
  }

  // Actualizar producto
  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const updateData: any = {
        updated_at: new Date().toISOString()
      }

      if (updates.title) updateData.title = updates.title
      if (updates.description) updateData.description = updates.description
      if (updates.price) updateData.price = updates.price
      if (updates.category) updateData.category = updates.category
      if (updates.sizes) updateData.sizes = updates.sizes
      if (updates.colors) updateData.colors = updates.colors
      if (updates.images) updateData.images = updates.images
      if (typeof updates.inStock === 'boolean') updateData.in_stock = updates.inStock
      if (typeof updates.featured === 'boolean') updateData.featured = updates.featured

      const { error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', id)

      if (error) throw error

      // Actualizar estado local
      setProducts(prev =>
        prev.map(product =>
          product.id === id ? { ...product, ...updates } : product
        )
      )
    } catch (err) {
      console.error('Error updating product:', err)
      throw new Error('Error al actualizar el producto')
    }
  }

  // Eliminar producto (con optimistic update)
  const deleteProduct = async (id: string) => {
    // Primero actualizamos el estado local
    setProducts(prev => prev.filter(product => product.id !== id))

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (err) {
      console.error('Error deleting product:', err)
      throw new Error('Error al eliminar el producto')
    }
  }

  // Subir imagen
  const uploadImage = async (file: File): Promise<string> => {
    try {
      // Verificar que Supabase esté configurado correctamente
      if (!supabaseUrl || supabaseUrl === 'https://tu-proyecto.supabase.co') {
        throw new Error('Supabase no está configurado correctamente. Verifica las variables de entorno.')
      }

      if (!supabaseAnonKey || supabaseAnonKey === 'tu-clave-publica') {
        throw new Error('Clave de Supabase no configurada. Verifica NEXT_PUBLIC_SUPABASE_ANON_KEY.')
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `products/${fileName}`

      console.log('Intentando subir imagen:', { fileName, filePath, fileSize: file.size })

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file)

      if (uploadError) {
        console.error('Error de upload específico:', uploadError)
        throw new Error(`Error de upload: ${uploadError.message}`)
      }

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)

      console.log('Imagen subida exitosamente:', data.publicUrl)
      return data.publicUrl
    } catch (err) {
      console.error('Error detallado al subir imagen:', err)
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al subir la imagen'
      throw new Error(errorMessage)
    }
  }

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProducts()
  }, [])

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
    refetch: fetchProducts
  }
}
