// TanStack Start/Nitro maneja las variables de entorno automáticamente en el servidor
// No necesitamos importar 'dotenv/config' aquí ya que puede causar errores en el navegador
// Los scripts independientes (como seed.ts) cargan dotenv manualmente cuando es necesario

// NOTA: Este módulo solo debe ser importado dentro de createServerFn o código que se ejecuta exclusivamente en el servidor
// Las importaciones de nivel superior (pg, drizzle) solo se ejecutarán cuando el código se ejecute en el servidor
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set')
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes('supabase')
    ? {
        rejectUnauthorized: false,
      }
    : false,
})

export const db = drizzle(pool, { schema })