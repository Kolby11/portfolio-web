<script lang="ts">
  import LanguageSelection from './languageSelection.svelte'
  import { smoothScroll } from '$lib/actions/smoothScroll'
  import { t } from 'svelte-i18n'
  import MaterialSymbolsLightCloseRounded from '~icons/material-symbols-light/close-rounded'
  import MaterialSymbolsLightMenuRounded from '~icons/material-symbols-light/menu-rounded'
  import ThemeSelection from './themeSelection.svelte'
  import { fade, slide } from 'svelte/transition'
  import { innerWidth, scrollY } from 'svelte/reactivity/window'
  import { sectionStore } from '$lib/stores/section.svelte'

  type NavbarProps = {
    sections: string[]
  }

  const { sections = [] }: NavbarProps = $props()

  let showMenu = $state(false)
  let showNavbar = $state(true)
  let lastScrollY = $state(0)

  // Close menu when resizing to desktop
  $effect(() => {
    if (innerWidth.current && innerWidth.current >= 768 && showMenu) {
      showMenu = false
    }
  })

  // Handle scroll behavior for navbar visibility
  $effect(() => {
    if (innerWidth.current && innerWidth.current < 768 && scrollY.current) {
      const scrollDifference = scrollY.current - lastScrollY

      if (scrollDifference < 0 || scrollY.current < 10) {
        showNavbar = true
      } else if (scrollDifference > 5) {
        showNavbar = false
        if (showMenu) {
          showMenu = false
        }
      }
    } else {
      showNavbar = true
    }

    lastScrollY = scrollY.current || 0
  })

  function toggleMenu() {
    showMenu = !showMenu
  }
</script>

<!-- Mobile navbar -->
{#if showMenu}
  <button
    transition:fade
    class="fixed inset-0 top-12 z-40 w-full bg-black/10 backdrop-blur-lg dark:bg-black/30"
    onclick={toggleMenu}
    aria-label="Close menu"
  >
    <div
      transition:slide={{ axis: 'x' }}
      role="presentation"
      class={`mobile-nav text-light-primary absolute top-0 right-0 flex h-full w-fit flex-col items-end border-l border-(--color-text)/10 bg-(--color-background)/60 px-8 py-6 text-lg backdrop-blur-xl`}
      onclick={e => e.stopPropagation()}
    >
      <nav class="flex h-fit flex-col items-end gap-y-2">
        {#each sections as section, i}
          <a
            use:smoothScroll
            href="#{section}"
            aria-current={sectionStore.currentSection === section ? 'true' : undefined}
            title={$t(`navbar.${section}`)}
            class="underline-expand-center border-b border-transparent text-xl transition-all duration-200 hover:border-gray-400"
            onclick={() => {
              showMenu = false
            }}
          >
            {$t(`navbar.${section}`)}
          </a>
        {/each}
      </nav>
      <div class="mt-auto flex w-full justify-end gap-y-2">
        <LanguageSelection />
      </div>
    </div>
  </button>
{/if}

<!-- Desktop navbar -->
<div
  class="fixed top-0 z-50 flex h-14 w-full items-center justify-between border-b border-(--color-text)/10 bg-(--color-background)/80 p-6 backdrop-blur-2xl transition-transform duration-300 ease-in-out sm:h-16 dark:bg-(--color-background)/80"
  class:translate-y-0={showNavbar}
  class:-translate-y-full={!showNavbar}
  use:smoothScroll
>
  {#if innerWidth.current && innerWidth.current >= 768}
    <div class="flex gap-x-4 lg:gap-x-8">
      <ThemeSelection />
      <LanguageSelection />
    </div>
    <nav class="ml-auto">
      <ul class="justify- flex items-center gap-x-6">
        {#each sections as section, i}
          <li>
            <a
              href="#{section}"
              aria-current={sectionStore.currentSection === section ? 'true' : undefined}
              title={$t(`navbar.${section}`)}
              class="underline-expand-center flex items-center justify-center text-xl transition duration-200 outline-none focus-visible:outline-none"
            >
              {$t(`navbar.${section}`)}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  {:else if showNavbar}
    <div class="flex w-full items-center justify-between">
      <ThemeSelection />
      <button class="cursor-pointer" onclick={toggleMenu} title={showMenu ? $t('navbar.close') : $t('navbar.menu')}>
        {#if showMenu}
          <MaterialSymbolsLightCloseRounded style="font-size:x-large;" />
        {:else}
          <MaterialSymbolsLightMenuRounded style="font-size:x-large;" />
        {/if}
      </button>
    </div>
  {/if}
</div>

<style lang="scss">
  .mobile-nav {
    width: fit-content;
    max-width: 100vw;
    overflow-x: hidden;
    box-shadow: -8px 10px 10px -15px color-mix(in srgb, var(--color-text-light) 30%, transparent);
  }
</style>
