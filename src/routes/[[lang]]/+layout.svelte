<script lang="ts">
  import '../../app.css'
  import Navbar from '$lib/components/navbar.svelte'
  import Scrollbar from '$lib/components/scrollbar.svelte'
  import Footer from '$lib/components/footer.svelte'
  import { translation } from '$lib/stores/translation'
  import { onMount } from 'svelte'
  import { initTheme } from '$lib/stores/themeStore'

  export let data

  translation.set(data.translation)

  onMount(() => {
    document.documentElement.lang = data.lang
    initTheme()
  })
</script>

<svelte:head>
  <title>Martin Kollár - Porfolio</title>
  <meta name="description" content={$translation.seo.description} />
  <meta name="keywords" content={$translation.seo.keywords} />
</svelte:head>

<div class="bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text">
  <Navbar></Navbar>
  <slot />
  <Scrollbar></Scrollbar>
  <Footer></Footer>
</div>
