import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'50': '#f0f4f8',
  				'100': '#d9e2ec',
  				'200': '#bcccdc',
  				'300': '#9fb3c8',
  				'400': '#829ab1',
  				'500': '#627d98',
  				'600': '#486581',
  				'700': '#334e68',
  				'800': '#243b53',
  				'900': '#1B263B',
  				'950': '#0D1B2A',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'50': '#fef7ed',
  				'100': '#fdedd3',
  				'200': '#fad7a5',
  				'300': '#f6bc6d',
  				'400': '#f19c33',
  				'500': '#E0A458',
  				'600': '#d1860b',
  				'700': '#ae650c',
  				'800': '#8d4f11',
  				'900': '#744112',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			neutral: {
  				'50': '#F7F9FC',
  				'100': '#f1f5f9',
  				'200': '#e2e8f0',
  				'300': '#cbd5e1',
  				'400': '#A9B1B9',
  				'500': '#64748b',
  				'600': '#475569',
  				'700': '#334155',
  				'800': '#1e293b',
  				'900': '#0f172a'
  			},
  			support: '#3E4C59',
  			'sky-navy': '#0D1B2A',
  			'sky-blue': '#1B263B',
  			'sky-slate': '#3E4C59',
  			'sky-gold': '#E0A458',
  			'sky-light': '#F7F9FC',
  			'sky-mid': '#A9B1B9',
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
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			],
  			display: [
  				'Poppins',
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			xs: [
  				'0.75rem',
  				{
  					lineHeight: '1rem'
  				}
  			],
  			sm: [
  				'0.875rem',
  				{
  					lineHeight: '1.25rem'
  				}
  			],
  			base: [
  				'1rem',
  				{
  					lineHeight: '1.5rem'
  				}
  			],
  			lg: [
  				'1.125rem',
  				{
  					lineHeight: '1.75rem'
  				}
  			],
  			xl: [
  				'1.25rem',
  				{
  					lineHeight: '1.75rem'
  				}
  			],
  			'2xl': [
  				'1.5rem',
  				{
  					lineHeight: '2rem'
  				}
  			],
  			'3xl': [
  				'1.875rem',
  				{
  					lineHeight: '2.25rem'
  				}
  			],
  			'4xl': [
  				'2.25rem',
  				{
  					lineHeight: '2.5rem'
  				}
  			],
  			'5xl': [
  				'3rem',
  				{
  					lineHeight: '1'
  				}
  			],
  			'6xl': [
  				'3.75rem',
  				{
  					lineHeight: '1'
  				}
  			]
  		},
  		borderRadius: {
  			none: '0',
  			sm: 'calc(var(--radius) - 4px)',
  			DEFAULT: '0.375rem',
  			md: 'calc(var(--radius) - 2px)',
  			lg: 'var(--radius)',
  			xl: '1rem',
  			'2xl': '1.5rem',
  			'3xl': '2rem',
  			bubble: '1.25rem',
  			pill: '9999px'
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem',
  			'128': '32rem'
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.5s ease-in-out',
  			'slide-up': 'slideUp 0.3s ease-out',
  			'slide-down': 'slideDown 0.3s ease-out',
  			'scale-in': 'scaleIn 0.2s ease-out',
  			'bounce-gentle': 'bounceGentle 0.6s ease-in-out',
  			glow: 'glow 2s ease-in-out infinite alternate'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			slideUp: {
  				'0%': {
  					transform: 'translateY(10px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			slideDown: {
  				'0%': {
  					transform: 'translateY(-10px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			scaleIn: {
  				'0%': {
  					transform: 'scale(0.95)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				}
  			},
  			bounceGentle: {
  				'0%, 100%': {
  					transform: 'translateY(-2px)'
  				},
  				'50%': {
  					transform: 'translateY(0)'
  				}
  			},
  			glow: {
  				'0%': {
  					boxShadow: '0 0 20px rgba(224, 164, 88, 0.3)'
  				},
  				'100%': {
  					boxShadow: '0 0 30px rgba(224, 164, 88, 0.6)'
  				}
  			}
  		},
  		backdropBlur: {
  			xs: '2px'
  		},
  		boxShadow: {
  			soft: '0 2px 8px rgba(0, 0, 0, 0.04)',
  			'soft-lg': '0 4px 16px rgba(0, 0, 0, 0.08)',
  			'soft-xl': '0 8px 32px rgba(0, 0, 0, 0.12)',
  			'glow-sm': '0 0 10px rgba(224, 164, 88, 0.3)',
  			glow: '0 0 20px rgba(224, 164, 88, 0.4)',
  			'glow-lg': '0 0 30px rgba(224, 164, 88, 0.5)'
  		}
  	}
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
      require("tailwindcss-animate")
],
}
export default config