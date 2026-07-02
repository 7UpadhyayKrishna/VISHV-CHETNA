'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const CHAKRAS = [
  {
    name: 'Sahasrara',
    subtitle: 'Crown · Cosmic Consciousness',
    color: '#A990D5',
    lightColor: '#D4C5F0',
    symbol: 'ॐ',
    seed: 'AUM',
    element: 'Thought',
    meaning: 'The thousand-petaled lotus at the crown. Union with the divine, infinite awareness, liberation from all limitation.',
  },
  {
    name: 'Ajna',
    subtitle: 'Third Eye · Intuition',
    color: '#6F7BC7',
    lightColor: '#9BA8E0',
    symbol: 'ॐ',
    seed: 'OM',
    element: 'Light',
    meaning: 'The seat of intuition and inner vision. Awakens clarity, wisdom, and the ability to see beyond illusion.',
  },
  {
    name: 'Vishuddha',
    subtitle: 'Throat · Truth & Expression',
    color: '#5BA4D0',
    lightColor: '#A8D5E8',
    symbol: 'हं',
    seed: 'HAM',
    element: 'Ether',
    meaning: 'The gateway of authentic voice. Opens the courage to speak truth, listen deeply, and live in harmony with your inner song.',
  },
  {
    name: 'Anahata',
    subtitle: 'Heart · Unconditional Love',
    color: '#7AAA7B',
    lightColor: '#A8C9A9',
    symbol: 'यं',
    seed: 'YAM',
    element: 'Air',
    meaning: 'The unstruck sound of the heart. Radiates compassion, love without condition, and the sacred healing that flows from within.',
  },
  {
    name: 'Manipura',
    subtitle: 'Solar Plexus · Sacred Power',
    color: '#D4A357',
    lightColor: '#E6C896',
    symbol: 'रं',
    seed: 'RAM',
    element: 'Fire',
    meaning: 'The city of jewels. The inner sun where courage, will, and radiant self-worth are forged into action.',
  },
  {
    name: 'Svadhisthana',
    subtitle: 'Sacral · Creation & Flow',
    color: '#C17A5F',
    lightColor: '#D9A58F',
    symbol: 'वं',
    seed: 'VAM',
    element: 'Water',
    meaning: 'The sweetness of life. The wellspring of creativity, joy, and the sacred dance of relationship and desire.',
  },
  {
    name: 'Muladhara',
    subtitle: 'Root · Foundation & Belonging',
    color: '#B55A5A',
    lightColor: '#D18F8F',
    symbol: 'लं',
    seed: 'LAM',
    element: 'Earth',
    meaning: 'The root of your being. The primal ground of safety, stability, and belonging to this earth and this body.',
  },
]

// Energy particle flowing along spine
function EnergyParticle({ delay, direction = 'up', isActive }) {
  const duration = 3
  const distance = direction === 'up' ? ['100%', '-10%'] : ['-10%', '100%']
  
  return (
    <motion.div
      initial={{ top: direction === 'up' ? '100%' : '-10%', opacity: 0 }}
      animate={isActive ? {
        top: distance,
        opacity: [0, 1, 1, 0],
      } : { opacity: 0 }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: isActive ? Infinity : 0,
        ease: 'linear',
      }}
      className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full pointer-events-none"
      style={{
        background: 'radial-gradient(circle, rgba(184,147,93,0.9), rgba(184,147,93,0.3))',
        boxShadow: '0 0 8px rgba(184,147,93,0.6)',
      }}
    />
  )
}

function ChakraOrb({ chakra, index, active, onClick }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.button
      layout
      onClick={() => onClick(index)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="relative group focus:outline-none"
      aria-label={chakra.name}
    >
      {/* Outer glow ring (subtle) */}
      <motion.div
        animate={{
          scale: active ? [1, 1.2, 1] : 1,
          opacity: active ? [0.25, 0.45, 0.25] : (isHovered ? 0.35 : 0.15),
        }}
        transition={{ duration: 4, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full -m-3"
        style={{
          background: `radial-gradient(circle, ${chakra.lightColor}50, transparent 70%)`,
          filter: 'blur(8px)',
        }}
      />
      
      {/* Main circular orb */}
      <motion.div
        animate={{
          scale: active ? [1, 1.04, 1] : 1,
        }}
        transition={{ duration: 3.5, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
        className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center cursor-pointer"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${chakra.lightColor}, ${chakra.color})`,
          boxShadow: `0 6px 20px ${chakra.color}35, inset 0 2px 12px rgba(255,255,255,0.4), inset 0 -2px 8px ${chakra.color}40`,
          border: `2px solid ${chakra.lightColor}60`,
        }}
      >
        <span 
          className="font-display text-2xl md:text-3xl text-white drop-shadow-md" 
          style={{ textShadow: '0 2px 6px rgba(0,0,0,0.4)' }}
        >
          {chakra.symbol}
        </span>
      </motion.div>

      {/* Rotating petals when active */}
      {active && (
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: 0 }}
          animate={{ 
            scale: [0.85, 1, 0.85], 
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 360],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 -m-8 pointer-events-none"
        >
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-8 rounded-full"
              style={{
                background: `linear-gradient(180deg, ${chakra.lightColor}90, transparent)`,
                left: '50%',
                top: '50%',
                transformOrigin: '50% 50%',
                transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-40px)`,
                opacity: 0.35,
                filter: 'blur(1px)',
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Label on hover */}
      <div className="absolute left-full ml-6 top-1/2 -translate-y-1/2 whitespace-nowrap hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="glass-natural rounded-xl px-4 py-2 shadow-md border border-gold/20">
          <div className="font-display text-base tracking-wider text-earth-dark font-semibold">{chakra.name}</div>
          <div className="text-xs tracking-wide text-earth-med uppercase mt-0.5">{chakra.seed} · {chakra.element}</div>
        </div>
      </div>
    </motion.button>
  )
}

export default function ChakraWheel() {
  const [active, setActive] = useState(3)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const chakra = CHAKRAS[active]

  return (
    <section 
      id="chakras" 
      ref={sectionRef} 
      className="relative py-32 overflow-hidden bg-gradient-to-b from-sand via-warmcream to-sand"
    >
      <div className="absolute inset-0 paper-texture opacity-100" />
      
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${chakra.lightColor}15, transparent 70%)` 
        }}
      />

      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-12 bg-gold" />
            <span className="text-xs tracking-[0.3em] font-medium text-gold uppercase">Seven Sacred Wheels</span>
            <span className="h-px w-12 bg-gold" />
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl md:text-6xl text-earth-dark leading-tight">
            The Chakras
            <span className="block font-serif-lux italic gold-text mt-2">energy of the awakening body</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 text-earth-med font-serif-lux text-lg leading-relaxed">
            Seven spinning wheels of luminous consciousness. Explore each one — feel their sacred resonance.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[auto_1fr] gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative flex flex-col items-center gap-7 mx-auto lg:mx-0 lg:pl-8"
          >
            <div 
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 pointer-events-none"
              style={{ 
                background: `linear-gradient(180deg, ${CHAKRAS.map(c => c.color).join(', ')})`,
                opacity: 0.4,
              }} 
            />
            
            {[...Array(5)].map((_, i) => (
              <EnergyParticle 
                key={`up-${i}`} 
                delay={i * 0.6} 
                direction="up" 
                isActive={true}
              />
            ))}
            {[...Array(3)].map((_, i) => (
              <EnergyParticle 
                key={`down-${i}`} 
                delay={i * 0.8 + 0.3} 
                direction="down" 
                isActive={true}
              />
            ))}

            {CHAKRAS.map((c, i) => (
              <ChakraOrb key={c.name} chakra={c} index={i} active={i === active} onClick={setActive} />
            ))}
          </motion.div>

          <div className="relative min-h-[480px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="glass-natural rounded-3xl p-10 md:p-12 border relative overflow-hidden soft-shadow"
                style={{ borderColor: `${chakra.color}30` }}
              >
                <div 
                  className="absolute -right-6 -top-6 text-[180px] font-display leading-none opacity-[0.04] pointer-events-none select-none"
                  style={{ color: chakra.color }}
                >
                  {chakra.symbol}
                </div>

                <div className="relative">
                  <div className="flex items-center gap-5 mb-6">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center relative"
                      style={{
                        background: `radial-gradient(circle at 35% 35%, ${chakra.lightColor}, ${chakra.color})`,
                        boxShadow: `0 4px 16px ${chakra.color}25`,
                      }}
                    >
                      <span className="font-display text-3xl text-white">{chakra.symbol}</span>
                    </div>
                    <div>
                      <div className="text-xs tracking-wider text-earth-med uppercase">Chakra {active + 1} · {chakra.element}</div>
                      <div className="font-display text-3xl md:text-4xl text-earth-dark tracking-wide mt-0.5">{chakra.name}</div>
                      <div className="font-serif-lux italic text-lg mt-1" style={{ color: chakra.color }}>{chakra.subtitle}</div>
                    </div>
                  </div>

                  <p className="font-serif-lux text-earth-dark text-xl leading-relaxed max-w-xl">
                    {chakra.meaning}
                  </p>

                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <div className="glass-natural rounded-2xl px-5 py-3 border soft-shadow" style={{ borderColor: `${chakra.color}25` }}>
                      <div className="text-[10px] tracking-wider text-earth-med uppercase">Seed Mantra</div>
                      <div className="font-display text-2xl text-earth-dark tracking-widest mt-1">{chakra.seed}</div>
                    </div>
                    <div className="glass-natural rounded-2xl px-5 py-3 border soft-shadow" style={{ borderColor: `${chakra.color}25` }}>
                      <div className="text-[10px] tracking-wider text-earth-med uppercase">Element</div>
                      <div className="font-display text-2xl text-earth-dark tracking-widest mt-1">{chakra.element}</div>
                    </div>
                    <button
                      onClick={() => setActive((active + 1) % CHAKRAS.length)}
                      className="ml-auto glass-natural rounded-full px-6 py-3 text-sm text-earth-dark hover:bg-gold/10 border border-gold/30 hover:border-gold/50 transition-all duration-300"
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
