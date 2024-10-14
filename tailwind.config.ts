import type { Config } from 'tailwindcss';

const config: Partial<Config> = {
  /** @description this is disabled permanently by changing the class from the default `dark:` until we add dark mode support */
  darkMode: ['class', 'dark-disabled'],
  theme: {
    extend: {
      boxShadow: {
        lg: '0 12px 24px -4px rgb(0 0 0 / 0.15)',
        md: '0 8px 16px -4px rgb(0 0 0 / 0.1)',
        sm: '0 2px 6px -3px rgb(0 0 0 / 0.08)'
      },
      aspectRatio: {
        palette: '8 / 5',
        color: '9 / 16'
      },
      colors: {
        black: '#272f38',
        primary: {
          50: '#ecf4ff',
          100: '#ddebff',
          200: '#c2daff',
          300: '#9cbfff',
          400: '#759aff',
          500: '#5576ff',
          600: '#364cf5',
          700: '#2a3bd8',
          800: '#2535ae',
          900: '#263489',
          950: '#161c50'
        },
        'default-blue': {
          50: '#ecf4ff',
          100: '#ddebff',
          200: '#c2daff',
          300: '#9cbfff',
          400: '#759aff',
          500: '#5576ff',
          600: '#364cf5',
          700: '#2a3bd8',
          800: '#2535ae',
          900: '#263489',
          950: '#161c50'
        },
        warning: {
          50: '#fffbeb',
          100: '#fff3c6',
          200: '#ffe688',
          300: '#fed34b',
          400: '#fec536',
          500: '#f89e08',
          600: '#dc7603',
          700: '#b65207',
          800: '#943f0c',
          900: '#79340e',
          950: '#461a02'
        },
        'default-black': {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#1F2328', // after here goes lighter
          600: '#363b43',
          700: '#3d454d',
          800: '#455059',
          900: '#4f5d6b',
          950: '#5c707e'
        }
      }
    }
  }
};

export default config;
