import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['K2D', ...defaultTheme.fontFamily.sans],
                serif: ['K2D', ...defaultTheme.fontFamily.serif],
                'k2d': ['K2D', 'sans-serif'],
            },
            colors: {
                primary: {
                    50: '#FFF7ED',
                    100: '#FFEDD5',
                    200: '#FED7AA',
                    300: '#FDBA74',
                    400: '#FB923C',
                    500: '#FF6B35', // Main primary color
                    600: '#E55A2B',
                    700: '#C2410C',
                    800: '#9A3412',
                    900: '#7C2D12',
                },
                secondary: {
                    50: '#F7FAFC',
                    100: '#EDF2F7',
                    200: '#E2E8F0',
                    300: '#CBD5E0',
                    400: '#A0AEC0',
                    500: '#718096',
                    600: '#4A5568',
                    700: '#2D3748',
                    800: '#1A202C',
                    900: '#171923',
                },
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
            },
            boxShadow: {
                'custom-sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                'custom-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'custom-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            },
        },
    },

    plugins: [forms],
};
