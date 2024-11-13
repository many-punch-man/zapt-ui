/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const { iconsPlugin, getIconCollections } = require("@egoist/tailwindcss-icons")


export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
                'inter-tight': ['Inter Tight', 'sans-serif']
            },
            spacing: {
                '9/16': '56.25%',
                '3/4': '75%',
                '1/1': '100%',
            },
            fontSize: {
                xs: ['0.75rem', {lineHeight: '1.5'}],
                sm: ['0.875rem', {lineHeight: '1.5715'}],
                base: ['1rem', {lineHeight: '1.5', letterSpacing: '-0.017em'}],
                lg: ['1.125rem', {lineHeight: '1.5', letterSpacing: '-0.017em'}],
                xl: ['1.25rem', {lineHeight: '1.5', letterSpacing: '-0.017em'}],
                '2xl': ['1.5rem', {lineHeight: '1.415', letterSpacing: '-0.017em'}],
                '3xl': ['2rem', {lineHeight: '1.3125', letterSpacing: '-0.017em'}],
                '4xl': ['2.5rem', {lineHeight: '1.25', letterSpacing: '-0.017em'}],
                '5xl': ['3.25rem', {lineHeight: '1.2', letterSpacing: '-0.017em'}],
                '6xl': ['3.75rem', {lineHeight: '1.1666', letterSpacing: '-0.017em'}],
                '7xl': ['4.5rem', {lineHeight: '1.1666', letterSpacing: '-0.017em'}],
            },
            animation: {
                'infinite-scroll': 'infinite-scroll 60s linear infinite',
                'infinite-scroll-inverse': 'infinite-scroll-inverse 60s linear infinite',
            },
            keyframes: {
                'infinite-scroll': {
                    from: {transform: 'translateX(0)'},
                    to: {transform: 'translateX(-100%)'},
                },
                'infinite-scroll-inverse': {
                    from: {transform: 'translateX(-100%)'},
                    to: {transform: 'translateX(0)'},
                }
            },
            letterSpacing: {
                tighter: '-0.02em',
                tight: '-0.01em',
                normal: '0',
                wide: '0.01em',
                wider: '0.02em',
                widest: '0.4em',
            },
            minWidth: {
                '10': '2.5rem',
            },
            scale: {
                '98': '.98'
            },
            colors: {
                gray: {
                    50: '#F9FAFB',
                    100: '#F3F4F6',
                    200: '#E5E7EB',
                    300: '#BFC4CD',
                    400: '#9CA3AF',
                    500: '#6B7280',
                    600: '#4B5563',
                    700: '#374151',
                    800: '#1F2937',
                    900: '#111827',
                    950: '#030712',
                },
                purple: {
                    100: '#F4F4FF',
                    200: '#E2E1FF',
                    300: '#CBCCFF',
                    400: '#ABABFF',
                    500: '#8D8DFF',
                    600: '#5D5DFF',
                    700: '#4B4ACF',
                    800: '#38379C',
                    900: '#262668',
                },
                violet: {
                    50: '#F1EEFF',
                    100: '#E6E1FF',
                    200: '#D2CBFF',
                    300: '#B7ACFF',
                    400: '#9C8CFF',
                    500: '#8470FF',
                    600: '#755FF8',
                    700: '#5D47DE',
                    800: '#4634B1',
                    900: '#2F227C',
                    950: '#1C1357',
                },
                sky: {
                    50: '#E3F3FF',
                    100: '#D1ECFF',
                    200: '#B6E1FF',
                    300: '#A0D7FF',
                    400: '#7BC8FF',
                    500: '#67BFFF',
                    600: '#56B1F3',
                    700: '#3193DA',
                    800: '#1C71AE',
                    900: '#124D79',
                    950: '#0B324F',
                },
                green: {
                    50: '#D2FFE2',
                    100: '#B1FDCD',
                    200: '#8BF0B0',
                    300: '#67E294',
                    400: '#4BD37D',
                    500: '#3EC972',
                    600: '#34BD68',
                    700: '#239F52',
                    800: '#15773A',
                    900: '#0F5429',
                    950: '#0A3F1E',
                },
                red: {
                    50: '#FFE8E8',
                    100: '#FFD1D1',
                    200: '#FFB2B2',
                    300: '#FF9494',
                    400: '#FF7474',
                    500: '#FF5656',
                    600: '#FA4949',
                    700: '#E63939',
                    800: '#C52727',
                    900: '#941818',
                    950: '#600F0F',
                },
                yellow: {
                    50: '#FFF2C9',
                    100: '#FFE7A0',
                    200: '#FFE081',
                    300: '#FFD968',
                    400: '#F7CD4C',
                    500: '#F0BB33',
                    600: '#DFAD2B',
                    700: '#BC9021',
                    800: '#816316',
                    900: '#4F3D0E',
                    950: '#342809',
                },
            },
        },
    },
    plugins: [require('@tailwindcss/forms')({
        // class 只生成对应的css class，而不会生成一个全局的样式。
        // 如果需要全局的央视，则需要你 'base'
        strategy: 'class'
    }),
        // add custom variant for expanding sidebar
        plugin(({addVariant, e}) => {
            addVariant('sidebar-expanded', ({modifySelectors, separator}) => {
                modifySelectors(({className}) => `.sidebar-expanded .${e(`sidebar-expanded${separator}${className}`)}`);
            });
        }),
        iconsPlugin({
            // Select the icon collections you want to use
            collections: getIconCollections(["ic"]),
        }),
    ],
}

