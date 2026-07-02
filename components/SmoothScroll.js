'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Expose lenis for GSAP ScrollTrigger sync
    if (typeof window !== 'undefined') {
      window.__lenis = lenis
    }

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      if (typeof window !== 'undefined') window.__lenis = null
    }
  }, [])

  return children
}
