import { createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'vc_admin_session'
const MAX_AGE_SEC = 60 * 60 * 24 * 7 // 7 days

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'dev-secret-change-me'
}

function sign(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const sig = createHmac('sha256', getSecret()).update(body).digest('base64url')
  return `${body}.${sig}`
}

function verify(token) {
  if (!token || typeof token !== 'string') return null
  const [body, sig] = token.split('.')
  if (!body || !sig) return null
  const expected = createHmac('sha256', getSecret()).update(body).digest('base64url')
  try {
    const a = Buffer.from(sig)
    const b = Buffer.from(expected)
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  } catch {
    return null
  }
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'))
    if (!payload?.exp || Date.now() > payload.exp) return null
    return payload
  } catch {
    return null
  }
}

export function createSessionToken() {
  return sign({ role: 'admin', exp: Date.now() + MAX_AGE_SEC * 1000 })
}

export function sessionCookieOptions(token) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE_SEC,
  }
}

export function clearSessionCookieOptions() {
  return {
    name: COOKIE_NAME,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  }
}

export async function isAdminAuthenticated() {
  const jar = await cookies()
  const token = jar.get(COOKIE_NAME)?.value
  return Boolean(verify(token))
}

export function checkPassword(password) {
  const expected = process.env.ADMIN_PASSWORD || ''
  if (!expected || !password) return false
  const a = Buffer.from(String(password))
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  try {
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}

export { COOKIE_NAME }
