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

  let sideBar: HTMLDivElement | null = $state(null)

  $effect(() => {
    if (showMenu) {
      document.getElementById('content')?.classList.add('blur-xs')
      document.addEventListener('pointerup', handleClickOutside)
    } else {
      document.getElementById('content')?.classList.remove('blur-xs')
      document.removeEventListener('pointerup', handleClickOutside)
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

  function handleClickOutside(event: MouseEvent) {
    if (showMenu && sideBar && !sideBar.contains(event.target as Node)) {
      const menuButton = (event.target as Element)?.closest('button')
      const isMenuButton = menuButton && menuButton.onclick === toggleMenu

      if (!isMenuButton) {
        showMenu = false
      }
    }
  }
</script>

<!-- Mobile navbar -->
{#if showMenu}
  <div
    transition:slide={{ axis: 'x' }}
    bind:this={sideBar}
    class={`mobile-nav text-light-primary fixed right-0 z-[60] flex h-screen flex-col items-end px-8 py-6 text-lg backdrop-blur-2xl`}
  >
    <div class="flex w-full items-center justify-between">
      <button class="flex h-fit w-fit cursor-pointer items-center justify-center">
        <ThemeSelection />
      </button>
      <button class="flex h-fit w-fit cursor-pointer items-center justify-center self-end" onclick={toggleMenu}>
        <MaterialSymbolsLightCloseRounded style="font-size:x-large;" />
      </button>
    </div>
    <nav class="mt-6 flex h-fit flex-col items-end gap-y-2">
      {#each sections as section, i}
        <a
          use:smoothScroll
          href="#{section}"
          aria-current={sectionStore.currentSection === section ? 'true' : undefined}
          class="underline-expand-center border-b border-transparent text-xl transition-all duration-200 hover:border-gray-400"
          onclick={e => {
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
{/if}

<!-- Desktop navbar -->
<div
  class="fixed top-0 z-50 flex h-16 w-full items-center justify-between px-8 py-6 backdrop-blur-2xl transition-transform duration-300 ease-in-out sm:h-20"
  class:translate-y-0={showNavbar}
  class:-translate-y-full={!showNavbar}
  use:smoothScroll
>
  {#if innerWidth.current && innerWidth.current >= 768}
    <div transition:fade class="flex gap-x-4 lg:gap-x-8">
      <ThemeSelection />
      <LanguageSelection />
    </div>
    <nav transition:fade class="ml-auto">
      <ul class="justify- flex items-center gap-x-6">
        {#each sections as section, i}
          <li>
            <a
              href="#{section}"
              aria-current={sectionStore.currentSection === section ? 'true' : undefined}
              class="underline-expand-center flex items-center justify-center text-xl transition duration-200 outline-none focus-visible:outline-none"
            >
              {$t(`navbar.${section}`)}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  {:else if !showMenu && showNavbar}
    <button transition:fade class="ml-auto cursor-pointer" onclick={toggleMenu}>
      <MaterialSymbolsLightMenuRounded style="font-size:x-large;" />
    </button>
  {/if}
</div>

<style lang="scss">
  .mobile-nav {
    width: min(75vw, 200px);
    box-shadow: -10px 10px 15px -15px color-mix(in srgb, var(--color-text-light) 30%, transparent);
  }
</style>
