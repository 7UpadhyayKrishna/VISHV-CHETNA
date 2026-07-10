'use client'
import { motion } from 'framer-motion'
import { ArrowLeft, Moon, Clock, Users, Calendar, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function PastLifeRegressionPage() {
  const benefits = [
    'Heal karmic patterns and blockages',
    'Understand soul purpose and life lessons',
    'Release unexplained fears and phobias',
    'Discover past life connections',
    'Gain clarity on current relationships',
    'Experience profound spiritual insights'
  ]

  const details = [
    { icon: Clock, label: 'Duration', value: '2-3 hours' },
    { icon: Users, label: 'Session Type', value: 'Individual (1-on-1)' },
    { icon: Calendar, label: 'Availability', value: 'By appointment' },
  ]

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
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-medium mb-6">
                <Moon className="w-4 h-4" />
                Soul Memory
              </div>
              <h1 className="font-display text-6xl md:text-7xl text-earth-dark leading-tight mb-6">
                Past Life
                <span className="block font-serif-lux italic gold-text mt-2">Regression</span>
              </h1>
              <p className="text-earth-med text-xl leading-relaxed font-serif-lux mb-8">
                Journey beyond this lifetime to access the wisdom of your soul. Through guided deep relaxation and hypnosis, explore past incarnations to heal karmic patterns and understand your soul's eternal journey.
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
                  Book a Session
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold/30 rounded-tl-3xl" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold/30 rounded-br-3xl" />
              <img
                src="https://images.unsplash.com/photo-1616435577207-ca90abc6b732?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHwyfHxsb3R1cyUyMGZsb3dlcnxlbnwwfHx8fDE3ODI5NTg0Mjh8MA&ixlib=rb-4.1.0&q=85"
                alt="Past Life Regression"
                className="rounded-3xl shadow-2xl w-full h-[600px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-sand to-warmcream">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl text-earth-dark text-center mb-4">
              Healing Through
              <span className="block font-serif-lux italic gold-text mt-2">Past Life Exploration</span>
            </h2>
            <p className="text-center text-earth-med font-serif-lux text-lg mb-12">
              Discover the transformative power of soul memory
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-natural rounded-2xl p-6 border border-gold/20 flex items-start gap-4"
                >
                  <CheckCircle className="w-6 h-6 text-gold shrink-0 mt-1" />
                  <p className="font-serif-lux text-lg text-earth-dark">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto glass-natural rounded-3xl p-12 border border-gold/20">
            <h2 className="font-display text-4xl text-earth-dark mb-8">The Journey</h2>
            <div className="space-y-6 font-serif-lux text-lg text-earth-med leading-relaxed">
              <p>
                Past Life Regression is a profound therapeutic technique that uses deep relaxation and guided visualization to access memories from previous incarnations. This is a safe, natural process facilitated by an experienced practitioner.
              </p>
              <p>
                During your session, you'll enter a deeply relaxed state where your conscious mind steps aside, allowing access to the vast library of your soul's experiences. You may witness specific lifetimes, key moments, relationships, or patterns that illuminate your current life challenges.
              </p>
              <p>
                Many clients experience immediate relief from long-standing issues, gain clarity about their life purpose, or find healing for unexplained emotions and relationships. Each journey is unique and reveals exactly what your soul needs to heal and grow.
              </p>
            </div>

            <div className="mt-12 p-6 bg-gold/5 rounded-2xl border-l-4 border-gold">
              <h3 className="font-display text-xl text-earth-dark mb-3">Preparation</h3>
              <ul className="space-y-2 font-serif-lux text-earth-med">
                <li>• Come with an open mind and specific questions</li>
                <li>• Wear comfortable clothing</li>
                <li>• Avoid heavy meals before session</li>
                <li>• Sessions are recorded for your review</li>
                <li>• Allow quiet time after for integration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-sand to-warmcream">
        <div className="container text-center">
          <h2 className="font-display text-5xl text-earth-dark mb-6">
            Explore Your
            <span className="block font-serif-lux italic gold-text mt-2">Soul's Journey</span>
          </h2>
          <p className="text-earth-med font-serif-lux text-xl mb-8 max-w-2xl mx-auto">
            Unlock the wisdom of your past lives and heal your present
          </p>
          <Link href="/#contact">
            <Button className="rounded-full gold-gradient text-navy px-10 py-6 text-lg font-display">
              Schedule Your Session
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
