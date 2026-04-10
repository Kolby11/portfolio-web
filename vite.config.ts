import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { enhancedImages } from '@sveltejs/enhanced-img'
import { sveltekit } from '@sveltejs/kit/vite'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      project: './project.inlang',
      outdir: './src/paraglide',
      strategy: ['cookie', 'preferredLanguage', 'globalVariable', 'baseLocale'],
    }),
    enhancedImages(),
    sveltekit(),
    Icons({ compiler: 'svelte' }),
  ],
  server: { fs: { allow: ['./resume'] } },
})
