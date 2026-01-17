/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#e6f4f8',
                    100: '#cce9f1',
                    200: '#99d3e3',
                    300: '#66bdd5',
                    400: '#33a7c7',
                    500: '#0A5C7A',
                    600: '#084a62',
                    700: '#063749',
                    800: '#042531',
                    900: '#021218',
                },
                secondary: {
                    50: '#fef4ed',
                    100: '#fde9db',
                    200: '#fbd3b7',
                    300: '#f9bd93',
                    400: '#f7a76f',
                    500: '#F4A261',
                    600: '#f28234',
                    700: '#e25e0f',
                    800: '#b54a0c',
                    900: '#883709',
                },
                accent: {
                    50: '#fdf9ed',
                    100: '#fbf3db',
                    200: '#f7e7b7',
                    300: '#f3db93',
                    400: '#efcf6f',
                    500: '#E9C46A',
                    600: '#e5b83d',
                    700: '#d9a31e',
                    800: '#a87e17',
                    900: '#775911',
                },
                neutral: {
                    50: '#e9ebed',
                    100: '#d3d7db',
                    200: '#a7afb7',
                    300: '#7b8793',
                    400: '#4f5f6f',
                    500: '#264653',
                    600: '#1e3842',
                    700: '#172a32',
                    800: '#0f1c21',
                    900: '#080e11',
                },
            },
            fontFamily: {
                heading: ['Playfair Display', 'serif'],
                body: ['Poppins', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-in',
                'slide-up': 'slideUp 0.6s ease-out',
                'slide-in-right': 'slideInRight 0.6s ease-out',
                'scale-in': 'scaleIn 0.4s ease-out',
                'bounce-slow': 'bounce 3s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideInRight: {
                    '0%': { transform: 'translateX(30px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
    ],
}
