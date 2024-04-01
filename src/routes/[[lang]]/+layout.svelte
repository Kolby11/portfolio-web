<script lang="ts">
  import '../../app.css'
  import Navbar from '$lib/components/navbar.svelte'
  import Scrollbar from '$lib/components/scrollbar.svelte'
  import Footer from '$lib/components/footer.svelte'
  import { onMount } from 'svelte'
  import { initTheme } from '$lib/stores/themeStore'
  import { currentLanguage, setCurrentLang } from '$lib/stores/translation'
  import { translations } from '$lib/data/translations'

  export let data

  onMount(() => {
    document.documentElement.lang = data.lang
    setCurrentLang(data.lang)
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
