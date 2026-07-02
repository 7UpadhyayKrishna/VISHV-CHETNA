import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

const uri = process.env.MONGO_URL
const dbName = process.env.DB_NAME || 'vishv_chetna'

let cachedClient = null
async function getDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(uri)
    await cachedClient.connect()
  }
  return cachedClient.db(dbName)
}

function json(data, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export async function OPTIONS() { return json({ ok: true }) }

async function route(req, path, method) {
  const p = (path || []).join('/')

  if (method === 'GET' && p === '') {
    return json({ name: 'Vishv Chetna Trust API', ok: true, ts: new Date().toISOString() })
  }

  if (method === 'GET' && p === 'stats') {
    return json({
      peopleGuided: 5327,
      sessions: 168,
      years: 15,
      camps: 42,
    })
  }

  if (method === 'POST' && p === 'contact') {
    const body = await req.json().catch(() => ({}))
    const doc = {
      id: uuidv4(),
      name: body.name || '',
      email: body.email || '',
      phone: body.phone || '',
      message: body.message || '',
      createdAt: new Date().toISOString(),
    }
    try {
      const db = await getDb()
      await db.collection('contacts').insertOne(doc)
    } catch (e) {
      // Continue silently for MVP even if DB unavailable
    }
    return json({ ok: true, id: doc.id })
  }

  if (method === 'POST' && p === 'newsletter') {
    const body = await req.json().catch(() => ({}))
    const doc = {
      id: uuidv4(),
      email: body.email || '',
      createdAt: new Date().toISOString(),
    }
    try {
      const db = await getDb()
      await db.collection('newsletter').insertOne(doc)
    } catch (e) {}
    return json({ ok: true })
  }

  if (method === 'POST' && p === 'donate') {
    const body = await req.json().catch(() => ({}))
    const doc = {
      id: uuidv4(),
      name: body.name || 'Anonymous',
      amount: Number(body.amount) || 0,
      email: body.email || '',
      createdAt: new Date().toISOString(),
    }
    try {
      const db = await getDb()
      await db.collection('donations').insertOne(doc)
    } catch (e) {}
    return json({ ok: true, id: doc.id })
  }

  return json({ error: 'Not found', path: p }, 404)
}

export async function GET(req, { params }) {
  const { path } = await params
  return route(req, path, 'GET')
}
export async function POST(req, { params }) {
  const { path } = await params
  return route(req, path, 'POST')
}
export async function PUT(req, { params }) {
  const { path } = await params
  return route(req, path, 'PUT')
}
export async function DELETE(req, { params }) {
  const { path } = await params
  return route(req, path, 'DELETE')
}
