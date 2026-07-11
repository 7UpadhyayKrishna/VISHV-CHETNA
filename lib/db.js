import { MongoClient } from 'mongodb'

const uri = process.env.MONGO_URL
const dbName = process.env.DB_NAME || 'vishv_chetna'

let cachedClient = null

export async function getDb() {
  if (!uri) {
    throw new Error('MONGO_URL is not set')
  }
  if (!cachedClient) {
    cachedClient = new MongoClient(uri)
    await cachedClient.connect()
  }
  return cachedClient.db(dbName)
}
