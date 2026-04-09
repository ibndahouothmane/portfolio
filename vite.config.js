import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const nonBlockingCssPlugin = {
  name: 'non-blocking-css-preload',
  apply: 'build',
  transformIndexHtml(html) {
    const transformedHtml = html.replace(
      /<link rel="stylesheet" crossorigin href="([^"]+)">/g,
      '<link rel="preload" as="style" crossorigin href="$1" onload="this.onload=null;this.rel=\'stylesheet\'">\n    <noscript><link rel="stylesheet" crossorigin href="$1"></noscript>'
    )

    return {
      html: transformedHtml,
      tags: [
        {
          tag: 'link',
          attrs: {
            rel: 'dns-prefetch',
            href: '//api.othmanewp.com'
          },
          injectTo: 'head'
        },
        {
          tag: 'link',
          attrs: {
            rel: 'preconnect',
            href: 'https://api.othmanewp.com',
            crossorigin: ''
          },
          injectTo: 'head'
        }
      ]
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), nonBlockingCssPlugin],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          apollo: ['@apollo/client', 'graphql'],
          swiper: ['swiper']
        }
      }
    }
  }
})
