import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { isAdminAuthenticated } from '@/lib/admin-auth'

const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'])
const VIDEO_TYPES = new Set(['video/mp4', 'video/webm', 'video/quicktime', 'video/ogg'])
const ALLOWED = new Set([...IMAGE_TYPES, ...VIDEO_TYPES])
const MAX_IMAGE = 5 * 1024 * 1024
const MAX_VIDEO = 80 * 1024 * 1024

function extFor(type, name) {
  const fromName = path.extname(name || '').toLowerCase()
  const ok = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.mp4', '.webm', '.mov', '.ogg']
  if (fromName && ok.includes(fromName)) return fromName
  if (type === 'image/jpeg') return '.jpg'
  if (type === 'image/png') return '.png'
  if (type === 'image/webp') return '.webp'
  if (type === 'image/gif') return '.gif'
  if (type === 'image/svg+xml') return '.svg'
  if (type === 'video/mp4') return '.mp4'
  if (type === 'video/webm') return '.webm'
  if (type === 'video/quicktime') return '.mov'
  if (type === 'video/ogg') return '.ogg'
  return '.bin'
}

export async function POST(req) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const form = await req.formData().catch(() => null)
  const file = form?.get('file')
  if (!file || typeof file === 'string') {
    return NextResponse.json({ ok: false, error: 'No file' }, { status: 400 })
  }

  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ ok: false, error: 'Unsupported file type' }, { status: 400 })
  }

  const max = VIDEO_TYPES.has(file.type) ? MAX_VIDEO : MAX_IMAGE
  if (file.size > max) {
    return NextResponse.json({
      ok: false,
      error: VIDEO_TYPES.has(file.type) ? 'Video too large (max 80MB)' : 'File too large (max 5MB)',
    }, { status: 400 })
  }

  const buf = Buffer.from(await file.arrayBuffer())
  const filename = `${uuidv4()}${extFor(file.type, file.name)}`
  const dir = path.join(process.cwd(), 'public', 'uploads')
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(path.join(dir, filename), buf)

  return NextResponse.json({ ok: true, url: `/uploads/${filename}` })
}

export async function DELETE(req) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const raw = searchParams.get('path') || ''
  if (!raw.startsWith('/uploads/')) {
    return NextResponse.json({ ok: false, error: 'Invalid path' }, { status: 400 })
  }

  const base = path.join(process.cwd(), 'public', 'uploads')
  const target = path.resolve(path.join(process.cwd(), 'public', raw.replace(/^\//, '')))
  if (!target.startsWith(base + path.sep)) {
    return NextResponse.json({ ok: false, error: 'Invalid path' }, { status: 400 })
  }

  try {
    await fs.unlink(target)
  } catch {
    // ignore missing
  }
  return NextResponse.json({ ok: true })
}
