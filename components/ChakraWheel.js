'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

const CHAKRAS = [
  {
    name: 'Sahasrara',
    subtitle: 'Crown · Cosmic Consciousness',
    color: '#B990FF',
    glow: 'rgba(185,144,255,0.6)',
    symbol: 'ओं',
    seed: 'AUM',
    element: 'Thought',
    meaning: 'The thousand-petaled lotus at the crown. Union with the divine, infinite awareness, liberation from all limitation.',
  },
  {
    name: 'Ajna',
    subtitle: 'Third Eye · Intuition',
    color: '#7B6FE0',
    glow: 'rgba(123,111,224,0.6)',
    symbol: 'ओं',
    seed: 'OM',
    element: 'Light',
    meaning: 'The seat of intuition and inner vision. Awakens clarity, wisdom, and the ability to see beyond illusion.',
  },
  {
    name: 'Vishuddha',
    subtitle: 'Throat · Truth & Expression',
    color: '#5DB4E8',
    glow: 'rgba(93,180,232,0.6)',
    symbol: 'हं',
    seed: 'HAM',
    element: 'Ether',
    meaning: 'The gateway of authentic voice. Opens the courage to speak truth, listen deeply, and live in harmony with your inner song.',
  },
  {
    name: 'Anahata',
    subtitle: 'Heart · Unconditional Love',
    color: '#84C88A',
    glow: 'rgba(132,200,138,0.6)',
    symbol: 'यं',
    seed: 'YAM',
    element: 'Air',
    meaning: 'The unstruck sound of the heart. Radiates compassion, love without condition, and the sacred healing that flows from within.',
  },
  {
    name: 'Manipura',
    subtitle: 'Solar Plexus · Sacred Power',
    color: '#F5C542',
    glow: 'rgba(245,197,66,0.7)',
    symbol: 'रं',
    seed: 'RAM',
    element: 'Fire',
    meaning: 'The city of jewels. The inner sun where courage, will, and radiant self-worth are forged into action.',
  },
  {
    name: 'Svadhisthana',
    subtitle: 'Sacral · Creation & Flow',
    color: '#F58A3D',
    glow: 'rgba(245,138,61,0.6)',
    symbol: 'वं',
    seed: 'VAM',
    element: 'Water',
    meaning: 'The sweetness of life. The wellspring of creativity, joy, and the sacred dance of relationship and desire.',
  },
  {
    name: 'Muladhara',
    subtitle: 'Root · Foundation & Belonging',
    color: '#E15A5A',
    glow: 'rgba(225,90,90,0.6)',
    symbol: 'लं',
    seed: 'LAM',
    element: 'Earth',
    meaning: 'The root of your being. The primal ground of safety, stability, and belonging to this earth and this body.',
  },
]

function ChakraOrb({ chakra, index, active, onClick }) {
  return (
    <motion.button
      layout
      onClick={() => onClick(index)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="relative group focus:outline-none"
      data-cursor="hover"
      aria-label={chakra.name}
    >
      <motion.div
        animate={{
          scale: active ? [1, 1.15, 1] : 1,
          opacity: 1,
        }}
        transition={{ duration: active ? 2 : 0.4, repeat: active ? Infinity : 0 }}
        className="relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${chakra.color}, ${chakra.color}66)`,
          boxShadow: `0 0 30px ${chakra.glow}, 0 0 80px ${chakra.glow}, inset 0 0 20px rgba(255,255,255,0.3)`,
        }}
      >
        <span className="font-display text-xl md:text-2xl text-white drop-shadow-lg" style={{ textShadow: '0 0 8px rgba(0,0,0,0.5)' }}>
          {chakra.symbol}
        </span>

        {/* Rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[-8px] rounded-full border pointer-events-none"
          style={{ borderColor: chakra.color, borderStyle: 'dashed', opacity: 0.5 }}
        />

        {/* Petal decoration on active */}
        {active && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-[-24px] rounded-full pointer-events-none"
            style={{
              background: `conic-gradient(from 0deg, ${chakra.color}, transparent, ${chakra.color}, transparent, ${chakra.color})`,
              opacity: 0.3,
              filter: 'blur(8px)',
            }}
          />
        )}
      </motion.div>

      {/* Label */}
      <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap hidden md:block">
        <div className="font-display text-sm tracking-widest text-white/90">{chakra.name}</div>
        <div className="text-[10px] tracking-widest text-white/50 uppercase mt-0.5">{chakra.seed}</div>
      </div>
    </motion.button>
  )
}

export default function ChakraWheel() {
  const [active, setActive] = useState(3) // Anahata (heart) default
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const chakra = CHAKRAS[active]

  return (
    <section id="chakras" ref={sectionRef} className="relative py-32 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #1a2f4d 0%, #0A1220 60%, #050810 100%)' }}>

      {/* Starfield */}
      <div className="absolute inset-0 starfield opacity-40" />

      {/* Ambient glow following active chakra */}
      <motion.div
        key={active}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 50% 40% at 30% 50%, ${chakra.glow}, transparent 60%)` }}
      />

      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-gold" />
            <span className="text-[11px] tracking-[0.35em] font-medium text-gold uppercase">Seven Sacred Wheels</span>
            <span className="h-px w-8 bg-gold" />
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="font-display text-5xl md:text-6xl text-white leading-[1.05]">
            The Chakras
            <span className="block font-serif-lux italic gold-shimmer">energy of the awakening body</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 1 }}
            className="mt-6 text-white/70 font-serif-lux text-lg">
            Seven spinning wheels of luminous consciousness. Move through them — feel their song.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[auto_1fr] gap-12 lg:gap-24 items-center">
          {/* Chakras column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex flex-col items-center gap-6 lg:gap-8 mx-auto lg:mx-0 lg:pl-12"
          >
            {/* Connecting spine line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px pointer-events-none"
              style={{ background: `linear-gradient(180deg, ${CHAKRAS[0].color}, ${CHAKRAS[1].color}, ${CHAKRAS[2].color}, ${CHAKRAS[3].color}, ${CHAKRAS[4].color}, ${CHAKRAS[5].color}, ${CHAKRAS[6].color})`, opacity: 0.5 }} />

            {CHAKRAS.map((c, i) => (
              <ChakraOrb key={c.name} chakra={c} index={i} active={i === active} onClick={setActive} />
            ))}
          </motion.div>

          {/* Info panel */}
          <div className="relative min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                className="glass-dark rounded-3xl p-10 md:p-12 border relative overflow-hidden"
                style={{ borderColor: `${chakra.color}55` }}
              >
                {/* Big background symbol */}
                <div className="absolute -right-8 -top-8 text-[200px] font-display leading-none opacity-10 pointer-events-none"
                  style={{ color: chakra.color }}>
                  {chakra.symbol}
                </div>

                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center relative"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${chakra.color}, ${chakra.color}55)`,
                        boxShadow: `0 0 30px ${chakra.glow}`,
                      }}>
                      <span className="font-display text-3xl text-white">{chakra.symbol}</span>
                    </div>
                    <div>
                      <div className="text-[10px] tracking-[0.35em] text-white/50 uppercase">Chakra {active + 1} · {chakra.element}</div>
                      <div className="font-display text-3xl md:text-4xl text-white tracking-wide">{chakra.name}</div>
                      <div className="font-serif-lux italic text-lg" style={{ color: chakra.color }}>{chakra.subtitle}</div>
                    </div>
                  </div>

                  <p className="font-serif-lux text-white/85 text-xl leading-relaxed max-w-xl">
                    {chakra.meaning}
                  </p>

                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <div className="glass rounded-2xl px-5 py-3 border" style={{ borderColor: `${chakra.color}55` }}>
                      <div className="text-[9px] tracking-[0.35em] text-white/50 uppercase">Seed Mantra</div>
                      <div className="font-display text-2xl text-white tracking-widest mt-1">{chakra.seed}</div>
                    </div>
                    <div className="glass rounded-2xl px-5 py-3 border" style={{ borderColor: `${chakra.color}55` }}>
                      <div className="text-[9px] tracking-[0.35em] text-white/50 uppercase">Element</div>
                      <div className="font-display text-2xl text-white tracking-widest mt-1">{chakra.element}</div>
                    </div>
                    <button
                      onClick={() => setActive((active + 1) % CHAKRAS.length)}
                      className="ml-auto glass rounded-full px-5 py-3 text-sm text-white/80 hover:text-white border border-gold/30 hover:border-gold transition"
                    >
                      Next Chakra →
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
