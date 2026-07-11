'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const isLogin = pathname === '/admin/login'

  useEffect(() => {
    document.body.style.overflow = 'auto'
    document.documentElement.style.overflow = 'auto'
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (isLogin) {
      setReady(true)
      return
    }
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/admin/me', { cache: 'no-store' })
        if (!res.ok) {
          router.replace('/admin/login')
          return
        }
        if (!cancelled) setReady(true)
      } catch {
        router.replace('/admin/login')
      }
    })()
    return () => { cancelled = true }
  }, [isLogin, pathname, router])

  if (isLogin) return children
  if (!ready) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center text-[#3D342A]">
        Checking session…
      </div>
    )
  }
  return children
}
