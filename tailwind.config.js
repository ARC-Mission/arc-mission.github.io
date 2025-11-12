/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: '2.25rem', // text-4xl
              fontWeight: '500', // font-medium
              color: '#fff', // text-white
              marginTop: '3rem', // mt-12
              marginBottom: '1.5rem', // mb-6
            },
            h2: {
              fontSize: '1.875rem', // text-3xl
              fontWeight: '500', // font-medium
              color: '#fff', // text-white
              marginTop: '2.5rem', // mt-10
              marginBottom: '1rem', // mb-4
            },
            h3: {
              fontSize: '1.5rem', // text-2xl
              fontWeight: '500', // font-medium
              color: '#fff', // text-white
              marginTop: '2rem', // mt-8
              marginBottom: '0.75rem', // mb-3
            },
            h4: {
              fontSize: '1.25rem', // text-xl
              fontWeight: '500', // font-medium
              color: '#fff', // text-white
              marginTop: '1.5rem', // mt-6
              marginBottom: '0.5rem', // mb-2
            },
            p: {
              color: '#a3a3a3', // text-neutral-300
              lineHeight: '1.625', // leading-relaxed
              marginBottom: '1rem', // mb-4
            },
            a: {
              color: '#60a5fa', // text-blue-400
              textDecoration: 'none', // no-underline
              '&:hover': {
                color: '#93c5fd', // hover:text-blue-300
              },
            },
            strong: {
              color: '#fff', // text-white
              fontWeight: '600', // font-semibold
            },
            ul: {
              listStyleType: 'disc',
              marginLeft: '1.5rem', // ml-6
              marginBottom: '1rem', // mb-4
              color: '#a3a3a3', // text-neutral-300
            },
            ol: {
              listStyleType: 'decimal',
              marginLeft: '1.5rem', // ml-6
              marginBottom: '1rem', // mb-4
              color: '#a3a3a3', // text-neutral-300
            },
            li: {
              marginBottom: '0.5rem', // mb-2
            },
            blockquote: {
              borderLeftWidth: '4px', // border-l-4
              borderLeftColor: '#404040', // border-neutral-700
              paddingLeft: '1rem', // pl-4
              fontStyle: 'italic', // italic
              color: '#a3a3a3', // text-neutral-400
            },
            code: {
              color: '#93c5fd', // text-blue-300
              backgroundColor: '#171717', // bg-neutral-900
              padding: '0.125rem 0.25rem', // px-1 py-0.5
              borderRadius: '0.25rem', // rounded
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#171717', // bg-neutral-900
              border: '1px solid #404040', // border border-neutral-800
              padding: '1rem', // p-4
              borderRadius: '0.5rem', // rounded
              color: '#e5e7eb', // Default text color for pre blocks
            },
            hr: {
              borderColor: '#404040', // border-neutral-800
              marginTop: '2rem', // my-8
              marginBottom: '2rem', // my-8
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
