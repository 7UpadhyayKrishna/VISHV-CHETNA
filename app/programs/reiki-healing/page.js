'use client'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, Clock, Users, Calendar, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ReikiHealingPage() {
  const benefits = [
    'Balances energy centers (chakras)',
    'Reduces stress and promotes relaxation',
    'Accelerates physical healing',
    'Clears emotional blockages',
    'Enhances spiritual connection',
    'Supports overall well-being'
  ]

  const details = [
    { icon: Clock, label: 'Duration', value: '60-90 minutes' },
    { icon: Users, label: 'Session Type', value: 'Individual or group' },
    { icon: Calendar, label: 'Frequency', value: 'Weekly recommended' },
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
                <Sparkles className="w-4 h-4" />
                Universal Energy
              </div>
              <h1 className="font-display text-6xl md:text-7xl text-earth-dark leading-tight mb-6">
                Reiki
                <span className="block font-serif-lux italic gold-text mt-2">Healing</span>
              </h1>
              <p className="text-earth-med text-xl leading-relaxed font-serif-lux mb-8">
                Channel divine light and universal life-force energy to heal on every level — physical, emotional, mental, and spiritual. Experience the gentle yet powerful touch of Reiki energy.
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
                src="https://images.unsplash.com/photo-1619136652739-98f01e200732?auto=format&fit=crop&w=1200&q=80"
                alt="Reiki Healing"
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
              <span className="block font-serif-lux italic gold-text mt-2">Reiki Energy Healing</span>
            </h2>
            <p className="text-center text-earth-med font-serif-lux text-lg mb-12">
              Experience profound healing on all levels of your being
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
            <h2 className="font-display text-4xl text-earth-dark mb-8">The Reiki Experience</h2>
            <div className="space-y-6 font-serif-lux text-lg text-earth-med leading-relaxed">
              <p>
                Reiki is a Japanese healing technique where universal life-force energy ("Rei" = universal, "Ki" = life energy) is channeled through the practitioner's hands to the recipient. This gentle, non-invasive practice works on the principle that energy can become blocked, causing physical or emotional imbalance.
              </p>
              <p>
                During a Reiki session, you'll lie comfortably clothed on a treatment table while the practitioner gently places their hands on or near various positions on your body. You may experience warmth, tingling, or deep relaxation as the energy flows and balances your system.
              </p>
              <p>
                Many people report feeling deeply peaceful during Reiki, with some experiencing emotional releases or spiritual insights. The healing continues to work after the session, often bringing noticeable improvements in the days following treatment. Reiki is safe, natural, and complements all other healing modalities.
              </p>
            </div>

            <div className="mt-12 p-6 bg-gold/5 rounded-2xl border-l-4 border-gold">
              <h3 className="font-display text-xl text-earth-dark mb-3">What to Expect</h3>
              <ul className="space-y-2 font-serif-lux text-earth-med">
                <li>• Relaxing, peaceful environment</li>
                <li>• Fully clothed on comfortable table</li>
                <li>• Gentle hand placements (or hovering)</li>
                <li>• Calming music and aromatherapy</li>
                <li>• Post-session integration time</li>
                <li>• Personalized guidance and recommendations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-sand to-warmcream">
        <div className="container text-center">
          <h2 className="font-display text-5xl text-earth-dark mb-6">
            Experience the Healing
            <span className="block font-serif-lux italic gold-text mt-2">Power of Reiki</span>
          </h2>
          <p className="text-earth-med font-serif-lux text-xl mb-8 max-w-2xl mx-auto">
            Allow universal life-force energy to restore balance and harmony
          </p>
          <Link href="/#contact">
            <Button className="rounded-full gold-gradient text-navy px-10 py-6 text-lg font-display">
              Book Your Healing Session
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
