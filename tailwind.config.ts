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
            // New SkyWay Palette
            'sky-blue': '#2B7BFF',
            'deep-navy': '#0F1E3D',
            'tech-cyan': '#4ED6FF',
            'air-mint': '#DFFBEF',
            'soft-sky-white': '#F8FBFF',
            'light-sky-blue': '#EAF5FF',
            'soft-gray': '#EEF3FA',
            'pure-white': '#FFFFFF',
            
            // Keeping some original colors for backward compatibility if needed, but mapping them to new palette where possible
  			primary: {
  				DEFAULT: '#2B7BFF', // Skyway Blue
  				foreground: '#FFFFFF'
  			},
  			secondary: {
  				DEFAULT: '#4ED6FF', // Tech Cyan
  				foreground: '#0F1E3D'
  			},
            accent: {
                DEFAULT: '#DFFBEF', // Air Mint
                foreground: '#0F1E3D'
            },
  			neutral: {
  				'50': '#F8FBFF',
  				'100': '#EEF3FA',
  				'200': '#EAF5FF',
  				'300': '#cbd5e1', // Fallback
  				'400': '#94a3b8', // Fallback
  				'500': '#64748b', // Fallback
  				'600': '#475569', // Fallback
  				'700': '#334155', // Fallback
  				'800': '#1e293b', // Fallback
  				'900': '#0F1E3D'  // Deep Navy
  			},
            
            // Custom Aliases for the theme
  			'sky-navy': '#0F1E3D',
  			'sky-gold': '#4ED6FF', // Replaced Gold with Tech Cyan for consistency with new theme
            
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
            'gradient-hero': 'linear-gradient(180deg, #2B7BFF 0%, #0090F3 50%, #4ED6FF 100%)',
            'gradient-footer': 'linear-gradient(180deg, #0F1E3D 0%, #071021 100%)',
            'gradient-mint': 'linear-gradient(180deg, #DFFBEF 0%, #ECFFF7 100%)',
            'gradient-blue-strong': 'linear-gradient(180deg, #2B7BFF 0%, #0090F3 100%)',
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
  		borderRadius: {
  			none: '0',
  			sm: 'calc(var(--radius) - 4px)',
  			DEFAULT: '0.375rem',
  			md: 'calc(var(--radius) - 2px)',
  			lg: 'var(--radius)',
  			xl: '1rem',
  			'2xl': '1.5rem',
  			'3xl': '2rem',
  			bubble: '1.5rem', // Increased for more organic feel
  			pill: '9999px'
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.5s ease-in-out',
  			'slide-up': 'slideUp 0.3s ease-out',
  			'slide-down': 'slideDown 0.3s ease-out',
  			'scale-in': 'scaleIn 0.2s ease-out',
  			'bounce-gentle': 'bounceGentle 3s ease-in-out infinite',
            'float': 'float 6s ease-in-out infinite',
            'float-delayed': 'float 6s ease-in-out 3s infinite',
            'cloud-move': 'cloudMove 60s linear infinite',
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': { opacity: '0' },
  				'100%': { opacity: '1' }
  			},
  			slideUp: {
  				'0%': { transform: 'translateY(10px)', opacity: '0' },
  				'100%': { transform: 'translateY(0)', opacity: '1' }
  			},
  			slideDown: {
  				'0%': { transform: 'translateY(-10px)', opacity: '0' },
  				'100%': { transform: 'translateY(0)', opacity: '1' }
  			},
  			scaleIn: {
  				'0%': { transform: 'scale(0.95)', opacity: '0' },
  				'100%': { transform: 'scale(1)', opacity: '1' }
  			},
  			bounceGentle: {
  				'0%, 100%': { transform: 'translateY(-5px)' },
  				'50%': { transform: 'translateY(5px)' }
  			},
            float: {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-20px)' }
            },
            cloudMove: {
                '0%': { transform: 'translateX(0)' },
                '100%': { transform: 'translateX(-50%)' }
            }
  		},
  		boxShadow: {
  			soft: '0 4px 20px rgba(43, 123, 255, 0.08)', // Blue-tinted shadow
  			'soft-lg': '0 10px 40px rgba(43, 123, 255, 0.12)',
  			'soft-xl': '0 20px 60px rgba(43, 123, 255, 0.15)',
  			'glow-sm': '0 0 15px rgba(78, 214, 255, 0.3)',
  			glow: '0 0 30px rgba(78, 214, 255, 0.4)',
  			'glow-lg': '0 0 50px rgba(78, 214, 255, 0.5)'
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