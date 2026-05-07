import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'mtg-blue': '#1a3a5c',
        'mtg-gold': '#c9a84c',
        'mtg-dark': '#0f172a',
        'mtg-card': '#1e293b',
        'mtg-void': '#0b1220',
        // 魔法力五色
        'mana-w': '#FAF0E6',
        'mana-u': '#4FC3F7',
        'mana-b': '#7B1FA2',
        'mana-r': '#E53935',
        'mana-g': '#43A047',
        // 稀有度
        'mythic': '#FF6F00',
        'rare': '#FFB300',
        'uncommon': '#9E9E9E',
        'common': '#616161',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;