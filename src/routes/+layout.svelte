<script lang="ts">
  import '../app.css'

  import Navbar from '$lib/components/global/navbar.svelte'
  import Scrollbar from '$lib/components/global/scrollbar.svelte'

  import { t } from '$lib/i18n'
  import SocialsDisplay from '$lib/components/global/socialsDisplay.svelte'
  import { socialLinks } from '$lib/data/socials'
  import { onMount } from 'svelte'

  let cursorX = $state(0)
  let cursorY = $state(0)
  let cursorVisible = $state(false)

  onMount(() => {
    const onMove = (e: MouseEvent) => {
      cursorX = e.clientX
      cursorY = e.clientY
      cursorVisible = true
    }
    const onLeave = () => { cursorVisible = false }

    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  })
</script>

<svelte:head>
  <title>Martin Kollár</title>
  <meta name="description" content={$t('seo.description')} />
  <meta name="keywords" content={$t('seo.keywords')} />
</svelte:head>

<div
  class="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-500"
  style="opacity: {cursorVisible ? 1 : 0};"
>
  <div
    class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
    style="
      left: {cursorX}px;
      top: {cursorY}px;
      width: 700px;
      height: 700px;
      background: radial-gradient(circle, color-mix(in srgb, var(--cursor-glow-color) var(--cursor-glow-strength) , transparent) 0%, transparent 65%);
    "
  ></div>
</div>

<div class="bg-background text-text">
  <Navbar sections={['home', 'about', 'experience', 'projects', 'contact']} />
  <slot />
  <SocialsDisplay {socialLinks} class="fixed bottom-4 left-4 max-lg:hidden xl:bottom-10 xl:left-10" />
  <Scrollbar />
</div>
