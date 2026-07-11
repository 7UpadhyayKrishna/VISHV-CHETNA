import { getDb } from '@/lib/db'
import { DEFAULT_CONTENT, deepMerge, mergeWithDefaults } from '@/lib/site-content-defaults'

export { DEFAULT_CONTENT, mergeWithDefaults, getProgramBySlug } from '@/lib/site-content-defaults'

const DOC_ID = 'main'

export async function getSiteContent() {
  try {
    const db = await getDb()
    const col = db.collection('site_content')
    let doc = await col.findOne({ id: DOC_ID })
    if (!doc) {
      const seed = { id: DOC_ID, ...structuredClone(DEFAULT_CONTENT), updatedAt: new Date().toISOString() }
      await col.insertOne(seed)
      doc = seed
    }
    return mergeWithDefaults(doc)
  } catch {
    return structuredClone(DEFAULT_CONTENT)
  }
}

export async function updateSiteContent(patch) {
  const db = await getDb()
  const col = db.collection('site_content')
  const current = await getSiteContent()
  const next = deepMerge(current, patch)
  const { logo, nav, hero, about, programsSection, programs, lotus, gallery, immersion, eventsSection, events, donate, testimonialsSection, testimonials, contact, footer, stats } = next
  const payload = {
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
  }
  await col.updateOne({ id: DOC_ID }, { $set: payload }, { upsert: true })
  return mergeWithDefaults(payload)
}
