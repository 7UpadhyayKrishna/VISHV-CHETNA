'use client'
import { motion } from 'framer-motion'
import { ArrowLeft, Wind, Clock, Users, Calendar, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function YogaPage() {
  const benefits = [
    'Strengthens body and increases flexibility',
    'Balances mind, body, and spirit',
    'Reduces stress and anxiety',
    'Improves breathing and lung capacity',
    'Enhances focus and concentration',
    'Promotes inner peace and harmony'
  ]

  const details = [
    { icon: Clock, label: 'Duration', value: '60-75 minutes' },
    { icon: Users, label: 'Class Size', value: 'Small groups (10-15)' },
    { icon: Calendar, label: 'Schedule', value: 'Morning & Evening sessions' },
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
                <Wind className="w-4 h-4" />
                Body & Breath
              </div>
              <h1 className="font-display text-6xl md:text-7xl text-earth-dark leading-tight mb-6">
                Yoga
                <span className="block font-serif-lux italic gold-text mt-2">Practice</span>
              </h1>
              <p className="text-earth-med text-xl leading-relaxed font-serif-lux mb-8">
                Experience the timeless wisdom of yoga through traditional asanas that harmonize body, breath, and consciousness. Our practice honors the ancient traditions while making them accessible for modern seekers.
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
                <Button className="rounded-full gold-gradient text-white px-8 py-6 text-lg font-display">
                  Join a Class
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
                src="https://images.unsplash.com/photo-1712934665512-555960ea3680?auto=format&fit=crop&w=1200&q=80"
                alt="Yoga Practice"
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
              Benefits of
              <span className="block font-serif-lux italic gold-text mt-2">Regular Yoga Practice</span>
            </h2>
            <p className="text-center text-earth-med font-serif-lux text-lg mb-12">
              Transform your physical, mental, and spiritual well-being
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
            <h2 className="font-display text-4xl text-earth-dark mb-8">What to Expect</h2>
            <div className="space-y-6 font-serif-lux text-lg text-earth-med leading-relaxed">
              <p>
                Our yoga classes follow traditional Hatha and Vinyasa styles, suitable for all levels from beginners to advanced practitioners. Each session begins with centering and pranayama (breathwork) to prepare the mind and body.
              </p>
              <p>
                We flow through a carefully sequenced series of asanas (postures) that build strength, flexibility, and balance. Throughout the practice, we emphasize breath awareness and mindful movement, creating a moving meditation.
              </p>
              <p>
                Each class concludes with Shavasana (final relaxation) and a brief meditation, allowing the benefits of the practice to integrate fully. You'll leave feeling refreshed, centered, and connected.
              </p>
            </div>

            <div className="mt-12 p-6 bg-gold/5 rounded-2xl border-l-4 border-gold">
              <h3 className="font-display text-xl text-earth-dark mb-3">What to Bring</h3>
              <ul className="space-y-2 font-serif-lux text-earth-med">
                <li>• Yoga mat (available if needed)</li>
                <li>• Comfortable, stretchy clothing</li>
                <li>• Water bottle</li>
                <li>• Towel (optional)</li>
                <li>• Props provided: blocks, straps, bolsters</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-sand to-warmcream">
        <div className="container text-center">
          <h2 className="font-display text-5xl text-earth-dark mb-6">
            Begin Your
            <span className="block font-serif-lux italic gold-text mt-2">Yoga Journey Today</span>
          </h2>
          <p className="text-earth-med font-serif-lux text-xl mb-8 max-w-2xl mx-auto">
            Experience the union of body, mind, and spirit through this ancient practice
          </p>
          <Link href="/#contact">
            <Button className="rounded-full gold-gradient text-white px-10 py-6 text-lg font-display">
              Contact Us to Join
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
