'use client'

function extractYoutubeId(raw) {
  if (!raw) return null
  const input = raw.trim()

  try {
    const normalized = /^https?:\/\//i.test(input) ? input : `https://${input}`
    const u = new URL(normalized)
    const host = u.hostname.replace(/^www\./, '').toLowerCase()

    if (host === 'youtu.be') {
      const id = u.pathname.split('/').filter(Boolean)[0]
      return id && /^[\w-]{6,}$/.test(id) ? id.split('?')[0] : null
    }

    if (
      host === 'youtube.com' ||
      host === 'm.youtube.com' ||
      host === 'music.youtube.com' ||
      host === 'youtube-nocookie.com'
    ) {
      const v = u.searchParams.get('v')
      if (v && /^[\w-]{6,}$/.test(v)) return v

      const parts = u.pathname.split('/').filter(Boolean)
      const markers = ['embed', 'shorts', 'live', 'v', 'e']
      for (let i = 0; i < parts.length - 1; i++) {
        if (markers.includes(parts[i]) && /^[\w-]{6,}$/.test(parts[i + 1])) {
          return parts[i + 1]
        }
      }
    }
  } catch {
    // fall through to regex
  }

  const match = input.match(
    /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/|e\/))([A-Za-z0-9_-]{6,})/
  )
  return match?.[1] || null
}

function extractVimeoId(raw) {
  if (!raw) return null
  const match = raw.trim().match(/vimeo\.com\/(?:video\/)?(\d+)/)
  return match?.[1] || null
}

/** Convert YouTube / Vimeo / direct video URLs into a playable source. */
export function getEmbedInfo(url) {
  if (!url || typeof url !== 'string') return null
  const u = url.trim()
  if (!u) return null

  const yt = extractYoutubeId(u)
  if (yt) {
    return {
      type: 'iframe',
      src: `https://www.youtube-nocookie.com/embed/${yt}?rel=0&modestbranding=1`,
      provider: 'youtube',
    }
  }

  const vimeo = extractVimeoId(u)
  if (vimeo) {
    return {
      type: 'iframe',
      src: `https://player.vimeo.com/video/${vimeo}`,
      provider: 'vimeo',
    }
  }

  return { type: 'video', src: u, provider: 'file' }
}

export default function MediaVideo({ src, poster, className = '' }) {
  const info = getEmbedInfo(src)
  if (!info) return null

  if (info.type === 'iframe') {
    return (
      <div className={`relative w-full overflow-hidden rounded-3xl shadow-2xl aspect-video bg-black ${className}`}>
        <iframe
          src={info.src}
          title="Program video"
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <video
      src={info.src}
      poster={poster || undefined}
      controls
      playsInline
      className={`rounded-3xl shadow-2xl w-full aspect-video object-contain bg-black ${className}`}
    />
  )
}
