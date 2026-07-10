'use client'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
  AnimatePresence,
} from 'framer-motion'
import {
  Flame, Sparkles, Sun, Moon, Heart, Leaf, Waves, Mountain, Star, ArrowRight,
  Menu, X, Play, MapPin, Mail, Phone, Send, Instagram, Youtube, Facebook, Twitter,
  ChevronRight, Circle, Wind, Feather, Compass, ChevronDown, Volume2, VolumeX, Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

const formatNumber = (value) => value.toLocaleString('en-IN')

// Dynamic 3D + interactive imports (SSR-safe)
const ChakraWheel = dynamic(() => import('@/components/ChakraWheel'), { ssr: false })

// ============ IMAGE ASSETS ============
const IMG = {
  logo: 'https://weighbridge-management-system.s3.ap-south-1.amazonaws.com/vct.png',
  heroVideo: 'https://videos.pexels.com/video-files/4058466/4058466-uhd_2560_1440_24fps.mp4',
  hero1: 'https://images.pexels.com/photos/30778937/pexels-photo-30778937.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1920',
  hero2: 'https://images.pexels.com/photos/38087043/pexels-photo-38087043.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1920',
  mountains1: 'https://images.unsplash.com/photo-1504370805625-d32c54b16100?auto=format&fit=crop&w=1920&q=80',
  mountains2: 'https://images.unsplash.com/photo-1505486173248-197f101f6b4d?auto=format&fit=crop&w=1920&q=80',
  peak: 'https://images.unsplash.com/photo-1466690468488-763ee1537a64?auto=format&fit=crop&w=1920&q=80',
  temple1: 'https://images.unsplash.com/photo-1620673306248-bad4dfe1e005?auto=format&fit=crop&w=1600&q=80',
  temple2: 'https://images.unsplash.com/photo-1648450934224-2dfd28a9e316?auto=format&fit=crop&w=1600&q=80',
  meditation: 'https://images.unsplash.com/photo-1660240141249-807c9731931e?auto=format&fit=crop&w=1200&q=80',
  yoga: 'https://images.unsplash.com/photo-1712934665512-555960ea3680?auto=format&fit=crop&w=1200&q=80',
  lotus: 'https://images.unsplash.com/photo-1616435577207-ca90abc6b732?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHwyfHxsb3R1cyUyMGZsb3dlcnxlbnwwfHx8fDE3ODI5NTg0Mjh8MA&ixlib=rb-4.1.0&q=85',
  panch: 'https://images.unsplash.com/photo-1646815672058-c203442b9c0d?auto=format&fit=crop&w=1200&q=80',
  reiki: 'https://images.unsplash.com/photo-1619136652739-98f01e200732?auto=format&fit=crop&w=1200&q=80',
}

// ============ LOADER ============
function Loader({ onDone }) {
  useEffect(() => {
    // Fallback: dismiss after 4.5s no matter what
    const t = setTimeout(onDone, 4500)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      style={{ background: '#FAF9F4' }}
    >
      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              background: '#C8A14A',
              boxShadow: '0 0 8px rgba(200,161,74,0.7)',
            }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 3 + (i % 5), repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>

      {/* Warm radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(200,161,74,0.2) 0%, rgba(200,161,74,0) 60%)' }} />

      {/* Rotating gold ring behind logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
        animate={{ opacity: 1, scale: 1, rotate: 360 }}
        transition={{
          opacity: { duration: 0.8 },
          scale: { duration: 0.8 },
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
        }}
        className="absolute w-[min(70vw,540px)] aspect-square"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="lgGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F5DC96" />
              <stop offset="50%" stopColor="#C8A14A" />
              <stop offset="100%" stopColor="#8E6E22" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="94" fill="none" stroke="url(#lgGold)" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.6" />
          <circle cx="100" cy="100" r="88" fill="none" stroke="url(#lgGold)" strokeWidth="1" opacity="0.4" />
        </svg>
      </motion.div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative w-[min(55vw,400px)] aspect-square flex items-center justify-center"
      >
        <motion.img
          src={IMG.logo}
          alt="Vishv Chetna Trust"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full object-contain"
        />
      </motion.div>

      {/* Text below logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center"
      >
        <div className="font-display text-sm tracking-[0.5em] gold-text mb-2">VISHV CHETNA TRUST</div>
        <div className="font-serif-lux italic text-navy/60 text-sm tracking-widest">The Enlightened World</div>
      </motion.div>

      {/* Bottom line + skip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <button onClick={onDone} className="text-[10px] tracking-[0.4em] text-navy/50 hover:text-gold transition uppercase">
          Skip Intro
        </button>
      </motion.div>
    </motion.div>
  )
}

// ============ CUSTOM CURSOR ============
function CustomCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40 })
  const sy = useSpring(y, { stiffness: 500, damping: 40 })
  const [hover, setHover] = useState(false)

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    const over = (e) => {
      const el = e.target
      if (el.closest && el.closest('a,button,[data-cursor]')) setHover(true)
      else setHover(false)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [x, y])

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9999] hidden md:block"
        style={{ translateX: sx, translateY: sy, left: -6, top: -6 }}
      >
        <motion.div
          animate={{ scale: hover ? 2.6 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="w-3 h-3 rounded-full bg-gold"
          style={{ boxShadow: '0 0 20px rgba(200,161,74,0.8), 0 0 40px rgba(200,161,74,0.5)' }}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed z-[9998] hidden md:block"
        style={{ translateX: sx, translateY: sy, left: -20, top: -20 }}
      >
        <motion.div
          animate={{ scale: hover ? 1.4 : 1, opacity: hover ? 0.4 : 0.25 }}
          className="w-10 h-10 rounded-full border border-gold"
        />
      </motion.div>
    </>
  )
}

// ============ SCROLL PROGRESS ============
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[80] gold-gradient"
    />
  )
}

// ============ NAVIGATION ============
function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Programs', href: '#programs' },
    { label: 'Chakras', href: '#chakras' },
    { label: 'Journey', href: '#journey' },
    { label: 'Meditate', href: '#meditate' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Events', href: '#events' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-500 ${
        scrolled ? 'glass-natural py-3 border-b border-gold/30 shadow-md' : 'py-5 bg-gradient-to-b from-black/40 to-transparent'
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#top" className="group">
          <div className="relative w-16 h-16 rounded-full bg-white p-2 shadow-lg group-hover:shadow-xl transition-all duration-300">
            <img src={IMG.logo} alt="Vishv Chetna Trust" className="w-full h-full object-contain" />
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`relative px-4 py-2 text-sm font-body font-medium transition-colors group ${
                scrolled ? 'text-earth-dark hover:text-gold' : 'text-white hover:text-gold'
              }`}
            >
              {l.label}
              <span className="absolute bottom-0 left-1/2 w-0 h-px bg-gold group-hover:w-6 group-hover:-translate-x-3 transition-all" />
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <a href="#donate">
            <Button className="rounded-full gold-gradient text-navy font-semibold px-6 shadow-md hover:shadow-lg transition-all">
              <Heart className="w-4 h-4 mr-2" /> Donate
            </Button>
          </a>
        </div>

        <button className={`lg:hidden transition-colors ${scrolled ? 'text-earth-dark' : 'text-white'}`} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden glass-natural border-t border-gold/30"
          >
            <div className="container py-6 flex flex-col gap-3">
              {links.map((l) => (
                <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                  className="text-earth-dark hover:text-gold py-2 font-medium transition-colors">{l.label}</a>
              ))}
              <a href="#donate" onClick={() => setOpen(false)}>
                <Button className="w-full rounded-full gold-gradient text-navy font-semibold mt-2 shadow-md">
                  <Heart className="w-4 h-4 mr-2" /> Donate
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// ============ FLOATING PARTICLES ============
function Particles({ count = 40, color = '#C8A14A' }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => {
        const seed = i * 137 + 13
        const x = (seed * 17) % 100
        const y = (seed * 23) % 100
        const size = 1 + ((seed * 7) % 4)
        const dur = 6 + ((seed * 3) % 8)
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              background: color,
              boxShadow: `0 0 ${size * 4}px ${color}`,
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, ((seed % 2) ? 20 : -20), 0],
              opacity: [0.2, 0.9, 0.2],
            }}
            transition={{ duration: dur, repeat: Infinity, delay: (i % 10) * 0.5 }}
          />
        )
      })}
    </div>
  )
}

// ============ HERO ============
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  const onMove = (e) => {
    const r = heroRef.current?.getBoundingClientRect()
    if (!r) return
    setMouse({ x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2 })
  }

  return (
    <section id="top" ref={ref} className="relative min-h-screen w-full overflow-hidden bg-black">
      <div ref={heroRef} onMouseMove={onMove} className="absolute inset-0">
        {/* Beautiful background image */}
        <motion.div style={{ scale, y: y1 }} className="absolute inset-0">
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${IMG.hero1})`,
              transform: `translate3d(${mouse.x * -15}px, ${mouse.y * -10}px, 0) scale(1.08)`,
              transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          />
        </motion.div>

        {/* Cinematic vignette + dark overlays */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.35) 75%, rgba(10,18,32,0.85) 100%)' }} />
        {/* Warm golden atmosphere */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(200,161,74,0.25), transparent 70%)' }} />

        <Particles count={35} color="#F5DC96" />
      </div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 min-h-screen flex flex-col items-center justify-center container text-center px-4 pt-24 pb-16">
        {/* Small logo badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.9, ease: 'easeOut' }}
          className="mb-8"
        >
          <img src={IMG.logo} alt="Vishv Chetna Trust"
            className="w-28 md:w-32 h-auto opacity-95"
            style={{ mixBlendMode: 'screen', filter: 'drop-shadow(0 0 30px rgba(200,161,74,0.6))' }} />
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="inline-flex items-center gap-4 mb-8"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span className="text-[11px] tracking-[0.5em] text-white font-semibold uppercase drop-shadow-lg">The Enlightened World</span>
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
        </motion.div>

        {/* Main heading — eye-catching kinetic type */}
        <div className="relative w-full">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display leading-[0.9] text-white tracking-tight mx-auto"
            style={{ textShadow: '0 4px 40px rgba(0,0,0,0.7), 0 2px 20px rgba(0,0,0,0.5)' }}
          >
            <span className="block" style={{ fontSize: 'clamp(3rem, 11vw, 10rem)', letterSpacing: '0.02em' }}>
              AWAKEN
            </span>
            <span className="block font-serif-lux italic font-normal text-white drop-shadow-2xl mt-2"
              style={{ fontSize: 'clamp(2rem, 7vw, 6.5rem)', textShadow: '0 4px 30px rgba(0,0,0,0.8), 0 2px 15px rgba(0,0,0,0.6)' }}>
              your inner
            </span>
            <motion.span
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 1.6, ease: [0.2, 0.8, 0.2, 1] }}
              className="block font-display font-bold text-gold drop-shadow-2xl mt-1 leading-none"
              style={{ fontSize: 'clamp(2.2rem, 8vw, 8rem)', letterSpacing: '-0.02em', textShadow: '0 4px 30px rgba(0,0,0,0.7), 0 2px 15px rgba(184,147,93,0.5)' }}
            >
              CONSCIOUSNESS
            </motion.span>
          </motion.h1>

          {/* Decorative gold rays behind the text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ delay: 1.2, duration: 2 }}
            className="absolute inset-0 pointer-events-none -z-10"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] max-w-[100vw] max-h-[100vw]"
              style={{ background: 'radial-gradient(circle, rgba(200,161,74,0.25) 0%, rgba(200,161,74,0) 60%)' }} />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 1 }}
          className="mt-10 max-w-2xl text-white/85 text-lg md:text-xl font-serif-lux italic leading-relaxed"
        >
          Discover meditation, healing, yoga, and ancient wisdom — a sacred path to transform your life, from within.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.9 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <a href="#programs">
            <Button size="lg" className="magnetic-btn h-14 px-9 rounded-full gold-gradient text-navy font-semibold text-base glow-gold-strong hover:scale-[1.03] transition">
              Explore Programs <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </a>
          <a href="#donate">
            <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-gold/60 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 hover:border-gold font-semibold text-base">
              <Heart className="mr-2 w-4 h-4" /> Donate
            </Button>
          </a>
        </motion.div>

        {/* Infinite marquee of practices */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 1 }}
          className="mt-16 w-full max-w-4xl overflow-hidden relative"
          style={{
            maskImage: 'linear-gradient(90deg, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent, black 15%, black 85%, transparent)',
          }}
        >
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex whitespace-nowrap gap-12"
          >
            {[...Array(2)].map((_, k) => (
              <div key={k} className="flex gap-12 shrink-0">
                {['Kundalini Yoga', 'Meditation', 'Reiki Healing', 'Panch Karma', 'Past Life Regression', 'Moksha', 'Ancient Wisdom', 'Ayurveda'].map((w) => (
                  <span key={w} className="font-display text-sm tracking-[0.35em] text-gold/70 uppercase flex items-center gap-12">
                    {w}
                    <span className="w-1 h-1 rounded-full bg-gold" />
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2 text-white drop-shadow-lg">
          <span className="text-[10px] tracking-[0.4em] font-semibold">SCROLL</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

// ============ LOTUS ICON (SVG) ============
function LotusIcon({ className = 'w-10 h-10' }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <g fill="currentColor" opacity="0.9">
        <path d="M50 85 C 30 75, 20 55, 25 40 C 35 45, 45 55, 50 85 Z" />
        <path d="M50 85 C 70 75, 80 55, 75 40 C 65 45, 55 55, 50 85 Z" />
        <path d="M50 85 C 35 70, 30 45, 40 30 C 45 40, 50 55, 50 85 Z" />
        <path d="M50 85 C 65 70, 70 45, 60 30 C 55 40, 50 55, 50 85 Z" />
        <path d="M50 85 C 48 60, 48 40, 50 20 C 52 40, 52 60, 50 85 Z" />
      </g>
    </svg>
  )
}

// ============ SECTION HEADING ============
function SectionEyebrow({ children }) {
  return (
    <div className="inline-flex items-center gap-3 mb-4">
      <span className="h-px w-8 bg-gold" />
      <span className="text-[11px] tracking-[0.35em] font-medium text-gold uppercase">{children}</span>
      <span className="h-px w-8 bg-gold" />
    </div>
  )
}

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============ ABOUT ============
function About() {
  const cards = [
    { icon: Compass, title: 'Our Mission', text: 'To awaken humanity to its highest potential through ancient wisdom, meditation, and healing practices — one soul at a time.' },
    { icon: Sun, title: 'Our Vision', text: 'An enlightened world where every being lives in harmony, guided by consciousness, love, and inner peace.' },
    { icon: Feather, title: 'Our Values', text: 'Compassion, authenticity, sacred service, universal love, and unwavering devotion to truth and liberation.' },
  ]

  const stats = [
    { number: '6+', label: 'Sacred Programs', icon: Sparkles },
    { number: '∞', label: 'Potential to Transform', icon: Star },
    { number: '24/7', label: 'Guidance Available', icon: Sun },
  ]

  return (
    <section id="about" className="relative py-32 bg-gradient-to-b from-warmcream via-sand to-warmcream overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 paper-texture opacity-100" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl" />

      <div className="container relative">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <Reveal>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-px w-16 bg-gold" />
              <span className="text-xs tracking-[0.3em] font-medium text-gold uppercase">About Us</span>
              <span className="h-px w-16 bg-gold" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-7xl leading-[1.05] text-earth-dark mb-6">
              Guiding souls toward
              <span className="block font-serif-lux italic gold-text mt-2">divine awakening.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-earth-med text-xl leading-relaxed font-serif-lux max-w-3xl mx-auto">
              Vishv Chetna Trust is a newly established sacred space dedicated to preserving ancient Indian wisdom and
              sharing it with the world. Through meditation, yoga, healing, and timeless spiritual practices —
              we help you rediscover the light that has always lived within you.
            </p>
          </Reveal>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20 items-center">
          {/* Left: Enhanced Image */}
          <Reveal>
            <div className="relative">
              {/* Decorative corner elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold/30 rounded-tl-3xl" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold/30 rounded-br-3xl" />
              
              <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                <motion.img
                  src="/videos/yoga-guruji.png"
                  alt="Yoga Guruji"
                  className="w-full h-[620px] object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
                {/* Overlay gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-earth-dark/70 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Overlay text */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="glass-natural rounded-2xl p-6 backdrop-blur-md">
                    <div className="font-display text-sm tracking-[0.3em] text-gold mb-2">NEWLY ESTABLISHED</div>
                    <div className="font-serif-lux italic text-2xl text-earth-dark leading-tight">
                      A Sacred Space for<br />Your Spiritual Journey
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -right-6 glass-natural rounded-2xl p-6 shadow-2xl border border-gold/20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full gold-gradient flex items-center justify-center">
                    <Heart className="w-6 h-6 text-navy" />
                  </div>
                  <div>
                    <div className="font-display text-2xl gold-text leading-none">NEW</div>
                    <div className="text-xs tracking-[0.2em] text-earth-med uppercase mt-1">Journey</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>

          {/* Right: Cards */}
          <div className="space-y-6">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={0.1 + i * 0.1}>
                <motion.div
                  whileHover={{ x: 6, scale: 1.02 }}
                  className="group glass-natural rounded-3xl p-8 border border-gold/20 hover:border-gold/40 transition-all duration-500 cursor-pointer relative overflow-hidden soft-shadow hover:deep-shadow"
                >
                  {/* Background decoration */}
                  <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gold/5 blur-2xl group-hover:bg-gold/10 transition-all duration-500" />
                  
                  <div className="relative flex items-start gap-6">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="shrink-0 w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center text-navy shadow-lg group-hover:shadow-xl transition-shadow"
                    >
                      <c.icon className="w-7 h-7" />
                    </motion.div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-display text-2xl text-earth-dark tracking-wide mb-3 group-hover:text-gold transition-colors">
                        {c.title}
                      </h3>
                      <p className="text-earth-med font-serif-lux text-lg leading-relaxed">
                        {c.text}
                      </p>
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 border-b-2 border-r-2 border-gold/30 rounded-br-xl" />
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <Reveal delay={0.3}>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass-natural rounded-3xl p-8 text-center border border-gold/20 soft-shadow hover:deep-shadow transition-all duration-300 group cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full gold-gradient flex items-center justify-center shadow-lg"
                >
                  <stat.icon className="w-7 h-7 text-navy" />
                </motion.div>
                <div className="font-display text-5xl gold-text mb-2">{stat.number}</div>
                <div className="text-sm tracking-[0.2em] text-earth-med uppercase font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* Call to Action */}
        <Reveal delay={0.4}>
          <div className="text-center mt-16">
            <motion.a
              href="#programs"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full gold-gradient text-navy font-display tracking-wider shadow-lg hover:shadow-2xl transition-all group"
            >
              Explore Our Programs
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ============ PROGRAMS ============
function Programs() {
  const programs = [
    { title: 'Kundalini Yoga Meditation', slug: 'kundalini-meditation', tag: 'Awakening', desc: 'Awaken the sacred serpent energy through breath, mantra, and ancient kriyas.', img: IMG.meditation, icon: Flame },
    { title: 'Yoga', slug: 'yoga', tag: 'Body & Breath', desc: 'Timeless asanas that align body, breath, and consciousness in perfect harmony.', img: IMG.yoga, icon: Wind },
    { title: 'Past Life Regression', slug: 'past-life-regression', tag: 'Soul Memory', desc: 'Journey beyond this lifetime to heal karmic imprints and rediscover your essence.', img: IMG.lotus, icon: Moon },
    { title: 'Panch Karma & Naturopathy', slug: 'panch-karma', tag: 'Ayurveda', desc: 'Five sacred purifications that restore harmony between mind, body, and nature.', img: IMG.panch, icon: Leaf },
    { title: 'Moksha', slug: 'moksha', tag: 'Liberation', desc: 'Dissolve the illusions of the ego and step into infinite, boundless awareness.', img: IMG.temple2, icon: Star },
    { title: 'Reiki Healing', slug: 'reiki-healing', tag: 'Universal Energy', desc: 'Channel divine light and life-force to heal on every level — physical to soul.', img: IMG.reiki, icon: Sparkles },
  ]

  return (
    <section id="programs" className="relative py-32 navy-gradient overflow-hidden">
      <div className="absolute inset-0 opacity-40 noise" />
      <Particles count={30} color="#C8A14A" />

      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Reveal><SectionEyebrow>Sacred Programs</SectionEyebrow></Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-6xl text-white leading-[1.05]">
              Pathways to
              <span className="block font-serif-lux italic gold-shimmer">inner transformation</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-white/70 font-serif-lux text-lg">
              Six timeless disciplines — each a doorway to the deepest truth of who you are.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <ProgramCard {...p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProgramCard({ title, tag, desc, img, icon: Icon, slug }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    setTilt({ x: y * -10, y: x * 10 })
  }
  const reset = () => setTilt({ x: 0, y: 0 })

  return (
    <a href={`/programs/${slug}`}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
        className="group relative rounded-3xl overflow-hidden border border-gold/30 hover:border-gold/60 transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-2xl cursor-pointer bg-earth-dark"
      >
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={img}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
          {/* Darker gradient overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
          <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-[10px] tracking-widest text-gold uppercase font-semibold backdrop-blur-sm bg-black/40 border border-gold/30">
            {tag}
          </div>
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-navy shadow-lg"
          >
            <Icon className="w-5 h-5" />
          </motion.div>
        </div>
        <div className="p-6 bg-gradient-to-b from-earth-dark/95 to-black/95">
          <h3 className="font-display text-xl text-white tracking-wider mb-3 drop-shadow-md font-semibold">{title}</h3>
          <p className="font-serif-lux text-white/95 leading-relaxed text-[17px] drop-shadow-sm mb-2">{desc}</p>
          <div className="mt-5 flex items-center gap-2 text-gold text-sm font-semibold cursor-pointer group/btn">
            Learn More
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </div>
        </div>
        <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition"
          style={{ background: 'radial-gradient(circle at var(--x,50%) var(--y,50%), rgba(184,147,93,0.2), transparent 40%)' }} />
      </motion.div>
    </a>
  )
}

// ============ 3D LOTUS SECTION ============
function LotusSection() {
  const ref = useRef(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-15, 15])

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    setMouse({ x: ((e.clientX - r.left) / r.width - 0.5) * 20, y: ((e.clientY - r.top) / r.height - 0.5) * 20 })
  }

  return (
    <section ref={ref} onMouseMove={onMove} className="relative py-32 bg-gradient-to-b from-warmcream via-sand to-warmcream overflow-hidden">
      <div className="absolute inset-0 paper-texture opacity-100" />
      <div className="absolute inset-0 pointer-events-none" 
        style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(184,147,93,0.12), transparent 70%)' }} />

      <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Reveal><SectionEyebrow>Sacred Symbol</SectionEyebrow></Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-6xl text-earth-dark leading-[1.05]">
              The Lotus
              <span className="block font-serif-lux italic gold-text">rises from the mud.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-earth-med text-lg font-serif-lux leading-relaxed max-w-lg">
              A thousand-petaled flower blooms within every soul. It is the eternal reminder that from darkness
              rises the most exquisite light — a symbol of purity, rebirth, and spiritual enlightenment.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              {['Purity','Rebirth','Enlightenment'].map((w) => (
                <div key={w} className="glass-natural rounded-xl p-4 text-center border border-gold/25 shadow-sm">
                  <div className="font-serif-lux italic text-gold text-xl font-semibold">{w}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div
          style={{ 
            rotate,
            x: mouse.x,
            y: mouse.y,
          }}
          transition={{ type: 'spring', stiffness: 150, damping: 20 }}
          className="relative w-full aspect-square max-w-[560px] mx-auto"
        >
          <Reveal delay={0.2}>
            <div className="relative w-full h-full">
              {/* Soft glow behind lotus */}
              <div className="absolute inset-0 rounded-full blur-3xl opacity-40"
                style={{ background: 'radial-gradient(circle, rgba(212,184,150,0.6), transparent 70%)' }} />
              
              {/* Beautiful lotus image */}
              <motion.div
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative w-full h-full rounded-full overflow-hidden shadow-2xl"
              >
                <img
                  src="/videos/guru-ji.png"
                  alt="Guru Ji"
                  className="w-full h-full object-cover"
                  style={{
                    filter: 'brightness(1.1) saturate(1.2) contrast(1.05)',
                  }}
                />
                {/* Subtle overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-gold/5" />
              </motion.div>

              {/* Decorative rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 pointer-events-none"
              >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <circle cx="100" cy="100" r="98" fill="none" stroke="rgba(184,147,93,0.2)" strokeWidth="0.5" strokeDasharray="3 3" />
                </svg>
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-4px] pointer-events-none"
              >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <circle cx="100" cy="100" r="99" fill="none" stroke="rgba(184,147,93,0.15)" strokeWidth="0.5" strokeDasharray="5 5" />
                </svg>
              </motion.div>
            </div>
          </Reveal>
        </motion.div>
      </div>
    </section>
  )
}

// ============ STATS ============
function Counter({ to, suffix = '+' }) {
  const [v, setV] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  useEffect(() => {
    if (!inView) return
    let s = 0
    const dur = 1800
    const start = performance.now()
    const loop = (t) => {
      const p = Math.min((t - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      s = Math.floor(eased * to)
      setV(s)
      if (p < 1) requestAnimationFrame(loop)
      else setV(to)
    }
    requestAnimationFrame(loop)
  }, [inView, to])
  return <span ref={ref}>{formatNumber(v)}{suffix}</span>
}

function Stats() {
  const items = [
    { n: 5000, label: 'People Guided', icon: Heart },
    { n: 150, label: 'Meditation Sessions', icon: Circle },
    { n: 15, label: 'Years of Experience', icon: Star },
    { n: 40, label: 'Healing Camps', icon: Leaf },
  ]
  return (
    <section className="relative py-24 bg-warmwhite">
      <div className="container">
        <div className="glass rounded-3xl p-10 md:p-14 grid grid-cols-2 md:grid-cols-4 gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full radial-gold blur-2xl" />
          {items.map((it, i) => (
            <Reveal key={it.label} delay={i * 0.1}>
              <div className="relative text-center">
                <div className="w-14 h-14 rounded-2xl gold-gradient mx-auto mb-4 flex items-center justify-center text-navy">
                  <it.icon className="w-6 h-6" />
                </div>
                <div className="font-display text-5xl md:text-6xl text-navy leading-none">
                  <Counter to={it.n} />
                </div>
                <div className="mt-3 text-[11px] tracking-[0.3em] uppercase text-navy/60 font-medium">{it.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============ TIMELINE ============
function Timeline() {
  const items = [
    { year: '2009', title: 'The First Spark', text: 'Vishv Chetna Trust was founded with a single sacred intention — to share the ancient light with the modern world.' },
    { year: '2013', title: 'First Ashram', text: 'A serene retreat opened in the foothills of the Himalayas — a home for seekers from every corner of the world.' },
    { year: '2017', title: 'Healing Camps', text: 'Free healing camps launched across rural India — over 10,000 lives touched with Ayurveda and pranic healing.' },
    { year: '2020', title: 'Global Sanctuary', text: 'Online sessions and meditation circles began — an enlightened world without borders.' },
    { year: '2024', title: 'The Enlightened World', text: 'Today, our teachings guide thousands daily — and the journey has only just begun.' },
  ]
  return (
    <section id="journey" className="relative py-32 bg-warmwhite overflow-hidden">
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <Reveal><SectionEyebrow>Our Journey</SectionEyebrow></Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-6xl text-navy leading-[1.05]">
              A path lit by
              <span className="block font-serif-lux italic gold-text">devotion & light</span>
            </h2>
          </Reveal>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold to-transparent" />
          {items.map((it, i) => (
            <Reveal key={it.year} delay={i * 0.05}>
              <div className={`relative flex items-center mb-16 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <div className="glass rounded-2xl p-6 hover:glow-gold transition inline-block">
                    <div className="gold-text font-display text-3xl mb-1">{it.year}</div>
                    <div className="font-display text-xl text-navy mb-2 tracking-wider">{it.title}</div>
                    <p className="font-serif-lux text-navy/70 text-[17px] leading-relaxed">{it.text}</p>
                  </div>
                </div>
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full gold-gradient glow-gold border-2 border-white" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============ MEDITATION BREATHING ============
function Meditate() {
  const [phase, setPhase] = useState('idle') // idle | inhale | hold | exhale
  const [running, setRunning] = useState(false)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    if (!running) return
    let cancel = false
    const cycle = async () => {
      while (!cancel) {
        setPhase('inhale'); await new Promise(r => setTimeout(r, 4000))
        if (cancel) break
        setPhase('hold'); await new Promise(r => setTimeout(r, 4000))
        if (cancel) break
        setPhase('exhale'); await new Promise(r => setTimeout(r, 6000))
      }
    }
    cycle()
    return () => { cancel = true }
  }, [running])

  const label = { idle: 'Begin', inhale: 'Inhale', hold: 'Hold', exhale: 'Exhale' }[phase]
  const scale = { idle: 1, inhale: 1.6, hold: 1.6, exhale: 1 }[phase]
  const dur = { idle: 0.6, inhale: 4, hold: 0.2, exhale: 6 }[phase]

  return (
    <section id="meditate" className="relative py-32 overflow-hidden" style={{ background: 'radial-gradient(ellipse at center, #1a2f4d 0%, #0A1220 60%, #050810 100%)' }}>
      <div className="absolute inset-0 starfield opacity-70" />
      <Particles count={60} color="#F5DC96" />

      <div className="container relative text-center">
        <Reveal><SectionEyebrow>Meditation Experience</SectionEyebrow></Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl md:text-6xl text-white leading-[1.05] max-w-3xl mx-auto">
            Breathe with
            <span className="block font-serif-lux italic gold-shimmer">the universe</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 text-white/70 font-serif-lux text-lg max-w-xl mx-auto">
            A guided breathing circle. Follow its rhythm. Let it become your own.
          </p>
        </Reveal>

        <div className="mt-20 flex flex-col items-center">
          <div className="relative flex items-center justify-center h-[420px] w-full">
            {/* Outer rings */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute w-[380px] h-[380px] rounded-full border border-gold/30"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute w-[300px] h-[300px] rounded-full border border-gold/40"
            />

            {/* Main breathing orb */}
            <motion.div
              animate={{ scale }}
              transition={{ duration: dur, ease: phase === 'exhale' ? 'easeIn' : 'easeOut' }}
              className="relative w-56 h-56 rounded-full flex items-center justify-center breathe-glow"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255,244,200,0.8) 0%, rgba(200,161,74,0.5) 40%, rgba(19,34,56,0.9) 100%)',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="font-display text-2xl gold-shimmer tracking-widest">{label.toUpperCase()}</div>
                  <div className="mt-1 font-serif-lux italic text-white/70 text-sm">
                    {phase === 'idle' ? 'tap to start' : '4 · 4 · 6 rhythm'}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <Button
              size="lg"
              onClick={() => { setRunning(!running); if (running) setPhase('idle') }}
              className="h-14 px-8 rounded-full gold-gradient text-navy font-semibold glow-gold"
            >
              {running ? <><X className="w-4 h-4 mr-2" /> Stop</> : <><Play className="w-4 h-4 mr-2" /> Begin Session</>}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setMuted(!muted)}
              className="h-14 rounded-full border-gold/40 bg-white/5 text-white hover:bg-white/10"
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============ GALLERY ============
function Gallery() {
  const imgs = [
    { src: IMG.temple1, h: 'h-72' },
    { src: IMG.meditation, h: 'h-96' },
    { src: IMG.mountains1, h: 'h-64' },
    { src: IMG.yoga, h: 'h-80' },
    { src: IMG.temple2, h: 'h-96' },
    { src: IMG.lotus, h: 'h-72' },
    { src: IMG.panch, h: 'h-64' },
    { src: IMG.reiki, h: 'h-80' },
    { src: IMG.peak, h: 'h-72' },
    { src: IMG.hero2, h: 'h-80' },
    { src: IMG.mountains2, h: 'h-64' },
    { src: IMG.hero1, h: 'h-72' },
  ]
  const [lightbox, setLightbox] = useState(null)

  return (
    <section id="gallery" className="relative py-32 bg-warmwhite">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal><SectionEyebrow>Sacred Moments</SectionEyebrow></Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-6xl text-navy leading-[1.05]">
              Glimpses of
              <span className="block font-serif-lux italic gold-text">the divine</span>
            </h2>
          </Reveal>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {imgs.map((im, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => setLightbox(im.src)}
                className={`relative ${im.h} rounded-2xl overflow-hidden cursor-pointer group break-inside-avoid shadow-lg`}
              >
                <motion.img
                  src={im.src}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 1 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition text-white text-xs tracking-widest">
                  <span className="glass-gold px-2 py-1 rounded-full">VIEW</span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[90] bg-navy/95 backdrop-blur-xl flex items-center justify-center p-6 cursor-pointer"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightbox}
              className="max-w-full max-h-full rounded-2xl shadow-2xl"
            />
            <button className="absolute top-6 right-6 w-12 h-12 rounded-full glass-gold flex items-center justify-center text-gold">
              <X />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// ============ VIDEO / IMMERSION ============
function Immersion() {
  return (
    <section className="relative h-[70vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${IMG.temple2})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy/80" />
      <Particles count={40} color="#F5DC96" />

      <div className="container relative h-full flex flex-col items-center justify-center text-center text-white">
        <Reveal><SectionEyebrow>Immerse</SectionEyebrow></Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl md:text-7xl leading-[1] max-w-4xl">
            <span className="font-serif-lux italic gold-shimmer">Silence</span>
            <span className="block">is the language</span>
            <span className="font-serif-lux italic">of the divine.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <motion.div whileHover={{ scale: 1.05 }} className="mt-10">
            <button className="relative w-24 h-24 rounded-full glass-gold flex items-center justify-center group" data-cursor="hover">
              <div className="absolute inset-0 rounded-full animate-gold-pulse" />
              <Play className="w-8 h-8 text-gold fill-gold ml-1 relative z-10" />
            </button>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}

// ============ EVENTS ============
function Events() {
  const events = [
    { title: 'Kundalini Awakening Retreat', date: '2025-07-15', location: 'Rishikesh, India', img: IMG.meditation },
    { title: 'Full Moon Meditation Circle', date: '2025-06-22', location: 'Live Online', img: IMG.lotus },
    { title: 'Ayurveda & Panchakarma Camp', date: '2025-08-05', location: 'Kerala, India', img: IMG.panch },
  ]
  return (
    <section id="events" className="relative py-32 bg-navy overflow-hidden">
      <div className="absolute inset-0 opacity-30 noise" />
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal><SectionEyebrow>Upcoming Events</SectionEyebrow></Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-6xl text-white leading-[1.05]">
              Gather in
              <span className="block font-serif-lux italic gold-shimmer">sacred presence</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {events.map((e, i) => <Reveal key={e.title} delay={i * 0.1}><EventCard {...e} /></Reveal>)}
        </div>
      </div>
    </section>
  )
}

function EventCard({ title, date, location, img }) {
  const [left, setLeft] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const target = new Date(date).getTime()
    const tick = () => {
      const diff = Math.max(target - Date.now(), 0)
      setLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [date])

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative rounded-3xl overflow-hidden glass-dark border border-gold/15 hover:border-gold/50 transition"
    >
      <div className="relative h-56 overflow-hidden">
        <motion.img src={img} alt={title} className="w-full h-full object-cover" whileHover={{ scale: 1.1 }} transition={{ duration: 1 }} />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
        <div className="absolute top-4 left-4 glass-gold px-3 py-1 rounded-full text-[10px] tracking-widest text-gold uppercase flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {location}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl text-white tracking-wider mb-4">{title}</h3>
        <div className="flex items-center justify-between gap-2 mb-4">
          {[['Days', left.d], ['Hrs', left.h], ['Min', left.m], ['Sec', left.s]].map(([l, v]) => (
            <div key={l} className="flex-1 text-center glass-dark rounded-lg py-2 border border-gold/20">
              <div className="font-display text-xl gold-text leading-none">{String(v).padStart(2, '0')}</div>
              <div className="text-[9px] tracking-widest text-white/50 mt-1">{l}</div>
            </div>
          ))}
        </div>
        <Button className="w-full rounded-full gold-gradient text-navy font-semibold">
          Register <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  )
}

// ============ DONATION ============
function Donate() {
  const [amount, setAmount] = useState(1100)
  const goal = 500000
  const raised = 342750
  const pct = Math.min((raised / goal) * 100, 100)

  const handleDonate = async () => {
    try {
      await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      })
      toast.success('Thank you for your sacred contribution 🙏')
    } catch {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <section id="donate" className="relative py-32 bg-warmwhite overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom left, rgba(200,161,74,0.2), transparent 60%)' }} />
      <div className="container relative grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <Reveal><SectionEyebrow>Sacred Giving</SectionEyebrow></Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-6xl text-navy leading-[1.05]">
              Be a light
              <span className="block font-serif-lux italic gold-text">for another.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-navy/70 font-serif-lux text-lg leading-relaxed max-w-lg">
              Every offering — no matter its size — becomes a candle in another seeker's darkness.
              Your kindness fuels free camps, retreats, and the sharing of ancient wisdom with those who cannot pay.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-navy/60">₹{formatNumber(raised)} raised</span>
                <span className="gold-text font-medium">Goal ₹{formatNumber(goal)}</span>
              </div>
              <div className="h-3 rounded-full bg-navy/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  transition={{ duration: 1.6, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className="h-full gold-gradient glow-gold"
                />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl radial-gold blur-2xl opacity-70" />
            <div className="relative glass rounded-3xl p-8 md:p-10 shadow-2xl border border-gold/20">
              <div className="text-center mb-6">
                <LotusIcon className="w-10 h-10 text-gold mx-auto mb-3" />
                <div className="font-display text-2xl text-navy tracking-widest">OFFER YOUR SEVA</div>
                <div className="font-serif-lux italic text-navy/60 mt-1">Choose an amount that stirs your heart</div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[501, 1100, 2100, 5100, 11000, 21000].map(a => (
                  <button
                    key={a}
                    onClick={() => setAmount(a)}
                    className={`py-3 rounded-xl font-medium transition ${amount === a ? 'gold-gradient text-navy glow-gold' : 'glass border border-gold/20 text-navy hover:border-gold/60'}`}
                  >
                    ₹{formatNumber(a)}
                  </button>
                ))}
              </div>
              <div className="relative mb-6">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/60">₹</span>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value) || 0)}
                  className="pl-8 h-14 rounded-xl border-gold/30 bg-white/70 text-lg"
                />
              </div>
              <Button onClick={handleDonate} className="w-full h-14 rounded-full gold-gradient text-navy font-semibold text-base glow-gold-strong hover:scale-[1.02] transition">
                Donate Now <Heart className="ml-2 w-4 h-4" />
              </Button>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                {['UPI', 'QR Code', 'Card'].map(m => (
                  <div key={m} className="glass rounded-xl py-2 text-xs tracking-widest text-navy/70">{m}</div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ============ TESTIMONIALS ============
function Testimonials() {
  const items = [
    { name: 'Ananya Sharma', role: 'Delhi', text: 'A single meditation retreat here rewrote the story I had been telling myself for 30 years. I found silence — and in it, my true self.' },
    { name: 'Marcus Bell', role: 'London', text: 'The Kundalini sessions cracked something open in me. Words fail. I only know I am no longer the person who arrived.' },
    { name: 'Priya Nair', role: 'Bangalore', text: 'Their Panchakarma healed my body when medicine could not. But more than that — they healed the ache in my soul.' },
    { name: 'Alina Rossi', role: 'Milan', text: 'The most sacred space I have ever entered. Every teacher, every candle, every silence — divine.' },
    { name: 'Rohit Verma', role: 'Mumbai', text: 'I came searching for peace. I left carrying it inside me — like a lamp that will never go out.' },
  ]
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % items.length), 6000)
    return () => clearInterval(id)
  }, [items.length])

  return (
    <section className="relative py-32 bg-navy overflow-hidden">
      <div className="absolute inset-0 starfield opacity-30" />
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Reveal><SectionEyebrow>Voices of the Awakened</SectionEyebrow></Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-6xl text-white leading-[1.05]">
              Words from
              <span className="block font-serif-lux italic gold-shimmer">souls transformed</span>
            </h2>
          </Reveal>
        </div>

        <div className="relative max-w-3xl mx-auto min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, rotateY: 15 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              exit={{ opacity: 0, y: -40, rotateY: -15 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="glass-dark rounded-3xl p-10 md:p-14 border border-gold/25 text-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="gold-text font-display text-6xl leading-none mb-4">&ldquo;</div>
              <p className="font-serif-lux italic text-xl md:text-2xl text-white/90 leading-relaxed">
                {items[idx].text}
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-navy font-bold">
                  {items[idx].name.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="font-display text-sm text-white tracking-widest">{items[idx].name}</div>
                  <div className="text-[10px] tracking-[0.3em] text-gold uppercase">{items[idx].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-8 bg-gold' : 'w-1.5 bg-white/30 hover:bg-white/60'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ============ CONTACT ============
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      toast.success('Your message has been received 🙏')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      toast.error('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <section id="contact" className="relative py-32 bg-warmwhite overflow-hidden">
      <div className="container relative grid lg:grid-cols-2 gap-16">
        <div>
          <Reveal><SectionEyebrow>Connect With Us</SectionEyebrow></Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-6xl text-navy leading-[1.05]">
              A message,
              <span className="block font-serif-lux italic gold-text">a whisper, a hello.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-navy/70 font-serif-lux text-lg">
              Whether you seek guidance, community, or simply wish to share your journey — we listen with an open heart.
            </p>
          </Reveal>

          <div className="mt-10 space-y-4">
            {[
              { icon: MapPin, label: 'Rishikesh, Uttarakhand — India' },
              { icon: Mail, label: 'namaste@vishvchetna.org' },
              { icon: Phone, label: '+91 98765 43210' },
            ].map(it => (
              <Reveal key={it.label}>
                <div className="flex items-center gap-4 glass rounded-2xl p-5 hover:glow-gold transition group">
                  <div className="w-11 h-11 rounded-xl gold-gradient flex items-center justify-center text-navy group-hover:scale-110 transition">
                    <it.icon className="w-5 h-5" />
                  </div>
                  <span className="font-serif-lux text-navy text-lg">{it.label}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-8 rounded-3xl overflow-hidden glass border border-gold/20 h-56 relative">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.1!2d78.2932!3d30.0869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRishikesh!5e0!3m2!1sen!2sin!4v1"
                className="absolute inset-0 w-full h-full grayscale opacity-80"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gold/10 mix-blend-multiply pointer-events-none" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <form onSubmit={submit} className="relative glass rounded-3xl p-8 md:p-10 border border-gold/25 shadow-2xl">
            <div className="absolute -inset-2 rounded-3xl radial-gold blur-2xl opacity-40 -z-10" />
            <div className="font-display text-2xl text-navy tracking-widest mb-1">SEND A MESSAGE</div>
            <div className="font-serif-lux italic text-navy/60 mb-8">We'll reply within 24 hours</div>
            <div className="space-y-4">
              <Input placeholder="Your Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="h-14 rounded-xl bg-white/60 border-gold/25 focus:border-gold" />
              <div className="grid md:grid-cols-2 gap-4">
                <Input type="email" placeholder="Email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className="h-14 rounded-xl bg-white/60 border-gold/25 focus:border-gold" />
                <Input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="h-14 rounded-xl bg-white/60 border-gold/25 focus:border-gold" />
              </div>
              <Textarea placeholder="Share what's in your heart..." required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                className="rounded-xl bg-white/60 border-gold/25 focus:border-gold" />
              <Button type="submit" disabled={loading}
                className="w-full h-14 rounded-full gold-gradient text-navy font-semibold text-base glow-gold hover:scale-[1.02] transition disabled:opacity-70">
                {loading ? 'Sending...' : <>Send Message <Send className="ml-2 w-4 h-4" /></>}
              </Button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

// ============ FOOTER ============
function Footer() {
  const [email, setEmail] = useState('')
  const subscribe = async (e) => {
    e.preventDefault()
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      toast.success('Welcome to our sacred circle 🌸')
      setEmail('')
    } catch {
      toast.error('Something went wrong.')
    }
  }

  return (
    <footer className="relative pt-24 pb-8 overflow-hidden" style={{ background: 'linear-gradient(180deg, #050810 0%, #0A1220 100%)' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <Particles count={20} color="#C8A14A" />

      <div className="container relative">
        <div className="grid md:grid-cols-4 gap-10 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-14 h-14 rounded-full bg-warmwhite p-2 shadow-lg">
                <img src={IMG.logo} alt="Vishv Chetna Trust" className="w-full h-full object-contain rounded-full" />
              </div>
              <div>
                <div className="font-display text-white tracking-[0.25em]">VISHV CHETNA TRUST</div>
                <div className="font-serif-lux italic text-gold text-sm">The Enlightened World</div>
              </div>
            </div>
            <p className="font-serif-lux text-white/60 text-lg max-w-md leading-relaxed">
              A sacred sanctuary devoted to guiding souls toward the eternal light of self-realization —
              through timeless wisdom, healing, and love.
            </p>
            <form onSubmit={subscribe} className="mt-8 flex items-center gap-2 max-w-md">
              <Input type="email" required placeholder="Your email for sacred wisdom" value={email} onChange={e => setEmail(e.target.value)}
                className="h-12 rounded-full bg-white/5 border-gold/25 text-white placeholder:text-white/40" />
              <Button type="submit" className="h-12 px-6 rounded-full gold-gradient text-navy font-semibold">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>

          <div>
            <div className="font-display text-white text-sm tracking-widest mb-5">QUICK LINKS</div>
            <ul className="space-y-2.5 font-body text-white/60">
              {['About', 'Programs', 'Journey', 'Gallery', 'Events', 'Contact'].map(l => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-gold transition">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-display text-white text-sm tracking-widest mb-5">PROGRAMS</div>
            <ul className="space-y-2.5 font-body text-white/60">
              {['Kundalini Yoga', 'Yoga', 'Past Life Regression', 'Panch Karma', 'Moksha', 'Reiki Healing'].map(l => (
                <li key={l}><span className="hover:text-gold transition cursor-pointer">{l}</span></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gold/15 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/50 text-xs tracking-widest">© {new Date().getFullYear()} VISHV CHETNA TRUST · ALL RIGHTS RESERVED</div>
          <div className="flex items-center gap-3">
            {[Instagram, Youtube, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full glass-dark border border-gold/20 hover:border-gold hover:text-gold flex items-center justify-center text-white/70 transition">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="font-serif-lux italic text-gold/60 text-lg">"असतो मा सद्गमय · तमसो मा ज्योतिर्गमय · मृत्योर्मामृतं गमय"</div>
          <div className="text-white/40 text-xs mt-1 tracking-widest">FROM UNREAL LEAD ME TO THE REAL · FROM DARKNESS LEAD ME TO LIGHT · FROM DEATH LEAD ME TO IMMORTALITY</div>
        </div>
      </div>
    </footer>
  )
}

// ============ MAIN PAGE ============
function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof document !== 'undefined') document.body.style.overflow = loading ? 'hidden' : ''
  }, [loading])

  // GSAP ScrollTrigger — cinematic scroll-linked animations, synced with Lenis
  useEffect(() => {
    if (loading) return
    let ctx
    let cleanup = () => {}
    ;(async () => {
      const gsapMod = await import('gsap')
      const stMod = await import('gsap/ScrollTrigger')
      const gsap = gsapMod.default || gsapMod.gsap
      const ScrollTrigger = stMod.ScrollTrigger || stMod.default
      gsap.registerPlugin(ScrollTrigger)

      // Sync ScrollTrigger with Lenis so pinned/scrubbed animations use the smooth-scroll position
      const lenis = window.__lenis
      if (lenis) {
        lenis.on('scroll', ScrollTrigger.update)
      }

      ctx = gsap.context(() => {
        // Cinematic fade-and-lift reveal on all H2 headings (preserves gradient text)
        gsap.utils.toArray('section h2.font-display').forEach((h) => {
          gsap.fromTo(h,
            { opacity: 0, y: 60, filter: 'blur(6px)' },
            {
              opacity: 1, y: 0, filter: 'blur(0px)',
              duration: 1.4, ease: 'power4.out',
              scrollTrigger: {
                trigger: h,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
            })
        })

        // Section eyebrows — slide in from left
        gsap.utils.toArray('section .inline-flex').forEach((el) => {
          if (!el.querySelector('.tracking-\\[0\\.35em\\]')) return
          gsap.fromTo(el,
            { opacity: 0, x: -40 },
            {
              opacity: 1, x: 0, duration: 1, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 90%' },
            })
        })

        // Parallax float-in for opt-in cards
        gsap.utils.toArray('[data-parallax]').forEach((el) => {
          gsap.fromTo(el,
            { y: 80, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 90%' },
            })
        })

        // Refresh ScrollTrigger after fonts/images load
        setTimeout(() => ScrollTrigger.refresh(), 400)
      })

      cleanup = () => {
        if (lenis) lenis.off('scroll', ScrollTrigger.update)
        ctx && ctx.revert()
      }
    })()

    return () => cleanup()
  }, [loading])

  return (
    <main className="relative bg-warmwhite text-navy min-h-screen">
      <AnimatePresence>{loading && <Loader onDone={() => setLoading(false)} />}</AnimatePresence>
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <Hero />
      <About />
      <Programs />
      <LotusSection />
      <ChakraWheel />
      <Stats />
      <Timeline />
      <Meditate />
      <Gallery />
      <Immersion />
      <Events />
      <Donate />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}

export default App
