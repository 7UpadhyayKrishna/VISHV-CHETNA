'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Users, Calendar, CheckCircle, Flame, Wind, Moon, Leaf, Star, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DEFAULT_CONTENT, getProgramBySlug } from '@/lib/site-content-defaults'
import MediaVideo from '@/components/MediaVideo'

const ICONS = {
  'kundalini-meditation': Flame,
  yoga: Wind,
  'past-life-regression': Moon,
  'panch-karma': Leaf,
  moksha: Star,
  'reiki-healing': Sparkles,
}

export default function ProgramPageClient({ slug }) {
  const [program, setProgram] = useState(() => getProgramBySlug(DEFAULT_CONTENT, slug))

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/content', { cache: 'no-store' })
        const data = await res.json()
        if (!cancelled && data?.content) {
          setProgram(getProgramBySlug(data.content, slug))
        }
      } catch {
        // keep defaults
      }
    })()
    return () => { cancelled = true }
  }, [slug])

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warmcream">
        <p>Program not found.</p>
      </div>
    )
  }

  const Icon = ICONS[slug] || Sparkles
  const details = [
    { icon: Clock, label: 'Duration', value: program.duration },
    { icon: Users, label: 'Class Size', value: program.classSize },
    { icon: Calendar, label: 'Schedule', value: program.schedule },
  ]
  const hasVideo = Boolean(program.video?.trim())

  return (
    <div className="min-h-screen bg-gradient-to-b from-warmcream via-sand to-warmcream">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 paper-texture opacity-100" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

        <div className="container relative">
          <Link href="/#programs">
            <Button variant="ghost" className="mb-8 text-earth-dark hover:text-gold">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Programs
            </Button>
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-medium mb-6">
                <Icon className="w-4 h-4" />
                {program.tag}
              </div>
              <h1 className="font-display text-6xl md:text-7xl text-earth-dark leading-tight mb-6">
                {program.pageTitle}
                <span className="block font-serif-lux italic gold-text mt-2">{program.pageTitleAccent}</span>
              </h1>
              <p className="text-earth-med text-xl leading-relaxed font-serif-lux mb-8">
                {program.pageBody}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {details.map((detail) => (
                  <div key={detail.label} className="glass-natural rounded-2xl p-4 text-center border border-gold/20">
                    <detail.icon className="w-6 h-6 mx-auto mb-2 text-gold" />
                    <div className="text-xs text-earth-med uppercase tracking-wider mb-1">{detail.label}</div>
                    <div className="font-display text-sm text-earth-dark">{detail.value}</div>
                  </div>
                ))}
              </div>

              <Link href="/#contact">
                <Button className="rounded-full gold-gradient text-navy px-8 py-6 text-lg font-display">
                  {program.cta}
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative space-y-6"
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold/30 rounded-tl-3xl pointer-events-none z-10" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold/30 rounded-br-3xl pointer-events-none z-10" />
                {hasVideo ? (
                  <MediaVideo src={program.video} poster={program.img} />
                ) : (
                  <img
                    src={program.img}
                    alt={program.title}
                    className="rounded-3xl shadow-2xl w-full h-[600px] object-cover"
                  />
                )}
              </div>
              {hasVideo && program.img ? (
                <img
                  src={program.img}
                  alt={`${program.title} still`}
                  className="rounded-3xl shadow-xl w-full h-56 object-cover"
                />
              ) : null}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-sand to-warmcream">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl text-earth-dark text-center mb-4">
              {program.benefitsTitle}
              <span className="block font-serif-lux italic gold-text mt-2">{program.benefitsAccent}</span>
            </h2>
            <p className="text-center text-earth-med font-serif-lux text-lg mb-12">
              {program.benefitsSubtitle}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {(program.benefits || []).map((benefit) => (
                <div key={benefit} className="glass-natural rounded-2xl p-6 border border-gold/20 flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-gold shrink-0 mt-0.5" />
                  <p className="font-serif-lux text-lg text-earth-dark">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-sand to-warmcream">
        <div className="container text-center">
          <h2 className="font-display text-5xl text-earth-dark mb-6">Ready to begin?</h2>
          <Link href="/#contact">
            <Button className="rounded-full gold-gradient text-navy px-10 py-6 text-lg font-display">
              {program.cta}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
