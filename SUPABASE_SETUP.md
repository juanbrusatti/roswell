# 🚀 Configuración de Supabase para Roswell

## 📋 Pasos para Configurar Supabase

### 1. Crear Cuenta en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Creá una cuenta gratuita
3. Creá un nuevo proyecto

### 2. Configurar la Base de Datos
Ejecutá estos comandos SQL en el editor SQL de Supabase:

```sql
-- Crear tabla de productos
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('hoodies', 'tshirts', 'pants', 'accessories', 'shoes')),
  sizes TEXT[] NOT NULL DEFAULT '{}',
  colors TEXT[] NOT NULL DEFAULT '{}',
  images TEXT[] NOT NULL DEFAULT '{}',
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear bucket para imágenes
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Configurar políticas de acceso
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Permitir lectura pública
CREATE POLICY "Allow public read access" ON products FOR SELECT USING (true);

-- Permitir inserción, actualización y eliminación solo para usuarios autenticados
CREATE POLICY "Allow authenticated insert" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON products FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete" ON products FOR DELETE USING (true);

-- Políticas para storage
CREATE POLICY "Allow public uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images');
CREATE POLICY "Allow public access" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
```

### 3. Configurar Variables de Entorno

Creá un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://gcodsmnqzxzngesjprof.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-publica-aqui
```

### 4. Obtener las Credenciales

1. En el dashboard de Supabase, ve a **Settings** > **API**
2. Copiá la **Project URL** y la **anon public** key
3. Pegalas en tu archivo `.env.local`

### 5. Para Producción en Vercel

1. En el dashboard de Vercel, ve a tu proyecto
2. Ve a **Settings** > **Environment Variables**
3. Agregá las mismas variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## ✅ Funcionalidades Implementadas

- ✅ **Subida de imágenes** desde el dispositivo
- ✅ **Almacenamiento en la nube** (Supabase Storage)
- ✅ **Base de datos** para productos
- ✅ **Sincronización automática** entre dispositivos
- ✅ **Interfaz de arrastrar y soltar** para imágenes
- ✅ **Validación** de archivos de imagen
- ✅ **Manejo de errores** completo

## 🎯 Cómo Usar

1. **Configurá Supabase** siguiendo los pasos arriba
2. **Agregá las variables de entorno**
3. **Ejecutá** `npm run dev`
4. **Accedé al panel admin** con las credenciales
5. **Subí imágenes** arrastrando o seleccionando archivos
6. **Guardá el producto** y será visible para todos

## 🔧 Solución de Problemas

### Error: "Invalid API key"
- Verificá que las variables de entorno estén correctas
- Asegurate de usar la clave **anon public**, no la **service_role**

### Error: "Bucket not found"
- Ejecutá el comando SQL para crear el bucket de storage
- Verificá que el bucket se llame exactamente `product-images`

### Las imágenes no se suben
- Verificá que las políticas de storage estén configuradas
- Asegurate de que el bucket sea público
