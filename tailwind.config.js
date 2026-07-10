/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        gold: {
          DEFAULT: '#C8A14A',
          light: '#E7C77A',
          dark: '#8E6E22',
        },
        navy: {
          DEFAULT: '#132238',
          deep: '#0A1220',
        },
        'earth-dark': '#3D342A',
        warmcream: '#F5F1E8',
        sand: '#E8E3D6',
        warmwhite: '#FAF9F4',
        ink: '#101418',
        sage: '#84C88A',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        display: ['var(--font-cinzel)', 'Georgia', 'serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'float': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gold-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(200,161,74,0.3), 0 0 60px rgba(200,161,74,0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(200,161,74,0.6), 0 0 120px rgba(200,161,74,0.3)' },
        },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        'drift': {
          '0%': { transform: 'translate(0,0)' },
          '50%': { transform: 'translate(30px,-40px)' },
          '100%': { transform: 'translate(0,0)' },
        },
        'sun-rise': {
          '0%': { transform: 'translateY(30%) scale(0.9)', opacity: '0.4' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        'cloud-drift': {
          '0%': { transform: 'translateX(-10%)' },
          '100%': { transform: 'translateX(110%)' },
        },
        'text-reveal': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'gold-pulse': 'gold-pulse 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 30s linear infinite',
        'drift': 'drift 12s ease-in-out infinite',
        'sun-rise': 'sun-rise 3s ease-out forwards',
        'cloud-drift': 'cloud-drift 60s linear infinite',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}
