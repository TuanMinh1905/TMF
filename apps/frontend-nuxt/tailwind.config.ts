import type { PluginAPI } from 'tailwindcss/types/config'

export default {
  content: [
    './app.vue',
    './pages/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
  ],

  theme: {
    extend: {
      colors: {
        primary: '#355C7D',
        secondary: '#274060',
        accent: '#A8DADC',
        grayTMF: '#414545',
        blackTMF: 'black',
        buttonBarner: '#FFF8D6',
        textProduct: '#414545',
        textBrand: '#707070',
        colorLayout: '#F2F2F2',
        tagBlog: '#FFF3BD',
        popupDogCat: '#FFFCDD',
        turnOff: '#EDEDED',
        colorLink: '#1D4ED8',
      },

      fontFamily: {
        Longreach: ['SVN-DKLongreach', 'sans-serif'],
        monasans: ['MonaSans', 'sans-serif'],
      },

      keyframes: {
        slideDown: {
          from: {
            opacity: '0',
            transform: 'translateY(-8px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        slideDown: 'slideDown 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/typography'),
    function ({ addComponents }: PluginAPI) {
      addComponents({
        '.flexRow-center': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        '.flexRow-between': {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        '.flexCol-center': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
      })
    },
  ],
}
