"use client"

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  onUpload: (file: File) => Promise<string>
  maxImages?: number
}

export function ImageUpload({ images, onImagesChange, onUpload, maxImages = 5 }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return

    const fileArray = Array.from(files)
    const imageFiles = fileArray.filter(file => file.type.startsWith('image/'))

    if (imageFiles.length === 0) {
      alert('Por favor seleccioná solo archivos de imagen')
      return
    }

    if (images.length + imageFiles.length > maxImages) {
      alert(`Podés subir máximo ${maxImages} imágenes`)
      return
    }

    setIsUploading(true)

    try {
      const uploadPromises = imageFiles.map(file => onUpload(file))
      const uploadedUrls = await Promise.all(uploadPromises)
      onImagesChange([...images, ...uploadedUrls])
    } catch (error) {
      console.error('Error uploading images:', error)
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al subir las imágenes'
      alert(`Error al subir las imágenes: ${errorMessage}`)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files)
    }
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium">Imágenes del Producto</div>
      
      {/* Área de subida */}
      <Card 
        className={`border-2 border-dashed transition-colors ${
          dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
              <Upload className="w-6 h-6 text-muted-foreground" />
            </div>
            
            <div>
              <p className="text-sm font-medium">
                {isUploading ? 'Subiendo imágenes...' : 'Arrastrá imágenes aquí'}
              </p>
              <p className="text-xs text-muted-foreground">
                o hacé clic para seleccionar archivos
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading || images.length >= maxImages}
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Seleccionar Imágenes
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>

      {/* Imágenes subidas */}
      {images.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            {images.length} de {maxImages} imágenes
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={image}
                    alt={`Imagen ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(index)}
                >
                  <X className="w-3 h-3" />
                </Button>
                <Badge variant="secondary" className="absolute bottom-2 left-2 text-xs">
                  {index + 1}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
