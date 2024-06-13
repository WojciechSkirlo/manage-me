/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            spacing: {
                13: '3.25rem',
            },
            colors: {
                red: {
                    DEFAULT: '#FF3B30',
                    dark: '#FF453A',
                },
                orange: {
                    DEFAULT: '#FF9500',
                    dark: '#FF9F0A',
                },
                yellow: {
                    DEFAULT: '#FFCC00',
                    dark: '#FFD60A',
                },
                green: {
                    DEFAULT: '#28CD41',
                    dark: '#32D74B',
                },
                mint: {
                    DEFAULT: '#00C7BE',
                    dark: '#66D4CF',
                },
                teal: {
                    DEFAULT: '#59ADC4',
                    dark: '#6AC4DC',
                },
                cyan: {
                    DEFAULT: '#55BEF0',
                    dark: '#5AC8F5',
                },
                blue: {
                    DEFAULT: '#007AFF',
                    dark: '#0A84FF',
                },
                indigo: {
                    DEFAULT: '#5856D6',
                    dark: '#5E5CE6',
                },
                purple: {
                    DEFAULT: '#AF52DE',
                    dark: '#BF5AF2',
                },
                pink: {
                    DEFAULT: '#FF2D55',
                    dark: '#FF375F',
                },
                brown: {
                    DEFAULT: '#A2845E',
                    dark: '#A2845E',
                },
                gray: {
                    DEFAULT: '#8E8E93',
                    dark: '#98989D',
                },
                vibrant: {
                    red: {
                        DEFAULT: 'rgba(245, 49, 38, 0.40)',
                        dark: '#FF3B30',
                    },
                    orange: {
                        DEFAULT: '#FF9500',
                        dark: '#FF9F0A',
                    },
                    yellow: {
                        DEFAULT: '#FFCC00',
                        dark: '#FFD60A',
                    },
                    green: {
                        DEFAULT: '#28CD41',
                        dark: '#32D74B',
                    },
                    mint: {
                        DEFAULT: '#00C7BE',
                        dark: '#66D4CF',
                    },
                    teal: {
                        DEFAULT: '#59ADC4',
                        dark: '#6AC4DC',
                    },
                    cyan: {
                        DEFAULT: '#55BEF0',
                        dark: '#5AC8F5',
                    },
                    blue: {
                        DEFAULT: '#007AFF',
                        dark: '#0A84FF',
                    },
                    indigo: {
                        DEFAULT: '#5856D6',
                        dark: '#5E5CE6',
                    },
                    purple: {
                        DEFAULT: '#AF52DE',
                        dark: '#BF5AF2',
                    },
                    pink: {
                        DEFAULT: 'rgba(245, 35, 75, 1)',
                        dark: '#FF375F',
                    },
                    brown: {
                        DEFAULT: '#A2845E',
                        dark: '#A2845E',
                    },
                    gray: {
                        DEFAULT: '#8E8E93',
                        dark: '#98989D',
                    },
                },
                text: {
                    primary: {
                        DEFAULT: 'rgba(0, 0, 0, 0.85)',
                        dark: 'rgba(255, 255, 255, 0.85)',
                    },
                    secondary: {
                        DEFAULT: 'rgba(0, 0, 0, 0.50)',
                        dark: 'rgba(0, 0, 0, 0.55)',
                    },
                    tertiary: {
                        DEFAULT: 'rgba(0, 0, 0, 0.25)',
                        dark: 'rgba(0, 0, 0, 0.25)',
                    },
                    quaternary: {
                        DEFAULT: 'rgba(0, 0, 0, 0.10)',
                        dark: 'rgba(0, 0, 0, 0.10)',
                    },
                },
                fills: {
                    primary: {
                        DEFAULT: 'rgba(0, 0, 0, 0.10)',
                        dark: 'rgba(255, 255, 255, 0.10)',
                    },
                    secondary: {
                        DEFAULT: 'rgba(0, 0, 0, 0.08)',
                        dark: 'rgba(0, 0, 0, 0.08)',
                    },
                    tertiary: {
                        DEFAULT: 'rgba(0, 0, 0, 0.05)',
                        dark: 'rgba(0, 0, 0, 0.05)',
                    },
                    quaternary: {
                        DEFAULT: 'rgba(0, 0, 0, 0.03)',
                        dark: 'rgba(0, 0, 0, 0.03)',
                    },
                }
            },
            fontSize: {
                '2xs': ['10px', '13px'],
                xs: ['11px', '14px'],
                sm: ['12px', '15px'],
                base: ['13px', '16px'],
                lg: ['15px', '20px'],
                xl: ['17px', '22px'],
                '2xl': ['22px', '26px'],
                '3xl': ['26px', '32px'],
            }
        },
    },
    plugins: [],
}

