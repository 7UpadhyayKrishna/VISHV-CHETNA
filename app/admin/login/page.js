'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        setError('Invalid password')
        return
      }
      router.replace('/admin')
    } catch {
      setError('Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-md bg-white/80 border border-[#B8935D]/30 rounded-3xl p-8 shadow-xl">
        <div className="font-display text-2xl tracking-widest text-[#132238] mb-1">ADMIN</div>
        <p className="font-serif-lux italic text-[#6B5D4F] mb-8">Vishv Chetna content panel</p>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-12 rounded-xl mb-4"
          required
        />
        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full h-12 rounded-full gold-gradient text-navy font-semibold">
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </div>
  )
}
