# 🔧 Configuración de Variables de Entorno para Producción

## Problema Identificado
El error "Error al subir las imágenes" en producción se debe a que las variables de entorno de Supabase no están configuradas correctamente en Vercel.

## Solución Paso a Paso

### 1. Verificar Variables de Entorno en Vercel

1. Ve a tu dashboard de Vercel
2. Selecciona tu proyecto "roswell"
3. Ve a **Settings** > **Environment Variables**
4. Agrega estas variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://gcodsmnqzxzngesjprof.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-publica-real-aqui
```

### 2. Obtener las Credenciales Correctas

1. Ve a tu dashboard de Supabase
2. Selecciona tu proyecto
3. Ve a **Settings** > **API**
4. Copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

⚠️ **IMPORTANTE**: Usa la clave **anon public**, NO la **service_role**

### 3. Verificar Configuración del Storage

En Supabase, ejecuta estos comandos SQL:

```sql
-- Verificar que el bucket existe
SELECT * FROM storage.buckets WHERE id = 'product-images';

-- Si no existe, crearlo
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true);

-- Verificar políticas de acceso
SELECT * FROM storage.policies WHERE bucket_id = 'product-images';

-- Si no existen las políticas, crearlas
CREATE POLICY "Allow public uploads" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow public access" ON storage.objects 
FOR SELECT USING (bucket_id = 'product-images');
```

### 4. Redesplegar la Aplicación

Después de agregar las variables de entorno:
1. Ve a **Deployments** en Vercel
2. Haz clic en **Redeploy** en el último deployment
3. O haz un nuevo push a tu repositorio

### 5. Verificar que Funciona

1. Abre la consola del navegador (F12)
2. Intenta subir una imagen
3. Revisa los logs para ver si hay errores específicos
4. Los nuevos mensajes de error te dirán exactamente qué está fallando

## Mensajes de Error Mejorados

Ahora la aplicación mostrará errores más específicos:
- "Supabase no está configurado correctamente" → Variables de entorno faltantes
- "Clave de Supabase no configurada" → NEXT_PUBLIC_SUPABASE_ANON_KEY incorrecta
- "Error de upload: [mensaje específico]" → Problema con Supabase Storage

## Verificación Rápida

Para verificar que todo está configurado correctamente:

1. **Variables de entorno**: Deben estar en Vercel y no ser los valores por defecto
2. **Bucket de storage**: Debe existir y ser público
3. **Políticas de acceso**: Deben permitir subida pública
4. **Redeploy**: La aplicación debe estar redesplegada después de los cambios
