<script lang="ts">
  import '../app.scss'
  import '$lib/i18n' // Needed for i18n to work

  import Navbar from '$lib/components/global/navbar.svelte'
  import Scrollbar from '$lib/components/global/scrollbar.svelte'

  import { t } from 'svelte-i18n'
  import SocialsDisplay from '$lib/components/global/socialsDisplay.svelte'
  import { socialLinks } from '$lib/data/socials'
</script>

<svelte:head>
  <title>Martin Kollár</title>
  <meta name="description" content={$t('seo.description')} />
  <meta name="keywords" content={$t('seo.keywords')} />
</svelte:head>

<div class="bg-background text-text">
  <Navbar sections={['home', 'about', 'experience', 'projects', 'contact']} />
  <slot />
  <SocialsDisplay {socialLinks} class="fixed bottom-4 left-4 max-lg:hidden xl:bottom-10 xl:left-10" />
  <Scrollbar />
</div>
