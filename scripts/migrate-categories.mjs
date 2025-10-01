#!/usr/bin/env node
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceRoleKey) {
  console.error('Faltan variables: NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { persistSession: false }
})

const VALID = new Set(['hoodies','tshirts','pants','shirts','shorts','accessories','shoes'])

async function run() {
  console.log('Iniciando migración de categorías…')

  // 1) coats -> hoodies
  const { data: updated1, error: err1 } = await supabase
    .from('products')
    .update({ category: 'hoodies' })
    .eq('category', 'coats')
    .select('id')

  if (err1) {
    console.error('Error actualizando coats→hoodies:', err1)
    process.exit(1)
  }

  console.log(`Actualizados coats→hoodies: ${updated1?.length ?? 0}`)

  // 2) Normalizar cualquier categoría inválida hacia 'tshirts'
  const { data: all, error: errAll } = await supabase
    .from('products')
    .select('id, category')

  if (errAll) {
    console.error('Error leyendo productos:', errAll)
    process.exit(1)
  }

  const invalids = (all ?? []).filter(p => !VALID.has(p.category))
  if (invalids.length > 0) {
    const ids = invalids.map(p => p.id)
    const { error: errFix } = await supabase
      .from('products')
      .update({ category: 'tshirts' })
      .in('id', ids)
    if (errFix) {
      console.error('Error normalizando categorías inválidas:', errFix)
      process.exit(1)
    }
    console.log(`Normalizadas categorías inválidas a 'tshirts': ${ids.length}`)
  } else {
    console.log('No se encontraron categorías inválidas')
  }

  console.log('Migración finalizada OK')
}

run().catch((e) => {
  console.error('Fallo inesperado en migración:', e)
  process.exit(1)
})


