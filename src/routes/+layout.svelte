<script lang="ts">
  import '../app.css'
  import Navbar from '$lib/components/misc/navbar.svelte'
  import Scrollbar from '$lib/components/misc/scrollbar.svelte'
  import Footer from '$lib/components/misc/footer.svelte'
  import { onMount } from 'svelte'
  import { initTheme } from '$lib/stores/themeStore'
  import { currentLanguage } from '$lib/stores/textContent'
  import { translations } from '$lib/data/translations'

  if ($currentLanguage) {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = $currentLanguage
    }
  }

  onMount(() => {
    initTheme()
  })
</script>

<svelte:head>
  <title>Martin Kollár - Porfolio</title>
  <meta name="description" content={translations.seo.description[$currentLanguage]} />
  <meta name="keywords" content={translations.seo.keywords[$currentLanguage]} />
</svelte:head>

<div class="bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text">
  <Navbar></Navbar>
  <slot />
  <Scrollbar></Scrollbar>
  <Footer></Footer>
</div>
