/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  './pages/**/*.{ts,tsx}',
	  './components/**/*.{ts,tsx}',
	  './app/**/*.{ts,tsx}',
	  './src/**/*.{ts,tsx}',
	],
	theme: {
	  container: {
		center: true,
		padding: "2rem",
		screens: {
		  "2xl": "1400px",
		},
	  },
	  extend: {
		fontFamily: {
			sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
			mono: ['var(--font-geist-mono)', 'monospace'],
			display: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
		},
		colors: {
		  blue: {
			50: '#f0f9ff',
			100: '#e0f2fe',
			200: '#bae6fd',
			300: '#7dd3fc',
			400: '#38bdf8',
			500: '#0ea5e9',
			600: '#0284c7',
			700: '#0369a1',
			800: '#075985',
			900: '#0c4a6e',
			950: '#082f49',
		  },
		  border: "hsl(var(--border))",
		  input: "hsl(var(--input))",
		  ring: "hsl(var(--ring))",
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
		  primary: {
			DEFAULT: "hsl(var(--primary))",
			foreground: "hsl(var(--primary-foreground))",
		  },
		  secondary: {
			DEFAULT: "hsl(var(--secondary))",
			foreground: "hsl(var(--secondary-foreground))",
		  },
		  destructive: {
			DEFAULT: "hsl(var(--destructive))",
			foreground: "hsl(var(--destructive-foreground))",
		  },
		  muted: {
			DEFAULT: "hsl(var(--muted))",
			foreground: "hsl(var(--muted-foreground))",
		  },
		  accent: {
			DEFAULT: "hsl(var(--accent))",
			foreground: "hsl(var(--accent-foreground))",
		  },
		  popover: {
			DEFAULT: "hsl(var(--popover))",
			foreground: "hsl(var(--popover-foreground))",
		  },
		  card: {
			DEFAULT: "hsl(var(--card))",
			foreground: "hsl(var(--card-foreground))",
		  },
		  chart: {
			1: "hsl(var(--chart-1))",
			2: "hsl(var(--chart-2))",
			3: "hsl(var(--chart-3))",
			4: "hsl(var(--chart-4))",
			5: "hsl(var(--chart-5))",
		  },
		},
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)",
		},
		keyframes: {
		  "accordion-down": {
			from: { height: 0 },
			to: { height: "var(--radix-accordion-content-height)" },
		  },
		  "accordion-up": {
			from: { height: "var(--radix-accordion-content-height)" },
			to: { height: 0 },
		  },
		  "fade-in": {
			from: { opacity: 0 },
			to: { opacity: 1 },
		  },
		  "fade-out": {
			from: { opacity: 1 },
			to: { opacity: 0 },
		  },
		  "slide-in": {
			from: { transform: "translateY(10px)", opacity: 0 },
			to: { transform: "translateY(0)", opacity: 1 },
		  },
		},
		animation: {
		  "accordion-down": "accordion-down 0.2s ease-out",
		  "accordion-up": "accordion-up 0.2s ease-out",
		  "fade-in": "fade-in 0.3s ease-out",
		  "fade-out": "fade-out 0.3s ease-out",
		  "slide-in": "slide-in 0.4s ease-out",
		},
		transitionProperty: {
		  'height': 'height',
		  'spacing': 'margin, padding',
		  'width': 'width',
		  'transform': 'transform',
		},
		transitionTimingFunction: {
		  'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
		  'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
		},
		transitionDuration: {
		  '250': '250ms',
		  '400': '400ms',
		},
	  },
	},
	plugins: [require("tailwindcss-animate"),require('@tailwindcss/typography')],
  }