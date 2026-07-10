'use client'
import { motion } from 'framer-motion'
import { ArrowLeft, Leaf, Clock, Users, Calendar, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function PanchKarmaPage() {
  const benefits = [
    'Deep detoxification of body and mind',
    'Balances the three doshas (Vata, Pitta, Kapha)',
    'Strengthens immune system',
    'Improves digestion and metabolism',
    'Rejuvenates tissues and organs',
    'Promotes longevity and vitality'
  ]

  const details = [
    { icon: Clock, label: 'Duration', value: '7-21 day programs' },
    { icon: Users, label: 'Approach', value: 'Personalized treatment' },
    { icon: Calendar, label: 'Consultation', value: 'Required before start' },
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
                <Leaf className="w-4 h-4" />
                Ayurveda
              </div>
              <h1 className="font-display text-6xl md:text-7xl text-earth-dark leading-tight mb-6">
                Panch Karma
                <span className="block font-serif-lux italic gold-text mt-2">& Naturopathy</span>
              </h1>
              <p className="text-earth-med text-xl leading-relaxed font-serif-lux mb-8">
                Experience the five sacred purifications of Ayurveda that restore perfect harmony between body, mind, and nature. This ancient detoxification system eliminates toxins at the deepest cellular level.
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
                  Book Consultation
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
                src="https://images.unsplash.com/photo-1646815672058-c203442b9c0d?auto=format&fit=crop&w=1200&q=80"
                alt="Panch Karma"
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
              <span className="block font-serif-lux italic gold-text mt-2">Ayurvedic Purification</span>
            </h2>
            <p className="text-center text-earth-med font-serif-lux text-lg mb-12">
              Restore your natural balance and vitality
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
            <h2 className="font-display text-4xl text-earth-dark mb-8">The Five Sacred Therapies</h2>
            <div className="space-y-6 font-serif-lux text-lg text-earth-med leading-relaxed">
              <p>
                Panch Karma (meaning "five actions") is the cornerstone of Ayurvedic medicine. This comprehensive detoxification program includes five main purification therapies, customized to your unique constitution and needs.
              </p>
              <p>
                The process begins with preparatory treatments (Purvakarma) including oil massage and herbal steam therapy. This is followed by the main cleansing procedures, and concludes with rejuvenation therapies (Paschatkarma) that rebuild and strengthen your system.
              </p>
              <p>
                Combined with naturopathy principles, we use nature's own healing forces - fresh air, sunlight, pure water, proper diet, and rest - to support your body's innate wisdom to heal itself. This holistic approach addresses the root cause of imbalance, not just symptoms.
              </p>
            </div>

            <div className="mt-12 p-6 bg-gold/5 rounded-2xl border-l-4 border-gold">
              <h3 className="font-display text-xl text-earth-dark mb-3">Program Includes</h3>
              <ul className="space-y-2 font-serif-lux text-earth-med">
                <li>• Initial Ayurvedic constitution assessment</li>
                <li>• Personalized diet and lifestyle plan</li>
                <li>• Daily therapeutic treatments</li>
                <li>• Herbal medicines and supplements</li>
                <li>• Yoga and meditation guidance</li>
                <li>• Post-program follow-up support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-sand to-warmcream">
        <div className="container text-center">
          <h2 className="font-display text-5xl text-earth-dark mb-6">
            Begin Your
            <span className="block font-serif-lux italic gold-text mt-2">Healing Journey</span>
          </h2>
          <p className="text-earth-med font-serif-lux text-xl mb-8 max-w-2xl mx-auto">
            Experience the profound healing power of ancient Ayurvedic wisdom
          </p>
          <Link href="/#contact">
            <Button className="rounded-full gold-gradient text-navy px-10 py-6 text-lg font-display">
              Schedule Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
