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
				// SkyWay Palette - Preserved
				'sky-blue': '#0071E3', // Apple-like Blue
				'deep-navy': '#1D1D1F', // Apple-like Dark
				'tech-cyan': '#4ED6FF',
				'air-mint': '#DFFBEF',
				'soft-sky-white': '#F5F5F7', // Apple Light Gray
				'light-sky-blue': '#EAF5FF',
				'soft-gray': '#86868b', // Apple Gray
				'pure-white': '#FFFFFF',

				primary: {
					DEFAULT: '#0071E3',
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: '#F5F5F7',
					foreground: '#1D1D1F'
				},
				accent: {
					DEFAULT: '#4ED6FF',
					foreground: '#1D1D1F'
				},
				neutral: {
					'50': '#F5F5F7',
					'100': '#E8E8ED',
					'200': '#D2D2D7',
					'300': '#86868b',
					'400': '#6e6e73',
					'500': '#424245',
					'600': '#1D1D1F',
					'900': '#000000'
				},

				'sky-navy': '#1D1D1F',
				'sky-gold': '#4ED6FF',

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
			backgroundImage: {
				'gradient-hero': 'linear-gradient(180deg, #F5F5F7 0%, #FFFFFF 100%)',
			},
			fontFamily: {
				sans: [
					'Inter',
					'-apple-system',
					'BlinkMacSystemFont',
					'system-ui',
					'sans-serif'
				],
				display: [
					'Inter',
					'-apple-system',
					'system-ui',
					'sans-serif'
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
				'4xl': '2.5rem',
				bubble: '2rem',
				pill: '9999px'
			},
			animation: {
				'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
				'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
				'scale-up': 'scaleUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
				'float': 'float 6s ease-in-out infinite',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				slideUp: {
					'0%': { transform: 'translateY(30px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				scaleUp: {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				}
			},
			boxShadow: {
				soft: '0 4px 20px rgba(0, 0, 0, 0.05)',
				'soft-lg': '0 10px 40px rgba(0, 0, 0, 0.08)',
				'apple': '0 4px 24px rgba(0, 0, 0, 0.06)',
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