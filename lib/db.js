import { MongoClient } from 'mongodb'

const uri = process.env.MONGO_URL
const dbName = process.env.DB_NAME || 'vishv_chetna'

const globalForMongo = globalThis

export function isMongoConfigured() {
  return Boolean(uri && String(uri).trim())
}

export async function getDb() {
  if (!isMongoConfigured()) {
    throw new Error('MONGO_URL is not set. Add it in Vercel → Project → Settings → Environment Variables, then redeploy.')
  }

  if (!globalForMongo.__mongoClientPromise) {
    const client = new MongoClient(uri, {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    })
    globalForMongo.__mongoClientPromise = client.connect().catch((err) => {
      globalForMongo.__mongoClientPromise = null
      throw err
    })
  }

  const client = await globalForMongo.__mongoClientPromise
  return client.db(dbName)
}

export async function pingDb() {
  if (!isMongoConfigured()) {
    return { ok: false, error: 'MONGO_URL is not set' }
  }
  try {
    const db = await getDb()
    await db.command({ ping: 1 })
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e.message || 'MongoDB connection failed' }
  }
}
