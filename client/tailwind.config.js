/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
         colors: {
            kaidCream:        '#FDF6EC',
            kaidGreen:        '#6BCA50',
            buttonPeach:      '#FF9A6C',
            buttonPeachHover: '#f89168',
            sunshineYellow:   '#FDD848',
            kaidBrown:        '#A52A2A',

            paynesGray:       '#696D7D',
            verdigris:        '#7EBDC3',
            atomicTangerine:  '#FAA381',
            mantis:           '#6BCA50',
            lightOrange:      '#F5CDA7',

            peach:            '#FFB7C5',
            cherry:           '#c7607b',         
            cherryWood:       '#651A14',

            olive:            '#3A5B26',
            yolkOrange:       '#E17E06',
            yolkYellow:       '#F2E074',
            avocado:          '#D0D59D',
            eggShell:         '#E8D6C1',

            blueberry:        '#3D4547',
            kiwi:             '#9C9F52',
            deepCherry:       '#842B2F',
            fig:              '#ECD0C2',
            cream:            '#EDEEE9',

            castIron:         '#0D1419',
            navy:             '#253A4A',
            juicyOrange:      '#E0A840',
            tiled:            '#CDC6B6',
            tiledLight:       '#F7F4E3'
      },
      },
    },
    plugins: [],
  };
