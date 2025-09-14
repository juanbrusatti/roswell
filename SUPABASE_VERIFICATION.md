# 🔍 Verificación del Estado Actual de Supabase

## Comandos SQL para Verificar la Configuración

Ejecuta estos comandos uno por uno en el editor SQL de Supabase:

### 1. Verificar que el bucket existe y está configurado correctamente:
```sql
SELECT id, name, public, created_at 
FROM storage.buckets 
WHERE id = 'product-images';
```

### 2. Verificar las políticas de acceso existentes:
```sql
SELECT id, name, bucket_id, operation, definition 
FROM storage.policies 
WHERE bucket_id = 'product-images';
```

### 3. Si las políticas no existen, crearlas:
```sql
-- Política para permitir subida de archivos
CREATE POLICY "Allow public uploads" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'product-images');

-- Política para permitir lectura de archivos
CREATE POLICY "Allow public access" ON storage.objects 
FOR SELECT USING (bucket_id = 'product-images');
```

### 4. Verificar que las políticas se crearon correctamente:
```sql
SELECT id, name, bucket_id, operation, definition 
FROM storage.policies 
WHERE bucket_id = 'product-images';
```

## Resultados Esperados

- **Bucket**: Debe mostrar `product-images` con `public = true`
- **Políticas**: Debe haber al menos 2 políticas (INSERT y SELECT)
- **Si no hay políticas**: Ejecuta los comandos CREATE POLICY

## Próximos Pasos

1. Ejecuta los comandos de verificación
2. Si faltan políticas, créalas con los comandos CREATE POLICY
3. Verifica que las variables de entorno estén en Vercel
4. Haz redeploy de la aplicación
