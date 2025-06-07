<script lang="ts">
  import '../app.css'
  import Navbar from '$lib/components/global/navbar.svelte'
  import Scrollbar from '$lib/components/global/scrollbar.svelte'
  import Footer from '$lib/components/global/footer.svelte'
  import { onMount } from 'svelte'
  import { initTheme } from '$lib/stores/themeStore'

  import '$lib/i18n'
  import { browser } from '$app/environment'
  import { locale, waitLocale, t } from 'svelte-i18n'
  import type { LayoutLoad } from './$types'

  export const load: LayoutLoad = async () => {
    if (browser) {
      locale.set(window.navigator.language)
    }
    await waitLocale()
  }

  onMount(() => {
    initTheme()
  })
</script>

<svelte:head>
  <title>Martin Kollár - Portfolio</title>
  <meta name="description" content={$t('seo.description')} />
  <meta name="keywords" content={$t('seo.keywords')} />
</svelte:head>

<div class="bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text">
  <Navbar sections={['home', 'about', 'experience', 'projects', 'contact']}></Navbar>
  <slot />
  <Scrollbar></Scrollbar>
  <Footer></Footer>
</div>
