/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {
    colors: { 'primary-dark': '#0F3D2E', primary: '#3FA34D', accent: '#F5A623', background: '#F4F7F4' },
    fontFamily: { sans: ['Inter', 'sans-serif'] },
    boxShadow: { soft: '0 12px 35px rgba(15,61,46,.09)' },
  } },
  plugins: [],
}
