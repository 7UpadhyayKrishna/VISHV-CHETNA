'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { DEFAULT_CONTENT } from '@/lib/site-content-defaults'

const SECTIONS = [
  { id: 'logo', label: 'Logo' },
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'programs', label: 'Programs' },
  { id: 'lotus', label: 'Lotus' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'immersion', label: 'Immersion' },
  { id: 'events', label: 'Events' },
  { id: 'donate', label: 'Donate' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
  { id: 'footer', label: 'Footer' },
  { id: 'stats', label: 'Stats counters' },
]

function setPath(obj, path, value) {
  const parts = path.split('.')
  const next = structuredClone(obj)
  let cur = next
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i]
    const nextKey = parts[i + 1]
    const isNextIndex = /^\d+$/.test(nextKey)
    if (/^\d+$/.test(key)) {
      const idx = Number(key)
      if (cur[idx] == null) cur[idx] = isNextIndex ? [] : {}
      cur = cur[idx]
    } else {
      if (cur[key] == null) cur[key] = isNextIndex ? [] : {}
      cur = cur[key]
    }
  }
  const last = parts[parts.length - 1]
  if (/^\d+$/.test(last)) cur[Number(last)] = value
  else cur[last] = value
  return next
}

function Field({ label, value, onChange, multiline }) {
  return (
    <label className="block mb-4">
      <span className="text-xs tracking-widest uppercase text-[#6B5D4F] mb-1 block">{label}</span>
      {multiline ? (
        <Textarea value={value ?? ''} onChange={(e) => onChange(e.target.value)} className="rounded-xl min-h-[100px]" />
      ) : (
        <Input value={value ?? ''} onChange={(e) => onChange(e.target.value)} className="h-11 rounded-xl" />
      )}
    </label>
  )
}

function ImageField({ label, value, onChange }) {
  const [urlDraft, setUrlDraft] = useState(value || '')
  const [uploading, setUploading] = useState(false)

  useEffect(() => { setUrlDraft(value || '') }, [value])

  const upload = async (file) => {
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      onChange(data.url)
      setUrlDraft(data.url)
      toast.success('Image uploaded')
    } catch (e) {
      toast.error(e.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const applyUrl = () => {
    onChange(urlDraft.trim())
    toast.success('URL applied')
  }

  const clear = async () => {
    if (value?.startsWith('/uploads/')) {
      await fetch(`/api/admin/upload?path=${encodeURIComponent(value)}`, { method: 'DELETE' })
    }
    onChange('')
    setUrlDraft('')
  }

  return (
    <div className="mb-6 p-4 rounded-2xl border border-[#B8935D]/25 bg-white/60">
      <div className="text-xs tracking-widest uppercase text-[#6B5D4F] mb-3">{label}</div>
      {value ? (
        <img src={value} alt="" className="w-full max-h-48 object-cover rounded-xl mb-3 border border-[#B8935D]/20" />
      ) : (
        <div className="h-28 rounded-xl bg-[#E8E3D6] mb-3 flex items-center justify-center text-sm text-[#6B5D4F]">No image</div>
      )}
      <div className="flex flex-wrap gap-2 mb-3">
        <label className="cursor-pointer">
          <span className="inline-flex h-10 px-4 items-center rounded-full gold-gradient text-navy text-sm font-semibold">
            {uploading ? 'Uploading…' : 'Upload'}
          </span>
          <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={(e) => upload(e.target.files?.[0])} />
        </label>
        <Button type="button" variant="outline" className="h-10 rounded-full" onClick={clear}>Clear</Button>
      </div>
      <div className="flex gap-2">
        <Input value={urlDraft} onChange={(e) => setUrlDraft(e.target.value)} placeholder="Paste image URL" className="h-10 rounded-xl" />
        <Button type="button" className="h-10 rounded-full gold-gradient text-navy" onClick={applyUrl}>Use URL</Button>
      </div>
    </div>
  )
}

function VideoField({ label, value, onChange }) {
  const [urlDraft, setUrlDraft] = useState(value || '')
  const [uploading, setUploading] = useState(false)

  useEffect(() => { setUrlDraft(value || '') }, [value])

  const upload = async (file) => {
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      onChange(data.url)
      setUrlDraft(data.url)
      toast.success('Video uploaded')
    } catch (e) {
      toast.error(e.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const applyUrl = () => {
    onChange(urlDraft.trim())
    toast.success('Video link applied')
  }

  const clear = async () => {
    if (value?.startsWith('/uploads/')) {
      await fetch(`/api/admin/upload?path=${encodeURIComponent(value)}`, { method: 'DELETE' })
    }
    onChange('')
    setUrlDraft('')
  }

  return (
    <div className="mb-6 p-4 rounded-2xl border border-[#B8935D]/25 bg-white/60">
      <div className="text-xs tracking-widest uppercase text-[#6B5D4F] mb-3">{label}</div>
      <p className="text-xs text-[#6B5D4F] mb-3">Paste a YouTube, Vimeo, or direct video link — or upload an MP4/WebM.</p>
      {value ? (
        <div className="mb-3 rounded-xl bg-[#132238] text-white/80 text-xs p-3 break-all border border-[#B8935D]/20">
          {value}
        </div>
      ) : (
        <div className="h-16 rounded-xl bg-[#E8E3D6] mb-3 flex items-center justify-center text-sm text-[#6B5D4F]">No video</div>
      )}
      <div className="flex flex-wrap gap-2 mb-3">
        <label className="cursor-pointer">
          <span className="inline-flex h-10 px-4 items-center rounded-full gold-gradient text-navy text-sm font-semibold">
            {uploading ? 'Uploading…' : 'Upload video'}
          </span>
          <input type="file" accept="video/mp4,video/webm,video/quicktime,video/ogg" className="hidden" disabled={uploading} onChange={(e) => upload(e.target.files?.[0])} />
        </label>
        <Button type="button" variant="outline" className="h-10 rounded-full" onClick={clear}>Clear</Button>
      </div>
      <div className="flex gap-2">
        <Input
          value={urlDraft}
          onChange={(e) => setUrlDraft(e.target.value)}
          placeholder="https://youtube.com/... or https://…/video.mp4"
          className="h-10 rounded-xl"
        />
        <Button type="button" className="h-10 rounded-full gold-gradient text-navy shrink-0" onClick={applyUrl}>Use link</Button>
      </div>
    </div>
  )
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [section, setSection] = useState('hero')
  const [content, setContent] = useState(DEFAULT_CONTENT)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [previewKey, setPreviewKey] = useState(0)
  const [programIdx, setProgramIdx] = useState(0)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/content', { cache: 'no-store' })
      if (res.status === 401) {
        router.replace('/admin/login')
        return
      }
      const data = await res.json()
      if (data.content) setContent(data.content)
    } catch {
      toast.error('Failed to load content')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const update = (path, value) => setContent((c) => setPath(c, path, value))

  const save = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Save failed')
      setContent(data.content)
      setPreviewKey((k) => k + 1)
      toast.success('Saved — preview refreshed')
    } catch (e) {
      toast.error(e.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
  }

  const editor = useMemo(() => {
    if (loading) return <p className="text-[#6B5D4F]">Loading…</p>
    const c = content

    if (section === 'logo') {
      return <ImageField label="Site logo" value={c.logo} onChange={(v) => update('logo', v)} />
    }

    if (section === 'hero') {
      return (
        <div>
          <ImageField label="Hero background" value={c.hero.background} onChange={(v) => update('hero.background', v)} />
          <Field label="Eyebrow" value={c.hero.eyebrow} onChange={(v) => update('hero.eyebrow', v)} />
          <Field label="Line 1" value={c.hero.line1} onChange={(v) => update('hero.line1', v)} />
          <Field label="Line 2" value={c.hero.line2} onChange={(v) => update('hero.line2', v)} />
          <Field label="Line 3" value={c.hero.line3} onChange={(v) => update('hero.line3', v)} />
          <Field label="Subtitle" value={c.hero.subtitle} onChange={(v) => update('hero.subtitle', v)} multiline />
          <Field label="Primary CTA" value={c.hero.ctaPrimary} onChange={(v) => update('hero.ctaPrimary', v)} />
          <Field label="Secondary CTA" value={c.hero.ctaSecondary} onChange={(v) => update('hero.ctaSecondary', v)} />
          <Field label="Marquee (comma-separated)" value={(c.hero.marquee || []).join(', ')} onChange={(v) => update('hero.marquee', v.split(',').map((s) => s.trim()).filter(Boolean))} />
        </div>
      )
    }

    if (section === 'about') {
      return (
        <div>
          <ImageField label="Portrait image" value={c.about.portrait} onChange={(v) => update('about.portrait', v)} />
          <Field label="Eyebrow" value={c.about.eyebrow} onChange={(v) => update('about.eyebrow', v)} />
          <Field label="Title" value={c.about.title} onChange={(v) => update('about.title', v)} />
          <Field label="Title accent" value={c.about.titleAccent} onChange={(v) => update('about.titleAccent', v)} />
          <Field label="Body" value={c.about.body} onChange={(v) => update('about.body', v)} multiline />
          <Field label="Portrait badge" value={c.about.portraitBadge} onChange={(v) => update('about.portraitBadge', v)} />
          <Field label="Portrait caption" value={c.about.portraitCaption} onChange={(v) => update('about.portraitCaption', v)} />
          {(c.about.cards || []).map((card, i) => (
            <div key={i} className="border-t border-[#B8935D]/20 pt-4 mt-4">
              <Field label={`Card ${i + 1} title`} value={card.title} onChange={(v) => update(`about.cards.${i}.title`, v)} />
              <Field label={`Card ${i + 1} text`} value={card.text} onChange={(v) => update(`about.cards.${i}.text`, v)} multiline />
            </div>
          ))}
          {(c.about.stats || []).map((stat, i) => (
            <div key={i} className="grid grid-cols-2 gap-3">
              <Field label={`Stat ${i + 1} number`} value={stat.number} onChange={(v) => update(`about.stats.${i}.number`, v)} />
              <Field label={`Stat ${i + 1} label`} value={stat.label} onChange={(v) => update(`about.stats.${i}.label`, v)} />
            </div>
          ))}
        </div>
      )
    }

    if (section === 'programs') {
      const p = c.programs?.[programIdx]
      if (!p) return null
      return (
        <div>
          <div className="flex flex-wrap gap-2 mb-6">
            {c.programs.map((prog, i) => (
              <button
                key={prog.slug}
                type="button"
                onClick={() => setProgramIdx(i)}
                className={`px-3 py-1.5 rounded-full text-xs tracking-wider ${i === programIdx ? 'gold-gradient text-navy' : 'bg-white border border-[#B8935D]/30'}`}
              >
                {prog.title}
              </button>
            ))}
          </div>
          <Field label="Section eyebrow" value={c.programsSection.eyebrow} onChange={(v) => update('programsSection.eyebrow', v)} />
          <Field label="Section title" value={c.programsSection.title} onChange={(v) => update('programsSection.title', v)} />
          <Field label="Section accent" value={c.programsSection.titleAccent} onChange={(v) => update('programsSection.titleAccent', v)} />
          <Field label="Section subtitle" value={c.programsSection.subtitle} onChange={(v) => update('programsSection.subtitle', v)} multiline />
          <hr className="my-6 border-[#B8935D]/20" />
          <ImageField label="Program image (card + page)" value={p.img} onChange={(v) => update(`programs.${programIdx}.img`, v)} />
          <VideoField label="Program video (page)" value={p.video || ''} onChange={(v) => update(`programs.${programIdx}.video`, v)} />
          <Field label="Title" value={p.title} onChange={(v) => update(`programs.${programIdx}.title`, v)} />
          <Field label="Tag" value={p.tag} onChange={(v) => update(`programs.${programIdx}.tag`, v)} />
          <Field label="Card description" value={p.desc} onChange={(v) => update(`programs.${programIdx}.desc`, v)} multiline />
          <Field label="Page title" value={p.pageTitle} onChange={(v) => update(`programs.${programIdx}.pageTitle`, v)} />
          <Field label="Page title accent" value={p.pageTitleAccent} onChange={(v) => update(`programs.${programIdx}.pageTitleAccent`, v)} />
          <Field label="Page body" value={p.pageBody} onChange={(v) => update(`programs.${programIdx}.pageBody`, v)} multiline />
          <Field label="CTA" value={p.cta} onChange={(v) => update(`programs.${programIdx}.cta`, v)} />
          <Field label="Benefits (one per line)" value={(p.benefits || []).join('\n')} onChange={(v) => update(`programs.${programIdx}.benefits`, v.split('\n').map((s) => s.trim()).filter(Boolean))} multiline />
          <Field label="Duration" value={p.duration} onChange={(v) => update(`programs.${programIdx}.duration`, v)} />
          <Field label="Class size" value={p.classSize} onChange={(v) => update(`programs.${programIdx}.classSize`, v)} />
          <Field label="Schedule" value={p.schedule} onChange={(v) => update(`programs.${programIdx}.schedule`, v)} />
        </div>
      )
    }

    if (section === 'lotus') {
      return (
        <div>
          <ImageField label="Lotus / Guru image" value={c.lotus.image} onChange={(v) => update('lotus.image', v)} />
          <Field label="Eyebrow" value={c.lotus.eyebrow} onChange={(v) => update('lotus.eyebrow', v)} />
          <Field label="Title" value={c.lotus.title} onChange={(v) => update('lotus.title', v)} />
          <Field label="Title accent" value={c.lotus.titleAccent} onChange={(v) => update('lotus.titleAccent', v)} />
          <Field label="Body" value={c.lotus.body} onChange={(v) => update('lotus.body', v)} multiline />
          <Field label="Tags (comma-separated)" value={(c.lotus.tags || []).join(', ')} onChange={(v) => update('lotus.tags', v.split(',').map((s) => s.trim()).filter(Boolean))} />
        </div>
      )
    }

    if (section === 'gallery') {
      return (
        <div>
          <Field label="Eyebrow" value={c.gallery.eyebrow} onChange={(v) => update('gallery.eyebrow', v)} />
          <Field label="Title" value={c.gallery.title} onChange={(v) => update('gallery.title', v)} />
          <Field label="Title accent" value={c.gallery.titleAccent} onChange={(v) => update('gallery.titleAccent', v)} />
          {(c.gallery.images || []).map((img, i) => (
            <div key={i} className="border-t border-[#B8935D]/20 pt-4 mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Image {i + 1}</span>
                <Button
                  type="button"
                  variant="outline"
                  className="h-8 rounded-full text-xs"
                  onClick={() => {
                    const next = c.gallery.images.filter((_, j) => j !== i)
                    update('gallery.images', next)
                  }}
                >
                  Remove
                </Button>
              </div>
              <ImageField label="Source" value={img.src} onChange={(v) => update(`gallery.images.${i}.src`, v)} />
              <Field label="Height class" value={img.h} onChange={(v) => update(`gallery.images.${i}.h`, v)} />
            </div>
          ))}
          <Button
            type="button"
            className="mt-4 rounded-full gold-gradient text-navy"
            onClick={() => update('gallery.images', [...(c.gallery.images || []), { src: '', h: 'h-72' }])}
          >
            Add gallery image
          </Button>
        </div>
      )
    }

    if (section === 'immersion') {
      return (
        <div>
          <ImageField label="Background" value={c.immersion.background} onChange={(v) => update('immersion.background', v)} />
          <Field label="Eyebrow" value={c.immersion.eyebrow} onChange={(v) => update('immersion.eyebrow', v)} />
          <Field label="Line 1" value={c.immersion.line1} onChange={(v) => update('immersion.line1', v)} />
          <Field label="Line 2" value={c.immersion.line2} onChange={(v) => update('immersion.line2', v)} />
          <Field label="Line 3" value={c.immersion.line3} onChange={(v) => update('immersion.line3', v)} />
        </div>
      )
    }

    if (section === 'events') {
      return (
        <div>
          <Field label="Eyebrow" value={c.eventsSection.eyebrow} onChange={(v) => update('eventsSection.eyebrow', v)} />
          <Field label="Title" value={c.eventsSection.title} onChange={(v) => update('eventsSection.title', v)} />
          <Field label="Title accent" value={c.eventsSection.titleAccent} onChange={(v) => update('eventsSection.titleAccent', v)} />
          {(c.events || []).map((ev, i) => (
            <div key={i} className="border-t border-[#B8935D]/20 pt-4 mt-4">
              <ImageField label={`Event ${i + 1} image`} value={ev.img} onChange={(v) => update(`events.${i}.img`, v)} />
              <Field label="Title" value={ev.title} onChange={(v) => update(`events.${i}.title`, v)} />
              <Field label="Date (YYYY-MM-DD)" value={ev.date} onChange={(v) => update(`events.${i}.date`, v)} />
              <Field label="Location" value={ev.location} onChange={(v) => update(`events.${i}.location`, v)} />
            </div>
          ))}
        </div>
      )
    }

    if (section === 'donate') {
      return (
        <div>
          <Field label="Eyebrow" value={c.donate.eyebrow} onChange={(v) => update('donate.eyebrow', v)} />
          <Field label="Title" value={c.donate.title} onChange={(v) => update('donate.title', v)} />
          <Field label="Title accent" value={c.donate.titleAccent} onChange={(v) => update('donate.titleAccent', v)} />
          <Field label="Body" value={c.donate.body} onChange={(v) => update('donate.body', v)} multiline />
          <Field label="Raised" value={String(c.donate.raised)} onChange={(v) => update('donate.raised', Number(v) || 0)} />
          <Field label="Goal" value={String(c.donate.goal)} onChange={(v) => update('donate.goal', Number(v) || 0)} />
          <Field label="Amounts (comma-separated)" value={(c.donate.amounts || []).join(', ')} onChange={(v) => update('donate.amounts', v.split(',').map((s) => Number(s.trim())).filter((n) => !Number.isNaN(n)))} />
          <Field label="Card title" value={c.donate.cardTitle} onChange={(v) => update('donate.cardTitle', v)} />
          <Field label="Card subtitle" value={c.donate.cardSubtitle} onChange={(v) => update('donate.cardSubtitle', v)} />
          <Field label="CTA" value={c.donate.cta} onChange={(v) => update('donate.cta', v)} />
        </div>
      )
    }

    if (section === 'testimonials') {
      return (
        <div>
          <Field label="Eyebrow" value={c.testimonialsSection.eyebrow} onChange={(v) => update('testimonialsSection.eyebrow', v)} />
          <Field label="Title" value={c.testimonialsSection.title} onChange={(v) => update('testimonialsSection.title', v)} />
          <Field label="Title accent" value={c.testimonialsSection.titleAccent} onChange={(v) => update('testimonialsSection.titleAccent', v)} />
          {(c.testimonials || []).map((t, i) => (
            <div key={i} className="border-t border-[#B8935D]/20 pt-4 mt-4">
              <Field label="Name" value={t.name} onChange={(v) => update(`testimonials.${i}.name`, v)} />
              <Field label="Role / city" value={t.role} onChange={(v) => update(`testimonials.${i}.role`, v)} />
              <Field label="Quote" value={t.text} onChange={(v) => update(`testimonials.${i}.text`, v)} multiline />
            </div>
          ))}
        </div>
      )
    }

    if (section === 'contact') {
      return (
        <div>
          <Field label="Eyebrow" value={c.contact.eyebrow} onChange={(v) => update('contact.eyebrow', v)} />
          <Field label="Title" value={c.contact.title} onChange={(v) => update('contact.title', v)} />
          <Field label="Title accent" value={c.contact.titleAccent} onChange={(v) => update('contact.titleAccent', v)} />
          <Field label="Body" value={c.contact.body} onChange={(v) => update('contact.body', v)} multiline />
          <Field label="Address" value={c.contact.address} onChange={(v) => update('contact.address', v)} />
          <Field label="Email" value={c.contact.email} onChange={(v) => update('contact.email', v)} />
          <Field label="Phone" value={c.contact.phone} onChange={(v) => update('contact.phone', v)} />
          <Field label="Form title" value={c.contact.formTitle} onChange={(v) => update('contact.formTitle', v)} />
          <Field label="Form subtitle" value={c.contact.formSubtitle} onChange={(v) => update('contact.formSubtitle', v)} />
        </div>
      )
    }

    if (section === 'footer') {
      return (
        <div>
          <Field label="Brand" value={c.footer.brand} onChange={(v) => update('footer.brand', v)} />
          <Field label="Tagline" value={c.footer.tagline} onChange={(v) => update('footer.tagline', v)} />
          <Field label="Body" value={c.footer.body} onChange={(v) => update('footer.body', v)} multiline />
          <Field label="Mantra (Sanskrit)" value={c.footer.mantra} onChange={(v) => update('footer.mantra', v)} />
          <Field label="Mantra (English)" value={c.footer.mantraEn} onChange={(v) => update('footer.mantraEn', v)} />
        </div>
      )
    }

    if (section === 'stats') {
      return (
        <div>
          <Field label="People guided" value={String(c.stats.peopleGuided)} onChange={(v) => update('stats.peopleGuided', Number(v) || 0)} />
          <Field label="Sessions" value={String(c.stats.sessions)} onChange={(v) => update('stats.sessions', Number(v) || 0)} />
          <Field label="Years" value={String(c.stats.years)} onChange={(v) => update('stats.years', Number(v) || 0)} />
          <Field label="Camps" value={String(c.stats.camps)} onChange={(v) => update('stats.camps', Number(v) || 0)} />
        </div>
      )
    }

    return null
  }, [section, content, loading, programIdx])

  return (
    <div className="h-screen overflow-hidden bg-[#F5F1E8] text-[#3D342A] flex flex-col">
      <header className="border-b border-[#B8935D]/25 bg-white/70 backdrop-blur shrink-0 z-20">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div>
            <div className="font-display tracking-widest text-sm">VISHV CHETNA ADMIN</div>
            <div className="text-xs text-[#6B5D4F]">Edit images & copy · preview homepage</div>
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" onClick={save} disabled={saving || loading} className="rounded-full gold-gradient text-navy font-semibold">
              {saving ? 'Saving…' : 'Save changes'}
            </Button>
            <Button type="button" variant="outline" onClick={logout} className="rounded-full">Logout</Button>
          </div>
        </div>
      </header>

      <div className="flex-1 min-h-0 max-w-[1600px] w-full mx-auto px-4 py-4 grid lg:grid-cols-[220px_1fr_1fr] gap-4">
        <aside className="space-y-1 overflow-y-auto min-h-0 pr-1">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSection(s.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition ${
                section === s.id ? 'gold-gradient text-navy font-semibold' : 'hover:bg-white/70'
              }`}
            >
              {s.label}
            </button>
          ))}
        </aside>

        <section className="bg-white/70 border border-[#B8935D]/20 rounded-3xl p-6 min-h-0 overflow-y-auto overscroll-contain">
          <h2 className="font-display text-xl tracking-wider mb-6">{SECTIONS.find((s) => s.id === section)?.label}</h2>
          {editor}
        </section>

        <section className="hidden lg:flex flex-col bg-[#132238] rounded-3xl overflow-hidden border border-[#B8935D]/30 min-h-0">
          <div className="px-4 py-2 text-xs tracking-widest text-[#E7C77A] border-b border-white/10 shrink-0">HOMEPAGE PREVIEW</div>
          <iframe
            key={previewKey}
            title="Homepage preview"
            src={`/?preview=${previewKey}`}
            className="w-full flex-1 min-h-0 bg-white"
          />
        </section>
      </div>
    </div>
  )
}
