import { NextResponse } from 'next/server'
import { checkPassword, createSessionToken, sessionCookieOptions } from '@/lib/admin-auth'

export async function POST(req) {
  const body = await req.json().catch(() => ({}))
  if (!checkPassword(body.password)) {
    return NextResponse.json({ ok: false, error: 'Invalid password' }, { status: 401 })
  }
  const token = createSessionToken()
  const res = NextResponse.json({ ok: true })
  const opts = sessionCookieOptions(token)
  res.cookies.set(opts)
  return res
}
