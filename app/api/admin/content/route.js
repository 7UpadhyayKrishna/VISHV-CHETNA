import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { getSiteContent, updateSiteContent } from '@/lib/site-content'

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  const content = await getSiteContent()
  return NextResponse.json({ ok: true, content })
}

export async function PUT(req) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json().catch(() => null)
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ ok: false, error: 'Invalid body' }, { status: 400 })
  }
  try {
    const content = await updateSiteContent(body)
    return NextResponse.json({ ok: true, content })
  } catch (e) {
    return NextResponse.json({ ok: false, error: e.message || 'Save failed' }, { status: 500 })
  }
}
