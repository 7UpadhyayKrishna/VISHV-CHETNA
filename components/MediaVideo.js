'use client'

/** Convert YouTube / Vimeo / direct video URLs into a playable source. */
export function getEmbedInfo(url) {
  if (!url || typeof url !== 'string') return null
  const u = url.trim()
  if (!u) return null

  const yt = u.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/)
  if (yt) {
    return { type: 'iframe', src: `https://www.youtube.com/embed/${yt[1]}` }
  }

  const vimeo = u.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeo) {
    return { type: 'iframe', src: `https://player.vimeo.com/video/${vimeo[1]}` }
  }

  return { type: 'video', src: u }
}

export default function MediaVideo({ src, poster, className = '' }) {
  const info = getEmbedInfo(src)
  if (!info) return null

  if (info.type === 'iframe') {
    return (
      <div className={`relative w-full overflow-hidden rounded-3xl shadow-2xl aspect-[3/4] bg-black ${className}`}>
        <iframe
          src={info.src}
          title="Program video"
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
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
      className={`rounded-3xl shadow-2xl w-full h-[600px] object-cover bg-black ${className}`}
    />
  )
}
