'use client'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, Clock, Users, Calendar, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function MokshaPage() {
  const benefits = [
    'Dissolve ego identification',
    'Experience non-dual awareness',
    'Transcend suffering and limitation',
    'Realize your true nature',
    'Attain inner freedom and peace',
    'Live from infinite consciousness'
  ]

  const details = [
    { icon: Clock, label: 'Duration', value: 'Ongoing practice' },
    { icon: Users, label: 'Format', value: 'Retreats & Daily practice' },
    { icon: Calendar, label: 'Commitment', value: 'Self-paced journey' },
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
                <Star className="w-4 h-4" />
                Liberation
              </div>
              <h1 className="font-display text-6xl md:text-7xl text-earth-dark leading-tight mb-6">
                Moksha
                <span className="block font-serif-lux italic gold-text mt-2">Path to Liberation</span>
              </h1>
              <p className="text-earth-med text-xl leading-relaxed font-serif-lux mb-8">
                The ultimate goal of spiritual practice — complete liberation from the cycle of birth and death. Step into infinite, boundless awareness and realize your true nature beyond all limitation.
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
                  Begin the Path
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
                src="https://images.unsplash.com/photo-1648450934224-2dfd28a9e316?auto=format&fit=crop&w=1600&q=80"
                alt="Moksha - Liberation"
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
              Journey to
              <span className="block font-serif-lux italic gold-text mt-2">Ultimate Freedom</span>
            </h2>
            <p className="text-center text-earth-med font-serif-lux text-lg mb-12">
              Experience the liberation that is your true nature
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
            <h2 className="font-display text-4xl text-earth-dark mb-8">The Path of Liberation</h2>
            <div className="space-y-6 font-serif-lux text-lg text-earth-med leading-relaxed">
              <p>
                Moksha represents the highest aspiration in spiritual life — complete freedom from all suffering, limitation, and the endless cycle of birth and death. It is the direct realization that you are not the body, not the mind, not even the soul — but the infinite, eternal consciousness itself.
              </p>
              <p>
                This path draws from the deepest teachings of Advaita Vedanta, Kashmir Shaivism, and other non-dual traditions. Through direct inquiry, meditation, and the grace of awakened guidance, the illusion of separation dissolves, revealing the truth that has always been here.
              </p>
              <p>
                Our Moksha program includes intensive retreats, daily practices, study of sacred texts, and one-on-one guidance. This is not a path of belief, but of direct recognition. It requires sincere commitment, but the reward is nothing less than the end of suffering and the realization of your infinite nature.
              </p>
            </div>

            <div className="mt-12 p-6 bg-gold/5 rounded-2xl border-l-4 border-gold">
              <h3 className="font-display text-xl text-earth-dark mb-3">Program Components</h3>
              <ul className="space-y-2 font-serif-lux text-earth-med">
                <li>• Self-inquiry meditation (Atma Vichara)</li>
                <li>• Study of Upanishads and Bhagavad Gita</li>
                <li>• Silent meditation retreats</li>
                <li>• One-on-one spiritual guidance</li>
                <li>• Satsang (gatherings in truth)</li>
                <li>• Integration practices for daily life</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-sand to-warmcream">
        <div className="container text-center">
          <h2 className="font-display text-5xl text-earth-dark mb-6">
            Are You Ready for
            <span className="block font-serif-lux italic gold-text mt-2">True Liberation?</span>
          </h2>
          <p className="text-earth-med font-serif-lux text-xl mb-8 max-w-2xl mx-auto">
            Take the final step in your spiritual journey — realize your infinite nature
          </p>
          <Link href="/#contact">
            <Button className="rounded-full gold-gradient text-navy px-10 py-6 text-lg font-display">
              Begin Your Journey
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
