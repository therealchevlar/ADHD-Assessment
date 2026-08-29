/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F2F1EC',
          dim: '#E8E7DF',
          panel: '#FBFAF7',
        },
        ink: {
          DEFAULT: '#182A2E',
          soft: '#3B4E52',
          faint: '#6B7B7E',
        },
        verdigris: {
          50: '#EEF4F2',
          100: '#D7E5E1',
          200: '#AFCBC3',
          300: '#84AFA5',
          400: '#5C8F84',
          500: '#3E6B64',
          600: '#2F5751',
          700: '#254440',
          800: '#1B3330',
          900: '#132523',
        },
        amber: {
          100: '#F3E4CB',
          300: '#DDB878',
          500: '#B5762F',
          700: '#8A5A22',
        },
        clay: {
          100: '#F1DAD3',
          400: '#C98470',
          600: '#A15641',
        },
      },
      fontFamily: {
        display: ['"Source Serif 4"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(24,42,46,0.06), 0 1px 0 rgba(24,42,46,0.04)',
        raised: '0 4px 16px rgba(24,42,46,0.08)',
      },
      borderRadius: {
        sm: '3px',
        DEFAULT: '5px',
        md: '7px',
        lg: '10px',
      },
    },
  },
  plugins: [],
}
