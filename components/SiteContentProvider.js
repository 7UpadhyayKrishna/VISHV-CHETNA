'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { DEFAULT_CONTENT } from '@/lib/site-content-defaults'

const SiteContentContext = createContext({
  content: DEFAULT_CONTENT,
  loading: true,
  refresh: async () => {},
})

export function SiteContentProvider({ children, initialContent }) {
  const [content, setContent] = useState(initialContent || DEFAULT_CONTENT)
  const [loading, setLoading] = useState(!initialContent)

  const refresh = async () => {
    try {
      const res = await fetch('/api/content', { cache: 'no-store' })
      const data = await res.json()
      if (data?.content) setContent(data.content)
    } catch {
      // keep current / defaults
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!initialContent) refresh()
    else setLoading(false)
  }, [initialContent])

  return (
    <SiteContentContext.Provider value={{ content, loading, refresh }}>
      {children}
    </SiteContentContext.Provider>
  )
}

export function useSiteContent() {
  return useContext(SiteContentContext)
}
