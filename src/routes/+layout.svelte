<script lang="ts">
  import '../app.scss'
  import Navbar from '$lib/components/global/navbar.svelte'
  import Scrollbar from '$lib/components/global/scrollbar.svelte'
  import Footer from '$lib/components/global/footer.svelte'

  import '$lib/i18n'
  import { browser } from '$app/environment'
  import { locale, waitLocale, t } from 'svelte-i18n'
  import SocialsDisplay from '$lib/components/global/socialsDisplay.svelte'
  import { socialLinks } from '$lib/data/socials'

  export const load = async () => {
    if (browser) {
      locale.set(window.navigator.language)
    }
    await waitLocale()
  }
</script>

<svelte:head>
  <title>Martin Kollár</title>
  <meta name="description" content={$t('seo.description')} />
  <meta name="keywords" content={$t('seo.keywords')} />
</svelte:head>

<div class="bg-background text-text">
  <Navbar sections={['home', 'about', 'experience', 'projects', 'contact']}></Navbar>
  <slot />
  <SocialsDisplay {socialLinks} class="fixed bottom-4 left-4 max-lg:hidden xl:bottom-16 xl:left-16" />
  <Scrollbar />
  <Footer {socialLinks} />
</div>
