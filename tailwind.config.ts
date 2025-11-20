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
				// New SkyWay Color Palette - Exclusive Colors
				'sky-blue': '#D7EAEF',
				'mint-green': '#90D090',
				'teal': '#63B0A0',
				'purple': '#9134CB',

				// Neutral grays for text and backgrounds
				'soft-white': '#FFFFFF',
				'light-gray': '#F5F5F7',
				'text-dark': '#1D1D1F',
				'text-gray': '#6e6e73',

				primary: {
					DEFAULT: '#63B0A0', // Teal
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: '#90D090', // Mint Green
					foreground: '#1D1D1F'
				},
				accent: {
					DEFAULT: '#9134CB', // Purple
					foreground: '#FFFFFF'
				},
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