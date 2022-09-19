/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,vue,html}",
    ],
    theme: {
        extend: {
            screens: { /* Check if the device supports hover */
                'support': { 'raw': '(hover: hover)' },
            },
        },
    },
    plugins: [],
}