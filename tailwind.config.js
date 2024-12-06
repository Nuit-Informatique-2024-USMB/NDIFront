/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.html'],
    theme: {
        extend: {
            fontFamily: {
                'parkisans': ['Parkisans', 'sans-serif'],
            },
            fontSize: {
                '8xl': ['6rem', {lineHeight: '1'}],      // 96px
                '9xl': ['7rem', {lineHeight: '1'}],      // 112px
                '10xl': ['8rem', {lineHeight: '1'}],     // 128px
                '11xl': ['9rem', {lineHeight: '1'}],     // 144px
                '12xl': ['10rem', {lineHeight: '1'}],    // 160px
                '13xl': ['11rem', {lineHeight: '1'}],    // 176px
                '14xl': ['12rem', {lineHeight: '1'}],    // 192px
                '15xl': ['13rem', {lineHeight: '1'}],    // 208px
            },
            backgroundImage: {
                'hero-pattern': "url('/img/hero-pattern.svg')",
                'footer-texture': "url('/img/footer-texture.png')",
            }
        }
    },
    plugins: []
};
