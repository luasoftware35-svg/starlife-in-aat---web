/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['Inter', 'system-ui', 'sans-serif'],
  			display: ['"Instrument Serif"', 'Georgia', 'serif'],
  			heading: ['"Instrument Serif"', 'Georgia', 'serif'],
  			mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			gold: {
  				DEFAULT: '#D4AF37',
  				light: '#E8D07A',
  				dark: '#A8861A',
  			},
  			ink: '#1A1A1A',
  			mist: '#FAFAFA',
  			surface: '#FFFFFF',
  			warm: '#F0EDE8',
  			pomegranate: {
  				DEFAULT: '#D4AF37',
  				light: '#E8D07A',
  				dark: '#A8861A',
  				deep: '#1A1A1A',
  			},
  			cream: '#FAFAFA',
  			'cream-warm': '#F0EDE8',
  			charcoal: '#1A1A1A',
  			'charcoal-soft': '#262626',
  			'charcoal-mid': '#333333',
  			'warm-gray': '#78716c',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: '#E5E0D8',
  			input: '#E5E0D8',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			},
  			'shimmer': {
  				'0%': { transform: 'translateY(-100%)' },
  				'100%': { transform: 'translateY(100%)' }
  			},
  			'marquee': {
  				'0%': { transform: 'translateX(0)' },
  				'100%': { transform: 'translateX(-33.333%)' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'shimmer': 'shimmer 6s ease-in-out infinite',
  			'marquee': 'marquee 28s linear infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
