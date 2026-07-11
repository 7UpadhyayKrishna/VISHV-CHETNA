import { getDb, isMongoConfigured, pingDb } from '@/lib/db'
import { DEFAULT_CONTENT, deepMerge, mergeWithDefaults } from '@/lib/site-content-defaults'

export { DEFAULT_CONTENT, mergeWithDefaults, getProgramBySlug } from '@/lib/site-content-defaults'

const DOC_ID = 'main'

function stripUndefined(value) {
  if (Array.isArray(value)) return value.map(stripUndefined)
  if (value && typeof value === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(value)) {
      if (v === undefined) continue
      out[k] = stripUndefined(v)
    }
    return out
  }
  return value
}

export async function getSiteContent() {
  try {
    const db = await getDb()
    const col = db.collection('site_content')
    let doc = await col.findOne({ id: DOC_ID })
    if (!doc) {
      const seed = stripUndefined({
        id: DOC_ID,
        ...structuredClone(DEFAULT_CONTENT),
        updatedAt: new Date().toISOString(),
      })
      await col.insertOne(seed)
      doc = seed
    }
    return mergeWithDefaults(doc)
  } catch {
    return structuredClone(DEFAULT_CONTENT)
  }
}

export async function getContentStatus() {
  const ping = await pingDb()
  return {
    mongoConfigured: isMongoConfigured(),
    dbConnected: ping.ok,
    error: ping.ok ? null : ping.error,
  }
}

export async function updateSiteContent(patch) {
  if (!isMongoConfigured()) {
    throw new Error('MONGO_URL is not set. Add it in Vercel → Project → Settings → Environment Variables, then redeploy.')
  }

  let db
  try {
    db = await getDb()
    await db.command({ ping: 1 })
  } catch (e) {
    throw new Error(
      `MongoDB connection failed: ${e.message || 'unknown error'}. Check Atlas Network Access (allow 0.0.0.0/0) and that MONGO_URL is correct.`
    )
  }

  const col = db.collection('site_content')
  const existing = await col.findOne({ id: DOC_ID })
  const current = existing ? mergeWithDefaults(existing) : structuredClone(DEFAULT_CONTENT)
  const next = deepMerge(current, patch)
  const {
    logo, nav, hero, about, programsSection, programs, lotus, gallery,
    immersion, eventsSection, events, donate, testimonialsSection,
    testimonials, contact, footer, stats,
  } = next

  const payload = stripUndefined({
    id: DOC_ID,
    logo,
    nav,
    hero,
    about,
    programsSection,
    programs,
    lotus,
    gallery,
    immersion,
    eventsSection,
    events,
    donate,
    testimonialsSection,
    testimonials,
    contact,
    footer,
    stats,
    updatedAt: new Date().toISOString(),
  })

  await col.updateOne({ id: DOC_ID }, { $set: payload }, { upsert: true })
  return mergeWithDefaults(payload)
}
