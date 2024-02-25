<script lang="ts">
  import '../app.css'
  import Navbar from '$lib/components/navbar.svelte'
  import Scrollbar from '$lib/components/scrollbar.svelte'
  import Footer from '$lib/components/footer.svelte'

  let section: string = 'home'
</script>

<svelte:head>
  <title>Martin Kollár - Porfolio</title>
</svelte:head>

<div class="bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text">
  <Navbar></Navbar>
  <slot />
  <Scrollbar></Scrollbar>
  <Footer></Footer>
</div>
